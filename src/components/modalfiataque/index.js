import './modalfiataque.css';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import BtnSalvarForm from '../btnsalvarform';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

function ModalFiAtaque(props){

  const personagemID = props.personagemID;
  const nome    = useRef(props.nome);
  const alcance = useRef(props.alcance);
  const bonus   = useRef(props.bonus);
  const dano    = useRef(props.dano);
  const tipo    = useRef(props.tipo);

  async function onSalvar(e){

    let valido = false;

    valido = nome.current?.value.trim() !== '';
    valido = valido && alcance.current?.value.trim() !== '';
    valido = valido && bonus.current?.value !== '';
    valido = valido && dano.current?.value.trim()!== '';
    valido = valido && tipo.current?.value.trim() !== '';
    
    if(valido){

      await addDoc(collection(db, 'tb_ataque'),{
        at_idpersonagem: personagemID.trim(),
        at_descricao: nome.current?.value.trim(),
        at_alcance: alcance.current?.value.trim(),
        at_bonus: bonus.current?.value,
        at_dano: dano.current?.value.trim(),
        at_tipo: tipo.current?.value.trim(),
      })
      .then( () =>{
        props.onOcultar();
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });
    }
    else  
      toast.warning('Preencha campos obrigadotorios')
  }

  function onFecharModal(){
    props.onOcultar();
  }

  return(
    <div>
      <div className="overlay">
        <div className='mii_container'>
          <div className='mii_titulo'>
            <strong >Cadastrar Ataque</strong>
          </div>
          <form className='mii_form' action={onSalvar}>
            <div>
              <input className='mii_edit' type='text' placeholder="Nome" ref={nome}/>
              <input className='mii_edit' type='text' placeholder="Alcance" ref={alcance} />
              <input className='mii_edit' type='number' placeholder="Bonus" ref={bonus} />
              <input className='mii_edit' type='text' placeholder="Dano" ref={dano} />
              <input className='mii_edit' type='text' placeholder="Tipo" ref={tipo} />
            </div>
            <div className='mii_botoes'>
              <button className='mii_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>Cancelar</button>
              <BtnSalvarForm/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalFiAtaque;