import './ficha.css';
import {auth} from '../../services/firebaseConnection';
import {signOut} from 'firebase/auth';
import { useEffect, useState } from 'react';

function Ficha(){

  const [user, setUser] = useState({});

  useEffect(()=>{

    localStorage.setItem('RF@tela', '2');
    const userDetail = localStorage.getItem('RF@detailUser');
    setUser(JSON.parse(userDetail));

    console.log('desenhou a Ficha');

  },[]);

  async function onDeslogar() {
    await signOut(auth);  
  }

  return(
    <div>

      <div className='fi-container'>
        RGPFicha<br/>
        Usuario UID: {user?.uid}<br/>
        Usuario Email: {user?.email}<br/>

        {/* esse botao esaria na tela de personagens, nao aqui na principal */}
        <br/><button onClick={onDeslogar}> Deslogar </button>
      </div>
      
    </div>
  )
}

export default Ficha;