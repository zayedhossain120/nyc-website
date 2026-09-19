/**
 * Renders one or more JSON-LD blocks. Data always originates from our own
 * schema builders (lib/seo/schema.ts) — never raw user input — but the
 * `<` escape is kept as a defensive habit against accidental `</script>`
 * breakout.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
