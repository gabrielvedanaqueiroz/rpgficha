import {useEffect, useContext} from "react"; 
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../utils/auth';

function Private({children}){

  const {onCheckLogin, signed, loadingAuth} = useContext(AuthContext);
  
  useEffect(()=>{

    onCheckLogin();
    
  }, []);

  if(loadingAuth){
    return(<div></div>);
  }

  if(!signed){
    return <Navigate to='/login' />
  }
  
  return children;
}

export default Private;