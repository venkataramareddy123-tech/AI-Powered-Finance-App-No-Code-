
-- Add monthly_income column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'monthly_income') THEN
        ALTER TABLE public.profiles ADD COLUMN monthly_income NUMERIC DEFAULT 0;
    END IF;
END $$;

-- Add budget_allocations column if it doesn't exist  
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'budget_allocations') THEN
        ALTER TABLE public.profiles ADD COLUMN budget_allocations JSONB DEFAULT '{}';
    END IF;
END $$;

-- Update existing users to have default values where they are null
UPDATE public.profiles 
SET budget_allocations = '{}' 
WHERE budget_allocations IS NULL;

UPDATE public.profiles 
SET monthly_income = 0 
WHERE monthly_income IS NULL;
