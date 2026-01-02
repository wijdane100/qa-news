const rssFeeds = [
  {
    name: "OCTO Blog",
    url: "https://blog.octo.com/fr/feed/"
  },
  {
    name: "Xebia France",
    url: "https://blog.xebia.fr/feed/"
  },
  {
    name: "Developpez.com",
    url: "https://www.developpez.com/index/rss"
  },
  {
    name: "Le Monde Informatique",
    url: "https://www.lemondeinformatique.fr/flux-rss/thematique/qualite-logicielle/rss.xml"
  }
];

const newsList = document.getElementById("news");

rssFeeds.forEach(feed => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}`)
    .then(response => response.json())
    .then(data => {
      data.items.slice(0, 4).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${feed.name}</strong><br>
          <a href="${item.link}" target="_blank">${item.title}</a>
        `;
        newsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Erreur RSS :", feed.name, err);
    });
});
