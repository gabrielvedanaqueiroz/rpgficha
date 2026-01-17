"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "../card";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useAtaqueGet } from "@/hooks/ataque";
import { AtaqueProps } from "@/classes/ataque";
import ModalFiAtaqueAdd from "../modalfiataqueadd";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { toast } from "react-toastify";

interface CardFiAtaqueProps{
  IdPersonagem: string,
}

export default function CardFiAtaque({IdPersonagem}: CardFiAtaqueProps){

  const [expandir, setExpandir]     = useState<boolean>(false);
  const [showModal, setShowModal]   = useState<boolean>(false);

  const {data, isLoading, isError, refetch}  = useAtaqueGet(IdPersonagem);
  
  function onExpadirRecolher(){
    setExpandir(!expandir);
  }

  function onClose(){
    setShowModal(false);  
  }

  async function onSalvar(item:AtaqueProps) {
    try {

      await addDoc(collection(db, "tb_ataque"), {
        at_idpersonagem: IdPersonagem,
        at_descricao: item?.at_descricao.trim(),
        at_alcance: item?.at_alcance.trim(),
        at_bonus: item?.at_bonus,
        at_dano: item?.at_dano.trim(),
        at_tipo: item?.at_tipo.trim(),
      });
         
      await refetch();  
      setShowModal(false);

    } catch (error) {
      toast.error("Erro ao salvar");
    }  
  }


  async function onExcluirItem(aId: string){
    try {
      const docRef = doc(db, "tb_ataque", aId);
      await deleteDoc(docRef);
      await refetch();       
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  function onItem(aItem: AtaqueProps){
    return(
      <li key={aItem.at_id} className="border-b mb-0.5 flex justify-start gap-1">
        <label className="w-32">{aItem.at_descricao}</label>
        <label className="w-32">{aItem.at_alcance}</label>
        <label className="w-10">{aItem.at_bonus}</label>
        <label className="w-10">{aItem.at_dano}</label>
        <label className="w-14">{aItem.at_tipo}</label>
        <button className="w-4" onClick={()=>{onExcluirItem(aItem.at_id)}}>
          <MdDelete size={16}/>
        </button>
      </li>
    )

  }
  return(
    <Card>
      <div className="flex flex-col gap-0.5 w-full overflow-hidden">

        <div className="flex items-center w-full">
          <strong className="w-full">Ataques</strong>
         <button onClick={onExpadirRecolher}>
            {expandir ? <FaMinus size={12}/> : <FaPlus size={12}/>}
          </button>
        </div>

        <div className={`flex flex-col transition-all duration-300 ease-in-out
            ${expandir ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

          <ul className="flex flex-col bg-gray-300 p-1 rounded text-xs">
            <li key={0} className="border-b mb-0.5 flex justify-start gap-1">
              <label className="w-32">Nome</label>
              <label className="w-32">Alcance</label>
              <label className="w-10">Bônus</label>
              <label className="w-10">Dano</label>
              <label className="w-14">Tipo</label>
              <div className="w-4"></div>
            </li>

            {
              isLoading 
              ? 'carregando...'
              : isError
                ? 'erro'
                : data.map((item)=>(
                  onItem(item)
                ))
            }        
          </ul>

          <button className="flex w-full mt-0.5" onClick={()=>{setShowModal(true)}}>
            <label className="text-gray-500 text-xs">Adicionar +</label>
          </button>
        </div>       
      </div> 

      
      {showModal && <ModalFiAtaqueAdd onSalvar={onSalvar} onClose={onClose} />}
    </Card>
  )
}