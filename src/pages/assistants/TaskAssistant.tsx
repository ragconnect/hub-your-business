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
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonial1 from "@/assets/testimonials/testimonial-mike.jpg";
import testimonial2 from "@/assets/testimonials/task-testimonial-2.jpg";
import testimonial3 from "@/assets/testimonials/task-testimonial-3.jpg";
import testimonial4 from "@/assets/testimonials/testimonial-maria.jpg";
import logoRapidPlumb from "@/assets/testimonials/logo-rapid-plumb.png";
import logoCreativeStudio from "@/assets/testimonials/logo-creative-studio.png";
import logoTechflow from "@/assets/testimonials/logo-techflow.png";
import logoPeakAccounting from "@/assets/testimonials/logo-peak-accounting.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";

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

      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                  Get a project management system that captures work from meetings—not just transcripts.
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Stop using Jira for tasks and Otter for meetings. Task Assistant manages your work AND captures commitments from conversations automatically.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    <Check className="w-4 h-4" />
                    Manage projects like Jira, Monday, or Asana
                  </span>
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    <Video className="w-4 h-4" />
                    Plus auto-create tasks from meetings
                  </span>
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
              <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Laptop className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Engineering teams</p>
                    <p className="text-xs text-muted-foreground">Meeting action items automatically become trackable tasks on your board</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Sales teams</p>
                    <p className="text-xs text-muted-foreground">Every prospect commitment becomes a task with priority and due date</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Headphones className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Support teams</p>
                    <p className="text-xs text-muted-foreground">Customer issues from calls become prioritized tasks instantly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Auto-Create Tasks from Meetings */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="order-2 lg:order-1 bg-muted/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Laptop className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Engineering teams</p>
                    <p className="text-xs text-muted-foreground">Standup creates your daily tasks automatically</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Sales teams</p>
                    <p className="text-xs text-muted-foreground">Every client commitment becomes a trackable deliverable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Headphones className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Support teams</p>
                    <p className="text-xs text-muted-foreground">Customer requests become prioritized tasks instantly</p>
                  </div>
                </div>
              </div>
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
              <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Sales managers</p>
                    <p className="text-xs text-muted-foreground">Track rep performance and sentiment in customer calls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Team leads</p>
                    <p className="text-xs text-muted-foreground">Identify who's dominating conversations and ensure balanced participation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Headphones className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">HR teams</p>
                    <p className="text-xs text-muted-foreground">Monitor team morale through sentiment analysis across meetings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Meeting & Task Archive */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="order-2 lg:order-1 bg-muted/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Headphones className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Customer success</p>
                    <p className="text-xs text-muted-foreground">Build a knowledge base of every customer conversation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Leadership</p>
                    <p className="text-xs text-muted-foreground">Search across all team meetings to track progress and decisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background rounded-lg p-4 border">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Sales teams</p>
                    <p className="text-xs text-muted-foreground">Review past prospect calls before follow-up meetings</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What customers say
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real results from real teams using Task Assistant
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-primary/10">
                  <img
                    src={testimonial2}
                    alt="Sarah K."
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={logoCreativeStudio}
                      alt="Company"
                      className="h-10 w-10 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold">Sarah K.</h3>
                      <p className="text-xs text-muted-foreground">Sales Manager</p>
                      <p className="text-sm font-semibold text-primary">
                        Close rate up 40%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "I used to lose track of client requests during calls. Now my Task Assistant catches everything, and I never miss a follow-up."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-green-500/10">
                  <img
                    src={testimonial1}
                    alt="Mike T."
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={logoRapidPlumb}
                      alt="Company"
                      className="h-10 w-10 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold">Mike T.</h3>
                      <p className="text-xs text-muted-foreground">Contractor</p>
                      <p className="text-sm font-semibold text-primary">
                        Saved the project
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "We had a he-said-she-said situation with a client. Pulled up the meeting transcript, found the exact moment we discussed scope."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-amber-500/10">
                  <img
                    src={testimonial3}
                    alt="James R."
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={logoTechflow}
                      alt="Company"
                      className="h-10 w-10 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold">James R.</h3>
                      <p className="text-xs text-muted-foreground">Product Manager</p>
                      <p className="text-sm font-semibold text-primary">
                        Saves 10 hrs/week
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Juggling 5 teams, I was spending 10 hours a week writing up meeting notes. Now I spend 10 minutes reviewing AI summaries."
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-blue-500/10">
                  <img
                    src={testimonial4}
                    alt="Maria L."
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={logoPeakAccounting}
                      alt="Company"
                      className="h-10 w-10 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold">Maria L.</h3>
                      <p className="text-xs text-muted-foreground">CS Director</p>
                      <p className="text-sm font-semibold text-primary">
                        Retention up 25%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Our CS team can finally search all customer conversations. We spot issues before they become problems."
                  </p>
                </CardContent>
              </Card>
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
