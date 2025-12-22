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
  PhoneOff,
  Mail,
  Clock,
  DollarSign,
  MessageCircle,
  UserCheck,
  Zap,
  Bell,
  AlertTriangle,
  Phone,
  Calendar,
  CheckCircle,
  Smile,
  Target,
  BookOpen,
  Globe,
  FolderOpen,
  Play,
} from "lucide-react";

const problems = [
  {
    icon: PhoneOff,
    title: "Missing calls means missing money",
    desc: "Every unanswered call is a lost customer. When you're with one customer, three more go to voicemail.",
  },
  {
    icon: Mail,
    title: "Email piles up faster than you can respond",
    desc: 'Simple questions like "Are you open?" or "Do you deliver?" take time away from real work.',
  },
  {
    icon: Clock,
    title: "Follow-ups fall through the cracks",
    desc: "You mean to call back, but the day gets busy. Customers move on to competitors who respond faster.",
  },
  {
    icon: DollarSign,
    title: "Hiring help is expensive",
    desc: "A full-time receptionist costs $30,000+ per year. You need coverage but can't afford another person.",
  },
];

const solutions = [
  {
    icon: MessageCircle,
    title: "Answer every call and message instantly",
    desc: "Your AI picks up the phone, replies to emails, texts, and social media messages in under 60 seconds—even at 2am.",
  },
  {
    icon: UserCheck,
    title: "Qualify leads while you work",
    desc: "The assistant asks customers the right questions, books appointments, and sends you only the qualified leads ready to close.",
  },
  {
    icon: Zap,
    title: "Handle simple questions automatically",
    desc: "Pricing, hours, availability, order status—your AI answers instantly using your business knowledge.",
  },
  {
    icon: Bell,
    title: "Follow up with every customer",
    desc: "Payment reminders, appointment confirmations, review requests—all sent automatically so nothing slips through.",
  },
  {
    icon: AlertTriangle,
    title: "Smart escalation when you're needed",
    desc: "The assistant knows when to hand off to you for complex issues or high-value customers.",
  },
];

const features = [
  "Answer 100% of calls and messages",
  "Qualify leads automatically",
  "Book appointments 24/7",
  "Send payment reminders",
  "Handle customer service across phone, email, text, WhatsApp, and social media",
  "Escalate complex issues to you",
  "Track every conversation",
  "Customize responses for your business",
];

const microAssistants = [
  {
    icon: Smile,
    title: "Sentiment Detector",
    desc: "Notices when a customer is frustrated or upset and automatically escalates to you.",
  },
  {
    icon: Target,
    title: "Lead Qualifier",
    desc: "Asks the right questions to identify serious buyers vs. tire kickers.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Bridge",
    desc: "Finds gaps in your customer service responses and suggests better answers over time.",
  },
  {
    icon: Globe,
    title: "Language Detector",
    desc: "Automatically responds in the customer's language—no setup required.",
  },
  {
    icon: FolderOpen,
    title: "Category Router",
    desc: "Sorts incoming messages by type (returns, shipping, pricing) and applies the right rules to each.",
  },
];

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most businesses are live in under 30 minutes. Connect your phone and email, configure your categories, and you're done.",
  },
  {
    q: "What if the AI gives a wrong answer?",
    a: "You control what the assistant says. Set rules for each category, review responses, and the AI learns from your feedback.",
  },
  {
    q: "Can I use my existing phone number?",
    a: "Yes. Forward your current number to RagAdvise or get a new number through the platform.",
  },
  {
    q: "How much does it cost compared to hiring someone?",
    a: "The Conversation Assistant costs less than $500/month. A full-time receptionist costs $2,500+ per month, doesn't work nights or weekends, and takes vacations.",
  },
  {
    q: "What happens to complex customer issues?",
    a: "The assistant knows when to escalate. You'll get a notification with the full conversation context so you can jump in.",
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
              Never Miss a Customer Call or Email Again
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Your AI answers calls, replies to messages, and follows up with customers—automatically, 24/7.
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

        {/* Problems */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              The Problems You Face Every Day
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {problems.map((problem) => (
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
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How the Conversation Assistant Helps
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {solutions.map((solution) => (
                <Card key={solution.title} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">See It In Action</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Watch the Conversation Assistant handle real customer calls and emails
            </p>
            <div className="max-w-3xl mx-auto aspect-video bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <p className="text-muted-foreground">Demo video coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Micro Assistants */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Micro Assistants: Your AI Gets Smarter Every Day
              </h2>
              <p className="text-muted-foreground text-lg">
                The Conversation Assistant works with specialized micro assistants that handle specific tasks:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {microAssistants.map((ma) => (
                <Card key={ma.title}>
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                      <ma.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{ma.title}</h3>
                    <p className="text-sm text-muted-foreground">{ma.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              These micro assistants work together to make your Conversation Assistant smarter, faster, and more helpful—without you lifting a finger.
            </p>
          </div>
        </section>

        {/* Features Checklist */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Get</h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Ready to Stop Missing Customers?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-primary">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Schedule a Demo</h3>
                  <p className="text-muted-foreground mb-6">
                    See the Conversation Assistant handle real customer scenarios from your business.
                  </p>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                      Book a 15-minute demo →
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-8 text-center">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Start Free Trial</h3>
                  <p className="text-muted-foreground mb-6">
                    Answer every call and email starting today. No credit card required.
                  </p>
                  <Button size="lg" className="w-full" asChild>
                    <a href="https://my.ragadvise.com/signup">Sign up now →</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common Questions</h2>
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
              Your customers expect instant responses. Give them what they want—automatically.
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
