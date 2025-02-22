import './tilepersonagem.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';
import personagem from '../../res/personagem.svg';

function TilePersonagem(props){
  return(
    
    <div className='pri-container'>
      <div className='pri_texto'>
        <div className='pri_div-personagem'>
          <img className='pri_img-personagem' src={personagem} alt='personagem'/>
        </div>
        <div className='pri_div-dados'>
          <span className='pri-linha-1'>{props.pclasse} - {props.psubclasse}</span>
          <span className='pri-linha-2'>{props.praca} {props.psubraca}<br/></span>
          <div className='pri-div-linha-3'>
            <div className='pri-div-linha-3-item'>
              <span className='pri-linha-3'>{props.pantecedente} </span>
              <hr/>
              <span className='pri-linha-3'>Antecedente</span>
            </div>
            <div className='pri-div-linha-3-item'>
              <span className='pri-linha-3'> {props.ptendencia} </span>
              <hr/>
              <span className='pri-linha-3'> Tendência </span>
            </div>
          </div>
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
      </div>
      <div className='pri_botoes'>
        <img src={excluir} className='pri_btn'  alt='excluir' onClick={()=>{props.excluir()}}/>
        <img src={editar} className='pri_btn' alt='editar' onClick={()=>{props.editar()}}/>
      </div>
    </div>
    
  );
}

export default TilePersonagem;