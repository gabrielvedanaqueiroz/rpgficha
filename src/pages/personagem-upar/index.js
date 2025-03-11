import './personagem-upar.css';
import { useEffect, useState } from 'react';
import BtnSalvarForm from '../../components/btnsalvarform';
import { ocultarBarras, exibirBarras, buscarPersonagem } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/';
import upar from '../../res/up.svg'

function PersonagemUpar(){

  const [vida, setVida] = useState(0);
  const [proacrobacia, setProacrobacia] = useState(false);
  const [proarcanismo, setProarcanismo] = useState(false);
  const [proatletismo, setProatletismo] = useState(false);
  const [proatuacao, setProatuacao] = useState(false);
  const [problefar, setProblefar] = useState(false);
  const [profurtividade, setProfurtividade] = useState(false);
  const [prohistoria,setProhistoria] = useState(false);
  const [prointimidacao, setProintimidacao] = useState(false);
  const [prointuicao, setProintuicao] = useState(false);
  const [proinvestigacao, setProinvestigacao] = useState(false);
  const [prolidaranimais, setProlidaranimais] = useState(false);
  const [promedicina, setPromedicina] = useState(false);
  const [pronatureza, setPronatureza] = useState(false);
  const [propersuasao, setPropersuasao] = useState(false);
  const [proprestidigitacao, setProprestidigitacao] = useState(false);
  const [propercepcao, setPropercepcao] = useState(false);
  const [proreligiao, setProreligiao] = useState(false);
  const [prosobrevivencia, setProsobrevivencia] = useState(false);
  
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

    console.log(proacrobacia);
    console.log(proarcanismo);
    localStorage.setItem('RF@personagemID-upar', '');
    // navigate('/', {replace:true}); 
  }
  
  if(loading)
    return <Loading/>

  return(
    <div className='pup_container'>
      
      <div className='pup_edit-centro'>
        <strong>{personagem.pe_nome}</strong><br/>
        {personagem.getRaca()}<br/>
        {personagem.getClasse()}
      </div>
      <div className='pup_edit-top'>
        <div className='pup_div-espacamento'>
          <label>Nível</label>
          <div className='pup_div-espacamento-item'>
            <label>{personagem.pe_nivel}</label>        
            <img className='pup_img' src={upar} alt='upar'/>
            <div>{personagem.pe_nivel + 1}</div>
          </div>
        </div>
      </div>
      <form className='pup_form' onSubmit={onUpar}>

        <div className='pup_edit-bottom'>
          <div className='pup_div-espacamento'>
            <label>Vida</label>
            <div className='pup_div-espacamento-item'>
              <label>{personagem.pe_vidabase}</label>        
              <img className='pup_img' src={upar} alt='upar'/>
              <input type='number' value={vida} onChange={(e)=>{setVida(e.target.value)}}/>  
            </div>
          </div>   
        </div>

        <div className='pup_edit-centro'>
          <strong>Pericias</strong>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proacrobacia} onChange={(e)=>{setProacrobacia(e.target.value)}}/>
            <label>Acrobacia <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proarcanismo} onChange={(e)=>{setProarcanismo(e.target.value)}}/>
            <label>Arcanismo <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proatletismo} onChange={(e)=>{setProatletismo(e.target.value)}}/>
            <label>Atletismo <span className='pup-atrib'>(Força)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proatuacao} onChange={(e)=>{setProatuacao(e.target.value)}}/>
            <label>Atuação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={problefar} onChange={(e)=>{setProblefar(e.target.value)}}/>
            <label>Blefar <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={profurtividade} onChange={(e)=>{setProfurtividade(e.target.value)}}/>
            <label>Furtividade <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={prohistoria} onChange={(e)=>{setProhistoria(e.target.value)}}/>
            <label>História <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={prointimidacao} onChange={(e)=>{setProintimidacao(e.target.value)}}/>
            <label>Intimidação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={prointuicao} onChange={(e)=>{setProintuicao(e.target.value)}}/>
            <label>Intuição <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proinvestigacao} onChange={(e)=>{setProinvestigacao(e.target.value)}}/>
            <label>Investigação <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={prolidaranimais} onChange={(e)=>{setProlidaranimais(e.target.value)}}/>
            <label>Lidar com animais <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={promedicina} onChange={(e)=>{setPromedicina(e.target.value)}}/>
            <label>Medicina <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={pronatureza} onChange={(e)=>{setPronatureza(e.target.value)}}/>
            <label>Natureza <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
          <input type="checkbox" value={propersuasao} onChange={(e)=>{setPropersuasao(e.target.value)}}/>
            <label>Persuasão <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proprestidigitacao} onChange={(e)=>{setProprestidigitacao(e.target.value)}} />
            <label>Prestidigitação <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={propercepcao} onChange={(e)=>{setPropercepcao(e.target.value)}} />
            <label>Percepção <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            <input type="checkbox" value={proreligiao} onChange={(e)=>{setProreligiao(e.target.value)}}/>
            <label>Religião <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {/* {(prosobrevivencia ? <input type="checkbox" value={prosobrevivencia} checked disabled/> : <input type="checkbox" value={prosobrevivencia} onChange={(e)=>{setProsobrevivencia(e.target.value)}}/>)} */}
            <input type="checkbox" value={prosobrevivencia} onChange={(e)=>{setProsobrevivencia(e.target.value)}}/>
            <label>Sobrevivência <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
        
        </div>

        <div className='pup_div-rodape-botao'>
          <BtnSalvarForm esperando='Upando...' inicial='Upar'/>
        </div>
      </form>
    </div>
  );

}

export default PersonagemUpar;