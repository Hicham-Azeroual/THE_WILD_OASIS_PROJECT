
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://jlodalhoxatkwsutzunj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsb2RhbGhveGF0a3dzdXR6dW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NTM5OTcsImV4cCI6MjA1NTIyOTk5N30.3h3aK4fhgtycFMEtIhh9SbgE9iNiu-M0uOVjXzyQLco"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;