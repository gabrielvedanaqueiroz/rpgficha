import './tilepersonagem.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';
import personagem from '../../res/personagem.svg';
function TilePersonagem(props){
  /*Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur, ipsum eget elementum sagittis, velit sem facilisis tortor, nec sodales neque sem eget elit. Vivamus sed magna nisl. */
  return(
    
    <div className='pri-container'>
      <div className='pri_texto'>
        <div className='pri_div-personagem'>
          <img className='pri_img-personagem' src={personagem} alt='personagem'/>
        </div>
        <div className='pri_div-dados'>
          {props.pclasse} * {props.psubclasse}<br/>
          {props.praca} {props.psubraca}<br/>
          antecedente: {props.pantecedente} | tendencia: {props.ptendencia}
        </div>
        <div className='pri_div-direita'>
          <div className='pri_div-vida'>
            <label>{props.pvida}</label>
          </div>
          <div className='pri_div-nivel'>
            <label>{props.pnivel}</label>
            <label>Nível</label>
          </div>
        </div>
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