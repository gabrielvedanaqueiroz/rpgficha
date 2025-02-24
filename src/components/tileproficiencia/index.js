import  './tileproficiencia.css';

function TileProficiencia(props){

  return(
    <div className='cr-pro-item'>
      {props.proficiente === '1'? <div className='cr-pro-proficiente' />: <div className='cr-pro-noproficiente' />}
      <div className='cr-pro-texto'>
        <label>{props.titulo}</label>
        <label>{props.valor}</label>
      </div>
    </div>
  );
}

export default TileProficiencia;