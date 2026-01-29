(function(){
  const picks = new Set();
  const grid = document.getElementById("pickGrid");
  const output = document.getElementById("output");
  const evaluateBtn = document.getElementById("evaluateBtn");
  const resetBtn = document.getElementById("resetBtn");

  const pickedCount = document.getElementById("pickedCount");
  const unlockTag = document.getElementById("unlockTag");
  const unlockBtn = document.getElementById("unlockBtn");

  function renderCount(){
    pickedCount.textContent = `${picks.size}/4 Selected`;
  }

  function lock(){
    unlockTag.textContent = "LOCK: NEXT ROUTE";
    unlockBtn.style.pointerEvents = "none";
    unlockBtn.style.opacity = ".55";
    sessionStorage.removeItem("uv_unlocked");
  }

  function unlock(){
    unlockTag.textContent = "UNLOCKED: NEXT ROUTE";
    unlockBtn.style.pointerEvents = "auto";
    unlockBtn.style.opacity = "1";
    sessionStorage.setItem("uv_unlocked", "1");
  }

  // If already unlocked in session
  if(sessionStorage.getItem("uv_unlocked") === "1"){
    unlock();
  } else {
    lock();
  }

  grid.addEventListener("click", (e)=>{
    const card = e.target.closest(".pick");
    if(!card) return;

    const key = card.dataset.key;
    if(picks.has(key)){
      picks.delete(key);
      card.classList.remove("active");
    } else {
      picks.add(key);
      card.classList.add("active");
    }
    renderCount();
  });

  evaluateBtn.addEventListener("click", ()=>{
    if(picks.size === 0){
      output.textContent = "> No modules selected. Choose at least one.";
      return;
    }

    // Score model (simple but “feels real”)
    let score = 0;
    const notes = [];

    if(picks.has("erp")){ score += 35; notes.push("ERP CORE: Operational structure enabled."); }
    if(picks.has("cloud")){ score += 20; notes.push("CLOUD: Scale & reliability improved."); }
    if(picks.has("security")){ score += 25; notes.push("SECURITY: Risk reduced. Monitoring posture improved."); }
    if(picks.has("publishing")){ score += 20; notes.push("PUBLISHING: Revenue engine attached."); }

    // synergy bonuses
    if(picks.has("erp") && picks.has("cloud")){ score += 10; notes.push("SYNERGY: ERP + Cloud integration potential high."); }
    if(picks.has("cloud") && picks.has("security")){ score += 8; notes.push("SYNERGY: Cloud + Security reduces breach probability."); }
    if(picks.has("erp") && picks.has("security")){ score += 7; notes.push("SYNERGY: ERP access controls strengthen governance."); }
    if(picks.has("publishing") && picks.has("studio")){ score += 0; } // reserved

    // “ARR” style output (fake but persuasive)
    const arr = Math.round((score * 24000) + (Math.random() * 12000));

    const tier =
      score >= 90 ? "ENTERPRISE-GRADE" :
      score >= 70 ? "SCALABLE" :
      score >= 50 ? "STABLE" :
      "BASIC";

    output.textContent =
      `> STACK STATUS: ${tier}\n` +
      `> SCORE: ${score}/100\n` +
      `> EST. SCALE POTENTIAL: £${arr.toLocaleString()} ARR (modeled)\n\n` +
      notes.map(n => `> ${n}`).join("\n") +
      `\n\n> Recommendation: Route to WAIT STAGE to submit requirements.`;

    // Unlock rule: user must select at least 3 modules
    if(picks.size >= 3){
      unlock();
    } else {
      lock();
    }
  });

  resetBtn.addEventListener("click", ()=>{
    picks.clear();
    document.querySelectorAll(".pick.active").forEach(x=>x.classList.remove("active"));
    renderCount();
    output.textContent = "> Reset complete. Select modules then click EVALUATE.";
    lock();
  });

  renderCount();
})();
