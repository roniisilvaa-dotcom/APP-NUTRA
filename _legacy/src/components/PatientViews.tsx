import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Flame, 
  Calendar, 
  Sparkles, 
  Plus, 
  Clipboard, 
  Activity, 
  MessageSquare, 
  Droplet, 
  Award, 
  Coffee, 
  TrendingDown, 
  RotateCcw,
  Smile,
  Zap,
  ChevronRight,
  Send
} from 'lucide-react';
import { 
  AnimatedCounter, 
  ProgressBar, 
  HeatmapCalendar, 
  StreakBadge, 
  StatusBadge, 
  SupplementChecklist, 
  MacroPieChart, 
  LineChart, 
  BarChart, 
  MoodSlider,
  CongratulatoryModal
} from './SharedComponents';
import { Patient, Protocol, Supplement, DiárioRegistro } from '../types';
import { EVOLUCAO_DEMO } from '../demoData';

interface PatientViewsProps {
  patient: Patient;
  setPatient: (p: Patient) => void;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  protocol: Protocol;
  view: string;
  setView: (v: string) => void;
  dailyLogs: DiárioRegistro[];
  setDailyLogs: React.Dispatch<React.SetStateAction<DiárioRegistro[]>>;
  chats: { id: number; sender: string; text: string; time: string }[];
  setChats: React.Dispatch<React.SetStateAction<{ id: number; sender: string; text: string; time: string }[]>>;
}

