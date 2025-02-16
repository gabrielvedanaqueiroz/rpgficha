import './btnexibirsenha.css';
import olhoAtivo from '../../res/olho-ativo.svg';
import olhoDesativo from '../../res/olho-desativo.svg';
import { useState } from 'react';

function BtnExibirSenha(props){
  const [imgVisibilidade, setImgVisibilidade] = useState(olhoAtivo);

  function onClicado(){
    if((imgVisibilidade === olhoAtivo))
      setImgVisibilidade(olhoDesativo)
    else
      setImgVisibilidade(olhoAtivo)
        
    props.click();
  }

  return(
    <img className='bes-img-btn' src={imgVisibilidade} alt='exibir senha' onClick={onClicado}></img>
  );
}

export default BtnExibirSenha;