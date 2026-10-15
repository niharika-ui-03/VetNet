/* VetNest - script.js
   All content lives in this file. To add a new topic: copy one object in TOPICS,
   give it a new id, and list the id inside UNITS for its subject. */
"use strict";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- saved state ---------- */
const KEY = "vetnest_state_v1";
let storageOK = true;
const S = { bm: [], gbm: [], done: [], recent: [], notes: {}, tasks: [], pins: {}, logs: [], chk: {}, last: null, theme: "light", fs: 18, mode: "simple" };
try { const raw = localStorage.getItem(KEY); if (raw) Object.assign(S, JSON.parse(raw)); } catch (e) { storageOK = false; }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { storageOK = false; $("#storageWarn").hidden = false; }
}

/* ---------- subjects ---------- */
const SUBJECTS = [
  { id: "anat", name: "Veterinary Anatomy", icon: "🦴", blurb: "How the animal body is built, from bones to organs." },
  { id: "phys", name: "Veterinary Physiology", icon: "🫀", blurb: "How the body works: blood, heart, balance." },
  { id: "bioc", name: "Veterinary Biochemistry", icon: "🧪", blurb: "The chemistry of life: biomolecules, enzymes, metabolism." },
  { id: "pharm", name: "Veterinary Pharmacology and Toxicology", icon: "💊", blurb: "How drugs move through and act on the body (theory only)." },
  { id: "micro", name: "Veterinary Microbiology", icon: "🦠", blurb: "Bacteria, viruses, fungi and how we control them." },
  { id: "para", name: "Veterinary Parasitology", icon: "🪱", blurb: "Parasites, hosts and life cycles." },
  { id: "path", name: "Veterinary Pathology", icon: "🔬", blurb: "What disease does to cells, tissues and organs." },
  { id: "nutr", name: "Animal Nutrition", icon: "🌾", blurb: "Nutrients, feeds and feeding." },
  { id: "pubh", name: "Veterinary Public Health and Epidemiology", icon: "🌍", blurb: "Zoonoses, food safety, disease patterns." },
  { id: "gen", name: "Animal Genetics and Breeding", icon: "🧬", blurb: "Inheritance and improvement of livestock." },
  { id: "lpm", name: "Livestock Production Management", icon: "🐄", blurb: "Housing, herd and flock management." },
  { id: "lpt", name: "Livestock Products Technology", icon: "🥛", blurb: "Milk, meat, eggs and their processing." },
  { id: "gyn", name: "Veterinary Gynaecology and Obstetrics", icon: "🐣", blurb: "Reproduction, pregnancy, parturition." },
  { id: "surg", name: "Veterinary Surgery and Radiology", icon: "🩹", blurb: "Surgical principles and diagnostic imaging." },
  { id: "med", name: "Veterinary Medicine", icon: "🩺", blurb: "Diseases of animals by system." },
  { id: "ext", name: "Veterinary and Animal Husbandry Extension Education", icon: "📢", blurb: "Taking knowledge to farmers." },
  { id: "clin", name: "Veterinary Clinical Practice", icon: "🏥", blurb: "Clinical practice and case handling." },
  { id: "farm", name: "Livestock Farm Practices", icon: "🚜", blurb: "Hands-on farm practices." }
];
const SUBJ = {}; SUBJECTS.forEach(s => SUBJ[s.id] = s);

const UNITS = {
  anat: [["Unit 1 – Foundations", ["a1", "a2"]], ["Unit 2 – Skeleton, joints and muscles", ["a3", "a4"]]],
  phys: [["Unit 1 – Basic concepts", ["p1", "p2"]], ["Unit 2 – Blood and circulation", ["p3", "p4"]]],
  bioc: [["Unit 1 – Biomolecules", ["b1", "b2", "b3", "b4"]], ["Unit 2 – Enzymes, vitamins and metabolism", ["b5", "b6", "b7"]]],
  pharm: [["Unit 1 – General pharmacology", ["f1", "f2", "f3", "f4"]]]
};

/* ---------- diagrams (labelled schematics, not accurate anatomical drawings) ---------- */
const DIA = {
  planes: { cap: "Schematic of a quadruped, side view. This is a simple labelled diagram, not an anatomical drawing.",
    svg: `<svg viewBox="0 0 600 250" role="img" aria-label="Directional terms and planes on a quadruped schematic">
    <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="currentColor" style="color:var(--accent)"/></marker></defs>
    <rect class="sv-fill" x="150" y="85" width="260" height="80" rx="38"/>
    <circle class="sv-fill" cx="440" cy="100" r="30"/>
    <rect class="sv-fill" x="180" y="160" width="14" height="50"/><rect class="sv-fill" x="370" y="160" width="14" height="50"/>
    <path class="sv-line" d="M150 105 Q120 90 105 70"/>
    <line class="sv-line" x1="300" y1="40" x2="300" y2="20" marker-end="url(#ar)"/><text class="sv-b" x="310" y="28">Dorsal</text>
    <line class="sv-line" x1="300" y1="225" x2="300" y2="240" marker-end="url(#ar)"/><text class="sv-b" x="310" y="238">Ventral</text>
    <line class="sv-line" x1="520" y1="130" x2="570" y2="130" marker-end="url(#ar)"/><text class="sv-b" x="505" y="115">Cranial</text>
    <line class="sv-line" x1="80" y1="130" x2="30" y2="130" marker-end="url(#ar)"/><text class="sv-b" x="30" y="115">Caudal</text>
    <text class="sv-t" x="455" y="75">Rostral</text>
    <line class="sv-dash" x1="270" y1="55" x2="270" y2="215"/><text class="sv-t" x="190" y="48">Transverse plane</text>
    <line class="sv-dash" x1="120" y1="125" x2="415" y2="125"/><text class="sv-t" x="205" y="148">Dorsal (frontal) plane</text>
    <text class="sv-t" x="20" y="200">Median plane: passes through the midline</text><text class="sv-t" x="20" y="218">(a cut from head to tail, top to bottom, into equal left and right halves).</text>
    </svg>` },
  bones: { cap: "Types of bone by shape, with an example of each.",
    svg: `<svg viewBox="0 0 600 230" role="img" aria-label="Classification of bones">
    ${[["Long","Femur, humerus, radius","Shaft + two ends",0,0],["Short","Carpals, tarsals","Roughly cube-shaped",1,0],["Flat","Scapula, ribs, skull bones","Thin plates",2,0],["Irregular","Vertebrae","Complex shapes",0,1],["Sesamoid","Patella","Develop inside a tendon",1,1],["Pneumatic","Frontal bone, many bird bones","Contain air spaces",2,1]]
      .map(b => `<rect class="sv-box" x="${15 + b[3] * 195}" y="${15 + b[4] * 105}" width="180" height="90" rx="10"/><text class="sv-b" x="${28 + b[3] * 195}" y="${40 + b[4] * 105}">${b[0]} bones</text><text class="sv-t" x="${28 + b[3] * 195}" y="${62 + b[4] * 105}">${b[1].length > 24 ? b[1].slice(0, 24) + "…" : b[1]}</text><text class="sv-t" x="${28 + b[3] * 195}" y="${84 + b[4] * 105}">${b[2]}</text>`).join("")}
    </svg>` },
  homeo: { cap: "A negative feedback loop. The response reduces the original change.",
    svg: `<svg viewBox="0 0 600 220" role="img" aria-label="Homeostasis feedback loop">
    <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="currentColor" style="color:var(--accent)"/></marker></defs>
    ${["Change in the body (stimulus)","Receptor detects it","Control centre compares with set point","Effector acts","Response"].map((t, i) => `<rect class="sv-box" x="${8 + i * 118}" y="40" width="106" height="70" rx="10"/><foreignObject x="${12 + i * 118}" y="44" width="98" height="64"><div xmlns="http://www.w3.org/1999/xhtml" style="font:12px system-ui;color:var(--ink);text-align:center;display:flex;align-items:center;justify-content:center;height:62px">${t}</div></foreignObject>${i < 4 ? `<line class="sv-line" x1="${114 + i * 118}" y1="75" x2="${126 + i * 118}" y2="75" marker-end="url(#ar2)"/>` : ""}`).join("")}
    <path class="sv-dash" d="M540 112 L540 170 L60 170 L60 112" marker-end="url(#ar2)"/>
    <text class="sv-t" x="150" y="192">Negative feedback: the response pushes the value back towards normal</text>
    <text class="sv-t" x="8" y="20">Example: body temperature rises → hypothalamus → panting or sweating → temperature falls</text>
    </svg>` },
  blood: { cap: "Approximate composition of blood. Exact percentages differ between species.",
    svg: `<svg viewBox="0 0 600 220" role="img" aria-label="Composition of blood">
    <rect class="sv-a" x="20" y="20" width="330" height="50" rx="6" style="fill:#f1dc9a"/><text class="sv-b" x="30" y="50">Plasma (about 55%)</text>
    <rect class="sv-a" x="350" y="20" width="230" height="50" rx="6" style="fill:#e8a9a1"/><text class="sv-b" x="360" y="50">Formed elements (about 45%)</text>
    <text class="sv-t" x="20" y="100">Plasma: water, albumin, globulins, fibrinogen,</text><text class="sv-t" x="20" y="118">electrolytes, nutrients, hormones, wastes</text>
    <text class="sv-t" x="350" y="100">Red blood cells (most numerous)</text><text class="sv-t" x="350" y="118">White blood cells (defence)</text><text class="sv-t" x="350" y="136">Platelets / thrombocytes (clotting)</text>
    <text class="sv-t" x="20" y="180">Serum = plasma without fibrinogen and other clotting factors.</text>
    </svg>` },
  adme: { cap: "The four steps of pharmacokinetics (ADME).",
    svg: `<svg viewBox="0 0 600 190" role="img" aria-label="ADME pharmacokinetics">
    <defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="currentColor" style="color:var(--accent)"/></marker></defs>
    ${[["Absorption","Site of entry → blood"],["Distribution","Blood → tissues"],["Metabolism","Mostly in the liver"],["Excretion","Kidney, bile, milk, lungs"]].map((b, i) => `<rect class="sv-box" x="${10 + i * 148}" y="30" width="128" height="80" rx="10"/><text class="sv-b" x="${22 + i * 148}" y="62">${b[0]}</text><text class="sv-t" x="${16 + i * 148}" y="86">${b[1].length > 20 ? b[1].slice(0, 20) : b[1]}</text>${b[1].length > 20 ? `<text class="sv-t" x="${16 + i * 148}" y="102">${b[1].slice(20)}</text>` : ""}${i < 3 ? `<line class="sv-line" x1="${138 + i * 148}" y1="70" x2="${156 + i * 148}" y2="70" marker-end="url(#ar3)"/>` : ""}`).join("")}
    <text class="sv-t" x="10" y="150">Pharmacokinetics = what the body does to the drug.</text>
    </svg>` }
};

