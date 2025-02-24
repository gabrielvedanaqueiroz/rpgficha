import './caracteristicas.css';
import Tile from '../../components/tile';
import { useEffect, useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import expandir_mais from '../../res/expandir_mais.svg';
import {toast} from 'react-toastify';
import TileCaracteristica from '../../components/tilecaracteristica';
import TileProficiencia from '../../components/tileproficiencia';

function Caracteristicas(){
  
  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lstProficiencia, setProficiencia] = useState([]);
  const [lstCaracteristica, setCaracteristica] = useState([]);
  const [loading, setLoading] = useState(true);
  
  /* modal */
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idCaracteristica, setIdCaracteristica] = useState('');

  async function buscarCaracteristicas(){
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

  async function buscarProficiencias(){

  }

  useEffect(()=>{

    buscarProficiencias();
    buscarCaracteristicas();

    setLoading(false);
  },[]);

  async function onSalvar(e){
    e.preventDefault();

    if((titulo.trim() !== '') && (descricao.trim() !== '')){

      if(idCaracteristica.trim() === null){     // inserir
        await addDoc(collection(db, 'tb_caracteristica'),{
          ca_idpersonagem: personagemID.trim(),
          ca_nome: titulo.trim(),
          ca_descricao: descricao.trim(),
        })
        .then( () =>{
          onFecharModal();
          buscarCaracteristicas();
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
          buscarCaracteristicas();
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
      buscarCaracteristicas();
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
              <TileProficiencia titulo='Atletismo' valor='3' proficiente='1'/>
            </div>

            <div class="ca-cd-div-flag">
              <span>2</span>
              <div className='ca-separador2'/>
              <label>10</label>
            </div>
          </Tile>
          <Tile id='Destreza' titulo='Destreza'>
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Acrobacia' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Furtividade' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Prestidigitacao' valor='3' proficiente='0'/>
            </div>
            <div class="ca-cd-div-flag">
              <span>2</span>
              <div className='ca-separador2'/>
              <label>10</label>
            </div>
          </Tile>
          <Tile id='Inteligência' titulo='Inteligência'> 
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Arcanismo' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Historia' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Investigação' valor='3' proficiente='1'/>             
              <TileProficiencia titulo='Natureza' valor='3' proficiente='0'/>             
            </div>
            <div class="ca-cd-div-flag">
              <span>2</span>
              <div className='ca-separador2'/>
              <label>10</label>
            </div>
          </Tile>
          <Tile id='Sabedoria' titulo='Sabedoria'>
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Intuição' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Lidar com animais' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Medicina' valor='3' proficiente='1'/>             
              <TileProficiencia titulo='Percepção' valor='3' proficiente='0'/>             
              <TileProficiencia titulo='Sobrevivência' valor='3' proficiente='0'/>             
            </div>
            <div class="ca-cd-div-flag">
              <span>2</span>
              <div className='ca-separador2'/>
              <label>10</label>
            </div>
            </Tile>
          <Tile id='Carisma' titulo='Carisma'> 
            <div className='cr-proficiencia'>
              <TileProficiencia titulo='Atuação' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Blefar' valor='3' proficiente='0'/>
              <TileProficiencia titulo='Intimidação' valor='3' proficiente='1'/>             
              <TileProficiencia titulo='Persuasão' valor='3' proficiente='0'/>                
            </div>
            <div class="ca-cd-div-flag">
              <span>2</span>
              <div className='ca-separador2'/>
              <label>10</label>
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
      <div className='cr_div-rodape-botao'>
        <button className='cr_bt-adicionar' onClick={()=>{setIsOpen(true)}} >
          <img className='cr_img-adicionar' src={expandir_mais} alt='adicionar uma caracteristica'/>
          Adicionar
        </button>
      </div>

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