
import { createClient } from '@supabase/supabase-js'

// Ambil kredensial dari environment variable (prefix VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Kredensial Supabase belum diatur di file .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
