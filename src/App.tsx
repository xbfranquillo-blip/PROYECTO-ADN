import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Zap, 
  Microscope, 
  MessageSquare, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  ChevronLeft,
  Menu,
  X,
  Send,
  Loader2,
  Lock,
  ArrowRight,
  Stethoscope,
  Activity,
  Bug,
  Dna,
  ThermometerSnowflake,
  Utensils,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ACADEMIC_DATA, type AcademicEntry } from './types';
import { MicroBackground } from './components/MicroBackground';
import { chatWithAI, generateCaseStudy } from './lib/gemini';

// Components
const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }: any) => {
  // Helper to use Microscope for both but with different nuance
  const microscopeIcon = Microscope;

  const menuItems = [
    { id: 'intro', label: 'Presentación', icon: BookOpen },
    { id: 'inmunidad', label: 'Inmunidad', icon: ShieldCheck },
    { id: 'virus', label: 'Virus', icon: Dna },
    { id: 'bacterias', label: 'Bacterias', icon: Activity },
    { id: 'hongos', label: 'Agentes Fúngicos', icon: ThermometerSnowflake },
    { id: 'parasitos', label: 'Parásitos', icon: Bug },
    { id: 'nutricion', label: 'Nutrición', icon: Utensils },
    { id: 'diagnostico', label: 'Métodos de Diagnóstico', icon: Microscope },
    { id: 'cases', label: 'Laboratorio IA', icon: microscopeIcon },
    { id: 'chat', label: 'Tutor ADN', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 280 : 0 }}
        className={cn(
          "fixed top-0 left-0 h-full bg-emerald-900 border-r border-emerald-800 z-50 overflow-hidden lg:relative lg:w-72",
          !isOpen && "w-0"
        )}
      >
        <div className="flex flex-col h-full w-72">
          <div className="p-6 border-b border-emerald-800/50">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Microscope className="text-emerald-400" />
              ADN
            </h1>
            <p className="text-xs text-emerald-400/60 font-medium mt-1">SISTEMA DE ASISTENCIA EDUCATIVA</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/40" 
                    : "text-emerald-100/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && <motion.div layoutId="active" className="ml-auto"><ChevronRight size={16} /></motion.div>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-emerald-800/50">
            <div className="bg-emerald-800/50 p-4 rounded-xl border border-emerald-700/30">
              <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">BIBLIOGRAFÍA BASE</p>
              <ul className="text-[10px] text-emerald-400/80 mt-2 space-y-1 font-medium">
                <li>• Murray - Microbiología</li>
                <li>• Apt Baruch - Parasitología</li>
                <li>• Oubiña - Virología</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

const Welcome = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="space-y-4">
      <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Bienvenido a PROYECTO ADN</h2>
      <p className="text-lg text-slate-600">
        Agentes de Defensa, Mecanismo y Nutrición. Esta plataforma está diseñada para optimizar tu tiempo de estudio
        mediante la síntesis rigurosa de bibliografía clásica.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
          <BookOpen className="text-indigo-600" /> Metodología
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed font-bold">
          Lectura inmersiva del alumno + Síntesis inteligente del tutor. 
          Enfócate en los mecanismos y la correlación clínica sin perderte en el texto denso.
        </p>
      </div>
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
          <ShieldCheck className="text-indigo-600" /> Inmunidad y Nutrición
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Estudiamos cómo el estado nutricional impacta en los agentes de defensa para combatir patógenos.
          La base de la salud pública moderna.
        </p>
      </div>
    </div>
  </div>
);

