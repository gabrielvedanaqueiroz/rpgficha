import z, { boolean } from "zod";

export interface MagiaProps{
  mg_id: string,
  mg_nome: string,
  mg_descricao: string,
  mg_alcance: string,
  mg_componentes: string,
  mg_dano: string,
  mg_duracao: string,
  mg_nivel: number,
  mg_preparada: boolean,
  mg_tempoconjuracao: string,
  mg_material?: string,
  mg_ritual?: boolean,
  mg_concentracao: boolean,
}

export const magiaSchema = z.object({
  mg_id: z.string().optional(),
  mg_nome: z.string().min(2, "Nome obrigatório"),
  mg_descricao: z.string().min(5, "Descrição obrigatória"),
  mg_alcance: z.string().min(1, 'Alcance obrigatório'),
  mg_componentes: z.string().optional(),
  mg_dano: z.string().min(1, 'Dano obrigatório'),
  mg_duracao: z.string().min(1, 'Duração obrigatório'),
  mg_nivel: z.number(),
  mg_preparada: z.boolean().optional(),
  mg_tempoconjuracao: z.string().min(1, 'Tempo de conjuração obrigatório'),
  mg_material: z.string().optional(),
  mg_ritual: z.boolean().optional(),
  mg_concentracao: z.boolean().optional()
});

export type MagiaType = z.infer<typeof magiaSchema>;
