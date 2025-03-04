import './personagens.css'
import Tile from '../../components/tile'
import {useState, useEffect, useContext} from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import { AuthContext } from '../../utils/auth';
import logout from '../../res/logout.svg';
import TilePersonagem from '../../components/tilepersonagem';
import BtnAdicionar from '../../components/btnadicionar';
import {useNavigate} from 'react-router-dom';

function Personagens(){
  
  const [temPersonagemId, setTemPersonagemId] = useState(false);

  const [personagemID, setPersonagemId] = useState('');  
  const [lista, setLista] = useState([]);
  const {usuario} = useContext(AuthContext);  
  const {onSingOut} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [nomeJogador, setNomeJogador] = useState('');
  
  const navigate = useNavigate();

  useEffect(()=>{

    // let id = localStorage.getItem('RF@personagemID');
   
    // setTemPersonagemId(id !== null);

    // if(temPersonagemId){ //se nao ta nulo mas pode nao ter valor
    //   setTemPersonagemId(id.length > 0);

    //   if(temPersonagemId)
    //     setPersonagemId(id);
    // }
    async function buscar(){
      
      let LId = '';
      
      try {
        const q = query(collection(db, "tb_personagem"), where("pe_idjogador", "==", usuario?.uid.trim()));
        const querySnapshot = await getDocs(q);
        let listaPost = [];
  
        querySnapshot.forEach((doc)=>{
          if(doc.exists){
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
              pe_ativo : doc.data().pe_ativo,
            });
  
            if(doc.data().pe_ativo===true){
              LId = doc.id.trim();
              setPersonagemId(LId);
              setTemPersonagemId(true);
            }
              
          }
        });
        
        if(temPersonagemId)
          listaPost.sort((a, b)=> {
            if(a.pe_id === LId.trim()) return -1;
            if(b.pe_id === LId.trim()) return 1;
        });

        setLista(listaPost);
      } 
      catch(error) {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      }
      
      buscarJogador();
      
    }
  
    async function buscarJogador() {
      
      try {
        const q = query(collection(db, "tb_jogador"), where("jo_idlogin", "==", usuario?.uid.trim()));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc)=>{
          setNomeJogador(doc.data().jo_nome);
        });
        
      } 
      catch (error) {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      }
      
      setLoading(false);
    }

    buscar();

    console.log('p');
  },[lista]);

  async function onDeslogar() {
    await onSingOut();
    navigate('/login', {replace:true});
  }

  function onEditar(item){
    alert('EM CONSTRUÇÃO');
  }

  async function onExcluir(id){
    const docRef = doc(db, "tb_personagem", id);
    await deleteDoc(docRef)
    .then(()=>{
      // buscar();
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  }

  async function onSelecionar(id){
    localStorage.setItem('RF@personagemID', id); 
    navigate('/', {replace:true});

    if(temPersonagemId){ 

      // primeiro fazer um updateDoc no personagemID pode ja ter um ativo
      const docAtivo = doc(db, "tb_personagem", personagemID);
      await updateDoc(docAtivo, {
          pe_ativo: false,
        }
      );
    }
    
    const docRef = doc(db, "tb_personagem", id);
    await updateDoc(docRef, {
        pe_ativo: true,
      }
    )
    .then(()=>{
      navigate('/', {replace:true});
    })
    .catch((error)=>{
      console.log('Erro ao selecionar: '+error);
      toast.error('Erro ao selecionar');
    });
  }

  if(loading)
    return <div>carregand...</div>

  return(
    <div className='pr_container'>

      <div className='pr_personagens'>
        <div className='pr_titulo'>
          <strong>Personagens</strong>
          <hr key='linhapersonagens'/>
        </div>
        <ul className='cr_lista'>
          {
            lista.map((item)=>{
              return(
                <Tile id={item.pe_id} titulo={item.pe_nome} >
                  <TilePersonagem
                    pid={item.pe_id}
                    pclasse={item.pe_classe}
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
                    selecionar={ ()=>{onSelecionar(item.pe_id)}}
                  /> 
                </Tile>
              );
            })
          }
        </ul>
      </div>
      <Tile id={usuario?.uid.trim()} titulo={'Usuário'} >
        <div className='pr_usuario'>
          <label>{nomeJogador}</label>
          <label>e-mail: {usuario?.email}</label>
          
          <button className='pr_bt-deslogar' onClick={onDeslogar}>
            <img className='pr_img-deslogar' src={logout} alt='Deslogar'/>
            Deslogar 
          </button>
        </div>
      </Tile> 

      <BtnAdicionar alt='adicionar um personagem' adicionar={()=>{
        navigate('/personagem-criacao-topo', {replace:false});
      }}/>
    </div>
  );
}

export default Personagens;
