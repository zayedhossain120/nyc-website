export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; title: string; code: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; title: string };
  publishedAt: string;
  readingTime: string;
  content: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nextjs-16-app-router-migration-notes",
    title: "What Actually Breaks When You Upgrade to Next.js 16",
    excerpt:
      "Async request APIs, Turbopack-by-default, and the middleware-to-proxy rename — the real gotchas from migrating six client codebases.",
    category: "Engineering",
    author: { name: "Ravi Deshmukh", title: "CTO" },
    publishedAt: "2026-06-18",
    readingTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "We've now migrated six client codebases to Next.js 16. The framework's release notes cover the breaking changes accurately, but they don't tell you which ones actually bite in a real, multi-year-old codebase. Here's what did.",
      },
      { type: "heading", text: "Async request APIs are no longer optional" },
      {
        type: "paragraph",
        text: "Next 15 gave you a compatibility window where synchronous access to params, cookies(), and headers() still worked with a deprecation warning. Next 16 removes that window entirely. If a client's codebase had any lingering synchronous param access — usually in an old layout file nobody touched in a year — the build fails outright.",
      },
      {
        type: "code",
        title: "app/dashboard/[team]/page.tsx",
        code: `// Before (Next 15 compat mode)
export default function Page({ params }) {
  const { team } = params
}

// After (Next 16, required)
export default async function Page({ params }) {
  const { team } = await params
}`,
      },
      {
        type: "paragraph",
        text: "The codemod handles most of this automatically, but it won't catch params destructured deep inside a helper function three files away from the page component. Grep for `params.` after running it.",
      },
      { type: "heading", text: "Turbopack by default changes your webpack config's fate" },
      {
        type: "paragraph",
        text: "If a project has a custom webpack config, `next build` now fails outright unless you either migrate that config to Turbopack-compatible options or explicitly pass `--webpack`. One client had a decade-old SVG loader config nobody remembered adding — that one took an afternoon to untangle.",
      },
      {
        type: "list",
        items: [
          "Run `next build --webpack` first to confirm the app still builds at all before touching config",
          "Migrate one plugin at a time to `turbopack.resolveAlias` rather than a big-bang rewrite",
          "Budget real time for any project using Sass with the legacy `~` import prefix — Turbopack doesn't support it",
        ],
      },
      { type: "heading", text: "middleware.ts renamed to proxy.ts" },
      {
        type: "paragraph",
        text: "This one is mechanical but easy to miss if your CI doesn't fail loudly: the `edge` runtime isn't supported in the new `proxy` convention. If you were running auth checks on the edge runtime in middleware, you need to either move that logic or keep the file as `middleware.ts` for now.",
      },
    ],
  },
  {
    slug: "aeo-geo-answer-engine-citations",
    title: "AEO Is the New SEO: Getting Cited Inside ChatGPT Answers",
    excerpt:
      "Ranking #1 on Google doesn't mean an AI assistant will recommend you. Here's the content structure that actually gets cited.",
    category: "Marketing & Growth",
    author: { name: "James Okafor", title: "COO" },
    publishedAt: "2026-05-02",
    readingTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "A client came to us ranking #1 on Google for their core keyword and getting zero mentions when prospects asked ChatGPT for a recommendation in the same category. That gap is what Answer Engine Optimization (AEO) closes, and it's a fundamentally different discipline than traditional SEO.",
      },
      { type: "heading", text: "Why traditional SEO content doesn't get cited" },
      {
        type: "paragraph",
        text: "Google-optimized content is written to rank — keyword density, internal linking, meta descriptions tuned for click-through. Answer engines don't care about any of that. They care about whether a passage of your content directly and unambiguously answers a specific question, in a form that can be lifted and quoted.",
      },
      {
        type: "list",
        items: [
          "Lead with the direct answer in the first sentence, not three paragraphs of throat-clearing",
          "Use explicit, quotable claims with numbers — \"3.8x average ROAS\" beats \"significant ROAS improvement\"",
          "Mark up FAQ and service content with Schema.org structured data so engines can parse the Q&A pairing cleanly",
          "Keep one clear answer per heading — don't bury three sub-claims under a single H2",
        ],
      },
      { type: "heading", text: "How we measure it" },
      {
        type: "paragraph",
        text: "We run a fixed set of prompts relevant to the client's category against ChatGPT, Perplexity, and Google AI Overviews monthly, and track citation rate alongside the referral traffic those citations generate. For the client above, citation rate went from effectively zero to appearing in 6 of 8 tracked prompts within 90 days — without their Google ranking changing at all.",
      },
    ],
  },
  {
    slug: "nestjs-module-pattern-every-project",
    title: "The NestJS Module Pattern We Use on Every Client Project",
    excerpt:
      "A consistent module boundary convention that's saved us from the tangled-service-graph problem more times than we can count.",
    category: "Engineering",
    author: { name: "Ravi Deshmukh", title: "CTO" },
    publishedAt: "2026-03-27",
    readingTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "Every NestJS backend we ship follows the same module boundary rule: a module may only inject providers from its own module or from modules it explicitly imports — never reach into another module's internals through a shared global provider.",
      },
      {
        type: "code",
        title: "user.module.ts",
        code: `@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}`,
      },
      {
        type: "paragraph",
        text: "It sounds obvious written down. In practice, without enforcing it, six months into a project you end up with a `SharedService` that half the codebase depends on implicitly, and nobody can safely delete a feature without grepping the entire repo first.",
      },
      { type: "heading", text: "The rule in practice" },
      {
        type: "list",
        items: [
          "Every module exports only what other modules genuinely need — not everything by default",
          "Cross-cutting concerns (auth, logging) live in their own module and get imported explicitly, never injected globally without an import",
          "If two feature modules need to talk to each other, one imports the other's module — the dependency direction is always visible in the module graph",
        ],
      },
      {
        type: "paragraph",
        text: "This isn't a NestJS-specific idea — it's just dependency inversion applied consistently — but NestJS's module system makes it cheap to enforce, and cheap to catch in code review when someone breaks it.",
      },
    ],
  },
  {
    slug: "automating-lead-intake-with-ai-what-happens",
    title: "What Actually Happens When You Automate Lead Intake With AI",
    excerpt:
      "Not \"replace your sales team.\" A field report from building an intake agent for a 200-request-a-week logistics operation.",
    category: "AI Automation",
    author: { name: "Elena Marchetti", title: "CEO" },
    publishedAt: "2026-02-11",
    readingTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "When people hear \"AI automation,\" they picture a chatbot that replaces a human entirely. That's rarely what actually gets built — and it's rarely what should get built. Here's what we actually shipped for a freight logistics client processing roughly 200 inbound requests a week by hand.",
      },
      { type: "heading", text: "The starting point" },
      {
        type: "paragraph",
        text: "Dispatchers were reading inbound emails and PDFs, manually checking carrier capacity against a spreadsheet, and re-keying the result into their TMS. Average response time to shippers was three hours — not because any single step was slow, but because the whole chain was manual and serial.",
      },
      { type: "heading", text: "What we built instead of a chatbot" },
      {
        type: "paragraph",
        text: "A RAG-backed intake agent that parses inbound requests, cross-references live carrier capacity, and drafts a routing recommendation — which a dispatcher reviews and approves in Slack. The human stayed in the loop on every decision; what changed is that the 20 minutes of manual lookup before that decision disappeared.",
      },
      {
        type: "list",
        items: [
          "Average response time dropped from 3 hours to 12 minutes",
          "94% of AI-drafted routes were approved without edits",
          "Zero added headcount despite 30% volume growth over the following two quarters",
        ],
      },
      {
        type: "paragraph",
        text: "The lesson that generalizes: the highest-ROI automation almost never removes the human decision — it removes the tedious data-gathering that happens before the decision. Start there.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
