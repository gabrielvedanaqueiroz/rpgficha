import {BrowserRouter, Routes, Route} from 'react-router';
import Login from '../pages/login';
import Registrar from '../pages/registrar';
import Private from './private';
import Header from '../components/header';
import Footer from '../components/footer';
import Ficha from '../pages/ficha';
import Caracteristicas from '../pages/caracteristicas';
import Magias from '../pages/magias';
import Personagens from '../pages/personagens';
import PersonagenDetalhe from '../pages/personagemdetalhe';

function RoutesApp(){

  return(
    <BrowserRouter>
      <div id='router-header'><Header/></div> {/* controle/gambiara para mander essa estrutura e ocultar quando elemento nao é necessario. GV 16-02-2025*/}
      <Routes>
        <Route path='/' element={<Private> <Ficha/> </Private>}/> {/* elemento de validacao de acesso. GV 16-02-2025*/}
        <Route path='/caracteristicas' element={<Private> <Caracteristicas/> </Private>}/> 
        <Route path='/magias' element={<Private> <Magias/> </Private>}/> 
        <Route path='/personagens' element={<Private> <Personagens/> </Private>}/> 
        <Route path='/personagemdetalhe' element={<Private> <PersonagenDetalhe/> </Private>}/> 

        <Route path='/registrar' element={<Registrar/>}/> 
        <Route path='/login' element={<Login/>}/> 
      </Routes>
      <div id='router-footer'><Footer/></div>
    </BrowserRouter>
  )
}

export default RoutesApp;