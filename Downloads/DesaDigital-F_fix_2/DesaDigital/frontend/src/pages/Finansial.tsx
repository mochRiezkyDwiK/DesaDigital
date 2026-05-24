import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  ArrowLeft, 
  TrendingUp, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Download,
  Wallet,
  PieChart,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

const EASE_SPRING = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_SPRING }
  })
};

export default function Finansial() {
  const navigate = useNavigate();

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
            DIGI<span className="text-blue-600">KAS</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
          <ShieldCheck size={14} className="text-emerald-600" />
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Laporan Teraudit Desa</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 pt-12 space-y-10">
        
        {/* ── TOP SECTION: BALANCE & TRANSPARENCY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card: Status Pembayaran Warga */}
          <motion.div 
            initial="hidden" animate="visible" variants={FADE_UP} custom={0}
            className="lg:col-span-2 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20" />
            <div className="relative z-10">
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Tagihan Bulan April 2026</p>
              <h2 className="text-5xl font-black mt-4 tracking-tighter">Rp 50.000</h2>
              <p className="text-slate-400 text-sm mt-2 font-medium">Iuran Kebersihan & Keamanan (RT 01)</p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2">
                  <CreditCard size={18} /> Bayar Sekarang
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl text-sm transition-all border border-white/10 flex items-center gap-2">
                  <Download size={18} /> Invoice PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card: Ringkasan Transparansi RT */}
          <motion.div 
            initial="hidden" animate="visible" variants={FADE_UP} custom={1}
            className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <PieChart className="text-indigo-600" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kas RT 01</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Total Dana Terkumpul</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Rp 4.250.000</h3>
              <div className="flex items-center gap-2 mt-2 text-emerald-500 font-bold text-[11px]">
                <TrendingUp size={14} /> +12.5% dari bulan lalu
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all">
              Detail Transparansi
            </button>
          </motion.div>
        </div>

        {/* ── ALUR DANA SECTION ── */}
        <motion.div 
          initial="hidden" animate="visible" variants={FADE_UP} custom={2}
          className="p-10 bg-blue-600 rounded-[3.5rem] text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <Wallet className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight">Warga ke RT</h4>
                <p className="text-blue-100 text-xs mt-1">Pembayaran terverifikasi otomatis oleh sistem.</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ChevronRight className="text-blue-300 hidden md:block" size={32} />
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight">RT ke RW & Desa</h4>
                <p className="text-blue-100 text-xs mt-1">Laporan finansial terpusat untuk transparansi publik.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── HISTORY & LEDGER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Riwayat Transaksi Pribadi */}
          <motion.div 
            initial="hidden" animate="visible" variants={FADE_UP} custom={3}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <History size={22} className="text-blue-600" /> Riwayat Pembayaran
              </h3>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
              {[
                { n: "Iuran Keamanan April", d: "12 Apr 2026", a: "Rp 50.000", s: "Berhasil", i: ArrowUpRight, c: "emerald" },
                { n: "Iuran Sampah Maret", d: "10 Mar 2026", a: "Rp 30.000", s: "Berhasil", i: ArrowUpRight, c: "emerald" },
                { n: "Dana Sosial Fogging", d: "05 Mar 2026", a: "Rp 25.000", s: "Berhasil", i: ArrowUpRight, c: "emerald" },
              ].map((item, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.c}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.i className={`text-${item.c}-600`} size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.n}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.d}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 text-sm">{item.a}</p>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{item.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pengeluaran Kas RT (Transparansi) */}
          <motion.div 
            initial="hidden" animate="visible" variants={FADE_UP} custom={4}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 px-2">
              <ArrowDownRight size={22} className="text-red-500" /> Alokasi Dana RT
            </h3>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              {[
                { l: "Honor Petugas Keamanan", p: "60%", c: "blue" },
                { l: "Kebersihan & Sampah", p: "25%", c: "indigo" },
                { l: "Dana Darurat Warga", p: "15%", c: "violet" },
              ].map((alokasi, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{alokasi.l}</span>
                    <span className="text-sm font-black text-slate-900">{alokasi.p}</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div className={`h-full bg-${alokasi.c}-600 rounded-full`} style={{ width: alokasi.p }} />
                  </div>
                </div>
              ))}
              <div className="pt-4 p-5 bg-slate-900 rounded-[2rem] text-center">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2">E-Audit Desa</p>
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-[10px]">
                  <CheckCircle2 size={12} /> Laporan telah diverifikasi Desa
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}