
-- Add budget_allocations and monthly_income columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN budget_allocations JSONB DEFAULT '{}',
ADD COLUMN monthly_income NUMERIC DEFAULT 0;

-- Update existing users to have default values
UPDATE public.profiles 
SET budget_allocations = '{}', monthly_income = 0 
WHERE budget_allocations IS NULL OR monthly_income IS NULL;
