CREATE TYPE "public"."consulta_type" AS ENUM('Presencial', 'Online');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('free', 'clinica', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('medico', 'paciente');--> statement-breakpoint
CREATE TYPE "public"."patient_status" AS ENUM('ativo', 'alerta', 'inativo');--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"sender_role" "role" NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultas" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer NOT NULL,
	"patient_id" integer NOT NULL,
	"horario" text NOT NULL,
	"tipo" "consulta_type" DEFAULT 'Online',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "diario_registros" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"data" text NOT NULL,
	"suplementos_tomados" jsonb DEFAULT '[]'::jsonb,
	"seguiu_dieta" text,
	"observacoes" text,
	"agua_ml" integer,
	"peso" real,
	"humor" integer,
	"energia" integer,
	"fome" integer,
	"sintomas" jsonb DEFAULT '[]'::jsonb,
	"exercicio_feito" boolean DEFAULT false,
	"exercicio_tipo" text,
	"exercicio_duracao" integer,
	"exercicio_intensidade" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"doctor_id" integer NOT NULL,
	"nome" text NOT NULL,
	"idade" integer,
	"objetivo" text,
	"peso_atual" real,
	"peso_meta" real,
	"peso_inicio" real,
	"adesao" integer DEFAULT 0,
	"status" "patient_status" DEFAULT 'ativo',
	"cpf" text,
	"contato" text,
	"genero" text,
	"data_inicio" text,
	"ultimo_registro" text,
	"proxima_consulta" text,
	"tipo_consulta" "consulta_type",
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "protocols" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"nome" text NOT NULL,
	"inicio" text,
	"revisao" text,
	"suplementos" jsonb DEFAULT '[]'::jsonb,
	"alimentacao" jsonb,
	"exercicios" jsonb,
	"exames" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role" DEFAULT 'medico' NOT NULL,
	"plan" "plan" DEFAULT 'free' NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"crm" text,
	"especialidade" text,
	"clinica" text,
	"doctor_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
