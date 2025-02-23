import './ficha.css';
import {db} from '../../services/firebaseConnection';
import {doc, getDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {exibirBarras} from '../../utils';
import {toast} from 'react-toastify';
import img_classe from '../../res/logo.svg';
import Tile from '../../components/tile';
import Personagem from '../../utils/personagem.js'
import TileAtaque from '../../components/tileataque/index.js';

function Ficha(){

  const personagemID    = localStorage.getItem('RF@personagemID');
  const [personagem, setPersonagem] = useState({});
  const [loading, setLoading] = useState(true);

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

            let personagem = new Personagem(
              snapshot.id.trim(),                    //id do documento fica separado no nodo do documento
              snapshot.data().pe_nome.trim(),        //pegar dados, ficam armazenados em data()
              snapshot.data().pe_subclasse.trim(), 
              snapshot.data().pe_classe.trim(), 
              snapshot.data().pe_raca.trim(), 
              snapshot.data().pe_subraca.trim(), 
              snapshot.data().pe_nivel, 
              snapshot.data().pe_antecedente.trim(), 
              snapshot.data().pe_tendencia.trim(), 
              snapshot.data().pe_vidabase, 
              snapshot.data().pe_vidaatual, 
              snapshot.data().pe_vidatemp, 
              snapshot.data().pe_experiencia, 
              snapshot.data().pe_bproficiencia, 
              snapshot.data().pe_forca, 
              snapshot.data().pe_destreza, 
              snapshot.data().pe_constituicao, 
              snapshot.data().pe_inteligencia, 
              snapshot.data().pe_sabedoria, 
              snapshot.data().pe_carisma, 
              snapshot.data().pe_cabase, 
              snapshot.data().pe_catotal, 
              snapshot.data().pe_movimento,
            ); 

            setPersonagem(personagem);
  
          }
          
      })
      .catch((error) => {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      })
      
      setLoading(false);
    }

    buscar();

  },[]);

  function onAddAtaque(){
    alert('onAddAtaque')
  }

  function onAddMagia(){
    alert('onAddMagia');
  }

  if(loading)
    return <div>carregand...</div>
  
  return(
    <div className='fi-container'>
      <div className='fi-cabecalho'>
        <div className='fi-cb-esquerda'>
          <div className='fi-textos'>
            <strong>{personagem.pe_nome}</strong>
            <div className='fi-separador'/>
              <strong className='fi-cbe-linhasecundaria'>{personagem.getClasse()}</strong>
              <strong className='fi-cbe-linhasecundaria'>{personagem.getRaca()} </strong>
            </div>
            <div className='fi-cb-flag'>
              <div class="fi-cd-div-flag">
                <span>{personagem.pe_bproficiencia}</span>
                <div className='fi-separador2'/>
                <label>B Proficiência</label>
              </div>
              <div class="fi-cd-div-flag">
                <span>{personagem.pe_experiencia}</span>
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
            <strong>Nivel {personagem.pe_nivel}</strong>
            <div className='fi-separador'/>
            <strong className='fi-cbe-linhasecundaria'>{personagem.pe_antecedente}</strong>
            <strong className='fi-cbe-linhasecundaria'>{personagem.pe_tendencia}</strong>
          </div>
          <div className='fi-cb-flag'>
            <div class="fi-cd-div-flag">
              <span>{personagem.getIniciativa()}</span>
              <div className='fi-separador2'/>
              <label>Iniciativa</label>
            </div>
            <div class="fi-cd-div-flag">
              <span>{personagem.pe_movimento}</span>
              <div className='fi-separador2'/>
              <label>Movimento</label>
            </div>
          </div>
        </div>
      </div>

      <div className='fi-corpo'>
        <div className='fi-vidas'>
          <div className='pri_div-vida'>
            <label>{personagem.getVida()}</label>
          </div> 

          <div className='pri_div-vida'>
            <label>{personagem.pe_vidatemp}</label>
          </div> 

          <div className='fi-cd-div-flag'>
          <span>{personagem.pe_catotal}</span>
            <div className='fi-separador2'/>
            <label>CA</label>
          </div> 
        </div>

        <div className='fi-atributos'>
          
          <div className='fi-cd-div-flag'>
          <span>{personagem.getModForca()}</span>
            <label>{personagem.pe_forca}</label>
            <div className='fi-separador2'/>
            <label>Força</label>
          </div>  
           
          <div className='fi-cd-div-flag'>
          <span>{personagem.getModDestreza()}</span>
            <label>{personagem.pe_destreza}</label>
            <div className='fi-separador2'/>
            <label>Destreza</label>
          </div> 

          <div className='fi-cd-div-flag'>
          <span>{personagem.getModConstituicao()}</span>
            <label>{personagem.pe_constituicao}</label>
            <div className='fi-separador2'/>
            <label>Constuição</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{personagem.getModInteligencia()}</span>
            <label>{personagem.pe_inteligencia}</label>
            <div className='fi-separador2'/>
            <label>Inteligência</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{personagem.getModSabedoria()}</span>
            <label>{personagem.pe_sabedoria}</label>
            <div className='fi-separador2'/>
            <label>Sabedoria</label>
          </div>  

          <div className='fi-cd-div-flag'>
          <span>{personagem.getModCarisma()}</span>
            <label>{personagem.pe_carisma}</label>
            <div className='fi-separador2'/>
            <label>Carisma</label>
          </div> 
        </div>
        
        <div className='fi-ataques'>
          <Tile titulo='Ataques' id='fiataques'>
            <div className='fi-at-conteudo'>
              <TileAtaque at_id='xpto'/>
              <TileAtaque 
                at_id='xpto1' 
                at_nome='Espada Curta'
                at_alcance='Corpo a corpo'
                at_bonus='5'
                at_dano='1d6+5'
                at_tipo='Cortante'
              />
              <TileAtaque 
                at_id='xpto2' 
                at_nome='Arco'
                at_alcance='13/20m'
                at_bonus='5'
                at_dano='1d6+5'
                at_tipo='Perfurante'
              />
              <button className='fi-at-btn-descreto' onClick={onAddAtaque}>Adicionar +</button>
            </div>
          </Tile>
        </div>

        <div className='fi-magias'>
          <Tile titulo='Magias preparadas' id='fimagias'>
            <div className='fi-at-conteudo'>
            <TileAtaque at_id='xpto'/>
              <TileAtaque 
                at_id='xpto1' 
                at_nome='Bola de fogo'
                at_alcance='Corpo a corpo'
                at_bonus='5'
                at_dano='1d6+5'
                at_tipo='Cortante'
              />
              <TileAtaque 
                at_id='xpto2' 
                at_nome='Silencio'
                at_alcance='13/20m'
                at_bonus='5'
                at_dano='1d6+5'
                at_tipo='Perfurante'
              />
              <button className='fi-at-btn-descreto' onClick={onAddMagia}>Adicionar +</button>
            </div>
          </Tile>
        </div>
      </div>
      
    </div>
  )
}

export default Ficha;