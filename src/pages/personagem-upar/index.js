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
import expandir_mais from '../../res/expandir_mais.svg';
import expandir_menos from '../../res/expandir_menos.svg';

function PersonagemUpar(){

  const [personagem, setPersonagem]                 = useState({});
  const [vida, setVida]                             = useState(0);

  const [upacrobacia, setProAcrobacia]              = useState(false);
  const [uparcanismo, setProArcanismo]              = useState(false);
  const [upatletismo, setProAtletismo]              = useState(false);
  const [upatuacao, setProAtuacao]                  = useState(false);
  const [upblefar, setProBlefar]                    = useState(false);
  const [upfurtividade, setProFurtividade]          = useState(false);
  const [uphistoria, setProHistoria]                = useState(false);
  const [upintimidacao, setProIntimidacao]          = useState(false);
  const [upintuicao, setProIntuicao]                = useState(false);
  const [upinvestigacao, setProInvestigacao]        = useState(false);
  const [uplidaranimais, setProLidarAnimais]        = useState(false);
  const [upmedicina, setProMedicina]                = useState(false);
  const [upnatureza, setProNatureza]                = useState(false);
  const [uppercepcao, setProPercepcao]              = useState(false);
  const [uppersuasao, setProPersuasao]              = useState(false);
  const [upprestidigitacao, setProPrestidigitacao]  = useState(false);
  const [upreligiao, setProReligiao]                = useState(false);
  const [upsobrevivencia, setProSobrevivencia]      = useState(false);
  
  const [habForca, setHabForca]               = useState(0);
  const [habDestreza, setHabDestreza]         = useState(0);
  const [habConstituicao, setHabConstituicao] = useState(0);
  const [habInteligencia, setHabInteligencia] = useState(0);
  const [habSabedoria, setHabSabedoria]       = useState(0);
  const [habCarisma, setHabCarisma]           = useState(0);

  const [qntHab, setQntHab] = useState(0);
  const [exibirHabilidades, setExibirHabilidades]   = useState(false);
  
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
  
        let exibirHab = ((per.pe_nivel === 3) || (per.pe_nivel === 7) || (per.pe_nivel === 15) || (per.pe_nivel === 17));
        setExibirHabilidades(exibirHab);

        setLoading(false);
      });      
      
    }
    
    window.onpopstate = () => {
      exibirBarras();
    };

    ocultarBarras();

    buscar();

  }, []);

  function getForca(){
    return Number(personagem.pe_forca) + habForca;
  }

  function getDestreza(){
    return Number(personagem.pe_destreza) + habDestreza;
  }

  function getConstituicao(){
    return Number(personagem.pe_constituicao) + habConstituicao;
  }

  function getSabedoria(){
    return Number(personagem.pe_sabedoria) + habSabedoria;
  }

  function getInteligencia(){
    return Number(personagem.pe_inteligencia) + habInteligencia;
  }

  function getCarisma(){
    return Number(personagem.pe_carisma) + habCarisma;
  }

  function onAumentar(aValor){
    let h = Number(aValor);
    setQntHab(qntHab+1);
    return (h + 1); 
  }

  function onDiminuir(aValor){
    let h = Number(aValor);
    setQntHab(qntHab-1);
    return (h - 1); 
  }

  async function onUpar(){

    // e.preventDefault();

    // console.log('uppersu->  '+uppersuasao);
    // console.log('perso->    '+personagem.pe_propersuasao);

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
      await updateDoc(docRef, {
          // pe_proacrobacia: personagem.pe_proacrobacia,
          // pe_proarcanismo: personagem.pe_proarcanismo,
          // pe_proatletismo: personagem.pe_proatletismo,
          // pe_proatuacao: personagem.pe_proatuacao,
          // pe_problefar: personagem.pe_problefar,
          // pe_profurtividade: personagem.pe_profurtividade,
          // pe_prohistoria: personagem.pe_prohistoria,
          // pe_prointimidacao: personagem.pe_prointimidacao,
          // pe_prointuicao:personagem.pe_prointuicao,
          // pe_proinvestigacao: personagem.pe_proinvestigacao,
          // pe_prolidaranimais: personagem.pe_prolidaranimais,
          // pe_promedicina: personagem.pe_promedicina,
          // pe_pronatureza: personagem.pe_pronatureza,
          // pe_propercepcao: personagem.pe_propercepcao,
          // pe_propersuasao: personagem.pe_propersuasao,
          // pe_proprestidigitacao: personagem.pe_proprestidigitacao,
          // pe_proreligiao: personagem.pe_proreligiao,
          // pe_prosobrevivencia: personagem.pe_prosobrevivencia,
          pe_nivel: personagem.pe_nivel+1,
          pe_vidabase: vida,
          pe_forca: Number(personagem.pe_forca) + habForca,
          pe_destreza: Number(personagem.pe_destreza) + habDestreza,
          pe_constituicao: Number(personagem.pe_constituicao) + habConstituicao,
          pe_inteligencia: Number(personagem.pe_inteligencia) + habInteligencia,
          pe_sabedoria: Number(personagem.pe_sabedoria) + habSabedoria,
          pe_carisma: Number(personagem.pe_carisma) + habCarisma,

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
      <div><h3>Upar Personagem </h3><hr/></div>

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
      <form className='pup_form' action={onUpar}>

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

        {exibirHabilidades?
          <div>

            <div className='pup_edit-top'>
              <strong>Pontos disponivel {2-qntHab}</strong><br/>
              <div className='pup_div-espacamento'>
                <label>Força</label>
                <div className='pup_div-espacamento-item'>
                  <label>{ getForca() }</label> /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar' onClick={()=>{
                    if(qntHab !== 2 )
                      setHabForca(onAumentar(habForca));
                  }}/>
                  {habForca}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habForca > 0 )
                      setHabForca(onDiminuir(habForca));
                  }}/>
                </div>
              </div>
            </div>

            <div className='pup_edit-centro'>
              <div className='pup_div-espacamento'>
                <label>Destreza</label>
                <div className='pup_div-espacamento-item'>
                  <label>{getDestreza()}</label>  /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar'onClick={()=>{
                    if(qntHab !== 2 )
                      setHabDestreza(onAumentar(habDestreza));
                  }}/>
                  {habDestreza}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habDestreza > 0 )
                      setHabDestreza(onDiminuir(habDestreza));
                  }}/> 
                </div>
              </div>
            </div>

            <div className='pup_edit-centro'>
              <div className='pup_div-espacamento'>
                <label>Constituição</label>
                <div className='pup_div-espacamento-item'>
                  <label>{getConstituicao()}</label> /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar'onClick={()=>{
                    if(qntHab !== 2 )
                      setHabConstituicao(onAumentar(habConstituicao));
                  }}/>
                  {habConstituicao}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habConstituicao > 0 )
                      setHabConstituicao(onDiminuir(habConstituicao));
                  }}/>
                </div>
              </div>
            </div>

            <div className='pup_edit-centro'>
              <div className='pup_div-espacamento'>
                <label>Inteligência</label>
                <div className='pup_div-espacamento-item'>
                  <label>{getInteligencia()}</label> /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar'onClick={()=>{
                    if(qntHab !== 2 )
                      setHabInteligencia(onAumentar(habInteligencia));
                  }}/>
                  {habInteligencia}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habInteligencia > 0 )
                      setHabInteligencia(onDiminuir(habInteligencia));
                  }}/>
                </div>
              </div>
            </div>

            <div className='pup_edit-centro'>
              <div className='pup_div-espacamento'>
                <label>Sabedoria</label>
                <div className='pup_div-espacamento-item'>
                  <label>{getSabedoria()}</label>  /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar'onClick={()=>{
                    if(qntHab !== 2 )
                      setHabSabedoria(onAumentar(habSabedoria));
                  }}/>
                  {habSabedoria}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habSabedoria > 0 )
                      setHabSabedoria(onDiminuir(habSabedoria));
                  }}/> 
                </div>
              </div>
            </div>

            <div className='pup_edit-bottom'>
              <div className='pup_div-espacamento'>
                <label>Carisma</label>
                <div className='pup_div-espacamento-item'>
                  <label>{getCarisma()}</label> /
                  <img className='pup_img-hab' src={expandir_mais} alt='aumentar'onClick={()=>{
                    if(qntHab !== 2 )
                      setHabCarisma(onAumentar(habCarisma));
                  }}/>
                  {habCarisma}
                  <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                    if(habCarisma > 0 )
                      setHabCarisma(onDiminuir(habCarisma));
                  }}/>
                </div>
              </div>
            </div>

          </div>:
          <div/>
        }

        {/* <div className='pup_edit-centro'>
          <strong>Pericias</strong>
          <div className='pup_div-prof'>
            
            
            {upacrobacia? 
              <input type="checkbox" checked disabled/>:
              <input type="checkbox" value={personagem.pe_proacrobacia} onChange={()=>{personagem.pe_proacrobacia = !personagem.pe_proacrobacia}} />
            }
            <label>Acrobacia <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            
             
            {uparcanismo? 
              <input type="checkbox" checked disabled/>:
              <input type="checkbox" value={personagem.pe_proarcanismo} onChange={()=>{personagem.pe_proarcanismo = !personagem.pe_proarcanismo}} />
            } 

            <label>Arcanismo <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upatletismo? 
              <input type="checkbox" checked disabled/>:
              <input type="checkbox" value={personagem.pe_proatletismo} onChange={(e)=>{personagem.pe_proatletismo = !personagem.pe_proatletismo}} />
            }
            <label>Atletismo <span className='pup-atrib'>(Força)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upatuacao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_proatuacao} onChange={(e)=>{personagem.pe_proatuacao = !personagem.pe_proatuacao}} />
            }
            <label>Atuação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upblefar? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_problefar} onChange={(e)=>{personagem.pe_problefar = !personagem.pe_problefar}} 
            />}
            <label>Blefar <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upfurtividade? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_profurtividade} onChange={(e)=>{personagem.pe_profurtividade = !personagem.pe_profurtividade}} />
            }
            <label>Furtividade <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uphistoria? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_prohistoria} onChange={(e)=>{personagem.pe_prohistoria = !personagem.pe_prohistoria}} />
            }
            <label>História <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upintimidacao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_prointimidacao} onChange={(e)=>{personagem.pe_prointimidacao = !personagem.pe_prointimidacao}} />
            }
            <label>Intimidação <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upintuicao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_prointuicao} onChange={(e)=>{personagem.pe_prointuicao = !personagem.pe_prointuicao}} />
            }
            <label>Intuição <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upinvestigacao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_proinvestigacao} onChange={(e)=>{personagem.pe_proinvestigacao = !personagem.pe_proinvestigacao}} />
            }
            <label>Investigação <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uplidaranimais? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_prolidaranimais} onChange={(e)=>{personagem.pe_prolidaranimais = !personagem.pe_prolidaranimais}} />
            }
            <label>Lidar com animais <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upmedicina? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_promedicina} onChange={(e)=>{personagem.pe_promedicina = !personagem.pe_promedicina}} />
            }
            <label>Medicina <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upnatureza? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_pronatureza} onChange={(e)=>{personagem.pe_pronatureza = !personagem.pe_pronatureza}} />
            }
            <label>Natureza <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uppercepcao? 
              <input type="checkbox" checked disabledcked/>: 
              <input type="checkbox" value={personagem.pe_propercepcao} onChange={(e)=>{personagem.pe_propercepcao = !personagem.pe_propercepcao}} />
            }
            <label>Percepção <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
          <div className='pup_div-prof'>
            {uppersuasao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_propersuasao} onChange={(e)=>{personagem.pe_propersuasao = !personagem.pe_propersuasao}} />
            }
            <label>Persuasão <span className='pup-atrib'>(Carisma)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upprestidigitacao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_proprestidigitacao} onChange={(e)=>{personagem.pe_proprestidigitacao = !personagem.pe_proprestidigitacao}} />
            }
            <label>Prestidigitação <span className='pup-atrib'>(Destreza)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upreligiao? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_proreligiao} onChange={(e)=>{personagem.pe_proreligiao = !personagem.pe_proreligiao}} />
            }
            <label>Religião <span className='pup-atrib'>(Inteligência)</span></label>
          </div>
          <div className='pup_div-prof'>
            {upsobrevivencia? 
              <input type="checkbox" checked disabled/>: 
              <input type="checkbox" value={personagem.pe_prosobrevivencia} onChange={(e)=>{personagem.pe_prosobrevivencia = !personagem.pe_prosobrevivencia}} />
            }
            <label>Sobrevivência <span className='pup-atrib'>(Sabedoria)</span></label>
          </div>
        
        </div> */}

        <div className='pup_div-rodape-botao'>
          <BtnSalvarForm esperando='Upando...' inicial='Upar'/>
        </div>
      </form>
    </div>
  );

}

export default PersonagemUpar;