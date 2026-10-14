(function () {
  var pages = [
    {
      slug: "refill", category: "For individuals", title: "Medication refill", eyebrow: "Everyday care",
      description: "Get clear guidance on medication refills and find a path to care-team support when you need it.",
      image: "photo-1576091160399-112ba8d25d1d",
      highlights: [
        ["A clearer next step", "Understand where to begin when it is time to request a refill."],
        ["Care-team connection", "Know when a clinician or care professional can help with questions."],
        ["Support between visits", "Keep everyday care connected to the rest of your health journey."]
      ]
    },
    {
      slug: "hpv", category: "For individuals", title: "HPV care", eyebrow: "Private, supportive care",
      description: "Find discreet information and compassionate clinical support for HPV and genital warts, without judgment.",
      image: "photo-1559757148-5c350d0d3c56",
      highlights: [
        ["A judgment-free approach", "Explore information in a respectful, supportive setting."],
        ["Private guidance", "Understand care options and questions you may want to discuss."],
        ["A path forward", "Find an appropriate next step with clinical support."]
      ]
    },
    {
      slug: "galleri-v2", category: "For individuals", title: "Early cancer screening", eyebrow: "Proactive health",
      description: "Learn how Galleri multi-cancer early detection testing may fit into a broader conversation about preventive health and screening.",
      image: "photo-1559757175-0eb30cd8c063",
      highlights: [
        ["Screening information", "Understand the role of multi-cancer early detection testing."],
        ["Clinical conversation", "Discuss screening in the context of your personal health."],
        ["Prevention in context", "Consider testing alongside other recommended preventive care."]
      ]
    },
    {
      slug: "elora", category: "For individuals", title: "Longevity", eyebrow: "Healthspan, thoughtfully",
      description: "Bring preventive medicine, advanced insights, and practical lifestyle support together around your health goals.",
      image: "photo-1505751172876-fa1923c5c528",
      highlights: [
        ["Preventive perspective", "Focus on healthspan with a proactive approach to wellbeing."],
        ["Insights for you", "Use health information to guide thoughtful next steps."],
        ["Practical support", "Connect everyday habits with longer-term health goals."]
      ]
    },
    {
      slug: "concierge", category: "For individuals", title: "Care providers", eyebrow: "Care with a human connection",
      description: "Connect with providers and care professionals who can help you navigate questions, services, and ongoing care.",
      image: "photo-1551190822-a9333d879b1f",
      highlights: [
        ["Human connection", "Find support from care professionals who can listen and guide."],
        ["Help navigating care", "Make it easier to understand services and potential next steps."],
        ["More continuity", "Keep your care journey connected beyond one interaction."]
      ]
    },
    {
      slug: "patient", category: "For individuals", title: "Member portal", eyebrow: "Your care, at your fingertips",
      description: "Find your way to the GenieMD member experience for appointments, care conversations, and account support.",
      image: "photo-1516321318423-f06f85e504b3",
      highlights: [
        ["Care access", "Find the member experience for care-related needs."],
        ["Appointments and conversations", "Keep important care interactions close at hand."],
        ["Account support", "Look for help with your member account and access."]
      ]
    },
    {
      slug: "telehealth", category: "For organizations", title: "Telehealth", eyebrow: "For health organizations",
      description: "A flexible telehealth foundation for connecting patients, clinicians, and care journeys across digital touchpoints.",
      image: "photo-1551190822-a9333d879b1f",
      highlights: [
        ["Connected visits", "Bring virtual interactions into a more connected care experience."],
        ["Patient access", "Support convenient connections between patients and clinicians."],
        ["Flexible foundation", "Explore a digital approach that can support different care needs."]
      ]
    },
    {
      slug: "ccm", category: "For organizations", title: "Chronic care management", eyebrow: "Care between visits",
      description: "Support patients living with chronic conditions through structured outreach, monitoring, and coordinated follow-through.",
      image: "photo-1628348070889-cb656235b4eb",
      highlights: [
        ["Ongoing outreach", "Stay connected with patients beyond scheduled visits."],
        ["Coordinated follow-through", "Help care teams keep next steps visible and organized."],
        ["Patient support", "Build a more continuous care experience for chronic conditions."]
      ]
    },
    {
      slug: "pharma", category: "For organizations", title: "Pharmaceutical partnerships", eyebrow: "For life sciences",
      description: "Explore connected digital health programs designed to support patient engagement and collaboration across life sciences.",
      image: "photo-1579684385127-1ef15d508118",
      highlights: [
        ["Patient engagement", "Explore digital ways to help keep people connected to support."],
        ["Connected programs", "Bring relevant resources into a cohesive experience."],
        ["Collaborative care", "Support collaboration across the health ecosystem."]
      ]
    },
    {
      slug: "pharmacies", category: "For organizations", title: "Pharmacy partnerships", eyebrow: "For pharmacy partners",
      description: "Discover ways digital care programs can support pharmacy teams, patients, and clinical moments beyond the counter.",
      image: "photo-1576091160399-112ba8d25d1d",
      highlights: [
        ["Beyond the counter", "Connect pharmacy touchpoints with broader care support."],
        ["Patient guidance", "Help people discover relevant information and next steps."],
        ["Connected services", "Explore programs that complement pharmacy care."]
      ]
    },
    {
      slug: "healthevents", category: "For organizations", title: "Community health screening", eyebrow: "Health, out in the community",
      description: "Create welcoming screening experiences for communities, workplaces, and partners—with follow-through beyond event day.",
      image: "photo-1505751172876-fa1923c5c528",
      highlights: [
        ["Accessible events", "Bring screening experiences closer to the communities served."],
        ["Partner coordination", "Connect organizations and care teams around event needs."],
        ["Beyond event day", "Keep follow-up and next steps part of the experience."]
      ]
    },
    {
      slug: "medicalgroup", category: "For organizations", title: "Medical group", eyebrow: "Clinical care",
      description: "Explore clinician-led care pathways paired with thoughtful guidance and connected digital tools.",
      image: "photo-1559757148-5c350d0d3c56",
      highlights: [
        ["Clinician-led care", "Keep clinical expertise at the center of the experience."],
        ["Connected pathways", "Bring care steps and digital support closer together."],
        ["Thoughtful guidance", "Help people navigate care with clarity and context."]
      ]
    },
    {
      slug: "about-us", category: "About GenieMD", title: "Our vision and mission", eyebrow: "Why GenieMD",
      description: "We believe healthcare can be more personal, more continuous, and easier to navigate—with thoughtful technology and clinicians at its heart.",
      image: "photo-1579684385127-1ef15d508118",
      highlights: [
        ["People first", "Design care experiences around the people who use them."],
        ["Technology with purpose", "Use digital tools to make care easier to navigate."],
        ["Clinicians at the center", "Value the context, judgment, and empathy clinicians bring."]
      ]
    },
    {
      slug: "press", category: "About GenieMD", title: "News and recognition", eyebrow: "GenieMD in the world",
      description: "Explore company news, perspectives, and recognition across digital health, virtual care, and patient engagement.",
      image: "photo-1497366754035-f200968a6e72",
      highlights: [
        ["Company updates", "Find the latest stories and announcements from GenieMD."],
        ["Digital health perspectives", "Explore ideas shaping connected and virtual care."],
        ["Recognition", "Learn about GenieMD's work across the health ecosystem."]
      ]
    },
    {
      slug: "contact", category: "About GenieMD", title: "Contact GenieMD", eyebrow: "Start a conversation",
      description: "Whether you are looking for care or exploring a partnership, discover the right place to start with GenieMD.",
      image: "photo-1551836022-d5d88e9218df",
      highlights: [
        ["Looking for care?", "Explore individual care and clinical support options."],
        ["Exploring a partnership?", "Browse programs for organizations and care teams."],
        ["Find the right direction", "Use the destination cards below to continue."]
      ],
      notice: "This is a static information page. It does not submit contact requests or collect personal information."
    },
    {
      slug: "privacy", category: "About GenieMD", title: "Privacy policy", eyebrow: "Your privacy matters",
      description: "Learn about privacy practices and how information is handled when using GenieMD products and services.",
      image: "photo-1555949963-ff9fe0c870eb",
      highlights: [
        ["Information practices", "Review how privacy is addressed across GenieMD experiences."],
        ["Use of services", "Understand that product-specific practices may vary by service."],
        ["Questions", "For service-specific details, consult the relevant GenieMD service."]
      ],
      notice: "This overview is informational and is not a substitute for the official privacy policy that applies to a specific GenieMD service."
    },
    {
      slug: "tos", category: "About GenieMD", title: "Terms of use", eyebrow: "Using GenieMD",
      description: "Review the terms that apply when accessing GenieMD websites, digital tools, and connected healthcare services.",
      image: "photo-1450101499163-c8848c66ca85",
      highlights: [
        ["Website access", "Understand the terms that may apply to GenieMD websites."],
        ["Digital tools", "Review service-specific terms before using connected tools."],
        ["Healthcare services", "Check the applicable terms for the service you use."]
      ],
      notice: "This overview is informational and is not a substitute for the official terms that apply to a specific GenieMD service."
    }
  ];

  var root = document.getElementById("destination-content");
  if (!root) return;

  var slug = new URLSearchParams(window.location.search).get("page");
  var page = pages.find(function (item) { return item.slug === slug; });

  function makeRelatedCard(item) {
    var link = document.createElement("a");
    link.className = "destination-related-card";
    link.href = "?page=" + encodeURIComponent(item.slug);
    var category = document.createElement("small");
    category.textContent = item.category;
    var title = document.createElement("strong");
    title.textContent = item.title;
    var more = document.createElement("span");
    more.textContent = "Explore page  ↗";
    link.append(category, title, more);
    return link;
  }

  if (!page) {
    document.title = "Explore GenieMD";
    root.innerHTML = '<section class="destination-hero"><div class="destination-copy"><p class="eyebrow"><span></span> GenieMD pages</p><h1>Choose a care destination.</h1><p>Browse care, clinical programs, and information pages from one place.</p><div class="destination-actions"><a class="button button-primary" href="../index.html#collections">Browse all pages <span>↗</span></a></div></div></section>';
    var fallbackGrid = document.createElement("div");
    fallbackGrid.className = "destination-related-grid destination-fallback-grid";
    pages.forEach(function (item) { fallbackGrid.appendChild(makeRelatedCard(item)); });
    root.appendChild(fallbackGrid);
    return;
  }

  document.title = page.title + " | GenieMD";
  var breadcrumb = document.createElement("nav");
  breadcrumb.className = "destination-breadcrumb";
  breadcrumb.setAttribute("aria-label", "Breadcrumb");
  breadcrumb.innerHTML = '<a href="../index.html#home">Home</a><span aria-hidden="true">/</span><a href="../index.html#collections">All pages</a><span aria-hidden="true">/</span>';
  var current = document.createElement("span");
  current.textContent = page.title;
  breadcrumb.appendChild(current);

  var hero = document.createElement("section");
  hero.className = "destination-hero";
  var copy = document.createElement("div");
  copy.className = "destination-copy";
  var eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.innerHTML = "<span></span>";
  eyebrow.appendChild(document.createTextNode(" " + page.eyebrow));
  var heading = document.createElement("h1");
  heading.textContent = page.title;
  var description = document.createElement("p");
  description.textContent = page.description;
  var actions = document.createElement("div");
  actions.className = "destination-actions";
  actions.innerHTML = '<a class="button button-primary" href="../index.html#collections">Explore all pages <span aria-hidden="true">↗</span></a><a class="button button-text" href="../index.html#home">Back to home <span aria-hidden="true">↑</span></a>';
  copy.append(eyebrow, heading, description, actions);

  var visual = document.createElement("div");
  visual.className = "destination-visual";
  var image = document.createElement("img");
  image.src = "https://images.unsplash.com/" + page.image + "?auto=format&fit=crop&w=1200&q=85";
  image.alt = "";
  image.fetchPriority = "high";
  var visualLabel = document.createElement("span");
  visualLabel.className = "destination-visual-label";
  visualLabel.innerHTML = '<i class="fas fa-heartbeat" aria-hidden="true"></i>';
  visualLabel.appendChild(document.createTextNode(" Thoughtful technology · Human-centered care"));
  visual.append(image, visualLabel);
  hero.append(copy, visual);

  var highlights = document.createElement("section");
  highlights.className = "destination-highlights";
  highlights.setAttribute("aria-label", "Key information");
  page.highlights.forEach(function (item, index) {
    var card = document.createElement("article");
    card.className = "destination-highlight";
    var number = document.createElement("span");
    number.textContent = "0" + (index + 1) + " / " + page.category.toUpperCase();
    var title = document.createElement("h2");
    title.textContent = item[0];
    var text = document.createElement("p");
    text.textContent = item[1];
    card.append(number, title, text);
    highlights.appendChild(card);
  });

  root.append(breadcrumb, hero, highlights);
  if (page.notice) {
    var notice = document.createElement("p");
    notice.className = "destination-notice";
    notice.textContent = page.notice;
    root.appendChild(notice);
  }

  var relatedItems = pages.filter(function (item) {
    return item.slug !== page.slug && item.category === page.category;
  }).slice(0, 3);
  if (relatedItems.length < 3) {
    pages.forEach(function (item) {
      if (relatedItems.length < 3 && item.slug !== page.slug && relatedItems.indexOf(item) === -1) {
        relatedItems.push(item);
      }
    });
  }

  var related = document.createElement("section");
  related.className = "destination-related";
  related.innerHTML = '<div class="destination-related-heading"><div><p class="eyebrow"><span></span> Keep exploring</p><h2>Related pages</h2></div><a class="button button-outline" href="../index.html#collections">View all pages <span aria-hidden="true">↗</span></a></div>';
  var relatedGrid = document.createElement("div");
  relatedGrid.className = "destination-related-grid";
  relatedItems.forEach(function (item) { relatedGrid.appendChild(makeRelatedCard(item)); });
  related.appendChild(relatedGrid);
  root.appendChild(related);
})();
