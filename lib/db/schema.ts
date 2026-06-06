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
