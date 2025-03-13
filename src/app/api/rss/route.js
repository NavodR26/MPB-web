import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL("https://news.google.com/rss/search?q=tea+industry");
    return Response.json(feed.items.slice(0, 3)); // Return only 3 articles
  } catch (error) {
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}