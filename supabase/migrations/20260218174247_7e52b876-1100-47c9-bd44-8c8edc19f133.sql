CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (unauthenticated visitors submitting the form)
CREATE POLICY "Anyone can submit a demo request"
  ON public.demo_requests
  FOR INSERT
  WITH CHECK (true);

-- No public reads — only accessible via service role (edge functions / backend)
CREATE POLICY "No public reads"
  ON public.demo_requests
  FOR SELECT
  USING (false);
