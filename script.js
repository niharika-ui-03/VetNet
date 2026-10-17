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
  { id: "anat", name: "Veterinary Anatomy", icon: "ðŸ¦´", blurb: "How the animal body is built, from bones to organs." },
  { id: "phys", name: "Veterinary Physiology", icon: "ðŸ«€", blurb: "How the body works: blood, heart, kidney, digestion, hormones." },
  { id: "bioc", name: "Veterinary Biochemistry", icon: "ðŸ§ª", blurb: "Biomolecules, enzymes, metabolism and clinical chemistry." },
  { id: "pharm", name: "Veterinary Pharmacology and Toxicology", icon: "ðŸ’Š", blurb: "How drugs and poisons act on animals (theory only)." },
  { id: "micro", name: "Veterinary Microbiology", icon: "ðŸ¦ ", blurb: "Bacteria, viruses, fungi, immunity and control." },
  { id: "para", name: "Veterinary Parasitology", icon: "ðŸª±", blurb: "Helminths, protozoa, arthropods and their control." },
  { id: "path", name: "Veterinary Pathology", icon: "ðŸ”¬", blurb: "What disease does to cells, tissues and organs." },
  { id: "nutr", name: "Animal Nutrition", icon: "ðŸŒ¾", blurb: "Nutrients, feeds, rations and feeding of livestock." },
  { id: "pubh", name: "Veterinary Public Health and Epidemiology", icon: "ðŸŒ", blurb: "Zoonoses, food safety, disease investigation." },
  { id: "gen", name: "Animal Genetics and Breeding", icon: "ðŸ§¬", blurb: "Inheritance, selection and breeding systems." },
  { id: "lpm", name: "Livestock Production Management", icon: "ðŸ„", blurb: "Housing, herd, flock and poultry management." },
  { id: "lpt", name: "Livestock Products Technology", icon: "ðŸ¥›", blurb: "Milk, meat, eggs and their processing." },
  { id: "gyn", name: "Veterinary Gynaecology and Obstetrics", icon: "ðŸ£", blurb: "Reproduction, pregnancy, parturition and its problems." },
  { id: "surg", name: "Veterinary Surgery and Radiology", icon: "ðŸ©¹", blurb: "Surgical principles, wounds, anaesthesia, imaging." },
  { id: "med", name: "Veterinary Medicine", icon: "ðŸ©º", blurb: "Diseases of animals, system by system." },
  { id: "ext", name: "Veterinary and Animal Husbandry Extension Education", icon: "ðŸ“¢", blurb: "Taking knowledge to farmers, communication, programmes." },
  { id: "clin", name: "Veterinary Clinical Practice", icon: "ðŸ¥", blurb: "Clinical examination, diagnosis, records, ethics." },
  { id: "farm", name: "Livestock Farm Practices", icon: "ðŸšœ", blurb: "Hands-on farm routines, records and biosecurity." }
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
unit("anat", "Unit 1 â€“ Getting started");
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

unit("anat", "Unit 2 â€“ Skeleton, joints, muscles");
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

unit("anat", "Unit 3 â€“ Organ systems");
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
unit("phys", "Unit 1 â€“ Basic concepts");
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

unit("phys", "Unit 2 â€“ Blood and circulation");
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

unit("phys", "Unit 3 â€“ Other systems");
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
unit("bioc", "Unit 1 â€“ Biomolecules");
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

unit("bioc", "Unit 2 â€“ Enzymes, vitamins and metabolism");
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
unit("pharm", "Unit 1 â€“ General pharmacology");
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
unit("micro", "Unit 1 â€“ General microbiology");
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

unit("micro", "Unit 2 â€“ Control and immunity");
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
unit("para", "Unit 1 â€“ Basics");
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

unit("para", "Unit 2 â€“ Arthropods and control");
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
unit("path", "Unit 1 â€“ General pathology");
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

unit("path", "Unit 2 â€“ Inflammation, repair and growth");
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
unit("nutr", "Unit 1 â€“ Nutrient basics");
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

unit("nutr", "Unit 2 â€“ Feeding practice");
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
unit("pubh", "Unit 1 â€“ Public health and epidemiology");
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
unit("gen", "Unit 1 â€“ Genetics basics");
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

