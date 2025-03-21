import './footer.css';
import {Link} from 'react-router-dom';
import inc from '../../res/inc.svg';
import caracteristicas from '../../res/caracteristica.svg';
import personagem from '../../res/personagem.svg';
import inventario from '../../res/inventario.svg';
import magias from '../../res/magia.svg';
import {memo} from 'react';

export const Footer = memo(()=>{

  return(
    <footer className='ft_bottom-bar'> 
      <Link className='ft_button_disfarcado' to='/personagens'>
        <img className='ft_img32px' src={inc} alt='personagens'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/caracteristicas'>
        <img className='ft_img32px' src={caracteristicas} alt='caracteristicas'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/'>
        <div className='ft_div-ficha'>
          <img className='ft_img40px' src={personagem} alt='ficha'/>  
        </div>  
      </Link>
      <Link className='ft_button_disfarcado' to='/inventario'>
        <img className='ft_img32px' src={inventario} alt='inventario'/>
      </Link>
      <Link className='ft_button_disfarcado' to='/magias'>
        <img className='ft_img32px' src={magias} alt='magias'/>
      </Link>
    </footer>
  );
});

export default Footer;