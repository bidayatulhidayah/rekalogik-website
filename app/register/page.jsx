"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const LOGO_CREAM = "/assets/logo_cream_transparents.png";
const LOGO_STEEL_BLUE = "/assets/logo_steelBlue_transparents.png";
const QR_SRC = "/assets/qr_muamalat_faezah.png";
const BG_TEXTURE = "/assets/bg-square-cream.jpg";

// ============================================================
// REKALOGIK STUDIO — WORKSHOP REGISTRATION FORM
// ============================================================

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwA9ebn8SJTIzfagda-Yl6a566ZeatiBzOmcPoAyVcqozMOOw8Dp5AlGUVDcmzZ3eYQbg/exec";
const DRAFT_KEY = "rls-reg-draft-v1";


const GRADES = [
  { v:1,  label:"Darjah 1 / Year 1",       ageRange:[6,8]  },
  { v:2,  label:"Darjah 2 / Year 2",       ageRange:[7,9]  },
  { v:3,  label:"Darjah 3 / Year 3",       ageRange:[8,10] },
  { v:4,  label:"Darjah 4 / Year 4",       ageRange:[9,11] },
  { v:5,  label:"Darjah 5 / Year 5",       ageRange:[10,12]},
  { v:6,  label:"Darjah 6 / Year 6",       ageRange:[11,13]},
  { v:7,  label:"Tingkatan 1 / Year 7",    ageRange:[12,14]},
  { v:8,  label:"Tingkatan 2 / Year 8",    ageRange:[13,15]},
  { v:9,  label:"Tingkatan 3 / Year 9",    ageRange:[14,16]},
  { v:10, label:"Tingkatan 4 / Year 10",   ageRange:[15,17]},
  { v:11, label:"Tingkatan 5 / Year 11",   ageRange:[16,18]},
];

const WORKSHOP_CONTENT = {
  "rekabit-basic": {
    emoji: "🤖",
    tagline: "Perfect for beginners! No experience needed.",
    learns: [
      "Introduction to REKABIT Hardware",
      "Coding with Microsoft MakeCode (Block-Based)",
      "Basic Components: LED, Buzzer, Push Button, etc.",
      "Sensors and Actuators",
      "Wiring Connections",
      "Basic Coding for Each Component",
      "Simple Project & Presentation",
    ],
    outcome: "By the end of this workshop, your child will understand the fundamentals of Micro:bit and REKABIT, and be able to control simple components using Microsoft MakeCode.",
    gradeLabel: "Darjah 4 – 6 (Year 4–6)",
  },
  "rekabit-advanced": {
    emoji: "🚀",
    tagline: "Take your skills to the next level!",
    learns: [
      "Review of REKABIT Basics",
      "Advanced Sensors (Ultrasonic, Touch, etc.)",
      "Multi-Component Integration",
      "Logic-Based Problem Solving",
      "Guided Project Design & Presentation",
    ],
    outcome: "By the end of this workshop, your child will be able to solve real-world problems using a programming approach, design their own solutions, and present their work with confidence.",
    gradeLabel: "Darjah 4 – 6 (Year 4–6)",
  },
  "esp32-basic": {
    emoji: "⚡",
    tagline: "Get started in the world of programming and microcontrollers with ESP32!",
    learns: [
      "Introduction to ESP32 Microcontroller",
      "Programming ESP32 Using Block-Based Code",
      "Basic Components",
      "Circuit Connection and Wiring",
      "Sensors: Temperature, Humidity, Touch, etc.",
      "Controlling Actuators",
      "Logic and Control",
      "Basic Project & Presentation",
    ],
    outcome: "By the end of this workshop, your child will understand the ESP32 microcontroller and be able to build simple circuits and programs using block-based coding.",
    gradeLabel: "Tingkatan 1 – 3 (Year 7–9)",
  },
};

const PHONE_CODES = [
  { group:"Southeast Asia", codes:[
    {v:"+60",l:"+60 MY"},{v:"+65",l:"+65 SG"},{v:"+62",l:"+62 ID"},
    {v:"+63",l:"+63 PH"},{v:"+66",l:"+66 TH"},{v:"+84",l:"+84 VN"},
    {v:"+95",l:"+95 MM"},{v:"+855",l:"+855 KH"},{v:"+856",l:"+856 LA"},
    {v:"+673",l:"+673 BN"},{v:"+670",l:"+670 TL"},
  ]},
  { group:"East Asia", codes:[
    {v:"+86",l:"+86 CN"},{v:"+81",l:"+81 JP"},{v:"+82",l:"+82 KR"},
    {v:"+886",l:"+886 TW"},{v:"+852",l:"+852 HK"},{v:"+853",l:"+853 MO"},{v:"+976",l:"+976 MN"},
  ]},
  { group:"South Asia", codes:[
    {v:"+91",l:"+91 IN"},{v:"+92",l:"+92 PK"},{v:"+880",l:"+880 BD"},
    {v:"+94",l:"+94 LK"},{v:"+977",l:"+977 NP"},{v:"+975",l:"+975 BT"},
    {v:"+960",l:"+960 MV"},{v:"+93",l:"+93 AF"},
  ]},
  { group:"Central Asia", codes:[
    {v:"+7",l:"+7 KZ"},{v:"+998",l:"+998 UZ"},{v:"+996",l:"+996 KG"},
    {v:"+992",l:"+992 TJ"},{v:"+993",l:"+993 TM"},
  ]},
  { group:"Middle East", codes:[
    {v:"+966",l:"+966 SA"},{v:"+971",l:"+971 AE"},{v:"+965",l:"+965 KW"},
    {v:"+974",l:"+974 QA"},{v:"+973",l:"+973 BH"},{v:"+968",l:"+968 OM"},
    {v:"+967",l:"+967 YE"},{v:"+964",l:"+964 IQ"},{v:"+98",l:"+98 IR"},
    {v:"+962",l:"+962 JO"},{v:"+961",l:"+961 LB"},{v:"+963",l:"+963 SY"},
    {v:"+972",l:"+972 IL"},{v:"+970",l:"+970 PS"},{v:"+90",l:"+90 TR"},
  ]},
  { group:"Africa / North Africa", codes:[
    {v:"+20",l:"+20 EG"},{v:"+212",l:"+212 MA"},{v:"+213",l:"+213 DZ"},
    {v:"+216",l:"+216 TN"},{v:"+218",l:"+218 LY"},{v:"+249",l:"+249 SD"},
    {v:"+234",l:"+234 NG"},{v:"+27",l:"+27 ZA"},{v:"+254",l:"+254 KE"},{v:"+233",l:"+233 GH"},
  ]},
  { group:"Europe", codes:[
    {v:"+44",l:"+44 GB"},{v:"+49",l:"+49 DE"},{v:"+33",l:"+33 FR"},
    {v:"+31",l:"+31 NL"},{v:"+39",l:"+39 IT"},{v:"+34",l:"+34 ES"},
    {v:"+351",l:"+351 PT"},{v:"+46",l:"+46 SE"},{v:"+47",l:"+47 NO"},
    {v:"+45",l:"+45 DK"},{v:"+358",l:"+358 FI"},{v:"+41",l:"+41 CH"},
    {v:"+32",l:"+32 BE"},{v:"+43",l:"+43 AT"},{v:"+48",l:"+48 PL"},{v:"+7",l:"+7 RU"},
  ]},
  { group:"Oceania", codes:[
    {v:"+61",l:"+61 AU"},{v:"+64",l:"+64 NZ"},
  ]},
  { group:"Americas", codes:[
    {v:"+1",l:"+1 US/CA"},{v:"+55",l:"+55 BR"},{v:"+52",l:"+52 MX"},
    {v:"+54",l:"+54 AR"},{v:"+57",l:"+57 CO"},{v:"+56",l:"+56 CL"},
  ]},
];

const phoneCodeOptions = PHONE_CODES.flatMap((g, gi) =>
  g.codes.map((c, i) => <option key={gi+"-"+i} value={c.v}>{c.l}</option>)
);

// ── helpers ──────────────────────────────────────────────────
function calcPricing(selected, isReturning, pairDiscounts=[], returningDiscounts=[]) {
  if (!selected.length) return { sub:0, disc:0, total:0, label:"", pct:0 };
  const sub = selected.reduce((s,w) => s + w.price, 0);
  let best = null;
  for (const r of pairDiscounts) {
    if (selected.some(w=>w.program===r.program&&w.type===r.basicType) &&
        selected.some(w=>w.program===r.program&&w.type===r.advancedType)) {
      if (!best || r.pct > best.pct) best = { ...r, src:"pair" };
    }
  }
  if (isReturning) {
    for (const r of returningDiscounts) {
      if (selected.some(w=>w.program===r.curProgram&&w.type===r.curType)) {
        if (!best || r.pct > best.pct) best = { ...r, src:"returning" };
      }
    }
  }
  const disc = best ? Math.round(sub * best.pct / 100 * 100) / 100 : 0;
  return { sub, disc, total: sub - disc, label: best?.label || "", pct: best?.pct || 0 };
}

function ageWarn(grade, age) {
  const g = GRADES.find(x=>x.v===grade);
  if (!g || !age) return null;
  const [mn,mx] = g.ageRange;
  if (age < mn || age > mx) return `Your child is ${age} in ${g.label} — if correct, please continue!`;
  return null;
}

