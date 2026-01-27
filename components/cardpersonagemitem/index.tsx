"use client";

import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Image from "next/image";
import Personagem from "@/classes/personagem";

interface CardPersonagemItemProps{
  personagem: Personagem,
  ativo: boolean,
  onEditar:(personagem: Personagem)=>void,
  onExcluir:(id: string)=>void,
  onAtivar:(id:string)=>void
}

export default function CardPersonagemItem( { personagem, ativo, onEditar, onExcluir, onAtivar }:CardPersonagemItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);

  function onClickExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onDelete(){
    onExcluir(personagem.pe_id);
  }

  function onEdit(){
    onEditar(personagem)
  }

  function onActived(){
    onAtivar(personagem.pe_id);
  }

  return(
    <li>
      <Card>
        <div className="flex flex-col gap-2 w-full">
          
          {/* cabeçalho */}
          <section className="flex gap-2 items-center">
            
            <strong className="flex w-full" onClick={onClickExpadirRecolher}>
              { personagem.pe_nome}              
            </strong>

            {ativo ? <strong className="text-xs bg-green-800 py-0.5 px-1 rounded text-white">Ativo</strong>:<></>}             

            <button onClick={onClickExpadirRecolher}>
              {expandir ? <FaMinus size={12}/> : <FaPlus size={12}/>  }
            </button>
          </section>

          {/* detalhes */}
          <section className={`flex flex-col w-full border-gray-300 overflow-hidden
            transition-all duration-300 ease-in-out
            ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

            <div className="flex w-full gap-1">
              
              <section className="flex w-1/6 h-full">
                <div className="border-2 rounded-[50%] p-0.5">
                  <Image className="brightness-0" src={personagem.getImagemClasse()} height={48} width={48} alt="classe"/>
                </div>
              </section>

              <section className="flex w-3/6 h-full flex-col text-xs">
                <label>{ personagem.getClasse()}</label>
                <label>{ personagem.getRaca()}</label>
                <div className="grid grid-cols-2 w-full gap-1">
                  <div className="flex flex-col">
                    <label>{ personagem.pe_antecedente}</label>
                    <label className="border-t">Antecedente</label>
                  </div>
                  <div className="flex flex-col">
                    <label>{ personagem.pe_tendencia}</label>
                    <label className="border-t">Alinhamento</label>
                  </div>
                </div>
              </section>

              <section className="flex w-2/6 h-full gap-2 items-center justify-end">
                
                <div className="relative flex w-12 h-full justify-center items-center">
                  <Image className="absolute z-0" src={'/res/vida.svg'} alt="vida atual" width={48} height={48}/>
                  <label className="absolute z-10 font-bold text-sm">
                    { personagem.pe_vidaatual}
                  </label>
                </div>
                
                <div className="flex flex-col justify-center items-center text-sm border-4 rounded h-11 w-11">
                  <strong>{ personagem.pe_nivel}</strong>
                  <label>Nível</label>
                </div>
              </section>
            </div>

            {/* botoes */}
            <div className="flex border-t border-gray-300 mt-2 justify-end items-center py-2 gap-2">
              <button onClick={onDelete}> <MdDelete size={20}/> </button>
              <button onClick={onEdit}> <MdEdit size={20}/> </button>
              <div className="bg-gray-400 h-5 w-0.5"/>
              <button onClick={onActived}> <FaCheck size={20}/> </button>         
            </div>
          </section>

        </div>
      </Card>
    </li>
  );
}