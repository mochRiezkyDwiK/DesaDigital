import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Filter,
  MessageCircle,
  Image as ImageIcon,
  LayoutDashboard,
  Files,
  Users,
  BarChart3,
  Settings,
  Building2
} from "lucide-react";

// ─── DUMMY DATA LAPORAN ──────────────────────────────────────────────────────

const DATA_LAPORAN = [
  { id: "LPR-001", judul: "Pipa Air Bocor di Gang 5", pelapor: "Budi Santoso", kategori: "Infrastruktur", tgl: "29 Apr 2026", lokasi: "RT 01 / RW 10", status: "Baru", priority: "High" },
  { id: "LPR-002", judul: "Lampu Jalan Mati", pelapor: "Siti Aminah", kategori: "Keamanan", tgl: "28 Apr 2026", lokasi: "RT 03 / RW 10", status: "Proses", priority: "Medium" },
  { id: "LPR-003", judul: "Tumpukan Sampah Liar", pelapor: "Rahmat Hidayat", kategori: "Lingkungan", tgl: "27 Apr 2026", lokasi: "RT 02 / RW 10", status: "Selesai", priority: "Low" },
];

export default function AdminLaporan() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Semua");

  const filteredLaporan = DATA_LAPORAN.filter(l => tab === "Semua" || l.status === tab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased flex">
      
      {/* ── SIDEBAR (Consistent) ── */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-50 shadow-sm">
        <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin')}>
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 tracking-tighter text-xl leading-none">ADMIN</span>
            <span className="text-[10px] font-black text-blue-600 tracking-[0.3em] mt-1 uppercase">DigiDesa</span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 mt-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Navigasi Utama</p>
          {[
            { n: "Overview", i: LayoutDashboard, p: "/admin" },
            { n: "Validasi Surat", i: Files, p: "/admin/validasi" },
            { n: "Moderasi Lapor", i: AlertTriangle, p: "/admin/laporan", active: true },
            { n: "Data Penduduk", i: Users, p: "/admin/penduduk" },
            { n: "Keuangan Desa", i: BarChart3, p: "/admin/keuangan" },
            { n: "Pengaturan", i: Settings, p: "/admin/pengaturan" },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => item.p !== "#" && navigate(item.p)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                item.active ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.i size={18} strokeWidth={item.active ? 3 : 2.5} />
              {item.n}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">Moderasi Laporan Warga</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Pusat Resolusi Masalah Wilayah</p>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-10 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* TAB SYSTEM */}
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm">
                {["Semua", "Baru", "Proses", "Selesai"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-6 py-2.5 rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                      tab === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                <Filter size={14} /> FILTER PRIORITAS
              </button>
          </div>

          {/* GRID LAPORAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLaporan.map((lapor, i) => (
                <motion.div
                  key={lapor.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all p-8 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        lapor.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>
                        {lapor.priority} Priority
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">{lapor.id}</span>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                      {lapor.judul}
                    </h3>
                    
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-slate-500">
                            <User size={14} /> <span className="text-[11px] font-bold">{lapor.pelapor}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <MapPin size={14} /> <span className="text-[11px] font-bold">{lapor.lokasi}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Calendar size={14} /> <span className="text-[11px] font-bold">{lapor.tgl}</span>
                        </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {lapor.status === 'Baru' && <Clock className="text-amber-500" size={16} />}
                        {lapor.status === 'Proses' && <Activity className="text-blue-500 animate-pulse" size={16} />}
                        {lapor.status === 'Selesai' && <CheckCircle2 className="text-emerald-500" size={16} />}
                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{lapor.status}</span>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                        <ChevronRight size={18} strokeWidth={3} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}

// Ikon Activity yang tadi terlewat
import { Activity } from "lucide-react";