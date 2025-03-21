import './ficha.css';
import {db} from '../../services/firebaseConnection';
import {doc, query, where, collection, getDocs, updateDoc, deleteDoc} from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import {exibirBarras, buscarPersonagemAtivo, getImagem} from '../../utils';
import {toast} from 'react-toastify';
import upar from '../../res/up.svg';
import Tile from '../../components/tile';
import TileFiAtaque from '../../components/tilefiataque';
import TileFiMagia from '../../components/tilefimagia';
import ModalFiAtaque from '../../components/modalfiataque/';
import ModalFiMagia from '../../components/modalfimagia';
import TileVida from '../../components/tilevida/';
import TileTesteMorte from '../../components/tiletestemorte/';
import Vazio from '../../components/vazio/';
import { AuthContext } from '../../utils/auth.js';
import {useNavigate} from 'react-router-dom';
import Loading from '../../components/loading';
import ModalXP from '../../components/modalxp';
import ModalCA from '../../components/modalca';

function Ficha(){

  const [temPersonagem, setTemPersonagem] = useState(false);
  const [personagem, setPersonagem] = useState({});
  const {usuario} = useContext(AuthContext); 
  
  const [loading, setLoading] = useState(true);
  const [showModalAtaque, setShowModalAtaque] = useState(false);
  const [showModalMagia, setShowModalMagia] = useState(false);
  const [showModalXP, setShowModalXP] = useState(false);
  const [showModalCA, setShowModalCA] = useState(false);

  const [lstAtaque, setLstAtaque] = useState([]);
  const [lstMagia, setLstMagia] = useState([]);
  const [magiaID, setMagiaID] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    
    exibirBarras();

    async function buscar() {

      let pers = await buscarPersonagemAtivo(usuario?.uid.trim());
      setPersonagem(pers);

      let temP = pers !== null;

      setTemPersonagem(temP);
  
      if(temP){
        localStorage.setItem('RF@personagemID', pers.pe_id.trim());
        buscarAtaque(pers.pe_id.trim());
      }
      else
        setLoading(false);
      
    }

    async function buscarAtaque(aID) {
    
      const q = query(collection(db, "tb_ataque"), where("at_idpersonagem", "==", aID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
  
          if(doc.exists)
            lista.push({
              at_id: doc.id.trim(),
              at_idpersonagem: doc.data().at_idpersonagem.trim(),
              at_descricao: doc.data().at_descricao.trim(),
              at_alcance: doc.data().at_alcance.trim(),
              at_bonus: doc.data().at_bonus,
              at_dano: doc.data().at_dano.trim(),
              at_tipo: doc.data().at_tipo.trim(),
            })
        });
    
        setLstAtaque(lista);
      } catch (error) {
        toast.error('Erro ao carregar caracteristica'+error); 
        setLoading(false);
      }
  
      buscarMagia(aID);
    }
  
    async function buscarMagia(aID) {
          
      const q = query(collection(db, "tb_magia"),
       where("mg_idpersonagem", "==", aID.trim()),
       where("mg_preparada", "==", true)
      );
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
          if(doc.exists)
            lista.push({
              mg_id: doc.id.trim(),
              mg_nome: doc.data().mg_nome.trim(),
              mg_alcance: doc.data().mg_alcance.trim(),
              mg_duracao: doc.data().mg_duracao.trim(),
              mg_dano: doc.data().mg_dano.trim(),
              mg_nivel: doc.data().mg_nivel,
              mg_tempoconjuracao: doc.data().mg_tempoconjuracao.trim()
            })
        });
  
        if(lista.length > 0)
          lista.sort((a, b)=> a.mg_nivel > b.mg_nivel);
    
        setLstMagia(lista);
      
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar caracteristica'+error); 
        setLoading(false);
      }
    }

    buscar();

  },[lstAtaque]);

  function onAddAtaque(){
    setShowModalAtaque(true);
  }

  async function incrementar(vidaatual){
    personagem.pe_vidaatual = vidaatual;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_vidaatual: vidaatual,
    });
  }

  async function decrementar(vidaatual, vidatemp){
    personagem.pe_vidaatual = vidaatual;
    personagem.pe_vidatemp  = vidatemp;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_vidaatual: vidaatual,
      pe_vidatemp: vidatemp,
    });
  }

  async function vidaTemp(vidatemp) {
    personagem.pe_vidatemp  = vidatemp;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_vidatemp: vidatemp,
    });
  }

  async function usarDado(dadousado) {
    personagem.pe_vidadadousado  = dadousado;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_vidadadousado: dadousado,
    });
  }

  async function falha(f1, f2, f3) {
    personagem.pe_tcmfalha1  = f1;
    personagem.pe_tcmfalha2  = f2;
    personagem.pe_tcmfalha3  = f3;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_tcmfalha1: f1,
      pe_tcmfalha2: f2,
      pe_tcmfalha3: f3,
    });
  }

  async function sucesso(s1, s2, s3) {
    personagem.pe_tcmsucesso1  = s1;
    personagem.pe_tcmsucesso2  = s2;
    personagem.pe_tcmsucesso3  = s3;
    //salvar banco 

    const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
    await updateDoc(docRef, {
      pe_tcmsucesso1: s1,
      pe_tcmsucesso2: s2,
      pe_tcmsucesso3: s3,
    });
  }

  async function onExcluirAtaque(aId) {

    const docRef = doc(db, "tb_ataque", aId);
    await deleteDoc(docRef)
    .then(()=>{
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    }); 
    
  }
 
  function onXP() {
    setShowModalXP(true);
  }

  function onCA(){
    setShowModalCA(true);
  }

  if(loading)
    return(<Loading/>); 
  
  return(
    (!temPersonagem)? <Vazio/>:
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

        <div className='fi-cb-imgclasse'>
          <img src={getImagem(personagem.pe_idclasse)} alt={personagem.pe_classe}/>
        </div>
        
        <div className='fi-cb-direita'>
          <div className='fi-textos'>
            <strong>Nivel {personagem.pe_nivel} 
              {personagem.podeUpar()? 
               <img className='fi-cb-img-upar' src={upar} alt='subir de nível' onClick={ ()=>{ 
                  localStorage.setItem('RF@personagemID-upar', personagem.pe_id);
                  navigate('personagem-upar', {replace:false}); 
                } }/>: 
               ''
              }
            </strong>
            <div className='fi-separador'/>
            <strong className='fi-cbe-linhasecundaria'>{personagem.pe_antecedente}</strong>
            <strong className='fi-cbe-linhasecundaria'>{personagem.pe_tendencia}</strong>
          </div>
          <div className='fi-cb-flag'>
            <div class="fi-cd-div-flag">
              <span>{personagem.pe_bproficiencia}</span>
              <div className='fi-separador2'/>
              <label>B Proficiência</label>
            </div>
            <div class="fi-cd-div-flag">
              <button className='fi-cd-btnxp' onClick={onXP}>
                <span>{personagem.pe_experiencia}</span>
                <div className='fi-separador2'/>
                <label>Experiência +</label>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='fi-corpo'>
        <div className='fi-vidas'>
          
          <TileVida 
            pe_vidaatual={personagem.pe_vidaatual}
            pe_vidatemp={personagem.pe_vidatemp}
            pe_vidabase={personagem.pe_vidabase}
            pe_vidadadousado={personagem.pe_vidadadousado}
            pe_vidadados={personagem.getVidaDadoMax()}
            incrementar={(vidaatual)=>{  incrementar(vidaatual) }}
            decrementar={(vidaatual, vidatemp)=>{  decrementar(vidaatual, vidatemp);  }}
            vidaTemp={(vidatemp) =>{ vidaTemp(vidatemp) }}
            usarDado={(dadousado) => {usarDado(dadousado)}}
          />

          <TileTesteMorte 
            pe_tcmfalha1={personagem.pe_tcmfalha1}
            pe_tcmfalha2={personagem.pe_tcmfalha2}
            pe_tcmfalha3={personagem.pe_tcmfalha3}
            pe_tcmsucesso1={personagem.pe_tcmsucesso1}
            pe_tcmsucesso2={personagem.pe_tcmsucesso2}
            pe_tcmsucesso3={personagem.pe_tcmsucesso3}
            falha={(f1, f2, f3)=>{falha(f1, f2, f3)}}
            sucesso={(s1, s2, s3)=>{sucesso(s1, s2, s3)}}
          />
          
        </div>

        <div className='fi-div-outras'>

          <div className='fi-salvagarda'>
            <strong>Salvar-Guarda</strong>

            <div className='fi-sg-propriedade'>
              <div className='fi-sg-item'>
                {personagem.pe_sgforca? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>} 
                <label>Força</label>
              </div>
              <label>{personagem.getSGForca()}</label>
            </div> 

            <div className='fi-sg-propriedade'>
              <div className='fi-sg-item'>
                {personagem.pe_sgdestreza? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>}                 
                <label>Destreza</label>
              </div>
              <label>{personagem.getSGDestreza()}</label>
            </div>

            <div className='fi-sg-propriedade'>
              <div className='fi-sg-item'>
                {personagem.pe_sgconstituicao? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>} 
                <label>Constituição</label>
              </div>
              <label>{personagem.getSGConstituicao()}</label>
            </div>
            
            <div className='fi-sg-propriedade'>
              <div className='fi-sg-item'>
                {personagem.pe_sginteligencia? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>} 
                <label>Inteligência</label>
              </div>            
              <label>{personagem.getSGInteligencia()}</label>
            </div>

            <div className='fi-sg-propriedade'>  
              <div className='fi-sg-item'>
                {personagem.pe_sgsabedoria? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>} 
                <label>Sabedoria</label>
              </div>
              <label>{personagem.getSGSabedoria()}</label>
            </div>

            <div className='fi-sg-propriedade'>  
              <div className='fi-sg-item'>
                {personagem.pe_sgcarisma? <div className='fi-sg-proficiente'/>: <div className='fi-sg-noproficiente'/>} 
                <label>Carisma</label>
              </div>
              <label>{personagem.getSGCarisma()}</label>
            </div>
          </div>

          <div className='fi-outras'>

            <div className='fi-cd-div-percepcao'>
              <span>{personagem.getPercepcaoPassiva()}</span>
              <div className='fi-separador2'/>
              <label>Percepção passiva</label>
            </div> 

            <div className='fi-cd-div-flag'>
              <button className='fi-cd-btnxp' onClick={onCA}>
                <span>{personagem.pe_catotal}</span>
                <div className='fi-separador2'/>
                <label>CA +</label>
              </button>
            </div> 

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
              <TileFiAtaque at_id='atxpto'/>
              {
                lstAtaque.map((item)=>{
                  return(
                    <TileFiAtaque 
                      at_id={item.at_id} 
                      at_nome={item.at_descricao} 
                      at_alcance={item.at_alcance} 
                      at_bonus={item.at_bonus} 
                      at_dano={item.at_dano} 
                      at_tipo={item.at_tipo} 
                      excluir={()=>{ onExcluirAtaque(item.at_id)}}
                    />
                  );  
                })
              }
              <button className='fi-at-btn-descreto' onClick={onAddAtaque}>Adicionar +</button>
            </div>
          </Tile>
        </div>

        <div className='fi-magias'>
          <Tile titulo='Magias preparadas' id='fimagias'>
            <div className='fi-at-conteudo'>
              <TileFiMagia at_id='mgxpto'/>
              {
                lstMagia.map((item)=>{
                  return(
                    <TileFiMagia 
                      btn='true'
                      mg_id={item.mg_id} 
                      mg_nome={item.mg_nome} 
                      mg_alcance={item.mg_alcance} 
                      mg_nivel={item.mg_nivel} 
                      mg_dano={item.mg_dano} 
                      mg_duracao={item.mg_duracao} 
                      mg_tempoconjuracao={item.mg_tempoconjuracao}
                      onClickDetalhe={()=>{
                        setMagiaID(item.mg_id);
                        setShowModalMagia(true)
                      }}
                    />
                  );  
                })
              }
            </div>
          </Tile>
        </div>
      </div>

      { showModalAtaque ? <ModalFiAtaque onOcultar={(()=>{setShowModalAtaque(false)})} personagemID={personagem.pe_id.trim()}/> :<div/>} 
      { showModalMagia ? <ModalFiMagia onOcultar={(()=>{setShowModalMagia(false)})} mg_id={magiaID}/> :<div/>} 
      { showModalXP ? <ModalXP onOcultar={(()=>{setShowModalXP(false)})} pe_id={personagem.pe_id} pe_xp={personagem.pe_experiencia} pe_nivel={personagem.pe_nivel}/> :<div/>} 
      { showModalCA ? <ModalCA onOcultar={(()=>{setShowModalCA(false)})} pe_id={personagem.pe_id} pe_cabase={personagem.pe_cabase} pe_catotal={personagem.pe_catotal}/> :<div/>} 
    </div>
  )
}

export default Ficha;