import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mic,
  FileText,
  Clock,
  Users,
  Bot,
  Search,
  Share2,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Play,
  Shield,
  Lock,
  FileCheck,
  UserCheck,
  Zap,
  ListTodo,
} from "lucide-react";
import LogoMarquee from "@/components/marketing/LogoMarquee";

const meetingTypes = [
  { id: "1on1", label: "1:1s", icon: Users },
  { id: "team", label: "Team syncs", icon: MessageCircle },
  { id: "client", label: "Client calls", icon: FileText },
  { id: "interviews", label: "Interviews", icon: UserCheck },
  { id: "brainstorms", label: "Brainstorms", icon: Zap },
];

const meetingContent = {
  "1on1": {
    title: "Capture manager & direct report conversations",
    description: "Get AI summaries with feedback themes, career goals discussed, and follow-up commitments—ready to reference before your next 1:1.",
    features: ["Key themes extracted", "Action items for both parties", "Track commitments over time"],
  },
  team: {
    title: "Keep your whole team aligned",
    description: "From standup updates to sprint planning, automatically capture decisions, blockers, and next steps so no one misses the context.",
    features: ["Auto-detect decisions", "Capture blockers & owners", "Share with absent members"],
  },
  client: {
    title: "Never miss a client requirement",
    description: "Transcribe sales calls, discovery sessions, and check-ins. Search for what clients said about pricing, timelines, or concerns.",
    features: ["Full transcript + summary", "Searchable by topic", "Auto-generate follow-up emails"],
  },
  interviews: {
    title: "Structured interview notes, automatically",
    description: "Focus on the candidate, not your keyboard. Get transcripts with skills assessment, culture fit indicators, and comparison notes.",
    features: ["Candidate scorecards", "Compare across interviews", "Share with hiring team"],
  },
  brainstorms: {
    title: "Capture every idea, no matter how fast",
    description: "Creative sessions move quickly. AI catches every concept, groups related ideas, and highlights the most discussed themes.",
    features: ["Idea clustering", "Priority signals", "Export to project tools"],
  },
};

const features = [
  {
    icon: Mic,
    title: "Works with any video tool",
    description: "Transcribes your system audio and mic. No bots joining your calls, no awkward introductions.",
  },
  {
    icon: Users,
    title: "Even for face-to-face",
    description: "Capture notes in person on any device. Works offline and syncs when connected.",
  },
  {
    icon: Calendar,
    title: "Syncs with your calendar",
    description: "Notes get created, started, and shared with attendees—automatically.",
  },
];

const actionFeatures = [
  {
    icon: ListTodo,
    title: "Action items become your to-dos",
    description: "AI extracts tasks with owners, priority levels, and due dates. Nothing slips through the cracks.",
  },
  {
    icon: Bot,
    title: "Projects updated automatically",
    description: "Keep projects current after meetings with new statuses, completed tasks, and revised timelines.",
  },
  {
    icon: Share2,
    title: "Turn notes into follow-ups that land",
    description: "Create meeting recaps tailored to your audience with a simple prompt.",
  },
  {
    icon: Search,
    title: "Find answers when you want them",
    description: "Ask anything about past meetings and get context-rich answers instantly.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "No training on your data",
    description: "Contractual agreements prohibit use of customer data to train AI models.",
  },
  {
    icon: Clock,
    title: "Configurable retention",
    description: "Set auto-transcript deletion windows and control audio storage.",
  },
  {
    icon: Shield,
    title: "Built-in safeguards",
    description: "Audit logs, granular permissions, and SSO keep sensitive work secure.",
  },
  {
    icon: UserCheck,
    title: "Consent disclosures",
    description: "Clear in-product reminders to obtain consent before recording.",
  },
  {
    icon: FileCheck,
    title: "Secure encryption",
    description: "Data encrypted in-transit using TLS 1.2 or greater.",
  },
  {
    icon: CheckCircle2,
    title: "SOC 2 (Type 2)",
    description: "Enterprise-grade compliance for your organization.",
  },
];

const faqs = [
  {
    q: "What types of meetings can it transcribe?",
    a: "Video calls, phone calls, in-person meetings, conferences, lectures, interviews, team syncs—any audio source works.",
  },
  {
    q: "Can I search for specific things mentioned in a call?",
    a: "Yes. Search for keywords, phrases, or ask your AI agent natural questions like 'What pricing did the customer mention?'",
  },
  {
    q: "How is this different from Otter.ai or Fireflies?",
    a: "We focus on action items and getting things done—not just transcription. Pre-meeting prep, post-meeting follow-ups, and proactive task tracking.",
  },
  {
    q: "Can I share meeting notes with people who weren't there?",
    a: "Absolutely. Share full transcripts, summaries, or key takeaways. Add notes and follow-up questions for anyone who missed the call.",
  },
  {
    q: "Does it work with my calendar and other tools?",
    a: "Yes. Connect to Google Calendar, Microsoft, Slack, and project management tools. Import meetings automatically.",
  },
];

