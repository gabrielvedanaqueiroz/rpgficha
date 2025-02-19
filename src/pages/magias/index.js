import './magias.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';

function Magias(){
  /* teste de conceitos */
  return(
    <div >  
      <strong>Magias</strong>
      <div className='cai-container'>
        <div className='cai_texto'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur, ipsum eget elementum sagittis, velit sem facilisis tortor, nec sodales neque sem eget elit. Vivamus sed magna nisl.
        </div>
        <div className='cai_botoes'>
        <img src={excluir} className='cai_btn'  alt='excluir' onClick={()=>{alert('excluir')}}/>
          <img src={editar} className='cai_btn' alt='editar' onClick={()=>{alert('editar')}}/>
        </div>
      </div>
      
    </div>
  );
}

export default Magias;