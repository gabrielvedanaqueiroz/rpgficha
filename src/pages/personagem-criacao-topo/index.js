import './personagem-criacao-topo.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { ocultarBarras, exibirBarras, jClasses, jRacas } from '../../utils';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {collection, addDoc} from 'firebase/firestore';
import { AuthContext } from '../../utils/auth';
import Loading from '../../components/loading/index.js';
import Titulo25 from '../../components/titulo25';

function PersonagenCriacaoTopo(){

  const navigate                      = useNavigate();
  const {usuario}                     = useContext(AuthContext);  
  const [listaRaca, setListaRaca]           = useState([]);
  const [listaSubRaca, setListaSubRaca]     = useState([]);
  const [listaClasse, setListaClasse]       = useState([]);
  const [listaSubClasse, setListaSubClasse] = useState([]);
  const [loading, setLoading]         = useState(true);

  const nome        = useRef('');
  const antecedente = useRef('');
  const [optRaca, setOptionRaca]                = useState("");
  const [optSubraca, setOptionSubraca]          = useState("");
  const [optClasse, setOptionClasse]            = useState("");
  const [optSubclasse, setOptionSubclasse]      = useState("");
  const [optAlinhamento, setOptionAlinhamento]  = useState("");

  const [dadoVida, setDadoVida]                 = useState("");
  const [vidaNv1, setVidaNv1]                   = useState(0);
  const [CABase, setCABase]                     = useState(0);
  const [movimento, setMovimento]               = useState(0);
  const [idraca, setIdRaca]                     = useState(0);
  const [idclasse, setIdClasse]                 = useState(0);
  const [idhabilidadeconjuracao, setIdHabilidadeConjuracao]  = useState(0);

  function onSelecionarSubRaca(aRaca) {
    setListaSubRaca([]);
    setOptionSubraca('');

    const raca = jRacas.find((r) => r.rc_descricao === aRaca);
    setListaSubRaca(raca ? raca.rc_sub : []);
    setMovimento(raca.rc_movimento);
    setIdRaca(raca.rc_id);
  }

  function onSelecionarSubClasse(aClasse) {
    setListaSubClasse([]);
    setOptionSubclasse('');

    const classe = jClasses.find((c) => c.cl_descricao === aClasse);
    setListaSubClasse(classe ? classe.cl_sub : []);
    setDadoVida(classe.cl_dado_vida);
    setVidaNv1(classe.cl_vida_nivel_1);
    setCABase(classe.cl_cabase);
    setIdClasse(classe.cl_id);
    setIdHabilidadeConjuracao(classe.cl_idhabilidadeconjuracao);
  }

  useEffect(()=>{
    ocultarBarras();   
    
    setListaClasse(jClasses);
    setListaRaca(jRacas);
    setLoading(false);

    window.onpopstate = () => {
      exibirBarras();
    };

  },[]);

  async function onAvancar(e){

    e.preventDefault();

    let valido = false;
    let lnome = nome.current.value; 
    let lantecedente = antecedente.current.value; 

    valido = (lnome.trim() !== '');
    valido = valido && (optRaca !== '');
    valido = valido && (optClasse !== '');

    if(valido){
      await addDoc(collection(db, 'tb_personagem'),{
        pe_idjogador      : usuario?.uid.trim(),
        pe_nome           : lnome.trim(),
        pe_raca           : optRaca.trim(),
        pe_subraca        : optSubraca.trim(),
        pe_classe         : optClasse.trim(),
        pe_subclasse      : optSubclasse.trim(),
        pe_antecedente    : lantecedente.trim(),
        pe_tendencia      : optAlinhamento.trim(),
        pe_bproficiencia  : 2,
        pe_experiencia    : 0,
        pe_nivel          : 1,
        pe_vidadado       : dadoVida,
        pe_movimento      : movimento,
        pe_ativo          : false,
        pe_idhabilidadeconjuracao : idhabilidadeconjuracao,
        pe_idclasse               : idclasse,
        pe_idraca                 : idraca,
      })
      .then( (docRef) =>{

        let personagemCriado = {
          id: docRef.id,
          vidaNv1: vidaNv1,
          CABase: CABase,
          idraca: idraca,
          idclasse: idclasse,
          idhabilidadeconjuracao: idhabilidadeconjuracao,
        };
        localStorage.setItem('RF@personagem-criado', JSON.stringify(personagemCriado));
        navigate('/personagem-criacao-atributos', {replace:true});
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });

    }
    else{
      toast.error('Campos obrigatorios nao preenchidos');
    }
    
  }

  if(loading)
    return(<Loading/>); 

  return(
    <div className='pct_container'>

      <Titulo25 titulo='Criação de Personagem'/>
      <span>Vamos a criação</span>
      
      <form className='pct_form' onSubmit={onAvancar}>
        <div className='pct_edit-top'>
          <input type='text' placeholder='Nome do personagem' ref={nome}/>
        </div>
        <div className='pct_edit-top'>
          <select key="pct_selraca" value={optRaca} onChange={(e)=>{
            setOptionRaca(e.target.value);
            onSelecionarSubRaca(e.target.value);
          }}>
            <option value="">Raça</option>
            {
              listaRaca.map((item, index)=>{
                return(<option key={index} value={item.rc_descricao}>{item.rc_descricao}</option>) 
              })              
            }
          </select> 
        </div>
        <div className='pct_edit-bottom'>
          <select key="pct_selsubraca" value={optSubraca} onChange={(e)=>{setOptionSubraca(e.target.value);}}>
            <option value="">Sub-raça</option>
            { 
              listaSubRaca.map((item, index)=>{
                return(<option key={index} value={item}>{item}</option>);
              })
            }
          </select> 
        </div>
        <div className='pct_edit-top'>
          <select key="pct_selclasse" value={optClasse} onChange={(e)=>{
            setOptionClasse(e.target.value);
            onSelecionarSubClasse(e.target.value);
          }} >
            <option value="">Classe</option>
            {
              listaClasse.map((item, index)=>{
                return(<option key={index} value={item.cl_descricao}>{item.cl_descricao}</option>) 
              })              
            }
          </select>
        </div>
        <div className='pct_edit-bottom'>
        <select key="pct_selsubclasse" value={optSubclasse} onChange={(e)=>{setOptionSubclasse(e.target.value);}}>
            <option value="">Subclasse</option>
            {
              listaSubClasse.map((item, index)=>{
                return(<option key={index} value={item}>{item}</option>);
              })
            }
          </select> 
        </div>
        <div className='pct_edit-top'>
          <input type='text' placeholder='Antecedente' ref={antecedente}/>
        </div>
        <div className='pct_edit-bottom'>
        <select key="pct_selalinhamento" value={optAlinhamento} onChange={(e)=>{setOptionAlinhamento(e.target.value);}}>
            <option value="">Alinhamento</option>
            <option value="Leal e Bom">Leal e Bom</option>
            <option value="Neutro e Bom">Neutro e Bom</option>
            <option value="Caótico e Bom">Caótico e Bom</option>
            <option value="Leal e Neutro">Leal e Neutro</option>
            <option value="Neutro Puro">Neutro Puro</option>
            <option value="Caótico e Neutro">Caótico e Neutro</option>
            <option value="Leal e Mau">Leal e Mau</option>
            <option value="Neutro e Mau">Neutro e Mau</option>
            <option value="Caótico e Mau">Caótico e Mau</option>
          </select> 
        </div>
        
        <div className='pct_div-rodape-botao'>
          <BtnSalvarForm esperando='Salvando..' inicial='Avançar >>>'/>
        </div>

      </form>
    </div>
  )
}

export default PersonagenCriacaoTopo;