# Digital Village Hub

## Laporan Proyek (README)

**Nama Proyek**: Digital Village Hub  \
**Jenis Aplikasi**: Desktop (JavaFX) + Backend API (Spring Boot)  \
**Versi Build**: `0.0.1-SNAPSHOT`  \
**Tanggal Dokumen**: 2026-05-04

---

## 1. Ringkasan Eksekutif

Digital Village Hub adalah aplikasi untuk membantu administrasi tingkat RT/Desa dalam mengelola:

- Data warga (pendataan dan pemutakhiran)
- Pengajuan dan verifikasi surat/dokumen (warga mengajukan, petugas memverifikasi)
- Administrasi kas/iuran dan pelaporan sederhana

Solusi dibangun dengan pendekatan **desktop GUI berbasis JavaFX** untuk pengguna operasional, dan menyediakan **backend Spring Boot** sebagai server API (opsional/pendukung). Data disimpan pada database **MySQL-compatible** (mis. TiDB Cloud atau MySQL).

---

## 2. Tujuan dan Ruang Lingkup

**Tujuan**
- Menyediakan antarmuka desktop yang mudah dipakai untuk operasional RT/Desa.
- Mempercepat proses pengajuan surat dan meminimalkan kesalahan input.
- Memusatkan data warga, status pengajuan, serta iuran/kas dalam satu sistem.

**Ruang lingkup fungsional**
- Autentikasi berbasis username/password dan pembatasan akses berdasar peran.
- Modul Kelola Warga (CRUD) untuk admin/petugas.
- Modul Surat & Dokumen (pengajuan oleh warga; approve/reject/preview oleh petugas).
- Modul kas/iuran dan transaksi (sebagian fungsionalitas disediakan via controller/utility).

**Peran pengguna (role) yang digunakan di aplikasi**
- `WARGA`
- `PEGAWAI_DESA`
- `ADMIN_RT`

---

## 3. Arsitektur Teknis (High-Level)

**Komponen utama**
- **Desktop GUI (JavaFX)**
  - Entry point: `com.DigitalVillageHub.demo.javafx.JavaFXApplication`
  - UI: FXML + CSS
  - Controller: paket `com.DigitalVillageHub.demo.javafx.controller`
  - Akses data: JDBC melalui util `DatabaseSetup`/manager terkait

- **Backend API (Spring Boot)**
  - Entry point: `com.DigitalVillageHub.demo.DemoApplication`
  - Starter: Spring WebMVC + Spring Security + Spring Data JPA

- **Database**
  - MySQL-compatible (contoh: TiDB Cloud)
  - Skema disediakan dalam skrip SQL (lihat bagian Database)

**Catatan desain**
- Pada implementasi saat ini, aplikasi desktop melakukan operasi data terutama melalui layer util JDBC (bukan melalui REST API). Backend API tetap tersedia untuk pengembangan/integrasi lanjutan.

---

## 4. Struktur Proyek (Lokasi Penting)

- Source (Maven module): [demo/src/main/java](demo/src/main/java)
  - Spring Boot main: [demo/src/main/java/com/DigitalVillageHub/demo/DemoApplication.java](demo/src/main/java/com/DigitalVillageHub/demo/DemoApplication.java)
  - JavaFX app: [demo/src/main/java/com/DigitalVillageHub/demo/javafx/JavaFXApplication.java](demo/src/main/java/com/DigitalVillageHub/demo/javafx/JavaFXApplication.java)
- Resources: [demo/src/main/resources](demo/src/main/resources)
  - FXML: [demo/src/main/resources/fxml](demo/src/main/resources/fxml)
  - CSS: [demo/src/main/resources/css](demo/src/main/resources/css)
  - Konfigurasi: [demo/src/main/resources/application.properties](demo/src/main/resources/application.properties)
- Dokumen modul (panduan internal): folder [demo](demo)
- Skrip database: [demo/setup-database.sql](demo/setup-database.sql), [demo/DATABASE_SCHEMA.sql](demo/DATABASE_SCHEMA.sql)

---

## 5. Teknologi yang Digunakan

- Bahasa: Java 21
- GUI: JavaFX 21 (FXML)
- Backend: Spring Boot 4.0.x (WebMVC, Security, Data JPA)
- Database driver: MySQL Connector/J
- Logging: SLF4J + Logback
- Build tool: Maven (Maven Wrapper: `mvnw`, `mvnw.cmd`)
- Ekspor dokumen: Apache POI (Excel) dan iText (PDF)

---

## 6. Panduan Instalasi & Menjalankan Aplikasi

### 6.1 Prasyarat

- JDK 21 (sesuai `pom.xml`).
- Koneksi database MySQL-compatible yang dapat diakses.

### 6.2 Konfigurasi Database

- Konfigurasi koneksi ada di [demo/src/main/resources/application.properties](demo/src/main/resources/application.properties).
- Disarankan mengisi kredensial melalui environment variable (mis. `DB_USERNAME` dan `DB_PASSWORD`) dan **tidak** menyalin kredensial ke dokumen publik.

