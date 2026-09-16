document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Simple category filter button: cycles through sports.
  const filterButton = document.querySelector(".filter-button");
  const cards = document.querySelectorAll(".post-card");

  if (filterButton && cards.length) {
    const filters = ["all", "nfl", "nba", "mlb", "nhl", "soccer", "opinion"];
    let current = 0;

    filterButton.addEventListener("click", () => {
      current = (current + 1) % filters.length;
      const filter = filters[current];
      filterButton.textContent = filter === "all" ? "All stories" : filter.toUpperCase();

      cards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.sport !== filter;
      });
    });
  }

  // Newsletter demo
  const form = document.querySelector("#newsletterForm");
  const message = document.querySelector("#formMessage");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value.trim();
      message.textContent = `Thanks! ${email} has been added to the demo list.`;
      form.reset();
    });
  }

  // Article share buttons
  document.querySelectorAll("[data-share]").forEach(button => {
    button.addEventListener("click", async () => {
      const type = button.dataset.share;
      const url = window.location.href;

      if (type === "copy") {
        try {
          await navigator.clipboard.writeText(url);
          button.textContent = "Copied!";
          setTimeout(() => button.textContent = "Copy link", 1600);
        } catch {
          button.textContent = "Copy failed";
          setTimeout(() => button.textContent = "Copy link", 1600);
        }
      }

      if (type === "native") {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: "Check out this story from The Final Whistle.",
            url
          });
        } else {
          try {
            await navigator.clipboard.writeText(url);
            button.textContent = "Link copied!";
            setTimeout(() => button.textContent = "Share", 1600);
          } catch {
            button.textContent = "Share unavailable";
            setTimeout(() => button.textContent = "Share", 1600);
          }
        }
      }
    });
  });
});
