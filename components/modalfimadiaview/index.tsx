"use client";

import { useState } from "react";
import ModalBase from "../modalbase";
import { MagiaProps } from "@/classes/magia";
import { IoBonfireSharp } from "react-icons/io5";
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiOutlineClockCircle, AiOutlineExperiment } from "react-icons/ai";
import { LiaBrainSolid } from "react-icons/lia";
import { useMagiaByIdGet } from "@/hooks/magia";

interface ModalFiMagiaViewProps{
  id: string;
  onClose:()=>void
}

export default function ModalFiMagiaView({id, onClose}: ModalFiMagiaViewProps){

  console.log(id);

  const {data, isLoading, isError} = useMagiaByIdGet(id);

  return(
    <ModalBase title="Magia Preparada" view onClose={onClose}>

      {
        isLoading 
        ? 'carregando...'
        : isError
          ? 'erro'
          :<div className="flex flex-col gap-2 w-full">
        
            {/* cabeçalho */}
            <section className="flex gap-2 items-center">
              
              <div className="flex flex-col w-full">
                <strong>{data?.mg_nome}</strong>
                <label className="text-xs">Nv: {data?.mg_nivel.toString()}</label>
              </div>
            </section>

            {/* detalhes */}
            <section className="flex flex-col w-full border-t border-gray-300">

              <article className="flex h-fit w-full my-1 text-justify">{data?.mg_descricao}</article>
              
              {
                data?.mg_ritual&&
                <div className="flex gap-1 items-center justify-end">
                  <IoBonfireSharp size={12}/>
                  <label>ritual</label> 
                </div>
              }

              <div className="grid grid-cols-2 h-fit w-full text-xs py-1">
                <div className="flex w-full gap-0.5 items-center">
                  <AiFillHourglass size={12}/> <label>Tempo de Conjuração: {data?.mg_tempoconjuracao}</label>
                </div>
                <div className="flex w-full gap-0.5 items-center">
                  <AiFillOpenAI size={12}/> <label>Alcance: {data?.mg_alcance}</label>
                </div>
                <div className="flex w-full gap-0.5 items-center">
                  <AiFillExperiment size={12}/> <label>Componente: {data?.mg_componentes}</label>
                </div>
                <div className="flex w-full gap-0.5 items-center">
                  <AiOutlineExperiment size={12}/> <label>Material: {data?.mg_material}</label>
                </div>
                <div className="flex w-full gap-0.5 items-center">
                  <AiOutlineClockCircle size={12}/> <label>Duração: {data?.mg_duracao}</label>
                </div>
                <div className="flex w-full gap-0.5 items-center">
                  <LiaBrainSolid size={12}/><label>Concentração</label>
                </div>
              </div>
            
            </section>

          </div>
      }
      
      
    </ModalBase>
  )
}