document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded ✔");

  // smooth scroll buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = document.querySelector(".dua-kolom");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // highlight navbar on scroll
  const header = document.querySelector(".Atas");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.style.background = "#ffffffcc";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "var(--panel)";
    }
  });

  // gambar fade in
  const images = document.querySelectorAll(".image-card img, .event-card__image");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.3 }
  );

  images.forEach((img) => {
    img.style.opacity = 0;
    img.style.transition = "0.8s ease";
    img.style.transform = "translateY(20px)";
    revealObserver.observe(img);
  });

  // tombol orion
  const cta = document.querySelector(".btn-ketiga");
  if (cta) {
    cta.addEventListener("click", () => {
      alert("Orion Call to Action!");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Tombol Contact
  const contactBtn = document.querySelector('.nav-links a:nth-child(1)');
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("📩 Contact us at: Cakru318eh@orion.co");
  });

  // Tombol Download
  const downloadBtn = document.querySelector('.nav-links a:nth-child(2)');
  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmDownload = confirm("🚀 Ready to download Orion App?");
    
    if(confirmDownload){
      window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=V0-a8p51mfzkQXmQ"; 

    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Another button (Scorpio section)
  const anotherBtn = document.querySelector(".btn-light");

  anotherBtn.addEventListener("click", () => {
    anotherBtn.textContent = "✨ Processing...";
    anotherBtn.style.backgroundColor = "#fff";
    anotherBtn.style.color = "#000";
    anotherBtn.style.transition = "0.4s";

    setTimeout(() => {
      alert("🦂 Scorpio activated!");
      anotherBtn.textContent = "Done!";
      anotherBtn.style.backgroundColor = "#4caf50";
      anotherBtn.style.color = "#fff";
    }, 1000);
  });
});

