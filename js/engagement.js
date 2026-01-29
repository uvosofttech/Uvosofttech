(function(){
  const already = sessionStorage.getItem("uv_engaged_once");
  if(already) return;

  function engage(reason){
    sessionStorage.setItem("uv_engaged_once","1");
    sessionStorage.setItem("uv_engage_reason", reason);
    window.location.href = "wait.html";
  }

  // Exit intent (mouse to top)
  document.addEventListener("mousemove", (e)=>{
    if(e.clientY <= 8){
      engage("exit_intent");
    }
  });

  // Tab switch / visibility change
  document.addEventListener("visibilitychange", ()=>{
    if(document.hidden){
      engage("tab_switch");
    }
  });

  // Idle
  let idleTimer;
  function resetIdle(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(()=>engage("idle"), 22000);
  }
  ["mousemove","keydown","scroll","touchstart"].forEach(ev=>{
    window.addEventListener(ev, resetIdle, {passive:true});
  });
  resetIdle();
})();
