import './personagens.css'
import Tile from '../../components/tile'
import {useState, useEffect, useContext} from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs } from 'firebase/firestore';
import {toast} from 'react-toastify';
import { AuthContext } from '../../utils/auth';
import logout from '../../res/logout.svg';
import expandir_mais from '../../res/expandir_mais.svg';
import TilePersonagem from '../../components/tilepersonagem';

function Personagens(){

  const personagemID      = localStorage.getItem('RF@personagemID');
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
        
        listaPost.sort((a, b)=> {
          // a.pe_nome > b.pe_nome
          if(a.pe_nome === personagemID) return -1;
          if(b.pe_nome === personagemID) return 1;
          return a.localeCompare(b);
        });
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

  function onEditar(item){

  }

  function onExcluir(id){

  }

  return(
    <div className='pr_container'>

      <div className='pr_personagens'>
        <div className='pr_titulo'>
          <strong>Personagens</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          {
            lista.map((item)=>{
              return(
                <Tile id={item.pe_id} titulo={item.pe_nome} >
                  <TilePersonagem
                    puso={item.pe_id === personagemID}
                    pclasse='Patrulheiro'
                    praca='Anão'
                    excluir={ ()=>{onExcluir(item.ca_id)} } 
                    editar={ ()=>{onEditar(item)} }
                  /> 
                </Tile>
              );
            })
          }
        </ul>
      </div>
      <div className='pr_div-rodape-botao'>
        <button className='pr_bt-adicionar' >
          <img className='pr_img-adicionar' src={expandir_mais} alt='adicionar uma caracteristica'/>
          Adicionar
        </button>
        <button className='pr_bt-deslogar' onClick={onDeslogar}>
          <img className='pr_img-deslogar' src={logout} alt='Deslogar'/>
          Deslogar 
        </button>
      </div>
    </div>
  );
}

export default Personagens;
