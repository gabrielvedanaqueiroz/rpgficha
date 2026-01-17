"use client";

import { MagiaProps } from "@/classes/magia";
import { db } from "@/services/firebaseConnection";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useMagiaGet(aIDPersonagem: string) {
  const [data, setData] = useState<MagiaProps[]>([]);
  const [listaPrep, setListaPrep] = useState<MagiaProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aIDPersonagem) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query(collection(db, "tb_magia"), where("mg_idpersonagem", "==", aIDPersonagem.trim()));

      const querySnapshot = await getDocs(q);
      const lista: MagiaProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          mg_id: doc.id,
          mg_nome: doc.data().mg_nome,
          mg_descricao: doc.data().mg_descricao,
          mg_alcance: doc.data().mg_alcance,
          mg_componentes: doc.data().mg_componentes,
          mg_dano: doc.data().mg_dano,
          mg_duracao: doc.data().mg_duracao,
          mg_nivel: doc.data().mg_nivel,
          mg_preparada: doc.data().mg_preparada,
          mg_tempoconjuracao: doc.data().mg_tempoconjuracao,
          mg_material: doc.data().mg_material,
          mg_ritual: doc.data().mg_ritual,
          mg_concentracao: doc.data().mg_concentracao,
        })
      });

      lista.sort((a, b) => a.mg_nivel - b.mg_nivel);
      let listaPreparadas = lista.filter(m => m.mg_preparada === true);
      listaPreparadas.sort((a, b) => a.mg_nivel - b.mg_nivel);
      setListaPrep(listaPreparadas);

      setData(lista);
    } catch (error)  {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aIDPersonagem]);

  return { data, listaPrep, isLoading, isError, refetch };
}

export function useMagiaByIdGet(aId: string) {
  const [data, setData] = useState<MagiaProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aId) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const ref = doc(db, "tb_magia", aId.trim());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setData({
          mg_id: snap.id,
          mg_nome: snap.data().mg_nome,
          mg_descricao: snap.data().mg_descricao,
          mg_alcance: snap.data().mg_alcance,
          mg_componentes: snap.data().mg_componentes,
          mg_dano: snap.data().mg_dano,
          mg_duracao: snap.data().mg_duracao,
          mg_nivel: snap.data().mg_nivel,
          mg_preparada: snap.data().mg_preparada,
          mg_tempoconjuracao: snap.data().mg_tempoconjuracao,
          mg_material: snap.data().mg_material,
          mg_ritual: snap.data().mg_ritual,
          mg_concentracao: snap.data().mg_concentracao,
        })
      }

    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aId]);

  return { data, isLoading, isError, refetch };
}