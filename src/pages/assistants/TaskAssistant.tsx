import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import OfferBanner from "@/components/marketing/OfferBanner";
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
  Calendar,
  X,
  Check,
  Send,
  Laptop,
  Briefcase,
  Headphones,
  KanbanSquare,
  Video,
  BarChart3,
  Archive,
  CheckCircle,
  AlertTriangle,
  Compass,
  DollarSign,
  MessageSquare,
  BookOpen,
  Globe as GlobeIcon,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import logoRapidPlumb from "@/assets/testimonials/logo-rapid-plumb.png";
import logoCreativeStudio from "@/assets/testimonials/logo-creative-studio.png";
import logoTechflow from "@/assets/testimonials/logo-techflow.png";
import logoPeakAccounting from "@/assets/testimonials/logo-peak-accounting.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import retailImg from "@/assets/stories/story-retail.jpg";
import financeImg from "@/assets/stories/story-finance.jpg";
import hospitalityImg from "@/assets/stories/story-hospitality.jpg";
import warehouseImg from "@/assets/stories/story-warehouse.jpg";

const taskTestimonials = [
  {
    company: "Creative Studio",
    tags: ["Sales", "Close rate +40%"],
    image: retailImg,
    alt: "Sales team in modern office environment",
    review: {
      quote: "I used to lose track of client requests during calls. Now my Task Assistant catches everything, and I never miss a follow-up.",
      name: "Sarah K.",
      role: "Sales Manager",
      initials: "SK",
    },
    logo: logoCreativeStudio,
  },
  {
    company: "Rapid Plumb",
    tags: ["Contractor", "Saved project"],
    image: financeImg,
    alt: "Contractor reviewing project documentation",
    review: {
      quote: "We had a he-said-she-said situation with a client. Pulled up the meeting transcript, found the exact moment we discussed scope.",
      name: "Mike T.",
      role: "Contractor",
      initials: "MT",
    },
    logo: logoRapidPlumb,
  },
  {
    company: "Techflow",
    tags: ["Product", "Saves 10 hrs/week"],
    image: hospitalityImg,
    alt: "Product manager reviewing meeting summaries",
    review: {
      quote: "Juggling 5 teams, I was spending 10 hours a week writing up meeting notes. Now I spend 10 minutes reviewing AI summaries.",
      name: "James R.",
      role: "Product Manager",
      initials: "JR",
    },
    logo: logoTechflow,
  },
  {
    company: "Peak Accounting",
    tags: ["Customer Success", "Retention +25%"],
    image: warehouseImg,
    alt: "Customer success team analyzing conversation data",
    review: {
      quote: "Our CS team can finally search all customer conversations. We spot issues before they become problems.",
      name: "Maria L.",
      role: "CS Director",
      initials: "ML",
    },
    logo: logoPeakAccounting,
  },
];

const teamTypes = [
  {
    icon: Laptop,
    title: "Engineering teams",
    desc: "Manage your sprint tasks in a Kanban board. When standup happens, commitments automatically become tickets—no manual Jira entry.",
  },
  {
    icon: Briefcase,
    title: "Sales teams",
    desc: "Track deals and follow-ups in your pipeline. Every prospect call automatically adds tasks you committed to—nothing gets forgotten.",
  },
  {
    icon: Headphones,
    title: "Support & operations teams",
    desc: "Manage your team's work with priorities and statuses. Customer calls automatically create tasks—no switching between tools.",
  },
];

const faqs = [
  {
    q: "Is this a meeting app or a project management app?",
    a: "It's a project management app. We have a Kanban board, task properties, priorities, statuses—everything you'd expect. The difference is tasks can be auto-created from meetings instead of just manual entry.",
  },
  {
    q: "Does it work with my meeting platform?",
    a: "Yes. The AI bot joins Zoom, Google Meet, Microsoft Teams, and phone calls. But remember—meeting recording is just one way to create tasks. You can also manually add tasks like any other PM tool.",
  },
  {
    q: "Can I manually create tasks without meetings?",
    a: "Absolutely. Use the \"Add Task\" button to manually create tasks anytime. The Kanban board works like Jira or Monday—meetings are just a bonus way to capture work.",
  },
  {
    q: "What if I don't want to record a meeting?",
    a: "No problem. Just use Task Assistant like a normal project management tool. Manually create tasks, move them through your workflow, and assign them to your team. Recording is optional.",
  },
  {
    q: "What about meeting transcripts and recordings?",
    a: "Yes, we provide those too—full transcripts, video playback, summaries. But honestly, so does everyone else. What makes us different is the task management system that turns those transcripts into actual work.",
  },
  {
    q: "Can I search old meetings?",
    a: "Yes. Search across all your meeting transcripts by keyword, topic, or question. Find exactly what was said and when.",
  },
  {
    q: "What about sensitive information?",
    a: "Your data is encrypted and secure. You control who has access. Delete any meeting or transcript anytime.",
  },
  {
    q: "Can I try it before committing?",
    a: "Yes. 7-day free trial with full access to all features. Record meetings and see the magic yourself.",
  },
];

const TaskAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/assistants/task` : "https://ragadvise.com/assistants/task";
  const title = "Task Assistant — Project Management + Auto-Create Tasks from Meetings | RagAdvise";
  const description = "Get a project management system that captures work from meetings—not just transcripts. Manage projects like Jira, Monday, or Asana plus auto-create tasks from meetings.";

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
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                  Keep your jobs on track—without the stress.
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  With a personalized AI assistant for tasks, deadlines, and follow-ups. Ensure every task, deadline, and promise is automatically organized for your team—so work gets done and customers stay happy. Turn meetings into action items automatically—so your team always knows what to do next.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    <Check className="w-4 h-4" />
                    Manage projects like Jira, Monday, or Asana
                  </span>
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    <Video className="w-4 h-4" />
                    Plus auto-create tasks from meetings, unlike any other Project tool
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start text-sm text-muted-foreground">
                  <span>📝 Tasks</span>
                  <span>•</span>
                  <span>📋 Kanban board</span>
                  <span>•</span>
                  <span>✅ Action items from meetings</span>
                  <span>•</span>
                  <span>👥 Assign owners</span>
                  <span>•</span>
                  <span>⏰ Due dates</span>
                  <span>•</span>
                  <span>🚨 Priorities</span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
                  </Button>
                  <DemoRequestModal>
                    <Button variant="outline" size="lg" className="bg-background">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>

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

        {/* GPS Callout */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Compass className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-lg">RagAdvise is your GPS for business.</p>
                <p className="text-muted-foreground mt-1">
                  You're looking at the Task Assistant, but it's built to work as part of a connected suite of assistants. If you like this, you'll love how the whole system runs your business end-to-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Marquee - Social Proof */}
        <LogoMarquee />

        {/* Which describes you? */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Which describes you?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {teamTypes.map((team) => (
                <Card key={team.title} className="border-primary/20 bg-background hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <team.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{team.title}</h3>
                    <p className="text-muted-foreground text-sm">{team.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Everything You Need to Manage Work */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need to Manage Work
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              A complete project management system with a superpower: tasks auto-create from your meetings.
            </p>

            {/* Feature 1: Full Project Management System */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <KanbanSquare className="w-6 h-6" />
                  <span className="font-semibold">Full Project Management System</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">What you get:</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Kanban task board</strong> – Visualize all tasks with columns: To Do, In Progress, Done, Blocked, In Review, Cancelled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Auto-create tasks from meetings</strong> – Action items from meetings become trackable tasks with one click ("Assign to bulk")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Full task properties</strong> – Every task has title, description, assigned owner, status, priority (Urgent/Medium/Low), and actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Task workflow management</strong> – Move tasks through your workflow with status updates and start/complete buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Priority tracking</strong> – Flag urgent tasks and filter by priority to focus on what matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Bulk assignment</strong> – Assign multiple action items from meetings to team members at once</span>
                  </li>
                </ul>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-sm mb-2">This is what Jira and Monday can't do.</p>
                  <p className="text-sm text-muted-foreground">They manage tasks. Task Assistant manages tasks AND automatically creates them from your meetings.</p>
                </div>
              </div>
            </div>

            {/* Feature 2: Auto-Create Tasks from Meetings */}
            <div className="mb-16">
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <Bot className="w-6 h-6" />
                  <span className="font-semibold">Auto-Create Tasks from Meetings</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">What you get:</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">AI listens to your meetings</strong> – Bot joins Zoom, Google Meet, Microsoft Teams, and phone calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Extracts commitments automatically</strong> – "I'll finish the design by Friday" becomes a tracked task with due date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Bulk assignment</strong> – Review all action items and assign them to your team with one click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Speaker identification</strong> – Knows who said what so tasks go to the right people</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">No manual ticket creation</strong> – Commitments become tasks without typing anything</span>
                  </li>
                </ul>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-sm mb-2">This is the difference.</p>
                  <p className="text-sm text-muted-foreground">Otter, Zoom, and Fireflies give you transcripts. Task Assistant gives you tickets ready to work on.</p>
                </div>
              </div>
            </div>

            {/* Feature 3: Meeting Intelligence */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <BarChart3 className="w-6 h-6" />
                  <span className="font-semibold">Meeting Intelligence (Bonus)</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">What you get:</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Meeting transcripts & summaries</strong> – Like other tools, we transcribe meetings too</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Participant insights</strong> – See talk time percentages for each participant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Sentiment analysis</strong> – Track meeting sentiment (positive, negative, neutral)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Topic extraction</strong> – AI identifies key topics discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Video playback</strong> – Review recordings with synchronized transcripts</span>
                  </li>
                </ul>
                <div className="bg-muted/50 border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">But here's the thing:</strong> Everyone does meeting transcripts now. What matters is turning those conversations into work that gets done.</p>
                </div>
              </div>
            </div>

            {/* Feature 4: Meeting & Task Archive */}
            <div className="mb-16">
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <Archive className="w-6 h-6" />
                  <span className="font-semibold">Meeting & Task Archive</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">What you get:</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Complete meeting library</strong> – All meetings organized with timestamps, participants, and status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Video recordings stored</strong> – Rewatch any meeting with full video and audio playback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Keyword search</strong> – Find exactly when someone mentioned a specific topic, feature, or decision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Filter by participants</strong> – See all meetings with specific team members or customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Sort by date</strong> – Quickly find recent meetings or go back months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">File size tracking</strong> – Know exactly what's stored and manage your archive</span>
                  </li>
                </ul>
              </div>
          </div>
        </section>
        {/* Pricing */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Pricing
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-8">
              Complete AI meeting assistant: <strong className="text-foreground">Starting at $16/month</strong>
            </p>

            <Card className="border-primary/30 mb-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">What's included:</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Unlimited meeting transcriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Automatic summaries and action items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Searchable meeting archive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Integration with calendar and project tools</span>
                  </li>
                  <li className="flex items-center gap-2 md:col-span-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Works across Zoom, Meet, Teams, phone, and in-person</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-background border rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Compare to alternatives:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Jira, Monday, or Asana:</strong> $10-24/user/month (manage tasks, but you manually create every ticket from meetings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Otter.ai or Fireflies.ai:</strong> $20/user/month (transcribe meetings, but you copy/paste action items into your PM tool)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Using both:</strong> $30-44/user/month + hours of manual work copying tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Notion or ClickUp:</strong> Similar pricing, still manually creating tasks from meeting notes</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t">
                <p className="font-semibold text-primary">With Task Assistant: $16/month for project management that auto-creates tasks from conversations</p>
                <p className="text-sm text-muted-foreground mt-2">Save 15-20 hours per week on meeting notes, task creation, and project updates</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
                </Button>
                <DemoRequestModal>
                  <Button variant="outline" size="lg" className="bg-background">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo
                  </Button>
                </DemoRequestModal>
              </div>
            </div>
          </div>
        </section>

        {/* Full Comparison Table */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How does RagAdvise Task Assistant compare?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              See how Task Assistant stacks up against traditional project management tools and meeting transcription platforms
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground whitespace-nowrap">Feature</th>
                    <th className="text-center py-3 px-3 font-bold text-primary bg-primary/5 whitespace-nowrap">RagAdvise</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Jira</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Monday</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Asana</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">ClickUp</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Notion</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Otter.ai</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Fireflies</th>
                    <th className="text-center py-3 px-3 font-medium whitespace-nowrap">Zoom AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Starting Price</td>
                    <td className="text-center py-3 px-3 bg-primary/5 font-semibold">$16/mo</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$10/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$12/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$13.49/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$10/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$10/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$20/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">$18/user</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Full Project Management</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Auto-Create Tasks from Meetings</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Transcript only</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Transcript only</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Lists only</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Meeting Transcription</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Meeting Bot Joins Calls</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Zoom only</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Bulk Task Assignment</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">One at a time</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">One at a time</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">One at a time</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">One at a time</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">One at a time</span></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Meeting Search & Archive</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Limited</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Meeting Analytics</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Basic</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Basic</span></td>
                    <td className="text-center py-3 px-3"><span className="text-xs text-muted-foreground">Basic</span></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Speaker Identification</td>
                    <td className="text-center py-3 px-3 bg-primary/5"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><X className="h-4 w-4 text-muted-foreground/50 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-3"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">Setup Complexity</td>
                    <td className="text-center py-3 px-3 bg-primary/5 font-medium text-primary">Simple (15 min)</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Moderate</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Simple</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Simple</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Moderate</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Moderate</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Simple</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Simple</td>
                    <td className="text-center py-3 px-3 text-muted-foreground">Simple</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
              <p className="font-semibold mb-2">Key takeaway:</p>
              <p className="text-muted-foreground text-sm max-w-3xl mx-auto">
                Traditional project management tools make you manually create every task from your meetings. Meeting transcription tools give you notes but no task system. Task Assistant is the only platform that combines full project management with automatic task creation from conversations—so commitments made in meetings instantly become trackable work.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" aria-labelledby="testimonials-title" className="border-t bg-muted/10">
          <div className="container py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 id="testimonials-title" className="text-3xl md:text-4xl font-semibold tracking-tight">What customers say</h2>
              <p className="mt-2 text-muted-foreground">Real results from real teams using Task Assistant</p>
            </div>

            <div className="mt-8">
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {taskTestimonials.map((s) => (
                    <CarouselItem key={s.company} className="basis-full md:basis-1/2 lg:basis-1/3">
                      <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                        <AspectRatio ratio={16 / 9}>
                          <img src={s.image} alt={`${s.company} — ${s.alt}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                          <div className="absolute left-4 right-4 top-4">
                            <span className="text-sm font-semibold tracking-wider text-background/90 bg-foreground/80 px-2 py-1 rounded-md">CASE STUDY</span>
                          </div>
                        </AspectRatio>
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <img src={s.logo} alt={s.company} className="h-8 w-8 object-contain" />
                            <h3 className="text-xl md:text-2xl font-semibold">{s.company}</h3>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span key={t} className="rounded-full bg-muted text-foreground/90 text-xs px-3 py-1">{t}</span>
                            ))}
                          </div>
                          <div className="mt-4 rounded-xl border bg-background p-3">
                            <p className="text-sm text-foreground/90">"{s.review.quote}"</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Avatar className="size-6">
                                <AvatarFallback className="text-[10px]">{s.review.initials}</AvatarFallback>
                              </Avatar>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">{s.review.name}</span> · {s.review.role}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <CarouselPrevious aria-label="Previous story" />
                  <CarouselNext aria-label="Next story" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              RagAdvise Task Assistant helps you:
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Stay focused in meetings</h3>
                  <p className="text-sm text-muted-foreground">Let AI catch every detail while you engage</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Never lose action items</h3>
                  <p className="text-sm text-muted-foreground">Automatic task extraction with owners and due dates</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Find answers instantly</h3>
                  <p className="text-sm text-muted-foreground">Search across all past meetings</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Save 15-20 hours per week</h3>
                  <p className="text-sm text-muted-foreground">Automate meeting documentation and follow-ups</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Works Better as a Suite */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Works better as a suite</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              The Task Assistant is powerful alone, but transformative when connected to our full suite.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/conversation'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Conversation Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Captures revenue opportunities and customer requests across channels.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                      <KanbanSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Task Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">You're here. Turns meeting to-dos into action: follow-ups, assignments, deadlines.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/customer'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Customer Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Shows who pays, who churns, and which customers are most profitable.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/training'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Training Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Keeps team workflows consistent with clear SOPs and policies.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/site'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <GlobeIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Site Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Captures leads and ties spend to conversion so marketing is measurable.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/money'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Money Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">The source of truth for business performance and financial health.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team / Free Setup */}
        <section className="py-16 md:py-24 bg-muted/30">
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
                  Free Personalized Setup—No $2,500 Fee
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Vapi, Intercom, RingCentral, and other platforms charge upwards of <strong className="text-foreground">$2,500</strong> for full personalized setup.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe every team deserves AI—without the high cost.
                </p>
                <p className="text-muted-foreground mb-6">
                  That's why our support engineers will <strong className="text-foreground">demo the product and configure your entire setup for free</strong>. No setup fee. No technical expertise required.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
                  <p className="text-sm font-medium mb-2">What you get in your free setup session:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>30-minute personalized demo with a support engineer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Complete configuration of your Task Assistant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Calendar and meeting platform integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Training tailored to your team's workflow</span>
                    </li>
                  </ul>
                </div>
                <DemoRequestModal>
                  <Button size="lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Your Free Setup
                  </Button>
                </DemoRequestModal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common questions</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stop using two tools. Get project management that captures work from meetings.
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              7-day free trial with full access to all features. Record meetings and see the magic yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
              </Button>
              <DemoRequestModal>
                <Button size="lg" variant="outline" className="border-2 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
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
