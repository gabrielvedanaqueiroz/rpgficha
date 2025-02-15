import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/login';
import Registrar from '../pages/registrar';
import Ficha from '../pages/ficha';
import Private from './private';

function RoutesApp(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registrar' element={<Registrar/>}/> 
        <Route path='/ficha' element={<Private> <Ficha/> </Private>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;