function isEligible(w, grade) {
  if (!grade) return true;
  return grade >= w.minGrade && grade <= w.maxGrade;
}

function buildCalendarUrl(w) {
  const MONTHS = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
  const dp       = (w.date || "").match(/(\d+)(?:-(\d+))?\s+([A-Za-z]+)\s+(\d{4})/);
  const yr       = dp ? parseInt(dp[4]) : new Date().getFullYear();
  const mon      = dp ? (MONTHS[(dp[3]||"").toLowerCase().slice(0,3)] ?? 0) : 0;
  const startDay = dp ? parseInt(dp[1]) : 1;
  const endDay   = dp ? parseInt(dp[2] || dp[1]) : startDay;
  const startDate = new Date(yr, mon, startDay);
  const endDate   = new Date(yr, mon, endDay);
  const [startStr, endStr] = (w.time || "").replace(/[–—]/g, "-").split(" - ");
  function applyTime(base, timeStr) {
    const d = new Date(base);
    const m = (timeStr || "").match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return d;
    let h = parseInt(m[1]);
    const min = parseInt(m[2]);
    if (m[3].toUpperCase() === "PM" && h !== 12) h += 12;
    if (m[3].toUpperCase() === "AM" && h === 12) h = 0;
    d.setHours(h, min, 0, 0);
    return d;
  }
  function fmt(d) {
    return d.getFullYear() +
      String(d.getMonth()+1).padStart(2,"0") +
      String(d.getDate()).padStart(2,"0") + "T" +
      String(d.getHours()).padStart(2,"0") +
      String(d.getMinutes()).padStart(2,"0") + "00";
  }
  const start = applyTime(startDate, (startStr||"").trim());
  const end   = applyTime(endDate,   (endStr||"").trim());
  const params = new URLSearchParams({
    action:   "TEMPLATE",
    text:     `${w.name}: ${w.level} — RekaLogik Studio`,
    dates:    `${fmt(start)}/${fmt(end)}`,
    details:  `Workshop: ${w.name}: ${w.level}\nDate: ${w.date} (${w.day})\nTime: ${w.time}\nTotal Paid: RM ${w.price}\n\nOrganised by RekaLogik Studio`,
    location: w.venue || "RekaLogik Studio, Malaysia",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ── styles ───────────────────────────────────────────────────
const C = {
  blue:"#6B8EAE", blueDark:"#4A6F8A", blueLight:"#A8C5DA", bluePale:"#E8F1F8",
  cream:"#F0EBE5", white:"#FFFFFF", text:"#2C3E50", muted:"#7A8E9A",
  border:"#D4DDE6", success:"#27AE60", warn:"#E67E22", error:"#E74C3C",
  green:"#27AE60", greenLight:"#EAFAF1",
};

const inp = {
  width:"100%", padding:"10px 12px", border:`1.5px solid ${C.border}`,
  borderRadius:8, fontSize:15, color:C.text, background:C.white, outline:"none",
  boxSizing:"border-box",
};

export default function Register() {
  // ── Config from Google Sheets ──────────────────────────────
  const [appConfig, setAppConfig]         = useState(null);
  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => { document.title = "Registration Form"; return () => { document.title = "RekaLogik Studio"; }; }, []);

  useEffect(() => {
    fetch(APPS_SCRIPT_URL + "?t=" + Date.now())
      .then(r => r.json())
      .then(data => { setAppConfig(data); setConfigLoading(false); })
      .catch(() => setConfigLoading(false));
  }, []);

  const WORKSHOPS = appConfig?.workshops || [];
  const FOOD_OPTIONS = appConfig?.foodOptions || {};
  const PAIR_DISCOUNTS = appConfig?.pairDiscounts || [];
  const RETURNING_DISCOUNTS = appConfig?.returningDiscounts || [];
  const PAYMENT = appConfig?.settings ? {
    bank: appConfig.settings.bankName,
    name: appConfig.settings.accountName,
    acc:  appConfig.settings.accountNumber,
    ref1: appConfig.settings.ref1,
    ref2: appConfig.settings.ref2,
  } : { bank:"Bank Muamalat", name:"Nur Faezah Binti Mohd Aziz",
        acc:"13010083702729", ref1:"Participant Name", ref2:"Workshop Name" };

  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    email:"", parent:"", phone:"", phoneCode:"+60", participant:"", age:"", myKid:"",
    school:"", grade:"", emgName:"", emgPhone:"", emgPhoneCode:"+60",
    hearAbout:"", hearOther:"", stemRating:"3", coded:"", makecode:"", makecodeOther:"",
    hardware:[], hwOther:"", competition:"", compName:"", extra:"",
    workshopFood:{}, allergies:"", allergiesNote:"",
    specialNeeds:"", specialNeedsNote:"",
  });
  const [sel, setSel] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [receiptPrev, setReceiptPrev] = useState(null);
  const [err, setErr] = useState({});
  const [isRet, setIsRet] = useState(false);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [registeredDates, setRegisteredDates] = useState([]);
  const [checking, setChecking] = useState(false);
  const [waChecked, setWaChecked] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const submittedRef = useRef(false);
  const [bugOpen, setBugOpen] = useState(false);
  const [bugText, setBugText] = useState("");
  const [bugSending, setBugSending] = useState(false);
  const [bugSent, setBugSent] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.d)       setD(saved.d);
        if (saved.sel)     setSel(saved.sel);
        if (saved.step !== undefined && saved.step !== "done") setStep(saved.step);
        if (Array.isArray(saved.visited)) setVisited(new Set(saved.visited));
        if (saved.receiptPrev && saved.receiptMeta) {
          setReceiptPrev(saved.receiptPrev);
          setReceipt(saved.receiptMeta);
        }
      }
    } catch (_) {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (restored && d.myKid) checkMyKid(d.myKid);
  }, [restored]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!restored || !appConfig || !sel.length) return;
    setSel(prev =>
      prev
        .map(s => WORKSHOPS.find(w => w.id === s.id) || s)
        .filter(s => WORKSHOPS.some(w => w.id === s.id))
    );
  }, [restored, appConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!restored) return;
    if (step === "done") { localStorage.removeItem(DRAFT_KEY); return; }
    const payload = { d, sel, step, visited: [...visited] };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        ...payload,
        receiptPrev,
        receiptMeta: receipt ? { name: receipt.name, type: receipt.type, size: receipt.size } : null,
      }));
    } catch (_) {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(payload)); } catch (_2) {}
    }
  }, [restored, d, sel, step, visited, receipt, receiptPrev]);

  const pricing = calcPricing(sel, isRet, PAIR_DISCOUNTS, RETURNING_DISCOUNTS);
  const grade = parseInt(d.grade) || 0;
  const age = parseInt(d.age) || 0;
  const warn = ageWarn(grade, age);

  const upd = (e) => {
    const {name, value} = e.target;
    setD(p => ({...p, [name]:value}));
    setErr(p => ({...p, [name]:null}));
  };

  const toTitleCase = (str) =>
    str.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  const normalizeName = (name) =>
    setD(p => ({ ...p, [name]: toTitleCase(p[name] || "") }));

  const normalizeEmail = () =>
    setD(p => ({ ...p, email: (p.email || "").trim().toLowerCase() }));

  const checkMyKid = useCallback(async (val) => {
    const isPassport = /[a-zA-Z]/.test(val);
    const minLen = isPassport ? 6 : 12;
    if (!val || val.length < minLen) { setIsRet(false); setRegisteredWorkshops([]); return; }
    setChecking(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkMyKid", myKid: val }),
      });
      const json = await res.json();
      setIsRet(json.isReturning || false);
      setRegisteredWorkshops(json.registeredWorkshops || []);
      setRegisteredDates(json.registeredDates || []);
      if (json.registeredWorkshops && json.registeredWorkshops.length) {
        setSel(p => p.filter(w => !json.registeredWorkshops.includes(w.name + ": " + w.level)));
      }
    } catch {
      setIsRet(false);
      setRegisteredWorkshops([]);
    }
    setChecking(false);
  }, []);

  const isWorkshopDisabled = (w) => {
    if (!d.myKid.trim()) return "no-ic";
    if (!d.age || !d.grade) return "no-grade-age";
    if (w.status === "closed" || w.slots >= w.maxSlots) return "full";
    if (grade > 0 && !isEligible(w, grade)) return "ineligible";
    if (registeredWorkshops.includes(w.name + ": " + w.level)) return "registered";
    if (sel.some(x => x.id !== w.id && x.name === w.name && x.level === w.level)) return "conflict";
    if (w.type === "advanced" && w.program === "rekabit") {
      const doneBasic = registeredWorkshops.some(rw => rw.toLowerCase().includes("rekabit") && rw.toLowerCase().includes("basic"));
      const selectingBasic = sel.some(x => x.program === "rekabit" && x.type === "basic");
      if (!doneBasic && !selectingBasic) return "prerequisite";
    }
    return null;
  };

  const toggleWS = (w) => {
    if (isWorkshopDisabled(w)) return;
    setSel(p => p.some(x=>x.id===w.id) ? p.filter(x=>x.id!==w.id) : [...p,w]);
  };

  const MAX_FILE_MB = 3;
  const MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024;

  const handleReceipt = (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > MAX_FILE_SIZE) {
      setErr(p=>({...p, receipt:`File too large (${(f.size/1024/1024).toFixed(1)} MB). Maximum is ${MAX_FILE_MB} MB — please take a screenshot of the receipt instead, which is usually much smaller.`}));
      e.target.value = "";
      return;
    }
    setReceipt(f);
    const r = new FileReader();
    r.onload = ev => setReceiptPrev(ev.target.result);
    r.readAsDataURL(f);
    setErr(p=>({...p, receipt:null}));
  };

  const v1 = () => {
    const e = {};
    if (!d.email) e.email="Required";
    else if (!/\S+@\S+\.\S+/.test(d.email)) e.email="Invalid email";
    if (!d.parent.trim()) e.parent="Required";
    if (!d.phone.trim()) e.phone="Required";
    else if (!/^[0-9]{7,13}$/.test(d.phone.replace(/[\s-]/g,""))) e.phone="Invalid number (digits only)";
    if (!d.participant.trim()) e.participant="Required";
    if (!d.age) e.age="Required";
    else if (parseInt(d.age)<6||parseInt(d.age)>18) e.age="Enter age 6–18";
    if (!d.myKid.trim()) e.myKid="Required";
    if (!d.school.trim()) e.school="Required";
    if (!d.grade) e.grade="Required";
    if (!d.emgName.trim()) e.emgName="Required";
    if (!d.emgPhone.trim()) e.emgPhone="Required";
    else if (!/^[0-9]{7,13}$/.test(d.emgPhone.replace(/[\s-]/g,""))) e.emgPhone="Invalid number (digits only)";
    if (!d.specialNeeds) e.specialNeeds="Required";
    if (!sel.length) e.workshops="Please select at least one workshop";
    setErr(e); return !Object.keys(e).length;
  };

  const v2 = () => {
    const e = {};
    if (!receipt) e.receipt="Please upload your payment receipt";
    setErr(e); return !Object.keys(e).length;
  };

  const v3 = () => {
    const e = {};
    sel.forEach(w => {
      const opts = FOOD_OPTIONS[w.shortForm] || [];
      if (opts.length > 0 && (!d.workshopFood || !d.workshopFood[w.id])) e[`food_${w.id}`] = "Please select a meal";
    });
    if (!d.allergies) e.allergies="Required";
    if (!d.hearAbout) e.hearAbout="Required";
    if (!d.coded) e.coded="Required";
    if (!d.makecode) e.makecode="Required";
    if (!d.competition) e.competition="Required";
    setErr(e); return !Object.keys(e).length;
  };

  const check1 = () => !!(
    d.email && /\S+@\S+\.\S+/.test(d.email) &&
    d.parent.trim() && d.phone.trim() &&
    /^[0-9]{7,13}$/.test(d.phone.replace(/[\s-]/g,"")) &&
    d.participant.trim() && d.age &&
    parseInt(d.age)>=6 && parseInt(d.age)<=18 &&
    d.myKid.trim() && d.school.trim() && d.grade &&
    d.emgName.trim() && d.emgPhone.trim() &&
    /^[0-9]{7,13}$/.test(d.emgPhone.replace(/[\s-]/g,"")) &&
    d.specialNeeds &&
    sel.length > 0
  );
  const check2 = () => !!receipt;
  const check3 = () => !!(
    d.hearAbout && d.coded && d.makecode && d.competition &&
    d.allergies &&
    (sel.length === 0 || sel.every(w => {
      const opts = FOOD_OPTIONS[w.shortForm] || [];
      return opts.length === 0 || (d.workshopFood && d.workshopFood[w.id]);
    }))
  );

  const next = async () => {
    if (step===1) {
      setVisited(p => new Set([...p, 1]));
      const dupSel = sel.filter(w => registeredWorkshops.includes(w.name + ": " + w.level));
      if (dupSel.length > 0) {
        setErr(p => ({ ...p, workshops:`Already registered: ${dupSel.map(w=>w.name+": "+w.level).join(", ")}. Please deselect and choose a different workshop.` }));
        window.scrollTo(0, 0); return;
      }
      setStep(2); window.scrollTo(0,0);
    }
    else if (step===2) {
      setVisited(p => new Set([...p, 2]));
      setStep(3); window.scrollTo(0,0);
    }
    else if (step===3) {
      setVisited(p => new Set([...p, 1, 2, 3]));
      if (!v1()) { setStep(1); window.scrollTo(0,0); return; }
      if (!v2()) { setStep(2); window.scrollTo(0,0); return; }
      if (!v3()) { return; }
      const base64MB = ((receiptPrev?.length || 0) * 0.75) / 1024 / 1024;
      if (base64MB > 4) {
        setSubmitErr(`Your receipt file is too large to send (${base64MB.toFixed(1)} MB after encoding). Please take a screenshot of the receipt instead — screenshots are much smaller — then re-upload and try again.`);
        return;
      }
      setSubmitting(true); setSubmitErr("");
      try {
        const payload = {
          formData: { ...d, phone: d.phoneCode + d.phone.replace(/^0+/, ""), emgPhone: d.emgPhoneCode + d.emgPhone.replace(/^0+/, "") },
          workshops: sel.map(w=>({
            id:w.id, name:w.name, level:w.level,
            date:w.date, price:w.price, waLink:w.waLink, shortForm:w.shortForm
          })),
          pricing,
          receiptName: receipt?.name || "",
          receiptBase64: receiptPrev,
          isReturning: isRet,
          timestamp: new Date().toISOString()
        };
        const submitRes = await fetch("/api/submit", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
        const submitJson = await submitRes.json();
        if (submitJson.isDuplicate) {
          setSubmitErr(`This student is already registered for: ${submitJson.duplicates.join(", ")}`);
          setSubmitting(false);
          return;
        }
        if (submitJson.success === false || submitJson.error) {
          setSubmitErr(submitJson.error || "Submission failed. Please try again.");
          setSubmitting(false);
          return;
        }
        localStorage.removeItem(DRAFT_KEY);
        submittedRef.current = true;
        setStep("done"); window.scrollTo(0,0);
      } catch(ex) {
        setSubmitErr("Submission failed. Please try again or contact us directly.");
      }
      setSubmitting(false);
    }
  };
  const back = () => { setVisited(p => new Set([...p, step])); setStep(s=>s-1); window.scrollTo(0,0); };

  const resetForm = () => {
    if (!window.confirm("Reset the form? All your entries will be cleared.")) return;
    setD({ email:"", parent:"", phone:"", phoneCode:"+60", participant:"", age:"", myKid:"",
      school:"", grade:"", emgName:"", emgPhone:"", emgPhoneCode:"+60",
      hearAbout:"", hearOther:"", stemRating:"3", coded:"", makecode:"", makecodeOther:"",
      hardware:[], hwOther:"", competition:"", compName:"", extra:"",
      workshopFood:{}, allergies:"", allergiesNote:"",
      specialNeeds:"", specialNeedsNote:"",
    });
    setSel([]);
    setReceipt(null);
    setReceiptPrev(null);
    setErr({});
    setVisited(new Set());
    setIsRet(false);
    setRegisteredWorkshops([]);
    setSubmitErr("");
    localStorage.removeItem(DRAFT_KEY);
    setStep(1);
    window.scrollTo(0,0);
  };

  // ── layout ──────────────────────────────────────────────────
  const containerStyle = { fontFamily:"'Poppins',system-ui,sans-serif", color:C.text, backgroundImage:`url(${BG_TEXTURE})`, backgroundSize:"400px 400px", backgroundRepeat:"repeat", minHeight:"100vh", paddingBottom:40 };

  const header = (
    <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"16px 20px 12px", textAlign:"center", position:"sticky", top:0, zIndex:10 }}>
      <img src={LOGO_STEEL_BLUE} alt="Rekalogik Studio" onClick={()=>{
        if (submittedRef.current) {
          submittedRef.current = false;
          setD({ email:"", parent:"", phone:"", phoneCode:"+60", participant:"", age:"", myKid:"",
            school:"", grade:"", emgName:"", emgPhone:"", emgPhoneCode:"+60",
            hearAbout:"", hearOther:"", stemRating:"3", coded:"", makecode:"", makecodeOther:"",
            hardware:[], hwOther:"", competition:"", compName:"", extra:"",
            workshopFood:{}, allergies:"", allergiesNote:"", specialNeeds:"", specialNeedsNote:"",
          });
          setSel([]); setReceipt(null); setReceiptPrev(null); setErr({});
          setVisited(new Set()); setIsRet(false); setRegisteredWorkshops([]); setSubmitErr("");
          localStorage.removeItem(DRAFT_KEY);
          setStep(0); window.scrollTo(0,0);
        } else { setStep(0); window.scrollTo(0,0); }
      }} style={{ height:48, objectFit:"contain", display:"block", margin:"0 auto 8px", cursor:"pointer" }} />
      <h1 style={{ fontSize:16, fontWeight:600, color:C.blueDark, margin:0, letterSpacing:"0.02em" }}>Workshop Registration Form</h1>
      {step!=="done" && step!==0 && (
        <>
          <div style={{ display:"flex", gap:4, marginTop:12, justifyContent:"center" }}>
            {[1,2,3].map(n=>{
              const isValid = n===1 ? check1() : n===2 ? check2() : check3();
              const status = step===n ? "current" : visited.has(n) ? (isValid ? "done" : "error") : "pending";
              const circleBg = status==="current" ? C.blue : status==="done" ? C.success : status==="error" ? C.error : C.border;
              return (
                <div key={n} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <div onClick={()=>{ setVisited(p => new Set([...p, step])); setStep(n); window.scrollTo(0,0); }}
                    style={{ width:28, height:28, borderRadius:"50%", background:circleBg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, transition:"background 0.3s", cursor:"pointer" }}>
                    {status==="done" ? "✓" : status==="error" ? "!" : n}
                  </div>
                  <span onClick={()=>{ setVisited(p => new Set([...p, step])); setStep(n); window.scrollTo(0,0); }}
                    style={{ fontSize:11, color:status==="current"?C.blueDark:C.muted, fontWeight:status==="current"?600:400, cursor:"pointer" }}>
                    {n===1?"Participant":n===2?"Payment":"Background"}
                  </span>
                  {n<3 && <div style={{ width:20, height:2, background:status==="done"?C.success:C.border, borderRadius:1 }} />}
                </div>
              );
            })}
          </div>
          <button onClick={resetForm}
            style={{ marginTop:8, background:"none", border:"none", color:C.error, fontSize:11, cursor:"pointer", opacity:0.7, textDecoration:"underline" }}>
            Reset Form
          </button>
        </>
      )}
    </div>
  );

  const card = (children, extra={}) => (
    <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16, ...extra }}>
      {children}
    </div>
  );

  const field = (label, name, type="text", placeholder="", required=true, extra={}, onBlur=null) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>
        {label}{required&&<span style={{color:C.error}}> *</span>}
      </label>
      <input type={type} name={name} value={d[name]} onChange={upd} placeholder={placeholder}
        onBlur={onBlur} style={{ ...inp, borderColor: err[name]?C.error:C.border, ...extra }} />
      {err[name] && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err[name]}</p>}
    </div>
  );

  const radio = (label, name, options) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:6 }}>
        {label}<span style={{color:C.error}}> *</span>
      </label>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {options.map(o=>(
          <label key={o.v} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", border:`1.5px solid ${d[name]===o.v?C.blue:C.border}`, borderRadius:20, cursor:"pointer", fontSize:14, background:d[name]===o.v?C.bluePale:C.white, fontWeight:d[name]===o.v?600:400, transition:"all 0.15s" }}>
            <input type="radio" name={name} value={o.v} checked={d[name]===o.v} onChange={upd} style={{ display:"none" }} />
            {o.l}
          </label>
        ))}
      </div>
      {err[name] && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err[name]}</p>}
    </div>
  );

  const chk = (label, name, options) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:6 }}>{label}</label>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {options.map(o=>{
          const checked = d[name].includes(o.v);
          return (
            <label key={o.v} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", border:`1.5px solid ${checked?C.blue:C.border}`, borderRadius:20, cursor:"pointer", fontSize:14, background:checked?C.bluePale:C.white, fontWeight:checked?600:400, transition:"all 0.15s" }}>
              <input type="checkbox" checked={checked} onChange={()=>{ setD(p=>({ ...p, [name]: checked?p[name].filter(x=>x!==o.v):[...p[name],o.v] })); }} style={{ display:"none" }} />
              {o.l}
            </label>
          );
        })}
      </div>
    </div>
  );

  const sectionTitle = (t, sub) => (
    <div style={{ marginBottom:16 }}>
      <h2 style={{ fontSize:18, fontWeight:700, color:C.blueDark, margin:0 }}>{t}</h2>
      {sub && <p style={{ fontSize:13, color:C.muted, margin:"4px 0 0" }}>{sub}</p>}
    </div>
  );

  // ── SECTION 0 — Landing / Workshop Overview ──────────────────
  const sect0 = (() => {
    const types = [];
    const seen = new Set();
    for (const w of WORKSHOPS) {
      const key = `${w.program}-${w.type}`;
      if (!seen.has(key)) { seen.add(key); types.push(key); }
    }

    return (
      <div style={{ padding:"0 0 24px" }}>
        <div style={{ background:`linear-gradient(135deg, ${C.blueDark} 0%, #2C4A6A 100%)`, padding:"36px 20px 32px", textAlign:"center", color:"white" }}>
          <img src={LOGO_CREAM} alt="Rekalogik Studio" style={{ height:140, objectFit:"contain", display:"block", margin:"0 auto 8px" }} />
          <p style={{ fontSize:10, fontWeight:400, fontStyle:"italic", letterSpacing:"0.12em", textTransform:"uppercase", color:C.blueLight, margin:"0 0 20px" }}>Build Your Logic, Bit by Bit</p>
          <div style={{ fontSize:13, letterSpacing:"0.22em", textTransform:"uppercase", color:"white", marginBottom:1 }}>Innovation Workshop Series</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:"0.08em", color:"#f2ebdd", margin:"0 0 1px", lineHeight:1.1 }}>Registration Form</h2>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginBottom:20 }}>
            {["Build","Code","Create"].map((t,i)=>(
              <span key={t} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:600, color:"white" }}>{t}</span>
                {i<2 && <span style={{ color:C.blueLight, fontSize:14 }}>•</span>}
              </span>
            ))}
          </div>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.85)", margin:0, lineHeight:1.6 }}>
            <span style={{ fontWeight:700, display:"block", marginBottom:6 }}>Welcome to RekaLogik Studio! 👋</span>
            Looking for something fun and meaningful for your child during weekends or school holidays? Our hands-on workshops are designed for students who are interested in learning programming, from beginner to advanced level. Through robotics, coding, and creative innovation projects, students get to learn in a fun, interactive, and supportive environment.
          </p>
          <p style={{ fontSize:10, fontWeight:600, color:"#f2ebdd", margin:"12px 0 0" }}>
            No complicated theory, just Build, Code & Create! ✨
          </p>
        </div>

        <div style={{ textAlign:"center", margin:"32px 0 10px" }}>
          <button
            onClick={()=>{ setStep(1); window.scrollTo(0,0); }}
            style={{ display:"inline-block", padding:"14px 48px", background:`linear-gradient(135deg, ${C.blueDark} 0%, #2C4A6A 100%)`, color:C.cream, border:"none", borderRadius:999, fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.12em", cursor:"pointer", boxShadow:"0 4px 16px rgba(74,111,138,0.35)" }}>
            REGISTER
          </button>
        </div>

        <div style={{ padding:"20px 12px 0" }}>
          <h2 style={{ fontSize:24, fontWeight:800, color:C.blueDark, margin:"0 0 4px" }}>Our Workshops</h2>
          <p style={{ fontSize:13, color:C.muted, margin:"0 0 16px" }}>Choose the right level for your child:</p>

          {configLoading ? (
            <div style={{ textAlign:"center", padding:"32px 0", color:C.muted }}>
              <div style={{ fontSize:32, marginBottom:8 }}>⏳</div>
              <p style={{ fontSize:14, fontWeight:600 }}>Loading workshop details...</p>
              <p style={{ fontSize:12 }}>This usually takes a few seconds</p>
            </div>
          ) : types.length === 0 ? (
            <div style={{ textAlign:"center", padding:"24px", background:C.white, borderRadius:12, border:`1px solid ${C.border}`, color:C.muted }}>
              <p style={{ fontSize:14 }}>No workshops available at the moment.</p>
            </div>
          ) : (
            <>
              {types.map(key => {
                const [prog, type] = key.split("-");
                const content = WORKSHOP_CONTENT[key];
                const relatedWS = WORKSHOPS.filter(w => w.program===prog && w.type===type);
                const sample = relatedWS[0];
                if (!sample || !content) return null;

                const levelColor = type==="basic" ? "#1565C0" : type==="advanced" ? "#6A1B9A" : "#E65100";
                const levelBg    = type==="basic" ? "#E3F2FD" : type==="advanced" ? "#F3E5F5" : "#FFF3E0";

                return (
                  <div key={key} style={{ background:C.white, borderRadius:14, border:`1px solid ${C.border}`, marginBottom:16, overflow:"hidden" }}>
                    <div style={{ background:`linear-gradient(135deg, ${levelBg} 0%, white 100%)`, padding:"16px 18px 12px", borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontSize:24, marginBottom:4 }}>{content.emoji}</div>
                          <h3 style={{ fontSize:16, fontWeight:800, color:C.text, margin:"0 0 2px" }}>{sample.name}</h3>
                          <span style={{ display:"inline-block", background:levelBg, color:levelColor, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, border:`1px solid ${levelColor}33`, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                            {sample.level}
                          </span>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>from</div>
                          <div style={{ fontSize:22, fontWeight:900, color:C.blueDark }}>RM {Math.min(...relatedWS.map(w=>w.price))}</div>
                          <div style={{ fontSize:11, color:C.muted }}>{content.gradeLabel}</div>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:C.muted, margin:"8px 0 0", fontStyle:"italic" }}>{content.tagline}</p>
                    </div>
                    <div style={{ padding:"14px 18px 0" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>📚 Your child will learn:</div>
                      <ul style={{ margin:0, padding:"0 0 0 18px", display:"grid", gap:4 }}>
                        {content.learns.map(l => (
                          <li key={l} style={{ fontSize:13, color:C.text, lineHeight:1.5 }}>{l}</li>
                        ))}
                      </ul>
                      <div style={{ background:"#E8F5E9", border:"1px solid #A5D6A7", borderRadius:8, padding:"8px 12px", margin:"12px 0", fontSize:13, color:"#1B5E20" }}>
                        ✨ <strong>Outcome:</strong> {content.outcome}
                      </div>
                    </div>
                    <div style={{ padding:"0 18px 16px" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>📅 Available Dates:</div>
                      {relatedWS.map(w => {
                        const full = w.status==="closed" || w.slots >= w.maxSlots;
                        const left = w.maxSlots - w.slots;
                        return (
                          <div key={w.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", background:full?"#FAFAFA":C.bluePale, borderRadius:8, marginBottom:6, border:`1px solid ${full?C.border:C.blueLight}`, opacity:full?0.6:1 }}>
                            <div>
                              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{w.date} ({w.day})</div>
                              <div style={{ fontSize:12, color:C.muted }}>🕘 {w.time}</div>
                              {w.venue && <div style={{ fontSize:11, color:C.muted }}>📍 {w.venue}</div>}
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:14, fontWeight:700, color:C.blueDark }}>RM {w.price}</div>
                              {full
                                ? <span style={{ fontSize:11, background:"#FFEBEE", color:C.error, padding:"2px 8px", borderRadius:10, fontWeight:600 }}>FULL / CLOSED</span>
                                : left < 10 ? <span style={{ fontSize:11, color:left<=5?"#E65100":C.success, fontWeight:600 }}>{left<=5?`⚠️ ${left} slots left`:`${left} slots left`}</span> : null
                              }
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16 }}>
                <h3 style={{ fontSize:15, fontWeight:800, color:C.blueDark, margin:"0 0 12px" }}>🎁 What's Provided</h3>
                {[
                  ["🧰","Kit & Module (provided during workshop)"],
                  ["💻","Laptop"],
                  ["🍱","Refreshments & lunch"],
                  ["📜","Certificate of participation"],
                  ["🧩","Merchandise"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:20, width:28, textAlign:"center" }}>{icon}</span>
                    <span style={{ fontSize:14, color:C.text }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ background:"linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)", border:"1px solid #FFD54F", borderRadius:12, padding:"14px 16px", marginBottom:16, textAlign:"center" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#E65100", margin:"0 0 4px" }}>⚠️ Limited slots available</p>
                <p style={{ fontSize:13, color:"#795548", margin:0 }}>📌 First come, first served basis</p>
              </div>

              <button
                onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
                style={{ width:"100%", padding:"13px", background:C.white, color:C.blue, border:`2px solid ${C.blue}`, borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginTop:8 }}>
                ↑ Back to Top
              </button>
            </>
          )}
        </div>
      </div>
    );
  })();

  // ── SECTION 1 ──────────────────────────────────────────────
  const sect1 = (
    <div style={{ padding:"16px 16px 0" }}>
      <button
        onClick={()=>{ setStep(0); window.scrollTo(0,0); }}
        style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", color:C.blue, fontSize:13, fontWeight:600, cursor:"pointer", padding:"8px 0 4px", marginBottom:4 }}>
        ← Back to Overview
      </button>

      {sectionTitle("Participant Info", "Please fill in all required fields.")}

      {card(<>
        {field("Parent / Guardian Full Name","parent","text","e.g. Siti binti Abdullah", true, {}, ()=>normalizeName("parent"))}
        {field("Email Address","email","email","parent@email.com", true, {}, normalizeEmail)}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>
            Contact Phone Number <span style={{color:C.error}}>*</span>
          </label>
          <div style={{ display:"flex", gap:8 }}>
            <select name="phoneCode" value={d.phoneCode} onChange={upd}
              style={{ ...inp, width:"90px", flexShrink:0, padding:"10px 4px", fontSize:12, overflowY:"auto" }}>
              {phoneCodeOptions}
            </select>
            <div style={{ flex:1 }}>
              <input type="tel" name="phone" value={d.phone} onChange={upd}
                placeholder="e.g. 123456789"
                style={{ ...inp, borderColor:err.phone?C.error:C.border }} />
              {err.phone && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.phone}</p>}
            </div>
          </div>
        </div>
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Participant Details</h3>
        {field("Participant Full Name","participant","text","As in MyKid / Passport", true, {}, ()=>normalizeName("participant"))}
        <p style={{ fontSize:8, color:C.muted, marginTop:-10, marginBottom:14, lineHeight:1.5 }}>
          Name must match exactly as written on the student's <strong>MyKid / IC / Passport</strong> because it will be used for the certificate.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>Age <span style={{color:C.error}}>*</span></label>
            <input type="number" name="age" value={d.age} onChange={upd} min={6} max={18} placeholder="e.g. 10"
              style={{ ...inp, borderColor:err.age?C.error:C.border }} />
            {err.age && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.age}</p>}
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>School Grade <span style={{color:C.error}}>*</span></label>
            <select name="grade" value={d.grade} onChange={upd} style={{ ...inp, borderColor:err.grade?C.error:C.border }}>
              <option value="">— Select —</option>
              {GRADES.map(g=><option key={g.v} value={g.v}>{g.label}</option>)}
            </select>
            {err.grade && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.grade}</p>}
          </div>
        </div>
        {warn && (
          <div style={{ background:"#FFF8E1", border:"1px solid #FFD54F", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#795548", marginBottom:14 }}>
            ⚠️ {warn}
          </div>
        )}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>
            MyKid / Passport Number <span style={{color:C.error}}>*</span>
            <span style={{ fontSize:11, fontWeight:400, color:C.muted }}> (for certificate)</span>
          </label>
          <div style={{ position:"relative" }}>
            <input type="text" name="myKid" value={d.myKid} onChange={e=>{ upd(e); checkMyKid(e.target.value); }}
              placeholder="e.g. 031234045678" style={{ ...inp, borderColor:err.myKid?C.error:C.border, paddingRight:checking?40:12 }} />
            {checking && <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:C.muted }}>⏳</span>}
          </div>
          {err.myKid && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.myKid}</p>}
          {isRet && !checking && registeredWorkshops.length === 0 && (
            <div style={{ background:C.greenLight, border:`1px solid ${C.green}`, borderRadius:8, padding:"6px 10px", fontSize:12, color:"#155724", marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
              🎉 Returning participant found! Eligible for discount.
            </div>
          )}
        </div>
        {field("School Name","school","text","e.g. SK Taman Melawati", true, {}, ()=>normalizeName("school"))}
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Emergency Contact</h3>
        {field("Emergency Contact Name","emgName","text","Other than parent/guardian", true, {}, ()=>normalizeName("emgName"))}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:4 }}>
            Emergency Contact Phone <span style={{color:C.error}}>*</span>
          </label>
          <div style={{ display:"flex", gap:8 }}>
            <select name="emgPhoneCode" value={d.emgPhoneCode} onChange={upd}
              style={{ ...inp, width:"90px", flexShrink:0, padding:"10px 4px", fontSize:12, overflowY:"auto" }}>
              {phoneCodeOptions}
            </select>
            <div style={{ flex:1 }}>
              <input type="tel" name="emgPhone" value={d.emgPhone} onChange={upd}
                placeholder="e.g. 123456789"
                style={{ ...inp, borderColor:err.emgPhone?C.error:C.border }} />
              {err.emgPhone && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.emgPhone}</p>}
            </div>
          </div>
        </div>
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>🏥 Special Needs / Medical</h3>
        <p style={{ fontSize:12, color:C.muted, margin:"0 0 10px" }}>Does your child have any special needs or medical conditions we should be aware of?</p>
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          {["No","Yes"].map(v=>(
            <label key={v} style={{ flex:1, textAlign:"center", padding:"8px",
              border:`1.5px solid ${d.specialNeeds===v?C.blue:C.border}`, borderRadius:8,
              cursor:"pointer", fontWeight:d.specialNeeds===v?700:400,
              background:d.specialNeeds===v?C.bluePale:C.white, fontSize:14, transition:"all 0.15s" }}>
              <input type="radio" name="specialNeeds" value={v} checked={d.specialNeeds===v} onChange={upd} style={{display:"none"}} />
              {v}
            </label>
          ))}
        </div>
        {d.specialNeeds==="Yes" && (
          <textarea name="specialNeedsNote" value={d.specialNeedsNote} onChange={upd} rows={3}
            placeholder="Please describe (e.g. ADHD, autism, mobility issues, requires medication...)"
            style={{ ...inp, resize:"vertical" }} />
        )}
        {err.specialNeeds && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.specialNeeds}</p>}
        <div style={{ background:"#FFF3E0", border:"1px solid #FFCC80", borderRadius:8, padding:"8px 12px", fontSize:12, color:"#E65100", marginTop:8 }}>
          📱 For special needs enquiries, please contact <strong>Ms Asyiqin</strong> via WhatsApp: <a href="https://wa.me/601164355028" target="_blank" rel="noopener noreferrer" style={{color:"#E65100"}}><strong>+601164355028</strong></a>
        </div>
      </>)}

      <div style={{ marginBottom:16 }}>
        <h2 style={{ fontSize:18, fontWeight:700, color:C.blueDark, margin:"8px 0 4px" }}>Select Workshop(s)</h2>
        <p style={{ fontSize:13, color:C.muted, margin:"0 0 12px" }}>
          {grade ? "Showing eligible workshops for selected grade." : "Select a grade above to see eligible workshops."}
        </p>
        {err.workshops && <p style={{ color:C.error, fontSize:13, marginBottom:8 }}>⚠️ {err.workshops}</p>}
        {WORKSHOPS.map(w => {
          const isSel     = sel.some(x=>x.id===w.id);
          const disReason = isWorkshopDisabled(w);
          const disabled  = !!disReason;
          const remaining = w.maxSlots - w.slots;

          const badge = disReason === "no-ic"        ? { text:"Enter IC / Passport First",  bg:"#FFF8E1", col:"#F57F17"} :
                        disReason === "no-grade-age" ? { text:"Enter Age & Grade First",    bg:"#FFF8E1", col:"#F57F17"} :
                        disReason === "full"         ? { text:"FULL / CLOSED",              bg:"#FFEBEE", col:C.error } :
                        disReason === "ineligible"   ? { text:"Grade Ineligible",           bg:"#FFF3E0", col:C.warn  } :
                        disReason === "registered"   ? { text:"Already Joined/Registered",  bg:"#F3E5F5", col:"#7B1FA2"} :
                        disReason === "conflict"     ? { text:"Already selected",           bg:"#E8F5E9", col:"#2E7D32"} :
                        disReason === "prerequisite" ? { text:"Choose Basic First",         bg:"#FFF3E0", col:"#E65100"} :
                        null;

          return (
            <div key={w.id} onClick={()=>toggleWS(w)} style={{
              background: isSel?C.bluePale : disabled?"#F5F5F5":C.white,
              border: `2px solid ${isSel?C.blue:C.border}`,
              borderRadius:12, padding:"14px 16px", marginBottom:10,
              cursor: disabled?"not-allowed":"pointer", opacity:disabled?0.55:1,
              transition:"all 0.15s", userSelect:"none",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.blue, marginBottom:2 }}>{w.name}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:C.text }}>{w.level}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>📅 {w.date} ({w.day})</div>
                  <div style={{ fontSize:13, color:C.muted }}>🕘 {w.time}</div>
                </div>
                <div style={{ textAlign:"right", minWidth:90 }}>
                  <div style={{ fontSize:18, fontWeight:700, color:C.blueDark }}>RM {w.price}</div>
                  {badge ? (
                    <span style={{ fontSize:11, background:badge.bg, color:badge.col, padding:"2px 7px", borderRadius:10, fontWeight:600, display:"inline-block", marginTop:4 }}>{badge.text}</span>
                  ) : remaining < 10 ? (
                    <span style={{ fontSize:12, color:remaining<=5?"#E65100":C.muted, display:"block", marginTop:4 }}>
                      {remaining<=5 ? `⚠️ ${remaining} left` : `${remaining} slots left`}
                    </span>
                  ) : null}
                  {isSel && <div style={{ fontSize:20, color:C.blue, fontWeight:700, marginTop:4 }}>✓</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {registeredWorkshops.length > 0 && !checking && (
        <div style={{ background:"#E8F5E9", border:`1px solid ${C.success}`, borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#1B5E20", marginBottom:4 }}>✅ Already Registered</div>
          <div style={{ fontSize:12, color:"#2E7D32", marginBottom:4 }}>This student is already registered for:</div>
          {registeredWorkshops.map((rw, i) => (
            <div key={rw} style={{ fontSize:12, color:"#2E7D32", fontWeight:600 }}>
              • {rw}
              {registeredDates[i] && (
                <span style={{ fontWeight:400, color:"#4CAF50", marginLeft:6 }}>
                  on 📅 {registeredDates[i]}
                </span>
              )}
            </div>
          ))}
          <div style={{ fontSize:12, color:"#2E7D32", marginTop:6, fontStyle:"italic" }}>These workshops are disabled in the selection above.</div>
        </div>
      )}

      {sel.length>0 && (
        <div style={{ background:"linear-gradient(135deg, #E3EFF7 0%, #f8f9f9 100%)", border:`2px solid ${C.blueLight}`, borderRadius:14, padding:"16px 18px", marginBottom:16 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:C.blueDark, margin:"0 0 10px" }}>💰 Price Summary</h3>
          {sel.map(w=>(
            <div key={w.id} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:4, color:C.text }}>
              <span>{w.name}: {w.level}<br/><span style={{fontSize:12,color:C.muted}}>{w.date}</span></span>
              <span style={{ fontWeight:600 }}>RM {w.price}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${C.blueLight}`, marginTop:8, paddingTop:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:4 }}>
              <span>Subtotal</span><span>RM {pricing.sub}</span>
            </div>
            {pricing.disc>0 && (
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:4, color:C.success }}>
                <span>✅ {pricing.label} ({pricing.pct}%)</span><span>- RM {pricing.disc.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:800, color:C.blueDark, marginTop:6, borderTop:`1.5px solid ${C.blue}`, paddingTop:8 }}>
              <span>Total to Pay</span><span>RM {pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <button onClick={next} style={{ width:"100%", padding:"14px", background:C.blue, color:"white", border:"none", borderRadius:10, fontSize:16, fontWeight:700, cursor:"pointer", marginBottom:8 }}>
        Continue to Payment →
      </button>
    </div>
  );

  // ── SECTION 2 ──────────────────────────────────────────────
  const sect2 = (
    <div style={{ padding:"16px 16px 0" }}>
      {sectionTitle("Payment", "Please transfer the exact amount and upload your receipt.")}

      <div style={{ background:C.blueDark, borderRadius:14, padding:"16px 18px", marginBottom:16 }}>
        <div style={{ textAlign:"center", paddingBottom:12 }}>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:13, margin:"0 0 4px" }}>Amount to Pay</p>
          <p style={{ color:"white", fontSize:32, fontWeight:900, margin:"0 0 4px" }}>RM {pricing.total.toFixed(2)}</p>
          {pricing.disc>0 && <p style={{ color:C.blueLight, fontSize:13, margin:0 }}>Includes {pricing.pct}% {pricing.label}</p>}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.2)", paddingTop:8 }}>
          {sel.map(w=>(
            <div key={w.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ flex:1, minWidth:0, textAlign:"left" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.95)", lineHeight:1.3 }}>{w.name}: {w.level}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", marginTop:2 }}>{w.date}</div>
              </div>
              <div style={{ flexShrink:0, fontSize:14, fontWeight:700, color:"white", paddingTop:1 }}>RM {w.price}</div>
            </div>
          ))}
        </div>
      </div>

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Bank Transfer Details</h3>
        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"6px 16px", fontSize:14 }}>
          {[["Bank",PAYMENT.bank],["Account Name",PAYMENT.name],["Account No",PAYMENT.acc],["Reference 1",`${PAYMENT.ref1} (e.g. ${d.participant||"Participant Name"})`],["Reference 2",`${PAYMENT.ref2} (e.g. ${sel[0]?`${sel[0].name}: ${sel[0].level}`:"Workshop Name"})`]].map(([l,v])=>(
            <>
              <span style={{ color:C.muted, fontWeight:600, whiteSpace:"nowrap" }}>{l}</span>
              <span style={{ fontWeight:l==="Account No"?700:400, color:l==="Account No"?C.blueDark:C.text, fontFamily:l==="Account No"?"monospace":"inherit", letterSpacing:l==="Account No"?"0.05em":"inherit" }}>{v}</span>
            </>
          ))}
        </div>
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:"0.05em" }}>DuitNow QR (Scan to Pay)</h3>
        <div style={{ textAlign:"center" }}>
          <img src={QR_SRC} alt="DuitNow QR Code" style={{ maxWidth:240, width:"100%", borderRadius:8, border:`1px solid ${C.border}` }} />
          <div style={{ marginTop:10 }}>
            <a href={QR_SRC} download="RekalogikStudio-DuitNow-QR.png"
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 20px", background:C.blue, color:"white", borderRadius:20, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              ⬇ Save QR Code
            </a>
          </div>
        </div>
        <p style={{ fontSize:12, color:C.muted, textAlign:"center", marginTop:8 }}>Scan with any banking app • Malaysia National QR</p>
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 8px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Upload Payment Receipt <span style={{color:C.error}}>*</span></h3>
        <p style={{ fontSize:13, color:C.muted, margin:"0 0 12px" }}>Please ensure the receipt clearly shows the amount, date, and reference.</p>
        <label style={{ display:"block", border:`2px dashed ${err.receipt?C.error:C.border}`, borderRadius:10, padding:24, textAlign:"center", cursor:"pointer", background:receiptPrev?"#F8F9FA":C.white, transition:"border 0.15s" }}>
          <input type="file" accept="image/*,application/pdf" onChange={handleReceipt} style={{ display:"none" }} />
          {receiptPrev ? (
            <>
              {receipt?.type?.startsWith("image") ? (
                <img src={receiptPrev} alt="Receipt" style={{ maxHeight:160, borderRadius:6, marginBottom:8 }} />
              ) : (
                <div style={{ fontSize:48 }}>📄</div>
              )}
              <div style={{ fontSize:13, color:C.success, fontWeight:600 }}>✅ {receipt.name}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>
                {(receipt.size / 1024 / 1024).toFixed(2)} MB · Tap to change
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize:40 }}>📎</div>
              <div style={{ fontSize:14, fontWeight:600, color:C.blue, marginTop:8 }}>Tap to upload receipt</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>Photo or PDF • Max 3MB • Use screenshot if file is too large</div>
            </>
          )}
        </label>
        {err.receipt && <p style={{ color:C.error, fontSize:12, margin:"6px 0 0" }}>{err.receipt}</p>}
      </>)}

      <div style={{ display:"flex", gap:10, marginBottom:8 }}>
        <button onClick={back} style={{ flex:1, padding:"13px", background:C.white, color:C.blue, border:`2px solid ${C.blue}`, borderRadius:10, fontSize:15, fontWeight:700, cursor:"pointer" }}>← Back</button>
        <button onClick={next} style={{ flex:2, padding:"13px", background:C.blue, color:"white", border:"none", borderRadius:10, fontSize:15, fontWeight:700, cursor:"pointer" }}>Continue →</button>
      </div>
    </div>
  );

  // ── SECTION 3 ──────────────────────────────────────────────
  const sect3 = (
    <div style={{ padding:"16px 16px 0" }}>
      {sectionTitle("Meal & Background", "Choose your meal and share your child's experience with us.")}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>🍽️ Meal Selection</h3>
        <p style={{ fontSize:12, color:C.muted, margin:"0 0 14px" }}>Please choose a meal for each registered workshop.</p>
        {sel.length === 0 ? (
          <p style={{ fontSize:13, color:C.muted, fontStyle:"italic" }}>No workshops selected yet — go back to Step 1 to select a workshop.</p>
        ) : sel.map(w => {
          const currentFood = d.workshopFood?.[w.id] || "";
          return (
            <div key={w.id} style={{ marginBottom:18 }}>
              <div style={{ background:C.bluePale, border:`1px solid ${C.blueLight}`, borderRadius:8, padding:"8px 12px", marginBottom:8 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.blueDark }}>{w.name}: {w.level}</div>
                <div style={{ fontSize:11, color:C.muted }}>📅 {w.date}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {(FOOD_OPTIONS[w.shortForm] || []).length === 0 ? (
                  <p style={{ fontSize:13, color:C.muted, fontStyle:"italic" }}>No meal options configured for this workshop.</p>
                ) : null}
                {(FOOD_OPTIONS[w.shortForm] || []).map(opt => {
                  const selected = currentFood === opt.name;
                  return (
                    <label key={opt.name} style={{
                      display:"flex", alignItems:"center", gap:12, padding:"9px 12px",
                      border:`1.5px solid ${selected?C.blue:C.border}`, borderRadius:10,
                      cursor:"pointer", background:selected?C.bluePale:C.white, transition:"all 0.15s",
                    }}>
                      <input type="radio" name={`food_${w.id}`} value={opt.name} checked={selected}
                        onChange={()=>setD(p=>({...p, workshopFood:{...p.workshopFood, [w.id]:opt.name}}))}
                        style={{display:"none"}} />
                      <div style={{
                        width:16, height:16, borderRadius:"50%", flexShrink:0,
                        border:`2px solid ${selected?C.blue:C.border}`,
                        background:selected?C.blue:"transparent",
                        display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s",
                      }}>
                        {selected && <div style={{ width:6, height:6, borderRadius:"50%", background:"white" }} />}
                      </div>
                      <span style={{ display:"flex", flexDirection:"column" }}>
                        <span style={{ fontSize:14, fontWeight:selected?600:400, lineHeight:1.4, color:C.text }}>{opt.name}</span>
                        {opt.nameMalay ? <span style={{ fontSize:11, color:C.muted, lineHeight:1.2 }}>{opt.nameMalay}</span> : null}
                      </span>
                    </label>
                  );
                })}
              </div>
              {err[`food_${w.id}`] && <p style={{ color:C.error, fontSize:12, margin:"4px 0 0" }}>{err[`food_${w.id}`]}</p>}
            </div>
          );
        })}
      </>)}

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blue, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>🥜 Food Allergies</h3>
        <p style={{ fontSize:12, color:C.muted, margin:"0 0 10px" }}>Does your child have any food allergies or dietary restrictions?</p>
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          {["No","Yes"].map(v=>(
            <label key={v} style={{ flex:1, textAlign:"center", padding:"8px",
              border:`1.5px solid ${d.allergies===v?C.blue:C.border}`, borderRadius:8,
              cursor:"pointer", fontWeight:d.allergies===v?700:400,
              background:d.allergies===v?C.bluePale:C.white, fontSize:14, transition:"all 0.15s" }}>
              <input type="radio" name="allergies" value={v} checked={d.allergies===v} onChange={upd} style={{display:"none"}} />
              {v}
            </label>
          ))}
        </div>
        {d.allergies==="Yes" && (
          <textarea name="allergiesNote" value={d.allergiesNote} onChange={upd} rows={3}
            placeholder="Please describe (e.g. nut allergy, lactose intolerant, no shellfish, etc.)"
            style={{ ...inp, resize:"vertical" }} />
        )}
        {err.allergies && <p style={{ color:C.error, fontSize:12, margin:"3px 0 0" }}>{err.allergies}</p>}
      </>)}

      <div style={{ background:"#E8F5E9", border:"1px solid #A5D6A7", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:13, color:"#1B5E20" }}>
        🙏 Thank you for registering! Please take a moment to share your child's experience with STEM, coding, and innovation.
      </div>

      {card(<>
        {radio("How did you hear about this workshop?","hearAbout",[
          {v:"friend",l:"Friend / Family"},
          {v:"teacher",l:"Teacher"},
          {v:"ad",l:"Online Ad"},
          {v:"social",l:"Social Media"},
          {v:"other",l:"Other"},
        ])}
        {d.hearAbout==="other" && (
          <input name="hearOther" value={d.hearOther} onChange={upd} placeholder="Please specify..." style={{ ...inp, marginTop:8 }} />
        )}
      </>)}

      {card(<>
        <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:10 }}>
          Rate your child's interest in STEM subjects: <strong>{d.stemRating}/5</strong>
        </label>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:12, color:C.muted }}>Very Low</span>
          <input type="range" min={1} max={5} step={1} name="stemRating" value={d.stemRating} onChange={upd}
            style={{ flex:1, accentColor:C.blue }} />
          <span style={{ fontSize:12, color:C.muted }}>Very High</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
          {[1,2,3,4,5].map(n=>(
            <span key={n} style={{ fontSize:13, width:20, textAlign:"center", fontWeight:d.stemRating==n?700:400, color:d.stemRating==n?C.blue:C.muted }}>
              {["😕","😐","🙂","😊","🤩"][n-1]}
            </span>
          ))}
        </div>
      </>)}

      {card(<>
        {radio("Has your child done any coding before?","coded",[{v:"yes",l:"Yes"},{v:"no",l:"No"}])}
        {radio("Have they used MakeCode or block-based coding?","makecode",[{v:"yes",l:"Yes"},{v:"no",l:"No"},{v:"other",l:"Other"}])}
        {d.makecode==="other" && (
          <input name="makecodeOther" value={d.makecodeOther} onChange={upd} placeholder="Please specify..." style={{ ...inp, marginTop:4, marginBottom:10 }} />
        )}
      </>)}

      {card(<>
        {chk("Any hardware controller experience?","hardware",[
          {v:"none",l:"None"},{v:"arduino",l:"Arduino"},{v:"microbit",l:"micro:bit"},
          {v:"mindstorms",l:"Mindstorms"},{v:"esp32",l:"ESP32"},
        ])}
        <input name="hwOther" value={d.hwOther} onChange={upd} placeholder="Other hardware (optional)" style={{ ...inp, marginTop:4 }} />
      </>)}

      {card(<>
        {radio("Has your child joined a robotics / STEM competition?","competition",[{v:"yes",l:"Yes"},{v:"no",l:"No"}])}
        {d.competition==="yes" && (
          <input name="compName" value={d.compName} onChange={upd} placeholder="Competition name(s)" style={{ ...inp, marginTop:8 }} />
        )}
      </>)}

      {card(<>
        <label style={{ fontSize:13, fontWeight:600, color:C.blueDark, display:"block", marginBottom:6 }}>
          Anything else you'd like us to know? (optional)
        </label>
        <textarea name="extra" value={d.extra} onChange={upd} rows={3} placeholder="Special requests, concerns, or anything helpful for our team..."
          style={{ ...inp, resize:"vertical" }} />
      </>)}

      {submitErr && (
        <div style={{ background:"#FFEBEE", border:`1px solid ${C.error}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.error, marginBottom:12 }}>
          ❌ {submitErr}
        </div>
      )}

      <div style={{ display:"flex", gap:10, marginBottom:8 }}>
        <button onClick={back} style={{ flex:1, padding:"13px", background:C.white, color:C.blue, border:`2px solid ${C.blue}`, borderRadius:10, fontSize:15, fontWeight:700, cursor:"pointer" }}>← Back</button>
        <button onClick={next} disabled={submitting} style={{ flex:2, padding:"13px", background:submitting?"#9AA8B5":C.blue, color:"white", border:"none", borderRadius:10, fontSize:15, fontWeight:700, cursor:submitting?"not-allowed":"pointer" }}>
          {submitting ? "Submitting..." : "Submit Registration ✓"}
        </button>
      </div>
    </div>
  );

  // ── CONFIRMATION ────────────────────────────────────────────
  const conf = (
    <div style={{ padding:"24px 16px" }}>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:64, marginBottom:8 }}>🎉</div>
        <h2 style={{ fontSize:22, fontWeight:800, color:C.success, margin:"0 0 6px" }}>Registration Received!</h2>
        <p style={{ fontSize:15, color:C.muted, margin:0 }}>Thank you, <strong>{d.parent}</strong>!</p>
      </div>

      {card(<>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blueDark, margin:"0 0 10px" }}>📋 Registration Summary</h3>
        <div style={{ fontSize:14, display:"grid", gridTemplateColumns:"auto 1fr", gap:"5px 12px" }}>
          <span style={{color:C.muted}}>Participant</span><span style={{fontWeight:600}}>{d.participant}</span>
          <span style={{color:C.muted}}>Contact</span><span>{d.phone}</span>
          <span style={{color:C.muted}}>Total Paid</span><span style={{fontWeight:700,color:C.success}}>RM {pricing.total.toFixed(2)}</span>
        </div>
        <div style={{ marginTop:12, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
          {sel.map(w=>(
            <div key={w.id} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:4 }}>
              <span style={{color:C.text}}>{w.name}: {w.level}<br/><span style={{fontSize:12,color:C.muted}}>{w.date}</span></span>
              <span style={{fontWeight:600}}>RM {w.price}</span>
            </div>
          ))}
        </div>
      </>)}

      <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.blueDark, margin:"0 0 10px" }}>📅 Save to Google Calendar</h3>
        {sel.map(w => (
          <a key={w.id} href={buildCalendarUrl(w)} target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"#E8F0FE", border:"1.5px solid #AECBFA", borderRadius:10, textDecoration:"none", color:"#1A73E8", fontWeight:600, fontSize:13, marginBottom:8 }}>
            <span style={{ fontSize:20 }}>🗓️</span>
            <div style={{ flex:1 }}>
              <div>{w.name}: {w.level}</div>
              <div style={{ fontSize:12, fontWeight:400, color:"#5F6368", marginTop:2 }}>{w.date} · {w.time}</div>
            </div>
            <span style={{ fontSize:13, fontWeight:700 }}>+ Add</span>
          </a>
        ))}
      </div>

      <div style={{ background:C.white, borderRadius:12, border:`2px solid ${C.success}`, padding:"16px 18px", marginBottom:16 }}>
        <h3 style={{ fontSize:16, fontWeight:700, color:C.success, margin:"0 0 6px" }}>📱 Join Your WhatsApp Groups</h3>
        <p style={{ fontSize:13, color:C.muted, margin:"0 0 14px" }}>Please join ALL groups below. Tap each one now while you're here!</p>
        {sel.map(w=>{
          const done = waChecked[w.id];
          return (
            <div key={w.id} style={{ marginBottom:10 }}>
              <a href={w.waLink} target="_blank" rel="noreferrer"
                style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:done?"#E8F5E9":C.greenLight, border:`2px solid ${done?C.success:"#A5D6A7"}`, borderRadius:10, textDecoration:"none", color:done?"#155724":C.success, fontWeight:700, fontSize:14 }}>
                <span style={{ fontSize:22 }}>💬</span>
                <div style={{ flex:1 }}>
                  <div>{w.name}: {w.level}</div>
                  <div style={{ fontSize:12, fontWeight:400, opacity:0.8 }}>{w.date} · Tap to join</div>
                </div>
                <span style={{ fontSize:18 }}>{done?"✅":"→"}</span>
              </a>
              <label style={{ display:"flex", alignItems:"center", gap:8, marginTop:6, cursor:"pointer", fontSize:13, color:C.muted }}>
                <input type="checkbox" checked={!!done} onChange={()=>setWaChecked(p=>({...p,[w.id]:!p[w.id]}))} />
                I've joined this group ✓
              </label>
            </div>
          );
        })}
        {sel.length>0 && Object.keys(waChecked).filter(k=>waChecked[k]).length===sel.length && (
          <div style={{ background:"#E8F5E9", border:`1px solid ${C.success}`, borderRadius:8, padding:"8px 12px", fontSize:13, color:"#155724", fontWeight:600, textAlign:"center", marginTop:8 }}>
            🎊 All groups joined! See you at the workshop!
          </div>
        )}
      </div>

      <div style={{ background:"#FFF8E1", border:"1px solid #FFD54F", borderRadius:10, padding:"12px 14px", fontSize:13, color:"#5D4037", textAlign:"center", marginBottom:16 }}>
        📸 <strong>Screenshot this page!</strong> Your WhatsApp links are here.
      </div>

      <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"12px 14px", fontSize:13, color:C.muted }}>
        <strong style={{color:C.text}}>Questions?</strong><br/>
        Contact Ms Asyiqin via WhatsApp: <a href="https://wa.me/601164355028" style={{color:C.blue,fontWeight:600}}>+601164355028</a>
      </div>

      <button onClick={()=>{
        setD({ email:"", parent:"", phone:"", phoneCode:"+60", participant:"", age:"", myKid:"",
          school:"", grade:"", emgName:"", emgPhone:"", emgPhoneCode:"+60",
          hearAbout:"", hearOther:"", stemRating:"3", coded:"", makecode:"", makecodeOther:"",
          hardware:[], hwOther:"", competition:"", compName:"", extra:"",
          workshopFood:{}, allergies:"", allergiesNote:"", specialNeeds:"", specialNeedsNote:"",
        });
        setSel([]); setReceipt(null); setReceiptPrev(null); setErr({});
        setVisited(new Set()); setIsRet(false); setRegisteredWorkshops([]); setSubmitErr("");
        localStorage.removeItem(DRAFT_KEY);
        setStep(1); window.scrollTo(0,0);
      }} style={{ width:"100%", marginTop:16, padding:"14px", background:`linear-gradient(135deg, ${C.blueDark} 0%, #2C4A6A 100%)`, color:"white", border:"none", borderRadius:10, fontSize:16, fontWeight:700, cursor:"pointer" }}>
        + Register Another Participant
      </button>
    </div>
  );

  const sendBugReport = async () => {
    if (!bugText.trim()) return;
    setBugSending(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"reportBug", description:bugText.trim(), step: String(step), timestamp: new Date().toISOString() }),
      });
      setBugSent(true);
      setBugText("");
      setTimeout(() => { setBugOpen(false); setBugSent(false); }, 2000);
    } catch {
      setBugSent(true);
      setBugText("");
      setTimeout(() => { setBugOpen(false); setBugSent(false); }, 2000);
    }
    setBugSending(false);
  };

  const bugModal = bugOpen && (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.white, borderRadius:14, padding:"20px 20px 16px", width:"100%", maxWidth:360, boxShadow:"0 8px 32px rgba(0,0,0,0.18)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:14, fontWeight:700, color:C.blueDark }}>🐛 Report a Bug</span>
          <button onClick={()=>{ setBugOpen(false); setBugText(""); setBugSent(false); }} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:C.muted, lineHeight:1 }}>×</button>
        </div>
        {bugSent ? (
          <div style={{ textAlign:"center", padding:"12px 0", color:C.success, fontWeight:600, fontSize:14 }}>✅ Report sent. Thank you!</div>
        ) : (
          <>
            <textarea
              value={bugText} onChange={e=>setBugText(e.target.value)}
              placeholder="Describe what went wrong..."
              rows={4}
              style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:14, resize:"vertical", boxSizing:"border-box", fontFamily:"inherit", color:C.text }}
            />
            <div style={{ display:"flex", gap:8, marginTop:10 }}>
              <button onClick={()=>{ setBugOpen(false); setBugText(""); }} style={{ flex:1, padding:"9px", background:"none", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, cursor:"pointer", color:C.muted }}>Cancel</button>
              <button onClick={sendBugReport} disabled={bugSending||!bugText.trim()} style={{ flex:2, padding:"9px", background:C.blueDark, color:"white", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", opacity:bugSending||!bugText.trim()?0.6:1 }}>
                {bugSending ? "Sending…" : "Send Report"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={{ position:"absolute", width:1, height:1, overflow:"hidden", clip:"rect(0,0,0,0)" }}>Rekalogik Studio Workshop Registration Form</h2>
      {step !== 0 && header}
      {step===0 && sect0}
      {step===1 && sect1}
      {step===2 && sect2}
      {step===3 && sect3}
      {step==="done" && conf}
      {bugModal}
      <button onClick={()=>setBugOpen(true)} style={{ position:"fixed", bottom:16, right:16, background:"rgba(74,111,138,0.85)", color:"white", border:"none", borderRadius:20, padding:"5px 10px", fontSize:11, cursor:"pointer", zIndex:999, backdropFilter:"blur(4px)" }}>
        🐛 Bug
      </button>
      <div style={{ textAlign:"center", padding:"16px 0 24px", fontSize:11, color:C.muted }}>
        © 2026 RekaLogik Studio. All Rights Reserved.
      </div>
    </div>
  );
}
