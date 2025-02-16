import './login.css';
import { useState } from 'react';
import {auth} from '../../services/firebaseConnection';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';

function Login(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if((email !== '') && (senha !== '')){
      await signInWithEmailAndPassword(auth, email, senha)
      .then(()=>{
        navigate('/', {replace:false})
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
    <div className="home-container">
      <h1>RPGFicha</h1>
      <span>Login</span>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />

        <div className='home-div-senha'>
          <input
            id='editSenha'
            type="password"
            placeholder="digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value) }
          />

          <BtnExibirSenha click={onExibirSenha}/>
        </div>

        <button type="submit" >Acessar</button>
      </form>

      <Link className="button-link" to="/registrar">
        Não possui uma conta? Cadastre-se
      </Link>
      <ToastContainer />
    </div>
  );
}

export default Login;