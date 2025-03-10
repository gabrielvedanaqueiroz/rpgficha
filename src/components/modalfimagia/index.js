import './modalfimagia.css';
import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConnection';
import {doc, getDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loading from '../loading';

function ModalFiMagia(props){

  const idMagia = props.mg_id;
  
  const [magia, setMagia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function buscar(){

      const postRef = doc(db, 'tb_magia', idMagia);  //metodo procurando id especifico
      await getDoc(postRef)
      .then((snapshot)=>{

        if(snapshot.exists){
          setMagia({
              mg_nome: snapshot.data().mg_nome.trim(),
              mg_descricao: snapshot.data().mg_descricao.trim(),
              mg_alcance: snapshot.data().mg_alcance.trim(),
              mg_nivel: snapshot.data().mg_nivel,
              mg_dano: snapshot.data().mg_dano.trim(),
              mg_tempoconjuracao: snapshot.data().mg_tempoconjuracao.trim(),
              mg_componentes: snapshot.data().mg_componentes.trim(),
              mg_duracao: snapshot.data().mg_duracao.trim(),
          });
        }
      })
      .catch((error)=>{
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      });
      
      setLoading(false);
    }
    
    buscar();
  },[idMagia]);

  function onFecharModal(){
    props.onOcultar();
  }

  if(loading)
    return <Loading/>;

  return(
    <div>
      <div className="overlay">
        <div className='mai_container'>
          <div>
            <div className='mai_titulo'>
              <strong>Magia Preparada</strong>
              <button className='mai_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>
                x
              </button>
            </div>
            <div className='mai-corpo'>
              <strong className='mai_titulo-strong'>{magia.mg_nome}</strong>
              <label>{magia.mg_descricao}</label>
              <label>Nível: {magia.mg_nivel}</label>
              <label>Tempo: {magia.mg_tempoconjuracao}</label>
              <label>Alcance: {magia.mg_alcance}</label>
              <label>Componentes: {magia.mg_componentes}</label>
              <label>Duração: {magia.mg_duracao}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFiMagia;