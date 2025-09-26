const toggleBtn = document.getElementById("toggle-theme");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.toggle("dark", savedTheme === "dark");
  if (savedTheme === "dark") {
    themeIcon.textContent = "🌙";
    themeText.textContent = "Modo Escuro";
  } else {
    themeIcon.textContent = "☀️";
    themeText.textContent = "Modo Claro";
  }
}

toggleBtn.addEventListener("click", () => {
  themeIcon.classList.add("animate");
  setTimeout(() => {
    body.classList.toggle("dark");
    const dark = body.classList.contains("dark");
    if (dark) {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Modo Escuro";
    } else {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Modo Claro";
    }
    themeIcon.classList.remove("animate");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, 250);
});

function openModal(title, description) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-description").textContent = description;
  document.getElementById("project-modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("project-modal").style.display = "none";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("project-modal");
    if (modal.style.display === "flex") modal.style.display = "none";
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subject = encodeURIComponent(`Contato de ${name}`);
    const bodyText = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:ptkaccarino@hotmail.com?subject=${subject}&body=${bodyText}`;
  });

const rocketCanvas = document.getElementById("rocket-canvas");
const rctx = rocketCanvas.getContext("2d");
let rw = (rocketCanvas.width = window.innerWidth);
let rh = (rocketCanvas.height = window.innerHeight);

let mouse = { x: rw / 2, y: rh / 2 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("resize", () => {
  rw = rocketCanvas.width = window.innerWidth;
  rh = rocketCanvas.height = window.innerHeight;
});

const rockets = [];
const rocketCount = 20;
for (let i = 0; i < rocketCount; i++) {
  rockets.push({
    x: Math.random() * rw,
    y: Math.random() * rh,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * 2 + 1,
    color: `hsl(${Math.random() * 360},80%,70%)`,
  });
}

function drawRockets() {
  rctx.clearRect(0, 0, rw, rh);
  rockets.forEach((r) => {
    let offsetX = (mouse.x - rw / 2) * 0.01 * (r.size / 2);
    let offsetY = (mouse.y - rh / 2) * 0.01 * (r.size / 2);

    rctx.beginPath();
    rctx.arc(r.x + offsetX, r.y + offsetY, r.size, 0, Math.PI * 2);
    rctx.fillStyle = r.color;
    rctx.fill();

    r.x += r.speedX;
    r.y -= r.speedY;

    if (r.y + r.size < 0 || r.x < 0 || r.x > rw) {
      r.x = Math.random() * rw;
      r.y = rh + r.size;
      r.size = Math.random() * 2 + 1;
      r.speedX = (Math.random() - 0.5) * 2;
      r.speedY = Math.random() * 2 + 1;
      r.color = `hsl(${Math.random() * 360},80%,70%)`;
    }
  });
  requestAnimationFrame(drawRockets);
}
drawRockets();
