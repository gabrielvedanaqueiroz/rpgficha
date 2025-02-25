import './registrar.css';
import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';
import {ocultarBarras} from '../../utils';
import {AuthContext} from '../../utils/auth';

function Login(){

  const email = useRef('');
  const senha = useRef('');
  const nome  = useRef('');
  const navigate = useNavigate();
  const {onCriarUsuario, loadingAuth} = useContext(AuthContext);
  
  useEffect(()=>{
    ocultarBarras();    
  },[]);

  async function handleLogin(e) {
    e.preventDefault();

    let lemail = email.current?.value;
    let lsenha = senha.current?.value;

    if((lemail.trim() !== '') && (lsenha.trim() !== '')){

      onCriarUsuario(email, senha)
      .then(()=>{
          // setEmail('');
          // setSenha('');
          // setNome('');
          navigate('/', {replace:true})
      });

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
            placeholder="Digite seu nome..."
            ref={nome}
          />

        <input
            type="text"
            placeholder="Digite seu email..."
            ref={email}
          />

        <div className='rg-div-senha'>
          <input
            id='editSenha'
            type="password"
            placeholder="digite sua senha"
            ref={senha}
          />

          <BtnExibirSenha click={onExibirSenha}/>
        </div>
        <button type="submit">
          {loadingAuth? 'Criando..' : 'Acessar'}
        </button>
      </form>
      
    </div>
  );
}

export default Login;