**Inisialisasi schema**

Tersedia 2 skrip:

- [demo/setup-database.sql](demo/setup-database.sql) (skrip setup cepat; termasuk tabel `pengajuan_surat` yang dipakai oleh modul surat pada implementasi saat ini)
- [demo/DATABASE_SCHEMA.sql](demo/DATABASE_SCHEMA.sql) (skema lebih lengkap; termasuk tabel `surat` dan view/procedure)

Jika tujuan Anda adalah menjalankan aplikasi sesuai implementasi JavaFX yang ada, mulai dari `setup-database.sql` terlebih dahulu.

### 6.3 Menjalankan Desktop GUI (JavaFX)

Windows (Maven Wrapper):

```powershell
cd demo
\.\mvnw.cmd javafx:run
```

Alternatif (tanpa wrapper, jika Maven tersedia):

```powershell
cd demo
mvn javafx:run
```

### 6.4 Menjalankan Backend API (Spring Boot)

```powershell
cd demo
\.\mvnw.cmd spring-boot:run
```

Catatan: backend API berjalan default pada `http://localhost:8080`.

### 6.5 Build dan Test

```powershell
cd demo
\.\mvnw.cmd clean test
```

---

## 7. Ikhtisar Modul/Fitur

**Login & Akses Role**
- UI: [demo/src/main/resources/fxml/LoginView.fxml](demo/src/main/resources/fxml/LoginView.fxml)
- Controller: `LoginController`
- Validasi role dilakukan dengan mencocokkan pilihan role pada UI dengan role yang tersimpan di database.

**Kelola Warga (Admin/Petugas)**
- UI: [demo/src/main/resources/fxml/AdminWargaView.fxml](demo/src/main/resources/fxml/AdminWargaView.fxml)
- Controller utama: `AdminWargaController`
- Kapabilitas umum: tambah, ubah, hapus, pencarian real-time, dan pemuatan data asynchronous.

**Surat & Dokumen**
- UI Warga: [demo/src/main/resources/fxml/WargaSuratView.fxml](demo/src/main/resources/fxml/WargaSuratView.fxml)
- UI Admin/Petugas: [demo/src/main/resources/fxml/AdminSuratView.fxml](demo/src/main/resources/fxml/AdminSuratView.fxml)
- Controller utama: `WargaSuratController`, `AdminSuratController`
- Kapabilitas umum: submit pengajuan, approve/reject dengan alasan, dan preview surat.

**Keuangan RT / Iuran & Laporan**
- UI: [demo/src/main/resources/fxml/ManajemenKeuanganRTContent.fxml](demo/src/main/resources/fxml/ManajemenKeuanganRTContent.fxml), [demo/src/main/resources/fxml/LaporanKeuanganView.fxml](demo/src/main/resources/fxml/LaporanKeuanganView.fxml)
- Controller terkait: `ManajemenKeuanganRTController`, `TransaksiKasController` (sesuai kebutuhan operasional di dashboard).

---

## 8. Deliverables dan Dokumentasi Pendukung

Dokumen pendukung tersedia di folder [demo](demo). Beberapa titik masuk yang paling relevan:

- [demo/START_HERE.md](demo/START_HERE.md)
- [demo/KELOLA_WARGA_RINGKASAN_FINAL.md](demo/KELOLA_WARGA_RINGKASAN_FINAL.md)
- [demo/SISTEM_PENGAJUAN_SURAT.md](demo/SISTEM_PENGAJUAN_SURAT.md)
- [demo/RUN_SURAT_MODULE.md](demo/RUN_SURAT_MODULE.md)
- [demo/FINAL_STATUS_REPORT.md](demo/FINAL_STATUS_REPORT.md)

---

## 9. Status Proyek dan Catatan Penting

**Status**: implementasi desktop JavaFX untuk modul utama (warga dan surat) berada pada kondisi siap dijalankan dan diuji pada lingkungan lokal dengan database yang sesuai.

**Catatan kompatibilitas skema**
- Saat ini terdapat dua skema/skrip yang berbeda tingkat kelengkapannya.
- Modul surat pada kode JavaFX menggunakan tabel `pengajuan_surat` (tersedia pada `setup-database.sql`).
- `DATABASE_SCHEMA.sql` menyediakan skema yang lebih kaya, namun nama tabel surat yang dipakai adalah `surat`.

Rekomendasi: pilih satu skema yang dijadikan acuan, lalu selaraskan query dan dokumentasi bila proyek akan dipakai dalam produksi.

---

## 10. Kontak dan Tindak Lanjut

Jika Anda ingin, saya bisa:
- Menyatukan skema database (menghapus duplikasi `pengajuan_surat` vs `surat`) agar konsisten dengan kode.
- Membuat bagian “API Endpoints” jika backend Spring Boot mulai dipakai aktif.
- Menyusun template laporan pengujian (UAT) berdasarkan modul yang sudah tersedia.
