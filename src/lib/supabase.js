import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://colemgirvanfrfzcrmpj.supabase.co';
const supabaseKey = 'sb_publishable_HidATxKQ7WxKlf2wzm4Ikw_WpcsbR6F'; 

export const supabase = createClient(supabaseUrl, supabaseKey);