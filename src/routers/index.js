import {BrowserRouter, Routes, Route} from 'react-router';
import Login from '../pages/login';
import Registrar from '../pages/registrar';
import Ficha from '../pages/ficha';
import Private from './private';
import Header from '../components/header';
import Footer from '../components/footer';

function RoutesApp(){

  function renderizar(){
    const tela = localStorage.getItem('RF@tela');
    
    return(
      <BrowserRouter>
        {(tela !== '1')?<Header/>:<div/>}
        <Routes>
          <Route path='/' element={<Private> <Ficha/> </Private>}/>
          <Route path='/registrar' element={<Registrar/>}/> 
          <Route path='/login' element={<Login/>}/> 
        </Routes>
        {(tela !== '1')?<Footer/>:<div/>}
      </BrowserRouter> 
    ); 
    
  }

  return(

    // renderizar()
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Private> <Ficha/> </Private>}/>
        <Route path='/registrar' element={<Registrar/>}/> 
        <Route path='/login' element={<Login/>}/> 
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default RoutesApp;