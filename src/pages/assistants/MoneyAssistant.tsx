import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import ScrollingCharacterBg from "@/components/marketing/ScrollingCharacterBg";
import OfferBanner from "@/components/marketing/OfferBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import VideoModal from "@/components/marketing/VideoModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  PieChart,
  FileText,
  Landmark,
  Building2,
  RotateCcw,
  Smartphone,
  Calendar,
  Send,
  Check,
  MessageSquare,
  ListChecks,
  Users,
  BookOpen,
  Globe,
  DollarSign,
  Compass,
  Play,
  X,
  Rocket,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import googleLogo from "@/assets/logos/google.png";
import testimonial1 from "@/assets/testimonials/money-testimonial-1.jpg";
import testimonial2 from "@/assets/testimonials/money-testimonial-2.jpg";
import testimonial3 from "@/assets/testimonials/money-testimonial-3.jpg";
import logoPeakAccounting from "@/assets/testimonials/logo-peak-accounting.png";
import logoBudgetBros from "@/assets/testimonials/logo-budget-bros.png";
import logoSunriseBakery from "@/assets/testimonials/logo-sunrise-bakery.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import moneyDashboardPreview from "@/assets/money-dashboard-preview.png";

const features = [
  {
    icon: CreditCard,
    title: "Automatic Expense Tracking",
    highlights: [
      "Connect bank accounts and credit cards for automatic transaction sync",
      "AI automatically sorts expenses into tax-deductible categories",
      "Snap photos of receipts and attach them to transactions",
      "Track multiple LLCs through different workspaces",
      "Transactions appear within 4-24 hours of purchase",
    ],
    tipNew: "Start with clean books from day one—no learning curve",
    tipExisting: "Save 2+ hours per week on manual bookkeeping",
  },
  {
    icon: PieChart,
    title: "Real-Time Financial Insights",
    highlights: [
      '"How much did we spend on supplies last week?" Get answers in seconds',
      "See spending by category, vendor, or time period with visual dashboards",
      "Monitor expenses like marketing, food, office supplies, payroll",
      "Know exactly what you're making on every job or product",
      "Tag unnecessary expenses and see monthly totals",
    ],
    tipNew: 'Ask: "Which business meals were most expensive last month?"',
    tipExisting: "Track necessary vs. unnecessary expenses to cut $500-1,000 in waste monthly",
  },
  {
    icon: FileText,
    title: "Professional Financial Documents",
    highlights: [
      "Generate P&L reports for creditors, banks, or investors with one click",
      "Create professional invoices using AI, templates, or upload your own format",
      "Track which invoices are paid, pending, or overdue",
      "Weekly, monthly, quarterly, and annual reports sent automatically",
      "Export transactions and reports for your accountant anytime",
    ],
    tipNew: "Look professional when applying for loans or credit lines",
    tipExisting: "Financial documents ready in minutes, not hours",
  },
  {
    icon: Landmark,
    title: "Tax Preparation Made Easy",
    highlights: [
      "Organize expenses according to IRS categories (Cost of Goods, Contract Labor, etc.)",
      "Track business meals (80% deductible), rent, travel (100% reimbursable)",
      "Store all receipts with transaction details for IRS audits",
      "Note who attended business meals and what was discussed",
      "Everything the IRS needs in one place—audit-proof documentation",
    ],
    tipNew: "Save $2,000-5,000 annually in taxes with proper expense tracking",
    tipExisting: "Never miss a deduction again—AI catches every tax-deductible expense",
  },
  {
    icon: Building2,
    title: "Business Asset Tracking & Depreciation",
    highlights: [
      "Log laptops, vehicles, furniture, equipment with purchase date and cost",
      "AI calculates tax depreciation schedules (3, 5, 7, or 39-year schedules)",
      "Track when assets were purchased, current value, and when to replace",
      "Generate depreciation schedules for your accountant at tax time",
      "Identify assets eligible for Section 179 immediate expensing",
    ],
    tipNew: "Computers (5-year), furniture (7-year), vehicles (5-year), buildings (39-year)",
    tipExisting: "Save thousands by properly depreciating assets instead of expensing everything at once",
  },
  {
    icon: RotateCcw,
    title: "Subscription Management & Tracking",
    highlights: [
      "Automatic detection of recurring monthly bills from bank transactions",
      "Get notified when subscriptions renew or prices increase",
      "Flag subscriptions you don't need and set reminders to cancel",
      "See what each subscription costs per year, not just per month",
      "Find duplicate subscriptions for similar services",
    ],
    tipNew: "Track: Adobe, Microsoft 365, Slack, Zoom, Canva, and more",
    tipExisting: "Most businesses waste $500-1,500/year on unused subscriptions they forgot about",
  },
  {
    icon: Smartphone,
    title: "Digital Expense Diary",
    highlights: [
      "Record expenses while on job sites or traveling via mobile app",
      "Log gas, mileage, and trip details for reimbursement",
      "Add voice notes about who, what, when, and why for each expense",
      "Tag expenses you regret, see 'unnecessary' totals at month-end",
      "Snap and attach receipts instantly from your phone",
    ],
    tipNew: "Contractors: Track materials and mileage from the job site",
    tipExisting: "Consultants: Document every client expense for accurate billing",
  },
];

