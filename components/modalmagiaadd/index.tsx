"use client";

import { MagiaProps, magiaSchema, MagiaType } from "@/classes/magia";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../forminput";
import { FormTextarea } from "../formtextarea";
import {jMagias} from "@/utils"
import ModalBase from "../modalbase";
import ButtonsModal from "../buttonsmodal";

interface ModalMagiaAddProps{
  item?: MagiaProps,
  onSalvar: (item: MagiaProps)=>void,
  onClose:()=>void
}

type Magia = typeof jMagias[number];

export default function ModalMagiaAdd({item, onSalvar, onClose}:ModalMagiaAddProps){

  const items = jMagias;
  const [lstMagiasFiltradas, setlstMagiasFiltradas] = useState<Magia[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MagiaType>({
      resolver: zodResolver(magiaSchema),
      defaultValues: {
        mg_id: item?.mg_id ?? "",
        mg_nome:item?.mg_nome ?? "",
        mg_descricao: item?.mg_descricao ?? "",
        mg_alcance: item?.mg_alcance ?? "",
        mg_componentes: item?.mg_componentes ?? "",
        mg_dano: item?.mg_dano ?? "",
        mg_duracao: item?.mg_duracao ?? "",
        mg_nivel: item?.mg_nivel  ?? 0,
        mg_preparada: item?.mg_preparada ?? false,
        mg_tempoconjuracao: item?.mg_tempoconjuracao ?? "",
        mg_material: item?.mg_material ?? "",
        mg_ritual: item?.mg_ritual ?? false ,
        mg_concentracao: item?.mg_concentracao ?? false,
      }
  });

  useEffect(() => {
    if (item) {
      reset({
        mg_id: item?.mg_id,
        mg_nome:item?.mg_nome,
        mg_descricao: item?.mg_descricao,
        mg_alcance: item?.mg_alcance,
        mg_componentes: item?.mg_componentes,
        mg_dano: item?.mg_dano,
        mg_duracao: item?.mg_duracao,
        mg_nivel: item?.mg_nivel,
        mg_preparada: item?.mg_preparada,
        mg_tempoconjuracao: item?.mg_tempoconjuracao,
        mg_material: item?.mg_material,
        mg_ritual: item?.mg_ritual,
        mg_concentracao: item?.mg_concentracao,
      });

   
    } else {
      reset({
        mg_id: "",
        mg_nome: "",
        mg_descricao: "",
        mg_alcance: "",
        mg_componentes: "",
        mg_dano: "",
        mg_duracao: "",
        mg_nivel: 0,
        mg_preparada: false,
        mg_tempoconjuracao: "",
        mg_material: "",
        mg_ritual: false ,
        mg_concentracao: false,
      });
    }
  }, [item, reset]);

  const onFiltrarMagia = (aValue: string) => {
    const value = aValue;
    if (value.trim() === "") {
      setlstMagiasFiltradas([]);
    } else {
      setlstMagiasFiltradas(
        items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  async function onSubmit(data: MagiaType) {
    onSalvar(
      {
        mg_id: data?.mg_id ?? "",
        mg_nome:data?.mg_nome,
        mg_descricao: data?.mg_descricao,
        mg_alcance: data?.mg_alcance,
        mg_componentes: data?.mg_componentes ?? "",
        mg_dano: data?.mg_dano,
        mg_duracao: data?.mg_duracao,
        mg_nivel: data?.mg_nivel,
        mg_preparada: data?.mg_preparada ?? false,
        mg_tempoconjuracao: data?.mg_tempoconjuracao,
        mg_material: data?.mg_material,
        mg_ritual: data?.mg_ritual,
        mg_concentracao: data?.mg_concentracao ?? false,
      }
    );
  }

  return(
    <ModalBase title="Adicionar magia">
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-0.5 ">
          <label htmlFor={'mg_nome'} className="w-full">
            Nome
          </label>

          <div>
            <input className={`
              peer w-full bg-transparent border-0 border-b-2
              ${errors?.mg_nome ? "border-red-500 focus:border-red-500 " : "border-gray-400 focus:border-blue-500 "}
              focus:outline-none transition-colors
            `} {...register('mg_nome')} 
              onChange={(e)=>{
                  onFiltrarMagia(e.target.value);
              }} 
            />
            {lstMagiasFiltradas.length > 0 && (
              <ul className="border border-gray-300 shadow-lg h-36 overflow-auto rounded">
                {lstMagiasFiltradas.map((item) => (
                  <li className='flex flex-col p-2 border-b-2 border-gray-300'
                    key={item.name}
                    onClick={() => {
                      setValue('mg_nome', item.display_name);
                      setValue('mg_descricao', item.description);
                      setValue('mg_nivel', item.level);
                      setValue('mg_dano', '0');
                      setValue('mg_alcance', item.range);
                      setValue('mg_tempoconjuracao', item.cast_time);
                      setValue('mg_duracao', item.duration);
                      setValue('mg_componentes', item.components);
                      setValue('mg_concentracao', item.requires_concentration);
                      setValue('mg_ritual', item.is_ritual);
                      setValue('mg_material', item.material ?? "");
                      setlstMagiasFiltradas([]);
                    }}
                  >
                    <strong>{item.display_name}<br/></strong>
                    {item.cast_time}, {item.school}
          
                  </li>
                ))}
              </ul>
              
            )}
          </div>
          {errors?.mg_nome ? <span className="text-xs text-red-500">  {errors.mg_nome.message} </span>:<></>}
        </div>        

        <FormTextarea<MagiaType>
          name="mg_descricao"
          label="Descrição"
          register={register}
          error={errors.mg_descricao}
        />

        <div className="grid grid-cols-3 gap-2">
          <FormInput<MagiaType>
            name="mg_nivel"
            label="Nível"
            register={register}
            error={errors.mg_nivel}
          />

          <FormInput<MagiaType>
            name="mg_dano"
            label="Dano"
            register={register}
            error={errors.mg_dano}
          />

          <FormInput<MagiaType>
            name="mg_alcance"
            label="Alcance"
            register={register}
            error={errors.mg_alcance}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormInput<MagiaType>
            name="mg_tempoconjuracao"
            label="Tempo de Conjuração"
            register={register}
            error={errors.mg_tempoconjuracao}
          />

          <FormInput<MagiaType>
            name="mg_duracao"
            label="Duração"
            register={register}
            error={errors.mg_duracao}
          />

        </div>

        <div className="flex gap-2 h-full">
          <FormInput<MagiaType>
            name="mg_componentes"
            label="Componentes"
            register={register}
            error={errors.mg_componentes}
          />

          <div className="flex justify-baseline items-center gap-1 h-full w-fit">
            <input type="checkbox" {...register('mg_concentracao')}/>
            <label>Concentração</label>
          </div>

          <div className="flex justify-baseline items-center gap-1 h-full w-fit">
            <input type="checkbox" {...register('mg_ritual')}/>
            <label>Ritual</label>
          </div>

        </div>

        <FormInput<MagiaType>
          name="mg_material"
          label="Material"
          register={register}
          error={errors.mg_material}
        />

        <ButtonsModal onClose={onClose}/>         

      </form>
    </ModalBase>
  )
}