import './tilevida.css';

function TileVida(props){

  return(
    <div className='vd-container'>
      <strong className='vd-titulo'>Vida</strong>
      <div className='vd-valores'>
        <div className='vd-vidaatual'>
          
          {/* <div className='fi_div-vida'> */}
            {props.pe_vidaatual}
          {/* </div> */}

          <div className='vd-vdatual-botoes'>
            <button className='vd-vdatual-botao' onClick={()=>{ props.incrementar() }}> + </button>
            <button className='vd-vdatual-botao' onClick={()=>{ props.decrementar()} }> - </button>
          </div>
        </div>
        <div className='vd-vidacentro'>
          <div className='vd-vidatemp'>
            {props.pe_vidatemp}
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
            {props.pe_vidadadousado}
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