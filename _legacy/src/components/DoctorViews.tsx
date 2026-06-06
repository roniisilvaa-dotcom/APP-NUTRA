import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Plus, 
  FileText, 
  User as UserIcon, 
  Phone, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Search, 
  Filter, 
  Activity, 
  ArrowLeft, 
  MessageSquare, 
  Trash2, 
  Save, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  AnimatedCounter, 
  ProgressBar, 
  HeatmapCalendar, 
  StreakBadge, 
  StatusBadge, 
  PatientCard, 
  StepperForm, 
  ExamTracker, 
  MacroPieChart, 
  LineChart,
  CongratulatoryModal
} from './SharedComponents';
import { Patient, Protocol, Supplement, Consulta } from '../types';
import { EXAMES_DEMO, EVOLUCAO_DEMO } from '../demoData';

interface DoctorViewsProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  currentPatientId: number;
  setCurrentPatientId: (id: number) => void;
  view: string;
  setView: (v: string) => void;
  protocol: Protocol;
  setProtocol: React.Dispatch<React.SetStateAction<Protocol>>;
  agenda: Consulta[];
  setAgenda: React.Dispatch<React.SetStateAction<Consulta[]>>;
  chats: { id: number; sender: string; text: string; time: string }[];
  setChats: React.Dispatch<React.SetStateAction<{ id: number; sender: string; text: string; time: string }[]>>;
}

