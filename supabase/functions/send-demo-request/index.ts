import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequestPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: DemoRequestPayload = await req.json();

    console.log("Received demo request:", { name, email, company, message });

    // Save lead to database
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await adminClient
      .from("demo_requests")
      .insert({ name, email, company: company || null, message: message || null });
    if (dbError) {
      console.error("Failed to save demo request to DB:", dbError);
    } else {
      console.log("Demo request saved to database.");
    }

    if (!SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not set");
      throw new Error("Email service not configured");
    }

    // Send notification email to the business
    const notificationResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "ty@ragadvise.com" }],
            subject: `New Demo Request from ${name}`,
          },
        ],
        from: { email: "ty@ragadvise.com", name: "RagAdvise Demo Requests" },
        reply_to: { email, name },
        content: [
          {
            type: "text/html",
            value: `
              <h2>New Demo Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || "Not provided"}</p>
              <p><strong>Message:</strong> ${message || "Not provided"}</p>
              <hr>
              <p>Please follow up within 24 hours.</p>
            `,
          },
        ],
      }),
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error("SendGrid notification error:", errorText);
      throw new Error(`Failed to send notification: ${errorText}`);
    }

    console.log("Notification email accepted by SendGrid:", {
      status: notificationResponse.status,
      messageId: notificationResponse.headers.get("x-message-id"),
    });

    // Send confirmation email to the user
    const confirmationResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            bcc: [{ email: "ty@ragadvise.com" }],
            subject: "Quick favor before your RagAdvise demo",
          },
        ],
        from: { email: "ty@ragadvise.com", name: "Ty at RagAdvise" },
        reply_to: { email: "ty@ragadvise.com", name: "Ty" },
        content: [
          {
            type: "text/html",
            value: `
              <p>Hi ${name},</p>
              <p>Ty here. I lead product at RagAdvise.</p>
              <p>Thanks for requesting a demo. Grab a time on my calendar here:</p>
              <p><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Vc2tRDJbXVkABapDVg-1GqKNFE4qDGKAX0KgG9OCGeq4nTqUqZet64riYuWCANnjgZXei5YV9" style="background-color:#1a9e6e;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:600;">Schedule your personalized demo</a></p>
              <p>To make this demo about your business (and not a generic walkthrough), can you hit reply with:</p>
              <p><strong>1) Which assistant are you most interested in right now?</strong><br>
              Conversation, Task, Money, Customer, or Website Voice</p>
              <p><strong>2) Do you have a website or link I can review?</strong><br>
              (Website, booking page, Google Business Profile, or anything customers see)</p>
              <p>The more you share up front, the more I can tailor the demo and save you time during the call.</p>
              <p>Best,<br>Ty<br>Head of Product, RagAdvise</p>
            `,
          },
        ],
      }),
    });

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text();
      console.error("SendGrid confirmation error:", errorText);
      // Don't throw here - notification was sent, just log the error
    } else {
      console.log("Confirmation email accepted by SendGrid:", {
        status: confirmationResponse.status,
        messageId: confirmationResponse.headers.get("x-message-id"),
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Demo request submitted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-demo-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
