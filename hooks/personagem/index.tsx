"use client";

import Personagem from "@/classes/personagem";
import { db } from "@/services/firebaseConnection";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { useEffect, useState } from "react";

export function usePersonagemByIdGet(aIdPersonagem:string){

  const [data, setData] = useState<Personagem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  async function refetch() {
    if (!aIdPersonagem) return;

    setIsLoading(true);
    setIsError(false);

    try {

      let LPersonagem = null;
      
      const ref = doc(db, "tb_personagem", aIdPersonagem.trim());
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        LPersonagem = new Personagem(
          snapshot.id,                    //id do documento fica separado no nodo do documento
          (snapshot.data().pe_nome ?? "").trim(),      //pegar dados, ficam armazenados em data()
          (snapshot.data().pe_subclasse ?? "").trim(),
          (snapshot.data().pe_classe ?? "").trim(),
          (snapshot.data().pe_raca ?? "").trim(),
          (snapshot.data().pe_subraca ?? "").trim(),
          Number(snapshot.data().pe_nivel ?? '0'),
          (snapshot.data().pe_antecedente ?? "").trim(),

          (snapshot.data().pe_tendencia ?? "").trim(),
          Number(snapshot.data().pe_vidabase ?? 0),
          Number(snapshot.data().pe_vidaatual ?? 0),
          Number(snapshot.data().pe_vidatemp ?? 0),
          Number(snapshot.data().pe_experiencia ?? 0),
          Number(snapshot.data().pe_bproficiencia ?? 0),

          Number(snapshot.data().pe_forca ?? 0),
          Number(snapshot.data().pe_destreza ?? 0),
          Number(snapshot.data().pe_constituicao ?? 0),
          Number(snapshot.data().pe_inteligencia ?? 0),
          Number(snapshot.data().pe_sabedoria ?? 0),
          Number(snapshot.data().pe_carisma ?? 0),

          Number(snapshot.data().pe_cabase ?? 0),
          Number(snapshot.data().pe_catotal ?? 0),
          Number(snapshot.data().pe_movimento ?? 0),

          Number(snapshot.data().pe_idclasse ?? 0),
          Number(snapshot.data().pe_idraca ?? 0),

          (snapshot.data().pe_vidadado ?? "d6"),
          Number(snapshot.data().pe_vidadadousado ?? 0),

          Boolean(snapshot.data().pe_tcmfalha1),
          Boolean(snapshot.data().pe_tcmfalha2),
          Boolean(snapshot.data().pe_tcmfalha3),
          Boolean(snapshot.data().pe_tcmsucesso1),
          Boolean(snapshot.data().pe_tcmsucesso2),
          Boolean(snapshot.data().pe_tcmsucesso3),

          Boolean(snapshot.data().pe_sgforca),
          Boolean(snapshot.data().pe_sgdestreza),
          Boolean(snapshot.data().pe_sgconstituicao),
          Boolean(snapshot.data().pe_sginteligencia),
          Boolean(snapshot.data().pe_sgsabedoria),
          Boolean(snapshot.data().pe_sgcarisma),

          Boolean(snapshot.data().pe_proacrobacia),
          Boolean(snapshot.data().pe_proarcanismo),
          Boolean(snapshot.data().pe_proatletismo),
          Boolean(snapshot.data().pe_proatuacao),
          Boolean(snapshot.data().pe_problefar),
          Boolean(snapshot.data().pe_profurtividade),
          Boolean(snapshot.data().pe_prohistoria),
          Boolean(snapshot.data().pe_prointimidacao),
          Boolean(snapshot.data().pe_prointuicao),
          Boolean(snapshot.data().pe_proinvestigacao),
          Boolean(snapshot.data().pe_prolidaranimais),
          Boolean(snapshot.data().pe_promedicina),
          Boolean(snapshot.data().pe_pronatureza),
          Boolean(snapshot.data().pe_propercepcao),
          Boolean(snapshot.data().pe_propersusao),
          Boolean(snapshot.data().pe_prosobrevivencia),
          Boolean(snapshot.data().pe_proreligiao),
          Boolean(snapshot.data().pe_proprestidigitacao),

          Number(snapshot.data().pe_idhabilidadeconjuracao ?? 0),
        ); 

        setData(LPersonagem);
      }

    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aIdPersonagem]);

  return { data, isLoading, isError, refetch };
}