const suiteAssistants = [
  { icon: MessageSquare, name: "Conversation Assistant", desc: "Captures revenue opportunities and customer requests across channels.", link: "/assistants/conversation" },
  { icon: ListChecks, name: "Task Assistant", desc: "Turns financial to-dos into action: invoices, follow-ups, renewals.", link: "/assistants/task" },
  { icon: Users, name: "Customer Assistant", desc: "Shows who pays, who churns, and which customers are most profitable.", link: "/assistants/customer" },
  { icon: BookOpen, name: "Training Assistant", desc: "Keeps finance workflows consistent with clear SOPs and policies.", link: "/assistants/training" },
  { icon: Globe, name: "Website Voice", desc: "Captures leads and ties spend to conversion so marketing is measurable.", link: "/assistants/site" },
  { icon: DollarSign, name: "Money Assistant", desc: "You're here. It's the source of truth for business performance.", highlight: true },
];

const testimonials = [
  {
    quote: "Tax season used to stress me out. Now I click 'generate P&L' and my accountant has everything she needs. Saved me $1,200 in prep fees.",
    name: "James R.",
    role: "HVAC Business",
    image: testimonial1,
    logo: logoPeakAccounting,
    stat: "Saved $1,200 in prep fees",
  },
  {
    quote: "I was losing track of $500-1,000 in deductions every month. Money Assistant caught everything. My tax bill dropped by $6,000.",
    name: "Maria L.",
    role: "Restaurant Owner",
    image: testimonial2,
    logo: logoBudgetBros,
    stat: "Tax bill dropped $6,000",
  },
  {
    quote: "As a contractor, tracking receipts was impossible. Now I snap a photo on-site and it's done. My accountant loves me now.",
    name: "Mike T.",
    role: "General Contractor",
    image: testimonial3,
    logo: logoSunriseBakery,
    stat: "Receipts tracked instantly",
  },
];

const faqs = [
  {
    q: "Which banks and credit cards work?",
    a: "We support 10,000+ financial institutions via Plaid. If your bank works with Plaid, it works with us. You can also add transactions manually if needed.",
  },
  {
    q: "How long does it take to sync transactions?",
    a: "Initial sync takes 5-10 minutes. After that, new transactions appear within 4-24 hours depending on your bank.",
  },
  {
    q: "Can I track cash expenses?",
    a: "Yes. Add manual transactions for cash purchases and attach receipt photos.",
  },
  {
    q: "Is my financial data secure?",
    a: "Absolutely. Bank-level encryption, secure cloud storage, and you control access. We never see your bank login credentials.",
  },
  {
    q: "What if AI categorizes something wrong?",
    a: "Easy to fix. Click the transaction, change the category, and AI learns your preferences for next time.",
  },
  {
    q: "Can I connect multiple bank accounts?",
    a: "Yes. Connect unlimited checking accounts, savings accounts, and credit cards across multiple businesses.",
  },
  {
    q: "Do I still need an accountant?",
    a: "Money Assistant organizes everything, but you'll still want an accountant for tax strategy and filing. They'll love you because your books are clean.",
  },
  {
    q: "Can I try it before committing?",
    a: "Yes. 7-day free trial with full access to all features. Connect your accounts and see your finances organized instantly.",
  },
];

