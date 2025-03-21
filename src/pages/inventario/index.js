import './inventario.css';
import Tile from '../../components/tile';
import { useState, useEffect } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BtnAdicionar from '../../components/btnadicionar';
import TileCaracteristica from '../../components/tilecaracteristica';
import Vazio from '../../components/vazio';
import BtnSalvarForm from '../../components/btnsalvarform';
import {buscarPersonagem, getIDPersonagem} from '../../utils';
import Loading from '../../components/loading/';
import Titulo from '../../components/titulo';

function Inventario(){

  const [temPersonagem, setTemPersonagem] = useState(false);
  const [personagem, setPersonagem] = useState({});

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  /* modal */
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idItem, setIdItem] = useState('');

  useEffect(()=>{

    async function buscar(aID){

      let pers = await buscarPersonagem(aID);
      setPersonagem(pers);

      let temP = pers !== null;

      setTemPersonagem(temP);

      const q = query(collection(db, "tb_inventario"), where("in_idpersonagem", "==", aID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
          lista.push({
            in_id: doc.id.trim(),
            in_nome: doc.data().in_nome.trim(),
            in_descricao: doc.data().in_descricao.trim(),
          })
        });
        lista.sort((a, b)=> a.in_nome > b.in_nome);
    
        setLista(lista);
        
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar inventario'+error); 
        setLoading(false);
      }
      
    }

    const [id, tempId] = getIDPersonagem();
    if(tempId)
      buscar(id);
    else
      setLoading(false);

    // console.log('i');
  },[lista]);

  async function onExcluir(id){
    const docRef = doc(db, "tb_inventario", id);
    await deleteDoc(docRef)
    .then(()=>{
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  }

  function onEditar(item){
    setNome(item.in_nome.trim());
    setDescricao(item.in_descricao.trim());
    setIdItem(item.in_id.trim());
    setIsOpen(true);
  }

  function onFecharModal(){
    setNome('');
    setDescricao('');
    setIdItem('');
    setIsOpen(false)
  }

  async function onSalvar(e) {

    e.preventDefault();

    if((nome.trim() !== '') && (descricao.trim() !== '')){

      if(idItem.trim() === ''){     // inserir
        await addDoc(collection(db, 'tb_inventario'),{
          in_idpersonagem: personagem.pe_id.trim(),
          in_nome: nome.trim(),
          in_descricao: descricao.trim(),
        })
        .then( () =>{
          onFecharModal();
        })
        .catch((error)=>{
          console.log('Erro ao inserir; '+error);
          toast.error('Erro ao inserir');
        });
      }
      else{                                     //editar
        const docRef = doc(db, "tb_inventario", idItem);
          await updateDoc(docRef, {
            in_nome: nome.trim(),
            in_descricao: descricao.trim(),
          }
        )
        .then(()=>{
          onFecharModal();
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

  if(loading)
    return(<Loading/>); 

  return(
    (!temPersonagem)? <Vazio/>:
    <div className='it-container'>
      <div>
        <Titulo titulo='Inventário'/>
        <ul>
          {
            lista.map((item)=>{
              return(
                <Tile id={'prp'+item.in_id} titulo={item.in_nome}>
                  <TileCaracteristica 
                    descricao={item.in_descricao} 
                    excluir={ ()=>{ onExcluir(item.in_id) }} 
                    editar={ ()=>{ onEditar(item) }}
                  /> 
                </Tile>
              );
              
            })
          }
        </ul>
         
      </div>

      <BtnAdicionar alt='adicinoar novo item' adicionar={()=>{ 
        setNome('');
        setDescricao('');
        setIdItem('');
        setIsOpen(true) }
      }/>

      {/* Tela Flutuante */}
      {isOpen && (
        <div className="overlay">
          <div className='min_container'>
            <div className='min_titulo'>
              <strong >Item</strong>
            </div>
            <form className='min_form' onSubmit={onSalvar}>
              <div className='min_div-edit'>
                <label>Título</label>
                <input className='min_edit' placeholder='Digite um título' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
              </div>
              <div className='min_div-edit'>
                <label>Descrição</label>
                <textarea className='min_edit' placeholder='Digite uma descrição' value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}/>
              </div>
              <div className='min_botoes'>
                <button className='min_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>Cancelar</button>
                <BtnSalvarForm esperando='Salvando...' inicial='Salvar'/>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    
  );
}

export default Inventario;