"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../forminput";
import { FormTextarea } from "../formtextarea";
import { useEffect, useState } from "react";
import CaracteristicaProps, { caracteristicaSchema, CaracteristicaType } from "@/classes/caracteristica";
import ModalBase from "../modalbase";

interface ModalCaracteristicaAddProps{
  item?: CaracteristicaProps,
  tipoReg: number,
  onSalvar: (item: CaracteristicaProps, tipo: number)=>void,
  onClose:()=>void
}

export default function ModallCaracteristicaAdd({item, tipoReg, onSalvar, onClose}:ModalCaracteristicaAddProps){

  const [tipo, setTipo] =useState<number>(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CaracteristicaType>({
      resolver: zodResolver(caracteristicaSchema),
      defaultValues: {
        ca_id :item?.ca_id ?? "",
        ca_nome: item?.ca_nome ?? "",
        ca_descricao: item?.ca_descricao ?? "",
      }
  });

  useEffect(() => {
    if (item) {
      reset({
        ca_id: item.ca_id,
        ca_nome: item.ca_nome,
        ca_descricao: item.ca_descricao,
      });

      setTipo(tipoReg);
    } else {
      reset({
        ca_id: "",
        ca_nome: "",
        ca_descricao: "",
      });

      setTipo(1);
    }
  }, [item, reset]);

  async function onSubmit(data: CaracteristicaType) {
    onSalvar(
      {
        ca_id: data.ca_id ?? "",
        ca_descricao: data.ca_descricao,
        ca_nome: data.ca_nome,
      },
      tipo
    );
  }

  return(
    <ModalBase title="Adicionar caracteristica">
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>

        <FormInput<CaracteristicaType>
          name="ca_nome"
          label="Nome"
          register={register}
          error={errors.ca_nome}
        />

        <FormTextarea<CaracteristicaType>
          name="ca_descricao"
          label="Descrição"
          register={register}
          error={errors.ca_descricao}
        />

        <div className="flex flex-col w-full mb-4 border-b-2 border-gray-400">
          <label>Tipo</label>
          
          <select value={tipo} onChange={(e)=>{setTipo(Number(e.target.value))}}>
            <option value={1} >Caracteristica</option>
            <option value={2}>Anotação</option>
          </select>
        </div>
        
        <div className="flex gap-2 justify-end  mt-2">
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