import { memo } from "react";
import Card from "../card";
import CardFlag from "../cardflag";
import Personagem from "@/classes/personagem";

interface CardFiHabilidadeProps{
  personagem: Personagem|null,
}

function CardFiHabilidade({personagem}: CardFiHabilidadeProps){

  function onFlag(aId: number, aAtrib: number, aMod: number|undefined, aDesc:String){
    return(
      <CardFlag>
        <div key={aId} className="flex flex-col text-(--cprimary) justify-center items-center p-2 text-[10px] w-16 h-16">
          <label className="text-sm border-b">{aMod}</label>
          <label>{aAtrib}</label>
          <label className="flex border-t w-full justify-center">{aDesc}</label>
        </div>
      </CardFlag>
    )
  }

  return(
    <Card>
      <section className="w-full grid grid-cols-3 grid-rows-2 gap-4 px-2 items-center justify-items-center">
        {onFlag(1, personagem?.pe_forca, personagem?.getModForca(), 'Força')}
        {onFlag(2, personagem?.pe_destreza, personagem?.getModDestreza(),  'Destreza')}
        {onFlag(3, personagem?.pe_constituicao, personagem?.getModConstituicao(), 'Constituição')}
        {onFlag(4, personagem?.pe_inteligencia, personagem?.getModInteligencia(), 'Inteligência')}
        {onFlag(5, personagem?.pe_sabedoria, personagem?.getModSabedoria(), 'Sabedoria')}
        {onFlag(6, personagem?.pe_carisma, personagem?.getModCarisma(), 'Carisma')}
      </section>
    </Card>
  )
}

export default memo(CardFiHabilidade);