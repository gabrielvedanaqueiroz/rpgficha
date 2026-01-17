"use client";

import { AuthContext } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaDiceD20, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Registar(){

  const [exibirSenha, setExibirSenha] = useState<boolean>(false);

  const [email, setEmail]     = useState<string>('');
  const [senha, setSenha]     = useState<string>('');
  const [nome, setNome]       = useState<string>('');

  const {onCriarUsuario}      = useContext(AuthContext);
  const router = useRouter();

  async function onLogin(e: React.MouseEvent<HTMLButtonElement>) {

    e.preventDefault();
    
    let lemail  = email;
    let lsenha  = senha;
    let lnome   = nome;
        
    if((lemail.trim() !== '') && (lsenha.trim() !== '') &&(lnome.trim() !== '')){
      await onCriarUsuario(lemail, lsenha, lnome)
        .then(()=>{         
            router.back();
            return true;
        })
        .catch((error)=>{
          toast.error('Erro ao registar');
          console.log(error);
          return false;
        });        
    }
    else
      toast.error('Preencha todos os campos'); 

  }

  return(
    <main className="flex flex-col justify-center items-center bg-gray-300 h-screen gap-2 p-12 md:p-96">
      <div className="w-full flex justify-center items-center gap-2">
        <FaDiceD20 size={32} />
        <strong className="text-4xl">RPGFicha</strong>
      </div>
      <strong className="text-xl">Crie seu usuário</strong>

      <form className="flex flex-col gap-2 w-full my-2" >

        <input 
          className="flex w-full bg-white p-2 rounded" placeholder="Nome do jogador"
          value={nome}
          onChange={(e)=>{setNome(e.target.value)}}
        />
      
        <input 
          className="flex w-full bg-white p-2 rounded" placeholder="Usuário"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        
        <div className="flex gap-1">
          <input
              type={exibirSenha ? "text" : "password"}
              className="flex w-full bg-white p-2 rounded"
              value={senha}
              onChange={(e)=>{setSenha(e.target.value)}}
              placeholder="Senha"
            />
          <button type="button" className="bg-orange-600 p-2 rounded" onClick={()=>{setExibirSenha(!exibirSenha)}}>
            {exibirSenha ? <FaRegEyeSlash size={18} />: <FaRegEye size={18} />}
          </button>
        </div>

        <button type="submit" className="flex bg-amber-600 text-white py-2 px-3 rounded justify-center items-center" onClick={onLogin}>
          Criar
        </button>
      </form>
      

    </main>
    
  )
}