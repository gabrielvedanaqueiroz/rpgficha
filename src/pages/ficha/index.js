import './ficha.css';
import {auth} from '../../services/firebaseConnection';
import {signOut} from 'firebase/auth';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';

function Ficha(){

  const [user, setUser] = useState({});

  useEffect(()=>{

    const userDetail = localStorage.getItem('@detailUser');
    setUser(JSON.parse(userDetail));

  },[]);

  async function onDeslogar() {
    await signOut(auth);  
  }

  return(
    <div className="admin-container">
      <Header/>

      <div className='fi-container'>
        RGPFicha<br/>
        Usuario UID: {user?.uid}<br/>
        Usuario Email: {user?.email}<br/>
      </div>
      
      <Footer/>
      {/* esse botao esaria na tela de personagens, nao aqui na principal */}
      <br/><button onClick={onDeslogar}> Deslogar </button>
    </div>
  )
}

export default Ficha;