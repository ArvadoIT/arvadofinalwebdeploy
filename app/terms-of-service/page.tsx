import { readFileSync } from "fs";
import { join } from "path";
import Navigation from "../(marketing)/components/Navigation";
import Footer from "../(marketing)/components/Footer";
import MarkdownContent from "./MarkdownContent";

export const metadata = {
  title: "Terms of Service | Arvado",
  description: "Arvado's Terms of Service - The legal agreement governing your use of our services.",
};

export default function TermsOfServicePage() {
  // Read the markdown file
  const markdownPath = join(process.cwd(), "TERMS_OF_SERVICE.md");
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

