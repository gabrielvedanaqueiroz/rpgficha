import './magias.css';
import Tile from '../../components/tile';
import BtnAdicionar from '../../components/btnadicionar';
import { useState, useEffect } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TileCaracteristica from '../../components/tilecaracteristica';

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
                    <TileCaracteristica 
                      descricao={item.mg_descricao} 
                      excluir={ ()=>{
                        // onExcluir(item.ca_id) 
                      }} 
                      editar={()=>{
                        // onEditar(item) 
                      }} 
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
              
                    {item.mg_descricao} <br/>
                    Nível: {item.mg_nivel} <br/>
                    Tempo: {item.mg_tempoconjuracao} <br/>
                    Alcance: {item.mg_alcance} <br/>
                    Componentes: {item.mg_componentes} <br/>
                    Duração: {item.mg_duracao} <br/>
                    {item.mg_preparada?'Preparada': 'Conhecida'}<br/>
              
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