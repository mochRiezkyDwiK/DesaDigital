import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import Navigate
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  User, 
  Bell, 
  Search,
  Plus,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp, 
  Activity,
  ShieldCheck,
  CreditCard,
  LogOut,
  Sparkles,
  CalendarDays,
  ArrowUpRight,
  Zap
} from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const EASE_SPRING = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE_SPRING }
  })
};

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────

const QUICK_STATS = [
  { label: "Surat Aktif", value: "2", icon: FileText, trend: "+1 Baru", color: "blue", path: "/layanan" },
  { label: "Laporan", value: "0", icon: MessageSquare, trend: "Clear", color: "indigo", path: "/lapor" },
  { label: "Poin Warga", value: "1.250", icon: Sparkles, trend: "Top 5%", color: "violet", path: "#" },
];

const SURAT_LIST = [
  { id: "SKD-081", tipe: "Keterangan Domisili", status: "Validasi Sistem", tgl: "28 Apr 2026", progress: 65 },
  { id: "SKU-042", tipe: "Keterangan Usaha", status: "Selesai", tgl: "20 Apr 2026", progress: 100 },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

export default function DashboardWarga() {
  const [activeTab, setActiveTab] = useState("Ringkasan");
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans antialiased flex overflow-hidden">
      
      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen z-50">
        <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-slate-900 tracking-tighter text-2xl italic">DIGI<span className="text-blue-600">DESA</span></span>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 mt-4">
          {[
            { n: "Ringkasan", i: LayoutDashboard, p: "/dashboard-warga" },
            { n: "Layanan Surat", i: FileText, p: "/layanan" },
            { n: "Laporan Saya", i: MessageSquare, p: "/lapor" },
            { n: "Financial", i: CreditCard, p: "/finansial" },
            { n: "Profil", i: User, p: "/profil" },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => {
                setActiveTab(item.n);
                if(item.p !== "#") navigate(item.p);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                activeTab === item.n 
                ? "bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] scale-[1.02]" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.i size={18} strokeWidth={2.5} />
              {item.n}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold text-red-400 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} strokeWidth={2.5} />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto relative h-screen">
        
        {/* HEADER */}
        <header className="h-24 bg-white/40 backdrop-blur-xl border-b border-slate-100/50 sticky top-0 z-40 px-8 sm:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari layanan desa..." 
                className="bg-slate-100/50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-xs font-medium focus:ring-2 focus:ring-blue-500/10 w-64 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-100">
               <CalendarDays size={14} className="text-amber-600" />
               <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">Rabu, 29 April</span>
            </div>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
              <Bell size={20} strokeWidth={2} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-black text-slate-900 leading-none">Budi Santoso</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1">RT 01 / RW 10</p>
              </div>
              <img className="w-11 h-11 rounded-2xl border-2 border-white shadow-md ring-4 ring-slate-50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-8 sm:p-12 space-y-10 max-w-7xl mx-auto">
          
          {/* WELCOME SECTION */}
          <motion.section 
            initial="hidden" animate="visible" variants={FADE_UP} custom={0}
            className="relative p-10 bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)]"
          >
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-blue-600/30 to-transparent" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Automasi Desa Digital</span>
                <h2 className="text-4xl font-black text-white mt-6 tracking-tighter leading-none">
                  Layanan Publik <br/> <span className="text-blue-500">Serba Instan.</span>
                </h2>
                <p className="text-slate-400 text-sm max-w-sm mt-4 leading-relaxed font-medium">
                  RT dan RW kini otomatis mendapatkan laporan tembusan. Anda tidak perlu lagi meminta validasi fisik secara manual.
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button 
                  onClick={() => navigate('/layanan')} // Pasang tombol Hero
                  whileHover={{ y: -5 }}
                  className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl text-sm shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition-all flex items-center gap-3"
                >
                  <Plus size={20} strokeWidth={3} /> Ajukan Surat
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* QUICK STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUICK_STATS.map((s, i) => (
              <motion.div 
                key={s.label} initial="hidden" animate="visible" variants={FADE_UP} custom={i + 1}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => { if(s.path !== "#") navigate(s.path) }} // Pasang tombol Stats
                className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                  <s.icon className="text-slate-400 group-hover:text-blue-600 transition-colors" size={26} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5 tracking-tight">{s.value}</h3>
                </div>
                <ArrowUpRight size={20} className="text-slate-200 group-hover:text-blue-500" />
              </motion.div>
            ))}
          </div>

          {/* MAIN BENTO LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT: PROGRESS SURAT */}
            <motion.div 
              initial="hidden" animate="visible" variants={FADE_UP} custom={4}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Status Dokumen</h3>
                <button 
                  onClick={() => navigate('/layanan')}
                  className="text-[13px] font-black text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  Semua Berkas <ChevronRight size={16} strokeWidth={3}/>
                </button>
              </div>

              <div className="grid gap-5">
                {SURAT_LIST.map((surat) => (
                  <div key={surat.id} className="p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-500">
                          <FileText className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 text-base tracking-tight">{surat.tipe}</h4>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {surat.id} • {surat.tgl}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Progress Sistem</p>
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: `${surat.progress}%` }} transition={{ duration: 1.5, delay: 0.5 }}
                              className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                            />
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-xl text-[11px] font-black tracking-tight ${surat.progress === 100 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          {surat.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SIMPLIFIED SERVICE TIMELINE */}
              <div className="p-10 bg-white rounded-[3rem] border border-slate-100 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Zap className="text-blue-600" size={18} strokeWidth={3} />
                  </div>
                  <h3 className="font-black text-slate-900 tracking-tight">Timeline Pelayanan Digital</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                  {[
                    { icon: Plus, label: "Submit Mandiri", desc: "Data dikirim ke server", c: "blue" },
                    { icon: ShieldCheck, label: "Validasi Desa", desc: "Verifikasi data kependudukan", c: "indigo" },
                    { icon: CheckCircle2, label: "Terbit Digital", desc: "Surat siap didownload", c: "emerald" }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-[2rem] border border-transparent hover:border-slate-200 transition-all group">
                      <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ring-1 ring-slate-100`}>
                        <step.icon size={20} className={`text-${step.c}-600`} strokeWidth={2.5} />
                      </div>
                      <span className="text-[11px] font-black text-slate-800 tracking-tight uppercase">{step.label}</span>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 leading-snug">{step.desc}</p>
                    </div>
                  ))}
                  <div className="col-span-full mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
                    <Activity size={16} className="text-blue-600" />
                    <p className="text-[10px] font-bold text-blue-800 leading-tight">
                      Informasi: Perangkat RT dan RW mendapatkan notifikasi tembusan secara otomatis sebagai arsip wilayah.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: WIDGETS */}
            <motion.div 
              initial="hidden" animate="visible" variants={FADE_UP} custom={5}
              className="space-y-10"
            >
              {/* NEWS CARD */}
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative shadow-2xl shadow-blue-900/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-30" />
                <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3">
                  <Activity size={22} className="text-blue-400" strokeWidth={3} /> Warta Desa
                </h3>
                <div className="space-y-8">
                  {[
                    { t: "Pembangunan Taman Bermain", d: "Lokasi Blok C, mulai minggu depan.", tag: "INFO" },
                    { t: "Update Sistem E-Iuran", d: "Pembayaran via QRIS kini tersedia.", tag: "TECH" }
                  ].map((n, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group">
                      <span className="text-[10px] font-black text-blue-400 tracking-[0.2em]">{n.tag}</span>
                      <h4 className="text-sm font-black mt-1 group-hover:text-blue-300 transition-colors">{n.t}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{n.d}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                  Arsip Berita
                </button>
              </div>

              {/* LOYALTY CARD */}
              <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
                <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                   <TrendingUp size={22} className="text-indigo-600" strokeWidth={3} /> Kontribusi Warga
                </h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3 px-1">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Partisipasi</span>
                      <span className="text-base font-black text-slate-900">85%</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-gradient-to-r from-indigo-500 to-blue-500" />
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] border border-indigo-100">
                    <p className="text-[11px] font-black text-indigo-700 uppercase tracking-widest mb-1">Badge Level</p>
                    <p className="text-sm font-black text-indigo-900 tracking-tight">Warga Teladan (Silver)</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}