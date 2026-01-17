import { jXPNivel } from "@/utils";
import ModalBase from "../modalbase";
import { useState } from "react";

interface ModalXPEditProps{
  xp: number,
  nivel: number,
  onClose:()=>void,
  onSalvar: (aValor: number)=>void;
}

export default function ModalXPEdit({xp, nivel, onClose, onSalvar}: ModalXPEditProps){

  let lxpnivel = jXPNivel[nivel].xp;
  const [novoValor, setNovoValor] = useState<number>(xp);
  const soma = xp + novoValor;
  const xplimite   = lxpnivel;
  const percentual = Math.min((soma / xplimite) * 100, 100);

  function onSubmit(e: React.FormEvent) {
    
    e.preventDefault();
    if(!soma) return;

    onSalvar( soma ?? 0 );

  }

  return(
    <ModalBase title="Alterar Experiência" onClose={onClose}>

      <div className="flex flex-col w-full">

        <div className="flex flex-col px-2 gap-2 w-full">
    
          <div className="flex text-lg justify-between">
            <label>Atual:</label>
            {nivel}
          </div>  

          <div className="flex pb-0.5 text-lg justify-between">
            <label>Próximo Nível:</label>
            <label>
              {nivel + 1}
              {/* <span>({percentual}%)</span> */}
            </label>
          </div>              

          {/* Barra */}
          <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-yellow-300 transition-all duration-300"
              style={{ width: `${percentual}%` }}
            />
            
          </div>

          <input
            type="number"
            placeholder=" "
            value={novoValor}
            onChange={(e)=>{setNovoValor( !e.target.value ? xp : Number(e.target.value))}}
            className="peer w-full bg-transparent border-0 border-b-2 min-h-9
            border-gray-400 focus:border-blue-500 mb-1.5 mt-1.5
              focus:outline-none transition-colors"/>

          <div className="flex text-lg justify-between">
            <label>Total Experiência = </label>
            {xp + novoValor}
          </div>  
          
        </div>

        <div className="flex gap-2 justify-end">
          <button className="border border-gray-300 px-2 py-1 rounded" 
          onClick={onClose}>
            Cancelar
          </button>
          
          <button type="submit" className="bg-orange-600 text-yellow-300 px-2 py-1 rounded" onClick={onSubmit}>
            Salvar
          </button>
        </div>

      </div>

    </ModalBase>

  )
}