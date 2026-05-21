import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Komponen Pelindung Rute (UX: Mencegah akses tanpa login)
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />; // Arahkan ke beranda jika bukan admin
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="font-sans text-slate-900 antialiased bg-slate-50 min-h-screen">
        <Routes>
          {/* Rute Utama */}
          <Route path="/" element={<Home />} />
          
          {/* Rute Login - Pastikan merujuk ke file Login.tsx yang premium tadi */}
          <Route path="/login" element={<Login />} />
          
          {/* Rute Warga (Butuh Login) */}
          <Route path="/dashboard-warga" element={<ProtectedRoute requiredRole="WARGA"><DashboardWarga /></ProtectedRoute>} />
          <Route path="/layanan" element={<ProtectedRoute requiredRole="WARGA"><Layanan /></ProtectedRoute>} />
          <Route path="/lapor" element={<ProtectedRoute requiredRole="WARGA"><Lapor /></ProtectedRoute>} />
          <Route path="/finansial" element={<ProtectedRoute requiredRole="WARGA"><Finansial /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute requiredRole="WARGA"><Profil /></ProtectedRoute>} />

          {/* Rute Admin (Butuh Hak Akses ADMIN) */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/validasi" element={<ProtectedRoute requiredRole="ADMIN"><AdminValidasiSurat /></ProtectedRoute>} />
          <Route path="/admin/laporan" element={<ProtectedRoute requiredRole="ADMIN"><AdminLaporan /></ProtectedRoute>} />
          <Route path="/admin/penduduk" element={<ProtectedRoute requiredRole="ADMIN"><AdminPenduduk /></ProtectedRoute>} />
          <Route path="/admin/keuangan" element={<ProtectedRoute requiredRole="ADMIN"><AdminKeuangan /></ProtectedRoute>} />
          <Route path="/admin/pengaturan" element={<ProtectedRoute requiredRole="ADMIN"><AdminPengaturan /></ProtectedRoute>} />
          
          {/* Rute Lainnya (Sudah dihapus karena duplicate dengan yang di atas) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;