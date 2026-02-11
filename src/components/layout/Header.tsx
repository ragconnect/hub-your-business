import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/ragadvise_logo_full.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const assistants = [
  {
    title: "Conversation Assistant",
    href: "/assistants/conversation",
    description: "AI that handles calls, emails, texts, and social messages 24/7.",
  },
  {
    title: "Task Assistant",
    href: "/assistants/task",
    description: "AI that captures tasks, prioritizes your day, and keeps your team aligned.",
  },
  {
    title: "Money Assistant",
    href: "/assistants/money",
    description: "Track expenses, send invoices, and manage payments.",
  },
  {
    title: "Website Voice",
    href: "/assistants/site",
    description: "Voice-first AI that converts website visitors 24/7.",
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="RagAdvise Logo" className="h-36 -my-10 mix-blend-multiply" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground">
                  Assistants
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {assistants.map((assistant) => (
                      <li key={assistant.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={assistant.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{assistant.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {assistant.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <a href="/#testimonials" className="hover:text-foreground transition-colors">Stories</a>
          <a href="/#who" className="hover:text-foreground transition-colors">Who is This For</a>
          <a href="/#compare" className="hover:text-foreground transition-colors">Compare</a>
          <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="https://ragadvise.framer.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Blog</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://my.ragadvise.com" className="text-sm text-muted-foreground hover:text-foreground">Sign in</a>
          <Button asChild>
            <a href="https://my.ragadvise.com/signup" aria-label="Sign Up – See Value in 20 Minutes">Sign Up</a>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-6 mt-8">
              <div className="space-y-3">
                <p className="text-lg font-medium">Assistants</p>
                <div className="pl-4 space-y-2">
                  {assistants.map((assistant) => (
                    <Link
                      key={assistant.title}
                      to={assistant.href}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {assistant.title}
                    </Link>
                  ))}
                </div>
              </div>
              <a 
                href="/#testimonials" 
                className="text-lg hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </a>
              <a 
                href="/#who" 
                className="text-lg hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Who is This For
              </a>
              <a 
                href="/#compare" 
                className="text-lg hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </a>
              <a 
                href="/#faq" 
                className="text-lg hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="https://ragadvise.framer.ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg hover:text-primary transition-colors"
              >
                Blog
              </a>
              <div className="flex flex-col gap-3 mt-4 pt-6 border-t">
                <a href="https://my.ragadvise.com" className="text-lg hover:text-primary transition-colors">
                  Sign in
                </a>
                <Button asChild className="w-full">
                  <a href="https://my.ragadvise.com/signup">Sign Up</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
