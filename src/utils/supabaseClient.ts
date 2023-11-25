/* This code is importing necessary modules from the `@supabase/supabase-js` library and creating a
Supabase client. */
import { createClient, PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl !== undefined && supabaseAnonKey !== undefined) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export default supabase;
