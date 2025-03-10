import './personagem-upar.css';
import { useEffect, useState } from 'react';
import BtnSalvarForm from '../../components/btnsalvarform';
import { ocultarBarras, exibirBarras, buscarPersonagem } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/index.js';

function PersonagemUpar(){

  const [personagem, setPersonagem] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
  
    async function buscar() {
      let id = localStorage.getItem('RF@personagemID-upar');
      let per = await buscarPersonagem(id);
      setPersonagem(per);      

      setLoading(false);
    }
    
    window.onpopstate = () => {
      exibirBarras();
    };

    // Exemplo: Atualizar para x%
    // atualizarProgresso(75);
    ocultarBarras();

    buscar();
  }, []);

  function onUpar(e){
    e.preventDefault();

    localStorage.setItem('RF@personagemID-upar', '');
    navigate('/', {replace:true}); 
  }

  // function atualizarProgresso(porcentagem) {
  //   let graus = (porcentagem / 100) * 360;
  //   document.querySelector('.progress-circle').style.background = 
  //     `conic-gradient(red 0deg ${graus}deg, lightgray ${graus}deg 360deg)`;
  // }  

  if(loading)
    return <Loading/>

  return(
    <div className='pup_container'>

      <form className='pup_form'  onSubmit={onUpar}>
        <div>
          Vida 
          <input type='number'/> <br/> 
          + Vita atual
          <hr/>
        </div>

        <div>
          atributos
          <hr/>
        </div>

        <div>
          pericias
          <hr/>
        </div>       

        {personagem.pe_nome}

        <div className='pup_div-rodape-botao'>
          <BtnSalvarForm esperando='Upando...' inicial='Upar'/>
        </div>
      </form>

      {/* <div>
          xp
          <div class="progress-circle"/>
        </div> */}
    </div>



  );

}

export default PersonagemUpar;