import { useState, createContext } from "react";
import {auth} from '../services/firebaseConnection';
import {signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import {toast, ToastContainer} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

  const [usuario, setUsuarioInterno] = useState(null);

  function setUsuario(aUsuario){
    setUsuarioInterno(aUsuario);
  }

  const onSingIn = async (email, senha) =>{
    
    return await signInWithEmailAndPassword(auth, email, senha)  //logar no firebase authentication
      .then((userCredential)=>{

        const userData ={
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        localStorage.setItem('RF@detailUser', JSON.stringify(userData));
        setUsuarioInterno(userData);
        return true;
      })
      .catch((error)=>{
        console.error("Erro: ", error.code +" Mensagem do erro: ", error.message);
        toast.error('Erro ao efetuar login');
        return false;

        // auth/invalid-email	O email está no formato incorreto.
        // auth/user-disabled	A conta do usuário foi desativada.
        // auth/user-not-found	O email não está cadastrado.
        // auth/wrong-password	A senha está incorreta.

        // if (error.code === "auth/wrong-password") {
        //   alert("Senha incorreta!");
        // }
      })
  };

  const onSingOut = async()=>{
    await signOut(auth);  //metodo pra deslogar do firebase authentication
  }

  const onCriarUsuario = async(email, senha) =>{
    return await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      console.error('Erro ao efetuar login: '+ error);
      toast.error('Erro ao efetuar login');
      return false;
    })
  }

  return(
    <AuthContext.Provider
      value={{
        // signed: !!usuario, //duas exclamacao converte pra boleano e faz o teste
        usuario,
        setUsuario,
        onSingIn, 
        onSingOut,
        onCriarUsuario,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default AuthProvider