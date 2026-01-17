"use client";

import { InventarioProps } from "@/classes/inventario";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useInventarioGet(aIDPersonagem: string) {
  const [data, setData] = useState<InventarioProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aIDPersonagem) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query( collection(db, "tb_inventario"),  where("in_idpersonagem", "==", aIDPersonagem.trim()) );

      const querySnapshot = await getDocs(q);
      const lista: InventarioProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          in_id: doc.id,
          in_nome: doc.data().in_nome.trim(),
          in_descricao: doc.data().in_descricao.trim(),
        });
      });

      lista.sort((a, b) =>
        a.in_nome.localeCompare(b.in_nome, "pt-BR", { sensitivity: "base" })
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