# NontonYuk — Aplikasi Streaming Film

Aplikasi streaming film modern dengan desain minimalis bertema *cream*, dibangun dengan **Vue 3 + Vite + Pinia + Vue Router + Tailwind CSS + Supabase**.

##  Fitur

-  Beranda dengan hero & daftar film terbaru
-  Pencarian film & penjelajahan berdasarkan genre
-  Halaman streaming (mendukung file video & embed YouTube/Vimeo)
-  Autentikasi (daftar / masuk / keluar) via Supabase Auth
-  Favorit & riwayat tontonan per pengguna
-  Responsif, mobile-first

##  Struktur Folder

```
nonton-yuk/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .env.example
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/styles/main.css
    ├── router/index.js
    ├── stores/
    │   ├── auth.js
    │   └── movies.js
    ├── services/
    │   ├── supabase.js
    │   ├── movieService.js
    │   └── userService.js
    ├── components/
    │   ├── common/ (AppNavbar, AppFooter, LoadingSpinner)
    │   └── movie/  (MovieCard, MovieGrid, VideoPlayer)
    └── views/ (HomeView, MovieDetailView, WatchView, GenreView,
                SearchView, LoginView, RegisterView, ProfileView, NotFoundView)
```



##  Cara Menjalankan

```bash
# 1. Instal dependensi
npm install

# 2. Salin & isi kredensial Supabase
cp .env.example .env

# 3. Jalankan server pengembangan
npm run dev

# 4. Build untuk produksi
npm run build
```

##  Skema Database (Supabase SQL)

kode SQL ini di **SQL Editor** Supabase:

```sql
-- Tabel genre
create table genres (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

-- Tabel film
create table movies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  year int,
  duration int,
  rating numeric(3,1),
  poster_url text,
  backdrop_url text,
  video_url text,
  featured boolean default false,
  genre_id uuid references genres(id),
  created_at timestamptz default now()
);

-- Profil pengguna
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text
);

-- Favorit
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  movie_id uuid references movies(id) on delete cascade,
  unique(user_id, movie_id)
);

-- Riwayat tontonan
create table watch_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  movie_id uuid references movies(id) on delete cascade,
  watched_at timestamptz default now(),
  unique(user_id, movie_id)
);

-- Aktifkan Row Level Security
alter table profiles enable row level security;
alter table favorites enable row level security;
alter table watch_history enable row level security;

-- Kebijakan RLS: pengguna hanya akses datanya sendiri
create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "own favorites" on favorites for all using (auth.uid() = user_id);
create policy "own history" on watch_history for all using (auth.uid() = user_id);

-- Film & genre dapat dibaca publik
alter table movies enable row level security;
alter table genres enable row level security;
create policy "public read movies" on movies for select using (true);
create policy "public read genres" on genres for select using (true);
```

##  Catatan
> Relasi `movies.genres(name)` di service mengasumsikan foreign key `genre_id`. Sesuaikan query jika struktur relasi berbeda.

---

