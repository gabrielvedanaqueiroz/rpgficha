import Link from "next/link";
import { memo } from "react";
import { BsFillBackpack2Fill} from "react-icons/bs";
import { GiMagicSwirl } from "react-icons/gi";
import { IoListCircleOutline } from "react-icons/io5";
import { LuDiamondPlus } from "react-icons/lu";

function FooterBar(){
  return(
    <footer id="router-footer" className="flex z-50 fixed md:hidden w-full bottom-0 bg-(--cprimary) h-12 p-2 text-(--csecundary) items-center justify-between gap-2">

      <Link href={'/personagens'}>
        <LuDiamondPlus size={32} title="personagens" className="transition-transform duration-150 active:scale-85"/> 
      </Link>

      <Link href={'/inventario'}>
        <BsFillBackpack2Fill size={30} title="inventário" className="transition-transform duration-150 active:scale-85"/>
      </Link>

      <Link href={'/'}  >
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
      </Link>

      <Link href={'/caracteristicas'}>
        <IoListCircleOutline size={32} title="caracteristicas" className="transition-transform duration-150 active:scale-85"/>
      </Link>  
          
      <Link href={'/magias'}>
        <GiMagicSwirl size={32} title="magias" className="transition-transform duration-150 active:scale-85" />
      </Link>
    </footer>
  )
}

export default memo(FooterBar);