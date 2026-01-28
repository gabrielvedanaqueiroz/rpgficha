"use client";

import PageBase from "@/components/pagebase";
import { db } from "@/services/firebaseConnection";
import { ocultarBarras } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import z from "zod";

const atributosSchema = z.object({
  pe_forca: z.coerce.number().min(1, "Força obrigatória"),
  pe_destreza: z.coerce.number().min(1, "Destreza obrigatória"),
  pe_constituicao: z.coerce.number().min(1, "Constituição obrigatória"),
  pe_inteligencia: z.coerce.number().min(1, "Inteligência obrigatória"),
  pe_sabedoria: z.coerce.number().min(1, "Sabedoria obrigatória"),
  pe_carisma: z.coerce.number().min(1, "Carisma obrigatória"),  
});

interface personagemCriadoProps{
  id: string | '',
  vidaNv1: number | 0,
  CABase: number | 0,
}

export type AtributosType = z.infer<typeof atributosSchema>;

export default function CriacaoAtributos(){

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({
      resolver: zodResolver(atributosSchema)      
  });

  const router = useRouter();
  const [modForca, setModForca]               = useState<number>(0);
  const [modDestreza, setModDestreza]         = useState<number>(0);
  const [modCostituicao, setModCostituicao]   = useState<number>(0);
  const [modInteligencia, setModInteligencia] = useState<number>(0);
  const [modSabedoria, setModSabedoria]       = useState<number>(0);
  const [modCarisma, setModCarisma]           = useState<number>(0);
  const [personagemCriado, setPersonagemCriado] = useState<personagemCriadoProps>();

  function onModificador(aValor:number){
    let modificador = (aValor - 10) / 2;
    return Math.floor(modificador);
  }

  function onChangeForca(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModForca( onModificador(valor));
  }

  function onChangeDestreza(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModDestreza( onModificador(valor));
  }

  function onChangeCostituicao(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModCostituicao( onModificador(valor));
  }

  function onChangeInteligencia(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModInteligencia( onModificador(valor));
  }

  function onChangeSabedoria(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModSabedoria( onModificador(valor));
  }

  function onChangeCarisma(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = Number(e.target.value); 
    setModCarisma( onModificador(valor));
  }

  async function onSubmit(data: AtributosType) {

    if(personagemCriado){
      const docRef = doc(db, "tb_personagem", personagemCriado?.id);
      await updateDoc(docRef, {
          pe_forca: data.pe_forca,
          pe_destreza: data.pe_destreza,
          pe_constituicao: data.pe_constituicao,
          pe_inteligencia: data.pe_inteligencia,
          pe_sabedoria: data.pe_sabedoria,
          pe_carisma: data.pe_carisma,
          pe_vidabase: (personagemCriado?.vidaNv1  + modCostituicao),
          pe_vidaatual: (personagemCriado?.vidaNv1 + modCostituicao),
          pe_vidatemp: 0,
          pe_vidadadousado: 0,
          pe_cabase: (personagemCriado?.CABase  + modCostituicao),
          pe_catotal: (personagemCriado?.CABase  + modCostituicao),
        }
      )
      .then(()=>{
        router.replace('/personagens/criacao/pericias');
      })
      .catch((error)=>{
        console.log('Erro ao editar: '+error);
        toast.error('Erro ao editar');
      });
    }    

  }

  useEffect(()=>{
    ocultarBarras();

    const data = localStorage.getItem("RF@personagem-criado");
    if(data)
      setPersonagemCriado(JSON.parse(data));

  }, []);

  return(
    <PageBase title="Criação de Personagem">
      <form className="flex flex-col gap-2 pt-2" onSubmit={handleSubmit(onSubmit)}>
        <label>Definindo seus atributos</label>
        
        <div className="flex flex-col gap-1 mb-2" >
        
          <div className="flex bg-white rounded-t-lg shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_forca? 'text-red-500': 'text-black'}`}>Força</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_forca")} 
              onChange={onChangeForca}
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_forca ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modForca}</label>
            </div>
            
            {errors.pe_forca? <span className="text-xs text-red-500">{errors.pe_forca.message}</span>:<></>}
          </div>

          <div className="flex bg-white shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_destreza? 'text-red-500': 'text-black'}`}>Destreza</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_destreza")} 
              onChange={onChangeDestreza}
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_destreza ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modDestreza}</label>
            </div>
            
            {errors.pe_destreza? <span className="text-xs text-red-500">{errors.pe_destreza.message}</span>:<></>}
          </div>

          <div className="flex bg-white shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_constituicao? 'text-red-500': 'text-black'}`}>Constituição</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_constituicao")} 
              onChange={onChangeCostituicao}
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_constituicao ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modCostituicao}</label>
            </div>
            
            {errors.pe_constituicao? <span className="text-xs text-red-500">{errors.pe_constituicao.message}</span>:<></>}
          </div>

          <div className="flex bg-white  shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_inteligencia? 'text-red-500': 'text-black'}`}>Inteligência</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_inteligencia")} 
              onChange={onChangeInteligencia}
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_inteligencia ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modInteligencia}</label>
            </div>
            
            {errors.pe_inteligencia? <span className="text-xs text-red-500">{errors.pe_inteligencia.message}</span>:<></>}
          </div>

          <div className="flex bg-white shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_sabedoria? 'text-red-500': 'text-black'}`}>Sabedoria</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_sabedoria")} 
              onChange={onChangeSabedoria}              
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_sabedoria ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modSabedoria}</label>
            </div>
            
            {errors.pe_sabedoria? <span className="text-xs text-red-500">{errors.pe_sabedoria.message}</span>:<></>}
          </div>

          <div className="flex bg-white rounded-b-lg shadow-md p-3 w-full flex-col">
            <label className={`${errors.pe_carisma? 'text-red-500': 'text-black'}`}>Carisma</label>
            
            <div className="flex "> 
              
              <input  
              type="number"  
              {...register("pe_carisma")} 
              onChange={onChangeCarisma}
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_carisma ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              />
              
              <label className="flex text-lg w-6 border-l ml-2 text-center justify-center items-center">{modCarisma}</label>
            </div>
            
            {errors.pe_carisma? <span className="text-xs text-red-500">{errors.pe_carisma.message}</span>:<></>}
          </div>
        </div>      
        
        <button type="submit" className="bg-(--cprimary) px-3 py-2 rounded shadow text-white">
          <label className="flex justify-center items-center">
            Avançar 
            <MdKeyboardDoubleArrowRight size={18}/> 
          </label>
        </button>

      </form>
    </PageBase>
  )
}