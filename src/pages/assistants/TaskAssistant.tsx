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
  Mic,
  FileText,
  Clock,
  Users,
  Bot,
  Search,
  Share2,
  MessageCircle,
  Calendar,
  X,
  Check,
  Send,
  ClipboardList,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonial1 from "@/assets/testimonials/testimonial-mike.jpg";
import testimonial2 from "@/assets/testimonials/task-testimonial-2.jpg";
import testimonial3 from "@/assets/testimonials/task-testimonial-3.jpg";
import logoRapidPlumb from "@/assets/testimonials/logo-rapid-plumb.png";
import logoCreativeStudio from "@/assets/testimonials/logo-creative-studio.png";
import logoTechflow from "@/assets/testimonials/logo-techflow.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";

const oldWayProblems = [
  {
    icon: Mic,
    title: "Manual notes miss the critical details",
    desc: "You take notes but realize they didn't capture the essence of the call. Key decisions and action items slip through the cracks.",
  },
  {
    icon: FileText,
    title: "Hours wasted on meeting summaries",
    desc: "After every call, you spend 20+ minutes writing summaries. By the time you're done, you've forgotten half of what was said.",
  },
  {
    icon: Clock,
    title: "Action items never get done",
    desc: "Great meeting, clear next steps—but no one follows up. Tasks fall into a black hole between meetings.",
  },
  {
    icon: Users,
    title: "Your team misses context",
    desc: "People who couldn't join the meeting are left guessing. Cross-functional teams never get the full picture.",
  },
];

const newWaySolutions = [
  {
    icon: Bot,
    title: "AI transcribes every meeting automatically",
    desc: "Sales calls, team syncs, interviews, lectures—convert any audio into notes, summaries, and action items instantly.",
  },
  {
    icon: Search,
    title: "Search and ask questions about your meetings",
    desc: "\"What did the customer say about pricing?\" Search keywords or ask your AI agent about any meeting detail.",
  },
  {
    icon: Share2,
    title: "Share context with your entire team",
    desc: "Send transcripts, summaries, and key takeaways to anyone—even those who couldn't join. Add follow-up notes for latecomers.",
  },
  {
    icon: MessageCircle,
    title: "Proactive pre and post-meeting actions",
    desc: "Send agenda questions before the call. Auto-generate action items after. Focus on getting things done, not just transcription.",
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/task` : "https://ragadvise.com/assistants/task";
  const title = "Task Assistant — AI Meeting Notes, Transcription & Action Items | RagAdvise";
  const description = "Turn any meeting into notes, summaries, and action items. Search your calls, ask AI questions, and never miss a follow-up again.";

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
              <div className="text-center lg:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                  Stop Taking Notes That Miss the Critical Details
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Turn sales calls, team meetings, and interviews into searchable notes, summaries, and action items—automatically.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
                  </Button>
                  <DemoRequestModal>
                    <Button variant="outline" size="lg" className="bg-background">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Demo
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold">
                      Schedule Your Free Demo
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
              We focus on action items and getting things done—not just transcription.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-primary">RagAdvise</th>
                    <th className="text-center py-4 px-4 font-medium">Otter.ai</th>
                    <th className="text-center py-4 px-4 font-medium">Fireflies</th>
                    <th className="text-center py-4 px-4 font-medium">Granola</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Focus on action items</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Basic</span></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Pre-meeting agenda prep</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-4 px-4">Ask AI questions about meetings</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Post-meeting follow-up automation</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><span className="text-sm text-muted-foreground">Basic</span></td>
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
                    <td className="py-4 px-4">Store customer call transcripts</td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
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
              Real Results Across Industries
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From construction sites to creative studios, see how professionals are getting more done.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/10">
                  <img
                    src={testimonial1}
                    alt="Robert C."
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
                        Never misses a follow-up
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I run my whole business solo—plumber, scheduler, follow-up guy. RagAdvise tracks my quotes, reminds me to follow up with customers, and makes sure I order materials before the job."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-green-500/10">
                  <img
                    src={testimonial2}
                    alt="Lisa P."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoCreativeStudio}
                      alt="Creative Studio"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Lisa P.</h3>
                      <p className="text-sm text-muted-foreground">Course Creator, Online</p>
                      <p className="text-lg font-semibold text-primary">
                        Doubled revenue last quarter
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "It tracks my content calendar, manages email sequences, and coordinates with freelancers. I launched two courses on time and grew my list by 3,000."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-amber-500/10">
                  <img
                    src={testimonial3}
                    alt="Tom W."
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={logoTechflow}
                      alt="TechFlow Solutions"
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Tom W.</h3>
                      <p className="text-sm text-muted-foreground">Realtor, Texas</p>
                      <p className="text-lg font-semibold text-primary">
                        Closed 4 forgotten deals
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "It tracks every lead, reminds me when to follow up, and prompts me to reach out to past clients. My sphere business doubled."
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
              Stop drowning in tasks. Let AI organize your work.
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
