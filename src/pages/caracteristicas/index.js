import './caracteristicas.css';
import Tile from '../../components/tile';
import { useEffect, useState, useContext } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import TileCaracteristica from '../../components/tilecaracteristica';
import TileProficiencia from '../../components/tileproficiencia';
import BtnAdicionar from '../../components/btnadicionar';
import Vazio from '../../components/vazio';
import BtnSalvarForm from '../../components/btnsalvarform';
import {buscarPersonagem} from '../../utils';

function Caracteristicas(){
  
  const [temPersonagem, setTemPersonagem] = useState(false);
  const [personagem, setPersonagem] = useState({});
    
  const [lstCaracteristica, setCaracteristica] = useState([]);
  const [lstAnotacao, setLstAnotacao] = useState([]);
  const [loading, setLoading] = useState(true);

  /* modal */
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [idCaracteristica, setIdCaracteristica]   = useState('');
  const [descricao, setDescricao]                 = useState('');
  const [tipo, setTipo]                           = useState('0');

  useEffect(()=>{    

    async function buscar(aID){

      let pers = await buscarPersonagem(aID);
      setPersonagem(pers);

      let temP = pers !== null;

      setTemPersonagem(temP);

      const q = query(collection(db, "tb_caracteristica"), where("ca_idpersonagem", "==", aID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
          lista.push({
            ca_id: doc.id.trim(),
            ca_nome: doc.data().ca_nome.trim(),
            ca_descricao: doc.data().ca_descricao.trim(),
          })
        });
        lista.sort((a, b)=> a.ca_nome > b.ca_nome);
    
        setCaracteristica(lista);
  
        buscarAnatocao(aID);
      } catch (error) {
        toast.error('Erro ao carregar caracteristica'+error); 
        setLoading(false);
      }
      
    }

    async function buscarAnatocao(aID) {

      const q = query(collection(db, "tb_anotacao"), where("an_idpersonagem", "==", aID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
          lista.push({
            an_id: doc.id.trim(),
            an_descricao : doc.data().an_descricao.trim(),
            an_titulo  : doc.data().an_titulo .trim(),
            // an_data: doc.data().an_data.trim(),
            // an_idpersonagem : doc.data().an_idpersonagem.trim(),
          })
        });
        lista.sort((a, b)=> a.ca_nome > b.ca_nome);
    
        setLstAnotacao(lista);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar anotação'+error); 
        setLoading(false);
      }
      
    }

    let id = localStorage.getItem('RF@personagemID');
    let tempId = (id !== null);
    if(tempId) //se nao ta nulo mas pode nao ter valor
      tempId = (id.length > 0);
    if(tempId)
      buscar(id);
    else
      setLoading(false);

    // console.log('c');

  },[lstCaracteristica, lstAnotacao]);

  async function onSalvar(e){
    e.preventDefault();

    if((titulo.trim() !== '') && (descricao.trim() !== '') && (tipo !== '0' )){

      if(tipo === '2'){
        if(idCaracteristica.trim() === ''){     // inserir
          await addDoc(collection(db, 'tb_caracteristica'),{
            ca_idpersonagem: personagem.pe_id.trim(),
            ca_nome: titulo.trim(),
            ca_descricao: descricao.trim(),
          })
          .then( () =>{
            onFecharModal();
            // buscar(personagem.pe_id.trim());
          })
          .catch((error)=>{
            console.log('Erro ao inserir; '+error);
            toast.error('Erro ao inserir');
          });
        }
        else{                                     //editar
          const docRef = doc(db, "tb_caracteristica", idCaracteristica);
            await updateDoc(docRef, {
              ca_nome: titulo.trim(),
              ca_descricao: descricao.trim(),
            }
          )
          .then(()=>{
            onFecharModal();
            // buscar();
          })
          .catch((error)=>{
            console.log('Erro ao editar: '+error);
            toast.error('Erro ao editar');
          });
        }
      }
      else{
        if(idCaracteristica.trim() === ''){     // inserir
          await addDoc(collection(db, 'tb_anotacao'),{
            an_idpersonagem: personagem.pe_id.trim(),
            an_titulo: titulo.trim(),
            an_descricao: descricao.trim(),
          })
          .then( () =>{
            onFecharModal();
            // buscar();
          })
          .catch((error)=>{
            console.log('Erro ao inserir; '+error);
            toast.error('Erro ao inserir');
          });
        }
        else{                                     //editar
          const docRef = doc(db, "tb_caracteristica", idCaracteristica);
            await updateDoc(docRef, {
              ca_nome: titulo.trim(),
              ca_descricao: descricao.trim(),
            }
          )
          .then(()=>{
            onFecharModal();
            // buscar();
          })
          .catch((error)=>{
            console.log('Erro ao editar: '+error);
            toast.error('Erro ao editar');
          });
        }
      }
      
      
    }
    else  
      toast.error('Campo obrigatorio não preenchido');
    
  }

  function onEditar(item){
    setTitulo(item.ca_nome.trim());
    setDescricao(item.ca_descricao.trim());
    setIdCaracteristica(item.ca_id.trim());
    setIsOpen(true);
  }

  async function onExcluir(id) {

    const docRef = doc(db, "tb_caracteristica", id);
    await deleteDoc(docRef)
    .then(()=>{
      // buscar();
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  
  }

  function onEditarAn(item){
    setTitulo(item.an_titulo.trim());
    setDescricao(item.an_anotacao.trim());
    setIdCaracteristica(item.an_id.trim());
    setIsOpen(true);
  }

  async function onExcluirAn(id) {

    const docRef = doc(db, "tb_anotacao", id);
    await deleteDoc(docRef)
    .then(()=>{
      // buscar();
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  
  }

  function onFecharModal(){
    setTitulo('');
    setDescricao('');
    setIdCaracteristica('');
    setIsOpen(false)
  }

  if(loading)
    return <div>carregand...</div>

  return(
    (!temPersonagem)? <Vazio/>:
    <div className='cr_container'>

      <div className='cr_proficiencias'>
        <div className='cr_titulo'>
          <strong>Proficiencias</strong>
          <hr key='linhaproficiencia'/>
        </div>
        <ul className='cr_lista'>
          <Tile id='Força' titulo='Força'>
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Atletismo' valor={personagem.getProForca(personagem.pe_proatletismo)}  proficiente={personagem.pe_proatletismo}/>
            </div>

            <div class="ca-cd-div-flag">
              <span>{personagem.getModForca()}</span>
              <div className='ca-separador2'/>
              <label>{personagem.pe_forca}</label>
            </div>
          </Tile>
          <Tile id='Destreza' titulo='Destreza'>
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Acrobacia' valor={personagem.getProDestreza(personagem.pe_proacrobacia)}  proficiente={personagem.pe_proacrobacia}/>
              <TileProficiencia titulo='Furtividade' valor={personagem.getProDestreza(personagem.pe_profurtividade)}  proficiente={personagem.pe_profurtividade}/>
              <TileProficiencia titulo='Prestidigitacao' valor={personagem.getProDestreza(personagem.pe_proprestidigitacao)}  proficiente={personagem.pe_proprestidigitacao}/>
            </div>
            <div class="ca-cd-div-flag">
              <span>{personagem.getModDestreza()}</span>
              <div className='ca-separador2'/>
              <label>{personagem.pe_destreza}</label>
            </div>
          </Tile>
          <Tile id='Inteligência' titulo='Inteligência'> 
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Arcanismo' valor={personagem.getProInteligencia(personagem.pe_proarcanismo)}  proficiente={personagem.pe_proarcanismo}/>
              <TileProficiencia titulo='Historia' valor={personagem.getProInteligencia(personagem.pe_prohistoria)}  proficiente={personagem.pe_prohistoria}/>
              <TileProficiencia titulo='Investigação' valor={personagem.getProInteligencia(personagem.pe_proinvestigacao)}  proficiente={personagem.pe_proinvestigacao}/>             
              <TileProficiencia titulo='Natureza' valor={personagem.getProInteligencia(personagem.pe_pronatureza)}  proficiente={personagem.pe_pronatureza}/>             
              <TileProficiencia titulo='Religião' valor={personagem.getProInteligencia(personagem.pe_proreligiao)}  proficiente={personagem.pe_proreligiao}/>             
            </div>
            <div class="ca-cd-div-flag">
              <span>{personagem.getModInteligencia()}</span>
              <div className='ca-separador2'/>
              <label>{personagem.pe_inteligencia}</label>
            </div>
          </Tile>
          <Tile id='Sabedoria' titulo='Sabedoria'>
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Intuição' valor={personagem.getProSabedoria(personagem.pe_prointuicao)}  proficiente={personagem.pe_prointuicao}/>
              <TileProficiencia titulo='Lidar com animais' valor={personagem.getProSabedoria(personagem.pe_prolidaranimais)}  proficiente={personagem.pe_prolidaranimais}/>
              <TileProficiencia titulo='Medicina' valor={personagem.getProSabedoria(personagem.pe_promedicina)}  proficiente={personagem.pe_promedicina}/>             
              <TileProficiencia titulo='Percepção' valor={personagem.getProSabedoria(personagem.pe_propercepcao)}  proficiente={personagem.pe_propercepcao}/>             
              <TileProficiencia titulo='Sobrevivência' valor={personagem.getProSabedoria(personagem.pe_prosobrevivencia)}  proficiente={personagem.pe_prosobrevivencia}/>             
            </div>
            <div class="ca-cd-div-flag">
              <span>{personagem.getModSabedoria()}</span>
              <div className='ca-separador2'/>
              <label>{personagem.pe_sabedoria}</label>
            </div>
            </Tile>
          <Tile id='Carisma' titulo='Carisma'> 
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Atuação' valor={personagem.getProCarisma(personagem.pe_proatuacao)}  proficiente={personagem.pe_proatuacao}/>
              <TileProficiencia titulo='Blefar' valor={personagem.getProCarisma(personagem.pe_problefar)}  proficiente={personagem.pe_problefar}/>
              <TileProficiencia titulo='Intimidação' valor={personagem.getProCarisma(personagem.pe_prointimidacao)}  proficiente={personagem.pe_prointimidacao}/>             
              <TileProficiencia titulo='Persuasão' valor={personagem.getProCarisma(personagem.pe_propersuacao)}  proficiente={personagem.pe_propersuacao}/>                
            </div>
            <div class="ca-cd-div-flag">
              <span>{personagem.getModCarisma()}</span>
              <div className='ca-separador2'/>
              <label>{personagem.pe_carisma}</label>
            </div>
          </Tile>
        </ul>
      </div>

      <div className='cr_caracteristicas'>
        <div className='cr_titulo'>
          <strong>Caracteristicas</strong>
          <hr key='linhacaracteristica'/>
        </div>
        <ul className='cr_lista'>
          {
            lstCaracteristica.map((item)=>{
              return(
                <Tile id={item.ca_id} titulo={item.ca_nome}>
                  <TileCaracteristica 
                    descricao={item.ca_descricao} 
                    excluir={ ()=>{onExcluir(item.ca_id)} } 
                    editar={ ()=>{onEditar(item)} }
                  />
                </Tile>
              );
            })
          }
        </ul>
      </div>

      <div className='cr_caracteristicas'>
        <div className='cr_titulo'>
          <strong>Anotação</strong>
          <hr key='linhaanotacao'/>
        </div>
        <ul className='cr_lista'>
          {
            lstAnotacao.map((item)=>{
              return(
                <Tile id={item.an_id} titulo={item.an_titulo }>
                  <TileCaracteristica 
                    descricao={item.an_descricao} 
                    excluir={ ()=>{onExcluirAn(item.an_id)} } 
                    editar={ ()=>{onEditarAn(item)} }
                  />
                </Tile>
              );
            })
          }
        </ul>
      </div>

      <BtnAdicionar alt='adicionar uma caracteristica' adicionar={()=>{setIsOpen(true)}}/>

      {/* Tela Flutuante */}
      {isOpen && (
        <div className="overlay">
          <div className='mca_container'>
            <div className='mca_titulo'>
              <strong >Característica</strong>
            </div>
            <form className='mca_form' onSubmit={onSalvar}>
              <div className='mca_div-edit'>
                <label>Título</label>
                <input className='mca_edit' placeholder='Digite um título' value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
              </div>
              <div className='mca_div-edit'>
                <label>Descrição</label>
                <textarea className='mca_edit' placeholder='Digite uma descrição' value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}/>
              </div>
              <div className='mca_div-edit'>
                <select className='mca_sel' value={tipo} onChange={(e)=>{setTipo(e.target.value)}}>
                  <option value='0'>Tipo</option>
                  <option value='1'>Anotação</option>
                  <option value='2'>Caracteristicas</option>
                </select>
              </div>
              <div className='mca_botoes'>
                <button className='mca_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>Cancelar</button>
                <BtnSalvarForm esperando='Salvando...' inicial='Salvar'/>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Caracteristicas;