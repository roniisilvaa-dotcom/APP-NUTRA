import { Patient, Protocol, Evolucao, DiárioRegistro, Consulta } from './types';

export const PACIENTES: Patient[] = [
  { 
    id: 1, 
    nome: 'Ana Costa', 
    idade: 34, 
    objetivo: 'Emagrecimento', 
    pesoAtual: 82, 
    pesoMeta: 70, 
    pesoInicio: 85, 
    adesao: 68, 
    status: 'ativo', 
    ultimoRegistro: 'há 1 dia',
    cpf: '123.456.789-00',
    contato: '(11) 98765-4321',
    proximaConsulta: '2026-05-23',
    tipoConsulta: 'Presencial',
    genero: 'Feminino',
    dataInicio: '2026-02-15'
  },
  { 
    id: 2, 
    nome: 'Carlos Lima', 
    idade: 45, 
    objetivo: 'Saúde Metabólica', 
    pesoAtual: 95, 
    pesoMeta: 88, 
    pesoInicio: 98, 
    adesao: 45, 
    status: 'alerta', 
    ultimoRegistro: 'há 5 dias',
    cpf: '987.654.321-11',
    contato: '(11) 99123-4567',
    proximaConsulta: '2026-05-21',
    tipoConsulta: 'Online',
    genero: 'Masculino',
    dataInicio: '2026-03-10'
  },
  { 
    id: 3, 
    nome: 'Maria Santos', 
    idade: 28, 
    objetivo: 'Hipertrofia', 
    pesoAtual: 58, 
    pesoMeta: 63, 
    pesoInicio: 56, 
    adesao: 91, 
    status: 'ativo', 
    ultimoRegistro: 'hoje',
    cpf: '456.789.123-22',
    contato: '(21) 98888-7777',
    proximaConsulta: '2026-06-02',
    tipoConsulta: 'Presencial',
    genero: 'Feminino',
    dataInicio: '2026-01-20'
  },
  { 
    id: 4, 
    nome: 'João Pereira', 
    idade: 52, 
    objetivo: 'Controle Glicêmico', 
    pesoAtual: 102, 
    pesoMeta: 92, 
    pesoInicio: 106, 
    adesao: 23, 
    status: 'alerta', 
    ultimoRegistro: 'há 8 dias',
    cpf: '321.654.987-33',
    contato: '(19) 97777-6666',
    proximaConsulta: '2026-05-28',
    tipoConsulta: 'Online',
    genero: 'Masculino',
    dataInicio: '2026-04-01'
  },
  { 
    id: 5, 
    nome: 'Fernanda Rocha', 
    idade: 39, 
    objetivo: 'Emagrecimento', 
    pesoAtual: 78, 
    pesoMeta: 65, 
    pesoInicio: 83, 
    adesao: 85, 
    status: 'ativo', 
    ultimoRegistro: 'hoje',
    cpf: '789.123.456-44',
    contato: '(31) 96666-5555',
    proximaConsulta: '2026-06-10',
    tipoConsulta: 'Presencial',
    genero: 'Feminino',
    dataInicio: '2026-02-01'
  },
  { 
    id: 6, 
    nome: 'Roberto Alves', 
    idade: 61, 
    objetivo: 'Longevidade', 
    pesoAtual: 88, 
    pesoMeta: 83, 
    pesoInicio: 91, 
    adesao: 72, 
    status: 'ativo', 
    ultimoRegistro: 'há 2 dias',
    cpf: '159.753.486-55',
    contato: '(81) 95555-4444',
    proximaConsulta: '2026-05-30',
    tipoConsulta: 'Presencial',
    genero: 'Masculino',
    dataInicio: '2026-03-25'
  }
];

export const PROTOCOLO_DEMO: Protocol = {
  nome: 'Protocolo Emagrecimento Avançado',
  inicio: '2026-02-15',
  revisao: '2026-06-15',
  suplementos: [
    { nome: 'Vitamina D3', dose: '5000 UI', horario: 'manhã', obs: 'Tomar com gordura', ativo: true },
    { nome: 'Ômega 3', dose: '2g', horario: 'almoço', obs: '', ativo: true },
    { nome: 'Magnésio Dimalato', dose: '400mg', horario: 'noite', obs: 'Longe de cálcio', ativo: true },
    { nome: 'Probiótico', dose: '1 cápsula', horario: 'jejum', obs: '30min antes do café', ativo: true },
    { nome: 'Vitamina B12', dose: '1000mcg', horario: 'manhã', obs: '', ativo: true }
  ],
  alimentacao: {
    calorias: 1800,
    proteina: 35,
    carboidrato: 30,
    gordura: 35,
    janela: '8h às 20h',
    permitidos: ['Proteínas magras', 'Vegetais folhosos', 'Frutas vermelhas', 'Oleaginosas', 'Azeite extra virgem'],
    proibidos: ['Açúcar refinado', 'Farináceos brancos', 'Bebidas alcoólicas', 'Ultraprocessados'],
    orientacoes: 'Manter hidratação constante (mínimo 3L de água/dia). Evitar líquidos com as refeições principais.'
  },
  exercicios: { 
    frequencia: '4x/semana', 
    tipo: 'Musculação + Cardio', 
    intensidade: 'Moderada' 
  },
  exames: ['Hemograma completo', 'Glicemia em jejum', 'Insulina', 'Colesterol total e frações', 'TSH', 'Vitamina D', 'Ferro sérico']
};

