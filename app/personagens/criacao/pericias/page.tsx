"use client";

import PageBase from "@/components/pagebase";
import { db } from "@/services/firebaseConnection";
import { exibirBarras, jClasses, ocultarBarras } from "@/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

type Classe = {
  cl_id: number;
  cl_sginicial: number[];
  cl_proqnt: number;
  cl_proinicial: number[];
};

interface personagemCriadoProps{
  id: string | '',
}

export default function CriacaoPericias(){

  const router = useRouter();

  const [Classe, setClasse] = useState<Classe>();
  
  const [proacrobacia, setProAcrobacia]               = useState<boolean>(false);
  const [proarcanismo, setProArcanismo]               = useState<boolean>(false);
  const [proatletismo, setProAtletismo]               = useState<boolean>(false);
  const [proatuacao, setProAtuacao]                   = useState<boolean>(false);
  const [problefar, setProBlefar]                     = useState<boolean>(false);
  const [profurtividade, setProFurtividade]           = useState<boolean>(false);
  const [prohistoria, setProHistoria]                 = useState<boolean>(false);
  const [prointimidacao, setProIntimidacao]           = useState<boolean>(false);
  const [prointuicao, setProIntuicao]                 = useState<boolean>(false);
  const [proinvestigacao, setProInvestigacao]         = useState<boolean>(false);
  const [prolidaranimais, setProLidarAnimais]         = useState<boolean>(false);
  const [promedicina, setProMedicina]                 = useState<boolean>(false);
  const [pronatureza, setPronatureza]                 = useState<boolean>(false);
  const [propersusao, setProPersuasao]                = useState<boolean>(false);
  const [proprestidigitacao, setProPrestidigitacao]   = useState<boolean>(false);
  const [propercepcao, setProPercepcao]               = useState<boolean>(false);
  const [proreligiao, setProReligiao]                 = useState<boolean>(false);
  const [prosobrevivencia, setProSobrevivencia]       = useState<boolean>(false);

  const [visacrobacia, setVisAcrobacia]             = useState<boolean>(false);
  const [visarcanismo, setVisArcanismo]             = useState<boolean>(false);
  const [visatletismo, setVisAtletismo]             = useState<boolean>(false);
  const [visatuacao, setVisAtuacao]                 = useState<boolean>(false);
  const [visblefar, setVisBlefar]                   = useState<boolean>(false);
  const [visfurtividade, setVisFurtividade]         = useState<boolean>(false);
  const [vishistoria, setVisHistoria]               = useState<boolean>(false);
  const [visintimidacao, setVisIntimidacao]         = useState<boolean>(false);
  const [visintuicao, setVisIntuicao]               = useState<boolean>(false);
  const [visinvestigacao, setVisInvestigacao]       = useState<boolean>(false);
  const [vislidaranimais, setVislidarAnimais]       = useState<boolean>(false);
  const [vismedicina, setVisMedicina]               = useState<boolean>(false);
  const [visnatureza, setVisNatureza]               = useState<boolean>(false);
  const [vispersusao, setVisPersuasao]              = useState<boolean>(false);
  const [visprestidigitacao, setVisPrestidigitacao] = useState<boolean>(false);
  const [vispercepcao, setVisPercepcao]             = useState<boolean>(false);
  const [visreligiao, setVisReligicao]              = useState<boolean>(false);
  const [vissobrevivencia, setVisSobrevivencia]     = useState<boolean>(false);

  const [sgforca, setSGForca]                 = useState<boolean>(false);
  const [sgdestreza, setSGDestreza]           = useState<boolean>(false);
  const [sgconstituicao, setSGConstituicao]   = useState<boolean>(false);
  const [sginteligencia, setSGInteligecia]    = useState<boolean>(false);
  const [sgsabedoria, setSGSabedoria]         = useState<boolean>(false);
  const [sgcarisma, setSGCarisma]             = useState<boolean>(false);
  
  const [personagemCriado, setPersonagemCriado] = useState<personagemCriadoProps>();
  const [qntPericia, setQntPericia] = useState<number>(0);
  
  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let validoQnt = false;
    
    validoQnt = qntPericia === Classe?.cl_proqnt;

    if(validoQnt){

      if(personagemCriado){

        const docRef = doc(db, "tb_personagem", personagemCriado?.id);
        await updateDoc(docRef, {
            pe_proacrobacia: Boolean(proacrobacia),
            pe_proarcanismo: Boolean(proarcanismo),
            pe_proatletismo: Boolean(proatletismo),
            pe_proatuacao: Boolean(proatuacao),
            pe_problefar: Boolean(problefar),
            pe_profurtividade: Boolean(profurtividade),
            pe_prohistoria: Boolean(prohistoria),
            pe_prointimidacao: Boolean(prointimidacao),
            pe_prointuicao: Boolean(prointuicao),
            pe_proinvestigacao: Boolean(proinvestigacao),
            pe_prolidaranimais: Boolean(prolidaranimais),
            pe_promedicina: Boolean(promedicina),
            pe_pronatureza: Boolean(pronatureza),
            pe_proprestidigitacao: Boolean(proprestidigitacao),
            pe_propercepcao:Boolean(propercepcao),
            pe_proreligiao: Boolean(proreligiao),
            pe_prosobrevivencia: Boolean(prosobrevivencia),
            pe_propersusao: Boolean(propersusao),
            pe_sgforca: Boolean(sgforca),
            pe_sgdestreza: Boolean(sgdestreza),
            pe_sgconstituicao: Boolean(sgconstituicao),
            pe_sginteligencia: Boolean(sginteligencia),
            pe_sgsabedoria: Boolean(sgsabedoria),
            pe_sgcarisma: Boolean(sgcarisma),
        })
        .then( () =>{
          localStorage.setItem('RF@personagem-criado', JSON.stringify({}));
          router.replace('/personagens');
          exibirBarras();
        })
        .catch((error)=>{
          console.log('Erro ao inserir; '+error);
          toast.error('Erro ao inserir');
        });
      }
    }
    else
      toast.error('Erro na quantidade de pericias selecionadas');
  }

  function setPericiaEscolha(aCheck: boolean){
    let qnt = 0;
    if(aCheck)
      qnt = qntPericia + 1;
    else  
      qnt = qntPericia - 1;

    setQntPericia(qnt);
  }

  useEffect(()=>{
    ocultarBarras();

    let LClasse = jClasses.find((c) => c.cl_id === 1);
    setClasse(LClasse);

    LClasse?.cl_proinicial.map((num, index)=>{
      switch (num) {
        case 1: setVisAcrobacia(true); break;
        case 2: setVisArcanismo(true); break;
        case 3: setVisAtletismo(true); break;
        case 4: setVisAtuacao(true); break;
        case 5: setVisBlefar(true); break;
        case 6: setVisFurtividade(true); break;
        case 7: setVisHistoria(true); break;
        case 8: setVisIntimidacao(true); break;
        case 9: setVisIntuicao(true); break;
        case 10: setVisInvestigacao(true); break;
        case 11: setVislidarAnimais(true); break;
        case 12: setVisMedicina(true); break;
        case 13: setVisNatureza(true); break;
        case 14: setVisPercepcao(true); break;
        case 15: setVisPersuasao(true); break;
        case 16: setVisPrestidigitacao(true); break;
        case 17: setVisReligicao(true); break;
        case 18: setVisSobrevivencia(true); break;
      }
    });

    LClasse?.cl_sginicial.map((num, index)=>{
      switch (num) {
        case 1: setSGForca(true);break;
        case 2: setSGDestreza(true);break;
        case 3: setSGConstituicao(true);break;
        case 4: setSGInteligecia(true);break;
        case 5: setSGSabedoria(true);break;
        case 6: setSGCarisma(true);break;
      }
    });

    const data = localStorage.getItem("RF@personagem-criado");
    if(data)
      setPersonagemCriado(JSON.parse(data));

  }, []);

  return(
    <PageBase title="Criação de Personagem">
      <form className="flex flex-col gap-2 pt-2" >
        <label>Escolha suas pericias</label>
        
        <div className="flex flex-col gap-2 mb-2" >
          <label>Selecione {Classe?.cl_proqnt} dentre elas ({qntPericia})</label>
          <ul>
            <li className={`flex gap-1 ${visacrobacia ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProAcrobacia(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Acrobacia <label className="text-sm">(Destreza)</label></label>
            </li>

            <li className={`flex gap-1 ${visarcanismo ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProArcanismo(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Arcanismo <label className="text-sm">(Inteligência)</label></label>
            </li>

            <li className={`flex gap-1 ${visatletismo ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProAtletismo(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Atletismo <label className="text-sm">(Força)</label></label>
            </li>

            <li className={`flex gap-1 ${visatuacao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProAtuacao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Atuação <label className="text-sm">(Carisma)</label></label>
            </li>

            <li className={`flex gap-1 ${visblefar ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProBlefar(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Blefar <label className="text-sm">(Carisma)</label></label>
            </li>

            <li className={`flex gap-1 ${visfurtividade ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProFurtividade(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Furtividade <label className="text-sm">(Destreza)</label></label>
            </li>

            <li className={`flex gap-1 ${vishistoria ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProHistoria(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Hitstória <label className="text-sm">(Inteligência)</label></label>
            </li>

            <li className={`flex gap-1 ${visintimidacao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProIntimidacao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Imtimidação <label className="text-sm">(Carisma)</label></label>
            </li>

            <li className={`flex gap-1 ${visintuicao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProIntuicao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Intuição <label className="text-sm">(Sabedoria)</label></label>
            </li>

            <li className={`flex gap-1 ${visinvestigacao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProInvestigacao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Investigação <label className="text-sm">(Inteligência)</label></label>
            </li>

            <li className={`flex gap-1 ${vislidaranimais ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProLidarAnimais(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Lidar com Animais <label className="text-sm">(Sabedoria)</label></label>
            </li>

            <li className={`flex gap-1 ${vismedicina ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProMedicina(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Medicina <label className="text-sm">(Sabedoria)</label></label>
            </li>

            <li className={`flex gap-1 ${visnatureza ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setPronatureza(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Natureza <label className="text-sm">(Inteligência)</label></label>
            </li>

            <li className={`flex gap-1 ${vispercepcao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProPercepcao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Percepção <label className="text-sm">(Sabedoria)</label></label>
            </li>

            <li className={`flex gap-1 ${vispersusao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProPersuasao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Persuasão <label className="text-sm">(Carisma)</label></label>
            </li>

            <li className={`flex gap-1 ${visprestidigitacao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProPrestidigitacao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Prestidigitação <label className="text-sm">(Destreza)</label></label>
            </li>

            <li className={`flex gap-1 ${visreligiao ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProReligiao(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Religião <label className="text-sm">(Inteligência)</label></label>
            </li>

            <li className={`flex gap-1 ${vissobrevivencia ? "block" : "hidden"}`}>
              <input type="checkbox" onChange={(e)=>{
                setProSobrevivencia(e.target.checked);
                setPericiaEscolha(e.target.checked);
              }}/>
              <label>Sobrevivência <label className="text-sm">(Sabedoria)</label></label>
            </li>
          </ul>
          
        </div>      
        
        <button type="submit" className="bg-yellow-300 px-3 py-2 rounded shadow" 
        onClick={onSubmit}>
          <label className="flex justify-center items-center">
            Concluir 
            <MdKeyboardDoubleArrowRight size={18}/> 
          </label>
        </button>

      </form>
    </PageBase>
  )
}