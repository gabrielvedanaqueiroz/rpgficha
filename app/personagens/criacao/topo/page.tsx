"use client";

import PageBase from "@/components/pagebase";
import { db } from "@/services/firebaseConnection";
import { jClasses, jRacas, ocultarBarras } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import z from "zod";

const topoSchema = z.object({

  pe_nome: z.string().min(5, "Nome obrigatório, mínimo 5 caracteres"),
  pe_idraca: z.coerce
    .number()
    .min(1, "Raça obrigatória"),
  pe_subraca: z.string()
    .min(1, "Sub-raça obrigatória"),
  pe_idclasse: z.coerce
    .number()
    .min(1, "Classe obrigatória"),
  pe_antecedente: z.string().min(1, "Antecedente obrigatório"),
  pe_alinhamento: z.string().min(1, "Alinhamento obrigatório"),
});

export type TopoType = z.infer<typeof topoSchema>;

type Classe = {
  cl_id: number;
  cl_idhabilidadeconjuracao: number;
  cl_descricao: string;
  cl_dado_vida: string;
  cl_vida_nivel_1: number;
  cl_cabase: number;
  cl_sub: string[];
};

type Raca = {
  rc_id: number;
  rc_descricao: string;
  rc_movimento : number;
  rc_sub: string[];  
}

