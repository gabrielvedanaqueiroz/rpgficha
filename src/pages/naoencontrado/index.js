import './naoencontrado.css';
import { ocultarBarras, exibirBarras } from '../../utils';
import { useEffect } from 'react';

function NaoEncontrado(){

  useEffect(()=>{
    ocultarBarras();   
    
    window.onpopstate = () => {
      exibirBarras();
    };

  },[]);
  
  return (
    <div className='ne_container'>Pagina não encontrada</div>
  )
}

export default NaoEncontrado;