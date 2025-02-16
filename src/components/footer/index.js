import './footer.css';
import {Link} from 'react-router-dom';
import inc from '../../res/inc.svg';
import caracteristicas from '../../res/caracteristica.svg';
import personagem from '../../res/personagem.svg';
import ataques from '../../res/ataque.svg';
import magias from '../../res/magia.svg';

function Footer(){

  return(
    <footer className='ft_bottom-bar'> 
      <Link className='ft_button_disfarcado' to='/'>
        <img className='ft_img32px' src={inc} alt='personagens'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/'>
        <img className='ft_img32px' src={caracteristicas} alt='caracteristicas'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/'>
        <div className='ft_div-ficha'>
          <img className='ft_img40px' src={personagem} alt='ficha'/>  
        </div>  
      </Link>
      <Link className='ft_button_disfarcado' to='/'>
        <img className='ft_img32px' src={ataques} alt='ataques'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/'>
        <img className='ft_img32px' src={magias} alt='magias'/>
      </Link>
    </footer>
  );
}

export default Footer;