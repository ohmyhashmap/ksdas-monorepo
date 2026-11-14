# KSDAS (Kerja Sama Dokumen Arsip Sistem) - Monorepo

Proyek Kolaborasi Semester 5 S1 Informatika, Institut Teknologi Del (Tahun Ajaran 2026/2027).  
Sistem Manajemen Dokumen Kerja Sama (MoU/PKS/IA) untuk Biro Kerja Sama IT Del.

---

## 👥 Tim Pengembang (Kelompok 1)

* **Yogi Panjaitan** (`11S24023`)
* **Rivaldi Siahaan** (`11S240`)
* **Martha Nababan** (`11S240`)

## 👥 Tim Pengembang (Kelompok 2)

* **Dimas Rexan Sidabutar** (`11S240`)
* **Panji Ananda Lumbantoruan** (`11S240`)

## 👥 Tim Pengembang (Kelompok 3)

* **Christian Alberto Sitohang** (`11S24039`)
* **Gideon Benedictus Panjaitan** (`11S24036`)
* **Gian Danovan** (`11S24004`)

---

## 🎓 Integrasi 5 Mata Kuliah

Proyek ini memenuhi luaran dari 5 mata kuliah:

1. **APPL (Analisis & Perancangan):** Artefak Scrum (User Story, Use Case) di Coda.
2. **MPTI (Manajemen Proyek):** Pengelolaan *backlog*, *sprint planning*, dan manajemen risiko.
3. **PABWE (Pengembangan Web):** Implementasi *Frontend* & *Backend* (NestJS, React).
4. **PPMPL (Pengujian Mutu):** *Test plan*, Unit Test, E2E Test, dan dokumentasi QA.
5. **KRIPTO (Keamanan):** Implementasi JWT, Hashing Password (`bcrypt`), RBAC (Role-Based Access Control), dan *Audit Logging*.

---

## 📂 Struktur Repositori

```text
ksdas-monorepo/
├── apps/
│   ├── backend/     # API Server menggunakan NestJS (Modular Monolith)
│   └── frontend/    # (Coming Soon) Aplikasi web React
├── packages/        # Library tipe data bersama
├── database/        # Kumpulan script SQL (DDL) untuk inisialisasi database
└── docker-compose.yml # Konfigurasi container (PostgreSQL, Redis, MinIO)
```

---

## 🛠️ Tech Stack

* **Backend:** Node.js, NestJS, TypeORM, PostgreSQL.
* **Keamanan (Kripto):** JWT, `bcryptjs`, Helmet, Role-Based Access Control (RBAC).
* **Database & Storage:** PostgreSQL 15, Redis, MinIO.
* **Tools:** pnpm, Turborepo, Docker, DBeaver, Swagger.

---

## 🚀 Cara Menjalankan Project (Local Development)

### Prasyarat

Pastikan sudah terinstall di sistemmu:

* Node.js (v18+)
* `pnpm`
* Docker Desktop
* DBeaver

### Langkah-langkah

1. **Clone Repositori**

```bash
git clone [https://github.com/ohmyhashmap/ksdas-monorepo.git](https://github.com/ohmyhashmap/ksdas-monorepo.git)
cd ksdas-monorepo

```

1. **Install Dependensi**

```bash
pnpm install

```

1. **Nyalakan Database & Storage**
Pastikan Docker Desktop menyala, lalu jalankan:

```bash
docker compose up -d

```

1. **Jalankan Backend**

```bash
pnpm --filter backend start:dev

```

> 📌 *Akses dokumentasi API (Swagger) di: `http://localhost:3000/api/docs*`

---

## 📝 Catatan Integritas Akademik

Sesuai Panduan Proyek Kolaborasi, penggunaan *tools* pihak ketiga dan AI dicantumkan sebagai berikut:

* **AI Assistant:** Digunakan untuk *pair-programming* dalam menyusun *boilerplate* kode NestJS, membantu *debugging* TypeORM, dan menyusun dokumentasi API.
* **Open Source:** NestJS, TypeORM, Passport-JWT, Swagger UI (MIT License).

---

## 📅 Status Progres (Sprint 0 / Pra-Sprint)

* [x] Setup Monorepo (`pnpm` + Turborepo)
* [x] Setup Docker (PostgreSQL, Redis, MinIO)
* [x] Skema Database Modul A (Auth, RBAC, Organisasi, Notifikasi, Audit)
* [x] Backend Modul A: Login, Register, RBAC, Manajemen Akun, Audit Log, Struktur Organisasi, Komentar & Notifikasi.

---

### Langkah Commit & Push ke GitHub

Setelah file `README.md` disimpan, jalankan perintah ini di terminal Git Bash (di folder root `ksdas-monorepo`):

```bash
git add README.md
git commit -m "docs: merapikan struktur dan format README.md monorepo"
git push origin main

```
