import { Feed } from "feed";

export default defineEventHandler(async (event) => {
  setHeader(event, "content-type", "text/xml");

  const basePath = "https://alxdrcirilo.dev";

  const posts = await queryCollection(event, "content")
    .order("date", "DESC")
    .all();

  const feed = new Feed({
    title: "Alexandre Cirilo - Personal Blog",
    description:
      "Personal blog of Alexandre Cirilo. Sharing my thoughts and experiences.",
    id: basePath,
    link: basePath,
    language: "en",
    favicon: `${basePath}/favicon.ico`,
    copyright: "MIT",
    author: {
      name: "Alexandre Cirilo",
      link: basePath,
    },
  });

  posts.forEach((doc) => {
    feed.addItem({
      title: doc.title || "",
      id: basePath + doc.path,
      link: basePath + doc.path,
      description: doc.description,
      content: doc.description,
      date: new Date(doc.date as string),
    });
  });

  return feed.rss2();
});
