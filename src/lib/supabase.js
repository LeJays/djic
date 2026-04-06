import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxkvdjwiqoqelcyhyhdk.supabase.co';
const supabaseKey = 'sb_publishable_pCUU4xX_-db_VyMTO115hQ_B6-MyhU_'; 

export const supabase = createClient(supabaseUrl, supabaseKey);