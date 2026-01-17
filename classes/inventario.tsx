import { z } from "zod";

export interface InventarioProps{
  in_id: string,
  in_nome: string,
  in_descricao: string
}

export const inventarioSchema = z.object({
  in_id: z.string().optional(),
  in_nome: z.string().min(5, "Nome obrigatório"),
  in_descricao: z.string().min(5, "Descrição obrigatória"),
});

export type InventarioType = z.infer<typeof inventarioSchema>;
