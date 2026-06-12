import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { BASE_URL } from "../consts";

const pages = [
  { url: "/", changefreq: "daily", priority: "1.0" },
  { url: "/blog", changefreq: "daily", priority: "0.9" },
  { url: "/about", changefreq: "monthly", priority: "0.8" },
];

export async function GET() {
  const posts = (await getCollection("blog")).filter(
    (p: CollectionEntry<"blog">) => !p.data.draft,
  );
  const sortedPosts = posts.sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  const postEntries = sortedPosts.map((post) => {
    const slug = post.id.replace(/\.md$/, "");
    return {
      url: `/blog/${slug}`,
      changefreq: "weekly" as const,
      priority: "0.8" as const,
      lastmod: post.data.updatedDate || post.data.pubDate,
    };
  });

  const allEntries = [...pages, ...postEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allEntries
    .map(
      (entry) => `
  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.lastmod ? `<lastmod>${entry.lastmod.toISOString()}</lastmod>` : ""}
  </url>
  `,
    )
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
