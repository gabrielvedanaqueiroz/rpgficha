import './ficha.css';
import {db} from '../../services/firebaseConnection';
import {doc, getDoc, query, where, collection, getDocs, updateDoc} from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import {exibirBarras} from '../../utils';
import {toast} from 'react-toastify';
import img_classe from '../../res/logo.svg';
import Tile from '../../components/tile';
import Personagem from '../../utils/personagem.js'
import TileFiAtaque from '../../components/tilefiataque';
import TileFiMagia from '../../components/tilefimagia';
import ModalFiAtaque from '../../components/modalfiataque/index.js';
import ModalFiMagia from '../../components/modalfimagia';
import TileVida from '../../components/tilevida/';
import TileTesteMorte from '../../components/tiletestemorte/index.js';
import { AuthContext } from '../../utils/auth';
import Vazio from '../../components/vazio/index.js';

function Ficha(){

  const personagemID    = localStorage.getItem('RF@personagemID');  
  const {personagem}    = useContext(AuthContext);  
  const {setPersonagem} = useContext(AuthContext);  

  const [loading, setLoading] = useState(true);
  const [showModalAtaque, setShowModalAtaque] = useState(false);
  const [showModalMagia, setShowModalMagia] = useState(false);
  const [lstAtaque, setLstAtaque] = useState([]);
  const [lstMagia, setLstMagia] = useState([]);
  const [magiaID, setMagiaID] = useState('');

  useEffect(()=>{
    
    exibirBarras();

    async function buscar() {

      const ref = doc(db, 'tb_personagem', personagemID.trim());     //presetando pra efetuar a busca por id
      await getDoc(ref)                                       //executar busca    
      .then((snapshot) =>{

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
              snapshot.data().pe_idclasse,
              snapshot.data().pe_idraca,
              snapshot.data().pe_vidadado,
              snapshot.data().pe_vidadadousado,
              snapshot.data().pe_tcmfalha1,
              snapshot.data().pe_tcmfalha2,
              snapshot.data().pe_tcmfalha3,
              snapshot.data().pe_tcmsucesso1,
              snapshot.data().pe_tcmsucesso2,
              snapshot.data().pe_tcmsucesso3,
              snapshot.data().pe_sgforca,
              snapshot.data().pe_sgdestreza,
              snapshot.data().pe_sgconstituicao,
              snapshot.data().pe_sginteligencia,
              snapshot.data().pe_sgsabedoria,
              snapshot.data().pe_sgcarisma,
              snapshot.data().pe_proacrobacia,
              snapshot.data().pe_proarcanismo,
              snapshot.data().pe_proatletismo,
              snapshot.data().pe_proatuacao,
              snapshot.data().pe_problefar,
              snapshot.data().pe_profurtividade,
              snapshot.data().pe_prohistoria,
              snapshot.data().pe_prointimidacao,
              snapshot.data().pe_prointuicao,
              snapshot.data().pe_proinvestigacao,
              snapshot.data().pe_prolidaranimais,
              snapshot.data().pe_promedicina,
              snapshot.data().pe_pronatureza,
              snapshot.data().pe_propercepcao,
              snapshot.data().pe_propersuacao,
              snapshot.data().pe_proprestidigitacao,
              snapshot.data().pe_prosobrevivencia,
              snapshot.data().pe_proreligiao,
              snapshot.data().pe_idhabilidadeconjuracao,
            ); 

            setPersonagem(personagem);
  
            buscarAtaque();
            buscarMagia();
          }
          
      })
      .catch((error) => {
        console.log('Erro ao efetuar busca: '+error);
        toast.error('Erro ao efetuar busca');
      })
      
      setLoading(false);
    }

    async function buscarAtaque() {
      const q = query(collection(db, "tb_ataque"), where("at_idpersonagem", "==", personagemID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{

          if(doc.exists)
            lista.push({
              at_idpersonagem: doc.id.trim(),
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
      }
    }

    async function buscarMagia() {
      const q = query(collection(db, "tb_magia"),
       where("mg_idpersonagem", "==", personagemID.trim()),
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

        lista.sort((a, b)=> a.mg_nivel > b.mg_nivel);
    
        setLstMagia(lista);
      } catch (error) {
        toast.error('Erro ao carregar caracteristica'+error); 
      }
    }

    if(personagemID.trim() !== '')
      buscar();
    else
      setLoading(false);

  },[ ]);

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

 
  if(loading)
    return <div>carregand...</div> 
  
  return(
    (personagemID.trim() === '')? <Vazio/> :
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
      </div>

      <div className='fi-corpo'>
        <div className='fi-vidas'>
          
          <TileVida 
            pe_vidaatual={personagem.pe_vidaatual}
            pe_vidatemp={personagem.pe_vidatemp}
            pe_vidabase={personagem.pe_vidabase}
            pe_vidadadousado={personagem.pe_vidadadousado}
            pe_vidadados={personagem.pe_vidadado}
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
              <span>12</span>
              <div className='fi-separador2'/>
              <label>Percepção passiva</label>
            </div> 

            <div className='fi-cd-div-flag'>
              <span>{personagem.pe_catotal}</span>
              <div className='fi-separador2'/>
              <label>CA</label>
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

      { showModalAtaque ? <ModalFiAtaque onOcultar={(()=>{setShowModalAtaque(false)})} personagemID={personagemID}/> :<div/>} 
      { showModalMagia ? <ModalFiMagia onOcultar={(()=>{setShowModalMagia(false)})} mg_id={magiaID}/> :<div/>} 
    </div>
  )
}

export default Ficha;