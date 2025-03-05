import './btnadicionar.css';
import expandir_mais from '../../res/expandir_mais.svg';

function BtnAdicionar(props){

  return(
    <div className='bta-div-rodape-botao'>
      <button className='bta-bt-adicionar' onClick={()=>{props.adicionar()}} >
        <img className='bta-img-adicionar' src={expandir_mais} alt={props.alt}/>
        Adicionar
      </button>
    </div>
  );
}

export default BtnAdicionar;
