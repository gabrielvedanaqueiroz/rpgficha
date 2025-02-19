import './tilecaracteristica.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';

function TileCaracteristica(props){
  /*Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur, ipsum eget elementum sagittis, velit sem facilisis tortor, nec sodales neque sem eget elit. Vivamus sed magna nisl. */
  return(
    
    <div className='cai-container'>
      <div className='cai_texto'>
        {props.descricao}
      </div>
      <div className='cai_botoes'>
        <img src={excluir} className='cai_btn'  alt='excluir' onClick={()=>{props.excluir()}}/>
        <img src={editar} className='cai_btn' alt='editar' onClick={()=>{props.editar()}}/>
      </div>
    </div>
    
  );
}

export default TileCaracteristica;