function parseSchema(schema) {
  if (!schema) return null;

  if (typeof schema === "object") {
    return schema;
  }

  if (typeof schema === "string") {
    try {
      return JSON.parse(schema);
    } catch {
      return null;
    }
  }

  return null;
}

export default function SeoSchema({ schema }) {
  const parsedSchema = parseSchema(schema);

  if (!parsedSchema) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(parsedSchema).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}