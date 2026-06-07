// ============================================================
// MOTOR DE CÁLCULO CLÍNICO NUTRICIONAL
// Fórmulas científicas validadas para nutrição de precisão
// ============================================================

export type Sexo = 'masculino' | 'feminino'

// ---------- IMC ----------
export function calcIMC(pesoKg: number, alturaCm: number): number {
  const m = alturaCm / 100
  if (!m) return 0
  return round(pesoKg / (m * m), 1)
}

export function classificarIMC(imc: number): { classe: string; cor: string } {
  if (imc < 18.5) return { classe: 'Abaixo do peso', cor: 'amber' }
  if (imc < 25) return { classe: 'Peso normal', cor: 'emerald' }
  if (imc < 30) return { classe: 'Sobrepeso', cor: 'amber' }
  if (imc < 35) return { classe: 'Obesidade grau I', cor: 'orange' }
  if (imc < 40) return { classe: 'Obesidade grau II', cor: 'red' }
  return { classe: 'Obesidade grau III', cor: 'red' }
}

// ---------- Taxa Metabólica Basal (TMB) ----------
// Mifflin-St Jeor (padrão-ouro para população geral)
export function tmbMifflin(pesoKg: number, alturaCm: number, idade: number, sexo: Sexo): number {
  const base = 10 * pesoKg + 6.25 * alturaCm - 5 * idade
  return round(sexo === 'masculino' ? base + 5 : base - 161)
}

// Harris-Benedict revisada (Roza & Shizgal, 1984)
export function tmbHarrisBenedict(pesoKg: number, alturaCm: number, idade: number, sexo: Sexo): number {
  return round(
    sexo === 'masculino'
      ? 88.362 + 13.397 * pesoKg + 4.799 * alturaCm - 5.677 * idade
      : 447.593 + 9.247 * pesoKg + 3.098 * alturaCm - 4.33 * idade
  )
}

// Cunningham (atletas, baseado em massa magra)
export function tmbCunningham(massaMagraKg: number): number {
  return round(500 + 22 * massaMagraKg)
}

// Tinsley (massa magra, físico-culturismo)
export function tmbTinsley(massaMagraKg: number): number {
  return round(25.9 * massaMagraKg + 284)
}

// ---------- Gasto Energético Total (GET) ----------
export const FATORES_ATIVIDADE = {
  sedentario: { fator: 1.2, label: 'Sedentário (pouco/nenhum exercício)' },
  leve: { fator: 1.375, label: 'Leve (1-3x/semana)' },
  moderado: { fator: 1.55, label: 'Moderado (3-5x/semana)' },
  intenso: { fator: 1.725, label: 'Intenso (6-7x/semana)' },
  muitoIntenso: { fator: 1.9, label: 'Muito intenso (atleta/2x dia)' },
} as const

export type NivelAtividade = keyof typeof FATORES_ATIVIDADE

export function calcGET(tmb: number, nivel: NivelAtividade): number {
  return round(tmb * FATORES_ATIVIDADE[nivel].fator)
}

// Ajuste por objetivo
export function ajustarPorObjetivo(get: number, objetivo: 'emagrecimento' | 'manutencao' | 'hipertrofia'): number {
  if (objetivo === 'emagrecimento') return round(get * 0.8) // déficit 20%
  if (objetivo === 'hipertrofia') return round(get * 1.15) // superávit 15%
  return round(get)
}

// ---------- % de Gordura por Dobras Cutâneas ----------
export interface Dobras {
  triceps?: number
  biceps?: number
  subescapular?: number
  suprailiaca?: number
  abdominal?: number
  coxa?: number
  panturrilha?: number
  peitoral?: number
  axilarMedia?: number
}

// Pollock 7 dobras (Jackson & Pollock)
export function gorduraPollock7(d: Dobras, idade: number, sexo: Sexo): number | null {
  const req = [d.peitoral, d.axilarMedia, d.triceps, d.subescapular, d.abdominal, d.suprailiaca, d.coxa]
  if (req.some((v) => v == null)) return null
  const soma = req.reduce((a, b) => a! + b!, 0)!
  const densidade =
    sexo === 'masculino'
      ? 1.112 - 0.00043499 * soma + 0.00000055 * soma * soma - 0.00028826 * idade
      : 1.097 - 0.00046971 * soma + 0.00000056 * soma * soma - 0.00012828 * idade
  return siri(densidade)
}

// Pollock 3 dobras
export function gorduraPollock3(d: Dobras, idade: number, sexo: Sexo): number | null {
  if (sexo === 'masculino') {
    if (d.peitoral == null || d.abdominal == null || d.coxa == null) return null
    const soma = d.peitoral + d.abdominal + d.coxa
    const dens = 1.10938 - 0.0008267 * soma + 0.0000016 * soma * soma - 0.0002574 * idade
    return siri(dens)
  } else {
    if (d.triceps == null || d.suprailiaca == null || d.coxa == null) return null
    const soma = d.triceps + d.suprailiaca + d.coxa
    const dens = 1.0994921 - 0.0009929 * soma + 0.0000023 * soma * soma - 0.0001392 * idade
    return siri(dens)
  }
}

// Equação de Siri (densidade -> % gordura)
function siri(densidade: number): number {
  return round((495 / densidade - 450), 1)
}

// ---------- Composição corporal ----------
export function massaGorda(pesoKg: number, percentualGordura: number): number {
  return round((pesoKg * percentualGordura) / 100, 1)
}
export function massaMagra(pesoKg: number, percentualGordura: number): number {
  return round(pesoKg - massaGorda(pesoKg, percentualGordura), 1)
}

