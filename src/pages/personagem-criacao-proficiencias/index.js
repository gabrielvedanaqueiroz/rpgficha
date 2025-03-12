import './personagem-criacao-proficiencias.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { exibirBarras } from '../../utils';


function PersonagemCriacaoProficiencia() {

  const navigate = useNavigate();

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

  const sgforca = useRef(false);
  const sgdestreza = useRef(false);
  const sgconstituicao = useRef(false);
  const sginteligencia = useRef(false);
  const sgsabedoria = useRef(false);
  const sgcarisma = useRef(false);
  
  const [personagemCriado, setPersonagemCriado] = useState({});

  useEffect(()=>{
    const data = localStorage.getItem("RF@personagem-criado");
    setPersonagemCriado(JSON.parse(data));

    window.onpopstate = () => {
      exibirBarras();
    };
    
  }, []);

  async function onAvancar(e){
  
    e.preventDefault();
    let validoPro = false;
    let validoSG = false;

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
    validoPro = validoPro && propersuasao?.current;
    validoPro = validoPro && proprestidigitacao?.current;
    validoPro = validoPro && propercepcao?.current;
    validoPro = validoPro && proreligiao?.current;
    validoPro = validoPro && prosobrevivencia?.current;
    
    validoSG = sgforca?.current;
    validoSG = validoSG && sgdestreza?.current;
    validoSG = validoSG && sgconstituicao?.current;
    validoSG = validoSG && sginteligencia?.current;
    validoSG = validoSG && sgsabedoria?.current;
    validoSG = validoSG && sgcarisma?.current;

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
          pe_propersuasao: propersuasao.current.checked,
          pe_proprestidigitacao: proprestidigitacao.current.checked,
          pe_propercepcao: propercepcao.current.checked,
          pe_proreligiao: proreligiao.current.checked,
          pe_prosobrevivencia: prosobrevivencia.current.checked,
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
          <strong>Escolha suas pericias</strong>
          <div>
            <input type="checkbox" ref={proacrobacia}/>
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
            <input type="checkbox" ref={propercepcao}/>
            <label>Percepção <span className='pcp-atrib'>(Sabedoria)</span></label>
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
            <input type="checkbox" ref={proreligiao}/>
            <label>Religião <span className='pcp-atrib'>(Inteligência)</span></label>
          </div>
          <div>
            <input type="checkbox" ref={prosobrevivencia}/>
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