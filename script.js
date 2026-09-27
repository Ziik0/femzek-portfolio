const photoInput = document.getElementById("photoInput");
const profileImage = document.getElementById("profileImage");
const photo = document.querySelector(".photo");
photo.classList.add("has-default-image");

photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    profileImage.src = reader.result;
    photo.classList.add("has-image");
  };
  reader.readAsDataURL(file);
});

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { threshold: 0.35 });
sections.forEach(section => observer.observe(section));

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");
  nav.style.display = open ? "flex" : "";
  if (open) {
    nav.style.position = "absolute";
    nav.style.top = "74px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "22px";
    nav.style.flexDirection = "column";
    nav.style.background = "rgba(5,9,9,.97)";
    nav.style.borderBottom = "1px solid rgba(0,229,212,.16)";
  }
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  if (window.innerWidth <= 800) {
    nav.classList.remove("mobile-open");
    nav.style.display = "";
  }
}));
