import ModalBase from "../modalbase";
import { useState } from "react";

interface ModalCArmEditProps{
  ca: number,
  onClose:()=>void,
  onSalvar: (aValor: number)=>void;
}

export default function ModalCArmEdit({ca, onClose, onSalvar}: ModalCArmEditProps){

  const [novoValor, setNovoValor] = useState<number>(ca);

  function onSubmit(e: React.FormEvent) {
    
    e.preventDefault();
    if(!novoValor) return;

    onSalvar( novoValor ?? 0 );
    
  }

  return(
    <ModalBase title="Alterar Classe de Armadura" onClose={onClose}>

      <div className="flex flex-col w-full">
        <strong className="text-xl justify-end w-full flex">Atual: {ca}</strong>

        <div className="flex flex-col px-2 pb-4 gap-2 w-full">
    
          <label className="w-full">
            Classe de Armadura
          </label>

          <input
            type="number"
            placeholder=" "
            value={novoValor}
            onChange={(e)=>{setNovoValor( !e.target.value ? ca : Number(e.target.value))}}
            className={`peer w-full bg-transparent border-0 border-b-2
              ${!novoValor ? "border-red-500 focus:border-red-500 " : "border-gray-400 focus:border-blue-500 "}
              focus:outline-none transition-colors
            `}
          />

          {!novoValor && (
            <span className="text-xs text-red-500">
              Campo obrigatório
            </span>
          )}
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