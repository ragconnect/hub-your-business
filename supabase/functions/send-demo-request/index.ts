import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

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
            subject: "We received your demo request - RagAdvise",
          },
        ],
        from: { email: "ty@ragadvise.com", name: "RagAdvise" },
        reply_to: { email: "ty@ragadvise.com", name: "RagAdvise" },
        content: [
          {
            type: "text/html",
            value: `
              <h1>Thanks for your interest, ${name}!</h1>
              <p>We've received your demo request and will be in touch within 24 hours to schedule a time that works for you.</p>
              <p>In the meantime, feel free to explore our website to learn more about how RagAdvise can help your business.</p>
              <hr>
              <p>Best regards,<br>The RagAdvise Team</p>
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
