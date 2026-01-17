import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { BsFillBackpack2Fill, BsFire } from "react-icons/bs";
import { FaGhost } from "react-icons/fa";
import { GiMagicSwirl, GiSwordsEmblem } from "react-icons/gi";
import { IoListCircleOutline } from "react-icons/io5";
import { LuDiamondPlus } from "react-icons/lu";

function FooterBar(){
  return(
    <footer id="router-footer" className="z-50 fixed w-full bottom-0 flex bg-(--cprimary) h-12 p-2 text-orange-500 items-center justify-between gap-2">

      <Link href={'/personagens'}>
        <LuDiamondPlus size={32} title="personagens" className="transition-transform duration-150 active:scale-85"/> 
      </Link>

      <Link href={'/inventario'}>
        <BsFillBackpack2Fill size={30} title="equipamentos" className="transition-transform duration-150 active:scale-85"/>
      </Link>

      <Link href={'/'}  >
        <div className="h-10 w-10 bg-orange-600 rounded-4xl flex justify-center items-center text-yellow-300 transition-transform duration-150 active:scale-95">
          <Image src="/res/personagem.svg" alt="personagens" width={32} height={32}
        style={{ filter: 'invert(75%) sepia(100%) saturate(300%) hue-rotate(5deg' }}/>
    
        {/* <FaGhost size={28} /> */}
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