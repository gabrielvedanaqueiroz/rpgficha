import './registrar.css';
import { useState, useEffect } from 'react';
import {auth} from '../../services/firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';
import {ocultarBarras} from '../../utils';

function Login(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    ocultarBarras();    
  },[]);

  async function handleLogin(e) {
    e.preventDefault();

    if((email !== '') && (senha !== '')){
      await createUserWithEmailAndPassword(auth, email, senha)
      .then(()=>{
        setEmail('');
        setSenha('');
        navigate('/', {replace:true})
      })
      .catch((error)=>{
        console.error('Erro ao efetuar login: '+ error);
        toast.error('Erro ao efetuar login')
      })
    }
    else
      toast.error('Preencha todos os campos');
  }

  function onExibirSenha(){
    let senha = document.getElementById("editSenha");
    
    if(senha.type === "password")
      senha.type = "text";
    else
      senha.type = "password"; 
  }

  return(
    <div className='rg-container'>
      <h1>RPGFicha</h1>
      <span>Crie seu usuário</span>
      <form className='rg-form' onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value) }
          />

        <div className='rg-div-senha'>
          <input
            id='editSenha'
            type="password"
            placeholder="digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value) }
          />

          <BtnExibirSenha click={onExibirSenha}/>
        </div>
        <button type="submit" >Criar</button>
      </form>
      
      <ToastContainer />
    </div>
  );
}

export default Login;