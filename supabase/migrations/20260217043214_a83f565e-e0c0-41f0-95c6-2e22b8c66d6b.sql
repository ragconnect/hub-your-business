
CREATE TABLE public.chat_prompt_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt_text TEXT NOT NULL,
  page TEXT DEFAULT 'task-assistant',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_prompt_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert prompt submissions"
ON public.chat_prompt_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "No public reads"
ON public.chat_prompt_submissions
FOR SELECT
USING (false);
