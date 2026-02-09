"use client";

import { memo } from "react";

interface ButtonAdicionarProps{
  onAdicionar:()=>void;
}

function ButtonAdicionar({onAdicionar}: ButtonAdicionarProps){

  return(
    <section className="z-50 flex bottom-12 right-2 w-full pt-2 fixed h-14 md:bottom-4">
      <button className="flex p-2 bg-(--csecundary) rounded-lg shadow-lg absolute right-0 text-white"
      onClick={onAdicionar}>
        Adicionar
      </button>
    </section>
  )
}

export default memo(ButtonAdicionar);

