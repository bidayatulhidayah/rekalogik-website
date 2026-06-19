export const C = {
  blue: "#D6336C",      // yellow — primary CTA / accent
  blueDark: "#06263F",  // dark navy — hero, stats, footer bg
  blueLight: "#F9B3CB", // light yellow — hover states / subtle tints
  bluePale: "#FCE4EF",  // very pale yellow — card/section bg
  cream: "#F8F8F8",     // off-white — alternating section bg
  text: "#06263F",      // dark navy — all body text
  muted: "#626262",     // medium grey — secondary/muted text
};

export const STATS = [
  { num: "5+", label: "Workshop Organisers" },
  { num: "10+", label: "Facilitators" },
  { num: "200+", label: "Students" },
  { num: "8+", label: "Schools" },
];

export const WORKSHOPS = [
  {
    name: "REKABIT Basic",
    slug: "rekabit-basic",
    level: "Darjah 4 – 6",
    icon: "🧩",
    bg: "#F8F8F8",
    desc: "Introduction to block-based coding, logical thinking, and computational problem-solving. No prior experience needed.",
    fullDesc:
      "REKABIT Basic is designed for students in Darjah 4 to 6 who are completely new to coding. Through fun, guided projects using block-based programming, students learn the core concepts of computational thinking — sequencing, loops, conditions, and events — without writing a single line of text code. By the end of the workshop, every student will have built their own working project to show off.",
    whatYouLearn: [
      "Block-based programming fundamentals",
      "Logical sequencing and flow control",
      "Loops and conditional statements",
      "Creative project-based learning",
      "Debugging and problem-solving mindset",
    ],
    duration: "2 days (6 hours/day)",
    price: "Contact us for pricing",
    suitable: "No prior coding experience required",
  },
  {
    name: "REKABIT Advanced",
    slug: "rekabit-advanced",
    level: "Darjah 4 – 6",
    icon: "💻",
    bg: "#FCE4EF",
    desc: "Step up to text-based coding and build more complex logic projects. Requires REKABIT Basic completion.",
    fullDesc:
      "Building on what students learned in REKABIT Basic, this advanced track transitions them from block-based coding to actual text-based programming. Students tackle more complex projects, learn to read and write code, and develop a deeper understanding of algorithms. Prerequisite: REKABIT Basic.",
    whatYouLearn: [
      "Text-based programming introduction",
      "Variables, functions, and data types",
      "More complex algorithm design",
      "Collaborative project development",
      "Code reading and debugging skills",
    ],
    duration: "2 days (6 hours/day)",
    price: "Contact us for pricing",
    suitable: "REKABIT Basic completion required",
  },
  {
    name: "ESP32 Basic",
    slug: "esp32-basic",
    level: "Tingkatan 1 – 3",
    icon: "⚡",
    bg: "#F8F8F8",
    desc: "Hands-on electronics and IoT programming with the ESP32 microcontroller. Build real hardware projects.",
    fullDesc:
      "ESP32 Basic bridges the gap between software and the physical world. Secondary school students learn electronics fundamentals, circuit assembly, and how to program the ESP32 microcontroller to interact with sensors, LEDs, and other hardware components. Students leave with a physical project they built themselves — a real taste of the Internet of Things.",
    whatYouLearn: [
      "Basic electronics and circuit concepts",
      "ESP32 microcontroller programming",
      "Sensor integration and data reading",
      "IoT project assembly",
      "Hardware troubleshooting",
    ],
    duration: "2 days (6 hours/day)",
    price: "Contact us for pricing",
    suitable: "Open to all Tingkatan 1–3 students",
  },
];

