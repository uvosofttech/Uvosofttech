(function(){
  const IDLE_MS = 20000; // 20s
  let idleTimer = null;
  let fired = sessionStorage.getItem("uv_engaged") === "1";

  function goWait(reason){
    if (fired) return;
    fired = true;
    sessionStorage.setItem("uv_engaged","1");
    sessionStorage.setItem("uv_wait_reason", reason);
    window.location.href = "wait.html";
  }

  function resetIdle(){
    if (fired) return;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(()=> goWait("idle"), IDLE_MS);
  }

  ["mousemove","keydown","scroll","touchstart"].forEach(ev=>{
    window.addEventListener(ev, resetIdle, {passive:true});
  });
  resetIdle();

  // exit intent (desktop)
  window.addEventListener("mousemove", (e)=>{
    if (fired) return;
    if (e.clientY <= 8) goWait("exit");
  });

  // tab switch
  document.addEventListener("visibilitychange", ()=>{
    if (fired) return;
    if (document.visibilityState === "hidden") goWait("tab");
  });
})();
