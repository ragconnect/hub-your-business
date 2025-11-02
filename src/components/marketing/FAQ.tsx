import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How fast can we get value?", a: "Most teams see benefit on day one from call handling and meeting notes, with deeper gains as assistants connect." },
  { q: "What about pricing?", a: "Simple per-seat pricing with a trial. Contact us for volume or annual plans." },
  { q: "Can I invite my team?", a: "Yes. Add teammates with roles and permissions per assistant." },
  { q: "What happens with bad messages?", a: "We escalate sensitive or low‑confidence cases to the owner automatically." },
  { q: "How is my data managed?", a: "Your data is isolated and used only to serve your business. You control retention and revocation." },
  { q: "Can I get a demo?", a: "Absolutely. Watch a 2‑minute demo or book a live walkthrough." },
  { q: "Do we need engineers to set it up?", a: "No. Upload a few docs, connect channels, and you're running in minutes." },
  { q: "What can the Conversation Assistant do?", a: "Manage calls, messages, and tasks in one unified inbox. Handle phone calls, emails, and social DMs with 24/7 responses and automatic escalation." },
  { q: "What can the Task Assistant do?", a: "Capture auto-notes from meetings, extract action items, and manage follow-ups. Resolve tasks across meetings in less than 60 seconds." },
  { q: "What can the Money Assistant do?", a: "Reconcile finances by having the agent assist your finances. Find out when expenses are categorized as income. See all of your balances in one place, add tags and categories for expenses and much more." },
  { q: "What can the Customer Assistant do?", a: "Track your pipeline with a lightweight CRM. Manage customer relationships, deals, and interactions without complex setup or switching tools." },
  { q: "What can the Training Assistant do?", a: "Create a business wiki with docs and knowledge trained on your operations. Search, reference, and share institutional knowledge instantly." },
  { q: "Train and Earn Up to $100?", a: "Unlock up to $100 simply by using our assistants! Connect your bank account, automate message sending to customers, or view action items with our task assistant. Don't miss out—sign up today and email ty@ragadvise.com to take advantage of this exciting opportunity!" },
  { q: "Get a demo?", a: "Message ty@ragadvise.com to schedule a personalized demo and see how RagAdvise can transform your business operations." },
  { q: "Partnerships?", a: "Interested in partnering with us? Reach out to ty@ragadvise.com to explore collaboration opportunities." },
  { q: "About us?", a: "Founded by a coalition of visionary business owners from diverse backgrounds, we are dedicated to developing innovative solutions that directly tackle our own business challenges. Our unique experiences drive us to create impactful strategies that will not only benefit us but also empower others facing similar obstacles." },
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (window.location.hash === '#train-and-earn') {
      setOpenItem('item-12');
      setTimeout(() => {
        document.getElementById('train-and-earn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } as const;

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t bg-muted/20">
      <div className="container py-16 md:py-20">
        <h2 id="faq-title" className="text-3xl font-semibold tracking-tight flex items-center justify-between">Frequently asked <a href="mailto:demo@ragadvise.com?subject=Demo Request&body=Hi, I'd like to schedule a demo of RagAdvise." className="text-sm font-normal underline text-primary">Get a demo</a></h2>
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full" value={openItem} onValueChange={setOpenItem}>
            {faqs.map((f, i) => (
              <AccordionItem 
                key={f.q} 
                value={`item-${i}`}
                id={i === 12 ? 'train-and-earn' : undefined}
              >
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default FAQ;