export const EVOLUCAO_DEMO: Evolucao = {
  pesos: [85, 84.2, 83.8, 83.1, 82.5, 82.0, 81.8, 81.3, 80.9, 80.5, 80.2, 79.8],
  datas: ['Jan 1', 'Jan 15', 'Feb 1', 'Feb 15', 'Mar 1', 'Mar 15', 'Apr 1', 'Apr 15', 'May 1', 'May 10', 'May 15', 'May 20'],
  adesao_semanal: [45, 60, 72, 80, 85, 68, 91, 78, 82, 88, 95, 72]
};

export const EXAMES_DEMO = [
  { nome: 'Glicemia em jejum', valor: '86 mg/dL', status: 'normal', ref: '70 - 99 mg/dL' },
  { nome: 'Hemoglobina Glicada (HbA1c)', valor: '5.2%', status: 'normal', ref: 'menor que 5.7%' },
  { nome: 'Colesterol Total', valor: '204 mg/dL', status: 'atencao', ref: 'menor que 190 mg/dL' },
  { nome: 'HDL Colesterol', valor: '42 mg/dL', status: 'atencao', ref: 'maior que 50 mg/dL' },
  { nome: 'LDL Colesterol', valor: '138 mg/dL', status: 'alterado', ref: 'menor que 100 mg/dL' },
  { nome: 'Triglicerídeos', valor: '120 mg/dL', status: 'normal', ref: 'menor que 150 mg/dL' },
  { nome: 'Vitamina D (25-OH)', valor: '28 ng/mL', status: 'atencao', ref: '30 - 60 ng/mL' }
];

export const REGISTROS_DIARIOS_DEMO: DiárioRegistro[] = [
  {
    data: '2026-05-19',
    suplementosTomados: ['Vitamina D3', 'Ômega 3', 'Magnésio Dimalato', 'Probiótico'],
    seguiuDieta: 'Sim',
    observacoes: 'Dia corrido, mas consegui bater as calorias e suplementos sem problemas. Senti ótima disposição.',
    aguaMl: 3200,
    peso: 79.8,
    humor: 5,
    energia: 80,
    fome: 2,
    sintomas: [],
    exercicioFeito: true,
    exercicioTipo: 'Musculação',
    exercicioDuracao: 50,
    exercicioIntensidade: 'Moderada'
  },
  {
    data: '2026-05-18',
    suplementosTomados: ['Vitamina D3', 'Ômega 3', 'Vitamina B12'],
    seguiuDieta: 'Parcialmente',
    observacoes: 'Comi uma fatia de pão de forma à tarde porque estava sem opções saudáveis no escritório.',
    aguaMl: 2500,
    peso: 80.1,
    humor: 4,
    energia: 65,
    fome: 4,
    sintomas: ['Inchaço'],
    exercicioFeito: false
  },
  {
    data: '2026-05-17',
    suplementosTomados: ['Vitamina D3', 'Ômega 3', 'Magnésio Dimalato', 'Probiótico', 'Vitamina B12'],
    seguiuDieta: 'Sim',
    observacoes: 'Fim de semana focado. Sono regulado e sem dores musculares.',
    aguaMl: 3000,
    peso: 79.9,
    humor: 5,
    energia: 90,
    fome: 1,
    sintomas: [],
    exercicioFeito: true,
    exercicioTipo: 'Cardio',
    exercicioDuracao: 40,
    exercicioIntensidade: 'Leve'
  }
];

export const AGENDA_DEMO: Consulta[] = [
  { id: 1, pacienteNome: 'Ana Costa', pacienteId: 1, horario: '09:00', tipo: 'Presencial', avatar: 'AC' },
  { id: 2, pacienteNome: 'Carlos Lima', pacienteId: 2, horario: '10:30', tipo: 'Online', avatar: 'CL' },
  { id: 3, pacienteNome: 'Fernanda Rocha', pacienteId: 5, horario: '14:00', tipo: 'Presencial', avatar: 'FR' },
  { id: 4, pacienteNome: 'Roberto Alves', pacienteId: 6, horario: '15:30', tipo: 'Presencial', avatar: 'RA' },
  { id: 5, pacienteNome: 'Gisele Sousa', pacienteId: 7, horario: '17:00', tipo: 'Online', avatar: 'GS' }
];

export const MOCK_CHATS = [
  { id: 1, sender: 'medico', text: 'Olá Ana! Como você está se sentindo com as doses do Magnésio Dimalato à noite?', time: '10:45' },
  { id: 2, sender: 'paciente', text: 'Olá, Dr. Silva! Estou dormindo bem melhor desde que começamos. Sinto menos fadiga pela manhã.', time: '11:02' },
  { id: 3, sender: 'medico', text: 'Que excelente notícia. Mantenha o foco nessa rotina. Envie os resultados do exame de sangue assim que recebê-los.', time: '11:15' },
  { id: 4, sender: 'paciente', text: 'Com certeza! Farei o agendamento no laboratório para esta sexta-feira.', time: '11:20' }
];
