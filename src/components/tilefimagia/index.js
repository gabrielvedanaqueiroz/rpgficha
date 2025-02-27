import './tilefimagia.css';

function TileFiMagia(props){

  function onClickDetalhe(){
    if(props.btn)
      props.onClickDetalhe();
  }

  return(
    <div key ={props.mg_id} className='tm-container' onClick={()=>{onClickDetalhe(props.mg_id)}}>
      <span className='tmi-nome'>{props.mg_nome?props.mg_nome:'Nome'}</span>
      <span className='tmi-alcance'>{props.mg_alcance?props.mg_alcance:'Alcance'}</span>
      <span className='tmi-tempo'>{props.mg_tempoconjuracao?props.mg_tempoconjuracao:'Tempo'}</span>
      <span className='tmi-nivel'>{props.mg_nivel?props.mg_nivel:'Nivel'}</span>
      <span className='tmi-dano'>{props.mg_dano?props.mg_dano:'Dano'}</span>
      <span className='tmi-tipo'>{props.mg_duracao?props.mg_duracao:'Duração'}</span>
    </div>
  )
}

export default TileFiMagia;
