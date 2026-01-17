"use client";

import Image from "next/image";
import Card from "../card";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { ReactElement, useEffect, useState } from "react";
import Personagem from "@/classes/personagem";
import { db } from "@/services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";

interface CardFiVidaProps{
  personagem: Personagem|null,
}

export default function CardFiVida({personagem}: CardFiVidaProps){

  const [vidaAtual, setVidaAtual] = useState<number>(0);
  const [vidaTemp, setVidaTemp]   = useState<number>(0);
  const [vidaMax, setVidaMax]     = useState<number>(0);
  const [dadoUsado, setDadoUsado] = useState<number>(0);

  const [chkSucesso, setChkSucesso] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const [chkFalha, setChkFalha] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  useEffect(()=>{
    setVidaAtual(personagem?.pe_vidaatual);
    setVidaTemp(personagem?.pe_vidatemp);
    setVidaMax(personagem?.pe_vidabase);
    setDadoUsado(personagem?.pe_vidadadousado);

    setChkSucesso({
      option1: personagem?.pe_tcmsucesso1,
      option2: personagem?.pe_tcmsucesso2,
      option3: personagem?.pe_tcmsucesso3,
    });

    setChkFalha({
      option1: personagem?.pe_tcmfalha1,
      option2: personagem?.pe_tcmfalha2,
      option3: personagem?.pe_tcmfalha3,
    });
  }, [personagem]);

  async function onIncrementar(){

    if(personagem){

      let LVida = vidaAtual;
      if(LVida < vidaMax){
        ++LVida;
      
        personagem.pe_vidaatual = LVida;
        setVidaAtual(LVida);

        //salvar banco 
        const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
        await updateDoc(docRef, {
          pe_vidaatual: LVida,
        });
      }
        
    }
  }

  async function onDecrementar(){

    if(personagem){

      let LVida     = vidaAtual;
      let LVidaTemp = vidaTemp;
      let valido: boolean = false;    

      if(vidaTemp > 0){
        valido = true;
        --LVidaTemp;
      }
      else
        if(vidaAtual > 0){
          valido = true;
          --LVida;
        }
          
      if(valido){
        setVidaAtual(LVida);
        setVidaTemp(LVidaTemp);

        personagem.pe_vidaatual = LVida;
        personagem.pe_vidatemp  = LVidaTemp;
        //salvar banco 

        const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
        await updateDoc(docRef, {
          pe_vidaatual: LVida,
          pe_vidatemp: LVidaTemp,
        });
      }
      
    }
  }

  async function onVidaTemp(e: React.ChangeEvent<HTMLInputElement>) {

    if(e.target.value !== ''){
      let LValor = Number(e.target.value);

      if(personagem){
        setVidaTemp(LValor);
        personagem.pe_vidatemp  = LValor;

        //salvar banco 
        const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
        await updateDoc(docRef, {
          pe_vidatemp: LValor,
        });
      }
    }    
    
  }

  async function onUsarDado(e: React.ChangeEvent<HTMLInputElement>) {

    if(e.target.value !== ''){
      let LValor = Number(e.target.value);

      //verificar se nao for maior que o nivel
      if(personagem){
        
        if((LValor <= personagem?.pe_nivel) &&(LValor >= 0)){
          
          setDadoUsado(LValor);
          personagem.pe_vidadadousado  = LValor;
        
          //salvar banco 
          const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
          await updateDoc(docRef, {
            pe_vidadadousado: LValor,
          });
        }
      }
      
    }    
    
  }

  async function onChanceSucesso(event : React.ChangeEvent<HTMLInputElement>){

    const { name, checked } = event.target;
    setChkSucesso((prev) => ({
      ...prev,
      [name]: checked,
    }));

    let s1, s2, s3 = false;
    switch (name){
      case 'option1': 
        s1 = checked;
        s2 = chkSucesso.option2;
        s3 = chkSucesso.option3;
      break;
      case 'option2': 
        s2 = checked;
        s1 = chkSucesso.option1;
        s3 = chkSucesso.option3;
      break;
      case 'option3': 
        s3 = checked;
        s1 = chkSucesso.option1;
        s2 = chkSucesso.option2;
      break;
    }

    if(personagem){
      personagem.pe_tcmsucesso1  = s1;
      personagem.pe_tcmsucesso2  = s2;
      personagem.pe_tcmsucesso3  = s3;
      //salvar banco 

      const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
      await updateDoc(docRef, {
        pe_tcmsucesso1: s1,
        pe_tcmsucesso2: s2,
        pe_tcmsucesso3: s3,
      });
    }
    
  };

  async function onChanceFalha(event : React.ChangeEvent<HTMLInputElement>){

    const { name, checked } = event.target;
    setChkFalha((prev) => ({
      ...prev,
      [name]: checked,
    }));

    let f1, f2, f3 = false;
    switch (name){
      case 'option1': 
        f1 = checked;
        f2 = chkFalha.option2;
        f3 = chkFalha.option3;
      break;
      case 'option2': 
        f2 = checked;
        f1 = chkFalha.option1;
        f3 = chkFalha.option3;
      break;
      case 'option3': 
        f3 = checked;
        f1 = chkFalha.option1;
        f2 = chkFalha.option2;
      break;
    }

    if(personagem){
      personagem.pe_tcmfalha1  = f1;
      personagem.pe_tcmfalha2  = f2;
      personagem.pe_tcmfalha3  = f3;
      //salvar banco 

      const docRef = doc(db, "tb_personagem", personagem.pe_id.trim());
      await updateDoc(docRef, {
        pe_tcmfalha1: f1,
        pe_tcmfalha2: f2,
        pe_tcmfalha3: f3,
      });
    }
  };

  return(
    <Card>

      {/* vida */}
      <section className="flex flex-col border-r items-center w-1/2 h-fit">
        <strong className="w-full text-center">Vida</strong>
        
        <div className="flex w-full">
          
          {/* vida */}
          <div className="flex flex-col gap-0.5 border-r pr-2 w-1/3 items-center">
            
            <div className="relative flex w-full h-full justify-center items-center">
              <Image className="absolute z-0" src={'/res/vida.svg'} alt="vida atual" width={48} height={48}/>
              <label className="absolute z-10 font-bold text-sm">
                {vidaAtual}
              </label>
            </div>
            
            <div className="flex w-full bg-orange-600 shadow-lg rounded-lg h-6 justify-around items-center text-yellow-300 overflow-hidden">
              <button className="w-6 flex items-center justify-center transition-transform duration-150 active:scale-85"
              onClick={onIncrementar}>
                <FaPlus size={10}/>
              </button>
              <div className="border w h-full bg-amber-300"/>
              <button className="w-6 flex items-center justify-center transition-transform duration-150 active:scale-85"
              onClick={onDecrementar}>
                <FiMinus size={10}/>
              </button>
            </div>
          </div> 

          {/* temp */}
          <div className="flex flex-col gap-0.5 border-r pl-2 w-1/3 text-[13px]">
            <div className="flex flex-col gap-1">
              <input type="number" className="mx-2" value={vidaTemp} onChange={onVidaTemp}/>
              <label className="border-t">Temp</label>
            </div>
            <div className="flex flex-col gap-0.5">
              <label>{vidaMax}</label>
              <label className="border-t">Max</label>
            </div>
          </div>
          
          {/* dados */}
          <div className="flex flex-col gap-0.5 pl-2 w-1/3 text-[13px]">
            <div className="flex flex-col gap-1">
              <input type="number" className="mx-2" value={dadoUsado} onChange={onUsarDado}/>
              <label className="border-t">Usado</label>
            </div>
            <div className="flex flex-col gap-0.5">
              <label>{personagem?.pe_nivel}{personagem?.pe_vidadado}</label>
              <label className="border-t">Dados</label>
            </div>
          </div>

        </div>  
              
      </section>

      {/* morte */}
      <section className="flex flex-col items-center w-1/2 h-fit px-2">
        <strong className="w-full text-center">Teste contra a morte</strong>  
        <div className="flex gap-1 w-full pt-8">
          <input type="checkbox" name="option1" checked={chkSucesso.option1} onChange={onChanceSucesso}/>
          <input type="checkbox" name="option2" checked={chkSucesso.option2} onChange={onChanceSucesso}/>
          <input type="checkbox" name="option3" checked={chkSucesso.option3} onChange={onChanceSucesso}/>
          Sucesso
        </div>      
        <div className="flex gap-1 w-full">
          <input type="checkbox" name="option1"checked={chkFalha.option1} onChange={onChanceFalha}/>
          <input type="checkbox" name="option2"checked={chkFalha.option2} onChange={onChanceFalha}/>
          <input type="checkbox" name="option3"checked={chkFalha.option3} onChange={onChanceFalha}/>
          Falha
        </div>      
      </section>
    </Card>
  )
}