export const PatientViews: React.FC<PatientViewsProps> = ({
  patient,
  setPatient,
  patients,
  setPatients,
  protocol,
  view,
  setView,
  dailyLogs,
  setDailyLogs,
  chats,
  setChats
}) => {
  // Configured check items for today
  const [checkedSupps, setCheckedSupps] = useState<string[]>(['Ômega 3']);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form states for registrar hoje
  const [formSeguiuDieta, setFormSeguiuDieta] = useState<'Sim' | 'Parcialmente' | 'Não'>('Sim');
  const [formAgua, setFormAgua] = useState(2500);
  const [formPeso, setFormPeso] = useState(79.8);
  const [formHumor, setFormHumor] = useState(4);
  const [formEnergia, setFormEnergia] = useState(70);
  const [formFome, setFormFome] = useState(3);
  const [formSintomas, setFormSintomas] = useState<string[]>([]);
  const [formExfeito, setFormExFeito] = useState(true);
  const [formExTipo, setFormExTipo] = useState('Musculação');
  const [formExDuracao, setFormExDuracao] = useState(45);
  const [formObs, setFormObs] = useState('');

  // Chat message input
  const [chatInput, setChatInput] = useState('');

  // Computed data
  const totalItems = protocol.suplementos.length;
  const completedItems = checkedSupps.length;
  const supplementCompletionRate = Math.round((completedItems / totalItems) * 100);

  // Toggle checklist of supplements (patient dashboard)
  const handleToggleSupplement = (name: string) => {
    let updated: string[];
    if (checkedSupps.includes(name)) {
      updated = checkedSupps.filter(n => n !== name);
    } else {
      updated = [...checkedSupps, name];
    }
    setCheckedSupps(updated);

    // If checked all, display motivational confetti banner!
    if (updated.length === totalItems) {
      setShowConfetti(true);
    }
  };

  const handleToggleSymptom = (sym: string) => {
    if (formSintomas.includes(sym)) {
      setFormSintomas(formSintomas.filter(s => s !== sym));
    } else {
      setFormSintomas([...formSintomas, sym]);
    }
  };

  const handleSaveDailyLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLog: DiárioRegistro = {
      data: new Date().toISOString().split('T')[0],
      suplementosTomados: checkedSupps,
      seguiuDieta: formSeguiuDieta,
      observacoes: formObs,
      aguaMl: formAgua,
      peso: formPeso,
      humor: formHumor,
      energia: formEnergia,
      fome: formFome,
      sintomas: formSintomas,
      exercicioFeito: formExfeito,
      exercicioTipo: formExTipo,
      exercicioDuracao: formExDuracao
    };

    setDailyLogs([newLog, ...dailyLogs]);
    
    // Dynamically increase patient compliance rating and weight
    const updatedAdesao = Math.min(100, patient.adesao + 5);
    const updatedPatient: Patient = {
      ...patient,
      pesoAtual: formPeso,
      adesao: updatedAdesao,
      ultimoRegistro: 'hoje'
    };

    setPatient(updatedPatient);
    
    // Also update this synchronized on doctor context
    setPatients(prev => prev.map(p => {
      if (p.id === patient.id) {
        return updatedPatient;
      }
      return p;
    }));

    setShowConfetti(true);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChats([...chats, { id: chats.length + 1, sender: 'paciente', text: chatInput, time: 'Agora' }]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showConfetti && (
          <CongratulatoryModal 
            isOpen={showConfetti} 
            onClose={() => {
              setShowConfetti(false);
              setView('inicio');
            }} 
            title="Parabéns, Ana! 🎉"
            message="Sua evolução diária foi registrada! Dr. Silva já recebeu seu histórico em tempo real."
          />
        )}
      </AnimatePresence>

      {/* DASHBOARD CLIENT VIEWS (TELA 6) */}
      {view === 'inicio' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6 text-left"
        >
          {/* Header patient */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                Olá, Ana 👋
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Foco e consistência · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>

            <StreakBadge count={12} />
          </div>

          {/* Quick Stats Summary Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Meu Peso Atual</span>
              <strong className="font-mono text-xl md:text-2xl font-bold block mt-1 dark:text-gray-100">{patient.pesoAtual} kg</strong>
              <div className="text-[10px] text-brand-emerald font-semibold mt-1 flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> -3.2kg do início 🎉
              </div>
            </div>

            <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-105 dark:border-gray-800/80 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-serif">Meta Estabelecida</span>
              <strong className="font-mono text-xl md:text-2xl font-bold block mt-1 text-brand-emerald">{patient.pesoMeta} kg</strong>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">Restam {(patient.pesoAtual - patient.pesoMeta).toFixed(1)}kg</div>
            </div>

            <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Adesão Recente</span>
              <strong className="font-mono text-xl md:text-2xl font-bold block mt-1 text-brand-emerald">{patient.adesao}%</strong>
              <div className="mt-1.5">
                <ProgressBar percentage={patient.adesao} color="bg-brand-emerald" className="h-1" />
              </div>
            </div>

            <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Próxima Consulta</span>
              <strong className="text-xs font-bold block mt-3 text-purple-600 dark:text-purple-400 truncate">Presencial · 23/05 (Sáb)</strong>
              <span className="text-[10px] text-gray-400 block mt-0.5">Faltam 3 dias</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Primary To Do Checklist Today */}
            <div className="lg:col-span-8 bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100">Protocolo Diário de Hoje</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Marque conforme for consumindo os suplementos</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Progresso</span>
                  <span className="font-mono font-bold text-xs text-brand-emerald">{completedItems} de {totalItems} tomados</span>
                </div>
              </div>

              <ProgressBar percentage={supplementCompletionRate} color="bg-brand-emerald animate-pulse" className="h-2 mb-4" />

              <SupplementChecklist 
                supplements={protocol.suplementos} 
                checkedList={checkedSupps} 
                onToggle={handleToggleSupplement} 
              />

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setCheckedSupps(protocol.suplementos.map(s => s.nome));
                    setShowConfetti(true);
                  }}
                  className="text-xs font-bold text-brand-emerald hover:underline"
                >
                  Marcar todos como tomados do dia ✨
                </button>
              </div>
            </div>

            {/* Side summary dashboard */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-gray-800 dark:text-gray-100 mb-3 block">🍉 Meu Plano Alimentar</h4>
                
                <MacroPieChart 
                  proteina={protocol.alimentacao.proteina} 
                  carboidrato={protocol.alimentacao.carboidrato} 
                  gordura={protocol.alimentacao.gordura} 
                />

                <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Suplementação</span>
                    <span className="font-semibold text-brand-emerald">{protocol.suplementos.length} cápsulas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meta recomendada</span>
                    <strong className="text-gray-800 dark:text-gray-200">{protocol.alimentacao.calorias} kcal/dia</strong>
                  </div>
                </div>
              </div>

              {/* Consultation Countdown details */}
              <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-xs text-gray-700 dark:text-gray-200">Revisão com Clínico</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Dr. Silva · Rio de Janeiro</p>
                </div>
                <button 
                  onClick={() => alert('Presença confirmada no consultório médico.')}
                  className="bg-brand-emerald text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all cursor-pointer"
                >
                  Confirmar Presença
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      )}

      {/* DAILY LOG SYSTEM FORM (TELA 7) */}
      {view === 'registrar' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-brand-card-dark p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800/80 text-left max-w-2xl mx-auto space-y-6"
        >
          <div>
            <span className="text-[10px] uppercase text-brand-emerald font-bold tracking-widest block">A evolução do dia</span>
            <h2 className="font-serif text-xl md:text-2xl font-bold dark:text-white mt-0.5">Preencher Meu Registro Diário</h2>
            <p className="text-xs text-gray-400">Mantenha seu nutrólogo Dr. Silva atualizado sobre seu desempenho</p>
          </div>

          <form onSubmit={handleSaveDailyLog} className="space-y-6">
            
            {/* Sec 1: Supp check list */}
            <div className="space-y-3.5">
              <span className="text-xs font-bold text-gray-400 uppercase block">1. Suplementos Ingeridos Hoje</span>
              
              <div className="space-y-2">
                {protocol.suplementos.map((supp, idx) => {
                  const hasTaken = checkedSupps.includes(supp.nome);
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleToggleSupplement(supp.nome)}
                      className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                        hasTaken 
                          ? 'bg-emerald-500/5 border-emerald-500/10' 
                          : 'bg-gray-50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center ${
                          hasTaken ? 'bg-brand-emerald border-brand-emerald text-white' : 'bg-white dark:bg-brand-dark'
                        }`}>
                          {hasTaken && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <strong className="text-xs text-gray-750 dark:text-gray-200">{supp.nome}</strong>
                          <span className="text-[10px] text-gray-400 block mt-0.5">Tomado pela: {supp.horario}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{supp.dose}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sec 2: Alimentacao cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase block">2. Aderência Alimentar</span>
              <p className="text-xs text-gray-400">Você seguiu as calorias e restrições prescritas?</p>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                {(['Sim', 'Parcialmente', 'Não'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormSeguiuDieta(opt)}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      formSeguiuDieta === opt 
                        ? 'bg-brand-emerald/15 border-brand-emerald ring-1 ring-brand-emerald' 
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                    }`}
                  >
                    <span className="font-bold text-xs">{opt}</span>
                  </button>
                ))}
              </div>

              {/* Water amount */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500 font-medium">Hidratação do Dia</span>
                  <span className="font-mono text-brand-emerald font-bold">{formAgua} ml</span>
                </div>
                <input 
                  type="range" min="500" max="5000" step="250"
                  value={formAgua}
                  onChange={(e) => setFormAgua(Number(e.target.value))}
                  className="w-full accent-brand-emerald rounded h-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Sec 3: Humor slider and Hunger */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-gray-400 uppercase block">3. Humor e Disposições Biológicas</span>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Como está se sentindo hoje?</label>
                  <MoodSlider value={formHumor} onChange={setFormHumor} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium">Nível de Energia</span>
                      <span className="font-mono font-bold text-brand-emerald">{formEnergia}%</span>
                    </div>
                    <input 
                      type="range" min="10" max="100" step="5"
                      value={formEnergia}
                      onChange={(e) => setFormEnergia(Number(e.target.value))}
                      className="w-full accent-brand-emerald h-1 rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium font-serif">Saturação / Fome</span>
                      <span className="font-mono font-bold text-amber-500">Nível {formFome} de 5</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" step="1"
                      value={formFome}
                      onChange={(e) => setFormFome(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Symptom chips */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase block">4. Sintomas Fisiológicos</span>
              <div className="flex flex-wrap gap-1.5">
                {['Inchaço', 'Gases', 'Dolorido', 'Enjoo', 'Cefaleia', 'Indisposto', 'Excelente'].map((sym) => {
                  const hasSym = formSintomas.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => handleToggleSymptom(sym)}
                      className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold transition-all ${
                        hasSym 
                          ? 'bg-red-500/10 text-red-650 border-red-500/20 ring-1 ring-red-500/30' 
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Peso */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Peso Verificado Hoje (kg)</span>
                <input 
                  type="number" step="0.1" required
                  value={formPeso}
                  onChange={(e) => setFormPeso(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs font-mono font-semibold"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Praticou Treino Previsto?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormExFeito(true)}
                    className={`flex-1 text-[11px] font-bold py-2 rounded-lg border ${
                      formExfeito 
                        ? 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald' 
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400'
                    }`}
                  >
                    Sim, treinei
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormExFeito(false)}
                    className={`flex-1 text-[11px] font-bold py-2 rounded-lg border ${
                      !formExfeito 
                        ? 'bg-red-500/10 text-red-500 border-red-500/25' 
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>

            {/* Observações texto livre */}
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Notas ou Dúvidas para o Médico</span>
              <textarea 
                rows={2}
                placeholder="Ex e observações adicionais..."
                value={formObs}
                onChange={(e) => setFormObs(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-3 text-xs text-gray-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-emerald text-white rounded-xl py-3 w-full font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 shadow-center text-xs md:text-sm"
            >
              ✓ SALVAR REGISTRO DO DIA
            </button>
          </form>
        </motion.div>
      )}

      {/* EVOLUATION ANALYTICS (TELA 8) */}
      {view === 'evolucao' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="space-y-6 text-left"
        >
          <div>
            <h1 className="font-serif text-2xl font-bold dark:text-white">Gráficos de Evolução Nutrológica</h1>
            <p className="text-xs text-gray-400">Dados gerados a partir do histórico de registros e pesagem</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Gráfico de Peso */}
            <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
              <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100 mb-3.5">Curva Ponderal Histórica</h3>
              <LineChart 
                weights={EVOLUCAO_DEMO.pesos} 
                labels={EVOLUCAO_DEMO.datas} 
                targetWeight={patient.pesoMeta} 
              />
            </div>

            {/* Gráfico de Adesão Semanal */}
            <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
              <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100 mb-3.5">Adesão Clínica Semanal (%)</h3>
              <BarChart 
                values={EVOLUCAO_DEMO.adesao_semanal} 
                labels={['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12']} 
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real Correlation Info */}
            <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs md:col-span-2">
              <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100 mb-3 block">Relação Humor vs. Consistência</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                As estatísticas revelam que nos dias em que a ingestão de suplementos atinge <strong>100%</strong>, seus índices de energia autorregulado sobem em média para <strong>82%</strong>, com menor taxa de sintomas como cefaleia e indisposição gástrica.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-semibold">
                <div className="p-3 bg-gray-50 dark:bg-gray-905 rounded-lg">
                  <span className="text-gray-400 text-[10px] block uppercase">Disposição Média</span>
                  <span className="text-brand-emerald text-sm font-mono font-bold block mt-1">⚡ 8.6 / 10</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-905 rounded-lg">
                  <span className="text-gray-400 text-[10px] block uppercase">Taxa de Sucesso Alimentar</span>
                  <span className="text-brand-emerald text-sm font-mono font-bold block mt-1">🥗 84% de foco</span>
                </div>
              </div>
            </div>

            {/* Achievements and trophies */}
            <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs col-span-1">
              <h3 className="font-serif text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 block flex items-center gap-1.5">
                <Award className="w-4.5 h-4.5 text-amber-500" /> Minhas Conquistas
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-sm shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-700 dark:text-gray-200">Primeira Semana</h4>
                    <span className="text-[10px] text-gray-400 font-medium">Desbloqueado · 100% registros</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-sm shrink-0">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-750 dark:text-gray-300">Meta de -5kg</h4>
                    <span className="text-[10px] text-gray-400 font-medium">Em progresso · 60% concluído</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-sm shrink-0 font-bold text-amber-500 text-[10px]">
                    🔥30
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-750 dark:text-gray-300">Constância Máxima</h4>
                    <span className="text-[10px] text-gray-500 font-medium">Streak 12 de 30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PATIENT DIRECT MESSAGES CHAT (TELA 8 SECONDARY CHAT) */}
      {view === 'mensagens' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-brand-card-dark p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800/85 text-left max-w-2xl mx-auto space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-105 dark:border-gray-800">
            <div>
              <span className="text-[9px] uppercase text-brand-emerald font-bold tracking-widest block">Mensagens Diretas</span>
              <h2 className="font-serif text-lg font-bold dark:text-white leading-tight">Painel com Dr. Silva</h2>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-brand-emerald px-2 py-0.5 rounded font-bold font-mono">ONLINE</span>
          </div>

          <div className="h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl flex flex-col gap-3">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  chat.sender === 'paciente' 
                    ? 'bg-brand-emerald text-white self-end rounded-br-none shadow-xs' 
                    : 'bg-white dark:bg-brand-card-dark text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800/80 self-start rounded-bl-none shadow-xs'
                }`}
              >
                <p>{chat.text}</p>
                <span className="text-[8px] opacity-70 block text-right mt-1.5 font-mono">{chat.time}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input 
              type="text" 
              placeholder="Digite sua dúvida ou relato para o Dr. Silva..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-xs md:text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-emerald"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-brand-emerald hover:bg-emerald-600 text-white rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" /> Enviar
            </button>
          </div>
        </motion.div>
      )}

      {/* EXPLICIT VIEW MY ACTIVE TREATMENT DIET PROTOCOL DETAILS */}
      {view === 'protocolo' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-brand-card-dark p-6 rounded-2xl border border-gray-105 dark:border-gray-800 text-left max-w-2xl mx-auto space-y-6"
        >
          <div className="border-b border-gray-100 dark:border-gray-800/80 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[10px] bg-brand-emerald/10 text-brand-emerald px-2 py-0.5 rounded font-bold uppercase tracking-wider block inline-block mb-1.5">Meu Protocolo</span>
              <h2 className="font-serif text-xl font-bold text-gray-850 dark:text-gray-100 leading-tight">{protocol.nome}</h2>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Revisão em {protocol.revisao}</span>
          </div>

          {/* Caloric & macros targets */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-3">
            <h4 className="font-bold text-xs uppercase text-gray-450 tracking-wider">Diretrizes da Nutrição Clínica</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-200">Janela Alimentar Recomendada:</span>
              <strong className="text-brand-emerald font-mono">{protocol.alimentacao.janela}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-200">Distribuição Energética Alvo:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">{protocol.alimentacao.calorias} kcal/dia</span>
            </div>
            
            <MacroPieChart 
              proteina={protocol.alimentacao.proteina} 
              carboidrato={protocol.alimentacao.carboidrato} 
              gordura={protocol.alimentacao.gordura} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Foods Allowed */}
            <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <h4 className="font-bold text-xs text-brand-emerald uppercase mb-2">🌿 Alimentos Recomendados</h4>
              <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-200">
                {protocol.alimentacao.permitidos.map((x, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" /> {x}
                  </li>
                ))}
              </ul>
            </div>

            {/* Foods Rested */}
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
              <h4 className="font-bold text-xs text-red-500 uppercase mb-2">🛑 Evitar / Restringir</h4>
              <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-200">
                {protocol.alimentacao.proibidos.map((x, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exercises physical */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-xs uppercase text-gray-500 tracking-wider block mb-1">🏃 Rotina de Atividade Física</h4>
            <div className="flex justify-between">
              <span className="text-gray-400">Prática recomendada:</span>
              <strong className="text-gray-800 dark:text-gray-100">{protocol.exercicios.tipo}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Regularidade:</span>
              <strong className="text-gray-800 dark:text-gray-100">{protocol.exercicios.frequencia}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Volume & Intensidade:</span>
              <strong className="text-brand-emerald font-semibold">{protocol.exercicios.intensidade}</strong>
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
};
