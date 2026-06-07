CREATE TABLE "anamnese" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"tipo" text DEFAULT 'anamnese' NOT NULL,
	"data" text NOT NULL,
	"queixa_principal" text,
	"historico_clinico" jsonb DEFAULT '{}'::jsonb,
	"habitos" jsonb DEFAULT '{}'::jsonb,
	"historico_familiar" jsonb DEFAULT '{}'::jsonb,
	"medicamentos" jsonb DEFAULT '[]'::jsonb,
	"alergias_intolerancia" jsonb DEFAULT '[]'::jsonb,
	"preferencias_alimentares" jsonb DEFAULT '{}'::jsonb,
	"recordatorio" jsonb DEFAULT '[]'::jsonb,
	"respostas" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "anthropometry" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"data" text NOT NULL,
	"peso" real,
	"altura" real,
	"imc" real,
	"percentual_gordura" real,
	"massa_magra" real,
	"massa_gorda" real,
	"agua_corporal" real,
	"massa_ossea" real,
	"taxa_metabolica_basal" real,
	"dobras" jsonb DEFAULT '{}'::jsonb,
	"protocolo_dobras" text,
	"soma_dobras" real,
	"circunferencias" jsonb DEFAULT '{}'::jsonb,
	"relacao_cintura_quadril" real,
	"diametros" jsonb DEFAULT '{}'::jsonb,
	"bioimpedancia" jsonb,
	"observacoes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer NOT NULL,
	"patient_id" integer,
	"paciente_nome" text,
	"inicio" timestamp NOT NULL,
	"fim" timestamp,
	"tipo" "consulta_type" DEFAULT 'Online',
	"status" text DEFAULT 'agendado',
	"valor" real,
	"link_video" text,
	"observacoes" text,
	"lembrete_enviado" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"nome" text NOT NULL,
	"tipo" text,
	"url" text NOT NULL,
	"tamanho" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"actor_id" integer,
	"actor_email" text,
	"actor_role" text,
	"acao" text NOT NULL,
	"entidade" text,
	"entidade_id" integer,
	"patient_id" integer,
	"detalhes" jsonb DEFAULT '{}'::jsonb,
	"ip" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consents" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer,
	"user_id" integer,
	"tipo" text NOT NULL,
	"finalidade" text,
	"versao_termo" text,
	"concedido" boolean DEFAULT true NOT NULL,
	"ip" text,
	"concedido_em" timestamp DEFAULT now(),
	"revogado_em" timestamp
);
--> statement-breakpoint
CREATE TABLE "financial_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer NOT NULL,
	"patient_id" integer,
	"appointment_id" integer,
	"descricao" text NOT NULL,
	"tipo" text DEFAULT 'receita' NOT NULL,
	"valor" real NOT NULL,
	"status" text DEFAULT 'pendente',
	"metodo_pagamento" text,
	"vencimento" text,
	"pago_em" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "food_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"nome" text NOT NULL,
	"grupo" text,
	"fonte" text DEFAULT 'TACO',
	"porcao_base" real DEFAULT 100,
	"kcal" real,
	"proteina" real,
	"carboidrato" real,
	"gordura" real,
	"fibra" real,
	"sodio" real,
	"micronutrientes" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lab_exams" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"data" text NOT NULL,
	"resultados" jsonb DEFAULT '[]'::jsonb,
	"analise_ia" text,
	"conduta_sugerida" text,
	"anexo_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meal_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"nome" text NOT NULL,
	"inicio" text,
	"fim" text,
	"meta_kcal" real,
	"meta_proteina" real,
	"meta_carbo" real,
	"meta_gordura" real,
	"refeicoes" jsonb DEFAULT '[]'::jsonb,
	"totais_calculados" jsonb DEFAULT '{}'::jsonb,
	"observacoes" text,
	"ativo" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
