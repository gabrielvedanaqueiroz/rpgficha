"use client";

import Personagem from "@/classes/personagem";
import CardPersonagemItem from "@/components/cardpersonagemitem";
import CardPeUsuarioItem from "@/components/cardpeusuarioitem";
import PageBase from "@/components/pagebase";
import { usePersonagemGet } from "@/hooks/personagem";
import { db } from "@/services/firebaseConnection";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";
import {AuthContext} from "@/utils/auth";
import { useJogadorGet } from "@/hooks/jogador";
import Buttonadicionar from "@/components/buttonadicionar";

export default function Personagens(){

  const router      = useRouter();
  const {onSingOut} = useContext(AuthContext);

  const [personagemID, setPersonagemId] = useState<string>('');  
  
  const [joId, setJoId]       = useState<string>('');
  const [joEmail, setJoEmail] = useState<string>('');

  const {data : jogador}  = useJogadorGet(joId);
  const {data, isLoading, isError, refetch} = usePersonagemGet(joId);
 

  useEffect(()=>{
    let id            = localStorage.getItem('RF@personagemID'); 
    let usuarioData   = localStorage.getItem('RF@detailUser'); 

    if (usuarioData) {
      const data = JSON.parse(usuarioData);
  
      setJoEmail(data.email);
      setJoId(data.uid);

    }

    setPersonagemId(id||'');
  },[]);

  function onAdicionar(){
    router.push("/personagens/criacao/topo");
  }

  function onEditar(personagem: Personagem){
    alert("Em Construção")
  }

  async function onExcluir(id: string){
    const docRef = doc(db, "tb_personagem", id);
    await deleteDoc(docRef)
    .then(()=>{
      refetch();
    })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  }
  
  async function onAtivar(id:string){
    localStorage.setItem('RF@personagemID', id); 

    if(personagemID){ 

      // primeiro fazer um updateDoc no personagemID pode ja ter um ativo
      const docAtivo = doc(db, "tb_personagem", personagemID);
      await updateDoc(docAtivo, {
          pe_ativo: false,
        }
      );
    }
    
    const docRef = doc(db, "tb_personagem", id);
    await updateDoc(docRef, {
        pe_ativo: true,
      }
    )
    .then(()=>{
      setPersonagemId(id);
      router.replace("/");
    })
    .catch((error)=>{
      console.log('Erro ao selecionar: '+error);
      toast.error('Erro ao selecionar');
    });
  }

   async function onDeslogar(){
    
    await onSingOut();
    router.replace("/login");
  }

  return(
    <PageBase title="Personagens">      
    
      <section className="flex w-full h-fit flex-col pb-12">

        <section className="flex w-full h-fit flex-col pt-2">
          
          <ul className="flex flex-col gap-1">

            {
              isLoading
              ? <Skeleton height={150}/>
              : isError 
                ? 'erro'
                : data?.map((item)=>(
                  <CardPersonagemItem key={item?.pe_id} personagem={item} ativo={item.pe_id === personagemID} onEditar={onEditar} onExcluir={onExcluir} onAtivar={onAtivar}/>      
                ))
            }     
          </ul>

        </section>

        <section className="flex w-full h-fit flex-col pt-2">
          <div className="flex w-full gap-2 items-center">
            <strong className="text-orange-600  whitespace-nowrap">Usuário</strong>
            <div className="h-0.5 flex-1 bg-amber-600 rounded-lg"/>
          </div>

          <CardPeUsuarioItem id={joId} usuario={jogador?.jo_nome} email={joEmail} onDeslogar={onDeslogar}/> 
          
        </section> 
        
      </section>

      <Buttonadicionar onAdicionar={onAdicionar}/>

    </PageBase>
  );

}