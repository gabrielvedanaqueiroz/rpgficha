import './tilemagia.css';
import editar from '../../res/edit.svg';
import excluir from '../../res/delete.svg';
import preparar from '../../res/preparar.svg';

function TiteTelaMagia(props){

  return(
    <div key={props.mg_id} className='ttm_container'>
      <label className='ttm_texto'>{props.mg_descricao}</label>
      <label>Nível: {props.mg_nivel} </label>
      <label>Tempo: {props.mg_tempoconjuracao} </label>
      <label>Alcance: {props.mg_alcance} </label>
      <label>Componentes: {props.mg_componentes} </label>
      {props.mg_material && <label>Material: {props.mg_material}</label>}     
      <label>Duração: {props.mg_duracao} </label>
      {props.mg_concentracao && <label>Concentração</label>} 
      {props.mg_ritual && <label>Ritual</label>}  

      {
        props.mg_preparada?
          <div className='ttm_prepadada'><label>Preparada</label></div>:
          <div className='ttm_conhecida'><label>Conhecida</label></div>
      }

      <div className='ttm_botoes'>
        <img src={excluir} className='ttm_btn'  alt='excluir' onClick={()=>{props.excluir()}}/>
        <img src={editar} className='ttm_btn' alt='editar' onClick={()=>{props.editar()}}/>
        <div className='pri_separador-vert'/>
        <img src={preparar} className='ttm_btn'  alt='preparar' onClick={()=>{props.preparar()}}/>
      </div>
    </div>
  )
}

export default TiteTelaMagia;