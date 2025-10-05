import { createClient } from '@supabase/supabase-js';
// These will be replaced with your local Supabase URL and anon key
const supabaseUrl = 'http://localhost:54321'; // Default local Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'; // Default anon key for local development
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