const MucosalImmunity = () => {
  return (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-emerald-600" size={24} />
        <h4 className="text-xl font-black text-slate-900">Arquitectura de la Mucosa (GALT)</h4>
      </div>

      <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 overflow-hidden">
        <div className="relative h-64 w-full flex items-end justify-center gap-1">
          {/* Luz Intestinal (Top) */}
          <div className="absolute top-0 left-0 w-full text-center py-2 bg-indigo-50/50 rounded-xl text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            Lumen Intestinal (Bacterias, Antígenos)
          </div>

          {/* Enterocitos */}
          <div className="flex items-end gap-1 flex-1">
             {[1,2,3].map(i => (
               <div key={`ent-l-${i}`} className="flex-1 h-32 bg-white border-x border-t border-slate-200 rounded-t-lg relative group">
                 <div className="absolute -top-1 left-0 w-full h-1 bg-amber-200 rounded-t-sm" title="Microvellosidades" />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-slate-100 rounded-full border border-slate-200" title="Núcleo" />
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">ENTEROCITO</div>
               </div>
             ))}

             {/* Célula M (El centro del aprendizaje) */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex-1 h-24 bg-indigo-50 border-x border-t border-indigo-200 rounded-t-2xl relative shadow-inner"
             >
                <div className="absolute -top-1 left-0 w-full h-1 bg-indigo-200 rounded-t-sm opacity-50" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-600">CÉLULA M</div>
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-indigo-100 flex items-center justify-center shadow-lg z-20">
                   <div className="w-6 h-6 bg-rose-500 rounded-full" title="Célula Dendrítica / LB" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                   <ArrowRight size={12} className="rotate-90 text-indigo-400 animate-bounce" />
                   <span className="text-[8px] font-bold text-indigo-500">TRANSCITOSIS</span>
                </div>
             </motion.div>

             {[1,2,3].map(i => (
               <div key={`ent-r-${i}`} className="flex-1 h-32 bg-white border-x border-t border-slate-200 rounded-t-lg relative group">
                 <div className="absolute -top-1 left-0 w-full h-1 bg-amber-200 rounded-t-sm" />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-slate-100 rounded-full border border-slate-200" />
               </div>
             ))}
          </div>

          {/* Placa de Peyer (Lamina Propria) */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-indigo-600/5 -z-10 rounded-b-xl border-t border-indigo-100 flex items-center justify-center">
             <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Cúpula de Placa de Peyer</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
          <p className="text-xs font-black text-indigo-600 uppercase mb-2">Función Célula M</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Especialistas en <strong>transcitosis de antígenos</strong> desde la luz intestinal hacia la Placa de Peyer. Carecen de microvellosidades densas para facilitar el contacto con patógenos.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
          <p className="text-xs font-black text-emerald-600 uppercase mb-2">Efector: IgA Secretora</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Resistente a proteasas. Neutraliza patógenos e impide su adhesión (Exclusión Inmune) sin activar inflamación agresiva.
          </p>
        </div>
      </div>
    </div>
  );
};

const GroupGeneralities = ({ category }: { category: string }) => {
  const generalities: Record<string, { title: string, content: string, icon: any, color: string }> = {
    'virus': {
      title: 'Generalidades de los Virus',
      icon: Dna,
      color: 'text-indigo-600',
      content: 'Los virus son agentes infecciosos acelulares que consisten en material genético (ADN o ARN) rodeado por una cubierta proteica (cápside) y, en algunos casos, una envoltura lipídica. Son parásitos intracelulares obligados que carecen de metabolismo propio y dependen de la maquinaria celular para su replicación.'
    },
    'bacterias': {
      title: 'Generalidades de las Bacterias',
      icon: Activity,
      color: 'text-emerald-600',
      content: 'Las bacterias son microorganismos procariotas unicelulares. Poseen una pared celular (Gram + o -), carecen de núcleo definido y orgánulos membranosos. Se reproducen por fisión binaria y pueden ser comensales, simbiontes o patógenos productores de toxinas o daño tisular directo.'
    },
    'hongos': {
      title: 'Generalidades de los Hongos',
      icon: ThermometerSnowflake,
      color: 'text-amber-600',
      content: 'Los hongos son organismos eucariotas con una pared celular compuesta de quitina y ergosterol en su membrana. Pueden ser unicelulares (levaduras) o multicelulares (mohos/hifas). Muchos son saprófitos, pero actúan como patógenos oportunistas cuando las barreras del huésped fallan.'
    },
    'parasitos': {
      title: 'Generalidades de los Parásitos',
      icon: Bug,
      color: 'text-rose-600',
      content: 'Los parásitos de interés médico incluyen protozoos (unicelulares) y helmintos (gusanos multicelulares). Requieren de un hospedador para completar su ciclo de vida. Su patogenicidad varía desde la competencia por nutrientes hasta la destrucción de órganos y la modulación de la respuesta inmune crónica.'
    }
  };

  const data = generalities[category];
  if (!data) return null;

  return (
    <div className="mb-8 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-xl bg-slate-50", data.color)}>
          <data.icon size={24} />
        </div>
        <h4 className="text-xl font-black text-slate-900">{data.title}</h4>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed italic">
        {data.content}
      </p>
    </div>
  );
};


