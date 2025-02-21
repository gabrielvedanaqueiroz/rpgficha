import './login.css';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';
import {ocultarBarras} from '../../utils';
import { AuthContext } from '../../utils/auth';

function Login(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const {onSingIn, loadingAuth} = useContext(AuthContext);

  useEffect(()=>{
    ocultarBarras();    
  },[]);
  
  async function handleLogin(e) {
    e.preventDefault();

    if((email !== '') && (senha !== '')){
      await onSingIn(email, senha).then((resultado)=>{
        if(resultado){
          setEmail('');
          setSenha('');
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
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />

        <div className='lg-div-senha'>
          <input
            id='editSenha'
            type="password"
            placeholder="digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value) }
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