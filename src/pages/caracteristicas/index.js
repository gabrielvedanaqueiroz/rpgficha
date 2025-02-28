import './caracteristicas.css';
import Tile from '../../components/tile';
import { useEffect, useState, useContext } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import TileCaracteristica from '../../components/tilecaracteristica';
import TileProficiencia from '../../components/tileproficiencia';
import BtnAdicionar from '../../components/btnadicionar';
import { AuthContext } from '../../utils/auth';

function Caracteristicas(){
  
  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lstCaracteristica, setCaracteristica] = useState([]);
  const [loading, setLoading] = useState(true);
  const {personagem} = useContext(AuthContext);

  /* modal */
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idCaracteristica, setIdCaracteristica] = useState('');

  async function buscar(){
    const q = query(collection(db, "tb_caracteristica"), where("ca_idpersonagem", "==", personagemID.trim()));
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
    } catch (error) {
      toast.error('Erro ao carregar caracteristica'+error); 
    }
    
  }


  useEffect(()=>{
    buscar();
    setLoading(false);
  },[personagemID]);

  async function onSalvar(e){
    e.preventDefault();

    if((titulo.trim() !== '') && (descricao.trim() !== '')){

      if(idCaracteristica.trim() === ''){     // inserir
        await addDoc(collection(db, 'tb_caracteristica'),{
          ca_idpersonagem: personagemID.trim(),
          ca_nome: titulo.trim(),
          ca_descricao: descricao.trim(),
        })
        .then( () =>{
          onFecharModal();
          buscar();
        })
        .catch((error)=>{
          console.log('Erro ao inserir; '+error);
          toast.error('Erro ao inserir');
        });
      }
      else{                                     //editar
        const docRef = doc(db, "tb_caracteristica", idCaracteristica);
          await updateDoc(docRef, {
            ca_idpersonagem: personagemID.trim(),
            ca_nome: titulo.trim(),
            ca_descricao: descricao.trim(),
          }
        )
        .then(()=>{
          onFecharModal();
          buscar();
        })
        .catch((error)=>{
          console.log('Erro ao editar: '+error);
          toast.error('Erro ao editar');
        });
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
      buscar();
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
    <div className='cr_container'>

      <div className='cr_proficiencias'>
        <div className='cr_titulo'>
          <strong>Proficiencias</strong>
          <hr/>
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
          <hr/>
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
              <div className='mca_botoes'>
                <button className='mca_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>Cancelar</button>
                <button className='mca_btn-salvar' type='submmit'>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Caracteristicas;