const InnateRecognition = () => {
  const elements = [
    {
      title: "PAMPs",
      desc: "Patrones Moleculares Asociados a Patógenos",
      examples: "LPS, Peptidoglicano, ARN bicatenario",
      color: "bg-orange-500",
      lightColor: "bg-orange-50"
    },
    {
      title: "DAMPs",
      desc: "Patrones Moleculares Asociados a Daño",
      examples: "ATP extracelular, Cristales de Urate, HMGB1",
      color: "bg-red-500",
      lightColor: "bg-red-50"
    },
    {
      title: "PRRs (Receptores)",
      desc: "Receptores de Reconocimiento de Patrones",
      examples: "TLR (Membrana), NLR (Citoplasma), RLR (Viral)",
      color: "bg-purple-500",
      lightColor: "bg-purple-50"
    }
  ];

  const receptors = [
    { name: "TLR", loc: "Membrana/Endosoma", function: "LPS, Flagelina, Ácidos Nucleicos" },
    { name: "NLR / NOD", loc: "Citoplasma", function: "Peptidoglicano, Cristales (Inflamasoma)" },
    { name: "RLR / RIG-1", loc: "Citoplasma", function: "Detección de ARN viral" }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-rose-600" size={24} />
        <h4 className="text-xl font-black text-slate-900">Mecanismos de Reconocimiento Innato</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {elements.map((el) => (
          <div key={el.title} className={`p-5 rounded-3xl border border-slate-100 ${el.lightColor}`}>
            <h5 className={`text-sm font-black mb-1 ${el.color.replace('bg-', 'text-')}`}>{el.title}</h5>
            <p className="text-[11px] font-bold text-slate-800 mb-2 leading-tight">{el.desc}</p>
            <div className="p-2 bg-white/60 rounded-xl">
              <p className="text-[10px] text-slate-500 italic leading-tight">{el.examples}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Detalle de Receptores (PRRs)</p>
        <div className="grid grid-cols-1 gap-2">
          {receptors.map((r) => (
            <div key={r.name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-indigo-600 shadow-sm">
                {r.name}
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-slate-900">{r.loc}</p>
                <p className="text-[10px] text-slate-500">{r.function}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DiagnosticMethods = () => (
  <div className="max-w-5xl mx-auto space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Arquitectura del Diagnóstico</h2>
      <p className="text-slate-500 max-w-2xl mx-auto">Comprender la diferencia entre buscar al agresor (Directo) o las huellas de la batalla (Indirecto) es fundamental para la clínica.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Metodo Directo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="p-8 bg-white border-2 border-indigo-100 rounded-[32px] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
          <Activity size={80} className="text-indigo-600" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <Zap size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Métodos Directos</h3>
            <p className="text-slate-500 text-sm font-medium">Buscan al agente infeccioso, sus antígenos o su material genético.</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-indigo-600">ADN/ARN</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Biología Molecular (PCR)</p>
                <p className="text-xs text-slate-500">Detección de material genético. Alta sensibilidad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-indigo-600">CULT</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Cultivos Biológicos</p>
                <p className="text-xs text-slate-500">Aislamiento en medios específicos (Agar, Sabouraud).</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-indigo-600">MICR</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Microscopía y Tinciones</p>
                <p className="text-xs text-slate-500">Visualización (Gram, Ziehl-Neelsen, Tinta China).</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50">
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Ejemplos de Aplicación</p>
            <p className="text-xs text-indigo-900 font-medium leading-relaxed">
              Tuberculosis (Bacilos en esputo), Malaria (Gota gruesa), VIH (Carga viral plasmática).
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metodo Indirecto */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="p-8 bg-white border-2 border-rose-100 rounded-[32px] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
          <ShieldCheck size={80} className="text-rose-600" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Métodos Indirectos</h3>
            <p className="text-slate-500 text-sm font-medium">Detectan la respuesta inmune (anticuerpos) producida por el huésped.</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-rose-600">IgM</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Anticuerpos de Fase Aguda</p>
                <p className="text-xs text-slate-500">Indican infección reciente o actual.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-rose-600">IgG</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Anticuerpos de Memoria</p>
                <p className="text-xs text-slate-500">Indican exposición previa, cronicidad o inmunidad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-xs text-rose-600">SERO</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Serología (ELISA / IFI)</p>
                <p className="text-xs text-slate-500">Técnicas de aglutinación o inmunoensayo enzimático.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-2">Ejemplos de Aplicación</p>
            <p className="text-xs text-rose-900 font-medium leading-relaxed">
              Chagas crónico (Serología reactiva), Sífilis (VDRL/FTAbs), Hepatitis B (Anti-HBs).
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="p-8 bg-slate-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-sm">
          <Stethoscope size={48} className="text-indigo-400" />
        </div>
        <div className="space-y-2 flex-1">
          <h4 className="text-xl font-bold italic">"En medicina, el diagnóstico es el acto de discernir entre la duda y la certeza."</h4>
          <p className="text-sm text-slate-400">Recuerda: Los métodos indirectos requieren tiempo de "ventana inmunológica" para ser detectables.</p>
        </div>
      </div>
    </div>
  </div>
);


const TCellPolarization = () => {
  const pathways = [
    {
      type: "Th1",
      cytokine: "IL-12, IFN-γ",
      factor: "T-bet",
      target: "Macrófagos, CD8+",
      function: "Patógenos intracelulares (Bacterias, Virus)",
      color: "bg-blue-500",
      lightColor: "bg-blue-50"
    },
    {
      type: "Th2",
      cytokine: "IL-4",
      factor: "GATA-3",
      target: "Eosinófilos, Mastocitos, Linf B",
      function: "Parásitos helmintos y alérgenos",
      color: "bg-rose-500",
      lightColor: "bg-rose-50"
    },
    {
      type: "Th17",
      cytokine: "IL-6, TGF-β, IL-23",
      factor: "RORγt",
      target: "Neutrófilos",
      function: "Bacterias extracelulares y Hongos",
      color: "bg-amber-500",
      lightColor: "bg-amber-50"
    },
    {
      type: "Treg",
      cytokine: "TGF-β, IL-2",
      factor: "FoxP3",
      target: "Otras células T, APCs",
      function: "Inmunotolerancia y regulación",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <Dna className="text-indigo-600" size={24} />
        <h4 className="text-xl font-black text-slate-900">Polarización Linfocitos T CD4+</h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pathways.map((path) => (
          <motion.div 
            key={path.type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all ${path.lightColor}`}
          >
            <div className={`absolute top-0 right-0 h-1 w-full ${path.color}`} />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${path.color}`}>
                  {path.type}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Vía Diferenciación</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Citocina Inductora</p>
                  <p className="text-sm font-black text-slate-800">{path.cytokine}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Factor de Transcripción</p>
                  <p className="text-sm font-medium italic text-slate-700">{path.factor}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/50">
                  <p className="text-xs font-medium text-slate-800 leading-tight">
                    <span className="font-bold text-indigo-600">🎯 {path.target}:</span> {path.function}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-white rounded-xl shadow-sm">
          <Zap size={16} className="text-amber-500" />
        </div>
        <p className="text-xs text-slate-600 italic">
          <strong>Punto Clave:</strong> La diferenciación depende del entorno de citocinas generado por las células de la inmunidad innata (ej. Macrófagos y Dendríticas).
        </p>
      </div>
    </div>
  );
};

const Nutrition = () => (
  <div className="max-w-5xl mx-auto space-y-16 pb-12">
    {/* Header */}
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ciencia de la Nutrición</h2>
      <p className="text-slate-500 max-w-2xl mx-auto">La alimentación no es solo combustible; es la información que modula nuestra respuesta biológica.</p>
    </div>

    {/* Tipos de Dietas */}
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
          <Utensils size={20} />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Modelos de Alimentación</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { 
            name: "Mediterránea", 
            desc: "Rica en grasas monoinsaturadas (oliva), legumbres y vegetales. Referencia en salud cardiovascular.",
            tags: ["Antiinflamatoria", "Longevidad"]
          },
          { 
            name: "DASH", 
            desc: "Enfoque en reducción de sodio y aumento de potasio/calcio para control de hipertensión.",
            tags: ["Hipertensión", "Minerales"]
          },
          { 
            name: "Plant-Based", 
            desc: "Prioriza alimentos de origen vegetal mínimamente procesados. Alta en fibra y fitoquímicos.",
            tags: ["Fibra", "Microbiota"]
          }
        ].map((diet) => (
          <div key={diet.name} className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all">
            <h4 className="text-lg font-bold text-slate-900 mb-2">{diet.name}</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{diet.desc}</p>
            <div className="flex gap-2">
              {diet.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-lg uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Metodo del Plato */}
    <section className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Apple size={24} className="text-indigo-400" />
          </div>
          <h3 className="text-3xl font-black">Método del Plato (Harvard)</h3>
          <p className="text-slate-400 leading-relaxed">Una guía visual para crear comidas saludables y equilibradas, independientemente del tipo de dieta.</p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold">50% Vegetales y Frutas</p>
                <p className="text-xs text-slate-500">Color y variedad. Importancia de la fibra.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold">25% Proteína Saludable</p>
                <p className="text-xs text-slate-500">Pescado, aves, legumbres y nueces.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold">25% Granos Integrales</p>
                <p className="text-xs text-slate-500">Quinua, avena, arroz integral, trigo entero.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="relative flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/10 flex items-center justify-center relative">
             <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30 animate-pulse" />
             <div className="w-full h-full rounded-full flex flex-wrap overflow-hidden rotate-45">
                <div className="w-1/2 h-full bg-green-500/80" />
                <div className="w-1/2 h-1/2 bg-red-500/80" />
                <div className="w-1/2 h-1/2 bg-amber-500/80" />
             </div>
             <div className="absolute bg-slate-900 px-4 py-2 rounded-full border border-white/20 text-xs font-bold shadow-xl">PLATO EQUILIBRADO</div>
          </div>
        </div>
      </div>
    </section>

    {/* Inmunonutrición */}
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-lg">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Inmunonutrición</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Vitamina D", role: "Inmunomodulador", source: "Exposición solar, pescados grasos." },
          { title: "Zinc", role: "Replica celular", source: "Semillas, carnes, mariscos." },
          { title: "Omega-3", role: "Resolución inflamación", source: "Nueces, semillas de chía, pescado." },
          { title: "Probióticos", role: "Barrera mucosa", source: "Yogur, kéfir, alimentos fermentados." }
        ].map((nutrient) => (
          <div key={nutrient.title} className="p-5 bg-rose-50 border border-rose-100 rounded-3xl">
            <h4 className="text-sm font-black text-rose-600 mb-1">{nutrient.title}</h4>
            <p className="text-[10px] font-bold text-slate-700 uppercase mb-2">{nutrient.role}</p>
            <p className="text-[11px] text-slate-500 italic">{nutrient.source}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex gap-6 items-start">
         <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
            <MessageSquare size={24} />
         </div>
         <div className="space-y-2">
            <p className="font-bold text-slate-900 text-sm">El Nexo Microbiota-Inmune</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              El 70% de nuestro sistema inmune reside en el intestino (GALT). Una dieta alta en fibra promueve la producción de metabolitos como el Butirato, que educa a las células T reguladoras (Treg) para prevenir la autoinmunidad y la inflamación crónica.
            </p>
         </div>
      </div>
    </section>
  </div>
);

const Theory = ({ category }: { category: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<AcademicEntry | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const catMap: Record<string, string> = {
    'inmunidad': 'Inmunidad',
    'virus': 'Virus',
    'bacterias': 'Bacteria',
    'hongos': 'Hongo',
    'parasitos': 'Parasito'
  };

  const filtered = ACADEMIC_DATA.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'theory' || p.category === catMap[category];
    return matchesSearch && matchesCategory;
  });

  const handleAiQuery = async () => {
    if (!searchTerm.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    try {
      const promptCategory = catMap[category] || category;
      const response = await chatWithAI(`Pregunta específica sobre ${promptCategory} basada en bibliografía (Murray, Oubiña, Apt Baruch): ${searchTerm}`);
      setAiResponse(response || '');
    } catch (e) {
      console.error(e);
      setAiResponse('Error al consultar al experto. Reintenta.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 capitalize">{category}</h3>
          <p className="text-sm text-slate-500">Resúmenes interactivos y mecanismos clave.</p>
        </div>
        <div className="flex gap-2 w-full max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Haz una pregunta técnica o busca..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAiQuery();
              }}
            />
          </div>
          <button 
            onClick={handleAiQuery}
            disabled={aiLoading || !searchTerm.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-900 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-indigo-100"
          >
            {aiLoading ? <Loader2 className="animate-spin" size={18} /> : <MessageSquare size={18} />}
            Preguntar
          </button>
        </div>
      </div>

      <GroupGeneralities category={category} />

      {aiResponse && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl relative group"
        >
          <button 
            onClick={() => setAiResponse(null)}
            className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-600"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm">
              <Zap size={20} />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Respuesta del Tutor ADN</p>
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const isImmunity = p.category === 'Inmunidad';
          const themeClass = isImmunity 
            ? "bg-rose-50 border-rose-100 hover:border-rose-300 text-rose-600" 
            : "bg-emerald-50 border-emerald-100 hover:border-emerald-300 text-emerald-600";
          const tagClass = isImmunity ? "text-rose-600" : "text-emerald-600";
          const zapClass = isImmunity ? "text-rose-400" : "text-emerald-400";

          return (
            <motion.button
              key={p.id}
              layoutId={p.id}
              onClick={() => setSelected(p)}
              className={cn(
                "p-6 border rounded-2xl text-left transition-all shadow-sm flex flex-col group relative overflow-hidden h-full",
                isImmunity ? "bg-rose-50 border-rose-100 hover:border-rose-300" : "bg-emerald-50 border-emerald-100 hover:border-emerald-300"
              )}
            >
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className={zapClass} />
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", tagClass)}>{p.type}</span>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{p.name}</h4>
              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{p.clinical}</p>
              <div className={cn("mt-auto pt-4 flex items-center text-xs font-bold gap-1 group-hover:gap-2 transition-all", tagClass)}>
                VER FICHA <ArrowRight size={14} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              layoutId={selected.id}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className={cn(
                "p-8 border-b border-slate-100 flex justify-between items-start",
                selected.category === 'Inmunidad' ? "bg-rose-50/50" : "bg-emerald-50/50"
              )}>
                <div>
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-widest",
                    selected.category === 'Inmunidad' ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                  )}>{selected.type}</span>
                  <h3 className="text-3xl font-black text-slate-900 mt-2">{selected.name}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/80 rounded-full shadow-sm transition-all text-slate-400 hover:text-slate-900">
                  <X />
                </button>
              </div>
              <div className="p-8 overflow-y-auto space-y-8 scrollbar-hide">
                {selected.category === 'Inmunidad' ? (
                  <>
                    <section className="bg-rose-50/30 p-6 rounded-2xl border border-rose-100/50">
                      <h5 className="text-xs font-bold text-rose-600 uppercase mb-3 flex items-center gap-2">
                         Mecanismo de Acción
                      </h5>
                      <p className="text-slate-800 leading-relaxed font-medium">{selected.mechanism}</p>
                    </section>
                    {selected.hasSpecialViz === 't-polarization' && <TCellPolarization />}
                    {selected.hasSpecialViz === 'innate-recognition' && <InnateRecognition />}
                    {selected.hasSpecialViz === 'mucosal-immunity' && <MucosalImmunity />}
                  </>
                ) : (
                  <>
                    {selected.morphology && (
                      <section>
                        <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Morfología</h5>
                        <p className="text-slate-700 leading-relaxed">{selected.morphology}</p>
                      </section>
                    )}
                    <div className="grid grid-cols-2 gap-8 text-sm">
                      {selected.habitat && (
                        <section>
                          <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Hábitat</h5>
                          <p className="text-slate-800 font-medium">{selected.habitat}</p>
                        </section>
                      )}
                      {selected.population && (
                        <section>
                          <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Población</h5>
                          <p className="text-slate-800 font-medium">{selected.population}</p>
                        </section>
                      )}
                    </div>
                  </>
                )}
                
                <section>
                  <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Importancia Clínica</h5>
                  <p className="text-slate-700 leading-relaxed">{selected.clinical}</p>
                </section>

                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-50">
                  {selected.diagnosis && (
                    <section>
                      <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Diagnóstico LAB</h5>
                      <p className="text-slate-800 font-medium">{selected.diagnosis}</p>
                    </section>
                  )}
                  {selected.prevention && (
                    <section>
                      <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Prevención / Control</h5>
                      <p className="text-slate-800 font-medium">{selected.prevention}</p>
                    </section>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


const Cases = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const content = await generateCaseStudy(topic);
      setResult(content || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Laboratorio de Casos Clínicos</h2>
        <p className="text-slate-600">Simulador de problemas basado en IA para poner a prueba tu razonamiento logístico.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tema o Parásito</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ej: Trichinella, Amebiasis hepática..." 
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button 
              onClick={generate}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 font-bold transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
              Generar
            </button>
          </div>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-slate max-w-none bg-slate-50 p-8 rounded-2xl border border-slate-100 whitespace-pre-wrap font-sans text-slate-800"
          >
            {result}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', parts: {text: string}[]}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, parts: [{ text: userMsg }] }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const responseText = await chatWithAI(userMsg, messages);
      setMessages([...newMessages, { role: 'model' as const, parts: [{ text: responseText || '' }] }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-white">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="text-indigo-600" />
          Tutor ADN Experto
        </h3>
        <p className="text-xs text-slate-500 mt-1">Consultas rápidas sobre mecanismos de defensa y nutrición.</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
            <div className="p-4 bg-indigo-50 rounded-full text-indigo-600">
              <MessageSquare size={32} />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900">¿Tienes dudas sobre algún mecanismo?</p>
              <p className="text-sm text-slate-500">Ej: \"Explícame la evasión inmune de Toxoplasma\"</p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-indigo-600 text-white rounded-tr-none shadow-md" 
                : "bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm"
            )}>
              {m.parts[0].text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin text-indigo-600" size={16} />
              <span className="text-sm text-slate-400">Analizando fuentes...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-3">
          <input 
            type="text" 
            placeholder="Escribe tu consulta aquí..." 
            className="flex-1 px-4 py-3 bg-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition-all"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === 'ADN2026') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <MicroBackground />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-2xl border border-slate-100 text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-100 border border-emerald-50 transform -rotate-6">
            <Microscope size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">PROYECTO ADN</h1>
          <p className="text-slate-500 text-sm font-medium">Agentes de Defensa, Mecanismo y Nutrición</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Código de acceso" 
              className={cn(
                "w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold tracking-widest uppercase",
                error ? "border-red-400 animate-shake" : "border-slate-100 focus:border-emerald-600 focus:bg-white"
              )}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100"
          >
            INGRESAR AL SISTEMA
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8">Proyecto Educativo 2026</p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isLogged) return <Login onLogin={() => setIsLogged(true)} />;

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <MicroBackground />
      <div className="relative z-10 flex h-screen bg-transparent font-sans text-slate-900">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-emerald-900 border-b border-emerald-800/50 flex items-center px-8 z-30 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-white/10 rounded-lg text-emerald-400 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-black tracking-tight text-white">
              {activeTab === 'intro' && 'Presentación'}
              {['inmunidad', 'virus', 'bacterias', 'hongos', 'parasitos'].includes(activeTab) && `Módulo: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              {activeTab === 'nutricion' && 'Ciencia de la Nutrición'}
              {activeTab === 'diagnostico' && 'Arquitectura del Diagnóstico'}
              {activeTab === 'cases' && 'Laboratorio IA'}
              {activeTab === 'chat' && 'Asistente ADN'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400/60 tracking-wider">SISTEMA ACTIVO</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'intro' && <Welcome />}
              {['inmunidad', 'virus', 'bacterias', 'hongos', 'parasitos'].includes(activeTab) && <Theory category={activeTab} />}
              {activeTab === 'nutricion' && <Nutrition />}
              {activeTab === 'diagnostico' && <DiagnosticMethods />}
              {activeTab === 'cases' && <Cases />}
              {activeTab === 'chat' && <Chat />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
