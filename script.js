const sources = {
  test: [
    {
      name: "Software Testing Magazine",
      url: "https://www.softwaretestingmagazine.com/feed/"
    }
  ],
  qa: [
    {
      name: "QA.Tech",
      url: "https://qa.tech/feed/"
    }
  ],
  automation: [
    {
      name: "TestFort",
      url: "https://testfort.com/blog/feed/"
    }
  ]
};

const keywords = {
  test: ["test", "testing", "plan de test", "cas de test"],
  qa: ["qa", "qualité", "quality", "assurance qualité"],
  automation: [
    "automation",
    "automatisation",
    "playwright",
    "selenium",
    "cypress",
    "postman",
    "ci/cd"
  ]
};

function loadNews(sectionId, feeds, keywords) {
  const container = document.getElementById(sectionId);

  feeds.forEach(feed => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}`)
      .then(res => res.json())
      .then(data => {
        data.items.forEach(item => {
          const content = (item.title + " " + item.description).toLowerCase();

          const match = keywords.some(k => content.includes(k));

          if (match) {
            const li = document.createElement("li");
            li.innerHTML = `
              <strong>${feed.name}</strong><br>
              <a href="${item.link}" target="_blank">${item.title}</a>
            `;
            container.appendChild(li);
          }
        });
      })
      .catch(err =>
        console.error("RSS error:", feed.name, err)
      );
  });
}

loadNews("test-news", sources.test, keywords.test);
loadNews("qa-news", sources.qa, keywords.qa);
loadNews("automation-news", sources.automation, keywords.automation);
