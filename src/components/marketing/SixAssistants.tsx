import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, CheckSquare, DollarSign, GraduationCap, Users, Globe, Play } from "lucide-react";
import VideoModal from "@/components/marketing/VideoModal";

const assistants = [
  {
    key: "conversation",
    icon: MessageSquare,
    emoji: "🗣️",
    title: "Conversation Assistant",
    subtitle: "Stop using Google Voice and Gmail, use AI instead",
    channels: ["Phone calls", "Email", "Text/SMS", "Social media", "Website chat", "Review"],
    features: [
      "Answer customer inquiries instantly across all channels",
      "Handle unlimited conversations simultaneously",
      "Never miss a customer again",
    ],
    link: "/assistants/conversation",
  },
  {
    key: "task",
    icon: CheckSquare,
    emoji: "✅",
    title: "Task Assistant",
    subtitle: "Turn meetings into action automatically",
    channels: ["Meetings", "Projects", "Teams", "Deadlines"],
    features: [
      "Record meetings and extract action items",
      "Auto-create tasks in your project management system",
      "Keep your team aligned without manual work",
    ],
    link: "/assistants/task",
  },
  {
    key: "money",
    icon: DollarSign,
    emoji: "💰",
    title: "Money Assistant",
    subtitle: "Your AI accountant and financial advisor",
    channels: ["Invoicing", "Expenses", "P&L", "Tax"],
    features: [
      "Track expenses and income automatically",
      "Generate financial reports and forecasts",
      "Tax optimization and Section 179 guidance",
    ],
    link: "/assistants/money",
  },
  {
    key: "training",
    icon: GraduationCap,
    emoji: "🎓",
    title: "Training Assistant",
    subtitle: "Onboard and train your team with AI",
    channels: ["Onboarding", "Quizzes", "SOPs"],
    features: [
      "Create interactive training modules",
      "Track progress and quiz comprehension",
      "Integrate with your existing tools",
    ],
    link: "/assistants/training",
  },
  {
    key: "customer",
    icon: Users,
    emoji: "👥",
    title: "Customer Assistant",
    subtitle: "AI-powered CRM that works for you",
    channels: ["CRM", "Follow-ups", "Leads"],
    features: [
      "Automatically log and enrich customer data",
      "Smart follow-ups and relationship tracking",
      "Integrates with HubSpot and Salesforce",
    ],
    link: "/assistants/customer",
  },
  {
    key: "site",
    icon: Globe,
    emoji: "🌐",
    title: "Website Voice",
    subtitle: "Interactive AI avatars for your website",
    channels: ["Voice AI", "Avatars", "Chat"],
    features: [
      "Engage visitors with voice-enabled AI",
      "Full-body avatars with real-time interaction",
      "Convert visitors into customers",
    ],
    link: "/assistants/site",
  },
];

const SixAssistants: React.FC = () => {
  return (
    <section id="assistants" aria-labelledby="assistants-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Complete AI Business Suite</p>
          <h2 id="assistants-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            The Complete AI Business Assistant Suite
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop juggling multiple tools and paying for expensive staff. RagAdvise gives you a complete suite of AI business assistants that work 24/7 to grow your business.
           </p>
          <VideoModal>
            <button className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer text-sm">
              <Play className="w-4 h-4" fill="currentColor" />
              See It in Action
            </button>
          </VideoModal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assistants.map(({ key, emoji, title, subtitle, features, link, channels }) => (
            <Card key={key} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-3xl">{emoji}</span>
                  {channels && channels.map((ch) => (
                    <span key={ch} className="text-[11px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">{ch}</span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground font-medium">{subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {link ? (
                  <a
                    href={link}
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more →
                  </a>
                ) : (
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SixAssistants;
