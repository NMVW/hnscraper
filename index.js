const Cheerio = require('cheerio');
const fetch = require('node-fetch');

async function run(args) {
  const pageNum = args[0] || 1;

  const html = await fetchHNHtml(pageNum);
  const posts = parsePosts(html);

  console.log('PAGE', pageNum, posts);

  return posts;
}

async function fetchHNHtml(pageNum) {
  const res = await fetch(`https://news.ycombinator.com/news?p=${pageNum}`);
  return res.text();
}

function parsePosts(html = '') {

  const $ = Cheerio.load(html);

  // scrape the root table for list items of posts
  const cheerioPostNodes = $('table.itemlist tr').slice(0, -2);

  const posts = [];

  cheerioPostNodes.each((index, node) => {
    /* 0 title
    // 1 points + author
    // 2 spacer

    // 3 title
    // 4 points + author
    // 5 spacer

    // 6 title
    // 7 points + author
    // 8 spacer

     ... */

     const remainder = index % 3;

     // new post (title included)
     if (remainder === 0) {
 
       const title = $(node).find('td.title a').text();
       const post = { title };
 
       posts.push(post);
       
       return;
     }
 
     // points + author
     if (remainder === 1) {
 
       const post = posts[posts.length - 1];
 
       const points = +$(node).find('span.score').text().split(' ')[0];
       const author = $(node).find('a.hnuser').text();
 
       post.points = points;
       post.author = author;
 
       return;
     }
 
     if (remainder === 2) {
       // spacer do nothing
     }
   
   });

   return posts;
}

run(process.argv.slice(2));