"use client";

import { ReactNode, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";

interface CardCaracteristicaItemProps{
  id:number, title: string, children: ReactNode
}

export default function CardCaPericiaItem({id, title, children}:CardCaracteristicaItemProps){

  const [expandir, setExpandir] = useState<boolean>(false);
  
    function onExpadirRecolher(){
      setExpandir(!expandir);
    }
 
    return(
      <li key={id}>
        <Card>
          <div className="flex flex-col gap-2 w-full">
            
            {/* cabeçalho */}
            <section className="flex gap-2 items-center">
              
              <strong className="flex w-full">
                {title}              
              </strong>
  
              <button onClick={onExpadirRecolher}>
                {expandir ? <FaMinus size={10}/> : <FaPlus size={10}/>  }
              </button>
            </section>
  
            {/* detalhes */}
            <section className={`flex w-full border-t border-gray-300 overflow-hidden
              transition-all duration-300 ease-in-out
              ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {children}
             </section>
  
          </div>
        </Card>
      </li>
    );
}