document.addEventListener("DOMContentLoaded", () => {
    const SERVICES = {
        "concrete-foundations": {
            slug: "concrete-foundations",
            metaTitle: "Concrete Foundations | NF Construction LLC",
            metaDescription: "Professional concrete foundation services by NF Construction LLC. Durable foundation support built around precision, safety, reinforcement coordination, and long-term structural strength.",
            focusKeyword: "concrete foundations",
            seoTags: "concrete foundations, foundation construction, commercial concrete, structural foundation support, rebar coordination, concrete placement",
            image: "assets/images/03-service-concrete-foundations.webp",
            imageAlt: "Concrete foundation pour with rebar and workers on a commercial construction site",
            breadcrumb: "Home / Services / Concrete Foundations",
            heroTitle: "Concrete Foundations",
            heroParagraph: "Durable concrete foundations built for long-term structural strength, safety, and dependable performance.",
            smallLabel: "Concrete Foundations",
            mainHeading: "Strong starts begin below the structure",
            mainParagraph: "NF Construction LLC provides concrete foundation services with careful site preparation, reinforcement awareness, precision pouring, and quality checks that help each build begin on stable ground.",
            featureCards: [
                {
                    title: "Foundation Support",
                    text: "Footings, reinforcement coordination, concrete placement, and layout-aware preparation for stable construction."
                },
                {
                    title: "Built for Stability",
                    text: "Quality-focused foundation work designed for strength, safety, and dependable long-term performance."
                }
            ],
            benefits: [
                "Footings and structural foundation support",
                "Rebar coordination and concrete placement",
                "Layout-aware preparation and quality checks",
                "Commercial and residential foundation support"
            ],
            relatedCards: [
                {
                    title: "Field Coordination",
                    text: "Footings and structural foundation support",
                    image: "assets/images/03-service-concrete-foundations.webp",
                    alt: "Concrete foundation pour with rebar and workers on a commercial construction site"
                },
                {
                    title: "Execution Quality",
                    text: "Rebar coordination and concrete placement",
                    image: "assets/images/05-service-flatwork-slabs.webp",
                    alt: "Concrete slab finishing and flatwork crew on a commercial building deck"
                }
            ]
        },
        "commercial-framing": {
            slug: "commercial-framing",
            metaTitle: "Commercial Framing | NF Construction LLC",
            metaDescription: "NF Construction LLC provides commercial framing services with accurate layout support, structural coordination, safe assembly, and dependable field execution.",
            focusKeyword: "commercial framing",
            seoTags: "commercial framing, structural framing, steel framing, framing services, construction framing, building framework",
            image: "assets/images/04-service-commercial-framing.webp",
            imageAlt: "Commercial structural steel framing under golden sunset light",
            breadcrumb: "Home / Services / Commercial Framing",
            heroTitle: "Commercial Framing",
            heroParagraph: "Accurate framing support that keeps commercial projects strong, safe, and moving forward.",
            smallLabel: "Commercial Framing",
            mainHeading: "Frame the project with confidence",
            mainParagraph: "Our framing crews help create the structural framework that keeps projects moving. From commercial framing coordination to precise installation, we focus on accuracy, safety, and dependable workmanship throughout the build.",
            featureCards: [
                {
                    title: "Structural Accuracy",
                    text: "Blueprint-aware framing support with careful alignment, coordination, and safe assembly."
                },
                {
                    title: "Efficient Field Execution",
                    text: "Reliable crews that help keep commercial schedules moving with less delay and more control."
                }
            ],
            benefits: [
                "Commercial structural framing support",
                "Steel and framing coordination",
                "Blueprint interpretation and layout accuracy",
                "Safe and efficient assembly practices"
            ],
            relatedCards: [
                {
                    title: "Structural Support",
                    text: "Commercial structural framing support",
                    image: "assets/images/04-service-commercial-framing.webp",
                    alt: "Commercial structural steel framing under golden sunset light"
                },
                {
                    title: "Schedule Reliability",
                    text: "Safe and efficient assembly practices",
                    image: "assets/images/08-service-general-contracting.webp",
                    alt: "Large commercial construction site managed by cranes and equipment"
                }
            ]
        },
        "flatwork-slabs": {
            slug: "flatwork-slabs",
            metaTitle: "Flatwork & Slabs | NF Construction LLC",
            metaDescription: "NF Construction LLC delivers flatwork and concrete slab services with clean surface preparation, durable placement, finish consistency, and quality control.",
            focusKeyword: "flatwork and slabs",
            seoTags: "flatwork, concrete slabs, slab construction, concrete flatwork, commercial concrete surfaces, concrete finishing",
            image: "assets/images/05-service-flatwork-slabs.webp",
            imageAlt: "Concrete slab finishing and flatwork crew on a commercial building deck",
            breadcrumb: "Home / Services / Flatwork & Slabs",
            heroTitle: "Flatwork & Slabs",
            heroParagraph: "Clean, level concrete surfaces for commercial, residential, and site applications.",
            smallLabel: "Flatwork & Slabs",
            mainHeading: "Create durable concrete surfaces",
            mainParagraph: "Flatwork requires more than pouring concrete. NF Construction LLC delivers slab and flatwork services built for function, durability, finish consistency, and clean execution.",
            featureCards: [
                {
                    title: "Clean Surface Preparation",
                    text: "Level preparation and placement coordination for strong, reliable concrete surfaces."
                },
                {
                    title: "Durable Finish",
                    text: "Finish consistency and durable execution for high-use commercial and residential areas."
                }
            ],
            benefits: [
                "Commercial concrete slabs",
                "Level surface preparation",
                "Finishing and placement coordination",
                "Durable flatwork for high-use areas"
            ],
            relatedCards: [
                {
                    title: "Surface Quality",
                    text: "Commercial concrete slabs",
                    image: "assets/images/05-service-flatwork-slabs.webp",
                    alt: "Concrete slab finishing and flatwork crew on a commercial building deck"
                },
                {
                    title: "Durability Focus",
                    text: "Durable flatwork for high-use areas",
                    image: "assets/images/03-service-concrete-foundations.webp",
                    alt: "Concrete foundation pour with rebar and workers on a commercial construction site"
                }
            ]
        },
        "site-work-excavation": {
            slug: "site-work-excavation",
            metaTitle: "Site Work & Excavation | NF Construction LLC",
            metaDescription: "NF Construction LLC provides site work and excavation services including clearing, grading, preparation, drainage-conscious planning, and early-phase field coordination.",
            focusKeyword: "site work excavation",
            seoTags: "site work, excavation, grading, land clearing, site preparation, construction excavation, drainage planning",
            image: "assets/images/06-service-site-work-excavation.webp",
            imageAlt: "Excavator performing site work and excavation on a construction project",
            breadcrumb: "Home / Services / Site Work & Excavation",
            heroTitle: "Site Work & Excavation",
            heroParagraph: "Site preparation, grading, and excavation support for a strong project start.",
            smallLabel: "Site Work & Excavation",
            mainHeading: "Prepare the site the right way",
            mainParagraph: "A successful build starts before the structure goes up. We support projects with excavation, grading, clearing, and site preparation work designed to create safe access and stable conditions.",
            featureCards: [
                {
                    title: "Early-Phase Support",
                    text: "Clearing, excavation, grading, and site coordination before construction begins."
                },
                {
                    title: "Stable Conditions",
                    text: "Preparation work designed to support safe access, clean staging, and smooth project progress."
                }
            ],
            benefits: [
                "Land clearing and excavation support",
                "Grading and preparation for construction",
                "Drainage-conscious site planning",
                "Early-phase site coordination"
            ],
            relatedCards: [
                {
                    title: "Site Readiness",
                    text: "Land clearing and excavation support",
                    image: "assets/images/06-service-site-work-excavation.webp",
                    alt: "Excavator performing site work and excavation on a construction project"
                },
                {
                    title: "Ground Control",
                    text: "Grading and preparation for construction",
                    image: "assets/images/09-service-project-management.webp",
                    alt: "Construction project managers reviewing blueprints on site at sunset"
                }
            ]
        },
        "interior-build-outs": {
            slug: "interior-build-outs",
            metaTitle: "Interior Build-Outs | NF Construction LLC",
            metaDescription: "NF Construction LLC provides interior build-out support for commercial spaces, tenant improvements, interior framing, layout preparation, and trade coordination.",
            focusKeyword: "interior build-outs",
            seoTags: "interior build-outs, tenant improvements, commercial interior construction, interior framing, commercial build-out, finish preparation",
            image: "assets/images/07-service-interior-build-outs.webp",
            imageAlt: "Interior commercial build-out with metal studs and exposed mechanical systems",
            breadcrumb: "Home / Services / Interior Build-Outs",
            heroTitle: "Interior Build-Outs",
            heroParagraph: "Interior framing and build-out support for commercial spaces and tenant improvements.",
            smallLabel: "Interior Build-Outs",
            mainHeading: "Build interiors that work",
            mainParagraph: "NF Construction LLC helps transform interior spaces into build-ready and business-ready environments. Our work supports layouts, framing, coordination, and finish preparation with practical attention to detail.",
            featureCards: [
                {
                    title: "Commercial Layout Support",
                    text: "Interior framing and layout preparation for commercial spaces and tenant improvements."
                },
                {
                    title: "Clean Coordination",
                    text: "Support across mechanical, framing, and finish-preparation requirements for smoother delivery."
                }
            ],
            benefits: [
                "Commercial interior framing and layout support",
                "Tenant improvement preparation",
                "Coordination with mechanical and finish trades",
                "Clean execution for business-ready spaces"
            ],
            relatedCards: [
                {
                    title: "Interior Framing",
                    text: "Commercial interior framing and layout support",
                    image: "assets/images/07-service-interior-build-outs.webp",
                    alt: "Interior commercial build-out with metal studs and exposed mechanical systems"
                },
                {
                    title: "Tenant Readiness",
                    text: "Clean execution for business-ready spaces",
                    image: "assets/images/04-service-commercial-framing.webp",
                    alt: "Commercial structural steel framing under golden sunset light"
                }
            ]
        },
        "general-contracting": {
            slug: "general-contracting",
            metaTitle: "General Contracting | NF Construction LLC",
            metaDescription: "NF Construction LLC offers general contracting support with project coordination, trade alignment, scheduling, field communication, and quality oversight.",
            focusKeyword: "general contracting",
            seoTags: "general contracting, construction contractor, project coordination, trade alignment, construction planning, field communication",
            image: "assets/images/08-service-general-contracting.webp",
            imageAlt: "Large commercial construction site managed by cranes and equipment",
            breadcrumb: "Home / Services / General Contracting",
            heroTitle: "General Contracting",
            heroParagraph: "Clear coordination from planning to completion with safety, quality, and schedule control.",
            smallLabel: "General Contracting",
            mainHeading: "Manage every phase with clarity",
            mainParagraph: "Our general contracting approach is built around communication, scheduling, and field control. We help coordinate people, materials, and construction phases so each project moves forward with accountability.",
            featureCards: [
                {
                    title: "Project Coordination",
                    text: "Trade alignment, field communication, construction planning, and practical project support."
                },
                {
                    title: "Schedule Control",
                    text: "Clear oversight to help keep work organized, efficient, and aligned with project goals."
                }
            ],
            benefits: [
                "Project coordination and trade alignment",
                "Schedule and field communication",
                "Quality oversight and construction planning",
                "Commercial and residential project support"
            ],
            relatedCards: [
                {
                    title: "Trade Alignment",
                    text: "Project coordination and trade alignment",
                    image: "assets/images/08-service-general-contracting.webp",
                    alt: "Large commercial construction site managed by cranes and equipment"
                },
                {
                    title: "Field Control",
                    text: "Quality oversight and construction planning",
                    image: "assets/images/06-service-site-work-excavation.webp",
                    alt: "Excavator performing site work and excavation on a construction project"
                }
            ]
        },
        "project-management": {
            slug: "project-management",
            metaTitle: "Project Management | NF Construction LLC",
            metaDescription: "NF Construction LLC provides construction project management support with schedule visibility, stakeholder communication, issue tracking, field coordination, and closeout support.",
            focusKeyword: "construction project management",
            seoTags: "project management, construction management, schedule coordination, field management, construction planning, project closeout",
            image: "assets/images/09-service-project-management.webp",
            imageAlt: "Construction project managers reviewing blueprints on site at sunset",
            breadcrumb: "Home / Services / Project Management",
            heroTitle: "Project Management",
            heroParagraph: "Planning, communication, and field control to keep every project on track.",
            smallLabel: "Project Management",
            mainHeading: "Keep the project moving forward",
            mainParagraph: "Construction success depends on the details. Our project management support helps keep stakeholders aligned, schedules visible, and field decisions moving from start to handoff.",
            featureCards: [
                {
                    title: "Clear Communication",
                    text: "Aligned stakeholders, visible schedules, and proactive updates throughout the project."
                },
                {
                    title: "Practical Problem Solving",
                    text: "Issue tracking, field coordination, and closeout support for smoother delivery."
                }
            ],
            benefits: [
                "Project planning and schedule visibility",
                "On-site coordination and communication",
                "Issue tracking and proactive problem solving",
                "Closeout support and handoff coordination"
            ],
            relatedCards: [
                {
                    title: "Project Visibility",
                    text: "Project planning and schedule visibility",
                    image: "assets/images/09-service-project-management.webp",
                    alt: "Construction project managers reviewing blueprints on site at sunset"
                },
                {
                    title: "Delivery Support",
                    text: "Closeout support and handoff coordination",
                    image: "assets/images/08-service-general-contracting.webp",
                    alt: "Large commercial construction site managed by cranes and equipment"
                }
            ]
        }
    };

    const DEFAULT_SLUG = "concrete-foundations";

    const heroBg = document.getElementById("serviceHeroBg");
    const breadcrumb = document.getElementById("serviceBreadcrumb");
    const heroTitle = document.getElementById("serviceHeroTitle");
    const heroParagraph = document.getElementById("serviceHeroParagraph");

    const mainImage = document.getElementById("serviceMainImage");
    const smallLabel = document.getElementById("serviceSmallLabel");
    const mainHeading = document.getElementById("serviceMainHeading");
    const mainParagraph = document.getElementById("serviceMainParagraph");

    const featureOneTitle = document.getElementById("featureOneTitle");
    const featureOneText = document.getElementById("featureOneText");
    const featureTwoTitle = document.getElementById("featureTwoTitle");
    const featureTwoText = document.getElementById("featureTwoText");

    const benefitsList = document.getElementById("serviceBenefits");

    const relatedImageOne = document.getElementById("relatedImageOne");
    const relatedTitleOne = document.getElementById("relatedTitleOne");
    const relatedTextOne = document.getElementById("relatedTextOne");
    const relatedImageTwo = document.getElementById("relatedImageTwo");
    const relatedTitleTwo = document.getElementById("relatedTitleTwo");
    const relatedTextTwo = document.getElementById("relatedTextTwo");

    const metaDescription = document.getElementById("metaDescription");
    const metaKeywords = document.getElementById("metaKeywords");
    const metaFocusKeyword = document.getElementById("metaFocusKeyword");
    const ogTitle = document.getElementById("ogTitle");
    const ogDescription = document.getElementById("ogDescription");
    const ogImage = document.getElementById("ogImage");
    const ogImageAlt = document.getElementById("ogImageAlt");
    const ogUrl = document.getElementById("ogUrl");

    const sidebarLinks = document.querySelectorAll("#serviceSidebarLinks a[data-service]");

    const getServiceFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("service");
        if (slug && SERVICES[slug]) {
            return slug;
        }
        return DEFAULT_SLUG;
    };

    const setMetaContent = (service) => {
        document.title = service.metaTitle;
        metaDescription.setAttribute("content", service.metaDescription);
        metaKeywords.setAttribute("content", service.seoTags);
        metaFocusKeyword.setAttribute("content", service.focusKeyword);
        ogTitle.setAttribute("content", service.metaTitle);
        ogDescription.setAttribute("content", service.metaDescription);
        const resolvedImageUrl = new URL(service.image, window.location.href).href;
        const resolvedPageUrl = `${window.location.href.split("?")[0]}?service=${service.slug}`;
        ogImage.setAttribute("content", resolvedImageUrl);
        ogImageAlt.setAttribute("content", service.imageAlt);
        ogUrl.setAttribute("content", resolvedPageUrl);
    };

    const setActiveSidebar = (slug) => {
        sidebarLinks.forEach((link) => {
            const isActive = link.getAttribute("data-service") === slug;
            link.classList.toggle("active", isActive);
            link.setAttribute("aria-current", isActive ? "page" : "false");
        });
    };

    const setBenefits = (items) => {
        benefitsList.innerHTML = "";
        items.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            benefitsList.appendChild(li);
        });
    };

    const setRelatedCards = (cards) => {
        const first = cards[0];
        const second = cards[1];

        relatedImageOne.src = first.image;
        relatedImageOne.alt = first.alt;
        relatedTitleOne.textContent = first.title;
        relatedTextOne.textContent = first.text;

        relatedImageTwo.src = second.image;
        relatedImageTwo.alt = second.alt;
        relatedTitleTwo.textContent = second.title;
        relatedTextTwo.textContent = second.text;
    };

    const renderService = (slug, updateUrl = false) => {
        const service = SERVICES[slug] || SERVICES[DEFAULT_SLUG];

        heroBg.style.backgroundImage = `url('${service.image}')`;
        breadcrumb.textContent = service.breadcrumb;
        heroTitle.textContent = service.heroTitle;
        heroParagraph.textContent = service.heroParagraph;

        mainImage.src = service.image;
        mainImage.alt = service.imageAlt;
        smallLabel.textContent = service.smallLabel;
        mainHeading.textContent = service.mainHeading;
        mainParagraph.textContent = service.mainParagraph;

        featureOneTitle.textContent = service.featureCards[0].title;
        featureOneText.textContent = service.featureCards[0].text;
        featureTwoTitle.textContent = service.featureCards[1].title;
        featureTwoText.textContent = service.featureCards[1].text;

        setBenefits(service.benefits);
        setRelatedCards(service.relatedCards);
        setMetaContent(service);
        setActiveSidebar(service.slug);

        if (updateUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set("service", service.slug);
            history.replaceState({ service: service.slug }, "", `${url.pathname}?${url.searchParams.toString()}`);
        }
    };

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = link.getAttribute("data-service");
            renderService(slug, true);

            if (window.innerWidth <= 1024) {
                const serviceContent = document.getElementById("serviceContent");
                serviceContent.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    window.addEventListener("popstate", () => {
        renderService(getServiceFromUrl(), false);
    });

    renderService(getServiceFromUrl(), false);
});
