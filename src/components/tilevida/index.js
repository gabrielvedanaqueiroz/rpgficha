import { useState, useRef } from 'react';
import './tilevida.css';

function TileVida(props){

  const [vidaatual, setVidaAtual] = useState(props.pe_vidaatual);
  const [vidatemp, setVidaTemp] = useState(props.pe_vidatemp);
  const [dadousado, setDadoUsado] = useState(props.pe_vidadadousado);
  const vidabase = useRef(props.pe_vidabase);

  function incrementar(){
    let vida = vidaatual;
    if(vidaatual < vidabase.current)
      ++vida;

    setVidaAtual(vida);
  
    props.incrementar(vida);
  }  

  function decrementar(){
    
    let lvida     = vidaatual;
    let lvidaTemp = vidatemp;

    if(vidatemp > 0)
      --lvidaTemp;
    else
      if(vidaatual > 0)
        --lvida;

    setVidaAtual(lvida);
    setVidaTemp(lvidaTemp);

    props.decrementar(lvida, lvidaTemp);
  }

  function usarDado(e){
    if(e.target.value !== ''){
      setDadoUsado(e.target.value)
      props.usarDado(e.target.value);
    }
    
  }
  
  function setarVidaTemp(e){
    if(e.target.value !== ''){
      setVidaTemp(e.target.value)
      props.vidaTemp(e.target.value);
    }
  }

  return(
    <div className='vd-container'>
      <strong className='vd-titulo'>Vida</strong>
      <div className='vd-valores'>
        <div className='vd-vidaatual'>
          <div className='fi_div-vida'>
          {vidaatual}
          </div>
          <div className='vd-vdatual-botoes'>
            <button className='vd-vdatual-botaomais' onClick={()=>{ incrementar() }}> + </button>
            <button className='vd-vdatual-botaomenos' onClick={()=>{ decrementar() } }> - </button>
          </div>
        </div>
        <div className='vd-vidacentro'>
          <div className='vd-vidatemp'>
            <input className='vd-number-label' type='number' value={vidatemp} onChange={(e)=>{setarVidaTemp(e)}}/>
            <div className='vd-linha'></div>
            Temp
          </div>
          <div className='vd-vidabase'>
            {props.pe_vidabase}
            <div className='vd-linha'></div>
            Max
          </div>
        </div>

        <div className='vd-vidadireita'>
          <div className='vd-vidatemp'>
            <input className='vd-number-label' type='number' value={dadousado} onChange={(e)=>{usarDado(e)}}/>
            <div className='vd-linha'></div>
            Usado
          </div>
          <div className='vd-vidabase'>
            {props.pe_vidadados}
            <div className='vd-linha'></div>
            Dados
          </div>
        </div>

      </div>
    </div>
  );

}

export default TileVida;