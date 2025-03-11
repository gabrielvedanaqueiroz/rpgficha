import './registrar.css';
import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import BtnExibirSenha from '../../components/btnexibirsenha';
import {ocultarBarras} from '../../utils';
import {AuthContext} from '../../utils/auth';
import BtnRegistrarForm from '../../components/btnregistrarform';

function Login(){

  const email = useRef('');
  const senha = useRef('');
  const nome  = useRef('');
  const navigate = useNavigate();
  const {onCriarUsuario} = useContext(AuthContext);
  
  useEffect(()=>{
    ocultarBarras();    
  },[]);

  async function onSalvar(e) {

    let lemail  = email.current?.value;
    let lsenha  = senha.current?.value;
    let lnome   = nome.current?.value;

    if((lemail.trim() !== '') && (lsenha.trim() !== '') && (lnome.trim() !== '')){

      onCriarUsuario(lemail, lsenha, lnome)
      .then(()=>{         
          navigate('/', {replace:true})
          return true;
      })
      .catch((error)=>{
        toast.error('Erro ao registar');
        console.log(error);
        return false;
      });

    }
    else{
      toast.error('Preencha todos os campos');
      return true;
    }
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
      <form className='rg-form' action={onSalvar}>
        
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
        <BtnRegistrarForm/>
      </form>
      
    </div>
  );
}

export default Login;