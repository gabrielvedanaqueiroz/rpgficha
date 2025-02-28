import './personagem-criacao-atributos.css';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';

function PersonagenCriacaoAtributos(){

  const navigate = useNavigate();

  const forca         = useRef('');
  const destreza      = useRef('');
  const constituicao  = useRef('');
  const inteligencia  = useRef('');
  const sabedoria     = useRef('');
  const carisma       = useRef('');
  const [modForca, setModForca]               = useState('');
  const [modDestreza, setModDestreza]         = useState('');
  const [modCostituicao, setModCostituicao]   = useState('');
  const [modInteligencia, setModInteligencia] = useState('');
  const [modSabedoria, setModSabedoria]       = useState('');
  const [modCarisma, setModCarisma]           = useState('');

  const personagemID  = localStorage.getItem('RF@personagemID');

  async function onAvancar(e){

    e.preventDefault();

    let valido = false
    let lforca        = forca.current.value; 
    let ldestreza     = destreza.current.value; 
    let lconstituicao = constituicao.current.value; 
    let linteligencia = inteligencia.current.value; 
    let lsabedoria    = sabedoria.current.value; 
    let lcarisma      = carisma.current.value; 

    valido = (lforca.trim() !== '');
    valido = valido && (ldestreza.trim() !== '');
    valido = valido && (lconstituicao.trim() !== '');
    valido = valido && (linteligencia.trim() !== '');
    valido = valido && (lsabedoria.trim() !== '');
    valido = valido && (lcarisma.trim() !== '');

    if(valido){
      const docRef = doc(db, "tb_personagem", personagemID);
      await updateDoc(docRef, {
          pe_forca: lforca.trim(),
          pe_destreza: ldestreza.trim(),
          pe_constituicao: lconstituicao.trim(),
          pe_inteligencia: linteligencia.trim(),
          pe_sabedoria: lsabedoria.trim(),
          pe_carisma: lcarisma.trim(),
        }
      )
      .then(()=>{
        navigate('/personagem-criacao-proficiencias', {replace:true});
      })
      .catch((error)=>{
        console.log('Erro ao editar: '+error);
        toast.error('Erro ao editar');
      });
      
    }
    else{
      toast.error('Campos obrigatorios nao preenchidos');
    }
    
  }

  function onModificador(aValor){
    let modificador = (aValor - 10) / 2;
    return Math.ceil(modificador);
  }

  function onChangeForca(e) {
    let valor = forca.current.value; 
    setModForca( onModificador(valor));
  }

  function onChangeDestreza(e) {
    let valor = destreza.current.value; 
    setModDestreza( onModificador(valor));
  }

  function onChangeCostituicao(e) {
    let valor = constituicao.current.value; 
    setModCostituicao( onModificador(valor));
  }

  function onChangeInteligencia(e) {
    let valor = inteligencia.current.value; 
    setModInteligencia( onModificador(valor));
  }

  function onChangeSabedoria(e) {
    let valor = sabedoria.current.value; 
    setModSabedoria( onModificador(valor));
  }

  function onChangeCarisma(e) {
    let valor = carisma.current.value; 
    setModCarisma( onModificador(valor));
  }

  return(
    <div className='pca_container'>
      <div className='pca_titulo'>
        <strong>Criação de Personagem</strong>
        <hr/>
      </div>
      
      <form className='pca_form' onSubmit={onAvancar}>
        <div className='pca_edit-top'>
          <input type='number' placeholder='Força' ref={forca} onChange={onChangeForca}/>
          <label>{modForca}</label>
        </div>
        <div className='pca_edit-mid'>
          <input type='number' placeholder='Destreza' ref={destreza} onChange={onChangeDestreza}/>
          <label>{modDestreza}</label>
        </div>
        <div className='pca_edit-mid'>
          <input type='number' placeholder='Constituicao' ref={constituicao} onChange={onChangeCostituicao}/>
          <label>{modCostituicao}</label>
        </div>
        <div className='pca_edit-mid'>
          <input type='number' placeholder='Inteligênia' ref={inteligencia} onChange={onChangeInteligencia}/>
          <label>{modInteligencia}</label>
        </div>
        <div className='pca_edit-mid'>
          <input type='number' placeholder='Sabedoria' ref={sabedoria} onChange={onChangeSabedoria}/>
          <label>{modSabedoria}</label>
        </div>
        <div className='pca_edit-bottom'>
          <input type='number' placeholder='Carisma' ref={carisma} onChange={onChangeCarisma}/>
          <label>{modCarisma}</label>
        </div>
        
        <div className='pca_div-rodape-botao'>
          <BtnSalvarForm esperando='Salvando..' inicial='Avançar >>>'/>
        </div>

      </form>
    </div>
  )

}

export default PersonagenCriacaoAtributos;