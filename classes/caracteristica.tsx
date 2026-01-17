import z from "zod";

export default interface CaracteristicaProps{
  ca_id: string,
  ca_nome: string,
  ca_descricao: string
}

export const caracteristicaSchema = z.object({
  ca_id: z.string().optional(),
  ca_nome: z.string().min(5, "Nome obrigatório"),
  ca_descricao: z.string().min(5, "Descrição obrigatória"),
});

export type CaracteristicaType = z.infer<typeof caracteristicaSchema>;
