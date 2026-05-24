import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Files, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Download,
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  Building2,
  LayoutDashboard,
  AlertTriangle,
  Users,
  BarChart3,
  Settings
} from "lucide-react";

// ─── DATA DUMMY SURAT MASUK ──────────────────────────────────────────────────

const DATA_SURAT = [
  { id: "SKD-841", nama: "Budi Santoso", nik: "3273012903100004", tipe: "Domisili", tgl: "29 Apr 2026", rt: "01/10", status: "Pending" },
  { id: "SKU-902", nama: "Siti Aminah", nik: "3273012903100112", tipe: "Izin Usaha", tgl: "28 Apr 2026", rt: "03/10", status: "Pending" },
  { id: "SKP-221", nama: "Rahmat Hidayat", nik: "3273012903100782", tipe: "Keterangan Pindah", tgl: "28 Apr 2026", rt: "02/10", status: "Selesai" },
  { id: "SKM-102", nama: "Agus Setiawan", nik: "3273012903100551", tipe: "Kematian", tgl: "27 Apr 2026", rt: "01/10", status: "Ditolak" },
];

export default function AdminValidasiSurat() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurat = DATA_SURAT.filter(s => 
    (tab === "Semua" || s.status === tab) &&
    (s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased flex">
      
      {/* ── SIDEBAR (Consistent with Dashboard) ── */}
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
            { n: "Validasi Surat", i: Files, p: "/admin/validasi", active: true },
            { n: "Moderasi Lapor", i: AlertTriangle, p: "/admin/laporan" },
            { n: "Data Penduduk", i: Users, p: "/admin/penduduk" },
            { n: "Keuangan Desa", i: BarChart3, p: "/admin/keuangan" },
            { n: "Pengaturan", i: Settings, p: "/admin/pengaturan" },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => item.p !== "#" && navigate(item.p)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                item.active 
                ? "bg-blue-50 text-blue-700" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
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
                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">Validasi Surat Masuk</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Manajemen Berkas & Dokumen Warga</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari NIK atau Nama..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all w-64"
              />
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-10 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* TAB SYSTEM */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-[1.5rem] border border-slate-100 w-fit shadow-sm">
            {["Semua", "Pending", "Selesai", "Ditolak"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                  tab === t 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* TABLE SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-slate-50/50 border-b border-slate-100">
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Informasi Warga</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis Surat</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout">
                    {filteredSurat.map((surat, idx) => (
                      <motion.tr 
                        key={surat.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="group hover:bg-blue-50/20 transition-colors"
                      >
                        <td className="px-10 py-7">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center text-[13px] font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                              {surat.nama.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 tracking-tight">{surat.nama}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">NIK: {surat.nik} • {surat.rt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-7">
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-slate-700">{surat.tipe}</span>
                            <span className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-1.5">
                              <Clock size={12} /> {surat.tgl}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-7">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            surat.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            surat.status === 'Ditolak' ? 'bg-red-50 text-red-600 border-red-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {surat.status}
                          </span>
                        </td>
                        <td className="px-10 py-7">
                          <div className="flex items-center justify-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                              <Eye size={14} /> Detail
                            </button>
                            <button className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-all">
                              <Download size={14} />
                            </button>
                            <button className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-slate-900 transition-all">
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination / Footer Table */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Menampilkan {filteredSurat.length} dari {DATA_SURAT.length} berkas</p>
               <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all">Sebelumnya</button>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all">Selanjutnya</button>
               </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}