export const DoctorViews: React.FC<DoctorViewsProps> = ({
  patients,
  setPatients,
  currentPatientId,
  setCurrentPatientId,
  view,
  setView,
  protocol,
  setProtocol,
  agenda,
  setAgenda,
  chats,
  setChats
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'ativo' | 'alerta' | 'inativo'>('todos');
  
  // New patient modal state
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nome: '', idade: 30, objetivo: 'Emagrecimento', pesoAtual: 80, pesoMeta: 70
  });

  // Protocol creation form state
  const [protocolFormStep, setProtocolFormStep] = useState(0);
  const [newProtocol, setNewProtocol] = useState<Protocol>({
    nome: 'Protocolo Personalizado',
    inicio: new Date().toISOString().split('T')[0],
    revisao: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    suplementos: [
      { nome: 'Vitamina D3', dose: '2000 UI', horario: 'manhã', obs: 'Tomar pós-refeição', ativo: true },
      { nome: 'Ômega 3', dose: '1g', horario: 'almoço', obs: '', ativo: true }
    ],
    alimentacao: {
      calorias: 2000,
      proteina: 30,
      carboidrato: 40,
      gordura: 30,
      janela: '10:00 - 20:00',
      permitidos: ['Ovos', 'Frango', 'Brócolis', 'Abacate', 'Castanhas'],
      proibidos: ['Doces', 'Farinha de trigo', 'Refrigerantes'],
      orientacoes: 'Beber 3.5 litros de água diariamente.'
    },
    exercicios: { frequencia: '3x por semana', tipo: 'Musculação combinada', intensidade: 'Moderada' },
    exames: ['Hemograma', 'Perfil Lipídico', 'Glicemia', 'TSH']
  });

  const [newSupp, setNewSupp] = useState({ nome: '', dose: '', horario: 'manhã' as any, obs: '' });
  const [newPermChip, setNewPermChip] = useState('');
  const [newProibChip, setNewProibChip] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Active chat inputs
  const [chatInput, setChatInput] = useState('');

  const activePatient = patients.find(p => p.id === currentPatientId) || patients[0];

  // Calculated KPI stats
  const totalPatients = patients.length;
  const activeCount = patients.filter(p => p.status === 'ativo').length;
  const alertCount = patients.filter(p => p.status === 'alerta').length;
  const avgAdherence = Math.round(patients.reduce((acc, p) => acc + p.adesao, 0) / (totalPatients || 1));

  const handleAddNewPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.nome) return;
    const added: Patient = {
      id: patients.length + 1,
      nome: newPatient.nome,
      idade: Number(newPatient.idade),
      objetivo: newPatient.objetivo,
      pesoAtual: Number(newPatient.pesoAtual),
      pesoMeta: Number(newPatient.pesoMeta),
      pesoInicio: Number(newPatient.pesoAtual),
      adesao: 100,
      status: 'ativo',
      ultimoRegistro: 'hoje',
      cpf: '000.000.000-00',
      contato: '(11) 99999-8888',
      proximaConsulta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tipoConsulta: 'Presencial',
      genero: 'Feminino',
      dataInicio: new Date().toISOString().split('T')[0]
    };
    setPatients([added, ...patients]);
    setShowAddPatient(false);
    setNewPatient({ nome: '', idade: 30, objetivo: 'Emagrecimento', pesoAtual: 80, pesoMeta: 70 });
  };

  const handleSaveProtocol = () => {
    setProtocol(newProtocol);
    // Update the active patient protocol adesao rate simulated
    setPatients(prev => prev.map(p => {
      if (p.id === currentPatientId) {
        return { ...p, objetivo: newProtocol.nome, adesao: 100 };
      }
      return p;
    }));
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      setView('paciente-perfil');
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChats([...chats, { id: chats.length + 1, sender: 'medico', text: chatInput, time: 'Agora' }]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showSavedToast && (
          <CongratulatoryModal 
            isOpen={showSavedToast} 
            onClose={() => setShowSavedToast(false)} 
            title="Protocolo Publicado!"
            message={`O "${newProtocol.nome}" foi criado com sucesso e enviado ao app de ${activePatient.nome}!`}
          />
        )}
      </AnimatePresence>

      {/* DASHBOARD VIEW (TELA 2) */}
      {view === 'dashboard' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          {/* Header Dashboard Medico */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-left">
                Bom dia, Dr. Silva
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Plataforma ativa · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setShowAddPatient(true)}
                className="bg-brand-emerald text-white text-xs px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 hover:bg-emerald-600 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Novo Paciente
              </button>
              <button 
                onClick={() => {
                  setProtocolFormStep(0);
                  setView('novo-protocolo');
                }}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <FileText className="w-4 h-4" /> Novo Protocolo
              </button>
            </div>
          </div>

          {/* KPI Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="kpi-card">
              <span className="kpi-label">Pacientes Ativos</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="kpi-value">
                  <AnimatedCounter value={totalPatients} />
                </span>
                <span className="text-[10px] text-brand-emerald font-bold">médicos</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">✨ +2 adicionados esta semana</div>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Consultas Hoje</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="kpi-value text-amber-500">
                  <AnimatedCounter value={agenda.length} />
                </span>
                <span className="text-[10px] text-amber-500 font-bold">agenda</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">🕒 Próxima consulta em 30 min</div>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Protocolos Ativos</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="kpi-value">
                  <AnimatedCounter value={totalPatients - 1} />
                </span>
                <span className="text-[10px] text-brand-emerald font-bold">ativos</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">📋 5 aguardando consulta</div>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Adesão Média</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="kpi-value">
                  <AnimatedCounter value={avgAdherence} suffix="%" />
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold">Geral</span>
              </div>
              <div className="mt-1">
                <ProgressBar percentage={avgAdherence} color="bg-brand-emerald" className="h-1" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Horizontal Adherence Chart */}
            <div className="section-card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-100">
                  Adesão de Pacientes ao Protocolo
                </h3>
                <span className="text-[10px] bg-brand-emerald/10 text-brand-emerald px-2 py-0.5 rounded font-bold uppercase">Últimos Registrados</span>
              </div>

              <div className="space-y-4">
                {patients.map((p) => {
                  let badgeColor = 'bg-brand-emerald';
                  let textColor = 'text-brand-emerald';
                  if (p.adesao < 40) {
                    badgeColor = 'bg-red-500';
                    textColor = 'text-red-500';
                  } else if (p.adesao < 70) {
                    badgeColor = 'bg-amber-500';
                    textColor = 'text-amber-500';
                  }

                  return (
                    <div 
                      key={p.id} 
                      className="group cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all font-sans"
                      onClick={() => {
                        setCurrentPatientId(p.id);
                        setView('paciente-perfil');
                      }}
                    >
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-emerald transition-colors">{p.nome}</span>
                        <span className={`font-mono font-bold ${textColor}`}>{p.adesao}% adesão</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ProgressBar percentage={p.adesao} color={badgeColor} className="h-1.5 flex-1" />
                        <span className="text-[9px] text-gray-400 font-mono shrink-0">{p.ultimoRegistro}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Alerts Right */}
            <div className="space-y-4 col-span-1">
              <div className="section-card">
                <h3 className="font-serif text-md font-bold text-gray-800 dark:text-gray-100 mb-3.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" /> Alertas da Plataforma
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-500/5 rounded-xl border border-red-100 dark:border-red-500/15">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-red-800 dark:text-red-400">Ana Costa está sem registrar</h4>
                        <p className="text-[10px] text-red-600 dark:text-red-300 mt-1">Nenhum registro nos últimos 5 dias.</p>
                        <button 
                          onClick={() => {
                            setCurrentPatientId(1);
                            setView('paciente-perfil');
                          }}
                          className="mt-2 text-[10px] font-bold text-red-700 dark:text-red-300 underline block cursor-pointer"
                        >
                          Verificar Perfil
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-500/15">
                    <div className="flex gap-2 items-start">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-amber-800 dark:text-amber-400">Carlos Lima em alerta</h4>
                        <p className="text-[10px] text-amber-600 dark:text-amber-300 mt-1">Adesão acumulada caiu para 45% esta semana.</p>
                        <button 
                          onClick={() => {
                            setCurrentPatientId(2);
                            setView('paciente-perfil');
                          }}
                          className="mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-300 underline block"
                        >
                          Enviar Mensagem
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 dark:bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-500/15">
                    <div className="flex gap-2 items-start">
                      <Sparkles className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-400">Maria Santos progredindo</h4>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-300 mt-1">Atingiu 91% de adesão aos suplementos diários.</p>
                        <span className="inline-block mt-2 text-[10px] bg-brand-emerald/10 text-brand-emerald px-1.5 py-0.5 rounded font-mono font-bold">🔥 Streak 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Agenda */}
          <div className="section-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-100">
                Agenda de Consultas Hoje
              </h3>
              <button 
                onClick={() => setView('agenda')}
                className="text-xs text-brand-emerald font-bold hover:underline"
              >
                Gerenciar Agenda ({agenda.length})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agenda.map((item) => (
                <div 
                  key={item.id}
                  className="consult-card justify-between font-sans"
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar bg-emerald-500/10 text-brand-emerald">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100 leading-none">{item.pacienteNome}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.horario}h · <span className={`font-semibold ${item.tipo === 'Online' ? 'text-blue-500' : 'text-purple-500'}`}>{item.tipo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button 
                      onClick={() => {
                        const originalPatient = patients.find(p => p.nome === item.pacienteNome);
                        if (originalPatient) {
                          setCurrentPatientId(originalPatient.id);
                        }
                        setView('paciente-perfil');
                      }}
                      className="text-[10px] text-brand-emerald font-bold bg-white dark:bg-brand-dark px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-emerald-500/5 cursor-pointer leading-none text-center"
                    >
                      Protocolo
                    </button>
                    <button 
                      onClick={() => {
                        alert(`Iniciando chamada para ${item.pacienteNome} (${item.tipo})`);
                      }}
                      className="text-[10px] text-white font-bold bg-brand-emerald px-2.5 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors leading-none text-center shadow-xs"
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* PATIENTS LIST VIEW (TELA 3) */}
      {view === 'pacientes' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50">
                Lista de Pacientes Acompanhados
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">Gerenciamento ativo dos seus pacientes e adesão clínica</p>
            </div>
            
            <button 
              onClick={() => setShowAddPatient(true)}
              className="bg-brand-emerald text-white text-xs px-4 py-3 rounded-xl font-bold flex items-center gap-1.5 hover:bg-emerald-600 transition-all shadow-sm shrink-0 self-start"
            >
              <Plus className="w-4 h-4" /> Cadastrar Novo Paciente
            </button>
          </div>

          {/* Search bar & Filters */}
          <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-brand-card-dark p-3 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input 
                type="text" 
                placeholder="Buscar pelo nome do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['todos', 'ativo', 'alerta', 'inativo'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`text-[10px] md:text-xs px-3 py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    filterStatus === status 
                      ? 'bg-brand-emerald text-white shadow-xs' 
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/70'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients
              .filter(p => {
                const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesFilter = filterStatus === 'todos' || p.status === filterStatus;
                return matchesSearch && matchesFilter;
              })
              .map((p) => (
                <PatientCard 
                  key={p.id} 
                  patient={p} 
                  onClick={() => {
                    setCurrentPatientId(p.id);
                    setView('paciente-perfil');
                  }} 
                />
              ))
            }
          </div>
        </motion.div>
      )}

      {/* PATIENT COMPLEX PROFILE VIEW (TELA 4) */}
      {view === 'paciente-perfil' && activePatient && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="space-y-6 text-left"
        >
          {/* Back Action Bar */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('pacientes')}
              className="p-2 bg-white dark:bg-brand-card-dark rounded-xl border border-gray-100 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] uppercase text-brand-emerald font-bold tracking-widest block">Canal do Médico</span>
              <h2 className="font-serif text-xl md:text-2xl font-bold dark:text-white flex items-center gap-2">
                {activePatient.nome} <StatusBadge status={activePatient.status} />
              </h2>
            </div>
          </div>

          {/* Two Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COLUMN LEFT: Info & Metrics (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Detailed Identification Card */}
              <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100">Ficha Clínico-Cadastral</h3>
                  <span className="text-[11px] font-mono text-gray-400">ID: #{activePatient.id}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Gênero</span>
                    <strong className="text-gray-700 dark:text-gray-200">{activePatient.genero || 'Feminino'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Idade</span>
                    <strong className="text-gray-700 dark:text-gray-200">{activePatient.idade} anos</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">CPF</span>
                    <strong className="text-gray-700 dark:text-gray-200 font-mono">{activePatient.cpf}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Contato Celular</span>
                    <strong className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" /> {activePatient.contato}
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Acompanhamento</span>
                    <strong className="text-gray-700 dark:text-gray-200">Desde {activePatient.dataInicio}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Próxima Consulta</span>
                    <strong className="text-brand-emerald">{activePatient.proximaConsulta} ({activePatient.tipoConsulta})</strong>
                  </div>
                </div>
              </div>

              {/* Physical Metrics with Chart */}
              <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100">Evolução do Peso Corporal</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">Desempenho comparado a meta terapêutica</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-gray-400 block">Restam</span>
                    <strong className="font-mono text-brand-emerald font-bold">{(activePatient.pesoAtual - activePatient.pesoMeta).toFixed(1)} kg</strong>
                  </div>
                </div>

                <LineChart 
                  weights={EVOLUCAO_DEMO.pesos} 
                  labels={EVOLUCAO_DEMO.datas} 
                  targetWeight={activePatient.pesoMeta} 
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-center">
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/50 dark:border-gray-850">
                    <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Peso Inicial</span>
                    <strong className="font-mono text-sm block mt-1 text-gray-700 dark:text-gray-200">{activePatient.pesoInicio} kg</strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/50 dark:border-gray-850">
                    <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Peso Atual</span>
                    <strong className="font-mono text-sm block mt-1 text-gray-900 dark:text-white">{activePatient.pesoAtual} kg</strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/50 dark:border-gray-850">
                    <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider font-semibold">Humor Médio</span>
                    <strong className="text-sm block mt-1 text-gray-700 dark:text-gray-200">😄 Bom (4/5)</strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/50 dark:border-gray-850">
                    <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Adesão Total</span>
                    <strong className="font-mono text-sm block mt-1 text-brand-emerald">{activePatient.adesao}%</strong>
                  </div>
                </div>
              </div>

              {/* Lab Exams Semaphores */}
              <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-base font-bold text-gray-800 dark:text-gray-100">Exames Bioquímicos Recentes</h3>
                  <span className="text-[10px] text-gray-400 font-mono">Último recebido: 12/05/2026</span>
                </div>

                <div className="space-y-2">
                  {EXAMES_DEMO.map((exam, i) => (
                    <ExamTracker 
                      key={i} 
                      examName={exam.nome} 
                      value={exam.valor} 
                      status={exam.status as any} 
                      refRange={exam.ref} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN RIGHT: Active Protocol & Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Interactive Calendar Compliance Heatmap */}
              <HeatmapCalendar />

              {/* Protocol Details */}
              <div className="bg-white dark:bg-brand-card-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[9px] text-brand-emerald font-bold tracking-widest block uppercase">Presidência Terapêutica</span>
                    <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-100">{protocol.nome}</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setNewProtocol(protocol);
                      setProtocolFormStep(0);
                      setView('novo-protocolo');
                    }}
                    className="text-[10px] bg-emerald-500/10 text-brand-emerald border border-brand-emerald/20 px-2.5 py-1.5 rounded-lg hover:bg-brand-emerald hover:text-white transition-colors cursor-pointer"
                  >
                    Editar Protocolo
                  </button>
                </div>

                <div className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800/60 pb-3 flex justify-between">
                  <span>Prescrito em {protocol.inicio}</span>
                  <span>Avaliação programada: {protocol.revisao}</span>
                </div>

                {/* Diet Section */}
                <div className="py-4 border-b border-gray-100 dark:border-gray-800/60">
                  <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-3">🥦 Plano Alimentar Base</h4>
                  
                  <MacroPieChart 
                    proteina={protocol.alimentacao.proteina} 
                    carboidrato={protocol.alimentacao.carboidrato} 
                    gordura={protocol.alimentacao.gordura} 
                  />

                  <div className="mt-3 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-[10px] block uppercase">Meta Calórica</span>
                      <strong className="text-gray-800 dark:text-gray-200 mt-0.5 block">{protocol.alimentacao.calorias} kcal/dia</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-[10px] block uppercase">Janela Alimentar</span>
                      <strong className="text-gray-800 dark:text-gray-200 mt-0.5 block">{protocol.alimentacao.janela}</strong>
                    </div>
                  </div>
                </div>

                {/* Supplements Section */}
                <div className="py-4 border-b border-gray-100 dark:border-gray-800/60">
                  <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-3">💊 Suplementação Prescrita</h4>
                  
                  <div className="space-y-2">
                    {protocol.suplementos.map((supp, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-900/60 rounded-lg border border-gray-100/50 dark:border-gray-800"
                      >
                        <div>
                          <span className="font-bold text-xs text-gray-800 dark:text-gray-200">{supp.nome}</span>
                          <p className="text-[10px] text-gray-400 mt-0.5">Dose: {supp.dose} · Horário: <span className="font-semibold text-brand-emerald">{supp.horario}</span></p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={supp.ativo !== false} 
                          onChange={(e) => {
                            const updated = [...protocol.suplementos];
                            updated[i].ativo = e.target.checked;
                            setProtocol({ ...protocol, suplementos: updated });
                          }}
                          className="accent-brand-emerald w-4 h-4 rounded cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercises Section */}
                <div className="pt-4 space-y-3">
                  <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-wide">🏃 Exercício Físico Planejado</h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block">Frequência</span>
                      <strong className="text-gray-700 dark:text-gray-250 mt-1 block">{protocol.exercicios.frequencia}</strong>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block">Tipo</span>
                      <strong className="text-gray-700 dark:text-gray-250 mt-1 block truncate leading-tight">{protocol.exercicios.tipo}</strong>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block">Intensidade</span>
                      <strong className="text-brand-emerald mt-1 block">{protocol.exercicios.intensidade}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Chat Support Section with Doctor */}
              <div className="bg-white dark:bg-brand-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 shadow-xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-emerald" /> Canal Direto com o Paciente
                </h3>

                <div className="h-44 overflow-y-auto bg-gray-50 dark:bg-gray-900/70 p-3 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`max-w-[80%] p-2 rounded-xl text-xs ${
                        chat.sender === 'medico' 
                          ? 'bg-brand-emerald text-white self-end rounded-br-none' 
                          : 'bg-white dark:bg-brand-card-dark text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800 self-start rounded-bl-none'
                      }`}
                    >
                      <p className="leading-relaxed">{chat.text}</p>
                      <span className="text-[8px] opacity-70 block text-right mt-1 font-mono">{chat.time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Sua mensagem como Dr. Silva..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-emerald focus:ring-inset"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-brand-emerald hover:bg-emerald-600 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      )}

      {/* CREATE NEW PROTOCOL STEPPER FORM (TELA 5) */}
      {view === 'novo-protocolo' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-brand-card-dark p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-xs max-w-3xl mx-auto text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('paciente-perfil')}
                className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-800 dark:text-gray-100">Prescrever Novo Protocolo</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Definindo metas biológica para {activePatient.nome}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-brand-emerald">Passo {protocolFormStep + 1} de 5</span>
          </div>

          {/* Stepper Wizard Indicator */}
          <StepperForm 
            steps={['Gerais', 'Suplementos', 'Dieta', 'Métricas', 'RevisarPreset']} 
            currentStep={protocolFormStep}
          />

          {/* STEP 1: GENERALS */}
          {protocolFormStep === 0 && (
            <div className="space-y-4 py-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome do Protocolo</label>
                <input 
                  type="text" 
                  value={newProtocol.nome}
                  onChange={(e) => setNewProtocol({ ...newProtocol, nome: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs md:text-sm text-gray-800 dark:text-white focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Data de Início</label>
                  <input 
                    type="date" 
                    value={newProtocol.inicio}
                    onChange={(e) => setNewProtocol({ ...newProtocol, inicio: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs text-gray-800 dark:text-white focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Próxima Revisão</label>
                  <input 
                    type="date" 
                    value={newProtocol.revisao}
                    onChange={(e) => setNewProtocol({ ...newProtocol, revisao: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs text-gray-800 dark:text-white focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Meta / Objetivo Principal</label>
                <select 
                  value={newProtocol.alimentacao.orientacoes}
                  onChange={(e) => setNewProtocol({ ...newProtocol, alimentacao: { ...newProtocol.alimentacao, orientacoes: e.target.value } })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800"
                >
                  <option value="Emagrecimento Rápido com Preservação de Massa Magra">Emagrecimento com Preservação de Massa Magra</option>
                  <option value="Hipertrofia Miofibrilar e Ganho Dinâmico de Força">Ganho de Massa Muscular e Massa Magra (Hipertrofia)</option>
                  <option value="Regulação Metabólica e Remissão de Resistência à Insulina">Saúde Metabólica & Controle Insulinêmico</option>
                  <option value="Modulação Lipídica com Foco Cardiovascular">Longevidade e Diminuição Cardiovascular</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: SUPPLEMENTS */}
          {protocolFormStep === 1 && (
            <div className="space-y-4 py-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase">Suplementos Inclusos ({newProtocol.suplementos.length})</h3>
              
              <div className="space-y-2">
                {newProtocol.suplementos.map((supp, index) => (
                  <div key={index} className="flex justify-between items-center p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="font-bold text-xs text-gray-700 dark:text-gray-200">{supp.nome}</span>
                      <p className="text-[10px] text-gray-400 mt-0.5">Dose: {supp.dose} · Tomar: <span className="text-brand-emerald font-semibold">{supp.horario}</span> {supp.obs ? `· ${supp.obs}` : ''}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setNewProtocol({
                          ...newProtocol,
                          suplementos: newProtocol.suplementos.filter((_, idx) => idx !== index)
                        });
                      }}
                      className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add form supplement fields */}
              <div className="border border-dashed border-gray-200 dark:border-gray-800 p-4 rounded-xl space-y-3.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">✨ Adicionar Medicamento / Suplemento</span>
                
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Nome (Ex: Vitamina D3, Melatonina)" 
                      value={newSupp.nome}
                      onChange={(e) => setNewSupp({ ...newSupp, nome: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-3 py-2 text-xs text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Dose (Ex: 2000 UI, 5mg)" 
                      value={newSupp.dose}
                      onChange={(e) => setNewSupp({ ...newSupp, dose: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-3 py-2 text-xs text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <select
                    value={newSupp.horario}
                    onChange={(e) => setNewSupp({ ...newSupp, horario: e.target.value as any })}
                    className="bg-gray-50 dark:bg-gray-900 text-xs rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 border-none focus:outline-none"
                  >
                    <option value="jejum">Jejum (Manhã)</option>
                    <option value="manhã">Manhã (Pós-café)</option>
                    <option value="almoço">Almoço</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Jantar</option>
                    <option value="antes de dormir">Antes de Dormir</option>
                  </select>

                  <input 
                    type="text" 
                    placeholder="Orientação (Ex: Evitar Cálcio)" 
                    value={newSupp.obs}
                    onChange={(e) => setNewSupp({ ...newSupp, obs: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-3 py-2 text-xs text-gray-800 dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newSupp.nome || !newSupp.dose) return;
                    setNewProtocol({
                      ...newProtocol,
                      suplementos: [...newProtocol.suplementos, { ...newSupp, ativo: true }]
                    });
                    setNewSupp({ nome: '', dose: '', horario: 'manhã', obs: '' });
                  }}
                  className="bg-brand-emerald text-white text-[11px] px-3 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 w-full hover:bg-emerald-600 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Incluir Prescrição
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DIET */}
          {protocolFormStep === 2 && (
            <div className="space-y-4 py-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Calorias Diárias (kcal)</label>
                  <input 
                    type="number" 
                    value={newProtocol.alimentacao.calorias}
                    onChange={(e) => setNewProtocol({
                      ...newProtocol,
                      alimentacao: { ...newProtocol.alimentacao, calorias: Number(e.target.value) }
                    })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2 text-xs md:text-sm text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Janela Alimentar</label>
                  <input 
                    type="text" 
                    value={newProtocol.alimentacao.janela}
                    onChange={(e) => setNewProtocol({
                      ...newProtocol,
                      alimentacao: { ...newProtocol.alimentacao, janela: e.target.value }
                    })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2 text-xs md:text-sm text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Slider macro distribution */}
              <div className="space-y-3.5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Distribuição de Macronutrientes</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-mono font-semibold">
                    <span>Proteínas: {newProtocol.alimentacao.proteina}%</span>
                    <span>Carbs: {newProtocol.alimentacao.carboidrato}%</span>
                    <span>Gorduras: {newProtocol.alimentacao.gordura}%</span>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400">Proteína Targets</span>
                      <input 
                        type="range" min="10" max="60" step="5"
                        value={newProtocol.alimentacao.proteina}
                        onChange={(e) => setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, proteina: Number(e.target.value) }
                        })}
                        className="w-full accent-brand-emerald h-1 rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400">Carboidratos</span>
                      <input 
                        type="range" min="10" max="60" step="5"
                        value={newProtocol.alimentacao.carboidrato}
                        onChange={(e) => setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, carboidrato: Number(e.target.value) }
                        })}
                        className="w-full accent-blue-500 h-1  rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chips adding alimentos permitidos */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Alimentos Fortemente Recomendados</span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {newProtocol.alimentacao.permitidos.map((p, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-emerald-500/10 text-brand-emerald text-[10px] px-2.5 py-1 rounded-lg">
                      {p} 
                      <button 
                        type="button" 
                        onClick={() => setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, permitidos: newProtocol.alimentacao.permitidos.filter((_, idx) => idx !== i) }
                        })}
                        className="text-emerald-500 font-bold hover:text-emerald-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Adicionar permitido (Pressione Enter)"
                    value={newPermChip}
                    onChange={(e) => setNewPermChip(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (!newPermChip.trim()) return;
                        setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, permitidos: [...newProtocol.alimentacao.permitidos, newPermChip.trim()] }
                        });
                        setNewPermChip('');
                      }
                    }}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Chips adding alimentos proibidos */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Alimentos Restritos / Proibidos</span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {newProtocol.alimentacao.proibidos.map((p, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-red-500/10 text-red-500 text-[10px] px-2.5 py-1 rounded-lg">
                      {p}
                      <button 
                        type="button"
                        onClick={() => setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, proibidos: newProtocol.alimentacao.proibidos.filter((_, idx) => idx !== i) }
                        })}
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Adicionar proibido (Pressione Enter)"
                    value={newProibChip}
                    onChange={(e) => setNewProibChip(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (!newProibChip.trim()) return;
                        setNewProtocol({
                          ...newProtocol,
                          alimentacao: { ...newProtocol.alimentacao, proibidos: [...newProtocol.alimentacao.proibidos, newProibChip.trim()] }
                        });
                        setNewProibChip('');
                      }
                    }}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TRACKING CLINIC */}
          {protocolFormStep === 3 && (
            <div className="space-y-5 py-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Exames solicitados ao paciente</span>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Hemograma completo', 'Glicemia em Jejum', 'Colesterol completo', 'Insulina de jejum', 'TSH', 'Vitamina D', 'Creatinina sérica', 'Cortisol basal'].map((exam) => {
                  const hasExam = newProtocol.exames.includes(exam);
                  return (
                    <label key={exam} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={hasExam}
                        onChange={() => {
                          const updated = hasExam 
                            ? newProtocol.exames.filter(e => e !== exam) 
                            : [...newProtocol.exames, exam];
                          setNewProtocol({ ...newProtocol, exames: updated });
                        }}
                        className="accent-brand-emerald w-4 h-4 rounded"
                      />
                      <span className="font-semibold text-gray-700 dark:text-gray-200">{exam}</span>
                    </label>
                  );
                })}
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Treinos e Atividade Física Prescritas</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <input 
                    type="text" placeholder="Freq (Ex: 5x/sem)" 
                    value={newProtocol.exercicios.frequencia}
                    onChange={(e) => setNewProtocol({ ...newProtocol, exercicios: { ...newProtocol.exercicios, frequencia: e.target.value } })}
                    className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg text-xs"
                  />
                  <input 
                    type="text" placeholder="Prática (Ex: Musculação)" 
                    value={newProtocol.exercicios.tipo}
                    onChange={(e) => setNewProtocol({ ...newProtocol, exercicios: { ...newProtocol.exercicios, tipo: e.target.value } })}
                    className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg text-xs"
                  />
                  <input 
                    type="text" placeholder="Esforço (Ex: Alta)" 
                    value={newProtocol.exercicios.intensidade}
                    onChange={(e) => setNewProtocol({ ...newProtocol, exercicios: { ...newProtocol.exercicios, intensidade: e.target.value } })}
                    className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW CONSOLIDATED */}
          {protocolFormStep === 4 && (
            <div className="space-y-4 py-3 text-xs md:text-sm">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1.5">
                <span className="text-brand-emerald font-bold block uppercase text-[10px]">Paciente Destinatário</span>
                <strong className="text-gray-800 dark:text-gray-100 text-base block">{activePatient.nome} ({activePatient.idade} anos)</strong>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Objetivo clínico de referência: <span className="font-semibold text-brand-emerald">{activePatient.objetivo}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-[10px] uppercase text-gray-400 font-bold block">Dieta Diária</span>
                  <strong className="text-gray-800 dark:text-gray-200 block text-xs mt-1">{newProtocol.alimentacao.calorias} kcal · Macros: {newProtocol.alimentacao.proteina}/{newProtocol.alimentacao.carboidrato}/{newProtocol.alimentacao.gordura}</strong>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-[10px] uppercase text-gray-400 font-bold block font-mono">Suplementos Inclusos</span>
                  <strong className="text-gray-800 dark:text-gray-200 block text-xs mt-1">{newProtocol.suplementos.length} presenças💊</strong>
                </div>
              </div>

              <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl">
                <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">Medicamentos listados</span>
                <p className="text-gray-650 dark:text-gray-300 font-serif leading-relaxed">
                  {newProtocol.suplementos.map(s => `${s.nome} (${s.dose} @ ${s.horario})`).join(', ') || 'Nenhum'}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl">
                <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">Exames Solicitados</span>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {newProtocol.exames.join(', ') || 'Nenhum exame cadastrado'}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons Stepper */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800/80 mt-6">
            <button
              type="button"
              disabled={protocolFormStep === 0}
              onClick={() => setProtocolFormStep(prev => prev - 1)}
              className="text-xs font-bold text-gray-400 hover:text-gray-700 disabled:opacity-40 cursor-pointer"
            >
              Anterior
            </button>

            {protocolFormStep < 4 ? (
              <button
                type="button"
                onClick={() => setProtocolFormStep(prev => prev + 1)}
                className="bg-brand-emerald text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Próximo Passo
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveProtocol}
                className="bg-brand-emerald text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Salvar & Enviar Paciente
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* CONSULTATION CLINIC AGENDA (TELA médico) */}
      {view === 'agenda' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-brand-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800/80 text-left max-w-4xl mx-auto space-y-6"
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="font-serif text-xl font-bold dark:text-white">Gerenciamento de Consultas Clínicas</h2>
              <p className="text-xs text-gray-400">Configure horários e registre novos atendimentos</p>
            </div>
            
            <button 
              onClick={() => {
                const hour = prompt('Digite o horário do agendamento (Ex: 11:30):', '11:30');
                const name = prompt('Digite o nome do paciente:', 'Clara Mendes');
                if (hour && name) {
                  setAgenda([...agenda, {
                    id: agenda.length + 1,
                    pacienteId: 10,
                    pacienteNome: name,
                    horario: hour,
                    tipo: 'Online',
                    avatar: name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
                  }]);
                }
              }}
              className="bg-brand-emerald text-white text-xs px-3.5 py-2 rounded-lg font-bold hover:bg-emerald-600"
            >
              + Adicionar Horário
            </button>
          </div>

          <div className="space-y-3.5">
            {agenda.map((slot) => (
              <div 
                key={slot.id}
                className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/70 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-brand-emerald font-bold text-sm flex items-center justify-center">
                    {slot.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-700 dark:text-gray-200">{slot.pacienteNome}</h4>
                    <span className="text-[11px] text-gray-400 block mt-0.5">📅 Atendimento Clínico · Confirmado</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono font-bold text-gray-800 dark:text-gray-100 block text-xs md:text-sm">{slot.horario} h</span>
                    <span className="text-[9px] font-bold text-blue-500 uppercase">{slot.tipo}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setAgenda(agenda.filter(a => a.id !== slot.id));
                    }}
                    className="text-gray-450 hover:text-red-500 p-1.5 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* NEW PATIENT MODAL DIALOG */}
      {showAddPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-950/60" onClick={() => setShowAddPatient(false)} />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-white dark:bg-brand-card-dark p-6 rounded-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800 text-left relative z-52"
          >
            <h3 className="font-serif text-lg font-bold dark:text-white mb-4">Cadastrar Novo Paciente</h3>
            
            <form onSubmit={handleAddNewPatient} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Nome Completo</label>
                <input 
                  type="text" required
                  placeholder="Ex: Ana de Sousa"
                  value={newPatient.nome}
                  onChange={(e) => setNewPatient({ ...newPatient, nome: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Idade</label>
                  <input 
                    type="number" required
                    value={newPatient.idade}
                    onChange={(e) => setNewPatient({ ...newPatient, idade: Number(e.target.value) })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Objetivo Clínico</label>
                  <select 
                    value={newPatient.objetivo}
                    onChange={(e) => setNewPatient({ ...newPatient, objetivo: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs text-gray-700 dark:text-gray-200"
                  >
                    <option value="Emagrecimento">Emagrecimento</option>
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Saúde Geral">Saúde Geral</option>
                    <option value="Longevidade">Longevidade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Peso Inicial (kg)</label>
                  <input 
                    type="number" required
                    value={newPatient.pesoAtual}
                    onChange={(e) => setNewPatient({ ...newPatient, pesoAtual: Number(e.target.value) })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Peso Alvo (kg)</label>
                  <input 
                    type="number" required
                    value={newPatient.pesoMeta}
                    onChange={(e) => setNewPatient({ ...newPatient, pesoMeta: Number(e.target.value) })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddPatient(false)}
                  className="flex-1 bg-gray-50 hover:bg-gray-150 text-gray-500 rounded-xl py-2.5 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-brand-emerald hover:bg-emerald-600 text-white rounded-xl py-2.5 text-xs font-bold shadow-sm"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
