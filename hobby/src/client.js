import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sxvybspyivjbdhwqkspz.supabase.co"
const supabaseKey = "sb_publishable_DyFuVW0sT8VCqJi2yT2Maw_0MLEvXFR"

export const supabase = createClient(supabaseUrl, supabaseKey)