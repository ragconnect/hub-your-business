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
  Receipt,
  FileSpreadsheet,
  Clock,
  AlertTriangle,
  Bot,
  TrendingUp,
  PieChart,
  Zap,
  Calendar,
  X,
  Check,
  Send,
  DollarSign,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonial1 from "@/assets/testimonials/money-testimonial-1.jpg";
import testimonial2 from "@/assets/testimonials/money-testimonial-2.jpg";
import testimonial3 from "@/assets/testimonials/money-testimonial-3.jpg";
import logoPeakAccounting from "@/assets/testimonials/logo-peak-accounting.png";
import logoBudgetBros from "@/assets/testimonials/logo-budget-bros.png";
import logoSunriseBakery from "@/assets/testimonials/logo-sunrise-bakery.png";

const oldWayProblems = [
  {
    icon: Receipt,
    title: "You chase receipts and invoices",
    desc: "Every expense requires hunting through emails, photos, and paper. You spend hours sorting what should take minutes.",
  },
  {
    icon: FileSpreadsheet,
    title: "You update spreadsheets manually",
    desc: "Copy-paste from bank statements. Check formulas. Fix errors. Your books are always a month behind reality.",
  },
  {
    icon: Clock,
    title: "You forget what you owe and who owes you",
    desc: "Late payments pile up. You miss early payment discounts. Cash flow becomes a guessing game.",
  },
  {
    icon: AlertTriangle,
    title: "You dread tax season",
    desc: "Scrambling to find documents. Worried you missed deductions. Paying your accountant to organize, not strategize.",
  },
];

const newWaySolutions = [
  {
    icon: Bot,
    title: "Your AI captures every expense automatically",
    desc: "Forward a receipt, snap a photo, or connect your bank. AI categorizes everything instantly and learns your patterns.",
  },
  {
    icon: TrendingUp,
    title: "Real-time financial insights",
    desc: "See exactly where your money goes. Get alerts before problems happen. Know your profit margin at a glance.",
  },
  {
    icon: PieChart,
    title: "Never miss a payment again",
    desc: "AI tracks every invoice and bill. Sends reminders before due dates. Follows up on late payments automatically.",
  },
  {
    icon: Zap,
    title: "Tax-ready books year-round",
    desc: "Every transaction categorized for taxes. Generate reports in seconds. Hand your accountant clean books—save money on prep fees.",
  },
];

const faqs = [
  {
    q: "How does it connect to my bank?",
    a: "We use bank-grade encryption to securely connect to 10,000+ financial institutions. Your credentials are never stored on our servers.",
  },
  {
    q: "Can it handle multiple businesses?",
    a: "Yes. Manage unlimited businesses from one dashboard. Keep finances completely separate or see combined reports.",
  },
  {
    q: "What if I have existing accounting software?",
    a: "RagAdvise integrates with QuickBooks, Xero, and FreshBooks. Import your existing data in minutes.",
  },
  {
    q: "Is my financial data secure?",
    a: "Absolutely. We use 256-bit encryption, SOC 2 compliance, and never sell your data. Your finances stay private.",
  },
  {
    q: "Can my accountant access my books?",
    a: "Yes. Invite your accountant with read-only or full access. They can pull reports anytime without bothering you.",
  },
];

const MoneyAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/money` : "https://ragadvise.com/assistants/money";
  const title = "Money Assistant — AI-Powered Bookkeeping That Works 24/7 | RagAdvise";
  const description = "Your AI tracks expenses, manages invoices, and keeps your books tax-ready—automatically, without the spreadsheet headache.";

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
              <div className="text-center lg:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                  Stop Losing Money to Messy Books and Missed Payments
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Schedule your demo to get consultation on how to configure your AI assistant for only{" "}
                  <span className="line-through text-muted-foreground/70">$1,999</span>{" "}
                  <span className="font-semibold text-primary">free</span> and take control of your business finances.
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

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
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
                You leak money. You miss deductions. You stress about cash flow. Your business decisions are based on guesses.
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
                You see every dollar. You catch problems early. You save on accounting fees. Your business decisions are backed by data.
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
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Connect your accounts</h3>
                  <p className="text-muted-foreground">
                    Link your bank accounts, credit cards, and payment processors. All transactions sync automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Train your AI assistant</h3>
                  <p className="text-muted-foreground">
                    Tell the AI your expense categories, tax rules, and preferences. It learns how you run your business.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Let AI manage your money</h3>
                  <p className="text-muted-foreground">
                    Transactions categorize automatically. Invoices tracked. Bills flagged before due. You focus on growing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3">Review and optimize</h3>
                  <p className="text-muted-foreground">
                    Get weekly insights on spending patterns. Spot opportunities to save. Make smarter financial decisions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button size="lg" asChild>
                <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo For Set Up Consultation
                </a>
              </Button>
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
              Built for small businesses who want smart bookkeeping without hiring an accountant.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-primary">RagAdvise</th>
                    <th className="text-center py-4 px-4 font-medium">QuickBooks</th>
                    <th className="text-center py-4 px-4 font-medium">Spreadsheets</th>
                    <th className="text-center py-4 px-4 font-medium">Bookkeeper</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">AI-powered categorization</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Basic</span></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Automatic receipt capture</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">White-glove setup support</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Real-time cash flow alerts</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Under $50/month</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">No accounting knowledge needed</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-10">
              <Button size="lg" asChild>
                <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </a>
              </Button>
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
              See how business owners like you are taking control of their finances with RagAdvise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/10">
                  <img
                    src={testimonial1}
                    alt="Sarah K."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoPeakAccounting}
                      alt="Peak Accounting"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Sarah K.</h3>
                      <p className="text-sm text-muted-foreground">Accountant, Colorado</p>
                      <p className="text-lg font-semibold text-primary">
                        Saves 15+ hours per week
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I used to spend entire weekends catching up on bookkeeping. Now RagAdvise categorizes everything automatically. I just review and approve."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-green-500/10">
                  <img
                    src={testimonial2}
                    alt="David M."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoBudgetBros}
                      alt="Budget Bros"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">David M.</h3>
                      <p className="text-sm text-muted-foreground">Financial Consultant, Texas</p>
                      <p className="text-lg font-semibold text-primary">
                        Found $12K in missed deductions
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "First month using RagAdvise, the AI flagged expenses I'd been miscategorizing for years. Paid for itself 100x over at tax time."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-amber-500/10">
                  <img
                    src={testimonial3}
                    alt="Emma L."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoSunriseBakery}
                      alt="Sunrise Bakery"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Emma L.</h3>
                      <p className="text-sm text-muted-foreground">Bakery Owner, California</p>
                      <p className="text-lg font-semibold text-primary">
                        Never late on vendor payments
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I used to forget invoices and damage supplier relationships. Now AI reminds me before anything is due. My vendors love me."
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
              <div className="order-2 lg:order-1">
                <img
                  src={teamPhoto}
                  alt="The RagAdvise team"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              
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
                  And that's to not give up till your AI assistant is managing your finances smoothly. Our customers say working with us is easy. This is why they trust us with their business finances.
                </p>
                <Button size="lg" asChild>
                  <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </a>
                </Button>
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
              Stop losing money to messy books. Let AI manage your finances.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Demo
              </a>
            </Button>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "RagAdvise Money Assistant",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default MoneyAssistant;
