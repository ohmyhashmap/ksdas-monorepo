# KSDAS (Kerja Sama Dokumen Arsip Sistem) - Monorepo

Proyek Kolaborasi Semester 5 S1 Informatika, Institut Teknologi Del (Tahun Ajaran 2026/2027).  
Sistem Manajemen Dokumen Kerja Sama (MoU/PKS/IA) untuk Biro Kerja Sama IT Del.

---

## 👥 Tim Pengembang

### Kelompok 1

* Yogi Panjaitan (`11S24023`)
* Rivaldi Siahaan (`11S240`)
* Martha Nababan (`11S240`)

### Kelompok 2

* Dimas Rexan Sidabutar (`11S240`)
* Panji Ananda Lumbantoruan (`11S240`)

### Kelompok 3

* Christian Alberto Sitohang (`11S24039`)
* Gideon Benedictus Panjaitan (`11S24036`)
* Gian Danovan (`11S24004`)

---

## 🎓 Integrasi 5 Mata Kuliah

Proyek ini memenuhi luaran dari 5 mata kuliah:

1. **APPL (Analisis & Perancangan):** Artefak Scrum (User Story, Use Case).
2. **MPTI (Manajemen Proyek):** Pengelolaan *backlog*, *sprint planning*, dan manajemen risiko.
3. **PABWE (Pengembangan Web):** Implementasi *Frontend* (React) & *Backend* (NestJS).
4. **PPMPL (Pengujian Mutu):** Unit Test, Load Testing (k6), dan Static Analysis (SonarQube).
5. **KRIPTO (Keamanan):** JWT, Hashing Password (`bcrypt`), RBAC, dan *Audit Logging*.

---

## 🏗️ Arsitektur Infrastruktur (DevSecOps)

Proyek ini tidak hanya berjalan di `localhost`, melainkan dideploy secara otomatis ke **Server Mandiri (NixOS)** yang dilengkapi dengan sistem keamanan dan CI/CD kelas *Enterprise*:

* **GitLab CE (Self-Hosted):** Manajemen repositori & CI/CD.
* **GitLab Runner:** Eksekutor pipeline menggunakan *Podman*.
* **SonarQube:** Analisis kualitas kode dan keamanan (SAST).
* **Nginx:** Reverse Proxy & Web Server untuk Frontend.
* **Tailscale:** Akses jaringan privat (Zero-Trust) tanpa membuka port publik.
* **PostgreSQL 17 & Redis:** Database & Caching.

---

## 🌐 Akses Aplikasi (Live Server)

Aplikasi ini sudah dideploy dan dapat diakses melalui jaringan lokal (Wi-Fi yang sama) atau melalui VPN Tailscale (dari luar rumah). Pastikan Anda sudah mengatur file `hosts` di komputer Anda.

| Layanan | Akses via LAN (Lokal) | Akses via Tailscale (Luar) |
| :--- | :--- | :--- |
| **Frontend (React)** | `http://ksdas.local` | `http://100.115.107.40` |
| **Backend Swagger** | `http://ksdas.local/api/docs` | `http://100.115.107.40/api/docs` |
| **GitLab Repositori** | `http://gitlab.local` | `https://asus.hippocampus-hue.ts.net` |
| **SonarQube Dashboard** | `http://sonar.local:9000` | `http://100.115.107.40:9000` |

---

## 🚀 Alur Kerja CI/CD (Otomatis)

Setiap kali Anda melakukan `git push origin main`, pipeline GitLab akan otomatis menjalankan:

1. **Build:** Mengompilasi Backend (NestJS) & Frontend (React).
2. **Test:** Menjalankan Unit Test (Jest) dan Load Test (k6).
3. **Lint:** Memeriksa gaya penulisan kode (Oxlint).
4. **SonarQube:** Mengirim laporan analisis *Code Smell*, *Bugs*, dan *Coverage*.
5. **Deploy (CD):**
    * Menyalin hasil build Frontend ke direktori Nginx (`/var/www/ksdas-frontend`).
    * Menyalin kode Backend ke `/var/lib/ksdas-backend` dan me-restart service via SSH.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, TypeScript.
* **Backend:** Node.js, NestJS, TypeORM, PostgreSQL.
* **Keamanan (Kripto):** JWT, `bcryptjs`, Helmet, Role-Based Access Control (RBAC).
* **Database & Storage:** PostgreSQL 17, Redis, MinIO.
* **DevOps:** NixOS, GitLab, Podman, SonarQube, Tailscale.
* **Tools:** pnpm, Turborepo, Docker, DBeaver, Swagger.

---

## 💻 Cara Menjalankan Project (Local Development)

### Prasyarat

* Node.js (v22+)
* `pnpm`
* Docker Desktop

### Langkah-langkah

1. **Clone Repositori**

    ```bash
    git clone https://github.com/ohmyhashmap/ksdas-monorepo.git
    cd ksdas-monorepo
    ```

2. **Install Dependensi**

    ```bash
    pnpm install
    ```

3. **Nyalakan Database & Storage**

    ```bash
    docker compose up -d
    ```

4. **Jalankan Backend & Frontend (Bersamaan)**

    ```bash
    pnpm turbo run dev
    ```

    * Frontend: `http://localhost:5173`
    * Backend (Swagger): `http://localhost:3000/api/docs`

---

## 📅 Status Progres (Sprint 1)

* [x] Setup Monorepo (`pnpm` + Turborepo)
* [x] Setup Docker (PostgreSQL, Redis, MinIO)
* [x] Skema Database Modul A (Auth, RBAC, Organisasi, Notifikasi, Audit)
* [x] Backend Modul A: Login, Register, RBAC, Manajemen Akun, Audit Log, dll.
* [x] **Frontend Aplikasi Web (React) Berhasil Terhubung ke API.**
* [x] **Setup Infrastruktur CI/CD & SonarQube di Server NixOS.**
* [x] **Setup Automated Deployment (Continuous Deployment) ke server.**

---

## 📝 Catatan Integritas Akademik

Sesuai Panduan Proyek Kolaborasi, penggunaan *tools* pihak ketiga dan AI dicantumkan sebagai berikut:

* **AI Assistant:** Digunakan untuk *pair-programming* (NestJS), membantu *debugging* konfigurasi DevOps (NixOS/Docker/GitLab CI), dan menyusun dokumentasi API.
* **Open Source:** NestJS, React, TypeORM, Passport-JWT, Swagger UI, SonarQube, GitLab CE (MIT License).
