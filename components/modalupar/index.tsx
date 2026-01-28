"use client";

import Personagem from "@/classes/personagem";
import ModalBase from "../modalbase";
import { useEffect, useState } from "react";
import { jClasses, jXPNivel } from "@/utils";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import ButtonsModal from "../buttonsmodal";

export interface ModalUparRetorno{
  pe_id: string,
  pe_vida: number,
  pe_bproficiencia: number,
  pe_nivel: number,
  pe_forca: number,
  pe_destreza: number,
  pe_constituicao: number,
  pe_inteligencia: number,
  pe_sabedoria: number,
  pe_carisma: number,
  pe_subclasse: string,
}

interface ModalUparProps{
  personagem: Personagem|null,
  onClose:()=>void,
  onSalvar:(item: ModalUparRetorno)=>void,
}

export default function ModalUpar({ personagem, onClose, onSalvar}:ModalUparProps){

  const [vida, setVida]                       = useState<number>(0);
  const [bproficiencia, setBProficiencia]     = useState<number>(0);
  
  const [habForca, setHabForca]               = useState<number>(0);
  const [habDestreza, setHabDestreza]         = useState<number>(0);
  const [habConstituicao, setHabConstituicao] = useState<number>(0);
  const [habInteligencia, setHabInteligencia] = useState<number>(0);
  const [habSabedoria, setHabSabedoria]       = useState<number>(0);
  const [habCarisma, setHabCarisma]           = useState<number>(0);

  const [subclasse, setSubclasse]             = useState<string>('');

  const [qntHab, setQntHab] = useState(0);
  const [exibirHabilidades, setExibirHabilidades]       = useState<boolean>(false);
  const [exibirBProficiencia, setExibirBProficiencia]   = useState<boolean>(false);
  const [exibirSubClasse, setExibirSubClasse]           = useState<boolean>(false);

  const [listaSubClasse, setListaSubClasse]   = useState<string[]>([]);

  function onIncVida(){
    let vd = vida + 1;
    setVida(vd);
  };

  function onDecVida(){
    let vd = vida - 1;
    setVida(vd);
  };

  function onHabIncrementar(aValor: number){
    if(qntHab < 2){
      let h = Number(aValor);
      return {valor: (h + 1), alterou: true}; 
    }
    else  
      return {valor: aValor, alterou: false}; 
  }

  function onHabDecrementar(aValor: number){
    if(qntHab > 0){
      let h = Number(aValor);
      return {valor: (h - 1), alterou: true}; 
    } 
    else
      return {valor: aValor, alterou: false}; 
  }

  function onIncForca(){
    let {valor, alterou} = onHabIncrementar(habForca);
    if(alterou){
      setHabForca(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecForca(){
    let {valor, alterou} = onHabDecrementar(habForca);
    if(alterou){
      setHabForca(valor);
      setQntHab(qntHab - 1);
    }  
  }

  function onIncDestreza(){
    let {valor, alterou} = onHabIncrementar(habDestreza);
    if(alterou){
      setHabDestreza(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecDestreza(){
    let {valor, alterou} = onHabDecrementar(habDestreza);
    if(alterou){
      setHabDestreza(valor);
      setQntHab(qntHab - 1);
    }  
  }

  function onIncConstituicao(){
    let {valor, alterou} = onHabIncrementar(habConstituicao);
    if(alterou){
      setHabConstituicao(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecConstituicao(){
    let {valor, alterou} = onHabDecrementar(habConstituicao);
    if(alterou){
      setHabConstituicao(valor);
      setQntHab(qntHab - 1);
    }  
  }

  function onIncInteligencia(){
    let {valor, alterou} = onHabIncrementar(habInteligencia);
    if(alterou){
      setHabInteligencia(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecInteligencia(){
    let {valor, alterou} = onHabDecrementar(habInteligencia);
    if(alterou){
      setHabInteligencia(valor);
      setQntHab(qntHab - 1);
    }  
  }
  
  function onIncSabedoria(){
    let {valor, alterou} = onHabIncrementar(habSabedoria);
    if(alterou){
      setHabSabedoria(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecSabedoria(){
    let {valor, alterou} = onHabDecrementar(habSabedoria);
    if(alterou){
      setHabSabedoria(valor);
      setQntHab(qntHab - 1);
    }  
  }

  function onIncCarisma(){
    let {valor, alterou} = onHabIncrementar(habCarisma);
    if(alterou){
      setHabCarisma(valor);
      setQntHab(qntHab + 1);
    }
  }

  function onDecCarisma(){
    let {valor, alterou} = onHabDecrementar(habCarisma);
    if(alterou){
      setHabCarisma(valor);
      setQntHab(qntHab - 1);
    }  
  }

  function onSubmit(e: React.FormEvent){
    
    e.preventDefault();

    let item :ModalUparRetorno = {
      pe_id : personagem?.pe_id,
      pe_nivel : personagem?.pe_nivel + 1,
      pe_vida : vida,
      pe_bproficiencia : bproficiencia,
      pe_forca : habForca,
      pe_destreza : habDestreza,
      pe_constituicao : habConstituicao,
      pe_inteligencia : habInteligencia,
      pe_sabedoria : habSabedoria,
      pe_carisma : habCarisma,
      pe_subclasse : subclasse,
    }

    onSalvar(item);
  }

  useEffect(()=>{
    
    setVida(Number(personagem?.pe_vidabase));
  
    const exibirHab = [3, 7, 15, 17].includes(personagem?.pe_nivel ?? 1);
    setExibirHabilidades(exibirHab);

    let bpro: number = jXPNivel[Number(personagem?.pe_nivel)].proficiencia;
    setExibirBProficiencia((bpro > personagem?.pe_bproficiencia));
    setBProficiencia(bpro);

    setExibirSubClasse(personagem?.pe_nivel === 1);
    
    const classe = jClasses.find((c) => c.cl_id === Number(personagem?.pe_idclasse));
    setListaSubClasse(classe ? classe.cl_sub : []);
    
    setHabForca(personagem?.pe_forca);
    setHabDestreza(personagem?.pe_destreza);
    setHabConstituicao(personagem?.pe_constituicao);
    setHabInteligencia(personagem?.pe_inteligencia);
    setHabSabedoria(personagem?.pe_sabedoria);
    setHabCarisma(personagem?.pe_carisma);

    setSubclasse(personagem?.pe_subclasse);

  }, [personagem]);

  return(
    <ModalBase title="Upar Personagem" onClose={onClose}>
      <div className="flex flex-col w-full gap-3 bg-neutral-100 rounded">

        {/* topo */}
        <section className="flex flex-col border-b-2 border-gray-300 pb-1 w-full">
          <strong>{personagem?.pe_nome}</strong>
          <label>{personagem?.getRaca()}</label>
          <label>{personagem?.getClasse()}</label>
        </section>

        {/* nivel e vida */}
        <section className="flex flex-col gap-1 w-full">
          
          <div className="flex w-full bg-white p-3 rounded-t-lg shadow-md gap-2 items-center justify-between">
            <label className="w-full">Nível</label>

            <div className="flex items-center gap-2 w-40 justify-between">
              <label>{personagem?.pe_nivel}</label>
              <MdKeyboardDoubleArrowRight size={18} />              
              <label className="flex w-16" >{personagem?.pe_nivel+1}</label>
            </div>
          </div>

          {
            exibirSubClasse 
            ? <div className="flex w-full bg-white p-3 rounded shadow-md gap-2 items-center justify-between">
              <select className="flex w-full" value={subclasse} onChange={(e)=>{setSubclasse(e.target.value)}}>
                <option key={0} value={''}>Selecione uma Subclasse</option>
                {listaSubClasse.map((item, index)=>(
                  <option key={index}> {item} </option>
                ))}
              </select>
            </div>
            :<></>
          }
          
          <div className="flex w-full bg-white p-3 rounded-b-lg shadow-md gap-2 items-center justify-between">
            <label className="w-full">Vida</label>

            <div className="flex items-center gap-2 w-40">
              <label>{personagem?.pe_vidabase}</label>
              <MdKeyboardDoubleArrowRight size={18}/>   
              <div className="flex items-center gap-2 justify-between w-fit">
                <button className="p-0.5 bg-(--csecundary) rounded shadow text-white" onClick={onDecVida}>
                  <FiMinus size={14}/>
                </button>
                <label>{vida}</label>
                <button className="p-0.5 bg-(--csecundary) rounded shadow text-white" onClick={onIncVida}>
                  <FaPlus size={14}/>
                </button>
              </div>
            </div>
          </div>

        </section>

        {/* habilidade */}
        {exibirHabilidades 
          ? <section className="flex flex-col gap-1 w-full">
              <strong>Pontos disponível: {2-qntHab}</strong><br/>

              <div className="flex w-full bg-white p-3 rounded-t-lg shadow-md gap-2 items-center justify-between">
                <label>Força</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_forca}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecForca}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habForca}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={ onIncForca }>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

              <div className="flex w-full bg-white p-3 rounded-lg shadow-md gap-2 items-center justify-between">
                <label>Destreza</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_destreza}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecDestreza}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habDestreza}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onIncDestreza}>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

              <div className="flex w-full bg-white p-3 rounded-lg shadow-md gap-2 items-center justify-between">
                <label>Constituição</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_constituicao}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecConstituicao}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habConstituicao}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onIncConstituicao}>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

              <div className="flex w-full bg-white p-3 rounded-lg shadow-md gap-2 items-center justify-between">
                <label>Inteligência</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_inteligencia}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecInteligencia}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habInteligencia}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onIncInteligencia}>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

              <div className="flex w-full bg-white p-3 rounded-lg shadow-md gap-2 items-center justify-between">
                <label>Sabedoria</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_sabedoria}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecSabedoria}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habSabedoria}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onIncSabedoria}>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

              <div className="flex w-full bg-white p-3 rounded-b-lg shadow-md gap-2 items-center justify-between">
                <label>Carisma</label>

                <div className="flex items-center gap-2 justify-between w-fit">
                  <label>{personagem?.pe_carisma}</label>
                  <MdKeyboardDoubleArrowRight size={18}/>                 
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onDecCarisma}>
                      <FiMinus size={14}/>
                    </button>
                    <label>{habCarisma}</label>
                    <button className="p-0.5 bg-(--csecundary) rounded shadow text-(--cprimary)" onClick={onIncCarisma}>
                      <FaPlus size={14}/>
                    </button>
                  </div>
              </div>

            </section>
          : <div/>
        }

        {/* proficiencia */}
        {exibirBProficiencia ?
          <div className="flex w-full bg-white p-3 rounded-lg shadow-lg gap-2 items-center justify-between">
            <label className="w-full">Bônus Proficiência</label>

            <div className="flex items-center gap-2 w-40">
              <label>{personagem?.pe_bproficiencia}</label>
              <MdKeyboardDoubleArrowRight size={18}/>   
              <label>{bproficiencia}</label>
            </div>
          </div>: 
          <div/>
        }

        <ButtonsModal onClose={onClose} onSubmit={onSubmit}/> 
      </div>
    </ModalBase>
  )
}