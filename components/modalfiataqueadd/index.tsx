"use client";

import { AtaqueProps, ataqueSchema, AtaqueType } from "@/classes/ataque";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput } from "../forminput";
import ModalBase from "../modalbase";

interface ModalFiAtaqueAddProps{
  onSalvar: (item: AtaqueProps)=>void,
  onClose:()=>void
}

export default function ModalFiAtaqueAdd({onSalvar, onClose}:ModalFiAtaqueAddProps){

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AtaqueType>({
      resolver: zodResolver(ataqueSchema)      
  });

  async function onSubmit(data: AtaqueType) {
    onSalvar({
      at_id: data.at_id ?? "",
      at_descricao: data.at_descricao,
      at_alcance: data.at_alcance,
      at_bonus: data.at_bonus ?? "",
      at_dano: data.at_dano,
      at_tipo: data.at_tipo,
    });
  }

  return(
    <ModalBase title="Adicionar ataque">
      <form className="flex flex-col w-full px-2 pb-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput<AtaqueType>
          name="at_descricao"
          label="Nome"
          register={register}
          error={errors.at_descricao}
        />

        <FormInput<AtaqueType>
          name="at_alcance"
          label="Alcance"
          register={register}
          error={errors.at_alcance}
        />

        <div className="flex gap-2">
          <FormInput<AtaqueType>
            name="at_bonus"
            label="Bônus"
            register={register}
            error={errors.at_bonus}
          />

          <FormInput<AtaqueType>
            name="at_dano"
            label="Dano"
            register={register}
            error={errors.at_dano}
          />
        </div>

        <FormInput<AtaqueType>
          name="at_tipo"
          label="Tipo"
          register={register}
          error={errors.at_tipo}
        />
        
        <div className="flex gap-2 justify-end">
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