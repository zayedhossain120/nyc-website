import { createElement, type ReactNode } from "react";
import Image from "next/image";

interface BlogContentProps {
  content: string;
}

const ARTICLE_CLASSES = `
  max-w-none
  break-words

  [&_p]:min-w-0
  [&_p]:text-[17px]
  [&_p]:leading-7
  [&_p]:text-secondary
  [&_p]:mb-6

  [&_h1]:scroll-mt-32
  [&_h1]:mt-10
  [&_h1]:mb-5
  [&_h1]:text-3xl
  [&_h1]:font-medium
  [&_h1]:tracking-tight
  [&_h1]:text-primary

  [&_h2]:scroll-mt-32
  [&_h2]:mt-12
  [&_h2]:mb-4
  [&_h2]:text-2xl
  [&_h2]:font-medium
  [&_h2]:tracking-tight
  [&_h2]:text-primary

  [&_h3]:scroll-mt-32
  [&_h3]:mt-9
  [&_h3]:mb-3
  [&_h3]:text-xl
  [&_h3]:font-medium
  [&_h3]:text-primary

  [&_h4]:scroll-mt-32
  [&_h4]:mt-8
  [&_h4]:mb-2
  [&_h4]:text-lg
  [&_h4]:font-medium
  [&_h4]:text-primary

  [&_img]:mx-auto
  [&_img]:my-8
  [&_img]:block
  [&_img]:max-w-full
  [&_img]:h-auto
  [&_img]:rounded-2xl
  [&_img]:border
  [&_img]:border-subtle

  [&_ul]:my-5
  [&_ul]:list-disc
  [&_ul]:space-y-2
  [&_ul]:pl-6
  [&_ul]:text-secondary

  [&_ol]:my-5
  [&_ol]:list-decimal
  [&_ol]:space-y-2
  [&_ol]:pl-6
  [&_ol]:text-secondary

  [&_li]:leading-7

  [&_li>p]:mb-2

  [&_a]:font-medium
  [&_a]:text-accent-secondary
  [&_a]:underline
  [&_a]:underline-offset-4
  [&_a]:transition-colors
  [&_a:hover]:text-accent-primary

  [&_blockquote]:my-8
  [&_blockquote]:rounded-r-2xl
  [&_blockquote]:border-l-2
  [&_blockquote]:border-accent-primary
  [&_blockquote]:bg-surface
  [&_blockquote]:px-6
  [&_blockquote]:py-5
  [&_blockquote]:text-primary
  [&_blockquote]:italic

  [&_pre]:my-8
  [&_pre]:overflow-auto
  [&_pre]:rounded-xl
  [&_pre]:border
  [&_pre]:border-subtle
  [&_pre]:bg-surface-2
  [&_pre]:p-5
  [&_pre]:text-sm
  [&_pre]:leading-relaxed
  [&_pre]:text-primary

  [&_pre_code]:bg-transparent
  [&_pre_code]:p-0

  [&_code]:rounded
  [&_code]:bg-surface-2
  [&_code]:px-1.5
  [&_code]:py-0.5
  [&_code]:font-mono
  [&_code]:text-sm
  [&_code]:text-accent-secondary

  [&_hr]:my-10
  [&_hr]:border-subtle

  [&_table]:my-8
  [&_table]:w-full
  [&_table]:border-collapse
  [&_table]:overflow-hidden
  [&_table]:rounded-xl
  [&_table]:text-sm
  [&_table]:text-secondary

  [&_th]:border
  [&_th]:border-subtle
  [&_th]:bg-surface-2
  [&_th]:p-3
  [&_th]:text-left
  [&_th]:font-medium
  [&_th]:text-primary

  [&_td]:border
  [&_td]:border-subtle
  [&_td]:p-3
  [&_td]:align-middle

  [&_iframe]:aspect-video
  [&_iframe]:w-full
  [&_iframe]:rounded-2xl
  [&_iframe]:border
  [&_iframe]:border-subtle

  [&_.ql-align-center]:text-center
  [&_.ql-align-right]:text-right
  [&_.ql-align-justify]:text-justify

  [&_.ql-size-small]:text-sm
  [&_.ql-size-large]:text-xl
  [&_.ql-size-huge]:text-3xl

  [&_.ql-indent-1]:pl-8
  [&_.ql-indent-2]:pl-12
  [&_.ql-indent-3]:pl-16
`;

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

const NAMED_ENTITIES: Record<string, string> = {
  quot: "\u0022",
  amp: "\u0026",
  apos: "\u0027",
  lt: "\u003C",
  gt: "\u003E",
  nbsp: "\u00A0",
  copy: "\u00A9",
  reg: "\u00AE",
  trade: "\u2122",
  mdash: "\u2014",
  ndash: "\u2013",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bull: "\u2022",
  hellip: "\u2026",
  euro: "\u20AC",
  times: "\u00D7",
  divide: "\u00F7",
  minus: "\u2212",
  laquo: "\u00AB",
  raquo: "\u00BB",
  deg: "\u00B0",
  middot: "\u00B7",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  prime: "\u2032",
  Prime: "\u2033",
  micro: "\u00B5",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  theta: "\u03B8",
  lambda: "\u03BB",
  omega: "\u03C9",
  in: "\u2208",
  infin: "\u221E",
  ne: "\u2260",
  le: "\u2264",
  ge: "\u2265",
};

