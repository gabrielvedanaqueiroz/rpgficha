import './modalca.css';
import { useRef } from 'react';
import BtnSalvarForm from '../btnsalvarform';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

function ModalCA(props){

  const numero = useRef(0);
  
  async function onSalvar(e) {

    let num = numero.current.value;
    if(num > 0){
      //salvar banco 

      const docRef = doc(db, "tb_personagem", props.pe_id.trim());
      await updateDoc(docRef, {
        pe_catotal: num,
      });
      
      props.onOcultar();
    }
    else
      toast.error('Campo obrigatório não pode ficar vazio')
  }

  return(
    <div className='overlay' key={props.pe_id}>
      <div className='mcat_container'>
        <div className='mcat_titulo'>
          <strong>Classe de Armadura</strong>
        </div>
        <form className='mcat_form' action={(e)=>{onSalvar(e)}} >
          <div className='mcat_div-item'>
            <label>Atual:</label>
            <label>{props.pe_catotal}</label>
          </div>
          <input className='mcat_edit' type='number' ref={numero} />
          <div className='mcat_botoes'>
            <button className='mcat_btn-cancelar' onClick={()=>{props.onOcultar()}}>Voltar</button>
            <BtnSalvarForm esperando='Salvando...' inicial='Salvar'/>
          </div>
        </form>
      </div>

    </div>
  )

}

export default ModalCA;
