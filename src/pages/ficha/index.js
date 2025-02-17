import './ficha.css';
import {auth, db} from '../../services/firebaseConnection';
import {doc, getDoc, snapshotEqual} from 'firebase/firestore';
import {signOut} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {exibirBarras} from '../../utils';
import {toast, ToastContainer } from 'react-toastify';

function Ficha(){

  const [user, setUser] = useState({});
  const personagemID    = 'Ph3YdE5qOua601u0m0Wj'; //localStorage.getItem('RF@personagemID');//pegar id do personagem ativo do localstorage
  const [personagen, setPersonagem] = useState({});

  useEffect(()=>{

    exibirBarras();

    const userDetail    = localStorage.getItem('RF@detailUser');
    setUser(JSON.parse(userDetail));

    async function buscar() {

      const ref = doc(db, 'tb_personagem', personagemID);
      await getDoc(ref)
      .then((snapshot) =>{

          console.log(snapshot.data());

          if(snapshot.exists){
            setPersonagem({
              pe_id: snapshot.id.trim(),
              pe_nome: snapshot.data().pe_nome.trim(),
            });
          }
          
      })
      .catch((error) => {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      })
      
    }

    buscar();

  },[]);

  async function onDeslogar() {
    await signOut(auth);  
  }

  return(
    <div className='fi-container'>
      RGPFicha<br/>
      Usuario UID: {user?.uid}<br/>
      Usuario Email: {user?.email}<br/>
      Personagen nome: {personagen.pe_nome}

      {/* esse botao esaria na tela de personagens, nao aqui na principal */}
      <br/><button onClick={onDeslogar}> Deslogar </button>

      <ToastContainer/>
    </div>
  )
}

export default Ficha;