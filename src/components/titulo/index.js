import './titulo.css';
import {memo} from 'react';

const Titulo = memo((props)=>{

  return(
    <div className='t-titulo'>
      <strong>{props.titulo}</strong>
      <hr/>
    </div>
  )
});

export default Titulo;