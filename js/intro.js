(function(){
  const intro = document.getElementById("intro");
  if(!intro) return;

  const hasSeen = sessionStorage.getItem("uv_intro_seen");
  if(hasSeen){
    intro.style.display = "none";
    return;
  }

  sessionStorage.setItem("uv_intro_seen","1");
  intro.style.display = "block";

  const term = document.getElementById("termLines");
  const logo = document.getElementById("introLogo");

  const lines = [
    "INITIALIZING UVOSOFT TECH…",
    "LOADING ENTERPRISE MODULES…",
    "AUTHORIZING EXPERIENCE…",
    "ROUTING: HOME INTERFACE…"
  ];

  let i = 0;
  function pushLine(){
    const el = document.createElement("div");
    el.textContent = "> " + lines[i];
    term.appendChild(el);
    i++;
    if(i < lines.length){
      setTimeout(pushLine, 520);
    } else {
      setTimeout(()=>logo.classList.add("show"), 450);
      setTimeout(()=>window.location.href="home.html", 1200);
    }
  }
  setTimeout(pushLine, 380);
})();
