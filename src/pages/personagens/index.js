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
  const [loading, setLoading] = useState(true);

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
            pe_nivel: doc.data().pe_nivel,
            pe_catotal: doc.data().pe_catotal,
            pe_vidaatual: doc.data().pe_vidaatual,
            pe_raca: doc.data().pe_raca.trim(),
            pe_subraca: doc.data().pe_subraca.trim(),
            pe_classe: doc.data().pe_classe.trim(),
            pe_subclasse: doc.data().pe_subclasse.trim(),      
            pe_tendencia: doc.data().pe_tendencia.trim(),      
            pe_antecedente: doc.data().pe_antecedente.trim(),
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
      
      setLoading(false);
      
    }
    buscar();
  },[personagemID, usuario]);

  async function onDeslogar() {
    await onSingOut();
  }

  function onEditar(item){
    alert(item.pe_nome);
  }

  function onExcluir(id){
    alert(id);
  }

  if(loading)
    return <div>carregand...</div>

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
                    praca={item.pe_raca}
                    psubclasse={item.pe_subclasse}
                    psubraca={item.pe_subraca}
                    pvida={item.pe_vidaatual}
                    pnivel={item.pe_nivel}
                    pantecedente={item.pe_antecedente}
                    ptendencia={item.pe_tendencia}
                    pcatotal={item.pe_catotal}
                    excluir={ ()=>{onExcluir(item.pe_id)} } 
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
