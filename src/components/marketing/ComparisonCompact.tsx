import React from "react";
import { Check, X, Bot, MessageSquare, Brain, Search, BookOpen, Mic, SquareCode, Github } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tools: { name: string; Icon: React.ComponentType<any> }[] = [
  { name: "RagAdvise", Icon: Bot },
  { name: "ChatGPT", Icon: MessageSquare },
  { name: "Claude", Icon: Brain },
  { name: "Perplexity", Icon: Search },
  { name: "Notion AI", Icon: BookOpen },
  { name: "Otter", Icon: Mic },
  { name: "Copilot", Icon: SquareCode },
  { name: "Hugging Face", Icon: Github },
];

const rows = [
  { feature: "Multi-channel customer comms", values: [true, false, false, false, false, false, false, false] },
  { feature: "Integrated financial tracking", values: [true, false, false, false, false, false, false, false] },
  { feature: "Meeting note automation", values: [true, false, false, false, false, true, false, false] },
  { feature: "Customer relationship mgmt", values: [true, false, false, false, true, false, false, false] },
  { feature: "Trained on your business", values: [true, false, false, false, false, false, false, false] },
  { feature: "Works across industries", values: [true, true, true, true, true, true, true, true] },
];

const ComparisonCompact: React.FC = () => {
  return (
    <section id="compare" aria-labelledby="compare-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <h2 id="compare-title" className="text-3xl font-semibold tracking-tight">RagAdvise vs. generic AI</h2>
        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {tools.map((t, i) => (
                  <TableHead key={t.name} className={`${i === 0 ? "bg-secondary font-semibold" : ""}`}>
                    <div className="flex items-center gap-2">
                      <t.Icon className="size-4 text-primary" aria-hidden="true" />
                      <span>{t.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium whitespace-nowrap">{row.feature}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={i} className={`text-center ${i === 0 ? "bg-secondary/60" : ""}`}>
                      {v ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary px-2 py-1">
                          <Check className="size-4" aria-label="Yes" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-destructive/10 text-destructive px-2 py-1">
                          <X className="size-4" aria-label="No" />
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonCompact;
