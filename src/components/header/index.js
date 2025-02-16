import './header.css';
import logo from '../../res/logo.svg';

function Header(){
  return(
    <header> 
      <img className='hd_icone' src={logo} alt='organizador'/>
      <label className='hd_titulo'>RPGFicha</label>
    </header>
  ); 
}

export default Header; 