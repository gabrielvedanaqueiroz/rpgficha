import './ficha.css';
import {auth} from '../../services/firebaseConnection';
import {signOut} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {exibirBarras} from '../../utils';

function Ficha(){

  const [user, setUser] = useState({});

  useEffect(()=>{

    exibirBarras();

    const userDetail = localStorage.getItem('RF@detailUser');
    setUser(JSON.parse(userDetail));

  },[]);

  async function onDeslogar() {
    await signOut(auth);  
  }

  return(
    <div className='fi-container'>
      RGPFicha<br/>
      Usuario UID: {user?.uid}<br/>
      Usuario Email: {user?.email}<br/>

      {/* esse botao esaria na tela de personagens, nao aqui na principal */}
      <br/><button onClick={onDeslogar}> Deslogar </button>
    </div>
  )
}

export default Ficha;