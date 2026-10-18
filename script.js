/* VetNet - script.js
   HOW TO ADD CONTENT
   1. unit("anat", "Unit name");   starts a new unit in a subject
   2. topic("anat", "Topic title", { i, s, n, tb, k, m, sa, la, q, f, d });
      i = intro, s = simple words, n = [[heading, text]], tb = {h:[], r:[[]]},
      k = exam points, m = common mistakes, sa/la = [[question, answer]],
      q = [[question, [4 options], correctIndex, explanation]], f = [[front, back]],
      d = further study ideas
   3. glossary lines look like "Term|subjectId|meaning"
   Inside n text: a line starting with "- " becomes a bullet, other lines become paragraphs. */
"use strict";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const SUBJECTS = [
  { id: "anat", name: "Veterinary Anatomy", icon: "🦴", blurb: "How the animal body is built, from bones to organs." },
  { id: "phys", name: "Veterinary Physiology", icon: "🫀", blurb: "How the body works: blood, heart, kidney, digestion, hormones." },
  { id: "bioc", name: "Veterinary Biochemistry", icon: "🧪", blurb: "Biomolecules, enzymes, metabolism and clinical chemistry." },
  { id: "pharm", name: "Veterinary Pharmacology and Toxicology", icon: "💊", blurb: "How drugs and poisons act on animals (theory only)." },
  { id: "micro", name: "Veterinary Microbiology", icon: "🦠", blurb: "Bacteria, viruses, fungi, immunity and control." },
  { id: "para", name: "Veterinary Parasitology", icon: "🪱", blurb: "Helminths, protozoa, arthropods and their control." },
  { id: "path", name: "Veterinary Pathology", icon: "🔬", blurb: "What disease does to cells, tissues and organs." },
  { id: "nutr", name: "Animal Nutrition", icon: "🌾", blurb: "Nutrients, feeds, rations and feeding of livestock." },
  { id: "pubh", name: "Veterinary Public Health and Epidemiology", icon: "🌍", blurb: "Zoonoses, food safety, disease investigation." },
  { id: "gen", name: "Animal Genetics and Breeding", icon: "🧬", blurb: "Inheritance, selection and breeding systems." },
  { id: "lpm", name: "Livestock Production Management", icon: "🐄", blurb: "Housing, herd, flock and poultry management." },
  { id: "lpt", name: "Livestock Products Technology", icon: "🥛", blurb: "Milk, meat, eggs and their processing." },
  { id: "gyn", name: "Veterinary Gynaecology and Obstetrics", icon: "🐣", blurb: "Reproduction, pregnancy, parturition and its problems." },
  { id: "surg", name: "Veterinary Surgery and Radiology", icon: "🩹", blurb: "Surgical principles, wounds, anaesthesia, imaging." },
  { id: "med", name: "Veterinary Medicine", icon: "🩺", blurb: "Diseases of animals, system by system." },
  { id: "ext", name: "Veterinary and Animal Husbandry Extension Education", icon: "📢", blurb: "Taking knowledge to farmers, communication, programmes." },
  { id: "clin", name: "Veterinary Clinical Practice", icon: "🏥", blurb: "Clinical examination, diagnosis, records, ethics." },
  { id: "farm", name: "Livestock Farm Practices", icon: "🚜", blurb: "Hands-on farm routines, records and biosecurity." }
];
const SUBJ = {}; SUBJECTS.forEach(s => SUBJ[s.id] = s);

const TOPICS = [], UNITS = {}, ORDER = {}, T = {}, PLANNED = {};
SUBJECTS.forEach(s => { UNITS[s.id] = []; ORDER[s.id] = []; PLANNED[s.id] = []; });
function unit(sid, name) { UNITS[sid].push([name, []]); }
function topic(sid, title, o) {
  if (!UNITS[sid].length) unit(sid, "Unit 1");
  const id = sid + (ORDER[sid].length + 1);
  o = o || {}; o.id = id; o.s = sid; o.t = title;
  TOPICS.push(o); T[id] = o; ORDER[sid].push(id);
  UNITS[sid][UNITS[sid].length - 1][1].push(id);
}
function planned(sid, list) { PLANNED[sid] = list; }
/* ================= ANATOMY ================= */
unit("anat", "Unit 1 – Getting started");
topic("anat", "Introduction to Veterinary Anatomy", {
  i: "Anatomy is the study of how the animal body is built. You need it before physiology, pathology or surgery make any sense.",
  s: "Anatomy is the map of the body. Physiology tells you how the city runs, anatomy tells you where the roads and buildings are. In vet college you learn many species, so you also learn how a cow differs from a dog or a horse.",
  n: [
    ["Branches of anatomy", "The word comes from Greek: ana means up and temnein means to cut. Gross anatomy is what you can see by dissection. Histology uses the microscope. Embryology follows development before birth. Comparative anatomy sets one species against another, which is the heart of veterinary teaching.\nSystemic anatomy goes system by system: osteology (bones), arthrology (joints), myology (muscles), splanchnology (viscera), angiology (vessels), neurology (nerves). Regional or topographic anatomy takes one region, such as the flank, and studies everything in it together. Surgeons and clinicians think regionally."],
    ["Levels of organisation", "Cells form tissues. The four basic tissues are epithelial, connective, muscular and nervous. Tissues form organs, organs form systems, and systems form the animal. Learning to move between these levels is half of anatomy. A swollen udder, for example, is a problem of an organ, but you explain it by looking at tissue, vessels and nerves."],
    ["How to study anatomy", "- Learn from general to specific: system, organ, parts, relations.\n- Always ask what the structure does and what goes wrong with it.\n- Use specimens, bones and live animals. Reading alone is slow.\n- Draw. Even a rough sketch of the rumen or the heart fixes it in memory."]
  ],
  tb: { h: ["Branch", "Studies", "Tool"], r: [["Gross anatomy", "Parts visible to the eye", "Dissection"], ["Histology", "Tissues and cells", "Microscope"], ["Embryology", "Development before birth", "Embryo sections"], ["Comparative anatomy", "Differences between species", "Several species"], ["Applied anatomy", "Anatomy used in clinical work", "Clinics and surgery"]] },
  k: ["Definition of anatomy and its word origin.", "Systemic vs regional anatomy.", "Four basic tissues.", "Why comparative anatomy matters to a vet."],
  m: ["Anatomy is not just memorising names. It is structure linked to function."],
  sa: [["Define anatomy.", "The science of the structure of the body and the relationships of its parts."], ["Differentiate systemic and regional anatomy.", "Systemic studies the body system by system. Regional studies all the structures of one region together."]],
  la: [["Describe the branches of veterinary anatomy with examples.", "Define anatomy. Then write gross, microscopic (histology, cytology), developmental (embryology), comparative and applied anatomy, with one example each. Add systemic and regional approaches."]],
  q: [["The study of tissues under a microscope is called", ["Osteology", "Histology", "Myology", "Angiology"], 1, "Histology is microscopic study of tissues."],
    ["A surgeon studying everything in the right flank together is using", ["Systemic anatomy", "Regional anatomy", "Embryology", "Cytology"], 1, "Regional (topographic) anatomy groups all structures of one region."],
    ["Which is NOT a basic tissue?", ["Epithelial", "Connective", "Glandular organ", "Nervous"], 2, "A gland is an organ made of tissues. The four basic tissues are epithelial, connective, muscular and nervous."]],
  f: [["Splanchnology", "Study of the visceral organs"], ["Arthrology", "Study of joints"], ["Four basic tissues", "Epithelial, connective, muscular, nervous"]],
  d: ["Read about the histology of each basic tissue.", "Compare the stomach of a dog, a pig and a cow.", "Learn how embryonic germ layers become organs."]
});

topic("anat", "Anatomical Terminology, Planes and Directions", {
  i: "Directional terms are a shared language. They let anyone describe where something is, whatever position the animal is in.",
  s: "Animals walk on four legs, so we do not say front and back. Head end is cranial, tail end is caudal, back is dorsal, belly is ventral. On limbs, near the body is proximal and far from the body is distal.",
  n: [
    ["Directional terms", "- Cranial and caudal: towards the head and the tail, used on the trunk and limbs above the carpus and tarsus.\n- Rostral: towards the nose, used only on the head.\n- Dorsal and ventral: towards the back and the belly.\n- Medial and lateral: towards and away from the median plane.\n- Proximal and distal: nearer to and farther from the body on a limb.\n- Palmar: the back of the forefoot below the carpus. Plantar: the back of the hindfoot below the tarsus. The front of both below the carpus and tarsus is dorsal."],
    ["Planes", "The median plane passes through the midline and gives equal right and left halves. Sagittal planes are parallel to it. Transverse planes cut across the long axis at right angles. Dorsal (frontal) planes are parallel to the back and split the body into dorsal and ventral parts. Radiographs and CT scans use these planes all the time."],
    ["Movements", "Flexion decreases the angle of a joint and extension increases it. Abduction moves a limb away from the median plane, adduction towards it. Rotation turns a part around its long axis. Protraction and retraction move a limb forward and backward."]
  ],
  tb: { h: ["Plane", "Divides the body into", "Note"], r: [["Median", "Equal right and left halves", "Only one"], ["Sagittal", "Unequal right and left parts", "Parallel to median"], ["Transverse", "Cranial and caudal parts", "Right angle to long axis"], ["Dorsal", "Dorsal and ventral parts", "Parallel to the ground in a standing animal"]] },
  k: ["Cranial and caudal replace anterior and posterior in quadrupeds.", "Palmar vs plantar.", "Define the median plane."],
  m: ["A sagittal plane is not always the median plane. Only the central one is.", "Rostral is used only on the head."],
  sa: [["What does caudal mean?", "Towards the tail."], ["Define the median plane.", "The plane through the midline that divides the body into equal right and left halves."]],
  la: [["Describe the anatomical planes and directional terms used in animals.", "Define each plane with a labelled sketch. List cranial, caudal, rostral, dorsal, ventral, medial, lateral, proximal, distal, palmar, plantar with meanings and where each is used."]],
  q: [["Towards the tail is", ["Cranial", "Caudal", "Dorsal", "Rostral"], 1, "Caudal means towards the tail."],
    ["On the hindlimb below the tarsus, the back surface is", ["Palmar", "Plantar", "Dorsal", "Cranial"], 1, "Plantar is the back of the hindfoot below the tarsus."],
    ["The plane dividing the body into equal halves is the", ["Transverse", "Dorsal", "Median", "Oblique"], 2, "The median plane divides into equal right and left halves."],
    ["Flexion of a joint", ["Increases the angle", "Decreases the angle", "Rotates the limb", "Moves it away from the midline"], 1, "Flexion decreases the joint angle."]],
  f: [["Rostral", "Towards the nose, head only"], ["Abduction", "Away from the median plane"], ["Plantar", "Back of hindfoot below the tarsus"]],
  d: ["Practise describing a wound location using three terms.", "Learn the terms used for the head, neck and thorax regions."]
});

unit("anat", "Unit 2 – Skeleton, joints, muscles");
topic("anat", "Bones: Classification, Structure and the Skeleton", {
  i: "The skeleton supports the animal, protects soft organs, gives muscles something to pull on, stores minerals and makes blood cells.",
  s: "Bones come in different shapes because they do different jobs. Long bones act like levers, flat bones protect, short bones absorb shock. Bone is alive. It keeps remodelling all your life.",
  n: [
    ["Classification by shape", "- Long bones: femur, humerus, radius, metacarpals. They have a shaft (diaphysis) and two ends (epiphyses) with a medullary cavity.\n- Short bones: carpals and tarsals, roughly cubical.\n- Flat bones: scapula, ribs, skull bones. They protect.\n- Irregular bones: vertebrae.\n- Sesamoid bones: develop in a tendon. The patella is the largest.\n- Pneumatic bones: contain air spaces, for example the frontal bone, and many bird bones."],
    ["Structure of a long bone", "The outer covering is the periosteum, which carries blood vessels and nerves and has bone-forming cells. Beneath it is compact bone, dense and strong. The inside of the ends has spongy (cancellous) bone with red marrow. The shaft cavity holds yellow marrow in adults. Articular cartilage covers the joint ends. In young animals the growth plate (physis) between diaphysis and epiphysis allows lengthening. Growth plate injuries in puppies and foals can stop normal growth."],
    ["Divisions of the skeleton", "The axial skeleton is the skull, vertebral column, ribs and sternum. The appendicular skeleton is the limbs and their girdles. The splanchnic (visceral) skeleton is bone that grows in soft organs, such as the os penis in dogs and the os cordis in cattle."],
    ["Vertebral formula", "Cervical vertebrae are 7 in almost all mammals. The other regions vary, so the vertebral formula is a favourite exam question. Dog: C7 T13 L7 S3. Ox: C7 T13 L6 S5. Horse: C7 T18 L6 S5. Sheep and goat: C7 T13 L6-7 S4. Pig: C7 T14-15 L6-7 S4. Check your own textbook for variations."],
    ["Bone cells and healing", "Osteoblasts build bone, osteocytes maintain it, osteoclasts remove it. A fracture heals through a haematoma, soft callus, hard callus and then remodelling. Movement at the fracture site delays healing, which is why surgeons stabilise fractures."]
  ],
  tb: { h: ["Species", "Cervical", "Thoracic", "Lumbar", "Sacral"], r: [["Dog", "7", "13", "7", "3"], ["Ox", "7", "13", "6", "5"], ["Horse", "7", "18", "6", "5"], ["Sheep/goat", "7", "13", "6-7", "4"], ["Pig", "7", "14-15", "6-7", "4"]] },
  k: ["Six types of bone by shape with examples.", "Parts of a long bone.", "Axial vs appendicular.", "Vertebral formula of dog, ox, horse.", "Functions of the skeleton."],
  m: ["Bone is living tissue, not dead rock.", "Giraffes still have 7 cervical vertebrae, each very long."],
  sa: [["What is the periosteum?", "The fibrous membrane covering the outer surface of a bone, carrying vessels and nerves and bone-forming cells."], ["What is a sesamoid bone? Give an example.", "A bone that develops within a tendon. Example: patella."], ["Name the functions of the skeleton.", "Support, protection, leverage for movement, mineral storage, haemopoiesis."]],
  la: [["Classify bones and describe the structure of a long bone.", "Types by shape with examples. Draw a long bone: diaphysis, epiphysis, physis, medullary cavity, periosteum, compact and spongy bone, articular cartilage, marrow. Add functions."]],
  q: [["The patella is a", ["Long bone", "Irregular bone", "Sesamoid bone", "Flat bone"], 2, "It develops inside the quadriceps tendon."],
    ["How many cervical vertebrae does a horse have?", ["5", "6", "7", "9"], 2, "Nearly all mammals have 7."],
    ["The growth plate lies between", ["Periosteum and bone", "Diaphysis and epiphysis", "Two epiphyses", "Marrow and cortex"], 1, "The physis separates diaphysis and epiphysis in young animals."],
    ["The os cordis is found in", ["Dog", "Cattle", "Horse", "Cat"], 1, "It is a splanchnic bone in the heart of cattle."],
    ["Cells that remove bone are", ["Osteoblasts", "Osteocytes", "Osteoclasts", "Chondrocytes"], 2, "Osteoclasts resorb bone."]],
  f: [["Diaphysis", "Shaft of a long bone"], ["Physis", "Growth plate"], ["Splanchnic skeleton", "Bones that develop in soft organs, e.g. os penis"], ["Dog vertebral formula", "C7 T13 L7 S3"]],
  d: ["Learn the bones of the forelimb and hindlimb of dog, horse and ox.", "Study the skull bones and the paranasal sinuses.", "Read about fracture types and healing stages."]
});

topic("anat", "Joints and Ligaments", {
  i: "A joint is where two or more bones meet. Joints decide how much movement is possible and how stable a limb is.",
  s: "Some joints do not move at all, like the skull seams. Some move a little. Most limb joints are synovial joints with oiled surfaces that move freely. Ligaments hold bones together.",
  n: [
    ["Classification", "- Fibrous joints: bones joined by fibrous tissue, for example skull sutures.\n- Cartilaginous joints: joined by cartilage, for example the pelvic symphysis and intervertebral discs. Growth plates are temporary cartilaginous joints.\n- Synovial joints: freely movable, with a cavity."],
    ["Synovial joint structure", "Articular cartilage covers the bone ends. A joint capsule surrounds the joint, lined inside by a synovial membrane that makes synovial fluid. The fluid lubricates the surfaces and feeds the cartilage. Ligaments outside or inside the capsule give stability. Menisci in the stifle act as shock absorbers."],
    ["Types of synovial joints", "- Hinge: elbow, only flexion and extension.\n- Ball and socket: hip and shoulder, movement in many directions.\n- Pivot: atlantoaxial, rotation of the head.\n- Gliding or plane: between carpal bones.\n- Condylar: stifle and temporomandibular joint."],
    ["Clinical links", "Arthritis is joint inflammation. Joint ill (navel ill with joint infection) affects calves and foals. Cranial cruciate ligament rupture is a common cause of hindlimb lameness in dogs. Hip dysplasia is poor fitting of the hip ball and socket, common in large dogs. You do not need treatments here, only the idea that structure decides failure."]
  ],
  tb: { h: ["Type", "Example", "Movement"], r: [["Hinge", "Elbow", "Flexion and extension"], ["Ball and socket", "Hip, shoulder", "Wide, many directions"], ["Pivot", "Atlantoaxial", "Rotation"], ["Condylar", "Stifle", "Flexion, extension, slight rotation"], ["Gliding", "Carpal bones", "Small sliding"]] },
  k: ["Parts of a synovial joint.", "Joint classification with examples.", "Ligament vs tendon.", "Functions of synovial fluid."],
  m: ["Ligaments join bone to bone. Tendons join muscle to bone."],
  sa: [["List the parts of a synovial joint.", "Articular cartilage, joint capsule, synovial membrane, synovial fluid, joint cavity, ligaments."], ["What joint allows the head to rotate?", "The atlantoaxial joint, a pivot joint."]],
  la: [["Classify joints and describe a synovial joint with a neat diagram.", "Fibrous, cartilaginous, synovial with examples. Label the diagram. Add types of synovial joints and functions of fluid."]],
  q: [["The elbow is a", ["Hinge joint", "Pivot joint", "Ball and socket joint", "Fibrous joint"], 0, "It permits flexion and extension only."],
    ["Synovial fluid is made by the", ["Articular cartilage", "Synovial membrane", "Periosteum", "Meniscus"], 1, "The synovial membrane lining the capsule makes it."],
    ["A ligament connects", ["Muscle to bone", "Bone to bone", "Muscle to muscle", "Skin to bone"], 1, "Bone to bone."]],
  f: [["Meniscus", "Fibrocartilage pad that absorbs shock in the stifle"], ["Symphysis", "Cartilaginous joint, e.g. pelvic symphysis"]],
  d: ["Learn the stifle joint ligaments of the dog.", "Read about the stay apparatus of the horse."]
});

topic("anat", "Muscles, Tendons and Movement", {
  i: "Muscles convert chemical energy into movement. Their arrangement explains posture, locomotion and many lameness problems.",
  s: "Skeletal muscle moves bones and you control it. Smooth muscle works automatically in organs like the gut. Cardiac muscle is only in the heart. Tendons join muscle to bone.",
  n: [
    ["Three muscle types", "Skeletal muscle is voluntary, striated, multinucleated, with nuclei at the edge. Smooth muscle is involuntary, non-striated, with one central nucleus. Cardiac muscle is involuntary, striated, branched, with intercalated discs that let impulses spread quickly."],
    ["Structure of a skeletal muscle", "A muscle is made of fascicles, fascicles of muscle fibres, fibres of myofibrils, myofibrils of sarcomeres with actin and myosin filaments. Connective tissue wraps each level: endomysium around fibres, perimysium around fascicles, epimysium around the whole muscle. These blend into the tendon."],
    ["Origin, insertion and action", "The origin is the less movable attachment and the insertion is the more movable one. Muscle groups work as flexors, extensors, abductors and adductors. Agonists do the movement and antagonists oppose it. Synergists help the agonist."],
    ["Fibre types", "Type I (slow twitch) fibres resist fatigue and suit posture and endurance. Type II (fast twitch) fibres give quick, strong contractions. Racehorses and greyhounds have more fast fibres, and the proportion is partly inherited."],
    ["Species notes", "Horses have the stay apparatus, which lets them stand with little muscular effort. Ruminants have a strong nuchal ligament. Cattle have the ligamentum nuchae supporting the heavy head."]
  ],
  tb: { h: ["Feature", "Skeletal", "Smooth", "Cardiac"], r: [["Control", "Voluntary", "Involuntary", "Involuntary"], ["Striations", "Yes", "No", "Yes"], ["Nuclei", "Many, peripheral", "One, central", "One or two, central"], ["Special feature", "Attached to bones", "Organ walls", "Intercalated discs"]] },
  k: ["Compare the three muscle types.", "Connective tissue layers of muscle.", "Origin vs insertion.", "Agonist and antagonist."],
  m: ["Tendon is not the same as ligament.", "Cardiac muscle is striated even though it is involuntary."],
  sa: [["What are intercalated discs?", "Cell junctions in cardiac muscle that allow rapid spread of impulses."], ["Define origin and insertion of a muscle.", "Origin is the less movable attachment and insertion is the more movable attachment."]],
  la: [["Compare skeletal, smooth and cardiac muscle.", "Make a table of control, striations, nucleus, location, example, special features. Add structure of skeletal muscle with a sketch."]],
  q: [["Intercalated discs are seen in", ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Tendon"], 2, "Cardiac muscle cells are joined by them."],
    ["The connective tissue around a whole muscle is", ["Endomysium", "Perimysium", "Epimysium", "Periosteum"], 2, "Epimysium wraps the whole muscle."],
    ["Fast twitch fibres are", ["Type I", "Type II", "Smooth", "Cardiac"], 1, "Type II fibres contract fast."]],
  f: [["Sarcomere", "Contractile unit of muscle with actin and myosin"], ["Agonist", "Muscle that produces the movement"]],
  d: ["Learn the muscles of the dog's forelimb.", "Study how a muscle contracts at the sarcomere level."]
});

unit("anat", "Unit 3 – Organ systems");
topic("anat", "Digestive System and the Ruminant Stomach", {
  i: "The digestive system takes in, breaks down and absorbs feed. Species differ enormously, which is why this topic is so important in veterinary anatomy.",
  s: "A dog has a simple stomach, like us. A cow has four stomach compartments, and the biggest one, the rumen, is a fermentation vat full of microbes. A horse digests fibre in a huge caecum and colon.",
  n: [
    ["Basic plan", "The alimentary canal runs from mouth to anus: mouth, pharynx, oesophagus, stomach, small intestine (duodenum, jejunum, ileum), large intestine (caecum, colon, rectum) and anus. Accessory organs are salivary glands, liver, gall bladder (absent in the horse) and pancreas."],
    ["Dental formulae", "Dog: I 3/3 C 1/1 P 4/4 M 2/3 = 42 permanent teeth. Cat: 30. Horse (male): I 3/3 C 1/1 P 3-4/3 M 3/3 = 40-42. Ox: I 0/3 C 0/1 P 3/3 M 3/3 = 32, with no upper incisors, and a dental pad. Pig: 44. Dental formulae and age estimation by teeth are routine clinical skills."],
    ["The ruminant stomach", "There are four compartments: rumen, reticulum, omasum and abomasum. The rumen is the largest and sits on the left side. It is lined with papillae that increase surface area for absorption. The reticulum has a honeycomb lining and lies against the diaphragm, close to the heart, which explains traumatic reticuloperitonitis when sharp objects (hardware) penetrate. The omasum has many leaf-like laminae and squeezes water out of the feed. The abomasum is the true glandular stomach, like a simple stomach, secreting acid and pepsin."],
    ["Oesophageal groove", "In suckling calves the reticular groove closes reflexly so that milk bypasses the rumen and goes directly to the abomasum. In adults it does not normally function this way."],
    ["Horse and others", "The horse has a small stomach with limited capacity and cannot vomit easily. Its caecum and large colon form a large fermentation chamber. The pig has a simple stomach with a torus pyloricus. Birds have a crop, proventriculus and gizzard (ventriculus)."]
  ],
  tb: { h: ["Compartment", "Key feature", "Main job"], r: [["Rumen", "Largest, papillae", "Microbial fermentation, VFA absorption"], ["Reticulum", "Honeycomb mucosa", "Sorting, regurgitation, traps heavy objects"], ["Omasum", "Laminae", "Water absorption"], ["Abomasum", "Glandular", "Acid and pepsin digestion"]] },
  k: ["Four compartments and their lining.", "Dental formulae of dog, ox, horse.", "Reticular groove.", "Why hardware disease affects the reticulum."],
  m: ["The abomasum, not the rumen, is the true stomach."],
  sa: [["Why does hardware disease affect the reticulum?", "The reticulum lies against the diaphragm and heart, its honeycomb lining traps heavy objects, and sharp ones can penetrate the wall."], ["What is the function of the omasum?", "It absorbs water and some minerals from the feed as it passes."]],
  la: [["Describe the anatomy of the ruminant stomach.", "Explain each compartment with location, lining and function, reticular groove, a labelled diagram, and comparison with the simple stomach."]],
  q: [["The true glandular stomach of ruminants is the", ["Rumen", "Reticulum", "Omasum", "Abomasum"], 3, "The abomasum secretes acid and pepsin."],
    ["The ox has no", ["Lower incisors", "Upper incisors", "Molars", "Premolars"], 1, "A dental pad replaces upper incisors."],
    ["Which animal has no gall bladder?", ["Dog", "Cow", "Horse", "Pig"], 2, "Horses lack a gall bladder."]],
  f: [["Reticular groove", "Channel sending milk to the abomasum in calves"], ["Omasum", "Leaf-like laminae, absorbs water"]],
  d: ["Compare the intestines of dog, horse and pig.", "Learn the liver lobes and bile passage in different species."]
});

topic("anat", "Heart, Blood Vessels and Respiratory System", {
  i: "The cardiovascular and respiratory systems deliver oxygen and remove carbon dioxide. Knowing their layout helps with clinical examination.",
  s: "The heart is a four-chambered pump. The right side sends blood to the lungs and the left side sends it to the body. Air goes in through the nose, down the trachea, and into the lungs.",
  n: [
    ["The heart", "The heart lies in the mediastinum within the pericardium. It has four chambers: right atrium, right ventricle, left atrium, left ventricle. The right AV valve is tricuspid and the left is bicuspid (mitral). The aortic and pulmonary valves are semilunar. The left ventricle wall is much thicker because it pumps against systemic pressure. In the dog the heart extends roughly from the third to the sixth rib. The apex beat is felt on the left side."],
    ["Vessels", "Arteries carry blood away from the heart and have thick elastic walls. Veins return blood and have valves. Capillaries exchange materials. Sites of clinical use: the jugular vein in the jugular groove (large animals), the cephalic and saphenous veins in dogs, the coccygeal vessels in cattle, the auricular vein in rabbits and pigs. The facial and transverse facial arteries are used for pulse in horses."],
    ["Respiratory tract", "Air enters the nostrils, nasal cavity, pharynx, larynx, trachea, bronchi and lungs. The trachea is held open by C-shaped cartilage rings. The right lung has more lobes than the left in most species. In the horse the guttural pouches, an extension of the auditory tube, are an unusual feature. Birds have air sacs and relatively rigid lungs, and no diaphragm."],
    ["Pleura and thorax", "The pleura is a double serous membrane, parietal and visceral, enclosing a small pleural cavity. Negative pressure in this cavity keeps the lungs expanded. A penetrating chest wound causes pneumothorax and lung collapse."]
  ],
  tb: { h: ["Feature", "Artery", "Vein"], r: [["Direction", "Away from heart", "Towards heart"], ["Wall", "Thick, elastic", "Thin"], ["Valves", "No (except at heart)", "Yes in many"], ["Used for", "Pulse", "Blood sampling, injection"]] },
  k: ["Chambers and valves.", "Why left ventricle wall is thicker.", "Venepuncture sites in species.", "Pleural cavity and pneumothorax."],
  m: ["The left side does not carry only oxygenated blood in the whole body. Pulmonary arteries carry deoxygenated blood."],
  sa: [["Name the valves of the heart.", "Right AV (tricuspid), left AV (bicuspid or mitral), pulmonary and aortic semilunar valves."], ["Where is blood usually collected in cattle?", "From the jugular vein, and the coccygeal vein is also used."]],
  la: [["Describe the structure of the heart.", "Position, pericardium, chambers, valves, wall layers, blood supply by coronary arteries, conduction system in outline, and a labelled diagram."]],
  q: [["The left AV valve is the", ["Tricuspid", "Mitral", "Aortic", "Pulmonary"], 1, "Mitral or bicuspid."],
    ["The trachea is kept open by", ["Straight bars", "C-shaped cartilage rings", "Smooth muscle", "Bone"], 1, "C-shaped hyaline cartilage rings."],
    ["Birds lack a", ["Trachea", "Diaphragm", "Lung", "Syrinx"], 1, "Birds have no true diaphragm."]],
  f: [["Pneumothorax", "Air in the pleural cavity causing lung collapse"], ["Guttural pouch", "Extension of the auditory tube in the horse"]],
  d: ["Learn the coronary circulation.", "Study the fetal circulation and the changes at birth."]
});

topic("anat", "Urogenital System and Nervous System Basics", {
  i: "Kidneys filter the blood, the reproductive organs produce gametes, and the nervous system coordinates everything. These topics link anatomy to physiology.",
  s: "Kidneys make urine. Ovaries and testes make eggs and sperm. The brain and spinal cord form the central nervous system, and nerves carry messages to and from the body.",
  n: [
    ["Kidney", "The kidney is a bean-shaped organ with a cortex and a medulla. The functional unit is the nephron. The ox kidney is lobulated, the pig and dog kidneys are smooth and bean-shaped, the horse right kidney is heart-shaped. Urine flows from the renal pelvis through the ureter to the bladder, then through the urethra."],
    ["Female reproductive tract", "Ovaries, oviducts (uterine tubes), uterus, cervix, vagina and vulva. The uterus has two horns and a body. Ruminants have caruncles in the uterus, which join cotyledons of the placenta to form placentomes. The cervix is the barrier that protects the uterus in pregnancy."],
    ["Male reproductive tract", "Testes in the scrotum, epididymis, vas deferens, accessory sex glands (prostate, seminal vesicles, bulbourethral glands, varying by species), penis and prepuce. The testes are outside the body because sperm production needs a temperature a few degrees below body temperature."],
    ["Nervous system", "The central nervous system is the brain and spinal cord. The peripheral nervous system is the cranial nerves (12 pairs) and spinal nerves. The autonomic nervous system has sympathetic (fight or flight) and parasympathetic (rest and digest) parts. Meninges (dura, arachnoid, pia) cover the CNS, with cerebrospinal fluid around it. The vagus nerve, cranial nerve X, supplies the heart and much of the gut."]
  ],
  tb: { h: ["Cranial nerve", "Name", "Main function"], r: [["I", "Olfactory", "Smell"], ["II", "Optic", "Vision"], ["III, IV, VI", "Oculomotor, trochlear, abducens", "Eye movement"], ["V", "Trigeminal", "Face sensation, chewing"], ["VII", "Facial", "Facial expression"], ["VIII", "Vestibulocochlear", "Hearing, balance"], ["IX, X, XI, XII", "Glossopharyngeal, vagus, accessory, hypoglossal", "Pharynx, viscera, neck muscles, tongue"]] },
  k: ["Structure of the kidney.", "Placentome in ruminants.", "Why testes are in the scrotum.", "Twelve cranial nerves."],
  m: ["Sympathetic does not mean sympathy. It prepares the body for action."],
  sa: [["What is a placentome?", "The structure formed by the maternal caruncle and fetal cotyledon in ruminants."], ["Which cranial nerve is the vagus?", "Cranial nerve X."]],
  la: [["Describe the anatomy of the kidney of the ox and compare it with the dog.", "Position, shape, lobulation, cortex, medulla, pelvis, nephron, blood supply, with a diagram."]],
  q: [["The functional unit of the kidney is the", ["Glomerulus only", "Nephron", "Pelvis", "Calyx"], 1, "The nephron."],
    ["Ruminant placentomes join", ["Caruncle and cotyledon", "Cervix and vagina", "Ovary and oviduct", "Uterus and bladder"], 0, "Maternal caruncle with fetal cotyledon."],
    ["Cranial nerve II is the", ["Olfactory", "Optic", "Trigeminal", "Vagus"], 1, "The optic nerve."]],
  f: [["Cryptorchidism", "Failure of one or both testes to descend into the scrotum"], ["Meninges", "Dura, arachnoid and pia mater"]],
  d: ["Learn the accessory sex glands of each species.", "Study the spinal cord segments and reflexes."]
});
planned("anat", ["Skull and paranasal sinuses", "Forelimb and hindlimb bones of the horse, ox, dog", "Stay apparatus of the horse", "Hoof and claw anatomy", "Mammary gland of the cow", "Avian anatomy", "Eye and ear", "Endocrine glands", "Lymphatic system and spleen", "Surface anatomy for clinical examination", "Embryology and fetal membranes", "Histology of the major organs"]);

/* ================= PHYSIOLOGY ================= */
unit("phys", "Unit 1 – Basic concepts");
topic("phys", "Introduction to Physiology and Body Fluids", {
  i: "Physiology is the science of how living bodies work. It asks how and why, where anatomy asks what and where.",
  s: "Anatomy shows the parts, physiology shows what they do and how they work together. Most of the body is water, about two thirds inside cells and one third outside.",
  n: [
    ["Levels", "Chemical, cell, tissue, organ, system, organism. Systems include digestive, respiratory, cardiovascular, nervous, endocrine, urinary, reproductive, musculoskeletal, immune, integumentary."],
    ["Body fluid compartments", "Total body water is roughly 60 percent of body weight in adults, higher in young animals and lower in fat animals. About two thirds is intracellular fluid (ICF). About one third is extracellular fluid (ECF), which is made of interstitial fluid and plasma, with a small transcellular part (CSF, synovial fluid, aqueous humour). Sodium is the main ECF cation, potassium the main ICF cation."],
    ["Internal environment", "Claude Bernard called the ECF the milieu interieur. Cells rely on its stable composition. Disturbance of this environment is what we recognise clinically as dehydration, acidosis or electrolyte imbalance."],
    ["Transport across membranes", "- Simple diffusion: small, lipid-soluble molecules move down their gradient.\n- Facilitated diffusion: carrier proteins help, no energy.\n- Osmosis: water moves across a membrane towards higher solute concentration.\n- Active transport: uses ATP to move substances against a gradient, as in the sodium-potassium pump.\n- Endocytosis and exocytosis move large particles."]
  ],
  tb: { h: ["Compartment", "Share of body water", "Main cation"], r: [["Intracellular fluid", "About two thirds", "Potassium"], ["Interstitial fluid", "About one quarter", "Sodium"], ["Plasma", "About one twelfth", "Sodium"]] },
  k: ["Body fluid compartments.", "Types of membrane transport.", "Milieu interieur.", "Na+/K+ pump."],
  m: ["Osmosis moves water, not solute, across a semipermeable membrane."],
  sa: [["Define osmosis.", "Movement of water across a semipermeable membrane from lower to higher solute concentration."], ["Which ion is the main cation of ICF?", "Potassium."]],
  la: [["Describe body fluid compartments and transport across the cell membrane.", "Compartment sizes and composition, then each transport mechanism with an example."]],
  q: [["The main ECF cation is", ["Potassium", "Sodium", "Calcium", "Magnesium"], 1, "Sodium."],
    ["Which transport needs ATP?", ["Simple diffusion", "Osmosis", "Primary active transport", "Facilitated diffusion"], 2, "The Na+/K+ pump uses ATP."],
    ["About what fraction of body water is intracellular?", ["One third", "One half", "Two thirds", "All"], 2, "About two thirds."]],
  f: [["Osmosis", "Water movement across a semipermeable membrane"], ["Milieu interieur", "The internal environment, i.e. ECF"]],
  d: ["Learn resting membrane potential.", "Study dehydration types and the fluids lost."]
});

topic("phys", "Homeostasis and Feedback Control", {
  i: "Homeostasis is the body's ability to keep its internal environment fairly steady even when the outside world changes.",
  s: "It works like a thermostat. When the body gets hot, it sweats or pants. When it is cold, it shivers. Most of this control is negative feedback.",
  n: [
    ["The feedback loop", "A feedback loop has a receptor that detects the change, a control centre that compares it with the set point, and an effector that produces the response. The set point is the normal target value. Walter Cannon coined the word homeostasis."],
    ["Negative and positive feedback", "Negative feedback reverses the original change. Examples are temperature control, blood glucose control by insulin and glucagon, and blood pressure control by baroreceptors. Positive feedback strengthens the change until an end point is reached, for example oxytocin during parturition and the clotting cascade."],
    ["Thermoregulation", "The hypothalamus is the control centre. In heat: vasodilation, sweating (horses, cattle), panting (dogs, sheep, poultry) and seeking shade. In cold: vasoconstriction, shivering, raising hair or feathers and increased metabolic heat. Species differ. Pigs have poor sweat glands and wallow, dogs lose most heat by panting."],
    ["Fever", "Fever is a regulated rise of the set point caused by pyrogens, often from infection. It is different from hyperthermia, where the set point is unchanged but heat loss fails, as in heat stroke."]
  ],
  tb: { h: ["Feature", "Negative feedback", "Positive feedback"], r: [["Effect", "Reverses the change", "Strengthens the change"], ["Result", "Stability", "Quick completion of a process"], ["Examples", "Temperature, glucose, BP", "Oxytocin in labour, clotting"]] },
  k: ["Define homeostasis.", "Parts of a feedback loop.", "Fever vs hyperthermia.", "Heat loss mechanisms in species."],
  m: ["Homeostasis does not mean nothing changes. Values vary within a range.", "Positive feedback does not mean good feedback."],
  sa: [["Give an example of positive feedback.", "Oxytocin release and uterine contraction during parturition."], ["Differentiate fever and hyperthermia.", "Fever involves a raised set point due to pyrogens. Hyperthermia is a failure of heat loss with the set point unchanged."]],
  la: [["Explain homeostasis and thermoregulation.", "Define, feedback loop with diagram, negative and positive feedback, heat gain and loss mechanisms, species differences, fever."]],
  q: [["The thermoregulatory centre is in the", ["Hypothalamus", "Cerebellum", "Pituitary", "Medulla"], 0, "Hypothalamus."],
    ["Which is positive feedback?", ["Glucose regulation", "Thermoregulation", "Oxytocin and uterine contraction", "Baroreflex"], 2, "Oxytocin and contraction reinforce each other."],
    ["Which species relies mostly on panting?", ["Horse", "Dog", "Human", "Camel"], 1, "Dogs lose heat mainly by panting."]],
  f: [["Pyrogen", "A substance that raises the hypothalamic set point"], ["Set point", "Normal target value of a controlled variable"]],
  d: ["Learn heat stress effects on dairy cows.", "Study the baroreceptor reflex step by step."]
});

unit("phys", "Unit 2 – Blood and circulation");
topic("phys", "Blood: Composition, Cells and Functions", {
  i: "Blood is a fluid connective tissue that carries oxygen, nutrients, hormones, wastes and defence cells around the body.",
  s: "Blood has a liquid part, plasma, and cells floating in it. Red cells carry oxygen. White cells fight infection. Platelets help stop bleeding.",
  n: [
    ["Composition", "Plasma is about 55 percent of blood and is about 90 percent water. It holds albumin, globulins, fibrinogen, electrolytes, nutrients, gases, hormones and wastes. Formed elements are about 45 percent. Serum is plasma without fibrinogen and the other clotting factors, left after clotting. The packed cell volume (PCV) is the percentage of blood that is red cells."],
    ["Red blood cells", "Mammalian RBCs have no nucleus (camelids have oval ones). Birds, reptiles, amphibians and most fish have nucleated RBCs. Haemoglobin carries oxygen. RBCs are made in red bone marrow under the control of erythropoietin from the kidney, and removed by the spleen and liver after their life span, which is around 100-150 days depending on species."],
    ["White blood cells", "Granulocytes: neutrophils (phagocytosis of bacteria), eosinophils (parasites and allergy), basophils (histamine and heparin). Agranulocytes: lymphocytes (B and T cells, immunity) and monocytes (become macrophages). In ruminants lymphocytes are the commonest WBC, in dogs and cats neutrophils."],
    ["Platelets and clotting", "Platelets (thrombocytes in birds) come from megakaryocytes in mammals. Haemostasis has three steps: vessel spasm, platelet plug, and coagulation, ending with fibrinogen converted to fibrin. Vitamin K is needed for clotting factors II, VII, IX and X. Calcium is also needed."],
    ["Functions of blood", "- Transport of gases, nutrients, hormones and wastes.\n- Defence by WBCs and antibodies.\n- Haemostasis.\n- Temperature regulation.\n- Buffering to keep pH steady.\n- Maintenance of fluid balance by plasma proteins."],
    ["Blood groups", "Animals have blood groups too. Cattle have many (the B system is the largest), dogs have DEA types, cats have A, B and AB. Blood group matters for transfusion and for neonatal isoerythrolysis in foals and kittens."]
  ],
  tb: { h: ["Cell", "Main function", "Note"], r: [["Erythrocyte", "Carries O2", "No nucleus in mammals"], ["Neutrophil", "Eats bacteria", "First responder"], ["Eosinophil", "Parasites, allergy", "Raised in parasitism"], ["Basophil", "Histamine, heparin", "Rare"], ["Lymphocyte", "Immune response", "B and T cells"], ["Monocyte", "Becomes macrophage", "Phagocytosis"], ["Platelet", "Clotting", "Cell fragment"]] },
  k: ["Plasma vs serum.", "Types of WBC with function.", "Steps of haemostasis.", "Erythropoietin.", "Which animals have nucleated RBCs."],
  m: ["Serum and plasma are not the same.", "Not all animals have non-nucleated RBCs."],
  sa: [["Differentiate plasma and serum.", "Plasma contains fibrinogen and clotting factors. Serum does not."], ["What is erythropoietin?", "A hormone from the kidney that stimulates RBC production in bone marrow."]],
  la: [["Describe the composition and functions of blood.", "Plasma, formed elements, each cell type with function, clotting steps, functions, species differences, diagram."]],
  q: [["Serum lacks", ["Albumin", "Fibrinogen", "Water", "Sodium"], 1, "Fibrinogen is used up in clotting."],
    ["Which species has nucleated RBCs?", ["Cattle", "Dog", "Fowl", "Horse"], 2, "Birds have nucleated RBCs."],
    ["Erythropoietin is mainly produced by the", ["Liver", "Kidney", "Spleen", "Bone marrow"], 1, "Kidney."],
    ["Which WBC is commonest in cattle blood?", ["Neutrophil", "Lymphocyte", "Eosinophil", "Monocyte"], 1, "Lymphocytes predominate in ruminants."],
    ["Vitamin K is needed for", ["Oxygen transport", "Clotting factors", "RBC shape", "Platelet count"], 1, "Factors II, VII, IX, X."]],
  f: [["PCV", "Percentage of blood volume made of red cells"], ["Neonatal isoerythrolysis", "Destruction of newborn RBCs by antibodies in colostrum"], ["Megakaryocyte", "Bone marrow cell that makes platelets"]],
  d: ["Learn the normal blood values from your textbook.", "Study anaemia types and their causes.", "Read about the coagulation cascade."]
});

topic("phys", "Cardiovascular Physiology", {
  i: "The heart and vessels move blood so that every tissue gets oxygen and nutrients. The rhythm is generated within the heart itself.",
  s: "The heart squeezes (systole) and relaxes (diastole) again and again. A natural pacemaker in the right atrium, the SA node, sets the pace.",
  n: [
    ["Conduction system", "The SA node starts the impulse. It spreads through the atria to the AV node, where it is delayed so the ventricles fill. Then the impulse goes through the bundle of His and Purkinje fibres to the ventricles. The ECG records this electrical activity: P wave for atrial depolarisation, QRS for ventricular depolarisation, T wave for ventricular repolarisation."],
    ["Cardiac cycle", "Systole is the contraction and ejection phase and diastole is the relaxation and filling phase. The first heart sound S1 is closure of the AV valves and the second S2 is closure of the semilunar valves. Murmurs are abnormal sounds from turbulent blood flow."],
    ["Cardiac output and blood pressure", "Cardiac output = heart rate x stroke volume. Blood pressure depends on cardiac output and peripheral resistance. Preload is the stretch of the ventricle before contraction, afterload the resistance it pumps against. The Frank-Starling law says that more filling gives a stronger contraction, within limits."],
    ["Regulation", "The baroreceptors in the carotid sinus and aortic arch detect pressure. When pressure falls, sympathetic activity rises and heart rate and vessel tone increase. The renin-angiotensin-aldosterone system acts slowly to keep volume and pressure. Atrial natriuretic peptide acts in the opposite direction."],
    ["Circulation facts", "Pulmonary circulation is low pressure and systemic is high pressure. Capillary exchange follows Starling forces: hydrostatic pressure pushes fluid out and plasma protein osmotic pressure pulls it in. When plasma albumin falls, fluid leaks and oedema appears."]
  ],
  tb: { h: ["ECG wave", "Represents"], r: [["P", "Atrial depolarisation"], ["QRS", "Ventricular depolarisation"], ["T", "Ventricular repolarisation"], ["PR interval", "AV nodal delay"]] },
  k: ["Conduction pathway.", "Cardiac output formula.", "Heart sounds.", "Starling forces and oedema.", "ECG waves."],
  m: ["The AV node delay is useful, not a fault.", "A murmur is not always disease, but it needs proper examination."],
  sa: [["Define cardiac output.", "Volume pumped by each ventricle per minute: heart rate x stroke volume."], ["What causes the first heart sound?", "Closure of the AV valves."]],
  la: [["Explain the cardiac cycle and its regulation.", "Phases, valves, sounds, pressure changes, conduction, ECG, baroreceptor reflex, cardiac output."]],
  q: [["The natural pacemaker is the", ["AV node", "SA node", "Purkinje fibre", "Bundle of His"], 1, "SA node."],
    ["The T wave of ECG shows", ["Atrial depolarisation", "Ventricular depolarisation", "Ventricular repolarisation", "AV delay"], 2, "T is ventricular repolarisation."],
    ["Low plasma albumin leads to", ["Polycythaemia", "Oedema", "Hypertension", "Bradycardia"], 1, "Less oncotic pressure lets fluid escape to tissues."]],
  f: [["Frank-Starling law", "Greater ventricular filling gives stronger contraction"], ["Preload", "Ventricular stretch before contraction"]],
  d: ["Learn normal heart rates for each species.", "Study heart failure types."]
});

unit("phys", "Unit 3 – Other systems");
topic("phys", "Respiration and Gas Transport", {
  i: "Respiration supplies oxygen to tissues and removes carbon dioxide. It includes ventilation, gas exchange and transport.",
  s: "We breathe in to bring oxygen to the lungs, the oxygen crosses into the blood, haemoglobin carries it, and the tissues use it. Carbon dioxide travels the other way.",
  n: [
    ["Ventilation", "Inspiration is an active process using the diaphragm and external intercostal muscles. Expiration is mostly passive in resting animals. Tidal volume is the air in one normal breath. Minute ventilation is tidal volume x respiratory rate. Dead space is air that does not take part in gas exchange."],
    ["Gas exchange", "Gases move by diffusion across the thin alveolar-capillary membrane, driven by partial pressure differences. Oxygen goes into the blood, carbon dioxide into the alveoli. Surfactant reduces surface tension and prevents alveolar collapse."],
    ["Oxygen transport", "Most oxygen travels bound to haemoglobin, a small part dissolved in plasma. The oxygen dissociation curve is S-shaped. A shift to the right (more acid, more CO2, higher temperature) releases more oxygen to tissues. Carbon monoxide binds haemoglobin much more strongly than oxygen."],
    ["CO2 transport and control", "Most CO2 is carried as bicarbonate, some as carbamino compounds, some dissolved. Breathing is controlled by the medulla and pons. Central chemoreceptors respond to CO2 (through pH), and peripheral chemoreceptors in the carotid and aortic bodies respond to low O2."],
    ["Species notes", "Birds have air sacs and a unidirectional flow through parabronchi, which is more efficient than the mammal's tidal system. Dogs pant for thermoregulation, with shallow, fast breaths using dead space."]
  ],
  k: ["Surfactant.", "Dissociation curve shifts.", "Respiratory control.", "Avian respiration differences."],
  m: ["Oxygen is not carried only in plasma. Most is on haemoglobin."],
  sa: [["What is surfactant?", "A lipoprotein secreted by type II alveolar cells that reduces surface tension and keeps alveoli open."], ["Where are the chemoreceptors for oxygen?", "Carotid and aortic bodies."]],
  la: [["Describe the transport of oxygen and carbon dioxide in blood.", "Haemoglobin, dissociation curve, shifts, Bohr effect, bicarbonate, chloride shift, diagram."]],
  q: [["Surfactant is produced by", ["Type I pneumocytes", "Type II pneumocytes", "Macrophages", "Goblet cells"], 1, "Type II cells."],
    ["A rightward shift of the dissociation curve", ["Increases O2 binding", "Releases more O2 to tissues", "Stops CO2 transport", "Has no effect"], 1, "Haemoglobin affinity falls."],
    ["Most CO2 is carried as", ["Dissolved gas", "Carbamino compounds", "Bicarbonate", "Carbonic acid"], 2, "As bicarbonate."]],
  f: [["Tidal volume", "Volume of air in one normal breath"], ["Bohr effect", "Higher CO2 and acid lower haemoglobin affinity for O2"]],
  d: ["Study acid-base balance.", "Learn respiratory adaptation to altitude."]
});

topic("phys", "Digestive Physiology and Rumen Function", {
  i: "Digestion breaks feed into absorbable nutrients. In ruminants, microbes do much of the work, so the animal is really feeding its rumen first.",
  s: "In dogs and pigs, enzymes digest the feed in the stomach and small intestine. In cattle and sheep, microbes ferment fibre in the rumen into acids that the cow absorbs as its main energy source.",
  n: [
    ["Simple stomach digestion", "Saliva starts starch digestion in some species. The stomach secretes hydrochloric acid and pepsinogen. In the small intestine pancreatic enzymes (amylase, lipase, trypsin) and bile act, and the brush border enzymes finish digestion. Absorption mostly happens in the small intestine through villi. The large intestine absorbs water and, in hindgut fermenters like the horse, ferments fibre."],
    ["Rumen fermentation", "Rumen microbes (bacteria, protozoa, fungi) ferment carbohydrates to volatile fatty acids (VFAs): acetate, propionate and butyrate, plus methane and carbon dioxide. VFAs supply about 60 to 70 percent of the ruminant's energy. Propionate is the main precursor for glucose in the liver. Acetate is the main precursor of milk fat. Rumen pH is normally around 6 to 7, and the fermentation is held stable by saliva, which contains bicarbonate and phosphate buffers."],
    ["Protein and vitamins", "Rumen microbes break down dietary protein and non-protein nitrogen like urea, then build microbial protein, which the animal digests later in the abomasum and intestine. Microbes also make B vitamins and vitamin K. Cobalt is needed for vitamin B12 synthesis."],
    ["Rumination and eructation", "Rumination is regurgitation, re-chewing and re-swallowing of feed. It increases saliva and reduces particle size. Eructation is belching of gases produced in fermentation. If it fails, bloat occurs."],
    ["Common problems from physiology", "- Acidosis follows sudden grain overfeeding, as lactic acid builds and rumen pH falls.\n- Frothy bloat is related to legume pasture.\n- Ketosis and low milk fat are linked to energy and fibre balance. These are conceptual links only. Diagnosis and treatment belong to a veterinarian."]
  ],
  tb: { h: ["VFA", "Main fate"], r: [["Acetate", "Energy and milk fat synthesis"], ["Propionate", "Glucose synthesis in the liver"], ["Butyrate", "Converted to ketones in rumen wall, energy"]] },
  k: ["VFAs and their roles.", "Role of saliva.", "Rumination and eructation.", "Rumen microbial protein.", "Why cobalt is needed."],
  m: ["Ruminants do not digest cellulose with their own enzymes. Their microbes do."],
  sa: [["Which VFA is the main glucose precursor?", "Propionate."], ["What is eructation?", "Belching of fermentation gases from the rumen."]],
  la: [["Describe rumen fermentation and its significance.", "Microbes, substrates, VFAs, gases, protein synthesis, vitamins, buffering, rumen pH, disorders in outline."]],
  q: [["The main glucose precursor in ruminants is", ["Acetate", "Propionate", "Butyrate", "Methane"], 1, "Propionate goes to gluconeogenesis."],
    ["Rumen saliva mainly provides", ["Acid", "Buffers", "Enzymes for cellulose", "Bile"], 1, "Bicarbonate and phosphate buffers."],
    ["Vitamin B12 synthesis by rumen microbes needs", ["Iron", "Cobalt", "Zinc", "Copper"], 1, "Cobalt."]],
  f: [["Rumination", "Regurgitation, rechewing and reswallowing of cud"], ["VFA", "Volatile fatty acid, end product of rumen fermentation"]],
  d: ["Read about hindgut fermentation in the horse.", "Study bile and fat digestion."]
});

topic("phys", "Renal Physiology and Endocrine Basics", {
  i: "The kidneys control water, salts and waste. Hormones coordinate the body over longer time scales.",
  s: "Blood is filtered in the kidney. Useful things are taken back, wastes and extra water leave as urine. Hormones are chemical messengers carried in blood.",
  n: [
    ["The nephron", "Each nephron has a glomerulus and a tubule: proximal convoluted tubule, loop of Henle, distal convoluted tubule and collecting duct. Filtration at the glomerulus forms an ultrafiltrate of plasma without proteins and cells. Most reabsorption (about two thirds of water and sodium, and almost all glucose and amino acids) occurs in the proximal tubule."],
    ["Concentrating urine", "The loop of Henle and the medullary gradient let the kidney make concentrated urine. ADH (antidiuretic hormone) from the posterior pituitary makes the collecting duct permeable to water, so more water is reabsorbed. Aldosterone from the adrenal cortex increases sodium reabsorption and potassium excretion. Desert animals and dogs have long loops and concentrate urine strongly."],
    ["Acid-base role", "The kidney excretes hydrogen ions and regenerates bicarbonate. Together with lung and buffers, it keeps blood pH around 7.4."],
    ["Endocrine glands", "- Hypothalamus and pituitary: control centre. The anterior pituitary makes GH, ACTH, TSH, FSH, LH and prolactin. The posterior pituitary releases ADH and oxytocin.\n- Thyroid: T3 and T4 control metabolic rate.\n- Parathyroid: PTH raises blood calcium.\n- Adrenal: cortex makes cortisol and aldosterone, medulla makes adrenaline.\n- Pancreas: insulin lowers blood glucose, glucagon raises it.\n- Gonads: oestrogen, progesterone, testosterone."],
    ["Calcium control", "Blood calcium is tightly regulated by PTH, calcitonin and vitamin D. This is why milk fever in dairy cows, a sudden fall in blood calcium at calving, is a physiology lesson as much as a disease."]
  ],
  tb: { h: ["Hormone", "Source", "Main action"], r: [["ADH", "Posterior pituitary", "Water reabsorption in collecting duct"], ["Aldosterone", "Adrenal cortex", "Na+ reabsorption, K+ excretion"], ["Insulin", "Pancreas beta cells", "Lowers blood glucose"], ["PTH", "Parathyroid", "Raises blood calcium"], ["Oxytocin", "Posterior pituitary release", "Uterine contraction, milk let-down"]] },
  k: ["Parts of the nephron.", "Role of ADH and aldosterone.", "Hormones of pituitary.", "Calcium regulation."],
  m: ["Hormones travel in blood. Nerves carry impulses. The two systems work together."],
  sa: [["What does ADH do?", "It increases water permeability of the collecting duct so that more water is reabsorbed."], ["Which hormone lowers blood glucose?", "Insulin."]],
  la: [["Describe the physiology of urine formation.", "Filtration, reabsorption, secretion, handling by each part of the nephron, ADH, aldosterone, counter-current mechanism."]],
  q: [["Most glucose is reabsorbed in the", ["Loop of Henle", "Proximal tubule", "Collecting duct", "Distal tubule"], 1, "Proximal tubule."],
    ["Milk let-down is caused by", ["Prolactin", "Oxytocin", "ADH", "Insulin"], 1, "Oxytocin."],
    ["PTH", ["Lowers blood calcium", "Raises blood calcium", "Raises blood sugar", "Lowers blood pressure"], 1, "Raises blood calcium."]],
  f: [["GFR", "Glomerular filtration rate"], ["Counter-current", "Mechanism creating the medullary concentration gradient"]],
  d: ["Learn the physiology of lactation.", "Study reproductive hormones of the oestrous cycle."]
});
planned("phys", ["Nerve and muscle physiology", "Special senses", "Reproductive physiology and the oestrous cycle", "Lactation physiology", "Avian physiology and egg formation", "Acid-base balance", "Growth and development", "Environmental physiology and heat stress", "Immunity in outline", "Physiology of exercise in the horse and greyhound"]);

/* ================= BIOCHEMISTRY ================= */
unit("bioc", "Unit 1 – Biomolecules");
topic("bioc", "Introduction to Biochemistry, Water and Buffers", {
  i: "Biochemistry is the chemistry of living things. It explains how molecules build, break down and control life.",
  s: "Your body is made of a few big groups of molecules: carbohydrates, proteins, lipids and nucleic acids. All of them work in water, so water and pH matter a great deal.",
  n: [
    ["Why vets study biochemistry", "Blood tests (glucose, urea, creatinine, enzymes, bilirubin), metabolic diseases like ketosis and milk fever, nutrition, drug metabolism and the molecular basis of disease all depend on biochemistry."],
    ["Water", "Water is a polar molecule that forms hydrogen bonds. It is the universal solvent, has a high specific heat which protects against sudden temperature change, and takes part in reactions such as hydrolysis."],
    ["pH and buffers", "pH is the negative logarithm of hydrogen ion concentration. A buffer resists change in pH. The main blood buffer is the bicarbonate system: CO2 + H2O <-> H2CO3 <-> H+ + HCO3-. Proteins (haemoglobin especially) and phosphate also buffer. Normal blood pH is about 7.35 to 7.45. Acidosis is a fall below normal and alkalosis a rise above it. The Henderson-Hasselbalch equation links pH, pKa and the ratio of base to acid."],
    ["Biomolecules and their units", "Small monomers join into polymers. Monosaccharides make carbohydrates, amino acids make proteins, nucleotides make nucleic acids, and fatty acids with glycerol make fats."]
  ],
  tb: { h: ["Biomolecule", "Unit", "Main role"], r: [["Carbohydrate", "Monosaccharide", "Energy, storage"], ["Protein", "Amino acid", "Structure, enzymes, transport"], ["Lipid", "Fatty acid + glycerol", "Energy, membranes"], ["Nucleic acid", "Nucleotide", "Genetic information"]] },
  k: ["Define biochemistry.", "Properties of water.", "Buffer systems of blood.", "Acidosis and alkalosis."],
  m: ["A buffer does not stop pH changing. It reduces the change."],
  sa: [["What is a buffer?", "A solution that resists change in pH when small amounts of acid or base are added."], ["Normal blood pH?", "About 7.35 to 7.45."]],
  la: [["Write an essay on biomolecules and their importance in veterinary science.", "Four main classes, monomers, functions, vitamins and minerals, clinical examples like ketosis and blood urea."]],
  q: [["The main extracellular buffer is", ["Phosphate", "Bicarbonate", "Haemoglobin", "Ammonia"], 1, "The bicarbonate system."],
    ["Monomer of proteins", ["Glucose", "Amino acid", "Nucleotide", "Fatty acid"], 1, "Amino acid."],
    ["pH below 7.35 indicates", ["Alkalosis", "Acidosis", "Normal", "Hypoxia only"], 1, "Acidosis."]],
  f: [["Hydrolysis", "Splitting a bond by adding water"], ["Buffer", "Resists change in pH"]],
  d: ["Work through Henderson-Hasselbalch problems.", "Learn the anion gap."]
});

topic("bioc", "Carbohydrates", {
  i: "Carbohydrates are the main energy source in most diets. They include sugars, starch and cellulose.",
  s: "Glucose is the sugar your cells burn. Plants store sugar as starch, animals store it as glycogen. Cellulose is plant fibre that only microbes can break down.",
  n: [
    ["Classification", "Monosaccharides: glucose, fructose, galactose (also ribose, deoxyribose). Disaccharides: sucrose (glucose + fructose), lactose (glucose + galactose), maltose (glucose + glucose). Polysaccharides: starch (amylose and amylopectin), glycogen, cellulose, chitin and heparin. Glucose is an aldose and fructose a ketose."],
    ["Properties", "Reducing sugars have a free aldehyde or ketone group, like glucose, maltose and lactose. Sucrose is non-reducing. Benedict's test detects reducing sugars. Cellulose has beta 1,4 linkages that mammal enzymes cannot split. Starch and glycogen have alpha linkages. Glycogen is more branched than starch."],
    ["Digestion and absorption", "Amylase cuts starch. Disaccharidases on the intestinal brush border (maltase, sucrase, lactase) make monosaccharides, which are absorbed. Lactase falls after weaning in many species, so adult animals may not tolerate much milk and can get diarrhoea."],
    ["Glycoproteins and others", "Sugars attach to proteins and lipids as glycoproteins and glycolipids on cell surfaces. Blood group antigens are an example. Glycosaminoglycans like hyaluronic acid are in joints and connective tissue."]
  ],
  tb: { h: ["Type", "Examples", "Made of"], r: [["Monosaccharide", "Glucose, fructose, galactose", "Single sugar"], ["Disaccharide", "Sucrose, lactose, maltose", "Two sugars"], ["Polysaccharide", "Starch, glycogen, cellulose", "Many glucose units"]] },
  k: ["Classification with examples.", "Reducing vs non-reducing sugars.", "Storage polysaccharides.", "Why cellulose is indigestible without microbes."],
  m: ["All sugars are not equally digestible. Cellulose is a carbohydrate but indigestible without microbes."],
  sa: [["What is sucrose made of?", "Glucose and fructose."], ["Why is sucrose non-reducing?", "Both anomeric carbons are involved in the glycosidic bond, so no free aldehyde or ketone is available."]],
  la: [["Classify carbohydrates with examples and write about polysaccharides.", "Mono-, di- and polysaccharides, structure of starch, glycogen and cellulose, comparison table, biological importance."]],
  q: [["Lactose contains", ["Glucose + glucose", "Glucose + galactose", "Glucose + fructose", "Fructose + galactose"], 1, "Glucose and galactose."],
    ["Animal storage carbohydrate is", ["Starch", "Cellulose", "Glycogen", "Inulin"], 2, "Glycogen."],
    ["Benedict's test detects", ["Proteins", "Reducing sugars", "Lipids", "Nucleic acids"], 1, "Reducing sugars."],
    ["Cellulose has which linkage?", ["Alpha 1,4", "Beta 1,4", "Alpha 1,6", "Peptide"], 1, "Beta 1,4."]],
  f: [["Glycogen", "Branched glucose polymer stored in liver and muscle"], ["Lactase", "Enzyme that splits lactose"]],
  d: ["Study glycolysis in detail.", "Learn blood glucose regulation."]
});

topic("bioc", "Proteins and Amino Acids", {
  i: "Proteins do most of the work in cells. They are chains of amino acids folded into precise shapes.",
  s: "Amino acids are joined like beads on a string by peptide bonds. The shape of the folded chain decides what the protein can do.",
  n: [
    ["Amino acids", "There are 20 standard amino acids. Each has an amino group, a carboxyl group and a side chain (R group). Essential amino acids cannot be made in enough amounts by the animal and must come from the diet. Cats need taurine and arginine in the diet. Amino acids are amphoteric and have an isoelectric point."],
    ["Levels of structure", "Primary: the amino acid sequence, held by peptide bonds. Secondary: alpha helix and beta sheet, held by hydrogen bonds. Tertiary: overall 3D shape from several bond types. Quaternary: several chains together, as in haemoglobin with four subunits."],
    ["Classification", "Simple proteins (albumin, globulin), conjugated proteins (haemoglobin a chromoprotein, casein a phosphoprotein, glycoproteins, lipoproteins) and derived proteins. By shape: globular and fibrous. Collagen and keratin are fibrous."],
    ["Functions", "Structure, enzymes, transport (haemoglobin, albumin), defence (immunoglobulins), hormones (insulin) and contraction (actin and myosin)."],
    ["Denaturation", "Denaturation is loss of higher-order structure by heat, strong acid or base, or heavy metals. Peptide bonds stay intact, so the sequence is unchanged. Cooking an egg denatures proteins, and so does the acid in the stomach."],
    ["Amino acid metabolism", "Amino groups are removed by transamination and deamination. The ammonia released is toxic and the liver converts it to urea in the urea cycle in mammals. Birds make uric acid. ALT and AST are enzymes that rise in liver damage."]
  ],
  tb: { h: ["Level", "Describes", "Held by"], r: [["Primary", "Sequence", "Peptide bonds"], ["Secondary", "Helix, sheet", "Hydrogen bonds"], ["Tertiary", "3D fold", "Several bonds"], ["Quaternary", "Several chains", "Non-covalent bonds"]] },
  k: ["Peptide bond.", "Four structural levels.", "Essential amino acids.", "Denaturation.", "Urea cycle and uric acid."],
  m: ["Denaturation does not break peptide bonds."],
  sa: [["What is a peptide bond?", "A covalent bond between the carboxyl group of one amino acid and the amino group of the next."], ["Why do birds excrete uric acid?", "It conserves water, since it is almost insoluble. It suits the egg, where wastes must be stored."]],
  la: [["Describe the structure and classification of proteins.", "Amino acids, peptide bond, four levels, classification, functions, denaturation."]],
  q: [["Which structure level is held by hydrogen bonds between backbone groups?", ["Primary", "Secondary", "Tertiary", "Quaternary"], 1, "Alpha helix and beta sheet."],
    ["Cats specifically require in the diet", ["Taurine", "Vitamin C", "Cellulose", "Lactose"], 0, "Taurine."],
    ["Mammals excrete excess nitrogen mainly as", ["Uric acid", "Urea", "Ammonia", "Creatinine"], 1, "Urea."],
    ["Haemoglobin is a", ["Simple protein", "Chromoprotein", "Lipoprotein", "Derived protein"], 1, "A conjugated chromoprotein."]],
  f: [["Essential amino acid", "Must be supplied by the diet"], ["Transamination", "Transfer of an amino group between amino acids and keto acids"]],
  d: ["Learn the urea cycle steps.", "Study plasma protein electrophoresis."]
});

topic("bioc", "Lipids and Lipoproteins", {
  i: "Lipids are a varied group that does not dissolve in water. Fats, oils, waxes and steroids are all lipids.",
  s: "Fat is long-term energy storage and gives more than twice the energy of carbohydrate per gram. Lipids also build the membrane around every cell.",
  n: [
    ["Classification", "Simple lipids: fats, oils, waxes. Compound lipids: phospholipids, glycolipids, lipoproteins. Derived lipids: fatty acids, steroids (cholesterol), fat-soluble vitamins. Triglycerides are glycerol with three fatty acids."],
    ["Fatty acids", "Saturated fatty acids have no double bonds and are usually solid at room temperature. Unsaturated ones have one or more double bonds. Essential fatty acids are linoleic and alpha-linolenic acids. Cats also need arachidonic acid. Energy yield is about 9 kcal per gram against about 4 for carbohydrates and proteins."],
    ["Digestion", "Bile salts emulsify fat. Pancreatic lipase splits it into fatty acids and monoglycerides. These form micelles, enter intestinal cells, are rebuilt into triglycerides and packed into chylomicrons that go through lymph into the blood. Ruminants digest less fat and too much dietary fat can upset rumen microbes."],
    ["Lipoproteins", "Chylomicrons carry dietary fat, VLDL carries liver-made triglycerides, LDL carries cholesterol to tissues and HDL brings cholesterol back to the liver. Lipoprotein patterns differ widely between species."],
    ["Fat metabolism", "Beta oxidation breaks fatty acids into acetyl-CoA in mitochondria. When fat is mobilised faster than it can be burnt fully, ketone bodies (acetoacetate, beta-hydroxybutyrate, acetone) build up. This is the basis of ketosis in dairy cows and pregnancy toxaemia in sheep. Fatty liver in cows is also linked to heavy fat mobilisation."],
    ["Cholesterol", "Cholesterol is part of membranes and the precursor of steroid hormones, bile acids and vitamin D. It is not only harmful."]
  ],
  tb: { h: ["Class", "Examples", "Role"], r: [["Simple", "Fats, oils, waxes", "Energy store"], ["Compound", "Phospholipids, glycolipids", "Membranes"], ["Derived", "Cholesterol, steroids", "Hormones, bile acids"]] },
  k: ["Classification.", "Essential fatty acids.", "Lipoproteins.", "Beta oxidation and ketone bodies.", "Chylomicron."],
  m: ["Cholesterol is not just a villain. Cells need it."],
  sa: [["Name the ketone bodies.", "Acetoacetate, beta-hydroxybutyrate and acetone."], ["Name the essential fatty acids.", "Linoleic and alpha-linolenic acids."]],
  la: [["Classify lipids and describe their digestion and metabolism.", "Classes, fatty acids, digestion, absorption, lipoproteins, beta oxidation, ketone body formation."]],
  q: [["Energy per gram of fat is about", ["4 kcal", "7 kcal", "9 kcal", "2 kcal"], 2, "About 9 kcal."],
    ["Which lipoprotein carries dietary fat?", ["HDL", "LDL", "Chylomicron", "VLDL"], 2, "Chylomicrons."],
    ["Beta oxidation takes place in the", ["Cytoplasm", "Mitochondria", "Nucleus", "Golgi"], 1, "Mitochondria."]],
  f: [["Chylomicron", "Lipoprotein carrying dietary fat from the gut"], ["Ketone bodies", "Fuel molecules from incomplete fat oxidation"]],
  d: ["Learn the details of ketosis in dairy cows.", "Study cholesterol synthesis."]
});

unit("bioc", "Unit 2 – Enzymes, vitamins and metabolism");
topic("bioc", "Enzymes and Clinical Enzymology", {
  i: "Enzymes are biological catalysts, nearly all proteins, that speed up reactions without being used up.",
  s: "An enzyme has a pocket called the active site. The substrate fits in, the reaction occurs, and the product leaves. Heat, wrong pH or poisons change the shape and the enzyme stops working.",
  n: [
    ["How enzymes work", "Enzymes lower the activation energy. Models: lock and key, and induced fit. Some need a cofactor (metal ion) or a coenzyme (organic molecule, often from a vitamin, like NAD from niacin). The protein part alone is the apoenzyme, the whole active enzyme is the holoenzyme."],
    ["Factors affecting activity", "Temperature (rises then drops when denatured), pH (each enzyme has an optimum), substrate concentration, enzyme concentration and inhibitors. Km is the substrate concentration giving half of maximum velocity. A low Km means high affinity."],
    ["Inhibition", "Competitive inhibitors resemble the substrate and compete for the active site, so Vmax is unchanged and Km rises. Non-competitive inhibitors bind elsewhere and lower Vmax. Many drugs and poisons work as enzyme inhibitors, for example organophosphates inhibit acetylcholinesterase."],
    ["Classes", "Oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases."],
    ["Clinical enzymes", "Enzymes leak into blood when cells are damaged. ALT is mainly liver in dogs and cats. AST is in liver and muscle. CK (creatine kinase) rises in muscle damage. ALP rises in bile duct disease and in growing animals. GGT is a marker of bile duct disease and in cattle also of liver damage. Amylase and lipase are linked to the pancreas. Interpretation always needs the species and the clinical picture."]
  ],
  tb: { h: ["Class", "Reaction"], r: [["Oxidoreductase", "Oxidation-reduction"], ["Transferase", "Group transfer"], ["Hydrolase", "Cleavage with water"], ["Lyase", "Removal of a group without water"], ["Isomerase", "Rearrangement"], ["Ligase", "Joining using ATP"]] },
  k: ["Factors affecting activity.", "Competitive vs non-competitive inhibition.", "Six classes.", "Diagnostic enzymes."],
  m: ["Enzymes are not used up in reactions."],
  sa: [["Define Km.", "The substrate concentration at which the reaction velocity is half of Vmax."], ["Name an enzyme that rises in muscle damage.", "Creatine kinase (CK)."]],
  la: [["Describe the mechanism of enzyme action and factors affecting it.", "Active site, models, cofactors, factors, inhibition, Michaelis-Menten, classification, clinical use."]],
  q: [["Competitive inhibition", ["Lowers Vmax, Km unchanged", "Raises Km, Vmax unchanged", "Lowers both", "Raises both"], 1, "Substrate can overcome the inhibitor, so Vmax stays, apparent Km rises."],
    ["Hydrolases", ["Join molecules with ATP", "Split with water", "Move electrons", "Rearrange"], 1, "They cleave using water."],
    ["Organophosphates inhibit", ["Acetylcholinesterase", "Amylase", "Catalase", "Lipase"], 0, "A classic enzyme poisoning."],
    ["The protein part without cofactor", ["Holoenzyme", "Apoenzyme", "Coenzyme", "Zymogen"], 1, "Apoenzyme."]],
  f: [["Zymogen", "Inactive enzyme precursor, e.g. pepsinogen"], ["ALP", "Alkaline phosphatase"]],
  d: ["Learn Michaelis-Menten kinetics.", "Study allosteric enzymes."]
});

topic("bioc", "Vitamins and Minerals", {
  i: "Vitamins are organic compounds needed in small amounts. Minerals are inorganic elements with many structural and functional jobs.",
  s: "Vitamins are fat-soluble (A, D, E, K) or water-soluble (B group, C). Each has a job and a deficiency disease. Ruminant microbes make B vitamins for the cow.",
  n: [
    ["Fat-soluble vitamins", "- A: vision, epithelial health. Deficiency gives night blindness and poor growth.\n- D: calcium and phosphorus absorption. Deficiency gives rickets in young animals and osteomalacia in adults.\n- E: antioxidant. With selenium, deficiency gives white muscle disease in calves and lambs.\n- K: clotting factors. Deficiency or antagonism gives bleeding."],
    ["Water-soluble vitamins", "B1 (thiamine): carbohydrate metabolism, deficiency causes polioencephalomalacia in ruminants. B2, B3 (niacin), B5, B6, biotin, folate and B12 are mostly coenzymes. B12 needs cobalt in ruminants. Vitamin C is a collagen and antioxidant vitamin that most domestic animals can synthesise. Guinea pigs and primates cannot."],
    ["Macrominerals", "Calcium and phosphorus: bone, milk, muscle, nerve function. Magnesium: enzymes. Hypomagnesaemia gives grass tetany. Sodium, potassium and chloride: fluid balance and nerves. Sulphur: amino acids."],
    ["Trace minerals", "Iron (haemoglobin), copper (enzymes, deficiency gives swayback in lambs), zinc (skin, parakeratosis), selenium (antioxidant enzymes), iodine (thyroid hormones, deficiency gives goitre), cobalt (B12), manganese (bone, perosis in poultry)."],
    ["Species notes", "Cats cannot convert beta-carotene to vitamin A so need preformed vitamin A. Ruminants can make vitamin K and B vitamins in the rumen. Sheep are very sensitive to copper toxicity. Excess fat-soluble vitamins can be harmful."]
  ],
  tb: { h: ["Nutrient", "Function", "Deficiency example"], r: [["Vitamin A", "Vision, epithelium", "Night blindness"], ["Vitamin D", "Ca and P absorption", "Rickets"], ["Vitamin E + Se", "Antioxidant", "White muscle disease"], ["Vitamin K", "Clotting factors", "Haemorrhage"], ["Iodine", "Thyroid hormones", "Goitre"], ["Copper", "Enzymes", "Swayback in lambs"], ["Cobalt", "B12 synthesis", "Wasting disease in ruminants"]] },
  k: ["Fat vs water soluble vitamins.", "Deficiency diseases.", "Trace elements.", "Species differences."],
  m: ["More vitamins do not always mean better health."],
  sa: [["Which vitamin is needed for clotting?", "Vitamin K."], ["Which mineral deficiency causes goitre?", "Iodine."]],
  la: [["Classify vitamins and describe their functions and deficiency diseases.", "Two groups, each vitamin with function and deficiency, trace elements, species notes."]],
  q: [["White muscle disease is linked with", ["Vitamin A", "Vitamin E and selenium", "Vitamin K", "Zinc"], 1, "E and selenium."],
    ["Cobalt is needed for", ["Vitamin B12", "Vitamin C", "Vitamin A", "Hb only"], 0, "B12 synthesis by rumen microbes."],
    ["Which animal cannot make vitamin C?", ["Dog", "Cow", "Guinea pig", "Goat"], 2, "Guinea pig."],
    ["Swayback in lambs is a deficiency of", ["Copper", "Iron", "Calcium", "Sodium"], 0, "Copper."]],
  f: [["Rickets", "Poor bone mineralisation in young animals, vitamin D deficiency"], ["Grass tetany", "Low magnesium in blood, often in lactating cows on lush grass"]],
  d: ["Learn the calcium and phosphorus ratio in rations.", "Read about copper toxicity in sheep."]
});

topic("bioc", "Metabolism: Glycolysis, TCA Cycle and Energy", {
  i: "Metabolism is the sum of all chemical reactions in the body. It releases energy from food and uses it for building and work.",
  s: "Catabolism breaks things down and releases energy. Anabolism builds things and uses energy. The cell's energy currency is ATP.",
  n: [
    ["Glycolysis", "Glucose (6C) is split into two pyruvate (3C) in the cytoplasm. Net gain is 2 ATP and 2 NADH. With oxygen, pyruvate enters mitochondria as acetyl-CoA. Without oxygen, pyruvate becomes lactate, which allows glycolysis to continue in muscle during hard exercise and in red blood cells, which have no mitochondria."],
    ["TCA cycle and respiratory chain", "The TCA (Krebs) cycle runs in the mitochondrial matrix. Acetyl-CoA is oxidised to CO2, producing NADH and FADH2. The electron transport chain in the inner membrane passes electrons to oxygen and pumps protons, and ATP synthase makes most of the ATP. One glucose gives roughly 30 to 32 ATP in total."],
    ["Glycogen and gluconeogenesis", "Glycogenesis builds glycogen. Glycogenolysis breaks it down. Gluconeogenesis makes glucose from non-sugar sources like lactate, glycerol and amino acids. Ruminants absorb very little glucose from the gut and rely heavily on gluconeogenesis from propionate."],
    ["Pentose phosphate pathway", "This pathway makes NADPH and ribose. NADPH is needed for fat synthesis and for protecting red cells against oxidative damage."],
    ["Fed and fasting state", "After a meal, insulin favours storage. During fasting, glucagon and adrenaline favour glycogen breakdown, gluconeogenesis and fat mobilisation. Prolonged energy shortage raises ketone bodies."],
    ["Clinical links", "Ketosis in early lactation, pregnancy toxaemia in ewes carrying twins and hypoglycaemia in newborn piglets all show what happens when energy supply cannot meet demand. Details of treatment belong to a veterinarian."]
  ],
  tb: { h: ["Stage", "Location", "Output"], r: [["Glycolysis", "Cytoplasm", "2 pyruvate, 2 net ATP, 2 NADH"], ["TCA cycle", "Mitochondrial matrix", "NADH, FADH2, CO2"], ["Oxidative phosphorylation", "Inner mitochondrial membrane", "Most ATP"]] },
  k: ["Glycolysis net ATP.", "Site of each stage.", "Gluconeogenesis in ruminants.", "Anaerobic glycolysis in RBCs."],
  m: ["Anaerobic does not mean no energy. It gives a small amount quickly."],
  sa: [["Where does glycolysis occur?", "In the cytoplasm."], ["Define gluconeogenesis.", "Formation of glucose from non-carbohydrate sources like lactate, glycerol and amino acids."]],
  la: [["Describe glycolysis and the TCA cycle with energy yield.", "Steps, enzymes of key steps, location, ATP balance, anaerobic route, regulation, clinical links."]],
  q: [["Net ATP from glycolysis", ["1", "2", "4", "36"], 1, "Net 2 ATP."],
    ["TCA cycle occurs in", ["Cytoplasm", "Mitochondrial matrix", "Nucleus", "ER"], 1, "Matrix."],
    ["RBCs depend on", ["Beta oxidation", "TCA cycle", "Anaerobic glycolysis", "Gluconeogenesis"], 2, "They have no mitochondria."]],
  f: [["ATP", "Energy currency of the cell"], ["Gluconeogenesis", "Glucose from non-carbohydrate sources"]],
  d: ["Study each enzyme of glycolysis.", "Learn the regulation of metabolism by hormones."]
});
planned("bioc", ["Nucleic acids and protein synthesis", "Haem synthesis and bilirubin metabolism", "Urea cycle in detail", "Biochemistry of milk", "Biochemistry of muscle contraction", "Blood biochemical tests and their interpretation", "Hormone biochemistry", "Biochemical techniques: chromatography, electrophoresis, spectrophotometry"]);
/* ================= PHARMACOLOGY ================= */
unit("pharm", "Unit 1 – General pharmacology");
topic("pharm", "Introduction, Terminology and Sources of Drugs", {
  i: "Pharmacology is the study of drugs and how they affect living systems. It is the base for safe, rational treatment.",
  s: "A drug is any substance used to prevent, diagnose or treat disease or to change how the body works. This module is theory only. A veterinarian chooses the drug and the dose for a real animal.",
  n: [
    ["Basic terms", "- Pharmacokinetics: what the body does to the drug.\n- Pharmacodynamics: what the drug does to the body.\n- Pharmacotherapeutics: use of drugs to treat disease.\n- Toxicology: harmful effects of chemicals.\n- Adverse effect: unwanted harmful response. Side effect: secondary effect.\n- Contraindication: situation in which a drug should not be used.\n- Pharmacopoeia: official book of drug standards.\n- Withdrawal period: time after the last dose before milk, meat or eggs may be used."],
    ["Sources", "Plants (digitalis, atropine, morphine), animals (insulin, heparin), minerals (magnesium sulphate), microbes (penicillin from Penicillium) and synthetic or semi-synthetic drugs. Modern drugs are mostly synthetic or made by recombinant technology."],
    ["Drug names", "A drug has a chemical name, a generic (non-proprietary) name and one or more brand names. Prescribers should use the generic name."],
    ["Why veterinary pharmacology is special", "Many species with different physiology, food-producing animals where residues matter, ruminants with the rumen, and animals that cannot report side effects. Cats lack efficient glucuronidation. Some dog breeds with the MDR1 gene mutation (many collie-type dogs) are sensitive to certain drugs like ivermectin at higher doses."],
    ["Residues and withdrawal", "Drug residues in milk and meat can harm consumers and cause antimicrobial resistance. This is why the correct withdrawal period is a legal and ethical duty."]
  ],
  tb: { h: ["Branch", "Studies"], r: [["Pharmacokinetics", "Absorption, distribution, metabolism, excretion"], ["Pharmacodynamics", "Mechanisms and effects"], ["Pharmacotherapeutics", "Treatment use"], ["Toxicology", "Poisons and adverse effects"]] },
  k: ["Definitions of drug, PK, PD.", "Withdrawal period.", "Sources of drugs with examples.", "Species differences."],
  m: ["Natural does not mean safe."],
  sa: [["What is a withdrawal period?", "The minimum time between the last drug dose and the use of milk, meat or eggs for human consumption."], ["Give two sources of drugs with examples.", "Plants: atropine. Animals: insulin."]],
  la: [["Define pharmacology and describe its branches and importance in veterinary practice.", "Definition, branches, terms, sources, species differences, residue issues."]],
  q: [["Study of what the body does to a drug is", ["Pharmacodynamics", "Pharmacokinetics", "Toxicology", "Pharmacy"], 1, "PK."],
    ["Penicillin was obtained from", ["Plants", "Animals", "Fungi", "Minerals"], 2, "From the mould Penicillium."],
    ["Withdrawal period protects", ["The animal only", "Consumers", "The vet", "Manufacturers"], 1, "It prevents residues in food."]],
  f: [["Pharmacopoeia", "Official publication of drug standards"], ["Contraindication", "Condition in which a drug must not be used"]],
  d: ["Learn the drug legislation applicable to veterinarians in India.", "Study the rational use of antimicrobials."]
});

topic("pharm", "Routes of Administration and Dosage Forms", {
  i: "The route decides how fast and how completely a drug reaches the blood. This is a concept topic with no doses.",
  s: "A drug can go in through the mouth, by injection, through the skin or by inhalation. Each route has good and bad points.",
  n: [
    ["Enteral routes", "Oral and rectal. Oral is convenient and safe but absorption is variable and the first-pass effect in the liver can destroy part of the drug. In ruminants, an oral drug mixes with rumen contents and may be altered by rumen microbes, and absorption is slow."],
    ["Parenteral routes", "Intravenous (IV): direct into blood, fastest, 100 percent bioavailability, no recall once given. Intramuscular (IM): fairly fast, depends on blood flow. Subcutaneous (SC): slower, for smaller volumes. Intraperitoneal: used in small animals. Intradermal: for tests such as tuberculin test. Intrathecal and epidural: around the spinal cord."],
    ["Other routes", "Topical (skin, eye, ear), inhalation (anaesthetic gases), intramammary (mastitis preparations, which need withdrawal periods) and transdermal."],
    ["Dosage forms", "Solid: tablets, boluses, capsules, powders. Liquid: solutions, suspensions, emulsions. Semisolid: ointments, creams, gels. Others: pessaries, premixes, pour-ons, implants. Boluses are common in large animals."],
    ["Bioavailability and first pass", "Bioavailability is the fraction of a dose that reaches the circulation unchanged. First-pass metabolism occurs when oral drugs are absorbed into the portal circulation and partly metabolised by the liver before reaching the body."]
  ],
  tb: { h: ["Route", "Speed", "Features"], r: [["IV", "Fastest", "100% bioavailability"], ["IM", "Fairly fast", "Depends on perfusion"], ["SC", "Slower", "Small volumes"], ["Oral", "Variable", "First-pass effect"], ["Topical", "Mostly local", "Skin and mucosa"]] },
  k: ["Enteral vs parenteral.", "First-pass effect.", "Routes with merits and demerits.", "Dosage forms."],
  m: ["Oral is not always best. It depends on the drug and the animal."],
  sa: [["What is first-pass metabolism?", "Metabolism of an orally absorbed drug in the liver before it reaches general circulation."], ["Which route gives 100% bioavailability?", "Intravenous."]],
  la: [["Describe routes of drug administration with advantages and limitations.", "Enteral, parenteral, topical, inhalation, species notes, bioavailability."]],
  q: [["Which route avoids absorption?", ["Oral", "IM", "IV", "SC"], 2, "IV puts the drug directly in blood."],
    ["A drug given by the parenteral route is given", ["By mouth", "Through the gut", "Other than the alimentary canal", "Only by IV"], 2, "Parenteral means not via the gut."],
    ["Tuberculin testing uses which route?", ["Intradermal", "Oral", "IV", "Rectal"], 0, "Intradermal."]],
  f: [["Bolus", "Large solid dosage form for large animals"], ["Premix", "Drug mixed with feed"]],
  d: ["Study injection sites in cattle and horses.", "Learn the advantages of long-acting injectables."]
});

topic("pharm", "Pharmacokinetics", {
  i: "Pharmacokinetics is what the body does to a drug over time: ADME.",
  s: "Absorption, Distribution, Metabolism, Excretion. The drug gets in, spreads out, is changed by the liver and leaves, mostly through the kidneys.",
  n: [
    ["Absorption", "Passage of a drug from its site of administration into blood. Passive diffusion is the main mechanism. Lipid-soluble, un-ionised drugs cross membranes easily. Weak acids are absorbed better in acid media and weak bases in alkaline media (the pH partition hypothesis). Blood flow to the site matters."],
    ["Distribution", "Movement from blood to tissues. Depends on blood flow, plasma protein binding (only free drug is active), and barriers such as the blood-brain barrier and placenta. Volume of distribution (Vd) is the apparent volume in which the drug is distributed."],
    ["Metabolism", "Mostly in the liver. Phase I: oxidation, reduction, hydrolysis, mainly by cytochrome P450 enzymes. Phase II: conjugation, for example with glucuronic acid. Enzyme inducers speed up metabolism, inhibitors slow it. Cats have poor glucuronidation. Dogs have poor acetylation. Pigs have limited sulphate conjugation."],
    ["Excretion", "Mainly by the kidney (filtration, secretion, reabsorption). Also bile, milk, lungs and sweat. Drugs excreted in milk matter in dairy animals and in nursing young. Weak acids are excreted faster in alkaline urine."],
    ["Key parameters", "Half-life (t1/2) is the time for plasma concentration to fall by half. Clearance is the volume of plasma cleared of drug per unit time. Steady state is reached after about 4 to 5 half-lives with repeated dosing. Bioavailability is the fraction reaching the circulation. These parameters explain why a drug may need dose changes in animals with kidney or liver disease, a decision for a veterinarian."]
  ],
  tb: { h: ["Step", "Main site", "Key idea"], r: [["Absorption", "Site of entry", "Route, solubility, pH"], ["Distribution", "Blood, tissues", "Blood flow, protein binding"], ["Metabolism", "Liver", "Phase I and II"], ["Excretion", "Kidney, bile, milk", "Clearance"]] },
  k: ["ADME with examples.", "Half-life.", "Phase I and II reactions.", "Protein binding.", "Species differences."],
  m: ["The liver is not the only organ that clears drugs."],
  sa: [["Define half-life.", "Time for the plasma concentration of a drug to fall by 50%."], ["Why is only free drug active?", "Protein-bound drug cannot cross membranes or bind its receptor."]],
  la: [["Describe the pharmacokinetic processes.", "ADME in detail, parameters, factors affecting each, species and disease effects."]],
  q: [["The main organ of drug metabolism is the", ["Kidney", "Liver", "Lung", "Spleen"], 1, "Liver."],
    ["Phase II reactions are", ["Oxidation", "Conjugation", "Reduction", "Hydrolysis"], 1, "Conjugation."],
    ["Steady state is reached after about", ["1 half-life", "4 to 5 half-lives", "10 half-lives", "Immediately"], 1, "4 to 5 half-lives."],
    ["Cats are slow at", ["Glucuronidation", "Absorption", "Filtration", "Respiration"], 0, "Poor glucuronide conjugation."]],
  f: [["Volume of distribution", "Apparent volume in which a drug is distributed"], ["Enzyme inducer", "Drug that increases metabolic enzyme activity"]],
  d: ["Learn first-order and zero-order kinetics.", "Study the effect of liver disease on drug handling."]
});

topic("pharm", "Pharmacodynamics and Drug-Receptor Concepts", {
  i: "Pharmacodynamics is what a drug does to the body and how it produces its effects.",
  s: "Most drugs attach to a receptor. An agonist switches the receptor on. An antagonist blocks it. How wide the gap is between a useful and a harmful amount is the therapeutic index.",
  n: [
    ["Receptors", "Receptors are mostly proteins. Types: ligand-gated ion channels (nicotinic receptor), G-protein-coupled receptors (muscarinic, adrenergic), enzyme-linked receptors (insulin) and intracellular receptors (steroids)."],
    ["Key terms", "Affinity: tendency to bind. Efficacy (intrinsic activity): ability to produce a response after binding. Potency: amount needed for a given effect. Agonist: affinity and efficacy. Partial agonist: lower efficacy. Antagonist: affinity but no efficacy. Competitive antagonists can be overcome by more agonist. Inverse agonists lower baseline activity."],
    ["Non-receptor actions", "Enzyme inhibition (NSAIDs inhibit cyclooxygenase), ion channel blocking (local anaesthetics block sodium channels), antimetabolites, chelation, osmotic effects (magnesium sulphate) and physical action (antacids)."],
    ["Dose-response and safety", "The dose-response curve relates dose to effect. ED50 is the dose effective in half the animals and LD50 is the dose lethal to half. Therapeutic index = LD50 / ED50. Larger means safer. Margin of safety and drug tolerance matter in practice."],
    ["Other concepts", "Tolerance is the need for larger doses with repeated use. Tachyphylaxis is rapid tolerance. Synergism is the combined effect being greater than the sum. Antagonism is the reverse. Idiosyncrasy is an unusual reaction in a particular individual. Hypersensitivity is an immune reaction to a drug."]
  ],
  tb: { h: ["Term", "Affinity", "Efficacy"], r: [["Agonist", "Yes", "Full"], ["Partial agonist", "Yes", "Lower"], ["Antagonist", "Yes", "None"]] },
  k: ["Agonist vs antagonist.", "Therapeutic index.", "Receptor types.", "Synergism and antagonism.", "Mechanisms without receptors."],
  m: ["An antagonist does not do nothing. It blocks the receptor."],
  sa: [["Define therapeutic index.", "The ratio LD50 / ED50, a measure of drug safety."], ["Give an example of a drug acting by enzyme inhibition.", "Aspirin and other NSAIDs inhibit cyclooxygenase."]],
  la: [["Explain drug receptor interactions and the terms used.", "Receptor types, affinity, efficacy, potency, agonist classes, antagonism, dose-response curve, therapeutic index, non-receptor mechanisms."]],
  q: [["Therapeutic index is", ["ED50 / LD50", "LD50 / ED50", "LD50 x ED50", "ED50 - LD50"], 1, "Bigger index, safer drug."],
    ["An antagonist has", ["Affinity and efficacy", "Efficacy only", "Affinity without efficacy", "Neither"], 2, "It binds but does not activate."],
    ["NSAIDs act by inhibiting", ["Cyclooxygenase", "Acetylcholinesterase", "DNA gyrase", "Proton pump"], 0, "COX."]],
  f: [["Efficacy", "Ability to produce a response after binding"], ["Tachyphylaxis", "Rapid development of tolerance"]],
  d: ["Study the autonomic nervous system and its drugs.", "Learn about drug interactions."]
});

topic("pharm", "Autonomic Drugs and Drug Groups: An Overview", {
  i: "Drugs are grouped by system and use. This overview names the major groups and their mechanism ideas, without doses.",
  s: "Learn each group by asking how it works, what it is used for in principle, and what its main risk is. Always check your textbook for each drug.",
  n: [
    ["Autonomic nervous system drugs", "Cholinergic drugs mimic acetylcholine (pilocarpine, neostigmine acts by blocking the breakdown enzyme). Anticholinergics such as atropine block muscarinic receptors and reduce secretions and gut movement. Adrenergic drugs mimic adrenaline. Beta blockers slow the heart. Alpha-2 agonists such as xylazine are used for sedation in animals."],
    ["Antimicrobials", "Beta-lactams (penicillins, cephalosporins) block cell wall synthesis. Aminoglycosides and tetracyclines inhibit protein synthesis. Fluoroquinolones inhibit DNA gyrase. Sulphonamides block folate synthesis. Antimicrobial resistance is a serious problem so use must be rational and guided by a veterinarian."],
    ["Anti-inflammatory and analgesic drugs", "NSAIDs inhibit cyclooxygenase. Corticosteroids are potent anti-inflammatory and immunosuppressive drugs with many side effects. Some NSAIDs, for example paracetamol, are dangerous in cats. Opioids act on opioid receptors and are tightly controlled."],
    ["Anaesthetics and sedatives", "Local anaesthetics block sodium channels in nerves. General anaesthetics produce unconsciousness. Sedatives and tranquillisers calm animals for handling and procedures. Pre-anaesthetic assessment is vital."],
    ["Antiparasitics", "Anthelmintics (benzimidazoles, macrocyclic lactones, levamisole), ectoparasiticides (pyrethroids, organophosphates) and antiprotozoals. Resistance to anthelmintics is a growing problem in sheep and goats."],
    ["Others", "Diuretics, cardiac drugs, drugs acting on the gut (antacids, laxatives, rumen stimulants), hormones (oxytocin, prostaglandins, insulin) and vitamins and minerals as therapeutic agents."]
  ],
  tb: { h: ["Group", "Mechanism idea", "Example class"], r: [["Beta-lactams", "Cell wall synthesis block", "Penicillins"], ["Aminoglycosides", "Protein synthesis block", "Gentamicin type"], ["NSAIDs", "COX inhibition", "Meloxicam type"], ["Alpha-2 agonists", "Sedation, analgesia", "Xylazine type"], ["Macrocyclic lactones", "Parasite chloride channel effect", "Ivermectin type"]] },
  k: ["Mechanisms of antimicrobial groups.", "Autonomic drug classes.", "Antimicrobial resistance.", "NSAID cautions in species."],
  m: ["Antibiotics do not work on viruses."],
  sa: [["How do beta-lactams act?", "By blocking bacterial cell wall synthesis."], ["Name an alpha-2 agonist used in animals.", "Xylazine."]],
  la: [["Classify antimicrobials with their mechanism of action.", "Table of class, mechanism, spectrum, examples, with resistance note."]],
  q: [["Atropine is", ["A muscarinic antagonist", "An opioid", "An NSAID", "An aminoglycoside"], 0, "It blocks muscarinic receptors."],
    ["Fluoroquinolones inhibit", ["Cell wall synthesis", "DNA gyrase", "Folate synthesis", "Ribosomes"], 1, "DNA gyrase."],
    ["Paracetamol is dangerous in", ["Cattle", "Cats", "Horses", "Sheep"], 1, "Cats cannot conjugate it safely."]],
  f: [["Anthelmintic", "Drug that kills or expels worms"], ["AMR", "Antimicrobial resistance"]],
  d: ["Learn the spectrum of each antibiotic group.", "Study the drugs allowed in food animals."]
});

topic("pharm", "Toxicology: Principles and Common Poisonings", {
  i: "Toxicology is the study of poisons and their effects. In livestock, many poisonings are linked to plants, feed, chemicals and snakebite.",
  s: "A poison is any substance that harms an animal at a certain dose. The old rule still holds: the dose makes the poison. Early recognition and a veterinarian's help are what save animals.",
  n: [
    ["Principles", "Toxicity depends on the dose, route, species, age, health status and how long exposure lasts. Acute poisoning follows a single large exposure. Chronic poisoning follows repeated small exposures. Bioaccumulation and biomagnification concentrate some poisons in the food chain."],
    ["Common poisonings in India (overview)", "- Organophosphates and carbamates: inhibit acetylcholinesterase, causing salivation, tremors and breathing trouble.\n- Nitrate and nitrite from fertiliser-rich forage: reduce oxygen-carrying capacity (methaemoglobin).\n- Cyanide from sorghum, Sudan grass and cassava: prevents cell respiration.\n- Aflatoxins from mouldy feed: damage the liver.\n- Snake venom: neurotoxic or haemotoxic depending on species.\n- Heavy metals such as lead, arsenic: lead from batteries and paint.\n- Urea and non-protein nitrogen overdose in ruminants: ammonia toxicity.\n- Rodenticides: anticoagulant types interfere with vitamin K."],
    ["General approach (concept)", "Stop further exposure, call a veterinarian at once, give what the vet advises, and record what the animal had access to. Antidotes are specific to each poison, and only a veterinarian should choose and give them. Do not induce vomiting or give home remedies without veterinary advice."],
    ["Residues and environmental toxicology", "Pesticide and drug residues in milk, meat and eggs, and heavy metals in feed are public health issues. The diclofenac effect on vultures is a famous case of a veterinary drug causing an environmental disaster."]
  ],
  tb: { h: ["Poison", "Main target or effect"], r: [["Organophosphate", "Acetylcholinesterase inhibition"], ["Nitrate", "Methaemoglobinaemia"], ["Cyanide", "Cytochrome oxidase block"], ["Aflatoxin", "Liver damage"], ["Anticoagulant rodenticide", "Vitamin K-dependent clotting"]] },
  k: ["Acute vs chronic toxicity.", "Mechanism of common poisons.", "Role of the vet.", "Residue concerns."],
  m: ["A poison has no fixed dose. It depends on species and conditions."],
  sa: [["How do organophosphates act?", "They inhibit acetylcholinesterase, so acetylcholine builds up at synapses."], ["Name a mycotoxin affecting the liver.", "Aflatoxin."]],
  la: [["Describe principles of toxicology and a few important poisonings.", "Definitions, factors, mechanisms, a table of poisons, general approach at concept level."]],
  q: [["Nitrate poisoning causes", ["Hypoglycaemia", "Methaemoglobinaemia", "Bone loss", "Hypocalcaemia"], 1, "Nitrite oxidises haemoglobin."],
    ["Aflatoxins come from", ["Plants", "Mould in feed", "Snakes", "Minerals"], 1, "Aspergillus growth in stored feed."],
    ["Vulture decline in India was linked to", ["Aflatoxin", "Diclofenac residues", "Lead", "Nitrate"], 1, "Diclofenac in carcasses."]],
  f: [["LD50", "Dose lethal to half the test animals"], ["Mycotoxin", "Toxin produced by fungi"]],
  d: ["Study poisonous plants of your region.", "Learn snake species and venom types in India."]
});
planned("pharm", ["Chemotherapy of parasitic diseases", "Antifungal and antiviral drugs", "Hormones and related drugs", "Drugs acting on the digestive tract", "Drugs for the cardiovascular and respiratory systems", "General and local anaesthetics", "Fluid therapy concepts", "Prescription writing and drug laws", "Pesticide and heavy metal poisoning in detail", "Plant poisonings of India"]);

/* ================= MICROBIOLOGY ================= */
unit("micro", "Unit 1 – General microbiology");
topic("micro", "Introduction to Microorganisms and History", {
  i: "Microbiology is the study of organisms too small to see without a microscope: bacteria, viruses, fungi, protozoa and others.",
  s: "Most microbes are harmless or helpful. Rumen microbes help cattle digest. A few are pathogens that cause disease. Microbiology tells us how to find them and stop them.",
  n: [
    ["History", "Antonie van Leeuwenhoek saw microbes with simple microscopes. Louis Pasteur disproved spontaneous generation, developed pasteurisation and the rabies vaccine. Robert Koch gave the postulates linking a microbe to a disease and developed pure culture methods. Edward Jenner used cowpox against smallpox. Joseph Lister introduced antiseptic surgery. Alexander Fleming discovered penicillin."],
    ["Koch's postulates", "1. The organism is found in every case of the disease. 2. It can be isolated in pure culture. 3. The culture causes the disease when given to a healthy susceptible animal. 4. The same organism is re-isolated. Some organisms, like viruses and Mycobacterium leprae, do not fit all postulates."],
    ["Groups of microbes", "Prokaryotes (bacteria, with no true nucleus), eukaryotes (fungi, protozoa), and viruses, which are acellular. Prions are infectious proteins that cause diseases like BSE and scrapie."],
    ["Microscopy and staining", "Light microscopes, dark field, phase contrast, fluorescence and electron microscopes are used. Gram stain divides bacteria into Gram positive (purple) and Gram negative (pink). Ziehl-Neelsen stain finds acid-fast bacteria such as Mycobacterium. Special stains are used for capsules, spores and flagella."],
    ["Normal flora", "Skin, gut and mucous membranes have normal flora that resist pathogens. Antibiotics can disturb it, causing diarrhoea and overgrowth of other organisms."]
  ],
  k: ["Koch's postulates.", "Contributions of Pasteur, Koch, Jenner, Lister, Fleming.", "Gram stain.", "Prions."],
  m: ["Not all microbes are harmful."],
  sa: [["State Koch's postulates.", "Organism present in every case, isolated in pure culture, causes disease when inoculated, and re-isolated."], ["What is a prion?", "An infectious misfolded protein without nucleic acid that causes diseases like scrapie and BSE."]],
  la: [["Describe the history and scope of microbiology.", "Contributions of pioneers, Koch's postulates, microbial groups, importance in vet science."]],
  q: [["Who developed pasteurisation?", ["Koch", "Pasteur", "Jenner", "Lister"], 1, "Louis Pasteur."],
    ["Acid-fast bacteria are seen with", ["Gram stain", "Ziehl-Neelsen stain", "India ink", "Giemsa"], 1, "ZN stain."],
    ["Prions contain", ["DNA", "RNA", "Only protein", "Lipid"], 2, "They are proteins."]],
  f: [["Koch", "Postulates and pure culture methods"], ["Pasteurisation", "Heating to kill pathogens without ruining the product"]],
  d: ["Learn the normal flora of the gut of different species.", "Study the history of vaccines."]
});

topic("micro", "Bacteria: Structure, Growth and Classification", {
  i: "Bacteria are single-celled prokaryotes with a wide range of shapes and lifestyles. Many are important veterinary pathogens.",
  s: "Bacteria have no nucleus. They have a cell wall, and some have a capsule, flagella or spores. Gram positive and Gram negative are the two big groups based on the cell wall.",
  n: [
    ["Shapes", "Cocci (spherical), bacilli (rod), spirilla and vibrios (curved) and spirochaetes (spiral). Arrangements include pairs (diplococci), chains (streptococci) and clusters (staphylococci)."],
    ["Structure", "Cell wall of peptidoglycan. Gram positive bacteria have a thick wall with teichoic acid. Gram negative bacteria have a thin wall and an outer membrane with lipopolysaccharide (LPS), the endotoxin. Capsule helps resist phagocytosis. Flagella give motility. Pili help attachment. Spores (Bacillus, Clostridium) resist heat and chemicals, and cause long survival in soil. Plasmids carry genes like drug resistance."],
    ["Growth", "Bacteria divide by binary fission. A growth curve has lag, log, stationary and death phases. Growth needs the right temperature, pH and nutrients. Aerobes need oxygen, anaerobes are harmed by it, facultative anaerobes grow either way, and microaerophiles need low oxygen. Culture media include nutrient agar, blood agar, MacConkey agar and selective or enrichment media."],
    ["Genetic exchange", "Transformation (naked DNA), transduction (by phage) and conjugation (plasmid transfer through pili) spread genes, including antibiotic resistance."],
    ["Important veterinary bacteria", "- Gram positive cocci: Staphylococcus aureus, Streptococcus species.\n- Gram positive rods: Bacillus anthracis (anthrax), Clostridium tetani, C. botulinum, C. perfringens.\n- Gram negative rods: Escherichia coli, Salmonella, Pasteurella multocida, Brucella.\n- Acid-fast: Mycobacterium bovis, M. tuberculosis, M. avium paratuberculosis.\n- Spirochaetes: Leptospira.\n- Cell wall-deficient: Mycoplasma."],
    ["Virulence factors", "Capsules, toxins (exotoxins from Gram positives like Clostridium, endotoxin from Gram negatives), enzymes (hyaluronidase, coagulase), adhesion factors and ability to evade immunity."]
  ],
  tb: { h: ["Feature", "Gram positive", "Gram negative"], r: [["Wall", "Thick peptidoglycan", "Thin peptidoglycan + outer membrane"], ["Stain colour", "Purple", "Pink"], ["Toxin", "Mostly exotoxin", "Endotoxin (LPS)"], ["Examples", "Staphylococcus, Clostridium", "E. coli, Salmonella"]] },
  k: ["Gram positive vs negative.", "Spores.", "Growth curve phases.", "Genetic exchange methods.", "Exotoxin vs endotoxin."],
  m: ["Spores are not a reproductive stage. They are a survival form."],
  sa: [["What is endotoxin?", "Lipopolysaccharide in the outer membrane of Gram negative bacteria, released on cell death."], ["Name three genetic exchange methods in bacteria.", "Transformation, transduction, conjugation."]],
  la: [["Describe the structure of a bacterial cell and its growth.", "Draw and label a cell, discuss wall types, capsule, flagella, spores, growth curve, nutritional types."]],
  q: [["Endotoxin is part of the wall of", ["Gram positive bacteria", "Gram negative bacteria", "Fungi", "Viruses"], 1, "LPS."],
    ["Bacillus anthracis forms", ["Cysts", "Spores", "Conidia", "Hyphae"], 1, "Spores."],
    ["Binary fission is", ["Sexual reproduction", "Asexual division", "Budding", "Spore formation"], 1, "Asexual division."],
    ["Plasmids often carry", ["Resistance genes", "Cell wall", "Ribosomes", "Flagella"], 0, "Resistance genes."]],
  f: [["Peptidoglycan", "Cell wall polymer of bacteria"], ["Conjugation", "Transfer of DNA by direct contact via pili"]],
  d: ["Learn the culture characteristics of each major bacterium.", "Study biochemical tests used for identification."]
});

topic("micro", "Viruses and Fungi", {
  i: "Viruses are tiny infectious particles that can only multiply inside living cells. Fungi are eukaryotic organisms including yeasts and moulds.",
  s: "A virus is a bit of genetic material in a protein coat, and it hijacks a host cell to make copies. Fungi are bigger, and some cause skin infections or make toxins in feed.",
  n: [
    ["Virus structure", "A virion has a nucleic acid genome (DNA or RNA, never both) inside a protein capsid. Some viruses also have a lipid envelope. Enveloped viruses are fragile and easily killed by disinfectants. Non-enveloped viruses, like parvovirus, are much more resistant."],
    ["Replication", "Attachment, penetration, uncoating, synthesis of components, assembly, release. Bacteriophages infect bacteria. Viruses can cause cell death, persistent infection, latency (herpesviruses) or cancer (oncogenic viruses). Interferons are an early antiviral defence."],
    ["Classification and examples", "- DNA viruses: Poxviridae (sheep pox, lumpy skin disease), Herpesviridae (IBR), Parvoviridae (canine parvovirus), Adenoviridae, Asfarviridae (African swine fever).\n- RNA viruses: Paramyxoviridae (Newcastle disease, PPR, canine distemper), Picornaviridae (foot and mouth disease), Rhabdoviridae (rabies), Orthomyxoviridae (influenza), Coronaviridae, Retroviridae (bovine leukaemia virus)."],
    ["Cultivation and diagnosis", "Viruses are grown in cell culture, embryonated eggs or animals. Diagnosis uses antigen or antibody detection (ELISA), PCR, haemagglutination tests and virus isolation."],
    ["Fungi", "Yeasts are single-celled and moulds form hyphae with a mycelium. Fungi have chitin in their walls and ergosterol in membranes. Dermatophytes (Microsporum, Trichophyton) cause ringworm. Candida causes yeast infections. Aspergillus causes aspergillosis in birds and produces aflatoxin. Mycotoxins in feed cause disease without any infection."],
    ["Rickettsiae, chlamydiae and mycoplasma", "These are small bacteria-like organisms. Rickettsiae and Anaplasma are tick-borne. Chlamydia are obligate intracellular. Mycoplasma lack a cell wall and are resistant to cell wall-active drugs."]
  ],
  tb: { h: ["Feature", "Bacteria", "Virus", "Fungi"], r: [["Cell type", "Prokaryotic cell", "Acellular", "Eukaryotic cell"], ["Nucleic acid", "DNA and RNA", "DNA or RNA", "DNA and RNA"], ["Antibiotic sensitive", "Yes", "No", "Antifungals"], ["Example", "Salmonella", "Rabies virus", "Aspergillus"]] },
  k: ["Virus structure.", "Replication steps.", "DNA vs RNA virus examples.", "Mycotoxins.", "Enveloped vs naked."],
  m: ["Viruses are not killed by antibiotics."],
  sa: [["What is a capsid?", "The protein coat of a virus."], ["Name a dermatophyte.", "Microsporum or Trichophyton."]],
  la: [["Describe the structure, replication and classification of viruses.", "Components, steps, DNA and RNA families with examples, cultivation, diagnosis, with a labelled diagram."]],
  q: [["Rabies virus belongs to", ["Poxviridae", "Rhabdoviridae", "Herpesviridae", "Parvoviridae"], 1, "Rhabdoviridae."],
    ["Fungal membranes contain", ["Cholesterol", "Ergosterol", "Peptidoglycan", "Teichoic acid"], 1, "Ergosterol."],
    ["Foot and mouth disease virus is a", ["DNA virus", "RNA virus", "Bacterium", "Prion"], 1, "A picornavirus."]],
  f: [["Capsid", "Protein coat of virus"], ["Mycotoxin", "Toxin produced by fungi"]],
  d: ["Learn the details of virus families.", "Study the life cycle of a retrovirus."]
});

unit("micro", "Unit 2 – Control and immunity");
topic("micro", "Sterilisation, Disinfection and Laboratory Safety", {
  i: "Sterilisation removes all life including spores. Disinfection reduces the number of pathogens. Good practice protects patients, staff and the environment.",
  s: "Sterilise things that must be completely free of microbes, like surgical instruments. Disinfect surfaces and equipment. Always treat samples as potentially infectious.",
  n: [
    ["Physical methods", "Moist heat in an autoclave at 121 degrees C for the standard time with steam under pressure is the most reliable sterilisation method and kills spores. Dry heat in a hot air oven suits glassware and powders and needs a higher temperature for longer. Boiling kills many but not all spores. Pasteurisation uses time-temperature combinations, not sterilisation. Filtration removes microbes from liquids that can't be heated. Radiation (UV, gamma) and flaming are also used."],
    ["Chemical methods", "Alcohols, chlorine compounds (hypochlorite), iodine and iodophors, phenolics, quaternary ammonium compounds, formaldehyde and glutaraldehyde, and peracetic acid. Choice depends on the organism, contact time, organic matter present, and concentration. Organic matter greatly reduces disinfectant action, so clean first, then disinfect."],
    ["Terms", "Antiseptic: applied to living tissue. Disinfectant: used on non-living objects. Bacteriostatic stops growth, bactericidal kills. Sanitiser reduces counts to a safe level."],
    ["Laboratory biosafety", "- Use gloves, coat and eye protection. Do not eat or drink in the lab.\n- Never mouth pipette.\n- Treat all samples as infectious. Use leak-proof containers.\n- Work with higher-risk pathogens in biosafety cabinets and containment as required.\n- Decontaminate waste by autoclaving before disposal. Sharps go into puncture-proof boxes.\n- Wash hands, report spills and accidents, and follow zoonotic precautions for Brucella, Leptospira, anthrax, rabies and others."],
    ["Biosecurity on farms", "Quarantine, footbaths, restricted entry, cleaning and disinfection between batches and safe carcass disposal reduce disease spread."]
  ],
  tb: { h: ["Method", "Use", "Kills spores"], r: [["Autoclave", "Instruments, media", "Yes"], ["Hot air oven", "Glassware", "Yes"], ["Boiling", "Simple items", "Not reliably"], ["Alcohol", "Skin, surfaces", "No"], ["Glutaraldehyde", "Sensitive instruments", "Yes with long contact"]] },
  k: ["Sterilisation vs disinfection.", "Autoclave principle.", "Biosafety rules.", "Disinfectant factors."],
  m: ["Disinfectants do not work well on dirty surfaces."],
  sa: [["Why is an autoclave effective?", "Steam under pressure reaches a temperature above boiling and penetrates materials, killing spores."], ["Differentiate antiseptic and disinfectant.", "Antiseptics are used on living tissue, disinfectants on inanimate objects."]],
  la: [["Describe methods of sterilisation.", "Physical and chemical methods, principle, uses, advantages, limits, quality control."]],
  q: [["The most reliable sterilising method for instruments is", ["Boiling", "Autoclaving", "Alcohol wipe", "Washing"], 1, "Autoclaving."],
    ["Organic matter", ["Increases disinfectant action", "Reduces disinfectant action", "No effect", "Kills microbes"], 1, "It reduces it."],
    ["Which kills spores?", ["Alcohol", "Autoclave", "Soap", "Quaternary ammonium"], 1, "Autoclave."]],
  f: [["Sterilisation", "Complete removal or killing of all microbes including spores"], ["Biosecurity", "Measures to prevent disease entering or leaving a farm"]],
  d: ["Learn the biosafety levels.", "Study validation of autoclaves with indicators."]
});

topic("micro", "Immunology and Vaccines", {
  i: "The immune system protects the body from pathogens. Vaccination uses it to prepare the animal before infection.",
  s: "Innate immunity is the quick, general defence. Adaptive immunity is slower, specific, and has memory. A vaccine gives the animal a harmless preview of the germ so it can respond fast later.",
  n: [
    ["Innate immunity", "Barriers (skin, mucus, acid), phagocytes (neutrophils, macrophages), natural killer cells, complement, interferons and inflammation. It acts within minutes to hours and is not specific."],
    ["Adaptive immunity", "B cells make antibodies (humoral immunity). T cells include helper T cells, cytotoxic T cells and regulatory cells (cell-mediated immunity). Antigens are recognised, and memory cells give a faster, stronger response on the second exposure."],
    ["Antibodies", "IgG is the main serum antibody and crosses the placenta in some species. IgM is the first produced. IgA protects mucosal surfaces and milk. IgE acts in allergy and parasite defence. In ruminants, horses and pigs the placenta does not transfer antibodies, so newborns depend on colostrum, which must be received soon after birth because the gut absorbs antibodies only for a short time. Failure of passive transfer leaves the newborn exposed."],
    ["Types of immunity", "Active natural (infection), active artificial (vaccination), passive natural (colostrum, placenta), passive artificial (serum)."],
    ["Vaccines", "Live attenuated vaccines give strong and long immunity but need cold chain and are not for immunosuppressed animals. Inactivated (killed) vaccines are safer but need adjuvants and boosters. Toxoids are inactivated toxins (tetanus). Subunit and recombinant vaccines use parts of the organism. Cold chain maintenance is vital in India's heat. Vaccination schedules differ by region and disease risk, so follow local veterinary advice."],
    ["Hypersensitivity", "Type I (immediate, IgE, anaphylaxis), type II (antibody on cells), type III (immune complexes), type IV (delayed, T cell, tuberculin reaction)."]
  ],
  tb: { h: ["Immunoglobulin", "Main role"], r: [["IgG", "Main serum antibody, secondary response"], ["IgM", "First antibody, primary response"], ["IgA", "Mucosal and milk"], ["IgE", "Allergy, parasites"]] },
  k: ["Innate vs adaptive.", "Immunoglobulins.", "Colostrum and passive transfer.", "Vaccine types.", "Hypersensitivity types."],
  m: ["Vaccines are not treatment. They prevent disease."],
  sa: [["Why is colostrum important?", "In many species antibodies are not transferred across the placenta, so newborns get them from colostrum."], ["What is a toxoid?", "A toxin that has been inactivated but retains immunogenicity, e.g. tetanus toxoid."]],
  la: [["Describe the types of immunity and the vaccines used in animals.", "Innate and adaptive immunity, antibodies, active and passive immunity, vaccine types with merits and demerits, cold chain, failures."]],
  q: [["First antibody produced in an immune response", ["IgG", "IgM", "IgA", "IgE"], 1, "IgM."],
    ["Tetanus toxoid is", ["Live vaccine", "Inactivated toxin", "Antiserum", "Antibiotic"], 1, "It is an inactivated toxin."],
    ["Tuberculin reaction is", ["Type I", "Type II", "Type III", "Type IV"], 3, "Delayed type hypersensitivity."]],
  f: [["Colostrum", "First milk, rich in antibodies"], ["Adjuvant", "Substance that enhances immune response to a vaccine"]],
  d: ["Learn the cold chain steps.", "Study vaccine failures."]
});

topic("micro", "Important Veterinary Bacterial and Viral Diseases: Microbiology View", {
  i: "A quick map of important pathogens and what they cause, to link microbiology with clinical subjects.",
  s: "Use this as a revision table. Learn the organism, the animals affected, the main lesion or sign, and one key lab test. Always verify in your textbook.",
  n: [
    ["Bacterial diseases", "- Anthrax (Bacillus anthracis): sudden death with unclotted blood from body openings. Do not open a suspected carcass, as spores spread.\n- Haemorrhagic septicaemia (Pasteurella multocida): acute disease of cattle and buffaloes.\n- Black quarter (Clostridium chauvoei): gas-forming swelling in muscles of young cattle.\n- Tetanus (Clostridium tetani): spastic paralysis from toxin.\n- Brucellosis (Brucella): abortion in the last third of pregnancy, zoonotic.\n- Tuberculosis (Mycobacterium bovis).\n- Johne's disease (M. avium paratuberculosis): chronic wasting.\n- Mastitis: Staphylococcus aureus, Streptococcus agalactiae, E. coli and others.\n- Leptospirosis, salmonellosis, colibacillosis."],
    ["Viral diseases", "- Foot and mouth disease: vesicles on mouth and feet, high morbidity.\n- Rinderpest: eradicated worldwide.\n- Peste des petits ruminants (PPR): in goats and sheep.\n- Newcastle disease: poultry.\n- Rabies: zoonotic, fatal.\n- Canine distemper and parvovirus: dogs.\n- Lumpy skin disease: cattle and buffaloes.\n- Sheep and goat pox, bluetongue, African swine fever, classical swine fever, avian influenza."],
    ["How to learn a disease", "Use the same headings every time: cause, hosts, transmission, signs, lesions, diagnosis, control. This habit helps you in pathology, medicine and public health too."]
  ],
  tb: { h: ["Disease", "Agent", "Species"], r: [["Anthrax", "Bacillus anthracis", "Cattle, sheep, humans"], ["Black quarter", "Clostridium chauvoei", "Young cattle"], ["Brucellosis", "Brucella abortus", "Cattle, humans"], ["PPR", "PPR virus", "Goats, sheep"], ["Newcastle disease", "Avian paramyxovirus 1", "Poultry"], ["Rabies", "Rabies lyssavirus", "All mammals"]] },
  k: ["Agent, host, lesion, diagnosis for each disease.", "Zoonotic status."],
  m: ["Never assume a disease without lab confirmation."],
  sa: [["Why should an anthrax carcass not be opened?", "Exposure to air makes the bacteria form spores that contaminate the area and infect people."], ["What is the agent of black quarter?", "Clostridium chauvoei."]],
  la: [["Write notes on haemorrhagic septicaemia.", "Etiology, hosts, transmission, signs, lesions, diagnosis, control in outline."]],
  q: [["Brucellosis typically causes", ["Abortion", "Bloat", "Rickets", "Goitre"], 0, "Late abortion."],
    ["PPR affects mainly", ["Cattle", "Goats and sheep", "Horses", "Dogs"], 1, "Small ruminants."],
    ["Mastitis is inflammation of the", ["Uterus", "Udder", "Lung", "Intestine"], 1, "Mammary gland."]],
  f: [["Zoonosis", "Disease transmissible between animals and humans"], ["HS", "Haemorrhagic septicaemia"]],
  d: ["Prepare your own table for every disease.", "Study notifiable diseases in India."]
});
planned("micro", ["Detailed study of each pathogenic genus", "Bacterial genetics", "Mycology: details of mycoses", "Virology techniques: PCR, ELISA, cell culture", "Immunological tests", "Antimicrobial sensitivity testing", "Avian and poultry microbiology", "Milk and food microbiology"]);

/* ================= PARASITOLOGY ================= */
unit("para", "Unit 1 – Basics");
topic("para", "Introduction: Parasites, Hosts and Host-Parasite Relationships", {
  i: "A parasite lives on or in another organism, the host, and gets its food from it. Parasites cost livestock production dearly.",
  s: "Parasites never give much back. Some live in the gut, some in blood, some on the skin. Knowing the life cycle shows where we can break it.",
  n: [
    ["Relationships", "Symbiosis is living together. Mutualism benefits both partners, commensalism benefits one without harming the other, and parasitism benefits the parasite at the host's cost. Predation is not parasitism."],
    ["Types of parasite", "Ectoparasites live on the surface (ticks, lice, mites), endoparasites live inside (worms, protozoa). Obligate parasites cannot survive without a host. Facultative parasites can live free. Permanent parasites stay on the host throughout life, temporary parasites visit only to feed (mosquitoes). Accidental or incidental parasites infect an unusual host. Ectopic parasites are in an abnormal site in the usual host."],
    ["Types of host", "Definitive host: the parasite reaches maturity and reproduces sexually. Intermediate host: needed for larval development. Paratenic (transport) host: larvae stay alive but do not develop. Reservoir host: carries infection without being much affected. Vector: transmits the parasite, either mechanically or biologically."],
    ["Effects on the host", "Parasites cause damage by feeding on blood (Haemonchus), mechanical blockage, tissue invasion, toxins and immune reactions. Subclinical infection reduces growth and milk yield without obvious signs, and this production loss is often larger than deaths."],
    ["Epidemiology", "Parasite load depends on host age, immunity, nutrition, climate, pasture contamination and management. Parasite eggs and larvae need warmth and moisture to develop outside the host, so seasonal patterns matter. Pasture rotation, stocking density and timing of treatments are management tools."]
  ],
  tb: { h: ["Host", "Role"], r: [["Definitive", "Adult or sexual stage"], ["Intermediate", "Larval stage development"], ["Paratenic", "Larva survives, no development"], ["Reservoir", "Source of infection"], ["Vector", "Transmits the parasite"]] },
  k: ["Host types.", "Parasite types.", "Mechanisms of damage.", "Epidemiology factors."],
  m: ["A vector is not the same as an intermediate host, although some arthropods are both."],
  sa: [["Differentiate definitive and intermediate host.", "In the definitive host the parasite matures and reproduces sexually. The intermediate host harbours larval stages."], ["What is a paratenic host?", "A host in which larvae survive but do not develop further, but can pass infection on."]],
  la: [["Describe host-parasite relationships and the types of parasites and hosts.", "Symbiosis types, parasite and host types with examples, effects on host."]],
  q: [["The host in which sexual reproduction occurs is the", ["Intermediate host", "Definitive host", "Paratenic host", "Vector"], 1, "Definitive host."],
    ["Lice are", ["Endoparasites", "Ectoparasites", "Hyperparasites", "Protozoa"], 1, "Ectoparasites."],
    ["An obligate parasite", ["Can live freely", "Needs a host", "Is harmless", "Is a plant"], 1, "Cannot survive without a host."]],
  f: [["Vector", "Organism that transmits a parasite"], ["Ectopic", "In an abnormal site"]],
  d: ["Learn the parasitic zoonoses.", "Study seasonal patterns of strongyle infection."]
});

topic("para", "Helminths: Nematodes, Cestodes and Trematodes", {
  i: "Helminths are parasitic worms. The three important groups are roundworms (nematodes), tapeworms (cestodes) and flukes (trematodes).",
  s: "Roundworms are cylindrical. Tapeworms are flat and segmented. Flukes are flat and leaf-shaped. Each group has a typical life cycle.",
  n: [
    ["Nematodes", "Cylindrical, unsegmented, with a complete gut and separate sexes. Examples: Haemonchus contortus (barber's pole worm, blood sucker of small ruminants, causes anaemia and bottle jaw), Trichostrongylus, Ostertagia, Toxocara (ascarids of dogs, cats, calves), Ancylostoma (hookworm), Strongylus in horses, Dictyocaulus (lungworm), Dirofilaria (heartworm). Many nematodes have a direct life cycle: eggs pass in faeces, develop to infective third-stage larvae (L3) on pasture, and are eaten."],
    ["Cestodes", "Flat, segmented, with a scolex for attachment and no gut. Segments (proglottids) are shed with eggs. Examples: Taenia solium (pigs and humans, causing cysticercosis), Taenia saginata (cattle), Echinococcus granulosus (dog is the definitive host, hydatid cysts in livestock and humans), Moniezia (tapeworm of ruminants, with oribatid mites as intermediate hosts), Dipylidium caninum (dog flea tapeworm)."],
    ["Trematodes", "Leaf-shaped flukes, usually hermaphrodites, with snail intermediate hosts. Fasciola hepatica and F. gigantica cause liver fluke disease in cattle, buffaloes and sheep. Metacercariae on grass are eaten. Paramphistomum (rumen fluke) and Schistosoma are others."],
    ["Diagnosis and control concepts", "Faecal egg counts and flotation or sedimentation tests detect eggs. Control combines anthelmintic use as advised by a veterinarian, pasture management, removal of snails or intermediate hosts, proper disposal of infected offal (dogs must not eat hydatid-infected offal) and avoiding overuse of drugs, to slow resistance."],
    ["Zoonotic helminths", "Echinococcus, Taenia solium, Toxocara and larva migrans from hookworms are zoonotic. Good hygiene and meat inspection are basic public health measures."]
  ],
  tb: { h: ["Group", "Shape", "Example", "Intermediate host"], r: [["Nematode", "Cylindrical", "Haemonchus", "None (direct)"], ["Cestode", "Flat, segmented", "Moniezia", "Oribatid mite"], ["Cestode", "Flat, segmented", "Echinococcus", "Sheep, cattle, etc."], ["Trematode", "Leaf-shaped", "Fasciola", "Snail"]] },
  k: ["Group characteristics.", "Haemonchus effects.", "Hydatid cycle.", "Fasciola cycle.", "Zoonotic helminths."],
  m: ["Tapeworm segments are not a sign that treatment failed immediately. Check the whole picture with a vet."],
  sa: [["Name the intermediate host of Fasciola.", "A freshwater snail (Lymnaea)."], ["Which animal is the definitive host of Echinococcus granulosus?", "The dog."]],
  la: [["Describe the life cycle and pathogenesis of Fasciola.", "Egg, miracidium, snail stages (sporocyst, redia, cercaria), metacercaria, ingestion, migration in liver, adult in bile ducts, signs and control outline, with diagram."]],
  q: [["Haemonchus contortus is a", ["Fluke", "Tapeworm", "Roundworm", "Mite"], 2, "A nematode."],
    ["The infective stage of Fasciola is the", ["Egg", "Metacercaria", "Miracidium", "Redia"], 1, "Metacercaria."],
    ["Cysticercosis in humans is caused by", ["Taenia solium", "Fasciola", "Ascaris", "Moniezia"], 0, "Larval stage of T. solium."],
    ["Moniezia uses which intermediate host?", ["Snail", "Oribatid mite", "Flea", "Tick"], 1, "Oribatid mite."]],
  f: [["Hydatid cyst", "Larval stage of Echinococcus in an intermediate host"], ["L3", "Infective third-stage larva"]],
  d: ["Learn the life cycles with diagrams.", "Study anthelmintic resistance."]
});

topic("para", "Protozoa and Blood Parasites", {
  i: "Protozoa are single-celled parasites. Many are transmitted by arthropod vectors and cause serious blood diseases.",
  s: "Protozoa are tiny, but a few can cause big problems. Ticks, flies and mosquitoes carry many of them.",
  n: [
    ["Important protozoa", "- Babesia (babesiosis, tick-borne, destroys red cells, causing fever, anaemia and haemoglobinuria).\n- Theileria (theileriosis, tick-borne, infects lymphocytes and red cells; tropical theileriosis in India).\n- Trypanosoma (surra by T. evansi in horses, camels and cattle, spread by biting flies).\n- Anaplasma (a rickettsia but classically studied with blood parasites).\n- Eimeria (coccidiosis of poultry, calves, lambs, rabbits, with bloody diarrhoea).\n- Toxoplasma gondii (cats are definitive hosts, zoonotic).\n- Cryptosporidium, Giardia (calf diarrhoea, zoonotic).\n- Trichomonas foetus (bovine venereal disease)."],
    ["Transmission", "Ticks (Rhipicephalus, Hyalomma) transmit Babesia, Theileria and Anaplasma. Tabanid flies transmit Trypanosoma mechanically. Oocysts of coccidia pass in faeces and sporulate outside. Sexual transmission occurs with Trichomonas."],
    ["Diagnosis", "Blood smear stained with Giemsa shows blood parasites. Lymph node biopsy smears show Koch's blue bodies in Theileria. PCR and serology help. Faecal examination detects oocysts."],
    ["Control concepts", "Tick control, vector control, quarantine, hygiene and, where available, vaccines. Premunity is a state of immunity maintained by a low level of infection, seen in tick-borne diseases. Calves have some natural resistance, and endemic stability is a concept explaining why disease is less common in areas of constant tick challenge."]
  ],
  tb: { h: ["Parasite", "Vector or route", "Target cell", "Key sign"], r: [["Babesia", "Tick", "RBC", "Haemoglobinuria"], ["Theileria", "Tick", "Lymphocyte, RBC", "Lymph node swelling"], ["Trypanosoma evansi", "Biting flies", "Blood plasma", "Intermittent fever, anaemia"], ["Eimeria", "Faecal-oral", "Gut epithelium", "Bloody diarrhoea"], ["Toxoplasma", "Cat faeces, raw meat", "Many cells", "Abortion"]] },
  k: ["Tick-borne diseases.", "Stain used for blood smears.", "Coccidiosis.", "Premunity.", "Toxoplasma life cycle."],
  m: ["Coccidiosis is not caused by worms. It is caused by protozoa."],
  sa: [["Which stain is used for blood smears?", "Giemsa stain."], ["Name the definitive host of Toxoplasma gondii.", "The cat (and other felids)."]],
  la: [["Describe babesiosis in cattle.", "Etiology, tick vector, transmission, pathogenesis, signs, diagnosis, prevention at concept level."]],
  q: [["Surra is caused by", ["Trypanosoma evansi", "Babesia bigemina", "Theileria annulata", "Eimeria"], 0, "T. evansi."],
    ["Babesia infects", ["Lymphocytes", "Red blood cells", "Platelets only", "Neurons"], 1, "RBC."],
    ["Koch's blue bodies are seen in", ["Babesiosis", "Theileriosis", "Anaplasmosis", "Coccidiosis"], 1, "Theileria schizonts in lymphocytes."]],
  f: [["Premunity", "Immunity maintained by presence of a low-level infection"], ["Oocyst", "Resistant stage of coccidia passed in faeces"]],
  d: ["Learn the life cycles of Babesia and Theileria.", "Study endemic stability."]
});

unit("para", "Unit 2 – Arthropods and control");
topic("para", "Entomology: Ticks, Mites, Lice, Fleas and Flies", {
  i: "Arthropods cause damage directly by feeding or irritation and indirectly by carrying disease agents.",
  s: "Insects have six legs and three body parts. Ticks and mites have eight legs and are arachnids. Ticks are blood feeders and major disease vectors.",
  n: [
    ["Ticks", "Hard ticks (Ixodidae: Rhipicephalus, Hyalomma, Haemaphysalis, Amblyomma) have a scutum and feed for days. Soft ticks (Argasidae: Argas, Ornithodoros) feed rapidly and repeatedly. Ticks cause blood loss, irritation, toxicosis (tick paralysis) and transmit protozoa, rickettsiae and viruses. Life cycle: egg, larva, nymph, adult. One-host ticks (Rhipicephalus (Boophilus) microplus) complete the cycle on one animal."],
    ["Mites", "Sarcoptes scabiei (sarcoptic mange, intense itching), Psoroptes (ear and body mange of sheep and cattle), Demodex (demodectic mange in dogs), Chorioptes, Knemidocoptes (scaly leg of fowl). Mites are diagnosed by deep skin scrapings."],
    ["Lice", "Biting lice (Mallophaga) and sucking lice (Anoplura). Lice are host specific and spend their whole life on the host. Heavy infestations cause itching, poor condition and anaemia in young animals."],
    ["Fleas", "Ctenocephalides felis and C. canis. Fleas cause flea allergy dermatitis and carry Dipylidium caninum. Control must include the environment, as most flea stages live off the animal."],
    ["Flies", "Biting flies (Tabanus, Stomoxys), blow flies and flesh flies (myiasis, in which maggots infest wounds), Hypoderma and Oestrus (warble and nasal bot flies) and mosquitoes (Culex, Aedes, Anopheles transmit viruses and filarial worms). Screw worm myiasis is a concern in many areas."],
    ["Control principles", "Ectoparasiticides applied as dips, sprays, pour-ons and collars should be used as directed by a veterinarian. Resistance to acaricides is common in ticks. Integrated approaches include pasture spelling, resistant breeds and hygiene."]
  ],
  tb: { h: ["Arthropod", "Key point", "Example disease"], r: [["Hard tick", "One to three hosts, scutum", "Babesiosis, theileriosis"], ["Soft tick", "No scutum, repeated feeding", "Fowl spirochaetosis"], ["Mite", "Burrows or surface", "Mange"], ["Louse", "Permanent, host specific", "Pediculosis"], ["Flea", "Laterally flattened", "Flea allergy dermatitis"], ["Fly", "Many roles", "Myiasis, surra"]] },
  k: ["Hard vs soft ticks.", "Mange mites.", "Myiasis.", "Vector roles."],
  m: ["Ticks and mites are not insects. They are arachnids with eight legs."],
  sa: [["How many legs do adult ticks have?", "Eight."], ["What is myiasis?", "Infestation of living tissue of animals by fly larvae (maggots)."]],
  la: [["Describe the ticks of veterinary importance and their control.", "Classification, hard and soft ticks, life cycle, damage, diseases transmitted, control concepts, resistance."]],
  q: [["Sarcoptes scabiei causes", ["Demodectic mange", "Sarcoptic mange", "Ringworm", "Lice"], 1, "Sarcoptic mange."],
    ["The tick body has", ["3 pairs of legs", "4 pairs of legs", "2 pairs of legs", "No legs"], 1, "Adults have four pairs."],
    ["Fleas are", ["Laterally flattened", "Dorsoventrally flattened", "Round", "Segmented worms"], 0, "Fleas are laterally flattened."]],
  f: [["Acaricide", "Chemical used against ticks and mites"], ["Myiasis", "Infestation of tissues by fly larvae"]],
  d: ["Learn identification features of each tick genus.", "Study resistance management for ticks."]
});

topic("para", "Diagnosis and Control of Parasites: Concepts", {
  i: "Good parasite control combines knowing the parasite, testing correctly and using drugs only where needed.",
  s: "Look for parasites in faeces, blood or skin scrapings. Control by breaking the life cycle, improving management and using drugs wisely, under a vet's advice.",
  n: [
    ["Laboratory diagnosis", "- Faecal tests: direct smear, flotation (for most nematode and cestode eggs and coccidial oocysts), sedimentation (for fluke eggs), McMaster egg count for quantity, Baermann technique for lungworm larvae.\n- Blood smears: Giemsa-stained for blood parasites.\n- Skin scrapings for mites.\n- Post-mortem examination of the gut, liver and lung.\n- Serology and PCR for specific parasites."],
    ["Control strategies", "Reduce the source (treat infected animals), reduce exposure (pasture rotation, clean housing, avoiding wet areas for fluke), increase resistance (nutrition, genetic selection), strategic deworming timed to the parasite's seasonal biology, and quarantine and treatment of new animals. Targeted selective treatment helps slow drug resistance."],
    ["Anthelmintic resistance", "Resistance develops when the same drug is used too often at the wrong dose or when too few worms are left unexposed to the drug (refugia). It is widespread in sheep and goat nematodes. Faecal egg count reduction tests detect it. Under-dosing is a major cause, so correct weighing matters."],
    ["Parasites and public health", "Meat inspection, safe disposal of offal, control of stray dogs, hand washing and treating pets reduce zoonotic risk."]
  ],
  k: ["Faecal tests.", "Control methods.", "Resistance causes.", "Zoonotic parasites."],
  m: ["Regular deworming of every animal with the same drug is not good practice."],
  sa: [["Which test detects fluke eggs?", "Sedimentation."], ["What is refugia?", "Parasite populations not exposed to the drug, which dilute resistant genes."]],
  la: [["Describe the laboratory methods used for diagnosis of helminth infections.", "Collection, flotation, sedimentation, McMaster, Baermann, larval culture, interpretation."]],
  q: [["The Baermann technique recovers", ["Fluke eggs", "Lungworm larvae", "Tapeworm segments", "Mites"], 1, "Lungworm larvae."],
    ["McMaster is used for", ["Egg counts", "Skin scrapings", "Blood smear", "Culture"], 0, "Quantitative faecal egg count."],
    ["A main cause of anthelmintic resistance is", ["Under-dosing", "Pasture rotation", "Clean water", "Vaccination"], 0, "Under-dosing selects resistant worms."]],
  f: [["FEC", "Faecal egg count"], ["Refugia", "Parasites not exposed to treatment"]],
  d: ["Practice reading faecal egg count results.", "Study the FAMACHA system for Haemonchus."]
});
planned("para", ["Detailed life cycles of each important helminth", "Parasites of poultry", "Parasites of horses, pigs, dogs and cats", "Apicomplexan parasites in detail", "Insect vectors in detail", "Parasitic zoonoses of India", "Pasture parasite epidemiology", "Anthelmintics: classes and mechanisms"]);
/* ================= PATHOLOGY ================= */
unit("path", "Unit 1 – General pathology");
topic("path", "Introduction to Pathology and Causes of Disease", {
  i: "Pathology is the study of disease: its causes, mechanisms, changes in the body and outcomes.",
  s: "When an animal is sick, pathology asks what went wrong (etiology), how it developed (pathogenesis), what changed in the organs (lesions) and what the result is. It links basic science to clinical work.",
  n: [
    ["Key terms", "- Etiology: cause of disease.\n- Pathogenesis: the sequence of events from cause to disease.\n- Lesion: a structural change in tissue caused by disease.\n- Morphology: appearance. Gross changes are seen with the naked eye, microscopic changes through histopathology.\n- Diagnosis, prognosis, sequelae and complications.\n- Necropsy (post-mortem): examination of a dead animal to find the cause of death."],
    ["Causes of disease", "Genetic (inherited defects), nutritional (deficiency or excess), physical (trauma, heat, cold, radiation), chemical (poisons, drugs), infectious (viruses, bacteria, fungi, parasites), immunological (hypersensitivity, autoimmunity), neoplastic and idiopathic (unknown) causes. Many diseases have multiple causes, so the idea of predisposing and precipitating factors is useful."],
    ["Disease courses", "Peracute: sudden, death in hours. Acute: days. Subacute: a few weeks. Chronic: months. Morbidity is the proportion of animals affected. Mortality is the proportion that die. Case fatality is the proportion of cases that die."],
    ["Necropsy basics", "Necropsy gives the best answer to a herd problem. Do it as soon as possible after death because autolysis (self-digestion) and putrefaction (bacterial decay) make tissues hard to read. Use a systematic approach, record every organ, take samples in formalin for histopathology and fresh samples for microbiology and toxicology. Wear protective clothing. Do not open a suspected anthrax carcass."]
  ],
  tb: { h: ["Term", "Meaning"], r: [["Etiology", "Cause"], ["Pathogenesis", "Mechanism of development"], ["Lesion", "Structural change"], ["Sequela", "Later consequence of a disease"], ["Autolysis", "Self-digestion after death"]] },
  k: ["Definitions of etiology, pathogenesis, lesion.", "Causes of disease.", "Course of disease.", "Autolysis vs putrefaction."],
  m: ["Morbidity and mortality are rates, not counts."],
  sa: [["Define pathogenesis.", "The sequence of events by which an etiological agent produces disease."], ["Distinguish autolysis and putrefaction.", "Autolysis is self-digestion by the cell's own enzymes. Putrefaction is decomposition by bacteria."]],
  la: [["Classify the causes of disease with examples.", "Genetic, nutritional, physical, chemical, infectious, immunological, neoplastic, idiopathic, with examples and predisposing factors."]],
  q: [["The cause of a disease is its", ["Pathogenesis", "Etiology", "Prognosis", "Sequela"], 1, "Etiology."],
    ["A disease lasting a few days is", ["Peracute", "Acute", "Chronic", "Latent"], 1, "Acute."],
    ["Post-mortem decay by bacteria is", ["Autolysis", "Putrefaction", "Necrosis", "Atrophy"], 1, "Putrefaction."]],
  f: [["Morbidity", "Proportion of animals that become sick"], ["Necropsy", "Post-mortem examination of an animal"]],
  d: ["Learn a systematic necropsy sequence.", "Study the collection and preservation of pathology samples."]
});

topic("path", "Cell Injury, Cell Death and Adaptations", {
  i: "Cells respond to stress by adapting, getting injured reversibly, or dying. This is the foundation of all pathology.",
  s: "A cell facing stress can adjust (get bigger, smaller, change type), get hurt but recover, or die. Whether it recovers depends on how severe and how long the injury is.",
  n: [
    ["Adaptations", "- Atrophy: decrease in size of an organ or cells (disuse, lack of nerve supply, poor nutrition, pressure).\n- Hypertrophy: increase in cell size (heart in exercise).\n- Hyperplasia: increase in cell number (mammary gland in pregnancy).\n- Metaplasia: one mature cell type changes to another (vitamin A deficiency causes squamous metaplasia).\n- Dysplasia: disordered growth, may be a step before cancer.\n- Hypoplasia and aplasia: incomplete development or absence of an organ."],
    ["Causes and mechanisms of injury", "Hypoxia is the commonest cause. Others include toxins, infections, physical agents, immune reactions and nutritional imbalance. Common mechanisms: loss of ATP, entry of calcium, free radical damage and membrane damage. Reversible injury shows cell swelling and fatty change."],
    ["Necrosis", "Necrosis is cell death in living tissue, with changes in the nucleus: pyknosis (shrinking), karyorrhexis (fragmentation), karyolysis (dissolving). Types: coagulative (most solid organs after loss of blood supply), liquefactive (brain, abscesses), caseous (tuberculosis), fat necrosis, gangrene (necrosis with putrefaction; dry or wet) and fibrinoid necrosis. Infarction is necrosis from loss of blood supply."],
    ["Apoptosis", "Apoptosis is programmed cell death, a tidy process with shrinking of the cell and no inflammation. It is part of normal development and removal of damaged cells."],
    ["Degenerations and accumulations", "Cloudy swelling and hydropic degeneration are early changes. Fatty change in the liver is common in ketosis and energy deficiency. Amyloidosis, pigment deposits (haemosiderin, bilirubin, melanin, lipofuscin) and pathological calcification (dystrophic in dead tissue, metastatic in high blood calcium) are important."]
  ],
  tb: { h: ["Type of necrosis", "Typical site", "Feature"], r: [["Coagulative", "Kidney, heart, liver", "Firm, tissue outline kept"], ["Liquefactive", "Brain, abscess", "Tissue turns to liquid"], ["Caseous", "TB lesions", "Cheesy, crumbly"], ["Fat necrosis", "Around pancreas, abdominal fat", "Chalky white"], ["Gangrene", "Limbs, gut", "Necrosis plus bacterial decay"]] },
  k: ["Adaptations with example.", "Types of necrosis.", "Necrosis vs apoptosis.", "Pathological calcification."],
  m: ["Hyperplasia and hypertrophy are not the same. One is number, the other is size."],
  sa: [["Define metaplasia.", "Reversible change of one mature cell type to another."], ["What is caseous necrosis?", "A cheese-like necrosis, typical in tuberculosis."]],
  la: [["Describe cell injury and necrosis.", "Causes, reversible and irreversible injury, nuclear changes, types of necrosis with examples, apoptosis, fate of necrotic tissue."]],
  q: [["Increase in cell number is", ["Hypertrophy", "Hyperplasia", "Atrophy", "Metaplasia"], 1, "Hyperplasia."],
    ["Caseous necrosis is typical of", ["Tuberculosis", "Anthrax", "Rabies", "Foot and mouth disease"], 0, "Tuberculous lesions."],
    ["Apoptosis", ["Causes inflammation", "Is programmed cell death", "Is only pathological", "Needs bacteria"], 1, "It is programmed cell death."],
    ["Pyknosis is", ["Nuclear shrinkage", "Nuclear fragmentation", "Nuclear dissolution", "Cell division"], 0, "Shrinkage."]],
  f: [["Infarct", "Area of necrosis from sudden loss of blood supply"], ["Dystrophic calcification", "Calcium deposit in dead tissue with normal blood calcium"]],
  d: ["Learn free radical injury.", "Study amyloidosis."]
});

topic("path", "Circulatory Disturbances: Haemorrhage, Thrombosis, Oedema, Shock", {
  i: "Blood flow and fluid balance disturbances are common causes of lesions found at necropsy.",
  s: "Too much blood in an organ, bleeding, clots in vessels, fluid in tissues and failure of circulation all appear in many diseases.",
  n: [
    ["Hyperaemia and congestion", "Active hyperaemia is more blood due to arteriolar dilation, as in inflammation (red and warm). Passive hyperaemia (congestion) results from impaired venous return, as in heart failure (blue, cool). Chronic liver congestion gives a nutmeg appearance."],
    ["Haemorrhage", "Petechiae (pinpoint), ecchymoses (larger bruises) and haematoma (a mass of blood). Causes: trauma, vessel wall damage by toxins or septicaemia, clotting defects (warfarin type poisons, vitamin K deficiency), and low platelets."],
    ["Thrombosis and embolism", "A thrombus is a clot formed in a living vessel or the heart. Virchow's triad: endothelial injury, abnormal blood flow, and hypercoagulability. An embolus is any detached mass carried in the blood, such as a thrombus, fat, air or bacterial clump. Emboli can lodge in lungs, kidneys and the brain. Infarction can follow."],
    ["Oedema", "Excess fluid in the tissue spaces. Causes: raised hydrostatic pressure (heart failure), reduced plasma protein (liver disease, protein loss from parasites like Haemonchus, which gives bottle jaw), lymphatic blockage, and increased vascular permeability (inflammation). Transudate is low protein and exudate is high protein fluid."],
    ["Shock", "Failure of circulation to maintain tissue perfusion. Types: hypovolaemic (blood or fluid loss), cardiogenic, septic (endotoxins), anaphylactic and neurogenic. Without correction, shock leads to organ failure."]
  ],
  tb: { h: ["Fluid", "Protein", "Cause"], r: [["Transudate", "Low", "Pressure or protein imbalance"], ["Exudate", "High", "Inflammation, increased permeability"]] },
  k: ["Congestion vs hyperaemia.", "Virchow's triad.", "Types of shock.", "Transudate vs exudate.", "Nutmeg liver."],
  m: ["Not all red tissue is hyperaemia. Post-mortem changes can mimic it."],
  sa: [["State Virchow's triad.", "Endothelial injury, abnormal blood flow and hypercoagulability."], ["Define embolism.", "Obstruction of a vessel by a detached mass carried in the blood."]],
  la: [["Describe thrombosis, its causes and fate.", "Definition, Virchow's triad, types, fate (lysis, organisation, embolism), significance."]],
  q: [["Nutmeg liver results from", ["Chronic passive congestion", "Acute hyperaemia", "Fat necrosis", "Abscess"], 0, "Chronic liver congestion."],
    ["Bottle jaw is mainly due to", ["Low plasma protein", "High blood pressure", "Fat necrosis", "Rickets"], 0, "Hypoproteinaemia causing oedema."],
    ["Septic shock is mainly due to", ["Endotoxin", "Blood loss", "Heart failure", "Allergy"], 0, "Endotoxins from Gram negative bacteria."]],
  f: [["Petechia", "Pinpoint haemorrhage"], ["Thrombus", "Clot formed within a living vessel or heart"]],
  d: ["Study disseminated intravascular coagulation.", "Learn the stages of shock."]
});

unit("path", "Unit 2 – Inflammation, repair and growth");
topic("path", "Inflammation and Healing", {
  i: "Inflammation is the body's response to injury. Healing repairs the damage. Both are major topics in pathology.",
  s: "Inflammation brings blood, fluid and defence cells to the injured place. The five old signs are redness, heat, swelling, pain and loss of function. Healing follows by repair with new cells or scar.",
  n: [
    ["Cardinal signs", "Rubor (redness), calor (heat), tumor (swelling), dolor (pain) and functio laesa (loss of function). They result from vessel dilation, increased permeability and release of mediators."],
    ["Acute inflammation", "Vascular changes: short vasoconstriction, then vasodilation and increased permeability. Cellular events: margination of leukocytes, rolling, adhesion, emigration (diapedesis), chemotaxis and phagocytosis. Neutrophils arrive first, macrophages later. Mediators include histamine, prostaglandins, leukotrienes, cytokines, complement and kinins."],
    ["Types of exudate", "Serous (watery, as in a blister), fibrinous (fibrin-rich, in pericarditis), purulent or suppurative (pus with neutrophils, as in abscess), haemorrhagic and catarrhal (mucus, in respiratory and intestinal tract). An abscess is a collection of pus within tissue. Empyema is pus in a body cavity. Cellulitis is a spreading inflammation. Ulcer is a loss of surface tissue."],
    ["Chronic inflammation", "Persistent inflammation with macrophages, lymphocytes and plasma cells, with attempts at repair. Granulomatous inflammation forms granulomas with epithelioid macrophages and giant cells, as in tuberculosis. Fibrosis can result."],
    ["Healing", "Regeneration replaces lost cells with the same type (liver, skin epithelium). Repair uses granulation tissue and forms a scar. Wound healing: first intention (clean wound with edges close together, minimal scar) and second intention (gaping wound filling from the base with granulation tissue and contraction). Factors delaying healing include infection, poor blood supply, foreign bodies, movement, poor nutrition and some drugs like corticosteroids. Proud flesh (exuberant granulation) is seen in horse limbs."],
    ["Systemic effects", "Fever, leukocytosis, raised acute phase proteins and, if severe, shock and organ damage."]
  ],
  tb: { h: ["Exudate", "Features", "Example"], r: [["Serous", "Watery", "Blister, mild catarrh"], ["Fibrinous", "Fibrin strands", "Pericarditis, pneumonia"], ["Purulent", "Pus", "Abscess"], ["Haemorrhagic", "Blood-tinged", "Anthrax, enteritis"]] },
  k: ["Cardinal signs.", "Steps of acute inflammation.", "Types of exudate.", "Granuloma.", "Healing by first and second intention."],
  m: ["Inflammation is not the same as infection. It can occur without microbes."],
  sa: [["Name the five cardinal signs of inflammation.", "Redness, heat, swelling, pain and loss of function."], ["What is a granuloma?", "A focal collection of macrophages (epithelioid cells and giant cells) with surrounding lymphocytes, typical of chronic infections like TB."]],
  la: [["Describe the vascular and cellular events in acute inflammation.", "Vasodilation, permeability, margination, emigration, chemotaxis, phagocytosis, mediators, outcomes."]],
  q: [["The first cells to arrive in acute inflammation are", ["Neutrophils", "Lymphocytes", "Plasma cells", "Fibroblasts"], 0, "Neutrophils."],
    ["Pus in a body cavity is", ["Abscess", "Empyema", "Cellulitis", "Ulcer"], 1, "Empyema."],
    ["Healing of a clean sutured wound is by", ["First intention", "Second intention", "Third intention", "No healing"], 0, "Primary union."],
    ["Epithelioid cells are typical of", ["Acute inflammation", "Granulomatous inflammation", "Hyperplasia", "Necrosis"], 1, "Granulomas."]],
  f: [["Diapedesis", "Passage of leukocytes through vessel walls"], ["Granulation tissue", "New capillaries and fibroblasts filling a wound"]],
  d: ["Learn the mediators in detail.", "Study bone fracture healing."]
});

topic("path", "Neoplasia and Systemic Pathology Outline", {
  i: "A neoplasm is an abnormal mass of tissue whose growth is uncontrolled and persists after the stimulus is removed.",
  s: "A tumour grows on its own, without following the body's controls. Benign tumours stay put. Malignant ones invade nearby tissue and spread.",
  n: [
    ["Terms", "Neoplasia: new growth. Tumour: swelling, usually a neoplasm. Cancer: malignant neoplasm. Oncology: study of tumours. Anaplasia: loss of differentiation. Metastasis: spread to distant sites through lymph, blood or body cavities."],
    ["Nomenclature", "Benign tumours of epithelium end with -oma (adenoma, papilloma), of connective tissue also -oma (fibroma, lipoma, osteoma). Malignant epithelial tumours are carcinomas (adenocarcinoma, squamous cell carcinoma). Malignant connective tissue tumours are sarcomas (fibrosarcoma, osteosarcoma). Lymphoma and leukaemia affect blood-forming tissues."],
    ["Benign vs malignant", "Benign: slow growth, well differentiated, encapsulated, no metastasis. Malignant: faster growth, poorly differentiated, invasive, metastasise, often recur after removal."],
    ["Causes", "Genetic changes in oncogenes and tumour suppressor genes. Contributing factors: viruses (bovine leukaemia virus, Marek's disease virus in chickens, papilloma viruses), chemicals (aflatoxin), radiation including UV (squamous cell carcinoma of the eye in white-faced cattle, called cancer eye) and chronic irritation. Age and species also matter."],
    ["Common examples", "Cancer eye in cattle, mammary tumours in dogs, transmissible venereal tumour (TVT) in dogs, lymphoma, melanoma in grey horses, fibropapilloma and papillomas in cattle."],
    ["Systemic pathology (outline)", "Each organ system has its own typical lesions: pneumonia types in lung, hepatitis and cirrhosis in liver, nephritis in kidney, enteritis in gut, encephalitis in the brain. Your textbook organises this by system, and this website will expand it over time."]
  ],
  tb: { h: ["Feature", "Benign", "Malignant"], r: [["Growth", "Slow", "Rapid"], ["Capsule", "Usually present", "Absent or incomplete"], ["Spread", "None", "Metastasis"], ["Differentiation", "Good", "Poor"], ["Names", "-oma", "Carcinoma, sarcoma"]] },
  k: ["Benign vs malignant.", "Nomenclature.", "Metastasis routes.", "Oncogenic viruses.", "Common animal tumours."],
  m: ["Not every lump is a tumour. Abscesses and granulomas look similar."],
  sa: [["Define metastasis.", "Spread of tumour cells from the primary site to distant sites."], ["Which tumour is called cancer eye?", "Squamous cell carcinoma of the eye, common in white-faced cattle."]],
  la: [["Differentiate benign and malignant tumours and describe causes of neoplasia.", "Table, nomenclature, spread, causes, examples in animals."]],
  q: [["A malignant tumour of connective tissue is a", ["Carcinoma", "Sarcoma", "Adenoma", "Papilloma"], 1, "Sarcoma."],
    ["Marek's disease virus causes", ["Lymphomas in chickens", "Cancer eye", "Warts in cattle", "Mastitis"], 0, "T-cell lymphoma in fowl."],
    ["TVT is a tumour of", ["Cattle", "Dogs", "Horses", "Pigs"], 1, "Dogs."]],
  f: [["Anaplasia", "Loss of differentiation in tumour cells"], ["Carcinoma", "Malignant tumour of epithelium"]],
  d: ["Study each organ system's pathology.", "Learn tumour grading."]
});
planned("path", ["Pathology of the respiratory system", "Pathology of the digestive system", "Pathology of the liver and pancreas", "Pathology of the urinary system", "Pathology of the nervous system", "Pathology of the reproductive system", "Pathology of the cardiovascular system", "Pathology of bone, joint and muscle", "Avian pathology", "Clinical pathology: haematology, urinalysis, cytology", "Veterinary toxicopathology", "Necropsy techniques step by step"]);

/* ================= NUTRITION ================= */
unit("nutr", "Unit 1 – Nutrient basics");
topic("nutr", "Introduction: Nutrients, Feed Analysis and Terms", {
  i: "Animal nutrition is about feeding animals so that they grow, produce, reproduce and stay healthy at a cost the farmer can afford.",
  s: "Feed contains water, carbohydrates, proteins, fats, minerals and vitamins. Nutrition is learning what each animal needs, what each feed offers, and how to match the two.",
  n: [
    ["Nutrients and their functions", "Water, carbohydrates, lipids, proteins, minerals and vitamins. Nutrients give energy, build and repair tissues, and regulate body processes."],
    ["Proximate analysis (Weende)", "Divides feed into moisture, dry matter, crude protein (nitrogen x 6.25), ether extract (crude fat), crude fibre, total ash and nitrogen-free extract (NFE, calculated by difference). It is old but still widely used. The Van Soest system splits fibre into neutral detergent fibre (NDF) and acid detergent fibre (ADF), and is better for forages."],
    ["Feed terms", "- Dry matter (DM): feed minus water. Rations are compared on a DM basis.\n- Roughage: bulky, high fibre feed (hay, straw, silage, green fodder).\n- Concentrate: low fibre, high energy or protein feed (grains, oilcakes, brans).\n- Ration: the feed given in 24 hours. Balanced ration contains all nutrients in correct proportions.\n- Maintenance ration: just to keep the body weight constant.\n- Production ration: for growth, milk, eggs, work.\n- Digestibility: part of a nutrient that is absorbed. TDN is total digestible nutrients.\n- Palatability, feed additive, feed supplement, antinutritional factor."],
    ["Energy terms", "Gross energy is the heat released on burning feed. Digestible energy subtracts faecal energy. Metabolisable energy subtracts urinary and gas energy. Net energy is what remains for maintenance and production after heat increment."]
  ],
  tb: { h: ["Fraction", "Meaning"], r: [["Crude protein", "N x 6.25"], ["Ether extract", "Fat and fat-like material"], ["Crude fibre", "Cellulose, hemicellulose, lignin portion"], ["NFE", "Soluble carbohydrates, by difference"], ["Ash", "Mineral residue"]] },
  k: ["Proximate analysis fractions.", "Energy partition.", "Dry matter.", "Roughage vs concentrate."],
  m: ["Crude protein is not true protein. It includes non-protein nitrogen."],
  sa: [["How is crude protein calculated?", "Nitrogen content multiplied by 6.25."], ["Define a balanced ration.", "A ration that supplies all nutrients in the right amounts and proportions for an animal's requirement over 24 hours."]],
  la: [["Describe the proximate analysis of feeds.", "Moisture, DM, CP, EE, CF, ash, NFE, methods in outline, limitations, Van Soest alternative."]],
  q: [["The nitrogen factor for crude protein is", ["4.25", "5.25", "6.25", "7.25"], 2, "6.25."],
    ["NFE is", ["Measured directly", "Calculated by difference", "A mineral", "A protein"], 1, "Calculated by difference."],
    ["Metabolisable energy is", ["Gross energy minus faecal energy", "DE minus urinary and gas energy", "Heat of combustion", "Net energy"], 1, "DE minus urinary and gaseous losses."]],
  f: [["TDN", "Total digestible nutrients"], ["Roughage", "Bulky feed with high crude fibre"]],
  d: ["Practice converting feed values between as-fed and DM basis.", "Study the Van Soest system."]
});

topic("nutr", "Carbohydrates, Fats and Proteins in Feeding", {
  i: "These three nutrients supply energy and building blocks. Species differ in how well they use each.",
  s: "Carbohydrates are the cheapest energy. Fats give the most energy per gram. Proteins build tissue and also give energy if there is extra.",
  n: [
    ["Carbohydrates", "Sugars and starch give energy. Fibre (cellulose, hemicellulose, lignin) is useful to ruminants and horses but poorly used by pigs and poultry. Lignin is indigestible and reduces digestibility of the rest of the fibre. Ruminants need enough effective fibre to keep rumen function normal."],
    ["Fats", "Give about 2.25 times the energy of carbohydrate per gram. Provide essential fatty acids and carry fat-soluble vitamins. Rations for ruminants should not have too much fat as it can disturb rumen microbes. Rancid fats reduce palatability and destroy vitamins. Antioxidants prevent rancidity."],
    ["Proteins and amino acids", "Proteins are made of amino acids. Non-ruminants need a supply of essential amino acids. Lysine and methionine are most often limiting in pig and poultry diets (cereals are low in lysine). Quality of protein is judged by biological value, net protein utilisation and chemical score."],
    ["Ruminant protein", "Dietary protein is degraded in the rumen (rumen degradable protein, RDP) and microbes build microbial protein. Some protein escapes (rumen undegradable protein, bypass protein, UDP) and is digested in the intestine. High-yielding animals benefit from bypass protein. Urea and other non-protein nitrogen sources can partly replace protein in ruminants if enough fermentable energy is available. Overdose of urea is toxic, so correct mixing and gradual adaptation is a must."],
    ["Common feeds", "Energy feeds: maize, sorghum, rice bran, broken rice, molasses. Protein supplements: groundnut cake, soybean meal, cottonseed cake, sunflower cake, fish meal. Roughages: paddy straw (low quality, often treated with urea), green fodders (berseem, lucerne, maize, napier grass, cowpea), silage and hay."]
  ],
  tb: { h: ["Nutrient", "Energy (approx per g)", "Main role"], r: [["Carbohydrate", "4 kcal", "Cheap energy"], ["Protein", "4 kcal", "Growth, repair"], ["Fat", "9 kcal", "Concentrated energy, EFA"]] },
  k: ["Limiting amino acids.", "UDP and RDP.", "Role of fibre.", "Urea use and risk.", "Common feeds."],
  m: ["More protein is not always better. Excess is wasted and costly."],
  sa: [["What is a limiting amino acid?", "The essential amino acid present in the shortest supply relative to the animal's need."], ["Why is urea used in ruminant rations?", "Rumen microbes can use its nitrogen to make microbial protein, cutting protein cost."]],
  la: [["Describe the role of proteins in animal nutrition with special reference to ruminants.", "Functions, amino acids, biological value, RDP and UDP, NPN use, safe limits."]],
  q: [["The first limiting amino acid in cereal-based poultry diets is often", ["Lysine", "Glycine", "Alanine", "Serine"], 0, "Lysine (and methionine)."],
    ["Bypass protein is", ["Degraded in the rumen", "Digested in the intestine", "Not digestible", "Fat"], 1, "UDP escapes rumen degradation."],
    ["Fat provides about", ["4 kcal/g", "9 kcal/g", "2 kcal/g", "1 kcal/g"], 1, "About 9 kcal per gram."]],
  f: [["Biological value", "Share of absorbed protein retained in the body"], ["NPN", "Non-protein nitrogen, e.g. urea"]],
  d: ["Learn the ration formulation by Pearson square.", "Study silage making."]
});

topic("nutr", "Minerals, Vitamins and Water", {
  i: "Minerals and vitamins are needed in small amounts but deficiency or excess can cause serious loss. Water is the most important nutrient of all.",
  s: "Animals can live weeks without feed but only days without water. Minerals build bones and run enzymes. Vitamins help body processes.",
  n: [
    ["Water", "Water makes up 60 to 70 percent of the body. It is the solvent for nutrients, carries wastes, regulates temperature and is a major constituent of milk (about 87 percent). Water requirement rises with heat, lactation, dry feed and high protein or salt intake. Clean water must always be available. Poor water quality reduces intake and production."],
    ["Macrominerals", "Calcium and phosphorus (bones, milk, eggs). The Ca:P ratio in rations is usually kept about 1:1 to 2:1. Layers need much higher calcium for the shell. Magnesium, sodium, potassium, chlorine and sulphur have their own roles. Common salt is supplied as a lick."],
    ["Trace minerals", "Iron, copper, cobalt, zinc, manganese, selenium, iodine, molybdenum and others. Regional deficiencies and excesses exist, such as selenium deficiency in some soils. Excess molybdenum reduces copper availability. Area-specific mineral mixtures are widely promoted for dairy animals in India."],
    ["Vitamin supply", "Green fodder supplies carotene (vitamin A precursor), vitamin E and K. Sun-cured hay has vitamin D. Poultry and pigs raised indoors need vitamin premixes. Ruminants synthesise B vitamins and K in the rumen."],
    ["Deficiency to remember", "Calcium and phosphorus: rickets, milk fever, osteomalacia, pica. Magnesium: grass tetany. Copper: anaemia, swayback. Iodine: goitre. Selenium and vitamin E: white muscle disease. Cobalt: wasting. Zinc: parakeratosis. Manganese: perosis in chicks."]
  ],
  tb: { h: ["Mineral", "Deficiency sign"], r: [["Calcium", "Rickets, milk fever"], ["Phosphorus", "Pica, poor fertility"], ["Magnesium", "Grass tetany"], ["Iodine", "Goitre"], ["Manganese", "Perosis in chicks"], ["Zinc", "Parakeratosis"]] },
  k: ["Functions of water.", "Ca:P ratio.", "Mineral deficiency diseases.", "Area-specific mineral mixture."],
  m: ["Feeding extra minerals blindly can cause toxicity or block other minerals."],
  sa: [["Why is the Ca:P ratio important?", "Imbalance reduces absorption of both and causes bone and production problems."], ["Name the deficiency disease of manganese in chicks.", "Perosis (slipped tendon)."]],
  la: [["Describe the functions and deficiency of important minerals in livestock.", "Macro and micro minerals, sources, functions, deficiency and excess signs, regional issues."]],
  q: [["Grass tetany is due to low", ["Calcium", "Magnesium", "Sodium", "Iron"], 1, "Magnesium."],
    ["Milk is about what percent water?", ["50", "70", "87", "95"], 2, "About 87 percent."],
    ["Layers have a high requirement for", ["Calcium", "Cobalt", "Iodine", "Copper"], 0, "Calcium for the eggshell."]],
  f: [["Pica", "Eating non-food items, often from mineral deficiency"], ["Area-specific mineral mixture", "Mineral supplement balanced for the soil conditions of a region"]],
  d: ["Study mineral interactions.", "Learn water quality standards for livestock."]
});

unit("nutr", "Unit 2 – Feeding practice");
topic("nutr", "Feeding of Ruminants, Pigs and Poultry: Concepts", {
  i: "Different species digest feed differently, so they are fed differently. This topic gives the main ideas, not a ration for a real farm.",
  s: "Ruminants get most energy from fibre by microbes. Pigs and poultry are simple-stomached and need more concentrated, balanced diets. Always follow feeding standards or local advice for actual rations.",
  n: [
    ["Dairy cattle and buffaloes", "Rations include roughage (green and dry) and a concentrate mix to meet milk yield. Dry cows, close-up cows, early lactation cows, calves and heifers have different needs. Sudden change in ration, too much grain, or too little fibre causes digestive disturbances. Feeding the transition cow well reduces metabolic disease. Calves need colostrum soon after birth, then milk or milk replacer and early access to starter and clean water."],
    ["Sheep and goats", "Grazing, browsing and supplementary feeding. Goats are browsers and select leaves and shrubs. Flushing (better feeding before breeding) and steaming up (extra feed in late pregnancy) improve outcomes. Twin-bearing ewes in late pregnancy are susceptible to pregnancy toxaemia."],
    ["Pigs", "Pigs are monogastric omnivores. Diets are cereal-based with protein supplements. Growers, finishers, gestating and lactating sows have different needs. Lysine is important. Fibre digestion is limited."],
    ["Poultry", "Fast-growing broilers need high-energy, high-protein diets in phases: pre-starter, starter, finisher. Layers need calcium for shells. Feed formulation uses cereals (maize), soybean meal, fish meal, oil, limestone, salt and premixes. Feed is about 60 to 70 percent of the cost of poultry production. Feed conversion ratio (FCR) is the feed eaten per kilogram of weight gain, and lower is better."],
    ["Horses and dogs", "Horses need good quality roughage and small frequent meals. Dogs are omnivorous carnivores needing balanced protein, fat, vitamins and minerals, and cats are obligate carnivores needing taurine, arachidonic acid and vitamin A."],
    ["Feed additives", "Probiotics, prebiotics, enzymes, antioxidants, toxin binders, acidifiers and ionophores. Use of antibiotics as growth promoters is discouraged, and many are banned, because of antimicrobial resistance."]
  ],
  tb: { h: ["Species", "Digestive type", "Key feeding point"], r: [["Cattle, buffalo", "Ruminant", "Fibre and rumen health"], ["Sheep, goat", "Ruminant", "Late pregnancy energy"], ["Pig", "Monogastric", "Amino acids, lysine"], ["Poultry", "Monogastric (crop, gizzard)", "Energy-protein balance, FCR"], ["Horse", "Hindgut fermenter", "Roughage, small meals"], ["Cat", "Obligate carnivore", "Taurine, animal protein"]] },
  k: ["Feed conversion ratio.", "Flushing and steaming up.", "Phase feeding in broilers.", "Feeding the transition cow."],
  m: ["Ruminants should not be moved suddenly to high-grain diets."],
  sa: [["Define FCR.", "Kilograms of feed consumed per kilogram of body weight gain (or per dozen eggs)."], ["What is flushing?", "Giving extra feed to females before breeding to improve ovulation and conception."]],
  la: [["Describe the feeding of dairy cattle at different physiological stages.", "Calves, heifers, lactating, dry and transition cows, key nutrients and precautions."]],
  q: [["Lower FCR means", ["Worse efficiency", "Better efficiency", "No change", "Higher cost"], 1, "Less feed per kg of gain."],
    ["Steaming up is done in", ["Early pregnancy", "Late pregnancy", "Weaning", "Dry period of male"], 1, "Late pregnancy."],
    ["Obligate carnivores need dietary", ["Taurine", "Cellulose", "Lactose", "Vitamin C"], 0, "Cats need taurine."]],
  f: [["Steaming up", "Extra feed in late pregnancy"], ["Phase feeding", "Changing diet by growth stage"]],
  d: ["Learn the nutrient requirement tables (ICAR or NRC).", "Study total mixed ration."]
});

topic("nutr", "Fodder Production, Conservation and Feed Technology", {
  i: "Green fodder is the cheapest source of nutrients in India. Conservation as hay or silage keeps it available through the dry season.",
  s: "Grow good fodder, harvest it at the right stage, and store extra as silage or hay for lean months.",
  n: [
    ["Fodder crops", "Cereal fodders: maize, sorghum, bajra, oats. Legume fodders: berseem (winter), lucerne, cowpea, guar. Grasses: napier, guinea grass. Trees: subabul, Sesbania. Legumes are rich in protein and fix nitrogen. Cutting at the right stage balances yield and quality: young plants have more protein and less fibre."],
    ["Hay", "Hay is dried fodder with about 15 percent moisture. Good hay is green, leafy and free of mould. Legume hay is rich in protein. Rain during drying causes loss and mould."],
    ["Silage", "Silage is fodder preserved by fermentation in the absence of air. Lactic acid bacteria turn sugars into lactic acid, lowering pH to about 4 and preserving the feed. Good silage needs enough sugar, a moisture of about 65 to 70 percent, chopping, tight packing and an airtight seal. Maize and sorghum make excellent silage. Legumes are harder because of low sugar and high buffering capacity, so molasses is added. Silage smelling of butyric acid or ammonia is poor."],
    ["Improving straw", "Paddy and wheat straw are low in protein and digestibility. Treatment with urea and ammonia raises protein and digestibility. Chaffing, soaking and mixing with other feeds improves intake."],
    ["Feed milling and quality", "Compound feed manufacturing includes grinding, mixing, pelleting and storage. Feed must be free of aflatoxin and moulds, and stored dry. Adulteration and quality testing are issues in the field. Urea molasses mineral blocks (UMMB) are used as supplement."]
  ],
  tb: { h: ["Method", "Moisture", "Principle"], r: [["Hay", "About 15%", "Drying stops microbes"], ["Silage", "About 65-70%", "Lactic fermentation lowers pH"], ["Haylage", "40-55%", "Partly wilted, ensiled"]] },
  k: ["Hay vs silage.", "Silage fermentation.", "Why add molasses to legume silage.", "Urea treatment of straw."],
  m: ["Silage is not rotten fodder. It is controlled fermentation."],
  sa: [["What is silage?", "Fodder preserved by lactic fermentation under airtight conditions."], ["Why is molasses added to legume silage?", "To supply fermentable sugar that legumes lack."]],
  la: [["Describe silage making and its advantages.", "Crops, steps, fermentation, quality signs, advantages, problems."]],
  q: [["Silage pH is about", ["4", "7", "9", "11"], 0, "Around 4."],
    ["The best crop for silage among these", ["Maize", "Paddy straw", "Rice husk", "Sugar"], 0, "Maize has high sugar and good DM."],
    ["Berseem is a", ["Winter legume fodder", "Cereal", "Tree", "Root"], 0, "A winter legume."]],
  f: [["Silage", "Fodder preserved by fermentation"], ["UMMB", "Urea molasses mineral block"]],
  d: ["Study the economics of fodder production.", "Learn azolla cultivation."]
});
planned("nutr", ["Ruminant nutrition: energy and protein systems in depth", "Feed formulation methods", "Nutrition of laboratory and companion animals", "Feed additives and antinutritional factors", "Mycotoxins in feeds", "Nutrition and reproduction", "Feeding standards (ICAR, NRC)", "Nutritional disorders of livestock"]);

/* ================= PUBLIC HEALTH ================= */
unit("pubh", "Unit 1 – Public health and epidemiology");
topic("pubh", "Epidemiology: Concepts and Measures", {
  i: "Epidemiology studies the distribution and determinants of disease in populations. It asks who, where, when and why.",
  s: "A clinician treats one animal. An epidemiologist looks at the herd, the village or the district and asks why some get sick and others do not.",
  n: [
    ["Terms", "- Endemic: a disease constantly present in an area.\n- Epidemic (epizootic in animals): sudden rise in cases above expected.\n- Pandemic (panzootic): spread over many countries.\n- Sporadic: occasional cases.\n- Outbreak: localised epidemic.\n- Enzootic: endemic in animals.\n- Zoonosis: shared between animals and people."],
    ["Epidemiological triad", "Agent, host and environment. Disease arises when the three interact. Control may target any of them."],
    ["Measures", "Incidence is the number of new cases in a population over a period. Prevalence is the number of existing cases at a point in time. Morbidity rate, mortality rate and case fatality rate are common. Attack rate is used in outbreaks. Sensitivity of a test is its ability to detect those with the disease, specificity its ability to identify those without it."],
    ["Modes of transmission", "Direct (contact, bite, venereal, vertical from mother to young) and indirect (vehicles such as feed and water, vectors, fomites, aerosols). Source of infection can be a carrier, an animal reservoir or the environment."],
    ["Disease investigation", "Confirm the outbreak, define cases, count cases, describe by time, place and animal, form hypotheses, test them, apply control measures and report. Surveillance means continuous collection and analysis of disease data. Notifiable diseases must be reported to authorities."],
    ["Control strategies", "Eliminate the agent, protect the host by vaccination and nutrition, control vectors, quarantine, test and slaughter or cull in some diseases, movement control, and awareness. Eradication means permanent global elimination, as achieved for rinderpest."]
  ],
  tb: { h: ["Term", "Meaning"], r: [["Incidence", "New cases in a time period"], ["Prevalence", "All existing cases at a time"], ["Sensitivity", "True positives detected among diseased"], ["Specificity", "True negatives identified among healthy"]] },
  k: ["Definitions of endemic, epidemic, sporadic, pandemic.", "Incidence vs prevalence.", "Epidemiological triad.", "Investigation steps."],
  m: ["Prevalence and incidence are not the same."],
  sa: [["Differentiate incidence and prevalence.", "Incidence is new cases over a period. Prevalence is all existing cases at a point or period."], ["What is a zoonosis?", "A disease naturally transmissible between animals and humans."]],
  la: [["Describe the epidemiological triad and steps of an outbreak investigation.", "Agent, host, environment, steps from confirmation to control, surveillance and reporting."]],
  q: [["A disease constantly present in an area is", ["Epidemic", "Endemic", "Sporadic", "Pandemic"], 1, "Endemic."],
    ["New cases in a period are measured by", ["Prevalence", "Incidence", "Specificity", "Sensitivity"], 1, "Incidence."],
    ["The disease eradicated worldwide in animals is", ["Rinderpest", "FMD", "Anthrax", "Rabies"], 0, "Rinderpest."]],
  f: [["Fomite", "Inanimate object that carries infection"], ["Surveillance", "Systematic collection and analysis of disease data"]],
  d: ["Learn sampling and sample size.", "Study study designs: cohort, case-control, cross-sectional."]
});

topic("pubh", "Zoonoses: Major Diseases and Prevention", {
  i: "Zoonoses are diseases transmitted between animals and humans. Veterinarians are central to their control.",
  s: "Many human diseases begin in animals. If we control them in animals, people are protected. This is the One Health idea.",
  n: [
    ["Classification", "By cycle: direct zoonoses (rabies, brucellosis), cyclozoonoses (need more than one vertebrate host, like taeniasis and hydatidosis), metazoonoses (need an invertebrate vector, like Japanese encephalitis) and saprozoonoses (environmental reservoir, like anthrax spores in soil)."],
    ["Important zoonoses in India", "- Rabies: bite of infected dogs, nearly always fatal once signs appear but preventable by post-exposure care and vaccination.\n- Brucellosis: raw milk and contact with aborted material.\n- Tuberculosis: milk and respiratory.\n- Anthrax: contact with infected carcasses, hides and meat.\n- Leptospirosis: urine-contaminated water.\n- Japanese encephalitis: mosquitoes, pigs as amplifying hosts.\n- Kyasanur forest disease: ticks, monkeys.\n- Salmonellosis and E. coli: food-borne.\n- Hydatidosis, taeniasis, cysticercosis.\n- Avian influenza and Nipah virus: emerging.\n- Toxoplasmosis, ringworm, scrub typhus."],
    ["Prevention", "Vaccination of dogs against rabies, control of stray dog populations through humane methods like sterilisation and vaccination, pasteurisation of milk, meat inspection, safe disposal of carcasses and aborted material, protective clothing for farm workers and vets, rodent and vector control, health education, and prompt reporting."],
    ["One Health", "Human, animal and environmental health are linked. Joint surveillance and communication between veterinary and medical sectors is needed. Antimicrobial resistance and emerging infections show why."],
    ["Occupational safety", "Vets and farm workers face risk from Brucella, Leptospira, Coxiella (Q fever), rabies and others. Gloves, masks, hand washing, avoiding handling aborted foetuses bare-handed, and rabies pre-exposure vaccination are part of good practice. Any bite or exposure should be reported and medical advice taken at once."]
  ],
  tb: { h: ["Zoonosis", "Source", "Route"], r: [["Rabies", "Dogs, other mammals", "Bite, saliva"], ["Brucellosis", "Cattle, goats, pigs", "Raw milk, aborted material"], ["Anthrax", "Cattle, sheep", "Carcass contact, spores"], ["Leptospirosis", "Rodents, livestock", "Contaminated water"], ["Japanese encephalitis", "Pigs, birds", "Mosquito"]] },
  k: ["Classification of zoonoses.", "Rabies prevention.", "Brucellosis control.", "One Health.", "Occupational hazards."],
  m: ["Cooking and pasteurisation prevent many food-borne zoonoses but not all."],
  sa: [["What is One Health?", "An approach recognising that human, animal and environmental health are connected, and acting together to protect all."], ["How is brucellosis transmitted to humans?", "By raw milk or milk products, contact with aborted foetuses and fluids, and infected animals."]],
  la: [["Describe the important zoonoses of India and their control.", "List and classify, source, transmission, signs in animals and humans in outline, prevention and control."]],
  q: [["Leptospirosis spreads mainly through", ["Contaminated water or urine", "Air", "Insects", "Milk only"], 0, "Urine-contaminated water."],
    ["Pigs are amplifying hosts of", ["Rabies", "Japanese encephalitis", "Anthrax", "Brucellosis"], 1, "JE."],
    ["Pasteurisation of milk helps prevent", ["Brucellosis", "Rabies", "Anthrax", "JE"], 0, "Brucella and TB in milk."]],
  f: [["Reverse zoonosis", "Disease passing from humans to animals"], ["One Health", "Joint human, animal, environment health approach"]],
  d: ["Study the National Rabies Control Programme.", "Learn emerging zoonoses."]
});

topic("pubh", "Food Safety, Meat and Milk Hygiene", {
  i: "Veterinary public health includes making sure food from animals is safe: meat, milk, eggs and their products.",
  s: "Healthy animals, clean handling and cold storage give safe food. Inspection catches diseased carcasses before they reach consumers.",
  n: [
    ["Meat hygiene", "Ante-mortem inspection detects sick animals before slaughter. Post-mortem inspection examines the carcass, organs and lymph nodes for diseases like tuberculosis, cysticercosis and abscesses. Carcasses may be passed, condemned partly or totally. Slaughter should be in licensed slaughterhouses with clean water, drainage and waste disposal. Rigor mortis and the pH fall after slaughter affect meat quality. Hygienic handling and chilling reduce spoilage."],
    ["Milk hygiene", "Milk is an excellent medium for bacteria. Clean milking, healthy udders, clean utensils, quick cooling and pasteurisation protect quality and safety. Tests include the clot on boiling test, alcohol test, methylene blue reduction test, and somatic cell counts for mastitis. Antibiotic residues must be avoided by observing withdrawal periods."],
    ["Food-borne disease", "Salmonella, Campylobacter, E. coli, Listeria, Staphylococcus aureus toxin, Clostridium perfringens, Bacillus cereus. Parasites like Taenia and Trichinella. Chemical hazards include residues and heavy metals."],
    ["HACCP and standards", "HACCP (Hazard Analysis and Critical Control Points) is a preventive system that identifies hazards and controls them at critical points. In India the Food Safety and Standards Authority of India (FSSAI) regulates food, and slaughterhouses and meat shops need licences. Details of rules change, so check current regulations."],
    ["Residues", "Drug, pesticide and heavy metal residues are a food safety and resistance issue. Withdrawal periods and testing programmes protect consumers."]
  ],
  k: ["Ante-mortem and post-mortem inspection.", "Milk quality tests.", "HACCP.", "Food-borne pathogens.", "Residues."],
  m: ["Visibly clean milk is not necessarily safe."],
  sa: [["What is HACCP?", "A preventive system that identifies hazards in food production and controls them at critical points."], ["Why is ante-mortem inspection needed?", "To identify sick animals and prevent unfit animals entering the food chain."]],
  la: [["Describe post-mortem meat inspection and the judgement of carcasses.", "Procedures, organs examined, diseases found, possible judgements, disposal."]],
  q: [["Which test indicates the bacterial load of milk by colour change?", ["MBR test", "Alcohol test", "CoB test", "Gerber test"], 0, "Methylene blue reduction test."],
    ["HACCP stands for", ["Hazard Analysis and Critical Control Points", "Health And Clean Control Practice", "Hygiene And Care Control Plan", "None"], 0, "That is the correct expansion."],
    ["Taenia saginata is acquired from", ["Pork", "Beef", "Milk", "Eggs"], 1, "Cysticercus bovis in beef."]],
  f: [["Condemnation", "Declaring a carcass or organ unfit for human food"], ["CoB test", "Clot on boiling test for milk"]],
  d: ["Learn slaughterhouse design.", "Study FSSAI milk standards."]
});
planned("pubh", ["Veterinary epidemiology study designs and statistics", "Disease surveillance and reporting systems", "National disease control programmes in India", "Environmental hygiene and waste disposal", "Animal welfare and legislation", "Biosecurity and quarantine", "Disaster and outbreak management", "Veterinary jurisprudence"]);
/* ================= GENETICS ================= */
unit("gen", "Unit 1 – Genetics basics");
topic("gen", "Mendelian Genetics and Gene Interactions", {
  i: "Genetics is the study of heredity and variation. Breeding programmes depend on understanding how traits pass from parents to offspring.",
  s: "Each animal carries two copies of most genes, one from each parent. Some versions of a gene hide others. That simple idea explains many coat colours and inherited defects.",
  n: [
    ["Basic terms", "- Gene: unit of inheritance. Allele: alternative form of a gene. Locus: position of a gene on a chromosome.\n- Genotype: genetic makeup. Phenotype: observed trait.\n- Homozygous: two identical alleles. Heterozygous: two different alleles.\n- Dominant: expressed in heterozygote. Recessive: expressed only in homozygote.\n- Chromosomes: cattle 2n = 60, buffalo 2n = 50 (river type), sheep 54, goat 60, pig 38, horse 64, dog 78, chicken 78, human 46."],
    ["Mendel's laws", "Law of segregation: the two alleles of a gene separate during gamete formation. Law of independent assortment: genes at different loci assort independently (when on different chromosomes). Law of dominance. Test cross: crossing an individual of unknown genotype with a homozygous recessive to find the genotype. A monohybrid cross gives a 3:1 ratio in F2 and a dihybrid cross a 9:3:3:1 ratio."],
    ["Deviations", "- Incomplete dominance: heterozygote is intermediate (red x white shorthorn gives roan).\n- Codominance: both alleles show (blood groups).\n- Epistasis: one gene masks another (coat colour in dogs and horses).\n- Lethal genes: kill in some genotypes (creeper fowl, dwarfism in some breeds).\n- Sex-linked inheritance: genes on the sex chromosomes. In birds the female is the heterogametic sex (ZW) and the male is ZZ. Sex-linked barring is used for autosexing chicks.\n- Linkage and crossing over."],
    ["Inherited defects", "Examples include bovine leukocyte adhesion deficiency (BLAD), complex vertebral malformation in Holsteins, hip dysplasia in dogs (polygenic with environment) and cryptorchidism. Carriers can be detected by tests and avoided in breeding. A genetic defect is best controlled by identifying carriers, not by hiding the problem."],
    ["Molecular basis", "DNA is the genetic material, with replication, transcription and translation. Mutations are changes in DNA. PCR, DNA markers and genomic selection are modern tools used in animal breeding."]
  ],
  tb: { h: ["Cross", "Ratio"], r: [["Monohybrid F2 (phenotype)", "3 : 1"], ["Monohybrid F2 (genotype)", "1 : 2 : 1"], ["Dihybrid F2", "9 : 3 : 3 : 1"], ["Test cross (heterozygote)", "1 : 1"]] },
  k: ["Mendel's laws.", "Test cross.", "Incomplete dominance and codominance.", "Sex determination in birds.", "Chromosome numbers."],
  m: ["Dominant does not mean common or better."],
  sa: [["What is a test cross?", "A cross of an individual of unknown genotype with a homozygous recessive to determine its genotype."], ["Which sex is heterogametic in birds?", "The female (ZW)."]],
  la: [["State and explain Mendel's laws with examples from livestock.", "Segregation, independent assortment, dominance, crosses and ratios, deviations, practical use."]],
  q: [["F2 phenotypic ratio of a monohybrid cross is", ["1:1", "3:1", "9:3:3:1", "1:2:1"], 1, "3:1."],
    ["Chromosome number of cattle is", ["38", "54", "60", "78"], 2, "2n = 60."],
    ["In poultry, the heterogametic sex is", ["Male", "Female", "Both", "None"], 1, "Female ZW."]],
  f: [["Allele", "Alternative form of a gene"], ["Epistasis", "Interaction in which one gene masks another"]],
  d: ["Practise genetics problems.", "Study quantitative genetics."]
});

topic("gen", "Population and Quantitative Genetics", {
  i: "Most economic traits like milk yield and growth are controlled by many genes and the environment. Population genetics describes how gene frequencies behave.",
  s: "Milk yield isn't decided by one gene. Many genes and feeding together decide it. Breeders estimate how much of the difference between animals is due to genes, which is called heritability.",
  n: [
    ["Gene frequency and Hardy-Weinberg", "Gene frequency is the proportion of an allele in a population. In a large randomly mating population with no selection, mutation, migration or drift, gene and genotype frequencies stay constant: p2 + 2pq + q2 = 1. Factors that change gene frequencies are selection, mutation, migration, and genetic drift (chance, important in small populations)."],
    ["Quantitative traits", "Phenotypic value P = genotypic value G + environment E. The genotypic value is split into additive (A), dominance (D) and epistatic (I) effects. Additive effects are what parents pass on."],
    ["Heritability", "Heritability in the narrow sense (h2) is the ratio of additive genetic variance to phenotypic variance. Highly heritable traits (above about 0.4) like body weight respond well to selection. Moderately heritable traits are around 0.2 to 0.4, such as milk yield. Low heritability traits (below 0.2) like fertility and survival respond slowly, and are improved more by management and crossbreeding. Repeatability measures how consistently an animal repeats performance, and sets an upper limit for heritability."],
    ["Breeding value and response", "Breeding value is the value of an animal as a parent, twice the average deviation of its progeny from the population mean. Response to selection R = h2 x S, where S is the selection differential. Genetic gain per year depends on selection intensity, accuracy, genetic variation and generation interval."],
    ["Correlation", "Genetic correlations between traits matter. Milk yield and fat percentage are negatively correlated, so selecting for yield alone can reduce fat percentage."]
  ],
  tb: { h: ["Trait example", "Heritability level"], r: [["Body weight, carcass traits", "High"], ["Milk yield, growth rate", "Moderate"], ["Fertility, survival", "Low"]] },
  k: ["Hardy-Weinberg law.", "Heritability.", "Selection response R = h2 S.", "Genetic drift.", "Repeatability."],
  m: ["Heritability is not the extent a trait is genetic in an individual. It is a population ratio."],
  sa: [["Define heritability.", "The proportion of the total phenotypic variance that is due to additive genetic variance (narrow sense)."], ["State the Hardy-Weinberg law.", "In a large randomly mating population without selection, mutation, migration or drift, gene frequencies and genotype frequencies remain constant."]],
  la: [["Describe heritability and its use in animal breeding.", "Definition, types, estimates, factors, applications in selection, predicted response."]],
  q: [["Response to selection equals", ["h2 x S", "h2 / S", "S / h2", "h2 + S"], 0, "R = h2 S."],
    ["Fertility has", ["High heritability", "Low heritability", "Zero heritability", "Infinite"], 1, "Low heritability."],
    ["Genetic drift is most important in", ["Large populations", "Small populations", "Clones", "Mass populations"], 1, "Chance effects are larger in small populations."]],
  f: [["Genetic drift", "Random change in gene frequency in small populations"], ["Selection differential", "Difference between the mean of selected parents and the population mean"]],
  d: ["Practise heritability and response calculations.", "Study progeny testing."]
});

unit("gen", "Unit 2 – Breeding methods");
topic("gen", "Selection, Breeding Systems and Livestock Breeds of India", {
  i: "Breeders improve livestock through selection of the best parents and by planned mating systems.",
  s: "Choose the best animals as parents, and mate them in the way that fits your goal: purebreeding, crossbreeding or upgrading. India has many indigenous breeds well adapted to local conditions.",
  n: [
    ["Selection methods", "Individual (mass) selection uses the animal's own performance. Pedigree selection uses ancestors' records. Family selection uses relatives' average. Progeny testing uses offspring performance and is the most accurate for sex-limited traits like milk yield in bulls, but is slow and costly. Genomic selection uses DNA markers to predict breeding value early. Tandem, independent culling and selection index are methods to select for several traits."],
    ["Inbreeding and outbreeding", "Inbreeding is mating of related animals. It increases homozygosity, reduces fitness (inbreeding depression) and shows hidden recessive defects, but fixes desirable traits. Line breeding is a milder form. Outbreeding is mating of unrelated animals: outcrossing within a breed, crossbreeding between breeds, upgrading (repeated use of purebred sires on a local breed) and grading. Heterosis (hybrid vigour) is the superiority of the crossbred over the average of parents, and is greatest for low heritability traits like fertility and survival."],
    ["Crossbreeding in India", "Crossbreeding of indigenous cattle with exotic breeds like Holstein Friesian and Jersey raised milk yield in many herds but has to be matched with feeding, health care and local adaptation. Heat tolerance, tick resistance and disease resistance of indigenous breeds remain important, and several indigenous breeds are being used in genetic improvement programmes."],
    ["Selected breeds of India", "- Cattle (milch): Sahiwal, Gir, Red Sindhi, Tharparkar. Draught: Hallikar, Amritmahal, Kangayam, Ongole (also dual purpose, important in Andhra Pradesh). Dual: Haryana, Kankrej.\n- Buffalo: Murrah, Jaffarabadi, Mehsana, Surti, Nili-Ravi, Banni, Pandharpuri.\n- Sheep: Nellore, Deccani, Marwari, Chokla, Mandya, Merino cross. Goat: Jamunapari, Beetal, Barbari, Sirohi, Osmanabadi, Black Bengal, Malabari.\n- Poultry: Aseel, Kadaknath, Giriraja, Vanaraja; commercial layers and broilers are hybrids.\n- Pig: Large White Yorkshire, Hampshire, Landrace, Ghungroo. Horse: Marwari, Kathiawari."],
    ["Artificial insemination and biotechnology", "Artificial insemination (AI) spreads superior genetics using frozen semen, stored in liquid nitrogen at minus 196 degrees C. Other tools: oestrus synchronisation, multiple ovulation and embryo transfer (MOET), in vitro fertilisation, sexed semen and cloning. Their use depends on cost, expertise and field conditions."]
  ],
  tb: { h: ["System", "Effect", "Use"], r: [["Inbreeding", "More homozygosity, depression", "Fix traits, produce lines"], ["Outcrossing", "Unrelated mates in same breed", "Avoid inbreeding"], ["Crossbreeding", "Heterosis", "Production in commercial herds"], ["Upgrading", "Gradual replacement of local blood", "Improve local stock"]] },
  k: ["Selection methods.", "Inbreeding effects.", "Heterosis.", "Indian breeds with purpose.", "AI and frozen semen."],
  m: ["Crossbreeding does not automatically give more profit. Management must match the genotype."],
  sa: [["What is heterosis?", "The superiority of a crossbred over the average of its parent breeds."], ["At what temperature is frozen semen stored?", "Minus 196 degrees C in liquid nitrogen."]],
  la: [["Describe the breeding systems used in livestock improvement.", "Inbreeding, line breeding, outcrossing, crossbreeding, upgrading, effects, advantages, limits."]],
  q: [["Murrah is a breed of", ["Cattle", "Buffalo", "Goat", "Sheep"], 1, "A buffalo breed."],
    ["Ongole is a breed of", ["Cattle", "Buffalo", "Sheep", "Goat"], 0, "Cattle, from Andhra Pradesh."],
    ["Inbreeding increases", ["Heterozygosity", "Homozygosity", "Heterosis", "Mutation"], 1, "Homozygosity."],
    ["Heterosis is greatest for", ["Highly heritable traits", "Low heritability traits", "Qualitative traits", "Dominant genes only"], 1, "Low heritability traits like fertility."]],
  f: [["Progeny testing", "Evaluating a sire by performance of his offspring"], ["MOET", "Multiple ovulation and embryo transfer"]],
  d: ["Learn the characteristics of each breed.", "Study breeding policy of India."]
});
planned("gen", ["Cytogenetics and chromosome abnormalities", "Molecular genetics and DNA technology", "Immunogenetics and blood groups", "Genetics of coat colour", "Poultry breeding", "Selection index and genomic selection in depth", "Conservation of indigenous breeds", "Statistics for genetics"]);

/* ================= LIVESTOCK PRODUCTION MANAGEMENT ================= */
unit("lpm", "Unit 1 – Cattle and buffalo");
topic("lpm", "Dairy Cattle and Buffalo Management", {
  i: "Good dairy management turns genetic and feed potential into milk, with healthy animals and healthy calves.",
  s: "Housing, feeding, milking, breeding and health care all work together. A weak point in any one of these lowers the whole farm's profit.",
  n: [
    ["Housing", "Sheds should be well ventilated, with a dry, non-slip floor, slope for drainage, clean water, shade and feeding space. Cattle need about 3.5 to 4 square metres of covered area and more of open area per adult cow. Buffaloes need protection from heat and access to wallowing or sprinkling. Heat stress reduces intake, milk and fertility, so shade, fans and sprinklers help in hot regions."],
    ["Calf rearing", "Clean calving area. Colostrum within the first hours after birth, about 10 percent of body weight in the first day in several divided feeds, is the most important management step. Navel disinfection, clean pens, weaning at suitable age, early starter feed and deworming and vaccination schedules as advised by the veterinarian. Calf mortality is a big loss on many farms."],
    ["Milking", "Clean hands or machine, clean udder, discard first streams, regular timings, complete milking, teat dipping after milking to prevent mastitis, and cooling milk quickly. Dry period of about 45 to 60 days before calving gives the udder rest. Hand milking by full hand method is better than stripping."],
    ["Breeding management", "Detect heat accurately (standing heat, mucus discharge, restlessness, mounting). Inseminate at the right time. Ideal calving interval is about 12 to 13 months. Records of heat, service, pregnancy diagnosis and calving help find problems early."],
    ["Heifers and bulls", "Heifers should reach appropriate weight before first breeding. Bulls used for natural service need good housing, exercise and feeding. Bulls can be dangerous, so handle them with care."],
    ["Records and economics", "Milk yield, feed, breeding, health and costs. Feed is the largest cost, often 60 to 70 percent. Economic success comes from yield per animal, lower calf loss and shorter calving interval."]
  ],
  tb: { h: ["Stage", "Key management point"], r: [["Calf", "Colostrum, hygiene, starter"], ["Heifer", "Growth, timely breeding"], ["Lactating", "Feed, milking hygiene, heat detection"], ["Dry", "Rest, ration change, udder care"], ["Transition", "Prevent metabolic disease"]] },
  k: ["Colostrum feeding.", "Milking hygiene.", "Dry period.", "Calving interval.", "Heat stress."],
  m: ["Longer lactations are not always more profitable. A calf a year is the usual goal."],
  sa: [["Why is the dry period needed?", "It lets the mammary gland rest and regenerate and helps the cow regain condition before the next lactation."], ["What is the ideal calving interval?", "About 12 to 13 months."]],
  la: [["Describe the management of a dairy farm.", "Housing, feeding, breeding, milking, calf and heifer rearing, records, health programme."]],
  q: [["Teat dipping is done to prevent", ["Mastitis", "Bloat", "Milk fever", "Ketosis"], 0, "Mastitis."],
    ["Ideal dry period is about", ["10 days", "45 to 60 days", "120 days", "None"], 1, "About 45 to 60 days."],
    ["Colostrum should be fed", ["Within hours of birth", "After one week", "After weaning", "Never"], 0, "Soon after birth."]],
  f: [["Calving interval", "Time between two successive calvings"], ["Teat dip", "Disinfectant applied to teats after milking"]],
  d: ["Study dairy farm design.", "Learn clean milk production."]
});

unit("lpm", "Unit 2 – Small ruminants, pigs, poultry");
topic("lpm", "Sheep, Goat and Pig Management", {
  i: "Small ruminants and pigs give fast returns and fit small farmers, if managed carefully.",
  s: "Goats and sheep reproduce quickly and use poor land. Pigs convert waste and feed to meat fast. All three need clean housing, good feed and disease prevention.",
  n: [
    ["Goat management", "Housing off the ground with slatted floor (raised floor) reduces parasites and pneumonia. Goats are browsers and need access to shrubs and tree leaves. Kids need colostrum, and weaning is at about 3 months. Breeding season and kidding intervals: aim for three kiddings in two years in suitable breeds. Parasite control, vaccination (PPR, goat pox, enterotoxaemia as advised) and good records are essential."],
    ["Sheep management", "Sheep are grazers. Systems: extensive grazing, semi-intensive and intensive. Shearing, dipping, docking and castration are routine tasks. Flushing before mating and steaming up before lambing help. Lambs need colostrum and creep feed. Hoof care and parasite control are essential."],
    ["Pig management", "Housing with proper floor, shade, wallow or sprinklers because pigs have poor sweating. Sow reproduction: gestation about 114 days (3 months, 3 weeks, 3 days). Farrowing pens with protection rails reduce piglet crushing. Piglets need iron (iron deficiency anaemia is common in confined piglets), warmth and early colostrum. Tail docking, needle teeth clipping and castration as per standard practice. Pigs are prone to African swine fever and classical swine fever, so biosecurity is critical."],
    ["Records", "Birth, weaning and weight records, breeding and health records, mortality causes."]
  ],
  tb: { h: ["Species", "Gestation (approx)", "Key point"], r: [["Goat", "About 150 days", "Raised flooring, browse"], ["Sheep", "About 147-150 days", "Flushing, shearing"], ["Pig", "About 114 days", "Iron for piglets, biosecurity"]] },
  k: ["Gestation lengths.", "Flushing and steaming up.", "Piglet anaemia.", "Housing of goats."],
  m: ["Piglets need extra iron because sow milk is low in it."],
  sa: [["What is the gestation period of the pig?", "About 114 days."], ["Why is iron given to piglets?", "Because sow's milk has little iron and indoor-reared piglets have no access to soil."]],
  la: [["Describe the management of a piggery.", "Housing, breeding, farrowing, piglet care, feeding, health, biosecurity, marketing."]],
  q: [["Pig gestation is about", ["114 days", "150 days", "280 days", "21 days"], 0, "114 days."],
    ["Goats are mainly", ["Grazers", "Browsers", "Carnivores", "Omnivores"], 1, "Browsers."],
    ["Piglet anaemia is due to", ["Iron deficiency", "Vitamin K excess", "Calcium deficiency", "Protein excess"], 0, "Low iron."]],
  f: [["Farrowing", "Parturition in the sow"], ["Creep feed", "Special feed offered to young animals beside their mother"]],
  d: ["Study economics of goat farming.", "Learn pig breeding and artificial insemination."]
});

topic("lpm", "Poultry Management", {
  i: "Poultry is the fastest growing livestock sector. Management of brooding, housing, feeding, lighting and biosecurity decides success.",
  s: "Chicks are fragile. Warmth, clean water and clean housing in the first weeks decide the rest of their life. Strict biosecurity keeps diseases out.",
  n: [
    ["Housing systems", "Deep litter, cage (battery) and free range. Litter depth, ventilation and stocking density are important. Overcrowding causes stress, cannibalism and disease. House orientation is east-west to reduce sun entry."],
    ["Brooding", "Chicks need heat in the first weeks, with temperature about 32 to 35 degrees C at start and reduced gradually. Chick behaviour tells if the temperature is right: huddling under the heat source is too cold, spreading to the corners is too hot, even spread is good. Provide clean water and starter feed immediately."],
    ["Broilers and layers", "Broilers reach market weight in about 5 to 6 weeks. Layers begin laying at about 18 to 20 weeks, peak production at about 25 to 30 weeks, and need about 16 hours of light a day for good production. Debeaking (beak trimming) prevents cannibalism in some systems. Feeding phases follow the growth stage."],
    ["Egg handling", "Collect eggs frequently, store at cool temperature and avoid washing with cold water. Egg quality is judged by candling, shell, albumen and yolk."],
    ["Health and biosecurity", "All-in all-out management, restricted entry, footbaths, pest control, clean water, safe disposal of dead birds, and vaccination as per veterinary advice (Marek's disease, Ranikhet or Newcastle disease, infectious bursal disease, fowl pox). Early recognition of signs and prompt reporting of unusual mortality."]
  ],
  tb: { h: ["Item", "Broiler", "Layer"], r: [["Market or peak age", "5-6 weeks market", "Peak at 25-30 weeks"], ["Main goal", "Weight gain, low FCR", "Egg numbers and quality"], ["Light", "Long light early", "About 16 hours per day"]] },
  k: ["Brooding temperature behaviour.", "Deep litter.", "All-in all-out.", "Light for layers.", "Debeaking."],
  m: ["Overheating chicks is as bad as chilling them."],
  sa: [["What is all-in all-out?", "Stocking and clearing a whole house at the same time so that disease cannot pass from one batch to the next."], ["How much light do layers need?", "About 16 hours a day."]],
  la: [["Describe brooding and management of chicks.", "Preparation, temperature, space, feed, water, light, behaviour, vaccination, biosecurity."]],
  q: [["Chicks huddling under the brooder indicate", ["Too hot", "Too cold", "Right temperature", "Disease only"], 1, "Too cold."],
    ["Layers peak production at about", ["8 weeks", "25 to 30 weeks", "60 weeks", "90 weeks"], 1, "25 to 30 weeks."],
    ["The system keeping birds on bedding on the floor is", ["Cage", "Deep litter", "Free range only", "Battery"], 1, "Deep litter."]],
  f: [["Brooding", "Providing warmth and care to chicks in early life"], ["Candling", "Examining egg contents using light"]],
  d: ["Study hatchery management.", "Learn about duck, quail and turkey rearing."]
});
planned("lpm", ["Management of horses, donkeys, camels", "Zoo, laboratory and companion animal management", "Housing design and equipment", "Fodder planning for the farm", "Hatchery technology", "Integrated farming systems", "Project preparation and farm economics", "Climate change and livestock"]);

/* ================= LIVESTOCK PRODUCTS TECHNOLOGY ================= */
unit("lpt", "Unit 1 – Milk and meat");
topic("lpt", "Milk: Composition, Properties and Processing", {
  i: "Milk is a nutritious fluid and an ideal medium for bacteria. Technology aims at keeping it safe and turning it into useful products.",
  s: "Milk is water, fat, protein, lactose and minerals. Heat treatment kills harmful germs. From milk we make curd, butter, ghee, cheese and many other products.",
  n: [
    ["Composition", "Cow milk roughly: water about 87 percent, fat about 3.5 to 4.5, protein about 3.2 to 3.5 (casein about 80 percent of the protein, the rest whey proteins), lactose about 4.5 to 5, minerals about 0.7. Buffalo milk has higher fat (about 6 to 8 percent) and total solids. Colostrum has more protein and antibodies. Milk fat is in globules surrounded by a membrane. Lactose is the milk sugar."],
    ["Physical properties", "Specific gravity about 1.028 to 1.032 for cow milk, pH about 6.6 (slightly acid), freezing point depression used to detect added water. Water addition lowers specific gravity."],
    ["Quality tests", "Platform tests: organoleptic (smell, taste, colour), clot on boiling, alcohol test, acidity, lactometer reading and adulteration tests. Lab tests: fat by the Gerber method, SNF, bacterial count, methylene blue reduction test, somatic cell count, antibiotic residue test. Adulterants include water, starch, urea, detergents, neutralisers, and formalin, and each has a test."],
    ["Heat treatment", "Pasteurisation: LTLT (low temperature long time, about 63 degrees C for 30 minutes) or HTST (high temperature short time, about 72 degrees C for 15 seconds). Phosphatase test checks proper pasteurisation. Sterilisation and UHT (about 135 to 150 degrees C for a few seconds) give shelf-stable milk. Homogenisation breaks up fat globules to prevent cream layering."],
    ["Dairy products", "Curd (dahi) by lactic acid bacteria, butter by churning cream, ghee by clarifying butter or cream, cheese by coagulating milk with rennet or acid, paneer by acid coagulation, khoa, ice cream, milk powder by spray or roller drying, condensed milk, whey products. Starter cultures (Lactococcus, Lactobacillus, Streptococcus thermophilus) drive fermentation."],
    ["Spoilage", "Souring due to lactic acid bacteria growth, off flavours, ropiness and gas formation. Cooling soon after milking is the best defence. Milk chilling centres and bulk coolers are important in rural collection."]
  ],
  tb: { h: ["Component", "Cow milk (approx %)", "Note"], r: [["Water", "87", "Solvent"], ["Fat", "3.5-4.5", "Higher in buffalo"], ["Protein", "3.2-3.5", "80% casein"], ["Lactose", "4.5-5", "Milk sugar"], ["Minerals", "0.7", "Ca, P"]] },
  k: ["Milk composition.", "Pasteurisation methods.", "Phosphatase test.", "Adulterant tests.", "Dairy products steps."],
  m: ["Boiled milk is not pasteurised milk. Boiling changes flavour and some nutrients."],
  sa: [["What does the phosphatase test show?", "Whether milk has been properly pasteurised, since the enzyme alkaline phosphatase is destroyed by pasteurisation."], ["Which protein forms 80% of milk protein?", "Casein."]],
  la: [["Describe the methods of pasteurisation of milk.", "LTLT, HTST, UHT, temperature, time, equipment, merits, tests for efficiency."]],
  q: [["The Gerber method estimates", ["Fat", "Lactose", "Water", "Ash"], 0, "Milk fat."],
    ["HTST pasteurisation uses about", ["63 C for 30 min", "72 C for 15 s", "100 C for 1 h", "135 C for 10 min"], 1, "72 C for 15 seconds."],
    ["Addition of water to milk", ["Raises specific gravity", "Lowers specific gravity", "No effect", "Raises fat"], 1, "Lowers it."],
    ["Paneer is made by", ["Rennet only", "Acid coagulation", "Freezing", "Churning"], 1, "Heat and acid coagulation."]],
  f: [["Casein", "Main milk protein, coagulates with acid or rennet"], ["UHT", "Ultra high temperature sterilisation"]],
  d: ["Learn the manufacture of ghee and cheese.", "Study dairy plant sanitation."]
});

topic("lpt", "Meat Science and Technology", {
  i: "Meat science covers how muscle becomes meat, how to keep it safe and how to make products from it.",
  s: "After slaughter, muscle goes through rigor mortis and then ageing, which makes meat tender. Chilling, hygiene and proper handling keep it safe.",
  n: [
    ["Muscle to meat", "After slaughter, blood supply stops, glycogen is converted to lactic acid, pH falls from about 7 to about 5.5, and ATP is exhausted causing rigor mortis (stiffening). Rigor resolves during ageing (conditioning) as enzymes soften the muscle, which improves tenderness. Stress before slaughter depletes glycogen, giving a higher final pH."],
    ["Quality defects", "PSE (pale, soft, exudative) meat in pigs from fast pH fall. DFD (dark, firm, dry) meat from stressed animals with high final pH, with a shorter shelf life. Cold shortening and thaw rigor affect tenderness."],
    ["Slaughter and dressing", "Humane slaughter (stunning where required), bleeding, skinning, evisceration, carcass splitting and chilling. Dressing percentage is carcass weight divided by live weight, x 100. It varies with species, breed, fat and gut fill. Carcass cuts differ by species. Offal (edible and inedible) and by-products like hide, blood, bone and fat have value."],
    ["Preservation", "Chilling and freezing slow microbes. Curing with salt and nitrite, smoking, drying and canning. Thermal processing. Packaging under vacuum or modified atmosphere extends shelf life."],
    ["Meat products", "Sausages, ham, bacon, nuggets, patties, kebabs, pickles, meat extracts and cured meats. Binders, extenders, spices and additives are used, and safe formulation matters. Poultry meat is the biggest share in India."],
    ["Quality and safety", "Colour from myoglobin, tenderness, juiciness, flavour. Microbial hazards: Salmonella, E. coli, Listeria, Campylobacter. Cold chain, clean water and trained workers prevent them."]
  ],
  tb: { h: ["Defect", "Cause", "Look"], r: [["PSE", "Rapid post-mortem pH fall, pigs", "Pale, soft, watery"], ["DFD", "Pre-slaughter stress, high pH", "Dark, firm, dry"]] },
  k: ["Rigor mortis.", "pH changes.", "PSE and DFD.", "Dressing percentage.", "Meat preservation methods."],
  m: ["Fresh meat straight after slaughter is not the most tender. Ageing improves tenderness."],
  sa: [["What is dressing percentage?", "(Carcass weight / live weight) x 100."], ["What causes rigor mortis?", "Depletion of ATP after death so that actin and myosin remain locked together."]],
  la: [["Describe post-mortem changes in muscle.", "Glycolysis, pH fall, rigor, resolution, ageing, effect on quality, defects."]],
  q: [["DFD meat is due to", ["Pre-slaughter stress", "Rapid chilling only", "Cooking", "Salting"], 0, "Low muscle glycogen at slaughter."],
    ["Muscle pH falls to about", ["7.5", "5.5", "3", "9"], 1, "About 5.5."],
    ["Meat pigment is", ["Myoglobin", "Haemoglobin only", "Keratin", "Casein"], 0, "Myoglobin."]],
  f: [["Rigor mortis", "Post-mortem stiffening of muscles"], ["Conditioning", "Ageing of meat to improve tenderness"]],
  d: ["Study slaughterhouse design and by-product utilisation.", "Learn sausage manufacture."]
});

unit("lpt", "Unit 2 – Eggs and other products");
topic("lpt", "Eggs, Poultry Products and By-products", {
  i: "Eggs are a complete, cheap protein food that spoil easily. Quality grading, storage and processing protect their value.",
  s: "An egg has a shell, shell membranes, white (albumen) and yolk. Fresh eggs have a thick white and a high yolk. Storage and handling decide how long they stay good.",
  n: [
    ["Structure", "Shell (calcium carbonate with pores), shell membranes, air cell at the blunt end, thick and thin albumen, chalazae (twisted cords holding the yolk), vitelline membrane and yolk. Egg weight is about 50 to 60 g. Albumen is mostly water and protein like ovalbumin. The yolk contains fat, protein, vitamins and carotenoid pigments."],
    ["Quality evaluation", "Candling shows air cell size, yolk shadow and defects such as blood spots and cracks. Break-out tests give Haugh unit (albumen height and weight relation), yolk index and shell thickness. As eggs age, albumen thins, the air cell grows and the yolk flattens."],
    ["Preservation", "Refrigeration slows ageing. Oiling or coating the shell, thermostabilisation and storage in controlled humidity extend shelf life. Do not store eggs with strong-smelling items as they absorb odours. Wash only with warm water if necessary and dry well."],
    ["Egg products", "Liquid egg, frozen egg, egg powder, pickled egg and egg-based products like mayonnaise. Pasteurisation of liquid egg removes Salmonella risk."],
    ["By-products", "Slaughter by-products: hides and skins (leather industry), blood meal, bone meal, meat meal, tallow, hooves and horns, gelatin, rendering and poultry feather meal. Proper utilisation reduces waste and pollution and adds income. Wool, hair and bristle products are also animal products."]
  ],
  tb: { h: ["Part of egg", "Function"], r: [["Shell", "Protection, gas exchange"], ["Albumen", "Water, protein, shock absorption"], ["Yolk", "Nutrients for the embryo"], ["Chalaza", "Holds yolk centred"], ["Air cell", "Reserve of air; grows with age"]] },
  k: ["Egg structure.", "Haugh unit.", "Changes during storage.", "Egg preservation.", "By-products of slaughter."],
  m: ["Brown and white eggs have the same nutrition. Shell colour depends on the breed."],
  sa: [["What is a Haugh unit?", "A measure of albumen quality relating albumen height to egg weight."], ["How does an egg change with age?", "Albumen thins, air cell enlarges, yolk flattens, and weight falls."]],
  la: [["Describe the structure and quality evaluation of eggs.", "Parts with function, candling, break-out tests, changes with storage, grading."]],
  q: [["The air cell is found at the", ["Blunt end", "Pointed end", "Centre", "Yolk"], 0, "At the blunt end."],
    ["Haugh unit measures", ["Albumen quality", "Shell colour", "Yolk colour", "Egg price"], 0, "Albumen quality."],
    ["Blood meal is a", ["By-product", "Drug", "Vaccine", "Fodder crop"], 0, "A slaughter by-product used in feed."]],
  f: [["Chalaza", "Cord-like structure holding the yolk in the centre"], ["Rendering", "Heating animal tissues to extract fat and make meal"]],
  d: ["Study the leather industry.", "Learn about honey, wool and other animal products."]
});
planned("lpt", ["Cheese and fermented milk technology", "Dairy plant design and operation", "Meat plant design and by-product utilisation", "Packaging of animal products", "Fish products technology", "Quality assurance in food industry", "Wool and hair technology", "Value addition and entrepreneurship"]);
/* ================= GYNAECOLOGY AND OBSTETRICS ================= */
unit("gyn", "Unit 1 – Reproduction basics");
topic("gyn", "Reproductive Cycles and Oestrus", {
  i: "Understanding the oestrous cycle is the basis of breeding management, artificial insemination and fertility work.",
  s: "Females come into heat at regular intervals. Hormones from the brain, pituitary and ovary control it. Knowing the cycle tells you when to inseminate and when to suspect a problem.",
  n: [
    ["Hormonal control", "The hypothalamus releases GnRH, which stimulates the anterior pituitary to release FSH and LH. FSH grows follicles, which secrete oestrogen. A surge of oestrogen causes behavioural heat and triggers the LH surge, which brings ovulation. After ovulation the corpus luteum forms and secretes progesterone, which prepares and maintains the uterus. If the animal is not pregnant, prostaglandin F2 alpha from the uterus destroys the corpus luteum (luteolysis), progesterone falls and a new cycle begins."],
    ["Phases", "Proestrus (follicle growth), oestrus (heat, receptive to male), metoestrus (after ovulation, CL forming) and dioestrus (CL active). Anoestrus is a period without cycles."],
    ["Species patterns", "- Cow: polyoestrous, cycle about 21 days, heat about 12 to 18 hours, ovulation about 10 to 14 hours after the end of heat.\n- Buffalo: cycle about 21 days, heat is often silent and short, with seasonal effects.\n- Mare: seasonally polyoestrous (long days), cycle about 21 days, heat about 5 to 7 days.\n- Ewe: seasonally polyoestrous (short days), cycle about 17 days, heat about 24 to 36 hours.\n- Goat: seasonally polyoestrous in many breeds, cycle about 21 days.\n- Sow: polyoestrous, cycle about 21 days, heat about 2 to 3 days.\n- Bitch: monoestrous, with proestrus and oestrus together lasting about 2 to 3 weeks, and cycles about every 6 to 7 months.\n- Queen: seasonally polyoestrous and induced ovulators (ovulation after mating)."],
    ["Signs of heat in cows", "Standing to be mounted (the key sign), restlessness, bellowing, mucus discharge, swollen vulva, decreased milk, mounting others. Accurate detection is the most common limit in AI programmes. Heat detection aids include tail paint and pedometers. The best time to inseminate is generally during the later part of heat. The am-pm rule is a commonly taught guideline."],
    ["Puberty and breeding age", "Puberty is the age at which the first fertile oestrus occurs. It depends on breed, nutrition, and season. Heifers should reach a suitable weight before breeding. Indigenous cattle often reach puberty later than exotic ones."]
  ],
  tb: { h: ["Species", "Cycle length", "Pattern"], r: [["Cow", "About 21 days", "Polyoestrous"], ["Buffalo", "About 21 days", "Polyoestrous, silent heat"], ["Mare", "About 21 days", "Seasonal, long days"], ["Ewe", "About 17 days", "Seasonal, short days"], ["Sow", "About 21 days", "Polyoestrous"], ["Bitch", "6-7 months", "Monoestrous"]] },
  k: ["Hormone sequence.", "Phases of the cycle.", "Species cycle lengths.", "Heat signs.", "Induced ovulators."],
  m: ["Mucus discharge alone does not confirm heat. Standing to be mounted does."],
  sa: [["Which hormone causes luteolysis?", "Prostaglandin F2 alpha from the uterus."], ["Name an induced ovulator among domestic species.", "The cat (queen)."]],
  la: [["Describe the oestrous cycle of the cow with hormonal control.", "Phases, follicle growth, LH surge, ovulation, CL, progesterone, luteolysis, signs, timing for AI."]],
  q: [["The key sign of heat in cows is", ["Standing to be mounted", "Reduced appetite only", "Bloat", "Cough"], 0, "Standing heat."],
    ["Progesterone is produced by the", ["Corpus luteum", "Follicle", "Pituitary", "Placenta only"], 0, "CL."],
    ["The ewe is a", ["Seasonally polyoestrous short day breeder", "Monoestrous", "Continuous non-cycler", "Induced ovulator"], 0, "Short-day breeder."],
    ["LH surge causes", ["Ovulation", "Parturition", "Lactation", "Luteolysis"], 0, "Ovulation."]],
  f: [["Anoestrus", "Period without oestrous cycles"], ["Luteolysis", "Regression of the corpus luteum"]],
  d: ["Study oestrus synchronisation.", "Learn the reproductive physiology of the male."]
});

topic("gyn", "Pregnancy, Pregnancy Diagnosis and Placentation", {
  i: "Knowing normal pregnancy helps recognise abnormal pregnancy and plan management and calving.",
  s: "After fertilisation the embryo travels to the uterus, attaches and a placenta forms to feed the foetus. Vets use several methods to confirm pregnancy early.",
  n: [
    ["Fertilisation to implantation", "Sperm and ovum meet in the oviduct (ampulla). The zygote divides, forms a morula and blastocyst, and moves into the uterus. In domestic animals, attachment is gradual (non-invasive), unlike in humans. Maternal recognition of pregnancy prevents luteolysis, for example by interferon-tau in ruminants, so the CL persists."],
    ["Placenta types", "By distribution: diffuse (mare, sow), cotyledonary (ruminants, with placentomes), zonary (dog, cat) and discoid (primates). By layers in contact: epitheliochorial (mare, sow, ruminants as the least intimate), syndesmochorial (ruminants, modified), endotheliochorial (dog, cat) and haemochorial (human). The placenta of ruminants, horses and pigs does not pass antibodies, so colostrum matters."],
    ["Gestation lengths", "Cow about 280 days, buffalo about 310, mare about 335 to 340, ewe about 147 to 150, doe about 150, sow about 114, bitch about 63, queen about 63 to 65."],
    ["Pregnancy diagnosis", "- Rectal palpation in large animals (uterine changes, foetal membrane slip, placentomes, foetus).\n- Ultrasonography: early and accurate, used in all species.\n- Hormone assays: progesterone in milk or blood, pregnancy-associated glycoproteins.\n- Non-return to heat is an early clue but not proof.\n- Abdominal palpation, radiography and foetal heartbeat in small animals.\nEarly diagnosis helps remove non-pregnant animals from waiting too long and avoids losses."],
    ["Managing pregnancy", "Good nutrition, avoiding stress and trauma, vaccination as advised, and dry period management in cows. Abortion in livestock can be infectious (brucellosis, leptospirosis, others) or non-infectious. Handle aborted material with gloves and report to a veterinarian."]
  ],
  tb: { h: ["Species", "Gestation", "Placenta (distribution)"], r: [["Cow", "About 280 days", "Cotyledonary"], ["Mare", "About 335-340 days", "Diffuse"], ["Sow", "About 114 days", "Diffuse"], ["Bitch", "About 63 days", "Zonary"], ["Ewe", "About 147-150 days", "Cotyledonary"]] },
  k: ["Placenta types.", "Gestation periods.", "Methods of pregnancy diagnosis.", "Maternal recognition.", "Why antibodies are not transferred."],
  m: ["A cow that does not return to heat is not necessarily pregnant."],
  sa: [["Name the type of placenta in ruminants.", "Cotyledonary, with placentomes."], ["What is the gestation period of the bitch?", "About 63 days."]],
  la: [["Describe the types of placenta in domestic animals.", "Distribution and layer classification with species, examples, functions, clinical meaning."]],
  q: [["Cotyledonary placenta occurs in", ["Mare", "Sow", "Cow", "Bitch"], 2, "Ruminants."],
    ["Gestation of the buffalo is about", ["280 days", "310 days", "114 days", "150 days"], 1, "About 310 days."],
    ["Zonary placenta is seen in", ["Dog and cat", "Cow", "Pig", "Horse"], 0, "Carnivores."]],
  f: [["Placentome", "Union of maternal caruncle and foetal cotyledon"], ["PAG", "Pregnancy-associated glycoproteins"]],
  d: ["Study foetal membranes and fluids.", "Learn ultrasonographic findings."]
});

unit("gyn", "Unit 2 – Parturition and its problems");
topic("gyn", "Normal Parturition and Obstetrical Terms", {
  i: "Parturition is the process of giving birth. Knowing the normal process helps decide when help is needed.",
  s: "Birth has three stages: preparation and cervical opening, delivery of the young, and passing of the afterbirth. If any stage is delayed beyond normal, call a veterinarian.",
  n: [
    ["Initiation", "The foetus triggers birth: the foetal hypothalamus-pituitary-adrenal axis raises cortisol, which changes placental hormones, progesterone falls, oestrogen and prostaglandin rise, the cervix relaxes and oxytocin from the pituitary strengthens contractions. Relaxin softens pelvic ligaments."],
    ["Stages in cattle", "Stage 1: restlessness, tail raising, cervical dilation, no visible straining, lasts a few hours. Stage 2: delivery of the calf, abdominal straining, rupture of the water bags, usually within a couple of hours in cows. Stage 3: expulsion of the placenta, normally within about 8 to 12 hours. Retained placenta is a placenta not expelled within a certain period (often 12 hours or more)."],
    ["Obstetrical terms", "- Presentation: relation of the foetal long axis to the dam's (anterior or posterior longitudinal, transverse).\n- Position: relation of the back of the foetus to the dam's pelvis (dorsal, ventral, lateral).\n- Posture: position of the limbs, head and neck.\n- Normal presentation in cattle: anterior longitudinal, dorsal position, extended posture (two forelimbs and the head with nose on top).\n- Dystocia: difficult birth.\n- Eutocia: normal birth."],
    ["Signs approaching birth", "Udder fills, pelvic ligaments relax (sunken tail head), vulva swells, mucus discharge, restlessness, isolation from the herd, fall in body temperature in some species. Prepare a clean calving area and keep records of expected dates."],
    ["Newborn care", "Clear airways, ensure breathing, navel care, colostrum soon after birth, warmth, and observe passing of the first faeces. Weak or non-breathing newborns need a veterinarian's help."],
    ["Species notes", "Mare foals quickly and violently, so delays are an emergency. Sows farrow over several hours with piglets born at intervals. Bitches and queens deliver pups and kittens one after the other, and a long gap with straining needs veterinary attention."]
  ],
  tb: { h: ["Term", "Meaning"], r: [["Presentation", "Foetal long axis relative to dam"], ["Position", "Foetal back relative to dam pelvis"], ["Posture", "Placement of head and limbs"], ["Dystocia", "Difficult birth"], ["Eutocia", "Normal birth"]] },
  k: ["Stages of parturition.", "Hormones of parturition.", "Presentation, position, posture.", "Retained placenta."],
  m: ["Pulling on a calf without checking the presentation can do harm. Leave it to the veterinarian."],
  sa: [["Define dystocia.", "Difficult or abnormal birth that needs assistance."], ["What is the normal presentation of a calf?", "Anterior longitudinal presentation, dorsal position, extended posture."]],
  la: [["Describe the stages of normal parturition in the cow.", "Hormonal initiation, three stages, signs, duration, newborn care."]],
  q: [["Hormone that strengthens uterine contractions is", ["Oxytocin", "Insulin", "Thyroxine", "Prolactin"], 0, "Oxytocin."],
    ["Presentation describes", ["Foetal long axis", "Foetal back", "Limb placement", "Placenta"], 0, "Relation of foetal long axis to dam."],
    ["Retained placenta is a problem of", ["Stage 3", "Stage 1", "Stage 2", "Pregnancy"], 0, "Third stage."]],
  f: [["Eutocia", "Normal parturition"], ["Relaxin", "Hormone relaxing pelvic ligaments and cervix"]],
  d: ["Study causes of dystocia.", "Learn the obstetrical instruments."]
});

topic("gyn", "Reproductive Disorders and Infertility: An Overview", {
  i: "Reproductive failure is a major cause of loss in dairy and breeding animals. This overview shows the main categories.",
  s: "Fertility needs a healthy female, a healthy male, good management and timing. When a cow doesn't conceive, vets look at heat detection, health, feeding and the male side.",
  n: [
    ["Female infertility", "Anoestrus (no heat, often linked to poor feeding or ovarian problems), repeat breeding (three or more services without conception), silent heat (common in buffaloes), cystic ovarian disease, endometritis, metritis, pyometra, failure of ovulation, embryonic death, abortion, anatomical defects (freemartin, where a heifer born co-twin to a bull is usually infertile)."],
    ["Postpartum disorders", "Retained placenta, metritis, uterine prolapse, vaginal prolapse (before calving), milk fever, ketosis and mastitis. Early postpartum care reduces later infertility. Uterine involution normally completes in about 3 to 6 weeks in cows."],
    ["Male infertility", "Poor libido, poor semen quality, testicular degeneration or hypoplasia, cryptorchidism, injuries, infections (brucellosis, trichomoniasis, vibriosis), and heat. Breeding soundness examination checks health, genitalia and semen."],
    ["Infectious causes", "Brucellosis, leptospirosis, trichomoniasis, campylobacteriosis, IBR, BVD, Q fever. Some cause abortion, others repeat breeding. Report and investigate with a veterinarian and use lab confirmation."],
    ["Management factors", "Poor nutrition and body condition, heat stress, poor heat detection, wrong timing of AI, poor semen handling, stress and lack of records. Good records are a powerful tool to find where fertility is lost."],
    ["Veterinary role", "Diagnosis and treatment of reproductive disorders is for the veterinarian. Hormone therapy and procedures are decided case by case, so no protocols are given here."]
  ],
  tb: { h: ["Problem", "Meaning"], r: [["Anoestrus", "No oestrus seen"], ["Repeat breeder", "Normal cycles, multiple services without conception"], ["Pyometra", "Pus in the uterus"], ["Freemartin", "Sterile female twin to a male in cattle"], ["Cryptorchidism", "Undescended testis"]] },
  k: ["Repeat breeder definition.", "Freemartin.", "Causes of infertility.", "Breeding soundness examination."],
  m: ["Infertility is rarely one cause. Look at the whole herd."],
  sa: [["What is a freemartin?", "A sterile heifer born co-twin to a bull, due to placental vascular anastomosis and exposure to male hormones."], ["Define repeat breeding.", "A cow with regular oestrous cycles and normal genital tract that fails to conceive after three or more services."]],
  la: [["Describe the causes of infertility in cows.", "Management, nutritional, infectious, anatomical, hormonal, postpartum, male factors, and a systematic approach."]],
  q: [["A freemartin is usually", ["Fertile", "Sterile", "Male", "Pregnant"], 1, "Sterile."],
    ["Pyometra is", ["Pus in the uterus", "Blood in the uterus", "Gas in the rumen", "Milk in udder"], 0, "Pus."],
    ["Silent heat is common in", ["Buffaloes", "Mares only", "Poultry", "Dogs"], 0, "Buffaloes."]],
  f: [["Endometritis", "Inflammation of the uterine lining"], ["Involution", "Return of the uterus to normal size after birth"]],
  d: ["Study male reproduction and semen evaluation.", "Learn the assisted reproduction techniques."]
});
planned("gyn", ["Anatomy of the male and female reproductive tracts in depth", "Semen collection, evaluation and preservation", "Artificial insemination technique", "Dystocia: causes and classification", "Caesarean section and obstetrical surgery concepts", "Reproduction in dogs and cats", "Reproduction in poultry", "Embryo transfer and assisted reproduction", "Neonatal care"]);

/* ================= SURGERY AND RADIOLOGY ================= */
unit("surg", "Unit 1 – Principles of surgery");
topic("surg", "Surgical Principles, Asepsis and Wound Management", {
  i: "Surgery is the treatment of disease or injury by operative procedures. Success depends on good principles before technique.",
  s: "Keep things clean, handle tissue gently, stop bleeding, close without tension and think about pain and aftercare. These apply to every surgery from castration to caesarean section.",
  n: [
    ["Halsted's principles", "Gentle handling of tissues, meticulous haemostasis, preservation of blood supply, strict aseptic technique, minimum tension on tissue, accurate tissue apposition and elimination of dead space."],
    ["Asepsis and antisepsis", "Asepsis means keeping organisms away. Sterilisation of instruments (autoclave), sterile drapes and gowns, surgical scrub of the surgeon's hands, clipping and preparing the site with antiseptic, and a clean theatre. Antisepsis is reducing organisms on living tissue. Sterility must be verified with indicators and good habits."],
    ["Pre-operative assessment", "Clinical examination, history, fitness for anaesthesia, hydration and blood tests where needed, fasting in suitable species, informed consent from the owner and planning of the procedure. In ruminants, fasting reduces the risk of bloat and regurgitation under sedation."],
    ["Wounds", "Types: incised, contused, lacerated, punctured, abrasion, gunshot and bite wounds. Wound management: control bleeding, clean and lavage, debride dead tissue, assess closure possibility, protect, and take tetanus and rabies risk into account. Contaminated wounds heal best if allowed to drain or are closed later (delayed primary closure). Wound infection depends on contamination, tissue damage, foreign material and host factors."],
    ["Sutures and suturing", "Absorbable (catgut, polyglactin, polydioxanone) and non-absorbable (silk, nylon, polypropylene, steel) materials. Monofilament vs multifilament, size, and needles (cutting, round-bodied). Patterns: simple interrupted, simple continuous, mattress (horizontal, vertical), Lembert and Cushing for hollow organs, and subcuticular. Knot security, correct tension and suitable material for the tissue matter more than fancy patterns."],
    ["Post-operative care", "Analgesia, wound protection with bandage or collar, monitoring of temperature and appetite, suture removal timing as advised, and exercise restriction. Signs to watch: swelling, discharge, pain, fever and dehiscence."]
  ],
  tb: { h: ["Material", "Type", "Common use"], r: [["Catgut", "Absorbable natural", "Ligation, subcutaneous"], ["Polyglactin", "Absorbable synthetic", "Muscle, subcutis"], ["Silk", "Non-absorbable", "Skin, ligature"], ["Nylon", "Non-absorbable", "Skin"], ["Steel", "Non-absorbable", "Bone, tendon"]] },
  k: ["Halsted's principles.", "Asepsis vs antisepsis.", "Types of wounds.", "Suture materials and patterns.", "Delayed primary closure."],
  m: ["Antibiotics cannot replace aseptic technique."],
  sa: [["List Halsted's principles of surgery.", "Gentle tissue handling, careful haemostasis, preserving blood supply, aseptic technique, minimum tension, accurate apposition, obliteration of dead space."], ["Differentiate absorbable and non-absorbable sutures.", "Absorbable sutures are broken down in the body over time, non-absorbable remain."]],
  la: [["Describe the classification and management of wounds.", "Types, healing, assessment, cleaning, debridement, closure options, aftercare, complications."]],
  q: [["Which is non-absorbable?", ["Catgut", "Polyglactin", "Nylon", "Polydioxanone"], 2, "Nylon."],
    ["Lembert is a pattern used on", ["Skin", "Hollow organs", "Bone", "Nerve"], 1, "Inverting pattern for gut."],
    ["Autoclave is used for", ["Sterilisation", "Anaesthesia", "Suturing", "Diagnosis"], 0, "Instrument sterilisation."]],
  f: [["Dehiscence", "Reopening of a surgical wound"], ["Debridement", "Removal of dead and contaminated tissue"]],
  d: ["Learn knots and suturing practice.", "Study surgical theatre layout."]
});

topic("surg", "Anaesthesia, Pain Relief and Restraint: Concepts", {
  i: "Anaesthesia lets us operate without pain or stress. Restraint and sedation make handling safe for animals and people.",
  s: "Local anaesthesia numbs a small area. General anaesthesia makes the animal unconscious. Safe anaesthesia depends on assessing the animal, monitoring it and supporting it. Drug choice and doses are decided by a veterinarian.",
  n: [
    ["Restraint", "Physical restraint (halter, casting, crush, table, muzzle), chemical restraint (sedatives and tranquillisers). Horses need a safe area and handler. Cattle may be restrained in a crush or by casting methods. Dogs may be muzzled and held. Poor restraint hurts both animals and handlers."],
    ["Local anaesthesia", "Blocks pain in a region. Methods: topical, infiltration, nerve block, regional (intravenous regional), epidural. Common examples in cattle are the paravertebral block and line block for flank surgery such as caesarean section. Local anaesthetics block sodium channels in nerve fibres."],
    ["General anaesthesia", "Stages: pre-medication, induction, maintenance and recovery. Induction by injectable or inhalant agents, maintenance often with inhalational anaesthetics in an anaesthetic machine. Monitoring: heart rate, respiration, mucous membrane colour, capillary refill, pulse quality, temperature, reflexes (palpebral, corneal), and monitors like pulse oximetry and ECG where available. Ruminants are at risk of bloat, regurgitation and aspiration, so intubation or head-down positioning and fasting matter. Cats and dogs differ in drug sensitivity."],
    ["Pain recognition and relief", "Animals feel pain, and they hide it. Signs: reluctance to move, changes in posture, appetite loss, vocalisation, aggression and changes in behaviour. Analgesia should be part of every painful procedure. Multimodal analgesia combines different drug types. Never skip pain relief on welfare grounds."],
    ["Emergencies", "Anaesthetic emergencies include respiratory arrest, cardiac arrest, hypotension and hypothermia. Preparing equipment and monitoring prevent most. Recovery should be in a quiet, padded, warm place under watch."]
  ],
  tb: { h: ["Technique", "Area affected", "Example use"], r: [["Infiltration", "Local tissue", "Small wounds"], ["Nerve block", "Area supplied by the nerve", "Dehorning in cattle"], ["Epidural", "Caudal body", "Obstetrics, tail surgery"], ["General", "Whole body", "Major surgery"]] },
  k: ["Stages of general anaesthesia.", "Monitoring parameters.", "Ruminant anaesthetic risks.", "Pain recognition.", "Local vs general."],
  m: ["A quiet animal is not necessarily pain-free."],
  sa: [["List parameters monitored under anaesthesia.", "Heart rate, respiratory rate, mucous membrane colour, capillary refill time, pulse, temperature and reflexes."], ["Why are ruminants fasted before general anaesthesia?", "To reduce rumen content, bloat and regurgitation with aspiration."]],
  la: [["Describe general anaesthesia and its monitoring.", "Pre-medication, induction, maintenance, recovery, monitoring, complications, species notes."]],
  q: [["Local anaesthetics act by blocking", ["Sodium channels", "Potassium pump", "Calcium", "DNA"], 0, "Sodium channels."],
    ["The palpebral reflex is tested at the", ["Eyelid", "Foot", "Tail", "Ear"], 0, "Eyelid."],
    ["Aspiration risk is high in", ["Ruminants", "Birds only", "Fish", "None"], 0, "Regurgitation risk."]],
  f: [["Epidural", "Injection around the spinal cord's covering for regional anaesthesia"], ["Multimodal analgesia", "Using several analgesic types together"]],
  d: ["Learn the equipment of an anaesthetic machine.", "Study pre-anaesthetic drugs and their effects."]
});

unit("surg", "Unit 2 – Common conditions and imaging");
topic("surg", "Common Surgical Conditions in Large and Small Animals: Overview", {
  i: "A map of common surgical problems, so you recognise them and understand why they need a veterinarian.",
  s: "Hernias, abscesses, fractures and obstructions are frequent. Learn the idea behind each, not a recipe. Surgery for real animals is done under supervision after proper training.",
  n: [
    ["Soft tissue conditions", "- Abscess: a localised collection of pus. - Haematoma and seroma: collections of blood or serum. - Hernia: protrusion of an organ through an opening. Umbilical hernia is common in calves. Components: ring, sac and contents. Reducible, irreducible and strangulated hernias differ in urgency. - Cysts and tumours. - Prolapse: of the rectum, vagina or uterus."],
    ["Digestive tract", "Choke (oesophageal obstruction) in cattle with root crops, bloat (needs urgent attention), displaced abomasum in dairy cows (left side typically, with a ping sound on auscultation), intestinal obstruction, foreign bodies in dogs and cats, gastric dilatation volvulus in deep-chested dogs, and colic in horses. Colic is a symptom of abdominal pain, with many causes, and needs urgent veterinary examination."],
    ["Orthopaedics", "Fractures: classified as closed or open, simple or comminuted, transverse, oblique, spiral, greenstick. Principles of fracture management include reduction, fixation and immobilisation (splints, casts, pins, plates), with early return to function. Lameness is a major cause of loss in dairy cattle (foot lesions, laminitis) and horses. Dislocation, cruciate injury, and hoof problems each have specific approaches."],
    ["Urogenital and others", "Urolithiasis (urinary calculi, especially in male goats, sheep and steers, with a urethral blockage risk), castration, dehorning, caesarean section, ovariohysterectomy (spaying), cryptorchidism surgery, enucleation of a diseased eye, cancer eye in cattle."],
    ["Welfare and law", "Procedures like castration and dehorning should be done by trained personnel with suitable pain relief and in line with welfare law."]
  ],
  tb: { h: ["Condition", "Species commonly affected", "Key idea"], r: [["Umbilical hernia", "Calves, foals, pups", "Ring, sac, contents"], ["Left displaced abomasum", "Dairy cows", "Ping on left flank"], ["Urolithiasis", "Male small ruminants, steers", "Urethral obstruction"], ["GDV", "Deep-chested dogs", "Emergency"], ["Colic", "Horses", "Symptom of abdominal pain"]] },
  k: ["Parts of a hernia.", "Fracture classification.", "Urolithiasis.", "Displaced abomasum.", "Colic."],
  m: ["Colic is not a diagnosis. It is a sign."],
  sa: [["What are the parts of a hernia?", "Hernial ring, sac and contents."], ["Why are male goats at risk of urolithiasis?", "Their long narrow urethra with a sigmoid flexure can be blocked by calculi."]],
  la: [["Describe fractures and their management principles.", "Definition, classification, signs, healing, principles of reduction, fixation, immobilisation, complications."]],
  q: [["A reducible hernia", ["Can be pushed back", "Cannot be pushed back", "Always strangulated", "Is a tumour"], 0, "Contents return to the abdomen."],
    ["Left displaced abomasum gives a ping in", ["Left flank", "Right flank", "Chest", "Neck"], 0, "Left flank."],
    ["Spaying is also called", ["Ovariohysterectomy", "Castration", "Laparotomy only", "Enucleation"], 0, "Ovariohysterectomy."]],
  f: [["Strangulated hernia", "A hernia in which blood supply to the contents is cut off"], ["GDV", "Gastric dilatation and volvulus"]],
  d: ["Study each surgery in detail with a surgeon.", "Learn orthopaedic implants."]
});

topic("surg", "Veterinary Radiology and Diagnostic Imaging", {
  i: "Imaging shows what lies inside the body. Radiography and ultrasonography are the most common tools in veterinary practice.",
  s: "X-rays pass through tissues differently. Bone blocks them, soft tissue partly, and air hardly at all. We read the shadows. Ultrasound uses sound waves to see soft organs. Radiation must be handled safely.",
  n: [
    ["X-rays", "X-rays are electromagnetic radiation. Image density depends on the absorption of tissue: air (black), fat (dark grey), soft tissue and fluid (grey), bone (white) and metal (brightest white). Contrast agents show hollow organs (barium for the gut). Two views at right angles are standard. Positioning labels and good technique matter."],
    ["Technical factors", "kV (kilovoltage) controls penetration and contrast. mA and time (mAs) control the amount of radiation and blackening. Distance and collimation affect sharpness and safety. Digital radiography has largely replaced film."],
    ["Radiation safety", "Principles: time, distance and shielding (ALARA, as low as reasonably achievable). Lead aprons, thyroid shields, gloves, dosimeters, minimum people in the room, never hold the animal with bare hands in the primary beam, and pregnant staff should not do radiography. Sedation or anaesthesia reduces the need for restraint by staff."],
    ["Ultrasonography", "High-frequency sound waves reflect from tissue interfaces. Echogenicity terms: anechoic (black, fluid), hypoechoic, hyperechoic (white, bone, gas interfaces). Used for pregnancy diagnosis, abdominal organs, heart (echocardiography) and tendons in horses. No ionising radiation."],
    ["Other imaging", "CT and MRI give cross-sectional detail and are used in referral centres. Endoscopy views inside hollow organs. Nuclear imaging has special uses. Interpretation should be systematic: check technique, then each structure, then compare with normal."]
  ],
  tb: { h: ["Tissue", "X-ray appearance"], r: [["Air", "Black"], ["Fat", "Dark grey"], ["Soft tissue, fluid", "Grey"], ["Bone", "White"], ["Metal, contrast", "Very white"]] },
  k: ["Radiographic densities.", "ALARA.", "Ultrasound terms.", "Two views.", "Contrast agents."],
  m: ["Ultrasound is not harmless in every setting if misused, but it does not use ionising radiation."],
  sa: [["What does ALARA stand for?", "As Low As Reasonably Achievable, the principle for radiation exposure."], ["Name a contrast medium used for the gut.", "Barium sulphate."]],
  la: [["Describe radiation safety in a veterinary radiology room.", "Hazards, ALARA, protective clothing, dosimetry, room design, handling animals, rules for staff."]],
  q: [["Bone appears on an X-ray as", ["Black", "White", "Dark grey", "Transparent"], 1, "White."],
    ["Fluid on ultrasound is", ["Anechoic", "Hyperechoic", "Hypoechoic", "Echogenic"], 0, "Anechoic, black."],
    ["Barium is used to see the", ["Gut", "Brain", "Bone density", "Heart sounds"], 0, "Gastrointestinal tract."]],
  f: [["Echogenicity", "Brightness of a tissue on ultrasound"], ["Dosimeter", "Device that records radiation dose to a worker"]],
  d: ["Study normal radiographs of dog and horse.", "Learn ultrasound-guided procedures."]
});
planned("surg", ["Surgery of the head, neck and thorax", "Abdominal surgery", "Orthopaedic surgery in detail", "Ophthalmic surgery", "Surgery of the hoof and claw", "Castration and other herd procedures", "Reconstructive surgery", "Critical care and fluid therapy", "Advanced imaging: CT, MRI", "Surgical instruments and their uses"]);

/* ================= VETERINARY MEDICINE ================= */
unit("med", "Unit 1 – Principles of medicine");
topic("med", "Approach to Disease: History, Examination and Diagnosis", {
  i: "A systematic approach finds the cause of illness faster and more reliably than guessing.",
  s: "Listen, look, then examine. Think of what could be wrong, and then test your ideas. Vital signs are the quickest clues.",
  n: [
    ["Case approach", "Signalment, presenting complaint, history, general examination, system examination, problem list, differential diagnosis, tests, diagnosis, treatment plan as decided by the veterinarian, and follow-up. Write what you find in a notebook as you go."],
    ["Clinical examination methods", "Inspection (look), palpation (feel), percussion (tap), auscultation (listen), and mensuration (measure). Special methods in ruminants include listening to the rumen, pinch and grunt tests where taught by supervisors, and rectal examination in large animals."],
    ["Vital signs (typical ranges, from your textbook)", "Temperature, pulse and respiration vary by species, age and conditions. Typical adult ranges: cattle temperature about 38 to 39.5 degrees C, pulse about 60 to 80 per minute; horse temperature about 37.5 to 38.5, pulse about 28 to 40; dog temperature about 38 to 39, pulse about 70 to 120 depending on size; sheep and goat temperature about 39 to 40, pulse about 70 to 90. Always check ranges in your textbook, and compare with the animal's own normal."],
    ["Mucous membranes and hydration", "Pale: anaemia or shock. Yellow: jaundice. Congested or red: toxaemia or fever. Cyanotic (blue): poor oxygenation. Capillary refill time normally under about 2 seconds. Skin tent test and eye position (sunken eyes) assess dehydration."],
    ["Laboratory support", "Haematology, biochemistry, urinalysis, faecal examination, microbiology, serology, PCR, cytology, imaging and necropsy. Collect samples properly and in the correct tube or container. Mislabelled or wrongly collected samples give wrong answers."],
    ["Differential diagnosis", "Make a list of possible diseases that fit the signs, rank by likelihood and seriousness, and test them one by one. Avoid anchoring on the first idea."]
  ],
  tb: { h: ["Sign", "Possible meaning"], r: [["Pale mucosae", "Anaemia, blood loss, shock"], ["Icterus", "Liver disease, haemolysis"], ["Cyanosis", "Poor oxygenation"], ["Prolonged CRT", "Poor perfusion, shock"], ["Skin tent slow", "Dehydration"]] },
  k: ["Steps of clinical approach.", "Methods of examination.", "Interpretation of mucous membrane colour.", "Vital signs."],
  m: ["Normal values depend on the species, age and conditions. Use ranges, not single numbers."],
  sa: [["List the methods of clinical examination.", "Inspection, palpation, percussion, auscultation and mensuration."], ["What does pale mucous membrane indicate?", "Anaemia, blood loss or poor circulation."]],
  la: [["Describe the clinical examination of a sick cow.", "Signalment, history, general examination, vital signs, systems, problem list, tests."]],
  q: [["Auscultation means", ["Listening", "Tapping", "Feeling", "Looking"], 0, "Listening to body sounds."],
    ["Yellow mucous membranes suggest", ["Icterus", "Anaemia", "Cyanosis", "Normal"], 0, "Jaundice."],
    ["Capillary refill time is normally under", ["About 2 seconds", "10 seconds", "30 seconds", "1 minute"], 0, "About 2 seconds."]],
  f: [["Signalment", "Species, breed, age, sex of the animal"], ["Differential diagnosis", "List of diseases that could explain the signs"]],
  d: ["Practise TPR on animals under supervision.", "Study clinical examination of each system."]
});

unit("med", "Unit 2 – Diseases by system");
topic("med", "Digestive Diseases of Ruminants and Others: Concepts", {
  i: "Digestive disorders are among the commonest problems in cattle, buffaloes, sheep and goats.",
  s: "Rumen problems follow wrong feeding. Think about what the animal ate, when, and how the rumen microbes respond. Treatment belongs to the veterinarian.",
  n: [
    ["Rumen disorders", "- Indigestion: reduced rumen movement and appetite, often after sudden diet change.\n- Acute rumen acidosis (grain overload): rapid carbohydrate fermentation, lactic acid builds up, rumen pH falls, animals become dull, may have diarrhoea and can die.\n- Bloat: accumulation of gas. Free-gas bloat results from failure of eructation. Frothy bloat is linked to legume pastures.\n- Traumatic reticuloperitonitis (hardware disease): foreign body penetrating the reticulum.\n- Rumen impaction.\n- Vagal indigestion."],
    ["Abomasal and intestinal disorders", "Displaced abomasum, abomasal ulcers, intussusception, torsion, enteritis, and diarrhoea in calves. Calf scours have infectious causes (E. coli, rotavirus, coronavirus, cryptosporidia, coccidia) and management factors. Dehydration and electrolyte loss are the main threats to life in scouring calves."],
    ["Metabolic diseases of dairy cows", "Milk fever (hypocalcaemia around calving), ketosis (energy deficit in early lactation), fatty liver, hypomagnesaemic tetany. Prevention relies on management of the dry and transition periods. Treatment is by a veterinarian."],
    ["Monogastric digestive disease", "Colic in horses (many causes), gastric dilatation and volvulus in dogs, canine parvovirus enteritis, gastroenteritis, constipation. Poultry have coccidiosis, necrotic enteritis and others."],
    ["Approach", "Look at the feed history, rumen motility and pH, faeces, hydration status and other animals in the group. Rumen fluid examination is a useful test. Prevention through good feeding is always cheaper than cure."]
  ],
  tb: { h: ["Disease", "Cause (idea)", "Key clue"], r: [["Grain overload", "Sudden excess of grain", "Rumen acidosis, dull animal"], ["Frothy bloat", "Legume pasture, stable foam", "Left flank distension"], ["Hardware disease", "Metallic foreign body", "Pain, reduced rumen motility"], ["Milk fever", "Low blood calcium at calving", "Recumbent cow"], ["Ketosis", "Negative energy balance", "Ketone smell, low milk"]] },
  k: ["Rumen acidosis.", "Bloat types.", "Hardware disease.", "Metabolic diseases.", "Calf scours causes."],
  m: ["Not every swollen left flank is simple bloat. Look at the cause and the animal."],
  sa: [["Differentiate frothy and free-gas bloat.", "Frothy bloat has gas trapped in a stable foam that cannot be belched. In free gas bloat gas collects as a free cap above the contents because eructation is blocked."], ["What is milk fever?", "Hypocalcaemia around calving in dairy cows, leading to weakness and recumbency."]],
  la: [["Describe acute rumen acidosis: causes, pathogenesis and prevention.", "Cause, rumen changes, lactic acid, systemic effects, signs, prevention by gradual diet change."]],
  q: [["Hardware disease affects the", ["Reticulum", "Omasum", "Rumen only", "Abomasum only"], 0, "The reticulum."],
    ["Milk fever is associated with low", ["Calcium", "Sodium", "Iron", "Copper"], 0, "Calcium."],
    ["Frothy bloat is linked with", ["Legume pasture", "Dry straw", "Salt", "Water"], 0, "Legumes."]],
  f: [["Eructation", "Belching of gas from the rumen"], ["Ketosis", "Disease from energy shortage and raised ketone bodies"]],
  d: ["Study diarrhoea in calves in detail.", "Learn equine colic categories."]
});

topic("med", "Respiratory, Cardiovascular and Other System Diseases: Overview", {
  i: "A guide to common disease patterns in the other body systems, for building your clinical thinking.",
  s: "For each system, learn the main signs and the common causes. A cough, a limp or a staggering gait each has its own list of possible diseases.",
  n: [
    ["Respiratory", "Signs: nasal discharge, cough, abnormal breathing, abnormal lung sounds. Examples: bovine respiratory disease complex (shipping fever), haemorrhagic septicaemia, pneumonia in calves, enzootic pneumonia in pigs, infectious bronchitis and CRD in poultry, canine kennel cough, equine strangles and recurrent airway obstruction. Predisposing factors: poor ventilation, stress, dust and transport."],
    ["Cardiovascular", "Heart failure (congestive), valve disease, cardiomyopathy, pericarditis, congenital defects. Signs: exercise intolerance, oedema, cough in dogs, distended jugular veins, murmurs. Traumatic pericarditis may follow hardware disease in cattle."],
    ["Urinary", "Nephritis, urolithiasis, cystitis, kidney failure in dogs and cats. Signs: changes in urine volume, straining, blood in urine, dehydration, poor appetite."],
    ["Nervous", "Signs: tremor, staggering, circling, convulsions, paralysis, blindness. Examples: rabies, tetanus, listeriosis (circling), polioencephalomalacia, hypomagnesaemic tetany, botulism, milk fever (recumbency), Newcastle disease in poultry. Any suspect rabies case needs great care, as the disease is zoonotic and fatal."],
    ["Skin", "Dermatophytosis (ringworm), mange, lumpy skin disease, pox, photosensitisation, allergic dermatitis, tick infestations, wounds."],
    ["Blood and infectious diseases", "Anaemia (haemonchosis, babesiosis, nutritional), haemorrhagic diseases, FMD, PPR, HS, black quarter, anthrax, brucellosis, TB. Notifiable and zoonotic diseases require reporting."],
    ["Deficiency diseases", "Mineral and vitamin deficiencies, as in the nutrition and biochemistry modules, appear regularly in field medicine."],
    ["Method", "For every disease use the same set of headings: definition, etiology, epidemiology, pathogenesis, signs, lesions, diagnosis, differentials, treatment (by a veterinarian), control. Filling in this grid for each disease is a very effective way to learn."]
  ],
  tb: { h: ["Sign", "Think of"], r: [["Circling", "Listeriosis, brain disease"], ["Sudden death with bleeding", "Anthrax"], ["Vesicles on mouth and feet", "FMD"], ["Nodules on skin", "Lumpy skin disease"], ["Bottle jaw", "Hypoproteinaemia, haemonchosis"], ["Hydrophobia, aggression", "Rabies"]] },
  k: ["Disease learning grid.", "Notifiable and zoonotic diseases.", "BRD complex.", "Signs of heart failure."],
  m: ["Never examine a suspected rabies animal bare-handed."],
  sa: [["Name two causes of anaemia in sheep and goats.", "Haemonchosis and nutritional deficiencies like iron, copper and cobalt."], ["Which disease gives circling in ruminants?", "Listeriosis, among others."]],
  la: [["Describe the clinical approach to a case of respiratory disease in cattle.", "History, signs, examination, differentials, tests, prevention, risk factors."]],
  q: [["Vesicles on the mouth and feet suggest", ["FMD", "Anthrax", "Milk fever", "Bloat"], 0, "FMD."],
    ["Strangles occurs in", ["Horses", "Cattle", "Pigs", "Poultry"], 0, "Equines."],
    ["Dermatophytosis is", ["Ringworm", "Mange", "Pox", "Tick"], 0, "Fungal ringworm."]],
  f: [["BRD", "Bovine respiratory disease complex"], ["Notifiable disease", "Disease that must be reported to authorities"]],
  d: ["Create your own table for 20 diseases.", "Study the Indian notifiable disease list."]
});
planned("med", ["Diseases of poultry (full systematic treatment)", "Diseases of pigs", "Diseases of horses", "Diseases of dogs and cats", "Diseases of sheep and goats", "Metabolic and deficiency diseases in depth", "Toxicological emergencies", "Skin diseases", "Neurological disorders", "Clinical pathology interpretation", "Therapeutic concepts and fluid balance", "Preventive medicine and vaccination schedules"]);
/* ================= EXTENSION ================= */
unit("ext", "Unit 1 – Extension basics");
topic("ext", "Extension Education: Concepts, Principles and Methods", {
  i: "Extension education takes useful knowledge from research and veterinary science to farmers and helps them use it.",
  s: "A vet who knows a lot but can't get farmers to act on it has little impact. Extension is about communicating well, building trust and helping people decide for themselves.",
  n: [
    ["Meaning and objectives", "Extension education is an informal, out-of-school educational process for rural people to improve their knowledge, skills and attitudes. It helps farmers solve problems, improve production and income, and uses the principle of learning by doing."],
    ["Principles", "Start with the needs and interests of the people, involve them, use local resources and leaders, use demonstration, keep messages simple and practical, work in groups, evaluate and adapt, and respect local culture. Farmers adopt a practice when it is useful, affordable, compatible and easy to try."],
    ["Communication", "Elements: sender, message, channel, receiver, feedback. Barriers: language, noise, mistrust, wrong channel, message too complex. Effective communication uses simple language, local examples, visuals and repetition."],
    ["Extension methods", "- Individual: farm and home visits, office calls, telephone.\n- Group: meetings, method demonstrations, result demonstrations, farmer training, exposure visits, field days, discussions.\n- Mass: radio, television, newspapers, posters, leaflets, exhibitions, campaigns, mobile phones and social media.\nCombining methods works best. Method demonstration shows how to do something. Result demonstration shows the outcome of a practice over time."],
    ["Adoption process", "Awareness, interest, evaluation, trial, adoption. Adopter categories: innovators, early adopters, early majority, late majority and laggards. Early adopters are often opinion leaders. Reasons for slow adoption include cost, risk, lack of knowledge, poor access to services and social pressure."],
    ["Programme planning and evaluation", "Programmes are based on a situation analysis, with objectives, activities, resources and evaluation. Monitoring tracks progress. Evaluation measures results and impact. Participatory approaches make programmes more sustainable."]
  ],
  tb: { h: ["Method type", "Examples", "Strength"], r: [["Individual", "Farm visit", "Personal, detailed"], ["Group", "Demonstration, training", "Shared learning, cost-effective"], ["Mass", "Radio, TV, posters", "Wide reach"]] },
  k: ["Meaning and principles.", "Communication elements.", "Methods of extension.", "Adoption process.", "Adopter categories."],
  m: ["Extension is not just giving lectures to farmers. It is two-way learning."],
  sa: [["Differentiate method demonstration and result demonstration.", "A method demonstration shows how to carry out a practice. A result demonstration shows the result of a practice over a period compared with the old practice."], ["List the stages of the adoption process.", "Awareness, interest, evaluation, trial, adoption."]],
  la: [["Describe the extension teaching methods with their merits and limits.", "Individual, group, mass, examples, selection criteria, combining methods."]],
  q: [["Radio is a", ["Mass method", "Individual method", "Group method only", "Demonstration"], 0, "Mass media."],
    ["The first stage in the adoption process is", ["Awareness", "Trial", "Adoption", "Evaluation"], 0, "Awareness."],
    ["Opinion leaders are often", ["Early adopters", "Laggards", "Non-members", "Officials only"], 0, "Respected early adopters."]],
  f: [["Result demonstration", "Demonstration showing the outcome of a practice over time"], ["Feedback", "Receiver's response to a message"]],
  d: ["Study extension systems in India: KVK, ATMA.", "Learn the role of self-help groups."]
});

topic("ext", "Livestock Extension in India: Programmes, Institutions and Farmer Organisation", {
  i: "India has many institutions and schemes that support livestock farmers. A vet should know who does what.",
  s: "Veterinary hospitals and dispensaries, universities, Krishi Vigyan Kendras, dairy cooperatives and government departments all reach farmers. Knowing them helps you refer farmers correctly.",
  n: [
    ["Institutions", "Department of Animal Husbandry and Veterinary services at state level, veterinary universities and colleges, ICAR institutes, Krishi Vigyan Kendras (KVKs) which give training and demonstration, ATMA (Agricultural Technology Management Agency) at district level, NDDB and the milk cooperative network (Amul model), NABARD for rural credit, and NGOs. Check each scheme's current status and rules in official sources, since they change."],
    ["Dairy cooperatives", "The Anand pattern is a three-tier structure: village cooperative societies, district unions, and state federations. It ensures milk collection, fair price, technical inputs and veterinary care to members. Women's participation and village-level institutions are important."],
    ["Self-help groups and farmer producer organisations", "Self-help groups (SHGs), mostly women, give savings, credit and collective action. Farmer producer organisations (FPOs) help farmers get inputs and market their produce together."],
    ["Veterinary extension role", "Health camps, vaccination campaigns, deworming drives, infertility camps, training on clean milk production and feeding, animal fairs and exhibitions, mass awareness on zoonoses like rabies and brucellosis, and farmer field schools. Para-veterinarians and village-level workers extend reach."],
    ["Communication media and ICT", "Mobile messages, apps, videos, local radio and community groups share advice quickly. Verify information and use trusted sources, as wrong advice spreads fast too."],
    ["Evaluating a veterinary camp (example)", "Define aim, plan, inform the community, organise resources, run the camp, record data, follow up, and evaluate coverage and outcomes."]
  ],
  tb: { h: ["Institution", "Role"], r: [["KVK", "Training, demonstration, technology assessment"], ["ATMA", "District-level extension coordination"], ["Dairy cooperative union", "Milk procurement, services to members"], ["SHG", "Savings, credit, joint action"]] },
  k: ["Anand pattern.", "KVK role.", "SHGs.", "Types of camps.", "ICT in extension."],
  m: ["Government schemes change over time. Always check current details."],
  sa: [["What is the Anand pattern?", "A three-tier dairy cooperative structure of village societies, district unions and a state federation."], ["Give two functions of a KVK.", "Training of farmers and on-farm testing and demonstration of technologies."]],
  la: [["Describe the dairy cooperative structure in India and its significance.", "Three-tier, functions, services, benefits, limitations."]],
  q: [["The Anand pattern is a", ["Cooperative structure", "Breed", "Drug", "Disease"], 0, "A dairy cooperative model."],
    ["KVK stands for", ["Krishi Vigyan Kendra", "Kisan Vikas Kosh", "Krishi Vikas Kendra", "None"], 0, "Krishi Vigyan Kendra."],
    ["SHGs are mostly", ["Savings and credit groups", "Hospitals", "Banks", "Colleges"], 0, "Savings and credit groups."]],
  f: [["FPO", "Farmer producer organisation"], ["Para-veterinarian", "Trained field worker who assists veterinarians"]],
  d: ["Read about the White Revolution.", "Study the current livestock schemes on official sites."]
});
planned("ext", ["Adult education and learning principles", "Rural sociology", "Leadership in extension", "Social change and diffusion in depth", "Evaluation research in extension", "Entrepreneurship in animal husbandry", "Gender and livestock", "ICT tools for veterinary extension"]);

/* ================= CLINICAL PRACTICE ================= */
unit("clin", "Unit 1 – Clinical skills");
topic("clin", "Clinical Examination Skills and Case Records", {
  i: "A vet's first skill is looking carefully and recording accurately. Good records protect the animal, the owner and you.",
  s: "Approach the animal calmly. Observe from a distance, then examine up close. Write what you find, in the same order each time.",
  n: [
    ["Approach and restraint", "Observe the animal at rest and moving from a safe distance. Approach calmly and talk. Use safe restraint with help. Know the species' warning signs: kicking, butting, biting. Protect yourself with suitable clothing and footwear. Never put yourself behind a horse or in front of a bull in an unsafe situation."],
    ["General examination", "Attitude and behaviour, body condition score (BCS), posture and gait, skin and coat, hydration, mucous membranes, superficial lymph nodes, temperature, pulse and respiration, appetite, water intake, faeces and urine. Then the systems: digestive, respiratory, circulatory, nervous, urogenital, locomotor, skin and udder."],
    ["Body condition scoring", "BCS uses visual and palpable fat cover over ribs, hips and tail head. Systems differ by species (for example a 1 to 5 scale in dairy cows and a 1 to 9 scale in dogs). Changes in BCS across lactation are a management tool."],
    ["Case records", "Records should be clear, dated, complete and truthful. They include signalment, history, findings, diagnosis, treatment decisions by the veterinarian, outcomes and owner communication. Avoid abbreviations nobody understands. Records are also legal documents. Keep them confidential."],
    ["Common clinical samples", "Blood (jugular, cephalic, coccygeal veins as appropriate), faeces, urine, skin scrapings, swabs, milk (aseptically), aspirates, biopsy samples. Label each sample with ID, date, species and test. Choose the correct preservative. Handle as potentially infectious."],
    ["Clinical ethics and communication", "Respect the animal's welfare and the owner's concerns. Explain simply, give realistic information, never promise cure, obtain consent, and refer when needed. Be honest about cost and prognosis."]
  ],
  tb: { h: ["Examination part", "What to record"], r: [["Attitude", "Alert, dull, depressed"], ["BCS", "Score and scale used"], ["Hydration", "Skin tent, eye position"], ["Mucous membranes", "Colour, CRT"], ["TPR", "Values with units and time"], ["Lymph nodes", "Size, pain, consistency"]] },
  k: ["Steps of general examination.", "BCS.", "Record-keeping qualities.", "Sample collection and labelling."],
  m: ["A record is not a memory aid only. It is a professional and legal document."],
  sa: [["What does BCS stand for and why is it useful?", "Body condition score. It estimates fat reserves and nutritional state, useful for management and breeding."], ["List the components of a case record.", "Signalment, history, examination findings, diagnosis, treatment plan, outcome and follow-up."]],
  la: [["Describe the general clinical examination of an animal.", "Observation, handling, vital signs, mucosae, lymph nodes, skin, systems, recording."]],
  q: [["Palpation is", ["Feeling", "Listening", "Tapping", "Counting"], 0, "Palpation is feeling with the hands."],
    ["A case record should be", ["Dated and complete", "Secret from the owner always", "Verbal only", "Optional"], 0, "Dated and complete."],
    ["Superficial lymph nodes are checked by", ["Palpation", "Culture", "Radiography only", "Ignoring"], 0, "Palpation."]],
  f: [["Signalment", "Basic description of the animal"], ["BCS", "Body condition score"]],
  d: ["Practise systematic examination on a calm animal under supervision.", "Study clinical record formats."]
});

topic("clin", "Clinical Procedures, Biosafety and Professional Ethics: Concepts", {
  i: "Clinical practice also means doing things safely, humanely and legally. This topic covers the concepts, not step-by-step procedures.",
  s: "Learn the idea behind common procedures. Always practise under a trained supervisor before doing them on your own.",
  n: [
    ["Common procedures (concept only)", "Blood collection, injections by the right route, catheterisation, drenching, stomach tube passage in ruminants, rumen fluid collection, urine collection, wound dressing, bandaging, castration and dehorning, and hoof trimming. Each has risks. A trained supervisor teaches the technique, site, equipment and aftercare."],
    ["Injection safety", "Use clean or sterile equipment, correct needle size, correct site and route, good restraint, and safe disposal of sharps. Never recap needles unsafely. Know withdrawal periods for treated animals and keep treatment records."],
    ["Biosafety for clinicians", "Zoonotic risks from rabies, brucellosis, leptospirosis, anthrax, Q fever, ringworm and others. Wear gloves, masks, coats and boots. Disinfect between animals and clean equipment. Treat wounds from bites or scratches immediately and seek medical advice. Pre-exposure rabies vaccination is generally advised for veterinary students and practitioners, to be arranged with a doctor."],
    ["Professional ethics", "Duties to animals (welfare, relief of pain), owners (honesty, confidentiality, informed consent), colleagues and society (public health, responsible antimicrobial use). Respect the limits of your competence. Report notifiable diseases. Euthanasia must be humane and done by a trained veterinarian under legal rules."],
    ["Legislation to know (check current texts)", "The Veterinary Council of India Act regulates the profession and registration. The Prevention of Cruelty to Animals Act, 1960 protects animal welfare. Laws on drugs, food safety, wildlife and notifiable disease apply. Details and amendments change, so read the current official text rather than relying on summaries."],
    ["Lifelong learning", "Read, ask, reflect and join professional bodies. Keep a log of what you learn from each case. Look after your own physical and mental health, as clinical work is demanding."]
  ],
  tb: { h: ["Duty to", "Examples"], r: [["Animals", "Welfare, pain relief, humane care"], ["Owners", "Honesty, confidentiality, consent"], ["Society", "Public health, residues, AMR"], ["Profession", "Competence, records, learning"]] },
  k: ["Biosafety measures.", "Ethical duties.", "Why records and consent matter.", "Relevant legislation."],
  m: ["Being confident is not the same as being competent. Know your limits."],
  sa: [["Why should needles not be recapped carelessly?", "To avoid needle-stick injuries and possible infection."], ["Name two duties of a veterinarian.", "Safeguard animal welfare and protect public health, for example."]],
  la: [["Discuss professional ethics in veterinary practice.", "Duties to animals, clients, colleagues, society, confidentiality, consent, euthanasia, responsible drug use, legal obligations."]],
  q: [["Informed consent is obtained from the", ["Owner", "Neighbour", "Student only", "Nobody"], 0, "The owner."],
    ["Rabies pre-exposure vaccination is generally advised for", ["Veterinary workers", "Nobody", "Only dogs", "Only teachers"], 0, "Those at risk of exposure."],
    ["Euthanasia should be", ["Humane", "Quick but painful", "Done by anyone", "Avoided at all times"], 0, "Humane and by a trained person."]],
  f: [["Informed consent", "Permission given after being told the risks and options"], ["AMR", "Antimicrobial resistance"]],
  d: ["Read the Veterinary Council of India code of conduct.", "Study the Prevention of Cruelty to Animals Act."]
});
planned("clin", ["Clinical examination of each species in detail", "Clinical laboratory interpretation", "Emergency and critical care concepts", "Dental and oral examination", "Ambulatory (field) practice", "Zoo and wildlife handling", "Practice management and economics", "Medical records and certification"]);

/* ================= FARM PRACTICES ================= */
unit("farm", "Unit 1 – On the farm");
topic("farm", "Livestock Farm Routines, Records and Biosecurity", {
  i: "Hands-on farm practices turn theory into daily routine. A well-run farm has clear schedules, clean systems and good records.",
  s: "Every farm runs on routine: feeding, watering, cleaning, milking or egg collection, observation and records. Small habits, done daily, prevent most big problems.",
  n: [
    ["Daily routine", "Observe every animal at feeding time for appetite, behaviour and signs of illness. Provide clean feed and water. Clean sheds and remove dung. Milk on time, collect eggs frequently, check equipment. Observe heat in breeding females. Separate sick animals early and report."],
    ["Common identification and handling", "Identification by ear tags, tattoos, microchips, neck chains and branding (now often replaced by tagging). Handling includes catching, restraint, casting, haltering and moving animals. Use calm methods, avoid shouting and hitting, and use safe handling facilities such as a crush."],
    ["Routine management practices", "Dehorning or disbudding in young calves, castration, tail docking in lambs, hoof trimming, shearing, deworming, vaccination, vitamin and mineral supplementation, and parasite control. Use proper methods with pain relief, at the correct age, by trained people."],
    ["Records", "Important records: animal register (ID, breed, birth), breeding and calving, milk production, health and treatment (with withdrawal dates), vaccination and deworming, feed and fodder, weights, mortality, and financial records. Records show trends, guide decisions and are required for schemes and audits."],
    ["Biosecurity on the farm", "Control of movement of people, animals and vehicles. Quarantine for new animals for a suitable period (check with the vet), footbaths or foot dips, protective clothing for visitors, rodent and wild bird control, safe disposal of carcasses and manure, clean feed and water, cleaning and disinfection routines, and isolation of sick animals. Report unusual illness or deaths promptly."],
    ["Waste management", "Dung and urine can be turned into compost or biogas. Proper storage prevents water pollution and fly breeding. Dead animals must be disposed of safely by burial with lime or incineration as per rules, to avoid spreading disease."],
    ["Worker safety and welfare", "Training, protective gear, first aid, safe handling and awareness of zoonoses. Provide enough space, shelter, feed, water and freedom from pain, fear and distress, following the five freedoms of animal welfare."]
  ],
  tb: { h: ["Record", "Why it matters"], r: [["Breeding and calving", "Fertility analysis, timing of services"], ["Health and treatment", "Withdrawal periods, disease patterns"], ["Milk yield", "Selection and feeding decisions"], ["Mortality", "Loss analysis and prevention"], ["Finance", "Profit and planning"]] },
  k: ["Daily farm routine.", "Records to be maintained.", "Biosecurity measures.", "Five freedoms.", "Carcass disposal."],
  m: ["Records that are not used are wasted effort. Review them regularly."],
  sa: [["List the five freedoms of animal welfare.", "Freedom from hunger and thirst, discomfort, pain injury or disease, fear and distress, and freedom to express normal behaviour."], ["Why quarantine new animals?", "To observe them for disease before mixing with the herd and prevent introduction of infection."]],
  la: [["Describe the records to be maintained on a dairy farm and their uses.", "List of records, content, uses in decisions, formats, review."]],
  q: [["A purpose of quarantine is to", ["Prevent disease introduction", "Increase milk", "Reduce feed", "Train animals"], 0, "To prevent introducing disease."],
    ["Safe carcass disposal includes", ["Burial with lime or incineration", "Leaving in the open", "Dumping in water", "Feeding to dogs"], 0, "Burial with lime or incineration."],
    ["Withdrawal dates are recorded in", ["Treatment records", "Feed records only", "Nothing", "Milk only"], 0, "Health and treatment records."]],
  f: [["Footbath", "Disinfectant bath for footwear or hooves at entry points"], ["Five freedoms", "Standard framework for animal welfare"]],
  d: ["Prepare a farm record set for a small herd.", "Study biogas plant design."]
});

topic("farm", "Practical Skills: Farm Equipment, Fodder and Seasonal Planning", {
  i: "Knowing how to use basic farm tools and plan through the year makes a farm run smoothly.",
  s: "Farm work follows the seasons. Plan fodder, breeding, vaccination and housing before the season arrives, not after the problem appears.",
  n: [
    ["Equipment and facilities", "Feed troughs, water troughs, milking machines or hand milking equipment, chaff cutters, cooling tanks, incubators and brooders in poultry, weighing scales, cattle crush, dip tanks, silage pits, manure storage, and cold chain boxes for vaccines. Each needs cleaning and maintenance. A chaff cutter is dangerous if used carelessly."],
    ["Fodder planning", "Match fodder area to herd size and seasons. Plan green fodder through the year with crop sequence (for example berseem in winter, maize or sorghum in summer or monsoon), keep a reserve as hay or silage for lean periods, and conserve crop residues. Water supply for fodder is part of the plan."],
    ["Seasonal calendar (concept)", "- Summer: heat stress, water supply, shade, reduce stress, prevent heat-related problems, mind fodder shortage.\n- Monsoon: parasites, mastitis, foot problems, tick and fly increase, vector-borne diseases, wet litter in poultry, haemorrhagic septicaemia and black quarter risk in some areas, aflatoxin in stored feed.\n- Winter: cold stress in young stock, pneumonia in calves, abundant green fodder in some regions.\nVaccinations such as FMD, HS and BQ are often scheduled before the high-risk season. Follow the schedule given by your local veterinary department."],
    ["Economics", "Cost items: feed (largest), labour, health, housing, interest, depreciation. Income: milk, eggs, meat, manure, animals sold. A simple calculation of cost of production per litre or per kg helps find savings. Cost reduction should not cut essential feeding or health care."],
    ["Entrepreneurship", "A veterinarian can support farmers by planning small units, access to credit and insurance, marketing, and value addition. Livestock insurance and government schemes can reduce risk. Start small, keep records and grow as skills and markets develop."],
    ["Case study exercise", "Plan a 10-cow dairy unit: shed size, fodder area, concentrate needs, breeding plan, health calendar, expected income and costs. Discuss your plan with your teacher, and compare with an experienced farmer's practice."]
  ],
  tb: { h: ["Season", "Main risks (general)"], r: [["Summer", "Heat stress, water shortage"], ["Monsoon", "Parasites, mastitis, mould in feed"], ["Winter", "Cold stress in young, pneumonia"]] },
  k: ["Fodder calendar.", "Seasonal disease risks.", "Cost of production.", "Equipment safety."],
  m: ["Cutting feed to save money often costs more in lost production."],
  sa: [["Why plan fodder for lean periods?", "To avoid shortage that reduces production and health, using hay, silage and crop residues."], ["Name the largest cost on most livestock farms.", "Feed."]],
  la: [["Plan the management calendar for a dairy farm through the year.", "Seasonal tasks, vaccination timing, fodder plan, breeding, housing, health and economics."]],
  q: [["The largest cost in dairy farming is usually", ["Feed", "Land tax", "Medicine", "Electricity"], 0, "Feed."],
    ["Monsoon is a season of increased", ["Parasites and mastitis risk", "Frost", "Snow", "Drought only"], 0, "Warm wet conditions favour them."],
    ["A cold chain box is used for", ["Vaccines", "Hay", "Sacks", "Tools"], 0, "Vaccines."]],
  f: [["Cost of production", "Total cost divided by output, e.g. per litre of milk"], ["Chaff cutter", "Machine that chops fodder"]],
  d: ["Prepare a fodder calendar for your region.", "Visit a nearby farm and record its routine."]
});
planned("farm", ["Hatchery operations", "Dairy farm design and layout", "Milking machine operation", "Artificial insemination practice", "Sheep and goat farm practices", "Piggery practices", "Farm machinery and mechanisation", "Integrated farming systems practice", "Farm accounting"]);
/* ================= SECOND WAVE: helpers ================= */
/* extra(id, {...}) adds more fields (o, df, tm, st, ex, dia) to an existing topic */
function extra(id, o) { if (T[id]) Object.assign(T[id], o); }

/* ================= ANATOMY (wave 2) ================= */
unit("anat", "Unit 4 – Head, limbs, glands and birds");
topic("anat", "Skull, Teeth and Age Estimation", {
  o: ["Name the main bones of the skull and the paranasal sinuses", "Write the dental formulae of the common species", "Describe the parts of a tooth and compare brachydont and hypsodont teeth", "Explain why the age of an animal can be judged from its teeth"],
  i: "The head carries the brain, the sense organs and the first part of the digestive and respiratory tracts. Teeth are part of the head that every clinician uses every day, because they tell us about age, feeding and health.",
  s: "The skull has two parts: the cranium, which holds the brain, and the face, which holds the nose, mouth and eyes. Teeth are fixed in the jaws. A cow has no upper front teeth, a horse has teeth that keep growing and wear down, and a dog has sharp teeth for tearing meat. Counting and checking the teeth is the traditional way to estimate age.",
  n: [
    ["Bones of the skull", "The cranial bones are the occipital, sphenoid, temporal, parietal, frontal and ethmoid. The facial bones are the nasal, incisive (premaxilla), maxilla, zygomatic, lacrimal, palatine, vomer and the mandible (lower jaw). The mandible is the only skull bone that moves, at the temporomandibular joint. The foramen magnum at the back lets the spinal cord leave the skull. In cattle, sheep and goats the horn core grows out of the frontal bone, so the horn is hollow inside and joined to the frontal sinus."],
    ["Paranasal sinuses", "These are air-filled spaces in the skull bones lined by mucous membrane, which open into the nasal cavity. The main ones are the frontal, maxillary, sphenoid and palatine sinuses. They lighten the skull and warm the air. Because the cornual diverticulum of the frontal sinus runs inside the horn, dehorning an adult can open the sinus, and sinusitis can follow. In horses, infection of the maxillary sinus can come from a diseased upper cheek tooth root."],
    ["Skull shapes in dogs", "Dolichocephalic dogs have long narrow heads (greyhound). Mesaticephalic dogs have medium heads (labrador). Brachycephalic dogs have short broad heads (pug, bulldog). Brachycephalic breeds often have breathing problems because the soft tissues of the airway are crowded into a short skull."],
    ["Parts of a tooth", "A tooth has a crown (above the gum), a neck and a root (in the socket). Enamel, the hardest tissue of the body, covers the crown. Dentine forms the bulk of the tooth. Cement covers the root and attaches it to the periodontal ligament. The pulp cavity inside holds vessels and nerves. Brachydont teeth have a low crown and a closed root, and stop growing (dog, cat, pig, human). Hypsodont teeth have a very tall crown, and erupt continuously as the surface wears (horse, cattle, sheep). Hypsodont teeth have infoldings of enamel that make a rough grinding surface."],
    ["Types of teeth and dental formulae", "Incisors (I) cut, canines (C) tear, premolars (P) and molars (M) grind. The formula shows one side of the upper jaw over one side of the lower jaw. Permanent teeth: Dog I 3/3, C 1/1, P 4/4, M 2/3 = 42. Cat I 3/3, C 1/1, P 3/2, M 1/1 = 30. Pig I 3/3, C 1/1, P 4/4, M 3/3 = 44. Horse I 3/3, C 1/1, P 3/3, M 3/3 = 40 (canines are small or absent in mares, and some horses have small wolf teeth before the first premolars). Ox, sheep and goat I 0/4, C 0/0, P 3/3, M 3/3 = 32, where the lower canine looks like a fourth incisor, and a dental pad replaces the upper incisors."],
    ["Deciduous and permanent teeth", "Young animals have deciduous (milk) teeth that are replaced by permanent teeth. Deciduous teeth have no molars. Molars come only as permanent teeth. Eruption times are the basis of age estimation."],
    ["Age estimation (teaching approximations)", "In cattle the permanent incisors replace the milk incisors in pairs, from about the middle of the second year to about the fourth year, so people speak of the two-tooth, four-tooth, six-tooth and eight-tooth stages. In horses, eruption, wear of the table surface, shape changes and Galvayne's groove on the upper corner incisor are used. These timings vary with breed, feeding and management. Take exact ages from your textbook, and remember that age estimation is approximate."]
  ],
  tb: { h: ["Species", "Dental formula (permanent)", "Total", "Crown type"], r: [["Dog", "I 3/3 C 1/1 P 4/4 M 2/3", "42", "Brachydont"], ["Cat", "I 3/3 C 1/1 P 3/2 M 1/1", "30", "Brachydont"], ["Pig", "I 3/3 C 1/1 P 4/4 M 3/3", "44", "Brachydont"], ["Horse", "I 3/3 C 1/1 P 3/3 M 3/3", "40", "Hypsodont"], ["Ox, sheep, goat", "I 0/4 C 0/0 P 3/3 M 3/3", "32", "Hypsodont cheek teeth"]] },
  df: ["Brachydont tooth: a low-crowned tooth that stops growing once formed.", "Hypsodont tooth: a high-crowned tooth that continues to erupt as the crown wears.", "Dental formula: a short way of writing the number of each type of tooth in half of the upper and lower jaw."],
  tm: [["Mandible", "Lower jaw bone, the only movable bone of the skull"], ["Foramen magnum", "Large opening at the back of the skull for the spinal cord"], ["Enamel", "Hardest tissue, covers the crown"], ["Cement", "Bone-like tissue covering the root"], ["Wolf tooth", "Small first premolar seen in some horses"], ["Dental pad", "Thick gum pad replacing upper incisors in ruminants"]],
  st: ["Open the mouth gently and safely, with proper restraint.", "Identify the tooth types in the jaw.", "Count the incisors present and note which are permanent.", "Compare with the eruption chart in your textbook.", "Record the result as an approximate age range, not a single number."],
  ex: ["Chronic nasal discharge in a horse can come from an infected upper cheek tooth that drains into the maxillary sinus.", "Sharp enamel points on the cheek teeth of horses cause pain while chewing and weight loss, so horses need regular dental checks.", "A brachycephalic dog that snores and tires easily shows the effect of skull shape on the airway."],
  k: ["Bones of the cranium and face.", "Paranasal sinuses and clinical importance.", "Dental formulae of dog, cat, pig, horse, ox.", "Brachydont vs hypsodont.", "Parts of a tooth.", "Age estimation by teeth."],
  m: ["Age by teeth is an estimate, not a certificate. Feeding and breed shift the timing.", "Horns of cattle are not solid. They contain the frontal sinus extension."],
  sa: [["Define a hypsodont tooth with an example.", "A tall-crowned tooth that keeps erupting as the crown wears, for example the cheek teeth of the horse and ox."], ["Why is the frontal sinus important in dehorning?", "Because the sinus extends into the horn core, so removal of the horn in adults can open the sinus and invite infection."]],
  la: [["Describe the structure of a tooth and the dental formulae of domestic animals.", "Draw a longitudinal section with enamel, dentine, cement, pulp and root. Define brachydont and hypsodont. Give formulae for dog, cat, pig, horse and ox with totals. Add deciduous and permanent teeth and age estimation."]],
  q: [["Which skull bone is movable?", ["Frontal", "Mandible", "Maxilla", "Occipital"], 1, "The mandible moves at the temporomandibular joint."],
    ["The ox has no", ["Upper incisors", "Lower incisors", "Molars", "Premolars"], 0, "A dental pad replaces them."],
    ["The hardest tissue of the body is", ["Dentine", "Cement", "Enamel", "Bone"], 2, "Enamel."],
    ["The total number of permanent teeth in the dog is", ["30", "32", "40", "42"], 3, "42."],
    ["Brachycephalic dogs often have", ["Airway problems", "Long skulls", "Extra teeth", "No sinuses"], 0, "Short skull, crowded airway."]],
  f: [["Dental formula of the dog", "I 3/3 C 1/1 P 4/4 M 2/3 = 42"], ["Brachydont", "Low-crowned tooth that stops growing"], ["Cornual diverticulum", "Extension of the frontal sinus into the horn core"], ["Foramen magnum", "Opening for the spinal cord at the skull base"]],
  d: ["Learn the foramina of the skull and which nerves pass through them.", "Study dental disease in dogs and horses.", "Read about the temporomandibular joint."]
});

topic("anat", "Limb Bones and Comparative Limb Anatomy", {
  o: ["Name the bones of the fore and hind limbs", "Compare the limbs of horse, ox, pig and dog", "Use the correct limb terms such as carpus, tarsus, stifle and fetlock", "Explain how limbs are attached to the trunk"],
  i: "The limbs of domestic animals show how one basic plan is changed for speed, weight bearing or digging. Lameness is one of the commonest clinical problems, so limb anatomy is used every day in practice.",
  s: "All four-legged mammals share the same bones in the legs, but the number of toes and the length of the bones changes. A horse stands on one toe, a cow on two, a dog on four or five. The forelimb is joined to the body by muscle only, while the hind limb joins the body by a true joint, which is why the hind limb gives the push and the forelimb takes the weight.",
  n: [
    ["Forelimb bones", "The forelimb has the scapula (shoulder blade), humerus, radius and ulna (forearm), the carpal bones, the metacarpal bones and the phalanges. In ungulates the clavicle is absent, and the limb is joined to the trunk only by muscles (a synsarcosis), which acts as a shock absorber. The carpus is the joint that is called the knee in the horse. The radius carries most of the weight in ungulates, and the ulna is reduced and partly fused with the radius in ox and horse."],
    ["Hind limb bones", "The pelvic girdle is made of the ilium, ischium and pubis, which meet in the acetabulum. The pelvic girdle joins the vertebral column at the sacroiliac joint, so the hind limb gives propulsion. Next are the femur, patella (in the quadriceps tendon), tibia and fibula, the tarsal bones (the largest being the calcaneus, the point of the hock), the metatarsal bones and the phalanges. The knee joint of the hind limb is called the stifle."],
    ["Digits", "The horse has one functional digit (III) with the others reduced to splint bones (II and IV), so splints are a clinical term. Ruminants have two functional digits (III and IV) and two small dewclaws. The pig has four digits, two large and two small. The dog has five digits on the forelimb, where the first is the dewclaw, and four on the hind limb. The cat has retractile claws."],
    ["Parts of the distal limb", "Proximal to distal in the horse: cannon bone (third metacarpal or metatarsal), fetlock joint, long pastern (first phalanx), short pastern (second phalanx) and coffin bone (third phalanx, inside the hoof). Sesamoid bones sit at the back of the fetlock, and the distal sesamoid is the navicular bone. Navicular disease and pedal bone problems cause lameness."],
    ["Locomotion and weight", "Forelimbs carry about 60 percent of the horse's weight. Long bones in distal limbs work like levers, and muscles are held close to the body so that the distal limb is light, with long tendons. Cursorial animals (horse, greyhound) have long, slim limbs for speed, while heavy draught breeds and cattle have a sturdier build."],
    ["Clinical links", "Fractures, joint injuries, laminitis and hoof problems are common causes of lameness in dairy cattle and horses. A good understanding of the limb bones helps in reading radiographs and describing injuries."]
  ],
  tb: { h: ["Species", "Functional digits (forelimb)", "Notes"], r: [["Horse", "1 (III)", "Splint bones II and IV"], ["Ox, sheep, goat", "2 (III and IV)", "Dewclaws present"], ["Pig", "4 (2 large, 2 small)", "Small digits touch the ground in soft soil"], ["Dog", "5", "First digit is the dewclaw"], ["Cat", "5", "Retractile claws"]] },
  df: ["Carpus: the joint complex between the forearm and the metacarpus, the horse's knee.", "Tarsus: the hock, the joint complex between the leg and the metatarsus.", "Synsarcosis: attachment of the forelimb to the trunk by muscle only."],
  tm: [["Stifle", "Knee joint of the hind limb"], ["Hock", "The tarsal joint"], ["Fetlock", "Metacarpophalangeal or metatarsophalangeal joint"], ["Pastern", "Region of the first and second phalanges"], ["Coffin bone", "Third phalanx inside the hoof"], ["Acetabulum", "Socket of the hip joint"]],
  st: ["Start at the trunk and name the girdle bone.", "Move distally: arm, forearm, carpus (or leg, tarsus).", "Name the metapodial bones and digits.", "Mark the joints between each segment.", "Compare the pattern with another species."],
  ex: ["The hock of a cow is injured easily on hard floors, and swelling there is common in loose housing.", "A splint in a horse is a bony swelling on the second or fourth metacarpal bone.", "Hip dysplasia in dogs is poor fit of the femoral head in the acetabulum."],
  k: ["Bones of the fore and hind limbs.", "Digit number in species.", "Joint names: carpus, tarsus, stifle, fetlock.", "Attachment of the limbs to the trunk."],
  m: ["The horse's knee is the carpus, not the stifle.", "The hock is not a knee. It is the tarsus."],
  sa: [["What is the stifle?", "The knee joint of the hind limb, between the femur and tibia, with the patella in front."], ["How many functional digits does the ox have?", "Two, digits III and IV."]],
  la: [["Describe the bones of the forelimb of the horse and compare with the ox.", "List scapula, humerus, radius and ulna, carpus, metacarpus, phalanges and sesamoids. Compare digit numbers, ulna reduction and use of a sketch."]],
  q: [["The point of the hock is formed by the", ["Calcaneus", "Patella", "Talus", "Fibula"], 0, "The calcaneus."],
    ["Pigs have how many digits on each foot?", ["1", "2", "4", "5"], 2, "Four, two of them larger."],
    ["The knee of a horse's forelimb is the", ["Stifle", "Carpus", "Hock", "Fetlock"], 1, "The carpus."],
    ["The hind limb attaches to the vertebral column through the", ["Sacroiliac joint", "Shoulder joint", "Atlantoaxial joint", "Stifle"], 0, "Sacroiliac joint."]],
  f: [["Synsarcosis", "Attachment of forelimb by muscles only"], ["Navicular bone", "Distal sesamoid bone in the horse"], ["Hock", "Tarsal joint of the hind limb"], ["Splint bone", "Reduced metacarpal II or IV in the horse"]],
  d: ["Study the muscles of the limb in the dog.", "Learn the stay apparatus of the horse.", "Compare hooves and claws."]
});

topic("anat", "Mammary Gland of the Cow and Udder Anatomy", {
  o: ["Describe the structure of the bovine udder and teat", "Explain the supporting ligaments, blood supply and lymph drainage", "Compare the mammary glands of other species", "Link udder anatomy to mastitis and milking"],
  i: "The udder is the production unit of a dairy farm. Its structure explains how milk is made, held and removed, and why mastitis is so common.",
  s: "The cow's udder is divided into four quarters, each with its own teat and milk system. They do not share milk, so one quarter can get sick while the others stay healthy. A thick blood supply feeds the udder, because the cow needs several hundred litres of blood to make one litre of milk.",
  n: [
    ["External features", "The udder has four quarters, front and rear, separated by a median groove, and a teat on each quarter. The hind quarters yield more milk, roughly 60 percent of the total. A well-attached, balanced, not pendulous udder is selected for in breeding because it is less prone to injury and mastitis."],
    ["Internal structure", "Milk is made in alveoli, tiny sacs lined by secretory epithelium and surrounded by myoepithelial cells. Alveoli form lobules, and ducts join to form larger ducts that open into the gland cistern (sinus) above the teat. The teat cistern lies in the teat, and below it is the streak (teat) canal, closed by a sphincter muscle, with Fürstenberg's rosette at the top of the teat canal. The teat canal is the main defence against bacteria entering the udder."],
    ["Support", "The udder is held by the median suspensory ligament, which is elastic and divides it into right and left halves, and by the lateral suspensory laminae, with the skin, fascia and tendon-like parts. When the suspensory apparatus weakens with age and heavy yields, the udder hangs low and the teats become more exposed."],
    ["Blood and lymph", "The main blood supply is the external pudendal artery, which becomes the mammary artery, and venous drainage forms a circle at the base of the udder, with the milk veins on the abdominal wall. About 400 to 500 litres of blood pass through the udder to make one litre of milk. The supramammary lymph nodes at the back of the udder drain it and are felt during examination. Swelling of these nodes suggests infection."],
    ["Nerve supply and let-down", "Sensory nerves in the teat send a signal to the hypothalamus when the teat is stimulated or the calf suckles. Oxytocin is released from the posterior pituitary, reaches the udder through blood and makes the myoepithelial cells squeeze the alveoli, pushing milk down (milk let-down). Fear and pain release adrenaline, which blocks let-down, so calm handling matters."],
    ["Other species", "Mare: two glands with two teats. Ewe and doe: two glands. Sow: usually 12 to 14 glands in two rows. Bitch: usually 8 to 10. Buffalo: four quarters, but the teat canal is tight, and let-down depends on the calf's presence in many animals, so careful stimulation is needed. Each pair of glands in sows has an independent system."],
    ["Mastitis link", "Mastitis is inflammation of the mammary gland, usually caused by bacteria entering through the teat canal. Wide or damaged teat canals, wet and dirty conditions, poor milking hygiene and low immunity add to the risk. Knowing that each quarter works separately helps in understanding why one quarter may be affected."]
  ],
  tb: { h: ["Species", "Number of glands", "Note"], r: [["Cow, buffalo", "4", "Four separate quarters"], ["Mare", "2", "Each with two openings per teat"], ["Ewe, doe", "2", "One teat canal each"], ["Sow", "12 to 14", "Two rows"], ["Bitch", "8 to 10", "Two rows"]] },
  df: ["Alveolus: the milk-secreting sac of the mammary gland.", "Milk let-down: the oxytocin-driven release of milk from the alveoli into the ducts and cistern.", "Streak canal: the narrow canal at the tip of the teat through which milk leaves."],
  tm: [["Gland cistern", "Space above the teat where milk collects"], ["Myoepithelial cell", "Contractile cell around alveoli"], ["Supramammary lymph node", "Node that drains the udder"], ["Rosette of Fürstenberg", "Fold at the junction of teat cistern and canal"]],
  st: ["The calf suckles or the teat is washed and stimulated.", "Nerve signal reaches the hypothalamus.", "Oxytocin is released into the blood.", "Myoepithelial cells contract.", "Milk moves into the cistern and can be removed."],
  ex: ["A cow that is frightened during milking may hold up her milk because adrenaline blocks oxytocin action.", "A hard, swollen quarter with a clear difference from the others suggests mastitis in that quarter alone.", "A pendulous udder is easily injured by a stone or a hock."],
  k: ["Structure of the bovine udder and teat.", "Suspensory apparatus.", "Blood supply and milk to blood ratio.", "Let-down reflex.", "Species differences."],
  m: ["The four quarters do not share milk. A quarter can be infected separately."],
  sa: [["What is the main defence of the teat against infection?", "The streak canal with its sphincter muscle, and keratin lining."], ["Name the artery supplying the udder.", "The external pudendal artery, which continues as the mammary artery."]],
  la: [["Describe the anatomy of the mammary gland of the cow with a labelled sketch.", "Four quarters, parenchyma and alveoli, ducts, gland and teat cisterns, teat canal, suspensory ligaments, blood and lymph supply, nerves, let-down reflex."]],
  q: [["The hormone that causes milk let-down is", ["Prolactin", "Oxytocin", "Insulin", "Cortisol"], 1, "Oxytocin."],
    ["The cow has how many mammary quarters?", ["2", "4", "6", "8"], 1, "Four."],
    ["Which lymph nodes drain the udder?", ["Prescapular", "Supramammary", "Popliteal", "Mandibular"], 1, "Supramammary nodes."],
    ["Fear can prevent let-down because it releases", ["Adrenaline", "Insulin", "Thyroxine", "Calcitonin"], 0, "Adrenaline blocks oxytocin action."]],
  f: [["Alveolus", "Milk-secreting sac"], ["Streak canal", "Narrow outlet of the teat"], ["Median suspensory ligament", "Elastic ligament dividing the udder into halves"], ["Blood to milk ratio", "About 400 to 500 litres of blood per litre of milk"]],
  d: ["Study the histology of the lactating udder.", "Learn the mammary gland of the sow and bitch.", "Read about teat and udder scoring."]
});

topic("anat", "Avian Anatomy: What Is Different in Birds", {
  o: ["Describe the skeleton of the fowl and its adaptations", "Trace the digestive tract of the fowl", "Describe the respiratory system with air sacs", "Describe the reproductive tracts and the bursa of Fabricius"],
  i: "Poultry is the biggest livestock sector in India, and birds are built very differently from mammals. A vet who treats poultry must know these differences.",
  s: "Birds have light, air-filled bones, no teeth, a crop and gizzard instead of teeth for grinding, air sacs that pass air through the lungs, and one opening, the cloaca, for faeces, urine and eggs. Only the left ovary works in the hen.",
  n: [
    ["Skeleton", "Many bones are pneumatic, connected with air sacs. The sternum has a keel (carina) for the flight muscles. Many vertebrae are fused into the synsacrum with the pelvis, and the last few tail vertebrae form the pygostyle. Birds have a beak, no teeth and a lightweight skull. Medullary bone in the laying hen is a calcium store for shell formation."],
    ["Digestive tract", "Beak, oral cavity, oesophagus, crop (a storage pouch), proventriculus (the glandular stomach), gizzard or ventriculus (muscular stomach with grit), small intestine (duodenal loop with the pancreas, jejunum, ileum), two caeca, short large intestine and cloaca. The gizzard grinds feed with the help of grit. Feed passes through quickly. The two caeca ferment some fibre."],
    ["Respiratory system", "Birds have relatively small, rigid lungs that do not expand much. Air passes through the lungs one way, from the rear to the front, using nine air sacs that act as bellows. This one-way flow gives very efficient oxygen uptake. The syrinx at the base of the trachea produces sound. Birds have no diaphragm. Air sacs also reach into bones, so respiratory infection can spread widely."],
    ["Urinary system", "The kidneys have three lobes on each side. The ureters open into the cloaca. There is no urinary bladder. The main nitrogenous waste is uric acid, which is the white part of droppings. The urine mixes with the faeces in the cloaca."],
    ["Female reproductive tract", "Only the left ovary and left oviduct are functional in the hen. The oviduct has the infundibulum (receives the ovum and where fertilisation occurs), magnum (makes the albumen), isthmus (shell membranes), shell gland or uterus (shell and pigment) and vagina. An egg takes roughly 24 to 26 hours to form. The hen lays a clutch of eggs on successive days."],
    ["Male reproductive tract", "Two testes lie inside the body, near the kidneys, and sperm travel through the ductus deferens to the cloaca. The cock has no true penis (a small copulatory organ exists), and mating transfers semen by cloacal contact. Ducks and geese have a true phallus."],
    ["Immune organs", "The bursa of Fabricius is a lymphoid organ on the roof of the cloaca in young birds, essential for B-cell development, and it shrinks after sexual maturity. Infectious bursal disease virus attacks the bursa and weakens immunity. The thymus, spleen and caecal tonsils also contribute."]
  ],
  tb: { h: ["Feature", "Mammal", "Bird"], r: [["Teeth", "Present", "Absent, beak and gizzard"], ["Diaphragm", "Present", "Absent"], ["Lungs", "Expand, tidal flow", "Rigid, one-way flow with air sacs"], ["Urinary bladder", "Present", "Absent"], ["Main nitrogenous waste", "Urea", "Uric acid"], ["Ovary", "Two", "Left only functional"]] },
  df: ["Cloaca: the common chamber for the digestive, urinary and reproductive tracts of birds.", "Gizzard: the muscular stomach of birds that grinds feed.", "Bursa of Fabricius: lymphoid organ above the cloaca where B cells mature."],
  tm: [["Proventriculus", "Glandular stomach of birds"], ["Pygostyle", "Fused tail vertebrae"], ["Syrinx", "Voice organ at the base of the trachea"], ["Medullary bone", "Calcium reserve in laying hens"], ["Infundibulum", "Funnel that catches the ovum, site of fertilisation"]],
  st: ["The ovum is released from the ovary into the infundibulum.", "It passes to the magnum, where albumen is added.", "It passes to the isthmus for shell membranes.", "The shell gland adds the shell and pigment.", "The egg is laid through the vagina and cloaca."],
  ex: ["Gumboro disease damages the bursa, leaving chicks open to other infections.", "Birds fed without grit may digest poorly because the gizzard cannot grind well.", "Laying hens on calcium-poor feed can have thin shells and weak bones."],
  k: ["Skeleton of the fowl.", "Digestive tract with crop and gizzard.", "Air sacs and one-way flow.", "Female tract and egg formation.", "Bursa of Fabricius."],
  m: ["Birds have no urinary bladder, and the white part of the dropping is uric acid, not faeces."],
  sa: [["Name the parts of the oviduct in the hen.", "Infundibulum, magnum, isthmus, shell gland (uterus) and vagina."], ["What is the function of the bursa of Fabricius?", "It is the site of B-cell maturation, so it is needed for antibody production."]],
  la: [["Describe the digestive system of the fowl and compare with a mammal.", "Beak to cloaca with crop, proventriculus, gizzard, intestines, caeca, accessory organs, differences from mammals, with a sketch."]],
  q: [["Fertilisation in the hen takes place in the", ["Infundibulum", "Shell gland", "Isthmus", "Cloaca"], 0, "At the infundibulum."],
    ["Birds excrete nitrogen mainly as", ["Urea", "Uric acid", "Ammonia", "Creatinine"], 1, "Uric acid."],
    ["The grinding stomach of the bird is the", ["Crop", "Proventriculus", "Gizzard", "Caecum"], 2, "The gizzard or ventriculus."],
    ["How many ovaries function in the hen?", ["Two", "One", "None", "Three"], 1, "Only the left."]],
  f: [["Cloaca", "Common exit for gut, urinary and genital tracts in birds"], ["Gizzard", "Muscular stomach with grit"], ["Bursa of Fabricius", "Lymphoid organ for B cell development"], ["Magnum", "Part of the oviduct that makes albumen"]],
  d: ["Study the anatomy of ducks and pigeons.", "Learn the immune system of the bird.", "Compare egg formation timing with hatchery data."]
});
planned("anat", ["Eye and ear", "Endocrine glands", "Lymphatic system and spleen", "Surface anatomy for clinical examination", "Embryology and fetal membranes", "Histology of the major organs", "Hoof and claw anatomy in detail", "Anatomy of the nervous system in detail", "Comparative anatomy of the digestive system in the horse and pig", "Applied anatomy for nerve blocks"]);

/* ================= PHYSIOLOGY (wave 2) ================= */
unit("phys", "Unit 4 – Nerve, reproduction and balance");
topic("phys", "Nerve and Muscle Physiology", {
  o: ["Explain the resting membrane potential and the action potential", "Describe synaptic transmission and the neuromuscular junction", "Explain the sliding filament theory of muscle contraction", "Compare the sympathetic and parasympathetic systems"],
  i: "Nerves carry signals and muscles produce movement. Many poisonings and diseases in animals, such as tetanus, botulism and organophosphate poisoning, act at one step of this chain.",
  s: "A nerve cell keeps a small electrical charge across its membrane. When it is stimulated, the charge flips for a moment and a wave runs down the nerve. At the end of the nerve a chemical messenger crosses a tiny gap to the next cell. In a muscle, this makes calcium ions flood in and the muscle filaments slide over each other and shorten the muscle.",
  n: [
    ["Resting membrane potential", "At rest the inside of a neuron is negative compared with the outside, about minus 70 millivolts. This is due to the Na+/K+ ATPase pump (three sodium out, two potassium in) and the membrane being more permeable to potassium than sodium."],
    ["Action potential", "A stimulus that reaches the threshold opens voltage-gated sodium channels. Sodium rushes in (depolarisation). Then the sodium channels close, potassium channels open and potassium leaves (repolarisation), sometimes with a brief overshoot (hyperpolarisation). An action potential follows the all-or-none law. During the refractory period the nerve cannot fire again at once, so signals go one way. Myelinated fibres conduct faster by saltatory conduction, jumping from node of Ranvier to node."],
    ["Synapse and neurotransmitters", "At a chemical synapse, the arrival of an action potential opens calcium channels, and vesicles release neurotransmitter into the cleft. It binds receptors on the next cell. Acetylcholine is the transmitter at the neuromuscular junction and at parasympathetic endings. Noradrenaline is the main sympathetic transmitter. The signal ends when the transmitter is broken down (acetylcholinesterase) or taken back up."],
    ["Muscle contraction", "A motor neuron's action potential causes acetylcholine release at the motor end plate. The muscle fibre action potential releases calcium from the sarcoplasmic reticulum. Calcium binds troponin, moving tropomyosin and exposing the binding sites on actin. Myosin heads attach, pull and release in cycles using ATP, and the thin filaments slide over the thick ones, shortening the sarcomere. When calcium is pumped back, the muscle relaxes. Without ATP, myosin cannot detach, as in rigor mortis."],
    ["Reflex arc", "A reflex needs a receptor, a sensory (afferent) neuron, an integration centre in the spinal cord or brain, a motor (efferent) neuron and an effector. The patellar reflex is a simple stretch reflex. Reflexes are used in neurological examination of animals."],
    ["Autonomic nervous system", "The sympathetic division prepares the body for fight or flight: it raises heart rate and blood pressure and dilates the pupils. The parasympathetic division is for rest and digestion: it slows the heart and increases gut movement. Most organs get both, and the balance decides their activity."],
    ["Where diseases and poisons act", "Tetanus toxin blocks inhibitory signals in the spinal cord, giving spastic paralysis. Botulinum toxin blocks acetylcholine release, giving flaccid paralysis. Organophosphates inhibit acetylcholinesterase, so acetylcholine builds up. Low blood calcium (milk fever) weakens muscle and nerve function. Low magnesium raises nerve excitability (grass tetany)."]
  ],
  tb: { h: ["Feature", "Sympathetic", "Parasympathetic"], r: [["Overall effect", "Fight or flight", "Rest and digest"], ["Main transmitter at the organ", "Noradrenaline", "Acetylcholine"], ["Heart rate", "Increases", "Decreases"], ["Gut movement", "Decreases", "Increases"], ["Pupil", "Dilates", "Constricts"]] },
  df: ["Action potential: a brief, all-or-none reversal of membrane potential that travels along a nerve or muscle fibre.", "Synapse: the junction where a neuron passes a signal to another cell.", "Motor unit: one motor neuron with all the muscle fibres it supplies."],
  tm: [["Depolarisation", "Membrane potential becomes less negative"], ["Repolarisation", "Return of the membrane potential towards rest"], ["Node of Ranvier", "Gap in the myelin where the signal is regenerated"], ["Troponin", "Calcium-binding regulatory protein on actin"], ["Sarcoplasmic reticulum", "Calcium store of muscle"]],
  st: ["The nerve impulse reaches the nerve ending.", "Acetylcholine is released and crosses the synapse.", "The muscle fibre membrane depolarises.", "Calcium is released from the sarcoplasmic reticulum.", "Actin and myosin slide and the muscle shortens.", "Calcium is pumped back and the muscle relaxes."],
  ex: ["A calf with tetanus shows stiff limbs because inhibitory control of motor neurons is lost.", "A cow with milk fever lies down because low calcium weakens neuromuscular function.", "An animal poisoned with organophosphate shows salivation and tremors because acetylcholine acts without stopping."],
  k: ["Resting potential and Na+/K+ pump.", "Action potential steps.", "Synaptic transmission.", "Sliding filament theory.", "Sympathetic vs parasympathetic."],
  m: ["The action potential does not get weaker as it travels. It is regenerated all along the fibre."],
  sa: [["State the all-or-none law.", "A stimulus above threshold produces a full-sized action potential, and a stimulus below threshold produces none."], ["Which ion triggers muscle contraction?", "Calcium ions, released from the sarcoplasmic reticulum."]],
  la: [["Describe the mechanism of skeletal muscle contraction.", "Neuromuscular junction, end plate potential, calcium release, troponin and tropomyosin, cross-bridge cycle with ATP, relaxation, rigor mortis."]],
  q: [["The resting membrane potential of a neuron is about", ["+70 mV", "0 mV", "-70 mV", "-7 mV"], 2, "Around minus 70 millivolts."],
    ["Calcium binds to which protein to start contraction?", ["Myosin", "Troponin", "Collagen", "Actin"], 1, "Troponin."],
    ["Botulinum toxin blocks", ["Acetylcholine release", "Acetylcholinesterase", "Sodium channels in the heart", "Noradrenaline"], 0, "It blocks release at the motor end plate."],
    ["Saltatory conduction occurs in", ["Myelinated fibres", "Smooth muscle", "Capillaries", "Unmyelinated fibres only"], 0, "In myelinated nerves."]],
  f: [["Neurotransmitter at the neuromuscular junction", "Acetylcholine"], ["Refractory period", "Time during which a nerve cannot fire again"], ["Sliding filament theory", "Actin slides over myosin to shorten the sarcomere"], ["Sympathetic division", "Fight or flight system"]],
  d: ["Study smooth muscle contraction.", "Learn the neurological examination of the dog.", "Read about the synapse in more detail."]
});

topic("phys", "Reproductive Physiology and Lactation", {
  o: ["Describe spermatogenesis and its hormonal control", "Explain how milk is synthesised and ejected", "Describe the lactation curve and factors affecting it", "Describe egg formation in the hen"],
  i: "Production in livestock depends on reproduction and lactation. Knowing the physiology explains why management of heat, feed and milking changes yield.",
  s: "In the male, the testes make sperm under the control of hormones from the pituitary. In the female, after calving the udder makes milk using nutrients from blood, and oxytocin from the brain squeezes it out. The hen makes an egg in about a day.",
  n: [
    ["Male reproduction", "The hypothalamus releases GnRH, the anterior pituitary releases FSH and LH. LH acts on Leydig cells, which make testosterone. FSH and testosterone act on the Sertoli cells in the seminiferous tubules, which support spermatogenesis. Spermatogenesis takes about two months in the bull. Sperm mature in the epididymis. The testes lie in the scrotum because sperm need a temperature a few degrees below body temperature, so heat stress lowers semen quality. Inhibin from the Sertoli cells controls FSH."],
    ["Mammary development and lactogenesis", "Mammogenesis (growth of the udder) is stimulated by oestrogen and progesterone during pregnancy. At the end of pregnancy, progesterone falls and prolactin rises, which starts lactogenesis (milk synthesis). Colostrum is made first. Growth hormone supports maintenance of lactation (galactopoiesis), and so do thyroid hormones and cortisol."],
    ["Milk synthesis", "The udder takes up precursors from blood. Lactose is made from glucose, and lactose draws water in, so it determines milk volume. In ruminants, milk fat uses acetate and beta-hydroxybutyrate for short-chain fatty acids and blood lipids for the rest. Milk protein, casein and whey proteins, is made from amino acids. Calcium moves into milk in large amounts, which is why cows are at risk of milk fever around calving."],
    ["Milk let-down", "Stimulation of the teat sends a signal to the hypothalamus, which releases oxytocin from the posterior pituitary. Oxytocin makes the myoepithelial cells contract, pushing milk into the cistern. The effect lasts a few minutes, so milking should be done quickly after stimulation. Adrenaline blocks this effect in fear."],
    ["Lactation curve", "Milk yield rises after calving to a peak at about 4 to 8 weeks in cows, then declines gradually. Persistency is the rate of decline. Good feeding, health, milking routine and comfort support the peak and persistency. A dry period of about 6 to 8 weeks lets the gland renew itself."],
    ["Egg formation in the hen", "The ovary releases the ovum (yolk) into the infundibulum. The egg spends roughly 15 minutes in the infundibulum, about 3 hours in the magnum (albumen), about 1 to 1.5 hours in the isthmus (shell membranes) and about 20 hours in the shell gland (shell). The total is roughly a day. Daylight length controls laying through the hypothalamus and pituitary, and that is why layers get supplementary light."],
    ["Effect of environment", "Heat stress lowers fertility in both sexes and milk yield. Nutrition affects the age at puberty. Photoperiod controls breeding season in sheep (short days), horses (long days) and poultry (long days)."]
  ],
  tb: { h: ["Hormone", "Source", "Role in reproduction or lactation"], r: [["GnRH", "Hypothalamus", "Releases FSH and LH"], ["FSH", "Anterior pituitary", "Spermatogenesis, follicle growth"], ["LH", "Anterior pituitary", "Testosterone, ovulation"], ["Prolactin", "Anterior pituitary", "Starts milk synthesis"], ["Oxytocin", "Posterior pituitary", "Milk let-down, uterine contraction"], ["Progesterone", "Corpus luteum, placenta", "Maintains pregnancy, blocks lactation until birth"]] },
  df: ["Spermatogenesis: the process of sperm formation in the seminiferous tubules.", "Lactogenesis: the start of milk synthesis.", "Galactopoiesis: maintenance of established lactation."],
  tm: [["Sertoli cell", "Supports developing sperm in the testis"], ["Leydig cell", "Makes testosterone"], ["Persistency", "How well milk yield is maintained after the peak"], ["Colostrum", "First milk after calving, rich in antibodies"]],
  st: ["Pregnancy hormones grow the udder.", "Progesterone falls near birth and prolactin rises.", "Colostrum and then milk are secreted.", "Suckling or milking stimulates oxytocin release.", "Milk is ejected and removed, and synthesis continues."],
  ex: ["Bulls in a hot, humid climate may have poor semen quality after heat stress.", "A cow that peaks late or declines quickly may have a feeding or health problem.", "Adding light in poultry houses helps maintain egg production in winter."],
  k: ["Hormonal control of spermatogenesis.", "Lactogenesis and let-down.", "Lactation curve.", "Egg formation times.", "Photoperiod."],
  m: ["Milk is not made at the moment of milking only. It builds up between milkings."],
  sa: [["What causes milk let-down?", "Oxytocin from the posterior pituitary, making myoepithelial cells contract."], ["Why are testes outside the body?", "Sperm production requires a temperature lower than core body temperature."]],
  la: [["Describe the physiology of lactation in the cow.", "Mammogenesis, lactogenesis, galactopoiesis, precursors of milk components, let-down reflex, lactation curve and factors affecting yield."]],
  q: [["Which hormone starts milk synthesis?", ["Prolactin", "Oxytocin", "Insulin", "ADH"], 0, "Prolactin."],
    ["Lactose in milk is made from", ["Glucose", "Acetate", "Cholesterol", "Casein"], 0, "Glucose, in the mammary gland."],
    ["Which cell type makes testosterone?", ["Sertoli cell", "Leydig cell", "Spermatid", "Epididymal cell"], 1, "The Leydig cell."],
    ["The egg spends the longest time in the", ["Infundibulum", "Magnum", "Shell gland", "Vagina"], 2, "About 20 hours in the shell gland."]],
  f: [["Lactogenesis", "Beginning of milk synthesis"], ["Persistency", "Ability to maintain milk yield after the peak"], ["Inhibin", "Hormone from the Sertoli cell that suppresses FSH"], ["Photoperiod", "Length of daylight that influences breeding"]],
  d: ["Study the oestrous cycle with hormone graphs.", "Learn the physiology of pregnancy and parturition.", "Read about milk composition changes in lactation."]
});

topic("phys", "Acid-Base Balance and Electrolytes", {
  o: ["Define pH and explain how the body controls it", "Name the four primary acid-base disorders with common causes in animals", "Explain the roles of the main electrolytes", "Understand compensation by the lungs and kidneys"],
  i: "Cells work only in a narrow pH range. Many common diseases of animals, such as diarrhoea, rumen acidosis and ketosis, upset pH and electrolytes.",
  s: "Blood must stay slightly alkaline, around pH 7.4. Buffers soak up acids at once, the lungs blow off carbon dioxide within minutes, and the kidneys remove acid slowly but powerfully. When one of these fails, the animal becomes acidotic or alkalotic.",
  n: [
    ["Three lines of defence", "Chemical buffers, mainly the bicarbonate system, work immediately. The respiratory system changes the breathing rate, so changes in CO2 follow in minutes. The kidneys excrete hydrogen ions and regenerate bicarbonate over hours to days. The key equation is CO2 + H2O <-> H2CO3 <-> H+ + HCO3-."],
    ["Four primary disorders", "- Metabolic acidosis: bicarbonate falls. Causes: diarrhoea (loss of bicarbonate, as in calf scours), lactic acidosis (rumen grain overload), ketosis, kidney failure.\n- Metabolic alkalosis: bicarbonate rises. Causes: loss of stomach acid, for example in abomasal displacement or obstruction, and vomiting.\n- Respiratory acidosis: CO2 rises from poor ventilation (airway obstruction, lung disease, deep anaesthesia).\n- Respiratory alkalosis: CO2 falls from overbreathing (heat panting, pain, fear)."],
    ["Compensation", "The body tries to bring pH back. In metabolic acidosis the animal breathes faster and deeper to blow off CO2. In respiratory problems the kidneys adjust bicarbonate over days. Compensation reduces the pH change but does not cure the cause."],
    ["Henderson-Hasselbalch idea", "pH depends on the ratio of bicarbonate (base) to dissolved CO2 (acid). If the ratio falls, pH falls. You do not need to calculate with the equation to know that adding acid or losing base lowers the pH."],
    ["Electrolytes", "- Sodium: main ECF cation, controls water distribution.\n- Potassium: main ICF cation, needed for nerves and the heart. Both low and high levels are dangerous.\n- Chloride: main ECF anion, linked with sodium and acid secretion.\n- Calcium: bone, clotting, nerve and muscle function, milk.\n- Phosphorus and magnesium: energy and enzyme functions, nerve excitability.\nElectrolyte levels in blood are measured and read together with clinical signs and hydration."],
    ["Dehydration", "Water loss with or without electrolyte loss reduces blood volume. Signs include sunken eyes, dry mucous membranes and a slow skin tent. The type of fluid lost, such as diarrhoea losing sodium, potassium and bicarbonate, decides what imbalance is expected. Fluid therapy is chosen and given by a veterinarian."]
  ],
  tb: { h: ["Disorder", "pH", "Primary change", "Typical veterinary cause"], r: [["Metabolic acidosis", "Low", "Low bicarbonate", "Calf diarrhoea, rumen acidosis"], ["Metabolic alkalosis", "High", "High bicarbonate", "Abomasal displacement or obstruction"], ["Respiratory acidosis", "Low", "High CO2", "Airway obstruction, poor ventilation"], ["Respiratory alkalosis", "High", "Low CO2", "Heat panting, pain"]] },
  df: ["Acidosis: a condition in which blood pH is below the normal range.", "Alkalosis: a condition in which blood pH is above the normal range.", "Compensation: the response of the opposite system that moves pH back towards normal."],
  tm: [["Bicarbonate", "The main blood buffer base"], ["Base excess", "A measure of the metabolic component of acid-base status"], ["Anion gap", "Difference between measured cations and anions, used to look for unmeasured acids"], ["Hydrogen ion", "H+, the acidity-carrying ion"]],
  st: ["An acid load or loss of base occurs.", "Buffers absorb part of the change at once.", "Chemoreceptors raise or lower breathing.", "The kidneys adjust hydrogen and bicarbonate handling.", "pH moves back towards normal if the cause is removed."],
  ex: ["A scouring calf with sunken eyes and weakness often has metabolic acidosis from bicarbonate loss.", "A cow with a displaced abomasum can develop metabolic alkalosis with low chloride and potassium.", "A panting dog in heat can blow off too much CO2 and become alkalotic."],
  k: ["Buffer systems.", "Four disorders with causes.", "Compensation by lungs and kidneys.", "Roles of Na, K, Cl, Ca.", "Dehydration signs."],
  m: ["Compensation does not mean the problem is solved."],
  sa: [["What is metabolic acidosis? Give an example cause in cattle.", "A fall in blood pH due to loss of bicarbonate or gain of acid, for example rumen lactic acidosis or calf diarrhoea."], ["Which ion is the main intracellular cation?", "Potassium."]],
  la: [["Describe the regulation of acid-base balance in the body.", "Buffers, respiratory control, renal control, four disorders with causes, compensation, link with electrolytes."]],
  q: [["Calf diarrhoea commonly causes", ["Metabolic acidosis", "Metabolic alkalosis", "Respiratory acidosis", "Respiratory alkalosis"], 0, "Bicarbonate is lost in the faeces."],
    ["The fastest acid-base defence is", ["Kidney", "Chemical buffers", "Liver", "Bone"], 1, "Buffers act instantly."],
    ["Respiratory acidosis is caused by", ["Hyperventilation", "Hypoventilation", "Vomiting", "Diarrhoea"], 1, "Poor ventilation retains CO2."],
    ["Abomasal displacement often leads to", ["Metabolic alkalosis", "Metabolic acidosis", "Normal pH", "Respiratory acidosis"], 0, "Loss of chloride and acid into the abomasum."]],
  f: [["Normal blood pH", "About 7.35 to 7.45"], ["Compensation", "Opposite system tries to restore pH"], ["Main blood buffer", "Bicarbonate system"], ["Respiratory alkalosis", "High pH from too much CO2 loss"]],
  d: ["Practise interpreting simple blood gas results.", "Study fluid therapy concepts.", "Learn the renal handling of hydrogen ions."]
});
planned("phys", ["Special senses", "Avian physiology in depth", "Growth and development", "Environmental physiology and heat stress", "Immunity in outline", "Physiology of exercise in the horse and greyhound", "Endocrine physiology in depth", "Physiology of digestion in the pig and horse", "Physiology of pregnancy and parturition"]);

/* ================= BIOCHEMISTRY (wave 2) ================= */
unit("bioc", "Unit 3 – Molecular and clinical biochemistry");
topic("bioc", "Nucleic Acids and Protein Synthesis", {
  o: ["Describe the structure of DNA and RNA", "Explain replication, transcription and translation", "Use the genetic code and name the types of mutations", "Explain how PCR works in outline"],
  i: "DNA stores the genetic information. RNA copies it and proteins carry out the work. Veterinary diagnosis and breeding now use these molecules directly, for example in PCR tests for disease and in genomic selection.",
  s: "DNA is a long coded message made of four letters, A, T, G and C. Cells copy it when they divide, read parts of it into RNA, and use that RNA to make proteins. A change in the code is a mutation.",
  n: [
    ["Nucleotides and DNA structure", "A nucleotide has a sugar, a phosphate and a nitrogen base. DNA contains deoxyribose and the bases adenine, thymine, guanine and cytosine. The two strands form a double helix, held together by hydrogen bonds between A and T (two bonds) and between G and C (three bonds), and the strands run in opposite directions (antiparallel). RNA contains ribose and uracil instead of thymine, and is usually single stranded."],
    ["Types of RNA", "Messenger RNA (mRNA) carries the code from DNA to the ribosome. Transfer RNA (tRNA) brings amino acids and reads the codon with its anticodon. Ribosomal RNA (rRNA) forms part of the ribosome. Other small RNAs regulate genes."],
    ["Replication", "DNA is copied before cell division. Replication is semi-conservative, so each new molecule has one old and one new strand. Helicase unwinds the helix, primase makes a primer, DNA polymerase adds nucleotides, and ligase joins fragments. Errors are corrected by proofreading and repair systems."],
    ["Transcription", "RNA polymerase reads a gene on the DNA and builds mRNA in the nucleus. In eukaryotes the transcript is processed: introns are removed, a cap and a poly-A tail are added."],
    ["Translation and the genetic code", "On the ribosome, the mRNA is read in groups of three bases called codons. There are 64 codons: 61 code for amino acids and three are stop codons. AUG is the start codon and codes for methionine. The code is degenerate, since several codons can code for the same amino acid. The tRNA brings each amino acid and the ribosome forms peptide bonds."],
    ["Mutations", "A point mutation changes one base. It may be silent (same amino acid), missense (different amino acid) or nonsense (a stop codon). Insertion or deletion of bases that are not in multiples of three causes a frameshift, which usually changes the rest of the protein. Mutations may cause inherited diseases or be harmless, or create useful variation."],
    ["Molecular tools in veterinary work", "PCR (polymerase chain reaction) copies a chosen piece of DNA by repeated cycles of heating (denaturing the strands), cooling (annealing primers) and extension by a heat-stable polymerase. RT-PCR starts with RNA, and so is used for RNA viruses such as the foot and mouth disease virus. DNA tests are used for inherited defects, parentage and breed identification."]
  ],
  tb: { h: ["Feature", "DNA", "RNA"], r: [["Sugar", "Deoxyribose", "Ribose"], ["Bases", "A, T, G, C", "A, U, G, C"], ["Strands", "Double", "Usually single"], ["Main role", "Stores genetic information", "Carries and decodes it"], ["Location", "Nucleus (and mitochondria)", "Nucleus and cytoplasm"]] },
  df: ["Gene: a segment of DNA that carries the code for a protein or functional RNA.", "Codon: three consecutive bases in mRNA that code for one amino acid or a stop signal.", "PCR: a method that amplifies a specific DNA sequence by repeated cycles of heating and cooling."],
  tm: [["Anticodon", "Three-base sequence of tRNA that pairs with the codon"], ["Intron", "Non-coding part removed from the transcript"], ["Exon", "Part of the gene that is expressed"], ["Frameshift", "Insertion or deletion that shifts the reading frame"], ["Primer", "Short DNA piece that starts DNA synthesis"]],
  st: ["DNA is transcribed into pre-mRNA in the nucleus.", "The transcript is processed into mature mRNA.", "mRNA moves to the ribosome.", "tRNAs bring amino acids according to the codons.", "Peptide bonds are formed and the protein chain grows.", "The chain folds into the working protein."],
  ex: ["An RT-PCR test can detect foot and mouth disease virus from a swab.", "A single base change causes some inherited defects in cattle.", "Paternity testing in dogs and horses uses DNA markers."],
  k: ["Structure of DNA and RNA.", "Replication, transcription, translation.", "Genetic code properties.", "Types of mutation.", "Principle of PCR."],
  m: ["The genetic code does not use thymine in mRNA. It uses uracil."],
  sa: [["How many codons are there and how many are stop codons?", "64 codons, of which 3 are stop codons."], ["What is the base pairing in DNA?", "Adenine with thymine and guanine with cytosine."]],
  la: [["Describe the process of protein synthesis.", "Transcription and processing, mRNA, tRNA and ribosome roles, codons and the genetic code, initiation, elongation, termination, with a flow diagram."]],
  q: [["The start codon is", ["AUG", "UAA", "UGA", "GUA"], 0, "AUG codes for methionine."],
    ["Which base is found in RNA but not DNA?", ["Thymine", "Uracil", "Adenine", "Guanine"], 1, "Uracil."],
    ["A frameshift mutation is caused by", ["Substitution of one base for another", "Insertion of one base", "A silent change", "Replacement of codon by synonym"], 1, "Insertion or deletion not in multiples of three."],
    ["PCR for an RNA virus must start with", ["DNA polymerase only", "Reverse transcription", "Culture", "Antibody"], 1, "RT-PCR converts RNA to DNA first."]],
  f: [["Codon", "Three bases in mRNA coding for one amino acid"], ["Semi-conservative replication", "Each new DNA has one old and one new strand"], ["tRNA", "Brings amino acids to the ribosome"], ["Missense mutation", "Base change that alters an amino acid"]],
  d: ["Study gene regulation and the lac operon.", "Learn how mutations cause inherited disease in animals.", "Read about next-generation sequencing."]
});

topic("bioc", "Clinical Biochemistry: Blood Tests, Bilirubin and Liver Function", {
  o: ["Name the common biochemical tests for liver, kidney, muscle and pancreas", "Explain the breakdown of haem to bilirubin", "Distinguish pre-hepatic, hepatic and post-hepatic jaundice", "Explain why species and clinical picture matter when interpreting results"],
  i: "A blood chemistry panel is a routine part of veterinary work. Understanding what each test measures lets you read the results in a sensible way, instead of memorising a list of high and low numbers.",
  s: "When an organ is damaged, enzymes leak out of its cells into the blood, and waste products pile up if the kidney or liver fail. A blood test measures these. The numbers only make sense together with the animal's signs and species.",
  n: [
    ["Liver tests", "ALT and AST are enzymes inside liver cells. They rise when liver cells are damaged. In dogs and cats ALT is fairly liver-specific. In horses and ruminants ALT is low in the liver, so other tests are used, such as sorbitol dehydrogenase (SDH) and glutamate dehydrogenase (GLDH). AST also rises in muscle damage. ALP and GGT rise in bile duct problems. Bilirubin and bile acids show the liver's excretory function. Albumin and clotting tests show its synthetic function."],
    ["Kidney tests", "Urea (blood urea nitrogen) and creatinine rise when kidney filtration falls. Creatinine is a better indicator of kidney function because it is less affected by diet and the state of hydration. Urea can rise with high-protein feeding, dehydration and gastrointestinal bleeding. Phosphorus rises in advanced kidney failure. Urine specific gravity shows the concentrating ability of the kidney."],
    ["Muscle, pancreas and others", "Creatine kinase (CK) rises specifically in muscle damage. AST rises later and stays longer. Amylase and lipase are used for pancreatic problems, though they are not entirely specific. Glucose, total protein, albumin, globulin, calcium, phosphorus, sodium, potassium and chloride are routine."],
    ["Haem breakdown and bilirubin", "Old red cells are broken down by macrophages of spleen, liver and marrow. Haem is converted to biliverdin and then to unconjugated bilirubin, which is fat-soluble and carried in blood bound to albumin. The liver conjugates bilirubin with glucuronic acid to make conjugated bilirubin, which is water-soluble and excreted in bile. In the gut, bacteria convert it into urobilinogen and stercobilin, which colours the faeces."],
    ["Types of jaundice", "Pre-hepatic jaundice comes from excess red cell destruction, so unconjugated bilirubin rises (for example in babesiosis). Hepatic jaundice is due to liver cell damage, and both forms may be raised. Post-hepatic (obstructive) jaundice results from blockage of the bile flow, so conjugated bilirubin rises and the faeces become pale. Yellow mucous membranes and sclera are the clinical sign."],
    ["Protein tests", "Albumin falls in liver disease, protein-losing kidney or gut disease and starvation, and with heavy parasite burdens such as Haemonchus. Globulins rise in chronic infection. A low albumin level reduces oncotic pressure and leads to oedema, such as bottle jaw."],
    ["How to read results", "Compare with the reference range of the species and the laboratory. Look at patterns of several tests rather than one value. Consider the age, diet, hydration, stress and time of sampling. Repeat tests if needed. Samples must be collected and handled correctly, as haemolysis or delay can change results."]
  ],
  tb: { h: ["Organ", "Useful tests", "Note"], r: [["Liver", "ALT, AST, ALP, GGT, bilirubin, bile acids, albumin", "ALT is not liver-specific in horses and ruminants"], ["Kidney", "Urea, creatinine, phosphorus, urine specific gravity", "Creatinine is more reliable"], ["Muscle", "CK, AST", "CK is muscle-specific"], ["Pancreas", "Amylase, lipase", "Not fully specific"], ["Nutrition", "Albumin, total protein, glucose", "Interpret with feeding history"]] },
  df: ["Jaundice (icterus): yellow discolouration of tissues due to raised bilirubin.", "Conjugated bilirubin: bilirubin joined with glucuronic acid in the liver, water soluble.", "Reference range: the range of values found in healthy animals of the species, used for comparison."],
  tm: [["Haemolysis", "Rupture of red blood cells"], ["Azotaemia", "Raised urea and creatinine in blood"], ["Hypoalbuminaemia", "Low blood albumin"], ["Biliverdin", "Green pigment formed in the first step of haem breakdown"], ["Stercobilin", "Pigment that gives faeces their brown colour"]],
  st: ["Red cells reach the end of their life span and are removed.", "Haem is converted to biliverdin and then to bilirubin.", "Bilirubin travels in blood bound to albumin to the liver.", "The liver conjugates it and excretes it into bile.", "Gut bacteria convert it into stercobilin."],
  ex: ["Dogs with babesiosis may be jaundiced because of red cell destruction (pre-hepatic).", "A blocked bile duct from liver fluke can cause obstructive jaundice with pale faeces.", "CK and AST are raised in a horse after severe exertion, showing muscle damage."],
  k: ["Common enzymes and the organ they indicate.", "Haem to bilirubin pathway.", "Three types of jaundice.", "Species differences in enzymes.", "Pre-analytical errors."],
  m: ["One abnormal value does not make a diagnosis. Read the whole picture."],
  sa: [["Which enzyme is specific for muscle damage?", "Creatine kinase (CK)."], ["What is obstructive jaundice?", "Jaundice due to blocked bile flow, with raised conjugated bilirubin and pale faeces."]],
  la: [["Describe the metabolism of bilirubin and the types of jaundice.", "Haem breakdown, transport, conjugation, excretion, urobilinogen and stercobilin, pre-hepatic, hepatic and post-hepatic types with laboratory findings."]],
  q: [["Creatine kinase mainly indicates damage to", ["Liver", "Muscle", "Kidney", "Pancreas"], 1, "It is a muscle enzyme."],
    ["Conjugated bilirubin is", ["Water soluble", "Fat soluble only", "Insoluble", "Bound to haemoglobin"], 0, "Conjugation with glucuronic acid makes it water soluble."],
    ["Which is a more reliable kidney indicator?", ["AST", "Creatinine", "Albumin", "Amylase"], 1, "Creatinine."],
    ["Pale faeces with jaundice suggest", ["Obstruction of bile flow", "Haemolysis only", "Dehydration", "Normal liver"], 0, "Post-hepatic obstruction."]],
  f: [["ALT", "Alanine aminotransferase, a liver enzyme especially in dogs and cats"], ["Azotaemia", "Raised urea and creatinine in blood"], ["Pre-hepatic jaundice", "Jaundice from excess red cell breakdown"], ["Stercobilin", "Bile pigment colouring faeces"]],
  d: ["Study urinalysis in detail.", "Learn the biochemistry of the liver.", "Practise reading a blood chemistry panel with a teacher."]
});
planned("bioc", ["Urea cycle in detail", "Biochemistry of milk", "Biochemistry of muscle contraction", "Hormone biochemistry", "Biochemical techniques: chromatography, electrophoresis, spectrophotometry", "Nitrogen metabolism in ruminants", "Mineral metabolism: calcium and phosphorus"]);

/* ================= PHARMACOLOGY (wave 2) ================= */
unit("pharm", "Unit 2 – Drug groups in depth");
topic("pharm", "Antimicrobial Pharmacology and Resistance (Concepts)", {
  o: ["Classify antimicrobials by mechanism of action", "Explain bactericidal and bacteriostatic action and MIC", "Describe the mechanisms of antimicrobial resistance", "State the principles of responsible antimicrobial use"],
  i: "Antimicrobials are the drugs vets use most. Resistance is one of the biggest threats to human and animal health, so understanding how these drugs work, and how bacteria escape them, is a core professional duty.",
  s: "Antibiotics are chosen because they harm bacteria and not the animal. Some kill bacteria and some only stop them from growing. Bacteria can learn to survive a drug, and every unnecessary use pushes that along. This topic gives the ideas only. No doses are given, and the choice of drug belongs to a veterinarian.",
  n: [
    ["Selective toxicity", "A good antimicrobial acts on a target that bacteria have but animal cells do not, for example the bacterial cell wall. This is why many antibiotics are safe for the host, and why they do not work on viruses."],
    ["Mechanisms of action", "- Cell wall synthesis: beta-lactams (penicillins, cephalosporins), bactericidal.\n- Protein synthesis at the ribosome: aminoglycosides (bactericidal), tetracyclines, macrolides and chloramphenicol (usually bacteriostatic).\n- Nucleic acid synthesis: fluoroquinolones inhibit DNA gyrase (bactericidal), rifampicin inhibits RNA polymerase.\n- Folate pathway: sulphonamides with trimethoprim.\n- Cell membrane: polymyxins such as colistin, which are highly important reserve drugs for human medicine."],
    ["Bactericidal and bacteriostatic; spectrum", "Bactericidal drugs kill bacteria, and bacteriostatic drugs stop their growth and rely on the immune system. Narrow-spectrum drugs act on few species and broad-spectrum on many. Using the narrowest effective drug disturbs fewer normal flora and selects less resistance."],
    ["MIC and sensitivity testing", "The minimum inhibitory concentration (MIC) is the lowest concentration of a drug that stops visible growth of a bacterium. Disk diffusion (Kirby-Bauer) testing places drug-soaked disks on an agar plate with the bacterium, and the size of the clear zone shows sensitivity. Culture and sensitivity testing helps pick a drug rationally."],
    ["Mechanisms of resistance", "Bacteria may produce enzymes that destroy the drug (beta-lactamases), alter the target (as in MRSA), reduce drug entry, pump the drug out (efflux pumps) or bypass the blocked pathway. Resistance genes are often on plasmids and spread between bacteria by conjugation, even between species. Extended-spectrum beta-lactamase (ESBL) producers are an example in E. coli."],
    ["Why resistance matters in animals", "Resistant bacteria can pass from animals to people through food, contact and the environment. Using antibiotics for growth promotion, for prevention without need and in poorly chosen doses select resistant strains. Veterinary use is regulated in many countries, and some drugs are restricted or banned in food animals. Check current Indian regulations."],
    ["Principles of responsible use", "Use only when bacterial infection is likely. Choose based on culture where possible. Use the right drug by the right route for the right duration as prescribed. Do not use leftover drugs. Observe withdrawal periods. Improve hygiene, vaccination and housing to reduce the need for drugs. Keep treatment records. This is stewardship."]
  ],
  tb: { h: ["Group", "Target", "Action", "Example class"], r: [["Beta-lactams", "Cell wall", "Bactericidal", "Penicillins, cephalosporins"], ["Aminoglycosides", "30S ribosome", "Bactericidal", "Gentamicin type"], ["Tetracyclines", "30S ribosome", "Bacteriostatic", "Oxytetracycline type"], ["Macrolides", "50S ribosome", "Bacteriostatic", "Erythromycin type"], ["Fluoroquinolones", "DNA gyrase", "Bactericidal", "Enrofloxacin type"], ["Sulphonamides", "Folate pathway", "Bacteriostatic", "Sulphadimidine type"]] },
  df: ["MIC: the lowest concentration of an antimicrobial that prevents visible growth of a microorganism.", "Antimicrobial resistance: the ability of a microorganism to survive exposure to a drug that would normally kill or inhibit it.", "Stewardship: coordinated actions to ensure antimicrobials are used only when needed and correctly."],
  tm: [["Beta-lactamase", "Enzyme that breaks the beta-lactam ring"], ["Efflux pump", "Protein that pumps drugs out of the bacterial cell"], ["MRSA", "Methicillin-resistant Staphylococcus aureus"], ["Spectrum", "Range of bacteria affected by a drug"], ["Plasmid", "Circular DNA that can carry resistance genes"]],
  st: ["Take a clean sample from the infected site.", "Culture and identify the bacterium.", "Test sensitivity to the drugs.", "A veterinarian chooses the drug by evidence.", "Treat as directed, observe withdrawal and keep records."],
  ex: ["Mastitis bacteria in a herd may be sensitive to some drugs and not others, so culture guides treatment.", "Use of broad-spectrum drugs for mild diarrhoea that is viral selects resistant gut bacteria without helping.", "MRSA in dogs and people shows how resistant bacteria cross between species."],
  k: ["Classification by mechanism.", "Bactericidal vs bacteriostatic.", "MIC and disk diffusion.", "Resistance mechanisms.", "Principles of stewardship."],
  m: ["Antibiotics do not treat viral infections.", "Stopping a prescribed course early or using leftovers both promote resistance."],
  sa: [["What is MIC?", "The lowest concentration of a drug that inhibits visible growth of a bacterium."], ["Name two mechanisms of antimicrobial resistance.", "Enzymatic inactivation, such as beta-lactamase, and efflux pumps that remove the drug."]],
  la: [["Classify antimicrobial agents and describe how resistance develops.", "Table of classes with mechanism, spectrum and examples; mechanisms of resistance; spread by plasmids; consequences; stewardship measures."]],
  q: [["Beta-lactams act by blocking", ["Protein synthesis", "Cell wall synthesis", "DNA gyrase", "Folate synthesis"], 1, "Cell wall synthesis."],
    ["Resistance genes spread between bacteria mainly by", ["Plasmids", "Ribosomes", "Spores only", "Capsules"], 0, "Plasmids carried by conjugation."],
    ["A bacteriostatic drug", ["Kills bacteria", "Stops bacterial growth", "Kills viruses", "Is always harmless"], 1, "It inhibits growth."],
    ["The test that shows drug sensitivity on an agar plate is", ["Disk diffusion", "ELISA", "Gram stain", "Coagulase test"], 0, "Kirby-Bauer disk diffusion."]],
  f: [["MIC", "Minimum inhibitory concentration"], ["ESBL", "Extended-spectrum beta-lactamase"], ["Narrow-spectrum", "Acts on a small range of bacteria"], ["Stewardship", "Responsible use of antimicrobials"]],
  d: ["Learn the spectrum of each group in detail.", "Study the One Health approach to antimicrobial resistance.", "Read the rules on antibiotics in food animals."]
});

topic("pharm", "Anthelmintics and Ectoparasiticides: Classes and Mechanisms", {
  o: ["Classify anthelmintics and ectoparasiticides", "Explain how each major class acts on the parasite", "Explain how anthelmintic resistance develops", "State why withdrawal periods and species cautions matter"],
  i: "Parasite control is part of daily livestock work. Drugs for parasites are widely used, so resistance, residues and animal safety need as much attention as the killing effect.",
  s: "Each parasite drug works by attacking something that the worm or arthropod needs, such as its nerves, muscles or energy supply. Different groups of drugs act in different ways. Overuse and wrong use make worms resistant. No doses are given here.",
  n: [
    ["Benzimidazoles", "These bind to tubulin in the parasite and block formation of microtubules, so the worm cannot absorb nutrients and starves. They act against many roundworms and some also on flukes and tapeworms. Resistance in Haemonchus and other sheep and goat worms is widespread."],
    ["Imidazothiazoles and tetrahydropyrimidines", "Levamisole acts on the nicotinic receptors of the worm's muscle and causes spastic paralysis, so the worm is expelled. It acts on roundworms only."],
    ["Macrocyclic lactones", "Ivermectin and related drugs bind glutamate-gated chloride channels in the nerve and muscle cells of nematodes and arthropods and cause paralysis. They act on roundworms and many ectoparasites, but not on flukes or tapeworms. Some dog breeds with a mutation in the MDR1 gene (for example many collie-type dogs) are very sensitive, which shows that species and breed matter."],
    ["Drugs for tapeworms and flukes", "Praziquantel increases calcium permeability in tapeworms and flukes, which causes spastic paralysis and damage to the surface. Salicylanilides such as closantel and oxyclozanide and substituted phenols uncouple oxidative phosphorylation in flukes. Triclabendazole acts on both immature and adult liver flukes. The choice depends on the fluke stage."],
    ["Ectoparasiticides", "Organophosphates and carbamates inhibit acetylcholinesterase. Synthetic pyrethroids keep sodium channels open in the nerves of arthropods. Amitraz acts on octopamine receptors in ticks and mites. Fipronil blocks GABA-gated chloride channels. Some insect growth regulators block development of immature stages. They are applied as dips, sprays, pour-ons, spot-ons or collars. Toxicity to animals, humans and the environment is a real risk, so follow label and veterinary instructions."],
    ["Resistance", "Resistance means that worms survive a dose that used to kill them. It develops when the same class is used again and again, when under-dosing occurs (wrong weight estimate), or when all the worms on a farm are exposed to the drug leaving no unexposed worms (refugia). Resistant worms then pass on resistance genes. Slowing resistance needs targeted treatment, correct dosing by a vet, rotation by evidence, pasture management and testing with faecal egg count reduction tests."],
    ["Residues and safety", "Drugs can pass into milk and meat, so withdrawal periods must be observed. Some drugs are not allowed in lactating animals. Avermectins are toxic to dung beetles and fish if the environment is contaminated. Dips must be disposed of safely."]
  ],
  tb: { h: ["Class", "Mechanism", "Acts on"], r: [["Benzimidazoles", "Bind tubulin", "Roundworms, some flukes and tapeworms"], ["Levamisole", "Nicotinic agonist, spastic paralysis", "Roundworms"], ["Macrocyclic lactones", "Glutamate-gated chloride channel", "Roundworms and arthropods"], ["Praziquantel", "Calcium permeability, spastic paralysis", "Tapeworms, flukes"], ["Salicylanilides", "Uncouple oxidative phosphorylation", "Flukes"], ["Pyrethroids", "Hold sodium channels open", "Ticks, flies, lice"]] },
  df: ["Anthelmintic: a drug that kills or expels parasitic worms.", "Ectoparasiticide: a drug used against parasites on the surface of the host.", "Refugia: parasites not exposed to the drug."],
  tm: [["Tubulin", "Structural protein of microtubules"], ["Nicotinic receptor", "Acetylcholine receptor in nerve and muscle"], ["Faecal egg count reduction test", "Test that compares egg counts before and after treatment to detect resistance"], ["Spot-on", "Liquid applied to the skin at one spot"]],
  st: ["Confirm the parasite problem by examination.", "Select the drug class with a veterinarian.", "Weigh the animal and dose accurately as advised.", "Observe withdrawal periods and record treatment.", "Check the result and monitor for resistance."],
  ex: ["Repeated use of one drug on a sheep flock without testing leads to resistant Haemonchus.", "A collie-type dog may show severe toxicity from a drug that is safe in other dogs.", "Dipping cattle against ticks without correct concentrations leaves resistant ticks."],
  k: ["Mechanism of each class.", "Spectrum of the drugs.", "Causes of resistance.", "Refugia.", "Safety and residues."],
  m: ["A drug that works for one parasite may not work on another. No single drug covers everything."],
  sa: [["How do benzimidazoles act?", "They bind tubulin and block microtubule formation in the parasite."], ["What is refugia?", "Parasites not exposed to a drug, which keep resistant genes diluted."]],
  la: [["Classify anthelmintics and describe their mechanisms of action.", "Table of classes, mechanisms, spectrum, examples, resistance, safety and residue issues."]],
  q: [["Ivermectin acts on", ["Tubulin", "Glutamate-gated chloride channels", "DNA gyrase", "Cell wall"], 1, "Macrocyclic lactones act on glutamate-gated chloride channels."],
    ["Praziquantel is mainly used against", ["Tapeworms and flukes", "Mites only", "Bacteria", "Viruses"], 0, "Cestodes and trematodes."],
    ["Under-dosing leads to", ["Resistance", "Faster cure", "Longer residues", "Nothing"], 0, "It selects resistant parasites."],
    ["Pyrethroids act on", ["Sodium channels", "Ribosomes", "Tubulin", "Proton pump"], 0, "They keep sodium channels open."]],
  f: [["Levamisole", "Nicotinic agonist causing worm paralysis"], ["MDR1", "Gene whose mutation causes ivermectin sensitivity in some dogs"], ["Closantel", "Salicylanilide used against flukes"], ["Amitraz", "Acts on octopamine receptors in ticks and mites"]],
  d: ["Study the life cycles to understand when drugs work.", "Learn about vaccines for parasites.", "Read about plant-based and integrated control."]
});
planned("pharm", ["Antifungal and antiviral drugs", "Hormones and related drugs", "Drugs acting on the digestive tract", "Drugs for the cardiovascular and respiratory systems", "General and local anaesthetics in depth", "Fluid therapy concepts", "Prescription writing and drug laws", "Pesticide and heavy metal poisoning in detail", "Plant poisonings of India", "NSAIDs and corticosteroids in depth"]);
/* ================= WAVE 2, part 2: thinner subjects ================= */
unit("pubh", "Unit 2 – Surveillance, One Health and disease control");
topic("pubh", "One Health, Surveillance and Disease Control Programmes", {
  o: ["Explain the One Health idea", "Describe surveillance and its types", "Outline control strategies: prevention, control, elimination, eradication", "Name the main Indian livestock disease control programmes in outline"],
  i: "Human, animal and environmental health are linked. Rabies, brucellosis, avian influenza and antimicrobial resistance cannot be solved by one profession alone, so a vet is part of a public health team.",
  s: "One Health means doctors, vets and environmental workers share information and act together. Surveillance is watching for disease so it is found early. Control programmes use vaccination, testing, movement rules and awareness to reduce or remove a disease.",
  n: [
    ["One Health", "Most new human infectious diseases come from animals. Controlling a disease in animals, such as vaccinating dogs against rabies, protects people far more cheaply than treating human cases. Shared areas are zoonoses, food safety, antimicrobial resistance and environmental contamination."],
    ["Surveillance", "Surveillance is the continuous collection, analysis and sharing of disease data. Passive surveillance depends on reports from clinics and farmers. Active surveillance means going out to search, sample and test. Sentinel surveillance uses selected sites or animals as a warning system. Good surveillance needs correct diagnosis and quick reporting."],
    ["Levels of control", "Prevention stops a disease from appearing. Control reduces it to an acceptable level. Elimination removes it from a region. Eradication removes the agent worldwide, as with rinderpest, declared eradicated in 2011. Tools are vaccination, test and cull, quarantine, movement control, vector control, hygiene and education."],
    ["Outbreak investigation steps", "Confirm the diagnosis, define a case, count cases, describe by time, place and animal, form a hypothesis, test it, apply control measures and report. A simple epidemic curve shows whether it is a point source or a propagating outbreak."],
    ["Indian programmes (verify current status)", "Programmes in India include the National Animal Disease Control Programme for foot and mouth disease and brucellosis, the rabies control efforts, and programmes for peste des petits ruminants and classical swine fever. Details and targets change, so check the Department of Animal Husbandry and Dairying for the present position."],
    ["Biosecurity and notifiable diseases", "Some diseases must be reported to authorities by law. A vet who suspects one should report it and follow the official procedure, and should not treat it as a private case."]
  ],
  tb: { h: ["Term", "Meaning", "Example"], r: [["Control", "Reduce to acceptable level", "Mastitis control"], ["Elimination", "Zero cases in a region", "Disease free zone"], ["Eradication", "Agent removed worldwide", "Rinderpest"], ["Passive surveillance", "Reports sent in", "Clinic records"], ["Active surveillance", "Search and sampling", "Serosurvey"]] },
  df: ["One Health: an approach that links the health of people, animals and the environment.", "Surveillance: continuous systematic collection and use of health data for action.", "Notifiable disease: a disease that must be reported to the authorities by law."],
  tm: [["Index case", "First case identified in an outbreak"], ["Serosurvey", "Testing blood samples for antibodies in a population"], ["Sentinel", "Animal or site used as an early warning"], ["Quarantine", "Separation of animals that may be infected"]],
  st: ["A suspected case is reported.", "Samples are taken and the diagnosis confirmed.", "The affected area and animals are identified.", "Movement control and treatment or vaccination begin.", "Contacts are traced and followed up.", "The outbreak is closed after a period without cases."],
  ex: ["Mass dog vaccination reduces human rabies deaths.", "A sudden death of many poultry is reported, samples tested for avian influenza and the farm isolated.", "Bulk milk testing for brucellosis is a form of surveillance."],
  k: ["One Health.", "Passive vs active surveillance.", "Control vs elimination vs eradication.", "Outbreak investigation steps."],
  m: ["Eradication is not the same as elimination in a district."],
  sa: [["Define surveillance.", "Continuous systematic collection, analysis and use of disease data to guide action."], ["Which disease was globally eradicated in animals?", "Rinderpest, declared in 2011."]],
  la: [["Describe the steps of investigating a disease outbreak.", "Confirm diagnosis, case definition, case counting, time place animal analysis, hypothesis, control, reporting and follow up."]],
  q: [["Rinderpest was declared eradicated in", ["1990", "2001", "2011", "2020"], 2, "2011."],
    ["Searching for disease by sampling is", ["Passive surveillance", "Active surveillance", "Quarantine", "Elimination"], 1, "Active surveillance."],
    ["A disease that must be reported by law is", ["Notifiable", "Endemic", "Enzootic", "Chronic"], 0, "Notifiable."],
    ["One Health links", ["Only vets", "People, animals and environment", "Only farms", "Only labs"], 1, "All three."]],
  f: [["Eradication", "Agent removed worldwide"], ["Sentinel surveillance", "Early warning using selected sites"], ["Notifiable disease", "Must be reported by law"], ["Epidemic curve", "Graph of cases over time"]],
  d: ["Study the history of rinderpest eradication.", "Read about avian influenza surveillance.", "Learn epidemiological study designs."]
});
planned("pubh", ["Rabies control in depth", "Brucellosis and tuberculosis programmes", "Epidemiological study designs", "Biostatistics for veterinarians", "Veterinary public health law", "Environmental health and waste", "Occupational hazards", "Disaster management and livestock"]);

unit("gen", "Unit 2 – Molecular and applied genetics");
topic("gen", "Cytogenetics, Chromosomes and Inherited Disorders", {
  o: ["Describe chromosome structure and number in domestic animals", "Explain mitosis and meiosis", "Describe chromosomal abnormalities", "Name examples of inherited disorders"],
  i: "Chromosome knowledge explains inheritance, sex determination and some causes of infertility. It also forms the base of modern genetic testing in livestock.",
  s: "Genes sit on chromosomes. Body cells have pairs of chromosomes, sperm and eggs have half. When the number or structure is wrong, animals can be infertile or sick.",
  n: [
    ["Chromosome numbers", "Diploid numbers (2n): cattle 60, buffalo 50 (river type), sheep 54, goat 60, pig 38, horse 64, dog 78, cat 38, fowl 78. The sex chromosomes are XX and XY in mammals. In birds the female is ZW and the male ZZ, so the female decides sex."],
    ["Mitosis and meiosis", "Mitosis produces two identical diploid cells and is used for growth and repair. Meiosis halves the chromosome number to make gametes. It has two divisions, crossing over in prophase I gives genetic variation, and independent assortment adds more."],
    ["Chromosome abnormalities", "Numerical errors include aneuploidy, for example monosomy and trisomy, and polyploidy. Structural errors include deletion, duplication, inversion and translocation. The Robertsonian translocation (1/29) in cattle is linked with reduced fertility. Freemartin heifers are sterile females born co-twin to a bull, caused by blood-vessel fusion in the placentas. XXY and XO conditions cause abnormal sexual development."],
    ["Inherited disorders", "Examples include bovine leukocyte adhesion deficiency, citrullinaemia, hip dysplasia in dogs and polled-related traits. Many are autosomal recessive, so carriers look normal. DNA tests identify carriers, and planned matings avoid affected offspring."],
    ["Karyotyping", "A karyotype arranges the chromosomes in pairs by size. It is used to detect chromosome abnormalities in infertile animals."]
  ],
  tb: { h: ["Species", "Diploid number"], r: [["Cattle", "60"], ["Buffalo (river)", "50"], ["Sheep", "54"], ["Goat", "60"], ["Pig", "38"], ["Horse", "64"], ["Dog", "78"], ["Fowl", "78"]] },
  df: ["Karyotype: the complete set of chromosomes of an individual arranged in pairs.", "Aneuploidy: a chromosome number that is not an exact multiple of the haploid number.", "Carrier: an animal that carries a recessive allele but looks normal."],
  tm: [["Autosome", "Non-sex chromosome"], ["Crossing over", "Exchange of segments between homologous chromosomes"], ["Freemartin", "Sterile female twin of a bull"], ["Translocation", "Movement of a chromosome segment to another chromosome"]],
  st: ["Cells are collected and cultured.", "Division is stopped at metaphase.", "Chromosomes are spread and stained.", "Chromosomes are photographed and paired.", "Abnormalities are looked for."],
  ex: ["A heifer born twin to a bull is usually a freemartin and cannot breed.", "A bull with a chromosome translocation may sire fewer calves.", "Two carriers mated together can produce an affected calf."],
  k: ["Chromosome numbers.", "Mitosis vs meiosis.", "Chromosome abnormalities.", "Inherited disorders."],
  m: ["Carriers of recessive disease are not sick, but they pass it on."],
  sa: [["What is a freemartin?", "A sterile female born as a twin to a male, due to fusion of placental blood vessels."], ["Diploid number of cattle?", "60."]],
  la: [["Compare mitosis and meiosis.", "Number of divisions, daughter cells, chromosome number, crossing over, function, with a table."]],
  q: [["Diploid number of the dog is", ["38", "60", "64", "78"], 3, "78."],
    ["In birds the heterogametic sex is", ["Male", "Female", "Both", "None"], 1, "Female ZW."],
    ["Crossing over occurs in", ["Mitosis", "Meiosis", "Cleavage", "Fertilisation"], 1, "Prophase I of meiosis."],
    ["A freemartin is usually", ["Fertile", "Sterile", "A male", "Polled"], 1, "Sterile."]],
  f: [["Meiosis", "Division halving chromosome number"], ["Karyotype", "Chromosome set arranged in pairs"], ["Carrier", "Has a recessive allele but is normal"], ["ZW", "Female bird sex chromosomes"]],
  d: ["Study DNA marker use in breeding.", "Learn about sex-linked traits.", "Read about genomic selection."]
});
planned("gen", ["Molecular genetics and genomic selection", "Immunogenetics and blood groups", "Biometry in animal breeding", "Breeds of horses, dogs and poultry of India", "Crossbreeding programmes in India", "Conservation of indigenous breeds"]);

unit("lpm", "Unit 2 – Housing, calf rearing and herd health");
topic("lpm", "Calf and Heifer Rearing, Housing and Herd Health", {
  o: ["Describe colostrum feeding and calf care", "Explain the growth targets of a heifer", "State principles of dairy housing", "Describe the routine of herd health"],
  i: "A good calf becomes a good cow. Most calf deaths and many later production problems start in the first weeks of life.",
  s: "A newborn calf has almost no antibodies, so it must drink colostrum soon after birth. Clean housing, dry bedding, clean water and a plan for vaccination and deworming keep calves healthy until they join the herd.",
  n: [
    ["Colostrum", "Colostrum is the first milk and is rich in antibodies (immunoglobulins), vitamins and energy. Calves absorb whole antibodies only in the first hours of life, and this ability falls quickly, so colostrum should be fed early and in good quantity as advised by the farm vet. Poor transfer of immunity is called failure of passive transfer and leads to scours and pneumonia."],
    ["Navel and early care", "Dry the calf, check breathing, dip the navel in antiseptic as advised and keep the calf in a clean, dry, draught-free pen. Use a separate clean pen for each calf where possible."],
    ["Feeding the calf", "Milk or milk replacer is followed by calf starter and good water from the first weeks, which develop the rumen. Weaning is done when the calf eats enough starter. Feed hygiene is important: dirty buckets cause scours."],
    ["Heifer growth", "Heifers should be reared to reach the target body weight and condition at first breeding, not just a target age. Under-feeding delays puberty, and over-feeding fattens the udder tissue and reduces milk yield later. Weigh or use a girth tape to follow growth."],
    ["Housing principles", "Housing should give shade and ventilation in summer, dry and clean flooring, non-slip floors, enough space per animal, clean water and feeding space. Ventilation without draughts prevents respiratory problems. Good drainage prevents wet floors, which lead to foot disease and mastitis."],
    ["Herd health routine", "Prepare a calendar of vaccination, deworming according to faecal tests, routine hoof checks, record keeping and isolation of sick animals. New animals are quarantined before joining the herd. Regular milk testing helps detect mastitis early."]
  ],
  tb: { h: ["Stage", "Main focus", "Common problem"], r: [["Newborn", "Colostrum, navel care", "Poor immunity, navel infection"], ["Pre-weaning", "Milk, starter, clean pen", "Scours, pneumonia"], ["Heifer", "Growth targets, vaccination", "Late puberty, over-conditioning"], ["Pregnant heifer", "Nutrition, comfort", "Difficult calving"]] },
  df: ["Colostrum: the first milk after calving, rich in antibodies.", "Failure of passive transfer: inadequate absorption of antibodies from colostrum by the newborn.", "Weaning: stopping milk feeding when the calf can live on solid feed."],
  tm: [["Calf starter", "Concentrate feed that supports early rumen development"], ["Quarantine", "Isolation of new animals before joining the herd"], ["Girth tape", "Tape to estimate body weight from chest girth"]],
  st: ["Calf is born and breathing is checked.", "Navel care is done.", "Colostrum is fed early.", "Clean milk, starter and water are provided.", "Calf is weaned onto solid feed.", "Heifer is grown to target weight, then bred."],
  ex: ["A calf that did not suck within hours has a high risk of scours.", "A heifer bred too small struggles at calving.", "Wet bedding and heat stress raise the risk of pneumonia."],
  k: ["Colostrum importance.", "Starter and rumen development.", "Heifer growth targets.", "Housing principles.", "Herd health calendar."],
  m: ["Calves are not born protected. They depend on colostrum."],
  sa: [["Why is colostrum important?", "It provides antibodies that protect the calf in its first weeks."], ["What is weaning?", "Stopping milk feeding when the calf eats enough solid feed."]],
  la: [["Describe the management of a calf from birth to weaning.", "Navel care, colostrum, hygiene, feeding programme, starter, water, housing, health care, weaning, records."]],
  q: [["Calves get immunity at birth mainly from", ["Colostrum", "Placenta", "Hay", "Water"], 0, "Colostrum."],
    ["Over-feeding heifers can", ["Increase later milk yield", "Reduce later milk yield", "Do nothing", "Cure scours"], 1, "Fat deposition in the udder reduces later yield."],
    ["Calf starter helps", ["Rumen development", "Bone fusion", "Milk let-down", "Hoof growth"], 0, "It develops the rumen."],
    ["New animals should be", ["Mixed at once", "Quarantined", "Sold", "Fasted"], 1, "Quarantine protects the herd."]],
  f: [["Colostrum", "First milk with antibodies"], ["Calf starter", "Feed for rumen development"], ["Quarantine", "Isolation of new animals"], ["Target weight breeding", "Breed heifers by size, not age alone"]],
  d: ["Study heat stress management in dairy cattle.", "Learn about transition cow management.", "Read about farm record systems."]
});
planned("lpm", ["Transition cow management", "Heat stress management", "Management of horses and companion animals", "Duck, quail and turkey management", "Rabbit and laboratory animal management", "Farm economics and project planning", "Layer and broiler house management in detail"]);

unit("lpt", "Unit 2 – Value addition and quality");
topic("lpt", "Milk Products, Quality Testing and Hygiene", {
  o: ["List the main milk products and the principle of each", "Describe platform tests used for milk quality", "Explain pasteurisation and its purpose", "Name common adulterants and why they matter"],
  i: "Milk is a perishable food. Processing turns it into longer-lasting products, and testing protects consumers from poor quality and adulteration.",
  s: "Milk spoils quickly, so it is heated (pasteurised), cooled and often made into curd, butter, ghee, paneer or cheese. Simple tests at the milk collection centre show whether the milk is fresh, clean and unadulterated.",
  n: [
    ["Pasteurisation", "Pasteurisation heats milk to destroy disease-causing bacteria without changing it much. Common methods are the low temperature long time (LTLT) holding method and high temperature short time (HTST), followed by quick cooling. The alkaline phosphatase test checks that pasteurisation was done properly, as the enzyme is destroyed by correct heating."],
    ["Common products", "Curd (dahi) is milk fermented by lactic acid bacteria. Butter comes from churning cream. Ghee is milk fat made by heating butter or cream to remove water. Paneer is made by acid coagulation of heated milk. Cheese uses rennet and bacterial cultures. Khoa is milk concentrated by heating. Ice cream is a frozen mix of milk, fat, sugar and stabiliser."],
    ["Platform tests", "Organoleptic test (taste, smell, appearance), temperature, lactometer reading for density, fat estimation, clot on boiling (COB) and alcohol test to detect developed acidity, and acidity titration. These are quick tests at the collection point."],
    ["Laboratory tests", "Fat by Gerber method, total solids and solids-not-fat, methylene blue reduction test and standard plate count for bacterial quality, somatic cell count for udder health, and detection tests for adulterants."],
    ["Adulteration", "Water is the commonest adulterant. Others include added starch, urea, detergent or neutralisers. Adulteration reduces nutritional quality and some adulterants are harmful. Detection uses specific chemical tests as described in the Food Safety and Standards rules, which should be checked for current limits."],
    ["Hygienic production", "Healthy animals, clean udder washing, clean milkers and utensils, quick cooling and prompt transport keep bacterial counts low. The cold chain is vital in India's warm climate."]
  ],
  tb: { h: ["Product", "Basic principle"], r: [["Curd", "Lactic fermentation"], ["Butter", "Churning cream"], ["Ghee", "Heat to remove water from butterfat"], ["Paneer", "Acid coagulation of heated milk"], ["Cheese", "Rennet and cultures"], ["Khoa", "Heat concentration"]] },
  df: ["Pasteurisation: heat treatment that kills pathogenic bacteria in milk with minimal changes.", "Adulteration: addition of foreign or inferior substances to a food.", "Somatic cell count: number of body cells per ml of milk, an indicator of udder health."],
  tm: [["Lactometer", "Instrument that measures milk density"], ["SNF", "Solids-not-fat"], ["COB test", "Clot on boiling test for acidity"], ["Rennet", "Enzyme preparation that clots milk in cheesemaking"]],
  st: ["Receive milk and do platform tests.", "Filter and cool.", "Standardise fat and SNF.", "Pasteurise and cool.", "Pack and store cold.", "Distribute within the cold chain."],
  ex: ["Milk that clots on boiling shows developed acidity and is rejected.", "A high somatic cell count tells the vet that mastitis may be present.", "A lactometer reading that is too low suggests added water."],
  k: ["Pasteurisation methods.", "Platform tests.", "Milk products principles.", "Adulterants.", "Somatic cell count."],
  m: ["Pasteurised milk is not sterile. It must still be kept cold."],
  sa: [["What is the alkaline phosphatase test used for?", "To confirm that milk was pasteurised properly."], ["What does a high somatic cell count indicate?", "Possible mastitis or udder inflammation."]],
  la: [["Describe the platform tests done on milk at a collection centre.", "Organoleptic, temperature, lactometer reading, fat, COB, alcohol, acidity, with purpose of each."]],
  q: [["Paneer is made by", ["Acid coagulation", "Fermentation", "Churning", "Freezing"], 0, "Heated milk coagulated with acid."],
    ["A low lactometer reading suggests", ["Added water", "Added fat", "Cold milk", "Good milk"], 0, "Added water lowers density."],
    ["HTST is a type of", ["Pasteurisation", "Freezing", "Fermentation", "Homogenisation only"], 0, "High temperature short time pasteurisation."],
    ["Gerber method estimates", ["Fat", "Lactose", "Protein", "Calcium"], 0, "Milk fat."]],
  f: [["LTLT", "Low temperature long time pasteurisation"], ["Ghee", "Milk fat after removing water"], ["Somatic cell count", "Indicator of udder health"], ["COB", "Clot on boiling test"]],
  d: ["Study the chemistry of milk proteins.", "Learn cheese technology.", "Read about food safety standards for milk."]
});
planned("lpt", ["Cheese and fermented products in depth", "Ice cream technology", "Slaughterhouse design and operations", "Meat products and preservation", "Egg grading and quality", "Hides, skins and wool", "Packaging and cold chain", "Quality systems: HACCP"]);

unit("gyn", "Unit 2 – Fertility management");
topic("gyn", "Artificial Insemination, Semen and Breeding Management", {
  o: ["Describe how semen is collected and processed", "Explain heat detection and timing of AI", "List causes of AI failure", "Describe breeding soundness examination in outline"],
  i: "Artificial insemination (AI) has spread good genetics across India, mainly through frozen semen of superior bulls. Success depends on good heat detection, correct handling of semen and sound technique.",
  s: "In AI, semen from a good bull is collected, diluted, frozen and stored in liquid nitrogen. A trained person places it in the cow at the right time after she comes in heat. Mistakes in timing or semen handling are the main reasons AI fails.",
  n: [
    ["Semen collection", "Semen is collected from the bull with an artificial vagina, or by electroejaculation when needed. Collected semen is evaluated for volume, colour, concentration, motility and the proportion of normal sperm."],
    ["Processing and storage", "Semen is diluted in an extender that protects sperm, such as one containing egg yolk or other protective agents, cooled, packed in straws and frozen. Frozen straws are stored in liquid nitrogen at about minus 196 degrees Celsius. Straws must stay submerged and the nitrogen level must be checked regularly."],
    ["Heat detection", "Signs of oestrus include standing to be mounted, mounting other cows, restlessness, clear mucus discharge and a swollen vulva. Heat detection is the biggest weak point in many herds. Buffaloes often show silent heat, so careful observation is needed. Records of past heats help to predict the next."],
    ["Timing", "Ovulation occurs some hours after the end of oestrus, so a commonly taught approach is the morning-evening rule: a cow seen in heat in the morning is inseminated in the evening, and one seen in the evening is inseminated the next morning. Check your textbook for the exact local guidance."],
    ["Technique", "The recto-vaginal method is used in cattle: the operator holds the cervix through the rectum and passes the AI gun through it, depositing semen in the body of the uterus. Thawing is done correctly and the straw is used soon after thawing. Clean, gentle handling avoids injury and infection."],
    ["Reasons for failure", "Poor heat detection, wrong timing, poorly handled semen, rough technique, uterine infection, poor body condition, heat stress and underlying reproductive disease. A systematic check of each is part of the problem-solving."],
    ["Breeding soundness", "A breeding soundness examination of a bull includes general health, scrotal size, testes and accessory glands, semen quality and libido. It helps avoid using infertile bulls."],
    ["Other technologies", "Estrus synchronisation, sexed semen, multiple ovulation and embryo transfer (MOET) and in vitro embryo production are used to speed up genetic progress. These need specialised training."]
  ],
  tb: { h: ["Step", "Key point"], r: [["Collection", "Artificial vagina"], ["Extender", "Protects sperm during freezing"], ["Storage", "Liquid nitrogen at about minus 196 C"], ["Heat detection", "Standing heat is the main sign"], ["Timing", "Morning-evening rule"], ["Deposition", "Body of the uterus"]] },
  df: ["Artificial insemination: placing semen into the female tract by an instrument.", "Oestrus: the period of sexual receptivity of the female.", "Extender: a fluid added to semen to preserve sperm."],
  tm: [["Straw", "Plastic tube holding frozen semen"], ["Thawing", "Warming frozen semen before use"], ["Silent heat", "Ovulation without clear behavioural signs"], ["Libido", "Sexual drive"]],
  st: ["The cow is observed and heat is detected.", "A straw is chosen and thawed correctly.", "The AI gun is loaded cleanly.", "Semen is deposited in the uterine body.", "The date and bull are recorded.", "Pregnancy is checked later."],
  ex: ["A farmer who misses silent heats in buffaloes has a long calving interval.", "A damaged liquid nitrogen container can ruin hundreds of straws.", "A repeat breeder cow needs systematic examination of causes."],
  k: ["Semen processing and storage.", "Heat signs and timing.", "Causes of AI failure.", "Breeding soundness."],
  m: ["Freezing does not make semen immortal. Handling errors kill sperm."],
  sa: [["At what temperature is semen stored?", "In liquid nitrogen at about minus 196 degrees Celsius."], ["State the morning-evening rule.", "Cows in heat in the morning are inseminated in the evening and cows in heat in the evening the next morning."]],
  la: [["Describe the procedure of artificial insemination in cattle and reasons for its failure.", "Heat detection, timing, thawing, technique, hygiene, deposition site, records, failure causes."]],
  q: [["Frozen semen is stored in", ["Liquid nitrogen", "A refrigerator", "A freezer at minus 20", "Ice"], 0, "Liquid nitrogen."],
    ["Semen is deposited in the", ["Vagina", "Body of the uterus", "Oviduct", "Bladder"], 1, "Body of the uterus."],
    ["Biggest cause of AI failure on many farms is", ["Poor heat detection", "Good semen", "Too much feed", "Sunlight"], 0, "Heat detection."],
    ["Silent heat is common in", ["Buffaloes", "Dogs", "Hens", "Pigs"], 0, "Buffaloes."]],
  f: [["MOET", "Multiple ovulation and embryo transfer"], ["Extender", "Fluid that protects sperm"], ["Silent heat", "Oestrus with weak signs"], ["Straw", "Packaging for frozen semen"]],
  d: ["Study oestrus synchronisation protocols in outline.", "Learn bull breeding soundness exam.", "Read about embryo transfer."]
});
planned("gyn", ["Embryo transfer and assisted reproduction", "Obstetrical operations", "Reproductive problems of the bitch and mare", "Male infertility", "Disorders of pregnancy and the puerperium", "Andrology", "Reproductive hormones in practice", "Neonatal care"]);

unit("surg", "Unit 2 – Common procedures");
topic("surg", "Wound Healing, Sutures and Common Operations (Concepts)", {
  o: ["Classify wounds and describe the stages of healing", "Name common suture materials and patterns", "Describe the principles of tissue handling", "List common operations in outline"],
  i: "Wounds and surgical cuts heal by the same biological steps. A surgeon helps healing by keeping tissue alive, clean and quiet. This topic gives concepts only. It is not a surgical guide, and procedures must be learned under a supervisor.",
  s: "A wound first bleeds, then becomes inflamed, then new tissue fills it and finally scar tissue strengthens it. Infection, dead tissue and movement slow the process. Sutures hold the edges together while the body repairs itself.",
  n: [
    ["Wound classification", "Wounds may be incised, lacerated, punctured, contused or abraded. They may be clean, clean-contaminated, contaminated or dirty. Time since injury and degree of contamination decide whether a wound can be closed at once."],
    ["Stages of healing", "Inflammatory phase: bleeding stops, white cells clean the area. Proliferative phase: granulation tissue fills the gap and epithelium covers it. Maturation (remodelling) phase: collagen reorganises and the scar gains strength over months. Healing by first intention is a clean closed wound. Second intention is open healing by granulation. Third intention is delayed closure."],
    ["Factors affecting healing", "Infection, foreign bodies, dead tissue, poor blood supply, movement, tension, poor nutrition, disease such as anaemia, and drugs such as corticosteroids delay healing. Moist and clean wounds heal better."],
    ["Suture materials", "Absorbable sutures, such as catgut or synthetic types, are used for tissue that heals quickly. Non-absorbable materials, such as nylon or silk, are used for skin and tissues that need long support. Needles are cutting or round-bodied. Select material according to tissue and species."],
    ["Suture patterns", "Simple interrupted, simple continuous, horizontal mattress and inverting patterns are taught. Knots must be secure and not too tight, since tight sutures cut off blood supply."],
    ["Principles of tissue handling", "Gentle handling, controlling bleeding, removing dead tissue (debridement), keeping tissues moist, avoiding dead space and tension, strict asepsis and good records. Halsted's principles summarise these ideas."],
    ["Common operations in outline", "Castration, dehorning, hernia repair, caesarean section, rumenotomy, enterotomy, ovariohysterectomy and fracture fixation are typical examples. Details belong in practical classes under supervision with proper anaesthesia and pain relief."]
  ],
  tb: { h: ["Intention", "Description", "Example"], r: [["First", "Clean edges closed by suture", "Clean surgical incision"], ["Second", "Gap fills with granulation", "Open contaminated wound"], ["Third", "Delayed closure after cleaning", "Contaminated wound closed later"]] },
  df: ["Debridement: removal of dead and contaminated tissue from a wound.", "Granulation tissue: new vascular connective tissue that fills a wound.", "Dehiscence: splitting open of a surgical wound."],
  tm: [["Eschar", "Dry scab or crust"], ["Seroma", "Collection of serum under the skin"], ["Absorbable suture", "Suture the body breaks down over time"], ["Sepsis", "Infection spreading in the body"]],
  st: ["Stop bleeding and clean the wound.", "Remove dead tissue.", "Decide on closure.", "Close without tension if suitable.", "Protect and review the wound.", "Remove skin sutures at the right time."],
  ex: ["A dog bite wound is often left open at first because bacteria are deep.", "A wound on a limb that keeps moving heals slowly without support.", "A seroma forms when dead space is left."],
  k: ["Wound classes.", "Healing phases.", "Factors delaying healing.", "Suture materials."],
  m: ["Tighter sutures do not heal better. They can cut off blood supply."],
  sa: [["Define first intention healing.", "Healing of a clean wound whose edges are brought together, with minimal scar."], ["What is debridement?", "Removal of dead and contaminated tissue from a wound."]],
  la: [["Describe the phases of wound healing and factors that delay it.", "Inflammation, proliferation, maturation, types of intention, delaying factors, how a surgeon helps."]],
  q: [["Granulation tissue is formed in the", ["Inflammatory phase only", "Proliferative phase", "Maturation phase", "None"], 1, "Proliferative phase."],
    ["Splitting of a closed wound is", ["Dehiscence", "Seroma", "Eschar", "Debridement"], 0, "Dehiscence."],
    ["Corticosteroids tend to", ["Delay healing", "Speed healing", "Cure infection", "Have no effect"], 0, "They delay healing."],
    ["Clean edges closed by suture heal by", ["First intention", "Second intention", "Third intention", "None"], 0, "First intention."]],
  f: [["Dehiscence", "Wound splits open"], ["Debridement", "Removing dead tissue"], ["Seroma", "Serum collection under skin"], ["Third intention", "Delayed closure"]],
  d: ["Study fracture healing.", "Learn about bandaging.", "Read about surgical site infection prevention."]
});
planned("surg", ["Fracture healing and fixation", "Hernias and abdominal surgery", "Ophthalmic surgery", "Orthopaedic conditions in dogs", "Lameness examination in horses", "Surgery of the digestive tract in ruminants", "Teat and udder surgery", "Anaesthetic monitoring"]);

unit("med", "Unit 2 – Systemic conditions and metabolic disease");
topic("med", "Metabolic and Production Diseases of Dairy Cattle (Concepts)", {
  o: ["Explain the idea of production diseases", "Describe milk fever, ketosis, grass tetany and downer cow in concept", "Explain why many occur around calving", "State prevention principles"],
  i: "High-yielding cows push their metabolism hard around calving. When intake and supply fall short of demand, metabolic diseases appear. These are mostly preventable with good feeding and management. Treatment must be given by a veterinarian.",
  s: "Right after calving the cow suddenly needs a lot of calcium and energy for milk, and she eats less. If the body cannot keep up, blood calcium or blood glucose falls and she becomes ill. Good dry-cow feeding and body condition prevent most cases.",
  n: [
    ["Why these diseases occur", "Production diseases result from an imbalance between nutrient intake and output in milk. Risk is highest in the transition period, from about three weeks before to three weeks after calving. They are linked: one problem makes others more likely."],
    ["Milk fever (parturient hypocalcaemia)", "Calcium in blood falls as large amounts enter colostrum. The cow shows weakness, muscle tremor, cold ears, and then lies down, often with her head turned to the flank. It is mostly seen in older, high-yielding cows soon after calving. This is an emergency. Dry cow diets and management to prepare calcium mobilisation prevent it."],
    ["Ketosis", "Negative energy balance leads to mobilisation of fat and accumulation of ketone bodies. Signs include reduced appetite, falling yield, weight loss and sometimes the smell of acetone. It is detected by ketone tests in milk or urine. Over-conditioned cows are at greater risk."],
    ["Grass tetany (hypomagnesaemia)", "Low blood magnesium after lush spring grazing causes nervousness, tremors, staggering and convulsions. It is a fast and often fatal condition."],
    ["Downer cow", "A cow that cannot rise has many possible causes, including milk fever, nerve or muscle damage during calving, mastitis and low phosphorus. Cause must be found, and good bedding and turning help prevent muscle damage."],
    ["Rumen acidosis", "Sudden or heavy grain feeding lowers rumen pH, causing digestive upset, laminitis and reduced yield. Gradual diet changes and enough fibre prevent it."],
    ["Prevention approaches", "Good dry period diet and body condition scoring, avoiding over-fat cows, balanced minerals, gradual change of feed, good feed access and comfort, monitoring feed intake and rumen fill, and early identification of cows at risk."]
  ],
  tb: { h: ["Disease", "Cause", "Typical timing", "Key sign"], r: [["Milk fever", "Low blood calcium", "Within days of calving", "Weakness, lying down"], ["Ketosis", "Negative energy balance", "First weeks of lactation", "Poor appetite, ketones"], ["Grass tetany", "Low magnesium", "Lush pasture", "Tremors, convulsions"], ["Rumen acidosis", "Too much grain", "Any time", "Dull, loose dung"]] },
  df: ["Production disease: a disease caused by a mismatch between nutrient supply and the demands of production.", "Ketosis: a disease of high ketone body levels caused by negative energy balance.", "Transition period: the period around calving when the cow changes from pregnancy to lactation."],
  tm: [["Hypocalcaemia", "Low blood calcium"], ["Hypomagnesaemia", "Low blood magnesium"], ["Ketone bodies", "Products of fat breakdown"], ["Body condition score", "Scale to judge fatness"]],
  st: ["Body condition and diet are assessed in the dry period.", "A suitable dry cow diet is fed.", "Cow calves and is watched closely.", "Early signs such as poor appetite are reported to the vet.", "The vet diagnoses and treats.", "The herd diet is reviewed."],
  ex: ["An older cow lying down a day after calving with cold ears suggests milk fever.", "A fat dry cow that eats poorly after calving is at risk of ketosis.", "Cattle moved to a lush pasture can develop tetany."],
  k: ["Transition period.", "Milk fever.", "Ketosis.", "Grass tetany.", "Prevention."],
  m: ["Metabolic diseases are not infections, but they open the door to infections."],
  sa: [["Define milk fever.", "A metabolic disease of recently calved cows due to low blood calcium."], ["What is ketosis?", "A disease from negative energy balance with raised ketone bodies."]],
  la: [["Describe the causes and prevention of metabolic diseases in dairy cows.", "Transition period, milk fever, ketosis, tetany, acidosis, diet, body condition and management."]],
  q: [["Milk fever is caused by low blood", ["Calcium", "Sodium", "Glucose", "Iron"], 0, "Calcium."],
    ["Grass tetany relates to", ["Magnesium", "Copper", "Cobalt", "Iodine"], 0, "Magnesium."],
    ["Over-conditioned dry cows risk", ["Ketosis", "Pneumonia", "Rabies", "Anthrax"], 0, "Ketosis and fatty liver."],
    ["The transition period is around", ["Calving", "Weaning", "Dipping", "Mating of heifers"], 0, "Around calving."]],
  f: [["Transition period", "Three weeks before to three weeks after calving"], ["Ketone bodies", "Fat breakdown products"], ["Hypomagnesaemia", "Low magnesium"], ["Downer cow", "Cow unable to rise"]],
  d: ["Study fatty liver in cows.", "Learn mastitis in depth.", "Read about foot disease and lameness."]
});
planned("med", ["Mastitis in detail", "Diseases of the dog and cat: an overview", "Skin diseases", "Nervous system diseases", "Diseases of poultry", "Deficiency diseases", "Diseases of the horse", "Fluid therapy and shock", "Neonatal diseases"]);

unit("ext", "Unit 2 – Communication and training");
topic("ext", "Communication, Adoption of Innovation and Participatory Methods", {
  o: ["Describe the elements of communication", "Explain the stages of adoption and categories of adopters", "Describe participatory extension methods", "Plan a simple farmer awareness activity"],
  i: "A technology that farmers do not adopt gives no benefit. Extension is the work of making sure knowledge reaches the right person in a form they understand and use.",
  s: "Communication needs a sender, a message, a channel and a receiver, and feedback. Farmers do not all adopt new ideas at the same speed. Some try quickly, many wait to see results from neighbours. A good extension worker uses demonstrations and listens as much as talks.",
  n: [
    ["Elements of communication", "Source, message, channel, receiver and feedback. Noise is anything that blocks understanding, such as language barriers or distance. Use of the local language, simple messages and visuals helps."],
    ["Adoption process", "A commonly taught model has stages: awareness, interest, evaluation, trial and adoption. A farmer may reject the idea at any stage. Rogers described adopter categories: innovators, early adopters, early majority, late majority and laggards."],
    ["Factors affecting adoption", "Relative advantage, compatibility with existing practice, simplicity, trialability and observability. Cost, risk and access to inputs also matter. Women farmers have special roles in dairy and poultry, so they need to be reached."],
    ["Extension methods", "Individual methods such as farm visits, group methods such as demonstrations, training and farmer meetings, and mass methods such as radio, television, posters and mobile messages. Method demonstration shows how to do something. Result demonstration shows the value of a practice."],
    ["Participatory approaches", "Farmers take part in identifying problems and solutions. Examples are farmer field schools, farmer interest groups, self-help groups and village-level meetings. Local knowledge is respected and combined with scientific knowledge."],
    ["Digital tools", "Mobile phones, WhatsApp groups, apps and farmer helplines can carry advice quickly, but messages must be correct and local. Verify the content with the relevant authority."],
    ["Evaluation", "Extension work is checked by measuring changes in knowledge, attitude and practice, and by looking at the outcome such as milk yield or reduced disease."]
  ],
  tb: { h: ["Method", "Type", "Example"], r: [["Farm visit", "Individual", "Advice on a sick calf"], ["Demonstration", "Group", "Preparing silage"], ["Training camp", "Group", "AI technician training"], ["Radio talk", "Mass", "Seasonal care tips"]] },
  df: ["Extension: an informal educational process that helps farmers adopt better practices.", "Adoption: the decision to use an innovation as the best course of action.", "Feedback: the receiver's response that tells the source how the message was understood."],
  tm: [["Innovator", "First to try a new idea"], ["Laggard", "Last to adopt"], ["Method demonstration", "Shows how a skill is done"], ["Result demonstration", "Shows the outcome of a practice"]],
  st: ["Find the farmers' real problem.", "Choose a simple message and method.", "Demonstrate in a local farm.", "Allow trial and answer doubts.", "Collect feedback.", "Review the results and improve."],
  ex: ["A demonstration of urea-treated straw on a village farm convinces neighbours more than a lecture.", "A self-help group learns hygienic milking together and sells good quality milk.", "A WhatsApp reminder for vaccination dates reaches farmers fast."],
  k: ["Communication elements.", "Adoption stages.", "Adopter categories.", "Extension methods.", "Participatory approaches."],
  m: ["Extension is not only lecturing. Listening and feedback are part of it."],
  sa: [["List the stages of adoption.", "Awareness, interest, evaluation, trial and adoption."], ["What is a result demonstration?", "A demonstration that shows farmers the outcome of a practice over time."]],
  la: [["Discuss the adoption process and factors that influence adoption.", "Stages, categories, characteristics of innovation, socioeconomic factors, extension role."]],
  q: [["The first adopters are called", ["Innovators", "Laggards", "Late majority", "Skeptics"], 0, "Innovators."],
    ["Radio is a", ["Mass medium", "Individual method", "Group method", "Result demonstration"], 0, "Mass method."],
    ["Anything that blocks understanding is", ["Noise", "Feedback", "Channel", "Source"], 0, "Noise."],
    ["Farmer field schools are an example of", ["Participatory approach", "Mass media", "Law", "Marketing"], 0, "Participatory extension."]],
  f: [["Noise", "Barrier to communication"], ["Trialability", "Ease of trying an innovation on a small scale"], ["Self-help group", "Small community group working together"], ["Feedback", "Response from receiver"]],
  d: ["Study the history of Indian extension.", "Learn the role of Krishi Vigyan Kendras.", "Read about gender in livestock extension."]
});
planned("ext", ["Krishi Vigyan Kendras and ATMA", "Cooperatives and dairy development", "Programme planning and evaluation", "Rural sociology and leadership", "Entrepreneurship in livestock", "Gender in livestock extension", "Audio-visual aids"]);

unit("clin", "Unit 2 – Practical procedures and ethics");
topic("clin", "Clinical Pathology Samples and Laboratory Requests", {
  o: ["List the common clinical samples and how to collect them in principle", "Explain labelling, preservation and transport", "Name common anticoagulants and their uses", "Describe how to read a laboratory report sensibly"],
  i: "A diagnosis is only as good as the sample. Poorly collected or labelled samples produce misleading results. This topic describes principles. Practical procedures are learned under supervision.",
  s: "Every sample should be fresh, enough, correctly labelled and in the right container. A good request form tells the laboratory what you suspect and what you want to know.",
  n: [
    ["Blood samples", "Whole blood is collected into tubes with an anticoagulant such as EDTA for blood counts. Heparin is used for some biochemical tests. A plain tube gives serum for biochemistry and serology. Sodium fluoride is used for glucose to stop glycolysis in the tube. Draw the correct tube first when more than one is needed, and mix gently without shaking."],
    ["Smears", "A thin blood smear is made, air dried, fixed and stained, and can show blood parasites such as Babesia or Anaplasma. A good thin smear has a feathered edge. Smears are best prepared quickly after collection."],
    ["Faeces", "Fresh faeces are collected for egg counts, flotation and culture. Samples should be kept cool and examined soon, as eggs can hatch or distort. Label with the animal and date."],
    ["Urine, skin and other samples", "Midstream or catheter urine is used for urinalysis. Skin scrapings are used for mites. Swabs go in transport medium for bacteriology. Milk samples for mastitis testing are taken aseptically after cleaning the teat end."],
    ["Tissue and post-mortem samples", "Tissues for histopathology go into 10 percent buffered formalin in a volume many times greater than the tissue. Tissues for microbiology go fresh, cool and separate. Samples must be taken as soon after death as possible."],
    ["Labelling and submission", "Label every container with the animal identity, date, sample type and owner. Complete a request with species, age, history, clinical signs, tentative diagnosis, treatments given and tests wanted. Pack leak-proof and keep cool for transport. Notifiable disease samples need special rules."],
    ["Reading the report", "Compare values with the reference range for the species. Match results with the clinical picture. Ask whether the sample quality may have influenced the result. Repeat tests when results do not fit."]
  ],
  tb: { h: ["Sample", "Container", "Used for"], r: [["Whole blood", "EDTA tube", "Haematology, blood smears"], ["Serum", "Plain tube", "Biochemistry, serology"], ["Glucose sample", "Fluoride tube", "Blood glucose"], ["Tissue", "10 percent formalin", "Histopathology"], ["Swab", "Transport medium", "Bacteriology"]] },
  df: ["Anticoagulant: a substance that prevents blood from clotting in the tube.", "Serum: the fluid left after blood clots and the clot is removed.", "Histopathology: the microscopic study of diseased tissue."],
  tm: [["EDTA", "Common anticoagulant for blood counts"], ["Transport medium", "Medium that keeps bacteria alive during transport"], ["Haemolysis", "Rupture of red cells in the sample"], ["Fixative", "Chemical that preserves tissue, for example formalin"]],
  st: ["Choose the correct container.", "Collect the sample cleanly.", "Label immediately.", "Complete the request form.", "Pack securely and keep cool.", "Send to the laboratory promptly."],
  ex: ["Blood left too long before smear preparation gives poor staining and misleading parasite results.", "A tissue sample dropped into too little formalin rots in the centre.", "A mislabelled tube can lead to a wrong result for the wrong animal."],
  k: ["Anticoagulants and tubes.", "Smear preparation.", "Tissue fixation.", "Labelling.", "Reading a report."],
  m: ["Shaking a blood tube hard causes haemolysis."],
  sa: [["Name an anticoagulant used for blood counts.", "EDTA."], ["Which fixative is used for histopathology?", "10 percent buffered formalin."]],
  la: [["Describe the collection and submission of samples for laboratory diagnosis.", "Blood, faeces, urine, skin, milk and tissues with containers, labelling, transport and request forms."]],
  q: [["Samples for histopathology go in", ["Formalin", "Water", "Saline only", "Alcohol-free tube"], 0, "10 percent buffered formalin."],
    ["Serum is collected in a", ["Plain tube", "EDTA tube", "Fluoride tube", "Formalin"], 0, "Plain tube."],
    ["Mislabelled samples can", ["Cause wrong diagnosis", "Improve results", "Be ignored", "Cure disease"], 0, "Wrong animal, wrong result."],
    ["Haemolysis means", ["Red cell rupture", "Clotting", "Infection", "Thick smear"], 0, "Rupture of red cells."]],
  f: [["EDTA", "Anticoagulant for haematology"], ["Serum", "Fluid after clotting"], ["Transport medium", "Keeps bacteria alive in transit"], ["Formalin", "Tissue fixative"]],
  d: ["Study urinalysis.", "Learn cytology of fine needle aspirates.", "Read about quality control in laboratories."]
});
planned("clin", ["Urinalysis", "Cytology and fine needle aspirates", "Clinical examination of the horse", "Clinical examination of poultry", "Emergency first aid for animals", "Medical records and certificates", "Professional ethics and law", "Case presentation skills"]);

unit("farm", "Unit 2 – Animal health and economics on the farm");
topic("farm", "Farm Economics, Costs and Record Keeping", {
  o: ["Define fixed and variable costs", "Calculate simple gross margin and cost per litre", "Describe useful farm records", "Identify where profit is lost on a dairy farm"],
  i: "A farm can be well managed biologically and still lose money. Veterinarians who understand costs give advice that farmers can afford and will follow.",
  s: "Costs that continue whether or not you produce, such as the shed, are fixed. Costs that change with production, such as feed, are variable. Feed is usually the biggest cost. If the income from milk is more than the costs, there is a profit.",
  n: [
    ["Fixed and variable costs", "Fixed costs include buildings, equipment depreciation, interest on capital and permanent labour. Variable costs include feed, veterinary care, medicines, breeding, electricity and casual labour. Feed commonly makes up well over half of the cost of producing milk."],
    ["Gross margin and profit", "Gross margin is the income minus the variable costs. Net profit is the income minus all costs. Cost of production per litre is total cost divided by litres. A farm may show a margin but still fail to cover fixed costs."],
    ["A simple illustration", "Suppose a farm sells 10,000 litres in a month for 300,000 rupees, spends 180,000 on feed and other variable costs and 60,000 on fixed costs. The gross margin is 120,000, the net profit 60,000 and cost per litre is 24 rupees. These figures are only to show the method."],
    ["Useful records", "Daily milk yield, feed use, breeding and calving dates, health treatments, vaccination and deworming, mortality, weights and growth, and financial accounts. Records show problems early, for example a fall in yield may signal mastitis."],
    ["Key performance indicators", "Calving interval, age at first calving, conception rate, milk per cow per day, feed cost per litre, calf mortality and culling rate. Compare with targets to see where to improve."],
    ["Where money is lost", "Long calving intervals, undetected mastitis, poor feeding, high calf mortality, unproductive animals kept too long and avoidable disease. The veterinary role is to reduce these losses with prevention."],
    ["Insurance and credit", "Livestock insurance and credit schemes exist in India for farmers. Terms change, so check current details with the bank or the Department of Animal Husbandry."]
  ],
  tb: { h: ["Cost type", "Examples"], r: [["Fixed", "Shed, equipment depreciation, interest, permanent labour"], ["Variable", "Feed, medicines, AI, electricity, casual labour"]] },
  df: ["Gross margin: income minus variable costs.", "Cost of production: total expenditure divided by the quantity produced.", "Depreciation: the fall in value of an asset over time through use."],
  tm: [["Calving interval", "Days between successive calvings"], ["Culling", "Removing animals from the herd"], ["Break-even", "Point where income equals cost"], ["KPI", "Key performance indicator"]],
  st: ["List all costs for the period.", "Separate fixed and variable costs.", "Total the income.", "Compute gross margin and net profit.", "Compute cost per litre.", "Find the largest cost and the weakest indicator."],
  ex: ["A farm with long calving intervals loses income every extra day open.", "Good records showed that low-yielding cows were costing more than they earned.", "A cheaper but poorer feed can reduce yield and lose money."],
  k: ["Fixed and variable costs.", "Gross margin.", "Cost per litre.", "Records and KPIs.", "Losses."],
  m: ["Cheap feed is not always cheap production. Yield matters."],
  sa: [["Define gross margin.", "Income minus variable costs."], ["Name two fixed costs on a dairy farm.", "Shed or building cost and equipment depreciation."]],
  la: [["Explain the importance of record keeping on a dairy farm.", "Types of records, KPIs, use for decisions, early detection of problems, economics, health."]],
  q: [["Feed is usually a", ["Variable cost", "Fixed cost", "Tax", "Subsidy"], 0, "Variable cost, and the largest."],
    ["Gross margin equals income minus", ["Variable costs", "Fixed costs", "Tax", "Depreciation"], 0, "Variable costs."],
    ["Calving interval is measured in", ["Days", "Litres", "Rupees", "Kilograms"], 0, "Days."],
    ["Depreciation is", ["Fall in value of assets", "Income", "Profit", "Loan"], 0, "Gradual fall in asset value."]],
  f: [["Cost per litre", "Total cost divided by litres"], ["Gross margin", "Income minus variable cost"], ["Calving interval", "Days between calvings"], ["Break-even", "Income equals costs"]],
  d: ["Practise making a simple budget for a 10-cow dairy.", "Learn about project reports for bank loans.", "Study livestock insurance."]
});
planned("farm", ["Biosecurity audits", "Waste and manure management", "Project report writing", "Fodder cultivation calendar", "Poultry farm economics", "Feed formulation practice", "Marketing of livestock products"]);

unit("nutr", "Unit 2 – Ration formulation and feed quality");
topic("nutr", "Ration Formulation: Concepts and a Worked Example", {
  o: ["State the aims of ration formulation", "Explain the Pearson square method", "Calculate a simple ration step by step", "List common nutrient requirement terms"],
  i: "A ration is the amount of feed an animal receives in 24 hours. A balanced ration supplies all nutrients in correct proportion at lowest cost. Exact requirements come from feeding standards, so the worked example shows the method only.",
  s: "To make a ration you need to know what the animal needs, what each feed contains and then mix feeds so the total meets the need. One quick way to mix two feeds to a target protein level is the Pearson square.",
  n: [
    ["Terms", "Maintenance ration keeps the animal alive without gain or production. Production ration adds the needs for milk, growth, pregnancy or work. A balanced ration meets all nutrient needs. Roughage includes fodder, hay and straw. Concentrates are energy or protein rich feeds. Dry matter intake is the key measure of how much an animal can eat."],
    ["Steps of formulation", "1. Find the animal's requirements from feeding standards. 2. Calculate the roughage portion first, keeping roughage the base for ruminants. 3. Estimate what the roughage supplies. 4. Fill the gap using a concentrate mixture. 5. Check minerals and vitamins. 6. Check cost and palatability."],
    ["Pearson square method", "To mix two feeds to a target crude protein: draw a square, write the target in the centre, the protein percentage of feed A at one top corner and feed B at the opposite bottom corner. Subtract diagonally, the smaller from the larger, ignoring signs. The differences are the parts of each feed."],
    ["Worked example", "A target of 20 percent crude protein is wanted from maize (9 percent CP) and soybean meal (45 percent CP). Parts of maize = 45 minus 20 = 25. Parts of soybean meal = 20 minus 9 = 11. Total parts = 36. So the mixture is 25/36 = about 69 percent maize and 11/36 = about 31 percent soybean meal. Check: 0.69 x 9 + 0.31 x 45 = 6.2 + 14.0 = 20.2, close to 20. The mixture is based on crude protein only. Energy, minerals and fibre must be checked too."],
    ["Dry matter basis", "Feeds contain different amounts of water, so compare them on a dry matter basis. Fresh green fodder may be 80 percent water, hay about 10 percent. To convert, divide the nutrient value by the dry matter fraction."],
    ["Practical points", "Make changes in feed gradually. Provide clean water always. Use locally available feeds to keep cost low. Adding urea or by-pass protein requires care and professional advice. Sample feeds for analysis when quality varies."]
  ],
  tb: { h: ["Feed", "Crude protein (typical approx.)", "Type"], r: [["Maize grain", "9 percent", "Energy concentrate"], ["Soybean meal", "45 percent", "Protein concentrate"], ["Wheat straw", "3 to 4 percent", "Poor roughage"], ["Green berseem", "17 to 20 percent of dry matter", "Legume fodder"]] },
  df: ["Ration: the total feed given to an animal in a day.", "Balanced ration: a ration that supplies all needed nutrients in the right proportions.", "Dry matter: what remains of a feed after the water is removed."],
  tm: [["Maintenance", "Needs for body upkeep only"], ["Roughage", "Bulky fibrous feed"], ["Concentrate", "Energy or protein dense feed"], ["DMI", "Dry matter intake"]],
  st: ["Choose the target nutrient level.", "Select two feeds, one above and one below the target.", "Draw the square with the target in the centre.", "Subtract diagonally.", "Add the parts and convert to percentages.", "Check the result by calculation."],
  ex: ["A calf starter must be higher in protein than a maintenance ration.", "Wheat straw alone cannot meet protein needs, so it is supplemented.", "Using a local by-product can reduce ration cost."],
  k: ["Ration terms.", "Steps of formulation.", "Pearson square.", "Dry matter basis."],
  m: ["A ration on paper must still be palatable and available."],
  sa: [["What is a balanced ration?", "A ration that supplies all required nutrients in the right proportions."], ["What is the Pearson square used for?", "To mix two feeds to reach a target nutrient percentage."]],
  la: [["Describe the steps in formulating a ration for a dairy cow.", "Requirements, roughage first, estimate supply, fill gap with concentrate, minerals and vitamins, check cost and palatability."]],
  q: [["In the Pearson square the target is placed", ["In the centre", "At a corner", "Outside", "Below"], 0, "Centre."],
    ["Roughage is usually", ["Bulky and fibrous", "Pure protein", "Liquid", "Mineral"], 0, "Bulky, fibrous."],
    ["For ruminants, formulation starts with", ["Roughage", "Mineral mix", "Urea", "Molasses"], 0, "Roughage forms the base."],
    ["Dry matter basis helps to", ["Compare feeds fairly", "Remove protein", "Cook feed", "Find cost"], 0, "Compare feeds without water difference."]],
  f: [["Pearson square", "Method for mixing two feeds to a target level"], ["Maintenance ration", "Keeps animal alive without production"], ["DMI", "Dry matter intake"], ["Roughage", "Fibrous bulky feed"]],
  d: ["Try your own examples using two feeds.", "Learn about least cost formulation.", "Study feeding standards."]
});
planned("nutr", ["Feeding standards and requirements", "Least cost ration formulation", "Feed additives and probiotics", "Nutrition of horses and dogs", "Feed toxins: aflatoxin and others", "Pasture management", "Complete feed and TMR"]);
/* ================= ANATOMY (wave 3) ================= */
unit("anat", "Unit 5 – Sense organs, glands and lymphoid organs");
topic("anat", "The Eye and the Ear", {
  o: ["Name the layers and parts of the eyeball", "Describe the eyelids, third eyelid and lacrimal apparatus", "Explain the structure of the ear in three parts", "Compare eye and ear features of domestic species"],
  i: "Eye and ear problems are among the commonest in small and large animal practice. A clinician can examine only what he or she can name, so a clear map of both organs comes first.",
  s: "The eyeball is a ball with three layers: a tough outer coat, a middle coat full of blood vessels and an inner coat, the retina, which senses light. The ear has an outer part that collects sound, a middle part with three tiny bones and an inner part that senses sound and balance.",
  n: [
    ["Three tunics of the eyeball", "The outer fibrous tunic is the white sclera and the clear cornea at the front. The middle vascular tunic (uvea) has the choroid, the ciliary body and the iris. The inner nervous tunic is the retina. The retina has rods for dim light and cones for colour and detail. The optic nerve leaves at the optic disc, which has no receptors."],
    ["Contents and chambers", "The lens sits behind the iris and is held by the ciliary body through zonular fibres. The anterior chamber (between cornea and iris) and posterior chamber (between iris and lens) contain aqueous humour, which is produced by the ciliary body and drains at the angle between cornea and iris. The large vitreous chamber behind the lens holds the jelly-like vitreous body. Blocked aqueous drainage raises eye pressure, which is glaucoma."],
    ["Tapetum lucidum and pupil shape", "Most domestic animals have a tapetum lucidum, a reflective layer in the choroid that gives eyeshine in the dark. The pig lacks it. Ruminants and horses have a fibrous tapetum, and carnivores a cellular one. The pupil is a horizontal oval in ruminants and the horse, round in dog and pig, and a vertical slit in the cat. Small dark nodules on the upper pupil edge in the horse and ruminants are the corpora nigra."],
    ["Eyelids, third eyelid and lacrimal apparatus", "There are an upper and a lower eyelid, lined by conjunctiva. The third eyelid (nictitating membrane) lies in the medial corner. In the dog it carries a gland, whose prolapse is called cherry eye. Tears from the lacrimal gland spread over the eye and drain through the puncta, canaliculi, lacrimal sac and the nasolacrimal duct into the nose. A blocked duct causes a wet face."],
    ["Extraocular muscles", "Four rectus muscles and two oblique muscles turn the eye. Most domestic animals also have a retractor bulbi muscle that pulls the eye into the socket. The levator palpebrae raises the upper lid. Cranial nerves III, IV and VI supply the muscles, so loss of eye movement points to nerve damage."],
    ["External ear", "The pinna collects sound. The ear canal in dogs has a vertical part and a horizontal part, an L-shape that traps wax and water, which is why drop-eared dogs get otitis externa more often. The tympanic membrane (eardrum) closes the canal."],
    ["Middle and inner ear", "The middle ear lies in the tympanic bulla and contains three ossicles, the malleus, incus and stapes, which pass vibrations to the inner ear. The auditory (Eustachian) tube joins the middle ear to the pharynx. In the horse a large diverticulum of this tube forms the guttural pouch, a site of fungal and bacterial infection. The inner ear has the cochlea for hearing and the vestibule and semicircular canals for balance. Cranial nerve VIII carries both signals."]
  ],
  tb: { h: ["Feature", "Cattle and horse", "Dog", "Cat", "Pig"], r: [["Pupil", "Horizontal oval", "Round", "Vertical slit", "Round"], ["Tapetum lucidum", "Fibrous", "Cellular", "Cellular", "Absent"], ["Special ear feature", "Horse: guttural pouch", "L-shaped canal", "Short canal", "Large pinna in many breeds"]] },
  df: ["Uvea: the vascular middle tunic of the eye made of choroid, ciliary body and iris.", "Tapetum lucidum: a reflective layer in the choroid that improves night vision.", "Nasolacrimal duct: the duct that carries tears from the eye to the nasal cavity."],
  tm: [["Cornea", "Clear front window of the eye"], ["Sclera", "White fibrous outer coat"], ["Aqueous humour", "Fluid in the anterior and posterior chambers"], ["Ossicles", "Malleus, incus and stapes"], ["Cochlea", "Coiled organ of hearing"], ["Guttural pouch", "Horse diverticulum of the auditory tube"]],
  st: ["Light passes through the cornea and aqueous humour.", "The iris sets the size of the pupil.", "The lens focuses the light.", "Light crosses the vitreous to the retina.", "Rods and cones send signals through the optic nerve to the brain."],
  ex: ["A blue-white cloudy cornea can follow injury or infection and is checked at once.", "A dog with a red mass at the medial corner of the eye is likely to have a prolapsed third eyelid gland.", "A horse with nasal discharge and swelling behind the jaw may have guttural pouch disease."],
  k: ["Three tunics and their parts.", "Chambers and humours.", "Tapetum and pupil shape in species.", "Lacrimal apparatus.", "Parts of the ear.", "Guttural pouch."],
  m: ["Eyeshine comes from the tapetum reflecting light. It is not the eye producing light.", "The pig has no tapetum."],
  sa: [["Name the layers of the eyeball.", "Fibrous tunic (sclera and cornea), vascular tunic (choroid, ciliary body, iris) and nervous tunic (retina)."], ["What is the guttural pouch?", "A diverticulum of the auditory tube in the horse."]],
  la: [["Describe the structure of the eyeball with a labelled diagram.", "Three tunics, lens, chambers, aqueous and vitreous humours, optic nerve and disc, tapetum, with a labelled sketch."]],
  q: [["The reflective layer behind the retina is the", ["Tapetum lucidum", "Sclera", "Cornea", "Iris"], 0, "Tapetum lucidum."],
    ["The guttural pouch is found in the", ["Dog", "Horse", "Pig", "Hen"], 1, "Horse."],
    ["The pupil of the cat is", ["Vertical slit", "Horizontal oval", "Round", "Absent"], 0, "Vertical slit."],
    ["Aqueous humour is produced by the", ["Ciliary body", "Lens", "Retina", "Cornea"], 0, "Ciliary body."],
    ["Which ossicle contacts the oval window?", ["Malleus", "Incus", "Stapes", "Cochlea"], 2, "The stapes."]],
  f: [["Rods", "Retinal cells for dim light"], ["Corpora nigra", "Dark nodules on the upper pupil edge in horse and ruminants"], ["Cherry eye", "Prolapse of the third eyelid gland"], ["Otitis externa", "Inflammation of the external ear canal"]],
  d: ["Learn the cranial nerves of the eye.", "Study the ophthalmic examination.", "Compare the eye in birds."]
});

topic("anat", "Endocrine Glands: Position and Structure", {
  o: ["Locate the major endocrine glands in domestic animals", "State what each gland secretes", "Link gland structure to function", "Explain the pituitary-hypothalamus connection"],
  i: "Endocrine glands release hormones directly into the blood. Their position and structure explain examination findings and the effect of disease or surgery.",
  s: "Endocrine glands have no ducts. The pituitary sits under the brain and controls many other glands. The thyroid lies by the windpipe, the adrenals lie near the kidneys, and the pancreas has small islands of hormone cells among its digestive tissue.",
  n: [
    ["Pituitary gland (hypophysis)", "It lies in a bony hollow at the base of the skull (hypophyseal fossa) and hangs from the hypothalamus. The anterior lobe (adenohypophysis) makes growth hormone, prolactin, ACTH, TSH, FSH and LH. The posterior lobe (neurohypophysis) stores and releases oxytocin and ADH made in the hypothalamus. The hypothalamus controls the anterior lobe through a portal blood system."],
    ["Thyroid and parathyroid", "The thyroid has two lobes on either side of the trachea near the larynx in most species. It stores thyroid hormones in follicles filled with colloid. Parafollicular (C) cells make calcitonin. The parathyroid glands, small and often several, lie near or inside the thyroid and secrete parathyroid hormone, which raises blood calcium."],
    ["Adrenal glands", "They lie near the cranial pole of each kidney. The cortex has three zones: glomerulosa (aldosterone), fasciculata (cortisol) and reticularis (sex steroids). The medulla is derived from nerve tissue and releases adrenaline and noradrenaline."],
    ["Endocrine pancreas", "The islets of Langerhans are scattered among exocrine acini. Alpha cells secrete glucagon, beta cells insulin and delta cells somatostatin. Destruction of beta cells or poor insulin action gives diabetes mellitus."],
    ["Pineal, gonads, placenta", "The pineal gland, on the roof of the diencephalon, secretes melatonin, which carries day-length information and is important in seasonal breeders. The testes (Leydig cells) make testosterone and the ovaries make oestrogen and progesterone. The placenta also secretes hormones in pregnancy."],
    ["Hypothalamic control", "The hypothalamus links the nervous and endocrine systems. Releasing hormones such as GnRH travel through the portal vessels to the anterior pituitary, which then releases trophic hormones that act on target glands. Hormone levels are controlled by negative feedback."],
    ["Clinical relevance", "An enlarged thyroid is a goitre, which can come from iodine deficiency. Excess cortisol causes Cushing's disease, seen in dogs and horses. Low blood calcium after calving can relate to parathyroid response. Diseases of these glands often show as changes in coat, weight, drinking and behaviour."]
  ],
  tb: { h: ["Gland", "Position", "Main hormones"], r: [["Pituitary", "Base of the skull under the hypothalamus", "GH, prolactin, ACTH, TSH, FSH, LH, oxytocin, ADH"], ["Thyroid", "Either side of the trachea near the larynx", "T3, T4, calcitonin"], ["Parathyroid", "Near or in the thyroid", "PTH"], ["Adrenal", "Cranial to the kidney", "Cortisol, aldosterone, adrenaline"], ["Pancreatic islets", "Inside the pancreas", "Insulin, glucagon"], ["Pineal", "Roof of the diencephalon", "Melatonin"]] },
  df: ["Endocrine gland: a ductless gland that releases hormones into the blood.", "Hormone: a chemical messenger produced by a gland that acts on target cells.", "Portal system: a set of vessels that carry blood between two capillary beds, as between hypothalamus and anterior pituitary."],
  tm: [["Adenohypophysis", "Anterior pituitary"], ["Neurohypophysis", "Posterior pituitary"], ["Colloid", "Protein material stored in thyroid follicles"], ["Islets of Langerhans", "Endocrine clusters in the pancreas"], ["Goitre", "Enlargement of the thyroid"]],
  st: ["The hypothalamus senses a need.", "It releases a hormone to the portal vessels.", "The anterior pituitary is stimulated.", "A trophic hormone reaches the target gland.", "The target gland releases its hormone, which feeds back on the hypothalamus."],
  ex: ["Calves born to iodine-deficient dams may have enlarged thyroids.", "A dog with a pot belly, hair loss and heavy drinking may have excess cortisol.", "Removing the testes lowers testosterone and changes behaviour."],
  k: ["Position of each gland.", "Anterior vs posterior pituitary.", "Zones of the adrenal cortex.", "Hormones of the islets.", "Hypothalamic control."],
  m: ["The posterior pituitary does not make oxytocin. It stores and releases it."],
  sa: [["Name the hormones stored in the neurohypophysis.", "Oxytocin and antidiuretic hormone (ADH)."], ["Which cells make insulin?", "Beta cells of the islets of Langerhans."]],
  la: [["Describe the position, structure and secretions of the adrenal gland.", "Position near the kidney, cortex zones with hormones, medulla and its hormones, control and clinical links."]],
  q: [["Calcitonin is made by", ["Parafollicular cells", "Chief cells", "Alpha cells", "Leydig cells"], 0, "Parafollicular (C) cells of the thyroid."],
    ["The adrenal zone that makes cortisol is the", ["Glomerulosa", "Fasciculata", "Reticularis", "Medulla"], 1, "Zona fasciculata."],
    ["Glucagon is secreted by", ["Alpha cells", "Beta cells", "Delta cells", "Acinar cells"], 0, "Alpha cells."],
    ["The pituitary lies in the", ["Hypophyseal fossa", "Orbit", "Tympanic bulla", "Nasal cavity"], 0, "Hypophyseal fossa."],
    ["The pineal gland secretes", ["Melatonin", "Insulin", "Cortisol", "Thyroxine"], 0, "Melatonin."]],
  f: [["Adenohypophysis", "Anterior pituitary"], ["Zona glomerulosa", "Adrenal zone making aldosterone"], ["Goitre", "Enlarged thyroid"], ["Portal system", "Two capillary beds joined by veins"]],
  d: ["Study the histology of endocrine glands.", "Learn the feedback loops of the thyroid and adrenal axes.", "Read about diabetes in dogs and cats."]
});

topic("anat", "Lymphatic System, Lymph Nodes and Spleen", {
  o: ["Describe the lymphatic vessels and the thoracic duct", "Describe the structure and function of a lymph node", "Name the lymph nodes that can be palpated", "Explain the structure and role of the spleen"],
  i: "The lymphatic system returns tissue fluid to the blood and fights infection. Lymph nodes are routinely felt in clinical examination, and swollen nodes point to disease in the area they drain.",
  s: "Fluid that leaks from blood vessels into tissues is collected by thin lymph vessels and passes through lymph nodes, which filter it, before it returns to the blood. The spleen filters the blood in a similar way and stores red cells.",
  n: [
    ["Lymph vessels", "Lymph capillaries begin blindly in tissues and join to form larger vessels with valves. Lymph flows one way, helped by muscle movement. Lacteals in the intestinal villi carry absorbed fat. All lymph finally reaches the venous system through the thoracic duct and right lymphatic duct. The thoracic duct begins at the cisterna chyli in the abdomen near the aorta."],
    ["Lymph node structure", "A lymph node is bean shaped with a capsule. Afferent vessels bring lymph into the subcapsular sinus, and an efferent vessel leaves at the hilus. The outer cortex has follicles rich in B cells. The paracortex holds T cells. The medulla has cords and sinuses with plasma cells and macrophages. In the pig the arrangement is reversed, with the cortex deep and the medulla outside."],
    ["Palpable lymph nodes", "Nodes examined in the clinic include the mandibular, parotid, retropharyngeal (usually not palpable when normal), superficial cervical (prescapular), prefemoral (subiliac), popliteal, superficial inguinal (or supramammary in females). Always compare both sides and note size, firmness, pain and mobility."],
    ["Spleen", "The spleen lies on the left side of the abdomen. In ruminants it is flat and attached to the rumen. In the horse it is a large sickle-shaped organ held by the nephrosplenic ligament. In dogs it is long, tongue-like and mobile. Its red pulp filters blood, removes old red cells and stores blood. The white pulp, made of lymphoid tissue around arteries, mounts immune responses."],
    ["Thymus, tonsils and others", "The thymus is large in the young, in the neck and cranial chest, and shrinks with age. T cells mature there. Tonsils guard the throat. Mucosa-associated lymphoid tissue (MALT) such as Peyer's patches in the gut is part of mucosal defence."],
    ["Clinical links", "Enlarged nodes can mean infection, such as in tuberculosis or strangles in the horse, or cancer such as lymphoma. Splenic torsion in dogs and nephrosplenic entrapment of the large colon in horses are examples of spleen-related emergencies. Removal of the spleen is possible but needs a vet."]
  ],
  tb: { h: ["Node", "Area drained", "Where found"], r: [["Mandibular", "Head, mouth", "Under the jaw"], ["Superficial cervical (prescapular)", "Neck, shoulder, forelimb", "In front of the shoulder"], ["Prefemoral (subiliac)", "Flank, stifle, hind limb", "In front of the stifle fold"], ["Popliteal", "Lower hind limb", "Behind the stifle"], ["Supramammary", "Udder", "Behind the udder"]] },
  df: ["Lymph: the clear fluid that circulates in lymphatic vessels, formed from tissue fluid.", "Lymph node: an organ that filters lymph and houses immune cells.", "Cisterna chyli: the dilated beginning of the thoracic duct in the abdomen."],
  tm: [["Afferent vessel", "Vessel bringing lymph to a node"], ["Efferent vessel", "Vessel taking lymph away"], ["Red pulp", "Blood-filtering tissue of the spleen"], ["White pulp", "Lymphoid tissue of the spleen"], ["Lacteal", "Lymph capillary in an intestinal villus"]],
  st: ["Tissue fluid enters lymph capillaries.", "Lymph moves through vessels with valves.", "It is filtered in one or more lymph nodes.", "It collects in the thoracic duct.", "It empties into a large vein near the heart."],
  ex: ["Swollen mandibular nodes in a calf can follow a mouth or throat infection.", "Enlarged prescapular nodes in cattle may point to disease in the neck or forelimb area.", "A fast growing mass and enlarged nodes in an older dog should be investigated."],
  k: ["Lymph vessels and drainage.", "Structure of a node.", "Palpable nodes.", "Spleen structure and functions."],
  m: ["Lymph nodes are not glands that make lymph. They filter it."],
  sa: [["What is the function of the spleen?", "Filters blood, removes old red cells, stores blood and helps in immune responses."], ["Where does the thoracic duct begin?", "At the cisterna chyli in the abdomen."]],
  la: [["Describe the structure and functions of a lymph node.", "Capsule, cortex, paracortex, medulla, afferent and efferent vessels, filtering and immune functions, species difference in the pig."]],
  q: [["In the pig the lymph node cortex is", ["Outside", "Deep", "Absent", "Fused with the medulla"], 1, "The arrangement is inverted."],
    ["T cells mature in the", ["Thymus", "Spleen", "Liver", "Kidney"], 0, "Thymus."],
    ["The nephrosplenic ligament is described in the", ["Horse", "Dog", "Hen", "Cat"], 0, "Horse."],
    ["Lymph reaches the blood through the", ["Thoracic duct", "Portal vein", "Aorta", "Ureter"], 0, "Thoracic duct and right lymphatic duct."]],
  f: [["Lacteal", "Lymph capillary in the villus"], ["Red pulp", "Filters blood in the spleen"], ["MALT", "Mucosa-associated lymphoid tissue"], ["Efferent vessel", "Leaves the node at the hilus"]],
  d: ["Study the immune cells of the lymph node.", "Learn the palpation of nodes in each species.", "Read about the bursa and lymphoid organs of birds."]
});

topic("anat", "Hoof, Claw and Horn: Structure and Clinical Importance", {
  o: ["Describe the parts of the equine hoof", "Describe the structure of the bovine claw", "Compare the claws of dog and cat", "Link hoof and claw anatomy to lameness"],
  i: "The foot carries the entire weight of the animal. Lameness from foot disease is a leading cause of production loss in dairy cattle and a common problem in horses.",
  s: "A hoof is a thick horn shell around the last bone of the toe. The shell grows continuously from the top and wears away at the bottom. If it is too long, uneven or damaged, the animal goes lame.",
  n: [
    ["Equine hoof: horn parts", "The hoof wall grows from the coronary band. Its three layers are the outer stratum externum, the thick middle layer and the inner laminar layer. The sole covers the bottom, the frog is the V-shaped elastic pad that helps shock absorption and blood circulation, and the bars are folds of the wall. The white line is the junction of wall and sole and is a landmark for shoeing and a weak point where infection can enter."],
    ["Equine hoof: sensitive parts", "Beneath the horn lie the sensitive laminae, which interlock with the horn laminae and join the hoof wall to the coffin bone. The corium supplies blood and makes the horn. The digital cushion at the heel acts as a shock absorber. The coffin bone, navicular bone and the deep digital flexor tendon lie inside the hoof."],
    ["Laminitis", "Laminitis is inflammation of the sensitive laminae. It can follow grain overload, retained afterbirth or heavy weight bearing. The laminae weaken, the coffin bone can rotate or sink, and the horse stands with a typical rocking posture. It is an emergency. Rotation can be seen on a radiograph."],
    ["Hoof growth and trimming", "The wall grows continuously, roughly in the order of a centimetre a month, which varies with age, nutrition and season. Regular trimming keeps the correct balance of the foot, and a farrier works with the veterinarian in managing foot problems."],
    ["Bovine claw", "Cattle have two weight-bearing claws on each foot, with two dewclaws behind. Each claw has a wall, a sole, a heel bulb and a white line. The hind lateral claw bears more weight and is the most common site of sole ulcers and white line disease. Hard wet floors, long standing, poor claw trimming and acidosis all raise the risk of lameness."],
    ["Dog and cat claws", "A claw grows from the ungual crest of the last phalanx. The nail contains the quick, which has blood vessels and nerves. In cats the claws retract because elastic ligaments on the dorsal side pull the last phalanx back. Dewclaws are the first digit."],
    ["Horn", "The horn of cattle is a sheath of keratin over a bony core that grows from the frontal bone and contains an extension of the frontal sinus. The horn grows continuously, and rings on the horn are used in rough age estimation, but they are affected by nutrition and pregnancy."]
  ],
  tb: { h: ["Species", "Foot structure", "Common problems"], r: [["Horse", "One hoof, frog, laminae", "Laminitis, navicular disease, abscess"], ["Cattle", "Two claws", "Sole ulcer, white line disease, digital dermatitis"], ["Dog", "Four weight-bearing digits, claws", "Overgrown or torn claws"], ["Cat", "Retractile claws", "Ingrown claws in old cats"]] },
  df: ["Laminitis: inflammation of the sensitive laminae of the hoof.", "White line: the junction between the sole and the wall of the hoof or claw.", "Quick: the live, sensitive tissue inside a claw."],
  tm: [["Coronary band", "Region at the top of the hoof where the wall grows"], ["Frog", "Elastic V-shaped pad of the sole"], ["Corium", "Vascular tissue that makes horn"], ["Dewclaw", "Small accessory digit"], ["Ungual crest", "Bony ridge of the last phalanx that makes the claw"]],
  st: ["Wash and look at the foot.", "Compare it with the opposite foot.", "Check the wall, sole and white line for cracks or heat.", "Check the digital pulse and any swelling.", "Refer to a vet or farrier for trimming or treatment."],
  ex: ["A dairy cow on hard wet floors with a sole ulcer on the lateral hind claw is a typical case.", "A horse standing with the front feet stretched forward may have laminitis.", "A cat that cannot retract a claw may have an injured elastic ligament."],
  k: ["Parts of the hoof wall and sole.", "Sensitive structures.", "Laminitis.", "Bovine claw lesions.", "Claws of dog and cat."],
  m: ["The frog is not decorative. It helps with shock absorption and blood flow."],
  sa: [["What is the white line?", "The junction between the hoof wall and the sole."], ["Which claw is most commonly affected by sole ulcers?", "The lateral claw of the hind foot."]],
  la: [["Describe the structure of the equine hoof and add a note on laminitis.", "Wall layers, sole, frog, bars, laminae, corium, digital cushion, bones inside, causes and signs of laminitis."]],
  q: [["The wall of the hoof grows from the", ["Coronary band", "Frog", "Sole", "Bars"], 0, "Coronary band."],
    ["Cattle usually have how many weight-bearing claws on a foot?", ["One", "Two", "Three", "Four"], 1, "Two."],
    ["Retractile claws are a feature of the", ["Cat", "Dog", "Pig", "Horse"], 0, "Cat."],
    ["Laminitis affects the", ["Sensitive laminae", "Frog only", "Bars only", "Horn core"], 0, "Sensitive laminae."]],
  f: [["Quick", "Living core of a claw"], ["Digital cushion", "Shock absorber at the heel"], ["White line", "Wall to sole junction"], ["Laminitis", "Inflamed hoof laminae"]],
  d: ["Study the lameness examination.", "Learn about digital dermatitis in cattle.", "Read about hoof balance and farriery."]
});

topic("anat", "General Embryology and Fetal Membranes", {
  o: ["Describe fertilisation, cleavage and the formation of germ layers", "State the derivatives of the three germ layers", "Describe the four fetal membranes", "Classify placentae and link the type with immunity at birth"],
  i: "Embryology explains how a single cell becomes an animal, and why some abnormalities arise. Placental type determines whether antibodies reach the fetus before birth, which is the reason colostrum matters.",
  s: "After fertilisation the cell divides again and again to make a ball of cells, which folds into three layers. Each layer forms certain organs. The fetus is surrounded by membranes that protect it and feed it through the placenta. In cows, horses and pigs the placenta does not pass antibodies, so the newborn must drink colostrum.",
  n: [
    ["Early development", "Fertilisation produces a zygote, usually in the oviduct. The zygote divides by cleavage into a morula, a solid ball of cells, and then a blastocyst with an outer trophoblast and an inner cell mass. The blastocyst reaches the uterus and attaches (implantation). In ruminants and the horse attachment is delayed."],
    ["Germ layers", "Gastrulation produces three layers. Ectoderm forms skin, hair, nervous system and sense organs. Mesoderm forms muscle, bone, blood, heart, kidneys and gonads. Endoderm forms the lining of the gut and respiratory tract, and the liver and pancreas."],
    ["Fetal membranes", "The amnion surrounds the fetus and forms the amniotic sac filled with fluid that cushions the fetus. The chorion is the outermost membrane and contacts the uterus. The allantois collects urinary wastes and fuses with the chorion to form the chorioallantois, the main placental membrane. The yolk sac is important early on and shrinks later."],
    ["Placenta by shape", "Diffuse (horse, pig): villi cover the whole chorion. Cotyledonary (ruminants): the villous cotyledons of the fetus join the maternal caruncles to form placentomes. Zonary (dog, cat): a band around the fetus. Discoid (primates, rodents): a disc."],
    ["Placenta by tissue layers", "Epithelio-chorial placentae (horse, pig) keep all layers of the barrier. Ruminants have a modified form (synepitheliochorial). Carnivores have an endothelio-chorial placenta. Primates and rodents have a haemochorial type. Large antibody molecules do not cross in the epitheliochorial types, so these species rely on colostrum, while in primates some antibodies cross the placenta."],
    ["Fetal fluids and birth", "Amniotic and allantoic fluids are released at birth. The hippomane, a small floating mass in the horse's allantoic fluid, is a normal finding. Abnormal accumulation of fluid, such as hydrallantois in cattle, is a clinical problem."],
    ["Developmental anomalies", "Examples include cleft palate, hernias, absent or fused organs, and conjoined twins. Freemartinism results from vascular fusion between co-twins of different sex in cattle."]
  ],
  tb: { h: ["Species", "Placenta shape", "Placenta layers", "Antibodies across placenta?"], r: [["Horse", "Diffuse", "Epitheliochorial", "No"], ["Pig", "Diffuse", "Epitheliochorial", "No"], ["Cattle, sheep, goat", "Cotyledonary", "Synepitheliochorial", "No"], ["Dog, cat", "Zonary", "Endotheliochorial", "Little"], ["Human, rodents", "Discoid", "Haemochorial", "Yes"]] },
  df: ["Zygote: the cell formed by the union of sperm and ovum.", "Placenta: the organ in which fetal and maternal tissues are in contact for exchange.", "Placentome: the functional unit of the ruminant placenta, a cotyledon joined to a caruncle."],
  tm: [["Morula", "Solid ball of early embryonic cells"], ["Blastocyst", "Hollow stage with a trophoblast and inner cell mass"], ["Trophoblast", "Outer layer that forms the chorion"], ["Caruncle", "Maternal part of the placentome"], ["Hippomane", "Floating mass in the equine allantoic fluid"]],
  st: ["Sperm fertilises the ovum.", "The zygote cleaves into a morula.", "A blastocyst forms.", "The embryo implants in the uterus.", "Three germ layers form.", "Fetal membranes and placenta develop."],
  ex: ["A calf that did not drink colostrum has very low antibody levels because the placenta passed none.", "A retained placenta in the cow can be due to failure of placentomes to separate.", "A heifer born twin to a bull is often a freemartin."],
  k: ["Germ layers and derivatives.", "Fetal membranes.", "Placental classification.", "Colostrum link."],
  m: ["A calf is not born protected by its mother's antibodies. Its placenta did not allow them across."],
  sa: [["List the fetal membranes.", "Amnion, chorion, allantois and yolk sac."], ["What is a placentome?", "The functional unit of the ruminant placenta, a fetal cotyledon with a maternal caruncle."]],
  la: [["Classify the placenta of domestic animals and explain its importance.", "By shape and layers with a table, and why colostrum is essential in epitheliochorial species."]],
  q: [["The placenta of the cow is", ["Cotyledonary", "Zonary", "Diffuse", "Discoid"], 0, "Cotyledonary."],
    ["The nervous system comes from", ["Ectoderm", "Mesoderm", "Endoderm", "Yolk sac"], 0, "Ectoderm."],
    ["The dog placenta is", ["Zonary", "Diffuse", "Cotyledonary", "Discoid"], 0, "Zonary."],
    ["The muscles are derived from", ["Mesoderm", "Ectoderm", "Endoderm", "Trophoblast"], 0, "Mesoderm."]],
  f: [["Gastrulation", "Formation of the three germ layers"], ["Chorion", "Outermost fetal membrane"], ["Caruncle", "Maternal part of placentome"], ["Allantois", "Collects fetal urine"]],
  d: ["Study organogenesis of the heart.", "Learn about congenital defects in calves.", "Compare the egg of the hen with a mammalian embryo."]
});

topic("anat", "Histology: Basic Tissues and Slide Preparation", {
  o: ["Name the four basic tissues and their types", "Describe how a tissue is prepared for the microscope", "Identify cells of connective tissue and nervous tissue", "Know what H&E staining shows"],
  i: "Histology is the study of tissues under the microscope. It forms the base of pathology, since a tissue must be known when normal before a disease can be recognised.",
  s: "All organs are made from four basic tissues: epithelium, connective tissue, muscle and nervous tissue. To study them, a thin slice of tissue is fixed, cut and stained, usually with a pink and blue stain.",
  n: [
    ["Epithelium", "Epithelium covers surfaces and lines cavities and forms glands. It sits on a basement membrane and has little intercellular material. It is named by cell shape (squamous, cuboidal, columnar) and layers (simple, stratified). Skin has keratinised stratified squamous epithelium. The bladder has transitional epithelium. The small intestine has simple columnar epithelium with goblet cells."],
    ["Connective tissue proper", "Cells include fibroblasts, macrophages, mast cells and plasma cells. Fibres are collagen (strength), elastic and reticular. Loose tissue supports organs, dense tissue forms tendons and ligaments, and adipose tissue stores fat."],
    ["Cartilage and bone", "Hyaline cartilage covers joint surfaces. Elastic cartilage is found in the ear and epiglottis. Fibrocartilage is in intervertebral discs. Bone has osteocytes in lacunae, arranged in osteons (Haversian systems) in compact bone, and is made by osteoblasts and removed by osteoclasts."],
    ["Muscle tissue", "Skeletal muscle is striated, multinucleated and voluntary. Cardiac muscle is striated, with branched cells joined by intercalated discs. Smooth muscle has spindle-shaped cells with a single central nucleus and is involuntary."],
    ["Nervous tissue", "Neurons have a cell body, dendrites and an axon. Glial cells support them: astrocytes, oligodendrocytes (myelin in the CNS), microglia (immune cells) and Schwann cells (myelin in peripheral nerves)."],
    ["Slide preparation", "Fixation in formalin preserves the tissue. Dehydration in graded alcohol removes water, clearing in xylene removes alcohol, then the tissue is embedded in paraffin wax. A microtome cuts sections a few micrometres thick, which are mounted on slides and stained. Poor fixation or delay leaves poor slides."],
    ["H&E staining", "Haematoxylin is basic and stains acidic structures such as the nucleus blue to purple. Eosin is acidic and stains cytoplasm and collagen pink. Special stains highlight other things: Masson's trichrome for collagen, PAS for carbohydrate, Ziehl-Neelsen for acid-fast bacteria."]
  ],
  tb: { h: ["Tissue", "Main feature", "Example"], r: [["Epithelium", "Cells on a basement membrane", "Skin, gut lining"], ["Connective", "Cells in matrix with fibres", "Tendon, bone, blood"], ["Muscle", "Contractile cells", "Skeletal, cardiac, smooth"], ["Nervous", "Neurons and glia", "Brain, nerves"]] },
  df: ["Tissue: a group of similar cells and their products performing a common function.", "Histology: the microscopic study of tissues.", "Basement membrane: a thin layer on which epithelial cells rest."],
  tm: [["Goblet cell", "Mucus-secreting epithelial cell"], ["Osteon", "Structural unit of compact bone"], ["Intercalated disc", "Junction between cardiac muscle cells"], ["Microtome", "Instrument for cutting thin tissue sections"], ["Paraffin", "Wax used to embed tissue"]],
  st: ["Fix the tissue in formalin.", "Dehydrate in graded alcohols.", "Clear in xylene.", "Embed in paraffin wax.", "Cut sections with a microtome.", "Stain with H&E and mount."],
  ex: ["A biopsy from a skin lump is processed as above and read by a pathologist.", "Acid-fast stain of a smear helps in finding tuberculosis bacteria.", "Collagen deposition in a chronic liver can be shown with a trichrome stain."],
  k: ["Types of epithelium.", "Connective tissue cells and fibres.", "Muscle types.", "Neuroglia.", "H&E and processing steps."],
  m: ["The pink colour in H&E is not the same as blood. It is cytoplasm and collagen taking up eosin."],
  sa: [["What does haematoxylin stain?", "Nuclei and other acidic structures blue to purple."], ["Name the lining epithelium of the urinary bladder.", "Transitional epithelium."]],
  la: [["Describe the steps of tissue processing for histology.", "Fixation, dehydration, clearing, embedding, sectioning, staining and mounting."]],
  q: [["Cardiac muscle cells are joined by", ["Intercalated discs", "Tight junctions only", "Desmin", "Sarcomeres"], 0, "Intercalated discs."],
    ["Myelin in the CNS is made by", ["Oligodendrocytes", "Schwann cells", "Astrocytes", "Microglia"], 0, "Oligodendrocytes."],
    ["Eosin stains cytoplasm", ["Pink", "Blue", "Black", "Green"], 0, "Pink."],
    ["Tissue is embedded in", ["Paraffin wax", "Formalin", "Xylene", "Eosin"], 0, "Paraffin wax."]],
  f: [["Transitional epithelium", "Lines the urinary tract"], ["Osteoblast", "Bone forming cell"], ["Microglia", "Immune cells of the CNS"], ["PAS", "Stain for carbohydrates"]],
  d: ["Practise identifying tissues on slides.", "Learn special stains.", "Study the histology of each organ system."]
});

topic("anat", "Brain, Spinal Cord and Cranial Nerves", {
  o: ["Name the main parts of the brain and their functions", "Describe the meninges, ventricles and cerebrospinal fluid", "List the twelve cranial nerves with their main functions", "Explain the clinical meaning of upper and lower motor neuron signs in outline"],
  i: "A neurological examination checks cranial nerves, posture and reflexes to place a lesion. That is only possible with a clear picture of the nervous system.",
  s: "The brain has the cerebrum for thought and voluntary movement, the cerebellum for coordination and the brainstem for vital functions. Twelve pairs of nerves leave the brain for the head and neck. The spinal cord runs inside the vertebral canal and sends nerves to the body.",
  n: [
    ["Parts of the brain", "The cerebrum has two hemispheres with a cortex for sensation, voluntary movement and learning. The diencephalon contains the thalamus (relay) and hypothalamus (autonomic and endocrine control). The midbrain, pons and medulla oblongata form the brainstem, which controls breathing, heart rate and reflexes. The cerebellum coordinates movement and balance."],
    ["Meninges and CSF", "Three layers cover the brain and cord: the dura mater, the arachnoid mater and the pia mater. Cerebrospinal fluid (CSF) forms in the choroid plexus of the ventricles, flows through the ventricles and around the brain and cord and is absorbed into the venous system. It cushions the brain. CSF is collected by veterinarians at the cerebellomedullary cistern or the lumbosacral site under anaesthesia."],
    ["Spinal cord and spinal nerves", "The cord has grey matter inside, in an H shape, and white matter outside. Dorsal roots carry sensory fibres and ventral roots carry motor fibres. The cord ends before the end of the vertebral canal, and the nerve roots trailing behind form the cauda equina. In the dog the cord ends around the sixth lumbar vertebra, and in the horse around the sacrum."],
    ["Cranial nerves", "I olfactory (smell), II optic (vision), III oculomotor (eye movement, pupil constriction), IV trochlear (superior oblique), V trigeminal (face sensation, chewing), VI abducens (lateral rectus), VII facial (facial expression, taste), VIII vestibulocochlear (hearing and balance), IX glossopharyngeal (pharynx, taste), X vagus (heart, lungs, gut), XI accessory (neck muscles), XII hypoglossal (tongue)."],
    ["Peripheral and autonomic nerves", "Spinal nerves form plexuses, such as the brachial plexus for the forelimb. The radial nerve supplies the extensor muscles of the forelimb, so radial paralysis leaves the limb dragging. The sympathetic outflow is thoracolumbar and the parasympathetic is craniosacral, through the vagus and sacral nerves."],
    ["Neurological localisation", "Upper motor neuron lesions give stiff, spastic limbs with normal or increased reflexes. Lower motor neuron lesions give weak, floppy limbs with reduced reflexes and muscle wasting. Facial paralysis points to the facial nerve, while a head tilt suggests vestibular disease."],
    ["Protection and blood supply", "The brain is protected by the skull and meninges, and the blood-brain barrier restricts what enters from the blood. This is why some drugs do not reach the brain."]
  ],
  tb: { h: ["Nerve", "Number", "Main function"], r: [["Olfactory", "I", "Smell"], ["Optic", "II", "Vision"], ["Oculomotor", "III", "Eye movement, pupil constriction"], ["Trigeminal", "V", "Face sensation, chewing"], ["Facial", "VII", "Facial movement"], ["Vestibulocochlear", "VIII", "Hearing and balance"], ["Vagus", "X", "Parasympathetic to thorax and abdomen"], ["Hypoglossal", "XII", "Tongue movement"]] },
  df: ["Cerebrospinal fluid: the fluid that circulates in the ventricles and subarachnoid space.", "Cauda equina: the bundle of lumbosacral nerve roots trailing behind the end of the spinal cord.", "Blood-brain barrier: a selective barrier between blood and brain tissue."],
  tm: [["Choroid plexus", "Tissue in the ventricles that makes CSF"], ["Cerebellum", "Brain part for coordination"], ["Plexus", "Network of nerves"], ["Dura mater", "Tough outer meningeal layer"], ["Medulla oblongata", "Lowest part of the brainstem"]],
  st: ["Observe posture, gait and behaviour.", "Test the cranial nerves one by one.", "Test postural reactions and spinal reflexes.", "Decide the likely site of the lesion.", "Plan tests such as imaging or CSF analysis."],
  ex: ["A horse with a drooping ear, lip and eyelid on one side shows facial nerve paralysis.", "A dog that drags its hind paws and has weak reflexes may have a lower motor neuron problem.", "A calf with a head tilt and circling can have inner ear or brainstem disease."],
  k: ["Brain parts.", "Meninges and CSF.", "Twelve cranial nerves.", "Spinal cord position.", "UMN vs LMN."],
  m: ["The spinal cord does not reach the end of the vertebral column."],
  sa: [["Name the meninges.", "Dura mater, arachnoid mater and pia mater."], ["Which nerve is the vagus?", "Cranial nerve X, carrying parasympathetic fibres to the chest and abdomen."]],
  la: [["List the cranial nerves with their functions.", "Table of I to XII with type and main function, with an example of a clinical sign for each important nerve."]],
  q: [["The cranial nerve for vision is", ["II", "I", "V", "VII"], 0, "Optic nerve II."],
    ["CSF is produced in the", ["Choroid plexus", "Cerebellum", "Pia mater", "Dura mater"], 0, "Choroid plexus."],
    ["The facial nerve is cranial nerve", ["VII", "V", "IX", "XII"], 0, "VII."],
    ["Lower motor neuron lesions cause", ["Weak, floppy limbs", "Spastic limbs", "Increased reflexes", "Normal tone"], 0, "Flaccid with reduced reflexes."]],
  f: [["Cauda equina", "Horse-tail of nerve roots"], ["Cranial nerve X", "Vagus"], ["Blood-brain barrier", "Limits entry of substances into the brain"], ["Brainstem", "Midbrain, pons and medulla"]],
  d: ["Learn the neurological exam step by step.", "Study the autonomic ganglia.", "Read about the avian brain."]
});

topic("anat", "Applied and Surface Anatomy for Clinical Work", {
  o: ["Locate sites for pulse, venepuncture and auscultation", "Describe landmarks used in clinical examination", "Explain the idea of nerve blocks", "Use anatomical landmarks to describe the position of organs"],
  i: "A great deal of clinical practice is anatomy under the skin, found with the fingers and a stethoscope. These landmarks are the ones every veterinary student is expected to know.",
  s: "The skin and body wall have landmarks that tell you where the organs lie below. The jugular vein runs in the neck groove, the heart is heard on the left side of the chest and the rumen fills the left flank.",
  n: [
    ["Venepuncture sites", "In cattle, horses and sheep the jugular vein lies in the jugular groove of the neck and is made to rise by pressure at the base of the neck. In cattle, the tail (coccygeal) vein on the underside of the tail is another site. In dogs and cats the cephalic vein on the front of the forelimb and the saphenous vein on the hind limb are commonly used. Restraint and hygiene are required."],
    ["Pulse points", "The facial artery, where it crosses the lower jaw, is used in the horse. The median caudal artery under the tail is used in cattle. The femoral artery in the groin is used in dogs and cats. Rate, rhythm and strength of the pulse are noted."],
    ["Auscultation", "The heart lies in the lower chest, mainly on the left, roughly between the third and fifth ribs, with the point of the elbow as a guide. Lung sounds are heard over the lung field behind the shoulder. Rumen movements are heard in the left paralumbar fossa, and in cattle the 'ping' area on the left or right flank is relevant to displaced abomasum."],
    ["Abdominal landmarks", "The left paralumbar fossa is the hollow behind the last rib and in front of the hip. The rumen occupies most of the left side of the abdomen. On the right side, the liver and abomasum lie in the cranial abdomen, and the caecum lies in the right flank in cattle. In the horse, the large colon and caecum fill much of the abdomen."],
    ["Thoracic landmarks", "The ribs are counted from the front. The lungs reach back towards the last ribs, but the exact limit varies with species and breathing, so check your textbook for the percussion limits. The diaphragm sits further forward than many students expect, so the liver lies partly under the rib cage."],
    ["Nerve blocks (concept)", "A nerve block uses local anaesthetic placed near a nerve to numb its area. Knowing the course of the nerve is essential. In cattle the cornual nerve supplies the horn and is blocked for dehorning, and paravertebral nerve blocks are used for flank surgery. The procedure is done only by a veterinarian."],
    ["Injection sites in outline", "Intramuscular injections are given in large muscle masses with few vessels and nerves, such as the neck muscles in cattle and the thigh muscles in dogs. Injection sites are chosen to avoid the sciatic nerve and to reduce damage to valuable meat cuts."]
  ],
  tb: { h: ["Purpose", "Species", "Site"], r: [["Venepuncture", "Cattle, horse", "Jugular groove"], ["Venepuncture", "Dog", "Cephalic or saphenous vein"], ["Pulse", "Horse", "Facial artery"], ["Pulse", "Cattle", "Median caudal artery"], ["Pulse", "Dog", "Femoral artery"], ["Rumen sounds", "Cattle", "Left paralumbar fossa"]] },
  df: ["Surface anatomy: the study of the position of internal structures in relation to the body surface.", "Auscultation: listening to body sounds, usually with a stethoscope.", "Nerve block: injection of a local anaesthetic near a nerve to block sensation."],
  tm: [["Paralumbar fossa", "Hollow of the flank"], ["Intercostal space", "Space between two ribs"], ["Jugular groove", "Groove on the side of the neck holding the jugular vein"], ["Palpation", "Examining by touch"], ["Percussion", "Tapping to assess underlying structures"]],
  st: ["Restrain the animal safely.", "Identify the landmark.", "Look, feel and listen.", "Compare with the opposite side.", "Record findings."],
  ex: ["Listening on the left flank of a cow for rumen contractions.", "Taking the pulse from the tail of a cow.", "Raising the jugular vein for blood collection from a horse."],
  k: ["Sites for venepuncture.", "Pulse points.", "Auscultation areas.", "Abdominal landmarks."],
  m: ["The heart is not in the middle of the chest. In animals it lies mainly on the left."],
  sa: [["Where is the pulse taken in the horse?", "From the facial artery as it crosses the lower jaw."], ["What is the paralumbar fossa?", "The hollow behind the last rib and before the hip in the flank."]],
  la: [["Describe the clinical anatomy of the flank of the cow.", "Landmarks, organs on each side, auscultation, relevance to surgery and disease."]],
  q: [["The jugular vein lies in the", ["Jugular groove", "Axilla", "Flank", "Groin"], 0, "Jugular groove."],
    ["In cattle, rumen sounds are heard in the", ["Left paralumbar fossa", "Right paralumbar fossa", "Brisket", "Groin"], 0, "Left paralumbar fossa."],
    ["The pulse in cattle is usually taken from the", ["Median caudal artery", "Facial artery", "Femoral vein", "Carotid"], 0, "Median caudal artery."],
    ["A nerve block", ["Numbs the area supplied by a nerve", "Raises blood pressure", "Kills a nerve", "Cures infection"], 0, "It temporarily blocks sensation."]],
  f: [["Cephalic vein", "Forelimb vein in the dog"], ["Auscultation", "Listening with a stethoscope"], ["Paralumbar fossa", "Flank hollow"], ["Median caudal artery", "Tail pulse site in cattle"]],
  d: ["Practise landmarks on a live animal with a teacher.", "Study the clinical anatomy of the horse's limb.", "Learn about radiographic anatomy."]
});
planned("anat", ["Comparative anatomy of the digestive system in the horse and pig", "Anatomy of the respiratory system in detail: larynx, lungs and pleura", "Anatomy of the male and female reproductive organs in detail", "Anatomy of the urinary system in detail", "Avian skeleton and muscles in detail", "Muscles of the head, neck and trunk", "Blood vessels of the limbs and abdomen", "Practical dissection guide: a systematic approach", "Anatomy of the dog and cat in detail", "Radiographic anatomy"]);
/* ================= ANATOMY (wave 4, part 1) ================= */
unit("anat", "Unit 6 – Systems in comparative detail");
topic("anat", "Digestive Tract of the Horse, Pig and Dog: Comparative View", {
  o: ["Describe the parts of the equine large intestine and the common sites of colic", "Explain why the horse cannot vomit", "Describe the special features of the pig stomach and colon", "Compare the digestive tract of dog, horse and pig"],
  i: "Ruminant digestion was covered earlier. Horses, pigs and dogs each have a different plan, and these differences explain feeding, colic and surgical problems.",
  s: "The horse is a hindgut fermenter. It has a small simple stomach and a very large caecum and colon, where microbes ferment fibre. The pig has a simple stomach and a coiled colon. The dog has a short gut suited to meat.",
  n: [
    ["Horse: mouth to stomach", "The horse has a long, mobile upper lip, strong incisors for grazing and cheek teeth for grinding. The oesophagus joins the stomach through a very strong cardiac sphincter, and the horse cannot vomit, so gas or fluid builds up and can rupture the stomach. The simple stomach is small compared with body size, so horses are fed small amounts often."],
    ["Horse: small intestine", "The small intestine is long (many metres), with duodenum, jejunum and ileum. The horse has no gallbladder, so bile flows directly and continuously into the duodenum. The jejunum hangs from a long mesentery, so it can twist or get trapped."],
    ["Horse: caecum and colon", "The caecum is a large comma-shaped blind sac on the right side. The large colon forms a double loop: right ventral colon, left ventral colon, pelvic flexure, left dorsal colon and right dorsal colon. The pelvic flexure narrows, and so impactions often occur there. The small colon follows and forms firm faecal balls. The terminal part is narrow, so a blockage can occur."],
    ["Horse colic: anatomical sites", "Colic is abdominal pain, not a single disease. Anatomy explains common problems: impaction at the pelvic flexure, twisting (volvulus) of the large colon, entrapment of the left colon over the nephrosplenic ligament, sand accumulation, and strangulation by a pedunculated lipoma in older horses. Colic is an emergency that needs veterinary help."],
    ["Pig", "The stomach is simple with a diverticulum near the oesophageal entry and a muscular thickening (torus pyloricus) at the outlet. The small intestine is long. The caecum is short. The colon forms a spiral cone (ansa spiralis) in the left abdomen, and the pig has a large, well-developed liver. Pigs are omnivores and can digest a wide range of feeds."],
    ["Dog and cat", "The stomach is large and simple and can expand after a big meal. The gut is relatively short, with a small caecum in the dog and a tiny one in the cat. Carnassial teeth (upper fourth premolar and lower first molar) shear meat. Gastric dilatation and volvulus affects deep-chested large breeds."],
    ["Common clinical links", "Horses: colic, gastric ulcers, choke. Pigs: gastric ulcers, rectal prolapse. Dogs: foreign bodies in the stomach and small intestine, gastric dilatation-volvulus. Knowing the position and attachment of each part helps in understanding where the problem is."]
  ],
  tb: { h: ["Feature", "Horse", "Pig", "Dog"], r: [["Stomach", "Small, simple, cannot vomit", "Simple, torus pyloricus", "Large, simple"], ["Caecum", "Very large", "Short", "Small"], ["Colon", "Large colon with pelvic flexure", "Spiral cone", "Short, simple"], ["Gallbladder", "Absent", "Present", "Present"], ["Fermentation site", "Caecum and colon", "Colon", "Little"]] },
  df: ["Hindgut fermenter: an animal that digests fibre by microbial fermentation in the caecum and colon.", "Colic: abdominal pain, usually from the intestine.", "Impaction: blockage of the gut lumen by dry feed or foreign material."],
  tm: [["Cardiac sphincter", "Muscular ring at the oesophagus to stomach junction"], ["Pelvic flexure", "Hairpin bend of the horse's large colon"], ["Ansa spiralis", "Spiral colon of the pig"], ["Volvulus", "Twisting of the gut on its axis"], ["Nephrosplenic ligament", "Ligament between the left kidney and the spleen in the horse"]],
  st: ["Feed is grazed and chewed.", "It passes to the small stomach and small intestine.", "Fibre reaches the caecum and large colon.", "Microbes ferment it to volatile fatty acids.", "The small colon forms faecal balls.", "Faeces leave through the rectum."],
  ex: ["A horse with colic that rolls and looks at its flank needs urgent veterinary examination.", "A boar fed only coarse fibre cannot digest it as well as a ruminant.", "A deep-chested dog with a swollen abdomen after a meal can have gastric dilatation and volvulus."],
  k: ["Equine large intestine parts.", "No vomiting in the horse.", "No gallbladder in the horse.", "Sites of colic.", "Pig stomach and colon."],
  m: ["A horse has no gallbladder, but it still makes and uses bile."],
  sa: [["Why can the horse not vomit?", "The cardiac sphincter is very strong and the oesophagus enters the stomach at an angle."], ["Name the parts of the large colon of the horse.", "Right ventral, left ventral, pelvic flexure, left dorsal and right dorsal colon."]],
  la: [["Describe the digestive system of the horse.", "Mouth, stomach, small intestine, caecum, large and small colon, glands, no gallbladder, clinical relevance."]],
  q: [["The horse has no", ["Gallbladder", "Liver", "Pancreas", "Caecum"], 0, "No gallbladder."],
    ["Impaction in the horse often occurs at the", ["Pelvic flexure", "Oesophagus", "Caecal base only", "Duodenum"], 0, "Pelvic flexure."],
    ["The spiral colon is a feature of the", ["Pig", "Horse", "Dog", "Hen"], 0, "Pig."],
    ["The horse is a", ["Hindgut fermenter", "Foregut fermenter", "Carnivore", "Ruminant"], 0, "Hindgut fermenter."]],
  f: [["Ansa spiralis", "Spiral colon of the pig"], ["Volvulus", "Twist of the gut"], ["Torus pyloricus", "Muscular pad at the pig's pylorus"], ["Hindgut fermenter", "Fibre digested in caecum and colon"]],
  d: ["Study the equine gastric ulcer syndrome.", "Learn the mesenteric attachments.", "Read about the digestive anatomy of rabbits."]
});

topic("anat", "Respiratory System in Detail", {
  o: ["Trace the air passage from nostril to alveolus", "Name the laryngeal cartilages and the nerve of the larynx", "Describe the lobes of the lungs and the pleura", "Compare species differences"],
  i: "Respiratory disease is among the commonest causes of loss in livestock and companion animals. Auscultation, endoscopy and radiology all depend on this anatomy.",
  s: "Air enters the nostrils, passes through the nasal cavity, pharynx, larynx and trachea, and then enters the lungs, where it splits into smaller and smaller tubes until it reaches the tiny air sacs where oxygen enters the blood.",
  n: [
    ["Nasal cavity and sinuses", "The nasal cavity is divided by the nasal septum. Scroll-like turbinates (conchae) warm, filter and humidify the air and increase surface area. The horse is an obligate nasal breather because of its long soft palate. The paranasal sinuses open into the nasal cavity."],
    ["Pharynx and larynx", "The pharynx is shared by food and air. The larynx guards the airway and makes sound. Its cartilages are the epiglottic, thyroid, cricoid and the paired arytenoid cartilages. The vocal folds attach to the arytenoids. The left recurrent laryngeal nerve is long, and its damage causes laryngeal hemiplegia ('roaring') in horses."],
    ["Trachea and bronchi", "The trachea is held open by C-shaped cartilage rings, completed by the trachealis muscle. It divides into two principal bronchi, which divide repeatedly into bronchioles. Ruminants and the pig have a separate tracheal bronchus supplying the right cranial lobe, which makes it prone to inhaled material or drugs."],
    ["Lungs and lobes", "The right lung has more lobes than the left. In the dog the right lung has cranial, middle, caudal and accessory lobes and the left lung has cranial and caudal lobes. Cattle and pigs have clear interlobular septa, which limit the spread of pneumonia. The horse has incomplete septa."],
    ["Alveoli and gas exchange", "Alveoli are thin-walled sacs surrounded by capillaries. Type I cells form the thin wall for gas exchange and type II cells make surfactant, which prevents collapse. Oxygen and carbon dioxide diffuse across the blood-air barrier."],
    ["Pleura, diaphragm and mediastinum", "Each lung is covered by visceral pleura, and the chest wall is lined by parietal pleura, with a thin pleural space between them. The diaphragm is the main muscle of inspiration. The mediastinum is thin and may be incomplete in the horse and dog, so air in one side of the chest can affect both lungs."],
    ["Clinical links", "Endoscopy shows the nasal passages and larynx of the horse. Thoracic radiographs show the lung fields. Pleural effusion fills the pleural space and dulls lung sounds. Pneumothorax is air in the pleural space."]
  ],
  tb: { h: ["Feature", "Cattle and pig", "Horse", "Dog"], r: [["Interlobular septa", "Complete", "Incomplete", "Incomplete"], ["Tracheal bronchus", "Present", "Absent", "Absent"], ["Breathing", "Mouth and nose", "Obligate nasal", "Mouth and nose"], ["Lobes (right)", "Cranial (two parts), middle, caudal, accessory", "Cranial, caudal, accessory", "Cranial, middle, caudal, accessory"]] },
  df: ["Turbinate: a thin scroll of bone covered by mucosa in the nasal cavity.", "Surfactant: a fluid made by type II alveolar cells that lowers surface tension in the alveoli.", "Pleura: the serous membrane covering the lungs and lining the chest."],
  tm: [["Arytenoid cartilage", "Paired laryngeal cartilage that moves the vocal folds"], ["Trachealis", "Muscle bridging the open ends of the tracheal rings"], ["Bronchiole", "Small airway without cartilage"], ["Pneumothorax", "Air in the pleural space"], ["Pleural effusion", "Fluid in the pleural space"]],
  st: ["Air enters through the nostrils.", "It passes the nasal cavity and pharynx.", "It passes the larynx and trachea.", "It enters the bronchi and bronchioles.", "It reaches the alveoli for gas exchange."],
  ex: ["A horse that makes a roaring noise during exercise may have damage to the left recurrent laryngeal nerve.", "A calf with pneumonia may have disease concentrated in the cranial lobes of the lungs.", "A dog with fluid in the chest has muffled lung sounds."],
  k: ["Laryngeal cartilages.", "Nerve supply of the larynx.", "Lobes of the lung.", "Pleura.", "Species differences."],
  m: ["The trachea is not a smooth tube. It has cartilage rings to stay open."],
  sa: [["Name the cartilages of the larynx.", "Epiglottic, thyroid, cricoid and arytenoid cartilages."], ["What is surfactant?", "A fluid from type II alveolar cells that prevents alveolar collapse."]],
  la: [["Describe the anatomy of the lungs of the domestic animals.", "Position, lobes, bronchial tree, alveoli, pleura, species differences, clinical relevance."]],
  q: [["Roaring in horses involves the", ["Left recurrent laryngeal nerve", "Vagus on the right", "Facial nerve", "Phrenic nerve"], 0, "Left recurrent laryngeal nerve."],
    ["The tracheal bronchus is found in", ["Pig and ruminants", "Horse", "Dog", "Cat"], 0, "Pig and ruminants."],
    ["Surfactant is made by", ["Type II cells", "Type I cells", "Macrophages", "Goblet cells"], 0, "Type II alveolar cells."],
    ["The horse is an obligate", ["Nasal breather", "Mouth breather", "Diaphragm breather", "Gill breather"], 0, "Nasal breather."]],
  f: [["Pneumothorax", "Air in pleural space"], ["Turbinate", "Scroll of bone in the nose"], ["Bronchiole", "Small airway without cartilage"], ["Type II cell", "Makes surfactant"]],
  d: ["Study the control of breathing.", "Learn endoscopic anatomy of the upper airway.", "Read about air sacs in birds."]
});

topic("anat", "Male Reproductive Organs", {
  o: ["Describe the testis, epididymis and spermatic cord", "Name the accessory glands and compare species", "Compare the penis of ruminants, boar, stallion and dog", "Explain thermoregulation of the testis"],
  i: "Breeding soundness, castration, and semen production all depend on the anatomy of the male tract.",
  s: "Sperm are made in the testes, stored in the epididymis and carried by the vas deferens to the urethra, where fluid from the accessory glands is added. The testes hang outside the body to stay cooler than body temperature.",
  n: [
    ["Testis and scrotum", "The testis has seminiferous tubules where sperm are made and interstitial Leydig cells that make testosterone. The testes hang vertically in the bull, ram and boar (the boar's lie in the perineal region, below the anus) and nearly horizontally in the stallion. The scrotum and the cremaster and dartos muscles move the testes closer or farther from the body to control temperature."],
    ["Temperature control", "The pampiniform plexus of veins wraps around the testicular artery and cools the arterial blood by counter-current heat exchange. Sperm production needs a temperature a few degrees below body temperature. Fever, heat stress or scrotal injury can reduce semen quality for weeks."],
    ["Epididymis and ducts", "The epididymis has a head, body and tail. Sperm mature and are stored in the tail. The vas deferens carries sperm through the inguinal canal to the pelvic urethra."],
    ["Accessory glands", "Vesicular glands, the prostate and bulbourethral glands add secretions. The bull, ram, boar and stallion have all three. The dog has only a prostate, which is well developed. The boar has very large vesicular and bulbourethral glands and produces a large volume of semen."],
    ["Penis", "Ruminants and the boar have a fibroelastic penis with a sigmoid flexure, which straightens at erection. The stallion and dog have a musculocavernous penis that enlarges with blood. The dog has a bone, the os penis, and a bulbus glandis that causes the 'tie' during mating. The ram and goat have a urethral process at the tip."],
    ["Prepuce and urethra", "The prepuce covers the free end of the penis. The urethra carries both urine and semen. In male ruminants stones often lodge at the sigmoid flexure or the urethral process, causing blocked urine flow."],
    ["Clinical links", "Cryptorchidism is failure of one or both testes to descend. Orchitis is inflammation of the testis. Castration removes the testes. Examination of a bull includes palpation of the testes, epididymis and accessory glands, and measurement of scrotal circumference."]
  ],
  tb: { h: ["Feature", "Bull, ram", "Boar", "Stallion", "Dog"], r: [["Penis type", "Fibroelastic, sigmoid flexure", "Fibroelastic, corkscrew tip", "Musculocavernous", "Musculocavernous with os penis"], ["Vesicular glands", "Present", "Large", "Present", "Absent"], ["Prostate", "Present", "Present", "Present", "Present, large"], ["Bulbourethral glands", "Present", "Large", "Present", "Absent"]] },
  df: ["Cryptorchidism: failure of one or both testes to descend into the scrotum.", "Pampiniform plexus: the network of testicular veins that cools arterial blood.", "Spermatogenesis: the formation of sperm in the seminiferous tubules."],
  tm: [["Cremaster", "Muscle that raises the testis"], ["Dartos", "Smooth muscle in the scrotal wall"], ["Os penis", "Penile bone of the dog"], ["Bulbus glandis", "Swelling at the base of the glans in the dog"], ["Sigmoid flexure", "S-shaped bend in the ruminant and boar penis"]],
  st: ["Sperm are made in the seminiferous tubules.", "They move to the epididymis and mature.", "At ejaculation they pass through the vas deferens.", "Accessory glands add fluid.", "Semen is delivered through the urethra."],
  ex: ["A bull with a hard, enlarged testis may have orchitis.", "A male goat that strains and passes only drops of urine may have urethral stones.", "A bull's scrotal circumference is used to judge fertility."],
  k: ["Testis structure.", "Temperature control.", "Accessory glands in species.", "Penis types.", "Cryptorchidism."],
  m: ["The testes are outside the body to keep sperm cool, not to protect them."],
  sa: [["Which gland is the only accessory gland of the dog?", "The prostate."], ["What is cryptorchidism?", "Failure of one or both testes to descend into the scrotum."]],
  la: [["Describe the male reproductive system of the bull.", "Testes, scrotum, epididymis, spermatic cord, vas deferens, accessory glands, penis, prepuce, thermoregulation, clinical points."]],
  q: [["Sperm are stored mainly in the", ["Tail of the epididymis", "Prostate", "Vas deferens", "Scrotum"], 0, "Tail of the epididymis."],
    ["The dog has a", ["Penile bone", "Sigmoid flexure", "No prostate", "Fibroelastic penis"], 0, "Os penis."],
    ["The pampiniform plexus", ["Cools testicular blood", "Makes sperm", "Stores sperm", "Makes testosterone"], 0, "Counter-current cooling."],
    ["Sigmoid flexure is found in the", ["Bull", "Stallion", "Dog", "Cat"], 0, "Bull, ram, boar."]],
  f: [["Cremaster", "Raises the testis"], ["Leydig cell", "Makes testosterone"], ["Orchitis", "Inflammation of the testis"], ["Os penis", "Bone in the dog's penis"]],
  d: ["Study the breeding soundness exam.", "Learn the histology of the testis.", "Read about ejaculation physiology."]
});

topic("anat", "Female Reproductive Organs", {
  o: ["Describe the ovary, oviduct, uterus, cervix and vagina", "Compare the uterus and cervix of the species", "Name the ligaments of the female tract", "Relate the anatomy to rectal palpation and artificial insemination"],
  i: "Fertility work, artificial insemination, pregnancy diagnosis and calving all rely on a good three-dimensional picture of the female tract.",
  s: "The ovaries make eggs and hormones. The egg travels along the oviduct, where it is fertilised, and the embryo grows in the uterus, which has two horns in domestic animals. The cervix is a strong gate between the uterus and the vagina.",
  n: [
    ["Ovary", "The ovary has follicles at different stages and corpora lutea. In the horse the ovary is bean shaped with an ovulation fossa, the only place where ovulation occurs. In the cow the ovary is almond shaped and follicles and corpora lutea can be felt per rectum. The sow's ovary looks like a bunch of grapes."],
    ["Oviduct", "The oviduct has the infundibulum with finger-like fimbriae, the ampulla (site of fertilisation) and the isthmus, which joins the uterus. The oviduct moves the egg and sperm and supports early embryo development."],
    ["Uterus", "Domestic animals have a bicornuate uterus with a body and two horns. Cows and ewes have a small body and long, coiled horns with caruncles for placentation. The mare has a large body and shorter horns. The sow has very long, coiled horns. The bitch and queen have long, narrow horns and a short body."],
    ["Cervix", "The cervix is a thick-walled muscular canal, normally closed. In the cow it has several annular rings, which a technician feels and passes through during artificial insemination. In the sow the cervix has interdigitating pads which lock with the boar's corkscrew penis. The mare's cervix is soft and relaxes in oestrus."],
    ["Vagina, vestibule and vulva", "The vagina lies between cervix and vestibule. The urethra opens at the junction of vagina and vestibule, and in the cow a blind pocket, the suburethral diverticulum, lies below the urethral opening, so a catheter may enter it by mistake. The vulva has two lips and the clitoris lies in the ventral commissure."],
    ["Ligaments", "The broad ligament suspends the tract from the roof of the abdomen. Its parts are the mesovarium (for the ovary), mesosalpinx (for the oviduct) and mesometrium (for the uterus). In pregnancy the ligaments stretch."],
    ["Blood supply and clinical links", "Ovarian and uterine arteries supply the tract. Pregnancy diagnosis in cattle by rectal palpation uses the position and size of the uterus and the presence of fetal membranes. Uterine prolapse, torsion and retained fetal membranes are calving problems that need immediate veterinary attention."]
  ],
  tb: { h: ["Feature", "Cow", "Mare", "Sow", "Bitch"], r: [["Uterine body", "Small", "Large", "Short", "Short"], ["Uterine horns", "Long, coiled", "Short", "Very long, coiled", "Long, narrow"], ["Cervix", "Annular rings", "Soft, relaxed in heat", "Interdigitating pads", "Single canal"], ["Placenta", "Cotyledonary", "Diffuse", "Diffuse", "Zonary"]] },
  df: ["Bicornuate uterus: a uterus with a short body and two horns.", "Corpus luteum: a gland formed from the ruptured follicle that makes progesterone.", "Mesometrium: the part of the broad ligament that supports the uterus."],
  tm: [["Fimbriae", "Finger-like projections of the infundibulum"], ["Ovulation fossa", "Depression on the equine ovary where ovulation occurs"], ["Caruncle", "Maternal placental button on the uterine wall"], ["Suburethral diverticulum", "Blind pocket under the urethral opening of the cow"], ["Cervical rings", "Folds in the cervix of ruminants"]],
  st: ["An ovum is released from the ovary.", "It is caught by the infundibulum.", "Fertilisation occurs in the ampulla.", "The embryo moves to the uterus.", "It attaches and the placenta forms.", "At term the cervix relaxes and birth occurs."],
  ex: ["An inseminator who knows the cervical rings can pass the gun through with minimal force.", "A catheter passed into a cow's urethra can wrongly go into the suburethral diverticulum.", "Palpation of the ovary tells the vet if a corpus luteum is present."],
  k: ["Parts of the tract.", "Uterine types.", "Cervix of species.", "Broad ligament.", "Palpation landmarks."],
  m: ["Fertilisation takes place in the oviduct, not in the uterus."],
  sa: [["Where does fertilisation occur?", "In the ampulla of the oviduct."], ["Name the three parts of the broad ligament.", "Mesovarium, mesosalpinx and mesometrium."]],
  la: [["Describe the female genital organs of the cow with a labelled diagram.", "Ovaries, oviducts, uterus, cervix, vagina, vulva, ligaments, blood supply, clinical points."]],
  q: [["The site of ovulation in the mare is the", ["Ovulation fossa", "Cortex all over", "Corpus luteum", "Oviduct"], 0, "Ovulation fossa."],
    ["The cow's cervix has", ["Annular rings", "Interdigitating pads", "No lumen", "A soft wall only"], 0, "Annular rings."],
    ["Fertilisation occurs in the", ["Ampulla", "Uterus", "Cervix", "Vagina"], 0, "Ampulla."],
    ["The mesovarium supports the", ["Ovary", "Uterus", "Bladder", "Vagina"], 0, "The ovary."]],
  f: [["Fimbriae", "Catch the ovum"], ["Bicornuate", "Uterus with two horns and a body"], ["Mesosalpinx", "Supports the oviduct"], ["Suburethral diverticulum", "Blind pocket in the cow"]],
  d: ["Study the ovarian cycle with histology.", "Learn the tract of the bitch.", "Read about rectal palpation techniques."]
});

topic("anat", "Urinary System in Detail", {
  o: ["Describe the structure of the kidney and the nephron", "Compare the kidneys of the domestic species", "Describe the ureters, bladder and urethra", "Link anatomy to urolithiasis"],
  i: "Kidneys filter blood, control water and salt, and remove wastes. Disease here is common in older dogs and cats, and blocked urinary tracts are a major problem in male ruminants and cats.",
  s: "Each kidney contains many tiny filters called nephrons. Urine flows from the kidney through the ureter to the bladder and out through the urethra. In males the urethra is long and narrow, so stones can block it.",
  n: [
    ["Position and shape of kidneys", "The kidneys lie against the roof of the abdomen, under the lumbar vertebrae. The right kidney is more forward than the left. In cattle the kidney is lobulated with grooves on the surface. The pig and horse kidneys are smooth. The horse's right kidney is heart shaped and the left is bean shaped. In cattle the left kidney is displaced to the right behind the rumen, so it is found on the right side."],
    ["Internal structure", "The cortex is the outer part and the medulla is the inner part, made of pyramids. Urine from the papilla collects in the renal pelvis or in calyces. Cattle and the pig have multipyramidal kidneys with calyces. The horse, dog, cat, sheep and goat have a single fused renal crest and a renal pelvis."],
    ["The nephron", "The nephron consists of the renal corpuscle (glomerulus and Bowman's capsule), the proximal convoluted tubule, the loop of Henle, the distal convoluted tubule and the collecting duct. The juxtaglomerular apparatus near the glomerulus senses blood pressure and releases renin. Cortical nephrons have short loops, and juxtamedullary nephrons have long loops that help concentrate urine."],
    ["Ureters and bladder", "A ureter leaves each kidney and runs to the bladder, entering it obliquely so urine cannot flow backward. The bladder is lined by transitional epithelium and has a smooth muscle wall. It lies on the pelvic floor and moves into the abdomen as it fills."],
    ["Urethra", "In the female the urethra is short and opens into the vagina. In the male it is long and joins the genital tract. In male ruminants and pigs the urethra has narrow points at the sigmoid flexure and the urethral process. In the dog the urethra passes through the os penis, where stones may lodge."],
    ["Blood supply", "The renal artery branches from the aorta, and the kidney receives a large share of the cardiac output. A portal system around the nephron, the peritubular capillaries, works with the glomerulus."],
    ["Clinical links", "Urolithiasis (urinary stones) often blocks the urethra in male ruminants and cats and can cause a ruptured bladder. Chronic kidney disease is common in older cats and dogs. A normal kidney is smooth, and enlargement or irregularity is a clinical finding on palpation or imaging."]
  ],
  tb: { h: ["Species", "Kidney shape", "Type"], r: [["Cattle", "Lobulated", "Multipyramidal"], ["Pig", "Smooth, flattened", "Multipyramidal"], ["Horse", "Right heart-shaped, left bean-shaped", "Unipyramidal with crest"], ["Sheep, goat", "Bean-shaped", "Unipyramidal with crest"], ["Dog, cat", "Bean-shaped", "Unipyramidal with crest"]] },
  df: ["Nephron: the structural and functional unit of the kidney.", "Juxtaglomerular apparatus: the structure that monitors blood pressure and releases renin.", "Urolithiasis: the formation of stones in the urinary tract."],
  tm: [["Glomerulus", "Tuft of capillaries that filters blood"], ["Renal pelvis", "Funnel where urine collects"], ["Renal crest", "Fused papilla of the unipyramidal kidney"], ["Loop of Henle", "U-shaped part of the nephron"], ["Renin", "Enzyme released by the kidney that affects blood pressure"]],
  st: ["Blood enters the glomerulus.", "Filtrate enters Bowman's capsule.", "The tubules reabsorb water and solutes.", "Urine collects in the collecting ducts.", "It passes to the pelvis, ureter, bladder and urethra."],
  ex: ["A male goat with urethral stones strains and dribbles urine and can rupture the bladder.", "An old cat with small, irregular kidneys may have chronic kidney disease.", "A cow's left kidney is felt on the right side by rectal palpation because of its position."],
  k: ["Gross structure of the kidney.", "Nephron parts.", "Species differences.", "Urethra and urolithiasis."],
  m: ["The left kidney of a cow is not found on the left side."],
  sa: [["What is the nephron?", "The functional unit of the kidney, made of the renal corpuscle and the renal tubule."], ["Where do stones commonly lodge in male ruminants?", "At the sigmoid flexure and the urethral process."]],
  la: [["Describe the structure of the kidney and nephron.", "Position, cortex and medulla, nephron parts, juxtaglomerular apparatus, blood supply, species differences."]],
  q: [["The multipyramidal kidney is found in", ["Cattle", "Dog", "Horse", "Cat"], 0, "Cattle and pig."],
    ["The functional unit of the kidney is the", ["Nephron", "Calyx", "Ureter", "Papilla"], 0, "Nephron."],
    ["In the dog, stones often lodge at the", ["Os penis", "Sigmoid flexure", "Urethral process", "Ureter only"], 0, "Os penis."],
    ["The juxtaglomerular apparatus releases", ["Renin", "Insulin", "Bile", "Amylase"], 0, "Renin."]],
  f: [["Glomerulus", "Capillary tuft of the nephron"], ["Urolithiasis", "Stones in the urinary tract"], ["Calyx", "Cup collecting urine from a papilla"], ["Transitional epithelium", "Lines the urinary passages"]],
  d: ["Study renal physiology further.", "Learn urinary tract imaging.", "Read about urinary diseases of cats."]
});
/* ================= ANATOMY (wave 4, part 2) ================= */
topic("anat", "Muscles of the Head, Neck and Trunk", {
  o: ["Name the main muscles of mastication and the neck", "Describe the abdominal wall muscles and the inguinal canal", "Explain the nuchal ligament in ungulates", "Relate muscle anatomy to surgical approaches and hernias"],
  i: "Muscles move the body, hold the organs in place and shape the carcass. Surgeons enter the abdomen through its muscular wall, so its layers must be known.",
  s: "The head has strong muscles for chewing. The neck of grazing animals is held up by a strong elastic ligament. The belly wall has layers of muscle crossing in different directions, and a weak spot there lets organs push through as a hernia.",
  n: [
    ["Muscles of mastication", "The masseter and temporalis close the jaw and are large in herbivores. The pterygoid muscles move the jaw sideways, giving the grinding movement of ruminants and horses. The digastricus opens the jaw. Facial nerve damage affects the muscles of the lips, cheeks and ears, causing a drooping face."],
    ["Neck muscles and nuchal ligament", "In ungulates the ligamentum nuchae is a strong elastic ligament running from the withers to the skull, holding the heavy head with little effort, helping the animal to graze. Muscles such as the splenius, brachiocephalicus and sternocephalicus raise, lower and turn the neck. The sternocephalicus and brachiocephalicus form the borders of the jugular groove."],
    ["Muscles linking the forelimb to the trunk", "The trapezius, rhomboideus, latissimus dorsi and serratus ventralis attach the scapula and limb to the trunk and take the weight of the body, since the animal has no collarbone joint with the trunk. The serratus ventralis forms a sling."],
    ["Abdominal wall", "From outside inwards: the skin and fascia, the external oblique, internal oblique, transversus abdominis and the peritoneum, plus the rectus abdominis along the underside. The aponeuroses of these muscles meet at the midline as the linea alba, a common site for abdominal incisions. Flank incisions go through all muscle layers."],
    ["Inguinal canal", "The inguinal canal is the passage through the abdominal wall for the spermatic cord in males. Its entrance is the deep inguinal ring and its exit the superficial inguinal ring. A weak or enlarged ring lets bowel pass through as an inguinal hernia, more common in boars and stallions."],
    ["Diaphragm and respiratory muscles", "The diaphragm separates thorax from abdomen and is the main muscle of breathing. It has openings for the aorta, oesophagus and vena cava. External intercostal muscles raise the ribs for inspiration, and internal ones assist expiration. Abdominal muscles assist forced expiration."],
    ["Hernias and clinical links", "A hernia is the protrusion of an organ through a weak or opened part of its containing wall. Umbilical hernia is common in calves and piglets. Ventral hernia can follow a rupture of the abdominal muscles in late pregnancy. A diaphragmatic hernia follows trauma and moves abdominal organs into the chest."]
  ],
  tb: { h: ["Muscle group", "Examples", "Function"], r: [["Mastication", "Masseter, temporalis, pterygoids", "Close the jaw and grind"], ["Neck", "Splenius, brachiocephalicus", "Raise and move the head and neck"], ["Forelimb attachment", "Trapezius, serratus ventralis", "Hold the trunk between the forelimbs"], ["Abdominal wall", "External oblique, rectus abdominis", "Support organs, breathing, straining"]] },
  df: ["Hernia: protrusion of an organ or tissue through an opening in the wall that normally contains it.", "Linea alba: the fibrous line along the ventral midline where the abdominal muscle sheaths meet.", "Ligamentum nuchae: the elastic ligament that supports the head and neck in ungulates."],
  tm: [["Aponeurosis", "Broad flat tendon"], ["Origin", "Fixed attachment of a muscle"], ["Insertion", "Attachment of a muscle at the part that moves"], ["Rectus abdominis", "Muscle along the ventral midline of the abdomen"], ["Superficial inguinal ring", "External opening of the inguinal canal"]],
  st: ["Cut through the skin and fascia.", "Identify the external oblique.", "Separate the layers of internal oblique and transversus.", "Reach the peritoneum.", "On closure, suture each layer in turn."],
  ex: ["A calf with a swelling at the navel probably has an umbilical hernia.", "A boar with swelling in the groin may have an inguinal hernia.", "A cow with a drooping ear and lip after an injury may have a facial nerve problem."],
  k: ["Muscles of mastication.", "Ligamentum nuchae.", "Layers of the abdominal wall.", "Inguinal canal.", "Types of hernia."],
  m: ["A hernia is not a tumour. It is a defect in the wall."],
  sa: [["Name the layers of the abdominal wall.", "Skin, fascia, external oblique, internal oblique, transversus abdominis and peritoneum, with the rectus abdominis ventrally."], ["What is the linea alba?", "The fibrous midline of the abdomen where the abdominal muscle sheaths meet."]],
  la: [["Describe the muscles of the abdominal wall and their clinical importance.", "Layers, fibre direction, aponeuroses, linea alba, inguinal canal, hernias, surgical approaches."]],
  q: [["The ligamentum nuchae is important in", ["Ungulates", "Birds", "Fish", "Humans only"], 0, "It supports the head in ungulates."],
    ["The main muscle of inspiration is the", ["Diaphragm", "Rectus abdominis", "Masseter", "Trapezius"], 0, "The diaphragm."],
    ["An umbilical hernia is common in", ["Calves and piglets", "Hens", "Fish", "Old dogs only"], 0, "Calves and piglets."],
    ["The linea alba lies along the", ["Ventral midline", "Spine", "Flank", "Jaw"], 0, "Ventral midline."]],
  f: [["Linea alba", "Midline fibrous line of the abdomen"], ["Masseter", "Main jaw-closing muscle"], ["Hernia", "Protrusion through a wall defect"], ["Deep inguinal ring", "Internal opening of the inguinal canal"]],
  d: ["Study the muscles of the limb in the dog.", "Learn the surgical approaches to the abdomen.", "Read about muscle fibre types."]
});

topic("anat", "Heart, Great Vessels and Circulation (Detailed)", {
  o: ["Describe the chambers, valves and conduction system of the heart", "Name the main arteries and veins of the body", "Trace the circulation, including the portal system", "Describe fetal circulation and its postnatal changes"],
  i: "The heart and vessels are examined at every clinical check. Pulse, heart sounds and venepuncture all depend on this anatomy.",
  s: "The heart has four chambers. The right side sends blood to the lungs and the left side sends it to the body. Arteries carry blood from the heart and veins return it. Before birth, the fetus uses special shortcuts that close after birth.",
  n: [
    ["Chambers and valves", "The right atrium receives blood from the body and passes it through the tricuspid valve to the right ventricle, which pumps to the lungs through the pulmonary valve. The left atrium receives oxygenated blood from the lungs and passes it through the mitral (bicuspid) valve to the left ventricle, which pumps through the aortic valve to the body. The left ventricle wall is thicker."],
    ["Conduction system", "The sinoatrial node in the right atrium is the pacemaker. The impulse passes to the atrioventricular node, then to the bundle of His, the bundle branches and Purkinje fibres, which spread it through the ventricles. In the ox and sheep a cardiac bone, the os cordis, supports the aortic root."],
    ["Heart sounds", "The first sound is closure of the atrioventricular valves at the start of ventricular contraction. The second sound is closure of the aortic and pulmonary valves. Murmurs are caused by turbulent flow, as in valve disease."],
    ["Major arteries", "The aorta leaves the left ventricle and gives the brachiocephalic trunk (to the head, neck and forelimbs), then continues as the descending aorta. The abdominal aorta gives the coeliac, cranial mesenteric, renal, gonadal and caudal mesenteric arteries and ends in the external and internal iliac arteries. The external iliac continues as the femoral artery in the hind limb."],
    ["Major veins", "The cranial vena cava collects blood from the head, neck and forelimbs. The jugular veins drain the head. The caudal vena cava returns blood from the abdomen and hind limbs. The portal vein carries blood from the stomach, intestine, spleen and pancreas to the liver before it returns to the heart."],
    ["Fetal circulation", "The fetus gets oxygen from the placenta through the umbilical vein. Three shunts reduce flow to the lungs and liver: the ductus venosus, the foramen ovale between the atria and the ductus arteriosus between the pulmonary artery and the aorta. After birth, these close. Failure of the ductus arteriosus to close (patent ductus arteriosus) is a common congenital heart defect in dogs."],
    ["Lymph and collateral supply", "Many organs have collateral blood supply that can compensate for the blockage of one vessel. The supply of the intestine is an example, but the portal system is vulnerable, as liver disease or portosystemic shunts show."]
  ],
  tb: { h: ["Structure", "Position", "Note"], r: [["Tricuspid valve", "Right atrioventricular", "Three cusps"], ["Mitral valve", "Left atrioventricular", "Two cusps"], ["SA node", "Right atrium", "Pacemaker"], ["Ductus arteriosus", "Pulmonary artery to aorta", "Closes after birth"], ["Foramen ovale", "Between the atria", "Closes after birth"]] },
  df: ["Pacemaker: the group of cells in the sinoatrial node that sets the heart rate.", "Portal system: vessels carrying blood from the gut to the liver.", "Patent ductus arteriosus: failure of the fetal ductus arteriosus to close after birth."],
  tm: [["Atrium", "Receiving chamber"], ["Ventricle", "Pumping chamber"], ["Purkinje fibres", "Conduction fibres in the ventricles"], ["Murmur", "Abnormal heart sound from turbulent flow"], ["Os cordis", "Cardiac bone of the ox"]],
  st: ["Blood from the body enters the right atrium.", "It passes to the right ventricle.", "It is pumped to the lungs.", "Oxygenated blood returns to the left atrium.", "It passes to the left ventricle.", "It is pumped through the aorta."],
  ex: ["A puppy with a continuous machinery murmur may have a patent ductus arteriosus.", "A cow with traumatic reticulopericarditis can show jugular distension and muffled heart sounds.", "A dog with a portosystemic shunt may show neurological signs because blood bypasses the liver."],
  k: ["Chambers and valves.", "Conduction system.", "Great vessels.", "Portal circulation.", "Fetal shunts."],
  m: ["The right side of the heart does not carry oxygenated blood in adults."],
  sa: [["Name the valves of the heart.", "Tricuspid, pulmonary, mitral (bicuspid) and aortic valves."], ["What is the pacemaker of the heart?", "The sinoatrial node."]],
  la: [["Describe the structure of the heart and its conduction system.", "Chambers, valves, wall layers, SA node to Purkinje fibres, blood supply, with a diagram."]],
  q: [["The mitral valve lies between the", ["Left atrium and ventricle", "Right atrium and ventricle", "Aorta and ventricle", "Atria"], 0, "Left atrium and ventricle."],
    ["Fetal blood reaches the lungs mainly through the", ["Ductus arteriosus bypass", "Portal vein", "Renal vein", "Coronary sinus"], 0, "The ductus arteriosus shunts blood away from the lungs."],
    ["The pacemaker is the", ["SA node", "AV node", "Purkinje fibres", "Aortic valve"], 0, "SA node."],
    ["The portal vein goes to the", ["Liver", "Lungs", "Kidney", "Brain"], 0, "The liver."]],
  f: [["Os cordis", "Bone in the ox heart"], ["SA node", "Pacemaker"], ["Ductus venosus", "Fetal shunt through the liver"], ["Murmur", "Abnormal sound from turbulence"]],
  d: ["Study the ECG.", "Learn congenital heart defects.", "Read about blood supply of the heart muscle."]
});

topic("anat", "Avian Skeleton, Muscles and Integument", {
  o: ["Describe the main bones of the fowl and their adaptations for flight", "Describe the breast muscles and their importance", "Describe feathers and the skin appendages of poultry", "Relate the anatomy to meat quality and disease"],
  i: "Poultry is a major livestock sector in India. The skeleton and muscle of the bird reflect adaptation to flight, and the breast muscle is the meat that is sold.",
  s: "A bird's bones are light and some are hollow. The keel on the breastbone supports powerful flight muscles. The skin has feathers, a comb and wattles, and an oil gland near the tail.",
  n: [
    ["Skeleton", "The skull is light, with a beak and no teeth. The neck has many mobile vertebrae. Thoracic vertebrae are fused, and the synsacrum fuses the lumbar, sacral and some caudal vertebrae with the pelvis. The pygostyle is the tail bone. Ribs have uncinate processes, which brace the rib cage. The sternum has a keel for muscle attachment, and the furcula (wishbone) and coracoid brace the wings."],
    ["Wing and leg bones", "The wing has the humerus, radius, ulna, and fused carpometacarpus. The leg has the femur, tibiotarsus, fibula (reduced) and tarsometatarsus. The thigh and drumstick are the muscle masses of the femur and tibiotarsus. Chickens have four toes, and the male has a spur on the tarsometatarsus."],
    ["Pneumatic bones", "Bones such as the humerus and parts of the skull, sternum, vertebrae and pelvis contain air connected to the air sacs. A respiratory infection can therefore reach the bone. A broken pneumatic bone can communicate with the respiratory system."],
    ["Muscles", "The pectoralis major is the largest muscle and lowers the wing in the downstroke. The supracoracoideus lies deeper and lifts the wing through a tendon that passes over the shoulder like a pulley. Together they form the breast meat. Breast meat is white because of its fast, glycolytic fibres, while leg meat is darker because of its slower, oxidative fibres."],
    ["Skin and feathers", "The skin is thin and has no sweat glands. Feathers include contour feathers, down feathers and filoplumes. Feathers are made of keratin and regularly moulted. The comb, wattles and ear lobes are important for temperature control and for identifying breeds, and a bright comb indicates good health and laying condition."],
    ["Uropygial gland and beak", "The uropygial (preen) gland above the tail secretes oil that the bird spreads on the feathers. The beak is covered with a horny sheath. Beak trimming of chicks is done as a management measure to reduce injury from feather pecking and cannibalism. Its welfare implications are debated."],
    ["Clinical links", "Keel bone damage and fractures occur in laying hens because of weak bones from calcium loss. Cage layer fatigue is a bone-weakness condition. Breast blisters are skin lesions from pressure. Pododermatitis (bumblefoot) comes from poor litter conditions. Wing and leg abnormalities can come from genetic and nutritional causes."]
  ],
  tb: { h: ["Part", "Detail", "Importance"], r: [["Keel", "Ridge of the sternum", "Attachment of the flight muscles"], ["Furcula", "Wishbone", "Braces the shoulder girdle"], ["Pygostyle", "Fused tail vertebrae", "Supports tail feathers"], ["Synsacrum", "Fused vertebrae and pelvis", "Rigid frame for the hind limbs"], ["Uropygial gland", "Preen gland", "Oil for the feathers"]] },
  df: ["Pneumatic bone: a bone containing air spaces connected with the respiratory system.", "Synsacrum: the fusion of lumbar and sacral vertebrae with the pelvis in birds.", "Keratin: the tough structural protein of feathers, beak and claws."],
  tm: [["Furcula", "Wishbone formed by fused clavicles"], ["Uncinate process", "Bony projection of the rib in birds"], ["Tibiotarsus", "Drumstick bone"], ["Tarsometatarsus", "Fused lower leg bone of the bird"], ["Moulting", "Seasonal shedding and replacement of feathers"]],
  st: ["Examine the bird for general condition.", "Check the comb and feathers.", "Palpate the keel for deformity.", "Check legs, feet and joints.", "Record any lesion and its location."],
  ex: ["A hen with a fractured keel bone often has weak bones from calcium loss.", "A bird with bumblefoot has a swollen foot from poor litter conditions.", "Dark meat in the thigh comes from slow oxidative fibres."],
  k: ["Bones and their fusion.", "Pneumatic bones.", "Breast muscles.", "Feather types.", "Uropygial gland."],
  m: ["Birds do not have sweat glands. They cool by panting and by the comb and wattles."],
  sa: [["What is the keel?", "The ridge on the sternum of birds for attaching the flight muscles."], ["What does the uropygial gland do?", "It secretes oil for preening the feathers."]],
  la: [["Describe the skeleton of the fowl and its adaptations.", "Skull, vertebrae, synsacrum, pygostyle, ribs with uncinate processes, sternum with keel, wing and leg bones, pneumatic bones."]],
  q: [["The wishbone is the", ["Furcula", "Keel", "Pygostyle", "Synsacrum"], 0, "Furcula."],
    ["The largest breast muscle is the", ["Pectoralis major", "Supracoracoideus", "Masseter", "Biceps"], 0, "Pectoralis major."],
    ["The preen gland is the", ["Uropygial gland", "Thyroid", "Bursa", "Parotid"], 0, "Uropygial gland."],
    ["Pneumatic bones contain", ["Air", "Fat only", "Water", "Nothing"], 0, "Air spaces."]],
  f: [["Keel", "Sternal ridge for flight muscles"], ["Furcula", "Wishbone"], ["Pygostyle", "Tail bone of fused vertebrae"], ["Bumblefoot", "Foot infection from poor litter"]],
  d: ["Study the anatomy of the duck.", "Learn the skeletal disorders of broilers.", "Read about feather quality and moulting."]
});

topic("anat", "Anatomy of the Dog and Cat: Key Features", {
  o: ["State the vertebral formulae of the common species", "Describe the key anatomical features of the dog and cat", "Relate anatomy to common small animal clinical work", "Compare the dog with the cat"],
  i: "Small animal practice is growing rapidly in India. This topic collects the facts most often needed in the clinic and the dissection hall.",
  s: "Dogs and cats are carnivores with strong sharp teeth, flexible spines, and muscular limbs. The cat is more flexible, has retractable claws and a rough tongue. Both have scent glands near the anus called anal sacs.",
  n: [
    ["Vertebral formulae", "The formula shows the number of vertebrae in each region. Approximate values: dog C7 T13 L7 S3 Cd 20 to 23; cat C7 T13 L7 S3 Cd 18 to 25; horse C7 T18 L6 S5 Cd 15 to 21; ox C7 T13 L6 S5 Cd 18 to 20; pig C7 T14 to 15 L6 to 7 S4 Cd 20 to 23. The numbers vary a little, so verify them against your textbook."],
    ["Skeleton and body shape", "Dogs differ widely in size and skull shape between breeds. The cat has a flexible spine and a small clavicle that does not join other bones. The dog's forelimb is held to the trunk by muscle, and dogs run on their toes (digitigrade). The cat has retractable claws."],
    ["Digestive features", "The carnassial teeth shear meat. The tongue of the cat has rough papillae for rasping and grooming. Dogs and cats have a simple stomach and relatively short intestine. The liver has several lobes."],
    ["Anal sacs", "A pair of anal sacs open on each side of the anus. They hold a strong-smelling secretion used for scent marking. Blockage or infection of the sacs causes scooting and discomfort and is a common reason for a visit to the clinic."],
    ["Reproductive features", "The bitch has about 8 to 10 mammary glands and the queen 8. Both have a bicornuate uterus with a zonary placenta. The tomcat's penis has small spines (barbs) and the cat is an induced ovulator. The dog's penis has the os penis and bulbus glandis."],
    ["Sense organs", "The cat has a vertical slit pupil and a strong tapetum, giving excellent night vision. Both have sensitive hearing, a good sense of smell and vibrissae (whiskers) used as touch organs."],
    ["Clinical sites", "Venepuncture uses the cephalic, saphenous and jugular veins. The femoral artery is used for pulse. Heart sounds are heard on the left chest wall. Abdominal palpation can detect the kidneys, bladder, intestines, and, in pregnancy, the uterus."]
  ],
  tb: { h: ["Species", "Vertebral formula (approx.)", "Ribs"], r: [["Dog", "C7 T13 L7 S3 Cd 20 to 23", "13 pairs"], ["Cat", "C7 T13 L7 S3 Cd 18 to 25", "13 pairs"], ["Horse", "C7 T18 L6 S5 Cd 15 to 21", "18 pairs"], ["Ox", "C7 T13 L6 S5 Cd 18 to 20", "13 pairs"], ["Pig", "C7 T14 to 15 L6 to 7 S4 Cd 20 to 23", "14 to 15 pairs"]] },
  df: ["Digitigrade: walking on the toes, with the heel raised.", "Induced ovulator: a species in which ovulation follows mating, as in the cat.", "Carnassial teeth: the large shearing teeth of carnivores."],
  tm: [["Anal sacs", "Scent-producing sacs beside the anus of carnivores"], ["Vibrissae", "Whiskers"], ["Barbs", "Small spines on the tomcat's penis"], ["Queen", "Female cat"], ["Cd", "Caudal (coccygeal) vertebrae"]],
  st: ["Observe the posture and gait.", "Examine the head, eyes, ears and mouth.", "Palpate the abdomen.", "Auscultate the chest.", "Check the anal region and genitalia.", "Record findings."],
  ex: ["A dog that scoots across the floor may have impacted anal sacs.", "A cat that does not ovulate unless mated is called an induced ovulator.", "Large breed dogs may have joint disease linked to rapid growth."],
  k: ["Vertebral formulae.", "Carnassial teeth.", "Anal sacs.", "Reproduction in the cat.", "Clinical sites."],
  m: ["Cats are not just small dogs. Their anatomy and physiology differ in important ways."],
  sa: [["What is an induced ovulator?", "A species such as the cat in which ovulation is triggered by mating."], ["Where are the anal sacs located?", "On either side of the anus."]],
  la: [["Compare the dog and the cat anatomically.", "Skeleton, teeth, digestive, reproductive and sensory differences, with clinical implications."]],
  q: [["The cat is an", ["Induced ovulator", "Spontaneous ovulator", "Seasonal anoestrus animal only", "Egg laying species"], 0, "Induced ovulator."],
    ["The dog's thoracic vertebrae number", ["13", "18", "7", "20"], 0, "13."],
    ["Scooting in a dog may indicate", ["Anal sac problems", "Dental disease", "Ear infection", "Eye disease"], 0, "Anal sac impaction."],
    ["Carnassial teeth are used to", ["Shear meat", "Crush grain", "Dig", "Drink"], 0, "Shear meat."]],
  f: [["Digitigrade", "Walking on toes"], ["Queen", "Female cat"], ["Vibrissae", "Whiskers"], ["Carnassials", "Shearing teeth of carnivores"]],
  d: ["Study canine breed variation.", "Learn feline radiographic anatomy.", "Read about feline reproduction."]
});

topic("anat", "Integument: Skin, Hair and Skin Glands", {
  o: ["Describe the layers of the skin", "Describe the hair follicle and the types of hair", "Name the skin glands and their functions", "Link skin structure to common skin conditions"],
  i: "Skin is the largest organ and the first barrier against the environment. Hides and wool are also valuable products, so a clinician and a livestock technologist both need this anatomy.",
  s: "The skin has three layers: a thin outer epidermis, a thicker dermis with vessels and nerves, and a fatty layer underneath. It carries hair, glands, claws and horns. It protects, regulates temperature and senses touch.",
  n: [
    ["Epidermis", "The epidermis is stratified squamous keratinised epithelium without blood vessels. Its layers from deep to surface are the basal layer, spinous layer, granular layer and the dead horny layer (stratum corneum). Melanocytes in the basal layer give colour. The epidermis renews continuously."],
    ["Dermis and hypodermis", "The dermis is dense connective tissue that contains vessels, nerves, hair follicles and glands. Its thickness decides the quality of leather. The hypodermis (subcutis) beneath the dermis is loose connective tissue with fat and lets the skin move over the body. Subcutaneous injections are given here."],
    ["Hair and follicles", "A hair grows from a follicle with a bulb at its base. Each follicle has an arrector pili muscle and one or more sebaceous glands. Hair grows in cycles of growth, rest and shedding. Primary and secondary follicles give guard hairs and undercoat. Sheep have wool follicles with very long growth phases, giving wool as a product."],
    ["Skin glands", "Sebaceous glands secrete oil (sebum) that keeps the hair and skin supple. Sweat (sudoriferous) glands are abundant in the horse and cattle, less so in the dog, which pants instead, and absent in the pig's body skin except for a few. Special glands include the interdigital glands of sheep, the horn glands of goats and the mammary glands, which are modified sweat glands."],
    ["Specialised structures", "Claws, hooves and horns are keratinised derivatives of the epidermis. Footpads of dogs and cats have thick epidermis and fat. Tactile hairs (vibrissae) have rich nerve supply."],
    ["Functions of skin", "Protection from injury and microbes, barrier to water loss, temperature regulation through hair, sweat and blood flow, sense of touch, pain and temperature, vitamin D synthesis with sunlight, and storage of fat. Colour of the coat is due to melanin."],
    ["Clinical links", "Mange, ringworm, ticks, dermatitis, photosensitisation and tumours affect the skin. A skin scraping is taken for mites. Wound healing depends on the layers cut. Hide damage from warbles, ticks and brand marks reduces leather quality."]
  ],
  tb: { h: ["Layer", "Tissue", "Main features"], r: [["Epidermis", "Keratinised stratified squamous epithelium", "No vessels, renews continuously"], ["Dermis", "Dense connective tissue", "Vessels, nerves, follicles, glands"], ["Hypodermis", "Loose connective tissue and fat", "Insulation, mobility"]] },
  df: ["Integument: the skin and its appendages.", "Sebum: the oily secretion of the sebaceous glands.", "Keratinisation: the process by which epidermal cells fill with keratin and die to form the horny layer."],
  tm: [["Stratum corneum", "Outermost dead horny layer"], ["Melanocyte", "Pigment-producing cell"], ["Arrector pili", "Small muscle that raises the hair"], ["Follicle", "Pit in the skin from which a hair grows"], ["Hypodermis", "Subcutaneous layer"]],
  st: ["Part the hair and examine the skin surface.", "Note colour, thickness, lesions and parasites.", "Palpate for lumps, heat or pain.", "Take a scraping or sample if needed.", "Record the site and appearance of lesions."],
  ex: ["A mange mite lives in the epidermis and causes itching and hair loss.", "Warble holes in the hide lower the value of leather.", "A cow's skin thickness varies by body region and affects the injection site."],
  k: ["Layers of the skin.", "Hair follicle.", "Skin glands.", "Functions of skin."],
  m: ["The epidermis has no blood vessels. Bleeding means the dermis is cut."],
  sa: [["Name the layers of the skin.", "Epidermis, dermis and hypodermis."], ["What is sebum?", "The oily secretion of the sebaceous glands."]],
  la: [["Describe the structure of the skin.", "Epidermal layers, dermis, hypodermis, hair follicle, glands, functions, clinical relevance."]],
  q: [["The outermost layer of the epidermis is the", ["Stratum corneum", "Stratum basale", "Dermis", "Hypodermis"], 0, "Stratum corneum."],
    ["Melanocytes are found in the", ["Basal layer", "Horny layer", "Hypodermis", "Hair shaft"], 0, "Basal layer of the epidermis."],
    ["The oily secretion of the skin is", ["Sebum", "Sweat", "Milk", "Mucus"], 0, "Sebum."],
    ["Subcutaneous injections go into the", ["Hypodermis", "Epidermis", "Muscle", "Bone"], 0, "Hypodermis."]],
  f: [["Sebum", "Skin oil"], ["Arrector pili", "Muscle that raises hair"], ["Melanocyte", "Pigment cell"], ["Hypodermis", "Subcutaneous layer"]],
  d: ["Study skin diseases in the dog.", "Learn wool and hair structure.", "Read about the leather industry."]
});

topic("anat", "Dissection Skills and Radiographic Anatomy", {
  o: ["Describe a systematic approach to dissecting an animal", "Explain basic radiographic terms and views", "Identify normal structures on a radiograph in principle", "Describe safety and ethical practice in the dissection hall and radiology room"],
  i: "Anatomy is learned best by looking, touching and drawing. A disciplined approach to dissection and a basic understanding of the radiograph tie the textbook to clinical work.",
  s: "In dissection you work from the surface inward, one layer at a time, and draw what you see. On an X-ray picture, bones look white, air looks black and soft tissue is grey, so you recognise organs by their shape and density.",
  n: [
    ["Preparing to dissect", "Wear a clean apron, gloves and closed shoes. Read the dissection guide before cutting, and have your atlas and textbook ready. Handle preserved specimens with care since they may contain formalin. Treat the animal with respect."],
    ["Basic technique", "Make a clean skin incision and reflect the skin. Clean the fascia by blunt dissection with forceps and the handle of the scalpel. Identify muscles by their direction. Follow vessels and nerves along their course. Do not cut structures before they are identified. Pin or label important parts."],
    ["A systematic order", "Study region by region, for example head and neck, then forelimb, thorax, abdomen, pelvis, hind limb. In each region move from superficial to deep, and from large structures to small. Keep notes and draw what you find."],
    ["Radiographic principles", "X-rays pass through the body and darken the film or sensor depending on tissue density. Air (lungs) is radiolucent and appears black. Fat appears dark grey, soft tissue and fluid medium grey and bone white (radiopaque). Metal and contrast media appear brightest."],
    ["Views and positioning", "Standard views are lateral (side) and ventrodorsal or dorsoventral. Two views at right angles are needed because one view flattens depth. The animal must be positioned correctly, usually under sedation, and the side marker shows which side is nearest the film."],
    ["Reading a radiograph", "Use a systematic approach: check the quality and the markers, look at all the bones, then the soft tissue, then the organs. Look at size, shape, position, opacity and margins. Know the normal first. Young animals have growth plates (physes), which look like lines and can be mistaken for fractures."],
    ["Safety and ethics", "Radiation exposure should be as low as reasonably possible. Use lead aprons, gloves and thyroid shields, keep your distance, never hold the animal by hand during the exposure and use a collimated beam. Follow local radiation safety rules. Use cadavers and specimens with respect and follow the college rules on disposal."]
  ],
  tb: { h: ["Material", "Appearance on X-ray", "Term"], r: [["Air", "Black", "Radiolucent"], ["Fat", "Dark grey", "Intermediate"], ["Soft tissue and fluid", "Grey", "Intermediate"], ["Bone", "White", "Radiopaque"], ["Metal", "Brightest white", "Radiopaque"]] },
  df: ["Radiopaque: a material that absorbs X-rays and appears white on a radiograph.", "Radiolucent: a material that lets X-rays pass and appears dark on a radiograph.", "Physis: the growth plate of a long bone in a young animal."],
  tm: [["Lateral view", "View taken from the side"], ["Ventrodorsal view", "Taken with the X-ray beam entering from the belly side to the back"], ["Collimation", "Narrowing the X-ray beam to the area of interest"], ["Contrast medium", "A substance that makes organs visible on a radiograph"], ["Artefact", "Something on an image that is not part of the animal"]],
  st: ["Check the request and prepare the animal.", "Position carefully with the correct marker.", "Use protective equipment and leave the room.", "Take the exposure.", "Check the image quality.", "Read it systematically and record the findings."],
  ex: ["A chest radiograph shows dark lung fields and a grey heart shadow.", "A growth plate in a puppy looks like a fracture line to a beginner.", "A foreign body in the stomach of a dog can show as a bright object."],
  k: ["Steps of dissection.", "Radiographic densities.", "Two views.", "Radiation safety.", "Systematic reading."],
  m: ["A radiograph is not a photograph. It is a shadow picture that adds up all tissues in the beam."],
  sa: [["Why are two views taken?", "A single view flattens depth, so two views at right angles are needed to locate a lesion."], ["What does radiopaque mean?", "A material that absorbs X-rays and appears white."]],
  la: [["Describe the principles of radiography and the radiographic appearance of different tissues.", "How X-rays work, tissue densities, views, positioning, systematic reading, safety."]],
  q: [["Bone appears on a radiograph as", ["White", "Black", "Dark grey", "Colourless"], 0, "Radiopaque, so white."],
    ["Air in the lungs looks", ["Black", "White", "Bright", "Grey"], 0, "Black."],
    ["Growth plates are found in", ["Young animals", "Old animals only", "Birds only", "Cats only"], 0, "Young animals."],
    ["To reduce radiation exposure, staff should", ["Use lead aprons and distance", "Hold the animal without protection", "Stand in the beam", "Remove the collimator"], 0, "Protection and distance."]],
  f: [["Radiolucent", "Appears dark"], ["Radiopaque", "Appears white"], ["Physis", "Growth plate"], ["Collimation", "Narrowing the beam"]],
  d: ["Practise reading normal thoracic radiographs.", "Learn about ultrasonography.", "Study contrast studies of the gut."]
});
planned("anat", ["Neuroanatomy: tracts, nuclei and the autonomic ganglia", "Comparative anatomy of the foot: joint capsules and bursae", "Salivary glands, pharynx and the oral cavity in detail", "Topographic anatomy of the thoracic and abdominal cavities", "Anatomy of the fish and exotic pets", "Applied anatomy of the horse's limb", "Mammary gland of the sow, mare and bitch", "Vascular anatomy of the head: arterial supply to the brain"]);
/* ================= ANATOMY (syllabus-matched region topics, part 1) ================= */
unit("anat", "Syllabus Unit 1 – General splanchnology");
topic("anat", "General Splanchnology: Body Cavities and Topography of Organs", {
  o: ["Define the thoracic, abdominal and pelvic cavities and state their boundaries", "Describe the position of the main organs of each system in the ox", "Name the regions of the abdomen", "Compare topography in the horse, dog, pig and fowl"],
  i: "Splanchnology is the study of the viscera, the organs inside the body cavities. The syllabus asks for the boundaries of the three cavities and the topography of the digestive, respiratory, urinary, endocrine and reproductive organs. A vet who knows where each organ lies can palpate, listen and operate with confidence.",
  s: "The trunk has a chest (thoracic) cavity, a belly (abdominal) cavity and a pelvic cavity. The diaphragm divides chest from belly. The belly continues into the pelvis with no wall between them. Each organ has a usual place, and in the ox the huge rumen fills the left side.",
  n: [
    ["Thoracic cavity", "The cavity is bounded dorsally by the thoracic vertebrae, laterally by the ribs and intercostal muscles, ventrally by the sternum and costal cartilages, cranially by the thoracic inlet (first rib, first thoracic vertebra and manubrium) and caudally by the diaphragm. It contains the lungs in two pleural sacs and the mediastinum with the heart, trachea, oesophagus, thymus (young animals), great vessels, nerves and lymph nodes. The diaphragm is dome-shaped and bulges forward into the chest, so the chest is smaller than its outside suggests."],
    ["Abdominal cavity", "It is bounded dorsally by the lumbar vertebrae and sublumbar muscles, laterally and ventrally by the muscular abdominal wall, cranially by the diaphragm and caudally by the pelvic inlet. It is lined by peritoneum. Part of it lies under the rib cage (intrathoracic abdomen), which is why the liver, stomach and spleen lie partly behind the ribs."],
    ["Pelvic cavity", "It is bounded dorsally by the sacrum and first caudal vertebrae, laterally by the ilium and sacrosciatic ligament, ventrally by the pubis and ischium, cranially by the pelvic inlet and caudally by the pelvic outlet. It contains the rectum, urinary bladder, urethra and the internal genital organs. The size of the pelvis matters in calving."],
    ["Regions of the abdomen", "The abdomen is divided into cranial, middle and caudal regions, each with a median part and right and left sides. The cranial regions are the xiphoid and the right and left hypochondriac regions. The middle regions are the umbilical and the lateral (flank) regions. The caudal regions are the pubic region and the right and left inguinal regions. The paralumbar fossa, the hollow of the flank, belongs to the lateral region."],
    ["Ox: digestive organs", "The reticulum lies against the diaphragm, in front of the rumen, at about the level of the 6th to 8th ribs, close to the heart. The rumen occupies most of the left abdomen from diaphragm to pelvis. The omasum lies on the right, and the abomasum on the floor of the abdomen, mostly to the right. The liver is on the right, partly under the ribs. The intestines lie on the right side in a coiled mass, with the caecum near the right flank. The spleen is on the left, attached to the rumen."],
    ["Ox: other systems", "The lungs lie in the chest, the heart in the lower chest between the 3rd and 5th ribs, mainly on the left. The kidneys lie against the roof of the abdomen, the left one displaced to the right behind the rumen. The thyroid lies by the larynx and trachea, the adrenals near the kidneys and the pancreas along the duodenum. The female tract lies partly in the abdomen (ovaries, uterine horns) and partly in the pelvis (cervix, vagina). The testes hang outside in the scrotum."],
    ["Differences in the horse, dog, pig and fowl", "The horse has a small stomach on the left under the ribs and a huge caecum and colon filling most of the belly. The dog has a stomach on the left under the ribs, a long mobile spleen, and short intestines. The pig has a spiral colon on the left. The fowl has no diaphragm, so the thoracic and abdominal cavities are not separated, and has air sacs, a crop, a proventriculus and gizzard, and a cloaca."]
  ],
  tb: { h: ["Cavity", "Roof", "Floor", "Main contents"], r: [["Thoracic", "Thoracic vertebrae", "Sternum", "Lungs, heart, trachea, oesophagus, thymus"], ["Abdominal", "Lumbar vertebrae", "Abdominal muscles, linea alba", "Stomach, intestines, liver, spleen, kidneys, internal genitalia"], ["Pelvic", "Sacrum", "Pubis and ischium", "Rectum, bladder, urethra, genital organs"]] },
  df: ["Splanchnology: the study of the viscera.", "Viscera: the internal organs of the body cavities.", "Topography: the position of organs in relation to one another and to the body surface."],
  tm: [["Thoracic inlet", "Opening at the front of the chest"], ["Pelvic outlet", "Opening at the back of the pelvis"], ["Mediastinum", "Space between the pleural sacs"], ["Paralumbar fossa", "Hollow of the flank"], ["Peritoneum", "Serous membrane lining the abdomen"]],
  st: ["Place the animal in the correct position for study.", "Identify the boundaries of the cavity.", "Open it and see which organs lie where.", "Compare the left and right sides.", "Record the position in relation to ribs and vertebrae."],
  ex: ["Hardware disease: the reticulum lies against the diaphragm and near the heart, so a sharp object can pierce the heart sac.", "The rumen on the left explains why rumen sounds are listened to in the left flank.", "A mare's huge colon explains why colic is so common."],
  k: ["Boundaries of the three cavities.", "Topography of the ox organs.", "Regions of the abdomen.", "Differences in horse, dog, pig and fowl."],
  m: ["The abdominal and pelvic cavities are continuous. There is no wall between them."],
  sa: [["Name the boundaries of the thoracic cavity.", "Thoracic vertebrae dorsally, ribs laterally, sternum ventrally, thoracic inlet in front and diaphragm behind."], ["Where does the reticulum lie in the ox?", "Against the diaphragm, in front of the rumen, close to the heart."]],
  la: [["Describe the topography of the abdominal viscera of the ox.", "Rumen left, reticulum cranial against the diaphragm, omasum and abomasum right, liver right, intestines right, spleen left, kidneys, with a sketch."]],
  q: [["The reticulum lies close to the", ["Diaphragm and heart", "Pelvis", "Left kidney", "Bladder"], 0, "Against the diaphragm, near the heart."],
    ["The ox rumen lies mainly on the", ["Left side", "Right side", "Midline only", "In the chest"], 0, "Left."],
    ["A fowl has no", ["Diaphragm", "Liver", "Heart", "Kidney"], 0, "No diaphragm, so no separate thoracic and abdominal cavities."],
    ["The paralumbar fossa belongs to the", ["Flank", "Brisket", "Loin only", "Groin"], 0, "The flank."]],
  f: [["Viscera", "Internal organs of the cavities"], ["Thoracic inlet", "Opening at the front of the chest"], ["Peritoneum", "Serous lining of the abdomen"], ["Hypochondriac region", "Cranial abdomen beside the xiphoid region"]],
  d: ["Draw the topography of the ox viscera on both sides.", "Compare with the horse.", "Learn the peritoneal reflections."]
});

unit("anat", "Syllabus Unit 2 – Fore limb");
topic("anat", "Fore Limb of the Ox: Bones, Joints, Stay Apparatus, Nerves and Vessels", {
  o: ["Name the bones and joints of the ox fore limb and compare with horse, dog, pig and fowl", "Describe the stay apparatus of the horse's fore limb", "Describe the brachial plexus and main nerves of the fore limb", "Explain the clinical importance of nerve paralysis and nerve block sites"],
  i: "The fore limb carries most of the body weight and is the commonest site of lameness. The syllabus asks for the ox as the reference animal and for differences in the horse, dog, pig and fowl, including the hoof, the stay apparatus, nerves, vessels and lymph nodes.",
  s: "The fore limb is joined to the trunk by muscles. Its bones run from the shoulder blade down to the toes. The horse locks its limb so that it can stand and sleep without tiring. Nerves from a plexus near the shoulder supply the limb. If a nerve is damaged, the limb shows a typical drop or weakness.",
  n: [
    ["Bones of the ox fore limb", "The scapula has a spine that divides it into supraspinous and infraspinous fossae. The humerus has the head, the deltoid tuberosity and the condyle. The radius is the main weight-bearing bone of the forearm, and the ulna is fused with it in the adult, the olecranon forming the point of the elbow. The carpus has six bones: radial, intermediate, ulnar and accessory in the proximal row, and a fused second and third carpal and a fourth carpal in the distal row. The large metacarpal bone (cannon bone) is formed by the fusion of metacarpals III and IV, with a small rudimentary metacarpal V. Each of the two digits (III and IV) has three phalanges and the sesamoid bones."],
    ["Differences in other species", "Horse: one functional digit (III) with splint bones II and IV, carpus of seven or eight bones, a one-piece radius with fused ulna. Dog: radius and ulna separate and able to rotate, seven carpal bones (radial-intermediate fused), five metacarpals, five digits with claws. Pig: four digits, the two main ones (III and IV) bear weight. Fowl: the wing has a humerus, radius, ulna and a fused carpometacarpus with three digits reduced."],
    ["Joints", "The shoulder joint is a ball-and-socket joint with no collateral ligaments, and so is stabilised by muscles and tendons. The elbow is a hinge joint. The carpus is a compound joint (antebrachiocarpal, middle carpal and carpometacarpal). The fetlock (metacarpophalangeal), pastern (proximal interphalangeal) and coffin (distal interphalangeal) joints complete the limb. Joints are named by the bones that meet."],
    ["Stay apparatus (horse)", "The stay apparatus lets the horse stand with minimal muscular effort. In the fore limb it is made of the biceps tendon, with the lacertus fibrosus joining it to the extensor carpi radialis, which prevents flexion of the shoulder and elbow and extension of the carpus. The suspensory ligament, the proximal and distal sesamoid ligaments and the superficial and deep digital flexor tendons with their check ligaments support the fetlock and prevent over-extension. Rupture or overload of these structures, such as bowed tendons, causes lameness."],
    ["Hoof of the ox and horse", "The ox has two claws on each foot with two dewclaws, and the horse a single hoof with wall, sole, frog, bars and white line. These are described in detail in the hoof topic, together with laminitis and common bovine claw lesions."],
    ["Nerves of the fore limb", "The brachial plexus arises from the ventral branches of the last cervical and first thoracic nerves (C6 to T2 in the dog). It gives the suprascapular, subscapular, axillary, musculocutaneous, radial, median and ulnar nerves. The suprascapular nerve supplies the supraspinatus and infraspinatus, and its injury causes atrophy of these muscles and a prominent shoulder, called shoulder sweeny in the horse. The radial nerve supplies the extensor muscles of the elbow, carpus and digits, and its paralysis causes a dropped elbow and a knuckled carpus and fetlock. The median and ulnar nerves supply the flexor muscles and the skin of the lower limb. The digital (palmar) nerves are blocked to find the site of foot pain, but only a vet should do it."],
    ["Vessels and lymph nodes", "The subclavian artery continues as the axillary and then the brachial artery, which gives the median artery to the lower limb. The main veins are the cephalic vein on the front of the forearm, which is used for intravenous injection in the dog, and the accessory cephalic, brachial and median veins. Lymph from the limb drains to the superficial cervical (prescapular) node and to the axillary nodes where present."]
  ],
  tb: { h: ["Species", "Functional digits", "Radius and ulna", "Special feature"], r: [["Ox", "2 (III and IV)", "Fused in the adult", "Cannon bone from metacarpals III and IV"], ["Horse", "1 (III)", "Ulna reduced and fused", "Stay apparatus"], ["Dog", "5", "Separate, can rotate", "Claws, dewclaw"], ["Pig", "4", "Separate", "Two main and two small digits"], ["Fowl", "Wing", "Radius and ulna present", "Fused carpometacarpus"]] },
  df: ["Stay apparatus: the arrangement of tendons and ligaments that supports a limb with little muscular effort.", "Brachial plexus: the network of nerves that supplies the fore limb.", "Dropped elbow: the posture of radial nerve paralysis in which the elbow hangs low and the limb cannot be extended."],
  tm: [["Cannon bone", "The large metacarpal bone"], ["Olecranon", "Point of the elbow"], ["Fetlock", "Metacarpophalangeal joint"], ["Check ligament", "Ligament joining a flexor tendon to a bone"], ["Sweeny", "Atrophy of the shoulder muscles from suprascapular nerve injury"]],
  st: ["Identify the bones from scapula to phalanges.", "Name the joints between them.", "Trace the stay apparatus from muscle to tendon to ligament.", "Follow the brachial plexus to its branches.", "Match each nerve to the muscles it supplies and the sign of its injury."],
  ex: ["A horse with a shrunken shoulder muscle after a kick may have suprascapular nerve damage (sweeny).", "A cow with a radial nerve injury after lying on a hard floor drags her knuckled foot.", "A dog's cephalic vein is a common site for an intravenous drip."],
  k: ["Bones of the ox limb with number of carpal bones.", "Species differences.", "Stay apparatus.", "Brachial plexus and radial nerve paralysis.", "Cephalic vein."],
  m: ["The ox cannon bone is not one original bone. It is two fused metacarpals."],
  sa: [["What is the stay apparatus?", "A system of tendons and ligaments that supports the limb so that the horse can stand with little muscle effort."], ["Which nerve is injured in shoulder sweeny?", "The suprascapular nerve."]],
  la: [["Describe the bones and joints of the fore limb of the ox and note the differences in the horse and dog.", "Bones from scapula to phalanges, joints, species differences in digits, carpus and radius-ulna, with a table."]],
  q: [["The cannon bone of the ox is formed by", ["Metacarpals III and IV", "Metacarpal II only", "Metacarpals I and II", "The phalanges"], 0, "Fused metacarpals III and IV."],
    ["Radial nerve paralysis causes", ["Dropped elbow", "Loss of vision", "Winged scapula only", "Lameness of the hind limb"], 0, "A dropped elbow and a knuckled limb."],
    ["The dog's carpus has how many bones?", ["7", "6", "8", "4"], 0, "Seven."],
    ["The cephalic vein is used for injection in the", ["Dog", "Fowl only", "Pig only", "Horse hind limb"], 0, "Dog."]],
  f: [["Stay apparatus", "Passive support structure of the horse's limb"], ["Brachial plexus", "Nerve network of the fore limb"], ["Carpus of ox", "Six bones"], ["Suprascapular nerve", "Supplies the supraspinatus and infraspinatus"]],
  d: ["Dissect and trace the radial nerve in a specimen.", "Study the stay apparatus of the hind limb.", "Read about digital nerve blocks with your teacher."]
});
/* ================= ANATOMY (syllabus-matched region topics, part 2) ================= */
unit("anat", "Syllabus Unit 3 – Head and neck");
topic("anat", "Head and Neck Regions: Cavities, Muscles, Glands, Nerves and Clinical Sites", {
  o: ["State the boundaries of the oral, orbital, nasal and cranial cavities", "Describe the pharynx, larynx, tongue and salivary glands with species differences", "Describe the jugular furrow, carotid sheath and cranial nerve supply", "Name the head landmarks used for pulse, injections and nerve blocks"],
  i: "The syllabus asks for the head and neck of the ox with differences in the horse, dog, pig and fowl. This is the area where a vet takes the pulse, collects blood, gives injections and examines the mouth, eyes and ears, so landmarks matter.",
  s: "The head has four main spaces: the mouth, the eye sockets, the nose and the brain case. The neck has seven vertebrae, strong muscles and a groove on each side carrying the jugular vein. Nerves from the brain supply the face, tongue and throat.",
  n: [
    ["Cavities of the head", "The cranial cavity holds the brain and is formed by the cranial bones. The orbit holds the eyeball and is complete (closed by bone) in the ox, horse and pig, and incomplete in the dog and cat, where a ligament closes the gap. The nasal cavity is divided by the septum and contains turbinates. The oral cavity lies between the upper and lower jaws and contains the tongue and teeth."],
    ["Paranasal sinuses", "In the ox the frontal sinus is very large and extends into the horn core (the cornual diverticulum). The ox also has maxillary, palatine, sphenoid and lacrimal sinuses, and conchal sinuses. The horse has frontal, rostral and caudal maxillary, sphenopalatine and conchal sinuses. The dog has a frontal sinus and a maxillary recess rather than a true maxillary sinus. The pig has a large frontal sinus extending far back over the brain. Sinus infection, for example after dehorning, can follow an open sinus."],
    ["Neck vertebrae and ligaments", "Seven cervical vertebrae are present in all domestic mammals. The atlas has large wings and the axis has the dens, allowing nodding at the atlanto-occipital joint and rotation at the atlantoaxial joint. In ungulates the elastic nuchal ligament, with funicular and lamellar parts, supports the head."],
    ["Muscles", "Muscles of the face move the lips, cheeks, nostrils and ears. The masseter, temporalis and pterygoids chew, the digastricus opens the mouth, the muscles of the tongue, pharynx, soft palate, hyoid and larynx help swallowing and voice. Superficial neck muscles include the brachiocephalicus, sternocephalicus and omohyoideus (in some species)."],
    ["Tongue, pharynx and larynx", "The tongue has papillae and, in the ox, a prominent torus linguae, a raised hard area at the back that helps grinding. The pharynx has openings of the nasal passages, mouth, oesophagus, larynx and the auditory tubes. The soft palate separates oropharynx from nasopharynx and is long in the horse. The larynx has epiglottic, thyroid, cricoid and arytenoid cartilages."],
    ["Salivary and thyroid glands", "The parotid, mandibular and sublingual glands are the major salivary glands. The parotid duct (Stenson's duct) opens into the cheek opposite the upper cheek teeth and in the horse crosses the cheek and the masseter, so it can be palpated and is surgically important. The thyroid and parathyroid glands lie close to the trachea."],
    ["Jugular furrow and carotid sheath", "The jugular furrow is the groove on the side of the neck bounded dorsally by the brachiocephalicus and ventrally by the sternocephalicus. The external jugular vein lies in it, and is raised by pressure at the base of the neck for blood collection and intravenous injection in large animals. The carotid sheath, deep in the neck, contains the common carotid artery, the vagosympathetic trunk, the recurrent laryngeal nerve and, in some species, the internal jugular vein."],
    ["Cranial nerves, vessels and lymph nodes", "The twelve cranial nerves supply the head. Arteries come from the carotid arteries and veins drain through the jugular veins. Lymph nodes include the mandibular, parotid and retropharyngeal nodes."],
    ["Clinical landmarks (concept)", "The facial artery crosses the lower border of the mandible in the horse and is used to take the pulse. The cornual nerve, a branch of the zygomaticotemporal nerve, supplies the horn in the ox, and the cornual branch of the superficial temporal artery gives the main blood supply, which is why amputation of the horn bleeds. Nerve blocks of the head named in the syllabus include the cornual, infraorbital, mental, mandibular, supraorbital, auriculopalpebral and Peterson's orbital blocks. The approach to the guttural pouch of the horse is through Viborg's triangle, bounded by the tendon of the sternocephalicus, the caudal border of the mandible and the linguofacial vein. These are done only by a vet."]
  ],
  tb: { h: ["Feature", "Ox", "Horse", "Dog", "Pig"], r: [["Orbit", "Closed", "Closed", "Open (ligament)", "Closed"], ["Large frontal sinus", "Yes, into horn core", "Yes", "Smaller", "Very large"], ["Soft palate", "Short", "Long, obligate nasal breathing", "Medium", "Medium"], ["Guttural pouch", "Absent", "Present", "Absent", "Absent"]] },
  df: ["Jugular furrow: the groove on the side of the neck that contains the jugular vein.", "Carotid sheath: the connective tissue sheath around the common carotid artery, vagosympathetic trunk and recurrent laryngeal nerve.", "Cornual diverticulum: the extension of the frontal sinus into the horn core of cattle."],
  tm: [["Atlas", "First cervical vertebra"], ["Axis", "Second cervical vertebra with the dens"], ["Torus linguae", "Raised pad at the back of the ox tongue"], ["Stenson's duct", "Parotid duct"], ["Viborg's triangle", "Landmark triangle for the approach to the guttural pouch"]],
  st: ["Locate the angle of the jaw and the wing of the atlas.", "Follow the jugular furrow between the two muscles.", "Raise the vein by pressure at its lower end.", "Identify the landmark for the structure you need.", "Compare with the opposite side."],
  ex: ["A calf with a swollen jugular furrow may have a blood clot or a perivascular injection.", "A horse with nasal discharge may need the guttural pouch to be examined.", "A dehorned animal with nasal discharge may have sinusitis."],
  k: ["Boundaries of cavities.", "Paranasal sinuses of species.", "Jugular furrow boundaries.", "Carotid sheath contents.", "Nerve block sites and cornual nerve."],
  m: ["The facial nerve is not the nerve of the horn. The cornual nerve is a branch of the trigeminal system."],
  sa: [["Name the boundaries of the jugular furrow.", "Brachiocephalicus dorsally and sternocephalicus ventrally."], ["What are the contents of the carotid sheath?", "Common carotid artery, vagosympathetic trunk and recurrent laryngeal nerve."]],
  la: [["Describe the structures of the head and neck of the ox with differences in the horse and dog.", "Cavities, sinuses, muscles, tongue, pharynx, larynx, glands, jugular furrow, carotid sheath, nerves, clinical landmarks."]],
  q: [["The jugular vein lies in the groove between", ["Brachiocephalicus and sternocephalicus", "Trapezius and rhomboideus", "Masseter and temporalis", "Splenius and serratus"], 0, "Brachiocephalicus and sternocephalicus."],
    ["The orbit of the dog is", ["Incomplete", "Complete", "Absent", "Fused with the nose"], 0, "Closed by a ligament rather than bone."],
    ["The cornual diverticulum is part of the", ["Frontal sinus", "Maxillary sinus", "Guttural pouch", "Ear"], 0, "Frontal sinus."],
    ["The pulse in the horse is taken from the", ["Facial artery", "Carotid at the wing of the atlas", "Radial artery", "Jugular vein"], 0, "Facial artery."]],
  f: [["Stenson's duct", "Duct of the parotid gland"], ["Atlas", "C1"], ["Viborg's triangle", "Approach landmark for the guttural pouch"], ["Jugular furrow", "Groove with the jugular vein"]],
  d: ["Dissect and trace the facial nerve.", "Study the nerve supply of the tongue.", "Learn the lymph node drainage of the head."]
});

unit("anat", "Syllabus Unit 4 – Thorax");
topic("anat", "Thorax: Skeleton, Pleura, Mediastinum and Thoracic Organs", {
  o: ["Describe the thoracic vertebrae, ribs and sternum of the ox and compare species", "Describe the pleura, its reflections and the mediastinum", "Describe the heart, lungs, trachea, oesophagus and thymus in position", "State the areas of auscultation and percussion and the principle of safe thoracic puncture"],
  i: "The chest holds the organs of breathing and circulation. The syllabus covers its bones, joints, vessels, nerves, lymph nodes and organs, and asks for the clinical areas of auscultation, percussion and thoracic puncture.",
  s: "The chest is a bony cage of vertebrae, ribs and breastbone, lined inside with a smooth membrane, the pleura. The heart lies between the two lungs. Doctors listen over fixed areas to find heart and lung disease.",
  n: [
    ["Skeleton of the thorax", "The ox has 13 thoracic vertebrae and 13 pairs of ribs, of which 8 are sternal (join the sternum) and 5 are asternal (join the preceding costal cartilage). The horse has 18 pairs, the dog 13, and the pig 14 or 15. The sternum has a manubrium, body and xiphoid cartilage. In the fowl the sternum is large with a keel, and ribs have uncinate processes."],
    ["Joints and muscles", "Each rib joins the vertebra at the costovertebral joint and the sternum by costal cartilage. Intercostal muscles move the ribs. The diaphragm is the main breathing muscle. The special ligaments include the supraspinous ligament, which continues as the nuchal ligament at the withers."],
    ["Pleura and its reflections", "The pleura is a serous membrane. The parietal pleura lines the chest wall (costal), the diaphragm (diaphragmatic) and the mediastinum (mediastinal). The visceral (pulmonary) pleura covers the lung. The pleural reflection is the line where the costal pleura turns to the diaphragm. It lies further back than the lung's border, so lung and pleural limits differ, and a needle at the right place can enter the pleural cavity without hurting the lung."],
    ["Mediastinum", "The mediastinum is the space between the two pleural sacs. It has cranial, middle and caudal parts and holds the heart in its pericardium, trachea, oesophagus, thymus, great vessels, vagus and phrenic nerves, and lymph nodes. In cattle it is complete and thick, so a pneumothorax is often confined to one side. It is thin and fenestrated in the dog and the horse."],
    ["Organs of the thorax", "The trachea divides into two principal bronchi near the heart. In the ox, an extra tracheal bronchus supplies the right cranial lobe. The oesophagus lies dorsal to the trachea, then above the heart to the diaphragm. Choke is oesophageal obstruction. The thymus is large in young animals and shrinks with age. The lungs differ in the number of lobes and the degree of lobulation among species, as described in the respiratory topic."],
    ["The heart in position", "The heart lies in the lower chest, in the pericardial sac, roughly between the 3rd and 5th ribs on the left in the ox. The apex points to the sternum. The reticulum lies just behind the diaphragm, close to the heart, so a foreign body from the reticulum can pierce the diaphragm and pericardium (traumatic reticulopericarditis)."],
    ["Vessels, nerves and lymph", "The thoracic aorta, cranial and caudal vena cava, azygos vein, pulmonary vessels and the internal thoracic vessels lie in the thorax. The vagus, recurrent laryngeal, phrenic and sympathetic nerves pass through. Intercostal arteries, veins and nerves run along the caudal border of each rib. Lymph nodes include the mediastinal and bronchial nodes."],
    ["Auscultation, percussion and thoracic puncture", "Auscultation of the heart is done on the left side over the lower chest, and of the lungs over the lung fields behind the shoulder. Percussion detects the boundary between resonant lung and dull heart or fluid. When fluid fills the pleural space, a vet may withdraw it by thoracocentesis (paracentesis thoracis). Because the intercostal vessels and nerve run behind each rib, the needle is placed just in front of a rib, a principle every student should learn before practising on a specimen."]
  ],
  tb: { h: ["Species", "Thoracic vertebrae", "Pairs of ribs", "Mediastinum"], r: [["Ox", "13", "13 (8 sternal, 5 asternal)", "Thick, complete"], ["Horse", "18", "18", "Thin, fenestrated"], ["Dog", "13", "13", "Thin, fenestrated"], ["Pig", "14 or 15", "14 or 15", "Thin"], ["Fowl", "Fused (notarium)", "Ribs with uncinate processes", "No diaphragm"]] },
  df: ["Pleura: the serous membrane that lines the chest and covers the lungs.", "Mediastinum: the space between the two pleural sacs containing the thoracic organs other than the lungs.", "Thoracocentesis: puncture of the chest to remove fluid or air from the pleural cavity."],
  tm: [["Sternal rib", "Rib that joins the sternum through costal cartilage"], ["Asternal rib", "Rib that does not reach the sternum"], ["Pericardium", "Sac around the heart"], ["Pleural reflection", "Line where pleura turns from chest wall to diaphragm"], ["Azygos vein", "Vein draining the chest wall on the right side"]],
  st: ["Identify the ribs by counting from the first.", "Mark the elbow as a landmark for the heart.", "Place the stethoscope over the cardiac area.", "Listen to each lung field.", "Compare the left and right sides.", "Record the sounds heard."],
  ex: ["A cow with traumatic reticulopericarditis has a swollen jugular and muffled heart sounds.", "A dog with fluid in the pleural cavity has dull lung sounds at the bottom of the chest.", "A calf with choke has saliva and bloat after an oesophageal obstruction."],
  k: ["Ribs and vertebrae numbers.", "Pleura and reflections.", "Mediastinum.", "Position of the heart.", "Auscultation areas."],
  m: ["The pleural cavity is a potential space with only a thin film of fluid, not an empty cavity."],
  sa: [["How many pairs of ribs does the ox have?", "13 pairs, of which 8 are sternal and 5 asternal."], ["What is the mediastinum?", "The space between the pleural sacs containing the heart, trachea, oesophagus and other structures."]],
  la: [["Describe the thorax of the ox with differences in the horse, dog and pig.", "Skeleton, pleura, mediastinum, organs, vessels, nerves, auscultation areas."]],
  q: [["The ox has how many pairs of ribs?", ["13", "18", "14", "12"], 0, "Thirteen."],
    ["The pleura that covers the lung is the", ["Visceral pleura", "Parietal pleura", "Pericardium", "Peritoneum"], 0, "Visceral (pulmonary) pleura."],
    ["Intercostal vessels and nerve run along the", ["Caudal border of the rib", "Cranial border of the rib", "Sternum", "Vertebra"], 0, "Caudal border."],
    ["Traumatic reticulopericarditis arises because the reticulum", ["Lies near the diaphragm and heart", "Lies in the pelvis", "Is attached to the kidney", "Is a lung part"], 0, "Close to the diaphragm and heart."]],
  f: [["Sternal rib", "Reaches the sternum"], ["Pericardium", "Heart sac"], ["Thoracocentesis", "Chest puncture to remove fluid"], ["Notarium", "Fused thoracic vertebrae of the fowl"]],
  d: ["Practise counting ribs on a specimen.", "Learn the thoracic radiograph.", "Study the heart sounds."]
});

unit("anat", "Syllabus Unit 5 – Abdomen");
topic("anat", "Abdomen: Peritoneum, Topography of Viscera, Flank and Paralumbar Fossa", {
  o: ["Describe the peritoneum, omenta and mesentery", "Describe the blood and nerve supply of the abdominal viscera", "State the boundaries and clinical importance of the flank and paralumbar fossa", "Explain the anatomical basis of the common abdominal approaches"],
  i: "Most large-animal surgery and many diagnostic procedures involve the abdomen. The syllabus asks for the peritoneal reflections, the organs and their supply, the spleen and mammary glands, and the clinical importance of the flank and the paralumbar fossa.",
  s: "The abdomen is a large cavity lined by a slippery membrane, the peritoneum. The organs hang inside from folds of this membrane. The soft hollow behind the last rib, the paralumbar fossa, is where the surgeon enters the belly in cattle.",
  n: [
    ["Peritoneum", "The parietal peritoneum lines the abdominal wall and the visceral peritoneum covers the organs, with a small peritoneal cavity between them. The mesentery suspends the intestines. The greater omentum hangs from the greater curvature of the stomach, and in the ox it covers the intestines like an apron on the right side, in two layers forming a bursa (omental bursa). The lesser omentum links the stomach and liver."],
    ["Organs present in the abdomen", "The stomach, intestines, liver, pancreas, spleen, kidneys, adrenals, ureters, and in the female the ovaries and uterus. In males the abdomen contains the inguinal canal entrance and the vas deferens. The bladder lies on the pelvic floor and moves into the abdomen when full."],
    ["Blood supply", "The abdominal aorta gives the coeliac artery (stomach, liver, spleen, pancreas), the cranial mesenteric artery (most of the intestines), the renal arteries, the gonadal arteries and the caudal mesenteric artery (the end of the colon and the rectum). The portal vein carries blood from the gut and spleen to the liver and the caudal vena cava drains the abdomen."],
    ["Nerve supply", "The viscera receive sympathetic fibres through the splanchnic nerves and the coeliac and mesenteric ganglia, and parasympathetic fibres chiefly from the vagus. The flank wall is supplied by the last thoracic and first lumbar nerves."],
    ["Spleen and endocrine structures", "The ox spleen is flat and long, lying on the left against the rumen, and is not removed readily. The horse spleen is large and sickle shaped, and the dog's long and mobile. Adrenal glands are near the kidneys, and the pancreas lies along the duodenum."],
    ["Mammary glands", "The cow has four quarters on one udder with four teats. The mare has two glands and two teats in the inguinal region, each with two openings. The bitch has about eight to ten glands in two rows, and the sow twelve to fourteen. The details of the udder are in the mammary topic."],
    ["Flank and paralumbar fossa", "The flank is the lateral abdominal wall between the last rib, the lumbar transverse processes and the hip. The paralumbar fossa, a depression at the top of the flank, is bounded by the last rib, the lumbar transverse processes and the tuber coxae. The left flank lies over the rumen, which is why rumen contractions are listened to there and why it is the approach to rumen surgery. Gas in a displaced abomasum can make a 'ping' on the left or right flank."],
    ["Anatomical basis of surgical approaches (concept only)", "The syllabus lists sites for laparotomy, rumenocentesis, rumenotomy, abomasotomy, enterotomy, splenectomy, cystotomy, caesarean operation, biopsy sites and the paravertebral nerve block. The choice of site depends on where the organ lies and which layers of muscle are crossed. For example the left paralumbar fossa gives access to the rumen, the right flank to the abomasum and intestines, and the ventral midline or paramedian line to the uterus. The paravertebral block numbs the flank by blocking the last thoracic and first two lumbar nerves where they leave the vertebral column. All of these are performed only by trained veterinarians and are learned in the surgery course."]
  ],
  tb: { h: ["Artery", "Supplies"], r: [["Coeliac", "Stomach, liver, spleen, pancreas"], ["Cranial mesenteric", "Most of the small and large intestine"], ["Renal", "Kidney"], ["Gonadal", "Ovary or testis"], ["Caudal mesenteric", "Terminal colon and rectum"]] },
  df: ["Peritoneum: the serous membrane lining the abdominal cavity and covering the viscera.", "Omentum: a fold of peritoneum attached to the stomach.", "Paralumbar fossa: the hollow of the flank bounded by the last rib, lumbar transverse processes and the hip."],
  tm: [["Mesentery", "Peritoneal fold that suspends the intestine"], ["Omental bursa", "Space within the greater omentum"], ["Splanchnic nerve", "Sympathetic nerve to the abdominal organs"], ["Tuber coxae", "Point of the hip"], ["Laparotomy", "Surgical opening of the abdomen"]],
  st: ["Identify the last rib, the lumbar transverse processes and the hip.", "Locate the fossa between them.", "Note the organs lying under it on each side.", "Identify the layers of the wall.", "Review the nerve and blood supply of the wall."],
  ex: ["A 'ping' on the left flank with a high-pitched sound can come from a displaced abomasum.", "Bloat distends the left paralumbar fossa.", "A cow with right-sided abdominal pain may have a problem of the abomasum or intestine."],
  k: ["Peritoneal folds.", "Abdominal arteries.", "Boundaries of the paralumbar fossa.", "Clinical importance of the flank."],
  m: ["The organs are not inside the peritoneal cavity. They are covered by peritoneum but lie behind it."],
  sa: [["Name the boundaries of the paralumbar fossa.", "Last rib in front, lumbar transverse processes above and tuber coxae behind."], ["What does the coeliac artery supply?", "Stomach, liver, spleen and pancreas."]],
  la: [["Describe the peritoneum and abdominal viscera of the ox.", "Peritoneal layers, omenta, mesentery, topography of the organs, blood supply, nerve supply, flank."]],
  q: [["The cranial mesenteric artery supplies the", ["Intestines", "Kidney", "Spleen only", "Bladder"], 0, "Most of the intestines."],
    ["The ox spleen lies against the", ["Rumen", "Liver", "Bladder", "Heart"], 0, "Rumen, on the left."],
    ["The paralumbar fossa is bounded by the", ["Last rib", "Sternum", "Jaw", "Femur"], 0, "Last rib, transverse processes and tuber coxae."],
    ["The greater omentum attaches to the", ["Stomach", "Heart", "Kidney", "Bladder"], 0, "Greater curvature of the stomach."]],
  f: [["Coeliac artery", "Supplies stomach, liver, spleen, pancreas"], ["Mesentery", "Fold that holds the intestines"], ["Tuber coxae", "Point of the hip"], ["Greater omentum", "Fold from the stomach covering the intestines"]],
  d: ["Study the peritoneal reflections in the ox.", "Learn the rumen anatomy in detail.", "Practise palpation per rectum."]
});

unit("anat", "Syllabus Unit 6 – Hind limb and pelvis");
topic("anat", "Hind Limb and Pelvis: Bones, Joints, Stifle, Inguinal Canal and Pelvic Viscera", {
  o: ["Name the bones and joints of the pelvis and hind limb of the ox and compare species", "Describe the stifle joint, the patellar ligaments and the reciprocal apparatus", "Describe the inguinal canal, spermatic cord and prepubic tendon", "Describe the pelvic viscera and peritoneal reflections"],
  i: "The hind limb gives propulsion. The pelvis protects the birth canal and the terminal parts of the gut and urinary tract. The syllabus asks for the structures from bones to nerve block sites, with the inguinal canal and prepubic tendon as special topics.",
  s: "The hind limb joins the backbone through a strong joint between the pelvis and the sacrum. The pelvis is a bony ring through which the calf must pass at birth. The stifle is the knee of the hind leg, and in horses and cattle the kneecap can lock the leg for standing.",
  n: [
    ["Pelvis", "The pelvis is made of two hip bones (each of ilium, ischium and pubis, fused at the acetabulum), the sacrum and the first caudal vertebrae. The sacroiliac joint attaches it to the vertebral column. The broad sacrosciatic ligament forms part of the lateral wall in ruminants. The pelvic inlet is the opening at the front, the outlet at the back. A large and well-shaped pelvis eases calving."],
    ["Bones of the hind limb", "The femur has the head, the greater trochanter and the condyles. The horse has a third trochanter, which the ox does not have. The patella is a sesamoid bone in the quadriceps tendon. The tibia carries the weight, and the fibula is reduced to a small bone in the ox and a splint in the horse. The ox hock (tarsus) has five bones: talus, calcaneus, fused central and fourth, fused second and third, and a small first fused with the second. The horse has six tarsal bones and the dog seven. The metatarsus and phalanges follow the pattern of the fore limb."],
    ["Stifle joint and patellar ligaments", "The stifle has a femoropatellar joint and a femorotibial joint. Three patellar ligaments (medial, middle and lateral) attach the patella to the tibia. In the horse and ox the medial ligament can hook over the medial ridge of the femoral trochlea, locking the limb in extension (upward fixation of the patella), a part of the stay apparatus. If the lock fails to release, the limb is stuck in extension. Division of the medial patellar ligament (patellar desmotomy) is a surgical treatment, done only by a vet."],
    ["Reciprocal apparatus and hock", "In the horse the stifle and hock are linked by the peroneus tertius and the superficial digital flexor tendon, so that they move together. The calcaneus forms the point of the hock, attached to the gastrocnemius through the common calcanean tendon."],
    ["Nerves and vessels", "The sciatic nerve divides into the tibial and the common peroneal nerves. The femoral nerve supplies the quadriceps, and the obturator nerve the adductors. The pudic (pudendal) nerve supplies the perineum and external genitalia. Injury to the peroneal nerve gives a knuckled hind fetlock. The external iliac artery continues as the femoral artery and later the popliteal. The femoral artery is felt on the inside of the thigh in dogs, and the recurrent tarsal vein is used for intravenous injection in the dog. Popliteal and superficial inguinal lymph nodes drain the limb."],
    ["Inguinal canal and spermatic cord", "The inguinal canal is the oblique passage in the lower abdominal wall between the deep ring (in the internal oblique and transversus layers) and the superficial ring (in the external oblique aponeurosis). In males it carries the spermatic cord: the ductus deferens, testicular artery, pampiniform plexus, lymph vessels, nerves, and cremaster muscle, wrapped in the vaginal tunic. In females it carries the vessels and nerves of the mammary gland. A wide canal permits inguinal hernia."],
    ["Prepubic tendon", "The prepubic tendon is the common tendon formed from the abdominal muscles on the pubis. It anchors the abdominal wall and, in the mare and cow, can rupture late in pregnancy, causing ventral hernia. It is an important landmark in the pelvic floor."],
    ["Pelvic viscera and peritoneal reflections", "The pelvic cavity contains the rectum, the urethra, the bladder (partly) and the genital organs. The peritoneum forms pouches: the rectogenital pouch between the rectum and the genital organs, the vesicogenital pouch between genital organs and the bladder in the female, and the pubovesical pouch in front of the bladder. Knowing them is vital for rectal palpation and for caesarean surgery. External genital organs include the vulva with clitoris in the female, and the penis and prepuce in the male."],
    ["Sites relevant to clinical work (concept)", "Epidural anaesthesia is given at the first intercoccygeal or the sacrococcygeal space in cattle, and the lumbosacral space in dogs. Pudic nerve block is used to desensitise the penis and perineum. Castration and vasectomy use the scrotum and spermatic cord. These procedures are for vets and are learned in practicals."]
  ],
  tb: { h: ["Species", "Tarsal bones", "Third trochanter", "Fibula"], r: [["Ox", "5", "Absent", "Reduced"], ["Horse", "6", "Present", "Reduced to a splint"], ["Dog", "7", "Absent", "Complete"], ["Pig", "7", "Absent", "Complete"]] },
  df: ["Inguinal canal: the oblique passage through the abdominal wall carrying the spermatic cord in the male.", "Prepubic tendon: the tendon at the front of the pubis formed by the attachments of the abdominal muscles.", "Reciprocal apparatus: the mechanism by which the stifle and hock of the horse move together."],
  tm: [["Acetabulum", "Hip socket"], ["Calcaneus", "Point of the hock"], ["Pudic nerve", "Pudendal nerve"], ["Tuber ischii", "Pin bone"], ["Vaginal tunic", "Peritoneal covering of the spermatic cord and testis"]],
  st: ["Identify the hip bones and their joint with the sacrum.", "Trace the femur to the stifle.", "Name the three patellar ligaments.", "Trace the sciatic nerve to its branches.", "Follow the spermatic cord through the inguinal canal."],
  ex: ["A horse that cannot flex the stifle because of upward fixation of the patella may stand with a locked hind limb.", "Late pregnant mares can rupture the prepubic tendon and show ventral swelling.", "A cow with obturator nerve injury after a hard calving may slip and splay her hind legs."],
  k: ["Parts of the pelvis.", "Bones of the hind limb.", "Patellar ligaments.", "Inguinal canal.", "Pelvic peritoneal pouches."],
  m: ["The hock is not a knee. The knee of the hind limb is the stifle."],
  sa: [["Name the patellar ligaments.", "Medial, middle and lateral patellar ligaments."], ["What is the content of the spermatic cord?", "Ductus deferens, testicular artery, pampiniform plexus, lymphatics, nerves and the cremaster muscle."]],
  la: [["Describe the inguinal canal and spermatic cord.", "Position, rings, boundaries, contents in the male, clinical importance (hernia, castration)."]],
  q: [["The point of the hock is the", ["Calcaneus", "Talus", "Patella", "Femoral head"], 0, "Calcaneus."],
    ["The ox hock has how many tarsal bones?", ["5", "6", "7", "4"], 0, "Five."],
    ["The sciatic nerve divides into", ["Tibial and common peroneal nerves", "Radial and ulnar nerves", "Femoral and obturator nerves", "Pudic and sacral nerves"], 0, "Tibial and common peroneal."],
    ["The prepubic tendon anchors the", ["Abdominal muscles", "Hind limb joints", "Tongue", "Diaphragm"], 0, "The abdominal wall."]],
  f: [["Reciprocal apparatus", "Links the stifle and hock in the horse"], ["Prepubic tendon", "Common tendon of the abdominal muscles at the pubis"], ["Pudic nerve", "Nerve to the perineum and external genitalia"], ["Sacrosciatic ligament", "Broad ligament forming part of the pelvic wall in ruminants"]],
  d: ["Study the stay apparatus of the hind limb.", "Learn the pelvimetry.", "Read about hip dysplasia in dogs."]
});

unit("anat", "Syllabus Unit 7 – Cytology, histology and microscopy");
topic("anat", "Cytology, Cell Junctions, Blood and Bone Marrow", {
  o: ["Describe the cell and its organelles", "Name the types of cell junctions", "Describe the cells of the blood and compare species", "Describe bone marrow and the sites of its collection"],
  i: "Histology starts with the cell. The syllabus lists cytology, cell junctions, basic tissues, blood and bone marrow, and microscopy including micrometry.",
  s: "A cell is a tiny living unit with a boundary membrane, a nucleus and many small working parts. Cells stick to each other through special junctions. Blood is a fluid tissue with cells floating in it, and bone marrow is where these cells are made.",
  n: [
    ["The cell", "The cell has a plasma membrane, cytoplasm with organelles and a nucleus. The nucleus contains DNA and nucleoli. Rough endoplasmic reticulum with ribosomes makes proteins, smooth endoplasmic reticulum makes lipids and detoxifies, the Golgi apparatus packages secretions, mitochondria produce ATP, lysosomes digest, peroxisomes handle fatty acids and hydrogen peroxide. The cytoskeleton gives shape and movement."],
    ["Cell junctions", "Tight junctions (zonula occludens) seal the space between neighbouring cells and prevent leakage. Adherens junctions (zonula adherens) and desmosomes (macula adherens) hold cells together mechanically, and hemidesmosomes anchor cells to the basement membrane. Gap junctions are channels that connect the cytoplasm of two cells and let small molecules pass, as between cardiac muscle cells."],
    ["Light and electron microscopy", "The light microscope uses visible light and glass lenses and can resolve about 0.2 micrometre. The electron microscope uses a beam of electrons and shows organelles in great detail. Transmission electron microscopy shows internal structure and scanning electron microscopy shows surface structure. Micrometry measures the size of cells using an ocular micrometer calibrated against a stage micrometer."],
    ["Blood: red cells", "Red blood cells (erythrocytes) carry haemoglobin. Mammalian red cells are biconcave and lack a nucleus. Camelid red cells are oval and non-nucleated. Birds, reptiles and fish have nucleated red cells. Red cell size varies in species, with the goat's being the smallest."],
    ["Blood: white cells and platelets", "Granulocytes (neutrophils, eosinophils, basophils) and agranulocytes (lymphocytes and monocytes) are the white cells. Neutrophils fight bacteria, eosinophils respond to parasites and allergies, basophils release histamine, lymphocytes provide specific immunity and monocytes become macrophages. Platelets (thrombocytes) are small cell fragments in mammals and are nucleated cells in birds. Blood smears stained with Romanowsky stains such as Giemsa or Leishman show these cells."],
    ["Bone marrow", "Red marrow makes blood cells and fills the flat bones and the ends of long bones. Yellow marrow is mostly fat and fills the shafts of long bones in the adult. In the young, most marrow is red. Haemopoiesis begins in the yolk sac, then liver and spleen, and the marrow takes over before birth."],
    ["Sites for bone marrow collection", "The sites used include the sternum, the iliac crest, and the proximal humerus or femur in small animals, and the sternum or ribs in large animals. The site is chosen by the species and the size of the animal. It is done under local anaesthesia by a vet to examine marrow cells in cases of anaemia and some cancers."]
  ],
  tb: { h: ["Junction", "Function", "Example"], r: [["Tight", "Seals the space between cells", "Intestinal epithelium"], ["Adherens", "Mechanical attachment", "Epithelia, heart"], ["Desmosome", "Strong spot attachment", "Skin"], ["Gap", "Cytoplasmic channel", "Cardiac muscle"], ["Hemidesmosome", "Anchors to the basement membrane", "Epithelia"]] },
  df: ["Organelle: a specialised structure within a cell with a particular function.", "Haemopoiesis: the formation of blood cells.", "Micrometry: measurement of microscopic objects using an ocular and stage micrometer."],
  tm: [["Erythrocyte", "Red blood cell"], ["Leucocyte", "White blood cell"], ["Thrombocyte", "Platelet"], ["Desmosome", "Spot-like adhesion between cells"], ["Romanowsky stain", "Blood stain such as Giemsa or Leishman"]],
  st: ["Make a thin blood smear.", "Air dry and fix.", "Stain with a Romanowsky stain.", "Examine under the oil immersion lens.", "Identify and count the cell types."],
  ex: ["Birds have nucleated red cells, which helps recognise a bird blood smear.", "Eosinophil increase in a blood count can suggest parasitism.", "A bone marrow sample helps find the cause of a non-regenerative anaemia."],
  k: ["Organelles and functions.", "Types of cell junctions.", "Blood cells in species.", "Bone marrow types and sites."],
  m: ["Not all red cells are anucleate. Birds have nucleated red cells."],
  sa: [["Name the types of cell junctions.", "Tight, adherens, desmosomes, hemidesmosomes and gap junctions."], ["What is red marrow?", "Marrow that makes blood cells, found in flat bones and the ends of long bones."]],
  la: [["Describe the types of cells in the blood of domestic animals.", "Red cells, granulocytes, agranulocytes, platelets, species differences, functions, staining."]],
  q: [["Camelid red cells are", ["Oval and non-nucleated", "Round with nuclei", "Biconcave", "Absent"], 0, "Oval and non-nucleated."],
    ["Gap junctions", ["Connect cytoplasm of cells", "Seal cells", "Anchor to basement membrane", "Store ions"], 0, "They form channels between cells."],
    ["Eosinophils increase in", ["Parasitism and allergy", "Viral infection only", "Blood loss only", "Starvation"], 0, "Parasites and allergies."],
    ["The powerhouse of the cell is the", ["Mitochondrion", "Lysosome", "Golgi", "Ribosome"], 0, "Mitochondrion."]],
  f: [["Tight junction", "Seals between cells"], ["Haemopoiesis", "Making blood cells"], ["Yellow marrow", "Fatty marrow"], ["Leishman stain", "Blood film stain"]],
  d: ["Practise differential count on smears.", "Study the electron microscope.", "Learn the cell cycle."]
});
/* ================= ANATOMY (syllabus-matched region topics, part 3) ================= */
topic("anat", "Microscopic Structure of the Organ Systems", {
  o: ["Describe the layers of the digestive tube and the special features of each part", "Describe the microscopic structure of liver, pancreas, lung, kidney, heart and vessels", "Describe lymphoid, endocrine and reproductive organs microscopically", "Describe the microscopic structure of the eye, ear and skin"],
  i: "This topic follows the syllabus statement on the microscopic structure of the digestive, circulatory, urinary, respiratory, nervous, lymphatic, endocrine and genital systems, the mammary gland and the sense organs. Pathology builds directly on it.",
  s: "Every organ is a pattern of the four basic tissues. Once you know the typical pattern, each organ has a few special features that tell you what it is under the microscope.",
  n: [
    ["The general plan of the digestive tube", "From inside out there are four layers: the mucosa (epithelium, lamina propria and muscularis mucosae), the submucosa, the muscularis externa (usually an inner circular and outer longitudinal smooth muscle layer) and the serosa or adventitia. The oesophagus has stratified squamous epithelium. The rumen has keratinised stratified squamous epithelium with papillae. The glandular stomach has gastric glands with parietal and chief cells. The small intestine has villi, crypts of Lieberkühn, goblet cells and, in the duodenum, Brunner's glands in the submucosa. Peyer's patches are in the ileum. The large intestine has no villi and many goblet cells."],
    ["Liver and pancreas", "The liver is organised in lobules with a central vein, plates of hepatocytes, sinusoids lined by Kupffer cells, and portal triads (a branch of the portal vein, hepatic artery and bile duct) at the corners. Pigs have clear connective tissue septa between lobules, giving a distinct lobulation. The exocrine pancreas has serous acini with zymogen granules, and the islets of Langerhans are the endocrine part."],
    ["Respiratory system", "The trachea is lined by pseudostratified ciliated columnar epithelium with goblet cells and has C-shaped hyaline cartilage rings. Bronchi have cartilage plates. Bronchioles have no cartilage and no glands, with Clara cells in the terminal bronchioles. The alveolus has type I cells for gas exchange and type II cells that make surfactant, with a thin blood-air barrier."],
    ["Circulatory system", "Arteries and veins have three layers: tunica intima (endothelium), tunica media (smooth muscle and elastic fibres) and tunica adventitia. Elastic arteries such as the aorta have many elastic laminae, muscular arteries have thick smooth muscle, and veins have thinner walls with valves. The heart wall has endocardium, myocardium and epicardium. Purkinje fibres are large pale cells under the endocardium."],
    ["Urinary system", "The kidney has a cortex with renal corpuscles (glomerulus and Bowman's capsule), proximal tubules with brush borders, and distal tubules, and a medulla with loops of Henle and collecting ducts. The ureter, bladder and part of the urethra are lined by transitional epithelium (urothelium)."],
    ["Nervous system", "The cerebral cortex is layered, with pyramidal neurons. The cerebellar cortex has molecular, Purkinje cell and granular layers. The spinal cord has an H-shaped central grey matter with motor neurons in the ventral horn and surrounding white matter. Peripheral nerves are bundles of myelinated and unmyelinated fibres surrounded by endoneurium, perineurium and epineurium."],
    ["Lymphoid organs", "A lymph node has a capsule, cortex with lymphoid follicles, paracortex and medulla with cords and sinuses. The spleen has red pulp and white pulp with periarteriolar lymphoid sheaths. The thymus has a cortex of dense lymphocytes and a paler medulla with Hassall's corpuscles. The bursa of Fabricius of birds has plicae with follicles."],
    ["Endocrine glands", "The thyroid has follicles lined by cuboidal cells containing colloid, with parafollicular C cells. The adrenal cortex has glomerulosa, fasciculata and reticularis zones, and the medulla has chromaffin cells. The pituitary has an anterior lobe with acidophils, basophils and chromophobes and a posterior lobe with pituicytes and nerve fibres."],
    ["Male and female genital systems and mammary gland", "The testis has seminiferous tubules with spermatogenic cells and Sertoli cells, and interstitial Leydig cells. The epididymis has pseudostratified columnar epithelium with stereocilia. The ovary has a cortex with follicles at different stages and a medulla. The uterus has endometrium, myometrium and perimetrium. The resting mammary gland has mostly ducts and fat, and the lactating gland has alveoli filled with milk."],
    ["Sense organs and integument", "The eye has the corneal layers (epithelium, stroma, Descemet's membrane, endothelium) and the retina with ten layers including photoreceptors. The ear's cochlea has the organ of Corti with hair cells. The skin has the epidermis, dermis, hair follicles, sebaceous glands and sweat glands."]
  ],
  tb: { h: ["Organ", "Key histological feature"], r: [["Oesophagus", "Stratified squamous epithelium"], ["Rumen", "Keratinised epithelium with papillae"], ["Small intestine", "Villi, crypts, goblet cells"], ["Liver", "Lobules, portal triads, sinusoids"], ["Lung", "Alveoli with type I and II cells"], ["Kidney", "Glomeruli and tubules"], ["Bladder", "Transitional epithelium"], ["Thyroid", "Follicles with colloid"], ["Testis", "Seminiferous tubules"]] },
  df: ["Lobule: the structural unit of the liver centred on a central vein.", "Villus: a finger-like projection of the intestinal mucosa for absorption.", "Urothelium: the transitional epithelium lining the urinary passages."],
  tm: [["Kupffer cell", "Macrophage lining liver sinusoids"], ["Brunner's gland", "Mucous gland in the duodenal submucosa"], ["Hassall's corpuscle", "Whorl of epithelial cells in the thymic medulla"], ["Purkinje fibre", "Conducting fibre of the heart"], ["Organ of Corti", "Hearing receptor in the cochlea"]],
  st: ["Identify the tissue on the slide by its overall pattern.", "Find the lumen and the layers.", "Look for special cells or glands.", "Compare with a reference photo.", "Draw and label the section."],
  ex: ["Brunner's glands help identify the duodenum on a slide.", "Hassall's corpuscles identify the thymus.", "Transitional epithelium identifies the bladder."],
  k: ["Four layers of the gut wall.", "Special features of each organ.", "Pseudostratified ciliated epithelium of the trachea.", "Layers of vessels."],
  m: ["Not every organ has the same four-layer plan. The plan applies to the tubular digestive tract."],
  sa: [["What are the layers of the digestive tube?", "Mucosa, submucosa, muscularis externa and serosa or adventitia."], ["What does Hassall's corpuscle identify?", "The thymus."]],
  la: [["Describe the histology of the small intestine with a labelled diagram.", "Layers, villi, crypts, goblet cells, glands, lymphoid tissue, with a sketch."]],
  q: [["Brunner's glands are found in the", ["Duodenum", "Ileum", "Colon", "Stomach"], 0, "Submucosa of the duodenum."],
    ["The trachea is lined by", ["Pseudostratified ciliated columnar epithelium", "Simple squamous epithelium", "Transitional epithelium", "Keratinised epithelium"], 0, "With goblet cells."],
    ["Type II alveolar cells make", ["Surfactant", "Mucus", "Bile", "Insulin"], 0, "Surfactant."],
    ["Kupffer cells are found in the", ["Liver", "Kidney", "Spleen cortex only", "Thyroid"], 0, "Liver sinusoids."]],
  f: [["Crypt of Lieberkühn", "Gland at the base of intestinal villi"], ["Clara cell", "Secretory cell in terminal bronchioles"], ["Pituicyte", "Supporting cell of the posterior pituitary"], ["Colloid", "Thyroid storage material"]],
  d: ["Practise identifying slides.", "Study special stains.", "Learn the histology of the avian organs."]
});

unit("anat", "Syllabus Unit 8 – Embryology");
topic("anat", "Gametogenesis, Fertilisation, Cleavage, Implantation and Fetal Membranes in Mammals and Birds", {
  o: ["Describe spermatogenesis and oogenesis", "Describe fertilisation, cleavage and the types of eggs", "Name the types of implantation and twinning", "Describe the formation of the fetal membranes in mammals and the avian egg"],
  i: "This topic follows the syllabus sequence: introduction to embryology, gametogenesis, fertilisation, cleavage, types of eggs, morula, blastulation, gastrulation, implantation, twinning and fetal membranes, with the placenta covered in the general embryology topic.",
  s: "A new animal starts when a sperm and an egg meet. The egg divides repeatedly, becomes a hollow ball and then three layers, and attaches to the womb. A bird does the same inside an egg with a large yolk.",
  n: [
    ["Spermatogenesis", "Spermatogonia in the seminiferous tubules divide by mitosis, grow into primary spermatocytes, divide by meiosis I to give secondary spermatocytes and meiosis II to give spermatids. Spermatids change into sperm (spermiogenesis), with a head containing the nucleus and acrosome, a middle piece with mitochondria and a tail. One primary spermatocyte makes four sperm."],
    ["Oogenesis", "Oogonia divide by mitosis before birth. Primary oocytes begin meiosis I but halt in prophase I. At ovulation the oocyte completes meiosis I and forms a secondary oocyte and a first polar body, and then stops in metaphase II. Meiosis II is completed only if fertilisation occurs. One oogonium yields one functional ovum and polar bodies. The dog's oocyte is ovulated as a primary oocyte."],
    ["Fertilisation", "Sperm undergo capacitation in the female tract and the acrosome reaction, releasing enzymes that let them penetrate the zona pellucida. After the first sperm enters, the zona reaction blocks entry of others (block to polyspermy). The male and female pronuclei fuse to restore the diploid number, forming the zygote."],
    ["Types of eggs", "Eggs are classified by the amount and the distribution of yolk. Mammalian eggs have little yolk (microlecithal, or alecithal) evenly distributed (isolecithal). Bird eggs have much yolk (macrolecithal) concentrated at one pole (telolecithal), with the nucleus in a small germinal disc. Insect eggs have central yolk (centrolecithal)."],
    ["Cleavage, morula and blastocyst", "Cleavage is a series of mitotic divisions with no growth. In mammals it is holoblastic (complete) and the cells (blastomeres) form a solid ball, the morula, which becomes a blastocyst with a trophoblast, an inner cell mass and a cavity. In birds cleavage is meroblastic and discoidal because of the large yolk, forming a blastoderm (a disc of cells) on the yolk."],
    ["Gastrulation", "Gastrulation converts the blastocyst or blastoderm into a three-layered embryo (ectoderm, mesoderm and endoderm). In birds and mammals cells move through the primitive streak. The notochord forms along the axis and induces the neural tube."],
    ["Implantation", "In domestic animals the blastocyst remains free in the uterus for a time and attaches by a superficial (central) implantation, with the blastocyst staying in the uterine lumen. In some species such as primates and rodents it embeds in the wall (interstitial implantation). The ruminants have a long, filamentous blastocyst (conceptus) that elongates before attaching."],
    ["Twinning", "Dizygotic twins arise from two ova fertilised by two sperm and are not identical. Monozygotic twins arise from one zygote splitting into two embryos and are genetically identical. In cattle, vascular connections between the placentas of twins of different sex can produce a freemartin."],
    ["Fetal membranes of mammals", "The amnion forms from folds of the trophoblast and somatic mesoderm. The chorion is the outermost membrane. The allantois grows out from the hindgut and fuses with the chorion to form the chorioallantois. The yolk sac is small in domestic mammals. The umbilical cord connects fetus and placenta and contains umbilical vessels and the urachus."],
    ["Fetal membranes of birds, and the egg", "The avian embryo develops outside the mother, so the egg provides yolk, albumen and a shell. The yolk sac absorbs yolk. The amnion and serosa (chorion) enclose the embryo. The allantois works as an organ of respiration and as a reservoir for urinary wastes (uric acid). The shell membranes and shell allow gas exchange. The chick pips and hatches at about 21 days for the fowl."]
  ],
  tb: { h: ["Feature", "Mammals", "Birds"], r: [["Yolk", "Little (microlecithal)", "Large (macrolecithal, telolecithal)"], ["Cleavage", "Holoblastic", "Meroblastic, discoidal"], ["Fetal membranes", "Amnion, chorion, allantois, yolk sac", "The same four membranes"], ["Development", "In the uterus", "In the egg"], ["Nitrogen waste", "Urea (via placenta)", "Uric acid in the allantois"]] },
  df: ["Gametogenesis: the formation of gametes (sperm and ova) by meiosis.", "Cleavage: the series of rapid cell divisions of the zygote without growth.", "Gastrulation: the process that produces the three germ layers."],
  tm: [["Blastomere", "A cell formed by cleavage"], ["Zona pellucida", "Glycoprotein layer around the oocyte"], ["Primitive streak", "Axis along which cells enter during gastrulation in birds and mammals"], ["Polar body", "Small cell produced during oocyte meiosis"], ["Urachus", "Stalk linking the fetal bladder and allantois"]],
  st: ["Gametes form by meiosis.", "Sperm and egg fuse.", "The zygote cleaves into a morula.", "A blastocyst forms.", "The three germ layers form.", "Fetal membranes form and the embryo implants."],
  ex: ["A persistent urachus in a newborn foal or calf causes urine to drip from the navel.", "Twin calves of different sex can give a freemartin.", "Infertile eggs of the hen show no developing disc on candling."],
  k: ["Spermatogenesis and oogenesis.", "Types of eggs.", "Cleavage types.", "Implantation.", "Avian egg and membranes."],
  m: ["Meiosis in the female is not completed until fertilisation."],
  sa: [["What is a telolecithal egg?", "An egg with a large amount of yolk concentrated at one pole, as in birds."], ["What is the function of the allantois in birds?", "Respiration and collection of urinary wastes."]],
  la: [["Describe oogenesis and spermatogenesis and compare them.", "Stages, number of gametes, meiotic arrest, time course, diagrams."]],
  q: [["Meiosis II of the oocyte is completed at", ["Fertilisation", "Ovulation", "Birth", "Puberty"], 0, "Only if fertilisation occurs."],
    ["The bird egg is", ["Telolecithal", "Isolecithal", "Alecithal", "Centrolecithal"], 0, "Telolecithal."],
    ["Cleavage in birds is", ["Meroblastic", "Holoblastic", "Absent", "Radial only"], 0, "Meroblastic."],
    ["One primary spermatocyte gives", ["Four sperm", "One sperm", "Two sperm", "Eight sperm"], 0, "Four sperm."]],
  f: [["Capacitation", "Maturation of sperm in the female tract"], ["Polyspermy block", "Zona reaction after the first sperm enters"], ["Blastoderm", "Disc of cells on the yolk in the bird embryo"], ["Dizygotic", "From two ova"]],
  d: ["Study candling of eggs.", "Learn the stages of chick development.", "Read about assisted reproductive technologies."]
});

topic("anat", "Development of the Organ Systems", {
  o: ["Describe the development of the digestive tract, liver and pancreas", "Describe the development of the respiratory, urinary, genital and circulatory systems", "Describe the development of the nervous system, skeleton and muscles", "Link developmental events to congenital anomalies"],
  i: "The syllabus asks for the development of organs of the digestive system with its accessory structures, and of the respiratory, urinary, circulatory, lymphatic, nervous, musculoskeletal, male and female reproductive systems, endocrine glands and sense organs. Many congenital defects make sense once the normal development is known.",
  s: "The three germ layers form tubes and folds that grow into organs. A defect at one step, such as a failure of fusion, leaves a typical abnormality at birth.",
  n: [
    ["Digestive system", "The endoderm forms the primitive gut, divided into foregut, midgut and hindgut. The foregut gives the pharynx, oesophagus, stomach and the first part of the duodenum, together with the liver and pancreas, which bud from the duodenum. The midgut forms the rest of the small intestine and part of the colon and herniates into the umbilical cord temporarily. The hindgut forms the rectum and joins the cloaca. In ruminants all four stomach compartments develop from the foregut; in the fetus the abomasum is relatively large and the rumen grows after birth with the intake of solid feed. The tongue, teeth and salivary glands develop from the pharyngeal region and oral cavity."],
    ["Respiratory system", "A groove in the floor of the foregut forms the laryngotracheal diverticulum, which grows into the trachea and lung buds. The lung buds branch to form the bronchial tree. The alveoli mature late, so premature animals may have lungs without enough surfactant."],
    ["Urinary system", "Three kidney forms appear in sequence: the pronephros (non-functional in mammals), the mesonephros (functional for a time) and the metanephros (the permanent kidney). The ureteric bud grows from the mesonephric duct and forms the ureter, renal pelvis and collecting ducts. The cloaca is divided into the urogenital sinus (bladder and urethra) and the rectum. The urachus connects the bladder to the allantois."],
    ["Genital system", "The indifferent gonad forms on the urogenital ridge. Two pairs of ducts are present: the mesonephric (Wolffian) ducts and paramesonephric (Müllerian) ducts. In the male, the sex-determining gene on the Y chromosome (SRY) leads to testis development, the Wolffian ducts form the epididymis and ductus deferens and the Müllerian ducts regress. In the female, the Müllerian ducts form the oviducts, uterus, cervix and part of the vagina. The testes descend from the abdomen into the scrotum through the inguinal canal near birth. Failure of descent is cryptorchidism."],
    ["Circulatory and lymphatic systems", "The heart forms from a tube that loops and is divided into four chambers by septa. The foramen ovale and ductus arteriosus close after birth. Defects of the septa or persistence of the ductus arteriosus are congenital heart defects. Blood vessels form from mesoderm, and lymphatic vessels bud from veins."],
    ["Nervous system and sense organs", "The neural plate folds into the neural tube, which forms the brain and spinal cord. The neural crest forms the peripheral nerves, ganglia, adrenal medulla and melanocytes. The eye develops from the optic vesicle of the forebrain and from surface ectoderm that forms the lens. The ear develops from the otic vesicle."],
    ["Musculoskeletal system", "Somites form the axial skeleton and most skeletal muscle. Bones form by intramembranous ossification (flat skull bones) or by endochondral ossification (long bones), with a cartilage model replaced by bone and growth plates at the ends."],
    ["Endocrine glands", "The anterior pituitary develops from Rathke's pouch, an upgrowth from the roof of the mouth, and the posterior pituitary from a downgrowth of the brain. The thyroid arises from the floor of the pharynx. The adrenal cortex comes from mesoderm and the medulla from the neural crest. The pancreatic islets bud from the foregut endoderm."],
    ["Congenital anomalies", "Examples are cleft palate (failure of palatal fusion), atresia ani (failure of the anal opening), persistent urachus, umbilical hernia, cryptorchidism, patent ductus arteriosus, hydrocephalus and limb defects. They can come from genetic causes, infections in pregnancy, toxic plants or drugs, and nutritional deficiency."]
  ],
  tb: { h: ["System", "Embryonic source", "Example anomaly"], r: [["Digestive", "Endoderm (foregut, midgut, hindgut)", "Atresia ani"], ["Respiratory", "Laryngotracheal diverticulum", "Tracheo-oesophageal fistula"], ["Urinary", "Metanephros and ureteric bud", "Persistent urachus"], ["Genital", "Mesonephric and paramesonephric ducts", "Cryptorchidism, freemartin"], ["Heart", "Heart tube and septa", "Patent ductus arteriosus"], ["Nervous", "Neural tube and crest", "Hydrocephalus"]] },
  df: ["Organogenesis: the formation of organs from the germ layers.", "Intramembranous ossification: bone formation directly in connective tissue, as in flat skull bones.", "Endochondral ossification: bone formation by replacement of a cartilage model."],
  tm: [["Foregut", "Part of the primitive gut that forms the stomach, liver and pancreas"], ["Metanephros", "Permanent kidney of mammals and birds"], ["Neural crest", "Group of cells that forms peripheral nerves and other structures"], ["Wolffian duct", "Mesonephric duct that forms the male genital ducts"], ["Müllerian duct", "Paramesonephric duct forming the female genital tract"]],
  st: ["The germ layers form.", "The neural tube and somites appear.", "Gut, heart and kidneys begin to form.", "Organs fold, fuse and septate.", "Fetal organs mature and the animal is born.", "Foetal shunts close and the organs take over their adult roles."],
  ex: ["A calf born with no anal opening has atresia ani.", "A foal with urine dripping at the navel has a persistent urachus.", "A pup with a cleft palate has a failure of fusion of the palate."],
  k: ["Germ layer derivatives.", "Gut regions.", "Kidney stages.", "Genital ducts.", "Congenital anomalies."],
  m: ["The permanent kidney is not the first one to form. It is the third."],
  sa: [["Name the three kidney stages in embryonic development.", "Pronephros, mesonephros and metanephros."], ["What does the Müllerian duct form in the female?", "Oviduct, uterus, cervix and part of the vagina."]],
  la: [["Describe the development of the urogenital system in domestic animals.", "Kidney stages, bladder and urethra, gonad, genital ducts, descent of the testis, anomalies."]],
  q: [["The permanent kidney is the", ["Metanephros", "Pronephros", "Mesonephros", "Cloaca"], 0, "Metanephros."],
    ["The anterior pituitary develops from", ["Rathke's pouch", "The neural tube", "The thyroid", "The neural crest"], 0, "Rathke's pouch."],
    ["The adrenal medulla comes from the", ["Neural crest", "Mesoderm", "Endoderm", "Surface ectoderm"], 0, "Neural crest."],
    ["Cleft palate is a failure of", ["Fusion of the palatal shelves", "Heart looping", "Kidney descent", "Lens formation"], 0, "Fusion of the palate."]],
  f: [["Rathke's pouch", "Source of the anterior pituitary"], ["Persistent urachus", "Urine leaking from the navel"], ["Wolffian duct", "Forms male genital ducts"], ["Neural crest", "Source of peripheral nerves and adrenal medulla"]],
  d: ["Study the fetal pig or chick embryo slides.", "Learn the causes of congenital anomalies in calves.", "Read about teratology."]
});
planned("anat", ["Neuroanatomy: tracts, nuclei and the autonomic ganglia", "Detailed anatomy of the guttural pouch and the larynx", "Comparative anatomy of joints and bursae", "Topographic anatomy of the pelvic region and rectal palpation landmarks", "Anatomy of the fish and exotic pets", "Applied anatomy of the horse's limb and lameness", "Mammary gland of the sow, mare and bitch", "Radiographic and ultrasound anatomy in detail", "Practical manual: dissection of a buffalo calf region by region"]);

/* ---- regroup Anatomy into the SVVU syllabus units ---- */
function regroup(sid, groups) {
  UNITS[sid] = groups.map(g => [g[0], g[1].map(n => sid + n)]);
  ORDER[sid] = [].concat.apply([], UNITS[sid].map(u => u[1]));
}
regroup("anat", [
  ["Unit 1A – Introduction, terms, osteology, arthrology and myology", [1, 2, 3, 4, 5, 26]],
  ["Unit 1B – Angiology, neurology and aesthesiology", [27, 7, 15, 19, 13]],
  ["Unit 1C – Splanchnology, surface anatomy and imaging", [32, 6, 21, 22, 14, 8, 23, 24, 25, 20, 31]],
  ["Unit 2 – Fore limb", [33, 10, 16]],
  ["Unit 3 – Head and neck", [34, 9]],
  ["Unit 4 – Thorax", [35]],
  ["Unit 5 – Abdomen", [36, 11]],
  ["Unit 6 – Hind limb and pelvis", [37]],
  ["Unit 7 – Cytology, histology and microscopy", [38, 18, 39, 30]],
  ["Unit 8 – Embryology", [17, 40, 41]],
  ["Supplement – Birds and small animals (species notes)", [12, 28, 29]]
]);
/* ================= ANATOMY completion: new topics, upgrades, diagrams, verify notes ================= */
function more(id, arr) { if (T[id]) T[id].n = T[id].n.concat(arr); }

unit("anat", "Syllabus additions");
topic("anat", "Ultrasonography and Radiography: Principles and Applications", {
  o: ["Explain how an ultrasound image is formed", "Use the terms anechoic, hypoechoic and hyperechoic", "State the main uses of ultrasound in large and small animals", "Compare ultrasound with radiography"],
  i: "The syllabus asks for the principles and application of radiography and ultrasound for bones and soft tissues. Ultrasound is now routine in practice for pregnancy diagnosis and for looking at soft organs that radiographs show poorly.",
  s: "An ultrasound machine sends very high-pitched sound into the body and listens for the echoes. Fluid sends back no echo and looks black. Bone sends back a bright echo and hides what lies behind it. A radiograph, in contrast, uses X-rays and shows bone best.",
  n: [
    ["How ultrasound works", "A probe (transducer) contains crystals that produce sound waves above the range of hearing when electrically stimulated. The waves travel through tissue and are partly reflected at boundaries between tissues of different density. The same crystals receive the echoes, and the machine converts the time and strength of each echo into a picture. Coupling gel removes air between probe and skin, since air blocks the sound. Hair is usually clipped."],
    ["Terms for the image", "Anechoic structures such as fluid give no echo and appear black (urine in the bladder, fluid in a cyst, fetal fluid). Hypoechoic tissue gives few echoes and looks dark grey. Hyperechoic tissue gives strong echoes and looks bright (bone surface, gas, fibrous tissue). Acoustic shadowing is the dark area behind bone or gas, which reflect nearly all the sound."],
    ["Frequency and depth", "Higher-frequency probes give finer detail but do not penetrate deeply and are used for small animals and superficial structures such as tendons. Lower-frequency probes penetrate deeper and are used for large animals and deep organs. Probe shape (linear, sector, convex) suits different areas."],
    ["Uses", "Pregnancy diagnosis in cattle, buffalo, mares, sheep and dogs, ovarian follicles and corpora lutea, abdominal organs (liver, kidney, bladder, uterus), the heart (echocardiography), tendons and joints in horses, the eye, and guidance for taking samples. Doppler ultrasound measures blood flow."],
    ["Radiography compared", "Radiography uses X-rays and shows bones, the lungs and gas patterns well, giving a single flat picture. Ultrasound shows the inside structure of soft organs and works in real time, without ionising radiation, but cannot see through bone or gas-filled lung. The two methods complement each other, and in many cases both are used."],
    ["Advanced imaging (brief)", "Computed tomography (CT) builds cross-sectional images from many X-ray views, magnetic resonance imaging (MRI) uses magnetic fields and radio waves and is excellent for brain and soft tissue, and nuclear imaging uses small amounts of radioactive material. These are available in a few referral centres and are introduced only briefly."],
    ["Safety", "Ultrasound is safe for the animal and the operator. For radiography, protection from radiation is essential: lead aprons and gloves, collimation, minimal exposures, and keeping people out of the beam."]
  ],
  tb: { h: ["Feature", "Radiography", "Ultrasound"], r: [["Energy used", "X-rays (ionising)", "High-frequency sound (non-ionising)"], ["Shows best", "Bone, lungs, gas", "Soft tissue, fluid, heart in motion"], ["Limitation", "Poor soft tissue detail", "Blocked by bone and gas"], ["Typical use", "Fractures, chest films", "Pregnancy, abdomen, heart, tendons"]] },
  df: ["Ultrasonography: imaging that uses reflected high-frequency sound waves.", "Echogenicity: how strongly a tissue reflects ultrasound.", "Acoustic shadow: the dark region behind a structure that blocks the sound beam."],
  tm: [["Transducer", "Probe that sends and receives sound"], ["Anechoic", "No echoes, black"], ["Hyperechoic", "Strong echoes, bright"], ["Coupling gel", "Gel that removes air between probe and skin"], ["Doppler", "Technique that measures movement such as blood flow"]],
  st: ["Prepare the animal and clip the hair if needed.", "Apply coupling gel.", "Place the probe and choose the depth and frequency.", "Scan the organ in more than one plane.", "Identify the structure by its shape and echogenicity.", "Record the findings."],
  ex: ["Early pregnancy diagnosis in cattle and buffalo uses transrectal ultrasound.", "A full bladder appears as a black, round area.", "A tendon injury in a horse shows as a darker (hypoechoic) area in the tendon."],
  k: ["Principle of ultrasound.", "Echogenicity terms.", "Uses and limits.", "Comparison with radiography."],
  m: ["Gel is not for comfort alone. It removes air that would block the sound."],
  sa: [["What does anechoic mean?", "Producing no echoes, so the structure looks black, as with fluid."], ["Why is gel used in ultrasonography?", "It removes the air between the probe and the skin so that sound can pass."]],
  la: [["Describe the principles and uses of ultrasonography in veterinary practice.", "Principle, probe types, image terms, uses in species, advantages and limitations, comparison with radiography."]],
  q: [["Fluid on ultrasound appears", ["Black (anechoic)", "White (hyperechoic)", "Grey only", "Not visible"], 0, "Fluid gives no echoes."],
    ["Which probe frequency gives the finest detail but least depth?", ["High", "Low", "Zero", "Same for all"], 0, "Higher frequency."],
    ["An acoustic shadow occurs behind", ["Bone or gas", "Fluid", "Muscle", "Fat"], 0, "They reflect nearly all the sound."],
    ["Ultrasound uses", ["Sound waves", "X-rays", "Magnets only", "Radioactive tracers"], 0, "High-frequency sound."]],
  f: [["Anechoic", "No echoes, black"], ["Hyperechoic", "Bright"], ["Transducer", "The ultrasound probe"], ["Acoustic shadow", "Dark area behind bone or gas"]],
  d: ["Practise identifying organs on ultrasound pictures.", "Learn pregnancy diagnosis in the cow by ultrasound.", "Study echocardiography."],
  vf: ["Probe frequencies and depths differ by machine. Use your teacher's practical notes for the exact values.", "Uses are listed in outline. The exact ultrasound features of each organ must be learned from images in your atlas."]
});

topic("anat", "The Vertebral Column: Regions, Typical and Special Vertebrae", {
  o: ["Describe a typical vertebra and its parts", "Describe the cervical, thoracic, lumbar, sacral and caudal regions", "Describe the atlas, axis and sacrum", "State the vertebral formulae and the joints of the column"],
  i: "The vertebral column protects the spinal cord, supports the body and takes part in movement. Clinicians use vertebrae as landmarks for locating organs, nerves and injection sites.",
  s: "A vertebra is a bony ring with a body in front, an arch above and projections for muscles and joints. The ring lines up to make a canal for the spinal cord. The shape changes along the back according to the job of each region.",
  n: [
    ["The typical vertebra", "A vertebra has a body (centrum), a vertebral arch (two pedicles and two laminae) enclosing the vertebral foramen, a spinous process, two transverse processes and cranial and caudal articular processes. Between adjacent vertebrae the intervertebral foramen lets the spinal nerve leave. The intervertebral disc, made of an outer fibrous ring and a soft nucleus pulposus, lies between the bodies. Disc herniation in dogs compresses the cord."],
    ["Cervical vertebrae", "There are seven. The atlas (C1) has broad wings and no body, and the head nods on it at the atlanto-occipital joint. The axis (C2) has a long spine and a tooth-like dens around which the atlas rotates. The cervical vertebrae C3 to C6 have large transverse processes. C7 has a transitional shape."],
    ["Thoracic vertebrae", "They have long spinous processes, forming the withers, and articular facets for the ribs. The number matches the pairs of ribs."],
    ["Lumbar vertebrae", "They have long transverse processes projecting sideways and no rib facets. The transverse processes form the roof of the flank. The number varies with the species."],
    ["Sacrum and caudal vertebrae", "The sacral vertebrae fuse into a single bone (the sacrum), whose wings join the ilium at the sacroiliac joint. The caudal (coccygeal) vertebrae form the tail, and their number varies greatly. The first intercoccygeal space is a landmark for caudal epidural anaesthesia in cattle, which only a vet should perform."],
    ["Ligaments and joints", "The supraspinous ligament runs along the tips of the spinous processes and continues forward as the nuchal ligament in ungulates. The dorsal and ventral longitudinal ligaments run along the vertebral bodies. Intervertebral joints permit limited movement individually and much movement together."],
    ["Species differences", "The formula in the dog is C7 T13 L7 S3 and in the ox C7 T13 L6 S5, with differences in the horse and pig as in the table. Birds fuse many vertebrae into the notarium (thoracic) and synsacrum."],
    ["Clinical relevance", "Fractures and luxations of the column can damage the spinal cord. Intervertebral disc disease is common in chondrodystrophic dogs such as the dachshund. Spinal anaesthesia and CSF collection use specific vertebral spaces."]
  ],
  tb: { h: ["Species", "C", "T", "L", "S", "Cd (approx.)"], r: [["Dog", "7", "13", "7", "3", "20 to 23"], ["Cat", "7", "13", "7", "3", "18 to 25"], ["Ox", "7", "13", "6", "5", "18 to 20"], ["Horse", "7", "18", "6", "5", "15 to 21"], ["Pig", "7", "14 to 15", "6 to 7", "4", "20 to 23"]] },
  df: ["Vertebral foramen: the opening enclosed by the vertebral arch, which forms the vertebral canal with the others.", "Intervertebral disc: the fibrocartilage pad between two vertebral bodies.", "Dens: the tooth-like projection of the axis around which the atlas turns."],
  tm: [["Centrum", "Body of a vertebra"], ["Pedicle", "Part of the arch joining it to the body"], ["Lamina", "Plate of the arch behind the pedicle"], ["Nucleus pulposus", "Soft centre of the intervertebral disc"], ["Wither", "Highest part of the back, formed by the thoracic spines"]],
  st: ["Identify the region from the shape of the vertebra.", "Find the body, arch and processes.", "Check for rib facets (thoracic).", "Note the length of the transverse processes (lumbar).", "Compare with the vertebra next to it."],
  ex: ["A dachshund that suddenly cannot walk may have a herniated disc pressing on the cord.", "A cow with a broken back after a fall may show hind limb paralysis.", "The wing of the atlas is a landmark in the neck for locating the carotid and the jugular vein."],
  k: ["Parts of a typical vertebra.", "Atlas and axis.", "Vertebral formulae.", "Ligaments of the column."],
  m: ["The sacrum is one bone in the adult, but it started as several vertebrae."],
  sa: [["Name the parts of a typical vertebra.", "Body, arch, spinous process, transverse processes and articular processes, enclosing the vertebral foramen."], ["What is the dens?", "The tooth-like process of the axis, around which the atlas rotates."]],
  la: [["Describe the cervical vertebrae of the ox with special reference to the atlas and axis.", "Number, typical cervical, atlas features, axis features, joints, movements, clinical relevance."]],
  q: [["The atlas is the", ["First cervical vertebra", "Second cervical vertebra", "First thoracic vertebra", "Sacral vertebra"], 0, "C1."],
    ["The nucleus pulposus lies in the", ["Intervertebral disc", "Spinal cord", "Atlas", "Rib"], 0, "Centre of the disc."],
    ["Lumbar vertebrae have", ["Long transverse processes", "Rib facets", "A dens", "No spinous process"], 0, "Long transverse processes."],
    ["The ox has how many lumbar vertebrae?", ["6", "7", "5", "8"], 0, "Six (verify in your book)."]],
  f: [["Dens", "Tooth of the axis"], ["Notarium", "Fused thoracic vertebrae of birds"], ["Intervertebral foramen", "Exit for the spinal nerve"], ["Wither", "Thoracic spines at the base of the neck"]],
  d: ["Practise identifying vertebrae from each region.", "Study disc disease in dogs.", "Learn the joints of the head and neck."],
  vf: ["The number of vertebrae in each region can vary by one in individual animals and in breeds, especially in the pig and the sheep. Use your textbook table as the exam answer.", "Cd (tail) counts are approximate ranges."]
});

topic("anat", "Practical Guide: Dissection, Demonstration and Viva Questions by Unit", {
  o: ["Know what each practical unit of the Anatomy syllabus expects you to demonstrate", "Use a checklist for each unit", "Practise sample viva questions", "Prepare spotters"],
  i: "The Anatomy syllabus carries 3 credit hours of practical. It is examined in two practical papers covering units 1 to 4 and 5 to 8. This page is a study checklist built from the syllabus text, so you can prepare your practical record and viva.",
  s: "In each practical unit you identify bones, find structures on a specimen, trace nerves and vessels and look at slides. Work through the lists below, then answer the sample questions aloud.",
  n: [
    ["How the practical is organised (syllabus)", "The syllabus says dissection is done on preserved cadavers and specimens, with an embalmed buffalo calf for every 24 students where available, supported by models, plastinated specimens and computer simulations. Practical paper I covers units 1 to 4 and paper II units 5 to 8. Check your college's current instructions."],
    ["Unit 1 practical checklist", "General terms and planes, parts of the skeleton, surface and joint regions, boundaries of the thoracic, abdominal and pelvic cavities, types of joints, muscles, tendons, ligaments, bursae and tendon sheaths, in-situ demonstration of heart, meninges, brain and spinal cord and organs of the main systems, palpable bony areas, palpable lymph nodes and arteries, surface veins for venepuncture, and the sites for bone marrow and CSF collection. Look at radiographs and ultrasound pictures."],
    ["Unit 2 practical checklist (fore limb)", "Bones of the ox fore limb and comparison, dissection of the fore limb, joints, ligaments, muscles, vessels, nerves, nerve block sites, suprascapular and radial nerve paralysis, equine hoof compared with the ox, radiographs of normal bones."],
    ["Unit 3 practical checklist (head and neck)", "Cranial and facial bones and cervical vertebrae, dissection of muscles of face, mastication, tongue, pharynx, soft palate, hyoid, larynx, eye and ear, superficial neck muscles, brain and its parts, tunics of the eye, teeth, tongue, thyroid, parathyroid and salivary glands, cranial nerves, trachea and oesophagus, nerve block sites of the head, the facial artery pulse, Stenson's duct, Viborg's triangle and the jugular vein."],
    ["Unit 4 practical checklist (thorax)", "Thoracic vertebrae, ribs and sternum, dissection of muscles, vessels, nerves and lymph nodes of the thorax, organs of the thorax, pleural reflections, sites for auscultation and percussion, recurrent laryngeal nerve paralysis, choke, radiographs and ultrasound of the thorax."],
    ["Unit 5 practical checklist (abdomen)", "Bones, dissection of muscles, vessels and nerves of the abdomen, peritoneum, omentum, mesentery, organs of digestive, urinary and reproductive systems, mammary glands of the cow, mare, bitch and sow, topography of the viscera, flank and paralumbar fossa and the surgical sites listed in the syllabus."],
    ["Unit 6 practical checklist (hind limb and pelvis)", "Bones of the hind limb and pelvis, joints and ligaments, dissection of muscles, vessels, lymph nodes and nerves, pelvic peritoneal reflections, pelvic organs, external genital organs, the femoral artery pulse and recurrent tarsal vein in the dog, radiographs and ultrasound of the pelvis, and the nerve block and surgical sites listed in the syllabus."],
    ["Unit 7 practical checklist (histology)", "Microscopy and micrometry, comparison of light and electron microscopes, histological techniques, paraffin sectioning and H and E staining, slides of epithelium, connective tissue, muscle, nervous tissue and blood, and slides of the digestive, circulatory, urinary, respiratory, nervous, lymphatic, endocrine and genital systems and sense organs."],
    ["Unit 8 practical checklist (embryology)", "Placenta, umbilical cord and fetal membranes of different domestic animals, congenital anomalies as available, and slides of developing organs."],
    ["Sample viva questions", "- What are the boundaries of the thoracic cavity?\n- Name the contents of the carotid sheath.\n- Where does the reticulum lie in the ox?\n- Name the nerves of the brachial plexus.\n- How many carpal bones does the ox have?\n- Which structure is the point of the hock?\n- What is the layer arrangement of the abdominal wall?\n- What does H and E stain?\n- Name the fetal membranes.\n- Where does fertilisation occur in the mammal?"],
    ["Spotters (tips)", "For a spotter, look at the shape, surface features and side of the bone or organ. Name it, state two identifying features and one clinical or comparative point. Practise with a timer of one minute per spotter."]
  ],
  tb: { h: ["Practical paper", "Units", "Maximum marks"], r: [["Paper I", "1, 2, 3 and 4", "60"], ["Paper II", "5, 6, 7 and 8", "60"]] },
  df: ["Dissection: the careful cutting and separation of tissues to study structure.", "Spotter: a short identification exercise in a practical examination.", "Viva voce: an oral examination."],
  tm: [["In situ", "In its natural position"], ["Cadaver", "Dead body used for dissection"], ["Plastination", "Preserving specimens with plastic"], ["Demonstration", "Showing a structure by a teacher"]],
  st: ["Read the unit's practical list before the class.", "Prepare your drawing and notes for each unit.", "Dissect or demonstrate under supervision.", "Identify the structures yourself on the specimen.", "Revise with viva questions.", "Write up the practical record."],
  ex: ["A student who studies the checklist before class finds structures faster.", "A spotter on the equine hoof may ask you to name the frog and the white line.", "A viva may ask for the nerve block sites by their anatomical landmarks."],
  k: ["Practical marks distribution.", "Unit-wise checklists.", "Viva preparation."],
  m: ["The checklist is built from the syllabus text. Your teacher's practical manual may add or reorder items."],
  sa: [["How are practical marks distributed?", "Two papers of 60 marks each, one for units 1 to 4 and one for units 5 to 8, per the syllabus text."], ["What is a spotter?", "A quick identification test of a bone, organ or slide."]],
  la: [["Describe how you would study the practical unit on the thorax.", "Bones, muscles, vessels and nerves, organs, pleural reflections, auscultation areas, radiographs."]],
  q: [["The syllabus uses which cadaver for dissection where available?", ["Buffalo calf", "Horse", "Dog", "Pig"], 0, "An embalmed buffalo calf for every 24 students, where available."],
    ["Practical paper II covers units", ["5 to 8", "1 to 4", "1 to 8", "6 only"], 0, "Units 5, 6, 7 and 8."],
    ["In situ means", ["In its natural position", "In a jar", "Under the microscope", "After burial"], 0, "In its natural position."],
    ["A viva is", ["An oral examination", "A written paper", "A drawing", "A lab report"], 0, "Viva voce."]],
  f: [["In situ", "In its natural position"], ["Spotter", "Quick identification station"], ["Viva", "Oral exam"], ["Plastination", "Plastic preservation of specimens"]],
  d: ["Make your own spotter cards.", "Draw each unit's key diagram from memory.", "Ask seniors for the practical record format."],
  vf: ["This checklist is a summary of the syllabus wording. Your department's practical manual and internal exam pattern are the final guide.", "Marks and paper structure are taken from the regulations PDF you supplied and may change in later revisions."]
});

/* ---- upgrade the older Anatomy topics ---- */
extra("anat1", {
  o: ["Define anatomy and list its branches", "Explain why anatomy matters in veterinary practice", "Distinguish gross, microscopic, comparative, applied and developmental anatomy", "Describe the levels of organisation of the body"],
  df: ["Anatomy: the study of the structure of the body and the relationship of its parts.", "Gross anatomy: study of structures visible to the naked eye.", "Comparative anatomy: comparison of structure among different species."],
  tm: [["Systemic anatomy", "Study by organ systems"], ["Regional (topographic) anatomy", "Study by body regions"], ["Applied (clinical) anatomy", "Anatomy used in diagnosis and treatment"], ["Histology", "Microscopic anatomy of tissues"], ["Embryology", "Study of development before birth"]],
  ex: ["Knowing where the rumen lies lets a vet listen to rumen sounds in the correct flank.", "Knowing the nerve supply of the horn lets a vet numb it before dehorning.", "Comparing species explains why a horse cannot vomit but a dog can."],
  vf: ["Different books list slightly different branches of anatomy. Use your textbook's list for the exact exam answer."]
});
extra("anat2", {
  o: ["Use the directional terms correctly on a quadruped", "Name the main planes and sections", "Use limb terms such as proximal, distal, palmar and plantar", "Describe the regions of the body"],
  df: ["Median plane: the plane that divides the body into equal right and left halves.", "Sagittal plane: any plane parallel to the median plane.", "Transverse plane: a plane at right angles to the long axis of the body or a part."],
  tm: [["Cranial", "Towards the head"], ["Caudal", "Towards the tail"], ["Rostral", "Towards the nose, used on the head"], ["Dorsal", "Towards the back"], ["Ventral", "Towards the belly"], ["Medial / lateral", "Nearer to or farther from the median plane"], ["Proximal / distal", "Nearer to or farther from the trunk in a limb"], ["Palmar / plantar", "The back of the forefoot and the back of the hind foot"]],
  ex: ["A radiograph report says 'dorsoventral view' to tell you where the beam entered.", "A vet describes a wound 'on the lateral aspect of the left hock' so that everyone finds the same spot."],
  vf: ["Terms for the limbs (dorsal vs cranial on the forelimb) differ slightly between textbooks. Use the terms your teachers use."]
});
extra("anat3", {
  o: ["Describe the structure and properties of bone", "Classify the skeleton and bones with examples", "Use the terms of osteology", "Describe how bone develops and grows"],
  df: ["Osteology: the study of bones.", "Periosteum: the connective tissue membrane covering the outer surface of bone.", "Epiphyseal plate (physis): the cartilage plate at which a long bone grows in length."],
  tm: [["Diaphysis", "Shaft of a long bone"], ["Epiphysis", "End of a long bone"], ["Metaphysis", "Region between shaft and end"], ["Medullary cavity", "Central cavity of the shaft containing marrow"], ["Foramen", "Hole in a bone"], ["Process", "Projection from a bone"]],
  st: ["A cartilage model forms from mesenchyme.", "A primary centre of ossification appears in the shaft.", "Secondary centres appear in the ends.", "A growth plate remains between them while the animal grows.", "The plate closes at maturity and the bone stops growing in length."],
  ex: ["A fracture through a growth plate in a young dog can stop the bone from growing normally.", "Calcium and phosphorus deficiency in calves causes rickets, with soft, bent bones.", "A fractured pneumatic bone in a bird can be connected to the airway."],
  vf: ["Timing of closure of growth plates differs with species and bone. Use your textbook's table, not a rule of thumb."]
});
more("anat3", [
  ["Classification of the skeleton", "The axial skeleton is the skull, vertebral column, ribs and sternum. The appendicular skeleton is the bones of the limbs and their girdles. The visceral (splanchnic) skeleton consists of bones that develop in soft organs, for example the os cordis in the heart of the ox, the os penis in the dog, and in some species the os rostri in the pig's snout."],
  ["Terms used in osteology", "Elevations are called process, tuberosity, tubercle, crest, spine, trochanter and condyle. Depressions include fossa, groove and notch. A foramen is a hole, a canal a long passage, and a sinus an air-filled space in a bone. A facet is a smooth articular surface. Knowing these terms makes descriptions of bones easier to read."],
  ["Properties of bone", "Bone is hard and strong yet slightly elastic. It is made of organic matter (collagen) giving toughness and inorganic salts, mainly calcium phosphate, giving hardness. Young bone has more collagen and is flexible, old bone is more brittle. Bone is living tissue with a blood supply and remodels throughout life. Structure is compact on the outside and spongy (trabecular) inside."]
]);
extra("anat4", {
  o: ["Classify joints with examples", "Describe the parts of a synovial joint", "Name the movements permitted by joints", "Describe bursae, tendon sheaths and ligaments"],
  df: ["Arthrology: the study of joints.", "Diarthrosis: a freely movable synovial joint.", "Ligament: a band of dense connective tissue joining bone to bone."],
  tm: [["Articular cartilage", "Smooth cartilage covering the bone ends in a joint"], ["Joint capsule", "Fibrous sleeve around a synovial joint"], ["Synovial fluid", "Lubricating fluid of the joint"], ["Meniscus", "Fibrocartilage pad in the stifle"], ["Bursa", "Synovial sac that reduces friction"], ["Tendon sheath", "Synovial tube around a tendon"]],
  ex: ["Joint ill in a calf is infection of the joints after navel infection.", "A swollen carpus in a cow (carpal hygroma) is a swollen bursa from a hard floor.", "Cruciate ligament rupture is a common knee (stifle) injury in dogs."],
  vf: ["Joint type names (hinge, ball and socket and so on) differ slightly between textbooks. Use the terms in your syllabus book."]
});
more("anat4", [
  ["Types of synovial joint and movements", "Hinge (ginglymus) joints, such as the elbow, allow flexion and extension. Ball-and-socket (spheroidal) joints, such as the shoulder and hip, allow movement in many directions. Pivot joints, such as the atlantoaxial joint, allow rotation. Condylar joints, such as the stifle, are mainly hinge with some rotation. Gliding (plane) joints, such as those between carpal bones, allow slight sliding. Movements are flexion (decreasing the angle), extension (increasing it), abduction (away from the median plane), adduction (towards it), rotation and circumduction."]
]);
extra("anat5", {
  o: ["Classify muscles by structure and shape", "Describe tendons, aponeuroses, bursae and tendon sheaths", "Explain origin, insertion and muscle action", "Understand how muscle names are formed"],
  df: ["Myology: the study of muscles.", "Tendon: a cord of dense connective tissue joining muscle to bone.", "Aponeurosis: a flat sheet-like tendon."],
  tm: [["Origin", "Fixed attachment of a muscle"], ["Insertion", "Attachment on the part that moves"], ["Agonist", "Muscle that produces a movement"], ["Antagonist", "Muscle that opposes it"], ["Synergist", "Muscle that assists the agonist"], ["Belly", "Fleshy part of a muscle"]],
  ex: ["A calf with white muscle disease has weak skeletal and cardiac muscle from selenium and vitamin E deficiency.", "A ruptured gastrocnemius tendon causes a dropped hock.", "Bowed tendon in a racehorse is an injury of the flexor tendons."],
  vf: ["The detailed muscle lists by region are learned during dissection. Lists in the textbook for the ox are the final reference."]
});
more("anat5", [
  ["How muscle names are formed (etymology)", "Muscles are named by shape (trapezius, rhomboideus), by position (supraspinatus above the spine of the scapula, infraspinatus below it), by action (flexor, extensor, abductor), by attachments (sternocephalicus, from sternum to head), by direction of fibres (oblique, transverse, rectus) or by the number of heads (biceps, triceps). The meaning of the name usually tells you where and what the muscle does."]
]);
extra("anat6", {
  o: ["Describe the compartments of the ruminant stomach and their features", "Trace feed through the digestive tract of the ox", "Describe the liver, pancreas and intestines in outline", "Compare with the simple stomach"],
  df: ["Ruminant: an animal with a four-chambered stomach that regurgitates and re-chews its feed.", "Rumination: the process of regurgitating and re-chewing feed.", "Reticular groove: the groove that carries milk directly to the abomasum in young calves."],
  tm: [["Rumen papillae", "Finger-like projections that absorb volatile fatty acids"], ["Honeycomb", "The reticulum's lining pattern"], ["Omasal laminae", "Leaf-like folds of the omasum"], ["Abomasum", "True glandular stomach of the ruminant"], ["Cud", "Bolus of regurgitated feed"]],
  st: ["Feed is chewed briefly and swallowed.", "It enters the rumen and reticulum for fermentation.", "It is regurgitated as cud, re-chewed and swallowed again.", "Fine particles pass to the omasum for water absorption.", "They reach the abomasum for acid and enzyme digestion.", "They move to the small intestine for absorption."],
  ex: ["Hardware disease: a nail falls into the reticulum and can pierce the diaphragm and heart sac.", "Bloat is gas trapped in the rumen and reticulum.", "A milk-fed calf's milk passes to the abomasum through the reticular groove."],
  vf: ["Capacities of the stomach compartments differ between breeds and with age. Use the figures in your textbook if the exam asks for them.", "The rib levels of the reticulum are approximate."]
});
extra("anat7", {
  o: ["Describe the heart, its chambers and valves", "Describe the main vessels and the circulation", "Describe the parts of the respiratory tract", "Compare the species"],
  df: ["Systemic circulation: blood flow from the left ventricle through the body and back to the right atrium.", "Pulmonary circulation: blood flow from the right ventricle to the lungs and back to the left atrium.", "Pericardium: the sac around the heart."],
  tm: [["Atrioventricular valve", "Valve between atrium and ventricle"], ["Semilunar valve", "Valve at the exit of the ventricle"], ["Coronary artery", "Artery supplying the heart muscle"], ["Bronchus", "Large airway branching from the trachea"], ["Alveolus", "Air sac where gas exchange occurs"]],
  ex: ["Traumatic reticulopericarditis in cattle follows penetration of the heart sac by a foreign body.", "A horse with a roaring noise has laryngeal nerve damage.", "Heart murmurs in dogs often come from valve disease."],
  vf: ["Rib spaces of the heart and lung borders are approximate and vary with species and posture. Use the figures in your textbook."]
});
extra("anat8", {
  o: ["Describe the kidneys, ureters, bladder and urethra in outline", "Describe the male and female genital organs in outline", "Name the main divisions of the nervous system", "Understand how the systems link to each other"],
  df: ["Urogenital system: the combined urinary and genital organs, which develop together.", "Central nervous system: the brain and spinal cord.", "Peripheral nervous system: the nerves outside the brain and spinal cord."],
  tm: [["Nephron", "Functional unit of the kidney"], ["Ureter", "Tube from kidney to bladder"], ["Gonad", "Testis or ovary"], ["Ganglion", "Collection of nerve cell bodies outside the CNS"], ["Neuron", "Nerve cell"]],
  ex: ["Urinary stones block the urethra in male goats and cats.", "A calf with a spinal injury shows paralysis behind the injury.", "A bull's testes are felt in the scrotum during a breeding soundness exam."],
  vf: ["This is an overview topic. Detailed organ systems are covered in the later topics of Unit 1C."]
});
extra("anat12", { vf: ["Egg formation times are approximate and vary with breed and age of the hen.", "Which bird bones are pneumatic varies by species. Use your poultry anatomy text."] });

/* ---- verify notes on newer topics ---- */
extra("anat9", { vf: ["Eruption times and the exact age scale from teeth vary with breed, feeding and the book you follow. Use your textbook's table.", "The dental formulae are standard, but check the ox formula as written in your text (the lower canine is counted with the incisors in many books)."] });
extra("anat10", { vf: ["The number of horse carpal bones is given as 7 or 8 in different books because the first carpal is often absent.", "Percentages of weight carried by the fore and hind limbs are approximate."] });
extra("anat11", { vf: ["Quarter yields and blood-to-milk ratios are approximate figures commonly quoted. Check the figure in your book."] });
extra("anat13", { vf: ["Types of tapetum in species and the pupil shape are given as commonly taught. Confirm in a veterinary ophthalmology or anatomy text."] });
extra("anat14", { vf: ["Position and number of parathyroid glands vary between species. Use your textbook."] });
extra("anat15", { vf: ["The list of palpable lymph nodes differs between species and books. The inverted lymph node of the pig is standard, but check the details."] });
extra("anat16", { vf: ["Hoof growth rate is an approximate figure and varies a lot. Check your text."] });
extra("anat17", { vf: ["The classification of the ruminant placenta (synepitheliochorial or syndesmochorial) differs between books. Use the term your textbook uses.", "The degree of antibody transfer across the dog and cat placenta is described as 'little' in many books. Check yours."] });
extra("anat18", { vf: ["Section thickness and staining times in the processing steps are typical values. Use the figures in your practical manual."] });
extra("anat19", { vf: ["The level at which the spinal cord ends differs between species and between books. Check your text.", "Names of CSF collection sites are as commonly taught. Confirm with your teacher."] });
extra("anat21", { vf: ["Capacity of the equine stomach and colon is a common exam figure that differs between books. Not given here on purpose."] });
extra("anat22", { vf: ["Lobe names and numbers vary. Confirm the lobe pattern for each species in your text."] });
extra("anat24", { vf: ["Details of the cervix of each species and of the suburethral diverticulum should be checked in your reproductive anatomy text."] });
extra("anat25", { vf: ["Kidney shape descriptions (heart-shaped right kidney in the horse) are as commonly taught. Confirm with a specimen."] });
extra("anat29", { vf: ["Vertebral formulae are approximate. Verify before using them as an exam answer."] });
extra("anat32", { vf: ["Rib-level positions of organs are approximate."] });
extra("anat33", { vf: ["The root levels of the brachial plexus (C6 to T2) are quoted for the dog. Check the levels for the ox in your text.", "Your syllabus pairs radial nerve paralysis with 'capped elbow'. Capped elbow is usually a swelling at the point of the elbow, while radial nerve paralysis gives a dropped elbow. Please confirm the terms with your teacher.", "Carpal and tarsal bone counts for the ox (6 and 5) are as commonly taught. Confirm with a specimen."] });
extra("anat34", { vf: ["Paranasal sinus lists and names differ in books.", "The exact opening of the parotid duct, and the boundaries of Viborg's triangle, should be checked in your anatomy text.", "Nerve block names are given by landmarks only. Do not use them as a procedure guide."] });
extra("anat35", { vf: ["Rib counts in the pig (14 or 15) and the horse (about 18) vary between individuals and books.", "Rib-space limits of the heart and lung are approximate."] });
extra("anat36", { vf: ["Rib levels for the reticulum and other organs are approximate.", "Paravertebral block nerve levels (T13, L1 and L2) are as commonly taught for cattle. Confirm with your text."] });
extra("anat37", { vf: ["The tarsal bone counts are as commonly taught (ox 5, horse 6, dog and pig 7). Confirm with a specimen.", "Epidural and nerve block sites are named only as landmarks."] });
extra("anat38", { vf: ["Red cell size ranking and the sites for bone marrow collection are as commonly taught. Check the text."] });
extra("anat39", { vf: ["Histology of each organ varies between species. Use your slides and textbook as the final reference."] });
extra("anat40", { vf: ["Terms for implantation types differ between books. The statement that the dog ovulates a primary oocyte is standard but confirm it.", "Incubation days are for the fowl."] });
extra("anat41", { vf: ["Details of the development of the ruminant stomach compartments differ slightly between texts."] });

more("anat20", [
  ["Palpable bony prominences", "These are bony points that can be felt through the skin and are used as landmarks: the wing of the atlas, the withers (thoracic spines), the point of the shoulder (greater tubercle of the humerus), the point of the elbow (olecranon), the tuber coxae (point of the hip), the tuber ischii (pin bone), the tuber sacrale, the greater trochanter of the femur, the patella, and the point of the hock (calcaneus). The zygomatic arch and the angle of the mandible are felt on the head."],
  ["Sites for bone marrow and CSF collection (concept only)", "Bone marrow is examined in cases of unexplained anaemia or some cancers. Common sites are the sternum or ribs in large animals and the iliac crest or proximal humerus or femur in small animals. Cerebrospinal fluid is collected from the space between the skull and atlas (cerebellomedullary cistern) or the lumbosacral space. Both are done under local or general anaesthesia by a vet. You should know the site by its landmarks, not attempt the procedure."]
]);

/* ---- diagrams for every relevant topic ---- */
[["anat2", ["planes"]], ["anat3", ["bonecls", "bone"]], ["anat4", ["jointcls", "synovial"]], ["anat5", ["musclecls"]],
 ["anat6", ["rumen", "gutwall"]], ["anat7", ["circ", "resp"]], ["anat8", ["urine"]], ["anat9", ["tooth"]], ["anat12", ["oviduct"]], ["anat13", ["eye", "lightpath"]],
 ["anat14", ["endoc"]], ["anat15", ["lymph"]], ["anat16", ["hoofparts"]], ["anat17", ["germ", "placenta"]], ["anat18", ["tissues", "process"]],
 ["anat19", ["reflex", "meninges", "csf", "cord"]], ["anat21", ["digh"]], ["anat22", ["resp"]], ["anat23", ["male"]], ["anat24", ["female"]], ["anat25", ["urine"]],
 ["anat26", ["abwall"]], ["anat27", ["circ", "fetal"]], ["anat30", ["skin"]], ["anat31", ["xray"]], ["anat32", ["oxsides"]],
 ["anat33", ["forechain", "plexus"]], ["anat35", ["thorax"]], ["anat36", ["oxsides", "abwall"]], ["anat37", ["hindchain"]],
 ["anat38", ["bloodtree", "junctions"]], ["anat39", ["gutwall", "process"]], ["anat40", ["gamet", "membranes"]], ["anat41", ["germ", "kidneydev", "genitaldev"]],
 ["anat42", ["xray"]]].forEach(p => extra(p[0], { dia: p[1] }));

regroup("anat", [
  ["Unit 1A – Introduction, terms, osteology, arthrology and myology", [1, 2, 3, 4, 5, 43, 26]],
  ["Unit 1B – Angiology, neurology and aesthesiology", [27, 7, 15, 19, 13]],
  ["Unit 1C – Splanchnology, surface anatomy and imaging", [32, 6, 21, 22, 14, 8, 23, 24, 25, 20, 31, 42]],
  ["Unit 2 – Fore limb", [33, 10, 16]],
  ["Unit 3 – Head and neck", [34, 9]],
  ["Unit 4 – Thorax", [35]],
  ["Unit 5 – Abdomen", [36, 11]],
  ["Unit 6 – Hind limb and pelvis", [37]],
  ["Unit 7 – Cytology, histology and microscopy", [38, 18, 39, 30]],
  ["Unit 8 – Embryology", [17, 40, 41]],
  ["Practical guide and species notes", [44, 12, 28, 29]]
]);
/* ================= DIAGRAMS (schematics, not accurate drawings) ================= */
const DIA = {};
const _bx = (x, y, w, h, t, c) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + (c || "#e3f1e8") + '" stroke="#1f4d3a" stroke-width="1.5"/><text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 4) + '" text-anchor="middle" font-size="12" fill="#17352a">' + t + "</text>";
const _ar = (x1, y1, x2, y2) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1f4d3a" stroke-width="1.6" marker-end="url(#ah)"/>';
const _svg = (w, h, body, cap) => '<figure class="dia"><svg style="max-width:' + w + 'px" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + cap + '"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1f4d3a"/></marker></defs>' + body + "</svg><figcaption>" + cap + " (schematic, not an accurate anatomical drawing)</figcaption></figure>";
const _tx = (x, y, t, a) => '<text x="' + x + '" y="' + y + '" font-size="12" fill="#17352a" text-anchor="' + (a || "middle") + '">' + t + "</text>";

DIA.planes = _svg(420, 230,
  '<ellipse cx="210" cy="120" rx="150" ry="50" fill="#e3f1e8" stroke="#1f4d3a" stroke-width="1.5"/>' +
  '<line x1="210" y1="50" x2="210" y2="190" stroke="#b4572b" stroke-width="2" stroke-dasharray="5 4"/>' +
  '<line x1="60" y1="120" x2="360" y2="120" stroke="#2a6f97" stroke-width="2" stroke-dasharray="5 4"/>' +
  '<line x1="140" y1="60" x2="140" y2="185" stroke="#7a5ea8" stroke-width="2" stroke-dasharray="5 4"/>' +
  _tx(210, 40, "Median (sagittal) plane", "middle") + _tx(375, 123, "Dorsal plane", "start") + _tx(140, 205, "Transverse plane", "middle") +
  _tx(40, 100, "Cranial", "middle") + _tx(380, 100, "Caudal", "middle") + _tx(210, 112, "dorsal", "middle") + _tx(210, 140, "ventral", "middle"),
  "Body planes and directions");

DIA.homeo = _svg(440, 170,
  _bx(10, 60, 90, 44, "Set point") + _bx(130, 60, 90, 44, "Sensor") + _bx(250, 60, 90, 44, "Control centre") + _bx(350, 10, 80, 44, "Effector", "#fff1d6") +
  _ar(100, 82, 130, 82) + _ar(220, 82, 250, 82) + _ar(340, 70, 360, 54) +
  '<path d="M390 54 L390 140 L175 140 L175 106" fill="none" stroke="#b4572b" stroke-width="1.6" marker-end="url(#ah)"/>' + _tx(285, 134, "Response changes the variable (negative feedback)"),
  "Negative feedback loop");

DIA.adme = _svg(440, 150,
  _bx(10, 55, 85, 44, "Absorption") + _bx(120, 55, 85, 44, "Distribution") + _bx(230, 55, 90, 44, "Metabolism") + _bx(345, 55, 85, 44, "Excretion", "#fff1d6") +
  _ar(95, 77, 120, 77) + _ar(205, 77, 230, 77) + _ar(320, 77, 345, 77) +
  _tx(52, 125, "gut, muscle, skin") + _tx(162, 125, "blood to tissues") + _tx(275, 125, "mostly liver") + _tx(388, 125, "kidney, bile, milk"),
  "Pharmacokinetics: ADME");

DIA.gram = _svg(440, 190,
  '<rect x="20" y="30" width="180" height="120" rx="14" fill="#efe5fa" stroke="#7a5ea8" stroke-width="2"/><rect x="40" y="50" width="140" height="80" rx="10" fill="#fff" stroke="#7a5ea8" stroke-dasharray="4 3"/>' +
  '<rect x="240" y="30" width="180" height="120" rx="14" fill="#fbe3e3" stroke="#b44" stroke-width="1.5"/><rect x="255" y="45" width="150" height="90" rx="10" fill="#fff" stroke="#b44" stroke-dasharray="4 3"/><rect x="270" y="60" width="120" height="60" rx="8" fill="#fff" stroke="#b44"/>' +
  _tx(110, 175, "Gram positive: thick peptidoglycan, stays purple") + _tx(330, 175, "Gram negative: thin wall + outer membrane, pink") +
  _tx(110, 94, "Cell membrane") + _tx(110, 20, "Thick wall") + _tx(330, 20, "Outer membrane"),
  "Gram-positive and Gram-negative cell walls");

DIA.rumen = _svg(440, 190,
  _bx(10, 20, 90, 40, "Oesophagus", "#fff") + _bx(130, 20, 100, 70, "Rumen + reticulum", "#e3f1e8") + _bx(260, 20, 80, 40, "Omasum") + _bx(260, 100, 80, 40, "Abomasum", "#fff1d6") + _bx(370, 100, 60, 40, "Intestine", "#fff") +
  _ar(100, 40, 130, 40) + _ar(230, 50, 260, 40) + _ar(300, 60, 300, 100) + _ar(340, 120, 370, 120) +
  '<path d="M150 20 C 140 5, 100 5, 90 20" fill="none" stroke="#b4572b" stroke-width="1.4" marker-end="url(#ah)"/>' + _tx(120, 12, "cud"),
  "Path of feed through the ruminant stomach");

DIA.lifecycle = _svg(440, 190,
  _bx(10, 70, 80, 44, "Adult worm in host") + _bx(120, 10, 80, 44, "Eggs in faeces") + _bx(250, 10, 80, 44, "Larvae on pasture", "#fff1d6") + _bx(340, 70, 90, 44, "Infective larva eaten") + _bx(190, 130, 100, 44, "Migrates, matures", "#fff") +
  _ar(60, 70, 130, 54) + _ar(200, 32, 250, 32) + _ar(330, 45, 370, 70) + _ar(370, 114, 290, 145) + _ar(190, 150, 70, 114),
  "Generalised direct nematode life cycle");

DIA.inflam = _svg(440, 160,
  _bx(10, 50, 80, 44, "Injury") + _bx(110, 50, 90, 44, "Vasodilation") + _bx(220, 50, 90, 44, "Leak of fluid", "#fff1d6") + _bx(330, 50, 100, 44, "Neutrophils arrive") +
  _ar(90, 72, 110, 72) + _ar(200, 72, 220, 72) + _ar(310, 72, 330, 72) +
  _tx(220, 130, "Signs: redness, heat, swelling, pain, loss of function"),
  "Sequence of acute inflammation");

DIA.bone = _svg(420, 200,
  '<rect x="165" y="20" width="90" height="160" rx="30" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/><rect x="190" y="60" width="40" height="80" fill="#fffaf0" stroke="#1f4d3a" stroke-dasharray="4 3"/>' +
  _tx(85, 40, "Epiphysis") + _tx(85, 100, "Diaphysis (shaft)") + _tx(85, 165, "Epiphysis") + _tx(340, 105, "Marrow cavity", "start") + _tx(340, 50, "Compact bone", "start"),
  "Long bone parts");

DIA.tooth = _svg(380, 200,
  '<path d="M140 20 H240 L250 90 H130 Z" fill="#fffaf0" stroke="#1f4d3a" stroke-width="2"/><path d="M130 90 L160 180 L190 180 L190 90 M190 90 L190 180 L220 180 L250 90" fill="#f4ead4" stroke="#1f4d3a" stroke-width="2"/><rect x="175" y="60" width="30" height="100" rx="12" fill="#f6c7c7" stroke="#b44"/>' +
  _tx(70, 45, "Enamel") + _tx(70, 120, "Dentine") + _tx(310, 70, "Crown", "start") + _tx(310, 150, "Root", "start") + _tx(310, 110, "Cement", "start") + _tx(190, 195, "Pulp cavity"),
  "Parts of a tooth");

DIA.synapse = _svg(440, 170,
  '<path d="M10 50 H170 Q200 50 200 80 Q200 110 170 110 H10 Z" fill="#e3f1e8" stroke="#1f4d3a" stroke-width="1.5"/><rect x="250" y="40" width="180" height="80" rx="10" fill="#fff1d6" stroke="#1f4d3a" stroke-width="1.5"/>' +
  '<circle cx="175" cy="80" r="6" fill="#b4572b"/><circle cx="200" cy="64" r="4" fill="#b4572b"/><circle cx="225" cy="78" r="4" fill="#b4572b"/><circle cx="238" cy="92" r="4" fill="#b4572b"/>' +
  _tx(90, 135, "Nerve ending (vesicles)") + _tx(340, 135, "Muscle / next cell (receptors)") + _tx(225, 30, "Cleft: transmitter crosses"),
  "Chemical synapse");

DIA.oviduct = _svg(440, 190,
  _bx(10, 20, 100, 36, "Ovary: ovum") + _bx(10, 70, 100, 36, "Infundibulum") + _bx(130, 70, 80, 36, "Magnum") + _bx(230, 70, 70, 36, "Isthmus") + _bx(320, 70, 100, 36, "Shell gland", "#fff1d6") + _bx(320, 130, 100, 36, "Vagina, cloaca", "#fff") +
  _ar(60, 56, 60, 70) + _ar(110, 88, 130, 88) + _ar(210, 88, 230, 88) + _ar(300, 88, 320, 88) + _ar(370, 106, 370, 130) +
  _tx(170, 130, "albumen") + _tx(265, 130, "membranes") + _tx(370, 60, "shell"),
  "Egg formation in the hen");

DIA.eye = _svg(440, 190,
  '<ellipse cx="200" cy="95" rx="120" ry="70" fill="#fff" stroke="#1f4d3a" stroke-width="2"/><path d="M80 95 Q70 95 70 95" stroke="#1f4d3a"/><ellipse cx="110" cy="95" rx="22" ry="50" fill="#e8f4fb" stroke="#2a6f97" stroke-width="1.5"/><line x1="125" y1="70" x2="150" y2="95" stroke="#7a5ea8" stroke-width="2"/><line x1="125" y1="120" x2="150" y2="95" stroke="#7a5ea8" stroke-width="2"/><path d="M318 55 Q335 95 318 135" fill="none" stroke="#b4572b" stroke-width="3"/><line x1="320" y1="95" x2="400" y2="95" stroke="#1f4d3a" stroke-width="5"/>' +
  _tx(60, 40, "Cornea") + _tx(110, 165, "Lens") + _tx(150, 40, "Iris / pupil") + _tx(240, 100, "Vitreous") + _tx(330, 40, "Retina") + _tx(405, 120, "Optic nerve"),
  "Parts of the eye");
/* ================= DIAGRAM LIBRARY 2: flowcharts and schematics ================= */
const _wrap = t => String(t).split("|").flatMap(s => { const out = []; let cur = ""; s.split(" ").forEach(w => { if ((cur + " " + w).trim().length > 21 && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }); out.push(cur); return out; });
const _bh = (t, min) => Math.max(min || 44, _wrap(t).length * 14 + 18);
const _b = (x, y, w, h, t, c) => {
  const L = _wrap(t), lh = 14, y0 = y + h / 2 - (L.length - 1) * lh / 2 + 4;
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + (c || "#e3f1e8") + '" stroke="#1f4d3a" stroke-width="1.4"/>' +
    L.map((s, i) => '<text x="' + (x + w / 2) + '" y="' + (y0 + i * lh) + '" text-anchor="middle" font-size="12" fill="#17352a">' + s + "</text>").join("");
};
const _path = d => '<path d="' + d + '" fill="none" stroke="#1f4d3a" stroke-width="1.5" marker-end="url(#ah)"/>';
const _lab = (x, y, t, a) => '<text x="' + x + '" y="' + y + '" font-size="12" fill="#17352a" text-anchor="' + (a || "start") + '">' + t + "</text>";
const _ldr = (x1, y1, x2, y2) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#555" stroke-width="1"/><circle cx="' + x1 + '" cy="' + y1 + '" r="2.5" fill="#555"/>';
/* chain of boxes in snake rows of at most 3, with arrows; closed=true adds a return arrow along the left margin */
const _flow = (labels, per, cap, cols, closed) => {
  per = Math.min(per, 3); if (labels.length <= 4 && per < labels.length && labels.length <= 3) per = labels.length;
  const w = 140, gx = 30, gy = 36, n = labels.length, rows = Math.ceil(n / per), m = closed ? 22 : 0;
  const rh = []; for (let r = 0; r < rows; r++) rh.push(Math.max.apply(null, labels.slice(r * per, r * per + per).map(t => _bh(t))));
  const ry = []; let yy = 10; rh.forEach(v => { ry.push(yy); yy += v + gy; });
  const W = per * w + (per - 1) * gx + 20 + m, H = yy - gy + 10 + (closed ? 26 : 0);
  const pos = i => { const r = Math.floor(i / per), c = i % per; return { x: 10 + m + c * (w + gx), y: ry[r], h: rh[r], r: r }; };
  let s = "";
  labels.forEach((t, i) => { const p = pos(i); s += _b(p.x, p.y, w, p.h, t, cols && cols[i]); });
  for (let i = 0; i < n - 1; i++) {
    const a = pos(i), b = pos(i + 1);
    if (a.r === b.r) s += _path("M" + (a.x + w) + " " + (a.y + a.h / 2) + " H" + b.x);
    else s += _path("M" + (a.x + w / 2) + " " + (a.y + a.h) + " V" + (a.y + a.h + gy / 2) + " H" + (b.x + w / 2) + " V" + b.y);
  }
  if (closed) { const a = pos(n - 1), b = pos(0); s += _path("M" + (a.x + w / 2) + " " + (a.y + a.h) + " V" + (H - 8) + " H6 V" + (b.y + b.h / 2) + " H" + b.x); }
  return _svg(W, H, s, cap);
};
/* tree: one root over children (at most 3 per row); kids = "Title|detail" */
const _tree = (root, kids, cap, cols) => {
  const w = 150, gx = 16, per = Math.min(kids.length, 3), rows = Math.ceil(kids.length / per);
  const W = per * w + (per - 1) * gx + 20, rw = Math.min(W - 20, Math.max(170, root.length * 7 + 24));
  const rh = []; for (let r = 0; r < rows; r++) rh.push(Math.max.apply(null, kids.slice(r * per, r * per + per).map(t => _bh(t, 48))));
  let y = 56; const ry = rh.map(v => { const t = y; y += v + 30; return t; });
  let s = _b(W / 2 - rw / 2, 8, rw, 34, root, "#fff1d6");
  kids.forEach((t, i) => {
    const r = Math.floor(i / per), c = i % per, inRow = Math.min(per, kids.length - r * per);
    const x = (W - (inRow * w + (inRow - 1) * gx)) / 2 + c * (w + gx);
    s += (r === 0 ? _path("M" + (W / 2) + " 42 V" + (ry[0] - 14) + " H" + (x + w / 2) + " V" + ry[0]) : _path("M" + (W / 2) + " 42 V" + (ry[0] - 14) + " H5 V" + (ry[r] - 14) + " H" + (x + w / 2) + " V" + ry[r])) + _b(x, ry[r], w, rh[r], t, cols && cols[i]);
  });
  return _svg(W, y - 30 + 10, s, cap);
};
const RED = "#fbd5d5", BLUE = "#d5e6f7", CREAM = "#fff1d6", MINT = "#e3f1e8", LILAC = "#efe5fa";

DIA.bonecls = _tree("Classification of bones (by shape)", ["Long|humerus, femur", "Short|carpal, tarsal", "Flat|scapula, ribs, skull", "Irregular|vertebra", "Sesamoid|patella", "Pneumatic|skull bones, bird bones"], "Bones classified by shape");
DIA.jointcls = _tree("Joints (arthrology)", ["Fibrous|synarthrosis|skull sutures", "Cartilaginous|amphiarthrosis|pubic symphysis,|intervertebral disc", "Synovial|diarthrosis|shoulder, stifle, hock"], "Classification of joints", [MINT, CREAM, LILAC]);
DIA.synovial = _svg(420, 210,
  '<rect x="120" y="14" width="180" height="48" rx="10" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/><rect x="120" y="148" width="180" height="48" rx="10" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/>' +
  '<rect x="120" y="62" width="180" height="8" fill="#9ec9d9"/><rect x="120" y="140" width="180" height="8" fill="#9ec9d9"/><rect x="120" y="70" width="180" height="70" fill="#e8f4fb" stroke="none"/>' +
  '<path d="M110 40 V170 M310 40 V170" stroke="#b4572b" stroke-width="5" fill="none"/>' +
  _tx(210, 108, "Joint cavity with synovial fluid") + _tx(70, 36, "Bone end", "end") + _tx(330, 105, "Joint capsule", "start") + _tx(330, 68, "Articular cartilage", "start") + _tx(70, 172, "Bone end", "end") + _tx(330, 145, "Articular cartilage", "start") + _tx(330, 122, "Synovial membrane", "start"),
  "A synovial (diarthrodial) joint");
DIA.musclecls = _tree("Muscle tissue", ["Skeletal|striated,|voluntary", "Cardiac|striated,|involuntary", "Smooth|not striated,|involuntary"], "Types of muscle", [MINT, RED, BLUE]);
DIA.circ = _flow(["Right atrium", "Right ventricle", "Pulmonary artery", "Lungs|(gas exchange)", "Pulmonary veins", "Left atrium", "Left ventricle", "Aorta and body", "Cranial and caudal|vena cava"], 3, "Path of blood: systemic and pulmonary circulation", [BLUE, BLUE, BLUE, MINT, RED, RED, RED, RED, BLUE], true);
DIA.fetal = _flow(["Placenta", "Umbilical vein", "Ductus venosus|(bypasses liver)", "Caudal vena cava", "Right atrium", "Foramen ovale|(to left atrium)", "Left ventricle", "Aorta", "Umbilical arteries|back to placenta"], 3, "Fetal circulation: the three shunts (ductus venosus, foramen ovale, ductus arteriosus)", [MINT, RED, RED, BLUE, BLUE, CREAM, RED, RED, BLUE]);
DIA.reflex = _flow(["Receptor|(skin, muscle)", "Sensory neuron|(dorsal root)", "Spinal cord|(integration)", "Motor neuron|(ventral root)", "Effector|(muscle)"], 5, "A simple reflex arc", [MINT, LILAC, CREAM, LILAC, MINT]);
DIA.meninges = _svg(440, 210,
  '<ellipse cx="220" cy="105" rx="195" ry="92" fill="#f4ead4" stroke="#1f4d3a" stroke-width="2"/><ellipse cx="220" cy="105" rx="170" ry="76" fill="#cfd8dc" stroke="#1f4d3a"/><ellipse cx="220" cy="105" rx="150" ry="62" fill="#e8f4fb" stroke="#1f4d3a" stroke-dasharray="4 3"/><ellipse cx="220" cy="105" rx="128" ry="48" fill="#f6c7c7" stroke="#b44"/><ellipse cx="220" cy="105" rx="90" ry="26" fill="#fff" stroke="#999"/>' +
  _tx(220, 108, "Brain / cord") + _tx(220, 20, "Skull / vertebral canal", "middle") + _tx(60, 105, "Dura", "middle") + _tx(30, 175, "Subarachnoid space (CSF)", "start") + _tx(400, 175, "Pia on surface", "end") + _tx(90, 70, "Arachnoid", "middle"),
  "Meninges, from outside inward: dura mater, arachnoid mater, subarachnoid space with CSF, pia mater");
DIA.csf = _flow(["Choroid plexus|(makes CSF)", "Lateral ventricles", "Third ventricle", "Mesencephalic|aqueduct", "Fourth ventricle", "Subarachnoid space|(brain and cord)", "Venous sinuses|(absorbed)"], 4, "Flow of cerebrospinal fluid", [CREAM, BLUE, BLUE, BLUE, BLUE, MINT, RED]);
DIA.cord = _svg(380, 220,
  '<ellipse cx="190" cy="110" rx="100" ry="82" fill="#f3f3ee" stroke="#1f4d3a" stroke-width="2"/><path d="M190 110 m-12-52 q12-30 24 0 q22 16 26 40 q-6 26-32 30 q-20-4-34-30 q-8-24 16-40z" fill="#c9bfe3" stroke="#7a5ea8" stroke-width="1.5"/>' +
  '<path d="M190 28 V80" stroke="#7a5ea8" stroke-width="2"/><circle cx="190" cy="110" r="6" fill="#fff" stroke="#7a5ea8"/><path d="M150 60 L90 28" stroke="#2a6f97" stroke-width="3"/><path d="M232 60 L290 28" stroke="#2a6f97" stroke-width="3"/><path d="M144 150 L90 192" stroke="#b4572b" stroke-width="3"/><path d="M236 150 L290 192" stroke="#b4572b" stroke-width="3"/><circle cx="104" cy="38" r="10" fill="#fff1d6" stroke="#2a6f97"/>' +
  _tx(190, 18, "Dorsal") + _tx(190, 214, "Ventral") + _tx(104, 24, "Dorsal root ganglion", "start") + _tx(70, 160, "Ventral root", "end") + _tx(190, 134, "Grey matter (H)") + _tx(300, 112, "White matter", "start"),
  "Cross-section of the spinal cord and formation of a spinal nerve");
DIA.digh = _flow(["Mouth|(teeth, tongue)", "Oesophagus", "Stomach|(small, no vomiting)", "Small intestine|(duodenum, jejunum, ileum)", "Caecum|(fermentation)", "Large colon|(pelvic flexure)", "Small colon|(faecal balls)", "Rectum and anus"], 4, "Path of feed in the horse (hindgut fermenter)");
DIA.resp = _flow(["Nostrils", "Nasal cavity|(turbinates)", "Pharynx", "Larynx", "Trachea|(C-shaped rings)", "Bronchi", "Bronchioles", "Alveoli|(gas exchange)"], 4, "Path of air to the alveoli", [MINT, MINT, MINT, CREAM, MINT, MINT, MINT, RED]);
DIA.urine = _flow(["Renal corpuscle|(filters blood)", "Proximal tubule", "Loop of Henle", "Distal tubule", "Collecting duct", "Renal pelvis", "Ureter", "Bladder", "Urethra"], 5, "Nephron and urine flow", [RED, MINT, MINT, MINT, MINT, CREAM, CREAM, CREAM, CREAM]);
DIA.male = _flow(["Seminiferous|tubules (sperm made)", "Epididymis|(stored, matured)", "Ductus deferens|(inguinal canal)", "Pelvic urethra|+ accessory glands", "Penis|(delivery)"], 5, "Path of sperm in the male tract", [CREAM, MINT, MINT, LILAC, MINT]);
DIA.female = _flow(["Ovary|(ovulation)", "Infundibulum", "Ampulla|(fertilisation)", "Isthmus", "Uterine horn", "Uterine body", "Cervix", "Vagina", "Vestibule, vulva"], 5, "Path of the ovum and the birth canal in the female", [CREAM, MINT, RED, MINT, MINT, MINT, LILAC, MINT, MINT]);
DIA.abwall = _flow(["Skin", "Superficial fascia", "External oblique", "Internal oblique", "Transversus|abdominis", "Peritoneum"], 3, "Layers met going into the abdomen through the flank (from outside to inside)", [MINT, MINT, CREAM, CREAM, CREAM, LILAC]);
DIA.germ = _tree("Zygote → three germ layers", ["Ectoderm|skin, hair, nervous|system, sense organs", "Mesoderm|muscle, bone, blood,|heart, kidney, gonads", "Endoderm|gut lining, lungs,|liver, pancreas"], "Germ layers and their main derivatives", [BLUE, RED, MINT]);
DIA.gamet = _flow(["Spermatogonium", "Primary|spermatocyte", "2 secondary|spermatocytes", "4 spermatids", "4 sperm|(after spermiogenesis)"], 3, "Spermatogenesis (male)", [MINT, MINT, MINT, MINT, CREAM]) + _flow(["Oogonium", "Primary oocyte|(stops in prophase I)", "Secondary oocyte|+ first polar body|(stops in metaphase II)", "Ovum, after sperm|entry, + polar bodies"], 2, "Oogenesis (female)", [MINT, MINT, MINT, CREAM]);
DIA.placenta = _tree("Placenta (by shape)", ["Diffuse|horse, pig", "Cotyledonary|cattle, sheep, goat", "Zonary|dog, cat", "Discoid|primates, rodents"], "Types of placenta by shape", [MINT, CREAM, BLUE, LILAC]);
DIA.membranes = _svg(420, 210,
  '<ellipse cx="210" cy="105" rx="195" ry="92" fill="#fbeedd" stroke="#1f4d3a" stroke-width="2"/><ellipse cx="190" cy="105" rx="150" ry="70" fill="#e8f4fb" stroke="#2a6f97" stroke-width="1.5"/><ellipse cx="170" cy="105" rx="95" ry="48" fill="#fff" stroke="#7a5ea8" stroke-width="1.5"/><ellipse cx="160" cy="105" rx="44" ry="26" fill="#f6c7c7" stroke="#b44"/>' +
  _tx(160, 109, "Fetus") + _tx(160, 70, "Amnion + fluid") + _tx(200, 44, "Allantois (urine)") + _tx(240, 22, "Chorion (outer)") + _tx(340, 150, "Yolk sac", "start") + _tx(340, 106, "Uterine wall / placenta", "start"),
  "Fetal membranes of a mammal");
DIA.gutwall = _svg(420, 190,
  '<rect x="30" y="20" width="360" height="30" fill="#f6e3e3" stroke="#1f4d3a"/><rect x="30" y="50" width="360" height="30" fill="#e8f4fb" stroke="#1f4d3a"/><rect x="30" y="80" width="360" height="30" fill="#e3f1e8" stroke="#1f4d3a"/><rect x="30" y="110" width="360" height="30" fill="#fff1d6" stroke="#1f4d3a"/><rect x="30" y="140" width="360" height="22" fill="#efe5fa" stroke="#1f4d3a"/>' +
  _tx(210, 40, "Mucosa (epithelium + lamina propria)") + _tx(210, 70, "Submucosa (vessels, glands, nerves)") + _tx(210, 100, "Muscularis externa: inner circular layer") + _tx(210, 130, "Muscularis externa: outer longitudinal layer") + _tx(210, 156, "Serosa or adventitia") + _tx(210, 182, "Wall of a tubular digestive organ, lumen at the top"),
  "Layers of the digestive tube");
DIA.process = _flow(["Fixation|(formalin)", "Dehydration|(graded alcohol)", "Clearing|(xylene)", "Embedding|(paraffin wax)", "Sectioning|(microtome)", "Staining|(H and E)", "Mounting|(coverslip)"], 4, "Steps of tissue processing for histology");
DIA.skin = _svg(400, 200,
  '<rect x="40" y="20" width="320" height="26" fill="#f6e3e3" stroke="#1f4d3a"/><rect x="40" y="46" width="320" height="64" fill="#fdf1e3" stroke="#1f4d3a"/><rect x="40" y="110" width="320" height="64" fill="#fffaf0" stroke="#1f4d3a"/><path d="M200 8 V90 q0 12 8 12 h-16 q8 0 8-12" fill="none" stroke="#6b4e2e" stroke-width="3"/><ellipse cx="260" cy="80" rx="14" ry="10" fill="#e8d28a" stroke="#1f4d3a"/><circle cx="130" cy="86" r="9" fill="#cfe3f5" stroke="#1f4d3a"/>' +
  _tx(20, 38, "Epidermis", "start") + _tx(20, 82, "Dermis", "start") + _tx(20, 142, "Hypodermis", "start") + _tx(282, 83, "Sebaceous gland", "start") + _tx(130, 106, "Sweat gland") + _tx(205, 128, "Hair follicle", "start"),
  "Layers of the skin");
DIA.junctions = _svg(440, 190,
  '<rect x="20" y="20" width="400" height="60" fill="#e3f1e8" stroke="#1f4d3a"/><rect x="20" y="104" width="400" height="60" fill="#e3f1e8" stroke="#1f4d3a"/><line x1="20" y1="84" x2="420" y2="84" stroke="#1f4d3a"/>' +
  '<rect x="60" y="78" width="40" height="12" fill="#b4572b"/><rect x="150" y="78" width="30" height="12" fill="#2a6f97"/><rect x="230" y="76" width="30" height="16" fill="#7a5ea8"/><rect x="310" y="80" width="30" height="8" fill="#8a8a2a"/>' +
  _tx(80, 66, "Tight") + _tx(165, 66, "Adherens") + _tx(245, 66, "Desmosome") + _tx(325, 66, "Gap") + _tx(220, 182, "Two neighbouring epithelial cells and the junctions between them"),
  "Cell junctions");
DIA.thorax = _svg(420, 220,
  '<ellipse cx="210" cy="108" rx="190" ry="96" fill="#fff" stroke="#1f4d3a" stroke-width="2"/><ellipse cx="120" cy="108" rx="80" ry="78" fill="#e3f1e8" stroke="#1f4d3a"/><ellipse cx="300" cy="108" rx="80" ry="78" fill="#e3f1e8" stroke="#1f4d3a"/><ellipse cx="210" cy="125" rx="30" ry="36" fill="#f6c7c7" stroke="#b44"/><rect x="198" y="40" width="24" height="26" rx="8" fill="#fff1d6" stroke="#1f4d3a"/><rect x="198" y="70" width="24" height="16" rx="6" fill="#d5e6f7" stroke="#1f4d3a"/>' +
  _tx(120, 112, "Right lung") + _tx(300, 112, "Left lung") + _tx(210, 128, "Heart") + _tx(210, 32, "Trachea / oesophagus") + _tx(210, 210, "Mediastinum lies between the two pleural sacs"),
  "Cross-section of the thorax (schematic)");
DIA.kidneydev = _flow(["Pronephros|(not functional)", "Mesonephros|(temporary)", "Metanephros|(permanent kidney)"], 3, "Three kidney stages in embryonic development", [LILAC, CREAM, MINT]);
DIA.genitaldev = _tree("Indifferent gonad (both duct systems present)", ["Male: SRY → testis|Wolffian duct stays:|epididymis, ductus deferens|Müllerian duct regresses", "Female: no SRY → ovary|Müllerian duct stays:|oviduct, uterus, cervix|Wolffian duct regresses"], "Development of the genital system", [BLUE, RED]);
DIA.lightpath = _flow(["Cornea", "Aqueous humour", "Pupil (iris)", "Lens", "Vitreous body", "Retina|(rods, cones)", "Optic nerve", "Brain|(visual cortex)"], 4, "Path of light and visual signal", [MINT, MINT, MINT, MINT, MINT, CREAM, LILAC, LILAC]);
DIA.endoc = _flow(["Hypothalamus|(releasing hormones)", "Anterior pituitary|(trophic hormones)", "Target gland|(thyroid, adrenal, gonad)", "Hormone in blood", "Negative feedback|to hypothalamus"], 5, "Hypothalamus-pituitary-gland axis with feedback", [LILAC, CREAM, MINT, RED, LILAC]);
DIA.lymph = _flow(["Tissue fluid", "Lymph capillaries", "Lymph vessels|(valves)", "Lymph nodes|(filter)", "Thoracic duct|(from cisterna chyli)", "Large vein|(cranial vena cava)"], 3, "Flow of lymph back to the blood", [MINT, MINT, MINT, CREAM, MINT, BLUE]);
DIA.bloodtree = _tree("Blood cells", ["Red cells|(erythrocytes)", "Neutrophil|eosinophil|basophil", "Lymphocyte|monocyte", "Platelets|(thrombocytes)"], "Types of blood cells (red cells; granulocytes; agranulocytes; platelets)", [RED, MINT, BLUE, CREAM]);
DIA.tissues = _tree("Basic tissues", ["Epithelial|covers, lines, secretes", "Connective|supports, binds|(bone, blood)", "Muscular|contracts", "Nervous|conducts signals"], "The four basic tissues", [MINT, CREAM, RED, LILAC]);
DIA.forechain = _flow(["Scapula", "Humerus", "Radius + ulna", "Carpus|(ox: 6 bones)", "Metacarpus|(cannon bone)", "Phalanges|+ sesamoids"], 3, "Bones of the fore limb from trunk to foot (ox)");
DIA.hindchain = _flow(["Pelvis|(ilium, ischium, pubis)", "Femur", "Patella|+ tibia, fibula", "Tarsus|(ox: 5 bones)", "Metatarsus|(cannon bone)", "Phalanges|+ sesamoids"], 3, "Bones of the pelvis and hind limb from trunk to foot (ox)");
DIA.plexus = _flow(["Ventral branches|C6, C7, C8, T1, T2", "Brachial plexus", "Suprascapular,|axillary", "Musculocutaneous", "Radial", "Median and ulnar"], 3, "Brachial plexus and its main nerves (check root levels for your species in your textbook)", [LILAC, CREAM, MINT, MINT, MINT, MINT]);
DIA.oxsides = _svg(440, 210,
  '<rect x="10" y="10" width="200" height="170" rx="12" fill="#f4faf6" stroke="#1f4d3a" stroke-width="1.5"/><rect x="230" y="10" width="200" height="170" rx="12" fill="#faf6ee" stroke="#1f4d3a" stroke-width="1.5"/>' +
  _tx(110, 30, "LEFT side (ox)") + _tx(330, 30, "RIGHT side (ox)") +
  _tx(110, 60, "Rumen (most of the side)") + _tx(110, 82, "Spleen (on the rumen)") + _tx(110, 104, "Reticulum (cranial, at diaphragm)") + _tx(110, 126, "Left kidney (displaced to the right)") + _tx(110, 148, "Heart (3rd to 5th ribs)") +
  _tx(330, 60, "Liver (under the ribs)") + _tx(330, 82, "Omasum, abomasum") + _tx(330, 104, "Intestines, caecum (flank)") + _tx(330, 126, "Right kidney") + _tx(330, 148, "Right lung, diaphragm") +
  _tx(220, 200, "Approximate positions; verify against your textbook"),
  "Topography of the ox viscera (schematic)");
DIA.xray = _flow(["X-ray beam", "Passes through the body", "Absorbed more by|dense tissue", "Detector or film", "Image: bone white,|air black,|soft tissue grey"], 5, "How a radiograph is formed", [CREAM, MINT, MINT, MINT, LILAC]);
DIA.hoofparts = _svg(400, 210,
  '<path d="M90 30 H310 L350 170 H50 Z" fill="#f4ead4" stroke="#1f4d3a" stroke-width="2"/><path d="M110 40 H290 L322 150 H78 Z" fill="#e7cfa1" stroke="#1f4d3a"/><path d="M190 100 L225 150 H155 Z" fill="#d9a46a" stroke="#1f4d3a"/><rect x="170" y="62" width="60" height="30" rx="8" fill="#fff" stroke="#7a5ea8"/>' +
  _tx(200, 22, "Coronary band (horn growth)") + _tx(200, 82, "Coffin bone") + _tx(200, 140, "Frog") + _tx(36, 110, "Wall", "end") + _tx(366, 130, "Sole", "start") + _tx(200, 198, "Sole view and section combined (schematic)"),
  "Parts of the equine hoof");

/* ===== DIAGRAM LIBRARY 3: callout-style drawings and flow versions of the older diagrams (these override earlier definitions) ===== */
const _pt = (cx, cy, rx, ry, deg) => { const t = deg * Math.PI / 180; return [Math.round(cx + rx * Math.cos(t)), Math.round(cy + ry * Math.sin(t))]; };
const _txl = (x, y, t, a) => String(t).split("|").map((s, i) => '<text x="' + x + '" y="' + (y + i * 13) + '" font-size="12" fill="#17352a" text-anchor="' + a + '">' + s + "</text>").join("");
const _call = (side, ly, text, tx, ty) => {
  const n = String(text).split("|").length, y0 = ly - (n - 1) * 6.5 + 4;
  return side === "L" ? _ldr(tx, ty, 136, ly) + _txl(130, y0, text, "end") : _ldr(tx, ty, 384, ly) + _txl(390, y0, text, "start");
};
const _ell = (cx, cy, rx, ry, f, s, extra) => '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" stroke="' + (s || "#1f4d3a") + '" stroke-width="1.5"' + (extra || "") + "/>";

DIA.planes = _svg(520, 240,
  _ell(260, 120, 110, 45, "#e3f1e8") +
  '<line x1="260" y1="62" x2="260" y2="178" stroke="#b4572b" stroke-width="2" stroke-dasharray="5 4"/>' +
  '<line x1="140" y1="120" x2="380" y2="120" stroke="#2a6f97" stroke-width="2" stroke-dasharray="5 4"/>' +
  '<line x1="200" y1="70" x2="200" y2="172" stroke="#7a5ea8" stroke-width="2" stroke-dasharray="5 4"/>' +
  _lab(158, 112, "cranial") + _lab(362, 112, "caudal", "end") + _lab(272, 100, "dorsal") + _lab(272, 142, "ventral") +
  _call("L", 36, "Median (sagittal)|plane", 260, 66) + _call("R", 120, "Dorsal plane|(dorsal / ventral)", 380, 120) + _call("L", 205, "Transverse plane", 200, 168),
  "Body planes and directions in a quadruped");
DIA.homeo = _flow(["Set point|(normal range)", "Sensor detects|a change", "Control centre|compares", "Effector acts", "Response pushes the|variable back"], 3, "Negative feedback loop", [CREAM, MINT, BLUE, RED, MINT], true);
DIA.adme = _flow(["Absorption|gut, muscle, skin", "Distribution|blood to tissues", "Metabolism|mostly liver", "Excretion|kidney, bile, milk"], 2, "Pharmacokinetics: ADME", [MINT, BLUE, CREAM, RED]);
DIA.gram = _tree("Bacterial cell wall and Gram staining", ["Gram positive|thick peptidoglycan|keeps crystal violet:|looks purple", "Gram negative|thin peptidoglycan plus|outer membrane:|looks pink (counterstain)"], "Gram-positive and Gram-negative cell walls", [LILAC, RED]);
DIA.rumen = _flow(["Oesophagus", "Rumen + reticulum|(fermentation, cud)", "Omasum|(water absorbed)", "Abomasum|(true stomach)", "Small intestine"], 3, "Path of feed through the ruminant stomach (cud goes back to the mouth for chewing)", [MINT, MINT, MINT, CREAM, MINT]);
DIA.lifecycle = _flow(["Adult worms|in the host", "Eggs passed|in faeces", "Larvae develop|on pasture", "Infective larva|eaten", "Larva migrates|and matures"], 3, "Generalised direct nematode life cycle", [RED, CREAM, MINT, CREAM, MINT], true);
DIA.inflam = _flow(["Injury", "Vasodilation|(redness, heat)", "Fluid leaks out|(swelling, pain)", "Neutrophils arrive", "Healing, or chronic|inflammation"], 3, "Sequence of acute inflammation", [RED, CREAM, CREAM, MINT, BLUE]);
DIA.synapse = _flow(["Action potential|reaches nerve ending", "Calcium enters,|vesicles release|transmitter", "Transmitter crosses|the cleft", "Binds receptors on|next cell", "Response; transmitter|removed or recycled"], 3, "Chemical synapse", [LILAC, CREAM, MINT, MINT, BLUE]);
DIA.oviduct = _flow(["Ovary|(ovum released)", "Infundibulum|(fertilisation)", "Magnum|(albumen)", "Isthmus|(shell membranes)", "Shell gland|(shell)", "Vagina, cloaca|(egg laid)"], 3, "Egg formation in the hen", [CREAM, MINT, MINT, MINT, CREAM, BLUE]);

DIA.bone = _svg(520, 250,
  _ell(260, 45, 40, 26, "#f4ead4") + _ell(260, 215, 40, 26, "#f4ead4") +
  '<rect x="232" y="70" width="56" height="120" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/><rect x="246" y="80" width="28" height="100" fill="#fff6dd" stroke="#1f4d3a" stroke-dasharray="4 3"/>' +
  '<line x1="232" y1="72" x2="288" y2="72" stroke="#b4572b" stroke-width="2"/><line x1="232" y1="188" x2="288" y2="188" stroke="#b4572b" stroke-width="2"/><path d="M226 38 Q260 8 294 38" fill="none" stroke="#2a6f97" stroke-width="4"/>' +
  _call("L", 40, "Epiphysis|(end of bone)", 222, 45) + _call("L", 130, "Diaphysis|(shaft)", 232, 130) + _call("L", 215, "Epiphysis", 222, 215) +
  _call("R", 30, "Articular cartilage", 292, 28) + _call("R", 90, "Growth plate (physis)|in a young animal", 286, 72) + _call("R", 140, "Marrow cavity", 262, 130) + _call("R", 185, "Compact bone|(wall of the shaft)", 284, 160),
  "Parts of a long bone");
DIA.tooth = _svg(520, 250,
  '<path d="M225 50 Q225 24 260 24 Q295 24 295 50 V110 H225 Z" fill="#fffaf0" stroke="#6a8fa0" stroke-width="3.5"/><path d="M234 52 Q234 36 260 36 Q286 36 286 52 V110 H234 Z" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1"/>' +
  '<path d="M225 110 H295 L282 220 H238 Z" fill="#f4ead4" stroke="#b4572b" stroke-width="2.5"/><path d="M246 60 Q260 50 274 60 V110 L268 210 H252 L246 110 Z" fill="#f6c7c7" stroke="#b44"/>' +
  '<line x1="150" y1="110" x2="225" y2="110" stroke="#c88" stroke-width="2" stroke-dasharray="4 3"/><line x1="295" y1="110" x2="370" y2="110" stroke="#c88" stroke-width="2" stroke-dasharray="4 3"/>' +
  _call("L", 40, "Enamel|(hardest, outer crown)", 227, 45) + _call("L", 95, "Dentine", 238, 90) + _call("L", 190, "Cement|(covers the root)", 241, 190) +
  _call("R", 40, "Crown|(above the gum)", 290, 60) + _call("R", 110, "Gum line|(gingiva)", 340, 110) + _call("R", 150, "Pulp cavity|(vessels, nerves)", 262, 150) + _call("R", 205, "Root", 286, 190),
  "Parts of a tooth (shapes differ between species)");
DIA.synovial = _svg(520, 250,
  '<rect x="200" y="10" width="120" height="62" rx="10" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/><rect x="200" y="178" width="120" height="62" rx="10" fill="#f4ead4" stroke="#1f4d3a" stroke-width="1.5"/>' +
  '<rect x="200" y="72" width="120" height="10" fill="#9ec9d9"/><rect x="200" y="168" width="120" height="10" fill="#9ec9d9"/><rect x="200" y="82" width="120" height="86" fill="#e8f4fb"/>' +
  '<path d="M190 55 V195 M330 55 V195" stroke="#b4572b" stroke-width="5" fill="none"/><path d="M198 82 V168 M322 82 V168" stroke="#2a6f97" stroke-width="3" fill="none"/>' +
  _call("L", 40, "Bone end", 200, 40) + _call("L", 100, "Fibrous capsule|(outer layer)", 190, 110) + _call("L", 150, "Synovial membrane|(makes the fluid)", 198, 140) + _call("L", 215, "Bone end", 200, 215) +
  _call("R", 77, "Articular cartilage", 318, 77) + _call("R", 125, "Joint cavity with|synovial fluid", 270, 125) + _call("R", 173, "Articular cartilage", 318, 173),
  "A synovial (diarthrodial) joint, in section");
(function () {
  const C = [215, 125], P = (rx, ry, d) => _pt(C[0], C[1], rx, ry, d);
  const a = P(142, 93, -60), b = P(127, 78, -35), c = P(112, 64, 0), d = P(120, 72, 30), e = P(104, 56, 55);
  DIA.meninges = _svg(560, 250,
    _ell(215, 125, 150, 100, "#f4ead4") + _ell(215, 125, 135, 86, "#cfd8dc") + _ell(215, 125, 120, 72, "#cfe8f5", "#1f4d3a", ' stroke-dasharray="5 3"') + _ell(215, 125, 104, 56, "#f6c7c7", "#b44") +
    _lab(215, 129, "Brain or cord", "middle") +
    _call("R", 28, "Skull or vertebra", a[0], a[1]) + _call("R", 70, "Dura mater|(tough)", b[0], b[1]) + _call("R", 125, "Subarachnoid space|(holds CSF)", c[0], c[1]) + _call("R", 172, "Arachnoid mater|(web-like)", d[0], d[1]) + _call("R", 215, "Pia mater|(on the surface)", e[0], e[1]),
    "Meninges from outside inward: dura mater, arachnoid mater, subarachnoid space with CSF, pia mater");
})();
DIA.cord = _svg(520, 250,
  _ell(260, 125, 80, 80, "#f3f3ee") +
  '<g stroke="#c9bfe3" stroke-linecap="round" fill="none"><path d="M260 125 L232 75 M260 125 L288 75" stroke-width="12"/><path d="M260 125 L225 170 M260 125 L295 170" stroke-width="22"/></g>' + _ell(260, 125, 24, 16, "#c9bfe3", "#c9bfe3") +
  '<circle cx="260" cy="125" r="5" fill="#fff" stroke="#7a5ea8"/>' +
  '<path d="M232 75 L150 35 M288 75 L370 35" stroke="#2a6f97" stroke-width="3" fill="none"/><path d="M225 170 L150 205 M295 170 L370 205" stroke="#b4572b" stroke-width="3" fill="none"/>' +
  _ell(182, 51, 10, 8, "#fff1d6", "#2a6f97") + _ell(338, 51, 10, 8, "#fff1d6", "#2a6f97") +
  _lab(260, 18, "Dorsal", "middle") + _lab(260, 244, "Ventral", "middle") +
  _call("L", 36, "Dorsal root ganglion|(cell bodies)", 176, 48) + _call("L", 92, "Dorsal root|(sensory in)", 210, 63) + _call("L", 125, "Central canal", 255, 125) + _call("L", 210, "Ventral root|(motor out)", 192, 187) +
  _call("R", 100, "White matter|(tracts, outside)", 330, 100) + _call("R", 150, "Grey matter|(cell bodies, H-shape)", 280, 135),
  "Cross-section of the spinal cord with a spinal nerve forming");
(function () {
  const P = (rx, ry, d) => _pt(200, 120, rx, ry, d);
  const a = P(160, 96, -55), b = P(124, 70, -25), c = P(70, 36, 10), d = P(160, 96, 40);
  DIA.membranes = _svg(560, 240,
    _ell(200, 120, 170, 100, "#fbeedd") + _ell(200, 120, 148, 78, "#e3f1e8") + _ell(200, 120, 100, 52, "#e8f4fb", "#2a6f97") + _ell(200, 120, 50, 26, "#f6c7c7", "#b44") +
    _lab(200, 124, "Fetus", "middle") +
    _call("R", 30, "Chorion|(outermost, meets uterus)", a[0], a[1]) + _call("R", 75, "Allantois|(urine, fluid)", b[0], b[1]) + _call("R", 130, "Amnion + amniotic fluid|(cushion)", c[0], c[1]) + _call("R", 190, "Placenta = chorion|+ uterine wall", d[0], d[1]),
    "Fetal membranes of a mammal (simplified; the yolk sac is not drawn)");
})();
DIA.skin = _svg(520, 240,
  '<rect x="160" y="30" width="240" height="24" fill="#f6e3e3" stroke="#1f4d3a"/><rect x="160" y="54" width="240" height="70" fill="#fdf1e3" stroke="#1f4d3a"/><rect x="160" y="124" width="240" height="70" fill="#fffaf0" stroke="#1f4d3a"/>' +
  '<path d="M290 12 V100 q0 12 10 12 h-20 q10 0 10-12" fill="none" stroke="#6b4e2e" stroke-width="3"/>' + _ell(322, 80, 14, 9, "#e8d28a") + _ell(225, 100, 11, 11, "#cfe3f5") +
  _call("L", 42, "Epidermis", 170, 42) + _call("L", 85, "Dermis", 170, 85) + _call("L", 110, "Sweat gland", 216, 103) + _call("L", 160, "Hypodermis|(fat, loose tissue)", 170, 160) +
  _call("R", 24, "Hair shaft", 291, 22) + _call("R", 70, "Sebaceous gland|(oil)", 335, 78) + _call("R", 120, "Hair follicle", 293, 104),
  "Layers of the skin");
DIA.junctions = _svg(540, 250,
  '<rect x="130" y="24" width="122" height="196" rx="10" fill="#e3f1e8" stroke="#1f4d3a"/><rect x="270" y="24" width="122" height="196" rx="10" fill="#e3f1e8" stroke="#1f4d3a"/>' +
  '<rect x="248" y="40" width="26" height="12" fill="#b4572b"/><rect x="248" y="82" width="26" height="12" fill="#2a6f97"/><rect x="248" y="124" width="26" height="12" fill="#7a5ea8"/><rect x="248" y="166" width="26" height="12" fill="#8a8a2a"/>' +
  _lab(191, 130, "Cell 1", "middle") + _lab(331, 100, "Cell 2", "middle") + _lab(260, 14, "Lumen side (apical)", "middle") + _lab(260, 242, "Basal side", "middle") +
  '<line x1="274" y1="46" x2="404" y2="46" stroke="#555"/><line x1="274" y1="88" x2="404" y2="88" stroke="#555"/><line x1="274" y1="130" x2="404" y2="130" stroke="#555"/><line x1="274" y1="172" x2="404" y2="172" stroke="#555"/>' +
  _txl(410, 43, "Tight junction|(seals the gap)", "start") + _txl(410, 85, "Adherens junction|(anchors actin)", "start") + _txl(410, 127, "Desmosome|(strong spot weld)", "start") + _txl(410, 169, "Gap junction|(small molecules pass)", "start"),
  "Cell junctions between two neighbouring epithelial cells");
DIA.thorax = _svg(520, 240,
  _ell(230, 120, 150, 100, "#fff") + _ell(165, 120, 62, 70, "#e3f1e8") + _ell(295, 120, 62, 70, "#e3f1e8") + _ell(230, 145, 28, 36, "#f6c7c7", "#b44") +
  '<rect x="218" y="38" width="24" height="26" rx="8" fill="#fff1d6" stroke="#1f4d3a"/><rect x="218" y="68" width="24" height="14" rx="6" fill="#d5e6f7" stroke="#1f4d3a"/>' +
  _lab(165, 124, "Lung", "middle") + _lab(295, 124, "Lung", "middle") + _lab(230, 149, "Heart", "middle") +
  _call("L", 40, "Rib wall|(thoracic cage)", 110, 68) + _call("L", 200, "Mediastinum:|space between the|pleural sacs", 215, 165) + _call("R", 40, "Trachea", 242, 50) + _call("R", 90, "Oesophagus", 242, 75),
  "Cross-section of the thorax (the lungs sit in separate pleural sacs)");
DIA.hoofparts = _svg(520, 250,
  '<path d="M200 50 H320 L390 190 H150 Z" fill="#e7cfa1" stroke="#1f4d3a" stroke-width="2"/><path d="M225 70 H300 L345 160 H195 Z" fill="#fff" stroke="#7a5ea8" stroke-width="1.5"/><path d="M290 190 L350 190 L335 168 Z" fill="#d9a46a" stroke="#1f4d3a"/>' +
  '<path d="M196 52 Q260 36 324 52" fill="none" stroke="#b4572b" stroke-width="5"/>' +
  _call("L", 40, "Coronary band|(horn grows from here)", 230, 46) + _call("L", 120, "Hoof wall|(horn)", 188, 120) + _call("L", 185, "Sole", 200, 188) +
  _call("R", 100, "Coffin bone|(distal phalanx)", 300, 100) + _call("R", 170, "Frog|(wedge in the sole,|horse)", 330, 180),
  "Parts of the hoof (side section)");
DIA.eye = _svg(560, 250,
  _ell(270, 115, 110, 85, "#fff") + '<path d="M165 75 Q132 115 165 155" fill="#dbeaf5" stroke="#2a6f97" stroke-width="3"/>' +
  '<path d="M260 32 A110 85 0 1 1 260 198" fill="none" stroke="#7a5ea8" stroke-width="4"/>' + _ell(205, 115, 14, 30, "#e8f4fb", "#2a6f97") +
  '<path d="M186 78 V100 M186 130 V152" stroke="#8a5a2a" stroke-width="6"/><path d="M378 125 H435" stroke="#c9b26a" stroke-width="12"/>' +
  _call("L", 45, "Cornea|(clear front window)", 146, 105) + _call("L", 90, "Iris (pupil = the gap)", 186, 86) + _call("L", 150, "Aqueous humour|(front chamber)", 172, 118) + _call("L", 205, "Lens", 198, 140) +
  _call("R", 40, "Retina|(rods and cones)", 348, 55) + _call("R", 92, "Vitreous body|(jelly)", 300, 115) + _call("R", 160, "Optic nerve", 420, 125) + _call("R", 205, "Sclera|(white outer coat)", 325, 189),
  "Parts of the eye (horizontal section)");
/* ================= GLOSSARY =================
   Format: "Term|subjectId|meaning"  (add as many as you like) */
const GLOSS_RAW = [
/* anatomy */
"Abduction|anat|Movement of a limb away from the median plane.",
"Adduction|anat|Movement of a limb towards the median plane.",
"Abomasum|anat|Fourth compartment of the ruminant stomach. It is the glandular 'true stomach' that secretes acid and pepsin.",
"Appendicular skeleton|anat|The bones of the limbs and their girdles.",
"Axial skeleton|anat|Skull, vertebral column, ribs and sternum.",
"Caudal|anat|Towards the tail.",
"Cranial|anat|Towards the head.",
"Diaphysis|anat|Shaft of a long bone.",
"Distal|anat|Farther from the body or point of attachment, for example towards the foot on a limb.",
"Dorsal|anat|Towards the back.",
"Epiphysis|anat|End of a long bone.",
"Fascia|anat|Sheet of connective tissue that wraps muscles and organs.",
"Flexion|anat|Bending of a joint so that the angle between bones decreases.",
"Extension|anat|Straightening of a joint so that the angle increases.",
"Histology|anat|Study of tissues under the microscope.",
"Intercalated disc|anat|Junction between cardiac muscle cells that lets impulses pass rapidly.",
"Lateral|anat|Away from the median plane.",
"Ligament|anat|Dense fibrous band connecting bone to bone.",
"Medial|anat|Towards the median plane.",
"Median plane|anat|Plane through the midline dividing the body into equal right and left halves.",
"Meniscus|anat|Fibrocartilage pad in the stifle joint that absorbs shock.",
"Meninges|anat|The three membranes covering the brain and spinal cord: dura, arachnoid and pia mater.",
"Omasum|anat|Third compartment of the ruminant stomach with leaf-like laminae; absorbs water.",
"Os cordis|anat|Splanchnic bone in the heart region of cattle.",
"Palmar|anat|Back surface of the forefoot below the carpus.",
"Periosteum|anat|Fibrous membrane covering the outside of a bone.",
"Physis|anat|Growth plate between diaphysis and epiphysis in young animals.",
"Plantar|anat|Back surface of the hindfoot below the tarsus.",
"Proximal|anat|Nearer to the body or point of attachment.",
"Reticulum|anat|Second ruminant stomach compartment with a honeycomb lining, lying against the diaphragm.",
"Rostral|anat|Towards the nose, used on the head.",
"Rumen|anat|Largest ruminant stomach compartment where microbes ferment feed.",
"Sagittal plane|anat|Plane parallel to the median plane.",
"Sesamoid bone|anat|Bone that develops within a tendon, for example the patella.",
"Splanchnic skeleton|anat|Bones that develop in soft organs, for example os penis in the dog.",
"Synovial fluid|anat|Lubricating fluid inside synovial joints.",
"Tendon|anat|Dense fibrous cord connecting muscle to bone.",
"Transverse plane|anat|Plane cutting across the long axis at right angles.",
"Ventral|anat|Towards the belly.",
"Placentome|anat|Union of maternal caruncle and foetal cotyledon in ruminants.",
"Caruncle|anat|Maternal side of a ruminant placentome, in the uterine wall.",
"Mediastinum|anat|Space between the two pleural sacs containing heart, trachea and oesophagus.",
/* physiology */
"Albumin|phys|Most abundant plasma protein; maintains oncotic pressure and carries substances.",
"Aldosterone|phys|Adrenal cortex hormone that increases sodium reabsorption and potassium excretion.",
"Baroreceptor|phys|Pressure sensor in carotid sinus and aortic arch that helps control blood pressure.",
"Bohr effect|phys|Fall in haemoglobin oxygen affinity when CO2 and acidity rise.",
"Cardiac output|phys|Volume pumped by each ventricle per minute (heart rate x stroke volume).",
"Diastole|phys|Relaxation and filling phase of the cardiac cycle.",
"Systole|phys|Contraction and ejection phase of the cardiac cycle.",
"Erythropoietin|phys|Kidney hormone that stimulates red blood cell production.",
"Erythrocyte|phys|Red blood cell; carries oxygen using haemoglobin.",
"Eructation|phys|Belching of fermentation gases from the rumen.",
"Fibrinogen|phys|Plasma protein converted to fibrin during clotting.",
"Frank-Starling law|phys|The more the ventricle fills, the stronger it contracts, within limits.",
"Haemoglobin|phys|Iron-containing protein of red cells that carries oxygen.",
"Haemopoiesis|phys|Formation of blood cells, mainly in red bone marrow in adults.",
"Homeostasis|phys|Maintenance of a relatively stable internal environment.",
"Interstitial fluid|phys|Fluid in the spaces between cells.",
"Leucocyte|phys|White blood cell, involved in defence.",
"Milieu interieur|phys|Internal environment; the extracellular fluid (Claude Bernard).",
"Negative feedback|phys|Response that opposes the original change and keeps a variable stable.",
"Positive feedback|phys|Response that strengthens the original change until an end point is reached.",
"Osmosis|phys|Movement of water across a semipermeable membrane towards higher solute concentration.",
"Packed cell volume (PCV)|phys|Percentage of blood volume occupied by red cells.",
"Platelet|phys|Cell fragment that takes part in clotting (thrombocyte in birds).",
"Pyrogen|phys|Substance that raises the hypothalamic temperature set point and causes fever.",
"Rumination|phys|Regurgitation, rechewing and reswallowing of cud.",
"Serum|phys|Fluid left after blood clots; plasma without clotting factors.",
"Set point|phys|Normal target value of a controlled variable.",
"Surfactant|phys|Lipoprotein from type II alveolar cells that lowers surface tension in alveoli.",
"Tidal volume|phys|Volume of air in one normal breath.",
"Volatile fatty acids (VFA)|phys|Acetate, propionate and butyrate, end products of rumen fermentation.",
"Antidiuretic hormone (ADH)|phys|Posterior pituitary hormone that increases water reabsorption in the collecting duct.",
"Glomerular filtration rate (GFR)|phys|Volume of filtrate formed by all nephrons per minute.",
"Oxytocin|phys|Hormone causing uterine contraction and milk let-down.",
"Insulin|phys|Pancreatic beta cell hormone that lowers blood glucose.",
"Parathyroid hormone (PTH)|phys|Hormone that raises blood calcium.",
"Action potential|phys|Rapid, short change in membrane potential that carries a nerve impulse.",
"Preload|phys|Stretch of the ventricle before it contracts.",
/* biochemistry */
"Active site|bioc|Region of an enzyme where the substrate binds.",
"Amino acid|bioc|Building block of proteins with an amino group, carboxyl group and side chain.",
"Anabolism|bioc|Building up of complex molecules using energy.",
"Apoenzyme|bioc|Protein part of an enzyme without its cofactor.",
"ATP|bioc|Adenosine triphosphate, the energy currency of the cell.",
"Beta oxidation|bioc|Breakdown of fatty acids to acetyl-CoA in mitochondria.",
"Buffer|bioc|Solution that resists change in pH.",
"Catabolism|bioc|Breakdown of complex molecules to release energy.",
"Chylomicron|bioc|Lipoprotein that carries dietary fat from the gut.",
"Cofactor|bioc|Non-protein helper of an enzyme, often a metal ion.",
"Coenzyme|bioc|Organic cofactor, often derived from a vitamin.",
"Denaturation|bioc|Loss of the native 3D structure of a protein without breaking peptide bonds.",
"Essential amino acid|bioc|Amino acid that must be supplied by the diet.",
"Gluconeogenesis|bioc|Formation of glucose from non-carbohydrate sources.",
"Glycogen|bioc|Branched glucose polymer stored in liver and muscle of animals.",
"Glycolysis|bioc|Breakdown of glucose to pyruvate in the cytoplasm, net 2 ATP.",
"Hydrolysis|bioc|Splitting of a bond by adding water.",
"Isoelectric point|bioc|pH at which an amino acid or protein has no net charge.",
"Ketone bodies|bioc|Acetoacetate, beta-hydroxybutyrate and acetone; fuel from fat breakdown.",
"Ketosis|bioc|Condition with raised ketone bodies when energy demand exceeds supply.",
"Km|bioc|Substrate concentration at which an enzyme works at half its maximum velocity.",
"Lipoprotein|bioc|Complex of lipid and protein that transports lipids in blood.",
"Metabolism|bioc|Sum of all chemical reactions in an organism.",
"Peptide bond|bioc|Covalent bond joining amino acids in a protein.",
"Reducing sugar|bioc|Sugar with a free aldehyde or ketone group, for example glucose and lactose.",
"TCA cycle|bioc|Krebs cycle in the mitochondrial matrix, oxidising acetyl-CoA to CO2.",
"Triglyceride|bioc|Glycerol esterified with three fatty acids.",
"Urea cycle|bioc|Liver pathway that converts toxic ammonia into urea.",
"Zymogen|bioc|Inactive enzyme precursor, for example pepsinogen.",
"Transamination|bioc|Transfer of an amino group from an amino acid to a keto acid.",
"Vitamin|bioc|Organic nutrient needed in small amounts that the body cannot make adequately.",
"Rickets|bioc|Poor mineralisation of bone in young animals, usually vitamin D deficiency.",
"Goitre|bioc|Enlargement of the thyroid gland, commonly from iodine deficiency.",
"Grass tetany|bioc|Low blood magnesium, often in lactating cows on lush pasture.",
/* pharmacology */
"Adverse effect|pharm|Harmful, unintended response to a drug.",
"Agonist|pharm|Drug that binds a receptor and activates it.",
"Antagonist|pharm|Drug that binds a receptor and blocks the action of an agonist.",
"Anthelmintic|pharm|Drug that kills or expels parasitic worms.",
"Bioavailability|pharm|Fraction of a dose that reaches the systemic circulation unchanged.",
"Biotransformation|pharm|Chemical alteration of a drug in the body, mainly in the liver.",
"Clearance|pharm|Volume of plasma cleared of a drug per unit time.",
"Contraindication|pharm|Condition in which a drug should not be used.",
"Efficacy|pharm|Ability of a drug to produce an effect once bound to its receptor.",
"Enteral|pharm|Given through the gastrointestinal tract.",
"First-pass effect|pharm|Metabolism of an oral drug in the liver before it reaches general circulation.",
"Half-life|pharm|Time for the plasma concentration of a drug to fall by half.",
"Parenteral|pharm|Given by injection, bypassing the gut.",
"Pharmacodynamics|pharm|What a drug does to the body.",
"Pharmacokinetics|pharm|What the body does to a drug: absorption, distribution, metabolism, excretion.",
"Pharmacopoeia|pharm|Official book of drug standards.",
"Potency|pharm|Amount of a drug needed to produce a given effect.",
"Tachyphylaxis|pharm|Rapid development of tolerance to a drug.",
"Therapeutic index|pharm|Ratio LD50/ED50, a measure of drug safety.",
"Volume of distribution|pharm|Apparent volume in which a drug is distributed.",
"Withdrawal period|pharm|Time after the last dose before milk, meat or eggs may be used for food.",
"Mycotoxin|pharm|Toxin produced by fungi growing on feed.",
"Antimicrobial resistance (AMR)|pharm|Ability of microbes to survive drugs that once killed them.",
"Organophosphate|pharm|Insecticide group that inhibits acetylcholinesterase.",
"Toxicology|pharm|Study of poisons and harmful effects of chemicals.",
/* microbiology */
"Adjuvant|micro|Substance added to a vaccine to enhance the immune response.",
"Antigen|micro|Substance that triggers an immune response.",
"Autoclave|micro|Steam sterilizer using pressure, typically 121 degrees C.",
"Bacteriophage|micro|Virus that infects bacteria.",
"Capsid|micro|Protein coat of a virus.",
"Colostrum|micro|First milk, rich in antibodies, vital for newborn immunity.",
"Conjugation|micro|Transfer of DNA between bacteria by direct contact via pili.",
"Disinfectant|micro|Chemical used to kill microbes on non-living surfaces.",
"Endotoxin|micro|Lipopolysaccharide in the outer membrane of Gram negative bacteria.",
"Exotoxin|micro|Toxin secreted by a bacterium, often protein, e.g. tetanus toxin.",
"Gram stain|micro|Staining method that divides bacteria into Gram positive and Gram negative.",
"Immunoglobulin|micro|Antibody molecule.",
"Interferon|micro|Cytokine that gives early antiviral protection.",
"Koch's postulates|micro|Four criteria linking a microorganism to a disease.",
"Pathogen|micro|Microorganism capable of causing disease.",
"Peptidoglycan|micro|Cell wall polymer of bacteria.",
"Plasmid|micro|Small circular DNA in bacteria, often carrying resistance genes.",
"Prion|micro|Infectious misfolded protein with no nucleic acid.",
"Spore|micro|Highly resistant dormant form of some bacteria, e.g. Bacillus and Clostridium.",
"Sterilisation|micro|Complete removal or killing of all microbes including spores.",
"Toxoid|micro|Inactivated toxin used as a vaccine, e.g. tetanus toxoid.",
"Virion|micro|Complete virus particle.",
"Zoonosis|micro|Disease that can pass naturally between animals and humans.",
"Cold chain|micro|Continuous refrigeration of vaccines from maker to animal.",
"Normal flora|micro|Microbes that normally live on skin and mucous membranes without harm.",
/* parasitology */
"Acaricide|para|Chemical used against ticks and mites.",
"Biological vector|para|Arthropod in which the parasite develops before transmission.",
"Cercaria|para|Free-swimming larval stage of a fluke that leaves the snail.",
"Definitive host|para|Host in which the parasite reaches maturity and reproduces sexually.",
"Ectoparasite|para|Parasite living on the surface of the host.",
"Endoparasite|para|Parasite living inside the host.",
"Hydatid cyst|para|Larval stage of Echinococcus in an intermediate host.",
"Intermediate host|para|Host in which larval stages of a parasite develop.",
"Metacercaria|para|Encysted infective stage of Fasciola on vegetation.",
"Myiasis|para|Infestation of living tissue by fly larvae.",
"Oocyst|para|Resistant stage of coccidia and Toxoplasma passed in faeces.",
"Paratenic host|para|Host in which larvae survive but do not develop further.",
"Premunity|para|Immunity kept up by the presence of a low-level infection.",
"Refugia|para|Parasites not exposed to treatment, which help slow drug resistance.",
"Vector|para|Organism that transmits a parasite or pathogen.",
"Faecal egg count (FEC)|para|Number of parasite eggs per gram of faeces.",
"Proglottid|para|Segment of a tapeworm containing reproductive organs.",
"Scolex|para|Head of a tapeworm with attachment organs.",
/* pathology */
"Abscess|path|Localised collection of pus within tissue.",
"Anaplasia|path|Loss of differentiation in tumour cells.",
"Apoptosis|path|Programmed, orderly cell death without inflammation.",
"Atrophy|path|Decrease in size of a cell or organ.",
"Autolysis|path|Self-digestion of tissue by its own enzymes after death.",
"Caseous necrosis|path|Cheese-like necrosis typical of tuberculosis.",
"Congestion|path|Passive accumulation of blood due to poor venous drainage.",
"Dysplasia|path|Disordered cell growth, may precede cancer.",
"Embolus|path|Detached mass carried in blood that can block a vessel.",
"Empyema|path|Pus in a body cavity.",
"Etiology|path|Cause of a disease.",
"Exudate|path|Protein-rich fluid leaking from vessels in inflammation.",
"Gangrene|path|Necrosis with bacterial putrefaction.",
"Granuloma|path|Focal chronic inflammation with epithelioid macrophages and giant cells.",
"Hyperplasia|path|Increase in the number of cells.",
"Hypertrophy|path|Increase in the size of cells.",
"Infarct|path|Area of necrosis caused by loss of blood supply.",
"Lesion|path|Structural change in tissue caused by disease.",
"Metaplasia|path|Change of one mature cell type to another.",
"Metastasis|path|Spread of tumour cells to distant sites.",
"Necropsy|path|Post-mortem examination of an animal.",
"Necrosis|path|Death of cells in a living animal.",
"Neoplasm|path|Abnormal mass of tissue with uncontrolled growth.",
"Oedema|path|Excess fluid in tissue spaces.",
"Pathogenesis|path|Sequence of events from cause to disease.",
"Petechia|path|Pinpoint haemorrhage.",
"Putrefaction|path|Decomposition of tissue by bacteria.",
"Thrombus|path|Clot formed within a living vessel or heart.",
"Transudate|path|Low-protein fluid from pressure or protein imbalance.",
"Granulation tissue|path|New capillaries and fibroblasts that fill a wound.",
/* nutrition */
"Balanced ration|nutr|Ration providing all nutrients in correct amounts for 24 hours.",
"Bypass protein|nutr|Dietary protein that escapes rumen degradation and is digested in the intestine.",
"Concentrate|nutr|Feed low in fibre and high in energy or protein.",
"Crude protein|nutr|Nitrogen content multiplied by 6.25.",
"Dry matter|nutr|Feed weight after water is removed.",
"Feed conversion ratio (FCR)|nutr|Feed eaten per unit of weight gain or product.",
"Flushing|nutr|Extra feeding of females before breeding to improve conception.",
"Hay|nutr|Fodder dried to about 15 percent moisture.",
"Limiting amino acid|nutr|Essential amino acid in shortest supply relative to need.",
"Metabolisable energy|nutr|Digestible energy minus urinary and gas energy losses.",
"Non-protein nitrogen (NPN)|nutr|Nitrogen sources like urea that rumen microbes can use.",
"Roughage|nutr|Bulky feed high in crude fibre.",
"Silage|nutr|Fodder preserved by lactic fermentation without air.",
"Steaming up|nutr|Extra feed in late pregnancy.",
"Total digestible nutrients (TDN)|nutr|Measure of the digestible energy value of feed.",
"Pica|nutr|Eating non-food items, often from mineral deficiency.",
/* public health */
"Attack rate|pubh|Proportion of exposed animals that fall ill in an outbreak.",
"Endemic|pubh|Disease constantly present in an area.",
"Epidemic|pubh|Sudden rise in cases above the expected level.",
"Fomite|pubh|Inanimate object that carries infection.",
"HACCP|pubh|Hazard Analysis and Critical Control Points, a food safety system.",
"Incidence|pubh|Number of new cases in a period.",
"Prevalence|pubh|Number of existing cases at a point in time.",
"Notifiable disease|pubh|Disease that must be reported to authorities.",
"One Health|pubh|Approach linking human, animal and environmental health.",
"Sensitivity|pubh|Ability of a test to detect truly diseased animals.",
"Specificity|pubh|Ability of a test to identify truly healthy animals.",
"Surveillance|pubh|Systematic collection and analysis of disease data.",
"Zoonoses, reverse|pubh|Diseases passing from humans to animals.",
"Condemnation|pubh|Declaring a carcass or organ unfit for human food.",
/* genetics */
"Allele|gen|Alternative form of a gene.",
"Codominance|gen|Both alleles are fully expressed in the heterozygote.",
"Epistasis|gen|One gene masks the effect of another.",
"Genetic drift|gen|Random change in gene frequency in small populations.",
"Genotype|gen|Genetic makeup of an individual.",
"Heritability|gen|Proportion of phenotypic variance due to additive genetic variance.",
"Heterosis|gen|Hybrid vigour; crossbred superiority over parent average.",
"Inbreeding|gen|Mating of related animals.",
"Phenotype|gen|Observable trait.",
"Progeny testing|gen|Evaluating a parent by the performance of its offspring.",
"Test cross|gen|Cross with a homozygous recessive to find an unknown genotype.",
"Selection differential|gen|Difference between selected parents' mean and population mean.",
"Repeatability|gen|Consistency of repeated records of an animal.",
/* production management */
"Brooding|lpm|Providing warmth and care to young chicks.",
"Calving interval|lpm|Time between two successive calvings.",
"Creep feed|lpm|Special feed offered to young animals beside their mother.",
"Deep litter|lpm|Housing system with bedding on the floor for poultry.",
"Dry period|lpm|Rest period of a cow before the next calving, about 45 to 60 days.",
"Farrowing|lpm|Parturition in the sow.",
"Teat dip|lpm|Disinfectant applied to teats after milking.",
"All-in all-out|lpm|Stocking and emptying a whole house at the same time.",
/* products technology */
"Casein|lpt|Main milk protein; coagulates with acid or rennet.",
"Chalaza|lpt|Cord-like structure holding the egg yolk in place.",
"DFD meat|lpt|Dark, firm, dry meat from stressed animals.",
"Haugh unit|lpt|Measure of egg albumen quality.",
"Pasteurisation|lpt|Heat treatment that kills pathogens without sterilising.",
"PSE meat|lpt|Pale, soft, exudative meat, often in pigs.",
"Rigor mortis|lpt|Post-mortem stiffening of muscle.",
"Rendering|lpt|Heating animal tissues to extract fat and make meal.",
"UHT|lpt|Ultra high temperature treatment giving shelf-stable milk.",
/* gynaecology */
"Anoestrus|gyn|Period without oestrous cycles.",
"Dystocia|gyn|Difficult or abnormal birth.",
"Eutocia|gyn|Normal birth.",
"Freemartin|gyn|Sterile female co-twin to a male in cattle.",
"Involution|gyn|Return of the uterus to normal size after birth.",
"Luteolysis|gyn|Regression of the corpus luteum.",
"Maternal recognition of pregnancy|gyn|Signal from the embryo that stops luteolysis.",
"Oestrus|gyn|Heat; the period when the female accepts the male.",
"Pyometra|gyn|Accumulation of pus in the uterus.",
"Relaxin|gyn|Hormone that relaxes pelvic ligaments and cervix.",
"Repeat breeder|gyn|Female with normal cycles that fails to conceive after several services.",
"Cryptorchidism|gyn|Failure of one or both testes to descend into the scrotum.",
/* surgery */
"Asepsis|surg|Keeping microorganisms away from the surgical field.",
"Debridement|surg|Removal of dead or contaminated tissue from a wound.",
"Dehiscence|surg|Reopening of a surgical wound.",
"Epidural|surg|Injection around the spinal cord's covering for regional anaesthesia.",
"Hernia|surg|Protrusion of an organ through an opening in a body wall.",
"Echogenicity|surg|Brightness of a tissue on ultrasound.",
"ALARA|surg|As Low As Reasonably Achievable, the radiation safety principle.",
"Strangulated hernia|surg|Hernia in which blood supply to contents is cut off.",
"Haematoma|surg|Mass of clotted blood in tissue.",
/* medicine */
"Auscultation|med|Listening to body sounds, usually with a stethoscope.",
"Bloat|med|Excess gas in the rumen.",
"Capillary refill time|med|Time for gum colour to return after pressing; normally under about 2 seconds.",
"Differential diagnosis|med|List of diseases that could explain the signs.",
"Icterus|med|Yellow colour of tissues due to excess bilirubin; jaundice.",
"Milk fever|med|Hypocalcaemia around calving in dairy cows.",
"Palpation|med|Examination by feeling with the hands.",
"Percussion|med|Examination by tapping and listening to the sound.",
"Signalment|med|Species, breed, age and sex of the animal.",
"Colic|med|Sign of abdominal pain, especially in horses.",
/* extension */
"Adoption process|ext|Stages from awareness to adoption of a new practice.",
"Feedback|ext|Receiver's response to a message.",
"Method demonstration|ext|Demonstration showing how to perform a practice.",
"Result demonstration|ext|Demonstration showing the outcome of a practice over time.",
"Self-help group|ext|Small group, often of women, pooling savings and giving credit.",
"Krishi Vigyan Kendra|ext|District-level agricultural science centre for training and demonstration.",
/* clinical practice */
"Body condition score|clin|Score of fat cover estimated by sight and touch.",
"Informed consent|clin|Permission given after being told risks and options.",
"Biosafety|clin|Measures that protect staff from infectious hazards.",
"Prognosis|clin|Expected outcome of a disease.",
"Euthanasia|clin|Humane ending of life to relieve suffering, done by a trained veterinarian.",
/* farm practices */
"Biosecurity|farm|Measures that prevent disease entering or leaving a farm.",
"Five freedoms|farm|Framework for animal welfare covering hunger, discomfort, pain, fear and normal behaviour.",
"Footbath|farm|Disinfectant bath for footwear or hooves at entry points.",
"Quarantine|farm|Separation of new or sick animals to prevent spread of disease.",
"Tapetum lucidum|anat|Reflective layer behind the retina that gives eyeshine and helps night vision; absent in the pig.",
"Uvea|anat|Vascular middle layer of the eye: choroid, ciliary body and iris.",
"Aqueous humour|anat|Fluid in the front chambers of the eye, made by the ciliary body.",
"Guttural pouch|anat|Large air-filled diverticulum of the auditory tube in the horse.",
"Ossicles|anat|The three tiny middle-ear bones: malleus, incus and stapes.",
"Adenohypophysis|anat|Anterior lobe of the pituitary gland, which makes most pituitary hormones.",
"Neurohypophysis|anat|Posterior lobe of the pituitary that stores and releases oxytocin and ADH.",
"Islets of Langerhans|anat|Clusters of endocrine cells in the pancreas that make insulin and glucagon.",
"Cisterna chyli|anat|Dilated start of the thoracic duct in the abdomen.",
"Red pulp|anat|Blood-filtering tissue of the spleen.",
"White pulp|anat|Lymphoid tissue of the spleen around small arteries.",
"White line|anat|Junction of the wall and sole of the hoof or claw.",
"Quick|anat|Living sensitive core of a claw that contains blood vessels and nerves.",
"Laminitis|anat|Inflammation of the sensitive laminae of the hoof, causing severe lameness.",
"Gastrulation|anat|Stage of early development when the three germ layers form.",
"Trophoblast|anat|Outer cell layer of the blastocyst that forms the chorion.",
"Choroid plexus|anat|Tissue in the brain ventricles that produces cerebrospinal fluid.",
"Cauda equina|anat|Bundle of nerve roots trailing behind the end of the spinal cord.",
"Paralumbar fossa|anat|Hollow of the flank behind the last rib, used for clinical landmarks.",
"Synsarcosis|anat|Attachment of the forelimb to the trunk by muscles only.",
"Hypsodont|anat|Tall-crowned tooth that keeps erupting as it wears.",
"Brachydont|anat|Low-crowned tooth that stops growing once formed.",
"Karyotype|gen|Complete set of chromosomes of an individual arranged in pairs.",
"Gross margin|farm|Income minus variable costs.",
"Stewardship|pharm|Responsible, careful use of antimicrobial drugs.",
"MIC|pharm|Minimum inhibitory concentration: lowest drug concentration that stops visible bacterial growth.",
"Acidosis|phys|Condition in which blood pH falls below the normal range.",
"Pearson square|nutr|Method of mixing two feeds to reach a target nutrient percentage.",
"Hindgut fermenter|anat|Animal that digests fibre by microbial fermentation in the caecum and colon, such as the horse.",
"Volvulus|anat|Twisting of a loop of gut on its own axis.",
"Pelvic flexure|anat|Hairpin bend of the horse's large colon, a common site of impaction.",
"Turbinate|anat|Thin scroll of bone covered by mucosa in the nasal cavity.",
"Pampiniform plexus|anat|Network of testicular veins that cools the blood going to the testis.",
"Os penis|anat|Bone in the penis of the dog.",
"Bicornuate uterus|anat|Uterus with a short body and two horns, as in domestic animals.",
"Corpus luteum|anat|Gland formed from the ruptured follicle, producing progesterone.",
"Nephron|anat|Structural and functional unit of the kidney.",
"Urolithiasis|anat|Formation of stones in the urinary tract.",
"Linea alba|anat|Fibrous line along the ventral midline of the abdomen where the muscle sheaths meet.",
"Ligamentum nuchae|anat|Elastic ligament that holds up the head and neck of ungulates.",
"Patent ductus arteriosus|anat|Failure of the fetal ductus arteriosus to close after birth.",
"Furcula|anat|Wishbone of birds, formed by the fused clavicles.",
"Keel|anat|Ridge on the bird's sternum where the flight muscles attach.",
"Uropygial gland|anat|Preen gland above the tail of birds that makes oil for the feathers.",
"Digitigrade|anat|Walking on the toes with the heel raised, as in the dog and cat.",
"Anal sac|anat|Scent-producing sac on each side of the anus in carnivores.",
"Sebum|anat|Oily secretion of the sebaceous glands of the skin.",
"Stratum corneum|anat|Outermost, dead, horny layer of the epidermis.",
"Radiopaque|anat|Material that absorbs X-rays and looks white on a radiograph.",
"Radiolucent|anat|Material that lets X-rays pass and looks dark on a radiograph.",
"Splanchnology|anat|Study of the viscera, the organs inside the body cavities.",
"Viscera|anat|Internal organs of the thoracic, abdominal and pelvic cavities.",
"Stay apparatus|anat|Tendons and ligaments that support a limb so the horse can stand with little muscle effort.",
"Brachial plexus|anat|Network of nerves from the last cervical and first thoracic nerves that supplies the fore limb.",
"Jugular furrow|anat|Groove on the side of the neck, between brachiocephalicus and sternocephalicus, holding the jugular vein.",
"Carotid sheath|anat|Sheath around the common carotid artery, vagosympathetic trunk and recurrent laryngeal nerve.",
"Thoracocentesis|anat|Puncture of the chest wall to remove fluid or air from the pleural cavity.",
"Omentum|anat|Fold of peritoneum attached to the stomach.",
"Mesentery|anat|Peritoneal fold that suspends the intestines.",
"Inguinal canal|anat|Oblique passage through the lower abdominal wall carrying the spermatic cord.",
"Prepubic tendon|anat|Common tendon of the abdominal muscles attached to the pubis.",
"Reciprocal apparatus|anat|Mechanism linking the stifle and hock of the horse so they move together.",
"Desmosome|anat|Spot-like junction that holds neighbouring cells together.",
"Gap junction|anat|Channel connecting the cytoplasm of two cells.",
"Urothelium|anat|Transitional epithelium lining the urinary passages.",
"Kupffer cell|anat|Macrophage lining the liver sinusoids.",
"Gametogenesis|anat|Formation of sperm and ova by meiosis.",
"Capacitation|anat|Final maturation of sperm in the female tract before fertilisation.",
"Telolecithal|anat|Egg with a large amount of yolk concentrated at one pole, as in birds.",
"Morula|anat|Solid ball of cells formed by cleavage of the zygote.",
"Blastocyst|anat|Hollow stage of the early embryo with a trophoblast and an inner cell mass.",
"Neural crest|anat|Group of embryonic cells that form peripheral nerves, adrenal medulla and melanocytes.",
"Rathke's pouch|anat|Upgrowth from the roof of the mouth that forms the anterior pituitary.",
"Metanephros|anat|Permanent kidney of mammals and birds.",
"Cost of production|farm|Total cost divided by output, for example per litre of milk."
];
const GLOSS = GLOSS_RAW.map(l => { const p = l.split("|"); return [p[0], p[1], p.slice(2).join("|")]; }).sort((a, b) => a[0].localeCompare(b[0]));
/* ================= ENGINE ================= */
const KEY = "vetnest_state_v2";
let storageOK = true;
const S = { bm: [], gbm: [], done: [], recent: [], notes: {}, tasks: [], pins: {}, logs: [], chk: {}, last: null, theme: "light", fs: 18, mode: "simple", folders: ["General"], snips: [] };
try { const raw = localStorage.getItem(KEY); if (raw) Object.assign(S, JSON.parse(raw)); } catch (e) { storageOK = false; }
if (!Array.isArray(S.folders) || !S.folders.length) S.folders = ["General"];
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { storageOK = false; const w = $("#storageWarn"); if (w) w.hidden = false; }
}

/* ---------- helpers ---------- */
const ul = a => "<ul>" + a.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>";
function rich(text) {
  const lines = String(text).split("\n"); let out = "", list = [];
  const flush = () => { if (list.length) { out += "<ul>" + list.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>"; list = []; } };
  lines.forEach(l => { if (l.indexOf("- ") === 0) list.push(l.slice(2)); else { flush(); if (l.trim()) out += "<p>" + esc(l) + "</p>"; } });
  flush(); return out;
}
function tbl(t) { return '<div class="tablewrap"><table><thead><tr>' + t.h.map(h => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" + t.r.map(r => "<tr>" + r.map(c => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>"; }
function sec(title, body, open) { return '<details class="sec"' + (open === false ? "" : " open") + "><summary>" + esc(title) + '</summary><div class="secbody">' + body + "</div></details>"; }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function today() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
const tLink = id => T[id] ? '<a href="#reader/' + id + '">' + esc(T[id].t) + "</a>" : "";
const subjOptions = (all, contentOnly) => (all ? '<option value="">All subjects</option>' : "") + SUBJECTS.filter(s => !contentOnly || ORDER[s.id].length).map(s => '<option value="' + s.id + '">' + esc(s.name) + "</option>").join("");
function words(t) {
  let w = 0;
  const add = x => { if (typeof x === "string") w += x.split(/\s+/).length; else if (Array.isArray(x)) x.forEach(add); else if (x && typeof x === "object") Object.keys(x).forEach(k => add(x[k])); };
  add([t.i, t.s, t.n, t.tb, t.k, t.m, t.sa, t.la, t.q, t.f, t.d]); return w;
}
const mins = t => Math.max(1, Math.round(words(t) / 180));
function related(t) {
  const same = ORDER[t.s].filter(id => id !== t.id), pos = ORDER[t.s].indexOf(t.id);
  const near = [ORDER[t.s][pos - 1], ORDER[t.s][pos + 1]].filter(Boolean);
  const other = TOPICS.filter(x => x.s !== t.s && x.k && x.t.split(/[ ,:]+/).some(w => w.length > 5 && t.t.toLowerCase().includes(w.toLowerCase()))).map(x => x.id).slice(0, 3);
  return Array.from(new Set(near.concat(same.slice(0, 3), other))).slice(0, 6);
}

/* ---------- router ---------- */
let curId = null;
const routes = { home: renderHome, subjects: renderSubjects, subject: renderSubject, reader: renderReader, notebook: renderNotebook, quiz: renderQuiz, exam: renderExam, flash: renderFlash, glossary: renderGlossary, planner: renderPlanner, space: renderSpace, intern: renderIntern, refs: function () { } };
function route() {
  const parts = location.hash.replace("#", "").split("/");
  if (parts[0] === "main") return;
  const name = routes[parts[0]] ? parts[0] : "home";
  $$(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + name));
  $$("#nav a").forEach(a => { const h = a.getAttribute("href"); a.classList.toggle("on", h === "#" + name || ((name === "subject" || name === "reader") && h === "#subjects")); });
  document.body.classList.remove("focus");
  $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
  hideSel();
  routes[name](parts[1]);
  window.scrollTo(0, 0);
}

/* ---------- home ---------- */
function renderHome() {
  const nQ = TOPICS.reduce((a, t) => a + (t.q ? t.q.length : 0), 0), nF = TOPICS.reduce((a, t) => a + (t.f ? t.f.length : 0), 0);
  $("#stats").textContent = TOPICS.length + " study topics · " + nQ + " practice MCQs · " + nF + " flashcards · " + GLOSS.length + " glossary terms · 18 subjects";
  const last = S.last && T[S.last] ? S.last : null;
  $("#hContinue").innerHTML = last ? "<p>" + tLink(last) + '<br><span class="meta">' + esc(SUBJ[T[last].s].name) + '</span></p><a class="btn small" href="#reader/' + last + '">Continue</a>' : '<p class="empty">Nothing yet. Open a subject and start with any topic.</p><a class="btn small" href="#subjects">Browse subjects</a>';
  $("#readBtn").setAttribute("href", "#reader/" + (last || "anat1"));
  const list = (ids, empty) => { ids = ids.filter(id => T[id]); return ids.length ? '<ul class="list">' + ids.slice(0, 5).map(id => "<li>" + tLink(id) + "</li>").join("") + "</ul>" : '<p class="empty">' + empty + "</p>"; };
  $("#hRecent").innerHTML = list(S.recent, "Topics you open will show up here.");
  $("#hBook").innerHTML = list(S.bm, "Tap ☆ Bookmark inside any topic.");
  const dn = S.done.filter(id => T[id]);
  $("#hDone").innerHTML = dn.length ? "<p><b>" + dn.length + "</b> completed</p>" + list(dn, "") : '<p class="empty">Mark a topic as completed when you finish it.</p>';
  const td = S.tasks.filter(x => x.due === today() && !x.done);
  $("#hTasks").innerHTML = td.length ? '<ul class="list">' + td.map(x => "<li>" + esc(x.text) + "</li>").join("") + "</ul>" : '<p class="empty">No tasks due today.</p><a class="btn small ghost" href="#planner">Open planner</a>';
  $("#hNote").innerHTML = S.snips.length ? "<p><b>" + S.snips.length + "</b> saved snippets in " + S.folders.length + ' folder(s)</p><a class="btn small" href="#notebook">Open notebook</a>' : '<p class="empty">Select any text while reading and save it here.</p><a class="btn small ghost" href="#notebook">Open notebook</a>';
}

/* ---------- subjects ---------- */
let yearTab = "all";
const YEAR_DEFAULT = { anat: "y1", phys: "y1", lpm: "y1", bioc: "y2", micro: "y2", path: "y2", gen: "y2", nutr: "y2", pharm: "y3", pubh: "y3", para: "y3", lpt: "y3", ext: "y3", clin: "y3", farm: "y3", surg: "y4", med: "y4", gyn: "y4" };
const yearOf = id => (S.pins[id] !== undefined ? S.pins[id] : YEAR_DEFAULT[id]);
const YEARS = [["all", "All subjects"], ["y1", "Year 1"], ["y2", "Year 2"], ["y3", "Year 3"], ["y4", "Year 4"], ["int", "Internship"]];
function renderSubjects() {
  $("#yearTabs").innerHTML = YEARS.map(y => '<button data-y="' + y[0] + '" class="' + (y[0] === yearTab ? "on" : "") + '">' + y[1] + "</button>").join("");
  drawSubjects(); drawTopicSearch();
}
function drawSubjects() {
  const q = $("#subSearch").value.trim().toLowerCase();
  let list = SUBJECTS.filter(s => (s.name + " " + s.blurb).toLowerCase().includes(q));
  if (yearTab !== "all") list = list.filter(s => yearOf(s.id) === yearTab);
  if (!list.length) { $("#subGrid").innerHTML = '<p class="empty">' + (yearTab !== "all" ? "No subjects in this year yet." : "No subject matches your search.") + "</p>"; return; }
  $("#subGrid").innerHTML = list.map(s => {
    const n = ORDER[s.id].length, left = PLANNED[s.id].length;
    return '<article class="card subj-card"><div class="icon">' + s.icon + "</div><h3>" + esc(s.name) + '</h3><p class="meta">' + esc(s.blurb) + '</p><span class="tag">' + n + " topics written</span>" + (left ? '<span class="tag off">' + left + " more planned</span>" : "") + '<div class="row"><a class="btn small" href="#subject/' + s.id + '">Open</a></div><label class="meta">Pin to year<select data-pin="' + s.id + '"><option value="">No year</option>' + YEARS.slice(1).map(y => '<option value="' + y[0] + '"' + (yearOf(s.id) === y[0] ? " selected" : "") + ">" + y[1] + "</option>").join("") + "</select></label></article>";
  }).join("");
}
function drawTopicSearch() {
  const q = $("#topicSearch").value.trim().toLowerCase(), box = $("#topicRes");
  if (!q) { box.hidden = true; return; }
  const byTitle = TOPICS.filter(t => t.t.toLowerCase().includes(q));
  const byText = TOPICS.filter(t => !byTitle.includes(t) && JSON.stringify([t.i, t.s, t.n, t.tb, t.k]).toLowerCase().includes(q));
  const terms = GLOSS.filter(g => (g[0] + " " + g[2]).toLowerCase().includes(q)).slice(0, 8);
  let h = "";
  const row = t => "<li>" + tLink(t.id) + '<span class="meta">' + esc(SUBJ[t.s].name) + "</span></li>";
  if (byTitle.length) h += "<h3>Topics</h3><ul class='list'>" + byTitle.map(row).join("") + "</ul>";
  if (byText.length) h += "<h3>Mentioned inside topics</h3><ul class='list'>" + byText.slice(0, 15).map(row).join("") + "</ul>";
  if (terms.length) h += "<h3>Glossary</h3><ul class='list'>" + terms.map(g => "<li><span><b>" + esc(g[0]) + "</b>: " + esc(g[2]) + "</span></li>").join("") + "</ul>";
  box.hidden = false; box.innerHTML = h || '<p class="empty">Nothing found. Try another word.</p>';
}
function renderSubject(sid) {
  const s = SUBJ[sid], box = $("#subjectView");
  if (!s) { box.innerHTML = '<p class="empty">Subject not found. <a href="#subjects">Back</a></p>'; return; }
  let h = '<nav class="crumbs"><a href="#subjects">Subjects</a> › ' + esc(s.name) + "</nav><h1>" + s.icon + " " + esc(s.name) + "</h1><p>" + esc(s.blurb) + '</p><p class="notice">Study modules written as learning aids, not the complete official syllabus. Please verify the curriculum and examination requirements against your current college syllabus.</p>';
  const doneN = ORDER[sid].filter(id => S.done.includes(id)).length;
  h += '<p class="meta">' + ORDER[sid].length + " topics · " + doneN + " completed by you · " + mcqCount(sid) + ' practice MCQs</p><div class="row"><a class="btn" href="#reader/' + ORDER[sid][0] + '">Start from topic 1</a><a class="btn ghost" href="#quiz/' + sid + '">Practise MCQs</a><a class="btn ghost" href="#exam">Exam prep</a></div>';
  UNITS[sid].forEach(u => {
    h += '<div class="card"><h3>' + esc(u[0]) + '</h3><ul class="list">' + u[1].map(id => { const t = T[id]; return "<li><span>" + (S.done.includes(id) ? '<span class="ok">✓</span> ' : "") + (S.bm.includes(id) ? "★ " : "") + tLink(id) + '</span><span class="meta">' + mins(t) + " min read · " + t.q.length + " MCQs</span></li>"; }).join("") + "</ul></div>";
  });
  if (PLANNED[sid].length) h += '<div class="card"><h3>Still to explore (not written yet)</h3><p class="meta">These topics belong to this subject but have no study notes on VetNet yet. Use your textbooks for them, and save your own notes in the Notebook.</p><ul class="more">' + PLANNED[sid].map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
  box.innerHTML = h;
}
function mcqCount(f) { return mcqPool(f).length; }

/* ---------- reader ---------- */
function renderReader(id) {
  const box = $("#reader"), t = T[id];
  if (!t) { box.innerHTML = '<p class="empty">Topic not found. <a href="#subjects">Back to subjects</a></p>'; return; }
  curId = id;
  S.last = id; S.recent = [id].concat(S.recent.filter(x => x !== id)).slice(0, 8); save();
  box.style.setProperty("--fs", S.fs + "px");
  const ord = ORDER[t.s], pos = ord.indexOf(id), prev = ord[pos - 1], next = ord[pos + 1];
  let h = '<button class="btn small focus-exit" data-act="focus">Exit focus mode</button>';
  h += '<nav class="crumbs"><a href="#subjects">Subjects</a> › <a href="#subject/' + t.s + '">' + esc(SUBJ[t.s].name) + "</a> › " + esc(t.t) + "</nav><h1>" + esc(t.t) + '</h1><p class="meta">' + SUBJ[t.s].icon + " " + esc(SUBJ[t.s].name) + " · about " + mins(t) + " min read · study aid, not the official syllabus</p>";
  h += '<div class="tools no-focus"><button data-act="simple" class="' + (S.mode === "simple" ? "on" : "") + '">Explain it simply</button><button data-act="detail" class="' + (S.mode === "detail" ? "on" : "") + '">Detailed notes</button><button data-act="fsdown" aria-label="Smaller text">A−</button><button data-act="fsup" aria-label="Larger text">A+</button><button data-act="focus">Focus mode</button><button data-act="bm">' + (S.bm.includes(id) ? "★ Bookmarked" : "☆ Bookmark") + '</button><button data-act="done">' + (S.done.includes(id) ? "✓ Completed" : "Mark completed") + '</button><input id="inTopic" type="search" placeholder="Search in this topic…" aria-label="Search in this topic"></div><p id="inMsg" class="meta"></p>';
  h += '<p class="meta no-focus">Tip: select any sentence or paragraph below and tap "Save to notebook" to keep it in your own folder.</p>';
  h += '<div class="body">';
  h += sec("Introduction", "<p>" + esc(t.i) + "</p>");
  if (t.o) h += sec("Learning objectives", "<p class='meta'>After this topic you should be able to:</p>" + ul(t.o));
  { const ks = [].concat(t.dia || []).filter(k => DIA[k]); if (ks.length) h += sec(ks.length > 1 ? "Diagrams and flowcharts" : "Diagram", ks.map(k => DIA[k]).join("")); }
  if (t.df) h += sec("Scientific definitions", ul(t.df));
  if (t.tm) h += sec("Important terminology", tbl({ h: ["Term", "Meaning"], r: t.tm }));
  if (S.mode === "simple") {
    h += sec("Explained simply", "<p>" + esc(t.s) + "</p>");
    h += sec("Go a little deeper (full notes)", t.n.map(x => "<h3>" + esc(x[0]) + "</h3>" + rich(x[1])).join(""));
  } else {
    h += sec("In simple words first", "<p>" + esc(t.s) + "</p>", false);
    t.n.forEach(x => { h += sec(x[0], rich(x[1])); });
  }
  if (t.st) h += sec("Step by step", "<ol>" + t.st.map(x => "<li>" + esc(x) + "</li>").join("") + "</ol>");
  if (t.ex) h += sec("Veterinary examples", ul(t.ex));
  if (t.tb) h += sec("Comparison table", tbl(t.tb));
  h += sec("Important examination points", ul(t.k));
  h += sec("Common misconceptions", ul(t.m));
  h += sec("Short-answer questions (practice)", t.sa.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer</summary><p>" + esc(q[1]) + "</p></details>").join(""), false);
  h += sec("Long-answer questions (practice)", t.la.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer outline</summary><p>" + esc(q[1]) + "</p></details>").join(""), false);
  h += sec("MCQs (practice)", t.q.map((m, i) => '<div class="mcq" data-i="' + i + '"><p><b>' + (i + 1) + ".</b> " + esc(m[0]) + "</p>" + shuffle(m[1].map((o, k) => [o, k])).map(ok => '<button class="opt" data-k="' + ok[1] + '">' + esc(ok[0]) + "</button>").join("") + '<p class="exp" hidden><b>Answer:</b> ' + esc(m[1][m[2]]) + ". " + esc(m[3]) + "</p></div>").join(""), false);
  h += sec("Flashcards (tap to flip)", t.f.map(f => '<button class="fc"><span class="f">' + esc(f[0]) + '</span><span class="b" hidden>' + esc(f[1]) + "</span></button>").join(""), false);
  h += sec("Quick revision summary", ul(t.k.slice(0, 4).concat(t.f.map(f => f[0] + ": " + f[1]))), false);
  if (t.vf && t.vf.length) h += '<details class="sec verify" open><summary>⚠ Check these points in your textbook</summary><div class="secbody"><p class="meta">I am not fully certain of these, or they vary between books, breeds and colleges. Treat them as my best understanding and an assumption to check, not a final answer.</p>' + ul(t.vf) + "</div></details>";
  if (t.d && t.d.length) h += sec("Keep exploring (this topic has more than this page)", "<p class='meta'>No topic is ever finished. Here is where to go next:</p>" + ul(t.d));
  const rel = related(t);
  if (rel.length) h += sec("Related topics", "<ul>" + rel.map(r => "<li>" + tLink(r) + ' <span class="meta">(' + esc(SUBJ[T[r].s].name) + ")</span></li>").join("") + "</ul>");
  h += "</div>";
  h += '<details class="sec" open><summary>My quick note for this topic (saved on this device)</summary><div class="secbody"><textarea id="noteBox" rows="4" placeholder="Write your own note…" aria-label="My note">' + esc(S.notes[id] || "") + '</textarea><div class="row"><button class="btn small" data-act="savenote">Save note</button><button class="btn small ghost" data-act="delnote">Delete note</button><span id="noteMsg" class="meta"></span></div><p class="meta">Notes stay in this browser only. They do not sync to other devices.</p></div></details>';
  h += '<div class="nav2 no-focus">' + (prev ? '<a class="btn ghost" href="#reader/' + prev + '">← ' + esc(T[prev].t) + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="#reader/' + next + '">' + esc(T[next].t) + " →</a>" : "<span></span>") + "</div>";
  box.innerHTML = h;
}
function readerClick(e) {
  const box = $("#reader");
  const opt = e.target.closest(".opt"), fc = e.target.closest(".fc"), b = e.target.closest("[data-act]");
  if (opt && opt.parentNode.classList.contains("mcq")) {
    const q = opt.parentNode, m = T[curId].q[+q.dataset.i], k = +opt.dataset.k;
    if (q.dataset.done) return;
    q.dataset.done = "1";
    $$(".opt", q).forEach(o => { o.disabled = true; const j = +o.dataset.k; if (j === m[2]) o.classList.add("right"); else if (j === k) o.classList.add("wrong"); });
    $(".exp", q).hidden = false; return;
  }
  if (fc) { $(".f", fc).hidden = !$(".f", fc).hidden; $(".b", fc).hidden = !$(".b", fc).hidden; return; }
  if (!b) return;
  const a = b.dataset.act;
  if (a === "simple" || a === "detail") { const tmp = $("#noteBox").value; S.mode = a; save(); const y = window.scrollY; renderReader(curId); $("#noteBox").value = tmp; window.scrollTo(0, y); }
  else if (a === "fsup" || a === "fsdown") { S.fs = Math.max(15, Math.min(26, S.fs + (a === "fsup" ? 1 : -1))); save(); box.style.setProperty("--fs", S.fs + "px"); }
  else if (a === "focus") document.body.classList.toggle("focus");
  else if (a === "bm") { S.bm = S.bm.includes(curId) ? S.bm.filter(x => x !== curId) : S.bm.concat(curId); save(); b.textContent = S.bm.includes(curId) ? "★ Bookmarked" : "☆ Bookmark"; }
  else if (a === "done") { S.done = S.done.includes(curId) ? S.done.filter(x => x !== curId) : S.done.concat(curId); save(); b.textContent = S.done.includes(curId) ? "✓ Completed" : "Mark completed"; }
  else if (a === "savenote") { const v = $("#noteBox").value.trim(); if (v) S.notes[curId] = v; else delete S.notes[curId]; save(); $("#noteMsg").textContent = storageOK ? "Saved." : "Could not save: browser storage is blocked."; }
  else if (a === "delnote") { delete S.notes[curId]; save(); $("#noteBox").value = ""; $("#noteMsg").textContent = "Note deleted."; }
}
function readerInput(e) {
  if (e.target.id !== "inTopic") return;
  const q = e.target.value.trim().toLowerCase();
  let n = 0;
  $$("#reader .body > details.sec").forEach(d => { const hit = !q || d.textContent.toLowerCase().includes(q); d.hidden = !hit; if (hit && q) { d.open = true; n++; } });
  $("#inMsg").textContent = q ? n + " section(s) match." : "";
}

/* ---------- select text -> notebook ---------- */
let selText = "", selSrc = null;
function hideSel() { selText = ""; const b = $("#selBar"); if (b) b.hidden = true; }
function checkSel() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) { if (!$("#modal").hidden) return; hideSel(); return; }
  const txt = sel.toString().replace(/\s+/g, " ").trim();
  const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
  if (!node || txt.length < 3 || !node.closest("#reader .body, #gList, #exOut, #subjectView, #topicRes, #page-intern")) { hideSel(); return; }
  if (node.closest("textarea,input,#modal,#selBar")) { hideSel(); return; }
  selText = sel.toString().replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  selSrc = curId && $("#page-reader").classList.contains("active") ? curId : null;
  $("#selTxt").textContent = "“" + (txt.length > 70 ? txt.slice(0, 70) + "…" : txt) + "”";
  $("#selBar").hidden = false;
}
let selTimer = null;
document.addEventListener("selectionchange", () => { clearTimeout(selTimer); selTimer = setTimeout(checkSel, 250); });
function toBullets(text) {
  let parts = text.split(/\n+/).map(x => x.replace(/^[-•*\d.)\s]+/, "").trim()).filter(Boolean);
  if (parts.length < 2) parts = (text.match(/[^.;!?]+[.;!?]*/g) || [text]).map(x => x.trim()).filter(Boolean);
  return parts;
}
function openModal() {
  if (!selText) return;
  $("#mText").value = selText;
  $("#mFolder").innerHTML = S.folders.map(f => "<option>" + esc(f) + "</option>").join("");
  $("#mNewFolder").value = "";
  $$("input[name=mKind]")[0].checked = true;
  $("#modal").hidden = false; $("#mText").focus();
}
function saveSnip() {
  let text = $("#mText").value.trim(); if (!text) return;
  let folder = $("#mNewFolder").value.trim() || $("#mFolder").value || "General";
  if (!S.folders.includes(folder)) S.folders.push(folder);
  const kind = ($$("input[name=mKind]").find(r => r.checked) || {}).value || "note";
  S.snips.unshift({ id: Date.now() + Math.floor(Math.random() * 1000), folder: folder, kind: kind, lines: kind === "bullets" ? toBullets(text) : [text], src: selSrc, date: today() });
  save(); $("#modal").hidden = true; hideSel();
  try { window.getSelection().removeAllRanges(); } catch (e) { }
  $("#selTxt").textContent = "Saved to “" + folder + "” ✓"; $("#selBar").hidden = false; $("#selSave").hidden = true;
  setTimeout(() => { $("#selBar").hidden = true; $("#selSave").hidden = false; }, 1600);
}

/* ---------- notebook ---------- */
let nbFolder = "All", nbQ = "";
function renderNotebook() { drawNotebook(); }
function drawNotebook() {
  const box = $("#nbView");
  const cnt = f => f === "All" ? S.snips.length : S.snips.filter(s => s.folder === f).length;
  let list = S.snips.filter(s => (nbFolder === "All" || s.folder === nbFolder) && (!nbQ || s.lines.join(" ").toLowerCase().includes(nbQ)));
  let h = "<h1>My Notebook</h1><p class='notice'>Select any text while reading (topics, glossary, exam prep) and tap <b>Save to notebook</b>. Keep it as a note or turn it into bullet points, and file it in your own folder. Everything is saved only in this browser on this device. Use My Space to download a backup.</p>";
  h += '<div class="nbwrap"><aside><div class="folders">';
  ["All"].concat(S.folders).forEach(f => { h += '<button data-nbf="' + esc(f) + '" class="' + (f === nbFolder ? "on" : "") + '">' + (f === "All" ? "📚 All snippets" : "📁 " + esc(f)) + " (" + cnt(f) + ")</button>"; });
  h += '</div><form id="nbAdd" class="row"><input id="nbNew" type="text" placeholder="New folder name…" aria-label="New folder name"><button class="btn small" type="submit">Add folder</button></form>';
  if (nbFolder !== "All") h += '<div class="row"><button class="btn small ghost" data-nbren="1">Rename folder</button>' + (nbFolder !== "General" ? '<button class="btn small ghost" data-nbdel="1">Delete folder</button>' : "") + '<button class="btn small ghost" data-nbexp="1">Download folder (.txt)</button></div>';
  else h += '<div class="row"><button class="btn small ghost" data-nbexp="1">Download everything (.txt)</button></div>';
  h += '</aside><section><div class="row"><input id="nbSearch" type="search" placeholder="Search my notebook…" value="' + esc(nbQ) + '" aria-label="Search notebook"></div>';
  if (!list.length) h += '<p class="empty">' + (S.snips.length ? "Nothing matches here." : "Your notebook is empty. Open any topic, select a sentence, and save it.") + "</p>";
  list.forEach(s => {
    const body = s.kind === "bullets" ? "<ul>" + s.lines.map(l => "<li>" + esc(l) + "</li>").join("") + "</ul>" : "<p>" + esc(s.lines.join("\n")).replace(/\n/g, "<br>") + "</p>";
    h += '<div class="snip" data-id="' + s.id + '">' + body + '<p class="src">📁 ' + esc(s.folder) + " · " + s.date + (s.src && T[s.src] ? ' · from <a href="#reader/' + s.src + '">' + esc(T[s.src].t) + "</a>" : "") + '</p><div class="row"><button class="btn small ghost" data-edit="' + s.id + '">Edit</button><select data-move="' + s.id + '" aria-label="Move to folder">' + S.folders.map(f => "<option" + (f === s.folder ? " selected" : "") + ">" + esc(f) + "</option>").join("") + '</select><button class="btn small ghost" data-copy="' + s.id + '">Copy</button><button class="btn small ghost" data-delsnip="' + s.id + '">Delete</button></div></div>';
  });
  h += "</section></div>";
  box.innerHTML = h;
}
function snipText(s) { return s.kind === "bullets" ? s.lines.map(l => "• " + l).join("\n") : s.lines.join("\n"); }
function nbClick(e) {
  const t = e.target;
  const fb = t.closest("[data-nbf]");
  if (fb) { nbFolder = fb.dataset.nbf; drawNotebook(); return; }
  if (t.dataset.nbren) {
    const nn = (prompt("New name for folder “" + nbFolder + "”:", nbFolder) || "").trim();
    if (nn && nn !== nbFolder && !S.folders.includes(nn)) { S.folders = S.folders.map(f => f === nbFolder ? nn : f); S.snips.forEach(s => { if (s.folder === nbFolder) s.folder = nn; }); nbFolder = nn; save(); drawNotebook(); }
  } else if (t.dataset.nbdel) {
    if (confirm("Delete folder “" + nbFolder + "”? Its snippets will move to General.")) { S.snips.forEach(s => { if (s.folder === nbFolder) s.folder = "General"; }); S.folders = S.folders.filter(f => f !== nbFolder); nbFolder = "All"; save(); drawNotebook(); }
  } else if (t.dataset.nbexp) {
    const items = S.snips.filter(s => nbFolder === "All" || s.folder === nbFolder);
    if (!items.length) return;
    let out = "VetNet notebook – " + (nbFolder === "All" ? "all folders" : nbFolder) + " – " + today() + "\n\n";
    S.folders.forEach(f => { const a = items.filter(s => s.folder === f); if (a.length) { out += "== " + f + " ==\n"; a.forEach(s => { out += snipText(s) + (s.src && T[s.src] ? "\n   (from: " + T[s.src].t + ")" : "") + "\n\n"; }); } });
    const blob = new Blob([out], { type: "text/plain" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "vetnet-notebook.txt"; a.click(); URL.revokeObjectURL(a.href);
  } else if (t.dataset.delsnip) {
    S.snips = S.snips.filter(s => String(s.id) !== t.dataset.delsnip); save(); drawNotebook();
  } else if (t.dataset.copy) {
    const s = S.snips.find(x => String(x.id) === t.dataset.copy);
    if (s) { try { navigator.clipboard.writeText(snipText(s)); t.textContent = "Copied ✓"; } catch (er) { t.textContent = "Copy not allowed"; } }
  } else if (t.dataset.edit) {
    const s = S.snips.find(x => String(x.id) === t.dataset.edit); if (!s) return;
    const card = t.closest(".snip");
    card.innerHTML = '<textarea rows="5" aria-label="Edit snippet">' + esc(s.kind === "bullets" ? s.lines.join("\n") : s.lines.join("\n")) + '</textarea><p class="meta">' + (s.kind === "bullets" ? "One bullet per line." : "Edit your note.") + '</p><div class="row"><button class="btn small" data-savesnip="' + s.id + '">Save</button><button class="btn small ghost" data-canceledit="1">Cancel</button></div>';
  } else if (t.dataset.savesnip) {
    const s = S.snips.find(x => String(x.id) === t.dataset.savesnip), v = t.closest(".snip").querySelector("textarea").value.trim();
    if (s && v) { s.lines = s.kind === "bullets" ? v.split(/\n+/).map(x => x.trim()).filter(Boolean) : [v]; save(); }
    drawNotebook();
  } else if (t.dataset.canceledit) drawNotebook();
}
function nbChange(e) {
  const m = e.target.closest("[data-move]");
  if (m) { const s = S.snips.find(x => String(x.id) === m.dataset.move); if (s) { s.folder = m.value; save(); drawNotebook(); } }
}
function nbSubmit(e) {
  if (e.target.id !== "nbAdd") return;
  e.preventDefault();
  const v = $("#nbNew").value.trim();
  if (v && !S.folders.includes(v)) { S.folders.push(v); save(); nbFolder = v; }
  drawNotebook();
}

/* ---------- quiz ---------- */
const Q = { filter: "", num: 10, pool: [], i: 0, score: 0, wrong: [], locked: false, opts: [] };
function mcqPool(f) {
  const out = [];
  TOPICS.forEach(t => { if (!t.q) return; if (f && f !== t.s && f !== t.id) return; t.q.forEach(m => out.push({ q: m[0], o: m[1], a: m[2], e: m[3], t: t.id })); });
  return out;
}
function renderQuiz(arg) {
  $("#qzSubj").innerHTML = '<option value="">All subjects (' + mcqPool("").length + ")</option>" + SUBJECTS.filter(s => mcqPool(s.id).length).map(s => '<option value="' + s.id + '">' + esc(s.name) + " (" + mcqPool(s.id).length + ")</option>").join("");
  $("#qzMsg").textContent = "";
  if (arg && (SUBJ[arg] || T[arg])) { startQuiz(arg); return; }
  $("#qzSetup").hidden = false; $("#qzPlay").hidden = true; $("#qzEnd").hidden = true;
}
function startQuiz(f, list, n) {
  Q.filter = f || "";
  let pool = shuffle(list || mcqPool(f));
  const num = n === undefined ? +$("#qzNum").value : n;
  if (num && !list) pool = pool.slice(0, num);
  Q.pool = pool; Q.i = 0; Q.score = 0; Q.wrong = [];
  if (!Q.pool.length) { $("#qzSetup").hidden = false; $("#qzPlay").hidden = true; $("#qzEnd").hidden = true; $("#qzMsg").textContent = "No questions available for that choice yet."; return; }
  $("#qzSetup").hidden = true; $("#qzEnd").hidden = true; $("#qzPlay").hidden = false;
  showQ();
}
function showQ() {
  const q = Q.pool[Q.i];
  Q.opts = shuffle(q.o.map((t, k) => ({ t: t, ok: k === q.a }))); Q.locked = false;
  $("#qzPlay").innerHTML = '<p class="meta">Question ' + (Q.i + 1) + " of " + Q.pool.length + " · Score " + Q.score + " · " + esc(SUBJ[T[q.t].s].name) + "</p><h2>" + esc(q.q) + '</h2><div class="opts">' + Q.opts.map((o, k) => '<button class="opt" data-k="' + k + '">' + esc(o.t) + "</button>").join("") + '</div><div id="qzFb"></div>';
}
function quizPlayClick(e) {
  const o = e.target.closest(".opt");
  if (o && !Q.locked) {
    Q.locked = true;
    const k = +o.dataset.k, q = Q.pool[Q.i], good = Q.opts[k].ok;
    $$("#qzPlay .opt").forEach((b, j) => { b.disabled = true; if (Q.opts[j].ok) b.classList.add("right"); else if (j === k) b.classList.add("wrong"); });
    if (good) Q.score++; else Q.wrong.push(q);
    $("#qzFb").innerHTML = '<p class="exp"><b>' + (good ? "Correct." : "Not quite.") + "</b> " + esc(q.e) + ' <a href="#reader/' + q.t + '">Read the topic</a></p><button class="btn" id="qzNext">' + (Q.i + 1 >= Q.pool.length ? "See results" : "Next question") + "</button>";
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
  else if (e.target.id === "qzAgain") startQuiz(Q.filter, null, Q.pool.length);
  else if (e.target.id === "qzNew") { $("#qzEnd").hidden = true; $("#qzSetup").hidden = false; }
}

/* ---------- exam prep ---------- */
let exType = "sa";
function renderExam() {
  if (!$("#exSubj").options.length) { $("#exSubj").innerHTML = subjOptions(false, true); fillExTopics(); }
  drawExam();
}
function fillExTopics() {
  const sid = $("#exSubj").value;
  $("#exTopic").innerHTML = '<option value="">All topics in this subject</option>' + ORDER[sid].map(id => '<option value="' + id + '">' + esc(T[id].t) + "</option>").join("");
}
function drawExam() {
  const sid = $("#exSubj").value, tid = $("#exTopic").value;
  const topics = (tid ? [tid] : ORDER[sid]).map(id => T[id]);
  let h = "";
  if (exType === "mcq") h = "<p>" + mcqCount(tid || sid) + ' practice questions are ready for this choice.</p><a class="btn" href="#quiz/' + (tid || sid) + '">Start MCQs</a>';
  else if (exType === "fc") h = "<p>" + topics.reduce((a, t) => a + t.f.length, 0) + ' flashcards for this choice, plus every other subject.</p><a class="btn" href="#flash">Open flashcards</a>';
  else if (exType === "def" || exType === "fill") {
    topics.forEach(t => {
      const items = (t.df || []).map(d => { const i = d.indexOf(":"); return [d.slice(0, i), d.slice(i + 1).trim()]; }).concat(t.f);
      h += "<h3>" + esc(t.t) + "</h3>";
      if (exType === "def") h += "<ul>" + items.map(x => "<li><b>" + esc(x[0]) + ":</b> " + esc(x[1]) + "</li>").join("") + "</ul>";
      else h += items.map((x, i) => '<div class="card fill" data-ans="' + esc(x[0].toLowerCase()) + '"><p>' + (i + 1) + ". ____ : " + esc(x[1]) + '</p><input type="text" placeholder="Type the term" aria-label="Your answer"><button class="btn small" data-chk="1">Check</button> <span class="meta fres"></span></div>').join("");
    });
  } else topics.forEach(t => {
    h += "<h3>" + esc(t.t) + "</h3>";
    if (exType === "sa") h += t.sa.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer</summary><p>" + esc(q[1]) + "</p></details>").join("");
    if (exType === "la") h += t.la.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer outline</summary><p>" + esc(q[1]) + "</p></details>").join("");
    if (exType === "rc") h += t.sa.concat(t.la).map(q => '<div class="card"><p><b>Q.</b> ' + esc(q[0]) + '</p><textarea rows="3" placeholder="Write your answer from memory first…" aria-label="Your answer"></textarea><details><summary>Compare with model answer</summary><p>' + esc(q[1]) + "</p></details></div>").join("");
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
  const d = [];
  TOPICS.forEach(t => { if (t.f && (!sid || sid === t.s)) t.f.forEach(c => d.push({ f: c[0], b: c[1], t: t.t })); });
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
    $("#gSubj").innerHTML = '<option value="">All subjects</option>' + SUBJECTS.filter(s => used.has(s.id)).map(s => '<option value="' + s.id + '">' + esc(s.name) + "</option>").join("");
    const letters = Array.from(new Set(GLOSS.map(g => g[0][0].toUpperCase()))).sort();
    $("#gLetters").innerHTML = '<button data-l="" class="on">All</button>' + letters.map(l => '<button data-l="' + l + '">' + l + "</button>").join("");
  }
  drawGlossary();
}
function drawGlossary() {
  const q = $("#gSearch").value.trim().toLowerCase(), sid = $("#gSubj").value;
  const list = GLOSS.filter(g => (!sid || g[1] === sid) && (!gLetter || g[0][0].toUpperCase() === gLetter) && (!q || (g[0] + " " + g[2]).toLowerCase().includes(q)));
  $("#gCount").textContent = list.length + " of " + GLOSS.length + " terms";
  $("#gList").innerHTML = list.length ? list.map(g => '<div class="card term"><div><h3 style="margin:0">' + esc(g[0]) + ' <span class="tag">' + esc(SUBJ[g[1]] ? SUBJ[g[1]].name : g[1]) + "</span></h3><p>" + esc(g[2]) + '</p></div><button class="star" data-g="' + esc(g[0]) + '" aria-label="Bookmark ' + esc(g[0]) + '">' + (S.gbm.includes(g[0]) ? "★" : "☆") + "</button></div>").join("") : '<p class="empty">No term matches.</p>';
}

/* ---------- planner ---------- */
let pFilter = "all";
function renderPlanner() {
  if (!$("#pSubj").options.length) $("#pSubj").innerHTML = '<option value="">General</option>' + SUBJECTS.map(s => '<option value="' + s.id + '">' + esc(s.name) + "</option>").join("");
  drawPlanner();
}
function drawPlanner() {
  let list = S.tasks.slice().sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
  if (pFilter === "pending") list = list.filter(x => !x.done);
  if (pFilter === "done") list = list.filter(x => x.done);
  if (!S.tasks.length) { $("#pList").innerHTML = '<p class="empty">No study tasks yet. Add your first one above, for example "Revise bone classification".</p>'; return; }
  if (!list.length) { $("#pList").innerHTML = '<p class="empty">Nothing in this view.</p>'; return; }
  $("#pList").innerHTML = list.map(x => '<div class="card task row ' + (x.done ? "done" : "") + '"><label class="chk"><input type="checkbox" data-t="' + x.id + '"' + (x.done ? " checked" : "") + ' aria-label="Completed"><span class="txt">' + esc(x.text) + '</span></label><span class="tag">' + (SUBJ[x.subj] ? esc(SUBJ[x.subj].name) : "General") + "</span>" + (x.due ? '<span class="meta ' + (!x.done && x.due < today() ? "late" : "") + '">Due ' + x.due + "</span>" : "") + '<button class="btn small ghost" data-del="' + x.id + '">Delete</button></div>').join("");
}

/* ---------- my space ---------- */
function renderSpace() {
  const nids = Object.keys(S.notes).filter(id => T[id]);
  let h = "<h1>My Space</h1>";
  h += '<p class="notice">Everything here is saved only in this browser on this device. It does not sync to your other devices. Clearing browser data will erase it, so download a backup now and then.</p>';
  h += '<div class="card"><h2>Notebook</h2><p>' + S.snips.length + " snippets in " + S.folders.length + ' folders.</p><a class="btn small" href="#notebook">Open notebook</a></div>';
  h += '<div class="card"><h2>Quick topic notes</h2>' + (nids.length ? '<ul class="list">' + nids.map(id => "<li><span>" + tLink(id) + '<br><span class="meta">' + esc(S.notes[id].slice(0, 120)) + '</span></span><span><a class="btn small ghost" href="#reader/' + id + '">Edit</a> <button class="btn small ghost" data-delnote="' + id + '">Delete</button></span></li>').join("") + "</ul>" : '<p class="empty">No quick notes yet.</p>') + "</div>";
  h += '<div class="card"><h2>Bookmarked topics</h2>' + (S.bm.filter(id => T[id]).length ? '<ul class="list">' + S.bm.filter(id => T[id]).map(id => "<li>" + tLink(id) + '<button class="btn small ghost" data-ubm="' + id + '">Remove</button></li>').join("") + "</ul>" : '<p class="empty">No bookmarked topics.</p>') + "</div>";
  h += '<div class="card"><h2>Bookmarked glossary terms</h2>' + (S.gbm.length ? '<ul class="list">' + S.gbm.map(g => { const e = GLOSS.find(x => x[0] === g); return e ? "<li><span><b>" + esc(e[0]) + "</b>: " + esc(e[2]) + '</span><button class="btn small ghost" data-ugb="' + esc(g) + '">Remove</button></li>' : ""; }).join("") + "</ul>" : '<p class="empty">No bookmarked terms.</p>') + "</div>";
  h += '<div class="card"><h2>Recently opened</h2>' + (S.recent.filter(id => T[id]).length ? '<ul class="list">' + S.recent.filter(id => T[id]).map(id => "<li>" + tLink(id) + "</li>").join("") + "</ul>" : '<p class="empty">Nothing opened yet.</p>') + "</div>";
  h += '<div class="card"><h2>Backup and restore</h2><p class="meta">Downloads your notebook, notes, bookmarks, tasks and progress as one file. You can load it back on another device.</p><div class="row"><button class="btn" id="exportBtn">Download backup</button><label class="btn ghost" style="margin:0">Restore backup<input id="importFile" type="file" accept=".json,application/json" hidden></label></div><p id="bkMsg" class="meta"></p></div>';
  $("#spaceView").innerHTML = h;
}

/* ---------- internship ---------- */
function renderIntern() { $$("input[data-chk]").forEach(c => c.checked = !!S.chk[c.dataset.chk]); drawLogs(); }
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
  $("#subGrid").addEventListener("change", e => { const s = e.target.closest("select[data-pin]"); if (!s) return; S.pins[s.dataset.pin] = s.value; save(); });

  const rd = $("#reader"); rd.addEventListener("click", readerClick); rd.addEventListener("input", readerInput);

  const nb = $("#nbView");
  nb.addEventListener("click", nbClick); nb.addEventListener("change", nbChange); nb.addEventListener("submit", nbSubmit);
  nb.addEventListener("input", e => { if (e.target.id === "nbSearch") { nbQ = e.target.value.trim().toLowerCase(); const pos = e.target.selectionStart; drawNotebook(); const el = $("#nbSearch"); el.focus(); el.setSelectionRange(pos, pos); } });

  $("#selBar").addEventListener("mousedown", e => e.preventDefault());
  $("#selSave").addEventListener("click", openModal);
  $("#mSave").addEventListener("click", saveSnip);
  $("#mCancel").addEventListener("click", () => { $("#modal").hidden = true; });
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") $("#modal").hidden = true; });

  $("#qzStart").addEventListener("click", () => startQuiz($("#qzSubj").value));
  $("#qzPlay").addEventListener("click", quizPlayClick);
  $("#qzEnd").addEventListener("click", quizEndClick);

  $("#exSubj").addEventListener("change", () => { fillExTopics(); drawExam(); });
  $("#exTopic").addEventListener("change", drawExam);
  $("#exOut").addEventListener("click", e => { const b = e.target.closest("[data-chk]"); if (!b) return; const c = b.closest(".fill"), v = $("input", c).value.trim().toLowerCase(), a = c.dataset.ans, r = $(".fres", c); const ok = v && (a === v || a.includes(v) && v.length > 3 || v.includes(a)); r.textContent = ok ? "Correct: " + a : "Not quite. Answer: " + a; r.style.color = ok ? "#1f7a4d" : "#b4572b"; });
  $("#exTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; exType = b.dataset.type; $$("#exTabs button").forEach(x => x.classList.toggle("on", x === b)); drawExam(); });

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
  $("#pList").addEventListener("click", e => { const d = e.target.closest("[data-del]"); if (d) { S.tasks = S.tasks.filter(x => String(x.id) !== d.dataset.del); save(); drawPlanner(); } });
  $("#pList").addEventListener("change", e => { const c = e.target.closest("[data-t]"); if (!c) return; const t = S.tasks.find(x => String(x.id) === c.dataset.t); if (t) { t.done = c.checked; save(); drawPlanner(); } });

  $("#spaceView").addEventListener("click", e => {
    const t = e.target;
    if (t.dataset.delnote) { delete S.notes[t.dataset.delnote]; save(); renderSpace(); }
    else if (t.dataset.ubm) { S.bm = S.bm.filter(x => x !== t.dataset.ubm); save(); renderSpace(); }
    else if (t.dataset.ugb) { S.gbm = S.gbm.filter(x => x !== t.dataset.ugb); save(); renderSpace(); }
    else if (t.id === "exportBtn") {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "vetnet-backup.json"; a.click(); URL.revokeObjectURL(a.href);
    }
  });
  $("#spaceView").addEventListener("change", e => {
    if (e.target.id !== "importFile" || !e.target.files[0]) return;
    const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); if (typeof d !== "object" || !d) throw 0; Object.assign(S, d); save(); renderSpace(); $("#bkMsg").textContent = "Backup restored."; } catch (er) { $("#bkMsg").textContent = "That file could not be read as a VetNet backup."; } };
    r.readAsText(e.target.files[0]);
  });

  $("#logForm").addEventListener("submit", e => { e.preventDefault(); const v = $("#logText").value.trim(); if (!v) return; S.logs.unshift({ date: today(), text: v }); save(); $("#logText").value = ""; drawLogs(); });
  $("#logList").addEventListener("click", e => { const b = e.target.closest("[data-dl]"); if (!b) return; S.logs.splice(+b.dataset.dl, 1); save(); drawLogs(); });
  $$("input[data-chk]").forEach(c => c.addEventListener("change", () => { S.chk[c.dataset.chk] = c.checked; save(); }));

  window.addEventListener("scroll", () => {
    const bar = $("#progress span");
    if (!$("#page-reader").classList.contains("active")) { bar.style.width = "0"; return; }
    const el = document.documentElement, p = el.scrollTop / ((el.scrollHeight - el.clientHeight) || 1);
    bar.style.width = Math.min(100, Math.round(p * 100)) + "%";
  }, { passive: true });
  window.addEventListener("keydown", e => { if (e.key === "Escape") { document.body.classList.remove("focus"); $("#modal").hidden = true; } });
  window.addEventListener("hashchange", route);
  route();
}
init();