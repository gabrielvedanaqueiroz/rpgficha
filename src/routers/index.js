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
import PersonagenCriacaoTopo from '../pages/personagem-criacao-topo';
import PersonagenCriacaoAtributos from '../pages/personagem-criacao-atributos';
import PersonagemCriacaoProficiencia from '../pages/personagem-criacao-proficiencias';
import PersonagemUpar from '../pages/personagem-upar';
import Inventario from '../pages/inventario';
import NaoEncontrado from '../pages/naoencontrado';

function RoutesApp(){

  return(
    <BrowserRouter>
      <div id='router-header'><Header/></div> {/* controle/gambiara para mander essa estrutura e ocultar quando elemento nao é necessario. GV 16-02-2025*/}
      <Routes>
        <Route path='/' element={<Private> <Ficha/> </Private>}/> {/* elemento de validacao de acesso. GV 16-02-2025 */}
        <Route path='/caracteristicas' element={<Private> <Caracteristicas/> </Private>}/> 
        <Route path='/magias' element={<Private> <Magias/> </Private>}/> 
        <Route path='/personagens' element={<Private> <Personagens/> </Private>}/> 
        <Route path='/inventario' element={<Private> <Inventario/> </Private>}/> 
        <Route path='/personagem-criacao-topo' element={<Private> <PersonagenCriacaoTopo/> </Private>}/> 
        <Route path='/personagem-criacao-atributos' element={<Private> <PersonagenCriacaoAtributos/> </Private>}/> 
        <Route path='/personagem-criacao-proficiencias' element={<Private> <PersonagemCriacaoProficiencia/> </Private>}/> 
        <Route path='/personagem-upar' element={<Private> <PersonagemUpar/> </Private>}/> 
        <Route path='/registrar' element={<Registrar/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='*' element={<NaoEncontrado/>}/> 
      </Routes>
      <div id='router-footer'><Footer/></div>
    </BrowserRouter>
  )
}

export default RoutesApp;