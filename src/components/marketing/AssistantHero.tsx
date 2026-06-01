import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import VideoModal from "@/components/marketing/VideoModal";
import { supabase } from "@/integrations/supabase/client";
import googleLogo from "@/assets/logos/google.png";

import personaVoice from "@/assets/hero/persona-voice.jpg";
import personaChat from "@/assets/hero/persona-chat.jpg";
import personaPhone from "@/assets/hero/persona-phone.jpg";
import personaEmail from "@/assets/hero/persona-email.jpg";

const PERSONAS = [
  { src: personaVoice, label: "voice · live", rotate: "-6deg", translateY: "0px" },
  { src: personaChat, label: "chat · acme", rotate: "-2deg", translateY: "16px" },
  { src: personaPhone, label: "phone · 0:42", rotate: "3deg", translateY: "8px" },
  { src: personaEmail, label: "email · sent", rotate: "7deg", translateY: "24px" },
];

export interface AssistantHeroProps {
  eyebrow: string;
  rotatingPhrases: string[];
  subtitle: string;
  promptPlaceholder: string;
  ctaUrl: string;
  pageKey: string;
  demoModalPage?: string;
}

const AssistantHero = ({
  eyebrow,
  rotatingPhrases,
  subtitle,
  promptPlaceholder,
  ctaUrl,
  pageKey,
  demoModalPage,
}: AssistantHeroProps) => {
  const [prompt, setPrompt] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = rotatingPhrases[phraseIndex];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed.length < current.length) {
        t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 600);
    } else {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 25);
      } else {
        setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [typed, phase, phraseIndex, rotatingPhrases]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = prompt.trim();
    if (text) {
      try {
        await supabase.from("chat_prompt_submissions").insert({ prompt_text: text, page: pageKey });
      } catch (_) {}
      window.location.href = `${ctaUrl}?prompt=${encodeURIComponent(text)}`;
    } else {
      window.location.href = ctaUrl;
    }
  };

  return (
    <section className="relative overflow-hidden bg-background" aria-labelledby="hero-title">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
        }}
      />

      <div className="container relative z-10 pt-10 md:pt-16 pb-12 md:pb-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <p className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-primary">
            {eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-foreground min-h-[2.4em] md:min-h-[2.4em]"
            style={{ fontFamily: "'Bree Serif', serif" }}
          >
            <span>{typed}</span>
            <span className="inline-block w-[3px] md:w-[4px] h-[0.85em] align-[-0.1em] ml-1 bg-primary animate-pulse" />
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-2xl flex items-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur p-2 pl-5 shadow-lg"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptPlaceholder}
              className="flex-1 bg-transparent border-0 outline-none text-base text-foreground placeholder:text-muted-foreground py-3"
              aria-label="Ask RagAdvise"
            />
            <Button type="submit" size="lg" className="rounded-xl h-12 px-6 font-semibold">
              Create
            </Button>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <Button size="lg" className="h-12 px-5 rounded-xl text-sm font-semibold" asChild>
              <a href={ctaUrl} className="flex items-center gap-2">
                <img src={googleLogo} alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
                Sign up with Google & Get 30 Minutes Free
              </a>
            </Button>
            <DemoRequestModal page={demoModalPage}>
              <Button variant="outline" size="lg" className="h-12 px-5 rounded-xl text-sm font-semibold bg-background">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </DemoRequestModal>
            <VideoModal>
              <button className="inline-flex items-center gap-1 text-primary font-medium hover:underline cursor-pointer text-sm">
                <Play className="w-3 h-3" fill="currentColor" />
                Watch Demo
              </button>
            </VideoModal>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required · 30 minutes free
          </p>

          <div className="mt-12 md:mt-16 w-full flex justify-center items-end gap-3 md:gap-5">
            {PERSONAS.map((p, i) => (
              <div
                key={i}
                className="relative w-24 sm:w-32 md:w-44 lg:w-52 rounded-2xl overflow-hidden border border-border bg-card shadow-2xl transition-transform duration-500 hover:!translate-y-0 hover:!rotate-0"
                style={{ transform: `rotate(${p.rotate}) translateY(${p.translateY})` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={p.src}
                    alt=""
                    width={512}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-mono text-[10px] md:text-xs text-foreground/90 tracking-wide">
                    {p.label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistantHero;