export function classificarGordura(pct: number, sexo: Sexo): { classe: string; cor: string } {
  const faixas =
    sexo === 'masculino'
      ? [[6, 'Essencial', 'amber'], [14, 'Atlético', 'emerald'], [18, 'Fitness', 'emerald'], [25, 'Aceitável', 'amber'], [Infinity, 'Obesidade', 'red']]
      : [[14, 'Essencial', 'amber'], [21, 'Atlético', 'emerald'], [25, 'Fitness', 'emerald'], [32, 'Aceitável', 'amber'], [Infinity, 'Obesidade', 'red']]
  for (const [lim, classe, cor] of faixas as [number, string, string][]) {
    if (pct < lim) return { classe, cor }
  }
  return { classe: '—', cor: 'gray' }
}

// ---------- Relação Cintura-Quadril ----------
export function relacaoCinturaQuadril(cinturaCm: number, quadrilCm: number): number {
  if (!quadrilCm) return 0
  return round(cinturaCm / quadrilCm, 2)
}

export function classificarRCQ(rcq: number, sexo: Sexo): { classe: string; cor: string } {
  const limiteAlto = sexo === 'masculino' ? 0.9 : 0.85
  if (rcq < limiteAlto) return { classe: 'Risco baixo', cor: 'emerald' }
  if (rcq < limiteAlto + 0.05) return { classe: 'Risco moderado', cor: 'amber' }
  return { classe: 'Risco alto', cor: 'red' }
}

// ---------- Peso ideal ----------
export function pesoIdealRange(alturaCm: number): { min: number; max: number } {
  const m = alturaCm / 100
  return { min: round(18.5 * m * m, 1), max: round(24.9 * m * m, 1) }
}

// ---------- Distribuição de Macronutrientes ----------
export interface MacroDistrib {
  proteinaG: number
  carboG: number
  gorduraG: number
  proteinaKcal: number
  carboKcal: number
  gorduraKcal: number
}

export function distribuirMacros(
  kcal: number,
  pctProteina: number,
  pctCarbo: number,
  pctGordura: number
): MacroDistrib {
  const proteinaKcal = (kcal * pctProteina) / 100
  const carboKcal = (kcal * pctCarbo) / 100
  const gorduraKcal = (kcal * pctGordura) / 100
  return {
    proteinaKcal: round(proteinaKcal),
    carboKcal: round(carboKcal),
    gorduraKcal: round(gorduraKcal),
    proteinaG: round(proteinaKcal / 4, 1),
    carboG: round(carboKcal / 4, 1),
    gorduraG: round(gorduraKcal / 9, 1),
  }
}

// Proteína por kg de peso (alternativa por g/kg)
export function proteinaPorKg(pesoKg: number, gPorKg: number): number {
  return round(pesoKg * gPorKg, 1)
}

// ---------- Hidratação recomendada ----------
export function aguaRecomendadaMl(pesoKg: number, fatorMl = 35): number {
  return Math.round(pesoKg * fatorMl)
}

// ---------- util ----------
function round(n: number, dec = 0): number {
  const f = Math.pow(10, dec)
  return Math.round(n * f) / f
}

// Avaliação completa em um passo
export interface AvaliacaoCompleta {
  imc: number
  imcClasse: { classe: string; cor: string }
  tmbMifflin: number
  tmbHarris: number
  getModerado: number
  pesoIdeal: { min: number; max: number }
  aguaMl: number
  percentualGordura?: number | null
  gorduraClasse?: { classe: string; cor: string }
  massaMagra?: number
  massaGorda?: number
  rcq?: number
  rcqClasse?: { classe: string; cor: string }
}

export function avaliacaoCompleta(input: {
  peso: number
  altura: number
  idade: number
  sexo: Sexo
  nivelAtividade?: NivelAtividade
  dobras?: Dobras
  protocoloDobras?: 'pollock7' | 'pollock3'
  cintura?: number
  quadril?: number
}): AvaliacaoCompleta {
  const imc = calcIMC(input.peso, input.altura)
  const tmbM = tmbMifflin(input.peso, input.altura, input.idade, input.sexo)
  const tmbH = tmbHarrisBenedict(input.peso, input.altura, input.idade, input.sexo)
  const result: AvaliacaoCompleta = {
    imc,
    imcClasse: classificarIMC(imc),
    tmbMifflin: tmbM,
    tmbHarris: tmbH,
    getModerado: calcGET(tmbM, input.nivelAtividade || 'moderado'),
    pesoIdeal: pesoIdealRange(input.altura),
    aguaMl: aguaRecomendadaMl(input.peso),
  }
  if (input.dobras) {
    const pct =
      input.protocoloDobras === 'pollock3'
        ? gorduraPollock3(input.dobras, input.idade, input.sexo)
        : gorduraPollock7(input.dobras, input.idade, input.sexo)
    if (pct != null) {
      result.percentualGordura = pct
      result.gorduraClasse = classificarGordura(pct, input.sexo)
      result.massaGorda = massaGorda(input.peso, pct)
      result.massaMagra = massaMagra(input.peso, pct)
    }
  }
  if (input.cintura && input.quadril) {
    result.rcq = relacaoCinturaQuadril(input.cintura, input.quadril)
    result.rcqClasse = classificarRCQ(result.rcq, input.sexo)
  }
  return result
}
