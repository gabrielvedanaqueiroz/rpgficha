import './tilefiataque.css';

function TileFiAtaque(props){

  return(
    <div key ={props.at_id} className='ta-container'>
      <span className='tai-nome'>{props.at_nome?props.at_nome:'Nome'}</span>
      <span className='tai-alcance'>{props.at_alcance?props.at_alcance:'Alcance'}</span>
      <span className='tai-bonus'>{props.at_bonus?props.at_bonus:'Bonus'}</span>
      <span className='tai-dano'>{props.at_dano?props.at_dano:'Dano'}</span>
      <span className='tai-tipo'>{props.at_tipo?props.at_tipo:'Tipo'}</span>
    </div>
  )
}

export default TileFiAtaque;
