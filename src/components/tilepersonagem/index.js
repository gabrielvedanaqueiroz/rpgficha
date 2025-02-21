import './tilepersonagem.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';

function TilePersonagem(props){
  /*Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur, ipsum eget elementum sagittis, velit sem facilisis tortor, nec sodales neque sem eget elit. Vivamus sed magna nisl. */
  return(
    
    <div className='pri-container'>
      <div className='pri_texto'>
        {props.pclasse}<br/>
        {props.praca}<br/>
        
        {/* costomizar a filho com mais elementos se quiser*/}
      </div>
      <div className='pri_botoes'>
        <img src={excluir} className='pri_btn'  alt='excluir' onClick={()=>{props.excluir()}}/>
        <img src={editar} className='pri_btn' alt='editar' onClick={()=>{props.editar()}}/>
      </div>
    </div>
    
  );
}

export default TilePersonagem;