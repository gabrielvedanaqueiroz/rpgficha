"use client";

import { InventarioProps } from "@/classes/inventario";
import CardInventarioItem from "@/components/cardinventarioitem";
import ModalInventarioAdd from "@/components/modalinventarioadd";
import PageBase from "@/components/pagebase";
import { useInventarioGet } from "@/hooks/inventario";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Inventario(){
    
  const [IdPersonagem, setIdPersonagem] = useState<string>(''); 

  const {data, isLoading, isError, refetch} = useInventarioGet(IdPersonagem);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [itemSel, setItemSel] = useState<InventarioProps>();
  
  useEffect(()=>{
    let id = localStorage.getItem('RF@personagemID') || '';
    setIdPersonagem(id);
  }, []);

  function onAdicionar(){
    setItemSel(undefined);
    setShowAdd(true);
  }

  async function onSalvar(item:InventarioProps) {
    try {
      if (item?.in_id) {
        const docRef = doc(db, "tb_inventario", item.in_id);
        await updateDoc(docRef, {
          in_nome: item.in_nome.trim(),
          in_descricao: item.in_descricao.trim(),
        });
      } else {
        await addDoc(collection(db, "tb_inventario"), {
          in_idpersonagem: IdPersonagem,
          in_nome: item.in_nome.trim(),
          in_descricao: item.in_descricao.trim(),
        });
      }

      await refetch();       
      setShowAdd(false);
      setItemSel(undefined);

    } catch (error) {
      toast.error("Erro ao salvar");
    }  
  }

  function onEditar(item: InventarioProps){
    setItemSel(item);
    setShowAdd(true);
  }

  async function onExcluir(id: string){
    try {
      const docRef = doc(db, "tb_inventario", id);
      await deleteDoc(docRef);
      await refetch();       
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  return(
    <PageBase title="Inventário">      

      <section className="flex w-full h-fit flex-col pt-2">
          
        <ul className="flex flex-col gap-1">
          {
            isLoading
            ? <Skeleton height={150}/>
            :  isError 
              ? 'erro...'
              : data.map((item)=>(
                <CardInventarioItem item={item} onEditar={onEditar} onExcluir={onExcluir}/>
              ))
          }
          
        </ul>

      </section>

      <section className="z-50 flex bottom-0 w-full pt-2 relative h-14">
        <button className="flex p-2 bg-orange-600 rounded-lg shadow-lg absolute right-0 text-amber-300"
        onClick={onAdicionar}>
          Adicionar
        </button>
      </section>

      {showAdd && <ModalInventarioAdd item={itemSel} onSalvar={onSalvar} onClose={()=>setShowAdd(false)} /> }
    </PageBase>
  )
}