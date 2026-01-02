const rssFeeds = [
  { name: "OCTO", url: "https://blog.octo.com/fr/feed/" },
  { name: "Xebia", url: "https://blog.xebia.fr/feed/" },
  { name: "Le Monde Informatique", url: "https://www.lemondeinformatique.fr/flux-rss/rss.xml" }
];

// mots-clés QA / Test Automation
const qaKeywords = [
  "test",
  "tests",
  "qa",
  "qualité",
  "qualite",
  "automatisation",
  "automation",
  "playwright",
  "selenium",
  "cypress",
  "postman",
  "ci/cd",
  "tdd",
  "bdd"
];

const newsList = document.getElementById("news");

rssFeeds.forEach(feed => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}`)
    .then(res => res.json())
    .then(data => {
      data.items.forEach(item => {

        const content = (item.title + " " + item.description).toLowerCase();

        const isQA = qaKeywords.some(keyword =>
          content.includes(keyword)
        );

        if (isQA) {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${feed.name}</strong><br>
            <a href="${item.link}" target="_blank">${item.title}</a>
          `;
          newsList.appendChild(li);
        }
      });
    })
    .catch(err => console.error("RSS error:", feed.name, err));
});
