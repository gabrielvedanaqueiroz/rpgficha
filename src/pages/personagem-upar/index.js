import './personagem-upar.css';
import { useEffect, useState } from 'react';
import BtnSalvarForm from '../../components/btnsalvarform';
import { ocultarBarras, exibirBarras, buscarPersonagem, jXPNivel } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/';
import upar from '../../res/up.svg'
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import expandir_mais from '../../res/expandir_mais.svg';
import expandir_menos from '../../res/expandir_menos.svg';
import Titulo25 from '../../components/titulo25';

function PersonagemUpar(){

  const [personagem, setPersonagem]           = useState({});
  const [vida, setVida]                       = useState(0);
  const [bproficiencia, setBProficiencia]     = useState(0);
  
  const [habForca, setHabForca]               = useState(0);
  const [habDestreza, setHabDestreza]         = useState(0);
  const [habConstituicao, setHabConstituicao] = useState(0);
  const [habInteligencia, setHabInteligencia] = useState(0);
  const [habSabedoria, setHabSabedoria]       = useState(0);
  const [habCarisma, setHabCarisma]           = useState(0);

  const [qntHab, setQntHab] = useState(0);
  const [exibirHabilidades, setExibirHabilidades]   = useState(false);
  const [exibirBProficiencia, setExibirBProficiencia]   = useState(false);
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
  
    async function buscar() {
      let id = localStorage.getItem('RF@personagemID-upar');
      await buscarPersonagem(id).then((per)=>{
        setPersonagem(per);  
        
        setVida(Number(per.pe_vidabase));
  
        let exibirHab = ((per.pe_nivel === 3) || (per.pe_nivel === 7) || (per.pe_nivel === 15) || (per.pe_nivel === 17));
        setExibirHabilidades(exibirHab);

        let bpro = jXPNivel[per.pe_nivel+1].proficiencia;
        setExibirBProficiencia((bpro > per.pe_bproficiencia));
        setBProficiencia(bpro);

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

    let valido = false;

    if(exibirHabilidades)
      valido = (qntHab === 2);
    else
      valido = true;

    if(!valido)
      toast.error('Selecione os atributos');
    else{
      const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
      await updateDoc(docRef, {
          pe_nivel: personagem.pe_nivel+1,
          pe_vidabase: Number(vida),
          pe_forca: Number(personagem.pe_forca) + habForca,
          pe_destreza: Number(personagem.pe_destreza) + habDestreza,
          pe_constituicao: Number(personagem.pe_constituicao) + habConstituicao,
          pe_inteligencia: Number(personagem.pe_inteligencia) + habInteligencia,
          pe_sabedoria: Number(personagem.pe_sabedoria) + habSabedoria,
          pe_carisma: Number(personagem.pe_carisma) + habCarisma,
          pe_bproficiencia: Number(bproficiencia),

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

  }
  
  if(loading)
    return <Loading/>

  return(
    <div className='pup_container'>
      
      <Titulo25 titulo='Upar Personagem'/>

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

      {exibirBProficiencia ?
        <div className='pup_edit-centro'>
          <div className='pup_div-espacamento'>
            <label>Bônus Proficiência</label>
            <div className='pup_div-espacamento-item'>
              <label>{personagem.pe_bproficiencia}</label>        
              <img className='pup_img' src={upar} alt='upar'/>
              <div>{bproficiencia}</div>
            </div>
          </div>
        </div>: 
        <div/>
      }
     

      <form className='pup_form' action={onUpar}>

        <div className='pup_edit-bottom'>
          <div className='pup_div-espacamento'>
            <label>Vida</label>
            <div className='pup_div-espacamento-item'>
              <label>{personagem.pe_vidabase}</label>        
              <img className='pup_img' src={upar} alt='upar'/>
              <img className='pup_img-hab' src={expandir_mais} alt='aumentar' onClick={()=>{
                let vd = vida + 1;
                setVida(vd);
              }}/>
              {vida}
              <img className='pup_img-hab' src={expandir_menos} alt='diminuir' onClick={()=>{
                if(vida > personagem.pe_vidabase ){
                  let vd = vida - 1;
                  setVida(vd);
                }
              }}/>
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

        <div className='pup_div-rodape-botao'>
          <BtnSalvarForm esperando='Upando...' inicial='Upar'/>
        </div>
      </form>
    </div>
  );

}

export default PersonagemUpar;