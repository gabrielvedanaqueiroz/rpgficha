import './modalxp.css';
import { useEffect, useState } from 'react';
import BtnSalvarForm from '../btnsalvarform';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { jXPNivel } from '../../utils';

function ModalXP(props){

  const [soma, setSoma] = useState(0);
  const [numero, setNumero] = useState(0);
  const [xplimite, setXPNivel] = useState(0);

  useEffect(()=>{
    let lxpnivel = jXPNivel[props.pe_nivel].xp;
    setXPNivel(lxpnivel);

    atualizarProgresso(props.pe_xp, lxpnivel);
    atualizarProgressoExpectativa(props.pe_xp, lxpnivel);
  }, []);

  function atualizarProgresso(aValor, aXPLimite) {
    alterarElemento('.mxp_nivel-frente', aValor, aXPLimite);
  } 
  
  function atualizarProgressoExpectativa(aValor, aXPLimite) {
    alterarElemento('.mxp_nivel-expectiva', aValor, aXPLimite);
  }  

  function alterarElemento(aElemento, aValor, aXPLimite){
    let graus = (aValor * 100) / aXPLimite;
    document.querySelector(aElemento).style.width = `${graus}%`;
  }

  function onSoma(e){
    
    if (e.target.value !== ''){
      let aux = parseInt(e.target.value);

      if((aux !== null) && (aux !== '')){
        setNumero(e.target.value);
    
        aux = props.pe_xp + aux;
        setSoma(aux);
        atualizarProgressoExpectativa(aux, xplimite);
      } 
    }
    
  }

  function getSoma(){
    let formatado = new Intl.NumberFormat("pt-BR").format(soma);
    return formatado;
  }

  function getXP(){
    let formatado = new Intl.NumberFormat("pt-BR").format(props.pe_xp);
    return formatado;
  }

  async function onSalvar(e) {
    if(soma > 0){
      //salvar banco 

      const docRef = doc(db, "tb_personagem", props.pe_id.trim());
      await updateDoc(docRef, {
        pe_experiencia: soma,
      });
      
      props.onOcultar();
    }
  }

  return(
    <div className='overlay' key={props.pe_id}>
      <div className='mxp_container'>
        <div className='mxp_titulo'>
          <strong>Experiência</strong>
        </div>
        <form className='mxp_form' action={(e)=>{onSalvar(e)}}>
          <div className='mxp_div-item'>
            <label>Nível:</label> 
            <label>{props.pe_nivel}</label>
          </div>
          <div className='mxp_nivel-fundo'>
            <div className='mxp_nivel-frente'/>
            <div className='mxp_nivel-expectiva'/>
          </div>
          <div className='mxp_div-item'>
            <label>Atual:</label>
            <label>{getXP()}</label>
          </div>
          <input className='mxp_edit' type='number' value={numero} onChange={(e)=>{ onSoma(e) }}/>
          <div className='mxp_div-item'>
            <label>Total=</label>
            <label>{getSoma()} </label>
          </div>
          <div className='mxp_botoes'>
            <button className='mxp_btn-cancelar' onClick={()=>{props.onOcultar()}}>Voltar</button>
            <BtnSalvarForm esperando='Salvando...' inicial='Salvar'/>
          </div>
        </form>
      </div>

    </div>
  )

}

export default ModalXP;

// function atualizarProgresso(porcentagem) {
  //   let graus = (porcentagem / 100) * 360;
  //   document.querySelector('.progress-circle').style.background = 
  //     `conic-gradient(red 0deg ${graus}deg, lightgray ${graus}deg 360deg)`;
  // }  


    // <div>
    //       xp
    //       <div class="progress-circle"/>
    //     </div> 