(async function(){
  const board = document.getElementById("eventBoard");
  const list  = document.getElementById("eventList");

  if(!board || !list) return;

  try{
    const res = await fetch("/royaumededraevorn/events/events.json?"+Date.now());
    const data = await res.json();

    if(!data.enabled){
      board.style.display = "none";
      return;
    }

    // RESET
    list.innerHTML = "";
    board.classList.remove("event-danger","event-safe");

    // AUCUN ÉVÈNEMENT
    if(!data.events.length){
      board.classList.add("event-safe");
      return;
    }

    // AU MOINS UN ÉVÈNEMENT
    board.classList.add("event-danger");
    document.querySelector(".event-icon").textContent = "⚠️";
    document.querySelector(".event-title").textContent = "ALERTE — Évènements en cours";

    data.events.forEach(e => {
      if(!e.active) return;

      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h4>${e.icon || "⚠️"} ${e.title}</h4>
        <p>${e.description}</p>
      `;
      list.appendChild(card);
    });

  }catch(e){
    console.warn("EVENT SYSTEM ERROR", e);
  }
})();

