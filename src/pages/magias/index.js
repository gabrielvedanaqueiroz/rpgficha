import './magias.css';
import Tile from '../../components/tile';
import BtnAdicionar from '../../components/btnadicionar';
import { useState, useEffect } from 'react';
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TileMagia from '../../components/tilemagia';
import BtnSalvarForm from '../../components/btnsalvarform';
import Vazio from '../../components/vazio';
import {buscarPersonagem, getIDPersonagem, jMagias} from '../../utils';
import Loading from '../../components/loading/';
import Titulo from '../../components/titulo';

function Magias(){
  
  const [temPersonagem, setTemPersonagem] = useState(false);
  const [personagem, setPersonagem] = useState({});

  const [lista, setLista]     = useState([]);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [lstMagiasFiltradas, setlstMagiasFiltradas] = useState([]);

  /* modal */
  const [isOpen, setIsOpen]                   = useState(false);
  const [alcance, setAlcance]                 = useState('');
  const [componentes, setComponentes]         = useState('');
  const [dano, setDano]                       = useState('');
  const [descricao, setDescricao]             = useState('');
  const [duracao, setDuracao]                 = useState('');
  const [nivel, setNivel]                     = useState('');
  const [nome, setNome]                       = useState('');
  const [tempoconjuracao, setTempoConjuracao] = useState('');
  const [idMagia, setIdMagia]                 = useState('');
  
  useEffect(()=>{
    
    async function buscar(aID){

      let pers = await buscarPersonagem(aID);
      setPersonagem(pers);

      let temP = pers !== null;

      setTemPersonagem(temP);
      
      const q = query(collection(db, "tb_magia"), where("mg_idpersonagem", "==", aID.trim()));
      const querySnapshot = await getDocs(q); 
      let lista = [];
  
      try {
        querySnapshot.forEach((doc)=>{
          lista.push({
            mg_id: doc.id.trim(),
            mg_nome: doc.data().mg_nome.trim(),
            mg_descricao: doc.data().mg_descricao.trim(),
            mg_alcance: doc.data().mg_alcance.trim(),
            mg_componentes: doc.data().mg_componentes.trim(),
            mg_dano: doc.data().mg_dano.trim(),
            mg_duracao: doc.data().mg_duracao.trim(),
            mg_nivel: doc.data().mg_nivel,
            mg_preparada: doc.data().mg_preparada,
            mg_tempoconjuracao: doc.data().mg_tempoconjuracao.trim(),
          })
        });
        lista.sort((a, b)=> a.mg_nivel > b.mg_nivel);
    
        setLista(lista);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar magias'+error); 
        setLoading(false);
      }
      
    }

    const [id, tempId] = getIDPersonagem();
    if(tempId)
      buscar(id);
    else
      setLoading(false);

    setItems(jMagias);

    // console.log('m');
  },[lista]);

  async function onExcluir(id){
    const docRef = doc(db, "tb_magia", id);
    await deleteDoc(docRef)
    .then(()=>{
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    }); 
  }

  async function onPreparar(id, preparada){
    const docRef = doc(db, "tb_magia", id);
    await updateDoc(docRef, {
      mg_preparada: !preparada,
    })
    .then(()=>{
    })
    .catch((error)=>{
      console.log('Erro ao editar: '+error);
      toast.error('Erro ao editar');
    });
  }

  function onEditar(item){
    setIdMagia(item.mg_id);
    setAlcance(item.mg_alcance);
    setComponentes(item.mg_componentes);
    setDano(item.mg_dano);
    setDescricao(item.mg_descricao);
    setDuracao(item.mg_duracao);
    setNivel(item.mg_nivel);
    setNome(item.mg_nome);
    setTempoConjuracao(item.mg_tempoconjuracao);
    setIsOpen(true);
  }

  async function onSalvar() {
    if((nome.trim() !== '') && (descricao.trim() !== '')){

      if(idMagia === ''){
        //inserir
        await addDoc(collection(db, 'tb_magia'),{
          mg_idpersonagem: personagem.pe_id.trim(),
          mg_alcance: alcance.trim(),
          mg_componentes: componentes.trim(),
          mg_dano: dano.trim(),
          mg_descricao: descricao.trim(),
          mg_duracao: duracao.trim(),
          mg_nivel: nivel,
          mg_nome: nome.trim(),
          mg_tempoconjuracao: tempoconjuracao.trim(),
        })
        .then( () =>{
          onFecharModal();
        })
        .catch((error)=>{
          console.log('Erro ao inserir; '+error);
          toast.error('Erro ao inserir');
        });
      }
      else{
        //editar
        const docRef = doc(db, "tb_magia", idMagia);
          await updateDoc(docRef, {
            mg_alcance: alcance.trim(),
            mg_componentes: componentes.trim(),
            mg_dano: dano.trim(),
            mg_descricao: descricao.trim(),
            mg_duracao: duracao.trim(),
            mg_nivel: nivel,
            mg_nome: nome.trim(),
            mg_tempoconjuracao: tempoconjuracao.trim(),
          }
        )
        .then(()=>{
          onFecharModal();
        })
        .catch((error)=>{
          console.log('Erro ao editar: '+error);
          toast.error('Erro ao editar');
        });
      }
    }
    else
      toast.error('Campo obrigatorio não preenchido');
  }

  function onFecharModal() {
    setIdMagia('');
    setAlcance('');
    setComponentes('');
    setDano('');
    setDescricao('');
    setDuracao('');
    setNivel('');
    setNome('');
    setTempoConjuracao('');
    setIsOpen(false);
  }

  const onFiltrarMagia = (aValue) => {
    const value = aValue;
    if (value.trim() === "") {
      setlstMagiasFiltradas([]);
    } else {
      setlstMagiasFiltradas(
        items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };


  if(loading)
    return(<Loading/>); 

  return(
    (!temPersonagem)? <Vazio/> :
    <div className='mg-container'>  
      <div>
        <div className='mg_cabecalho'>
          <div className='mg_cb-item'>
            <label>Habilidade de Conjuração</label> 
            <strong>{personagem.getHabilidadeConjuracao()}</strong>
          </div>

          <div className='mg_linha-vert'/>
          <div className='mg_cb-item'>
            <label>CD de resistência magia</label>
            <strong>{personagem.getCDMagia()}</strong>
          </div>

          <div className='mg_linha-vert'/>
          <div className='mg_cb-item'>
            <label>Bônus de ataque de magia</label>
            <strong>{personagem.getBonusMagia()}</strong>
          </div>
        </div>

        <Titulo titulo='Magias Preparadas'/>
        <ul>
          {
            lista.map((item)=>{

              if(item.mg_preparada){
                return(
                  <Tile id={'prp'+item.mg_id} titulo={item.mg_nome}>
                    <TileMagia 
                      mg_id={item.mg_id} 
                      mg_descricao={item.mg_descricao} 
                      mg_nivel={item.mg_nivel} 
                      mg_tempoconjuracao={item.mg_tempoconjuracao} 
                      mg_alcance={item.mg_alcance} 
                      mg_componentes={item.mg_componentes} 
                      mg_duracao={item.mg_duracao} 
                      mg_preparada={item.mg_preparada} 
                      excluir={ ()=>{ onExcluir(item.mg_id) }} 
                      preparar={()=>{ onPreparar(item.mg_id, item.mg_preparada) }}
                      editar={()=>{ onEditar(item) }} 
                    />
                  </Tile>
                );
              }
            })
          }
        </ul>
         
      </div>

      <div>
        <Titulo titulo='Magias Conhecidas'/>
        <ul>
          {
            lista.map((item)=>{

              return(
                <Tile id={'cnc'+item.mg_id} titulo={item.mg_nome}>
              
                  <TileMagia 
                    mg_id={item.mg_id} 
                    mg_descricao={item.mg_descricao} 
                    mg_nivel={item.mg_nivel} 
                    mg_tempoconjuracao={item.mg_tempoconjuracao} 
                    mg_alcance={item.mg_alcance} 
                    mg_componentes={item.mg_componentes} 
                    mg_duracao={item.mg_duracao} 
                    mg_preparada={item.mg_preparada} 
                    excluir={ ()=>{ onExcluir(item.mg_id) }} 
                    preparar={()=>{ onPreparar(item.mg_id, item.mg_preparada) }}
                    editar={()=>{ onEditar(item) }} 
                  />
              
                </Tile>
              );
            })
          }
        </ul>
         
      </div>

      <BtnAdicionar alt='adicinoar nova magia' adicionar={()=>{setIsOpen(true)}}/>

      {/* Tela Flutuante */}
      {isOpen && (
        <div className="overlay">
          <div className='mmg_container'>
            <div className='mmg_titulo'>
              <strong >Magia</strong>
            </div>
            <form className='mmg_form' action={onSalvar}>

              <div className='mmg_div-edit'>
                <label>Nome</label>
                <div className='mmg_div-busca'>
                  <input className='mmg_edit' type='text' placeholder="Localizar Magia..." value={nome} 
                    onChange={
                      (e)=>{
                        setNome(e.target.value);
                        onFiltrarMagia(e.target.value);
                      }
                    } 
                  />
                  
                  {lstMagiasFiltradas.length > 0 && (
                    <ul className="mmg_lista-busca">
                      {lstMagiasFiltradas.map((item) => (
                        <li className='mmg_lista-busca-item'
                          key={item.name}
                          onClick={() => {
                            setNome(item.display_name);
                            setNivel(item.level);
                            setDescricao(item.description);
                            setDano('0');
                            setAlcance(item.range);
                            setTempoConjuracao(item.cast_time);
                            setDuracao(item.duration);
                            setComponentes(item.components);
                            setlstMagiasFiltradas([]);
                          }}
                        >
                          <h4>{item.display_name}<br/></h4>
                          {item.cast_time}, {item.school}
                          <hr/>
                        </li>
                      ))}
                    </ul>
                    
                  )}
                </div>
              </div>
              <div className='mmg_div-edit'>
                <label>Descrição</label>
                <textarea className='mmg_textarea' value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}/>
              </div>
              <div className='mmg_div-3coluna'>
                <div className='mmg_div-edit'>
                  <label>Nível</label>
                  <input type='number' className='mmg_edit' value={nivel} onChange={(e)=>{setNivel(e.target.value)}}/>
                </div>
                <div className='mmg_div-edit'>
                  <label>Dano</label>
                  <input className='mmg_edit' value={dano} onChange={(e)=>{setDano(e.target.value)}}/>
                </div>
                <div className='mmg_div-edit'>
                  <label>Alcance</label>
                  <input className='mmg_edit' value={alcance} onChange={(e)=>{setAlcance(e.target.value)}}/>
                </div>
              </div>
              <div className='mmg_div-2coluna'>
                <div className='mmg_div-edit'>
                  <label>Tempo Conjuração</label>
                  <input className='mmg_edit' value={tempoconjuracao} onChange={(e)=>{setTempoConjuracao(e.target.value)}}/>
                </div>
                <div className='mmg_div-edit'>
                  <label>Duração</label>
                  <input className='mmg_edit' value={duracao} onChange={(e)=>{setDuracao(e.target.value)}}/>
                </div>
              </div>
              <div className='mmg_div-edit'>
                <label>Componentes</label>
                <input className='mmg_edit' value={componentes} onChange={(e)=>{setComponentes(e.target.value)}}/>
              </div>
              
              <div className='mmg_botoes'>
                <button className='mmg_btn-cancelar' type='button' onClick={()=>{onFecharModal()}}>Cancelar</button>
                <BtnSalvarForm esperando='Salvando..' inicial='Salvar'/>
              </div>
            </form>
          </div>
        </div> 
      )} 
    </div>
  );
}

export default Magias;