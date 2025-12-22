import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  Send,
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
    title: "Never forget what customers said",
    desc: "Every customer call is automatically transcribed—whether answered by AI or your team. Search any conversation. See exactly what was said. No more guessing or forgetting details.",
  },
  {
    icon: Zap,
    title: "Cost less than a Netflix Subscription",
    desc: "Your AI works 24/7, never takes vacation, and handles 100+ customers at the same time.",
  },
];

const faqs = [
  {
    q: "How long to set up?",
    a: "30 minutes. Connect your phone and email, tell the AI about your business, done.",
  },
  {
    q: "Does this work? Can I trust the AI to correctly answer questions across phone, email, and reviews?",
    a: "Yes. You control exactly what the AI says across every channel using categories and rules. You also control the system prompt and configuration—so the AI only responds the way you want it to.",
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/conversation` : "https://ragadvise.com/assistants/conversation";
  const title = "Conversation Assistant — Never Miss a Customer Call Again | RagAdvise";
  const description = "Your AI answers calls, replies to messages, and follows up with customers—automatically, 24/7.";

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Demo request submitted!",
        description: "We'll be in touch within 24 hours.",
      });
      setName("");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

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
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Hero Text */}
              <div className="text-center lg:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                  Tired of Spending All Day on Customer Calls, Emails, and Reviews?
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Schedule your demo to get consultation on how to configure your AI assistant for only{" "}
                  <span className="line-through text-muted-foreground/70">$1,999</span>{" "}
                  <span className="font-semibold text-primary">free</span> and manage all your customer calls, emails, and reviews.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

              {/* Right - Demo Contact Form */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">
                      Schedule Demo for{" "}
                      <span className="line-through text-muted-foreground">$1,999</span>{" "}
                      <span className="text-primary">Free</span> Configuration
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Enter your details and we'll reach out within 24 hours
                    </p>
                  </div>
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-name">Your Name</Label>
                      <Input
                        id="demo-name"
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-email">Email Address</Label>
                      <Input
                        id="demo-email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        className="bg-background"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Request Demo
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
