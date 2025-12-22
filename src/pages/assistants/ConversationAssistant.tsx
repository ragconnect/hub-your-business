import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  Clock,
  DollarSign,
  Bot,
  MessageSquare,
  RefreshCw,
  Zap,
  Calendar,
  Play,
  X,
  Check,
} from "lucide-react";

const oldWayProblems = [
  {
    icon: Phone,
    title: "You answer every call yourself",
    desc: "You're helping one customer. Three more calls go straight to voicemail. They call your competitor instead.",
  },
  {
    icon: Mail,
    title: "You reply to emails one by one",
    desc: 'Customers ask "Are you open?" or "What\'s your price?" You type the same answer 20 times a day.',
  },
  {
    icon: Clock,
    title: "You forget to follow up",
    desc: 'You write down "call John back at 3pm" on a sticky note. By 5pm, you forgot. John hired someone else.',
  },
  {
    icon: DollarSign,
    title: "You hire expensive help",
    desc: "A receptionist costs $2,500 per month. They don't work nights, weekends, or holidays.",
  },
];

const newWaySolutions = [
  {
    icon: Bot,
    title: "Your AI assistant answers every call",
    desc: "Customer calls at 9pm? Your AI picks up, answers questions, and books the appointment. You wake up to new jobs.",
  },
  {
    icon: MessageSquare,
    title: "Your AI replies to all emails and messages",
    desc: 'Customer texts "Do you deliver?" AI responds in 30 seconds with the answer. Works on email, text, WhatsApp, and social media.',
  },
  {
    icon: RefreshCw,
    title: "Your AI follows up automatically",
    desc: "Payment reminder at 3pm? Done. Appointment confirmation the night before? Done. Review request after the job? Done.",
  },
  {
    icon: Zap,
    title: "Costs less than $500 per month",
    desc: "Your AI works 24/7, never takes vacation, and handles 100+ customers at the same time.",
  },
];

const faqs = [
  {
    q: "How long to set up?",
    a: "30 minutes. Connect your phone and email, tell the AI about your business, done.",
  },
  {
    q: "What if it makes a mistake?",
    a: "You control what it says. You can review and approve responses before they go out.",
  },
  {
    q: "Can I keep my phone number?",
    a: "Yes. Your customers call the same number. The AI just answers it for you.",
  },
  {
    q: "What if a customer needs me?",
    a: "The AI knows when to get you. Complex problems come straight to you with all the details.",
  },
];

const ConversationAssistant = () => {
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/conversation` : "https://ragadvise.com/assistants/conversation";
  const title = "Conversation Assistant — Never Miss a Customer Call Again | RagAdvise";
  const description = "Your AI answers calls, replies to messages, and follows up with customers—automatically, 24/7.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container text-center max-w-4xl">
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Tired of Spending All Day on Customer Calls, Emails, and Reviews?
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule your demo to get consultation on how to configure your AI assistant for only{" "}
              <span className="line-through text-muted-foreground/70">$1,999</span>{" "}
              <span className="font-semibold text-primary">free today</span> and manage all your customer calls, emails, and reviews.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
              </Button>
              <Button variant="outline" size="lg" className="bg-background" asChild>
                <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* The Old Way */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-destructive mb-4">
                <X className="w-6 h-6" />
                <span className="text-lg font-semibold">The Old Way</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                What Most Businesses Do
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {oldWayProblems.map((problem) => (
                <Card key={problem.title} className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                          <problem.icon className="w-6 h-6 text-destructive" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                        <p className="text-muted-foreground">{problem.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-destructive mb-2">Why this sucks:</p>
              <p className="text-muted-foreground">
                You lose customers. You waste time. You can't afford help. Your business stays small.
              </p>
            </div>
          </div>
        </section>

        {/* The New Way */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Check className="w-6 h-6" />
                <span className="text-lg font-semibold">The New Way</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                What RagAdvise Does For You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {newWaySolutions.map((solution) => (
                <Card key={solution.title} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <solution.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                        <p className="text-muted-foreground">{solution.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-primary mb-2">Why this works:</p>
              <p className="text-muted-foreground">
                You catch every customer. You save hours every day. You grow without hiring. Your business runs while you sleep.
              </p>
            </div>
          </div>
        </section>

        {/* Demo CTAs */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-8 text-center">
                  <Play className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Watch a 2-Minute Demo</h3>
                  <p className="text-muted-foreground mb-6">
                    See the AI answer real customer calls and emails
                  </p>
                  <Button size="lg" variant="outline" className="w-full bg-background" asChild>
                    <a href="#demo-video">Watch Demo Video →</a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-green-500/50 bg-green-500/5">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Schedule a Free Demo</h3>
                  <p className="text-muted-foreground mb-6">
                    We'll show you how it works with your actual business
                  </p>
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                      Book 15-Minute Demo →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Questions?</h2>
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
          <div className="container text-center">
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              Stop losing customers to voicemail. Let AI answer for you.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href="https://my.ragadvise.com/signup">Start Your Free Trial</a>
            </Button>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "RagAdvise Conversation Assistant",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default ConversationAssistant;
