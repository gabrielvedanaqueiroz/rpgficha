import './personagem-upar.css';
import { useEffect, useState, useRef } from 'react';
import BtnSalvarForm from '../../components/btnsalvarform';
import { ocultarBarras, exibirBarras, buscarPersonagem } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/index.js';

function PersonagemUpar(){

  const proacrobacia = useRef(false);
  const proarcanismo = useRef(false);
  const proatletismo = useRef(false);
  const proatuacao = useRef(false);
  const problefar = useRef(false);
  const profurtividade = useRef(false);
  const prohistoria = useRef(false);
  const prointimidacao = useRef(false);
  const prointuicao = useRef(false);
  const proinvestigacao = useRef(false);
  const prolidaranimais = useRef(false);
  const promedicina = useRef(false);
  const pronatureza = useRef(false);
  const propersuasao = useRef(false);
  const proprestidigitacao = useRef(false);
  const propercepcao = useRef(false);
  const proreligiao = useRef(false);
  const prosobrevivencia = useRef(false);
  
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

    ocultarBarras();

    buscar();
  }, []);

  function onUpar(e){
    e.preventDefault();

    localStorage.setItem('RF@personagemID-upar', '');
    navigate('/', {replace:true}); 
  }

  
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
          <div>
            <input type="checkbox" ref={proacrobacia} checked disabled/>
            <label>Acrobacia <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proarcanismo}/>
            <label>Arcanismo <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proatletismo}/>
            <label>Atletismo <span className='pcp-atrib'>(Força)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proatuacao}/>
            <label>Atuação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={problefar}/>
            <label>Blefar <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={profurtividade}/>
            <label>Furtividade <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prohistoria}/>
            <label>História <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prointimidacao}/>
            <label>Intimidação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prointuicao}/>
            <label>Intuição <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proinvestigacao}/>
            <label>Investigação <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prolidaranimais}/>
            <label>Lidar com animais <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={promedicina}/>
            <label>Medicina <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={pronatureza}/>
            <label>Natureza <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={propersuasao}/>
            <label>Persuasão <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proprestidigitacao}/>
            <label>Prestidigitação <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={propercepcao}/>
            <label>Percepção <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={proreligiao}/>
            <label>Religião <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prosobrevivencia}/>
            <label>Sobrevivência <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
        
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
    </div>
  );

}

export default PersonagemUpar;