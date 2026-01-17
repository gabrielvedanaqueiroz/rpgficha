"use client";

import { AtaqueProps } from "@/classes/ataque";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useAtaqueGet(aIDPersonagem: string) {
  const [data, setData] = useState<AtaqueProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aIDPersonagem) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query( collection(db, "tb_ataque"), where("at_idpersonagem", "==", aIDPersonagem.trim()) );

      const querySnapshot = await getDocs(q);
      const lista: AtaqueProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          at_id: doc.id,
          at_descricao: doc.data().at_descricao.trim(),
          at_alcance: doc.data().at_alcance.trim(),
          at_bonus: doc.data().at_bonus.trim(),
          at_dano: doc.data().at_dano.trim(),
          at_tipo: doc.data().at_tipo.trim(),
        });
      });

      lista.sort((a, b) =>
        a.at_descricao.localeCompare(b.at_descricao, "pt-BR", { sensitivity: "base" })
      );

      setData(lista);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aIDPersonagem]);

  return { data, isLoading, isError, refetch };
}
