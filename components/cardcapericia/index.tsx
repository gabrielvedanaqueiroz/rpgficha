import Personagem from "@/classes/personagem";
import { memo } from "react";
import CardCaPericiaItem from "../cardcapericiaitem";
import CardFlag from "../cardflag";

interface CardCaPericiaProps{
  personagem: Personagem|null
}

function CardCaPericia({personagem}: CardCaPericiaProps){

  function onFlag(aId: number, aAtrib: number, aMod: number|undefined){
    return(
      <CardFlag>
        <div key={aId} className="flex flex-col text-(--cprimary) justify-center items-center p-2 text-[10px] w-16 h-16">
          <label className="text-sm border-b">{aMod}</label>
          <label>{aAtrib}</label>
        </div>
      </CardFlag>
    )
  }
  
  function onItem(aId: string, aDesc:string, aValor: number, proficiente: boolean){
    return(
      <li key={aId} className="flex items-center justify-items-start gap-1 w-full">
        
        {
          proficiente 
          ? <div className="h-2 w-2 rounded-[50%] bg-black"/>
          : <div className="h-2 w-2 rounded-[50%] border"/>
        }
        
        <label className="w-40">{aDesc}</label>
        <label className="border-b w-5 text-center">{aValor}</label>
      </li>
    )
  }

  return(
        
      <ul className="flex flex-col gap-1">
        <CardCaPericiaItem id={0} title="Força" >
          <div className="flex w-4/5 border-r border-gray-300 p-2">
            <ul>
              {onItem('p1', 'Atletismo', personagem?.getProForca(personagem.pe_proatletismo), personagem?.pe_proatletismo)}
            </ul>
          </div>
          <div className="flex w-fit h-fit p-2">
            {onFlag(0, personagem?.pe_forca, personagem?.getModForca())}
          </div>
        </CardCaPericiaItem>

        <CardCaPericiaItem id={1} title="Destreza" >
          <div className="flex w-4/5 border-r border-gray-300 p-2 justify-start">
            <ul>
              {onItem('p2', 'Acrobacia', personagem?.getProDestreza(personagem.pe_proacrobacia), personagem?.pe_proacrobacia)}
              {onItem('p3', 'Furtividade', personagem?.getProDestreza(personagem.pe_profurtividade), personagem?.pe_profurtividade)}
              {onItem('p4', 'Prestidigitação', personagem?.getProDestreza(personagem.pe_proprestidigitacao), personagem?.pe_proprestidigitacao)}
            </ul>
          </div>
          <div className="flex w-fit h-fit p-2">
            {onFlag(0, personagem?.pe_destreza, personagem?.getModDestreza())}
          </div>
        </CardCaPericiaItem>

        <CardCaPericiaItem id={2} title="Inteligência" >
          <div className="flex w-4/5 border-r border-gray-300 p-2 justify-start">
            <ul>
              {onItem('p5', 'Arcanismo', personagem?.getProInteligencia(personagem.pe_proarcanismo), personagem?.pe_proarcanismo)}
              {onItem('p6', 'História', personagem?.getProInteligencia(personagem.pe_prohistoria), personagem?.pe_prohistoria)}
              {onItem('p7', 'Investigação', personagem?.getProInteligencia(personagem.pe_proinvestigacao), personagem?.pe_proinvestigacao)}
              {onItem('p8', 'Natureza', personagem?.getProInteligencia(personagem.pe_pronatureza), personagem?.pe_pronatureza)}
              {onItem('p9', 'Religião', personagem?.getProInteligencia(personagem.pe_proreligiao), personagem?.pe_proreligiao)}
            </ul>
          </div>
          <div className="flex w-fit h-fit p-2">
            {onFlag(0, personagem?.pe_inteligencia, personagem?.getModInteligencia())}
          </div>
        </CardCaPericiaItem>

        <CardCaPericiaItem id={3} title="Sabedoria" >
          <div className="flex w-4/5 border-r border-gray-300 p-2 justify-start">
            <ul>
              {onItem('p10', 'Intuição', personagem?.getProSabedoria(personagem.pe_prointuicao), personagem?.pe_prointuicao)}
              {onItem('p11', 'Lidar com animais', personagem?.getProSabedoria(personagem.pe_prolidaranimais), personagem?.pe_prolidaranimais)}
              {onItem('p12', 'Medicina', personagem?.getProSabedoria(personagem.pe_promedicina), personagem?.pe_promedicina)}
              {onItem('p13', 'Percepção', personagem?.getProSabedoria(personagem.pe_propercepcao), personagem?.pe_propercepcao)}
              {onItem('p14', 'Sobrevivência', personagem?.getProSabedoria(personagem.pe_prosobrevivencia), personagem?.pe_prosobrevivencia)}
            </ul>
          </div>
          <div className="flex w-fit h-fit p-2">
            {onFlag(0, personagem?.pe_sabedoria, personagem?.getModSabedoria())}
          </div>
        </CardCaPericiaItem>

        <CardCaPericiaItem id={4} title="Carisma" >
          <div className="flex w-4/5 border-r border-gray-300 p-2 justify-start">
            <ul>
              {onItem('p15', 'Atuação', personagem?.getProCarisma(personagem.pe_proatuacao), personagem?.pe_proatuacao)}
              {onItem('p16', 'Blefar', personagem?.getProCarisma(personagem.pe_problefar), personagem?.pe_problefar)}
              {onItem('p17', 'Intimidação', personagem?.getProCarisma(personagem.pe_prointimidacao), personagem?.pe_prointimidacao)}
              {onItem('p18', 'Persuasão', personagem?.getProCarisma(personagem.pe_propersusao), personagem?.pe_propersusao)}
              </ul>
          </div>
          <div className="flex w-fit h-fit p-2">
            {onFlag(0, personagem?.pe_carisma, personagem?.getModCarisma())}
          </div>
        </CardCaPericiaItem>
      </ul>

  )
}

export default memo(CardCaPericia);