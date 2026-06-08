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
  { q: "What can the Phone surface do?", a: "Handle calls, voicemails, and follow-ups across every phone surface — answer 24/7, route urgent calls, and log every conversation automatically." },
  { q: "What can the Task surface do?", a: "Capture auto-notes from meetings, extract action items, and manage follow-ups across every task surface. Resolve work in under 60 seconds." },
  { q: "What can the Money surface do?", a: "Reconcile finances across every money surface. Categorize expenses, see all balances in one place, add tags, and let the assistant flag anomalies." },
  { q: "The money surface hasn't updated with my new transactions what should I do?", a: "On the transaction tab hit the refresh button. If that doesn't work, on the account tab, reconnect your account by clicking the link to your account. You should then see the same account twice but the new one should be added. If both are updated then delete the new one. If you still don't see data email ty@ragadvise.com." },
  { q: "What can the Customer surface do?", a: "Track your pipeline across every customer surface with a lightweight CRM — manage relationships, deals, and interactions without complex setup or switching tools." },
  { q: "What can the Training surface do?", a: "Create a business wiki across every training surface — docs and knowledge trained on your operations. Search, reference, and share institutional knowledge instantly." },
  { q: "What can the Site surface do?", a: "Give your website a voice across every site surface — answer visitor questions, capture leads, and book meetings directly on the page." },
  { q: "Train and Earn Up to $25?", a: "Unlock up to $25 simply by using our assistants! Connect your bank account, automate message sending to customers, or view action items with our task assistant. Don't miss out—sign up today and email ty@ragadvise.com to take advantage of this exciting opportunity!" },
  { q: "Get a demo?", a: "Message ty@ragadvise.com to schedule a personalized demo and see how RagAdvise can transform your business operations." },
  { q: "Partnerships?", a: "Interested in partnering with us? Reach out to ty@ragadvise.com to explore collaboration opportunities." },
  { q: "About us?", a: "Founded by a coalition of visionary business owners from diverse backgrounds, we are dedicated to developing innovative solutions that directly tackle our own business challenges. Our unique experiences drive us to create impactful strategies that will not only benefit us but also empower others facing similar obstacles." },
  { q: "Contact us?", a: (<span>Have questions or need support? <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">Visit our contact page</a> to get in touch with our team.</span>) },
  { q: "Privacy Policy?", a: (<span>Review our <a href="https://my.ragadvise.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">Privacy Policy</a> to learn how we protect and handle your data.</span>) },
  { q: "Terms and Conditions?", a: (<span>Read our <a href="https://my.ragadvise.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">Terms and Conditions</a> to understand the terms of service.</span>) },
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
        <h2 id="faq-title" className="text-3xl font-semibold tracking-tight flex items-center justify-between">Frequently asked <a href="https://my.ragadvise.com/contact-us" target="_blank" rel="noopener noreferrer" className="text-sm font-normal underline text-primary">Get a demo</a></h2>
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
