import type { CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, BASE_URL } from "../consts";

export async function GET() {
  const posts = (await getCollection("blog")).filter(
    (p: CollectionEntry<"blog">) => !p.data.draft,
  );
  const sorted = posts.sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: BASE_URL,
    items: sorted.map((post: CollectionEntry<"blog">) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.md$/, "")}/`,
      content: post.body,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
