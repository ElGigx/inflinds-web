import Link from "next/link";
import type { ReactNode } from "react";

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

function safeHref(href: string): boolean {
  return (href.startsWith("/") && !href.startsWith("//")) || /^https?:\/\//.test(href);
}

function renderInline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = INLINE.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[3]) {
      nodes.push(<strong key={`${key}-strong-${index}`}>{match[3]}</strong>);
    } else if (match[1] && match[2] && safeHref(match[2])) {
      const href = match[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${key}-link-${index}`} href={href}>
            {match[1]}
          </Link>
        ) : (
          <a
            key={`${key}-link-${index}`}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {match[1]}
          </a>
        ),
      );
    } else {
      nodes.push(match[1] ?? match[0]);
    }

    last = INLINE.lastIndex;
    index += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function RichText({ text }: { text: string | null }) {
  const blocks = (text ?? "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").map((line) => line.trim());
        const key = `block-${blockIndex}`;

        if (lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line))) {
          return (
            <ul key={key}>
              {lines.map((line, lineIndex) => (
                <li key={`${key}-li-${lineIndex}`}>
                  {renderInline(line.replace(/^[-*]\s+/, ""), `${key}-li-${lineIndex}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (lines.length > 0 && lines.every((line) => /^\d+\.\s+/.test(line))) {
          return (
            <ol key={key}>
              {lines.map((line, lineIndex) => (
                <li key={`${key}-li-${lineIndex}`}>
                  {renderInline(line.replace(/^\d+\.\s+/, ""), `${key}-li-${lineIndex}`)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.startsWith("### ")) {
          return <h3 key={key}>{renderInline(block.slice(4), key)}</h3>;
        }

        if (block.startsWith("## ")) {
          return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
        }

        if (block.startsWith("# ")) {
          return <h2 key={key}>{renderInline(block.slice(2), key)}</h2>;
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote key={key}>
              {renderInline(block.replace(/^>\s?/gm, ""), key)}
            </blockquote>
          );
        }

        return <p key={key}>{renderInline(lines.join(" "), key)}</p>;
      })}
    </>
  );
}
