"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <motion.article
      className="prose prose-invert prose-sky max-w-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <style jsx global>{`
        .prose {
          color: rgba(255, 255, 255, 0.9);
        }
        .prose h1 {
          color: rgb(14, 165, 233);
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        .prose h2 {
          color: rgb(14, 165, 233);
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .prose ul,
        .prose ol {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }
        .prose a {
          color: rgb(14, 165, 233);
          text-decoration: underline;
          text-decoration-color: rgba(14, 165, 233, 0.3);
          transition: all 0.2s;
        }
        .prose a:hover {
          color: rgb(56, 189, 248);
          text-decoration-color: rgba(56, 189, 248, 0.5);
        }
        .prose code {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgb(14, 165, 233);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </motion.article>
  );
}

