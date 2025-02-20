import './personagens.css'
import Tile from '../../components/tile'
import {useState, useEffect, useContext} from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs } from 'firebase/firestore';
// import {signOut} from 'firebase/auth';
import {toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../utils/auth';

function Personagens(){

  // const personagemID      = localStorage.getItem('RF@personagemID');
  const [lista, setLista] = useState([]);
  const {usuario} = useContext(AuthContext);  
  const {onSingOut} = useContext(AuthContext);

  useEffect(()=>{
    
    async function buscar(){
      
      try {
        const q = query(collection(db, "tb_personagem"), where("pe_idjogador", "==", usuario?.uid.trim()));
        const querySnapshot = await getDocs(q);
        let listaPost = [];

        querySnapshot.forEach((doc)=>{
          listaPost.push({
            pe_id: doc.id.trim(),
            pe_nome: doc.data().pe_nome.trim(),
            // pe_nivel: doc.data().pe_nivel,
                  
          })
        });
        
        listaPost.sort((a, b)=> a.pe_nome > b.pe_nome);
        setLista(listaPost);
      } 
      catch (error) {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      }
      
    }
    buscar();
  },[]);

  async function onDeslogar() {
    await onSingOut();
  }

  return(
    <div className='pr_container'>

      <div className='pr_proficiencias'>
        <div className='pr_titulo'>
          <strong>Personagens</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          {
            lista.map((item)=>{
              return(
                <Tile id={item.pe_id} titulo={item.pe_nome}>
         
                    {item.pe_nome} 
         
                  
                  {/* costomizar a filho com mais elementos se quiser*/}
                </Tile>
              );
            })
          }
        </ul>
      </div>

      <br/><button onClick={onDeslogar}> Deslogar </button>

      <ToastContainer/>
    </div>
  );
}

export default Personagens;
