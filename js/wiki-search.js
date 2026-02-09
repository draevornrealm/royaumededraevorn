// Recherche ultra simple côté client (sans backend)
const WIKI_PAGES = [
  { title: "Kaelros Viremont", url: "personnage-kaelros.html", tags: ["marine", "amiral", "kaelros", "regent"] },
  { title: "Kizaru (Borsalino)", url: "personnage-kizaru.html", tags: ["marine", "amiral", "lumiere", "kizaru"] },
  { title: "Marine", url: "faction-marine.html", tags: ["faction", "gouvernement", "marine"] },
];

function searchWiki(q){
  q = (q || "").trim().toLowerCase();
  if(!q) return WIKI_PAGES.slice(0, 10);
  return WIKI_PAGES.filter(p =>
    p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
  ).slice(0, 10);
}

function renderResults(container, results){
  container.innerHTML = "";
  if(results.length === 0){
    container.innerHTML = `<div class="wiki-card"><div class="content">Aucun résultat.</div></div>`;
    return;
  }
  const wrap = document.createElement("div");
  wrap.className = "list-grid";
  results.forEach(r => {
    const a = document.createElement("a");
    a.className = "list-item";
    a.href = r.url;
    a.innerHTML = `<div class="title">${r.title}</div><div class="meta">${r.tags.join(" • ")}</div>`;
    wrap.appendChild(a);
  });
  container.appendChild(wrap);
}

window.WIKI_SEARCH = { searchWiki, renderResults };
