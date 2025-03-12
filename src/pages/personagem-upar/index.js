import './personagem-upar.css';
import { useEffect, useState } from 'react';
import BtnSalvarForm from '../../components/btnsalvarform';
import { ocultarBarras, exibirBarras, buscarPersonagem } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/';
import upar from '../../res/up.svg'
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

function PersonagemUpar(){

  const [vida, setVida] = useState(0);

  const [upacrobacia, setProAcrobacia] = useState(false);
  const [uparcanismo, setProArcanismo] = useState(false);
  const [upatletismo, setProAtletismo] = useState(false);
  const [upatuacao, setProAtuacao]  = useState(false);
  const [upblefar, setProBlefar] = useState(false);
  const [upfurtividade, setProFurtividade] = useState(false);
  const [uphistoria, setProHistoria] = useState(false);
  const [upintimidacao, setProIntimidacao] = useState(false);
  const [upintuicao, setProIntuicao] = useState(false);
  const [upinvestigacao, setProInvestigacao] = useState(false);
  const [uplidaranimais, setProLidarAnimais] = useState(false);
  const [upmedicina, setProMedicina] = useState(false);
  const [upnatureza, setProNatureza] = useState(false);
  const [uppersuasao, setProPersuasao] = useState(false);
  const [upprestidigitacao, setProPrestidigitacao] = useState(false);
  const [uppercepcao, setProPercepcao] = useState(false);
  const [upreligiao, setProReligiao] = useState(false);
  const [upsobrevivencia, setProSobrevivencia] = useState(false);
  
  const [personagem, setPersonagem] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
  
    async function buscar() {
      let id = localStorage.getItem('RF@personagemID-upar');
      await buscarPersonagem(id).then((per)=>{
        setPersonagem(per);    
      
        setProAcrobacia(per.pe_proacrobacia); 
        setProArcanismo(per.pe_proarcanismo); 
        setProAtletismo(per.pe_proatletismo); 
        setProAtuacao(per.pe_proatuacao); 
        setProBlefar(per.pe_problefar); 
        setProFurtividade(per.pe_profurtividade); 
        setProHistoria(per.pe_prohistoria); 
        setProIntimidacao(per.pe_prointimidacao); 
        setProIntuicao(per.pe_prointuicao); 
        setProInvestigacao(per.pe_proinvestigacao); 
        setProLidarAnimais(per.pe_prolidaranimais); 
        setProMedicina(per.pe_promedicina); 
        setProNatureza(per.pe_pronatureza); 
        setProPersuasao(per.pe_propersuasao); 
        setProPrestidigitacao(per.pe_proprestidigitacao); 
        setProPercepcao(per.pe_propercepcao); 
        setProReligiao(per.pe_proreligiao); 
        setProSobrevivencia(per.pe_prosobrevivencia); 
  
        setLoading(false);
      });      
      
    }
    
    window.onpopstate = () => {
      exibirBarras();
    };

    ocultarBarras();

    buscar();

  }, [personagem]);

  async function onUpar(e){

    e.preventDefault();

    console.log('acro->'+upacrobacia);
    console.log('arca->'+uparcanismo);
    console.log('persu->'+uppersuasao);

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
      await updateDoc(docRef, {
          pe_proacrobacia: upacrobacia,
          pe_proarcanismo: uparcanismo,
          pe_proatletismo: upatletismo,
          pe_proatuacao: upatuacao,
          pe_problefar: upblefar,
          pe_profurtividade: upfurtividade,
          pe_prohistoria: uphistoria,
          pe_prointimidacao: upintimidacao,
          pe_prointuicao: upintuicao,
          pe_proinvestigacao: upinvestigacao,
          pe_prolidaranimais: uplidaranimais,
          pe_promedicina: upmedicina,
          pe_pronatureza: upnatureza,
          // pe_propersuasao: propersuasao,
          pe_proprestidigitacao: upprestidigitacao,
          pe_propercepcao: uppercepcao,
          pe_proreligiao: upreligiao,
          pe_prosobrevivencia: upsobrevivencia,
          // pe_nivel: personagem.pe_nivel+1,
          pe_vidabase: vida,

      })
      .then( () =>{
        exibirBarras();
        localStorage.setItem('RF@personagemID-upar', '');
        navigate('/', {replace:true});
      })
      .catch((error)=>{
        console.log('Erro ao Upar; '+error);
        toast.error('Erro ao Upar');
      });    

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
            {upacrobacia? 
              <input type="checkbox" value={upacrobacia} defaultChecked disabled/>:
              <input type="checkbox" value={upacrobacia} onChange={(e)=>{setProAcrobacia(e.target.checked)}} />
            }
            <label>Acrobacia <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uparcanismo? 
              <input type="checkbox" value={uparcanismo} defaultChecked disabled/>: 
              <input type="checkbox" value={uparcanismo} onChange={(e)=>{ setProArcanismo(e.target.checked) }} />
            }
            <label>Arcanismo <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upatletismo? 
              <input type="checkbox" value={upatletismo} defaultChecked disabled/>:
              <input type="checkbox" value={upatletismo} onChange={(e)=>{setProAtletismo(e.target.checked)}} />
            }
            <label>Atletismo <span className='pup-atrib'>(Força)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upatuacao? 
              <input type="checkbox" value={upatuacao} defaultChecked disabled/>: 
              <input type="checkbox" value={upatuacao} onChange={(e)=>{setProAtuacao(e.target.checked)}} />
            }
            <label>Atuação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upblefar? 
              <input type="checkbox" value={upblefar} defaultChecked disabled/>: 
              <input type="checkbox" value={upblefar} onChange={(e)=>{setProBlefar(e.target.checked)}} 
            />}
            <label>Blefar <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upfurtividade? 
              <input type="checkbox" value={upfurtividade} defaultChecked disabled/>: 
              <input type="checkbox" value={upfurtividade} onChange={(e)=>{setProFurtividade(e.target.checked)}} />
            }
            <label>Furtividade <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uphistoria? 
              <input type="checkbox" value={uphistoria} defaultChecked disabled/>: 
              <input type="checkbox" value={uphistoria} onChange={(e)=>{setProHistoria(e.target.checked)}} />
            }
            <label>História <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upintimidacao? 
              <input type="checkbox" value={upintimidacao} defaultChecked disabled/>: 
              <input type="checkbox" value={upintimidacao} onChange={(e)=>{setProIntimidacao(e.target.checked)}} />
            }
            <label>Intimidação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upintuicao? 
              <input type="checkbox" value={upintuicao} defaultChecked disabled/>: 
              <input type="checkbox" value={upintuicao} onChange={(e)=>{setProIntuicao(e.target.checked)}} />
            }
            <label>Intuição <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upinvestigacao? 
              <input type="checkbox" value={upinvestigacao} defaultChecked disabled/>: 
              <input type="checkbox" value={upinvestigacao} onChange={(e)=>{setProInvestigacao(e.target.checked)}} />
            }
            <label>Investigação <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uplidaranimais? 
              <input type="checkbox" value={uplidaranimais} defaultChecked disabled/>: 
              <input type="checkbox" value={uplidaranimais} onChange={(e)=>{setProLidarAnimais(e.target.checked)}} />
            }
            <label>Lidar com animais <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upmedicina? 
              <input type="checkbox" value={upmedicina} defaultChecked disabled/>: 
              <input type="checkbox" value={upmedicina} onChange={(e)=>{setProMedicina(e.target.checked)}} />
            }
            <label>Medicina <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upnatureza? 
              <input type="checkbox" value={upnatureza} defaultChecked disabled/>: 
              <input type="checkbox" value={upnatureza} onChange={(e)=>{setProNatureza(e.target.checked)}} />
            }
            <label>Natureza <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uppersuasao? 
              <input type="checkbox" value={uppersuasao} defaultChecked disabled/>: 
              <input type="checkbox" value={uppersuasao} onChange={(e)=>{setProPersuasao(e.target.checked)}} />
            }
            <label>Persuasão <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upprestidigitacao? 
              <input type="checkbox" value={upprestidigitacao} defaultChecked disabled/>: 
              <input type="checkbox" value={upprestidigitacao} onChange={(e)=>{setProPrestidigitacao(e.target.checked)}} />
            }
            <label>Prestidigitação <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uppercepcao? 
              <input type="checkbox" value={uppercepcao} chedefaultChecked disabledcked/>: 
              <input type="checkbox" value={uppercepcao} onChange={(e)=>{setProPercepcao(e.target.checked)}} />
            }
            <label>Percepção <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upreligiao? 
              <input type="checkbox" value={upreligiao} defaultChecked disabled/>: 
              <input type="checkbox" value={upreligiao} onChange={(e)=>{setProReligiao(e.target.checked)}} />
            }
            <label>Religião <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upsobrevivencia? 
              <input type="checkbox" value={upsobrevivencia} defaultChecked disabled/>: 
              <input type="checkbox" value={upsobrevivencia} onChange={(e)=>{setProSobrevivencia(e.target.checked)}} />
            }
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