export const SERVICES = [
  {
    title: "School Workshops",
    slug: "school-workshops",
    icon: "🏫",
    desc: "Tailored STEM coding sessions delivered at your school premises, aligned with the curriculum.",
    fullDesc:
      "We come to your school. Our team designs a customised STEM coding programme that fits your school's schedule, student level, and learning objectives. Sessions can be conducted during co-curriculum periods, school events, or special STEM days. All equipment and materials are provided.",
    features: [
      "Customisable duration and format",
      "All materials and devices provided",
      "Curriculum-aligned content",
      "Beginner to intermediate levels",
      "Post-session progress report",
      "Certificate of participation",
    ],
  },
  {
    title: "Holiday Camps",
    slug: "holiday-camps",
    icon: "🏕️",
    desc: "Intensive multi-day workshops during school holidays — fun, focused, and full of making.",
    fullDesc:
      "Our holiday camps are the perfect way for students to dive deep into STEM coding over a concentrated period. Running during school holidays, camps combine structured learning with creative freedom — students work on projects, collaborate with peers, and leave with real skills and lasting friendships.",
    features: [
      "Multi-day intensive format",
      "Project-based final showcase",
      "Small group sizes (max 15 per group)",
      "Experienced facilitators",
      "Fun team activities",
      "Certificate of completion",
    ],
  },
  {
    title: "Corporate CSR",
    slug: "corporate-csr",
    icon: "🤝",
    desc: "STEM outreach programmes designed for your community engagement and social responsibility goals.",
    fullDesc:
      "Partner with RekaLogik Studio to bring STEM education to underserved communities as part of your Corporate Social Responsibility initiative. We design and execute targeted outreach programmes that align with your CSR goals — from single-day workshops at community centres to long-term school adoption programmes.",
    features: [
      "Fully managed programme delivery",
      "Impact reporting and documentation",
      "Co-branding opportunities",
      "Flexible scope and scale",
      "Community-focused approach",
      "Certificate and event coverage",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "My daughter loved every minute of it! She came home so excited about coding — she's never shown this much interest in anything academic before.",
    name: "Parent",
    role: "REKABIT Basic participant",
  },
  {
    quote:
      "The facilitators were patient, fun, and really good at explaining. I finally understand how coding works and I want to learn more!",
    name: "Student",
    role: "REKABIT Advanced",
  },
  {
    quote:
      "Excellent programme. The kids were fully engaged throughout the session — very well organised and the content was age-appropriate.",
    name: "Teacher",
    role: "Selangor",
  },
  {
    quote:
      "We brought RekaLogik Studio to our school for a STEM day and it was a hit. The students are still talking about it weeks later.",
    name: "School Administrator",
    role: "Kuala Lumpur",
  },
  {
    quote:
      "The ESP32 workshop was mind-blowing. I didn't think I could build an actual circuit but I did. Can't wait for the next one.",
    name: "Student",
    role: "ESP32 Basic, Tingkatan 2",
  },
  {
    quote:
      "As a parent, I was impressed by how structured yet fun the programme was. My son completed both Basic and Advanced levels.",
    name: "Parent",
    role: "Petaling Jaya",
  },
];

export const FAQS = [
  {
    q: "Who can join the workshops?",
    a: "Our workshops are designed for primary school students in Darjah 4 to 6 (REKABIT Basic & Advanced) and secondary school students in Tingkatan 1 to 3 (ESP32 Basic). All programmes are suitable for beginners unless stated otherwise.",
  },
  {
    q: "Do participants need prior coding experience?",
    a: "No experience is needed for REKABIT Basic or ESP32 Basic — they are designed from the ground up for first-timers. REKABIT Advanced requires completion of REKABIT Basic.",
  },
  {
    q: "Where are the workshops held?",
    a: "Most workshops are held at our studio. We also offer school outreach where we bring the workshop to your school. Check our Contact page or WhatsApp us to discuss your preferred arrangement.",
  },
  {
    q: "What do participants need to bring?",
    a: "Nothing! All devices, components, and materials are provided by us. Participants just need to bring themselves and their curiosity.",
  },
  {
    q: "Is there a pair discount?",
    a: "Yes! Students who register for both REKABIT Basic and REKABIT Advanced at the same time enjoy a special pair discount. Details will be shown during registration.",
  },
  {
    q: "What is the group size?",
    a: "We keep group sizes small (maximum 15 students per group) to ensure every student gets personalised attention from our facilitators.",
  },
  {
    q: "How do I register?",
    a: "Click the Register button on this website to fill in the online registration form. Payment details will be provided after you submit the form. You may also contact us via WhatsApp if you need assistance.",
  },
  {
    q: "What happens if a session is cancelled?",
    a: "In the rare event of a cancellation, registered participants will be contacted at least 48 hours in advance and offered a full refund or rescheduling to the next available slot.",
  },
];

export const VALUES = [
  {
    title: "Curiosity First",
    desc: "We design every programme to spark questions, not just deliver answers. A curious student is a motivated learner.",
    icon: "🔍",
  },
  {
    title: "Hands-On Always",
    desc: "Lectures have their place — but we believe students learn best by building, breaking, and rebuilding things themselves.",
    icon: "🛠️",
  },
  {
    title: "Accessible STEM",
    desc: "Quality STEM education should not be a privilege. We work to make our programmes available to students from all backgrounds.",
    icon: "🌏",
  },
  {
    title: "Expert Facilitators",
    desc: "Our facilitators are trained educators and working professionals who are passionate about both technology and teaching.",
    icon: "🎓",
  },
];
