"use client";

import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiOutlineClockCircle, AiOutlineExperiment } from "react-icons/ai";
import { LiaBrainSolid } from "react-icons/lia";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { MagiaProps } from "@/classes/magia";
import { IoBonfireSharp } from "react-icons/io5";

interface CardMagiaItemProps{
  item:MagiaProps, 
  isCategKnown?: boolean
  onEditar:(item: MagiaProps)=>void;
  onExcluir:(id: string)=>void;
  onPreparar:(id: string, situacao: boolean)=>void;
}

export default function CardMagiaItem({item, isCategKnown = false, onEditar, onExcluir, onPreparar}:CardMagiaItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);

  function onClickExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onDelete(){
    onExcluir(item.mg_id);
  }

  function onEdit(){
    onEditar(item);
  }

  function onPrepare(){
    onPreparar(item.mg_id.toString(), item.mg_preparada);
  }

  return(
    <li key={item.mg_id}>
      <Card>
        <div className="flex flex-col gap-2 w-full">
          
          {/* cabeçalho */}
          <section className="flex gap-2 items-center">
            
            <div className="flex flex-col w-full">
              <strong>{item.mg_nome}</strong>
              <div className="flex gap-2 items-center justify-between">
                <label className="text-xs">Nv: {item.mg_nivel.toString()}</label>
                {
                  isCategKnown 
                  ? (item.mg_preparada? <strong className="text-xs bg-green-800 py-0.5 px-1 rounded text-white">Preparada</strong>:<></>)
                  : <></>
                }
              </div>
            </div>

            <button className="h-10 w-2.5 pt-1.5" onClick={onClickExpadirRecolher}>
              {expandir ? <FaMinus size={10}/> : <FaPlus size={10}/>  }
            </button>
          </section>

          {/* detalhes */}
          <section className={`flex flex-col w-full border-t border-gray-300 overflow-hidden
            transition-all duration-300 ease-in-out
            ${expandir ? 'h-fit opacity-100' : 'max-h-0 opacity-0'}`}>

            <article className="flex h-fit w-full my-1 text-justify">{item.mg_descricao}</article>
            
            {
              item.mg_ritual&&
              <div className="flex gap-1 items-center justify-end">
                <IoBonfireSharp size={12}/>
                <label>ritual</label> 
              </div>
            }

            <div className="grid grid-cols-2 h-fit w-full text-xs">
              <div className="flex w-full gap-0.5 items-center">
                <AiFillHourglass size={12}/> <label>Tempo de Conjuração: {item.mg_tempoconjuracao}</label>
              </div>
              <div className="flex w-full gap-0.5 items-center">
                <AiFillOpenAI size={12}/> <label>Alcance: {item.mg_alcance}</label>
              </div>
              <div className="flex w-full gap-0.5 items-center">
                <AiFillExperiment size={12}/> <label>Componente: {item.mg_componentes}</label>
              </div>
              <div className="flex w-full gap-0.5 items-center">
                <AiOutlineExperiment size={12}/> <label>Material: {item.mg_material}</label>
              </div>
              <div className="flex w-full gap-0.5 items-center">
                <AiOutlineClockCircle size={12}/> <label>Duração: {item.mg_duracao}</label>
              </div>
              <div className="flex w-full gap-0.5 items-center">
                <LiaBrainSolid size={12}/><label>Concentração</label>
              </div>
            </div>

            {/* botoes */}
            <div className="flex border-t border-gray-300 mt-2 justify-end items-center py-2 gap-2">
              <button onClick={onDelete}> <MdDelete size={20}/> </button>
              <button onClick={onEdit}> <MdEdit size={20}/> </button>
              <div className="bg-gray-400 h-5 w-0.5"/>
              <button onClick={onPrepare}> <FaCheck size={20}/> </button>         
            </div>
          </section>

        </div>
      </Card>
    </li>
  );
}