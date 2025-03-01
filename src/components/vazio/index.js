import './vazio.css';
import balao_duvida from '../../res/balao_duvida.svg';
import personagem from '../../res/personagem.svg';
import { useNavigate } from 'react-router-dom';

function Vazio(){

  const navigate = useNavigate();
  return(
    <div className='vz_container'>
      <div className='vz_imagem'>
        <img className='vz_balao' src={balao_duvida} alt='duvida'/>
        <img className='vz_personagem'src={personagem} alt='personagem'/>
      </div>

      <strong className='vz_strong'>Nenhum personagem selecionado</strong>
      <button 
        className='vz_button' 
        onClick={()=>{ navigate('/personagens', {replace:true})}}
      >
        Personagem
      </button>
    </div>
  )
}

export default Vazio;