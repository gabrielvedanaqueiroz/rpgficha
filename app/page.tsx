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
import { useEffect, useState } from "react";

export default function Home() {

  const [IdPersonagem, setIdPersonagem] = useState<string>(''); 
  const {data, isLoading, isError} = usePersonagemByIdGet(IdPersonagem); 
  
  useEffect(()=>{
    let id = localStorage.getItem('RF@personagemID') || '';
    setIdPersonagem(id);
  }, []);

  return (
    <main>
      <Headerbar/>
      
      <section className="flex flex-col gap-1 h-fit pb-14">

        {/* cabeçalho */}
        <CardFiTopo personagem={data} isLoading={isLoading}/>
        {
          isLoading 
          ? <div className="flex flex-col p-2 gap-2 md:px-96">
              <Skeleton height={150}/>
              <Skeleton height={150}/>
              <Skeleton height={150}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
            </div>
          : <section className="flex flex-col p-2 gap-2 md:px-96 px-3">

              <CardFiVida personagem={data}/>

              <CardFiSalvaGuarda personagem={data}/>

              <CardFiHabilidade personagem={data}/>

              <CardFiAtaque IdPersonagem={data?.pe_id}/>

              <CardFiMagia IdPersonagem={data?.pe_id}/>

            </section>
        }
        
      </section>
      
      <Footebar/>
    </main>

  );
}
