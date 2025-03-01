import './personagem-criacao-topo.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { ocultarBarras, exibirBarras } from '../../utils';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {collection, addDoc} from 'firebase/firestore';
import { AuthContext } from '../../utils/auth';

function PersonagenCriacaoTopo(){

  const navigate                      = useNavigate();
  const {usuario}                     = useContext(AuthContext);  
  const [listaRaca, setListaRaca]           = useState([]);
  const [listaSubRaca, setListaSubRaca]     = useState([]);
  const [listaClasse, setListaClasse]       = useState([]);
  const [listaSubClasse, setListaSubClasse] = useState([]);
  const [loading, setLoading]         = useState(true);

  const [optRaca, setOptionRaca]                = useState("");
  const [optSubraca, setOptionSubraca]          = useState("");
  const [optClasse, setOptionClasse]            = useState("");
  const [optSubclasse, setOptionSubclasse]      = useState("");
  const [optAlinhamento, setOptionAlinhamento]  = useState("");
  const [dadoVida, setDadoVida]                 = useState("");
  const [vidaNv1, setVidaNv1]                   = useState(0);
  const [CABase, setCABase]                     = useState(0);
  const [movimento, setMovimento]               = useState(0);
  const [habilidadeconjuracao, setHabilidadeConjuracao]  = useState('');
  const nome        = useRef('');
  const antecedente = useRef('');

  //classe
  const jClasses = [
    {
      "cl_descricao": "Bárbaro",
      "cl_dado_vida": "d12",
      "cl_vida_nivel_1": 12,
      "cl_cabase": 10,
      "cl_habilidadeconjuracao": "", 
      "cl_sub": ["Caminho do Berserker", "Caminho do Guerreiro Totêmico"]
    },
    {
      "cl_descricao": "Bardo",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 11,
      "cl_habilidadeconjuracao": "8+bprof+Carisma", 
      "cl_sub": ["Colégio do Conhecimento", "Colégio do Valor"]
    },
    {
      "cl_descricao": "Bruxo",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 11,
      "cl_habilidadeconjuracao": "8+bprof+Carisma", 
      "cl_sub": ["Arquifada", "O Grande Antigo", "O Senhor Imortal"]
    },
    {
      "cl_descricao": "Clérigo",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 16,
      "cl_habilidadeconjuracao": "8+bprof+Sabedoria", 
      "cl_sub": [
        "Domínio da Vida",
        "Domínio do Conhecimento",
        "Domínio da Luz",
        "Domínio da Natureza",
        "Domínio da Tempestade",
        "Domínio do Engano",
        "Domínio da Guerra"
      ]
    },
    {
      "cl_descricao": "Druida",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 12,
      "cl_habilidadeconjuracao": "8+bprof+Sabedoria", 
      "cl_sub": ["Círculo da Terra", "Círculo da Lua"]
    },
    {
      "cl_descricao": "Feiticeiro",
      "cl_dado_vida": "d6",
      "cl_vida_nivel_1": 6,
      "cl_cabase": 10,
      "cl_habilidadeconjuracao": "8+bprof+Carisma", 
      "cl_sub": ["Linhagem Dracônica", "Magia Selvagem"]
    },
    {
      "cl_descricao": "Guerreiro",
      "cl_dado_vida": "d10",
      "cl_vida_nivel_1": 10,
      "cl_cabase": 16,
      "cl_habilidadeconjuracao": "8+bprof+Inteligencia", 
      "cl_sub": [
        "Arquétipo do Campeão",
        "Arquétipo do Mestre de Batalha",
        "Arquétipo do Cavaleiro Arcano"
      ]
    },
    {
      "cl_descricao": "Ladino",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 11,
      "cl_habilidadeconjuracao": "8+bprof+Intelgencia", 
      "cl_sub": [
        "Tradição do Ladrão",
        "Tradição do Assassino",
        "Tradição do Trapaceiro Arcano"
      ]
    },
    {
      "cl_descricao": "Mago",
      "cl_dado_vida": "d6",
      "cl_vida_nivel_1": 6,
      "cl_cabase": 10,
      "cl_habilidadeconjuracao": "8+bprof+Inte", 
      "cl_sub": [
        "Escola de Abjuração",
        "Escola de Adivinhação",
        "Escola de Evocação",
        "Escola de Ilusão",
        "Escola de Necromancia",
        "Escola de Transmutação",
        "Escola de Conjuração",
        "Escola de Encantamento"
      ]
    },
    {
      "cl_descricao": "Monge",
      "cl_dado_vida": "d8",
      "cl_vida_nivel_1": 8,
      "cl_cabase": 10,
      "cl_habilidadeconjuracao": "", 
      "cl_sub": [
        "Caminho da Mão Aberta",
        "Caminho da Sombra",
        "Caminho dos Quatro Elementos"
      ]
    },
    {
      "cl_descricao": "Paladino",
      "cl_dado_vida": "d10",
      "cl_vida_nivel_1": 10,
      "cl_cabase": 16,
      "cl_habilidadeconjuracao": "8+bprof+Carisma", 
      "cl_sub": [
        "Juramento de Devoção",
        "Juramento dos Anciões",
        "Juramento da Vingança"
      ]
    },
    {
      "cl_descricao": "Patrulheiro",
      "cl_dado_vida": "d10",
      "cl_vida_nivel_1": 10,
      "cl_cabase": 14,
      "cl_habilidadeconjuracao": "8+bprof+Sab", 
      "cl_sub": ["Conclave do Caçador", "Conclave Mestre das Feras"]
    }
  ];

  //raca
  const jRacas = [
    {
        "rc_descricao": "Anão",
        "rc_movimento": 5,
        "rc_sub": [
            "da Colina",
            "da Montanha"
        ]
    },
    {
        "rc_descricao": "Elfo",
        "rc_movimento": 6,
        "rc_sub": [
            "Alto Elfo",
            "Elfo da Floresta",
            "Elfo Negro (Drow)"
        ]
    },
    {
        "rc_descricao": "Halfling",
        "rc_movimento": 5,
        "rc_sub": [
            "Pés-Leves",
            "Robusto"
        ]
    },
    {
        "rc_descricao": "Humano",
        "rc_movimento": 6,
        "rc_sub": [
            "Padrão",
            "Variante"
        ]
    },
    {
        "rc_descricao": "Draconato",
        "rc_movimento": 6,
        "rc_sub": [
            "Azul",
            "Branco",
            "Bronze",
            "Cobre",
            "Latão",
            "Negro",
            "Ouro",
            "Prata",
            "Verde",
            "Vermelho",
        ]
    },
    {
        "rc_descricao": "Gnomo",
        "rc_movimento": 5,
        "rc_sub": [
            "Gnomo da Floresta",
            "Gnomo das Rochas"
        ]
    },
    {
        "rc_descricao": "Meio-Elfo",
        "rc_movimento": 6,
        "rc_sub": [
            "Sem sub-raças"
        ]
    },
    {
        "rc_descricao": "Meio-Orc",
        "rc_movimento": 6,
        "rc_sub": [
            "Sem sub-raças"
        ]
    },
    {
        "rc_descricao": "Tiefling",
        "rc_movimento": 6,
        "rc_sub": [
            "Sem sub-raças"
        ]
    }
  ];

  function onSelecionarSubRaca(aRaca) {
    setListaSubRaca([]);
    const raca = jRacas.find((r) => r.rc_descricao === aRaca);
    setListaSubRaca(raca ? raca.rc_sub : []);
    setMovimento(raca.rc_movimento);
  }

  function onSelecionarSubClasse(aClasse) {
    setListaSubClasse([]);
    setDadoVida('');
    const classe = jClasses.find((c) => c.cl_descricao === aClasse);
    setListaSubClasse(classe ? classe.cl_sub : []);
    setDadoVida('1'+classe.cl_dado_vida);
    setVidaNv1(classe.cl_vida_nivel_1);
    setCABase(classe.cl_cabase);
    setHabilidadeConjuracao(classe.cl_cabasecabase);
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

    let valido = false
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
        // pe_habilidadeconjuracao : habilidadeconjuracao,
      })
      .then( (docRef) =>{

        let personagemCriado = {
          id: docRef.id,
          vidaNv1: vidaNv1,
          CABase: CABase,
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
    return <div>carregand...</div>

  return(
    <div className='pct_container'>
      <div className='pct_titulo'>
        <strong>Criação de Personagem</strong>
        <hr/>
      </div>
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