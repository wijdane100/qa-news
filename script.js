const rssFeeds = [
  "https://feeds.feedburner.com/MinistryOfTesting",
  "https://www.selenium.dev/feed.xml",
  "https://playwright.dev/blog/rss.xml"
];

const newsList = document.getElementById("news");

rssFeeds.forEach(feed => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed}`)
    .then(response => response.json())
    .then(data => {
      data.items.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
        newsList.appendChild(li);
      });
    });
});
