"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db } from "@/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

type AuthUser = {
  id: string;
  email: string;
  nome: string;
};

type AuthContextData = {
  usuario: AuthUser | null;
  loadingAuth: boolean;
  onSingIn: (email: string, senha: string) => Promise<boolean>;
  onSingOut: () => void;
  onCriarUsuario: (email: string, senha: string, nome: string) => Promise<boolean>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  
  const [signed, setSigned]           = useState<boolean>(false);
  const [usuario, setUsuarioInterno]  = useState<AuthUser| null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);  

  async function onSingIn(email : string, senha: string){
    setLoadingAuth(true);

    return await signInWithEmailAndPassword(auth, email, senha)  //logar no firebase authentication
      .then((userCredential)=>{

        const userData ={
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          nome : userCredential.user.displayName,
        };

        localStorage.setItem('RF@detailUser', JSON.stringify(userData));
        setUsuarioInterno({
          id: userCredential?.user?.uid||"",
          email: userCredential?.user?.email||"",
          nome : userCredential?.user.displayName||"",
        });

        setLoadingAuth(false);
        setSigned(true);
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
    localStorage.setItem('RF@detailUser', JSON.stringify({}));
    await signOut(auth);  //metodo pra deslogar do firebase authentication
  }

  async function onSalvarJogador(id: string, nome: string, onClose:()=>void) {

    await addDoc(collection(db, 'tb_jogador'),{
      jo_idlogin : id.trim(),
      jo_nome : nome.trim(),
    })
    .then( () =>{
      onClose();
      return true;
    })
    .catch((error)=>{
      console.log('Erro ao inserir; '+error);
      toast.error('Erro ao inserir');
      return false;
    });  
  }

  async function onCriarUsuario(email: string, senha: string, nome: string){

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
      });  
      
      updateProfile(userCredential.user, {
        displayName: nome
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

  return(
    <AuthContext.Provider
      value={{
        // signed,
        usuario,
        loadingAuth,
        // setUsuario,
        onSingIn, 
        onSingOut,
        onCriarUsuario,
        // onCheckLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook opcional para facilitar o uso
 */
export function useAuth() {
  return useContext(AuthContext);
}
