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
  ListTodo,
  Brain,
  Clock,
  Users,
  Bot,
  Target,
  Repeat,
  Zap,
  Calendar,
  X,
  Check,
  Send,
  ClipboardList,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonial1 from "@/assets/testimonials/task-testimonial-1.jpg";
import testimonial2 from "@/assets/testimonials/task-testimonial-2.jpg";
import testimonial3 from "@/assets/testimonials/task-testimonial-3.jpg";
import logoBuildright from "@/assets/testimonials/logo-buildright.png";
import logoCreativeStudio from "@/assets/testimonials/logo-creative-studio.png";
import logoTechflow from "@/assets/testimonials/logo-techflow.png";

const oldWayProblems = [
  {
    icon: ListTodo,
    title: "You juggle tasks in your head",
    desc: "Important tasks slip through the cracks. You wake up at 3am remembering something you forgot. Stress becomes your constant companion.",
  },
  {
    icon: Brain,
    title: "You waste mental energy deciding what's next",
    desc: "Every morning starts with chaos. What should you do first? You spend more time planning than doing.",
  },
  {
    icon: Clock,
    title: "You miss deadlines constantly",
    desc: "Projects pile up. Clients get frustrated. You promise to deliver 'tomorrow' but tomorrow never comes.",
  },
  {
    icon: Users,
    title: "Your team works in silos",
    desc: "Nobody knows what anyone else is doing. Work gets duplicated. Important tasks fall between the cracks.",
  },
];

const newWaySolutions = [
  {
    icon: Bot,
    title: "Your AI captures every task automatically",
    desc: "Mention a task in email, chat, or voice? AI captures it instantly. Nothing falls through the cracks ever again.",
  },
  {
    icon: Target,
    title: "AI prioritizes what matters most",
    desc: "Wake up to a clear plan. AI analyzes deadlines, dependencies, and importance to tell you exactly what to do next.",
  },
  {
    icon: Repeat,
    title: "Recurring tasks run on autopilot",
    desc: "Weekly reports, monthly reviews, daily standups—AI schedules and reminds automatically. Set it once, forget it forever.",
  },
  {
    icon: Zap,
    title: "Team coordination without meetings",
    desc: "Everyone sees what needs to be done. AI assigns tasks based on skills and availability. Fewer meetings, more doing.",
  },
];

const faqs = [
  {
    q: "How does it integrate with my existing tools?",
    a: "RagAdvise connects with Slack, Gmail, Outlook, Notion, Asana, Trello, and 100+ other apps. Tasks sync automatically.",
  },
  {
    q: "Can it handle complex projects?",
    a: "Yes. Break projects into subtasks, set dependencies, and let AI track progress. It alerts you before deadlines are at risk.",
  },
  {
    q: "What if my team doesn't adopt it?",
    a: "AI meets your team where they are. Capture tasks from email, chat, or voice. No need to change existing workflows.",
  },
  {
    q: "How does AI know what to prioritize?",
    a: "You teach it your priorities once. It learns from your patterns—which tasks you do first, which you delay, what's truly urgent.",
  },
  {
    q: "Can I use it for personal tasks too?",
    a: "Absolutely. Separate workspaces for work and personal. Or combine them—AI knows the difference.",
  },
];

const TaskAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/task` : "https://ragadvise.com/assistants/task";
  const title = "Task Assistant — AI That Manages Your To-Do List 24/7 | RagAdvise";
  const description = "Your AI captures tasks, prioritizes your day, and keeps your team aligned—automatically, without the mental overhead.";

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
                  Drowning in Tasks You Can't Keep Track Of?
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Schedule your demo to get consultation on how to configure your AI assistant for only{" "}
                  <span className="line-through text-muted-foreground/70">$1,999</span>{" "}
                  <span className="font-semibold text-primary">free</span> and finally get your tasks under control.
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
                    <ClipboardList className="w-10 h-10 text-primary mx-auto mb-3" />
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
                You feel overwhelmed. You miss deadlines. Your team is confused. Important work doesn't get done.
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
                You wake up with clarity. You hit every deadline. Your team stays aligned. Important work gets done first.
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
                  <h3 className="text-xl font-bold mb-3">Connect your tools</h3>
                  <p className="text-muted-foreground">
                    Link your email, calendar, Slack, and project tools. AI starts capturing tasks from everywhere.
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
                    Tell the AI your priorities, work hours, and preferences. It learns how you like to work.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Let AI organize your day</h3>
                  <p className="text-muted-foreground">
                    Wake up to a prioritized task list. AI tells you exactly what to focus on. Just execute.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3">Review and improve</h3>
                  <p className="text-muted-foreground">
                    See what you accomplished. Track patterns. AI gets smarter about your work style over time.
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
              Built for busy professionals who want AI that actually reduces their workload.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-primary">RagAdvise</th>
                    <th className="text-center py-4 px-4 font-medium">Asana</th>
                    <th className="text-center py-4 px-4 font-medium">Todoist</th>
                    <th className="text-center py-4 px-4 font-medium">Sticky Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">AI task capture from email/chat</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Smart prioritization</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Manual</span></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Manual</span></td>
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
                    <td className="py-4 px-4">Works across all your tools</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Limited</span></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Limited</span></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Team coordination built-in</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Basic</span></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">No learning curve</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
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
              See how busy professionals are taking control of their tasks with RagAdvise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/10 p-6 pb-0">
                  <img
                    src={testimonial1}
                    alt="Robert C."
                    className="w-full h-56 object-cover object-top rounded-t-xl"
                  />
                  <div className="bg-background border-x border-b rounded-b-xl p-4 flex items-center justify-center">
                    <img
                      src={logoBuildright}
                      alt="BuildRight Construction"
                      className="h-12"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Robert C.</h3>
                  <p className="text-sm text-muted-foreground mb-4">Construction Manager, Florida</p>
                  <p className="text-lg font-semibold text-primary mb-2">
                    Manages 12 projects at once
                  </p>
                  <p className="text-muted-foreground">
                    "I was drowning in sticky notes and missed deadlines. Now AI tells me exactly what needs attention today. My stress levels dropped 80%."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-green-500/10 p-6 pb-0">
                  <img
                    src={testimonial2}
                    alt="Lisa P."
                    className="w-full h-56 object-cover object-top rounded-t-xl"
                  />
                  <div className="bg-background border-x border-b rounded-b-xl p-4 flex items-center justify-center">
                    <img
                      src={logoCreativeStudio}
                      alt="Creative Studio"
                      className="h-12"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Lisa P.</h3>
                  <p className="text-sm text-muted-foreground mb-4">Creative Director, Seattle</p>
                  <p className="text-lg font-semibold text-primary mb-2">
                    Team aligned without meetings
                  </p>
                  <p className="text-muted-foreground">
                    "We cut our weekly meetings from 5 to 1. Everyone knows what they're doing because AI keeps us coordinated automatically."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-amber-500/10 p-6 pb-0">
                  <img
                    src={testimonial3}
                    alt="Tom W."
                    className="w-full h-56 object-cover object-top rounded-t-xl"
                  />
                  <div className="bg-background border-x border-b rounded-b-xl p-4 flex items-center justify-center">
                    <img
                      src={logoTechflow}
                      alt="TechFlow Solutions"
                      className="h-12"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Tom W.</h3>
                  <p className="text-sm text-muted-foreground mb-4">Tech Startup Founder, Austin</p>
                  <p className="text-lg font-semibold text-primary mb-2">
                    Ships features 2x faster
                  </p>
                  <p className="text-muted-foreground">
                    "Before RagAdvise, I spent mornings figuring out what to do. Now I just follow the AI's plan and get twice as much done."
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
                  And that's to not give up till your AI assistant is organizing your work smoothly. Our customers say working with us is easy. This is why they trust us to manage their most important tasks.
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
              Stop drowning in tasks. Let AI organize your work.
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
