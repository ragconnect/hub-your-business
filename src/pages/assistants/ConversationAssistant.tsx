import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
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
  Users,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonialMaria from "@/assets/testimonials/testimonial-maria.jpg";
import testimonialMike from "@/assets/testimonials/testimonial-mike.jpg";
import testimonialJames from "@/assets/testimonials/testimonial-james.jpg";
import logoMariasKitchen from "@/assets/testimonials/logo-marias-kitchen.png";
import logoRapidPlumb from "@/assets/testimonials/logo-rapid-plumb.png";
import logoVitalBalance from "@/assets/testimonials/logo-vital-balance.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";

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
    desc: "Customer calls at 9pm? Your AI picks up and answers questions. It uses your FAQ and business documents to give the right answer every time. Then it books the appointment. You wake up to new jobs.",
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
    title: "Costs less than Netflix, works harder than any employee",
    desc: "Start free. Upgrade for $16/month—just $1 per customer interaction. Handle more than 16 calls or emails? It pays for itself. Your AI works 24/7, never takes vacation, and handles 100+ customers at once.",
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

  const handleDemoSubmit = async (e: React.FormEvent) => {
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
    
    try {
      const { error } = await supabase.functions.invoke("send-demo-request", {
        body: { name: name.trim(), email: email.trim() },
      });

      if (error) {
        console.error("Error sending demo request:", error);
        throw new Error(error.message);
      }

      toast({
        title: "Demo request submitted!",
        description: "We'll be in touch within 24 hours.",
      });
      setName("");
      setEmail("");
    } catch (error: any) {
      console.error("Demo request error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  Manage customer calls, emails, and reviews easily with personalized workflows. Schedule a free demo to customize your AI assistant.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" variant="outline" className="bg-background" asChild>
                    <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
                  </Button>
                  <DemoRequestModal>
                    <Button size="lg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Demo
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>

              {/* Right - Demo Contact Form */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">
                      Free 30 Minute Personalized Setup
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
                        className="bg-background rounded-xl"
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
                        className="bg-background rounded-xl"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-xl" 
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

        {/* Logo Marquee - Social Proof */}
        <LogoMarquee />

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

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Set Up In Under 5 Minutes
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Connect your accounts</h3>
                  <p className="text-muted-foreground">
                    Link your email, phone number, review sites, and messaging apps. Keep your existing numbers—customers won't notice a thing.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Train your AI assistant</h3>
                  <p className="text-muted-foreground">
                    Tell the AI how to handle customers using our easy interface. Add your FAQs, upload business documents, and set your rules. No coding required.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Let AI handle customers</h3>
                  <p className="text-muted-foreground">
                    Customers call, email, or message. Your AI answers instantly, books appointments, and follows up—automatically. You focus on running your business.
                  </p>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3">Review and improve</h3>
                  <p className="text-muted-foreground">
                    Listen to call recordings and read transcripts. See what customers ask. Update your AI's answers to get even better results over time.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <DemoRequestModal>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>

        {/* How We Compare */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              See How RagAdvise Compares
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Built for small businesses who want AI that works out of the box—not a developer project.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-primary">RagAdvise</th>
                    <th className="text-center py-4 px-4 font-medium">Vapi</th>
                    <th className="text-center py-4 px-4 font-medium">OpenAI API</th>
                    <th className="text-center py-4 px-4 font-medium">Google Voice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">No coding required</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">AI-powered conversations</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">White-glove setup support</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Calls, texts, emails, social & reviews</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Calls only</span></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">DIY</span></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Calls/texts</span></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Built-in CRM</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Flat, predictable pricing</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Built for small business</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Live in 24 hours</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Weeks</span></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Weeks+</span></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-10">
              <DemoRequestModal>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              See how business owners like you are saving time and growing with RagAdvise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 - Maria */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/10">
                  <img
                    src={testimonialMaria}
                    alt="Maria S."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoMariasKitchen}
                      alt="Maria's Kitchen"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Maria S.</h3>
                      <p className="text-sm text-muted-foreground">Restaurant Owner, New York</p>
                      <p className="text-lg font-semibold text-primary">
                        Manages 50+ calls per day
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I used to miss half my reservation calls during the dinner rush. Now my AI handles everything—bookings, hours, even catering inquiries."
                  </p>
                </CardContent>
              </Card>

              {/* Testimonial 2 - Mike */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-green-500/10">
                  <img
                    src={testimonialMike}
                    alt="Mike R."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoRapidPlumb}
                      alt="Rapid Plumb"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Mike R.</h3>
                      <p className="text-sm text-muted-foreground">Plumber, Wyoming</p>
                      <p className="text-lg font-semibold text-primary">
                        Handles 10+ emergency calls weekly
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Emergency calls at 2 AM used to wake the whole family. Now the AI books them, texts me the details, and I sleep through the night."
                  </p>
                </CardContent>
              </Card>

              {/* Testimonial 3 - James */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-amber-500/10">
                  <img
                    src={testimonialJames}
                    alt="James T."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoVitalBalance}
                      alt="Vital Balance"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">James T.</h3>
                      <p className="text-sm text-muted-foreground">Wellness Brand Founder, Online</p>
                      <p className="text-lg font-semibold text-primary">
                        Manages 1,000+ customer emails
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Scaling my wellness brand meant drowning in customer emails. RagAdvise handles product questions, refunds, and reviews automatically."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Team Photo */}
              <div className="order-2 lg:order-1">
                <img
                  src={teamPhoto}
                  alt="The RagAdvise team"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              
              {/* Right - Text Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Team Will Become Your Team
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  We're more than a tool you'll love using. We're people you'll love working with.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We have a plan to help you succeed.
                </p>
                <p className="text-muted-foreground mb-8">
                  And that's to not give up till your AI assistant is running smoothly. Our customers say working with us is easy. This is why they stick with us to handle more customer conversations than ever before.
                </p>
                <DemoRequestModal>
                  <Button size="lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </Button>
                </DemoRequestModal>
              </div>
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
            <DemoRequestModal>
              <Button size="lg" variant="secondary" className="mt-8">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Demo
              </Button>
            </DemoRequestModal>
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
