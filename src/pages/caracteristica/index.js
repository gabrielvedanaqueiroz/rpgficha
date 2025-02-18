import './caracteristica.css';
import '../../components/tile';
import Tile from '../../components/tile';
import { useEffect, useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs } from 'firebase/firestore';
import expandir_mais from '../../res/expandir_mais.svg';

function Caracteristica(){
  
  const personagemID    = localStorage.getItem('RF@personagemID');
  const [lstProficiencia, setProficiencia] = useState([]);
  const [lstCaracteristica, setCaracteristica] = useState([]);

  async function buscarCaracteristicas(){
    const q = query(collection(db, "tb_caracteristica"), where("ca_idpersonagem", "==", personagemID.trim()));
    const querySnapshot = await getDocs(q); 
    let lista = [];

    querySnapshot.forEach((doc)=>{
      lista.push({
        ca_id: doc.id.trim(),
        ca_nome: doc.data().ca_nome.trim(),
        ca_descricao: doc.data().ca_descricao.trim(),
      })
    });
    lista.sort((a, b)=> a.ca_nome > b.ca_nome);

    setCaracteristica(lista);
  }

  async function buscarProficiencias(){

  }

  useEffect(()=>{
    buscarProficiencias();
    buscarCaracteristicas();
  },[]);

  function onAdicionar(){
    alert('abrir um modal para informar as caracteristicas');
    buscarCaracteristicas();
  }

  return(
    <div className='cr_container'>

      <div className='cr_proficiencias'>
        <div className='cr_titulo'>
          <strong>Proficiencias</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          <Tile id='Força' titulo='Força'> Força </Tile>
          <Tile id='Destreza' titulo='Destreza'> Destreza </Tile>
          <Tile id='Constituição' titulo='Constituição'> Constituição </Tile>
          <Tile id='Inteligência' titulo='inteligência'> Inteligência </Tile>
          <Tile id='Sabedoria' titulo='Sabedoria'> Sabedoria </Tile>
          <Tile id='Carisma' titulo='Carisma'> Carisma </Tile>
        </ul>
      </div>

      <div className='cr_caracteristicas'>
        <div className='cr_titulo'>
          <strong>Caracteristicas</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          {
            lstCaracteristica.map((item)=>{
              return(
                <Tile id={item.ca_id} titulo={item.ca_nome}>
                  <labe>{item.ca_descricao}</labe> {/* costomizar a filho com mais elementos se quiser*/}
                </Tile>
              );
            })
          }
        </ul>
      </div>
      <div className='cr_div-rodape-botao'>
        <button className='cr_bt-adicionar' onClick={onAdicionar} >
          <img className='cr_img-adicionar' src={expandir_mais} alt='adicionar uma caracteristica'/>
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default Caracteristica;