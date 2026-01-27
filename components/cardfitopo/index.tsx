"use client";

import { memo, useState } from "react";
import CardFlag from "../cardflag";
import Image from "next/image";
import Personagem from "@/classes/personagem";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ModalXPEdit from "../modalxpedit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { FaAngleDoubleUp } from "react-icons/fa";
import ModalUpar, { ModalUparRetorno } from "../modalupar";

interface CardFiTopoProps{
  personagem: Personagem|null,
  isLoading: boolean
}

function CardFiTopo({personagem, isLoading}: CardFiTopoProps){

  const [showXP, setShowXP]     = useState<boolean>(false);
  const [showUpar, setShowUpar] = useState<boolean>(false);
 
  function onClickExp(){
    setShowXP(true);
  }

  function onCloseExp(){
    setShowXP(false);
  }

  async function onSalvarExp(aValor:number){
    
    if (personagem) {
      personagem.pe_experiencia = aValor;
    
      //salvar banco 
      const docRef = doc(db, "tb_personagem", personagem?.pe_id.trim());
      await updateDoc(docRef, {
        pe_experiencia: aValor,
      });
    }     
    
    setShowXP(false);
  }

  function onFlag(aId: number, aValor: number|undefined, aDesc:String){
    return(
      <CardFlag>
        <div key={aId} className="flex flex-col h-14 w-16 text-amber-300 justify-center items-center gap-0.5 text-[10px] px-2">
          <label className="text-sm">{aValor}</label>
          <label className="flex border-t w-full justify-center">{aDesc}</label>
        </div>
      </CardFlag>
    )
  }

  function loading(){
    return(
      <section className="flex w-full h-34 bg-(--cprimary) shadow-lg md:px-96">
      
      <div className="flex w-2/5 p-2 flex-col text-xs gap-1 ">

        <div className="flex flex-col w-full h-fit text-xs">
          <Skeleton height={14} baseColor="#fadf7c"/>
          <Skeleton height={14} baseColor="#fadf7c"/>
          <Skeleton height={14} baseColor="#fadf7c"/>
        </div>

        <div className="flex w-full h-fit gap-2 px-2">

          {onFlag(0, 0, 'Iniciativa')}
          {onFlag(1, 0, 'Movimento')}

        </div>

      </div>

      <div className="flex w-1/5 py-4">

        <div className="flex border-4 p-1 rounded-[50%] w-full h-full items-center justify-center">
          { 
            personagem?.getImagemClasse() 
            ? <Image className="brightness-0" src={personagem?.getImagemClasse()||""} width={75} height={75} alt={personagem.pe_classe} />
            : <Image className="brightness-0" src={'./res/logo.svg'} width={75} height={75} alt={'classe'} />
          }
          
        </div>

      </div>
      <div className="flex w-2/5 p-2 flex-col text-xs gap-1">

        <div className="flex flex-col w-full h-fit text-xs">
          
          <Skeleton height={14} baseColor="#F8cc27"/>          
          <Skeleton height={14} baseColor="#F8cc27"/>          
          <Skeleton height={14} baseColor="#F8cc27"/>
        </div>

        <div className="flex w-full h-fit gap-2 px-2">

          {onFlag(3, 0, 'Bônus Prof.')}
         
          <button onClick={onClickExp}>
            {onFlag(4, 0, 'Exp +')}
          </button>
        
        </div>

      </div>
    </section>
    )
  }

  function onUpar(){
    setShowUpar(true);
  }

  function onCloseUpar(){
    setShowUpar(false);
  }

  async function onSalvarUpar(item:ModalUparRetorno){
    
    if (personagem){
      personagem.pe_nivel         = item.pe_nivel;
      personagem.pe_vidabase      = item.pe_vida;
      personagem.pe_bproficiencia = item.pe_bproficiencia;
      personagem.pe_forca         = item.pe_forca;
      personagem.pe_destreza      = item.pe_destreza;
      personagem.pe_constituicao  = item.pe_constituicao;
      personagem.pe_inteligencia  = item.pe_inteligencia;
      personagem.pe_sabedoria     = item.pe_sabedoria;
      personagem.pe_carisma       = item.pe_carisma;
      personagem.pe_subclasse     = item.pe_subclasse;
    
      //salvar banco 
      const docRef = doc(db, "tb_personagem", personagem?.pe_id.trim());
      await updateDoc(docRef, {
        pe_nivel: item.pe_nivel,
        pe_vidabase : item.pe_vida,
        pe_bproficiencia : item.pe_bproficiencia,
        pe_forca : item.pe_forca,
        pe_destreza : item.pe_destreza,
        pe_constituicao : item.pe_constituicao,
        pe_inteligencia : item.pe_inteligencia,
        pe_sabedoria : item.pe_sabedoria,
        pe_carisma : item.pe_carisma,
        pe_subclasse : item.pe_subclasse,
      });
    }      
    
    setShowUpar(false);
  }

  return(
 
    isLoading
      ? loading()
      : <section className="flex w-full h-fit bg-(--cprimary) shadow-lg md:px-96">
      
          <section className="flex w-2/5 p-2 flex-col text-xs gap-1 justify-between">

            <div className="flex flex-col w-full h-fit text-xs">
              <strong className="text-sm w-full border-b-2">{personagem?.pe_nome}</strong>
              <strong>{personagem?.getClasse()}</strong>
              <strong>{personagem?.getRaca()}</strong>
            </div>

            <div className="flex w-full h-fit gap-2 px-2 justify-center items-center">

              {onFlag(0, personagem?.getModDestreza(), 'Iniciativa')}
              {onFlag(1, personagem?.pe_movimento, 'Movimento')}

            </div>

          </section>

          <section className="flex w-1/5 py-4">

            <div className="flex border-4 p-1 rounded-[50%] w-full h-full items-center justify-center">
              { 
                personagem?.getImagemClasse() 
                ? <Image className="brightness-0" src={personagem?.getImagemClasse()||""} width={75} height={75} alt={personagem.pe_classe} />
                : <></>
              }
              
            </div>

          </section>

          <section className="flex w-2/5 p-2 flex-col text-xs gap-1 justify-between">

            <div className="flex flex-col w-full h-fit text-xs">
              <div className="flex text-sm w-full border-b-2 items-center gap-2">
                <strong>Nível {personagem?.pe_nivel}</strong>
                {
                  personagem?.podeUpar()
                  ? <button onClick={onUpar}> <FaAngleDoubleUp size={18}/> </button>
                  : <></>
                }
              </div>
              <strong>{personagem?.pe_antecedente}</strong>
              <strong>{personagem?.pe_tendencia}</strong>
            </div>

            <div className="flex w-full h-fit gap-2 px-2 justify-center items-center">

              {onFlag(3,personagem?.pe_bproficiencia, 'Bônus Prof.')}
            
              <button onClick={onClickExp}>
                {onFlag(4, personagem?.pe_experiencia, 'Exp +')}
              </button>
            
            </div>

          </section>

          {showXP ? <ModalXPEdit xp={personagem?.pe_experiencia} nivel={personagem?.pe_nivel} onClose={onCloseExp} onSalvar={onSalvarExp}/> : <></>}
          {showUpar ? <ModalUpar personagem={personagem} onClose={onCloseUpar} onSalvar={onSalvarUpar}/> : <></>}
        </section>
    
  );

}

export default memo(CardFiTopo);