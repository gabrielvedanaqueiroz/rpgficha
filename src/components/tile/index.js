import './tile.css';
import expandir_mais from '../../res/expandir_mais.svg';
import expandir_menos from '../../res/expandir_menos.svg';
import { useState } from 'react';

function Tile({id, titulo, children}){
  
  const [expandido, setExpandido] = useState(false);
  const [img, setImg] = useState(expandir_mais);
  const iddiv = `div-${id}`; 
  const idli = `li-${id}`; 
  const iddivchildren = `divchildren-${id}`;
   
  function onExpandir(){
    
    const cDiv          = document.getElementById(iddiv); 
    const cDivChildren  = document.getElementById(iddivchildren); 
    let altura        = cDiv.style.height;
    let visibilidade  = cDivChildren.style.display;

    if(expandido === false){
      setExpandido(true);
      altura = 'auto';
      setImg(expandir_menos);
      visibilidade = "flex";
    }
    else{
      setExpandido(false);
      altura = '45px';
      setImg(expandir_mais);
      visibilidade = "none";
    }

    cDiv.style.height           = altura;
    cDivChildren.style.display  = visibilidade;
  }

  return(
    <li key={idli} >
      <div key={iddiv} id={iddiv} className='tl_container'>
        <div className='tl_conteudo'>
          <strong className='tl_titulo'>{titulo}</strong>
          <div id={iddivchildren} className='tl-children'>
            {children}
          </div>
        </div>
        {/* <label>em uso</label> */}
        <div className='tl_btnexpandir'>
          <button className ='tl_buttom' onClick={onExpandir}>
            <img className='tl_img' src={img} alt='expandir/recolher'/>
          </button>
        </div>

      </div>
    </li>
  )
}

export default Tile;