import './personagem-criacao-proficiencias.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { exibirBarras, jClasses } from '../../utils';


function PersonagemCriacaoProficiencia() {

  const navigate = useNavigate();

  const proacrobacia        = useRef(false);
  const proarcanismo        = useRef(false);
  const proatletismo        = useRef(false);
  const proatuacao          = useRef(false);
  const problefar           = useRef(false);
  const profurtividade      = useRef(false);
  const prohistoria         = useRef(false);
  const prointimidacao      = useRef(false);
  const prointuicao         = useRef(false);
  const proinvestigacao     = useRef(false);
  const prolidaranimais     = useRef(false);
  const promedicina         = useRef(false);
  const pronatureza         = useRef(false);
  const propersusao         = useRef(false);
  const proprestidigitacao  = useRef(false);
  const propercepcao        = useRef(false);
  const proreligiao         = useRef(false);
  const prosobrevivencia    = useRef(false);

  const visacrobacia        = useRef(false);
  const visarcanismo        = useRef(false);
  const visatletismo        = useRef(false);
  const visatuacao          = useRef(false);
  const visblefar           = useRef(false);
  const visfurtividade      = useRef(false);
  const vishistoria         = useRef(false);
  const visintimidacao      = useRef(false);
  const visintuicao         = useRef(false);
  const visinvestigacao     = useRef(false);
  const vislidaranimais     = useRef(false);
  const vismedicina         = useRef(false);
  const visnatureza         = useRef(false);
  const vispersusao         = useRef(false);
  const visprestidigitacao  = useRef(false);
  const vispercepcao        = useRef(false);
  const visreligiao         = useRef(false);
  const vissobrevivencia    = useRef(false);

  //nao precisa mais destes componentes puxando do array jClasse
  const sgforca         = useRef(false);
  const sgdestreza      = useRef(false);
  const sgconstituicao  = useRef(false);
  const sginteligencia  = useRef(false);
  const sgsabedoria     = useRef(false);
  const sgcarisma       = useRef(false);
  
  const [personagemCriado, setPersonagemCriado] = useState({});
  const [classe, setClasse] = useState({});
  const [qntPericia, setQntPericia] = useState(0);

  useEffect(()=>{
    const data = localStorage.getItem("RF@personagem-criado");
    let per = JSON.parse(data);
    setPersonagemCriado(per);
    
    let LClasse = jClasses.find((c) => c.cl_id === per.idclasse);
    setClasse(LClasse);
    console('cl_proinicial '+ LClasse.cl_proinicial);
    console('cl_sginicial '+ LClasse.cl_sginicial);

    LClasse.cl_proinicial.map((num, index)=>{
      console('cl_proinicial '+ index + ' -> ' + num);

      switch (num) {
        case 1: visacrobacia.current = true; break;
        case 2: visarcanismo.current = true; break;
        case 3: visatletismo.current = true; break;
        case 4: visatuacao.current = true; break;
        case 5: visblefar.current = true; break;
        case 6: visfurtividade.current = true; break;
        case 7: vishistoria.current = true; break;
        case 8: visintimidacao.current = true; break;
        case 9: visintuicao.current = true; break;
        case 10: visinvestigacao.current = true; break;
        case 11: vislidaranimais.current = true; break;
        case 12: vismedicina.current = true; break;
        case 13: visnatureza.current = true; break;
        case 14: vispercepcao.current = true; break;
        case 15: vispersusao.current = true; break;
        case 16: visprestidigitacao.current = true; break;
        case 17: visreligiao.current = true; break;
        case 18: vissobrevivencia.current = true; break;
      }
    });

    LClasse.cl_sginicial.map((num, index)=>{
      console('cl_sginicial '+ index + ' -> ' + num);

      switch (num) {
        case 1: sgforca.current         = true;
        case 2: sgdestreza.current      = true;
        case 3: sgconstituicao.current  = true;
        case 4: sginteligencia.current  = true;
        case 5: sgsabedoria.current     = true;
        case 6: sgcarisma.current       = true;
      }
    });

    window.onpopstate = () => {
      exibirBarras();
    };
    
  }, []);

  function setPericiaEscolha(aCheck){
    let qnt = 0;
    if(aCheck)
      qnt = qntPericia + 1;
    else  
      qnt = qntPericia - 1;

    setQntPericia(qnt);
  }

  async function onAvancar(e){
  
    e.preventDefault();
    let validoPro = false;
    let validoQnt = false;
    let validoSG  = false;

    validoPro = proacrobacia?.current;
    validoPro = validoPro && proarcanismo?.current;
    validoPro = validoPro && proatletismo?.current;
    validoPro = validoPro && proatuacao?.current;
    validoPro = validoPro && problefar?.current;
    validoPro = validoPro && profurtividade?.current;
    validoPro = validoPro && prohistoria?.current;
    validoPro = validoPro && prointimidacao?.current;
    validoPro = validoPro && prointuicao?.current;
    validoPro = validoPro && proinvestigacao?.current;
    validoPro = validoPro && prolidaranimais?.current;
    validoPro = validoPro && promedicina?.current;
    validoPro = validoPro && pronatureza?.current;
    validoPro = validoPro && propersusao?.current;
    validoPro = validoPro && proprestidigitacao?.current;
    validoPro = validoPro && propercepcao?.current;
    validoPro = validoPro && proreligiao?.current;
    validoPro = validoPro && prosobrevivencia?.current;
    
    validoQnt = qntPericia === classe.cl_proqnt;

    validoSG = sgforca?.current;
    validoSG = validoSG && sgdestreza?.current;
    validoSG = validoSG && sgconstituicao?.current;
    validoSG = validoSG && sginteligencia?.current;
    validoSG = validoSG && sgsabedoria?.current;
    validoSG = validoSG && sgcarisma?.current;

    if(!validoQnt)
      toast.error('Erro na quantidade de pericias selecionadas');

    if(!validoPro)
      toast.error('Proficiencias não selecionadas');

    if(!validoSG)
      toast.error('Salva-guardas não selecionadas');

    let valido = validoPro && validoSG;

    if(valido){
      const docRef = doc(db, "tb_personagem", personagemCriado.id);
      await updateDoc(docRef, {
          pe_proacrobacia: proacrobacia?.current.checked,
          pe_proarcanismo: proarcanismo?.current.checked,
          pe_proatletismo: proatletismo?.current.checked,
          pe_proatuacao: proatuacao?.current.checked,
          pe_problefar: problefar?.current.checked,
          pe_profurtividade: profurtividade?.current.checked,
          pe_prohistoria: prohistoria?.current.checked,
          pe_prointimidacao: prointimidacao.current.checked,
          pe_prointuicao: prointuicao.current.checked,
          pe_proinvestigacao: proinvestigacao.current.checked,
          pe_prolidaranimais: prolidaranimais.current.checked,
          pe_promedicina: promedicina.current.checked,
          pe_pronatureza: pronatureza.current.checked,
          pe_proprestidigitacao: proprestidigitacao.current.checked,
          pe_propercepcao: propercepcao.current.checked,
          pe_proreligiao: proreligiao.current.checked,
          pe_prosobrevivencia: prosobrevivencia.current.checked,
          pe_propersusao: propersusao.current.checked,
          pe_sgforca: sgforca.current.checked,
          pe_sgdestreza: sgdestreza.current.checked,
          pe_sgconstituicao: sgconstituicao.current.checked,
          pe_sginteligencia: sginteligencia.current.checked,
          pe_sgsabedoria: sgsabedoria.current.checked,
          pe_sgcarisma: sgcarisma.current.checked,
      })
      .then( () =>{
        exibirBarras();
        localStorage.setItem('RF@personagem-criado', JSON.stringify({}));
        navigate('/personagens', {replace:true});
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });

    }
    
  }

  return(
    <div className='pcp_container'>
      <div className='pct_titulo'>
        <strong>Criação de Personagem</strong>
        <hr/>
      </div>
      <form className='pcp_form' onSubmit={onAvancar}>
        <div className='pcp_edit-top'>
          <strong>Escolha suas pericias</strong><br/>
          <p>Escolha {classe.cl_proqnt} dentre elas ({qntPericia})</p><br/>
          <div style={{ display: visacrobacia.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proacrobacia} onChange={()=>{ 
              setPericiaEscolha(proacrobacia.current.checked)
            }}/>
            <label>Acrobacia <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div style={{ display: visarcanismo.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proarcanismo} onChange={()=>{ 
              setPericiaEscolha(proarcanismo.current.checked)
            }}/>
            <label>Arcanismo <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visatletismo.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proatletismo} onChange={()=>{ 
              setPericiaEscolha(proatletismo.current.checked)
            }}/>
            <label>Atletismo <span className='pcp-atrib'>(Força)</span></label>
          </div>
          <div style={{ display: visatuacao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proatuacao} onChange={()=>{ 
              setPericiaEscolha(proatuacao.current.checked)
            }}/>
            <label>Atuação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visblefar.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={problefar} onChange={()=>{ 
              setPericiaEscolha(problefar.current.checked)
            }}/>
            <label>Blefar <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visfurtividade.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={profurtividade} onChange={()=>{ 
              setPericiaEscolha(profurtividade.current.checked)
            }}/>
            <label>Furtividade <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div style={{ display: vishistoria.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={prohistoria} onChange={()=>{ 
              setPericiaEscolha(prohistoria.current.checked)
            }}/>
            <label>História <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: visintimidacao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={prointimidacao} onChange={()=>{ 
              setPericiaEscolha(prointimidacao.current.checked)
            }}/>
            <label>Intimidação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visintuicao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={prointuicao} onChange={()=>{ 
              setPericiaEscolha(prointuicao.current.checked)
            }}/>
            <label>Intuição <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visinvestigacao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proinvestigacao} onChange={()=>{ 
              setPericiaEscolha(proinvestigacao.current.checked)
            }}/>
            <label>Investigação <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vislidaranimais.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={prolidaranimais} onChange={()=>{ 
              setPericiaEscolha(prolidaranimais.current.checked)
            }}/>
            <label>Lidar com animais <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: vismedicina.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={promedicina} onChange={()=>{ 
              setPericiaEscolha(promedicina.current.checked)
            }}/>
            <label>Medicina <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visnatureza.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={pronatureza} onChange={()=>{ 
              setPericiaEscolha(pronatureza.current.checked)
            }}/>
            <label>Natureza <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vispercepcao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={propercepcao} onChange={()=>{ 
              setPericiaEscolha(propercepcao.current.checked)
            }}/>
            <label>Percepção <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: vispersusao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={propersusao} onChange={()=>{ 
              setPericiaEscolha(propersusao.current.checked)
            }}/>
            <label>Persuasão <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visprestidigitacao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proprestidigitacao} onChange={()=>{ 
              setPericiaEscolha(proprestidigitacao.current.checked)
            }}/>
            <label>Prestidigitação <span className='pcp-atrib'>(Destreza)</span></label>
          </div>          
          <div style={{ display: visreligiao.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={proreligiao} onChange={()=>{ 
              setPericiaEscolha(proreligiao.current.checked)
            }}/>
            <label>Religião <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vissobrevivencia.current.checked ? "block" : "none" }}>
            <input type="checkbox" ref={prosobrevivencia} onChange={()=>{ 
              setPericiaEscolha(prosobrevivencia.current.checked)
            }}/>
            <label>Sobrevivência <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
        </div>
        
        <div className='pcp_edit-bottom'>
          <strong>Salva-guardas</strong>
          <div>
            <input type="checkbox" ref={sgforca}/>
            <label>Força</label>
          </div>
          <div>
            <input type="checkbox" ref={sgdestreza}/>
            <label>Destreza</label>
          </div>
          <div>
            <input type="checkbox" ref={sgconstituicao}/>
            <label>Constituilçao</label>
          </div>
          <div>
            <input type="checkbox" ref={sginteligencia}/>
            <label>Inteligência</label>
          </div>
          <div>
            <input type="checkbox" ref={sgsabedoria}/>
            <label>Sabedoria</label>
          </div>
          <div>
            <input type="checkbox" ref={sgcarisma}/>
            <label>Carisma</label>
          </div>
        </div>
        
        <div className='pcp_div-rodape-botao'>
          <BtnSalvarForm esperando='Salvando..' inicial='Avançar >>>'/>
        </div>

      </form>
    </div>
  );

}

export default PersonagemCriacaoProficiencia;