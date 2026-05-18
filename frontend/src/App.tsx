import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardWarga from "./pages/DashboardWarga";
import Layanan from "./pages/Layanan";
import Lapor from "./pages/Lapor";
import Finansial from "./pages/Finansial";
import Profil from "./pages/Profil";

import AdminDashboard from "./pages/AdminDashboard";
import AdminValidasiSurat from "./pages/AdminValidasiSurat";
import AdminLaporan from "./pages/AdminLaporan";
import AdminPenduduk from "./pages/AdminPenduduk";
import AdminKeuangan from "./pages/AdminKeuangan";
import AdminPengaturan from "./pages/AdminPengaturan";

// Halaman Dummy Sementara (Hanya yang benar-benar belum ada filenya)
const LaporDummy = () => <div className="p-10 text-center text-2xl font-bold text-slate-800">Halaman Lapor (Sedang Dibangun)</div>;

function App() {
  return (
    <Router>
      <div className="font-sans text-slate-900 antialiased bg-slate-50 min-h-screen">
        <Routes>
          {/* Rute Utama */}
          <Route path="/" element={<Home />} />
          
          {/* Rute Login - Pastikan merujuk ke file Login.tsx yang premium tadi */}
          <Route path="/login" element={<Login />} />
          
          {/* Rute Dashboard - Pastikan file DashboardWarga.tsx sudah di-save */}
          <Route path="/dashboard-warga" element={<DashboardWarga />} />

          <Route path="/layanan" element={<Layanan />} />

          <Route path="/lapor" element={<Lapor />} />

          <Route path="/finansial" element={<Finansial />} />

          <Route path="/profil" element={<Profil />} />


          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/validasi" element={<AdminValidasiSurat />} />

          <Route path="/admin/laporan" element={<AdminLaporan />} />

          <Route path="/admin/penduduk" element={<AdminPenduduk />} />

          <Route path="/admin/keuangan" element={<AdminKeuangan />} />

          <Route path="/admin/pengaturan" element={<AdminPengaturan />} />
          
          {/* Rute Lainnya */}
          <Route path="/lapor" element={<LaporDummy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;