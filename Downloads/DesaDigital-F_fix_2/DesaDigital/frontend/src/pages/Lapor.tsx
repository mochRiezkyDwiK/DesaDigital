import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Camera, 
  MapPin, 
  Send, 
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Flag,
  Info
} from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const EASE_SPRING = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_SPRING }
  })
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

export default function Lapor() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    judul: "",
    kategori: "Infrastruktur",
    deskripsi: "",
    lokasi: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Pindah ke screen "Berhasil"
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans antialiased pb-20">
      
      {/* ── HEADER ── */}
      <header className="h-24 bg-white border-b border-slate-100 sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard-warga')}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight italic">
            LAPOR<span className="text-blue-600">DESA</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
          <Info size={14} className="text-blue-600" />
          <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Laporan Anda bersifat rahasia</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 pt-16">
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* Kiri: Deskripsi Fitur */}
            <motion.div initial="hidden" animate="visible" variants={FADE_UP} custom={0} className="lg:col-span-2">
              <span className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Pusat Aduan Warga</span>
              <h2 className="text-4xl font-black text-slate-900 mt-6 tracking-tighter leading-[1.1]">
                Suarakan <br/> <span className="text-red-500 italic">Perubahan.</span>
              </h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed font-medium">
                Ada kendala di lingkungan Anda? Laporkan langsung ke pihak Desa. Setiap aduan akan diproses maksimal 3x24 jam.
              </p>
              
              <div className="mt-12 space-y-6">
                {[
                  { t: "Pilih Kategori", d: "Infrastruktur, Sosial, Keamanan", i: Flag, c: "red" },
                  { t: "Unggah Bukti", d: "Foto lokasi atau dokumen pendukung", i: Camera, c: "blue" },
                  { t: "Pantau Real-time", d: "Cek progres penanganan via dashboard", i: CheckCircle2, c: "emerald" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-${item.c}-50 flex items-center justify-center shrink-0`}>
                      <item.i className={`text-${item.c}-600`} size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-slate-900">{item.t}</h4>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Kanan: Form Laporan */}
            <motion.div initial="hidden" animate="visible" variants={FADE_UP} custom={1} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] space-y-8">
                
                {/* Judul Laporan */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Laporan</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Contoh: Lampu Jalan Mati di Gang 3"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all"
                    value={formData.judul}
                    onChange={(e) => setFormData({...formData, judul: e.target.value})}
                  />
                </div>

                {/* Kategori & Lokasi */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all appearance-none"
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                    >
                      <option>Infrastruktur</option>
                      <option>Keamanan</option>
                      <option>Sosial</option>
                      <option>Lingkungan</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Lokasi</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input 
                        type="text" 
                        placeholder="RT 01 / RW 10"
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all"
                        value={formData.lokasi}
                        onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Aduan</label>
                  <textarea 
                    rows={4}
                    placeholder="Jelaskan secara detail kendala yang dialami..."
                    className="w-full bg-slate-50 border-none rounded-[2rem] py-5 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  />
                </div>

                {/* Upload Foto */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Unggah Bukti Foto (Opsional)</label>
                  <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center hover:border-red-200 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-red-50 group-hover:scale-110 transition-all">
                      <ImageIcon className="text-slate-300 group-hover:text-red-500" size={24} />
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-tight">Klik untuk unggah atau seret file</p>
                    <p className="text-[9px] font-bold text-slate-300 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl text-sm shadow-xl shadow-slate-900/20 hover:bg-red-600 transition-all flex items-center justify-center gap-3 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                  Kirim Laporan
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Laporan Terkirim!</h2>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed font-medium">
              Terima kasih atas partisipasi Anda. Laporan sedang diulas oleh petugas desa dan Anda akan menerima notifikasi setiap ada perubahan status.
            </p>
            <div className="mt-12 space-y-4">
              <button 
                onClick={() => navigate('/dashboard-warga')}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-sm"
              >
                Kembali ke Dashboard
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-4 bg-white border border-slate-100 text-slate-400 font-black rounded-2xl text-sm hover:text-slate-900 transition-all"
              >
                Buat Laporan Lain
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}