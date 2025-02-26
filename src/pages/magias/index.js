import './magias.css';
import Tile from '../../components/tile';
import BtnAdicionar from '../../components/btnadicionar';
import { useState, useEffect } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TileTelaMagia from '../../components/tiletelamagia';

function Magias(){
  
  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscar(){
    const q = query(collection(db, "tb_magia"), where("mg_idpersonagem", "==", personagemID.trim()));
    const querySnapshot = await getDocs(q); 
    let lista = [];

    try {
      querySnapshot.forEach((doc)=>{
        lista.push({
          mg_id: doc.id.trim(),
          mg_nome: doc.data().mg_nome.trim(),
          mg_descricao: doc.data().mg_descricao.trim(),
          mg_alcance: doc.data().mg_alcance.trim(),
          mg_componentes: doc.data().mg_componentes.trim(),
          mg_dano: doc.data().mg_dano.trim(),
          mg_duracao: doc.data().mg_duracao.trim(),
          mg_nivel: doc.data().mg_nivel,
          mg_preparada: doc.data().mg_preparada,
          mg_tempoconjuracao: doc.data().mg_tempoconjuracao.trim(),
        })
      });
      lista.sort((a, b)=> a.mg_nivel > b.mg_nivel);
  
      setLista(lista);
    } catch (error) {
      toast.error('Erro ao carregar magias'+error); 
    }
    
  }

  useEffect(()=>{

    buscar();

    setLoading(false);
  },[]);

  if(loading)
    return <div>carregand...</div>

  async function onExcluir(id){
    const docRef = doc(db, "tb_magia", id);
    await deleteDoc(docRef)
    .then(()=>{
      buscar();
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    }); 
  }

  async function onPreparar(id, preparada){
    const docRef = doc(db, "tb_magia", id);
    await updateDoc(docRef, {
      mg_preparada: !preparada,
    })
    .then(()=>{
      buscar();
    })
    .catch((error)=>{
      console.log('Erro ao editar: '+error);
      toast.error('Erro ao editar');
    });
  }

  function onEditar(item){

  }

  return(
    <div className='mg-container'>  

      <div>

        <div className='mg-titulo'>
          <strong>Magias Preparadas</strong>
          <hr/>
        </div>
        <ul>
          {
            lista.map((item)=>{

              if(item.mg_preparada){
                return(
                  <Tile id={'prp'+item.mg_id} titulo={item.mg_nome}>
                    <TileTelaMagia 
                      mg_id={item.mg_id} 
                      mg_descricao={item.mg_descricao} 
                      mg_nivel={item.mg_nivel} 
                      mg_tempoconjuracao={item.mg_tempoconjuracao} 
                      mg_alcance={item.mg_alcance} 
                      mg_componentes={item.mg_componentes} 
                      mg_duracao={item.mg_duracao} 
                      mg_preparada={item.mg_preparada} 
                      excluir={ ()=>{ onExcluir(item.mg_id) }} 
                      preparar={()=>{ onPreparar(item.mg_id, item.mg_preparada) }}
                      editar={()=>{ onEditar(item) }} 
                    />
                  </Tile>
                );
              }
            })
          }
        </ul>
         
      </div>

      <div>

        <div className='mg-titulo'>
          <strong>Magias Conhecidas</strong>
          <hr/>
        </div>
        <ul>
          {
            lista.map((item)=>{

              return(
                <Tile id={'cnc'+item.mg_id} titulo={item.mg_nome}>
              
                  <TileTelaMagia 
                    mg_id={item.mg_id} 
                    mg_descricao={item.mg_descricao} 
                    mg_nivel={item.mg_nivel} 
                    mg_tempoconjuracao={item.mg_tempoconjuracao} 
                    mg_alcance={item.mg_alcance} 
                    mg_componentes={item.mg_componentes} 
                    mg_duracao={item.mg_duracao} 
                    mg_preparada={item.mg_preparada} 
                    excluir={ ()=>{ onExcluir(item.mg_id) }} 
                    preparar={()=>{ onPreparar(item.mg_id, item.mg_preparada) }}
                    editar={()=>{ onEditar(item) }} 
                  />
              
                </Tile>
              );
            })
          }
        </ul>
         
      </div>

      <BtnAdicionar alt='adicinoar nova magia' adicionar={()=>{}}/>
    </div>
  );
}

export default Magias;