export default function CriacaoTopo(){

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({
      resolver: zodResolver(topoSchema)      
  });

  const router = useRouter();
  const [listaRaca, setListaRaca]           = useState<Raca[]>([]);
  const [listaSubRaca, setListaSubRaca]     = useState<string[]>([]);
  const [listaClasses, setListaClasse]      = useState<Classe[]>([]);

  const [movimento, setMovimento]           = useState<number>(0);
  const [raca, setRaca]                     = useState<string>('');
  const [classe, setClasse]                 = useState<string>('');
  const [dadoVida, setDadoVida]             = useState<string>('');
  const [vidaNv1, setVidaNv1]               = useState<number>(0);
  const [CABase, setCABase]                 = useState<number>(0);
  const [idhabilidadeconjuracao, setIdHabilidadeConjuracao]  = useState<number>(0);

  async function onSubmit(data: TopoType) {

    await addDoc(collection(db, 'tb_personagem'),{
      pe_idjogador      : String(process.env.NEXT_PUBLIC_IDJOGADOR),
      pe_idclasse       : data.pe_idclasse,
      pe_idraca         : data.pe_idraca,
      pe_subraca        : data.pe_subraca.trim(),
      pe_nome           : data.pe_nome.trim(),
      pe_antecedente    : data.pe_antecedente.trim(),
      pe_tendencia      : data.pe_alinhamento.trim(),
      pe_raca           : raca.trim(),
      pe_classe         : classe.trim(),
      pe_bproficiencia  : 2,
      pe_experiencia    : 0,
      pe_nivel          : 1,
      pe_vidadado       : dadoVida,
      pe_movimento      : movimento,
      pe_ativo          : false,
      pe_idhabilidadeconjuracao : idhabilidadeconjuracao,
    })
    .then( (docRef) =>{

      let personagemCriado = {
        id: docRef.id,
        vidaNv1: vidaNv1,
        CABase: CABase,
        idraca:  data.pe_idraca,
        idclasse: data.pe_idclasse,
        idhabilidadeconjuracao: idhabilidadeconjuracao,        
      };

      localStorage.setItem('RF@personagem-criado', JSON.stringify(personagemCriado));
      router.replace('/personagens/criacao/atributos')
    })
    .catch((error)=>{
      console.log('Erro ao inserir; '+error);
      toast.error('Erro ao inserir');
    });

  }

  useEffect(()=>{
    ocultarBarras();
    setListaClasse(jClasses);
    setListaRaca(jRacas);
  }, []);

  function onSelecionarRaca(e: React.ChangeEvent<HTMLSelectElement>){
    setListaSubRaca([]);

    const raca = jRacas.find((r) => r.rc_id === Number(e.target.value));
    setListaSubRaca(raca ? raca.rc_sub : []);
    
    setRaca(raca?.rc_descricao || '');

    if(raca){
      setMovimento(raca.rc_movimento);
    }    
  }

  function onSelecionarClasse(e: React.ChangeEvent<HTMLSelectElement>) {
    
    const classe = jClasses.find((c) => c.cl_id === Number(e.target.value));
    
    setClasse(classe?.cl_descricao || '');
    setDadoVida(classe?.cl_dado_vida || 'd6');
    setVidaNv1(classe?.cl_vida_nivel_1 || 6);
    setCABase(classe?.cl_cabase || 8);
    setIdHabilidadeConjuracao(classe?.cl_idhabilidadeconjuracao || 0);
  }

  return(
    <PageBase title="Criação de Personagem">
      <form className="flex flex-col gap-2 pt-2" onSubmit={handleSubmit(onSubmit)}>
        <label>Vamos a criação</label>

        <div className="flex flex-col gap-1 mb-2" >
          
          <div className="flex bg-white rounded-t-lg shadow-md p-3 w-full flex-col mb-1">
            <input  
              className={`
                flex w-full bg-transparent focus:outline-none transition-colors 
                ${errors.pe_nome ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
              placeholder="Nome do persoangem" 
              {...register("pe_nome")} />
            {errors.pe_nome? <span className="text-xs text-red-500">{errors.pe_nome.message}</span>:<></>}
          </div>

          <div className="flex flex-col gap-1 w-full mb-1">
            
            <div className="flex bg-white rounded-t-lg shadow-md p-3 w-full flex-col">
              <select className="w-full" {...register("pe_idraca")} onChange={onSelecionarRaca} >
                <option key={0} className="w-full" value={0}>Raça</option>
                {listaRaca?.map((item)=>(
                  <option key={item.rc_id} value={item.rc_id}>{item.rc_descricao}</option>
                ))}
              </select>
              {errors.pe_idraca? <span className="text-xs text-red-500">{errors.pe_idraca.message}</span>:<></>}
            </div>
            
            <div className="flex bg-white rounded-b-lg shadow-md p-3 w-full flex-col">
              <select className="w-full" {...register("pe_subraca")} >
                <option key={0} value={""} className="w-full">Sub-raca</option>
                {listaSubRaca.map((item, index)=>(
                  <option key={Number(index)} value={item}>{item}</option>
                ))}
              </select>
              {errors.pe_subraca? <span className="text-xs text-red-500">{errors.pe_subraca.message}</span>:<></>}
            </div>
          </div>

          <div className="flex bg-white rounded-lg shadow-md p-3 w-full  mb-1 flex-col">
            <select className="w-full" {...register("pe_idclasse")} onChange={onSelecionarClasse}>
              <option key={0} value={0} className="w-full">Classe</option>
              {listaClasses.map((item)=>(
                <option key={item.cl_id} value={item.cl_id}>{item.cl_descricao}</option>
              ))}
            </select>
            {errors.pe_idclasse? <span className="text-xs text-red-500">{errors.pe_idclasse.message}</span>:<></>}
          </div>

          <div className="flex flex-col gap-1 w-full">
            
            <div className="flex bg-white rounded-t-lg shadow-md p-3 w-full flex-col">
              <input 
                className={`
                  flex w-full bg-transparent focus:outline-none transition-colors 
                  ${errors.pe_antecedente ? "border-b-2 border-red-500 focus:border-red-500 " : "focus:border-b-2 border-gray-400 focus:border-blue-500 "}`} 
                type="text" 
                placeholder="Antecedente" 
                {...register("pe_antecedente")} 
              />
              {errors.pe_antecedente? <span className="text-xs text-red-500">{errors.pe_antecedente.message}</span>:<></>}
            </div>

            <div className="flex bg-white rounded-b-lg shadow-md p-3 w-full  flex-col">
              <select className="w-full" {...register("pe_alinhamento")} >
                <option value="">Alinhamento</option>
                <option value="Leal e Bom">Leal e Bom</option>
                <option value="Neutro e Bom">Neutro e Bom</option>
                <option value="Caótico e Bom">Caótico e Bom</option>
                <option value="Leal e Neutro">Leal e Neutro</option>
                <option value="Neutro Puro">Neutro Puro</option>
                <option value="Caótico e Neutro">Caótico e Neutro</option>
                <option value="Leal e Mau">Leal e Mau</option>
                <option value="Neutro e Mau">Neutro e Mau</option>
                <option value="Caótico e Mau">Caótico e Mau</option>
              </select>
              {errors.pe_alinhamento? <span className="text-xs text-red-500">{errors.pe_alinhamento.message}</span>:<></>}
            </div>
          </div>
        </div>
        

        <button type="submit" className="bg-(--cprimary) px-3 py-2 rounded shadow  text-white">
          <label className="flex justify-center items-center">
            Avançar 
            <MdKeyboardDoubleArrowRight size={18}/> 
          </label>
        </button>

      </form>
    </PageBase>
  )
}