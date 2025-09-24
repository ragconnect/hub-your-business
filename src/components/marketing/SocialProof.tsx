import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Link as LinkIcon } from "lucide-react";


const posts = [
  {
    name: "Nora Diaz",
    handle: "@noradiaz_co",
    initials: "ND",
    quote:
      "RagAdvise picked up 7 after-hours calls last week and turned them into booked jobs. My team finally sleeps.",
    likes: "559",
    replies: "29",
  },
  {
    name: "Aiden Brooks",
    handle: "@aidenbooks",
    initials: "AB",
    quote:
      "Meeting notes to tasks in under a minute. The hubs feel like one brain for the business.",
    likes: "1.2K",
    replies: "68",
  },
  {
    name: "Lena Park",
    handle: "@lenapark_ops",
    initials: "LP",
    quote:
      "We stopped losing leads to voicemail. Response times dropped and reviews went up.",
    likes: "353",
    replies: "35",
  },
] as const;

const SocialProof: React.FC = () => {
  return (
    <section id="buzz" aria-labelledby="buzz-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="buzz-title" className="text-3xl md:text-4xl font-semibold tracking-tight">
            Built for people with back‑to‑back work
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Quick notes from operators using RagAdvise in the real world.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.handle} className="rounded-2xl border bg-card shadow-sm">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{p.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium leading-tight">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.handle}</div>
                  </div>
                  <div className="ml-auto text-muted-foreground/70 text-sm">Follow</div>
                </div>
                <p className="mt-3 text-[15px] leading-6">{p.quote}</p>
              </div>
              <div className="border-t px-4 py-3 flex items-center gap-6 text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-xs"><Heart className="size-3.5" aria-hidden="true" /> {p.likes}</span>
                <span className="inline-flex items-center gap-1 text-xs"><MessageCircle className="size-3.5" aria-hidden="true" /> {p.replies}</span>
                <span className="inline-flex items-center gap-1 text-xs"><LinkIcon className="size-3.5" aria-hidden="true" /> Copy link</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
