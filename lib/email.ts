// This is a mock email service for demonstration purposes.
// In a real application, you would integrate with an actual email sending service like Resend, SendGrid, Mailgun, etc.

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  react?: React.ReactElement; // For React email templates
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  console.log("Simulating email send:");
  console.log("From:", options.from);
  console.log("To:", options.to);
  console.log("Subject:", options.subject);
  if (options.text) {
    console.log("Text Content:", options.text);
  }
  if (options.html) {
    console.log("HTML Content (truncated):", options.html.substring(0, 200) + "...");
  }
  if (options.react) {
    console.log("React Component provided for email content.");
    // In a real scenario, you'd render the React component to HTML here
    // For example, using @react-email/render
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success or failure
  const success = Math.random() > 0.1; // 90% success rate

  if (success) {
    console.log("Email sent successfully (mock)!");
    return { success: true };
  } else {
    console.error("Failed to send email (mock)!");
    return { success: false, error: "Mock email sending failed." };
  }
}