/* ---------- study topics ---------- */
const TOPICS = [
/* ===== ANATOMY ===== */
{ id: "a1", s: "anat", t: "Introduction to Veterinary Anatomy",
  obj: ["Define anatomy and name its main branches", "Tell gross, microscopic and developmental anatomy apart", "Explain why species differences matter to a veterinarian"],
  intro: "Anatomy is the study of how the animal body is built. Before you can understand disease or how organs work, you need to know what is where.",
  simple: ["Think of anatomy as the map of the body. Physiology explains how the city runs. Anatomy tells you where the roads, buildings and power lines are.",
    "Gross anatomy is what you can see by dissection. Microscopic anatomy (histology) needs a microscope. Embryology looks at how the body forms before birth.",
    "In veterinary anatomy we study many species. A cow's stomach has four compartments, a dog has a single stomach, and a horse has a very large caecum and colon. The idea is the same but the design is different."],
  detail: ["The word <i>anatomy</i> comes from Greek (<i>ana</i> = up, <i>temnein</i> = to cut). It deals with the form and structure of the body and the relationships between its parts.",
    "<b>Systemic anatomy</b> studies the body system by system: osteology (bones), arthrology (joints), myology (muscles), splanchnology (viscera), angiology (vessels), neurology (nervous system). <b>Regional (topographic) anatomy</b> studies all structures of one region together (head, neck, thorax, abdomen, limbs). This is the approach used by surgeons and clinicians.",
    "<b>Comparative anatomy</b> compares structure across species, which explains why a drug, surgery or feeding method may work differently in a dog, a cow or a horse."],
  defs: ["Anatomy: the science of the structure of the body and the relationships of its parts.", "Gross anatomy: study of structures visible without magnification.", "Histology: study of tissues under the microscope.", "Embryology: study of development from fertilisation to birth."],
  terms: [["Osteology", "Study of bones"], ["Arthrology", "Study of joints"], ["Myology", "Study of muscles"], ["Splanchnology", "Study of the visceral organs"], ["Angiology", "Study of blood and lymph vessels"], ["Neurology", "Study of the nervous system"]],
  steps: ["Pick one system, for example the skeleton.", "Learn the parts from general to specific.", "Find each part on a model or specimen.", "Link the structure with its function and the clinical problem it can cause."],
  table: { h: ["Branch", "What it studies", "Tool"], r: [["Gross anatomy", "Organs and parts visible to the eye", "Dissection"], ["Histology", "Tissues and cells", "Microscope"], ["Embryology", "Development before birth", "Embryo sections"], ["Comparative anatomy", "Differences between species", "Dissection of several species"]] },
  ex: ["Comparing a cow's compartmented stomach with a dog's simple stomach is a classic comparative anatomy example.", "Knowing where the jugular vein runs in the neck helps a clinician take blood safely."],
  exam: ["Definition of anatomy with word origin.", "Systemic vs regional anatomy.", "Branches of anatomy with one example each."],
  myth: ["Anatomy is not just memorising names. It is structure linked to function."],
  sa: [["Define anatomy.", "The science dealing with the structure of the body and the relationships of its parts."], ["Differentiate systemic and regional anatomy.", "Systemic: the body studied system by system. Regional: the body studied region by region, with all structures of a region together."]],
  la: [["Describe the branches of veterinary anatomy.", "Outline: definition and origin; gross anatomy (systemic, regional); microscopic anatomy (histology, cytology); developmental anatomy (embryology); comparative anatomy; applied anatomy. Add one example for each."]],
  mcq: [["The study of tissues under the microscope is called", ["Osteology", "Histology", "Myology", "Angiology"], 1, "Histology is the microscopic study of tissues. Osteology is bones, myology muscles, angiology vessels."], ["Splanchnology is the study of", ["Joints", "Nerves", "Visceral organs", "Skull"], 2, "Splanchnology deals with the viscera (digestive, respiratory and urogenital organs)."]],
  fb: [["The study of joints is called ___.", "arthrology"]],
  sum: "Anatomy = structure of the body. Gross, microscopic and developmental branches. Systemic vs regional approach. Species differ, so compare.",
  fc: [["Gross anatomy?", "Study of structures visible without magnification"], ["Histology?", "Microscopic study of tissues"]], rel: ["a2", "a3"] },

{ id: "a2", s: "anat", t: "Anatomical Terminology, Planes and Directions",
  obj: ["Use directional terms correctly for four-legged animals", "Name and describe the main anatomical planes", "Use dorsal, palmar and plantar correctly on limbs"],
  intro: "Directional terms are a shared language. They let anyone describe the position of a structure without confusion, whatever position the animal is in.",
  simple: ["Animals walk on four legs, so we avoid 'front' and 'back'. The head end is cranial and the tail end is caudal. The back is dorsal and the belly is ventral.", "On the limbs, proximal means closer to the body and distal means farther away. A dog's elbow is proximal to its carpus (wrist).", "Imagine slicing the body like a loaf of bread. A cut along the middle, from head to tail, gives equal left and right halves. That is the median plane."],
  detail: ["<b>Directional terms</b> describe the position of one structure relative to another. <i>Cranial</i> and <i>caudal</i> refer to the head and tail ends of the trunk. On the head, <i>rostral</i> means towards the nose.", "On the limbs, cranial and caudal are used above the carpus and tarsus. Below the carpus, the front surface of the forelimb is <i>dorsal</i> and the back surface is <i>palmar</i>. Below the tarsus, the front surface of the hindlimb is dorsal and the back surface is <i>plantar</i>.", "<b>Planes:</b> the <i>median plane</i> passes through the midline and divides the body into equal right and left halves. <i>Sagittal planes</i> are parallel to it. <i>Transverse planes</i> cut across the long axis at right angles. <i>Dorsal (frontal) planes</i> are parallel to the back and divide the body into dorsal and ventral parts."],
  defs: ["Median plane: the plane that divides the body into equal right and left halves.", "Transverse plane: a plane at right angles to the long axis of the body or a part.", "Proximal: nearer to the point of attachment or origin; distal: farther from it."],
  terms: [["Cranial / Caudal", "Towards the head / the tail"], ["Rostral", "Towards the nose (on the head)"], ["Dorsal / Ventral", "Towards the back / the belly"], ["Medial / Lateral", "Towards / away from the median plane"], ["Proximal / Distal", "Nearer to / farther from the body (on limbs)"], ["Palmar / Plantar", "Back surface of forefoot / hindfoot"]],
  steps: ["Picture the animal standing on four feet.", "Decide the axis: head–tail, back–belly, or midline–side.", "Pick the term for that axis.", "For limbs, check whether you are above or below the carpus or tarsus."],
  table: { h: ["Plane", "Divides the body into", "Note"], r: [["Median", "Equal right and left halves", "Only one exists"], ["Sagittal", "Unequal right and left parts", "Parallel to the median plane"], ["Transverse", "Cranial and caudal parts", "At right angles to the long axis"], ["Dorsal (frontal)", "Dorsal and ventral parts", "Parallel to the ground in a standing animal"]] },
  ex: ["A report may say 'a swelling on the caudo-lateral aspect of the hock', meaning towards the tail and the outer side.", "A cut through the middle of a dog from head to tail is a median section."],
  dia: "planes",
  exam: ["List directional terms with meaning.", "Define the planes with a labelled sketch.", "Difference between palmar and plantar."],
  myth: ["'Anterior' and 'posterior' are not the standard terms for four-legged animals. Use cranial and caudal.", "A sagittal plane is not always the median plane. Only the central one is."],
  sa: [["What does caudal mean?", "Towards the tail."], ["Define the median plane.", "The plane that passes through the midline and divides the body into equal right and left halves."]],
  la: [["Describe the anatomical planes used in veterinary anatomy.", "Define and describe median, sagittal, transverse and dorsal planes. Draw a labelled schematic. Mention a clinical use, such as describing radiograph or section views."]],
  mcq: [["Towards the tail is called", ["Cranial", "Caudal", "Dorsal", "Rostral"], 1, "Caudal means towards the tail. Cranial is towards the head."], ["The plane dividing the body into equal right and left halves is the", ["Transverse plane", "Dorsal plane", "Median plane", "Frontal plane"], 2, "The median plane passes through the midline and gives equal halves."]],
  fb: [["On the hindlimb below the tarsus, the back surface is called ___.", "plantar"]],
  sum: "Cranial/caudal for head/tail; dorsal/ventral for back/belly; medial/lateral for midline; proximal/distal for limbs; palmar/plantar for the back of the foot. Planes: median, sagittal, transverse, dorsal.",
  fc: [["Rostral?", "Towards the nose, on the head"], ["Transverse plane?", "Cuts across the long axis at right angles"], ["Palmar?", "Back surface of the forefoot below the carpus"]], rel: ["a1", "a3"] },

{ id: "a3", s: "anat", t: "Classification of Bones and the Skeletal System",
  obj: ["Classify bones by shape with examples", "Divide the skeleton into axial, appendicular and splanchnic parts", "List the functions of the skeleton"],
  intro: "The skeleton is the framework of the body. It supports the animal, protects soft organs and gives muscles something to pull on.",
  simple: ["Bones come in different shapes because they do different jobs. Long bones such as the femur act like levers. Flat bones such as ribs protect. Short bones in the wrist absorb shocks.", "The skeleton has three parts. The axial skeleton is the skull, spine, ribs and sternum. The appendicular skeleton is the limbs. The splanchnic skeleton is rare bones that grow inside organs, like the os penis in a dog.", "Bone also stores calcium and phosphorus, and red bone marrow makes blood cells."],
  detail: ["<b>Classification by shape:</b> <i>long</i> (femur, humerus, radius: shaft or diaphysis, two ends or epiphyses, medullary cavity), <i>short</i> (carpal and tarsal bones), <i>flat</i> (scapula, ribs, skull bones), <i>irregular</i> (vertebrae), <i>sesamoid</i> (develop in tendons, e.g. patella), <i>pneumatic</i> (contain air spaces, e.g. frontal bone; many bird bones).", "<b>Divisions:</b> the <i>axial skeleton</i> includes the skull, vertebral column, ribs and sternum. The <i>appendicular skeleton</i> includes the limb bones and girdles. The <i>splanchnic (visceral) skeleton</i> consists of bones in soft organs, such as the os cordis in cattle and the os penis in the dog.", "<b>Functions:</b> support, protection, leverage for movement, storage of calcium and phosphorus, and haemopoiesis in red bone marrow."],
  defs: ["Diaphysis: the shaft of a long bone.", "Epiphysis: the end of a long bone, separated from the shaft by the growth plate in young animals.", "Sesamoid bone: a bone that develops within a tendon."],
  terms: [["Medullary cavity", "Central cavity of the shaft containing marrow"], ["Periosteum", "Fibrous membrane covering the outside of a bone"], ["Axial skeleton", "Skull, vertebral column, ribs, sternum"], ["Appendicular skeleton", "Limb bones and girdles"]],
  steps: ["Look at the shape: is it longer than wide (long), thin plate (flat), box-like (short), complex (irregular)?", "Ask if it sits in a tendon (sesamoid) or contains air (pneumatic).", "Place it in the axial, appendicular or splanchnic part."],
  table: { h: ["Species", "Cervical", "Thoracic", "Lumbar", "Sacral"], r: [["Dog", "7", "13", "7", "3"], ["Cattle", "7", "13", "6", "5"], ["Horse", "7", "18", "6", "5"]] },
  ex: ["The patella is the largest sesamoid bone and sits in the tendon of the quadriceps muscle.", "Nearly all mammals have 7 cervical vertebrae, even a giraffe."],
  dia: "bones",
  exam: ["Classification of bones with examples.", "Functions of the skeleton.", "Axial vs appendicular skeleton.", "Vertebral formula of dog, ox and horse."],
  myth: ["Bone is not dead. It is living tissue that remodels throughout life."],
  sa: [["Name the types of bone by shape.", "Long, short, flat, irregular, sesamoid and pneumatic."], ["What is the os cordis?", "A splanchnic bone found in the heart region of cattle."]],
  la: [["Classify bones with examples and write the functions of the skeleton.", "Describe each shape category with examples; add axial, appendicular and splanchnic divisions; list functions: support, protection, movement, mineral storage, haemopoiesis."]],
  mcq: [["The patella is an example of a", ["Long bone", "Irregular bone", "Sesamoid bone", "Flat bone"], 2, "The patella develops within a tendon, so it is sesamoid."], ["Most domestic mammals have how many cervical vertebrae?", ["5", "6", "7", "9"], 2, "Almost all mammals have 7 cervical vertebrae."]],
  fb: [["The shaft of a long bone is called the ___.", "diaphysis"]],
  sum: "Bone shapes: long, short, flat, irregular, sesamoid, pneumatic. Skeleton: axial, appendicular, splanchnic. Functions: support, protection, movement, minerals, blood cell production.",
  fc: [["Sesamoid bone?", "Bone that develops in a tendon, e.g. patella"], ["Diaphysis?", "Shaft of a long bone"]], rel: ["a2", "a4"] },

{ id: "a4", s: "anat", t: "Introduction to Joints and Muscles",
  obj: ["Classify joints and describe a synovial joint", "Name the three types of muscle tissue and compare them", "Tell tendons and ligaments apart"],
  intro: "Joints are where bones meet. Muscles pull on bones across joints. Together they produce movement.",
  simple: ["Some joints do not move, like the sutures in the skull. Some move a little. Most limb joints, such as the hip and elbow, are synovial joints and move freely with lubricating fluid inside.", "Muscle is of three kinds. Skeletal muscle moves bones and you control it. Smooth muscle is in organs like the gut and works automatically. Cardiac muscle is only in the heart.", "A tendon joins muscle to bone. A ligament joins bone to bone."],
  detail: ["<b>Joints (arthroses)</b> are classified as <i>fibrous</i> (e.g. skull sutures), <i>cartilaginous</i> (e.g. pelvic symphysis; growth plates are temporary cartilaginous joints) and <i>synovial</i> (freely movable). A synovial joint has articular cartilage, a joint capsule, a synovial membrane and synovial fluid in the joint cavity.", "Synovial joint types: hinge (elbow), ball-and-socket (hip, shoulder), pivot (atlantoaxial joint), gliding or plane, and condylar.", "<b>Muscle tissue:</b> skeletal (voluntary, striated, multinucleated), smooth (involuntary, non-striated, single nucleus) and cardiac (involuntary, striated, branched cells with intercalated discs). A muscle usually has an <i>origin</i> (fixed attachment) and an <i>insertion</i> (movable attachment). Functional groups: flexors, extensors, abductors, adductors."],
  defs: ["Joint: the union between two or more bones.", "Tendon: a dense fibrous cord connecting muscle to bone.", "Ligament: a dense fibrous band connecting bone to bone."],
  terms: [["Synovial fluid", "Lubricating fluid inside synovial joints"], ["Articular cartilage", "Smooth cartilage covering the joint surfaces"], ["Origin / Insertion", "Fixed / movable attachment of a muscle"], ["Intercalated disc", "Cell junction found in cardiac muscle"]],
  steps: ["A nerve impulse reaches the skeletal muscle.", "The muscle contracts and shortens.", "The tendon pulls on the bone it is attached to.", "The bone moves at the joint."],
  table: { h: ["Feature", "Skeletal", "Smooth", "Cardiac"], r: [["Control", "Voluntary", "Involuntary", "Involuntary"], ["Striations", "Present", "Absent", "Present"], ["Nuclei", "Many, at the edge", "One, central", "One or two, central"], ["Location", "Attached to bones", "Walls of organs and vessels", "Heart"]] },
  ex: ["Lameness often involves joint disease, which is why synovial joint structure matters in clinics.", "The rumen wall moves by smooth muscle contractions."],
  exam: ["Classification of joints with examples.", "Structure of a synovial joint.", "Comparison of the three muscle types."],
  myth: ["Tendons and ligaments are not the same. Tendons connect muscle to bone, ligaments connect bone to bone."],
  sa: [["Name the parts of a synovial joint.", "Articular cartilage, joint capsule, synovial membrane, synovial fluid, joint cavity."], ["What are intercalated discs?", "Cell junctions between cardiac muscle cells that allow impulses to pass quickly."]],
  la: [["Classify joints and describe the structure of a synovial joint.", "Fibrous, cartilaginous and synovial joints with examples; then draw and label a synovial joint and describe each part and its function."]],
  mcq: [["Intercalated discs are found in", ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Tendon"], 2, "Cardiac muscle cells are linked by intercalated discs."], ["The joint between the atlas and axis is a", ["Hinge joint", "Pivot joint", "Fibrous joint", "Gliding joint"], 1, "The atlantoaxial joint is a pivot joint, which allows rotation of the head."]],
  fb: [["A ___ connects bone to bone.", "ligament"]],
  sum: "Joints: fibrous, cartilaginous, synovial. Muscles: skeletal, smooth, cardiac. Tendon = muscle to bone; ligament = bone to bone.",
  fc: [["Tendon?", "Connects muscle to bone"], ["Ligament?", "Connects bone to bone"], ["Cardiac muscle?", "Involuntary, striated, branched, intercalated discs"]], rel: ["a3"] },

/* ===== PHYSIOLOGY ===== */
{ id: "p1", s: "phys", t: "Introduction to Physiology",
  obj: ["Define physiology and the levels of body organisation", "Describe the body fluid compartments", "Explain the internal environment"],
  intro: "Physiology is the science of how living organisms and their parts function. It asks 'how does it work and why?'",
  simple: ["Anatomy shows the parts. Physiology shows what the parts do and how they work together.", "The body is organised in levels: cells make tissues, tissues make organs, organs form systems, and systems make the whole animal.", "Most of the body is water. Roughly two-thirds of that water is inside cells, and one-third is outside cells. The fluid around cells is the cell's local environment."],
  detail: ["Physiology studies the functions of the body and the mechanisms behind them. Levels: chemical, cellular, tissue, organ, organ system and organism. Body systems include digestive, respiratory, cardiovascular, nervous, endocrine, urinary, reproductive, musculoskeletal and immune.", "<b>Body fluids:</b> total body water is roughly 60% of body weight in adult animals (it varies with age and fat). About two-thirds is intracellular fluid (ICF); about one-third is extracellular fluid (ECF), made of interstitial fluid and plasma.", "Claude Bernard described the ECF as the <i>milieu intérieur</i>, the internal environment that cells depend on. Keeping its composition steady is the basis of homeostasis."],
  defs: ["Physiology: the study of the functions of living organisms and their parts.", "Intracellular fluid: the fluid inside cells.", "Extracellular fluid: the fluid outside cells, including plasma and interstitial fluid."],
  terms: [["Interstitial fluid", "Fluid in the spaces between cells"], ["Plasma", "Fluid part of blood"], ["Milieu intérieur", "Internal environment (Claude Bernard)"]],
  steps: ["Cells form tissues.", "Tissues form organs.", "Organs work together as systems.", "Systems keep the whole animal alive."],
  table: { h: ["Compartment", "Share of body water", "Includes"], r: [["Intracellular fluid", "About two-thirds", "Fluid inside all cells"], ["Extracellular fluid", "About one-third", "Plasma, interstitial fluid, transcellular fluid"]] },
  ex: ["Dehydration in a calf means fluid is lost mostly from ECF first, which is why fluid balance matters in clinical cases."],
  exam: ["Definition of physiology.", "Body fluid compartments.", "Levels of organisation."],
  myth: ["Physiology is not only about humans. Species differ widely, for example in digestion and thermoregulation."],
  sa: [["Define physiology.", "The science of the functions of living organisms and their parts."], ["What is the milieu intérieur?", "The extracellular fluid that surrounds cells; the internal environment, a term used by Claude Bernard."]],
  la: [["Describe the body fluid compartments.", "Total body water; intracellular (about two-thirds) and extracellular (about one-third); ECF divided into plasma and interstitial fluid; why composition matters; one clinical example."]],
  mcq: [["The term 'milieu intérieur' was given by", ["Walter Cannon", "Claude Bernard", "Louis Pasteur", "William Harvey"], 1, "Claude Bernard described the internal environment. Walter Cannon later coined 'homeostasis'."], ["Roughly what share of body water is intracellular?", ["One-third", "Two-thirds", "One-tenth", "All of it"], 1, "About two-thirds of body water is inside cells."]],
  fb: [["Fluid inside cells is called ___ fluid.", "intracellular"]],
  sum: "Physiology = function. Levels: cell → tissue → organ → system → organism. ICF about two-thirds, ECF about one-third of body water. ECF is the internal environment.",
  fc: [["ICF?", "Fluid inside cells, about two-thirds of body water"], ["ECF?", "Plasma and interstitial fluid"]], rel: ["p2"] },

{ id: "p2", s: "phys", t: "Homeostasis",
  obj: ["Define homeostasis", "Explain negative and positive feedback with examples", "Describe the parts of a feedback loop"],
  intro: "Homeostasis is the body's ability to keep its internal environment fairly stable even when the outside world changes.",
  simple: ["A home thermostat switches the heater on when the room is cold and off when it is warm. The body works like that.", "When an animal gets hot, the brain senses it and the body sweats, pants or widens skin blood vessels to lose heat. When it is cold, the animal shivers and conserves heat.", "Most feedback in the body is negative: the answer cancels the change. A few, like labour, are positive and speed a process up until it finishes."],
  detail: ["The term <i>homeostasis</i> was coined by Walter Cannon. It refers to maintenance of a relatively constant internal environment (temperature, pH, glucose, ions, water) within a normal range or around a set point.", "<b>A feedback loop</b> has a receptor (detects the change), a control centre (compares with the set point) and an effector (produces the response).", "<b>Negative feedback</b> reverses the original change (thermoregulation, blood glucose control, baroreceptor control of blood pressure). <b>Positive feedback</b> amplifies it until an end point is reached: for example oxytocin release during parturition and clot formation in blood coagulation.", "Species differ in how they act. Horses lose much heat by sweating; dogs have limited sweating and rely heavily on panting."],
  defs: ["Homeostasis: maintenance of a relatively stable internal environment.", "Negative feedback: a response that opposes the original change.", "Positive feedback: a response that enhances the original change."],
  terms: [["Set point", "The normal target value of a controlled variable"], ["Receptor", "Detects the change"], ["Control centre", "Processes the information and decides the response"], ["Effector", "Carries out the response"]],
  steps: ["A variable changes (e.g. body temperature rises).", "Receptors detect the change.", "The control centre (hypothalamus) compares it with the set point.", "Effectors act (panting, sweating, vasodilation).", "The variable returns towards normal."],
  table: { h: ["Feature", "Negative feedback", "Positive feedback"], r: [["Effect", "Reverses the change", "Strengthens the change"], ["Result", "Stability", "Rapid completion of a process"], ["Examples", "Temperature, blood glucose, blood pressure", "Oxytocin during labour, blood clotting"]] },
  ex: ["A dog panting on a hot day is a thermoregulatory response.", "Oxytocin released during parturition increases uterine contractions, which cause more oxytocin release."],
  dia: "homeo",
  exam: ["Define homeostasis with examples.", "Negative vs positive feedback.", "Components of a feedback loop."],
  myth: ["Homeostasis does not mean nothing changes. Values vary within a normal range.", "Positive feedback is not 'good' feedback. It means amplification."],
  sa: [["Who coined the term homeostasis?", "Walter Cannon."], ["Give an example of positive feedback.", "Oxytocin release and uterine contraction during parturition."]],
  la: [["Explain homeostasis and the role of feedback mechanisms.", "Define it; give the feedback loop with receptor, control centre, effector; negative feedback with thermoregulation or glucose; positive feedback with parturition and clotting; species differences; clinical relevance."]],
  mcq: [["Which is an example of positive feedback?", ["Thermoregulation", "Blood glucose control", "Oxytocin during parturition", "Baroreceptor reflex"], 2, "Oxytocin and uterine contractions reinforce each other until birth occurs."], ["The control centre for body temperature is the", ["Hypothalamus", "Cerebellum", "Medulla only", "Pituitary"], 0, "The hypothalamus compares body temperature with the set point."]],
  fb: [["Homeostasis was a term coined by Walter ___.", "cannon"]],
  sum: "Homeostasis = stable internal environment. Feedback loop: receptor → control centre → effector. Negative feedback = stabilises. Positive feedback = amplifies to an end point.",
  fc: [["Negative feedback?", "Response opposes the change"], ["Control centre for temperature?", "Hypothalamus"]], rel: ["p1", "p3"] },

{ id: "p3", s: "phys", t: "Blood: Composition and Functions",
  obj: ["List the components of blood", "Describe each type of blood cell and its function", "State the functions of blood"],
  intro: "Blood is a fluid connective tissue that circulates through the body, carrying oxygen, nutrients, hormones, waste and defensive cells.",
  simple: ["Blood has a liquid part called plasma and cells floating in it.", "Red blood cells carry oxygen using haemoglobin. White blood cells fight infection. Platelets help stop bleeding by forming clots.", "If you let blood clot and then take the liquid, that liquid is serum. Serum is plasma without the clotting proteins."],
  detail: ["<b>Composition:</b> plasma (about 55% of volume) and formed elements (about 45%). Plasma is mostly water (about 90%), with proteins (albumin, globulins, fibrinogen), electrolytes, nutrients, gases, hormones and wastes. <b>Serum</b> is plasma minus fibrinogen and other clotting factors.", "<b>Red blood cells (erythrocytes):</b> carry oxygen via haemoglobin. Mammalian RBCs are non-nucleated (camelids have oval ones); birds, reptiles, amphibians and most fish have nucleated RBCs. <b>White blood cells (leucocytes):</b> granulocytes (neutrophils, eosinophils, basophils) and agranulocytes (lymphocytes, monocytes). <b>Platelets</b> (thrombocytes in birds) are fragments of megakaryocytes in mammals.", "<b>Functions:</b> transport of gases, nutrients, hormones and wastes; defence; haemostasis; temperature regulation; acid–base buffering. In adults haemopoiesis occurs mainly in red bone marrow."],
  defs: ["Plasma: the liquid, non-cellular part of blood containing clotting factors.", "Serum: the fluid left after blood clots; it lacks fibrinogen and clotting factors.", "Haemopoiesis: the formation of blood cells."],
  terms: [["Haemoglobin", "Iron-containing protein in RBCs that carries oxygen"], ["Fibrinogen", "Plasma protein converted to fibrin during clotting"], ["Megakaryocyte", "Bone marrow cell that produces platelets"], ["Anticoagulant", "Substance that stops blood from clotting in a tube (e.g. EDTA, heparin)"]],
  steps: ["Stem cells in red bone marrow divide.", "They mature into RBCs, WBCs or platelets.", "Mature cells enter the circulation.", "Old RBCs are removed mainly by the spleen and liver."],
  table: { h: ["Cell", "Main function", "Note"], r: [["Erythrocyte", "Carries O₂ and some CO₂", "Non-nucleated in mammals"], ["Neutrophil", "Phagocytosis of bacteria", "First responder in infection"], ["Eosinophil", "Parasite defence and allergy", "Often raised in parasitism"], ["Lymphocyte", "Immune response", "B cells and T cells"], ["Platelet", "Clotting", "Cell fragments"]] },
  ex: ["A pale mucous membrane in a cow may suggest anaemia (low RBC or haemoglobin).", "Blood is collected into different tubes depending on whether plasma or serum is needed."],
  dia: "blood",
  exam: ["Composition of blood.", "Plasma vs serum.", "Functions of blood.", "Types of WBC."],
  myth: ["Not all animals have non-nucleated RBCs. Birds have nucleated ones.", "Serum and plasma are not the same."],
  sa: [["Differentiate plasma and serum.", "Plasma contains fibrinogen and clotting factors; serum does not, because they were used up in clotting."], ["Which animals have nucleated RBCs?", "Birds, reptiles, amphibians and most fish."]],
  la: [["Describe the composition and functions of blood.", "Plasma and formed elements with approximate proportions; plasma proteins; RBC, WBC types, platelets; functions; haemopoiesis; species differences."]],
  mcq: [["Serum differs from plasma in lacking", ["Albumin", "Fibrinogen", "Water", "Electrolytes"], 1, "Fibrinogen and other clotting factors are used in clot formation."], ["Which group has nucleated red blood cells?", ["Cattle", "Dogs", "Birds", "Horses"], 2, "Birds have nucleated RBCs; mammals generally do not."]],
  fb: [["The oxygen-carrying protein in red cells is ___.", "haemoglobin"]],
  sum: "Blood = plasma + RBC + WBC + platelets. Serum = plasma − clotting factors. Functions: transport, defence, haemostasis, temperature and pH regulation.",
  fc: [["Serum?", "Plasma without clotting factors"], ["Platelets in birds?", "Thrombocytes"]], rel: ["p4", "b3"] },

{ id: "p4", s: "phys", t: "Introduction to Cardiovascular Physiology",
  obj: ["Trace the path of blood through the heart and body", "Define cardiac cycle, systole, diastole and cardiac output", "Explain the role of the SA node"],
  intro: "The cardiovascular system is the heart and blood vessels. It moves blood so that every tissue receives oxygen and nutrients and loses its waste.",
  simple: ["The heart is a double pump. The right side sends blood to the lungs to pick up oxygen. The left side sends oxygen-rich blood to the rest of the body.", "The heart squeezes (systole) and relaxes (diastole) again and again. That repeating pattern is the cardiac cycle.", "A small group of cells in the right atrium, the SA node, sets the heart rate, which is why it is called the pacemaker."],
  detail: ["<b>Circulation in mammals:</b> vena cava → right atrium → right AV (tricuspid) valve → right ventricle → pulmonary valve → pulmonary artery → lungs → pulmonary veins → left atrium → left AV (mitral/bicuspid) valve → left ventricle → aortic valve → aorta → body.", "<b>Cardiac cycle:</b> systole (contraction and ejection) and diastole (relaxation and filling). Heart sounds: the first (S1, 'lub') is due to closure of the AV valves; the second (S2, 'dub') is due to closure of the semilunar valves.", "<b>Conduction:</b> the sinoatrial (SA) node generates the impulse, which spreads through the atria to the atrioventricular (AV) node, the bundle of His and Purkinje fibres to the ventricles.", "<b>Cardiac output</b> = heart rate × stroke volume. Vessels: arteries carry blood away from the heart, veins carry it back, and capillaries are the exchange vessels."],
  defs: ["Cardiac output: the volume of blood pumped by each ventricle per minute.", "Stroke volume: the volume ejected by a ventricle in a single beat.", "Systole: the contraction phase of the cardiac cycle; diastole: the relaxation phase."],
  terms: [["SA node", "Natural pacemaker of the heart"], ["AV node", "Delays the impulse so ventricles fill before they contract"], ["Pulmonary circulation", "Heart → lungs → heart"], ["Systemic circulation", "Heart → body → heart"]],
  steps: ["The SA node fires an impulse.", "The atria contract and fill the ventricles.", "The impulse passes through the AV node to the ventricles.", "The ventricles contract and eject blood.", "The heart relaxes and refills."],
  table: { h: ["Vessel", "Carries blood", "Feature"], r: [["Artery", "Away from the heart", "Thick, elastic wall"], ["Vein", "Towards the heart", "Thinner wall, valves in many"], ["Capillary", "Between arteries and veins", "One-cell-thick wall, exchange site"]] },
  ex: ["A vet listens to the heart with a stethoscope to detect abnormal sounds called murmurs.", "A fast heart rate with weak pulses may indicate shock or heart problems, which a clinician must assess."],
  exam: ["Path of blood through the heart.", "Cardiac cycle.", "Cardiac output.", "Conduction system."],
  myth: ["The left side does not carry only oxygenated blood in the whole circuit. Pulmonary arteries carry deoxygenated blood."],
  sa: [["What is the pacemaker of the heart?", "The sinoatrial (SA) node."], ["Define cardiac output.", "Heart rate multiplied by stroke volume."]],
  la: [["Describe the circulation of blood through the heart.", "Follow the path from the vena cava to the aorta with valves, pulmonary vs systemic circulation, a labelled schematic and the role of valves."]],
  mcq: [["The natural pacemaker of the heart is the", ["AV node", "SA node", "Purkinje fibre", "Bundle of His"], 1, "The SA node has the fastest rate of spontaneous depolarisation."], ["Cardiac output equals", ["Heart rate × stroke volume", "Heart rate + stroke volume", "Stroke volume ÷ heart rate", "Blood pressure × heart rate"], 0, "Cardiac output = HR × SV."]],
  fb: [["The first heart sound is caused by closure of the ___ valves.", "av"]],
  sum: "Double pump: right → lungs, left → body. SA node paces the heart. CO = HR × SV. S1 = AV valves close; S2 = semilunar valves close.",
  fc: [["Systole?", "Contraction phase"], ["Mitral valve?", "Left AV (bicuspid) valve"]], rel: ["p3", "p2"] },

/* ===== BIOCHEMISTRY ===== */
{ id: "b1", s: "bioc", t: "Introduction to Biochemistry",
  obj: ["Define biochemistry", "List the major biomolecules and their building blocks", "Link biochemistry to veterinary practice"],
  intro: "Biochemistry is the chemistry of living things. It explains how molecules in cells build, break down and carry out life processes.",
  simple: ["Your body is made of a few big groups of molecules: carbohydrates, proteins, lipids (fats) and nucleic acids (DNA and RNA).", "Each group is built from small units, like a wall built from bricks.", "Vets use biochemistry when they read blood test results and when they understand metabolic diseases like ketosis in dairy cows."],
  detail: ["Biochemistry studies the chemical composition of living organisms and the reactions that occur in them. Major biomolecules: carbohydrates, proteins, lipids and nucleic acids; also vitamins, minerals and water.", "<b>Veterinary relevance:</b> clinical biochemistry (blood glucose, urea, creatinine, enzymes), metabolic disorders (ketosis, hypocalcaemia or milk fever), nutrition, drug metabolism and the molecular basis of disease."],
  defs: ["Biochemistry: the study of the chemical processes and substances in living organisms.", "Biomolecule: a molecule that is produced by living organisms and has a biological role."],
  terms: [["Monomer", "A single small building-block unit"], ["Polymer", "A large molecule made from many monomers"], ["Metabolism", "All chemical reactions in the body"]],
  steps: ["Small monomers join to form polymers.", "Polymers fold or assemble into functional molecules.", "Cells use them for structure, energy and control."],
  table: { h: ["Biomolecule", "Building block", "Main role"], r: [["Carbohydrate", "Monosaccharide", "Energy, storage"], ["Protein", "Amino acid", "Structure, enzymes, transport"], ["Lipid", "Fatty acids and glycerol (for fats)", "Energy store, membranes"], ["Nucleic acid", "Nucleotide", "Genetic information"]] },
  ex: ["Ketosis in dairy cows is a disturbance of energy metabolism in early lactation.", "Raised blood urea can point to kidney problems or protein-related issues; a clinician interprets it with other findings."],
  exam: ["Define biochemistry.", "List the biomolecules.", "Importance of biochemistry in veterinary science."],
  myth: ["Biochemistry is not only memorising structures. It is about how those molecules work."],
  sa: [["What is the monomer of proteins?", "Amino acids."], ["Name two metabolic disorders of livestock.", "Ketosis and milk fever (hypocalcaemia)."]],
  la: [["Describe the major biomolecules and their importance in veterinary science.", "Name carbohydrates, proteins, lipids and nucleic acids with monomers and roles; add vitamins and minerals; give two clinical examples."]],
  mcq: [["The monomer of proteins is", ["Glucose", "Amino acid", "Fatty acid", "Nucleotide"], 1, "Proteins are polymers of amino acids."], ["Ketosis in dairy cows is an example of a", ["Metabolic disorder", "Viral disease", "Parasitic disease", "Genetic defect"], 0, "It results from disturbed energy metabolism."]],
  fb: [["The building block of nucleic acids is the ___.", "nucleotide"]],
  sum: "Biochemistry = chemistry of life. Four main biomolecules: carbohydrates, proteins, lipids, nucleic acids. Useful in diagnosis and metabolic disease.",
  fc: [["Monomer of carbohydrates?", "Monosaccharide"], ["Monomer of nucleic acids?", "Nucleotide"]], rel: ["b2", "b3"] },

{ id: "b2", s: "bioc", t: "Carbohydrates",
  obj: ["Define and classify carbohydrates", "Give examples of mono-, di- and polysaccharides", "Explain why ruminants can use cellulose"],
  intro: "Carbohydrates are the main energy source in most diets and include sugars, starch and cellulose.",
  simple: ["Carbohydrates are sugars and chains of sugars. Glucose is the most important one for energy.", "Plants store sugar as starch. Animals store it as glycogen in the liver and muscles.", "Cellulose, the plant fibre, cannot be digested by the animal's own enzymes. Cattle and sheep can use it because microbes in the rumen break it down."],
  detail: ["Carbohydrates are polyhydroxy aldehydes or ketones, or compounds that give these on hydrolysis. <b>Classification:</b> monosaccharides (glucose, fructose, galactose), disaccharides (sucrose = glucose + fructose; lactose = glucose + galactose; maltose = glucose + glucose) and polysaccharides (starch, glycogen, cellulose).", "Glucose is an aldose; fructose is a ketose. Reducing sugars include all common monosaccharides, maltose and lactose; sucrose is non-reducing.", "Glycogen is the storage polysaccharide in animals (liver and muscle). Cellulose has β-1,4 linkages, which mammalian enzymes cannot split; rumen microbes produce the enzymes that can."],
  defs: ["Carbohydrate: polyhydroxy aldehyde or ketone, or a compound that yields them on hydrolysis.", "Glycogen: a branched polymer of glucose stored in animals."],
  terms: [["Monosaccharide", "Simple sugar that cannot be hydrolysed further"], ["Disaccharide", "Two monosaccharides joined by a glycosidic bond"], ["Polysaccharide", "Many monosaccharides joined together"], ["Reducing sugar", "Sugar with a free aldehyde or ketone group able to reduce other compounds"]],
  steps: ["Starch is eaten.", "Amylase splits it into smaller sugars.", "Disaccharidases make glucose, fructose and galactose.", "Glucose is absorbed and used for energy or stored as glycogen."],
  table: { h: ["Type", "Examples", "Composition"], r: [["Monosaccharide", "Glucose, fructose, galactose", "Single sugar"], ["Disaccharide", "Sucrose, lactose, maltose", "Two sugars"], ["Polysaccharide", "Starch, glycogen, cellulose", "Many glucose units"]] },
  ex: ["Lactose is the sugar of milk.", "Young calves digest milk lactose well, and the ability changes as they grow."],
  exam: ["Classification of carbohydrates.", "Reducing vs non-reducing sugars.", "Storage polysaccharides."],
  myth: ["All sugars are not equally sweet or digestible. Cellulose is a carbohydrate but cannot be digested without microbes."],
  sa: [["What is glycogen?", "The storage polysaccharide of animals, found mainly in liver and muscle."], ["What is sucrose made of?", "Glucose and fructose."]],
  la: [["Classify carbohydrates with examples.", "Monosaccharides, disaccharides, polysaccharides with composition; aldoses/ketoses; reducing sugars; biological role; ruminant use of cellulose."]],
  mcq: [["Sucrose is composed of", ["Glucose + glucose", "Glucose + galactose", "Glucose + fructose", "Fructose + galactose"], 2, "Sucrose is glucose joined to fructose."], ["The storage polysaccharide in animals is", ["Starch", "Cellulose", "Glycogen", "Chitin"], 2, "Glycogen is stored in liver and muscle."]],
  fb: [["The milk sugar is ___.", "lactose"]],
  sum: "Mono: glucose, fructose, galactose. Di: sucrose, lactose, maltose. Poly: starch, glycogen, cellulose. Glycogen = animal storage. Ruminant microbes digest cellulose.",
  fc: [["Lactose?", "Glucose + galactose"], ["Maltose?", "Glucose + glucose"]], rel: ["b1", "b7"] },

{ id: "b3", s: "bioc", t: "Proteins",
  obj: ["Describe amino acids and the peptide bond", "Explain the four levels of protein structure", "State the functions of proteins and what denaturation is"],
  intro: "Proteins do most of the work in cells. They are chains of amino acids folded into precise three-dimensional shapes.",
  simple: ["Amino acids are linked like beads on a string. The link is called a peptide bond.", "The chain folds into a shape. The shape decides what the protein can do, so if the shape is lost, so is the function.", "Proteins make muscles and skin, carry oxygen, fight infection and act as enzymes."],
  detail: ["<b>Amino acids:</b> 20 standard ones. Essential amino acids cannot be made by the animal in sufficient amounts and must come from the diet. Cats, for example, need taurine in the diet.", "<b>Structure:</b> primary (amino acid sequence), secondary (α-helix, β-pleated sheet), tertiary (overall 3D fold), quaternary (several subunits, e.g. haemoglobin with four).", "<b>Classification:</b> simple proteins (albumin), conjugated proteins (haemoglobin is a chromoprotein; casein is a phosphoprotein) and derived proteins.", "<b>Functions:</b> structural (collagen, keratin), catalytic (enzymes), transport (haemoglobin, albumin), defence (immunoglobulins) and hormonal (insulin). <b>Denaturation</b> is loss of secondary, tertiary and quaternary structure by heat, pH or chemicals, without breaking peptide bonds."],
  defs: ["Peptide bond: the covalent bond between the carboxyl group of one amino acid and the amino group of the next.", "Denaturation: loss of the native 3D structure of a protein without hydrolysis of its peptide bonds."],
  terms: [["Essential amino acid", "Must be supplied by the diet"], ["Conjugated protein", "Protein joined to a non-protein group"], ["Quaternary structure", "Arrangement of several polypeptide subunits"]],
  steps: ["Amino acids are joined by peptide bonds.", "The chain forms helices and sheets (secondary).", "It folds into a 3D shape (tertiary).", "Some proteins combine subunits (quaternary)."],
  table: { h: ["Level", "Describes", "Held by"], r: [["Primary", "Amino acid sequence", "Peptide bonds"], ["Secondary", "α-helix, β-sheet", "Hydrogen bonds"], ["Tertiary", "Overall 3D fold", "Several bond types"], ["Quaternary", "Several chains together", "Non-covalent bonds"]] },
  ex: ["Cooking an egg denatures its proteins. The white turns solid.", "Cats are obligate carnivores and need taurine in their diet; deficiency is linked to heart and eye problems."],
  exam: ["Classification of proteins.", "Structure levels.", "Denaturation.", "Functions of proteins."],
  myth: ["Denaturation does not break the peptide bonds, so the amino acid sequence stays the same."],
  sa: [["What is a peptide bond?", "A covalent bond between the carboxyl group of one amino acid and the amino group of another."], ["Give two functions of proteins.", "Enzymes and transport, for example haemoglobin."]],
  la: [["Describe the structure and classification of proteins.", "Amino acids and peptide bond; primary to quaternary structure; simple, conjugated and derived proteins; functions; denaturation."]],
  mcq: [["Amino acids are linked by", ["Glycosidic bonds", "Peptide bonds", "Ester bonds", "Hydrogen bonds only"], 1, "Peptide bonds link amino acids."], ["Denaturation destroys", ["Peptide bonds", "Higher-order structure only", "Amino acid sequence", "Everything"], 1, "Secondary, tertiary and quaternary structure are lost; peptide bonds remain."]],
  fb: [["Haemoglobin has ___ structure because it has four subunits.", "quaternary"]],
  sum: "Protein = amino acids + peptide bonds. Four structural levels. Functions: structure, enzymes, transport, defence, hormones. Denaturation keeps peptide bonds.",
  fc: [["Essential amino acid?", "Needs to come from diet"], ["Primary structure?", "Sequence of amino acids"]], rel: ["b5", "p3"] },

{ id: "b4", s: "bioc", t: "Lipids",
  obj: ["Define lipids and classify them", "Distinguish saturated from unsaturated fatty acids", "List the functions of lipids"],
  intro: "Lipids are a varied group of compounds that do not dissolve in water but dissolve in organic solvents. Fats, oils, waxes and steroids are all lipids.",
  simple: ["Fat is the body's long-term energy store and gives more than twice as much energy per gram as carbohydrate.", "Lipids also form the membrane around every cell, insulate the body and make some hormones.", "Saturated fatty acids have no double bonds. Unsaturated ones have at least one."],
  detail: ["<b>Classification:</b> simple lipids (triglycerides, waxes), compound lipids (phospholipids, glycolipids, lipoproteins) and derived lipids (fatty acids, steroids including cholesterol).", "Triglycerides are glycerol esterified with three fatty acids. Essential fatty acids (linoleic and α-linolenic) must be supplied in the diet; cats also need arachidonic acid.", "<b>Functions:</b> energy storage (about 9 kcal per gram versus about 4 for carbohydrate and protein), insulation, membrane structure, steroid hormones and absorption of fat-soluble vitamins. <b>Lipoproteins</b> transport lipids in blood: chylomicrons, VLDL, LDL and HDL."],
  defs: ["Lipid: an organic compound insoluble in water and soluble in non-polar solvents.", "Triglyceride: glycerol bonded to three fatty acids."],
  terms: [["Saturated fatty acid", "No double bonds in the chain"], ["Unsaturated fatty acid", "One or more double bonds"], ["Phospholipid", "Main lipid of cell membranes"], ["Lipoprotein", "Lipid + protein complex that transports lipids"]],
  steps: ["Dietary fat is emulsified by bile.", "Lipase splits it into fatty acids and monoglycerides.", "These are absorbed and rebuilt into triglycerides.", "Triglycerides travel in chylomicrons."],
  table: { h: ["Class", "Examples", "Role"], r: [["Simple", "Fats, oils, waxes", "Energy storage, protection"], ["Compound", "Phospholipids, glycolipids", "Membranes"], ["Derived", "Cholesterol, steroids, fatty acids", "Hormones and precursors"]] },
  ex: ["Bile helps digest fat, so bile duct blockage affects fat digestion.", "Cholesterol is a precursor for steroid hormones and bile acids."],
  exam: ["Classification of lipids.", "Essential fatty acids.", "Functions of lipids.", "Lipoproteins."],
  myth: ["Cholesterol is not only harmful. It is necessary for membranes and hormones."],
  sa: [["Name the essential fatty acids.", "Linoleic and α-linolenic acids."], ["Which lipoprotein carries dietary fat from the gut?", "Chylomicrons."]],
  la: [["Classify lipids and describe their biological functions.", "Simple, compound, derived with examples; fatty acid types; functions; lipoproteins; clinical or nutritional example."]],
  mcq: [["Fat yields approximately how much energy per gram?", ["4 kcal", "7 kcal", "9 kcal", "2 kcal"], 2, "Fat is energy dense at about 9 kcal per gram."], ["Cholesterol is a", ["Protein", "Simple lipid", "Derived lipid (steroid)", "Carbohydrate"], 2, "Cholesterol is a steroid, a derived lipid."]],
  fb: [["The main lipid of cell membranes is the ___.", "phospholipid"]],
  sum: "Lipids: simple, compound, derived. About 9 kcal/g. Essential fatty acids. Lipoproteins carry lipids in blood.",
  fc: [["Triglyceride?", "Glycerol + 3 fatty acids"], ["Chylomicron?", "Lipoprotein that carries dietary fat"]], rel: ["b1", "b7"] },

{ id: "b5", s: "bioc", t: "Enzymes",
  obj: ["Define enzymes and explain how they work", "Name the factors that affect enzyme activity", "List the six enzyme classes"],
  intro: "Enzymes are biological catalysts, almost all of them proteins, that speed up chemical reactions in the body without being used up.",
  simple: ["Without enzymes, the body's reactions would be far too slow for life.", "An enzyme has a special pocket called the active site. The substrate fits into it, like a key in a lock.", "Heat, wrong pH or poisons can change the enzyme's shape, so it stops working."],
  detail: ["Enzymes lower the <b>activation energy</b> of reactions. The substrate binds at the <i>active site</i> (lock-and-key and induced-fit models). An enzyme may need a <i>cofactor</i> (metal ion) or <i>coenzyme</i> (organic molecule, often from a vitamin, e.g. NAD from niacin). The protein part alone is the <i>apoenzyme</i>; with its cofactor it is the <i>holoenzyme</i>.", "<b>Factors affecting activity:</b> temperature, pH, substrate concentration, enzyme concentration, and inhibitors. <i>Km</i> is the substrate concentration at half the maximum velocity (Vmax).", "<b>Classes:</b> oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases.", "<b>Clinical use:</b> raised levels of some enzymes in blood, such as creatine kinase, can suggest tissue injury, so clinicians use enzyme tests alongside clinical signs."],
  defs: ["Enzyme: a biological catalyst that increases the rate of a reaction without being consumed.", "Substrate: the molecule on which an enzyme acts.", "Km: the substrate concentration at which the reaction velocity is half of Vmax."],
  terms: [["Active site", "Region of the enzyme where the substrate binds"], ["Cofactor", "Non-protein helper, often a metal ion"], ["Coenzyme", "Organic cofactor, often derived from a vitamin"], ["Inhibitor", "Substance that lowers enzyme activity"]],
  steps: ["Substrate meets the active site.", "An enzyme–substrate complex forms.", "The reaction takes place.", "Products are released and the enzyme is free again."],
  table: { h: ["Class", "Reaction type"], r: [["Oxidoreductase", "Oxidation–reduction"], ["Transferase", "Transfer of a group"], ["Hydrolase", "Cleavage using water"], ["Lyase", "Removal of a group without water"], ["Isomerase", "Rearrangement within a molecule"], ["Ligase", "Joining using ATP"]] },
  ex: ["Lactase breaks lactose; some animals produce less of it after weaning.", "Amylase digests starch in the saliva of some species and in pancreatic juice."],
  exam: ["Define enzyme with properties.", "Factors affecting enzyme activity.", "Classification of enzymes.", "Cofactors and coenzymes."],
  myth: ["Enzymes are not used up in reactions. They are reused."],
  sa: [["What is an active site?", "The region of an enzyme where the substrate binds and the reaction occurs."], ["Name the six enzyme classes.", "Oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases."]],
  la: [["Describe the mechanism of enzyme action and factors affecting it.", "Activation energy, active site, lock-and-key vs induced fit, cofactors and coenzymes, temperature, pH, substrate concentration, inhibitors, Km."]],
  mcq: [["Enzymes work by lowering the", ["Temperature", "Activation energy", "Substrate concentration", "pH"], 1, "They lower the activation energy."], ["Hydrolases catalyse", ["Oxidation", "Hydrolysis", "Isomerisation", "Joining with ATP"], 1, "Hydrolases split bonds using water."]],
  fb: [["The protein part of an enzyme without its cofactor is the ___.", "apoenzyme"]],
  sum: "Enzymes = protein catalysts. Lower activation energy. Affected by temperature, pH, substrate and inhibitors. Six classes.",
  fc: [["Holoenzyme?", "Apoenzyme + cofactor"], ["Km?", "Substrate level at half Vmax"]], rel: ["b3", "b6"] },

{ id: "b6", s: "bioc", t: "Vitamins",
  obj: ["Classify vitamins", "State the main function and deficiency disease of key vitamins", "Explain species differences in vitamin needs"],
  intro: "Vitamins are organic compounds needed in small amounts for normal growth and metabolism. Most cannot be made in sufficient amounts by the animal itself.",
  simple: ["Vitamins are divided into fat-soluble (A, D, E, K) and water-soluble (B-complex and C).", "Each does a particular job. Vitamin D, for example, helps bones get calcium.", "Ruminants are lucky: microbes in the rumen make B vitamins and vitamin K for them."],
  detail: ["<b>Fat-soluble:</b> A (vision, epithelial health), D (calcium and phosphorus absorption), E (antioxidant), K (synthesis of clotting factors II, VII, IX, X). <b>Water-soluble:</b> B-complex (mostly coenzymes) and C (antioxidant, collagen formation).", "<b>Deficiency examples:</b> A: night blindness; D: rickets in young animals and osteomalacia in adults; E (with selenium): white muscle disease in calves and lambs; K: bleeding tendency; B1 (thiamine): polioencephalomalacia in ruminants; B12 needs cobalt in ruminants.", "<b>Species note:</b> most animals can make vitamin C; guinea pigs and primates cannot. Rumen microbes synthesise B vitamins and K, so adult ruminants usually need little of these in the diet under normal conditions."],
  defs: ["Vitamin: an organic nutrient required in small quantities for normal metabolism, which the body cannot make in adequate amounts.", "Avitaminosis: a disease caused by deficiency of a vitamin."],
  terms: [["Fat-soluble vitamin", "A, D, E, K; stored in body fat and liver"], ["Water-soluble vitamin", "B-complex and C; not stored much"], ["Rickets", "Poor mineralisation of bone in young animals"], ["Provitamin", "Precursor converted into a vitamin, e.g. β-carotene"]],
  steps: ["Vitamin is taken in or made by microbes.", "It is absorbed (fat-soluble ones with dietary fat).", "It acts as a coenzyme, antioxidant or regulator.", "Deficiency leads to a characteristic disorder."],
  table: { h: ["Vitamin", "Main function", "Deficiency (example)"], r: [["A", "Vision, epithelium", "Night blindness"], ["D", "Ca and P absorption", "Rickets, osteomalacia"], ["E", "Antioxidant", "Muscular dystrophy (with Se)"], ["K", "Clotting factors", "Haemorrhage"], ["B1", "Carbohydrate metabolism coenzyme", "Polioencephalomalacia in ruminants"], ["C", "Collagen formation", "Scurvy in guinea pigs"]] },
  ex: ["Vitamin K antagonist rodenticides cause bleeding because clotting factors cannot be made properly.", "Calves kept away from sunlight and without vitamin D supply can develop rickets."],
  exam: ["Classification and functions.", "Deficiency diseases.", "Species differences (vitamin C)."],
  myth: ["More vitamins do not always mean better health. Excess fat-soluble vitamins can be harmful."],
  sa: [["Which vitamin is needed for blood clotting?", "Vitamin K."], ["Which animals cannot synthesise vitamin C?", "Guinea pigs and primates."]],
  la: [["Classify vitamins and describe functions and deficiency diseases.", "Fat- and water-soluble groups; table of each vitamin with function and deficiency; species and rumen notes."]],
  mcq: [["Vitamin K is required for", ["Vision", "Blood clotting", "Bone growth", "Antioxidant function only"], 1, "Vitamin K helps synthesise clotting factors."], ["Which animal cannot synthesise vitamin C?", ["Dog", "Cattle", "Guinea pig", "Goat"], 2, "Guinea pigs lack the enzyme needed to make vitamin C."]],
  fb: [["Rickets in young animals is caused by a deficiency of vitamin ___.", "d"]],
  sum: "Fat-soluble: A, D, E, K. Water-soluble: B-complex, C. Know function and deficiency. Rumen microbes supply B vitamins and K.",
  fc: [["Vitamin D deficiency?", "Rickets, osteomalacia"], ["Vitamin E + Se deficiency?", "White muscle disease"]], rel: ["b5", "b7"] },

{ id: "b7", s: "bioc", t: "Introduction to Metabolism",
  obj: ["Define metabolism, anabolism and catabolism", "Outline glycolysis, TCA cycle and oxidative phosphorylation", "Explain gluconeogenesis and ketosis in simple terms"],
  intro: "Metabolism is the sum of all chemical reactions in the body. It releases energy from food and uses that energy to build and repair tissues.",
  simple: ["Catabolism breaks big molecules down and releases energy. Anabolism builds big molecules and uses energy.", "The energy is stored in a molecule called ATP, the cell's energy currency.", "Glucose is broken down step by step: glycolysis in the cytoplasm, then the TCA cycle and respiratory chain in the mitochondria."],
  detail: ["<b>Glycolysis</b> occurs in the cytoplasm: one glucose is converted to two pyruvate with a net gain of 2 ATP. Under aerobic conditions pyruvate enters the mitochondria as acetyl-CoA; under anaerobic conditions it becomes lactate.", "The <b>TCA (Krebs) cycle</b> occurs in the mitochondrial matrix and produces reduced coenzymes (NADH, FADH₂). <b>Oxidative phosphorylation</b> at the inner mitochondrial membrane uses these to make most of the ATP.", "<b>Gluconeogenesis</b> is synthesis of glucose from non-carbohydrate sources (lactate, glycerol, amino acids). Ruminants absorb little glucose from the gut and depend heavily on gluconeogenesis, mainly from propionate.", "When energy is short and fat is mobilised faster than it can be fully used, <b>ketone bodies</b> build up. This underlies ketosis in dairy cows and pregnancy toxaemia in sheep."],
  defs: ["Metabolism: the sum of all chemical reactions occurring in a living organism.", "Gluconeogenesis: the formation of glucose from non-carbohydrate precursors."],
  terms: [["ATP", "Adenosine triphosphate, the energy currency"], ["Anabolism", "Building up, uses energy"], ["Catabolism", "Breaking down, releases energy"], ["Ketone bodies", "Fuel molecules from fat breakdown in the liver"]],
  steps: ["Glucose → pyruvate (glycolysis, cytoplasm).", "Pyruvate → acetyl-CoA (mitochondria).", "Acetyl-CoA → TCA cycle.", "Electron transport chain and ATP production."],
  table: { h: ["Stage", "Location", "Main output"], r: [["Glycolysis", "Cytoplasm", "Pyruvate, 2 net ATP"], ["TCA cycle", "Mitochondrial matrix", "NADH, FADH₂, CO₂"], ["Oxidative phosphorylation", "Inner mitochondrial membrane", "Most ATP"]] },
  ex: ["High-yielding dairy cows in early lactation are at risk of ketosis because energy demand for milk is high.", "Ruminants rely on volatile fatty acids such as propionate made by rumen microbes."],
  exam: ["Glycolysis steps and energy yield.", "TCA cycle.", "Gluconeogenesis.", "Ketosis."],
  myth: ["Anaerobic glycolysis does not mean no energy. It makes a small amount quickly."],
  sa: [["Where does glycolysis occur?", "In the cytoplasm."], ["Define gluconeogenesis.", "Synthesis of glucose from non-carbohydrate sources such as lactate, glycerol and amino acids."]],
  la: [["Describe the metabolism of glucose.", "Glycolysis (location, net ATP), fate of pyruvate, TCA cycle, electron transport chain, ATP yield in outline, anaerobic path, gluconeogenesis."]],
  mcq: [["Glycolysis takes place in the", ["Mitochondrial matrix", "Cytoplasm", "Nucleus", "Lysosome"], 1, "Glycolysis is cytoplasmic."], ["Most ATP is produced by", ["Glycolysis", "Oxidative phosphorylation", "Gluconeogenesis", "Fermentation"], 1, "The electron transport chain and ATP synthase produce the majority of ATP."]],
  fb: [["The currency of energy in cells is ___.", "atp"]],
  sum: "Metabolism = anabolism + catabolism. Glucose → glycolysis → TCA → ETC. ATP is the energy currency. Gluconeogenesis keeps glucose in ruminants. Ketosis follows excess fat mobilisation.",
  fc: [["Net ATP from glycolysis?", "2"], ["Where is the TCA cycle?", "Mitochondrial matrix"]], rel: ["b2", "b4", "b6"] },

/* ===== PHARMACOLOGY (theory only, no doses) ===== */
{ id: "f1", s: "pharm", t: "Introduction to Pharmacology and Basic Terminology",
  obj: ["Define pharmacology and drug", "Know the main branches of pharmacology", "Use basic terms such as withdrawal period and contraindication correctly"],
  intro: "Pharmacology is the study of drugs and how they affect living systems. It forms the base for safe and rational treatment.",
  simple: ["A drug is any substance used to prevent, diagnose or treat disease, or to change how the body works.", "Pharmacology asks two questions. What does the body do to the drug? What does the drug do to the body?", "Species differ a lot. A drug that is safe in a dog can be dangerous in a cat. This is why veterinary dosing is always species-specific and decided by a veterinarian."],
  detail: ["<b>Drug</b> (WHO): any substance or product used to modify or explore physiological systems or pathological states for the benefit of the recipient. <b>Branches:</b> pharmacokinetics, pharmacodynamics, pharmacotherapeutics, toxicology, pharmacogenetics and clinical pharmacology.", "<b>Key terms:</b> <i>adverse effect</i> (unwanted, harmful), <i>side effect</i> (secondary effect, often unwanted), <i>contraindication</i> (a condition in which a drug should not be used), <i>drug interaction</i>, <i>therapeutic index</i>, <i>pharmacopoeia</i> (official book of drug standards), and <i>withdrawal period</i> (time that must pass between the last dose and the use of milk, meat or eggs from the animal).", "Species differences in metabolism matter: for instance, cats have limited glucuronidation capacity, which makes them more sensitive to some drugs.", "<b>Note:</b> this module gives theory only. Never use it to choose drugs or doses for a real animal."],
  defs: ["Pharmacology: the science of drugs and their interaction with living systems.", "Withdrawal period: the minimum time between the last drug administration and the harvest of milk, meat or eggs for human use.", "Contraindication: a situation in which a particular drug should not be used."],
  terms: [["Pharmacopoeia", "Official publication of drug standards"], ["Adverse effect", "Harmful, unintended response"], ["Drug interaction", "Change in a drug's effect due to another drug or food"], ["Toxicology", "Study of harmful effects of chemicals and poisons"]],
  steps: ["A drug is chosen by a veterinarian.", "It is given by a suitable route.", "The body absorbs, distributes, metabolises and excretes it.", "It acts at its target and produces effects."],
  table: { h: ["Branch", "Studies"], r: [["Pharmacokinetics", "What the body does to the drug"], ["Pharmacodynamics", "What the drug does to the body"], ["Pharmacotherapeutics", "Use of drugs to prevent and treat disease"], ["Toxicology", "Poisons and adverse effects"]] },
  ex: ["Milk from a treated cow must not enter the food chain until the withdrawal period ends.", "Some pain relievers safe in humans are toxic to cats."],
  exam: ["Definitions of drug and pharmacology.", "Branches of pharmacology.", "Terms: withdrawal period, contraindication, adverse effect."],
  myth: ["Natural does not mean safe. A plant-derived substance can be a drug or a poison."],
  sa: [["What is a withdrawal period?", "The time after the last drug dose before milk, meat or eggs can be used for human consumption."], ["Name two branches of pharmacology.", "Pharmacokinetics and pharmacodynamics."]],
  la: [["Define pharmacology and describe its branches.", "Definition; drug; pharmacokinetics, pharmacodynamics, pharmacotherapeutics, toxicology; key terms; importance of species differences and withdrawal periods."]],
  mcq: [["The study of what the body does to a drug is", ["Pharmacodynamics", "Pharmacokinetics", "Toxicology", "Pharmacy"], 1, "Pharmacokinetics covers absorption, distribution, metabolism and excretion."], ["The time to wait before using milk from a treated animal is the", ["Half-life", "Latent period", "Withdrawal period", "Lag phase"], 2, "It protects consumers from drug residues."]],
  fb: [["An official book of drug standards is a ___.", "pharmacopoeia"]],
  sum: "Pharmacology = drugs and their actions. PK = body acts on drug; PD = drug acts on body. Withdrawal periods protect food safety. Species differ.",
  fc: [["Contraindication?", "A condition in which a drug should not be used"], ["Toxicology?", "Study of poisons and harmful effects"]], rel: ["f2", "f3"] },

{ id: "f2", s: "pharm", t: "Drug Classification and Routes of Administration",
  obj: ["Classify drugs in several ways", "Describe the main routes of administration as a concept", "Compare routes by speed and features"],
  intro: "Drugs can be grouped by source, by body system, by chemical class or by use. The route of administration decides how fast and how completely a drug reaches the blood.",
  simple: ["Drugs can come from plants, animals, minerals, microbes or be made in a laboratory.", "They can also be grouped by what they do, for example antibiotics, pain relievers and dewormers.", "A drug can enter the body by mouth, by injection, through the skin or by inhalation. The route changes how quickly it works."],
  detail: ["<b>Classification:</b> by source (plant, animal, mineral, microbial, synthetic), by body system (e.g. CNS, cardiovascular), by therapeutic use (antimicrobials, analgesics, anthelmintics) and by chemical class.", "<b>Routes:</b> <i>enteral</i> (oral, rectal) and <i>parenteral</i> (intravenous, intramuscular, subcutaneous, intraperitoneal), plus <i>topical</i> and <i>inhalational</i>. Intravenous gives direct entry into circulation and complete (100%) bioavailability. Oral drugs may be subject to first-pass metabolism in the liver.", "In ruminants, orally given drugs mix with rumen contents and can be altered by rumen microbes, so ruminant oral drug behaviour differs from that in simple-stomached animals.", "This section is conceptual. The choice of route and any dose for an actual patient must come from a veterinarian."],
  defs: ["Route of administration: the path by which a drug is taken into the body.", "Parenteral: any route other than the alimentary canal, usually injection."],
  terms: [["Enteral", "Through the gastrointestinal tract"], ["Parenteral", "By injection, bypassing the gut"], ["First-pass effect", "Metabolism of a drug in the liver before it reaches general circulation"], ["Bioavailability", "Fraction of a dose reaching the circulation unchanged"]],
  steps: ["Choose a route according to the drug and animal (by the veterinarian).", "The drug enters the body.", "It reaches the blood at a speed depending on the route.", "Effect begins."],
  table: { h: ["Route", "Speed (relative)", "Features"], r: [["Intravenous", "Fastest", "100% bioavailability, no absorption step"], ["Intramuscular", "Fairly fast", "Depends on blood flow"], ["Subcutaneous", "Slower", "Absorption through skin tissue"], ["Oral", "Variable", "Convenient; first-pass effect"], ["Topical", "Mostly local", "Skin and mucous membranes"]] },
  ex: ["IV is used when immediate effect is needed.", "Topical preparations are used for local skin conditions."],
  exam: ["Classification of drugs.", "Routes of administration with advantages.", "First-pass metabolism."],
  myth: ["Oral is not always the best route. It depends on the drug and the situation."],
  sa: [["What is the first-pass effect?", "Metabolism of an orally absorbed drug in the liver before it reaches the general circulation."], ["Which route has 100% bioavailability?", "Intravenous."]],
  la: [["Describe the routes of drug administration.", "Enteral, parenteral, topical, inhalation; advantages and limitations; bioavailability; ruminant note."]],
  mcq: [["Bioavailability is 100% by the", ["Oral route", "Intramuscular route", "Intravenous route", "Topical route"], 2, "The IV route puts the drug directly in the circulation."], ["First-pass metabolism mainly follows which route?", ["Intravenous", "Oral", "Inhalation", "Intradermal"], 1, "Oral drugs pass through the liver via the portal circulation."]],
  fb: [["A route other than the gut, usually injection, is called ___.", "parenteral"]],
  sum: "Classify by source, system, use, chemistry. Routes: enteral, parenteral, topical, inhalation. IV = fastest, 100% bioavailability. Oral = first-pass.",
  fc: [["Enteral?", "Through the GI tract"], ["Parenteral?", "By injection"]], rel: ["f1", "f3"] },

{ id: "f3", s: "pharm", t: "Pharmacokinetics",
  obj: ["Describe absorption, distribution, metabolism and excretion", "Define half-life and bioavailability", "Understand why species differences affect drug handling"],
  intro: "Pharmacokinetics is what the body does to a drug over time: how it gets in, where it goes, how it is changed and how it leaves.",
  simple: ["Think of ADME: Absorption, Distribution, Metabolism, Excretion.", "The drug enters the blood (absorption), spreads to tissues (distribution), the liver changes it (metabolism), and it leaves, mainly through the kidneys (excretion).", "Half-life is the time the blood level takes to fall by half."],
  detail: ["<b>Absorption:</b> movement from the site of administration into blood; depends on route, solubility and blood flow. <b>Distribution:</b> movement from blood to tissues; affected by blood flow, plasma protein binding and tissue barriers. <b>Metabolism (biotransformation):</b> mainly in the liver; phase I reactions (oxidation, reduction, hydrolysis) and phase II (conjugation, e.g. glucuronidation). <b>Excretion:</b> mainly via kidneys; also bile, milk, lungs and sweat.", "<b>Half-life</b> is the time for plasma concentration to decrease by 50%. <b>Clearance</b> is the volume of plasma cleared of the drug per unit time.", "Excretion into milk is important in dairy animals. Cats have low glucuronidation, so drugs cleared by that route stay longer. Dosage decisions rely on these species differences, and must come from a veterinarian."],
  defs: ["Pharmacokinetics: the study of absorption, distribution, metabolism and excretion of drugs.", "Half-life: the time taken for the plasma concentration of a drug to fall by half."],
  terms: [["Biotransformation", "Chemical alteration of a drug in the body"], ["Clearance", "Rate of removal of a drug from plasma"], ["Protein binding", "Attachment of drug to plasma proteins, which limits free drug"], ["Excretion", "Removal of drug and metabolites from the body"]],
  steps: ["Absorption into blood.", "Distribution to tissues.", "Metabolism, mainly in the liver.", "Excretion, mainly by the kidneys."],
  table: { h: ["Step", "Main site", "Key idea"], r: [["Absorption", "Site of administration", "Route, solubility"], ["Distribution", "Blood and tissues", "Blood flow, protein binding"], ["Metabolism", "Liver", "Phase I and II reactions"], ["Excretion", "Kidney, bile, milk, lungs", "Clearance"]] },
  ex: ["A drug excreted in milk may require a withdrawal period in dairy animals.", "Kidney or liver disease changes drug handling, so a clinician adjusts therapy."],
  dia: "adme",
  exam: ["Define pharmacokinetics.", "ADME with examples.", "Half-life.", "Factors affecting absorption."],
  myth: ["The liver is not the only organ that clears drugs. Kidneys are central to excretion."],
  sa: [["What does ADME stand for?", "Absorption, Distribution, Metabolism, Excretion."], ["Define half-life.", "Time for the plasma concentration of a drug to decrease by 50%."]],
  la: [["Explain the pharmacokinetic processes.", "Define; absorption; distribution; metabolism phases I and II; excretion routes; half-life, bioavailability, clearance; species differences."]],
  mcq: [["The main organ of drug metabolism is the", ["Kidney", "Liver", "Lung", "Spleen"], 1, "The liver has most drug-metabolising enzymes."], ["Half-life is the time for plasma concentration to", ["Double", "Fall by half", "Reach zero", "Reach peak"], 1, "It is the time to decrease by 50%."]],
  fb: [["Chemical alteration of a drug in the body is called ___.", "biotransformation"]],
  sum: "ADME. Liver metabolises, kidney excretes. Half-life = time to fall by half. Species and organ disease change drug handling.",
  fc: [["Phase II reaction?", "Conjugation, e.g. glucuronidation"], ["Clearance?", "Rate of removal from plasma"]], rel: ["f2", "f4"] },

{ id: "f4", s: "pharm", t: "Pharmacodynamics and Drug–Receptor Concepts",
  obj: ["Define pharmacodynamics", "Explain agonists, antagonists and partial agonists", "Define potency, efficacy and therapeutic index"],
  intro: "Pharmacodynamics is what a drug does to the body: where it acts and how it produces its effect.",
  simple: ["Most drugs work by attaching to a receptor, a protein on or inside a cell.", "An agonist activates the receptor and gives a response. An antagonist sits on the receptor and blocks it, so no response occurs.", "The therapeutic index shows how wide the gap is between a useful and a harmful amount."],
  detail: ["<b>Receptors</b> are mainly proteins. Major types: ligand-gated ion channels, G-protein-coupled receptors, enzyme-linked receptors and intracellular (nuclear) receptors.", "<b>Terms:</b> <i>affinity</i> (tendency to bind), <i>efficacy</i> (ability to produce a response after binding), <i>potency</i> (amount needed for a given effect). An <i>agonist</i> has affinity and efficacy; an <i>antagonist</i> has affinity but no efficacy and blocks agonists; a <i>partial agonist</i> has lower efficacy.", "<b>Therapeutic index</b> = LD50 / ED50 (a larger value means a wider safety margin). Some drugs act without receptors, for example by enzyme inhibition, by acting as antimetabolites or by physical or chemical action (such as antacids).", "A dose–response curve shows how effect increases with drug concentration. This module is theory only and does not provide doses."],
  defs: ["Pharmacodynamics: the study of the biochemical and physiological effects of drugs and their mechanisms of action.", "Agonist: a drug that binds a receptor and activates it.", "Antagonist: a drug that binds a receptor and blocks the action of an agonist without activating it."],
  terms: [["Affinity", "Strength of attraction between drug and receptor"], ["Efficacy", "Ability of a drug to produce an effect once bound"], ["Potency", "Amount of drug needed for a given effect"], ["ED50 / LD50", "Dose effective in / lethal to 50% of animals"]],
  steps: ["The drug reaches the target tissue.", "It binds a receptor.", "The receptor changes and a signal begins in the cell.", "The cell responds and the drug effect is seen."],
  table: { h: ["Term", "Affinity", "Efficacy"], r: [["Agonist", "Yes", "Yes (full)"], ["Partial agonist", "Yes", "Lower"], ["Antagonist", "Yes", "None"]] },
  ex: ["Atropine blocks muscarinic receptors, an example of receptor antagonism.", "Antacids neutralise acid by direct chemical action, not through receptors."],
  exam: ["Receptor types.", "Agonist vs antagonist.", "Therapeutic index.", "Dose–response relationship."],
  myth: ["An antagonist does not 'do nothing'. It blocks the receptor, so normal agonist effects are prevented."],
  sa: [["Define therapeutic index.", "The ratio LD50/ED50, a measure of drug safety."], ["What is an antagonist?", "A drug that binds a receptor and blocks the action of an agonist, with no efficacy of its own."]],
  la: [["Explain drug–receptor interaction and the terms used.", "Receptors and types; affinity, efficacy, potency; agonist, partial agonist, antagonist; competitive antagonism; dose–response curve; therapeutic index; non-receptor mechanisms."]],
  mcq: [["Therapeutic index is calculated as", ["ED50 / LD50", "LD50 / ED50", "LD50 × ED50", "ED50 − LD50"], 1, "A higher ratio means a wider safety margin."], ["An antagonist has", ["Affinity and efficacy", "Efficacy only", "Affinity but no efficacy", "Neither"], 2, "It binds the receptor but produces no response."]],
  fb: [["The ability of a drug to produce an effect after binding is called ___.", "efficacy"]],
  sum: "PD = drug effect. Receptors: ion channel, GPCR, enzyme-linked, nuclear. Agonist = affinity + efficacy. Antagonist = affinity only. TI = LD50/ED50.",
  fc: [["Potency?", "Amount of drug needed for an effect"], ["Partial agonist?", "Binds but gives a smaller maximal response"]], rel: ["f3", "f1"] }
];

/* outline-only topics for subjects not expanded yet */
const OUTLINES = {
  micro: ["Introduction to microorganisms", "Bacteria", "Viruses", "Fungi", "Sterilization", "Disinfection", "Basic laboratory safety"],
  para: ["Introduction to parasitology", "Parasites and hosts", "Parasite classifications", "Basic life-cycle concepts", "Introductory prevention concepts"],
  path: ["Introduction to pathology", "Causes of disease", "Cell injury", "Inflammation", "Healing and repair"],
  nutr: ["Introduction to animal nutrition", "Carbohydrates", "Proteins", "Fats", "Vitamins", "Minerals", "Water and its functions"]
};
Object.keys(OUTLINES).forEach(sid => {
  const ids = [];
  OUTLINES[sid].forEach((t, i) => { const id = sid + (i + 1); TOPICS.push({ id, s: sid, t, stub: true }); ids.push(id); });
  UNITS[sid] = [["Outline only (not yet expanded)", ids]];
});
const T = {}; TOPICS.forEach(t => T[t.id] = t);
const ORDER = {}; SUBJECTS.forEach(s => { ORDER[s.id] = (UNITS[s.id] || []).reduce((a, u) => a.concat(u[1]), []); });
const hasContent = sid => ORDER[sid].some(id => !T[id].stub);

/* ---------- glossary ---------- */
const GLOSS = [
["Abomasum", "anat", "The fourth compartment of the ruminant stomach. It is the glandular 'true stomach' that secretes acid and pepsin."],
["Abduction", "anat", "Movement of a limb away from the median plane."],
["Adduction", "anat", "Movement of a limb towards the median plane."],
["Agonist", "pharm", "A drug that binds a receptor and activates it to produce a response."],
["Albumin", "phys", "The most abundant plasma protein. It maintains osmotic pressure and carries many substances."],
["Anabolism", "bioc", "The building up of complex molecules from simpler ones, using energy."],
["Antagonist", "pharm", "A drug that binds a receptor and blocks the action of an agonist."],
["Anthelmintic", "pharm", "A drug that kills or expels parasitic worms."],
["Apoenzyme", "bioc", "The protein part of an enzyme without its cofactor."],
["Bioavailability", "pharm", "The fraction of a dose that reaches the systemic circulation unchanged."],
["Cardiac output", "phys", "The volume of blood pumped by each ventricle per minute (heart rate × stroke volume)."],
["Catabolism", "bioc", "The breakdown of complex molecules to release energy."],
["Caudal", "anat", "Towards the tail."],
["Cofactor", "bioc", "A non-protein substance, often a metal ion, needed for an enzyme to work."],
["Coenzyme", "bioc", "An organic cofactor, often derived from a vitamin."],
["Contraindication", "pharm", "A condition in which a particular drug should not be used."],
["Cranial", "anat", "Towards the head."],
["Denaturation", "bioc", "Loss of the native 3D structure of a protein without breaking peptide bonds."],
["Diaphysis", "anat", "The shaft of a long bone."],
["Diastole", "phys", "The relaxation and filling phase of the cardiac cycle."],
["Distal", "anat", "Farther from the point of attachment, for example towards the foot on a limb."],
["Dorsal", "anat", "Towards the back."],
["Epiphysis", "anat", "The end of a long bone."],
["Erythrocyte", "phys", "Red blood cell. It carries oxygen using haemoglobin."],
["Fibrinogen", "phys", "A plasma protein converted to fibrin during blood clotting."],
["Gluconeogenesis", "bioc", "Formation of glucose from non-carbohydrate sources."],
["Glycogen", "bioc", "A branched polymer of glucose stored in liver and muscle of animals."],
["Glycolysis", "bioc", "Breakdown of glucose to pyruvate in the cytoplasm, giving a net 2 ATP."],
["Haemoglobin", "phys", "The iron-containing protein in red cells that carries oxygen."],
["Haemopoiesis", "phys", "The formation of blood cells, mainly in red bone marrow in adults."],
["Half-life", "pharm", "The time taken for the plasma concentration of a drug to fall by half."],
["Histology", "anat", "The study of tissues under the microscope."],
["Homeostasis", "phys", "Maintenance of a relatively stable internal environment."],
["Intercalated disc", "anat", "A junction between cardiac muscle cells that lets impulses pass rapidly."],
["Ketosis", "bioc", "A condition with raised ketone bodies, seen when energy demand exceeds supply (e.g. dairy cows in early lactation)."],
["Lateral", "anat", "Away from the median plane."],
["Leucocyte", "phys", "White blood cell, involved in defence."],
["Ligament", "anat", "A dense fibrous band that connects bone to bone."],
["Medial", "anat", "Towards the median plane."],
["Metabolism", "bioc", "The sum of all chemical reactions in an organism."],
["Median plane", "anat", "The plane that divides the body into equal right and left halves."],
["Negative feedback", "phys", "A response that opposes the original change and keeps a variable stable."],
["Palmar", "anat", "The back surface of the forefoot below the carpus."],
["Pathogen", "path", "A microorganism capable of causing disease."],
["Peptide bond", "bioc", "The covalent bond that joins amino acids in a protein."],
["Pharmacokinetics", "pharm", "What the body does to a drug: absorption, distribution, metabolism, excretion."],
["Pharmacodynamics", "pharm", "What a drug does to the body and how it acts."],
["Plantar", "anat", "The back surface of the hindfoot below the tarsus."],
["Platelet", "phys", "A cell fragment involved in blood clotting (thrombocytes in birds)."],
["Positive feedback", "phys", "A response that amplifies the original change until an end point is reached."],
["Proximal", "anat", "Nearer to the point of attachment, for example nearer the body on a limb."],
["Rostral", "anat", "Towards the nose, used for the head."],
["Rumen", "anat", "The largest compartment of the ruminant stomach, where microbes ferment feed."],
["Serum", "phys", "The fluid left after blood clots; plasma without clotting factors."],
["Sesamoid bone", "anat", "A bone that develops within a tendon, for example the patella."],
["Synovial fluid", "anat", "The lubricating fluid inside synovial joints."],
["Systole", "phys", "The contraction and ejection phase of the cardiac cycle."],
["Tendon", "anat", "A dense fibrous cord connecting muscle to bone."],
["Therapeutic index", "pharm", "The ratio LD50/ED50, a measure of drug safety."],
["Ventral", "anat", "Towards the belly."],
["Vitamin", "bioc", "An organic nutrient needed in small amounts that the body cannot make in adequate amounts."],
["Withdrawal period", "pharm", "Time that must pass after the last drug dose before milk, meat or eggs may be used for food."],
["Zoonosis", "pubh", "A disease that can pass naturally between animals and humans, for example rabies."]
].sort((a, b) => a[0].localeCompare(b[0]));

/* ---------- small helpers ---------- */
const ul = a => "<ul>" + a.map(x => "<li>" + x + "</li>").join("") + "</ul>";
const ol = a => "<ol>" + a.map(x => "<li>" + x + "</li>").join("") + "</ol>";
function tbl(t) { return '<div class="tablewrap"><table><thead><tr>' + t.h.map(h => "<th>" + h + "</th>").join("") + "</tr></thead><tbody>" + t.r.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>"; }
function sec(title, body, open) { return '<details class="sec"' + (open === false ? "" : " open") + "><summary>" + title + '</summary><div class="secbody">' + body + "</div></details>"; }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function today() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
const tLink = id => T[id] ? '<a href="#reader/' + id + '">' + T[id].t + "</a>" : "";
const subjOptions = (all, contentOnly) => (all ? '<option value="">All subjects</option>' : "") + SUBJECTS.filter(s => !contentOnly || hasContent(s.id)).map(s => '<option value="' + s.id + '">' + s.name + "</option>").join("");
const ready = t => !t.stub;

/* ---------- router ---------- */
let curId = null;
const routes = { home: renderHome, subjects: renderSubjects, subject: renderSubject, reader: renderReader, quiz: renderQuiz, exam: renderExam, flash: renderFlash, glossary: renderGlossary, planner: renderPlanner, space: renderSpace, intern: renderIntern, refs: function () { } };
function route() {
  const parts = location.hash.replace("#", "").split("/");
  if (parts[0] === "main") return;
  const name = routes[parts[0]] ? parts[0] : "home";
  $$(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + name));
  $$("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + name || (name === "subject" && a.getAttribute("href") === "#subjects") || (name === "reader" && a.getAttribute("href") === "#subjects")));
  document.body.classList.remove("focus");
  $("#nav").classList.remove("open");
  $("#menuBtn").setAttribute("aria-expanded", "false");
  routes[name](parts[1]);
  window.scrollTo(0, 0);
}

/* ---------- home ---------- */
function renderHome() {
  const last = S.last && T[S.last] ? S.last : null;
  $("#hContinue").innerHTML = last ? '<p>' + tLink(last) + '<br><span class="meta">' + SUBJ[T[last].s].name + '</span></p><a class="btn small" href="#reader/' + last + '">Continue</a>' : '<p class="empty">Nothing yet. Open a subject and start with any topic.</p><a class="btn small" href="#subjects">Browse subjects</a>';
  $("#readBtn").setAttribute("href", "#reader/" + (last || "a1"));
  const list = (ids, empty) => { ids = ids.filter(id => T[id]); return ids.length ? '<ul class="list">' + ids.slice(0, 5).map(id => "<li>" + tLink(id) + "</li>").join("") + "</ul>" : '<p class="empty">' + empty + "</p>"; };
  $("#hRecent").innerHTML = list(S.recent, "Topics you open will show up here.");
  $("#hBook").innerHTML = list(S.bm, "Tap ☆ Bookmark inside any topic.");
  $("#hDone").innerHTML = S.done.filter(id => T[id]).length ? '<p><b>' + S.done.filter(id => T[id]).length + "</b> completed</p>" + list(S.done, "") : '<p class="empty">Mark a topic as completed when you finish it.</p>';
  const td = S.tasks.filter(x => x.due === today() && !x.done);
  $("#hTasks").innerHTML = td.length ? '<ul class="list">' + td.map(x => "<li>" + esc(x.text) + "</li>").join("") + "</ul>" : '<p class="empty">No tasks due today.</p><a class="btn small ghost" href="#planner">Open planner</a>';
}

/* ---------- subjects ---------- */
let yearTab = "all";
const YEARS = [["all", "All subjects"], ["y1", "Year 1"], ["y2", "Year 2"], ["y3", "Year 3"], ["y4", "Year 4"], ["int", "Internship"]];
function renderSubjects() {
  $("#yearTabs").innerHTML = YEARS.map(y => '<button data-y="' + y[0] + '" class="' + (y[0] === yearTab ? "on" : "") + '">' + y[1] + "</button>").join("");
  drawSubjects();
}
function drawSubjects() {
  const q = $("#subSearch").value.trim().toLowerCase();
  let list = SUBJECTS.filter(s => (s.name + " " + s.blurb).toLowerCase().includes(q));
  if (yearTab !== "all") list = list.filter(s => S.pins[s.id] === yearTab);
  if (!list.length) { $("#subGrid").innerHTML = '<p class="empty">' + (yearTab !== "all" ? "No subjects pinned to this year yet. Go to 'All subjects' and use 'Pin to year' on a card. Placement differs between syllabus versions, so you decide." : "No subject matches your search.") + "</p>"; return; }
  $("#subGrid").innerHTML = list.map(s => {
    const n = ORDER[s.id].filter(id => ready(T[id])).length, o = ORDER[s.id].length;
    const status = n ? '<span class="tag">' + n + " introductory topics ready</span>" : o ? '<span class="tag off">Outline only</span>' : '<span class="tag off">Not yet added</span>';
    return '<article class="card subj-card"><div class="icon">' + s.icon + "</div><h3>" + s.name + '</h3><p class="meta">' + s.blurb + "</p>" + status + '<div class="row"><a class="btn small" href="#subject/' + s.id + '">Open</a></div><label class="meta">Pin to year<select data-pin="' + s.id + '"><option value="">General library</option>' + YEARS.slice(1).map(y => '<option value="' + y[0] + '"' + (S.pins[s.id] === y[0] ? " selected" : "") + ">" + y[1] + "</option>").join("") + "</select></label></article>";
  }).join("");
}
function drawTopicSearch() {
  const q = $("#topicSearch").value.trim().toLowerCase(), box = $("#topicRes");
  if (!q) { box.hidden = true; return; }
  const hits = TOPICS.filter(t => t.t.toLowerCase().includes(q));
  box.hidden = false;
  box.innerHTML = hits.length ? "<h3>Topics</h3>" + '<ul class="list">' + hits.map(t => "<li>" + tLink(t.id) + '<span class="meta">' + SUBJ[t.s].name + (t.stub ? " · outline" : "") + "</span></li>").join("") + "</ul>" : '<p class="empty">No topic found.</p>';
}
function renderSubject(sid) {
  const s = SUBJ[sid], box = $("#subjectView");
  if (!s) { box.innerHTML = '<p class="empty">Subject not found. <a href="#subjects">Back</a></p>'; return; }
  const units = UNITS[sid] || [];
  let h = '<nav class="crumbs"><a href="#subjects">Subjects</a> › ' + s.name + "</nav><h1>" + s.icon + " " + s.name + "</h1><p>" + s.blurb + '</p><p class="notice">Introductory learning modules only. They are not the complete official syllabus. Please verify the curriculum and examination requirements against your current college syllabus.</p>';
  if (hasContent(sid)) h += '<div class="row"><a class="btn" href="#quiz/' + sid + '">Practise MCQs</a><a class="btn ghost" href="#exam">Exam prep</a></div>';
  if (!units.length) h += '<p class="empty">No topics added yet for this subject. Units and topics can be added in script.js.</p>';
  units.forEach(u => {
    h += '<div class="card"><h3>' + u[0] + '</h3><ul class="list">' + u[1].map(id => { const t = T[id]; return "<li><span>" + (S.done.includes(id) ? '<span class="ok">✓</span> ' : "") + (S.bm.includes(id) ? "★ " : "") + tLink(id) + '</span><span class="tag ' + (t.stub ? "off" : "") + '">' + (t.stub ? "outline only" : "introductory") + "</span></li>"; }).join("") + "</ul></div>";
  });
  box.innerHTML = h;
}

/* ---------- reader ---------- */
function renderReader(id) {
  const box = $("#reader"), t = T[id];
  if (!t) { box.innerHTML = '<p class="empty">Topic not found. <a href="#subjects">Back to subjects</a></p>'; return; }
  curId = id;
  S.last = id; S.recent = [id].concat(S.recent.filter(x => x !== id)).slice(0, 8); save();
  box.style.setProperty("--fs", S.fs + "px");
  const ord = ORDER[t.s], pos = ord.indexOf(id), prev = ord[pos - 1], next = ord[pos + 1];
  let h = '<button class="btn small focus-exit" data-act="focus">Exit focus mode</button>';
  h += '<nav class="crumbs"><a href="#subjects">Subjects</a> › <a href="#subject/' + t.s + '">' + SUBJ[t.s].name + "</a> › " + t.t + "</nav><h1>" + t.t + '</h1><p class="meta">' + SUBJ[t.s].icon + " " + SUBJ[t.s].name + " · " + (t.stub ? "Outline only, not yet expanded" : "Introductory learning module") + "</p>";
  h += '<div class="tools no-focus"><button data-act="simple" class="' + (S.mode === "simple" ? "on" : "") + '">Explain it simply</button><button data-act="detail" class="' + (S.mode === "detail" ? "on" : "") + '">Detailed notes</button><button data-act="fsdown" aria-label="Smaller text">A−</button><button data-act="fsup" aria-label="Larger text">A+</button><button data-act="focus">Focus mode</button><button data-act="bm">' + (S.bm.includes(id) ? "★ Bookmarked" : "☆ Bookmark") + '</button><button data-act="done">' + (S.done.includes(id) ? "✓ Completed" : "Mark completed") + '</button><input id="inTopic" type="search" placeholder="Search in this topic…" aria-label="Search in this topic"></div><p id="inMsg" class="meta"></p>';
  h += '<div class="body">';
  if (t.stub) {
    h += '<p class="notice">This topic is only an outline for now. The study material has not been written yet. You can still keep personal notes below. To add content, copy a full topic object in script.js and fill it in.</p>';
  } else {
    h += sec("Learning objectives", ul(t.obj));
    h += sec("Introduction", "<p>" + t.intro + "</p>");
    h += sec(S.mode === "simple" ? "Explanation (simple)" : "Explanation (detailed study notes)", (S.mode === "simple" ? t.simple : t.detail).map(p => "<p>" + p + "</p>").join(""));
    h += sec("Scientific definitions", ul(t.defs));
    h += sec("Important terminology", tbl({ h: ["Term", "Meaning"], r: t.terms }));
    h += sec("Step by step", ol(t.steps));
    h += sec("Classification and comparison", tbl(t.table));
    h += sec("Veterinary examples", ul(t.ex));
    if (t.dia) h += sec("Diagram", '<figure class="figure">' + DIA[t.dia].svg + "<figcaption>" + DIA[t.dia].cap + "</figcaption></figure>");
    h += sec("Important examination points", ul(t.exam));
    h += sec("Common misconceptions", ul(t.myth));
    h += sec("Short-answer questions (practice)", t.sa.map(q => "<p><b>Q.</b> " + q[0] + "</p><details><summary>Show answer</summary><p>" + q[1] + "</p></details>").join(""), false);
    h += sec("Long-answer questions (practice)", t.la.map(q => "<p><b>Q.</b> " + q[0] + "</p><details><summary>Show answer outline</summary><p>" + q[1] + "</p></details>").join(""), false);
    h += sec("MCQs (practice)", t.mcq.map((m, i) => '<div class="mcq" data-i="' + i + '"><p><b>' + (i + 1) + ".</b> " + m[0] + "</p>" + m[1].map((o, k) => '<button class="opt" data-k="' + k + '">' + o + "</button>").join("") + '<p class="exp" hidden><b>Answer:</b> ' + m[1][m[2]] + ". " + m[3] + "</p></div>").join(""), false);
    h += sec("Fill in the blanks", t.fb.map(f => '<p>' + f[0].replace("___", '<input class="fbin" size="12" data-ans="' + f[1] + '" aria-label="Answer"> <button class="btn small ghost" data-act="fbcheck">Check</button> <span class="fbres"></span>') + "</p>").join(""), false);
    h += sec("Quick revision summary", "<p>" + t.sum + "</p>");
    h += sec("Flashcards (tap to flip)", t.fc.map(f => '<button class="fc"><span class="f">' + f[0] + '</span><span class="b" hidden>' + f[1] + "</span></button>").join(""), false);
    h += sec("Related topics", ul(t.rel.map(tLink)));
  }
  h += "</div>";
  h += '<details class="sec" open><summary>My notes (saved on this device)</summary><div class="secbody"><textarea id="noteBox" rows="5" placeholder="Write your own notes here…" aria-label="My notes">' + esc(S.notes[id] || "") + '</textarea><div class="row"><button class="btn small" data-act="savenote">Save note</button><button class="btn small ghost" data-act="delnote">Delete note</button><span id="noteMsg" class="meta"></span></div><p class="meta">Notes stay in this browser only. They do not sync to other devices.</p></div></details>';
  h += '<div class="nav2 no-focus">' + (prev ? '<a class="btn ghost" href="#reader/' + prev + '">← ' + T[prev].t + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="#reader/' + next + '">' + T[next].t + " →</a>" : "<span></span>") + "</div>";
  box.innerHTML = h;
}
function readerClick(e) {
  const box = $("#reader");
  const opt = e.target.closest(".opt"), fc = e.target.closest(".fc"), b = e.target.closest("[data-act]");
  if (opt && opt.parentNode.classList.contains("mcq")) {
    const q = opt.parentNode, m = T[curId].mcq[+q.dataset.i], k = +opt.dataset.k;
    if (q.dataset.done) return;
    q.dataset.done = "1";
    $$(".opt", q).forEach((o, j) => { o.disabled = true; if (j === m[2]) o.classList.add("right"); else if (j === k) o.classList.add("wrong"); });
    $(".exp", q).hidden = false;
    return;
  }
  if (fc) { $(".f", fc).hidden = !$(".f", fc).hidden; $(".b", fc).hidden = !$(".b", fc).hidden; return; }
  if (!b) return;
  const a = b.dataset.act;
  if (a === "simple" || a === "detail") { const tmp = $("#noteBox").value; S.mode = a; save(); renderReader(curId); $("#noteBox").value = tmp; }
  else if (a === "fsup" || a === "fsdown") { S.fs = Math.max(15, Math.min(26, S.fs + (a === "fsup" ? 1 : -1))); save(); box.style.setProperty("--fs", S.fs + "px"); }
  else if (a === "focus") document.body.classList.toggle("focus");
  else if (a === "bm") { S.bm = S.bm.includes(curId) ? S.bm.filter(x => x !== curId) : S.bm.concat(curId); save(); b.textContent = S.bm.includes(curId) ? "★ Bookmarked" : "☆ Bookmark"; }
  else if (a === "done") { S.done = S.done.includes(curId) ? S.done.filter(x => x !== curId) : S.done.concat(curId); save(); b.textContent = S.done.includes(curId) ? "✓ Completed" : "Mark completed"; }
  else if (a === "savenote") { const v = $("#noteBox").value.trim(); if (v) S.notes[curId] = v; else delete S.notes[curId]; save(); $("#noteMsg").textContent = storageOK ? "Saved." : "Could not save: browser storage is blocked."; }
  else if (a === "delnote") { delete S.notes[curId]; save(); $("#noteBox").value = ""; $("#noteMsg").textContent = "Note deleted."; }
  else if (a === "fbcheck") { const inp = b.parentNode.querySelector(".fbin"), r = b.parentNode.querySelector(".fbres"), ok = inp.value.trim().toLowerCase() === inp.dataset.ans.toLowerCase(); r.textContent = ok ? "Correct" : "Not quite. Answer: " + inp.dataset.ans; r.className = "fbres " + (ok ? "ok" : "late"); }
}
function readerInput(e) {
  if (e.target.id !== "inTopic") return;
  const q = e.target.value.trim().toLowerCase();
  let n = 0;
  $$("#reader .body > details.sec").forEach(d => { const hit = !q || d.textContent.toLowerCase().includes(q); d.hidden = !hit; if (hit && q) { d.open = true; n++; } });
  $("#inMsg").textContent = q ? n + " section(s) match." : "";
}

/* ---------- quiz ---------- */
const Q = { filter: "", pool: [], i: 0, score: 0, wrong: [], locked: false, opts: [] };
function mcqPool(f) {
  const out = [];
  TOPICS.forEach(t => { if (!t.mcq) return; if (f && f !== t.s && f !== t.id) return; t.mcq.forEach(m => out.push({ q: m[0], o: m[1], a: m[2], e: m[3], t: t.id })); });
  return out;
}
function renderQuiz(arg) {
  $("#qzSubj").innerHTML = '<option value="">All subjects (' + mcqPool("").length + ")</option>" + SUBJECTS.filter(s => mcqPool(s.id).length).map(s => '<option value="' + s.id + '">' + s.name + " (" + mcqPool(s.id).length + ")</option>").join("");
  $("#qzMsg").textContent = "";
  if (arg && (SUBJ[arg] || T[arg])) { startQuiz(arg); return; }
  $("#qzSetup").hidden = false; $("#qzPlay").hidden = true; $("#qzEnd").hidden = true;
}
function startQuiz(f, list) {
  Q.filter = f || ""; Q.pool = shuffle(list || mcqPool(f)); Q.i = 0; Q.score = 0; Q.wrong = [];
  if (!Q.pool.length) { $("#qzSetup").hidden = false; $("#qzPlay").hidden = true; $("#qzEnd").hidden = true; $("#qzMsg").textContent = "No questions available for that choice yet."; return; }
  $("#qzSetup").hidden = true; $("#qzEnd").hidden = true; $("#qzPlay").hidden = false;
  showQ();
}
function showQ() {
  const q = Q.pool[Q.i];
  Q.opts = shuffle(q.o.map((t, k) => ({ t: t, ok: k === q.a }))); Q.locked = false;
  $("#qzPlay").innerHTML = '<p class="meta">Question ' + (Q.i + 1) + " of " + Q.pool.length + " · Score " + Q.score + "</p><h2>" + q.q + '</h2><div class="opts">' + Q.opts.map((o, k) => '<button class="opt" data-k="' + k + '">' + o.t + "</button>").join("") + '</div><div id="qzFb"></div>';
}
function quizPlayClick(e) {
  const o = e.target.closest(".opt");
  if (o && !Q.locked) {
    Q.locked = true;
    const k = +o.dataset.k, q = Q.pool[Q.i], good = Q.opts[k].ok;
    $$("#qzPlay .opt").forEach((b, j) => { b.disabled = true; if (Q.opts[j].ok) b.classList.add("right"); else if (j === k) b.classList.add("wrong"); });
    if (good) Q.score++; else Q.wrong.push(q);
    $("#qzFb").innerHTML = '<p class="exp"><b>' + (good ? "Correct." : "Not quite.") + "</b> " + q.e + '</p><button class="btn" id="qzNext">' + (Q.i + 1 >= Q.pool.length ? "See results" : "Next question") + "</button>";
    return;
  }
  if (e.target.id === "qzNext") { Q.i++; if (Q.i >= Q.pool.length) showEnd(); else showQ(); }
}
function showEnd() {
  $("#qzPlay").hidden = true; $("#qzEnd").hidden = false;
  const pct = Math.round(Q.score / Q.pool.length * 100);
  $("#qzEnd").innerHTML = "<h2>Your result</h2><p><b>" + Q.score + " / " + Q.pool.length + "</b> (" + pct + "%)</p><p class='meta'>" + (Q.wrong.length ? Q.wrong.length + " question(s) to revisit." : "No mistakes this time.") + '</p><div class="row">' + (Q.wrong.length ? '<button class="btn" id="qzRetry">Retry missed questions</button>' : "") + '<button class="btn ghost" id="qzAgain">Restart</button><button class="btn ghost" id="qzNew">Change subject</button></div>';
}
function quizEndClick(e) {
  if (e.target.id === "qzRetry") startQuiz(Q.filter, Q.wrong.slice());
  else if (e.target.id === "qzAgain") startQuiz(Q.filter);
  else if (e.target.id === "qzNew") { $("#qzEnd").hidden = true; $("#qzSetup").hidden = false; }
}

/* ---------- exam prep ---------- */
let exType = "def";
function renderExam() {
  if (!$("#exSubj").options.length) { $("#exSubj").innerHTML = subjOptions(false, true); fillExTopics(); }
  drawExam();
}
function fillExTopics() {
  const sid = $("#exSubj").value;
  $("#exTopic").innerHTML = '<option value="">All topics in this subject</option>' + ORDER[sid].filter(id => ready(T[id])).map(id => '<option value="' + id + '">' + T[id].t + "</option>").join("");
}
function drawExam() {
  const sid = $("#exSubj").value, tid = $("#exTopic").value;
  const topics = (tid ? [tid] : ORDER[sid]).map(id => T[id]).filter(ready);
  let h = "";
  if (exType === "mcq") h = '<p>' + mcqPool(tid || sid).length + ' practice questions are ready.</p><a class="btn" href="#quiz/' + (tid || sid) + '">Start MCQs</a>';
  else if (exType === "fc") h = '<a class="btn" href="#flash">Open flashcards</a>';
  else topics.forEach(t => {
    h += "<h3>" + t.t + "</h3>";
    if (exType === "def") h += ul(t.defs);
    if (exType === "sa") h += t.sa.map(q => "<p><b>Q.</b> " + q[0] + "</p><details><summary>Show answer</summary><p>" + q[1] + "</p></details>").join("");
    if (exType === "la") h += t.la.map(q => "<p><b>Q.</b> " + q[0] + "</p><details><summary>Show answer outline</summary><p>" + q[1] + "</p></details>").join("");
    if (exType === "fb") h += t.fb.map(f => "<p>" + f[0].replace("___", '<input class="fbin" size="12" data-ans="' + f[1] + '" aria-label="Answer"> <button class="btn small ghost" data-act="fbcheck">Check</button> <span class="fbres"></span>') + "</p>").join("");
  });
  $("#exOut").innerHTML = h || '<p class="empty">No questions yet.</p>';
}

/* ---------- flashcards ---------- */
const F = { deck: [], i: 0, back: false };
function renderFlash() {
  if (!$("#flSubj").options.length) $("#flSubj").innerHTML = subjOptions(true, true);
  buildDeck(false);
}
function buildDeck(shuf) {
  const sid = $("#flSubj").value;
  let d = [];
  TOPICS.forEach(t => { if (t.fc && (!sid || sid === t.s)) t.fc.forEach(c => d.push({ f: c[0], b: c[1], t: t.t })); });
  F.deck = shuf ? shuffle(d) : d; F.i = 0; F.back = false; drawCard();
}
function drawCard() {
  const c = F.deck[F.i], el = $("#flCard");
  if (!c) { el.textContent = "No flashcards for this choice."; $("#flCount").textContent = ""; return; }
  el.textContent = F.back ? c.b : c.f;
  el.classList.toggle("back", F.back);
  $("#flCount").textContent = (F.i + 1) + " / " + F.deck.length + " · " + c.t;
}

/* ---------- glossary ---------- */
let gLetter = "";
function renderGlossary() {
  if (!$("#gSubj").options.length) {
    const used = new Set(GLOSS.map(g => g[1]));
    $("#gSubj").innerHTML = '<option value="">All subjects</option>' + SUBJECTS.filter(s => used.has(s.id)).map(s => '<option value="' + s.id + '">' + s.name + "</option>").join("");
    const letters = Array.from(new Set(GLOSS.map(g => g[0][0].toUpperCase()))).sort();
    $("#gLetters").innerHTML = '<button data-l="" class="on">All</button>' + letters.map(l => '<button data-l="' + l + '">' + l + "</button>").join("");
  }
  drawGlossary();
}
function drawGlossary() {
  const q = $("#gSearch").value.trim().toLowerCase(), sid = $("#gSubj").value;
  const list = GLOSS.filter(g => (!sid || g[1] === sid) && (!gLetter || g[0][0].toUpperCase() === gLetter) && (!q || (g[0] + " " + g[2]).toLowerCase().includes(q)));
  $("#gCount").textContent = list.length + " of " + GLOSS.length + " terms";
  $("#gList").innerHTML = list.length ? list.map(g => '<div class="card term"><div><h3 style="margin:0">' + g[0] + ' <span class="tag">' + SUBJ[g[1]].name + "</span></h3><p>" + g[2] + '</p></div><button class="star" data-g="' + esc(g[0]) + '" aria-label="Bookmark ' + esc(g[0]) + '">' + (S.gbm.includes(g[0]) ? "★" : "☆") + "</button></div>").join("") : '<p class="empty">No term matches.</p>';
}

/* ---------- planner ---------- */
let pFilter = "all";
function renderPlanner() {
  if (!$("#pSubj").options.length) $("#pSubj").innerHTML = '<option value="">General</option>' + SUBJECTS.map(s => '<option value="' + s.id + '">' + s.name + "</option>").join("");
  drawPlanner();
}
function drawPlanner() {
  let list = S.tasks.slice().sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
  if (pFilter === "pending") list = list.filter(x => !x.done);
  if (pFilter === "done") list = list.filter(x => x.done);
  if (!S.tasks.length) { $("#pList").innerHTML = '<p class="empty">No study tasks yet. Add your first one above, for example "Revise bone classification".</p>'; return; }
  if (!list.length) { $("#pList").innerHTML = '<p class="empty">Nothing in this view.</p>'; return; }
  $("#pList").innerHTML = list.map(x => '<div class="card task row ' + (x.done ? "done" : "") + '"><label class="chk"><input type="checkbox" data-t="' + x.id + '"' + (x.done ? " checked" : "") + ' aria-label="Completed"><span class="txt">' + esc(x.text) + '</span></label><span class="tag">' + (SUBJ[x.subj] ? SUBJ[x.subj].name : "General") + "</span>" + (x.due ? '<span class="meta ' + (!x.done && x.due < today() ? "late" : "") + '">Due ' + x.due + "</span>" : "") + '<button class="btn small ghost" data-del="' + x.id + '">Delete</button></div>').join("");
}

/* ---------- my space ---------- */
function renderSpace() {
  const nids = Object.keys(S.notes).filter(id => T[id]);
  let h = "<h1>My Space</h1>";
  h += '<p class="notice">Everything here is saved only in this browser on this device. It does not sync to your other devices. Clearing browser data will erase it, so download a backup now and then.</p>';
  h += '<div class="card"><h2>My notes</h2>' + (nids.length ? '<ul class="list">' + nids.map(id => "<li><span>" + tLink(id) + '<br><span class="meta">' + esc(S.notes[id].slice(0, 120)) + '</span></span><span><a class="btn small ghost" href="#reader/' + id + '">Edit</a> <button class="btn small ghost" data-delnote="' + id + '">Delete</button></span></li>').join("") + "</ul>" : '<p class="empty">No notes yet. Open any topic and write one at the bottom.</p>') + "</div>";
  h += '<div class="card"><h2>Bookmarked topics</h2>' + (S.bm.filter(id => T[id]).length ? '<ul class="list">' + S.bm.filter(id => T[id]).map(id => "<li>" + tLink(id) + '<button class="btn small ghost" data-ubm="' + id + '">Remove</button></li>').join("") + "</ul>" : '<p class="empty">No bookmarked topics.</p>') + "</div>";
  h += '<div class="card"><h2>Bookmarked glossary terms</h2>' + (S.gbm.length ? '<ul class="list">' + S.gbm.map(g => { const e = GLOSS.find(x => x[0] === g); return e ? "<li><span><b>" + e[0] + "</b>: " + e[2] + '</span><button class="btn small ghost" data-ugb="' + esc(g) + '">Remove</button></li>' : ""; }).join("") + "</ul>" : '<p class="empty">No bookmarked terms.</p>') + "</div>";
  h += '<div class="card"><h2>Recently opened</h2>' + (S.recent.filter(id => T[id]).length ? '<ul class="list">' + S.recent.filter(id => T[id]).map(id => "<li>" + tLink(id) + "</li>").join("") + "</ul>" : '<p class="empty">Nothing opened yet.</p>') + "</div>";
  h += '<div class="card"><h2>Backup</h2><p class="meta">Downloads your notes, bookmarks, tasks and progress as a file.</p><button class="btn" id="exportBtn">Download backup</button></div>';
  $("#spaceView").innerHTML = h;
}

/* ---------- internship ---------- */
function renderIntern() {
  $$("input[data-chk]").forEach(c => c.checked = !!S.chk[c.dataset.chk]);
  drawLogs();
}
function drawLogs() {
  $("#logList").innerHTML = S.logs.length ? S.logs.map((l, i) => '<div class="card"><p class="meta">' + l.date + "</p><p>" + esc(l.text).replace(/\n/g, "<br>") + '</p><button class="btn small ghost" data-dl="' + i + '">Delete</button></div>').join("") : '<p class="empty">No log entries yet.</p>';
}

/* ---------- wiring ---------- */
function applyTheme() { document.body.setAttribute("data-theme", S.theme); }
function init() {
  applyTheme();
  if (!storageOK) $("#storageWarn").hidden = false;
  $("#themeBtn").addEventListener("click", () => { S.theme = S.theme === "dark" ? "light" : "dark"; save(); applyTheme(); });
  $("#menuBtn").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); });

  $("#subSearch").addEventListener("input", drawSubjects);
  $("#topicSearch").addEventListener("input", drawTopicSearch);
  $("#yearTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; yearTab = b.dataset.y; renderSubjects(); });
  $("#subGrid").addEventListener("change", e => { const s = e.target.closest("select[data-pin]"); if (!s) return; if (s.value) S.pins[s.dataset.pin] = s.value; else delete S.pins[s.dataset.pin]; save(); });

  const rd = $("#reader"); rd.addEventListener("click", readerClick); rd.addEventListener("input", readerInput);

  $("#qzStart").addEventListener("click", () => startQuiz($("#qzSubj").value));
  $("#qzPlay").addEventListener("click", quizPlayClick);
  $("#qzEnd").addEventListener("click", quizEndClick);

  $("#exSubj").addEventListener("change", () => { fillExTopics(); drawExam(); });
  $("#exTopic").addEventListener("change", drawExam);
  $("#exTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; exType = b.dataset.type; $$("#exTabs button").forEach(x => x.classList.toggle("on", x === b)); drawExam(); });
  $("#exOut").addEventListener("click", e => { const b = e.target.closest("[data-act='fbcheck']"); if (!b) return; const inp = b.parentNode.querySelector(".fbin"), r = b.parentNode.querySelector(".fbres"), ok = inp.value.trim().toLowerCase() === inp.dataset.ans.toLowerCase(); r.textContent = ok ? "Correct" : "Not quite. Answer: " + inp.dataset.ans; r.className = "fbres " + (ok ? "ok" : "late"); });

  $("#flSubj").addEventListener("change", () => buildDeck(false));
  $("#flShuffle").addEventListener("click", () => buildDeck(true));
  $("#flCard").addEventListener("click", () => { F.back = !F.back; drawCard(); });
  $("#flNext").addEventListener("click", () => { if (F.deck.length) { F.i = (F.i + 1) % F.deck.length; F.back = false; drawCard(); } });
  $("#flPrev").addEventListener("click", () => { if (F.deck.length) { F.i = (F.i - 1 + F.deck.length) % F.deck.length; F.back = false; drawCard(); } });

  $("#gSearch").addEventListener("input", drawGlossary);
  $("#gSubj").addEventListener("change", drawGlossary);
  $("#gLetters").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; gLetter = b.dataset.l; $$("#gLetters button").forEach(x => x.classList.toggle("on", x === b)); drawGlossary(); });
  $("#gList").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (!b) return; const g = b.dataset.g; S.gbm = S.gbm.includes(g) ? S.gbm.filter(x => x !== g) : S.gbm.concat(g); save(); b.textContent = S.gbm.includes(g) ? "★" : "☆"; });

  $("#pForm").addEventListener("submit", e => {
    e.preventDefault();
    const text = $("#pText").value.trim(); if (!text) return;
    S.tasks.push({ id: Date.now(), text: text, subj: $("#pSubj").value, due: $("#pDate").value, done: false });
    save(); $("#pText").value = ""; $("#pDate").value = ""; drawPlanner();
  });
  $("#pFilters").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; pFilter = b.dataset.f; $$("#pFilters button").forEach(x => x.classList.toggle("on", x === b)); drawPlanner(); });
  $("#pList").addEventListener("click", e => {
    const d = e.target.closest("[data-del]");
    if (d) { S.tasks = S.tasks.filter(x => String(x.id) !== d.dataset.del); save(); drawPlanner(); }
  });
  $("#pList").addEventListener("change", e => {
    const c = e.target.closest("[data-t]"); if (!c) return;
    const t = S.tasks.find(x => String(x.id) === c.dataset.t); if (t) { t.done = c.checked; save(); drawPlanner(); }
  });

  $("#spaceView").addEventListener("click", e => {
    const t = e.target;
    if (t.dataset.delnote) { delete S.notes[t.dataset.delnote]; save(); renderSpace(); }
    else if (t.dataset.ubm) { S.bm = S.bm.filter(x => x !== t.dataset.ubm); save(); renderSpace(); }
    else if (t.dataset.ugb) { S.gbm = S.gbm.filter(x => x !== t.dataset.ugb); save(); renderSpace(); }
    else if (t.id === "exportBtn") {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "vetnest-backup.json"; a.click(); URL.revokeObjectURL(a.href);
    }
  });

  $("#logForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = $("#logText").value.trim(); if (!v) return;
    S.logs.unshift({ date: today(), text: v }); save(); $("#logText").value = ""; drawLogs();
  });
  $("#logList").addEventListener("click", e => { const b = e.target.closest("[data-dl]"); if (!b) return; S.logs.splice(+b.dataset.dl, 1); save(); drawLogs(); });
  $$("input[data-chk]").forEach(c => c.addEventListener("change", () => { S.chk[c.dataset.chk] = c.checked; save(); }));

  window.addEventListener("scroll", () => {
    const bar = $("#progress span");
    if (!$("#page-reader").classList.contains("active")) { bar.style.width = "0"; return; }
    const el = document.documentElement, p = el.scrollTop / ((el.scrollHeight - el.clientHeight) || 1);
    bar.style.width = Math.min(100, Math.round(p * 100)) + "%";
  }, { passive: true });
  window.addEventListener("keydown", e => { if (e.key === "Escape") document.body.classList.remove("focus"); });
  window.addEventListener("hashchange", route);
  route();
}
init();