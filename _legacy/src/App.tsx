import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  CreditCard,
  Clipboard
} from 'lucide-react';
import { PACIENTES, PROTOCOLO_DEMO, AGENDA_DEMO, REGISTROS_DIARIOS_DEMO, MOCK_CHATS } from './demoData';
import { Patient, Protocol, Consulta, DiárioRegistro } from './types';
import { DoctorViews } from './components/DoctorViews';
import { PatientViews } from './components/PatientViews';
import { getOfflineHtml } from './offlineHtmlContent';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'medico' | 'paciente'>('medico');
  const [username, setUsername] = useState<string>('dr@nutra.com');
  const [password, setPassword] = useState<string>('demo');
  const [loginRoleSelected, setLoginRoleSelected] = useState<'medico' | 'paciente'>('medico');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  // Synchronized clinical database state
  const [patients, setPatients] = useState<Patient[]>(PACIENTES);
  const [protocol, setProtocol] = useState<Protocol>(PROTOCOLO_DEMO);
  const [agenda, setAgenda] = useState<Consulta[]>(AGENDA_DEMO);
  const [dailyLogs, setDailyLogs] = useState<DiárioRegistro[]>(REGISTROS_DIARIOS_DEMO);
  const [chats, setChats] = useState<{ id: number; sender: string; text: string; time: string }[]>(MOCK_CHATS);

  // Nav views state
  // Doctor views: 'dashboard' | 'pacientes' | 'paciente-perfil' | 'novo-protocolo' | 'agenda' | 'planos'
  // Patient views: 'inicio' | 'protocolo' | 'registrar' | 'evolucao' | 'mensagens'
  const [doctorView, setDoctorView] = useState<string>('dashboard');
  const [patientView, setPatientView] = useState<string>('inicio');
  const [currentPatientId, setCurrentPatientId] = useState<number>(1); // Ana Costa by default

  // Dark mode effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Standalone HTML Downloader for user convenience
  const handleDownloadHTML = () => {
    try {
      const htmlString = getOfflineHtml();
      const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nutra_clinica_standalone.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erro ao baixar o HTML autônomo", e);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setTimeout(() => {
      setUserRole(loginRoleSelected);
      setIsLoggedIn(true);
      setLoggingIn(false);
      // Reset default view depending on role
      if (loginRoleSelected === 'medico') {
        setDoctorView('dashboard');
      } else {
        setPatientView('inicio');
      }
    }, 700);
  };

  const bypassLoginDemo = (role: 'medico' | 'paciente') => {
    setLoggingIn(true);
    setTimeout(() => {
      setUserRole(role);
      setIsLoggedIn(true);
      setLoggingIn(false);
      if (role === 'medico') {
        setDoctorView('dashboard');
      } else {
        setPatientView('inicio');
      }
    }, 400);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const activePatientForPatientPortal = patients.find(p => p.id === 1) || patients[0]; // Ana Costa simulation

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0D1117] text-gray-100' : 'bg-[#F8F9FC] text-gray-800'}`}>
      
      {/* 1. LOGIN SCREEN (TELA 1) */}
      {!isLoggedIn ? (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Premium Branding and Quote Banner */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-emerald-600 to-[#00A67E] text-white p-12 flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4F8EF7] rounded-full blur-3xl opacity-15 -ml-20 -mb-20" />
            
            <div className="relative z-10">
              <span className="font-mono text-xs tracking-wider uppercase bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-white font-bold inline-block">
                SAAS NUTRIÇÃO CLÍNICA
              </span>
              <div className="mt-10">
                <h1 className="font-serif text-5xl font-black leading-tight tracking-tight drop-shadow-sm select-none">
                  NUTRA
                </h1>
                <p className="text-xs font-mono font-medium tracking-widest text-emerald-200 mt-1 uppercase">
                  Ciência com Elegância
                </p>
              </div>
            </div>

            <div className="relative z-10 max-w-sm space-y-4">
              <p className="font-serif text-xl italic font-semibold leading-relaxed text-emerald-50">
                "Uma ferramenta de alto padrão projetada para médicos nutrólogos que priorizam a precisão e buscam fidelizar pacientes de alta performance."
              </p>
              <div>
                <strong className="block text-sm font-bold">Dr. Alexandre Silva</strong>
                <span className="text-xs text-emerald-200">Embaixador NUTRA & Nutrólogo Esportivo</span>
              </div>
            </div>

            <div className="relative z-10 text-xs text-emerald-100 font-mono font-medium">
              NUTRA © {new Date().getFullYear()} · Plataforma de Nutrição Clínica Avançada
            </div>
          </div>

          {/* Right Column: Forms Panel */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 md:px-14 py-12 relative">
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                onClick={handleDownloadHTML}
                title="Baixar Versão HTML Offline"
                className="flex items-center gap-1.5 px-3 py-2 bg-brand-emerald text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-600 transition-all cursor-pointer"
              >
                <Clipboard className="w-3.5 h-3.5" /> Baixar HTML Offline
              </button>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 bg-gray-105 dark:bg-gray-800 rounded-xl hover:scale-105 active:scale-95 transition-all text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            <div className="max-w-md w-full mx-auto space-y-8">
              <div>
                <span className="lg:hidden text-brand-emerald font-serif text-2xl font-black tracking-tight">NUTRA</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mt-3 md:mt-0">
                  Bem-vindo à medicina de precisão
                </h2>
                <p className="text-xs text-gray-400 mt-1.5">Escolha seu perfil técnico abaixo para entrar no sistema de apoio clínico</p>
              </div>

              {/* Login profile choice badges */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLoginRoleSelected('medico')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                    loginRoleSelected === 'medico'
                      ? 'bg-emerald-500/10 border-brand-emerald text-brand-emerald ring-1 ring-brand-emerald'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  🩺 Médico / Nutrólogo
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRoleSelected('paciente')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                    loginRoleSelected === 'paciente'
                      ? 'bg-emerald-500/10 border-brand-emerald text-brand-emerald ring-1 ring-brand-emerald'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  👤 Paciente Atendido
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">E-mail Cadastrado</label>
                  <input
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs md:text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
                    placeholder="dr@nutra.com ou paciente@nutra.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Senha de Segurança</label>
                    <a href="#reset" className="text-[10px] text-gray-400 hover:text-brand-emerald">Esqueci a senha?</a>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2.5 text-xs md:text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-brand-emerald transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full bg-brand-emerald text-white font-bold rounded-xl py-3 text-xs md:text-sm tracking-wide hover:bg-emerald-600 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {loggingIn ? (
                    <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                  ) : "Acessar Plataforma Técnica"}
                </button>
              </form>

              {/* Demo Credentials quick login */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-3 text-center">Acesso Rápido para Degustação (Demo)</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('dr@nutra.com');
                      bypassLoginDemo('medico');
                    }}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs py-2 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    🩺 Demo Médico
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('paciente@nutra.com');
                      bypassLoginDemo('paciente');
                    }}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs py-2 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    👤 Demo Paciente
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[10px] text-gray-400">Suporte Técnico: <strong>suporte@nutra.com.br</strong></span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* IS LOGGED IN */
        <div className="flex flex-col min-h-screen">
          
          {/* HEADER BAR (COMMON) */}
          <header className="sticky top-0 z-40 bg-white/75 dark:bg-brand-card-dark/75 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
              
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => {
                if (userRole === 'medico') setDoctorView('dashboard');
                else setPatientView('inicio');
              }}>
                <span className="w-8 h-8 rounded-lg bg-brand-emerald flex items-center justify-center text-white font-bold shadow-sm shadow-emerald-500/25 text-sm">N</span>
                <div>
                  <h1 className="font-serif text-base font-black tracking-tight leading-none dark:text-white">NUTRA</h1>
                  <span className="text-[9px] text-gray-400 tracking-widest font-mono uppercase block mt-0.5">CLI ADVANCED</span>
                </div>
              </div>

              {/* Right utility items */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadHTML}
                  title="Baixar Versão HTML Offline"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-brand-emerald text-white text-[11px] font-bold rounded-xl shadow-xs hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  <Clipboard className="w-3.5 h-3.5" /> Baixar HTML Offline
                </button>

                <span className="hidden sm:inline-block text-[11px] font-mono text-gray-400 uppercase bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-805 px-2 py-1 rounded">
                  PORTAL: {userRole === 'medico' ? 'Doutor Silva 🩺' : 'Ana Costa 👤'}
                </span>

                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-850 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button 
                  onClick={handleSignOut}
                  title="Sair da Conta"
                  className="p-2 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          </header>

          {/* TWO MAIN LAYOUT SYSTEMS (MEDICAL VS PATIENT PORTAL) */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 pb-24 md:pb-12">
            
            {/* PORTAL DO MÉDICO LAYOUT (DESKTOP SIDEBAR + CONTENT VIEWS) */}
            {userRole === 'medico' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Desktop Sidebar Navigation */}
                <aside className="lg:col-span-3 space-y-1 bg-white dark:bg-brand-card-dark p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.01)] text-left">
                  <div className="pb-2.5 border-b border-black/[0.04] dark:border-white/[0.05] mb-2.5 ml-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Menu do Nutrólogo</span>
                    <span className="text-[9px] text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded font-extrabold uppercase">SaaS</span>
                  </div>

                  <button
                    onClick={() => setDoctorView('dashboard')}
                    className={`w-full text-left font-bold text-[11px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
                      doctorView === 'dashboard'
                        ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
                        : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>📊</span> Visão Geral Dashboard
                  </button>

                  <button
                    onClick={() => setDoctorView('pacientes')}
                    className={`w-full text-left font-bold text-[11px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
                      doctorView === 'pacientes' || doctorView === 'paciente-perfil'
                        ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
                        : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>👥</span> Pacientes Clínicos ({patients.length})
                  </button>

                  <button
                    onClick={() => {
                      setDoctorView('novo-protocolo');
                    }}
                    className={`w-full text-left font-bold text-[11px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
                      doctorView === 'novo-protocolo'
                        ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
                        : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>➕</span> Prescrever Protocolo
                  </button>

                  <button
                    onClick={() => setDoctorView('agenda')}
                    className={`w-full text-left font-bold text-[11px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
                      doctorView === 'agenda'
                        ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
                        : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>📅</span> Agenda Consultas ({agenda.length})
                  </button>

                  <button
                    onClick={() => setDoctorView('planos')}
                    className={`w-full text-left font-bold text-[11px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
                      doctorView === 'planos'
                        ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
                        : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <span>💳</span> Planos e Assinatura
                  </button>
                </aside>

                {/* Main doctor content container (9 cols) */}
                <div className="lg:col-span-9">
                  <DoctorViews 
                    patients={patients}
                    setPatients={setPatients}
                    currentPatientId={currentPatientId}
                    setCurrentPatientId={setCurrentPatientId}
                    view={doctorView}
                    setView={setDoctorView}
                    protocol={protocol}
                    setProtocol={setProtocol}
                    agenda={agenda}
                    setAgenda={setAgenda}
                    chats={chats}
                    setChats={setChats}
                  />
                </div>

              </div>
            ) : (
              /* PORTAL DO PACIENTE LAYOUT (BOTTOM NAV FIXED ON MOBILE, STICKY ON DESKTOP) */
              <div className="space-y-6">
                
                <PatientViews 
                  patient={activePatientForPatientPortal}
                  setPatient={(p) => {
                    // Update patient at index for syncing
                    setPatients(prev => prev.map(old => old.id === p.id ? p : old));
                  }}
                  patients={patients}
                  setPatients={setPatients}
                  protocol={protocol}
                  view={patientView}
                  setView={setPatientView}
                  dailyLogs={dailyLogs}
                  setDailyLogs={setDailyLogs}
                  chats={chats}
                  setChats={setChats}
                />

                {/* STICKY BOTTOM NAVIGATION BAR FOR PATIENTS (MOBILE MOBILE-FIRST AS MANDATED) */}
                <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-brand-card-dark border-t border-gray-100 dark:border-gray-800/80 px-4 py-2 flex justify-around items-center">
                  <button 
                    onClick={() => setPatientView('inicio')}
                    className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      patientView === 'inicio' ? 'text-brand-emerald scale-105' : 'text-gray-400 hover:text-gray-605'
                    }`}
                  >
                    <span className="text-lg">🏠</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider">Início</span>
                  </button>

                  <button 
                    onClick={() => setPatientView('protocolo')}
                    className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      patientView === 'protocolo' ? 'text-brand-emerald scale-105' : 'text-gray-400 hover:text-gray-605'
                    }`}
                  >
                    <Clipboard className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Protocolo</span>
                  </button>

                  {/* Highlighted registrar central button */}
                  <button 
                    onClick={() => setPatientView('registrar')}
                    className={`flex flex-col items-center justify-center -mt-6 w-12 h-12 bg-brand-emerald text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all select-none scale-110 border-4 border-white dark:border-[#0D1117]`}
                  >
                    <Plus className="w-5 h-5 stroke-[3]" />
                  </button>

                  <button 
                    onClick={() => setPatientView('evolucao')}
                    className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      patientView === 'evolucao' ? 'text-brand-emerald scale-105' : 'text-gray-400 hover:text-gray-650'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Evolução</span>
                  </button>

                  <button 
                    onClick={() => setPatientView('mensagens')}
                    className={`flex flex-col items-center gap-1 cursor-pointer transition-all relative ${
                      patientView === 'mensagens' ? 'text-brand-emerald scale-105' : 'text-gray-400 hover:text-gray-650'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Chat</span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  </button>
                </footer>

              </div>
            )}

            {/* TELA 9: PLANOS E ASSINATURA SAAS (VISÃO MÉDICA INTEGRADA) */}
            {userRole === 'medico' && doctorView === 'planos' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-6 text-left"
              >
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-emerald tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full inline-block">Plataforma SaaS Premium</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-black dark:text-white mt-1">Planos de Assinatura para Médicos</h2>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Escaneie e selecione o plano de apoio clínico adequado ao volume de pacientes em seu consultório. Suporte técnico premium garantido.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
                  
                  {/* SOLO */}
                  <div className="bg-white dark:bg-brand-card-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">Solo</span>
                      <strong className="font-serif text-2xl font-bold block mt-2 dark:text-gray-100">R$ 197 <span className="text-xs text-gray-400 font-sans">/mês</span></strong>
                      <p className="text-xs text-gray-500 mt-2">Ideal para profissionais em início de atendimento particular.</p>
                      
                      <ul className="space-y-3 mt-6 text-xs text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Até 30 pacientes ativos</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Protocolos ilimitados</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Aplicativo completo do paciente</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Suporte técnico permanente por e-mail</li>
                      </ul>
                    </div>

                    <a 
                      href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20assinar%20o%20plano%20Solo%20do%20SaaS%20NUTRA"
                      target="_blank" referrerPolicy="no-referrer"
                      className="mt-8 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-center text-xs py-3 rounded-xl font-bold hover:bg-brand-emerald hover:text-white transition-all block cursor-pointer"
                    >
                      Assinar Plano Solo
                    </a>
                  </div>

                  {/* CLINICA (Recomendado) */}
                  <div className="bg-white dark:bg-brand-card-dark rounded-2xl p-6 border-2 border-brand-emerald shadow-md relative flex flex-col justify-between transform lg:-translate-y-2">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-emerald text-white text-[9px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase">
                      MAIS RECOMENDADO ⭐
                    </span>
                    
                    <div>
                      <span className="text-xs font-bold text-emerald-500 block uppercase">Clínica</span>
                      <strong className="font-serif text-3xl font-black block mt-2 dark:text-gray-50">R$ 397 <span className="text-xs text-gray-400 font-sans">/mês</span></strong>
                      <p className="text-xs text-gray-500 mt-2">Perfeito para consultórios médicos com alto fluxo de pacientes ou clínicas.</p>
                      
                      <ul className="space-y-3 mt-6 text-xs text-gray-750 dark:text-gray-200">
                        <li className="flex items-center gap-2 font-semibold"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Pacientes ILIMITADOS</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Até 3 médicos credenciados</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Relatórios PDF de análises corporais</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Integração de agenda técnica</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Suporte prioritário via WhatsApp</li>
                      </ul>
                    </div>

                    <a 
                      href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20assinar%20o%2520plano%2520Clinica%2520da%2520plataforma%252520NUTRA"
                      target="_blank" referrerPolicy="no-referrer"
                      className="mt-8 bg-brand-emerald text-white text-center text-xs py-3 rounded-xl font-bold hover:bg-emerald-650 transition-all block cursor-pointer shadow-sm shadow-emerald-500/10"
                    >
                      Assinar Plano Clínica
                    </a>
                  </div>

                  {/* PREMIUM / WHITE LABEL */}
                  <div className="bg-white dark:bg-brand-card-dark rounded-2xl p-6 border border-gray-105 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">Premium</span>
                      <strong className="font-serif text-2xl font-bold block mt-2 dark:text-gray-100">R$ 697 <span className="text-xs text-gray-400 font-sans">/mês</span></strong>
                      <p className="text-xs text-gray-500 mt-2">Para marcas de relevância nacional interessadas em identidade própria.</p>
                      
                      <ul className="space-y-3 mt-6 text-xs text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Tudo incluso de Clínica</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> White-label (Uso de marca própria)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Custom API para integrações de laboratórios</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Relatórios de evolução auxiliados por IA</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-emerald shrink-0" /> Suporte VIP 24h dedicado</li>
                      </ul>
                    </div>

                    <a 
                      href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20consultar%20sobre%20o%20plano%20Premium%20White%20Label%20do%20SaaS%20NUTRA!"
                      target="_blank" referrerPolicy="no-referrer"
                      className="mt-8 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-center text-xs py-3 rounded-xl font-bold hover:bg-brand-emerald hover:text-white transition-all block cursor-pointer"
                    >
                      Consultar Nutra Premium
                    </a>
                  </div>

                </div>

                {/* Patient accounts are always free warning */}
                <div className="max-w-md mx-auto text-center text-xs text-gray-400 pt-6">
                  <span>Nota de cortesia: o aplicativo de acesso do paciente é <strong>sempre 100% gratuito</strong> e habilitado mediante convite do médico credenciado.</span>
                </div>
              </motion.div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