const ENTITY_RE = /&(?:#(\d+)|#x([0-9a-fA-F]+)|([a-zA-Z][a-zA-Z0-9]+));/g;

function decodeEntities(text: string): string {
  if (!text.includes("&")) return text;

  return text.replace(ENTITY_RE, (raw, dec, hex, name) => {
    if (dec) {
      const code = parseInt(dec, 10);
      if (
        code === 0 ||
        code > 0x10ffff ||
        (code >= 0xd800 && code <= 0xdfff)
      ) {
        return "\uFFFD";
      }
      return String.fromCodePoint(code);
    }
    if (hex) {
      const code = parseInt(hex, 16);
      if (code > 0x10ffff) return "\uFFFD";
      return String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[name] ?? raw;
  });
}

interface Token {
  type: "open" | "close" | "selfclose" | "text";
  tag?: string;
  attrs?: Record<string, string>;
  text?: string;
}

function parseHtml(html: string): Token[] {
  const tokens: Token[] = [];
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9:-]*)((?:\s+[^<>]*?)?)\s*\/?>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(html)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        text: decodeEntities(html.slice(lastIndex, match.index)),
      });
    }

    const full = match[0];
    const tag = match[1];
    const isClosing = full.startsWith("</");
    const isSelfClosing = full.endsWith("/>") || VOID_TAGS.has(tag);

    if (!isClosing) {
      const attrsRaw = match[2] || "";
      const attrs: Record<string, string> = {};
      const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
      let aMatch: RegExpExecArray | null;
      while ((aMatch = attrRe.exec(attrsRaw)) !== null) {
        const name = aMatch[1];
        const value = aMatch[3] ?? aMatch[4] ?? aMatch[5] ?? "";
        attrs[name] = decodeEntities(value);
      }
      tokens.push({ type: isSelfClosing ? "selfclose" : "open", tag, attrs });
    } else {
      tokens.push({ type: "close", tag });
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < html.length) {
    tokens.push({ type: "text", text: decodeEntities(html.slice(lastIndex)) });
  }

  return tokens;
}

function parseStyle(style?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!style) return out;
  for (const part of style.split(";")) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const prop = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (prop) {
      out[prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = value;
    }
  }
  return out;
}

function attrsToProps(attrs: Record<string, string>): Record<string, string | object> {
  const props: Record<string, string | object> = {};
  for (const [name, value] of Object.entries(attrs)) {
    if (name === "class") props.className = value;
    else if (name === "style") props.style = parseStyle(value);
    else if (name === "for") props.htmlFor = value;
    else if (name === "srcset") props.srcSet = value;
    else props[name] = value;
  }
  return props;
}

const PLAIN_IMAGE_URL_RE =
  /^(?:https?:\/\/|\/)[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg|avif)(?:\?[^\s]*)?$/i;

interface ElementNode {
  tag: string;
  props: Record<string, string | object>;
  children: ReactNode[];
  selfClosing: boolean;
}

function buildTree(tokens: Token[]): ReactNode[] {
  const roots: ReactNode[] = [];
  const stack: ElementNode[] = [];
  let key = 0;

  const pushNode = (node: ReactNode) => {
    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node);
    } else {
      roots.push(node);
    }
  };

  for (const token of tokens) {
    if (token.type === "text") {
      if (token.text) pushNode(token.text);
    } else if (token.type === "open" || token.type === "selfclose") {
      const element: ElementNode = {
        tag: token.tag!,
        props: attrsToProps(token.attrs || {}),
        children: [],
        selfClosing: token.type === "selfclose",
      };

      if (token.type === "selfclose") {
        pushNode(renderElement(element, key++));
      } else {
        stack.push(element);
      }
    } else if (token.type === "close") {
      const last = stack[stack.length - 1];
      if (last && last.tag === token.tag) {
        stack.pop();
        // Paragraph rendering: single text child that is a plain image URL.
        const rendered = renderParagraphOrElement(last, key++);
        pushNode(rendered);
      }
    }
  }

  while (stack.length > 0) {
    const leftover = stack.pop();
    pushNode(renderElement(leftover!, key++));
  }

  return roots;
}

function renderParagraphOrElement(node: ElementNode, key: number): ReactNode {
  const tag = node.tag.toLowerCase();
  if (tag === "p" && node.children.length === 1) {
    const only = node.children[0];
    if (
      typeof only === "string" &&
      PLAIN_IMAGE_URL_RE.test(only.trim())
    ) {
      return renderElement(
        {
          tag: "img",
          props: {
            src: only.trim(),
            alt: "Blog Image",
            loading: "lazy",
          },
          children: [],
          selfClosing: true,
        },
        key,
      );
    }
  }
  return renderElement(node, key);
}

function renderElement(node: ElementNode, key: number): ReactNode {
  const tag = node.tag.toLowerCase();

  if (tag === "img") {
    const src = typeof node.props.src === "string" ? node.props.src : "";
    const alt = typeof node.props.alt === "string" ? node.props.alt : "";
    const widthAttr = typeof node.props.width === "string" ? node.props.width : undefined;
    const heightAttr = typeof node.props.height === "string" ? node.props.height : undefined;

    if (widthAttr && heightAttr) {
      return (
        <Image
          key={key}
          src={src}
          alt={alt}
          width={parseInt(widthAttr, 10) || 0}
          height={parseInt(heightAttr, 10) || 0}
          className="mx-auto my-8 block h-auto max-w-full rounded-2xl border border-subtle"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );
    }

    return (
      <Image
        key={key}
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="mx-auto my-8 block h-auto max-w-full rounded-2xl border border-subtle"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }

  const props: Record<string, unknown> = {
    ...node.props,
    key,
  };
  return createElement(tag, props, ...node.children);
}

function htmlToReact(html: string): ReactNode[] {
  return buildTree(parseHtml(html));
}

export function BlogContent({ content = "" }: BlogContentProps) {
  if (!content) {
    return <article className={ARTICLE_CLASSES} />;
  }

  return <article className={ARTICLE_CLASSES}>{htmlToReact(content)}</article>;
}