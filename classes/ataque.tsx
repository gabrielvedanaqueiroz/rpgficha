import z from "zod";

export interface AtaqueProps{
  at_id: string,
  at_descricao: string,
  at_alcance: string,
  at_bonus:string,
  at_dano:string,
  at_tipo:string,
}

export const ataqueSchema = z.object({
  at_id: z.string().optional(),
  at_descricao: z.string().min(5, "Nome obrigatório, mínimo 5 caracteres"),
  at_alcance: z.string().min(5, "Alcance obrigatória, mínimo 5 caracteres"),
  at_bonus: z.string().optional(),
  at_dano: z.string().min(1, "Dano obrigatória"),
  at_tipo: z.string().min(5, "Tipo obrigatória, mínimo 5 caracteres"),
});

export type AtaqueType = z.infer<typeof ataqueSchema>;