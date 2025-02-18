import { useState } from 'react';
import './tile.css';

function Tile({id, children}){

  const [altura, setAltura] = useState('45px');

  function onExpandir(){
    
    let topo = document.getElementById(id);
    if(topo){

      console.log(topo.style.height);
      console.log(altura);
      // setAltura(topo.style.height);

      if(altura === '45px')
        setAltura('200px')
      else  
        setAltura('45px');
    
      topo.style.height = altura;
    };
  }

  return(
    <div id={id} className='tl_container'>
      
      {children}

      <div className='tl_btnexpandir'>
        <button onClick={onExpandir}>+</button>
      </div>

    </div>
  )
}

export default Tile;