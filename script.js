const playArea = document.getElementById("playArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

function clamp(v, min, max){ return Math.min(max, Math.max(min, v)); }

function moveNoButtonAway(pointerX, pointerY) {
  const area = playArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const cx = btn.left + btn.width / 2;
  const cy = btn.top + btn.height / 2;

  let dx = cx - pointerX;
  let dy = cy - pointerY;

  if (dx === 0 && dy === 0) {
    dx = (Math.random() - 0.5);
    dy = (Math.random() - 0.5);
  }

  const mag = Math.hypot(dx, dy) || 1;
  dx /= mag; dy /= mag;

  const step = 140;

  const currentLeft = parseFloat(noBtn.style.left || "62");
  const currentTop  = parseFloat(noBtn.style.top  || "50");

  const stepX = (dx * step) / area.width * 100;
  const stepY = (dy * step) / area.height * 100;

  let nextLeft = currentLeft + stepX;
  let nextTop  = currentTop  + stepY;

  const padX = (btn.width / 2) / area.width * 100 + 4;
  const padY = (btn.height / 2) / area.height * 100 + 4;

  nextLeft = clamp(nextLeft, padX, 100 - padX);
  nextTop  = clamp(nextTop,  padY, 100 - padY);

  noBtn.style.left = `${nextLeft}%`;
  noBtn.style.top  = `${nextTop}%`;
}

noBtn.addEventListener("mouseenter", (e) => {
  moveNoButtonAway(e.clientX, e.clientY);
});
noBtn.addEventListener("mousemove", (e) => {
  const btn = noBtn.getBoundingClientRect();
  const cx = btn.left + btn.width / 2;
  const cy = btn.top + btn.height / 2;
  const dist = Math.hypot(cx - e.clientX, cy - e.clientY);
  if (dist < 120) moveNoButtonAway(e.clientX, e.clientY);
});
noBtn.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  moveNoButtonAway(t.clientX, t.clientY);
}, { passive: true });

noBtn.addEventListener("click", (e) => {
  moveNoButtonAway(e.clientX, e.clientY);
});

yesBtn.addEventListener("click", () => {
  playArea.style.opacity = "0.35";
  playArea.style.pointerEvents = "none";
  result.hidden = false;
});

resetBtn?.addEventListener("click", () => {
  playArea.style.opacity = "1";
  playArea.style.pointerEvents = "auto";
  result.hidden = true;

  noBtn.style.left = "62%";
  noBtn.style.top = "50%";
});
