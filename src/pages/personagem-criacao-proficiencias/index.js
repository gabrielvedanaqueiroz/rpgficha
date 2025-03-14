import './personagem-criacao-proficiencias.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { exibirBarras, jClasses } from '../../utils';
import Loading from '../../components/loading';

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

  const [visacrobacia, setVisAcrobacia]             = useState(false);
  const [visarcanismo, setVisArcanismo]             = useState(false);
  const [visatletismo, setVisAtletismo]             = useState(false);
  const [visatuacao, setVisAtuacao]                 = useState(false);
  const [visblefar, setVisBlefar]                   = useState(false);
  const [visfurtividade, setVisFurtividade]         = useState(false);
  const [vishistoria, setVisHistoria]               = useState(false);
  const [visintimidacao, setVisIntimidacao]         = useState(false);
  const [visintuicao, setVisIntuicao]               = useState(false);
  const [visinvestigacao, setVisInvestigacao]       = useState(false);
  const [vislidaranimais, setVislidarAnimais]       = useState(false);
  const [vismedicina, setVisMedicina]               = useState(false);
  const [visnatureza, setVisNatureza]               = useState(false);
  const [vispersusao, setVisPersuasao]              = useState(false);
  const [visprestidigitacao, setVisPrestidigitacao] = useState(false);
  const [vispercepcao, setVisPercepcao]             = useState(false);
  const [visreligiao, setVisReligicao]              = useState(false);
  const [vissobrevivencia, setVisSobrevivencia]     = useState(false);

  const [sgforca, setSGForca]                 = useState(false);
  const [sgdestreza, setSGDestreza]           = useState(false);
  const [sgconstituicao, setSGConstituicao]   = useState(false);
  const [sginteligencia, setSGInteligecia]    = useState(false);
  const [sgsabedoria, setSGSabedoria]         = useState(false);
  const [sgcarisma, setSGCarisma]             = useState(false);
  
  const [personagemCriado, setPersonagemCriado] = useState({});
  const [classe, setClasse] = useState({});
  const [qntPericia, setQntPericia] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const data = localStorage.getItem("RF@personagem-criado");
    let per = JSON.parse(data);
    setPersonagemCriado(per);
    
    let LClasse = jClasses.find((c) => c.cl_id === per.idclasse);
    setClasse(LClasse);
    // console.log('cl_proinicial '+ LClasse.cl_proinicial);
    // console.log('cl_sginicial '+ LClasse.cl_sginicial);

    LClasse.cl_proinicial.map((num, index)=>{
      // console.log('cl_proinicial '+ index + ' -> ' + num);
      switch (num) {
        case 1: setVisAcrobacia(true); break;
        case 2: setVisArcanismo(true); break;
        case 3: setVisAtletismo(true); break;
        case 4: setVisAtuacao(true); break;
        case 5: setVisBlefar(true); break;
        case 6: setVisFurtividade(true); break;
        case 7: setVisHistoria(true); break;
        case 8: setVisIntimidacao(true); break;
        case 9: setVisIntuicao(true); break;
        case 10: setVisInvestigacao(true); break;
        case 11: setVislidarAnimais(true); break;
        case 12: setVisMedicina(true); break;
        case 13: setVisNatureza(true); break;
        case 14: setVisPercepcao(true); break;
        case 15: setVisPersuasao(true); break;
        case 16: setVisPrestidigitacao(true); break;
        case 17: setVisReligicao(true); break;
        case 18: setVisSobrevivencia(true); break;
      }
    });

    LClasse.cl_sginicial.map((num, index)=>{
      // console.log('cl_sginicial '+ index + ' -> ' + num);
      switch (num) {
        case 1: setSGForca(true);break;
        case 2: setSGDestreza(true);break;
        case 3: setSGConstituicao(true);break;
        case 4: setSGInteligecia(true);break;
        case 5: setSGSabedoria(true);break;
        case 6: setSGCarisma(true);break;
      }
    });

    window.onpopstate = () => {
      exibirBarras();
    };
    
    setIsLoading(false);
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
    let validoQnt = false;
    
    validoQnt = qntPericia === classe.cl_proqnt;
    
    if(!validoQnt)
      toast.error('Erro na quantidade de pericias selecionadas');

    if(validoQnt){
      const docRef = doc(db, "tb_personagem", personagemCriado.id);
      await updateDoc(docRef, {
          pe_proacrobacia: proacrobacia.current.checked,
          pe_proarcanismo: proarcanismo.current.checked,
          pe_proatletismo: proatletismo.current.checked,
          pe_proatuacao: proatuacao.current.checked,
          pe_problefar: problefar.current.checked,
          pe_profurtividade: profurtividade.current.checked,
          pe_prohistoria: prohistoria.current.checked,
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
          pe_sgforca: sgforca,
          pe_sgdestreza: sgdestreza,
          pe_sgconstituicao: sgconstituicao,
          pe_sginteligencia: sginteligencia,
          pe_sgsabedoria: sgsabedoria,
          pe_sgcarisma: sgcarisma,
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

  if(isLoading)
    return <Loading/>

  return(
    <div className='pcp_container'>
      <div className='pct_titulo'>
        <strong>Criação de Personagem</strong>
        <hr/>
      </div>
      <form className='pcp_form' onSubmit={onAvancar}>
        <div className='pcp_edit-mid'>
          <strong>Escolha suas pericias</strong><br/>
          <p>Escolha {classe.cl_proqnt} dentre elas ({qntPericia})</p><br/>
          <div style={{ display: visacrobacia ? "block" : "none" }}>
            <input type="checkbox" ref={proacrobacia} onChange={()=>{ 
              setPericiaEscolha(proacrobacia.current.checked)
            }}/>
            <label>Acrobacia <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div style={{ display: visarcanismo ? "block" : "none" }}>
            <input type="checkbox" ref={proarcanismo} onChange={()=>{ 
              setPericiaEscolha(proarcanismo.current.checked)
            }}/>
            <label>Arcanismo <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visatletismo ? "block" : "none" }}>
            <input type="checkbox" ref={proatletismo} onChange={()=>{ 
              setPericiaEscolha(proatletismo.current.checked)
            }}/>
            <label>Atletismo <span className='pcp-atrib'>(Força)</span></label>
          </div>
          <div style={{ display: visatuacao ? "block" : "none" }}>
            <input type="checkbox" ref={proatuacao} onChange={()=>{ 
              setPericiaEscolha(proatuacao.current.checked)
            }}/>
            <label>Atuação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visblefar ? "block" : "none" }}>
            <input type="checkbox" ref={problefar} onChange={()=>{ 
              setPericiaEscolha(problefar.current.checked)
            }}/>
            <label>Blefar <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visfurtividade ? "block" : "none" }}>
            <input type="checkbox" ref={profurtividade} onChange={()=>{ 
              setPericiaEscolha(profurtividade.current.checked)
            }}/>
            <label>Furtividade <span className='pcp-atrib'>(Destreza)</span></label>
          </div>
          <div style={{ display: vishistoria ? "block" : "none" }}>
            <input type="checkbox" ref={prohistoria} onChange={()=>{ 
              setPericiaEscolha(prohistoria.current.checked)
            }}/>
            <label>História <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: visintimidacao ? "block" : "none" }}>
            <input type="checkbox" ref={prointimidacao} onChange={()=>{ 
              setPericiaEscolha(prointimidacao.current.checked)
            }}/>
            <label>Intimidação <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visintuicao ? "block" : "none" }}>
            <input type="checkbox" ref={prointuicao} onChange={()=>{ 
              setPericiaEscolha(prointuicao.current.checked)
            }}/>
            <label>Intuição <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visinvestigacao ? "block" : "none" }}>
            <input type="checkbox" ref={proinvestigacao} onChange={()=>{ 
              setPericiaEscolha(proinvestigacao.current.checked)
            }}/>
            <label>Investigação <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vislidaranimais ? "block" : "none" }}>
            <input type="checkbox" ref={prolidaranimais} onChange={()=>{ 
              setPericiaEscolha(prolidaranimais.current.checked)
            }}/>
            <label>Lidar com animais <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: vismedicina ? "block" : "none" }}>
            <input type="checkbox" ref={promedicina} onChange={()=>{ 
              setPericiaEscolha(promedicina.current.checked)
            }}/>
            <label>Medicina <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: visnatureza ? "block" : "none" }}>
            <input type="checkbox" ref={pronatureza} onChange={()=>{ 
              setPericiaEscolha(pronatureza.current.checked)
            }}/>
            <label>Natureza <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vispercepcao ? "block" : "none" }}>
            <input type="checkbox" ref={propercepcao} onChange={()=>{ 
              setPericiaEscolha(propercepcao.current.checked)
            }}/>
            <label>Percepção <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
          <div style={{ display: vispersusao ? "block" : "none" }}>
            <input type="checkbox" ref={propersusao} onChange={()=>{ 
              setPericiaEscolha(propersusao.current.checked)
            }}/>
            <label>Persuasão <span className='pcp-atrib'>(Carisma)</span></label>
          </div>
          <div style={{ display: visprestidigitacao ? "block" : "none" }}>
            <input type="checkbox" ref={proprestidigitacao} onChange={()=>{ 
              setPericiaEscolha(proprestidigitacao.current.checked)
            }}/>
            <label>Prestidigitação <span className='pcp-atrib'>(Destreza)</span></label>
          </div>          
          <div style={{ display: visreligiao ? "block" : "none" }}>
            <input type="checkbox" ref={proreligiao} onChange={()=>{ 
              setPericiaEscolha(proreligiao.current.checked)
            }}/>
            <label>Religião <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div style={{ display: vissobrevivencia ? "block" : "none" }}>
            <input type="checkbox" ref={prosobrevivencia} onChange={()=>{ 
              setPericiaEscolha(prosobrevivencia.current.checked)
            }}/>
            <label>Sobrevivência <span className='pcp-atrib'>(Sabedoria)</span></label>
          </div>
        </div>
        
        <div className='pcp_edit-bottom'>
          
        </div>
        
        <div className='pcp_div-rodape-botao'>
          <BtnSalvarForm esperando='Salvando..' inicial='Avançar >>>'/>
        </div>

      </form>
    </div>
  );

}

export default PersonagemCriacaoProficiencia;