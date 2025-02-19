import './caracteristica.css';
import '../../components/tile';
import Tile from '../../components/tile';
import { useEffect, useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import expandir_mais from '../../res/expandir_mais.svg';
import {toast, ToastContainer } from 'react-toastify';
import TileCaracteristica from '../../components/tilecaracteristica';

function Caracteristica(){
  
  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lstProficiencia, setProficiencia] = useState([]);
  const [lstCaracteristica, setCaracteristica] = useState([]);
  
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
  },[]);

  async function onSalvar(e){
    e.preventDefault();

    if((titulo.trim() !== '') && (descricao.trim() !== '')){

      if(idCaracteristica.trim() !== null){     // inserir
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
    setTitulo(item.ca_nome);
    setDescricao(item.ca_descricao);
    setIdCaracteristica(item.ca_id);
    setIsOpen(true);
  }

  async function onExcluir(id) {
    // const docRef = doc(db, "tb_caracteristica", id);
    // await deleteDoc(docRef)
    // .then(()=>{
    //   buscarCaracteristicas();
    // })
    // .catch((error)=>{
    //   toast.error('Erro ao excluir');
    //   console.log('erro ao buscar '+error);
    // });  
    alert('exkuir');
  }

  function onFecharModal(){
    setTitulo('');
    setDescricao('');
    setIdCaracteristica('');
    setIsOpen(false)
  }

  return(
    <div className='cr_container'>

      <div className='cr_proficiencias'>
        <div className='cr_titulo'>
          <strong>Proficiencias</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          <Tile id='Força' titulo='Força'> Força </Tile>
          <Tile id='Destreza' titulo='Destreza'> Destreza </Tile>
          <Tile id='Constituição' titulo='Constituição'> Constituição </Tile>
          <Tile id='Inteligência' titulo='inteligência'> Inteligência </Tile>
          <Tile id='Sabedoria' titulo='Sabedoria'> Sabedoria </Tile>
          <Tile id='Carisma' titulo='Carisma'> Carisma </Tile>
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
                  <labe></labe> {/* costomizar a filho com mais elementos se quiser*/}
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

      <ToastContainer/>
    </div>
  );
}

export default Caracteristica;