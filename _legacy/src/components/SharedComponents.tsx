import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Flame, 
  ChevronRight, 
  User, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart as ReChartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as ReChartsTooltip, 
  CartesianGrid, 
  BarChart as ReChartsBarChart, 
  Bar, 
  Cell, 
  PieChart as ReChartsPieChart, 
  Pie 
} from 'recharts';
import { Patient, Supplement } from '../types';

// 1. ANIMATED COUNTER
export const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string; duration?: number }> = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 1500 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (value - startValue) + startValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className="font-mono text-xl md:text-2xl font-semibold tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
};

// 2. PROGRESS BAR
export const ProgressBar: React.FC<{ percentage: number; color?: string; className?: string }> = ({ 
  percentage, 
  color = 'bg-brand-emerald', 
  className = "h-2" 
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`${color} h-full transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
      />
    </div>
  );
};

// 3. HEATMAP CALENDAR
export const HeatmapCalendar: React.FC<{ activity?: number[] }> = ({ activity }) => {
  // 30 days representation (last 30 days)
  // 1 = registered everything, 0.5 = partial, 0 = missed
  const defaultActivity = activity || [
    1, 1, 1, 0, 1, 0.5, 1,
    1, 1, 1, 1, 0, 0.5, 1,
    1, 1, 0.5, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1
  ];

  return (
    <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl shadow-xs border border-gray-100 dark:border-gray-800/60">
      <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5" /> Controle de Adesão (Últimos 30 dias)
        </span>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-xs bg-gray-100 dark:bg-gray-800" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/20" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/50" />
          <div className="w-2.5 h-2.5 rounded-xs bg-brand-emerald" />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {defaultActivity.map((val, idx) => {
          let bgColor = 'bg-gray-100 dark:bg-gray-800 hover:scale-110';
          let tooltip = 'Sem registro';
          if (val === 1) {
            bgColor = 'bg-brand-emerald hover:brightness-110 shadow-xs shadow-emerald-400/20';
            tooltip = 'Registro completo';
          } else if (val === 0.5) {
            bgColor = 'bg-emerald-500/40 hover:bg-emerald-500/50';
            tooltip = 'Registro parcial';
          } else if (val === 0) {
            bgColor = 'bg-red-500/10 border border-red-500/20 dark:bg-red-500/5 hover:bg-red-500/15';
            tooltip = 'Não registrado';
          }

          return (
            <div 
              key={idx} 
              className={`h-7 rounded-sm flex items-center justify-center text-[10px] font-mono transition-all duration-300 relative group cursor-pointer ${bgColor}`}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded-md whitespace-nowrap z-50 pointer-events-none">
                {tooltip} (Dia {idx + 1})
              </span>
              <span className="text-gray-400/80 group-hover:text-white pointer-events-none">{idx + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. STREAK BADGE
export const StreakBadge: React.FC<{ count: number; theme?: 'light' | 'dark' }> = ({ count, theme = 'light' }) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-semibold select-none border border-amber-500/20">
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Flame className="w-4 h-4 fill-amber-500" />
      </motion.div>
      <span className="font-mono">{count} DIAS SEGUIDOS</span>
    </div>
  );
};

// 5. STATUS BADGE
export const StatusBadge: React.FC<{ status: 'ativo' | 'alerta' | 'inativo' | string }> = ({ status }) => {
  const normalized = status.toLowerCase();
  if (normalized === 'ativo') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-brand-emerald border border-brand-emerald/20">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" /> Ativo
      </span>
    );
  } else if (normalized === 'alerta') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Alerta
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" /> Inativo
      </span>
    );
  }
};

// 6. PATIENT CARD
export const PatientCard: React.FC<{ patient: Patient; onClick: () => void }> = ({ patient, onClick }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAdherenceColor = (pct: number) => {
    if (pct >= 70) return 'bg-brand-emerald';
    if (pct >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getAdherenceTextClass = (pct: number) => {
    if (pct >= 70) return 'text-brand-emerald';
    if (pct >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white dark:bg-brand-card-dark rounded-xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              {getInitials(patient.nome)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base leading-tight">
                {patient.nome}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{patient.idade} anos · {patient.objetivo}</p>
            </div>
          </div>
          <StatusBadge status={patient.status} />
        </div>

        <div className="space-y-3.5 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Adesão do Protocolo</span>
              <span className={`font-mono font-semibold ${getAdherenceTextClass(patient.adesao)}`}>
                {patient.adesao}%
              </span>
            </div>
            <ProgressBar percentage={patient.adesao} color={getAdherenceColor(patient.adesao)} className="h-1.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-lg border border-gray-100/50 dark:border-gray-800/50">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">Atual</span>
              <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-200">{patient.pesoAtual}kg</span>
            </div>
            <div className="border-l border-gray-200/50 dark:border-gray-800">
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">Meta</span>
              <span className="font-mono text-sm font-semibold text-brand-emerald">{patient.pesoMeta}kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-gray-100/60 dark:border-gray-800/60 text-xs">
        <span className="text-gray-400">Atividade: <strong className="text-gray-600 dark:text-gray-300 font-medium">{patient.ultimoRegistro}</strong></span>
        <button className="text-brand-emerald font-semibold flex items-center gap-0.5 group hover:text-emerald-500 transition-colors">
          Perfil <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

// 7. STEPPER_FORM
export const StepperForm: React.FC<{ steps: string[]; currentStep: number }> = ({ steps, currentStep }) => {
  return (
    <div className="mb-6 select-none">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${
                idx < currentStep 
                  ? 'bg-brand-emerald text-white' 
                  : idx === currentStep 
                    ? 'bg-brand-emerald/10 border-2 border-brand-emerald text-brand-emerald font-bold' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[10px] md:text-xs mt-1 font-medium transition-colors ${
                idx <= currentStep ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>

            {/* Step line separator */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-100 dark:bg-gray-800 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-brand-emerald transition-all duration-500" 
                  style={{ width: idx < currentStep ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// 8. EXAMES STATUS BAR
export const ExamTracker: React.FC<{ examName: string; value: string; status: 'normal' | 'atencao' | 'alterado'; refRange: string }> = ({
  examName,
  value,
  status,
  refRange
}) => {
  const getBadgeClass = () => {
    if (status === 'normal') return 'bg-emerald-500/10 text-brand-emerald border-emerald-500/10';
    if (status === 'atencao') return 'bg-amber-500/10 text-amber-500 border-amber-500/10';
    return 'bg-red-500/10 text-red-500 border-red-500/10';
  };

  const getLightIndicator = () => {
    if (status === 'normal') return 'bg-brand-emerald';
    if (status === 'atencao') return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/50 dark:border-gray-800/50">
      <div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getLightIndicator()}`} />
          <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-200 leading-tight">{examName}</h4>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">Ref: {refRange}</p>
      </div>
      <div className="text-right">
        <span className="font-mono font-bold text-sm text-gray-800 dark:text-gray-100">{value}</span>
        <div className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 mt-1 rounded border inline-block ml-2 ${getBadgeClass()}`}>
          {status}
        </div>
      </div>
    </div>
  );
};

// 9. SUPPLEMENT CHECKLIST (Interactive)
export const SupplementChecklist: React.FC<{ 
  supplements: Supplement[];
  checkedList: string[];
  onToggle: (name: string) => void;
  showAllInfo?: boolean;
}> = ({ supplements, checkedList, onToggle, showAllInfo = true }) => {
  return (
    <div className="space-y-2">
      {supplements.map((supp, index) => {
        const isChecked = checkedList.includes(supp.nome);
        return (
          <div 
            key={index}
            onClick={() => onToggle(supp.nome)}
            className={`flex items-start justify-between p-3.5 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
              isChecked 
                ? 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-500/5 dark:border-brand-emerald/30 shadow-xs' 
                : 'bg-white dark:bg-brand-card-dark border-gray-100 dark:border-gray-800/80 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                isChecked 
                  ? 'bg-brand-emerald border-brand-emerald text-white scale-110 shadow-xs' 
                  : 'bg-white dark:bg-brand-dark border-gray-200 dark:border-gray-700'
              }`}>
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <span className={`font-semibold text-xs ${
                  isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'
                }`}>
                  {supp.nome}
                </span>
                <span className="text-[10px] ml-1 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.2 rounded-md">
                  {supp.dose}
                </span>
                {showAllInfo && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 leading-tight block">⏰ {supp.horario}</span>
                    {supp.obs && (
                      <span className="text-[10px] text-amber-500 font-medium">✨ {supp.obs}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-0.5">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                supp.horario === 'jejum' ? 'bg-amber-400' :
                supp.horario === 'manhã' ? 'bg-orange-400' :
                supp.horario === 'almoço' ? 'bg-emerald-400' :
                'bg-blue-400'
              }`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 10. MACRO PIE CHART
