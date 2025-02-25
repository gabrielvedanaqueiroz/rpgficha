import './login.css';
import { useEffect, useContext, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';
import {ocultarBarras} from '../../utils';
import { AuthContext } from '../../utils/auth';

function Login(){

  const navigate = useNavigate();
  const email    = useRef('');
  const senha    = useRef('');
  const {onSingIn, loadingAuth} = useContext(AuthContext);

  useEffect(()=>{
    ocultarBarras();    
  },[]);
  
  async function handleLogin(e) {
    e.preventDefault();

    let lemail = email.current?.value;
    let lsenha = senha.current?.value;
        
    if((lemail.trim() !== '') && (lsenha.trim() !== '')){
      await onSingIn(lemail.trim(), lsenha.trim()).then((resultado)=>{
        if(resultado){
          navigate('/', {replace:true})
        }
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
    <div className="lg-container">
      <h1>RPGFicha</h1>
      <span>Login</span>
      <form className="lg-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          ref={email}
        />

        <div className='lg-div-senha'>
          <input
            id='editSenha'
            type="password"
            placeholder="digite sua senha"
            ref={senha}
          />

          <BtnExibirSenha click={onExibirSenha}/>
        </div>

        <button type="submit" >
          {loadingAuth? 'Conectando..' : 'Acessar'}
        </button>
      </form>

      <Link className="lg-button-link" to="/registrar">
        Não possui uma conta? Cadastre-se
      </Link>
    </div>
  );
}

export default Login;