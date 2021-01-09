# [Hacker News Posts Scraper](https://news.ycombinator.com/news?p=1)
------

## NodeJS Script

1. `npm install`
- [node-fetch](https://github.com/node-fetch/node-fetch) - fetching HTML
- [cheerio](https://cheerio.js.org/index.html) - parsing HTML server-side

2. `npm start <page_number?>`
3. Output array of ordered posts to console

## Post
```
{
  title: string
  points: number
  author: string
}
```