const whoDescribesYou = [
  {
    icon: "🆕",
    title: "New business owner",
    desc: "Get professional bookkeeping from day one—no accountant needed, no spreadsheet chaos, no missed deductions.",
  },
  {
    icon: "🏢",
    title: "Drowning in receipts",
    desc: "You're spending hours categorizing expenses and still don't know your real profit margins. Automate it and get your time back.",
  },
];

const MoneyAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/money` : "https://ragadvise.com/assistants/money";
  const title = "Money Assistant — AI Bookkeeping That Tracks Every Dollar | RagAdvise";
  const description = "Get an AI assistant that tracks every dollar, organizes your finances, and keeps your books ready for tax time. Never scramble for receipts again.";

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

      <OfferBanner />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden" aria-labelledby="hero-title">
          <ScrollingCharacterBg />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-wide text-primary" style={{ fontFamily: "'Caprasimo', serif" }}>
                  Get an AI assistant that tracks every dollar, organizes your finances, and keeps your books ready for tax time.
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Never scramble for receipts again with an AI assistant that handles:
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm">
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">💳 Expense tracking</span>
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">📊 P&L statements</span>
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">🧾 Invoice creation</span>
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">💰 Tax prep</span>
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">📈 Financial reports</span>
                </div>
                <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
                  <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                    <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                      <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                      Sign up with Google
                    </a>
                  </Button>
                  <DemoRequestModal>
                    <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo & Free Setup
                    </Button>
                  </DemoRequestModal>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 border-t" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="flex-1 border-t" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                    <span className="text-muted-foreground">No credit card required</span>
                    <span className="text-muted-foreground">·</span>
                    <VideoModal>
                      <button className="inline-flex items-center gap-1 text-primary font-medium hover:underline cursor-pointer">
                        <Play className="w-3 h-3" fill="currentColor" />
                        Watch Demo
                      </button>
                    </VideoModal>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* GPS Callout */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Compass className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-lg">RagAdvise is your GPS for business.</p>
                <p className="text-muted-foreground mt-1">
                  You're looking at the Money Assistant, but it's built to work as part of a connected suite of assistants. If you like this, you'll love how the whole system runs your business end-to-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* Which Describes You */}
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Which describes you?</h2>
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
              <div className="grid gap-6">
                {whoDescribesYou.map((item) => (
                  <Card key={item.title} className="border-primary/20">
                    <CardContent className="p-8 text-center">
                      <span className="text-5xl mb-4 block">{item.icon}</span>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <img
                  src={moneyDashboardPreview}
                  alt="RagAdvise Money Assistant dashboard showing total balance, saving goals, recent transactions, and weekly comparison charts"
                  className="rounded-2xl shadow-lg w-full max-w-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need in One AI Bookkeeping Assistant
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Complete financial management powered by AI—from expense tracking to tax prep.
            </p>

            <div className="space-y-12">
              {features.map((feature, idx) => (
                <Card key={feature.title} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8">
                    <p className="font-medium text-muted-foreground mb-4">What you get:</p>
                    <ul className="space-y-3 mb-6">
                      {feature.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary mb-1">💡 New businesses:</p>
                        <p className="text-sm text-muted-foreground">{feature.tipNew}</p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary mb-1">💡 Existing businesses:</p>
                        <p className="text-sm text-muted-foreground">{feature.tipExisting}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Works Better as a Suite */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Works better as a suite</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              The Money Assistant is powerful alone, but transformative when connected to our full suite.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {suiteAssistants.map((assistant) => (
                <Card 
                  key={assistant.name} 
                  className={`${assistant.highlight ? "border-primary bg-primary/5" : ""} ${assistant.link ? "hover:shadow-lg transition-shadow cursor-pointer" : ""}`}
                  onClick={() => assistant.link && (window.location.href = assistant.link)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${assistant.highlight ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <assistant.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold">{assistant.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{assistant.desc}</p>
                    {assistant.link && (
                      <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Pricing That Makes Sense
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              See how much you save compared to traditional solutions.
            </p>

            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="new" className="text-base">
                  <Rocket className="w-4 h-4 mr-2" />
                  For New Businesses
                </TabsTrigger>
                <TabsTrigger value="existing" className="text-base">
                  <Building2 className="w-4 h-4 mr-2" />
                  For Existing Businesses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-primary mb-2">
                        $16<span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-lg text-muted-foreground">Complete AI bookkeeping system</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Automatic expense tracking</li>
                          <li>• Unlimited account connections</li>
                          <li>• P&L and financial reports</li>
                          <li>• Invoice creation and tracking</li>
                          <li>• Tax-ready categorization</li>
                          <li>• Receipt storage & analytics</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          Building it yourself:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Bookkeeper: <span className="line-through">$300-500/month</span></li>
                          <li>QuickBooks: <span className="line-through">$30-200/month</span></li>
                          <li>Accountant (tax prep): <span className="line-through">$500-2,000/year</span></li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total: <span className="line-through">$1,100-7,000/year</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">RagAdvise = Save $908-6,808 annually</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
                      <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                        <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                          <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                          Sign up with Google
                        </a>
                      </Button>
                      <DemoRequestModal>
                        <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Demo & Free Setup
                        </Button>
                      </DemoRequestModal>
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                        <span className="text-muted-foreground">No credit card required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="existing">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-primary mb-2">
                        $16<span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-lg text-muted-foreground">vs. your current costs</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Replace bookkeeper + accounting software</li>
                          <li>• Auto-categorize all transactions</li>
                          <li>• Generate invoices in seconds</li>
                          <li>• Tax-ready reports year-round</li>
                          <li>• Receipt capture & storage</li>
                          <li>• Unlimited transactions</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          What you're spending now:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Bookkeeper: <span className="line-through">$300-500/month</span></li>
                          <li>QuickBooks/Xero: <span className="line-through">$30-200/month</span></li>
                          <li>Manual data entry: <span className="line-through">2+ hrs/week</span></li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total: <span className="line-through">$330-700/month + lost time</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">Save $314-684/month while getting better accuracy</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
                      <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                        <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                          <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                          Sign up with Google
                        </a>
                      </Button>
                      <DemoRequestModal>
                        <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Demo & Free Setup
                        </Button>
                      </DemoRequestModal>
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                        <span className="text-muted-foreground">No credit card required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What customers say</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real results from real business owners using Money Assistant.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <Card key={t.name} className="overflow-hidden border-0 shadow-lg">
                  <div className="bg-primary/10">
                    <img src={t.image} alt={t.name} className="w-full h-72 object-cover object-top" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={t.logo} alt={t.role} className="h-16 w-16 object-contain flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold">{t.name}</h3>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                        <p className="text-lg font-semibold text-primary">{t.stat}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"{t.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">RagAdvise Money Assistant helps you:</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <span className="text-3xl mb-3 block">💰</span>
                <h3 className="font-bold mb-2">Save thousands on taxes</h3>
                <p className="text-sm text-primary-foreground/80">Never miss a deductible expense</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <span className="text-3xl mb-3 block">⏱️</span>
                <h3 className="font-bold mb-2">Save 2+ hours per week</h3>
                <p className="text-sm text-primary-foreground/80">Automate bookkeeping and categorization</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <span className="text-3xl mb-3 block">📊</span>
                <h3 className="font-bold mb-2">Know your numbers</h3>
                <p className="text-sm text-primary-foreground/80">Real profit margins, not guesses</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <span className="text-3xl mb-3 block">💼</span>
                <h3 className="font-bold mb-2">Look professional</h3>
                <p className="text-sm text-primary-foreground/80">Financial documents ready for banks and investors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img src={teamPhoto} alt="The RagAdvise team" className="rounded-2xl shadow-xl w-full" />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team Will Become Your Team</h2>
                <p className="text-xl text-muted-foreground mb-4">
                  We're more than a tool you'll love using. We're people you'll love working with.
                </p>
                <p className="text-lg text-muted-foreground mb-4">We have a plan to help you succeed.</p>
                <p className="text-muted-foreground mb-8">
                  And that's to not give up till your AI assistant is managing your finances smoothly. Our customers say working with us is easy. This is why they trust us with their business finances.
                </p>
                <DemoRequestModal>
                  <Button size="lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo & Free Setup
                  </Button>
                </DemoRequestModal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
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
            <div className="mt-8 flex flex-col gap-3 justify-center max-w-md mx-auto">
              <Button size="lg" variant="secondary" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                  <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                  Sign up with Google or email
                </a>
              </Button>
              <DemoRequestModal>
                <Button size="lg" variant="ghost" className="w-full h-14 text-base font-semibold rounded-lg border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo & Free Setup
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
