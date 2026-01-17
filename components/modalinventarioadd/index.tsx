"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventarioProps, inventarioSchema, InventarioType } from "@/classes/inventario";
import { FormInput } from "../forminput";
import { FormTextarea } from "../formtextarea";
import { useEffect } from "react";
import ModalBase from "../modalbase";

interface ModalInventarioAddProps{
  item?: InventarioProps,
  onSalvar: (item: InventarioProps)=>void,
  onClose:()=>void
}

export default function ModalInventarioAdd({item, onSalvar, onClose}:ModalInventarioAddProps){

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InventarioType>({
      resolver: zodResolver(inventarioSchema),
      defaultValues: {
        in_id :item?.in_id ?? "",
        in_nome: item?.in_nome ?? "",
        in_descricao: item?.in_descricao ?? "",
      }
  });

  useEffect(() => {
    if (item) {
      reset({
        in_id: item.in_id,
        in_nome: item.in_nome,
        in_descricao: item.in_descricao,
      });
    } else {
      reset({
        in_id: "",
        in_nome: "",
        in_descricao: "",
      });
    }
  }, [item, reset]);


  async function onSubmit(data: InventarioType) {
    onSalvar({
      in_id: data.in_id ?? "",
      in_descricao: data.in_descricao,
      in_nome: data.in_nome,
    });
  }

  return(
    <ModalBase title="Adicionar inventário">
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput<InventarioType>
          name="in_nome"
          label="Nome"
          register={register}
          error={errors.in_nome}
        />

        <FormTextarea<InventarioType>
          name="in_descricao"
          label="Descrição"
          register={register}
          error={errors.in_descricao}
        />
        
        <div className="flex gap-2 justify-end mt-2">
          <button className="border border-gray-300 px-2 py-1 rounded" 
          onClick={onClose}>
            Cancelar
          </button>
          
          <button type="submit" className="bg-orange-600 text-yellow-300 px-2 py-1 rounded">
            Salvar
          </button>
        </div>
      </form>
    </ModalBase>
  )
}