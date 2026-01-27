"use client";

import { useRouter } from "next/navigation";
import { BsPersonRaisedHand } from "react-icons/bs";
import  Card  from "@/components/card";

export default function SemPersonagem(){

  const router = useRouter();

  return(
    
      <main className="flex justify-center items-center w-full h-fit gap-2 flex-col p-5">
        
        <Card>
          <main className="flex justify-center items-center w-full gap-2 flex-col p-5">
            <BsPersonRaisedHand  size={50}/>
            <label>Nenhum personagem selecionado.</label>
            <label>Selecione ou crie um novo personagem.</label>
          </main>
        </Card>       

        <button className="flex bg-(--csecundary) text-white p-2 rounded shadow-lg" 
         onClick={()=>{router.replace('/personagens')}}>
          Personagem
        </button>
        
      </main>
  )
}