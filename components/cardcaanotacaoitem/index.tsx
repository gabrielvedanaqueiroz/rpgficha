"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AnotacaoProps } from "@/classes/anotacao";
import { getData } from "@/utils";

interface CardCaAnotacaoItemProps{
  item: AnotacaoProps,
  onEditar:(item: AnotacaoProps)=>void,
  onExcluir:(id: string)=>void,
}

export default function CardCaAnotacaoItem({item, onEditar, onExcluir}:CardCaAnotacaoItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);

  function onExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onDelete(){
    onExcluir(item.an_id);
  }

  function onEdit(){
    onEditar(item);
  }

  return(
    <li key={'an_'+item.an_id}>
      <Card>
        <div className="flex flex-col gap-2 w-full">
          
          {/* cabeçalho */}
          <section className="flex gap-2 items-center">
            
            <strong className="flex w-full">
              {item.an_titulo}, {getData(item.an_data)}              
            </strong>

            <button onClick={onExpadirRecolher}>
              {expandir ? <FaMinus size={10}/> : <FaPlus size={10}/>  }
            </button>
          </section>

          {/* detalhes */}
          <section className={`flex flex-col w-full border-t border-gray-300 overflow-hidden
            transition-all duration-300 ease-in-out
            ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

            <article className="flex h-fit w-full my-1 text-justify">{item.an_descricao}</article>

            {/* botoes */}
            <div className="flex border-t border-gray-300 mt-2 justify-end items-center py-2 gap-2">
              <button onClick={onDelete}> <MdDelete size={20}/> </button>
              <button onClick={onEdit}> <MdEdit size={20}/> </button>     
            </div>
          </section>

        </div>
      </Card>
    </li>
  );
}