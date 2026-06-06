export interface Patient {
  id: number;
  nome: string;
  idade: number;
  objetivo: string;
  pesoAtual: number;
  pesoMeta: number;
  pesoInicio: number;
  adesao: number; // percentage (0-100)
  status: 'ativo' | 'alerta' | 'inativo';
  ultimoRegistro: string;
  cpf?: string;
  contato?: string;
  proximaConsulta?: string;
  tipoConsulta?: 'Presencial' | 'Online';
  genero?: string;
  dataInicio?: string;
}

export interface Supplement {
  nome: string;
  dose: string;
  horario: 'manhã' | 'almoço' | 'tarde' | 'noite' | 'antes de dormir' | 'jejum';
  obs?: string;
  ativo?: boolean;
}

export interface Alimentacao {
  calorias: number;
  proteina: number; // in percentage e.g. 35%
  carboidrato: number; // in percentage e.g. 30%
  gordura: number; // in percentage e.g. 35%
  janela: string;
  permitidos: string[];
  proibidos: string[];
  orientacoes?: string;
}

export interface Exercicios {
  frequencia: string;
  tipo: string;
  intensidade: string;
}

export interface Protocol {
  nome: string;
  inicio: string;
  revisao: string;
  suplementos: Supplement[];
  alimentacao: Alimentacao;
  exercicios: Exercicios;
  exames: string[];
}

export interface Evolucao {
  pesos: number[];
  datas: string[];
  adesao_semanal: number[];
}

export interface User {
  email: string;
  role: 'medico' | 'paciente';
  name: string;
}

export interface DiárioRegistro {
  data: string;
  suplementosTomados: string[]; // list of supplement names taken
  seguiuDieta: 'Sim' | 'Parcialmente' | 'Não';
  observacoes: string;
  aguaMl: number;
  peso: number;
  humor: number; // 1 to 5
  energia: number; // 1 to 100 or 1 to 5
  fome: number; // 1 to 100 or 1 to 5
  sintomas: string[]; // e.g. "Inchaço", "Gases"
  exercicioFeito: boolean;
  exercicioTipo?: string;
  exercicioDuracao?: number;
  exercicioIntensidade?: 'Leve' | 'Moderada' | 'Intensa';
}

export interface Consulta {
  id: number;
  pacienteNome: string;
  pacienteId: number;
  horario: string;
  tipo: 'Presencial' | 'Online';
  avatar: string;
}