export const MacroPieChart: React.FC<{ proteina: number; carboidrato: number; gordura: number }> = ({
  proteina,
  carboidrato,
  gordura
}) => {
  const data = [
    { name: 'Proteína', value: proteina, color: '#00C896' },
    { name: 'Carboidrato', value: carboidrato, color: '#4F8EF7' },
    { name: 'Gordura', value: gordura, color: '#FFB830' }
  ];

  return (
    <div className="flex items-center gap-4 py-1.5">
      <div className="w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <ReChartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={44}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </ReChartsPieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-1.5 flex-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-500 font-medium">{item.name}</span>
            </div>
            <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 11. MOOD SLIDER (PREMIUM)
export const MoodSlider: React.FC<{ value: number; onChange: (val: number) => void }> = ({
  value,
  onChange
}) => {
  const moodEmojis = [
    { emoji: '😴', label: 'Exausto', val: 1 },
    { emoji: '😟', label: 'Cansado', val: 2 },
    { emoji: '😐', label: 'Normal', val: 3 },
    { emoji: '🙂', label: 'Bem', val: 4 },
    { emoji: '⚡', label: 'Energizado', val: 5 }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-1.5">
        {moodEmojis.map((mood) => (
          <button
            key={mood.val}
            type="button"
            onClick={() => onChange(mood.val)}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 select-none ${
              value === mood.val 
                ? 'bg-brand-emerald/10 border-brand-emerald scale-110 shadow-xs ring-1 ring-brand-emerald' 
                : 'bg-white dark:bg-brand-card-dark border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-900/30'
            }`}
          >
            <span className="text-xl md:text-2xl mb-1">{mood.emoji}</span>
            <span className={`text-[9px] font-semibold ${value === mood.val ? 'text-brand-emerald' : 'text-gray-400'}`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 12. CONGRATULATORY MODAL WITH DYNAMIC CONFETTI
export const CongratulatoryModal: React.FC<{ isOpen: boolean; onClose: () => void; title?: string; message?: string }> = ({
  isOpen,
  onClose,
  title = "Excelente Progresso!",
  message = "Seu registro diário foi preenchido com sucesso e seu streak foi atualizado!"
}) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      const colors = ['#00C896', '#00A67E', '#4F8EF7', '#FFB830', '#FF4757', '#9D4EDD'];
      const genParticles = Array.from({ length: 40 }).map((_, idx) => ({
        id: idx,
        x: Math.random() * 100, // percentage left
        y: Math.random() * -30 - 10, // above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      }));
      setParticles(genParticles);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950"
          />

          {/* Confetti Container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[51]">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: `${p.y}%`, x: `${p.x}%`, rotate: 0, opacity: 1 }}
                animate={{ 
                  y: '110%', 
                  x: `${p.x + (Math.random() * 20 - 10)}%`, 
                  rotate: 360,
                  opacity: [1, 1, 0] 
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1.5, 
                  delay: p.delay,
                  ease: "easeOut" 
                }}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                }}
              />
            ))}
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-white dark:bg-brand-card-dark rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-800 text-center relative z-52"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-brand-emerald/10">
              <Sparkles className="w-8 h-8 text-brand-emerald fill-brand-emerald/10 animate-pulse" />
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2">
              {title}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              {message}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-brand-emerald text-white rounded-xl py-3 font-semibold hover:bg-emerald-600 active:scale-98 transition-all duration-200 outline-none flex items-center justify-center gap-1 shadow-sm hover:shadow shadow-emerald-500/10"
            >
              Confirmar Registro <Check className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 13. LINE CHART WITH RECHARTS
export const LineChart: React.FC<{ weights: number[]; labels: string[]; targetWeight?: number }> = ({
  weights,
  labels,
  targetWeight = 70
}) => {
  const data = labels.map((label, index) => ({
    name: label,
    peso: weights[index] || 80,
    meta: targetWeight
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800/60" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 10 }} 
          />
          <YAxis 
            domain={['dataMin - 2', 'dataMax + 2']} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 10 }} 
          />
          <ReChartsTooltip 
            contentStyle={{ 
              backgroundColor: '#1E293B', 
              border: 'none', 
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '11px',
              fontFamily: 'monospace'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="peso" 
            stroke="#00C896" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 1 }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="meta" 
            stroke="#94A3B8" 
            strokeDasharray="4 4" 
            strokeWidth={1.5} 
            dot={false} 
          />
        </ReChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 14. BAR CHART WITH RECHARTS
export const BarChart: React.FC<{ values: number[]; labels: string[] }> = ({
  values,
  labels
}) => {
  const data = labels.map((label, index) => ({
    name: label,
    adesao: values[index] !== undefined ? values[index] : 75
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800/60" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 10 }} 
          />
          <YAxis 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 10 }} 
          />
          <ReChartsTooltip 
            contentStyle={{ 
              backgroundColor: '#1E293B', 
              border: 'none', 
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '11px',
              fontFamily: 'monospace'
            }} 
          />
          <Bar dataKey="adesao" radius={[4, 4, 0, 0]} barSize={16}>
            {data.map((entry, index) => {
              const val = entry.adesao;
              let fillVal = '#00C896'; // verde >80
              if (val < 50) fillVal = '#FF4757'; // vermelho <50
              else if (val < 80) fillVal = '#FFB830'; // ambar 50-80
              
              return <Cell key={`cell-${index}`} fill={fillVal} />;
            })}
          </Bar>
        </ReChartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
