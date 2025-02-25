import './inventario.css';
import Tile from '../../components/tile';
import { useState, useEffect } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BtnAdicionar from '../../components/btnadicionar';
import TileCaracteristica from '../../components/tilecaracteristica';

function Inventario(){

  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscar(){
    const q = query(collection(db, "tb_inventario"), where("in_idpersonagem", "==", personagemID.trim()));
    const querySnapshot = await getDocs(q); 
    let lista = [];

    try {
      querySnapshot.forEach((doc)=>{
        lista.push({
          mg_id: doc.id.trim(),
          in_nome: doc.data().in_nome.trim(),
          in_descricao: doc.data().in_descricao.trim(),
        })
      });
      lista.sort((a, b)=> a.in_nome > b.in_nome);
  
      setLista(lista);
    } catch (error) {
      toast.error('Erro ao carregar inventario'+error); 
    }
    
  }

  useEffect(()=>{

    buscar();

    setLoading(false);
  },[]);

  if(loading)
    return <div>carregand...</div>

  return(
    <div className='it-container'>

      <div>

        <div className='it-titulo'>
          <strong>Inventário</strong>
          <hr/>
        </div>
        <ul>
          {
            lista.map((item)=>{
              return(
                <Tile id={'prp'+item.mg_id} titulo={item.in_nome}>
                  <TileCaracteristica 
                    descricao={item.in_descricao} 
                    excluir={ ()=>{ 
                      // onExcluir(item.ca_id) 
                    }} 
                    editar={ ()=>{
                      // onEditar(item)
                    }}
                  /> 
                </Tile>
              );
              
            })
          }
        </ul>
         
      </div>

      <BtnAdicionar alt='adicinoar novo item' adicionar={()=>{}}/>

    </div>
  );
}

export default Inventario;