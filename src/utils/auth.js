import { useState, createContext, useEffect } from "react";
import {auth, db} from '../services/firebaseConnection';
import {
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
} from 'firebase/auth';
import {collection, addDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

  const [usuario, setUsuarioInterno] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(()=>{
    const LUsuario  = localStorage.getItem('RF@detailUser');
    setUsuario(JSON.parse(LUsuario));
  },[]);
  
  function setUsuario(aUsuario){
    setUsuarioInterno(aUsuario);
  }

  const onSingIn = async (email, senha) =>{
    setLoadingAuth(true);

    return await signInWithEmailAndPassword(auth, email, senha)  //logar no firebase authentication
      .then((userCredential)=>{

        const userData ={
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        localStorage.setItem('RF@detailUser', JSON.stringify(userData));
        setUsuarioInterno(userData);
        setLoadingAuth(false);
        return true;
      })
      .catch((error)=>{
        console.error("Erro: ", error.code +" Mensagem do erro: ", error.message);

        setLoadingAuth(false);

        let msg = '';
        switch(error.code){
          case "auth/invalid-email":
            msg = 'O email está no formato incorreto.';
            break;
          case "auth/user-disabled":
            msg = 'A conta do usuário foi desativada.';
            break;
          case "auth/user-not-found":
            msg = 'O email não está cadastrado.';
            break;
          case "auth/wrong-password":
            msg = 'Usuário ou senha está incorreta.'
            break;
          case "auth/invalid-credential":
            msg = 'Usuário ou senha está incorreta.';
            break;
          default:
            msg = 'Erro desconhecido';
            break;
        }
        toast.error('Erro ao efetuar login: '+msg);
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
    setUsuario(null);
  }

  async function onSalvarJogador(id, nome, fechar) {

    await addDoc(collection(db, 'tb_jogador'),{
      jo_idlogin : id.trim(),
      jo_nome : nome.trim(),
    })
    .then( () =>{
      fechar();
      return true;
    })
    .catch((error)=>{
      console.log('Erro ao inserir; '+error);
      toast.error('Erro ao inserir');
      return false;
    });  
  }

  const onCriarUsuario = async(email, senha, nome) =>{

    setLoadingAuth(true);

    return await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential)=>{

      const userData ={
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        nome: nome.trim(),
      };

      onSalvarJogador(userCredential.user.uid, nome, ()=>{
        setLoadingAuth(false);
        localStorage.setItem('RF@detailUser', JSON.stringify(userData));
        setUsuarioInterno(userData);
      });
      
      return true;
    })
    .catch((error)=>{
      setLoadingAuth(false);
      console.error('Erro ao registrar: '+ error);
      toast.error('Erro ao registar');
      return false;

      // auth/invalid-email
    })
  }

  const onCheckLogin = async()=>{
    return onAuthStateChanged(auth, (user)=>{
        
      if(user){
        const userData ={
          uid: user.uid,
          email: user.email,
        }

        setUsuario(userData);
        localStorage.setItem('RF@detailUser', JSON.stringify(userData));
        localStorage.setItem('RF@personagemID', 'Ph3YdE5qOua601u0m0Wj'); //trocar
        setLoadingAuth(false);
      }
      else{
        setLoadingAuth(false);
      }

    });
  }

  return(
    <AuthContext.Provider
      value={{
        signed: !!usuario, //duas exclamacao converte pra boleano e faz o teste
        usuario,
        setUsuario,
        onSingIn, 
        onSingOut,
        onCriarUsuario,
        loadingAuth,
        onCheckLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;