const TaskAssistant = () => {
  const [activeMeetingType, setActiveMeetingType] = useState("1on1");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { toast } = useToast();

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/assistants/task`
      : "https://ragadvise.com/assistants/task";
  const title =
    "Task Assistant — AI Meeting Notes, Transcription & Action Items | RagAdvise";
  const description =
    "Turn any meeting into notes, summaries, and action items. Search your calls, ask AI questions, and never miss a follow-up again.";

  const activeContent = meetingContent[activeMeetingType as keyof typeof meetingContent];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <Header />

      <main>
        {/* Hero - Notion-style centered with video */}
        <section className="pt-20 md:pt-32 pb-8" aria-labelledby="hero-title">
          <div className="container max-w-4xl text-center">
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
              AI Meeting Notes
            </p>
            <h1
              id="hero-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              Perfect meeting memory.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Your notetaker catches every detail and delivers actionable
              summaries, right where you work.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href="https://my.ragadvise.com/signup">Try now →</a>
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="container max-w-5xl mt-12">
            <div className="relative rounded-2xl overflow-hidden bg-muted/30 shadow-2xl border">
              {!isVideoPlaying ? (
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {/* Video thumbnail placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Animated interface mockup */}
                    <div className="relative w-full max-w-3xl mx-auto p-6">
                      <Card className="border-0 shadow-xl">
                        <CardContent className="p-0">
                          {/* Tab bar */}
                          <div className="flex items-center gap-2 p-4 border-b bg-background/80">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground">
                              <Bot className="w-4 h-4" />
                              AI Summary
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground">
                              <FileText className="w-4 h-4" />
                              Notes
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-muted font-medium">
                              <Mic className="w-4 h-4" />
                              Transcript
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="w-12 h-1 bg-primary/30 rounded-full overflow-hidden">
                                  <span className="block w-1/2 h-full bg-primary rounded-full animate-pulse" />
                                </span>
                              </div>
                              <Button size="sm" variant="destructive" className="h-7 text-xs">
                                <span className="w-2 h-2 bg-white rounded-sm mr-1" />
                                Stop
                              </Button>
                            </div>
                          </div>
                          
                          {/* Content preview */}
                          <div className="p-6 bg-background">
                            <h3 className="text-lg font-semibold mb-2">
                              User feedback call <span className="text-muted-foreground">@Today</span>
                            </h3>
                            <div className="border-l-2 border-primary/30 pl-4 text-muted-foreground">
                              Good morning everyone. Let's wait a minute for everyone to join before we jump in. 
                              Quick reminder that we're here today to hear your feedback about the new dashboard experience — thank you so
                              <span className="animate-pulse">|</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.loom.com/embed/your-loom-id?autoplay=1"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Logo Marquee - Social Proof */}
        <section className="py-12">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by those at
          </p>
          <LogoMarquee />
        </section>

        {/* Meeting Types - Tabbed Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Tailored to every meeting.
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Every summary gives you exactly what you need to move work forward.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {meetingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveMeetingType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeMeetingType === type.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Content Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{activeContent.title}</h3>
                    <p className="text-muted-foreground mb-6">{activeContent.description}</p>
                    <ul className="space-y-3">
                      {activeContent.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      {meetingTypes.find((t) => t.id === activeMeetingType)?.icon && (
                        <>
                          {(() => {
                            const IconComponent = meetingTypes.find(
                              (t) => t.id === activeMeetingType
                            )?.icon;
                            return IconComponent ? (
                              <IconComponent className="w-16 h-16 text-primary mx-auto mb-4" />
                            ) : null;
                          })()}
                        </>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {meetingTypes.find((t) => t.id === activeMeetingType)?.label} mockup
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Works Everywhere */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Works everywhere you do.
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Capture conversations anywhere. Sync your calendar, and note-taking happens automatically.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notes Turn Into Progress */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              The only place where notes turn into progress.
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Act on meeting outcomes instantly. AI handles the follow-ups so you can focus on what's next.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {actionFeatures.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                      <feature.icon className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <DemoRequestModal>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Security and privacy at the highest standards.
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Trusted by leading companies with enterprise-grade protections built in.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-md">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Questions?
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for perfect meeting memory?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of teams who never miss an action item.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://my.ragadvise.com/signup">Try now →</a>
              </Button>
              <DemoRequestModal>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "RagAdvise Task Assistant",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default TaskAssistant;
