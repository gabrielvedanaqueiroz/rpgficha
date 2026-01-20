"use client";

import { AnotacaoProps } from "@/classes/anotacao";
import CaracteristicaProps from "@/classes/caracteristica";
import CardCaAnotacaoItem from "@/components/cardcaanotacaoitem";
import CardCapericia from "@/components/cardcapericia";
import CardCaracteristicaItem from "@/components/cardcaracteristicaitem";
import ModallCaracteristicaAdd from "@/components/modalcaracteristicaadd";
import PageBase from "@/components/pagebase";
import { useAnotacaoGet } from "@/hooks/anotacao";
import { useCaracteristicaGet } from "@/hooks/caracteristica";
import { usePersonagemByIdGet } from "@/hooks/personagem";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SemPersonagem from "@/components/sempersonagem";

export default function Caracteristicas(){
  
  const [IdPersonagem, setIdPersonagem] = useState<string>(''); 

  const {data: personagem, isLoading: isLoadingPer, isError: isErrorPer}      = usePersonagemByIdGet(IdPersonagem);
  const {data: lstCaracteristica, isLoading: isLoadingCar, isError, refetch}  = useCaracteristicaGet(IdPersonagem);
  const {data: lstAnotacao, isLoading: isLoadingAno, isError: isErrorAno, refetch: refetchAno} = useAnotacaoGet(IdPersonagem);

  const [showAdd, setShowAdd]       = useState<boolean>(false);
  const [itemSelCar, setItemSelCar] = useState<CaracteristicaProps>();  
  const [tipoReg, setTipoReg]       = useState<number>(0);
  
  useEffect(()=>{
    let id = localStorage.getItem('RF@personagemID') || '';
    setIdPersonagem(id);
  }, []);

  function onAdicionar(){
    setItemSelCar(undefined);
    setShowAdd(true);
  }

  async function onSalvar(item: CaracteristicaProps, tipo: number){
    
    if(tipo === 2){
      try {
        if (item?.ca_id) {
          const docRef = doc(db, "tb_anotacao", item.ca_id);
          await updateDoc(docRef, {
            an_titulo: item.ca_nome.trim(),
            an_descricao: item.ca_descricao.trim(),
          });
        } else {
          await addDoc(collection(db, "tb_anotacao"), {
            an_idpersonagem: IdPersonagem,
            an_titulo: item.ca_nome.trim(),
            an_descricao: item.ca_descricao.trim(),
            an_data: serverTimestamp(),
          });
        }
  
        await refetchAno();       
        setShowAdd(false);
        setItemSelCar(undefined);
  
      } catch (error) {
        toast.error("Erro ao salvar");
      }  
        
    }
    else{ //caracteristica
      try {
        if (item?.ca_id) {
          const docRef = doc(db, "tb_caracteristica", item.ca_id);
          await updateDoc(docRef, {
            ca_nome: item.ca_nome.trim(),
            ca_descricao: item.ca_descricao.trim(),
          });
        } else {
          await addDoc(collection(db, "tb_caracteristica"), {
            ca_idpersonagem: IdPersonagem,
            ca_nome: item.ca_nome.trim(),
            ca_descricao: item.ca_descricao.trim(),
          });
        }
  
        await refetch();       
        setShowAdd(false);
        setItemSelCar(undefined);
  
      } catch (error) {
        toast.error("Erro ao salvar");
      }  
    }

  }

  function onEditarCar(item: CaracteristicaProps){
    setItemSelCar(item);
    setShowAdd(true);
    setTipoReg(1);
  }
  
  async function onExcluirCar(id: string){
    try {
      const docRef = doc(db, "tb_caracteristica", id);
      await deleteDoc(docRef);
      await refetch();       
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  function onEditarAno(item: AnotacaoProps){
    setItemSelCar({ca_id: item.an_id, ca_nome: item.an_titulo, ca_descricao: item.an_descricao});
    setShowAdd(true);
    setTipoReg(2);
  }

  async function onExcluirAno(id: string){
    try {
      const docRef = doc(db, "tb_anotacao", id);
      await deleteDoc(docRef);
      await refetchAno();       
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  return(
    <PageBase title="Características">      

     {personagem ? (
        <section className="flex w-full h-fit flex-col">
          {/* pericias */}
          <section className="flex w-full h-fit flex-col pt-2">
    
            <div className="flex w-full gap-2 items-center">
              <strong className="text-orange-600  whitespace-nowrap">Pericias</strong>
              <div className="h-0.5 flex-1 bg-amber-600 rounded-lg"/>
            </div>
              {
                isLoadingPer
                ? <Skeleton height={150}/>          
                : isErrorPer
                  ? 'erro'
                  : <CardCapericia personagem={personagem}/>
              }
          </section>

          {/* caracteristicas */}
          <section className="flex w-full h-fit flex-col pt-2">

            <div className="flex w-full gap-2 items-center">
              <strong className="text-orange-600  whitespace-nowrap">Características</strong>
              <div className="h-0.5 flex-1 bg-amber-600 rounded-lg"/>
            </div>
              
            <ul className="flex flex-col gap-1">
              {
                isLoadingCar
                ? <Skeleton height={150}/>
                : lstCaracteristica.map((item)=>(
                  <CardCaracteristicaItem key={item.ca_id} item={item} onEditar={onEditarCar} onExcluir={onExcluirCar}/>
                ))
              }
            </ul>

          </section>

          {/* anotacao */}
          <section className="flex w-full h-fit flex-col pt-2">

            <div className="flex w-full gap-2 items-center">
              <strong className="text-orange-600  whitespace-nowrap">Anotações</strong>
              <div className="h-0.5 flex-1 bg-amber-600 rounded-lg"/>
            </div>
              
            <ul className="flex flex-col gap-1">
              {
                isLoadingAno
                ? <Skeleton height={150}/>
                : lstAnotacao.map((item)=>(
                  <CardCaAnotacaoItem key={item.an_id} item={item} onEditar={onEditarAno} onExcluir={onExcluirAno}/>
                ))
              }
            </ul>

          </section>

          {/* botao */}
          <section className="z-50 flex bottom-0 w-full pt-2 relative h-14">
            <button className="flex p-2 bg-orange-600 rounded-lg shadow-lg absolute right-0 text-amber-300"
            onClick={onAdicionar}>
              Adicionar
            </button>
          </section>

          {showAdd && <ModallCaracteristicaAdd item={itemSelCar} tipoReg={tipoReg} onSalvar={onSalvar} onClose={()=>setShowAdd(false)} /> }
        </section>
        )  : <SemPersonagem/>
      }
      
    </PageBase>
  )
}