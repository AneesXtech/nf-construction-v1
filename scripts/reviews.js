document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll("[data-review-card]"));
    const loadMoreBtn = document.getElementById("loadMoreReviews");
    const initialVisible = 9;
    const batchSize = 3;
    const truncateLimit = 120;
    let visibleCount = initialVisible;

    const updateVisibility = () => {
        cards.forEach((card, index) => {
            card.hidden = index >= visibleCount;
        });

        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleCount >= cards.length ? "none" : "inline-flex";
        }
    };

    cards.forEach((card) => {
        const toggleBtn = card.querySelector(".review-toggle");
        const textEl = card.querySelector("[data-review-text]");

        if (!toggleBtn || !textEl) {
            return;
        }

        const fullText = textEl.textContent.trim();
        const shouldTruncate = fullText.length > truncateLimit;

        if (!shouldTruncate) {
            toggleBtn.hidden = true;
            return;
        }

        const truncated = `${fullText.slice(0, truncateLimit).trimEnd()}...`;
        let isExpanded = false;
        textEl.textContent = truncated;

        toggleBtn.addEventListener("click", () => {
            isExpanded = !isExpanded;
            toggleBtn.textContent = isExpanded ? "Read Less" : "Read More";
            toggleBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
            textEl.textContent = isExpanded ? fullText : truncated;
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            visibleCount = Math.min(visibleCount + batchSize, cards.length);
            updateVisibility();
        });
    }

    updateVisibility();
});
