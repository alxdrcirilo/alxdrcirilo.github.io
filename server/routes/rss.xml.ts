import { serverQueryContent } from "#content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "Alexandre Cirilo",
    site_url: "https://alxdrcirilo.github.io",
    feed_url: `https://alxdrcirilo.github.io/rss.xml`,
  });

  const docs = await serverQueryContent(event)
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();

  const blogPosts = docs.filter((doc) => doc?._path?.includes("/blog"));
  for (const doc of blogPosts) {
    feed.item({
      title: doc.title ?? "-",
      url: `https://alxdrcirilo.github.io${doc._path}`,
      description: doc.description,
      date: doc.date,
      categories: Object.values(doc.tags).flat(2),
      custom_elements: [
        {
          "repo": doc.repo,
        },
      ],
    });
  }

  const feedString = feed.xml({ indent: true });
  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});
