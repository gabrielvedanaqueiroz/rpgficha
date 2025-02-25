import { useState } from 'react';
import './tilevida.css';

function TileVida(props){

  const [vidaatual, setVidaAtual] = useState(props.pe_vidaatual);
  const [vidatemp, setVidaTemp] = useState(props.pe_vidatemp);
  const [vidabase, setVidaBase] = useState(props.pe_vidabase);
  const [dadousado, setDadoUsado] = useState(props.pe_vidadadousado);

  function incrementar(){
    let vida = vidaatual;
    if(vidaatual < vidabase)
      ++vida;

    setVidaAtual(vida);

    props.incrementar(vidaatual);
  }  

  function incrementarValor(aValor){
    if(vidaatual < vidabase){
        
      vidaatual = vidaatual + aValor;

      if(vidaatual > vidabase)
        vidaatual = vidabase;

    }

    props.incrementar(vidaatual);
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

    props.decrementar(vidaatual, vidatemp);
  }

  function decrementarValor(aValor){

    let lvida     = vidaatual;
    let lvidaTemp = vidatemp;

    if(lvida > 0){

      if(lvidaTemp > 0){

        let sobra = lvidaTemp- aValor;
        lvidaTemp = lvidaTemp - aValor;
        
        if(sobra <= 0){
          lvidaTemp = 0;
          lvida = lvida- (sobra * -1);
        }

      }
      else  {
        lvida = (lvida - aValor);
    
        if((lvida - aValor) < 0)
          lvida = 0;  
      }
  
    }

    setVidaAtual(lvida);
    setVidaTemp(lvidaTemp);

    props.decrementar(vidaatual, vidatemp);

  }

  return(
    <div className='vd-container'>
      <strong className='vd-titulo'>Vida</strong>
      <div className='vd-valores'>
        <div className='vd-vidaatual'>
          
          {/* <div className='fi_div-vida'> */}
            {vidaatual}
          {/* </div> */}

          <div className='vd-vdatual-botoes'>
            <button className='vd-vdatual-botao' onClick={()=>{ incrementar() }}> + </button>
            <button className='vd-vdatual-botao' onClick={()=>{ decrementar() } }> - </button>
          </div>
        </div>
        <div className='vd-vidacentro'>
          <div className='vd-vidatemp'>
            {vidatemp}
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
            <input className='number-label' type='number' value={dadousado} onChange={(e)=>{setDadoUsado(e.target.value)}}/>
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