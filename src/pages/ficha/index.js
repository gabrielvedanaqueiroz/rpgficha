import './ficha.css';
import {db} from '../../services/firebaseConnection';
import {doc, getDoc} from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import {exibirBarras} from '../../utils';
import {toast} from 'react-toastify';
// import { AuthContext } from '../../utils/auth';
import img_classe from '../../res/logo.svg';
import Tile from '../../components/tile';

function Ficha(){

  const personagemID    = localStorage.getItem('RF@personagemID');
  const [personagen, setPersonagem] = useState({});
  // const {usuario} = useContext(AuthContext);  

  function onModificador(aValor){
    let modificador = (aValor - 10) / 2;

    return Math.ceil(modificador);
  }

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
              pe_subclasse: snapshot.data().pe_subclasse.trim(), 
              pe_classe: snapshot.data().pe_classe.trim(), 
              pe_raca: snapshot.data().pe_raca.trim(), 
              pe_subraca: snapshot.data().pe_subraca.trim(), 
              pe_nivel: snapshot.data().pe_nivel, 
              pe_antecedente: snapshot.data().pe_antecedente.trim(), 
              pe_tendencia: snapshot.data().pe_tendencia.trim(), 
              pe_vidaatual: snapshot.data().pe_vidaatual, 
              pe_experiencia: snapshot.data().pe_experiencia, 
              pe_bproficiencia: snapshot.data().pe_bproficiencia, 
              pe_forca: snapshot.data().pe_forca, 
              pe_destreza: snapshot.data().pe_destreza, 
              pe_constituicao: snapshot.data().pe_constituicao, 
              pe_inteligencia: snapshot.data().pe_inteligencia, 
              pe_sabedoria: snapshot.data().pe_sabedoria, 
              pe_carisma: snapshot.data().pe_carisma, 
              pe_catotal: snapshot.data().pe_catotal, 
              pe_movimento : snapshot.data().pe_movimento,
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

  function onAddAtaque(){
    alert('onAddAtaque')
  }

  function onAddMagia(){
    alert('onAddMagia')
  }

  return(
    <div className='fi-container'>
      <div className='fi-cabecalho'>
        <div className='fi-cb-esquerda'>
          <div className='fi-textos'>
            <strong>{personagen.pe_nome}</strong>
            <div className='fi-separador'/>
              <strong className='fi-cbe-linhasecundaria'>{personagen.pe_classe} {personagen.pe_subclasse} </strong>
              <strong className='fi-cbe-linhasecundaria'>{personagen.pe_raca} {personagen.pe_subraca}</strong>
            </div>
            <div className='fi-cb-flag'>
              <div class="fi-cd-div-flag">
                <span>{personagen.pe_bproficiencia}</span>
                <div className='fi-separador2'/>
                <label>B Proficiência</label>
              </div>
              <div class="fi-cd-div-flag">
                <span>{personagen.pe_experiencia}</span>
                <div className='fi-separador2'/>
                <label>Experiência</label>
              </div>
            </div>
          </div>

        <div className='fi-cb-imgclasse'>
          <img src={img_classe} alt='Forasteiro'/>
        </div>
        
        <div className='fi-cb-direita'>
          <div className='fi-textos'>
            <strong>Nivel {personagen.pe_nivel}</strong>
            <div className='fi-separador'/>
            <strong className='fi-cbe-linhasecundaria'>{personagen.pe_antecedente}</strong>
            <strong className='fi-cbe-linhasecundaria'>{personagen.pe_tendencia}</strong>
          </div>
          <div className='fi-cb-flag'>
            <div class="fi-cd-div-flag">
              <span>{onModificador(personagen.pe_destreza)}</span>
              <div className='fi-separador2'/>
              <label>Iniciativa</label>
            </div>
            <div class="fi-cd-div-flag">
              <span>{personagen.pe_movimento}</span>
              <div className='fi-separador2'/>
              <label>Movimento</label>
            </div>
          </div>
        </div>
      </div>

      <div className='fi-corpo'>
        <div className='fi-vidas'>
          <div className='pri_div-vida'>
            <label>{personagen.pe_vidaatual}</label>
          </div> 

          <div className='pri_div-vida'>
            <label>{personagen.pe_vidatemp}</label>
          </div> 

          <div className='fi-cd-div-flag'>
          <span>{personagen.pe_catotal}</span>
            <div className='fi-separador2'/>
            <label>CA</label>
          </div> 
        </div>

        <div className='fi-atributos'>
          
          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_forca)}</span>
            <label>{personagen.pe_forca}</label>
            <div className='fi-separador2'/>
            <label>Força</label>
          </div>  

           
          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_destreza)}</span>
            <label>{personagen.pe_destreza}</label>
            <div className='fi-separador2'/>
            <label>Destreza</label>
          </div> 

          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_constituicao)}</span>
            <label>{personagen.pe_constituicao}</label>
            <div className='fi-separador2'/>
            <label>Constuição</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_inteligencia)}</span>
            <label>{personagen.pe_inteligencia}</label>
            <div className='fi-separador2'/>
            <label>Inteligência</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_sabedoria)}</span>
            <label>{personagen.pe_sabedoria}</label>
            <div className='fi-separador2'/>
            <label>Sabedoria</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{onModificador(personagen.pe_carisma)}</span>
            <label>{personagen.pe_carisma}</label>
            <div className='fi-separador2'/>
            <label>Carisma</label>
          </div> 
        </div>
        
        <div className='fi-ataques'>
          <Tile key='fiataques' titulo='Ataques' id='fiataques'>
            <button className='fi-at-btn-descreto' onClick={onAddAtaque}>Adicionar +</button>
          </Tile>
        </div>

        <div className='fi-magias'>
          <Tile key='fimagias' titulo='Magias preparadas' id='fimagias'>
          <button className='fi-at-btn-descreto' onClick={onAddMagia}>Adicionar +</button>
          </Tile>
        </div>
      </div>
      
    </div>
  )
}

export default Ficha;