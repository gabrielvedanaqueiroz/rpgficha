"use client";

import Card from "@/components/card";
import CardMagiaItem from "@/components/cardmagiaitem";
import PageBase from "@/components/pagebase";
import { useEffect, useState } from "react";
import {collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "@/services/firebaseConnection";
import { MagiaProps } from "@/classes/magia";
import { useMagiaGet } from "@/hooks/magia";
import ModalMagiaAdd from "@/components/modalmagiaadd";
import { toast } from "react-toastify";
import { usePersonagemByIdGet } from "@/hooks/personagem";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SemPersonagem from "@/components/sempersonagem";
import Buttonadicionar from "@/components/buttonadicionar";

export default function Magias(){

  const [IdPersonagem, setIdPersonagem] = useState<string>(''); 
  
  const {data: personagem}                              = usePersonagemByIdGet(IdPersonagem);
  const {data, listaPrep, isLoading, isError, refetch}  = useMagiaGet(IdPersonagem);
 
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [itemSel, setItemSel] = useState<MagiaProps>();

  useEffect(()=>{
    let id = localStorage.getItem('RF@personagemID') || '';
    setIdPersonagem(id);
  }, []);
  
  function onAdicionar(){
    setShowAdd(true);
    setItemSel(undefined);
  }

  async function onSalvar(item: MagiaProps) {
    try {
      if (item?.mg_id) {
        const docRef = doc(db, "tb_magia", item.mg_id);
        await updateDoc(docRef, {
          mg_nome:item?.mg_nome.trim(),
          mg_descricao: item?.mg_descricao.trim(),
          mg_alcance: item?.mg_alcance.trim(),
          mg_componentes: item?.mg_componentes.trim(),
          mg_dano: item?.mg_dano.trim(),
          mg_duracao: item?.mg_duracao.trim(),
          mg_nivel: item?.mg_nivel,
          mg_preparada: item?.mg_preparada,
          mg_tempoconjuracao: item?.mg_tempoconjuracao.trim(),
          mg_material: item?.mg_material ?? "",
          mg_ritual: item?.mg_ritual ?? false ,
          mg_concentracao: item?.mg_concentracao ?? false,
        });
      } else {
        await addDoc(collection(db, "tb_magia"), {
          mg_idpersonagem: IdPersonagem,
          mg_nome:item?.mg_nome.trim(),
          mg_descricao: item?.mg_descricao.trim(),
          mg_alcance: item?.mg_alcance.trim(),
          mg_componentes: item?.mg_componentes.trim(),
          mg_dano: item?.mg_dano.trim(),
          mg_duracao: item?.mg_duracao.trim(),
          mg_nivel: item?.mg_nivel,
          mg_preparada: item?.mg_preparada,
          mg_tempoconjuracao: item?.mg_tempoconjuracao.trim(),
          mg_material: item?.mg_material ?? "",
          mg_ritual: item?.mg_ritual ?? false ,
          mg_concentracao: item?.mg_concentracao ?? false,
        });
      }

      await refetch();       
      setShowAdd(false);
      setItemSel(undefined);

    } catch (error) {
      toast.error("Erro ao salvar");
    }  
  }

  function onEditar(item: MagiaProps){
    setItemSel(item);
    setShowAdd(true);
  }

  async function onExcluir(id: string){
    try {
      const docRef = doc(db, "tb_magia", id);
      await deleteDoc(docRef);
      await refetch();       
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  async function onPreparar(id: string, situacao:boolean){
    try {
      if (id) {
        const docRef = doc(db, "tb_magia", id);
        await updateDoc(docRef, {
          mg_preparada: !situacao,          
        });
      }

      await refetch();       
      setShowAdd(false);
      setItemSel(undefined);

    } catch (error) {
      toast.error("Erro ao salvar");
    }  
  }
  
  return(
    <PageBase title="Magias">

      {personagem ? (
        <section className="flex w-full h-fit flex-col">

          <section className="flex w-full h-fit flex-col pt-2 pb-12">
        
            {/* topo */}
            <Card>
              <div className="flex w-full h-12">
                <section className="flex flex-col w-1/3 h-full justify-center items-center border-r">
                  <label className="flex text-[10px] w-full justify-center">Habilidade de Conjuração</label>
                  <strong className="text-sm"> { !personagem ? <Skeleton width={100}/>: personagem?.getHabilidadeConjuracao()}  </strong>
                </section>
                <section className="flex flex-col w-1/3 h-full justify-center items-center border-r">
                <label className="flex text-[10px] w-full justify-center">CD de Resistencia magia</label>
                  <strong className="text-sm">{ !personagem ? <Skeleton width={100}/>: personagem?.getCDMagia()}</strong>
                </section>
                <section className="flex flex-col w-1/3 h-full justify-center items-center">
                  <label className="flex text-[10px] w-full justify-center">Bônus de ataque de magia</label>
                  <strong className="text-sm">{ !personagem ? <Skeleton width={100}/>:personagem?.getBonusMagia()}</strong>
                </section>
              </div>
            </Card>

            {/* magias */}
            <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-2">

              {/* preparadas */}
              <section className="flex w-full h-fit flex-col pt-2 md:order-2">
                
                <div className="flex w-full gap-2 items-center">
                  <strong className="text-(--csecundary) whitespace-nowrap">Magias Preparadas</strong>
                  <div className="h-0.5 flex-1 bg-(--csecundary) rounded-lg"/>
                </div>

                <ul className="flex flex-col gap-1">
                  {
                    isLoading
                    ? <Skeleton height={150}/>
                    : isError 
                      ?<div>erro...</div>
                      : listaPrep.map((item)=>(
                          <CardMagiaItem key={item.mg_id} item={item} onEditar={onEditar} onExcluir={onExcluir} onPreparar={onPreparar}/>
                        ))
                  }    
                </ul>

              </section>

              {/* conhecidas */}
              <section className="flex w-full h-fit flex-col pt-2 md:order-1">
                
                <div className="flex w-full gap-2 items-center">
                  <strong className="text-(--csecundary) whitespace-nowrap">Magias Conhecidas</strong>
                  <div className="h-0.5 flex-1 bg-(--csecundary) rounded-lg"/>
                </div>

                <ul className="flex flex-col gap-1">
                  {
                    isLoading
                    ? <Skeleton height={150}/>
                    :data.map((item)=>(
                      <CardMagiaItem key={item.mg_id} item={item} isCategKnown onEditar={onEditar} onExcluir={onExcluir} onPreparar={onPreparar}/>
                  
                    ))
                  }
                
                </ul>
              </section>

            </div>            
            
          </section>

          {/* botao */}
          <Buttonadicionar onAdicionar={onAdicionar}/>

          {showAdd && <ModalMagiaAdd item={itemSel} onSalvar={onSalvar} onClose={()=>setShowAdd(false)} /> }
      
        </section>
        
      ) : <SemPersonagem/>}

    </PageBase>
  )
}