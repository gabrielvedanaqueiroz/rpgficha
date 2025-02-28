import './personagem-criacao-proficiencias.css';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';

function PersonagemCriacaoProficiencia() {

  const navigate = useNavigate();

  const proacrobacia = useRef(false);
  const prolidaranimais = useRef(false);
  const proarcanismo = useRef(false);
  const proatletismo = useRef(false);
  const proatuacao = useRef(false);
  const problefar = useRef(false);
  const profurtividade = useRef(false);
  const prohistoria = useRef(false);
  const prointimidacao = useRef(false);
  const prointuicao = useRef(false);
  const proinvestigacao = useRef(false);
  const promedicina = useRef(false);
  const pronatureza = useRef(false);
  const propersuasao = useRef(false);
  const proprestidigitacao = useRef(false);
  const propercepcao = useRef(false);
  const proreligiao = useRef(false);
  const prosobrevivencia = useRef(false);

  const personagemID  = localStorage.getItem('RF@personagemID');

  async function onAvancar(e){
  
    e.preventDefault();
    let valido = false;

    valido = proacrobacia?.current;
    valido = valido && prolidaranimais?.current;
    valido = valido && proarcanismo?.current;
    valido = valido && proatletismo?.current;
    valido = valido && proatuacao?.current;
    valido = valido && problefar?.current;
    valido = valido && profurtividade?.current;
    valido = valido && prohistoria?.current;
    valido = valido && prointimidacao?.current;
    valido = valido && prointuicao?.current;
    valido = valido && proinvestigacao?.current;
    valido = valido && promedicina?.current;
    valido = valido && pronatureza?.current;
    valido = valido && propersuasao?.current;
    valido = valido && proprestidigitacao?.current;
    valido = valido && propercepcao?.current;
    valido = valido && proreligiao?.current;
    valido = valido && prosobrevivencia?.current;

    if(valido){
      const docRef = doc(db, "tb_personagem", personagemID);
      await updateDoc(docRef, {
          pe_proacrobacia: proacrobacia,
          // pe_destreza: ldestreza.trim(),
          // pe_constituicao: lconstituicao.trim(),
          // pe_inteligencia: linteligencia.trim(),
          // pe_sabedoria: lsabedoria.trim(),
          // pe
      })
      .then( () =>{
        navigate('/personagem-criacao-vida', {replace:true});
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });

    }
    else{
      toast.error('Campos obrigatorios nao preenchidos');
    }
    
  }

  return(
    <div className='pct_container'>
      <div className='pct_titulo'>
        <strong>Criação de Personagem</strong>
        <hr/>
      </div>
      <span>Escolha suas pericias</span>
      
      <form className='pcp_form' onSubmit={onAvancar}>
        <div className='pcp_edit-top'>
          <input type="checkbox" ref={proacrobacia}>Acrobacia</input>
        </div>
        
       
        
        <div className='pcp_edit-top'>
          <input type="checkbox" placeholder='Antecedente' />
        </div>
        <div className='pcp_edit-bottom'>
        
        </div>
        
        <div className='pcp_div-rodape-botao'>
          <BtnSalvarForm esperando='Salvando..' inicial='Avançar >>>'/>
        </div>

      </form>
    </div>
  );

}

export default PersonagemCriacaoProficiencia;