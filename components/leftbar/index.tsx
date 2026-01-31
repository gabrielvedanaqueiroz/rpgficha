import Link from "next/link";
import { memo } from "react";
import { BsFillBackpack2Fill } from "react-icons/bs";
import { GiMagicSwirl } from "react-icons/gi";
import { IoListCircleOutline } from "react-icons/io5";
import { LuDiamondPlus } from "react-icons/lu";

{/* <Gi3dMeeple /> */}

function LeftBar(){

  return(
    <aside className="flex-col hidden md:block z-50 shrink-0 w-64 bg-(--cprimary) p-2 text-(--csecundary) items-center justify-between gap-2">
      
      <Link href={'/'} className="flex gap-1 items-center py-2">
        <div className="h-10 w-10 bg-(--csecundary) rounded-4xl flex justify-center items-center text-(--cprimary) transition-transform duration-150 active:scale-95">
          <div 
            about="ficha"
            className="w-8 h-8 bg-(--cprimary)"
            style={{
              mask: 'url(/res/personagem.svg) no-repeat center / contain',
              WebkitMask: 'url(/res/personagem.svg) no-repeat center / contain',
            }}
          />
        </div> 
        <strong>Ficha</strong>
      </Link>
      
      <Link href={'/inventario'} className="flex gap-1 items-center py-2">
        <BsFillBackpack2Fill size={30} title="inventário" className="w-10 transition-transform duration-150 active:scale-85"/>
        <strong>Inventário</strong>
      </Link>

      <Link href={'/caracteristicas'} className="flex gap-1 items-center py-2">
        <IoListCircleOutline size={32} title="caracteristicas" className="w-10 transition-transform duration-150 active:scale-85"/>
        <strong>Caracteristicas</strong>
      </Link>  
          
      <Link href={'/magias'} className="flex gap-1 items-center py-2">
        <GiMagicSwirl size={32} title="magias" className="w-10 transition-transform duration-150 active:scale-85" />
        <strong>Magias</strong>
      </Link>
      
      <Link href={'/personagens'} className="flex gap-1 items-center py-2 border-t">
        <LuDiamondPlus size={32} title="personagens" className="w-10 transition-transform duration-150 active:scale-85"/> 
        <strong>Personagens</strong>
      </Link>

    </aside>
  )
}

export default memo(LeftBar);