unit("gen", "Unit 2 â€“ Breeding methods");
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
unit("lpm", "Unit 1 â€“ Cattle and buffalo");
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

unit("lpm", "Unit 2 â€“ Small ruminants, pigs, poultry");
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
unit("lpt", "Unit 1 â€“ Milk and meat");
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

unit("lpt", "Unit 2 â€“ Eggs and other products");
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
unit("gyn", "Unit 1 â€“ Reproduction basics");
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

unit("gyn", "Unit 2 â€“ Parturition and its problems");
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
unit("surg", "Unit 1 â€“ Principles of surgery");
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

unit("surg", "Unit 2 â€“ Common conditions and imaging");
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
unit("med", "Unit 1 â€“ Principles of medicine");
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

unit("med", "Unit 2 â€“ Diseases by system");
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
unit("ext", "Unit 1 â€“ Extension basics");
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
unit("clin", "Unit 1 â€“ Clinical skills");
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
unit("farm", "Unit 1 â€“ On the farm");
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
"Cost of production|farm|Total cost divided by output, for example per litre of milk."
];
const GLOSS = GLOSS_RAW.map(l => { const p = l.split("|"); return [p[0], p[1], p.slice(2).join("|")]; }).sort((a, b) => a[0].localeCompare(b[0]));
/* ================= ENGINE ================= */
const KEY = "VetNet_state_v2";
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
  $("#stats").textContent = TOPICS.length + " study topics Â· " + nQ + " practice MCQs Â· " + nF + " flashcards Â· " + GLOSS.length + " glossary terms Â· 18 subjects";
  const last = S.last && T[S.last] ? S.last : null;
  $("#hContinue").innerHTML = last ? "<p>" + tLink(last) + '<br><span class="meta">' + esc(SUBJ[T[last].s].name) + '</span></p><a class="btn small" href="#reader/' + last + '">Continue</a>' : '<p class="empty">Nothing yet. Open a subject and start with any topic.</p><a class="btn small" href="#subjects">Browse subjects</a>';
  $("#readBtn").setAttribute("href", "#reader/" + (last || "anat1"));
  const list = (ids, empty) => { ids = ids.filter(id => T[id]); return ids.length ? '<ul class="list">' + ids.slice(0, 5).map(id => "<li>" + tLink(id) + "</li>").join("") + "</ul>" : '<p class="empty">' + empty + "</p>"; };
  $("#hRecent").innerHTML = list(S.recent, "Topics you open will show up here.");
  $("#hBook").innerHTML = list(S.bm, "Tap â˜† Bookmark inside any topic.");
  const dn = S.done.filter(id => T[id]);
  $("#hDone").innerHTML = dn.length ? "<p><b>" + dn.length + "</b> completed</p>" + list(dn, "") : '<p class="empty">Mark a topic as completed when you finish it.</p>';
  const td = S.tasks.filter(x => x.due === today() && !x.done);
  $("#hTasks").innerHTML = td.length ? '<ul class="list">' + td.map(x => "<li>" + esc(x.text) + "</li>").join("") + "</ul>" : '<p class="empty">No tasks due today.</p><a class="btn small ghost" href="#planner">Open planner</a>';
  $("#hNote").innerHTML = S.snips.length ? "<p><b>" + S.snips.length + "</b> saved snippets in " + S.folders.length + ' folder(s)</p><a class="btn small" href="#notebook">Open notebook</a>' : '<p class="empty">Select any text while reading and save it here.</p><a class="btn small ghost" href="#notebook">Open notebook</a>';
}

