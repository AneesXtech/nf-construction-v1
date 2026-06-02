/* ==========================================================================
   NF CONSTRUCTION LLC - CORE WEB LOGIC & ANIMATIONS (GSAP + LENIS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    /* --------------------------------------------------------------------------
       1. SMOOTH SCROLL (LENIS)
       -------------------------------------------------------------------------- */
    let lenis;
    const initSmoothScroll = () => {
        // Initialize Lenis only on screens wider than mobile viewports for reliability
        if (window.innerWidth > 767) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            // Update ScrollTrigger on every scroll frame
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }
    };
    initSmoothScroll();

    /* --------------------------------------------------------------------------
       2. MOBILE HAMBURGER MENU OVERLAY
       -------------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMobileMenu = () => {
        const isActive = hamburgerBtn.classList.toggle("active");
        mobileNav.classList.toggle("active", isActive);
        hamburgerBtn.setAttribute("aria-expanded", isActive);
        
        // Pause or resume smooth scrolling depending on menu state
        if (lenis) {
            if (isActive) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
    };

    hamburgerBtn.addEventListener("click", toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Close mobile menu when links are clicked
            hamburgerBtn.classList.remove("active");
            mobileNav.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
            if (lenis) lenis.start();
        });
    });

    /* --------------------------------------------------------------------------
       3. STICKY HEADER SCROLL ACTION
       -------------------------------------------------------------------------- */
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleHeaderScroll = () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll(); // Init on load

    // Highlight navigation link on active section scroll
    const sectionsForNav = document.querySelectorAll("section[id]");
    const navScrollSpy = () => {
        const scrollPosition = window.scrollY + 120;
        
        sectionsForNav.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    const href = link.getAttribute("href");
                    if (href === `#${id}` || (href && href.endsWith(`#${id}`))) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };
    window.addEventListener("scroll", navScrollSpy);

    // Smooth scrolling for hash links pointing to sections on the current page
    const handleHashLinkClick = (e, link) => {
        const href = link.getAttribute("href");
        if (!href) return;

        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
            const targetHash = href.substring(hashIndex); // e.g. "#about"
            const pagePath = href.substring(0, hashIndex); // e.g. "index.html" or ""

            // Determine if we are on the homepage (the only page with these section targets)
            const pathParts = window.location.pathname.split('/');
            const currentPage = pathParts[pathParts.length - 1] || 'index.html';
            const isHomePage = currentPage === 'index.html' || currentPage === '' || currentPage.endsWith('index.html');

            // If we are on homepage and the link is for homepage hashes, or if the href is just "#target"
            if (pagePath === "" || pagePath === "index.html" || (isHomePage && (pagePath === "index.html" || pagePath === ""))) {
                const targetElement = document.querySelector(targetHash);
                if (targetElement) {
                    e.preventDefault();
                    if (lenis) {
                        lenis.scrollTo(targetElement, { duration: 1.2 });
                    } else {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                }
            }
        }
    };

    // Attach smooth scrolling click handlers to desktop and mobile links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            handleHashLinkClick(e, link);
        });
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            handleHashLinkClick(e, link);
        });
    });

    /* --------------------------------------------------------------------------
       4. PCL-STYLE HERO CAROUSEL SYSTEM & REGION DROPDOWN
       -------------------------------------------------------------------------- */
    // Region Dropdown Handler
    const regionBtn = document.getElementById("regionBtn");
    const regionDropdown = document.querySelector(".region-dropdown-container");
    const regionItems = document.querySelectorAll(".region-item");

    if (regionBtn && regionDropdown) {
        regionBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            regionDropdown.classList.toggle("active");
        });

        regionItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                regionItems.forEach(ri => ri.classList.remove("active"));
                item.classList.add("active");

                const selectedText = item.textContent.trim();
                regionBtn.innerHTML = `
                    ${selectedText}
                    <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                `;

                regionDropdown.classList.remove("active");
            });
        });

        document.addEventListener("click", () => {
            regionDropdown.classList.remove("active");
        });
    }

    // PCL-Style Carousel Slider
    const slides = document.querySelectorAll(".carousel-slide");
    const tabs = document.querySelectorAll(".indicator-tab");
    let currentSlide = 0;
    let progressTween;
    let isPaused = false;
    const SLIDE_DURATION = 6000; // 6 seconds

    const showSlide = (index) => {
        if (slides.length === 0) return;
        if (index === currentSlide) return;

        if (slideProgressTween) slideProgressTween.kill();
        if (tabLineTween) tabLineTween.kill();

        const oldSlide = slides[currentSlide];
        const newSlide = slides[index];
        const oldTab = tabs[currentSlide];
        const newTab = tabs[index];

        tabs.forEach(tab => {
            tab.classList.remove("active");
            const line = tab.querySelector(".indicator-progress-line");
            if (line) gsap.set(line, { width: "0%" });
        });

        oldSlide.classList.remove("active");
        newSlide.classList.add("active");
        newTab.classList.add("active");

        // Pause old video if it's a video slide
        const oldVideo = oldSlide.querySelector(".hero-bg-video");
        if (oldVideo) oldVideo.pause();

        // Play new video if it's a video slide
        const newVideo = newSlide.querySelector(".hero-bg-video");
        if (newVideo) {
            newVideo.currentTime = 0;
            if (!isPaused) newVideo.play().catch(() => {});
        }

        // Animate background images (only for image slides)
        const oldBgImg = oldSlide.querySelector(".hero-bg-image");
        if (oldBgImg) {
            gsap.killTweensOf(oldBgImg);
            gsap.to(oldBgImg, { scale: 1.05, duration: 1.2, ease: "power2.out" });
        }

        const newBgImg = newSlide.querySelector(".hero-bg-image");
        if (newBgImg) {
            gsap.killTweensOf(newBgImg);
            currentBgTween = gsap.fromTo(newBgImg, 
                { scale: 1.05 },
                { scale: 1, duration: 3, ease: "power2.out", paused: isPaused }
            );
        } else {
            currentBgTween = null;
        }

        // Slide up text content animations on entry
        const eyebrow = newSlide.querySelector(".eyebrow-container");
        if (eyebrow) {
            gsap.fromTo(eyebrow, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
        }
        const heroTitle = newSlide.querySelector(".hero-title");
        if (heroTitle) {
            gsap.fromTo(heroTitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
        }
        const heroBtn = newSlide.querySelector(".btn-pre-footer");
        if (heroBtn) {
            gsap.fromTo(heroBtn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
        }

        currentSlide = index;
        const mobilePageNum = document.getElementById("currentSlideNum");
        if (mobilePageNum) {
            mobilePageNum.textContent = index + 1;
        }
        startSlideCycle();
    };

    let slideProgressTween;
    let tabLineTween;
    let currentBgTween = null;

    const startSlideCycle = () => {
        if (slides.length === 0) return;
        if (slideProgressTween) slideProgressTween.kill();
        if (tabLineTween) tabLineTween.kill();
        
        const circle = document.querySelector(".progress-ring-circle");
        const activeTabLine = tabs[currentSlide].querySelector(".indicator-progress-line");
        
        if (activeTabLine) {
            tabLineTween = gsap.fromTo(activeTabLine,
                { width: "0%" },
                { width: "100%", duration: SLIDE_DURATION / 1000, ease: "none" }
            );
            if (isPaused) tabLineTween.pause();
        }

        if (circle) {
            slideProgressTween = gsap.fromTo(circle, 
                { strokeDashoffset: 75.398 },
                { 
                    strokeDashoffset: 0, 
                    duration: SLIDE_DURATION / 1000, 
                    ease: "none",
                    onComplete: () => {
                        if (!isPaused) {
                            const nextIndex = (currentSlide + 1) % slides.length;
                            showSlide(nextIndex);
                        }
                    }
                }
            );
            if (isPaused) slideProgressTween.pause();
        } else {
            // Fallback if SVG circle is missing
            slideProgressTween = gsap.delayedCall(SLIDE_DURATION / 1000, () => {
                if (!isPaused) {
                    const nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                }
            });
            if (isPaused) slideProgressTween.pause();
        }
    };

    const initCarousel = () => {
        if (slides.length === 0) return;
        slides.forEach((slide, idx) => {
            const bgImg = slide.querySelector(".hero-bg-image");
            const bgVideo = slide.querySelector(".hero-bg-video");

            if (idx === 0) {
                slide.classList.add("active");
                if (bgImg) {
                    currentBgTween = gsap.fromTo(bgImg, { scale: 1.05 }, { scale: 1, duration: 3, ease: "power2.out" });
                }
                if (bgVideo && !isPaused) {
                    bgVideo.play().catch(() => {});
                }
                gsap.fromTo(slide.querySelector(".eyebrow-container"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
                gsap.fromTo(slide.querySelector(".hero-title"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
                const heroBtn = slide.querySelector(".btn-pre-footer");
                if (heroBtn) {
                    gsap.fromTo(heroBtn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
                }
            } else {
                slide.classList.remove("active");
                if (bgImg) gsap.set(bgImg, { scale: 1.05 });
                if (bgVideo) bgVideo.pause();
            }
        });

        tabs.forEach((tab, idx) => {
            if (idx === 0) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }

            tab.addEventListener("click", () => {
                showSlide(idx);
            });
        });

        startSlideCycle();
    };

    if (slides.length > 0) {
        initCarousel();
    }

    /* Pause / Play button handler */
    const carouselPauseBtn = document.getElementById("carouselPauseBtn");
    if (carouselPauseBtn && slides.length > 0) {
        carouselPauseBtn.addEventListener("click", () => {
            isPaused = !isPaused;
            carouselPauseBtn.classList.toggle("paused", isPaused);
            carouselPauseBtn.setAttribute("aria-label", isPaused ? "Resume slideshow" : "Pause slideshow");
            
            const activeSlide = slides[currentSlide];
            const activeVideo = activeSlide.querySelector(".hero-bg-video");

            if (isPaused) {
                if (slideProgressTween) slideProgressTween.pause();
                if (tabLineTween) tabLineTween.pause();
                if (currentBgTween) currentBgTween.pause();
                if (activeVideo) activeVideo.pause();
            } else {
                if (slideProgressTween) slideProgressTween.resume();
                if (tabLineTween) tabLineTween.resume();
                if (currentBgTween) currentBgTween.resume();
                if (activeVideo) activeVideo.play().catch(() => {});
            }
        });
    }

    /* --------------------------------------------------------------------------
       5. CLUNE-INSPIRED MISSION WORD-BY-WORD REVEAL (03)
       -------------------------------------------------------------------------- */
    const initMissionAnimation = () => {
        const words = gsap.utils.toArray('.mission-word');
        const missionSection = document.querySelector('.mission-section');
        
        if (words.length > 0 && missionSection) {
            // Text color transition word-by-word
            gsap.to(words, {
                opacity: 1,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: '.mission-section',
                    start: 'top 75%',
                    end: 'bottom 40%',
                    scrub: 1,
                }
            });

            // Dynamic background color shift from Concrete Gray (#F2F4F5) to Deep Navy (#071420)
            gsap.to('.mission-section', {
                backgroundColor: '#071420',
                scrollTrigger: {
                    trigger: '.mission-section',
                    start: 'top 55%',
                    end: 'bottom center',
                    scrub: 1,
                    onEnter: () => {
                        missionSection.classList.add("dark-reveal");
                    },
                    onLeaveBack: () => {
                        missionSection.classList.remove("dark-reveal");
                    }
                }
            });

            // Fade in bottom CTAs once the text has finished revealing
            gsap.to('.mission-ctas', {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: '.mission-section',
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: true
                }
            });
        }
    };
    
    // Only execute GSAP scroll animations on non-mobile viewports to prioritize speed and native behavior
    if (window.innerWidth > 767) {
        initMissionAnimation();
    } else {
        // Fallback for mobile: reveal everything immediately
        gsap.set('.mission-word', { opacity: 1 });
        gsap.set('.mission-ctas', { opacity: 1, y: 0 });
    }

    /* --------------------------------------------------------------------------
       6. MCCARTHY-INSPIRED ABOUT STACKED IMAGES PARALLAX (04)
       -------------------------------------------------------------------------- */
    const initAboutParallax = () => {
        const wrappers = document.querySelectorAll(".stack-image-wrapper");
        
        wrappers.forEach(wrapper => {
            const speed = parseFloat(wrapper.getAttribute("data-speed")) || 0.1;
            const img = wrapper.querySelector("img");
            
            if (img) {
                gsap.to(img, {
                    yPercent: speed * 100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".about-section",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });
    };
    if (window.innerWidth > 767) {
        initAboutParallax();
    }

    /* --------------------------------------------------------------------------
       7. DREAM / BUILD PINNED SCROLL MULTI-SEQUENCE (05)
       -------------------------------------------------------------------------- */
    const initDreamBuildAnimation = () => {
        const section = document.querySelector(".dream-build-section");
        const pinnedContainer = document.querySelector(".dream-build-pinned");
        const rail = document.getElementById("imageRail");
        const step1 = document.getElementById("layer-step1");
        const step2 = document.getElementById("layer-step2");
        const dbLabel = document.getElementById("db-label");
        
        if (section && pinnedContainer && rail) {
            
            // Create overall pinned scroll timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".dream-build-section",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: ".dream-build-pinned",
                    anticipatePin: 1,
                }
            });

            // Timeline details:
            // 0.0 -> 0.3: First screen ("If you can dream it" + Slide 1 "Foundation Forms" active)
            // 0.3 -> 0.6: Transitions:
            //   - Left Background turns Deep Navy (#071420)
            //   - Label text turns white
            //   - Step 1 Text fades & translates UP out
            //   - Step 2 Text fades & translates IN
            //   - Image Rail translates up (-20%, -40%, -60%, -80% for the 5 slides)
            
            tl.to(pinnedContainer, {
                backgroundColor: "#071420",
                duration: 1
            }, 0.2);

            tl.to(dbLabel, {
                color: "#A0AAB5",
                duration: 1
            }, 0.2);

            tl.to(step1, {
                opacity: 0,
                y: -50,
                duration: 0.8
            }, 0.2);

            tl.to(step2, {
                opacity: 1,
                y: 0,
                duration: 1
            }, 0.5);

            // Translate image rail: 5 slides total = 0% -> -80% translateY
            tl.to(rail, {
                y: "-80%",
                ease: "none",
                duration: 2.2
            }, 0.1);
        }
    };
    
    if (window.innerWidth > 767) {
        initDreamBuildAnimation();
    }

    /* --------------------------------------------------------------------------
       8. SERVICES CAROUSEL (06) - EllisDon Style
       -------------------------------------------------------------------------- */
    const initServicesCarousel = () => {
        if (typeof Swiper !== 'undefined') {
            const servicesSwiper = new Swiper('.services-swiper', {
                slidesPerView: 'auto', // Allows css-defined slide width for consistent sizing
                spaceBetween: 16, // Default space
                loop: true, // Enable infinite loop
                navigation: {
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                },
                pagination: {
                    el: '.swiper-pagination-custom',
                    clickable: true,
                },
                grabCursor: true,
                breakpoints: {
                    // Tablet
                    768: {
                        spaceBetween: 20
                    },
                    // Desktop
                    1024: {
                        spaceBetween: 24
                    }
                }
            });
            
            // GSAP Entrance animation for the section
            gsap.from(".solutions .content-wrapper > *", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".solutions",
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });
        }
    };
    initServicesCarousel();

    /* --------------------------------------------------------------------------
       11. PRE-FOOTER CTA ANIMATIONS (DESIGN-BUILD)
       -------------------------------------------------------------------------- */
    const initPreFooterCTA = () => {
        const preFooter = document.getElementById("pre-footer");
        if (!preFooter) return;

        // Background Image subtle parallax scale/pan
        gsap.to(".cta-bg-image", {
            scale: 1, // scale down from 1.24
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: preFooter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });

        // Background SVG pattern parallax
        gsap.to(".cta-svg-pattern", {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
                trigger: preFooter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });

        // Content fade in and stagger up
        gsap.from(".pre-footer-text-wrapper > *, .cta-button-wrapper", {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: preFooter,
                start: "top 70%",
            }
        });
    };
    initPreFooterCTA();

    /* --------------------------------------------------------------------------
       12. FEATURED PROJECTS FILTERING & ANIMATIONS
       -------------------------------------------------------------------------- */
    const initProjectsFilter = () => {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");

        if (filterBtns.length > 0 && projectCards.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    // Update active button state
                    filterBtns.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");

                    const category = btn.getAttribute("data-filter");

                    // Smooth GSAP fade out & scale down
                    gsap.to(projectCards, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            projectCards.forEach(card => {
                                const cardCats = card.getAttribute("data-categories").split(" ");
                                if (category === "all" || cardCats.includes(category)) {
                                    card.style.display = "block";
                                } else {
                                    card.style.display = "none";
                                }
                            });

                            // Smooth GSAP fade in & scale up for the active cards
                            gsap.to(projectCards, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                ease: "power2.out",
                                clearProps: "scale,opacity"
                            });
                        }
                    });
                });
            });
        }
    };
    initProjectsFilter();

    const initEnterpriseProjects = () => {
        const projectsSection = document.querySelector(".projects-section");

        if (!projectsSection) return;

        const showcase = projectsSection.querySelector(".proj-showcase:not(.proj-legacy-showcase)");

        if (!showcase) return;

        const cards = showcase.querySelectorAll(".proj-card");
        const slides = showcase.querySelectorAll(".proj-img-slide");
        const currentCounter = showcase.querySelector(".proj-counter-current");
        const totalCounter = showcase.querySelector(".proj-counter-total");
        const featureLabel = showcase.querySelector(".proj-feature-label");
        const featureTitle = showcase.querySelector(".proj-feature-title");
        const featureDesc = showcase.querySelector(".proj-feature-desc");

        if (cards.length === 0 || slides.length === 0) return;

        if (totalCounter) {
            totalCounter.textContent = String(cards.length).padStart(2, "0");
        }

        const setActiveProject = (index) => {
            const activeCard = cards[index];

            if (!activeCard) return;

            cards.forEach((card, cardIndex) => {
                const isActive = cardIndex === index;
                card.classList.toggle("active", isActive);
                card.setAttribute("aria-pressed", isActive ? "true" : "false");
            });

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("active", slideIndex === index);
            });

            if (currentCounter) {
                currentCounter.textContent = String(index + 1).padStart(2, "0");
            }

            if (featureLabel && activeCard.dataset.label) {
                featureLabel.textContent = activeCard.dataset.label;
            }

            if (featureTitle && activeCard.dataset.title) {
                featureTitle.textContent = activeCard.dataset.title;
            }

            if (featureDesc && activeCard.dataset.summary) {
                featureDesc.textContent = activeCard.dataset.summary;
            }
        };

        cards.forEach((card, index) => {
            card.addEventListener("mouseenter", () => setActiveProject(index));
            card.addEventListener("focus", () => setActiveProject(index));
            card.addEventListener("click", () => setActiveProject(index));
        });

        setActiveProject(0);
    };
    initEnterpriseProjects();

    const initProjectsAnimations = () => {
        // Entrance animation using ScrollTrigger
        if (document.querySelector(".projects-section")) {
            gsap.from(".projects-section .proj-header-grid > *, .projects-section .proj-proof-item, .projects-section .proj-showcase:not(.proj-legacy-showcase), .projects-section .proj-trust-item", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".projects-section",
                    start: "top 75%",
                }
            });
        }
    };
    if (window.innerWidth > 767) {
        initProjectsAnimations();
    }

    const initReviewsLoop = () => {
        const section = document.querySelector(".reviews-loop-section");
        if (!section) return;

        const track = section.querySelector(".reviews-track");
        if (!track) return;

        const cards = Array.from(track.querySelectorAll(".review-card"));
        if (cards.length === 0) return;

        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });
    };
    initReviewsLoop();

    const initProactiveSolutions = () => {
        const section = document.querySelector(".proactive-section");

        if (!section) return;

        const carousel = section.querySelector(".projects-expertise");
        const bgEl = section.querySelector(".projects-expertise-bg");
        const cardEl = section.querySelector(".projects-expertise-swiper");

        if (!carousel || !bgEl || !cardEl) return;

        if (typeof Swiper === "undefined") {
            carousel.classList.add("is-static");
            return;
        }

        const ensureLoopSlides = (swiperEl, minSlides = 10) => {
            const wrapper = swiperEl.querySelector(".swiper-wrapper");
            if (!wrapper) return;
            const originals = Array.from(wrapper.children);
            if (originals.length === 0 || originals.length >= minSlides) return;

            let index = 0;
            while (wrapper.children.length < minSlides) {
                const clone = originals[index % originals.length].cloneNode(true);
                wrapper.appendChild(clone);
                index += 1;
            }
        };

        ensureLoopSlides(bgEl);
        ensureLoopSlides(cardEl);

        const bgSwiper = new Swiper(bgEl, {
            allowTouchMove: false,
            effect: "fade",
            fadeEffect: { crossFade: true },
            loop: false,
            speed: 700
        });

        const cardSwiper = new Swiper(cardEl, {
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 5,
            loopPreventsSliding: false,
            speed: 700,
            slidesPerView: "auto",
            slidesPerGroup: 1,
            spaceBetween: 32,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            navigation: {
                prevEl: section.querySelector(".expertise-prev"),
                nextEl: section.querySelector(".expertise-next")
            },
            breakpoints: {
                0: { spaceBetween: 18 },
                861: { spaceBetween: 32 }
            },
            on: {
                realIndexChange(swiper) {
                    bgSwiper.slideTo(swiper.realIndex, 700);
                }
            }
        });

        bgSwiper.slideTo(cardSwiper.realIndex, 0);

        if (window.innerWidth > 767 && typeof gsap !== "undefined") {
            gsap.from(".proactive-header > *, .projects-expertise-bg, .expertise-nav", {
                opacity: 0,
                y: 45,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".proactive-section",
                    start: "top 72%",
                }
            });
        }
    };
    initProactiveSolutions();


    /* --------------------------------------------------------------------------
       13. BACK TO TOP BUTTON DYNAMIC SHOW/HIDE & SMOOTH SCROLL
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        const handleBackToTopScroll = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', handleBackToTopScroll);
        handleBackToTopScroll(); // run on init

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo('#hero', { duration: 1.2 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});
