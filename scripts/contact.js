document.addEventListener("DOMContentLoaded", () => {
    // ─── VISUAL SERVICE SELECTOR CARD INTERACTIVITY ───
    const serviceCards = document.querySelectorAll(".service-select-card");
    const hiddenSelect = document.getElementById("service");

    if (serviceCards.length > 0 && hiddenSelect) {
        serviceCards.forEach(card => {
            card.addEventListener("click", () => {
                // Remove active class from all cards
                serviceCards.forEach(c => c.classList.remove("active"));
                
                // Add active class to clicked card
                card.classList.add("active");
                
                // Update hidden select element
                const selectedVal = card.getAttribute("data-value");
                hiddenSelect.value = selectedVal;
                
                // Trigger change event if needed
                hiddenSelect.dispatchEvent(new Event("change"));
            });
        });
        
        // Sync initial state if any card matches select
        if (hiddenSelect.value) {
            const initialCard = document.querySelector(`.service-select-card[data-value="${hiddenSelect.value}"]`);
            if (initialCard) initialCard.classList.add("active");
        }
    }

    // ─── FAQ ACCORDION INTERACTIVITY ───
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const faqItem = trigger.parentElement;
            const isExpanded = trigger.getAttribute("aria-expanded") === "true";
            
            // Close all other FAQ items for a clean accordion experience
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
                    item.querySelector(".faq-content").style.maxHeight = null;
                }
            });
            
            // Toggle active item
            trigger.setAttribute("aria-expanded", !isExpanded);
            const content = faqItem.querySelector(".faq-content");
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ─── TEXTAREA MESSAGE CHARACTER COUNTER ───
    const messageTextarea = document.getElementById("message");
    // Dynamically insert character limit label if not exists
    if (messageTextarea) {
        const counterContainer = document.createElement("div");
        counterContainer.className = "contact-char-limit";
        counterContainer.innerHTML = 'Character Count: <span id="msgCount">0</span> / 1000';
        messageTextarea.parentNode.appendChild(counterContainer);
        
        const counter = document.getElementById("msgCount");
        const updateCounter = () => {
            const currentLen = messageTextarea.value.length;
            counter.textContent = String(currentLen);
            if (currentLen > 1000) {
                messageTextarea.value = messageTextarea.value.substring(0, 1000);
                counter.textContent = "1000";
            }
        };
        messageTextarea.addEventListener("input", updateCounter);
        updateCounter();
    }

    // ─── GSAP & SCROLLTRIGGER ENTRANCE ANIMATIONS ───
    if (typeof gsap !== "undefined") {
        // Hero Content Fade-in
        gsap.from(".contact-hero-content > *", {
            duration: 1,
            y: 40,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Detail Panel and Form Panel Slide-in
        gsap.from(".contact-details-panel", {
            duration: 0.9,
            x: -60,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });

        gsap.from(".contact-form-panel", {
            duration: 0.9,
            x: 60,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });



        // ScrollTrigger FAQ elements if ScrollTrigger exists
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
            
            // Header animation
            gsap.from(".faq-header > *", {
                scrollTrigger: {
                    trigger: ".contact-faq",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.15,
                ease: "power2.out"
            });

            // Accordion items animation
            gsap.from(".faq-item", {
                scrollTrigger: {
                    trigger: ".faq-accordion-list",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.8,
                y: 40,
                opacity: 0,
                stagger: 0.12,
                ease: "power2.out"
            });
        }
    }
});