export function usePersonagemGet(aIdJogador: string) {
  const [data, setData] = useState<Personagem[]| null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aIdJogador?.trim()) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query(
        collection(db, "tb_personagem"),
        where("pe_idjogador", "==", aIdJogador.trim())
      );

      const querySnapshot = await getDocs(q);
      const lista : Personagem[] = [];

      querySnapshot.forEach((doc) => {
        lista.push( new Personagem(
          doc.id,
          (doc.data().pe_nome ?? "").trim(),
          (doc.data().pe_subclasse ?? "").trim(),
          (doc.data().pe_classe ?? "").trim(),
          (doc.data().pe_raca ?? "").trim(),
          (doc.data().pe_subraca ?? "").trim(),
          Number(doc.data().pe_nivel ?? '0'),
          (doc.data().pe_antecedente ?? "").trim(),

          (doc.data().pe_tendencia ?? "").trim(),
          Number(doc.data().pe_vidabase ?? 0),
          Number(doc.data().pe_vidaatual ?? 0),
          Number(doc.data().pe_vidatemp ?? 0),
          Number(doc.data().pe_experiencia ?? 0),
          Number(doc.data().pe_bproficiencia ?? 0),

          Number(doc.data().pe_forca ?? 0),
          Number(doc.data().pe_destreza ?? 0),
          Number(doc.data().pe_constituicao ?? 0),
          Number(doc.data().pe_inteligencia ?? 0),
          Number(doc.data().pe_sabedoria ?? 0),
          Number(doc.data().pe_carisma ?? 0),

          Number(doc.data().pe_cabase ?? 0),
          Number(doc.data().pe_catotal ?? 0),
          Number(doc.data().pe_movimento ?? 0),

          Number(doc.data().pe_idclasse ?? 0),
          Number(doc.data().pe_idraca ?? 0),

          (doc.data().pe_vidadado ?? "d6"),
          Number(doc.data().pe_vidadadousado ?? 0),

          Boolean(doc.data().pe_tcmfalha1),
          Boolean(doc.data().pe_tcmfalha2),
          Boolean(doc.data().pe_tcmfalha3),
          Boolean(doc.data().pe_tcmsucesso1),
          Boolean(doc.data().pe_tcmsucesso2),
          Boolean(doc.data().pe_tcmsucesso3),

          Boolean(doc.data().pe_sgforca),
          Boolean(doc.data().pe_sgdestreza),
          Boolean(doc.data().pe_sgconstituicao),
          Boolean(doc.data().pe_sginteligencia),
          Boolean(doc.data().pe_sgsabedoria),
          Boolean(doc.data().pe_sgcarisma),

          Boolean(doc.data().pe_proacrobacia),
          Boolean(doc.data().pe_proarcanismo),
          Boolean(doc.data().pe_proatletismo),
          Boolean(doc.data().pe_proatuacao),
          Boolean(doc.data().pe_problefar),
          Boolean(doc.data().pe_profurtividade),
          Boolean(doc.data().pe_prohistoria),
          Boolean(doc.data().pe_prointimidacao),
          Boolean(doc.data().pe_prointuicao),
          Boolean(doc.data().pe_proinvestigacao),
          Boolean(doc.data().pe_prolidaranimais),
          Boolean(doc.data().pe_promedicina),
          Boolean(doc.data().pe_pronatureza),
          Boolean(doc.data().pe_propercepcao),
          Boolean(doc.data().pe_propersusao),
          Boolean(doc.data().pe_prosobrevivencia),
          Boolean(doc.data().pe_proreligiao),
          Boolean(doc.data().pe_proprestidigitacao),

          doc.data().pe_idhabilidadeconjuracao ?? null,
        ))
      });     

      lista.sort((a, b) =>
        a.pe_nome.localeCompare(b.pe_nome, "pt-BR", { sensitivity: "base" })
      );
      setData(lista);      

    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [aIdJogador]);

  return { data, isLoading, isError, refetch };
}