import { useState, useEffect, useContext} from "react"; 
import {auth} from '../services/firebaseConnection';
import {onAuthStateChanged} from 'firebase/auth';
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../utils/auth';

function Private({children}){

  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const {setUsuario} = useContext(AuthContext);

  useEffect(()=>{

    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user)=>{
        
        if(user){
          const userData ={
            uid: user.uid,
            email: user.email,
          }

          setUsuario(userData);
          localStorage.setItem('RF@detailUser', JSON.stringify(userData));
          localStorage.setItem('RF@personagemID', 'Ph3YdE5qOua601u0m0Wj'); //trocar
          setLoading(false);
          setSigned(true);
        }
        else{
          setLoading(false);
          setSigned(false);
        }

      });
    }

    checkLogin();
  }, []);

  if(loading){
    return(<div></div>);
  }

  if(!signed){
    return <Navigate to='/login' />
  }
  return children;
}

export default Private;