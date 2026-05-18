import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { 
  FileText, 
  Search, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck, 
  Zap,
  Info,
  Clock,
  UserCheck,
  CreditCard,
  Flag,
  Users,
  MapPin,
  ArrowLeft // 2. Import ikon ArrowLeft
} from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const EASE_SPRING = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: EASE_SPRING }
  })
};

// ─── DUMMY DATA LAYANAN ───────────────────────────────────────────────────────

const KATEGORI = ["Semua", "Surat Keterangan", "Kependudukan", "Laporan & Aspirasi"];

const DAFTAR_LAYANAN = [
  { 
    title: "Surat Keterangan Domisili", 
    desc: "Untuk keperluan pembukaan rekening bank, lamaran kerja, atau administrasi lainnya.",
    category: "Surat Keterangan",
    time: "Instan",
    icon: MapPin,
    color: "blue"
  },
  { 
    title: "Surat Keterangan Usaha (SKU)", 
    desc: "Syarat utama pengajuan kredit usaha atau legalitas usaha mikro di lingkungan desa.",
    category: "Surat Keterangan",
    time: "1 Hari Kerja",
    icon: CreditCard,
    color: "indigo"
  },
  { 
    title: "Update Data Kartu Keluarga", 
    desc: "Sinkronisasi data jumlah anggota keluarga atau perubahan status kependudukan.",
    category: "Kependudukan",
    time: "Sistem Terpusat",
    icon: Users,
    color: "violet"
  },
  { 
    title: "Lapor Infrastruktur Rusak", 
    desc: "Adukan kerusakan jalan, lampu penerangan, atau selokan untuk segera diperbaiki.",
    category: "Laporan & Aspirasi",
    time: "24/7",
    icon: Flag,
    color: "red"
  },
  { 
    title: "Surat Pengantar Nikah", 
    desc: "Dokumen awal sebagai syarat administrasi di tingkat KUA atau pencatatan sipil.",
    category: "Surat Keterangan",
    time: "2 Hari Kerja",
    icon: FileText,
    color: "blue"
  },
  { 
    title: "Pendaftaran Warga Baru", 
    desc: "Prosedur pelaporan diri bagi warga yang baru pindah ke lingkungan RW setempat.",
    category: "Kependudukan",
    time: "Validasi Digital",
    icon: UserCheck,
    color: "violet"
  }
];

export default function Layanan() {
  const [filter, setFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // 3. Inisialisasi navigate

  const filteredServices = DAFTAR_LAYANAN.filter(s => 
    (filter === "Semua" || s.category === filter) &&
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans antialiased pb-20">
      
      {/* ── HEADER LAYANAN ── */}
      <section className="bg-slate-900 pt-16 pb-20 px-8 relative overflow-hidden">
        {/* Tombol Kembali (Navigasi Utama) */}
        <div className="max-w-6xl mx-auto mb-12 relative z-20">
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/dashboard-warga')}
              className="flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
              <span className="text-xs font-black uppercase tracking-widest">Kembali ke Dashboard</span>
            </motion.button>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={FADE_UP} custom={0}>
            <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Katalog Layanan Digital</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-6 tracking-tighter leading-none">
              Solusi Administrasi <br/> <span className="text-blue-500 font-serif italic">Satu Pintu.</span>
            </h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial="hidden" animate="visible" variants={FADE_UP} custom={1} className="mt-12 max-w-2xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari layanan (misal: Domisili, Usaha...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-[2rem] py-5 pl-14 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-xl transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FILTER KATEGORI ── */}
      <section className="max-w-6xl mx-auto px-8 -mt-8 relative z-20">
        <div className="flex flex-wrap gap-3 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5">
          {KATEGORI.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-xs font-black transition-all duration-300 ${
                filter === cat 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── GRID LAYANAN ── */}
      <section className="max-w-6xl mx-auto px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP}
              custom={i}
              whileHover={{ y: -10 }}
              onClick={() => {
                alert(`Pengajuan ${service.title} berhasil dikirim! \n\nSilakan pantau status pengajuan Anda di Dashboard.`);
                navigate('/dashboard-warga');
              }}
              className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-${service.color}-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-all duration-500 shadow-sm`}>
                  <service.icon className={`text-${service.color}-600 group-hover:text-white transition-colors`} size={26} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md leading-none">{service.category}</span>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <Clock size={10} /> {service.time}
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">{service.title}</h3>
                <p className="text-slate-500 text-sm mt-4 leading-relaxed font-medium line-clamp-3">
                  {service.desc}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  Gunakan Layanan <ArrowRight size={14} strokeWidth={3} />
                </span>
                <Info size={16} className="text-slate-200 group-hover:text-blue-200 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Layanan tidak ditemukan</h3>
            <p className="text-slate-400 text-sm mt-2">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
          </div>
        )}
      </section>

      {/* ── FOOTER INFO ── */}
      <section className="max-w-4xl mx-auto px-8 mt-24">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-10 rounded-[3rem] border border-blue-100/50 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
            <Zap className="text-white" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Verifikasi Otomatis</h4>
            <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
              Sistem kami terhubung langsung dengan database kependudukan desa. Pastikan data profil Anda sudah terverifikasi untuk menggunakan layanan instan.
            </p>
          </div>
          <button className="whitespace-nowrap px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black hover:border-blue-500 hover:text-blue-600 transition-all">
            Cek Status Profil
          </button>
        </div>
      </section>
    </div>
  );
}