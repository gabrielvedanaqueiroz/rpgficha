"use client";

import CardFiAtaque from "@/components/cardfiataque";
import CardFiMagia from "@/components/cardfimagia";
import CardFiHabilidade from "@/components/cardfihabilidade";
import CardFiSalvaGuarda from "@/components/cardfisalvaguarda";
import CardFiTopo from "@/components/cardfitopo";
import CardFiVida from "@/components/cardfivida";
import Footebar from "@/components/footerbar";
import Headerbar from "@/components/headerbar";
import { usePersonagemByIdGet } from "@/hooks/personagem";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext, useEffect, useState } from "react";
import SemPersonagem from "@/components/sempersonagem";
import { AuthContext } from "@/utils/auth";

export default function Home() {

  // validar login

  const [IdPersonagem, setIdPersonagem] = useState<string>(''); 
  const {data, isLoading, isError}      = usePersonagemByIdGet(IdPersonagem); 
  
  
  useEffect(()=>{
    let id = localStorage.getItem('RF@personagemID') || '';
    setIdPersonagem(id);
  }, []);

  function loading(){
    return(
      <div className="flex flex-col p-2 gap-2 md:px-96">
        <Skeleton height={150}/>
        <Skeleton height={150}/>
        <Skeleton height={150}/>
        <Skeleton height={50}/>
        <Skeleton height={50}/>
      </div>
    )
  }

  return (
    <main>
      <Headerbar/>
      
      <section className="flex flex-col gap-1 h-fit pb-14">

        {/* cabeçalho */}
        {isLoading 
          ? <CardFiTopo personagem={data} isLoading={isLoading}/> 
          : data && <CardFiTopo personagem={data} isLoading={isLoading}/> 
        }
        
        {
          isLoading 
          ? loading()
          : 
            data 
            ?(
              <section className="flex flex-col py-2 px-3 gap-2 md:grid md:grid-cols-2 md:px-8 ">

                <CardFiVida personagem={data}/>

                <CardFiSalvaGuarda personagem={data}/>

                <CardFiHabilidade personagem={data}/>

                <div className="flex flex-col gap-2">
                  <CardFiAtaque IdPersonagem={data?.pe_id}/>

                  <CardFiMagia IdPersonagem={data?.pe_id}/>
                </div>

              </section>
            )            
            : <SemPersonagem/>
        }
        
      </section>
      
      <Footebar/>
    </main>

  );
}
