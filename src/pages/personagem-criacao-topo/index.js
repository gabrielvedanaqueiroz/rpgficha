import './personagem-criacao-topo.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { ocultarBarras, exibirBarras } from '../../utils';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {collection, onSnapshot, addDoc} from 'firebase/firestore';
import { AuthContext } from '../../utils/auth';

function PersonagenCriacaoTopo(){

  const navigate                      = useNavigate();
  const {usuario}                     = useContext(AuthContext);  
  const [listaRaca, setListaRaca]     = useState([]);
  const [listaClasse, setListaClasse] = useState([]);
  const [loading, setLoading]         = useState(true);

  const [optRaca, setOptionRaca]                = useState("");
  const [optSubraca, setOptionSubraca]          = useState("");
  const [optClasse, setOptionClasse]            = useState("");
  const [optSubclasse, setOptionSubclasse]      = useState("");
  const [optAlinhamento, setOptionAlinhamento]  = useState("");
  const nome        = useRef('');
  const antecedente = useRef('');

  async function buscarRaca() {
    try{
      onSnapshot(collection(db, "tb_raca"), (snapshot)=>{
        let listaPost = [];

        snapshot.forEach((doc)=>{
          listaPost.push({
            rc_id: doc.id.trim(),
            rc_descricao : doc.data().rc_descricao.trim(),
          })
        });

        listaPost.sort((a, b)=> a.rc_descricao > b.rc_descricao);
        setListaRaca(listaPost);
      })
    }
    catch(error){
      console.error("Erro ao buscar documentos:", error);
    }
    finally {
      buscarClasse();
    }  
  }

  async function buscarClasse() {
    try{
      onSnapshot(collection(db, "tb_classe"), (snapshot)=>{
        let listaPost = [];

        snapshot.forEach((doc)=>{
          listaPost.push({
            cl_id: doc.id.trim(),
            cl_descricao : doc.data().cl_descricao.trim(),
          })
        });

        listaPost.sort((a, b)=> a.rc_descricao > b.rc_descricao);
        setListaClasse(listaPost);
      })
    }
    catch(error){
      console.error("Erro ao buscar documentos:", error);
    }
    finally {
      setLoading(false);
    }  
  }

  useEffect(()=>{
    ocultarBarras();   
    
    buscarRaca();

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
      })
      .then( (docRef) =>{
        // console.log(docRef.id);
        localStorage.setItem('RF@personagemID', docRef.id); //trocar
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
      
      <form className='pct_form' onSubmit={onAvancar}>
        <div className='pct_edit-top'>
          <input type='text' placeholder='Nome do personagem' ref={nome}/>
        </div>
        <div className='pct_edit-top'>
          <select id="pct_selraca" value={optRaca} onChange={(e)=>{setOptionRaca(e.target.value);}}>
            <option value="">Raça</option>
            {
              listaRaca.map((item)=>{
                return(
                  <option key={item.rc_id} value={item.rc_descricao}>{item.rc_descricao}</option>
                )
              })
            }
          </select> 
        </div>
        <div className='pct_edit-bottom'>
          <select id="pct_selraca" value={optSubraca} onChange={(e)=>{setOptionSubraca(e.target.value);}}>
            <option value="">Sub-raça</option>
            <option value="opcao1">Opção 1</option>
            <option value="opcao2">Opção 2</option>
            <option value="opcao3">Opção 3</option>
          </select> 
        </div>
        <div className='pct_edit-top'>
          <select id="pct_selraca" value={optClasse} onChange={(e)=>{setOptionClasse(e.target.value);}} >
            <option value="">Classe</option>
            {
              listaClasse.map((item)=>{
                return(
                  <option key={item.cl_id} value={item.cl_descricao}>{item.cl_descricao}</option>
                )
              })
            }
          </select>
        </div>
        <div className='pct_edit-bottom'>
        <select id="pct_selraca" value={optSubclasse} onChange={(e)=>{setOptionSubclasse(e.target.value);}}>
            <option value="">Subclasse</option>
            <option value="opcao1">Opção 1</option>
            <option value="opcao2">Opção 2</option>
            <option value="opcao3">Opção 3</option>
          </select> 
        </div>
        <div className='pct_edit-top'>
          <input type='text' placeholder='Antecedente' ref={antecedente}/>
        </div>
        <div className='pct_edit-bottom'>
        <select id="pct_selraca" value={optAlinhamento} onChange={(e)=>{setOptionAlinhamento(e.target.value);}}>
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