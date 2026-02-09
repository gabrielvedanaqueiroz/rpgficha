"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { InventarioProps } from "@/classes/inventario";

interface CardInventarioItemProps{
  item: InventarioProps,
  onEditar:(item: InventarioProps)=>void;
  onExcluir:(id: string)=>void;
}

export default function CardInventarioItem({item, onEditar, onExcluir}:CardInventarioItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);

  function onClickExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onDelete(){
    onExcluir(item.in_id);
  }

  function onEdit(){
    onEditar(item);
  }

  return(
    <li>
      <Card>
        <div className="flex flex-col gap-2 w-full">
          
          {/* cabeçalho */}
          <section className="flex gap-2 items-center">
            
            <strong className="flex w-full" onClick={onClickExpadirRecolher}>
              {item.in_nome}              
            </strong>

            <button onClick={onClickExpadirRecolher} aria-label="expandir\recolher">
              {expandir ? <FaMinus size={12}/> : <FaPlus size={12}/>  }
            </button>
          </section>

          {/* detalhes */}
          <section className={`flex flex-col w-full border-t border-gray-300 overflow-hidden
            transition-all duration-300 ease-in-out
            ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

            <article className="flex h-fit w-full my-1 text-justify">{item.in_descricao}</article>

            {/* botoes */}
            <div className="flex border-t border-gray-300 mt-2 justify-end items-center py-2 gap-2">
              <button onClick={onDelete} aria-label="excluir"> <MdDelete size={20}/> </button>
              <button onClick={onEdit} aria-label="editar"> <MdEdit size={20}/> </button>     
            </div>
          </section>

        </div>
      </Card>
    </li>
  );
}