import { pgTable, serial, text, integer, real, boolean, timestamp, pgEnum, jsonb } from 'drizzle-orm/pg-core'

// Enums
export const roleEnum = pgEnum('role', ['medico', 'paciente'])
export const planEnum = pgEnum('plan', ['free', 'clinica', 'advanced'])
export const statusEnum = pgEnum('patient_status', ['ativo', 'alerta', 'inativo'])
export const consultaTypeEnum = pgEnum('consulta_type', ['Presencial', 'Online'])

// Usuários (médicos e pacientes)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').notNull().default('medico'),
  plan: planEnum('plan').notNull().default('free'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  crm: text('crm'),
  especialidade: text('especialidade'),
  clinica: text('clinica'),
  doctorId: integer('doctor_id'),  // para pacientes: id do médico responsável
  createdAt: timestamp('created_at').defaultNow(),
})

// Pacientes (dados clínicos vinculados ao user paciente e ao médico)
export const patients = pgTable('patients', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),           // user com role=paciente (pode ser null se ainda não tem acesso)
  doctorId: integer('doctor_id').notNull(),
  nome: text('nome').notNull(),
  idade: integer('idade'),
  objetivo: text('objetivo'),
  pesoAtual: real('peso_atual'),
  pesoMeta: real('peso_meta'),
  pesoInicio: real('peso_inicio'),
  adesao: integer('adesao').default(0),
  status: statusEnum('status').default('ativo'),
  cpf: text('cpf'),
  contato: text('contato'),
  genero: text('genero'),
  dataInicio: text('data_inicio'),
  ultimoRegistro: text('ultimo_registro'),
  proximaConsulta: text('proxima_consulta'),
  tipoConsulta: consultaTypeEnum('tipo_consulta'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Protocolos clínicos
export const protocols = pgTable('protocols', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  nome: text('nome').notNull(),
  inicio: text('inicio'),
  revisao: text('revisao'),
  suplementos: jsonb('suplementos').default([]),   // Supplement[]
  alimentacao: jsonb('alimentacao'),               // Alimentacao
  exercicios: jsonb('exercicios'),                 // Exercicios
  exames: jsonb('exames').default([]),             // string[]
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Consultas / agenda
export const consultas = pgTable('consultas', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull(),
  patientId: integer('patient_id').notNull(),
  horario: text('horario').notNull(),
  tipo: consultaTypeEnum('tipo').default('Online'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Diário do paciente
export const diarioRegistros = pgTable('diario_registros', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  data: text('data').notNull(),
  suplementosTomados: jsonb('suplementos_tomados').default([]),
  seguiuDieta: text('seguiu_dieta'),
  observacoes: text('observacoes'),
  aguaMl: integer('agua_ml'),
  peso: real('peso'),
  humor: integer('humor'),
  energia: integer('energia'),
  fome: integer('fome'),
  sintomas: jsonb('sintomas').default([]),
  exercicioFeito: boolean('exercicio_feito').default(false),
  exercicioTipo: text('exercicio_tipo'),
  exercicioDuracao: integer('exercicio_duracao'),
  exercicioIntensidade: text('exercicio_intensidade'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Mensagens do chat
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  senderId: integer('sender_id').notNull(),
  senderRole: roleEnum('sender_role').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// ============================================================
// MÓDULOS CLÍNICOS AVANÇADOS (v2)
// ============================================================

// Avaliação antropométrica completa
export const anthropometry = pgTable('anthropometry', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  data: text('data').notNull(),
  // Básico
  peso: real('peso'),
  altura: real('altura'),
  imc: real('imc'),
  // Composição corporal
  percentualGordura: real('percentual_gordura'),
  massaMagra: real('massa_magra'),
  massaGorda: real('massa_gorda'),
  aguaCorporal: real('agua_corporal'),
  massaOssea: real('massa_ossea'),
  taxaMetabolicaBasal: real('taxa_metabolica_basal'),
  // Dobras cutâneas (mm)
  dobras: jsonb('dobras').default({}), // {triceps, biceps, subescapular, suprailiaca, abdominal, coxa, panturrilha, peitoral, axilarMedia}
  protocoloDobras: text('protocolo_dobras'), // 'pollock7', 'pollock3', 'guedes', etc
  somaDobras: real('soma_dobras'),
  // Circunferências (cm)
  circunferencias: jsonb('circunferencias').default({}), // {pescoco, ombro, torax, cintura, abdomen, quadril, bracoRelaxado, bracoContraido, antebraco, coxa, panturrilha}
  relacaoCinturaQuadril: real('relacao_cintura_quadril'),
  // Diâmetros ósseos (cm)
  diametros: jsonb('diametros').default({}),
  // Bioimpedância (dados brutos)
  bioimpedancia: jsonb('bioimpedancia'),
  observacoes: text('observacoes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Exames laboratoriais
export const labExams = pgTable('lab_exams', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  data: text('data').notNull(),
  resultados: jsonb('resultados').default([]), // [{marcador, valor, unidade, referenciaMin, referenciaMax, status}]
  analiseIa: text('analise_ia'),
  condutaSugerida: text('conduta_sugerida'),
  anexoUrl: text('anexo_url'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Base de alimentos (TACO + customizados)
export const foodItems = pgTable('food_items', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id'), // null = base pública (TACO); preenchido = alimento custom do médico
  nome: text('nome').notNull(),
  grupo: text('grupo'),
  fonte: text('fonte').default('TACO'), // TACO, IBGE, USDA, custom
  porcaoBase: real('porcao_base').default(100), // gramas
  // Macros por porção base
  kcal: real('kcal'),
  proteina: real('proteina'),
  carboidrato: real('carboidrato'),
  gordura: real('gordura'),
  fibra: real('fibra'),
  sodio: real('sodio'),
  micronutrientes: jsonb('micronutrientes').default({}),
  createdAt: timestamp('created_at').defaultNow(),
})

// Plano alimentar estruturado (com cálculo de macros)
export const mealPlans = pgTable('meal_plans', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  nome: text('nome').notNull(),
  inicio: text('inicio'),
  fim: text('fim'),
  metaKcal: real('meta_kcal'),
  metaProteina: real('meta_proteina'),
  metaCarbo: real('meta_carbo'),
  metaGordura: real('meta_gordura'),
  refeicoes: jsonb('refeicoes').default([]), // [{nome, horario, itens:[{foodId, nome, quantidade, kcal, p, c, g}], substituicoes}]
  totaisCalculados: jsonb('totais_calculados').default({}),
  observacoes: text('observacoes'),
  ativo: boolean('ativo').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Anamnese / recordatório / questionários
export const anamnese = pgTable('anamnese', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  tipo: text('tipo').notNull().default('anamnese'), // anamnese, recordatorio24h, questionario
  data: text('data').notNull(),
  // Histórico clínico
  queixaPrincipal: text('queixa_principal'),
  historicoClinico: jsonb('historico_clinico').default({}),
  habitos: jsonb('habitos').default({}), // sono, intestino, agua, atividade, alcool, tabagismo
  historicoFamiliar: jsonb('historico_familiar').default({}),
  medicamentos: jsonb('medicamentos').default([]),
  alergiasIntolerancia: jsonb('alergias_intolerancia').default([]),
  preferenciasAlimentares: jsonb('preferencias_alimentares').default({}),
  recordatorio: jsonb('recordatorio').default([]), // refeições do dia anterior
  respostas: jsonb('respostas').default({}),
  createdAt: timestamp('created_at').defaultNow(),
})

// Agenda / agendamentos
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull(),
  patientId: integer('patient_id'),
  pacienteNome: text('paciente_nome'),
  inicio: timestamp('inicio').notNull(),
  fim: timestamp('fim'),
  tipo: consultaTypeEnum('tipo').default('Online'),
  status: text('status').default('agendado'), // agendado, confirmado, realizado, cancelado, faltou
  valor: real('valor'),
  linkVideo: text('link_video'),
  observacoes: text('observacoes'),
  lembreteEnviado: boolean('lembrete_enviado').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

// Financeiro
export const financialRecords = pgTable('financial_records', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull(),
  patientId: integer('patient_id'),
  appointmentId: integer('appointment_id'),
  descricao: text('descricao').notNull(),
  tipo: text('tipo').notNull().default('receita'), // receita, despesa
  valor: real('valor').notNull(),
  status: text('status').default('pendente'), // pendente, pago, atrasado, cancelado
  metodoPagamento: text('metodo_pagamento'),
  vencimento: text('vencimento'),
  pagoEm: text('pago_em'),
  createdAt: timestamp('created_at').defaultNow(),
})

// ============================================================
// CONTROLE DE DADOS / LGPD
// ============================================================

// Log de auditoria (toda ação sensível)
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  actorId: integer('actor_id'),
  actorEmail: text('actor_email'),
  actorRole: text('actor_role'),
  acao: text('acao').notNull(), // view, create, update, delete, export, login, consent
  entidade: text('entidade'), // patient, protocol, lab_exam, etc
  entidadeId: integer('entidade_id'),
  patientId: integer('patient_id'), // titular dos dados afetados
  detalhes: jsonb('detalhes').default({}),
  ip: text('ip'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Consentimentos LGPD
export const consents = pgTable('consents', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id'),
  userId: integer('user_id'),
  tipo: text('tipo').notNull(), // tratamento_dados, compartilhamento, comunicacao, termos
  finalidade: text('finalidade'),
  versaoTermo: text('versao_termo'),
  concedido: boolean('concedido').notNull().default(true),
  ip: text('ip'),
  concedidoEm: timestamp('concedido_em').defaultNow(),
  revogadoEm: timestamp('revogado_em'),
})

// Anexos / documentos
export const attachments = pgTable('attachments', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  nome: text('nome').notNull(),
  tipo: text('tipo'), // exame, foto, documento
  url: text('url').notNull(),
  tamanho: integer('tamanho'),
  createdAt: timestamp('created_at').defaultNow(),
})
