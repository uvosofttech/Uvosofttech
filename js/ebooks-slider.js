(function () {
  const marquee = document.getElementById("ebookMarquee");
  const track = document.getElementById("ebookTrack");
  if (!marquee || !track) return;

  let x = 0;
  let speed = 0.45;
  let paused = false;

  marquee.addEventListener("mouseenter", () => (paused = true));
  marquee.addEventListener("mouseleave", () => (paused = false));

  let dragging = false;
  let lastX = 0;

  const onDown = (clientX) => { dragging = true; paused = true; lastX = clientX; };
  const onMove = (clientX) => {
    if (!dragging) return;
    const dx = clientX - lastX;
    lastX = clientX;
    x += dx;
  };
  const onUp = () => { dragging = false; paused = false; };

  marquee.addEventListener("mousedown", (e) => onDown(e.clientX));
  window.addEventListener("mousemove", (e) => onMove(e.clientX));
  window.addEventListener("mouseup", onUp);

  marquee.addEventListener("touchstart", (e) => onDown(e.touches[0].clientX), { passive: true });
  marquee.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
  marquee.addEventListener("touchend", onUp);

  function getLoopWidth(){ return track.scrollWidth / 2; }

  function tick(){
    if (!paused) x -= speed;
    const loopW = getLoopWidth();
    if (x <= -loopW) x += loopW;
    if (x > 0) x -= loopW;
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  }
  tick();
})();
