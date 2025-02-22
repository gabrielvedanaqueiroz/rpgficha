import './ficha.css';
import {db} from '../../services/firebaseConnection';
import {doc, getDoc} from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import {exibirBarras} from '../../utils';
import {toast} from 'react-toastify';
import { AuthContext } from '../../utils/auth';

function Ficha(){

  const personagemID    = localStorage.getItem('RF@personagemID');
  const [personagen, setPersonagem] = useState({});
  const {usuario} = useContext(AuthContext);  

  useEffect(()=>{

    exibirBarras();

    async function buscar() {

      const ref = doc(db, 'tb_personagem', personagemID);     //presetando pra efetuar a busca por id
      await getDoc(ref)                                       //executar busca    
      .then((snapshot) =>{

          console.log(snapshot.data());

          if(snapshot.exists){
            setPersonagem({
              pe_id: snapshot.id.trim(),                      //id do documento nfica separado no nodo do documento
              pe_nome: snapshot.data().pe_nome.trim(),        //pegar dados, ficam armazenados em data()
            });
          }
          
      })
      .catch((error) => {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      })
      
    }

    buscar();

  },[]);

  return(
    <div className='fi-container'>
      {/* <div className='fi_separador'/> */}
      <div className='fi-cabecalho'>
        <div className='fi-cb-esquerda'>
          <strong>{personagen.pe_nome}</strong>
          <strong>Forasteiro</strong>
          <strong>Anão</strong>
          {/* <div class="custom-shape"></div> */}
          <div className='d-esquerda'>
            <div class="custom-shape">
              <label>Movimento</label>
              <div className='fi-separador2'/>
              <span>2</span>
            </div>
            <div class="custom-shape">
              <label>AC</label>
              <div className='fi-separador2'/>
              <span>2</span>
            </div>
          </div>
        </div>

        <div className='fi-cb-imgclasse'>

        </div>
        
        <div className='fi-cb-direita'>
          {/* <div className='pri_div-vida'>
            <label>55</label>
          </div> */}
          {/* <div className='fi_div-nivel'>
            <label>2</label>
            <div className='fi-separador'/>
            <label>Nível</label>
          </div>  */}
          <div class="custom-shape">
            <span>2</span>
            <div className='fi-separador2'/>
            <label>Iniciativa</label>
          </div>
          <div class="custom-shape">
            <label>Proficiência</label>
            <div className='fi-separador2'/>
            <span>2</span>
          </div>

          {/* <div className='fi_div-nivel'>
            <label>2</label>
            <div className='fi-separador'/>
            <label>Nivel</label>
          </div>  */}
        </div>
      </div>
      
      
    </div>
  )
}

export default Ficha;