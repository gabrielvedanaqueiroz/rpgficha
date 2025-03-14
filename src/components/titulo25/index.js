import './titulo25.css';
import {memo} from 'react';

const Titulo25 = memo((props)=>{

  return(
    <div className='t25-titulo'>
      <strong>{props.titulo}</strong>
      <hr/>
    </div>
  )
});

export default Titulo25;