/* ---------- subjects ---------- */
let yearTab = "all";
const YEARS = [["all", "All subjects"], ["y1", "Year 1"], ["y2", "Year 2"], ["y3", "Year 3"], ["y4", "Year 4"], ["int", "Internship"]];
function renderSubjects() {
  $("#yearTabs").innerHTML = YEARS.map(y => '<button data-y="' + y[0] + '" class="' + (y[0] === yearTab ? "on" : "") + '">' + y[1] + "</button>").join("");
  drawSubjects(); drawTopicSearch();
}
function drawSubjects() {
  const q = $("#subSearch").value.trim().toLowerCase();
  let list = SUBJECTS.filter(s => (s.name + " " + s.blurb).toLowerCase().includes(q));
  if (yearTab !== "all") list = list.filter(s => S.pins[s.id] === yearTab);
  if (!list.length) { $("#subGrid").innerHTML = '<p class="empty">' + (yearTab !== "all" ? "No subjects pinned to this year yet. Go to 'All subjects' and use 'Pin to year' on a card. Placement differs between syllabus versions, so you decide." : "No subject matches your search.") + "</p>"; return; }
  $("#subGrid").innerHTML = list.map(s => {
    const n = ORDER[s.id].length, left = PLANNED[s.id].length;
    return '<article class="card subj-card"><div class="icon">' + s.icon + "</div><h3>" + esc(s.name) + '</h3><p class="meta">' + esc(s.blurb) + '</p><span class="tag">' + n + " topics written</span>" + (left ? '<span class="tag off">' + left + " more planned</span>" : "") + '<div class="row"><a class="btn small" href="#subject/' + s.id + '">Open</a></div><label class="meta">Pin to year<select data-pin="' + s.id + '"><option value="">General library</option>' + YEARS.slice(1).map(y => '<option value="' + y[0] + '"' + (S.pins[s.id] === y[0] ? " selected" : "") + ">" + y[1] + "</option>").join("") + "</select></label></article>";
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
  let h = '<nav class="crumbs"><a href="#subjects">Subjects</a> â€º ' + esc(s.name) + "</nav><h1>" + s.icon + " " + esc(s.name) + "</h1><p>" + esc(s.blurb) + '</p><p class="notice">Study modules written as learning aids, not the complete official syllabus. Please verify the curriculum and examination requirements against your current college syllabus.</p>';
  const doneN = ORDER[sid].filter(id => S.done.includes(id)).length;
  h += '<p class="meta">' + ORDER[sid].length + " topics Â· " + doneN + " completed by you Â· " + mcqCount(sid) + ' practice MCQs</p><div class="row"><a class="btn" href="#reader/' + ORDER[sid][0] + '">Start from topic 1</a><a class="btn ghost" href="#quiz/' + sid + '">Practise MCQs</a><a class="btn ghost" href="#exam">Exam prep</a></div>';
  UNITS[sid].forEach(u => {
    h += '<div class="card"><h3>' + esc(u[0]) + '</h3><ul class="list">' + u[1].map(id => { const t = T[id]; return "<li><span>" + (S.done.includes(id) ? '<span class="ok">âœ“</span> ' : "") + (S.bm.includes(id) ? "â˜… " : "") + tLink(id) + '</span><span class="meta">' + mins(t) + " min read Â· " + t.q.length + " MCQs</span></li>"; }).join("") + "</ul></div>";
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
  h += '<nav class="crumbs"><a href="#subjects">Subjects</a> â€º <a href="#subject/' + t.s + '">' + esc(SUBJ[t.s].name) + "</a> â€º " + esc(t.t) + "</nav><h1>" + esc(t.t) + '</h1><p class="meta">' + SUBJ[t.s].icon + " " + esc(SUBJ[t.s].name) + " Â· about " + mins(t) + " min read Â· study aid, not the official syllabus</p>";
  h += '<div class="tools no-focus"><button data-act="simple" class="' + (S.mode === "simple" ? "on" : "") + '">Explain it simply</button><button data-act="detail" class="' + (S.mode === "detail" ? "on" : "") + '">Detailed notes</button><button data-act="fsdown" aria-label="Smaller text">Aâˆ’</button><button data-act="fsup" aria-label="Larger text">A+</button><button data-act="focus">Focus mode</button><button data-act="bm">' + (S.bm.includes(id) ? "â˜… Bookmarked" : "â˜† Bookmark") + '</button><button data-act="done">' + (S.done.includes(id) ? "âœ“ Completed" : "Mark completed") + '</button><input id="inTopic" type="search" placeholder="Search in this topicâ€¦" aria-label="Search in this topic"></div><p id="inMsg" class="meta"></p>';
  h += '<p class="meta no-focus">Tip: select any sentence or paragraph below and tap "Save to notebook" to keep it in your own folder.</p>';
  h += '<div class="body">';
  h += sec("Introduction", "<p>" + esc(t.i) + "</p>");
  if (S.mode === "simple") {
    h += sec("Explained simply", "<p>" + esc(t.s) + "</p>");
    h += sec("Go a little deeper (full notes)", t.n.map(x => "<h3>" + esc(x[0]) + "</h3>" + rich(x[1])).join(""));
  } else {
    h += sec("In simple words first", "<p>" + esc(t.s) + "</p>", false);
    t.n.forEach(x => { h += sec(x[0], rich(x[1])); });
  }
  if (t.tb) h += sec("Comparison table", tbl(t.tb));
  h += sec("Important examination points", ul(t.k));
  h += sec("Common misconceptions", ul(t.m));
  h += sec("Short-answer questions (practice)", t.sa.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer</summary><p>" + esc(q[1]) + "</p></details>").join(""), false);
  h += sec("Long-answer questions (practice)", t.la.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer outline</summary><p>" + esc(q[1]) + "</p></details>").join(""), false);
  h += sec("MCQs (practice)", t.q.map((m, i) => '<div class="mcq" data-i="' + i + '"><p><b>' + (i + 1) + ".</b> " + esc(m[0]) + "</p>" + shuffle(m[1].map((o, k) => [o, k])).map(ok => '<button class="opt" data-k="' + ok[1] + '">' + esc(ok[0]) + "</button>").join("") + '<p class="exp" hidden><b>Answer:</b> ' + esc(m[1][m[2]]) + ". " + esc(m[3]) + "</p></div>").join(""), false);
  h += sec("Flashcards (tap to flip)", t.f.map(f => '<button class="fc"><span class="f">' + esc(f[0]) + '</span><span class="b" hidden>' + esc(f[1]) + "</span></button>").join(""), false);
  h += sec("Quick revision summary", ul(t.k.slice(0, 4).concat(t.f.map(f => f[0] + ": " + f[1]))), false);
  if (t.d && t.d.length) h += sec("Keep exploring (this topic has more than this page)", "<p class='meta'>No topic is ever finished. Here is where to go next:</p>" + ul(t.d));
  const rel = related(t);
  if (rel.length) h += sec("Related topics", "<ul>" + rel.map(r => "<li>" + tLink(r) + ' <span class="meta">(' + esc(SUBJ[T[r].s].name) + ")</span></li>").join("") + "</ul>");
  h += "</div>";
  h += '<details class="sec" open><summary>My quick note for this topic (saved on this device)</summary><div class="secbody"><textarea id="noteBox" rows="4" placeholder="Write your own noteâ€¦" aria-label="My note">' + esc(S.notes[id] || "") + '</textarea><div class="row"><button class="btn small" data-act="savenote">Save note</button><button class="btn small ghost" data-act="delnote">Delete note</button><span id="noteMsg" class="meta"></span></div><p class="meta">Notes stay in this browser only. They do not sync to other devices.</p></div></details>';
  h += '<div class="nav2 no-focus">' + (prev ? '<a class="btn ghost" href="#reader/' + prev + '">â† ' + esc(T[prev].t) + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="#reader/' + next + '">' + esc(T[next].t) + " â†’</a>" : "<span></span>") + "</div>";
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
  else if (a === "bm") { S.bm = S.bm.includes(curId) ? S.bm.filter(x => x !== curId) : S.bm.concat(curId); save(); b.textContent = S.bm.includes(curId) ? "â˜… Bookmarked" : "â˜† Bookmark"; }
  else if (a === "done") { S.done = S.done.includes(curId) ? S.done.filter(x => x !== curId) : S.done.concat(curId); save(); b.textContent = S.done.includes(curId) ? "âœ“ Completed" : "Mark completed"; }
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
  $("#selTxt").textContent = "â€œ" + (txt.length > 70 ? txt.slice(0, 70) + "â€¦" : txt) + "â€";
  $("#selBar").hidden = false;
}
let selTimer = null;
document.addEventListener("selectionchange", () => { clearTimeout(selTimer); selTimer = setTimeout(checkSel, 250); });
function toBullets(text) {
  let parts = text.split(/\n+/).map(x => x.replace(/^[-â€¢*\d.)\s]+/, "").trim()).filter(Boolean);
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
  $("#selTxt").textContent = "Saved to â€œ" + folder + "â€ âœ“"; $("#selBar").hidden = false; $("#selSave").hidden = true;
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
  ["All"].concat(S.folders).forEach(f => { h += '<button data-nbf="' + esc(f) + '" class="' + (f === nbFolder ? "on" : "") + '">' + (f === "All" ? "ðŸ“š All snippets" : "ðŸ“ " + esc(f)) + " (" + cnt(f) + ")</button>"; });
  h += '</div><form id="nbAdd" class="row"><input id="nbNew" type="text" placeholder="New folder nameâ€¦" aria-label="New folder name"><button class="btn small" type="submit">Add folder</button></form>';
  if (nbFolder !== "All") h += '<div class="row"><button class="btn small ghost" data-nbren="1">Rename folder</button>' + (nbFolder !== "General" ? '<button class="btn small ghost" data-nbdel="1">Delete folder</button>' : "") + '<button class="btn small ghost" data-nbexp="1">Download folder (.txt)</button></div>';
  else h += '<div class="row"><button class="btn small ghost" data-nbexp="1">Download everything (.txt)</button></div>';
  h += '</aside><section><div class="row"><input id="nbSearch" type="search" placeholder="Search my notebookâ€¦" value="' + esc(nbQ) + '" aria-label="Search notebook"></div>';
  if (!list.length) h += '<p class="empty">' + (S.snips.length ? "Nothing matches here." : "Your notebook is empty. Open any topic, select a sentence, and save it.") + "</p>";
  list.forEach(s => {
    const body = s.kind === "bullets" ? "<ul>" + s.lines.map(l => "<li>" + esc(l) + "</li>").join("") + "</ul>" : "<p>" + esc(s.lines.join("\n")).replace(/\n/g, "<br>") + "</p>";
    h += '<div class="snip" data-id="' + s.id + '">' + body + '<p class="src">ðŸ“ ' + esc(s.folder) + " Â· " + s.date + (s.src && T[s.src] ? ' Â· from <a href="#reader/' + s.src + '">' + esc(T[s.src].t) + "</a>" : "") + '</p><div class="row"><button class="btn small ghost" data-edit="' + s.id + '">Edit</button><select data-move="' + s.id + '" aria-label="Move to folder">' + S.folders.map(f => "<option" + (f === s.folder ? " selected" : "") + ">" + esc(f) + "</option>").join("") + '</select><button class="btn small ghost" data-copy="' + s.id + '">Copy</button><button class="btn small ghost" data-delsnip="' + s.id + '">Delete</button></div></div>';
  });
  h += "</section></div>";
  box.innerHTML = h;
}
function snipText(s) { return s.kind === "bullets" ? s.lines.map(l => "â€¢ " + l).join("\n") : s.lines.join("\n"); }
function nbClick(e) {
  const t = e.target;
  const fb = t.closest("[data-nbf]");
  if (fb) { nbFolder = fb.dataset.nbf; drawNotebook(); return; }
  if (t.dataset.nbren) {
    const nn = (prompt("New name for folder â€œ" + nbFolder + "â€:", nbFolder) || "").trim();
    if (nn && nn !== nbFolder && !S.folders.includes(nn)) { S.folders = S.folders.map(f => f === nbFolder ? nn : f); S.snips.forEach(s => { if (s.folder === nbFolder) s.folder = nn; }); nbFolder = nn; save(); drawNotebook(); }
  } else if (t.dataset.nbdel) {
    if (confirm("Delete folder â€œ" + nbFolder + "â€? Its snippets will move to General.")) { S.snips.forEach(s => { if (s.folder === nbFolder) s.folder = "General"; }); S.folders = S.folders.filter(f => f !== nbFolder); nbFolder = "All"; save(); drawNotebook(); }
  } else if (t.dataset.nbexp) {
    const items = S.snips.filter(s => nbFolder === "All" || s.folder === nbFolder);
    if (!items.length) return;
    let out = "VetNet notebook â€“ " + (nbFolder === "All" ? "all folders" : nbFolder) + " â€“ " + today() + "\n\n";
    S.folders.forEach(f => { const a = items.filter(s => s.folder === f); if (a.length) { out += "== " + f + " ==\n"; a.forEach(s => { out += snipText(s) + (s.src && T[s.src] ? "\n   (from: " + T[s.src].t + ")" : "") + "\n\n"; }); } });
    const blob = new Blob([out], { type: "text/plain" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "VetNet-notebook.txt"; a.click(); URL.revokeObjectURL(a.href);
  } else if (t.dataset.delsnip) {
    S.snips = S.snips.filter(s => String(s.id) !== t.dataset.delsnip); save(); drawNotebook();
  } else if (t.dataset.copy) {
    const s = S.snips.find(x => String(x.id) === t.dataset.copy);
    if (s) { try { navigator.clipboard.writeText(snipText(s)); t.textContent = "Copied âœ“"; } catch (er) { t.textContent = "Copy not allowed"; } }
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
  $("#qzPlay").innerHTML = '<p class="meta">Question ' + (Q.i + 1) + " of " + Q.pool.length + " Â· Score " + Q.score + " Â· " + esc(SUBJ[T[q.t].s].name) + "</p><h2>" + esc(q.q) + '</h2><div class="opts">' + Q.opts.map((o, k) => '<button class="opt" data-k="' + k + '">' + esc(o.t) + "</button>").join("") + '</div><div id="qzFb"></div>';
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
  else topics.forEach(t => {
    h += "<h3>" + esc(t.t) + "</h3>";
    if (exType === "sa") h += t.sa.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer</summary><p>" + esc(q[1]) + "</p></details>").join("");
    if (exType === "la") h += t.la.map(q => "<p><b>Q.</b> " + esc(q[0]) + "</p><details><summary>Show answer outline</summary><p>" + esc(q[1]) + "</p></details>").join("");
    if (exType === "rc") h += t.sa.concat(t.la).map(q => '<div class="card"><p><b>Q.</b> ' + esc(q[0]) + '</p><textarea rows="3" placeholder="Write your answer from memory firstâ€¦" aria-label="Your answer"></textarea><details><summary>Compare with model answer</summary><p>' + esc(q[1]) + "</p></details></div>").join("");
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
  $("#flCount").textContent = (F.i + 1) + " / " + F.deck.length + " Â· " + c.t;
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
  $("#gList").innerHTML = list.length ? list.map(g => '<div class="card term"><div><h3 style="margin:0">' + esc(g[0]) + ' <span class="tag">' + esc(SUBJ[g[1]] ? SUBJ[g[1]].name : g[1]) + "</span></h3><p>" + esc(g[2]) + '</p></div><button class="star" data-g="' + esc(g[0]) + '" aria-label="Bookmark ' + esc(g[0]) + '">' + (S.gbm.includes(g[0]) ? "â˜…" : "â˜†") + "</button></div>").join("") : '<p class="empty">No term matches.</p>';
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
  $("#subGrid").addEventListener("change", e => { const s = e.target.closest("select[data-pin]"); if (!s) return; if (s.value) S.pins[s.dataset.pin] = s.value; else delete S.pins[s.dataset.pin]; save(); });

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
  $("#exTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; exType = b.dataset.type; $$("#exTabs button").forEach(x => x.classList.toggle("on", x === b)); drawExam(); });

  $("#flSubj").addEventListener("change", () => buildDeck(false));
  $("#flShuffle").addEventListener("click", () => buildDeck(true));
  $("#flCard").addEventListener("click", () => { F.back = !F.back; drawCard(); });
  $("#flNext").addEventListener("click", () => { if (F.deck.length) { F.i = (F.i + 1) % F.deck.length; F.back = false; drawCard(); } });
  $("#flPrev").addEventListener("click", () => { if (F.deck.length) { F.i = (F.i - 1 + F.deck.length) % F.deck.length; F.back = false; drawCard(); } });

  $("#gSearch").addEventListener("input", drawGlossary);
  $("#gSubj").addEventListener("change", drawGlossary);
  $("#gLetters").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; gLetter = b.dataset.l; $$("#gLetters button").forEach(x => x.classList.toggle("on", x === b)); drawGlossary(); });
  $("#gList").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (!b) return; const g = b.dataset.g; S.gbm = S.gbm.includes(g) ? S.gbm.filter(x => x !== g) : S.gbm.concat(g); save(); b.textContent = S.gbm.includes(g) ? "â˜…" : "â˜†"; });

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
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "VetNet-backup.json"; a.click(); URL.revokeObjectURL(a.href);
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
