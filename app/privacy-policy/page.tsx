import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "../(marketing)/components/Navigation";
import Footer from "../(marketing)/components/Footer";
import MarkdownContent from "./MarkdownContent";

export const metadata = {
  title: "Privacy Policy | Arvado",
  description: "Arvado's Privacy Policy - How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  // Read the markdown file
  const markdownPath = join(process.cwd(), "PRIVACY_POLICY.md");
  const markdownContent = readFileSync(markdownPath, "utf-8");

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
          <MarkdownContent content={markdownContent} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

