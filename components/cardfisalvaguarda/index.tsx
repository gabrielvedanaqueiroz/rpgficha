"use client";

import { memo, useState } from "react";
import Card from "../card";
import CardFlag from "../cardflag";
import Personagem from "@/classes/personagem";
import ModalCArmEdit from "../modalcarmedit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface CardFiSalvaGuardaProps{
  personagem: Personagem|null,
}

function CardFiSalvaGuarda({ personagem }: CardFiSalvaGuardaProps){

  const [showCA, setShowCA] = useState<boolean>(false);

  function onClickCA(){
    setShowCA(true);
  }

  function onClose(){
    setShowCA(false);
  }

  async function onSalvar(aValor:number){
    console.log("CA?"+aValor);

    if (personagem)
      personagem.pe_catotal = aValor;
    
    //salvar banco 
    const docRef = doc(db, "tb_personagem", personagem?.pe_id.trim());
    await updateDoc(docRef, {
      pe_catotal: aValor,
    });

    setShowCA(false);
  }

  function onItem(aId: number, aDesc: string, aValor: number, aMarcado: boolean = false){
    return(
      <li key={aId} className="flex gap-1 items-center">
        {aMarcado ? <div className="bg-black rounded-lg w-2 h-2"/>  : <div className="border rounded-lg w-2 h-2"/> }
        <label className="w-2/3">{aDesc}</label>
        <label>{aValor}</label>
      </li>
    )
  }

  return(
    <Card>
      <section className="flex flex-col border-r items-center w-2/3 h-fit text-xs">
        <strong className="w-full text-center text-sm">Resistência</strong>
        <ul className="flex flex-col w-full h-full gap-1">
          {onItem(1, 'Força', personagem?.getSGForca(), personagem?.pe_sgforca)}
          {onItem(2, 'Destreza', personagem?.getSGDestreza(), personagem?.pe_sgdestreza)}
          {onItem(3, 'Constituição', personagem?.getSGConstituicao(), personagem?.pe_sgconstituicao)}
          {onItem(4, 'Inteligência', personagem?.getSGInteligencia(), personagem?.pe_sginteligencia)}
          {onItem(5, 'Sabedoria', personagem?.getSGSabedoria(), personagem?.pe_sgsabedoria)}
          {onItem(6, 'Carisma', personagem?.getSGCarisma(), personagem?.pe_sgcarisma)}
        </ul>
      </section>

      <section className="flex flex-col items-center w-1/3 h-fit p-2 gap-1 text-(--cprimary)">

        <div className="bg-(--csecundary) w-18 h-16 rounded flex flex-col gap-0.5 justify-center items-center p-2">
          <strong className="text-center text-sm border-b">{personagem?.getPercepcaoPassiva()}</strong>          
          <label className="w-full text-center text-[10px]">Perc. Passiva</label>
        </div>

        <button onClick={onClickCA} aria-label="classe de armadura">
          <CardFlag>
            <div className="w-18 h-16 rounded flex flex-col gap-0.5 justify-center items-center p-2">
              <strong className="text-center text-sm border-b">{personagem?.pe_catotal}</strong>          
              <label className="w-full text-center text-[10px]">CA+</label>
            </div>
          </CardFlag>
        </button>
        
      </section>

      {showCA ? <ModalCArmEdit ca={personagem?.pe_catotal} onClose={onClose} onSalvar={onSalvar}/> : <></>}
    </Card>
  )
}

export default memo(CardFiSalvaGuarda);




