import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fsbowsyndpqdgiklnshp.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYm93c3luZHBxZGdpa2xuc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3Mzg5ODgsImV4cCI6MjA3MDMxNDk4OH0.HwyWYFCjxuQkQgebEIYENX5vzK9iEhKvdbeG0IGN5eo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
