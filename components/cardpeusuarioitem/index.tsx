"use client";

import { useState } from "react";
import Card from "../card";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

interface CardPeUsuarioItemProps{
  id?: string, 
  usuario?:string, 
  email?:string
  onDeslogar:()=>void,
}

export default function CardPeUsuarioItem({id, usuario, email, onDeslogar}: CardPeUsuarioItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);
  
  function onClickExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onDesconectar(){
    onDeslogar();
  }
  
  return(
    <Card>
      <div className="flex flex-col gap-2 w-full">
        
        {/* cabeçalho */}
        <section className="flex gap-2 items-center">
          
          <strong className="flex w-full" onClick={onClickExpadirRecolher}>
            {usuario}              
          </strong>

          <button onClick={onClickExpadirRecolher}>
            {expandir ? <FaMinus size={12}/> : <FaPlus size={12}/>  }
          </button>
        </section>

        {/* detalhes */}
        <section className={`flex flex-col w-full border-gray-300 overflow-hidden
          transition-all duration-300 ease-in-out gap-1
          ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

          <label>{email}</label>

          <button className="flex items-center gap-1 bg-gray-200 rounded-md shadow-lg px-2 py-1 w-fit"
          onClick={onDesconectar}>
            <RiLogoutCircleLine size={18} /> Desconectar
          </button>  
          
        </section>

      </div>
    </Card>
  )
}