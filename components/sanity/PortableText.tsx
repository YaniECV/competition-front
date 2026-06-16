import {
  PortableText as PT,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted)", marginBottom: 18, maxWidth: 680 }}>{children}</p>
    ),
    h2: ({ children }) => <h2 style={{ marginTop: 44, marginBottom: 16 }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ marginTop: 28, marginBottom: 10 }}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 20, margin: "24px 0", color: "var(--text)", fontStyle: "italic", maxWidth: 680 }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "var(--text)", fontWeight: 700 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} style={{ color: "var(--text)", textDecoration: "underline" }} rel="noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 18, maxWidth: 680 }}>{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
        <span style={{ fontFamily: "var(--font-mono)", flexShrink: 0 }}>—</span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <div style={{ margin: "24px 0" }}>
          <Image
            src={urlFor(value).width(1200).fit("max").url()}
            alt={value.alt || ""}
            width={1200}
            height={700}
            style={{ width: "100%", height: "auto", border: "1px solid var(--border)" }}
          />
        </div>
      ) : null,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableText({ value }: { value: any }) {
  if (!value) return null;
  return <PT value={value} components={components} />;
}
