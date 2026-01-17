"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { useState } from "react";
import ModalFiMagiaView from "../modalfimadiaview";
import { useMagiaGet } from "@/hooks/magia";
import { MagiaProps } from "@/classes/magia";
import { useRouter } from "next/navigation";

interface CardFiMagiaProps{
  IdPersonagem: string,
}

export default function CardFiMagia({IdPersonagem}: CardFiMagiaProps){

  const [expandir, setExpandir]   = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemSel, setItemSel]     = useState<string>('');

  const { listaPrep, isLoading, isError } = useMagiaGet(IdPersonagem);

  const router = useRouter();
      
  function onExpadirRecolher(){
    setExpandir(!expandir);
  }
 
  function onClose(){
    setShowModal(false);
  }

  function onItem(aItem: MagiaProps){
    return(
      <li key={aItem.mg_id} className="flex">
        <button className="border-b mb-0.5 flex justify-start gap-1" 
        onClick={()=>{
          setShowModal(true);
          setItemSel(aItem.mg_id);
        }}>
          <label className="w-34 justify-items-start flex">{aItem.mg_nome}</label>
          <label className="w-18 justify-items-start flex">{aItem.mg_alcance}</label>
          <label className="w-10 ">{aItem.mg_tempoconjuracao}</label>
          <label className="w-10 ">{(aItem.mg_nivel === 0? 'Truque': aItem.mg_nivel.toString())}</label>
          <label className="w-8 ">{aItem.mg_dano}</label>        
          <label className="w-18 ">{aItem.mg_duracao}</label>
        </button>
        
      </li>
    )

  }

  return(
    <Card>
      <div className="flex flex-col gap-0.5 w-full overflow-hidden">

        <div className="flex items-center w-full">
          <strong className="w-full">Magias preparadas</strong>
          
          <button onClick={onExpadirRecolher}>
            {expandir ? <FaMinus size={12}/> : <FaPlus size={12}/>}
          </button>
        </div>
        <div className={`flex flex-col transition-all duration-300 ease-in-out
            ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          
          <ul className="flex flex-col bg-gray-300 p-1 rounded text-xs">
            <li key={0} className="border-b mb-0.5 flex justify-start gap-1">
              <label className="w-34">Nome</label>
              <label className="w-18">Alcance</label>
              <label className="w-10">Tempo</label>
              <label className="w-10">Nível</label>
              <label className="w-8">Dano</label>
              <div className="w-18">Duração</div>
            </li>
            {
              isLoading 
              ? 'carregando..'
              : isError
                ? 'erro'
                : listaPrep.map((item)=>
                  onItem(item)     
                )
            }
          </ul>
          <button className="flex w-full mt-0.5" onClick={()=>{
            
            router.push('/magias')
          }}>
            <label className="text-gray-500 text-xs">Adicionar +</label>
          </button>
        </div>      
        
      </div> 

      {showModal && <ModalFiMagiaView id={itemSel} onClose={onClose} />}
    </Card>
  )
}