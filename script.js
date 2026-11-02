// ========================================================
// BROTHERHOOD 3D BIRTHDAY WEBAPP - THREE.JS ENGINE & LOGIC
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBrotherhood3D();
});

// App State & Data (Fixed for Arman)
const defaultData = {
  name: 'Arman',
  title: 'Mere Bhai • The Legend 👑',
  age: '24',
  sender: 'Aapka Chota Bhai',
  letter: `Sach bolu toh aap sirf mere bade bhai nahi ho, aap mere life ke pehle guide, mere dost aur mere sabse bade supporter ho. Bachpan me meri faltu galtiyon par daant lagane se lekar, papa ke gusse se bachane tak—aapne hamesha mera haath pakad kar sambhala hai.

Aapki mehnat, aapka sabr aur chahe kitni bhi mushkil situation ho, sab sambhal lene ka confidence mujhe har din inspire karta hai. Jab bhi mujhe lagta hai ki cheezein mushkil hain, bas ye soch kar himmat aa jaati hai ki mere peeche mera bada bhai khada hai.

Janamdin ki bohot bohot badhaiyan Arman Bhai! Bhagwan kare aapki life me sukoon, behtareen health aur wo har badi kamyabi mile jiske aap haqdaar ho. Chahe zindagi me kitne bhi utaar-chadhaav aayein, yaad rakhna aapka ye chota bhai hamesha aapke sath khada milega.`
};

const wishPresets = {
  classic: {
    title: 'Mere Hero & Guide',
    letter: `Sach bolu toh aap sirf mere bade bhai nahi ho, aap mere life ke pehle guide, mere dost aur mere sabse bade supporter ho. Bachpan me meri faltu galtiyon par daant lagane se lekar, papa ke gusse se bachane tak—aapne hamesha mera haath pakad kar sambhala hai.

Aapki mehnat, aapka sabr aur chahe kitni bhi mushkil situation ho, sab sambhal lene ka confidence mujhe har din inspire karta hai. Jab bhi mujhe lagta hai ki cheezein mushkil hain, bas ye soch kar himmat aa jaati hai ki mere peeche mera bada bhai khada hai.

Janamdin ki bohot bohot badhaiyan Bhaiya! Bhagwan kare aapki life me sukoon, behtareen health aur wo har badi kamyabi mile jiske aap haqdaar ho. Chahe zindagi me kitne bhi utaar-chadhaav aayein, yaad rakhna aapka ye chota bhai hamesha aapke sath khada milega.`
  },
  emotional: {
    title: 'Mera Sabse Bada Sahara',
    letter: `Pyare Bhaiya,

Bachpan se lekar aaj tak, maine hamesha aapko dekh kar seekha hai ki mushkilon se ladte kaise hain aur bina haar maane aage kaise badhte hain. Jab bhi main kisi cheez se pareshaan hota hoon, aapse do minute baat karke saari tension khatam ho jaati hai.

Aapne bina kisi shart ke hamesha mera saath diya hai, chahe zamana kuch bhi bole. Mere liye aapse bada inspiration koi nahi hai. Is naye saal me aapki saari adhuri khwahishein poori ho aur aapki zindagi me sirf khushiyan aur barkat rahein. Love you Bhaiya!`
  },
  roast: {
    title: 'Senior Gyaani & Boss',
    letter: `Janamdin Mubarak ho mere sabse pyare (aur thode se khadoos) Bade Bhai! 🎂

Aapko janamdin ki bohot saari badhaiyan! Waise toh aap mujhe TV ka remote nahi lene dete, meri baat pe bina sune 'chal ab zyaada gyan mat de' bolte ho, aur apne kaam mujhse karwate ho—par sach bolu toh aapse better bada bhai poori duniya me koi nahi ho sakta.

Bhagwan kare is saal aapka bank account full bhar jaye, stress zero rahe aur aap mujhe bina nakhre kiye achhi-achhi treats dete raho! Enjoy your day Bhaiya!`
  }
};

const toastQuotes = [
  "Bhaiya ke naam ek jaam! Jinhone har mushkil waqt me mera haath thama aur mujhe ladna sikhaya. Cheers Bhaiya! 🥂",
  "Us bade bhai ke naam, jinka hona hi mere liye sabse bada sukoon hai. Aap hamesha haste raho aur kamyabi ke naye records banao! 🥃",
  "Dua hai ki Bhaiya ki life me tension zero ho, khushiyan double ho aur sapne saare poore hon. Janamdin Mubarak mere Bhai! 🍾",
  "Duniya me dost bohot milte hain, par achha aur samajhdar bada bhai kismat walo ko milta hai. Cheers to the Real Hero! 👑",
  "Aane wala saal Bhaiya ke liye bohot saari tarakki, achhi sehat aur sukoon lekar aaye. Aapke sath har lamha khaas hai! 🥂"
];

let appData = { ...defaultData };
let toastCounter = 0;
let customPhotos = [];

// Three.js Globals
let scene, camera, renderer, controls;
let cakeGroup, giftBoxGroup, giftLid, toastGroup, glassLeft, glassRight;
let candleFlames = [];
let candleLights = [];
let floatingBalloons = [];
let memoryPlates = [];
let fireworkParticles = [];
let isCandlesLit = true;
let isGiftOpened = false;
let raycaster, mouse;
let currentView = 'cake';
let ambientLight, keySpot, fillLight, frontLight;
let currentTheme = 'ivory';
let currentPage = 'stage';

// ========================================================
// 1. MAIN INITIALIZATION
// ========================================================
function initBrotherhood3D() {
  loadData();
  initThreeEngine();
  build3DWorld();
  initRaycasting();
  initHUDNavigation();
  initActionDock();
  initSynthesizerAudio();
  initModals();
  initPosterLightbox();
  initThemeEngine();
  initPageNavigation();
  initHallOfFame();
  initArcadeGames();
  initBootstrapComponents();

  // Handle Resize
  window.addEventListener('resize', onWindowResize);

  // Initial Welcome Animation
  setTimeout(() => {
    trigger3DFireworks(0, 5, 0, 80);
    showToast(`${appData.name} ke Janamdin Ki Shandar Mehfil Me Swagat Hai! 👑`);
  }, 900);
}

// ========================================================
// 2. DATA HYDRATION (URL PARAMS & LOCAL STORAGE)
// ========================================================
function loadData() {
  const params = new URLSearchParams(window.location.search);
  const pName = params.get('name');
  const pTitle = params.get('title');
  const pAge = params.get('age');
  const pFrom = params.get('from');
  const pMsg = params.get('msg');

  // Arman is permanent and fixed
  appData = { ...defaultData };

  if (pName) appData.name = decodeURIComponent(pName);
  if (pTitle) appData.title = decodeURIComponent(pTitle);
  if (pAge) appData.age = decodeURIComponent(pAge);
  if (pFrom) appData.sender = decodeURIComponent(pFrom);
  if (pMsg) appData.letter = decodeURIComponent(pMsg);

  updateDOMTexts();
}

function updateDOMTexts() {
  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = appData.name;

  const letterName = document.getElementById('letter-name');
  if (letterName) letterName.textContent = appData.name;

  document.title = `Janamdin Mubarak, ${appData.name}! 🎂👑 | 3D Experience`;

  const initial = appData.name ? appData.name.trim().charAt(0).toUpperCase() : 'B';
  const navInit = document.getElementById('nav-initial');
  if (navInit) navInit.textContent = initial;
  const navDp = document.getElementById('nav-brand-dp');
  if (navDp) navDp.alt = `${appData.name} Bhai`;

  const titleTag = document.getElementById('hero-title-tag');
  if (titleTag) titleTag.textContent = appData.title || 'Mere Hero • Day-One Supporter';

  const agePill = document.getElementById('hero-age-pill');
  const ageSpan = document.getElementById('hero-age');
  if (agePill && ageSpan) {
    if (appData.age && appData.age.trim() !== '') {
      ageSpan.textContent = appData.age;
      agePill.style.display = 'inline-flex';
    } else {
      agePill.style.display = 'none';
    }
  }

  // Letter & signature
  const letterBody = document.getElementById('letter-body-content');
  if (letterBody && appData.letter) {
    letterBody.innerHTML = appData.letter
      .split('\n\n')
      .map(p => `<p>${escapeHTML(p)}</p>`)
      .join('');
  }
  const sig = document.getElementById('letter-signature');
  if (sig) sig.textContent = appData.sender || 'Aapka Chota Bhai';

  const dateEl = document.getElementById('letter-current-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

// ========================================================
// 3. THREE.JS 3D ENGINE & SCENE SETUP
// ========================================================
function initThreeEngine() {
  const container = document.getElementById('webgl-container');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf6f3eb);
  scene.fog = new THREE.FogExp2(0xf6f3eb, 0.016);

  // Camera (Cinematic Zoomed-Out Overview on Load)
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 4.4, 12.0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.02; // Can't go below floor
  controls.minDistance = 3.5;
  controls.maxDistance = 22;
  controls.target.set(0, 1.8, 0);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;

  // Lighting - Warm Daylight Studio Setup
  ambientLight = new THREE.AmbientLight(0xfff8ee, 1.85);
  scene.add(ambientLight);

  // Warm Key Spotlight
  keySpot = new THREE.SpotLight(0xfffaec, 2.5);
  keySpot.position.set(5, 12, 7);
  keySpot.angle = Math.PI / 3.8;
  keySpot.penumbra = 0.55;
  keySpot.castShadow = true;
  keySpot.shadow.mapSize.width = 1024;
  keySpot.shadow.mapSize.height = 1024;
  keySpot.shadow.camera.near = 2;
  keySpot.shadow.camera.far = 30;
  keySpot.shadow.bias = -0.001;
  scene.add(keySpot);

  // Soft Rim & Fill Light
  fillLight = new THREE.DirectionalLight(0xe8ddcc, 1.1);
  fillLight.position.set(-8, 8, -5);
  scene.add(fillLight);

  // Front Daylight Fill
  frontLight = new THREE.DirectionalLight(0xfff5ea, 0.85);
  frontLight.position.set(0, 7, 9);
  scene.add(frontLight);

  // Render Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    // Animate Candle Flames & PointLights
    if (isCandlesLit) {
      candleFlames.forEach((flame, i) => {
        const flicker = 1 + Math.sin(elapsedTime * 14 + i * 2) * 0.18 + Math.cos(elapsedTime * 22) * 0.1;
        flame.scale.set(flicker, 1 + (flicker - 1) * 1.5, flicker);
        flame.rotation.y += 0.04;
      });
      candleLights.forEach((light, i) => {
        light.intensity = 1.6 + Math.sin(elapsedTime * 12 + i) * 0.4;
      });
    }

    // Animate Floating Balloons
    floatingBalloons.forEach((b, i) => {
      b.position.y = b.userData.initialY + Math.sin(elapsedTime * 1.2 + i) * 0.35;
      b.rotation.y = Math.sin(elapsedTime * 0.5 + i) * 0.2;
    });

    // Animate Memory Plates
    memoryPlates.forEach((plate, i) => {
      plate.position.y = plate.userData.initialY + Math.sin(elapsedTime * 0.9 + i) * 0.2;
      plate.rotation.y = plate.userData.initialRotY + Math.sin(elapsedTime * 0.4 + i) * 0.08;
    });

    // Animate Fireworks particles
    update3DFireworks();

    renderer.render(scene, camera);
  }
  animate();
}

// ========================================================
// 4. BUILD 3D WORLD OBJECTS
// ========================================================
function build3DWorld() {
  // 1. Glossy Carrara Marble Floor / Dais
  const floorGeo = new THREE.CylinderGeometry(7.2, 7.8, 0.4, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xfaf7f0,
    roughness: 0.22,
    metalness: 0.08
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -0.2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Polished Gold Trim Ring around floor
  const floorRingGeo = new THREE.TorusGeometry(7.25, 0.075, 16, 64);
  const goldMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4a034,
    metalness: 0.88,
    roughness: 0.22
  });
  const floorRing = new THREE.Mesh(floorRingGeo, goldMetalMat);
  floorRing.rotation.x = Math.PI / 2;
  floorRing.position.y = 0.01;
  scene.add(floorRing);

  // 2. Build 3D Royal Birthday Cake
  build3DCake();

  // 3. Build 3D Gift Box
  build3DGiftBox();

  // 4. Build 3D Toasting Crystal Glasses
  build3DToastGlasses();

  // 5. Build 3D Floating Balloons
  build3DBalloons();

  // 6. Build 3D Memory Frames
  build3DMemoryFrames();
}

// 3D Cake Construction - Light Royal Ivory & Gold Palette
function build3DCake() {
  cakeGroup = new THREE.Group();
  cakeGroup.position.set(0, 0, 0);

  // Pedestal Stand
  const standBaseGeo = new THREE.CylinderGeometry(1.6, 2.2, 0.35, 32);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a034,
    metalness: 0.88,
    roughness: 0.22
  });
  const standBase = new THREE.Mesh(standBaseGeo, goldMat);
  standBase.position.y = 0.175;
  standBase.castShadow = true;
  cakeGroup.add(standBase);

  const standStemGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.7, 32);
  const standStem = new THREE.Mesh(standStemGeo, goldMat);
  standStem.position.y = 0.7;
  standStem.castShadow = true;
  cakeGroup.add(standStem);

  const standPlateGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.15, 48);
  const standPlate = new THREE.Mesh(standPlateGeo, goldMat);
  standPlate.position.y = 1.125;
  standPlate.castShadow = true;
  standPlate.receiveShadow = true;
  cakeGroup.add(standPlate);

  // Cake Tier 1 (Bottom) - Royal Ivory Fondant
  const tier1Geo = new THREE.CylinderGeometry(3.1, 3.1, 1.4, 48);
  const ivoryFondantMat = new THREE.MeshStandardMaterial({
    color: 0xfffdfa,
    roughness: 0.32,
    metalness: 0.05
  });
  const tier1 = new THREE.Mesh(tier1Geo, ivoryFondantMat);
  tier1.position.y = 1.9;
  tier1.castShadow = true;
  tier1.receiveShadow = true;
  cakeGroup.add(tier1);

  // Tier 1 Gold Studs around bottom
  const studGeo = new THREE.SphereGeometry(0.1, 12, 12);
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const stud = new THREE.Mesh(studGeo, goldMat);
    stud.position.set(Math.cos(angle) * 3.14, 1.25, Math.sin(angle) * 3.14);
    cakeGroup.add(stud);
  }

  // Cake Tier 2 (Middle) - Warm Champagne Cream
  const tier2Geo = new THREE.CylinderGeometry(2.3, 2.3, 1.2, 48);
  const champagneCreamMat = new THREE.MeshStandardMaterial({
    color: 0xf5eee2,
    roughness: 0.28,
    metalness: 0.08
  });
  const tier2 = new THREE.Mesh(tier2Geo, champagneCreamMat);
  tier2.position.y = 3.2;
  tier2.castShadow = true;
  tier2.receiveShadow = true;
  cakeGroup.add(tier2);

  // Gold drip ribbon between Tier 1 & 2
  const dripRingGeo = new THREE.TorusGeometry(2.32, 0.08, 16, 48);
  const dripRing = new THREE.Mesh(dripRingGeo, goldMat);
  dripRing.rotation.x = Math.PI / 2;
  dripRing.position.y = 3.8;
  cakeGroup.add(dripRing);

  // Cake Tier 3 (Top) - Alabaster Pearl
  const tier3Geo = new THREE.CylinderGeometry(1.5, 1.5, 1.0, 48);
  const alabasterPearlMat = new THREE.MeshStandardMaterial({
    color: 0xfcf8f2,
    roughness: 0.25,
    metalness: 0.1
  });
  const tier3 = new THREE.Mesh(tier3Geo, alabasterPearlMat);
  tier3.position.y = 4.3;
  tier3.castShadow = true;
  tier3.receiveShadow = true;
  cakeGroup.add(tier3);

  // Crown Topper
  const crownGeo = new THREE.ConeGeometry(0.5, 0.7, 5);
  const crown = new THREE.Mesh(crownGeo, goldMat);
  crown.position.y = 5.15;
  crown.rotation.x = Math.PI;
  cakeGroup.add(crown);

  // 5 Candles on Top Tier
  candleFlames = [];
  candleLights = [];
  const candleCount = 5;
  const candleRadius = 0.9;
  const candleBodyGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.7, 16);
  const candleMat = new THREE.MeshStandardMaterial({ color: 0xfff6dd, roughness: 0.4 });
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });

  for (let i = 0; i < candleCount; i++) {
    const angle = (i / candleCount) * Math.PI * 2;
    const cx = Math.cos(angle) * candleRadius;
    const cz = Math.sin(angle) * candleRadius;

    // Body
    const candle = new THREE.Mesh(candleBodyGeo, candleMat);
    candle.position.set(cx, 5.15, cz);
    candle.castShadow = true;
    cakeGroup.add(candle);

    // Wick
    const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.set(cx, 5.56, cz);
    cakeGroup.add(wick);

    // Flame
    const flameGeo = new THREE.ConeGeometry(0.09, 0.26, 12);
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(cx, 5.72, cz);
    cakeGroup.add(flame);
    candleFlames.push(flame);

    // Candle PointLight
    const pLight = new THREE.PointLight(0xff9922, 1.6, 7);
    pLight.position.set(cx, 5.8, cz);
    scene.add(pLight);
    candleLights.push(pLight);
  }

  scene.add(cakeGroup);
}

// 3D Gift Boxes (3 Interactive Luxury Boxes)
let giftBoxes = [];

const giftSurpriseList = [
  {
    icon: '🛡️',
    tag: 'BHAIYA KA LIFE-LONG BACKUP PASS',
    title: 'Hamesha Ka Stand & Full Support',
    desc: 'Lifetime validity: Bhaiya ke har faisle me 100% support, kabhi bhi koi problem ho toh aadhi raat ko bhi haazir, aur bina kisi condition ke saath khade rehne ka wada.',
    benefits: [
      'Har Musibat Me Full Stand',
      'No Questions Asked Support',
      'Aapka Permanent Partner-in-Crime'
    ]
  },
  {
    icon: '🍕',
    tag: 'UNLIMITED CHAI & TREAT PASS',
    title: 'Late Night Treat & Chai Card',
    desc: 'Jab bhi mood kharab ho ya celebration ka mann kare—Bhaiya ke sath bina kisi behas ke unlimited kadak chai, khana aur treat guaranteed!',
    benefits: [
      'Raat Ke 2 Baje Wali Chai',
      'Bhaiya Ki Taraf Se Grand Treat',
      'Sabse Aage Wali Seat Reserved'
    ]
  },
  {
    icon: '👑',
    tag: 'BEST BIG BROTHER EVER TROPHY',
    title: 'Duniya Ke Best Bhaiya Ka Khitab',
    desc: 'Ye award us shakhs ke liye jo bina bole sab samajh jata hai, har mod par sahi raasta dikhata hai aur meri zindagi ka asli hero hai.',
    benefits: [
      'Zero Judgment Wali Advice',
      'Life-Long Respect & Pyaar',
      'No.1 Elder Brother in the World'
    ]
  }
];

function createGiftBoxMesh(index, posX, posY, posZ, w, h, d, boxColor, ribbonColor, rotY = 0, openConfig = {}) {
  const group = new THREE.Group();
  group.position.set(posX, posY, posZ);
  group.rotation.y = rotY;

  const boxMat = new THREE.MeshStandardMaterial({
    color: boxColor,
    roughness: 0.32,
    metalness: 0.2
  });
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: ribbonColor,
    metalness: 0.88,
    roughness: 0.22
  });

  // Base
  const baseGeo = new THREE.BoxGeometry(w, h, d);
  const baseMesh = new THREE.Mesh(baseGeo, boxMat);
  baseMesh.position.y = h / 2;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.userData = { isGiftBox: true, giftIndex: index };
  group.add(baseMesh);

  // Ribbons on base
  const ribbonThickness = Math.max(0.12, Math.min(w, d) * 0.17);
  const ribbonXGeo = new THREE.BoxGeometry(w + 0.02, h + 0.01, ribbonThickness);
  const ribbonX = new THREE.Mesh(ribbonXGeo, ribbonMat);
  ribbonX.position.y = h / 2;
  ribbonX.userData = { isGiftBox: true, giftIndex: index };
  group.add(ribbonX);

  const ribbonZGeo = new THREE.BoxGeometry(ribbonThickness, h + 0.01, d + 0.02);
  const ribbonZ = new THREE.Mesh(ribbonZGeo, ribbonMat);
  ribbonZ.position.y = h / 2;
  ribbonZ.userData = { isGiftBox: true, giftIndex: index };
  group.add(ribbonZ);

  // Lid Group
  const lidGroup = new THREE.Group();
  const lidH = Math.max(0.14, h * 0.18);
  lidGroup.position.set(0, h, 0);

  const lidGeo = new THREE.BoxGeometry(w + 0.08, lidH, d + 0.08);
  const lidMesh = new THREE.Mesh(lidGeo, boxMat);
  lidMesh.position.y = lidH / 2;
  lidMesh.castShadow = true;
  lidMesh.userData = { isGiftBox: true, giftIndex: index };
  lidGroup.add(lidMesh);

  // Lid Ribbon Cross
  const lidRibXGeo = new THREE.BoxGeometry(w + 0.082, lidH + 0.01, ribbonThickness);
  const lidRibX = new THREE.Mesh(lidRibXGeo, ribbonMat);
  lidRibX.position.y = lidH / 2;
  lidRibX.userData = { isGiftBox: true, giftIndex: index };
  lidGroup.add(lidRibX);

  const lidRibZGeo = new THREE.BoxGeometry(ribbonThickness, lidH + 0.01, d + 0.082);
  const lidRibZ = new THREE.Mesh(lidRibZGeo, ribbonMat);
  lidRibZ.position.y = lidH / 2;
  lidRibZ.userData = { isGiftBox: true, giftIndex: index };
  lidGroup.add(lidRibZ);

  // Bow knot
  const bowGeo = new THREE.TorusGeometry(w * 0.18, 0.05, 12, 24);
  const bow1 = new THREE.Mesh(bowGeo, ribbonMat);
  bow1.rotation.y = Math.PI / 4;
  bow1.position.y = lidH + 0.14;
  bow1.userData = { isGiftBox: true, giftIndex: index };
  lidGroup.add(bow1);

  const bow2 = new THREE.Mesh(bowGeo, ribbonMat);
  bow2.rotation.y = -Math.PI / 4;
  bow2.position.y = lidH + 0.14;
  bow2.userData = { isGiftBox: true, giftIndex: index };
  lidGroup.add(bow2);

  group.add(lidGroup);
  group.userData = { isGiftBox: true, giftIndex: index };

  return {
    group,
    lid: lidGroup,
    isOpened: false,
    initialLidY: h,
    targetLidY: openConfig.targetLidY !== undefined ? openConfig.targetLidY : h + 0.85,
    targetLidX: openConfig.targetLidX || 0,
    targetLidZ: openConfig.targetLidZ || 0,
    targetLidRotX: openConfig.targetLidRotX || 0,
    targetLidRotY: openConfig.targetLidRotY || 0,
    targetLidRotZ: openConfig.targetLidRotZ || 0,
    position: new THREE.Vector3(posX, posY, posZ),
    surprise: giftSurpriseList[index]
  };
}

// Helper: Decorative Open Gift Box ("sirf dikhane ke liye open gift box")
function createOpenGiftBoxMesh(index, posX, posY, posZ, w, h, d, boxColor, ribbonColor, rotY, tissueColor, surpriseItem) {
  const group = new THREE.Group();
  group.position.set(posX, posY, posZ);
  group.rotation.y = rotY;

  const boxMat = new THREE.MeshStandardMaterial({
    color: boxColor,
    roughness: 0.32,
    metalness: 0.2
  });
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: ribbonColor,
    metalness: 0.88,
    roughness: 0.22
  });
  const tissueMat = new THREE.MeshStandardMaterial({
    color: tissueColor,
    roughness: 0.5,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  // Base Box
  const baseGeo = new THREE.BoxGeometry(w, h, d);
  const baseMesh = new THREE.Mesh(baseGeo, boxMat);
  baseMesh.position.y = h / 2;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.userData = { isDecoBox: true, decoIndex: index };
  group.add(baseMesh);

  // Ribbons on sides
  const ribbonThick = Math.max(0.1, Math.min(w, d) * 0.16);
  const ribX = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, h + 0.01, ribbonThick), ribbonMat);
  ribX.position.y = h / 2;
  ribX.userData = { isDecoBox: true, decoIndex: index };
  group.add(ribX);

  const ribZ = new THREE.Mesh(new THREE.BoxGeometry(ribbonThick, h + 0.01, d + 0.02), ribbonMat);
  ribZ.position.y = h / 2;
  ribZ.userData = { isDecoBox: true, decoIndex: index };
  group.add(ribZ);

  // Crinkled Tissue Paper Peeking Out Over Rims
  const tissueGroup = new THREE.Group();
  tissueGroup.position.set(0, h, 0);

  const flapGeo = new THREE.ConeGeometry(w * 0.28, 0.28, 4);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const flap = new THREE.Mesh(flapGeo, tissueMat);
    flap.position.set(Math.cos(angle) * (w * 0.42), 0.1, Math.sin(angle) * (d * 0.42));
    flap.rotation.y = angle;
    flap.rotation.x = 0.5;
    flap.userData = { isDecoBox: true, decoIndex: index };
    tissueGroup.add(flap);
  }
  group.add(tissueGroup);

  // Surprise filling inside open box
  if (surpriseItem === 'star') {
    const starGeo = new THREE.OctahedronGeometry(0.22, 0);
    const starMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.2 });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(0, h + 0.16, 0);
    star.userData = { isDecoBox: true, decoIndex: index };
    group.add(star);
  } else if (surpriseItem === 'gem') {
    const gemGeo = new THREE.IcosahedronGeometry(0.2, 0);
    const gemMat = new THREE.MeshStandardMaterial({ color: 0xff4f79, metalness: 0.6, roughness: 0.2 });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, h + 0.16, 0);
    gem.userData = { isDecoBox: true, decoIndex: index };
    group.add(gem);
  } else {
    const crownGeo = new THREE.TorusGeometry(0.18, 0.05, 12, 24);
    const crownMat = new THREE.MeshStandardMaterial({ color: 0xd4a034, metalness: 0.85, roughness: 0.25 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.set(0, h + 0.16, 0);
    crown.rotation.x = Math.PI / 2;
    crown.userData = { isDecoBox: true, decoIndex: index };
    group.add(crown);
  }

  // Open Lid placed on floor tilted against the box!
  const lidGroup = new THREE.Group();
  const lidH = Math.max(0.12, h * 0.18);
  const lidOffsetDist = w * 0.72;
  lidGroup.position.set(lidOffsetDist, lidH * 0.5, 0);
  lidGroup.rotation.z = 0.35; // tilted against floor

  const lidGeo = new THREE.BoxGeometry(w + 0.08, lidH, d + 0.08);
  const lidMesh = new THREE.Mesh(lidGeo, boxMat);
  lidMesh.castShadow = true;
  lidMesh.userData = { isDecoBox: true, decoIndex: index };
  lidGroup.add(lidMesh);

  const bowGeo = new THREE.TorusGeometry(w * 0.18, 0.045, 12, 24);
  const bow1 = new THREE.Mesh(bowGeo, ribbonMat);
  bow1.rotation.y = Math.PI / 4;
  bow1.position.y = lidH + 0.1;
  bow1.userData = { isDecoBox: true, decoIndex: index };
  lidGroup.add(bow1);

  group.add(lidGroup);
  group.userData = { isDecoBox: true, decoIndex: index };

  return {
    group,
    position: new THREE.Vector3(posX, posY, posZ),
    badgeIcon: surpriseItem === 'star' ? '⭐' : surpriseItem === 'gem' ? '💎' : '👑',
    badgeTitle: surpriseItem === 'star' ? 'Bhaiya Par Rab Ka Ashirwad! ⭐' : surpriseItem === 'gem' ? 'Bhaiya Ke Liye Khushiyan Hi Khushiyan! 💎' : 'World Best Big Brother! 👑'
  };
}

let decorativeOpenBoxes = [];

function build3DGiftBox() {
  giftBoxes.forEach(b => scene.remove(b.group));
  giftBoxes = [];
  decorativeOpenBoxes.forEach(b => scene.remove(b.group));
  decorativeOpenBoxes = [];

  // ========================================================
  // 1. INTERACTIVE GIFT BOX STACK (2 Same Size Base + 1 Small On Top)
  // Positioned on OPPOSITE SIDE (Left-Front) & Forward (posZ >= 3.35)
  // Far from cake plate (distance > 4.7 vs plate r=3.6) -> ZERO GLITCH!
  // ========================================================

  // Base Box 1 (Left Base): w=0.92, h=0.72, d=0.92
  const box1 = createGiftBoxMesh(
    0,
    -4.15, 0, 3.35,
    0.92, 0.72, 0.92,
    0xfcf9f2, 0xd4a034,
    0.16,
    { targetLidY: 0.72 + 0.55, targetLidX: -0.28, targetLidRotZ: 0.45 }
  );
  scene.add(box1.group);
  giftBoxes.push(box1);

  // Base Box 2 (Right Base - EXACT SAME SIZE: 0.92 x 0.72 x 0.92)
  const box2 = createGiftBoxMesh(
    1,
    -3.20, 0, 3.55,
    0.92, 0.72, 0.92,
    0xe89f92, 0xf6dfa8,
    -0.22,
    { targetLidY: 0.72 + 0.55, targetLidX: 0.28, targetLidRotZ: -0.45 }
  );
  scene.add(box2.group);
  giftBoxes.push(box2);

  // Top Box 3 (Small Box On Top of Base Boxes: w=0.68, h=0.52, d=0.68, y=0.72)
  const box3 = createGiftBoxMesh(
    2,
    -3.65, 0.72, 3.45,
    0.68, 0.52, 0.68,
    0x7a9c8d, 0xdeb04b,
    0.10,
    { targetLidY: 0.52 + 0.85, targetLidRotX: -0.35 }
  );
  scene.add(box3.group);
  giftBoxes.push(box3);

  // ========================================================
  // 2. DECORATIVE OPEN GIFT BOXES ("sirf dikhane ke liye open gift box")
  // 3 already open gift boxes with crinkled tissue & gifts inside
  // ========================================================

  // Decorative Open Box 1 (Beside stack on Left-Front)
  const deco1 = createOpenGiftBoxMesh(
    0,
    -4.95, 0, 2.90,
    0.72, 0.52, 0.72,
    0xbca1d4, 0xd4a034,
    -0.35,
    0xf5d070,
    'star'
  );
  scene.add(deco1.group);
  decorativeOpenBoxes.push(deco1);

  // Decorative Open Box 2 (In front of stack on Left-Front)
  const deco2 = createOpenGiftBoxMesh(
    1,
    -2.35, 0, 3.90,
    0.65, 0.46, 0.65,
    0xf0c878, 0xe27a7a,
    0.38,
    0xf7c4bb,
    'gem'
  );
  scene.add(deco2.group);
  decorativeOpenBoxes.push(deco2);

  // Decorative Open Box 3 (Opposite side on Right-Front for balance)
  const deco3 = createOpenGiftBoxMesh(
    2,
    3.60, 0, 3.30,
    0.72, 0.50, 0.72,
    0x5c8a74, 0xdeb04b,
    -0.28,
    0xfffdfa,
    'crown'
  );
  scene.add(deco3.group);
  decorativeOpenBoxes.push(deco3);
}

function openGiftBoxByIndex(index) {
  const box = giftBoxes[index];
  if (!box) return;

  if (!box.isOpened) {
    box.isOpened = true;
    gsap.to(box.lid.position, {
      x: box.targetLidX || 0,
      y: box.targetLidY,
      z: box.targetLidZ || 0,
      duration: 0.8,
      ease: 'back.out(1.8)'
    });
    gsap.to(box.lid.rotation, {
      x: box.targetLidRotX || 0,
      y: box.targetLidRotY || 0,
      z: box.targetLidRotZ || 0,
      duration: 0.8
    });

    playTrophySound();
    trigger3DFireworks(box.position.x, box.position.y + 1.2, box.position.z, 60);

    // Non-blocking floating celebratory badge (No popup modal!)
    showPopRewardBadge(box.surprise.icon, box.surprise.title);
    showToast(`${box.surprise.title} Khul Gaya! 🎁`);

    const btn = document.getElementById(`open-gift-${index + 1}-btn`);
    if (btn) btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Opened #${index + 1}</span>`;

    // Automatically auto-wrap back after 7 seconds (between 5 and 10 seconds)
    if (box.autoWrapTimeout) clearTimeout(box.autoWrapTimeout);
    box.autoWrapTimeout = setTimeout(() => {
      wrapGiftBoxByIndex(index);
    }, 7000);
  } else {
    // If already open, trigger fireworks and refresh auto-wrap timer
    trigger3DFireworks(box.position.x, box.position.y + 1.2, box.position.z, 35);
    showPopRewardBadge(box.surprise.icon, box.surprise.title);
    if (box.autoWrapTimeout) clearTimeout(box.autoWrapTimeout);
    box.autoWrapTimeout = setTimeout(() => {
      wrapGiftBoxByIndex(index);
    }, 7000);
  }
}

function wrapGiftBoxByIndex(index) {
  const box = giftBoxes[index];
  if (!box || !box.isOpened) return;
  box.isOpened = false;
  if (box.autoWrapTimeout) {
    clearTimeout(box.autoWrapTimeout);
    box.autoWrapTimeout = null;
  }

  gsap.to(box.lid.position, {
    x: 0,
    y: box.initialLidY,
    z: 0,
    duration: 0.65,
    ease: 'power2.inOut'
  });
  gsap.to(box.lid.rotation, { x: 0, y: 0, z: 0, duration: 0.65 });

  const btn = document.getElementById(`open-gift-${index + 1}-btn`);
  if (btn) {
    const labels = ['Box 1 🎁', 'Box 2 🎁', 'Top Box 👑'];
    const icons = ['fa-box-open', 'fa-gift', 'fa-crown'];
    btn.innerHTML = `<i class="fa-solid ${icons[index]}"></i> <span>${labels[index]}</span>`;
  }
}

function wrapAllGiftBoxes() {
  giftBoxes.forEach((box, i) => {
    wrapGiftBoxByIndex(i);
  });
}

// 3D Toasting Crystal Glasses Construction
function build3DToastGlasses() {
  toastGroup = new THREE.Group();
  toastGroup.position.set(3.8, 0, 1.4);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.85,
    ior: 1.5
  });

  const amberLiquidMat = new THREE.MeshStandardMaterial({
    color: 0xe69123,
    roughness: 0.2,
    metalness: 0.1
  });

  function makeGlass() {
    const g = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.45, 0.35, 1.0, 24);
    const body = new THREE.Mesh(bodyGeo, glassMat);
    body.position.y = 0.9;
    g.add(body);

    // Liquid inside
    const liqGeo = new THREE.CylinderGeometry(0.42, 0.33, 0.7, 24);
    const liq = new THREE.Mesh(liqGeo, amberLiquidMat);
    liq.position.y = 0.75;
    g.add(liq);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.5, 16);
    const stem = new THREE.Mesh(stemGeo, glassMat);
    stem.position.y = 0.35;
    g.add(stem);

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 24);
    const base = new THREE.Mesh(baseGeo, glassMat);
    base.position.y = 0.05;
    g.add(base);

    return g;
  }

  glassLeft = makeGlass();
  glassLeft.position.set(-0.65, 0, 0);
  glassLeft.rotation.z = 0.1;
  toastGroup.add(glassLeft);

  glassRight = makeGlass();
  glassRight.position.set(0.65, 0, 0);
  glassRight.rotation.z = -0.1;
  toastGroup.add(glassRight);

  scene.add(toastGroup);
}

// 3D Floating Balloons Engine & Mini-Game
let balloonPopCount = 0;
// Light Luxury Balloon Palette (Metallic Gold, Coral Blush, Sky Blue, Mint Sage, Soft Lavender, Champagne, Rose Gold)
const balloonPalette = [0xd4a034, 0xe89f92, 0x6ba4d8, 0x82c2a0, 0xb89ed6, 0xf0c878, 0xe27a7a];
const surpriseTypes = ['sparks', 'badge', 'confetti', 'heart', 'badge', 'firework'];

const brotherRewards = [
  { icon: '👑', title: 'Bhaiya Ka Tashan No. 1!' },
  { icon: '🏆', title: 'World Best Big Brother!' },
  { icon: '☕', title: 'Bhaiya Ke Sath Kadak Chai!' },
  { icon: '⚡', title: 'Bhaiya Ka Full Power Support!' },
  { icon: '🛡️', title: 'Bhaiya Ki Dhal: Ready Hamesha!' },
  { icon: '🚀', title: 'Bhaiya Ki Success Next Level!' },
  { icon: '💎', title: 'Sehat Aur Khushiyan Hamesha!' },
  { icon: '❤️', title: 'Bhai-Bhai Ka Amar Pyaar!' },
  { icon: '🔥', title: 'Bhaiya Ki Entry, Sab Shaant!' }
];

function createSingleBalloon(x, y, z, color, type) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.userData = {
    isBalloon: true,
    initialY: y,
    balloonColor: color,
    balloonType: type,
    isPopping: false
  };

  const bGeo = new THREE.SphereGeometry(0.72, 24, 24);
  bGeo.scale(1, 1.25, 1);
  const bMat = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.38,
    roughness: 0.25
  });
  const mesh = new THREE.Mesh(bGeo, bMat);
  mesh.castShadow = true;
  mesh.userData = { parentBalloon: group };
  group.add(mesh);

  const knotGeo = new THREE.ConeGeometry(0.12, 0.16, 12);
  const knot = new THREE.Mesh(knotGeo, bMat);
  knot.position.y = -0.92;
  knot.userData = { parentBalloon: group };
  group.add(knot);

  const strGeo = new THREE.CylinderGeometry(0.01, 0.01, 1.6, 6);
  const strMat = new THREE.MeshBasicMaterial({ color: 0xcccccc });
  const str = new THREE.Mesh(strGeo, strMat);
  str.position.y = -1.75;
  str.userData = { parentBalloon: group };
  group.add(str);

  return group;
}

function build3DBalloons() {
  floatingBalloons = [];
  const balloonCount = 16;

  for (let i = 0; i < balloonCount; i++) {
    // Evenly distributed sectors so all sides start perfectly balanced
    const angle = (i / balloonCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
    const distance = 5.2 + Math.random() * 2.2;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    const y = 3.2 + Math.random() * 3.4;

    const color = balloonPalette[i % balloonPalette.length];
    const type = surpriseTypes[i % surpriseTypes.length];

    const balloon = createSingleBalloon(x, y, z, color, type);
    scene.add(balloon);
    floatingBalloons.push(balloon);
  }
}

function popBalloon(balloonGroup) {
  if (!balloonGroup || balloonGroup.userData.isPopping) return;
  balloonGroup.userData.isPopping = true;

  const pos = balloonGroup.position.clone();
  // Capture angular sector of popped balloon to maintain uniform 360-degree density
  const poppedAngle = Math.atan2(pos.z, pos.x);
  const color = balloonGroup.userData.balloonColor;
  const type = balloonGroup.userData.balloonType;

  // Sound
  playBalloonPopSound(0.85 + Math.random() * 0.4);

  // Counter
  balloonPopCount++;
  const counterEl = document.getElementById('pop-counter');
  if (counterEl) counterEl.textContent = balloonPopCount;

  // GSAP Pop Explosion Animation
  gsap.to(balloonGroup.scale, {
    x: 1.35, y: 1.35, z: 1.35,
    duration: 0.05,
    ease: 'power2.out',
    onComplete: () => {
      gsap.to(balloonGroup.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.07,
        ease: 'power2.in',
        onComplete: () => {
          scene.remove(balloonGroup);
          const idx = floatingBalloons.indexOf(balloonGroup);
          if (idx !== -1) floatingBalloons.splice(idx, 1);
        }
      });
    }
  });

  // Trigger different surprises:
  if (type === 'sparks') {
    triggerBalloonSparks(pos.x, pos.y, pos.z, color);
    showPopRewardBadge('✨', 'Sunehra Chamak Blast!');
  } else if (type === 'badge') {
    triggerBalloonSparks(pos.x, pos.y, pos.z, color);
    const r = brotherRewards[Math.floor(Math.random() * brotherRewards.length)];
    showPopRewardBadge(r.icon, r.title);
    playTrophySound();
  } else if (type === 'confetti') {
    triggerConfettiShower(pos.x, pos.y, pos.z);
    showPopRewardBadge('🎉', 'Phoolon Aur Rangon Ki Baarish!');
  } else if (type === 'heart') {
    triggerHeartShower(pos.x, pos.y, pos.z);
    showPopRewardBadge('❤️', 'Bhai-Bhai Ka Asli Pyaar!');
  } else if (type === 'firework') {
    trigger3DFireworks(pos.x, pos.y, pos.z, 60);
    showPopRewardBadge('🎆', 'Shandar Aatishbazi!');
    playTrophySound();
  }

  // Spawn new balloon in the SAME angular sector to keep 360-degree density perfectly balanced!
  setTimeout(() => {
    spawnNewBalloon(poppedAngle);
  }, 420);
}

function spawnNewBalloon(referenceAngle) {
  // Sector-balanced angle logic: if referenceAngle is provided, stay in the same sector with small jitter
  let angle;
  if (referenceAngle !== undefined && !isNaN(referenceAngle)) {
    angle = referenceAngle + (Math.random() - 0.5) * 0.45;
  } else {
    angle = Math.random() * Math.PI * 2;
  }

  const distance = 5.2 + Math.random() * 2.2;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;
  const targetY = 3.2 + Math.random() * 3.4;

  const color = balloonPalette[Math.floor(Math.random() * balloonPalette.length)];
  const type = surpriseTypes[Math.floor(Math.random() * surpriseTypes.length)];

  // Spawn from side & below in the same sector
  const startY = targetY - 3.2;
  const startX = x * 1.25;
  const startZ = z * 1.25;

  const newBalloon = createSingleBalloon(startX, startY, startZ, color, type);
  newBalloon.scale.set(0.1, 0.1, 0.1);
  scene.add(newBalloon);
  floatingBalloons.push(newBalloon);

  gsap.to(newBalloon.scale, { x: 1, y: 1, z: 1, duration: 0.85, ease: 'back.out(1.8)' });
  gsap.to(newBalloon.position, {
    x: x,
    y: targetY,
    z: z,
    duration: 2.0,
    ease: 'power2.out',
    onComplete: () => {
      newBalloon.userData.initialY = targetY;
    }
  });
}

let badgeTimeout = null;
function showPopRewardBadge(icon, title) {
  const badge = document.getElementById('balloon-pop-badge');
  const iconEl = document.getElementById('pop-badge-icon');
  const titleEl = document.getElementById('pop-badge-title');
  if (!badge) return;

  iconEl.textContent = icon;
  titleEl.textContent = title;
  badge.classList.add('active');

  if (badgeTimeout) clearTimeout(badgeTimeout);
  badgeTimeout = setTimeout(() => {
    badge.classList.remove('active');
  }, 2400);
}

// ========================================================
// 3D MEMORY FRAMES (WHITE POSTERS) & LIGHTBOX ZOOM MODAL
// ========================================================
let currentLightboxIndex = 0;

const brotherPhotos = [
  {
    src: 'images/photo.jpg',
    title: 'Bhaiya Ka Tashan No. 1 👑',
    sub: 'The Undisputed King • Arman Bhai',
    caption: 'ARMAN BHAI 👑'
  },
  {
    src: 'images/photo2.jpg',
    title: 'Brotherhood Memories 📸',
    sub: 'Partners in Crime • Day One Se Hamesha Sath',
    caption: 'MERE BHAI ❤️'
  },
  {
    src: 'images/arman.png',
    title: 'The Real Inspiration ⚡',
    sub: 'Har Mushkil Me Himmat Badhane Wale Bada Bhai',
    caption: 'THE LEGEND ⚡'
  },
  {
    src: 'images/photo4.jpg',
    title: 'Royal Birthday Celebration 🎂',
    sub: 'Janamdin Mubarak Arman • Hamesha Muskurate Raho',
    caption: 'MUBARAK HO 🎉'
  }
];

function build3DMemoryFrames() {
  // Clear any existing
  memoryPlates.forEach(p => scene.remove(p));
  memoryPlates = [];

  // 4 Dedicated White Posters for Brother's Images (2 on Left, 2 on Right)
  const totalFrames = 4;
  const framePositions = [
    { x: -3.5, y: 3.5, z: 2.2, lookAt: [-0.6, 2.4, 0] },
    { x: -4.4, y: 3.8, z: -0.4, lookAt: [-0.9, 2.6, 0] },
    { x: 4.4, y: 3.8, z: -0.4, lookAt: [0.9, 2.6, 0] },
    { x: 3.5, y: 3.5, z: 2.2, lookAt: [0.6, 2.4, 0] }
  ];

  for (let i = 0; i < totalFrames; i++) {
    const config = framePositions[i];
    const photoData = brotherPhotos[i] || brotherPhotos[0];
    const frameGroup = new THREE.Group();
    frameGroup.position.set(config.x, config.y, config.z);
    frameGroup.lookAt(config.lookAt[0], config.lookAt[1], config.lookAt[2]);
    frameGroup.userData = {
      isMemoryFrame: true,
      initialY: config.y,
      initialRotY: frameGroup.rotation.y,
      index: i,
      title: photoData.title,
      sub: photoData.sub,
      src: photoData.src
    };

    // 1. Crisp White Polaroid Backing (Thick luxury poster card)
    const backGeo = new THREE.BoxGeometry(1.8, 2.3, 0.06);
    const backMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05
    });
    const back = new THREE.Mesh(backGeo, backMat);
    back.castShadow = true;
    back.receiveShadow = true;
    back.userData = { parentFrame: frameGroup, index: i };
    frameGroup.add(back);

    // 2. Gold Luxury Trim Rim on Polaroid Edge
    const goldTrimGeo = new THREE.BoxGeometry(1.84, 2.34, 0.02);
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4a034,
      metalness: 0.88,
      roughness: 0.22
    });
    const goldTrim = new THREE.Mesh(goldTrimGeo, goldTrimMat);
    goldTrim.position.z = -0.015;
    goldTrim.userData = { parentFrame: frameGroup, index: i };
    frameGroup.add(goldTrim);

    // 3. Dynamic Photo Texture from images folder (photo.jpg, photo2.jpg, photo3.jpg, photo4.jpg)
    const photoMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.FrontSide
    });
    const loader = new THREE.TextureLoader();
    loader.load(
      photoData.src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        if (i === 3) {
          // photo4: vertical portrait — position texture to keep Arman's face centered with ample headroom
          tex.matrixAutoUpdate = false;
          tex.repeat.set(1.0, 0.65);
          tex.offset.set(0.0, 0.35);
          tex.updateMatrix();
        }
        photoMat.map = tex;
        photoMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn('Fallback placeholder for frame ' + i, err);
        const { canvas } = makePlaceholderCanvasTexture(
          i,
          photoData.title,
          photoData.sub,
          '👑'
        );
        photoMat.map = new THREE.CanvasTexture(canvas);
        photoMat.needsUpdate = true;
      }
    );

    const photoGeo = new THREE.PlaneGeometry(1.52, 1.52);
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    // Lowered slightly inside the Polaroid card so faces have generous breathing room
    photoMesh.position.set(0, 0.12, 0.04);
    photoMesh.userData = { parentFrame: frameGroup, index: i };
    frameGroup.add(photoMesh);

    // 4. Polaroid Bottom Gold Caption Plate
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 128;
    const lctx = labelCanvas.getContext('2d');
    lctx.fillStyle = '#ffffff';
    lctx.fillRect(0, 0, 512, 128);
    lctx.fillStyle = '#1e1914';
    lctx.font = 'bold 36px "Cinzel", Georgia, serif';
    lctx.textAlign = 'center';
    lctx.textBaseline = 'middle';
    lctx.fillText(photoData.caption, 256, 46);
    lctx.fillStyle = '#b3821a';
    lctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    lctx.fillText('✨ SPECIAL BIRTHDAY EDITION ✨', 256, 92);

    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTex });
    const labelGeo = new THREE.PlaneGeometry(1.52, 0.42);
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.set(0, -0.78, 0.04);
    labelMesh.userData = { parentFrame: frameGroup, index: i };
    frameGroup.add(labelMesh);

    scene.add(frameGroup);
    memoryPlates.push(frameGroup);
  }
}

function makePlaceholderCanvasTexture(index, title, sub, icon = '👑') {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Alabaster Luxury Gradient
  const grad = ctx.createLinearGradient(0, 0, 600, 600);
  grad.addColorStop(0, '#fefdfa');
  grad.addColorStop(1, '#f5ede0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 600);

  // Gold Double Filigree Border
  ctx.strokeStyle = '#d4a034';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, 560, 560);
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 536, 536);

  // Corner Accents
  ctx.fillStyle = '#b3821a';
  const cSize = 12;
  ctx.fillRect(20, 20, cSize, cSize);
  ctx.fillRect(580 - cSize, 20, cSize, cSize);
  ctx.fillRect(20, 580 - cSize, cSize, cSize);
  ctx.fillRect(580 - cSize, 580 - cSize, cSize, cSize);

  // Badge Top
  ctx.fillStyle = '#8c6b1b';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`• POSTER ${index + 1} OF 4 •`, 300, 95);

  // Crest Icon
  ctx.font = '74px serif';
  ctx.fillText(icon, 300, 200);

  // Title
  ctx.fillStyle = '#1e1914';
  ctx.font = 'bold 30px "Cinzel", Georgia, serif';
  ctx.fillText(title, 300, 305);

  // Subtitle
  ctx.fillStyle = '#b3821a';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(sub, 300, 360);

  // Callout Banner
  ctx.fillStyle = 'rgba(212, 160, 52, 0.12)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(80, 420, 440, 48, 24);
  } else {
    ctx.rect(80, 420, 440, 48);
  }
  ctx.fill();

  ctx.fillStyle = '#8c6b1b';
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✨ Arman • Janamdin Mubarak 🥂', 300, 444);

  // Hint
  ctx.fillStyle = '#7a6f62';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('👑 Dedicated to Arman Bhai', 300, 510);

  return { canvas, dataUrl: canvas.toDataURL('image/png') };
}

// Lightbox Zoom Functions ("jb mai uspe clik kru to popup bda ho jaaye or fir khi or clik kru to dubara normal ho jaaye")
function openPosterLightbox(index) {
  currentLightboxIndex = index;
  const frame = memoryPlates[index];
  if (!frame) return;

  const overlay = document.getElementById('poster-lightbox-overlay');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const subEl = document.getElementById('lightbox-sub');

  const photoData = brotherPhotos[index] || brotherPhotos[0];

  if (imgEl) {
    imgEl.src = photoData.src;
  }
  if (titleEl) {
    titleEl.textContent = photoData.title;
  }
  if (subEl) {
    subEl.textContent = photoData.sub;
  }

  overlay.classList.add('active');
  playTrophySound();
}

function closePosterLightbox() {
  const overlay = document.getElementById('poster-lightbox-overlay');
  if (overlay) overlay.classList.remove('active');
}

function initPosterLightbox() {
  const overlay = document.getElementById('poster-lightbox-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      // Any click (on background, on image, on close button) closes it back to normal!
      closePosterLightbox();
    });
  }
}

// ========================================================
// 5. 3D FIREWORKS & CONFETTI PARTICLE SYSTEM
// ========================================================
function trigger3DFireworks(originX = 0, originY = 4, originZ = 0, count = 60) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const velocities = [];
  const colors = [];

  const palette = [
    new THREE.Color(0xf3be60),
    new THREE.Color(0xffea9f),
    new THREE.Color(0xef4444),
    new THREE.Color(0x38bdf8),
    new THREE.Color(0x10b981)
  ];

  for (let i = 0; i < count; i++) {
    positions.push(originX, originY, originZ);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const speed = 2.5 + Math.random() * 5.5;

    velocities.push(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.cos(phi) * speed + 1.5,
      Math.sin(phi) * Math.sin(theta) * speed
    );

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { velocities, life: 1.0, gravity: 0.12 };
  scene.add(points);
  fireworkParticles.push(points);

  playConfettiPopSound();
}

function triggerBalloonSparks(originX, originY, originZ, colorHex) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const velocities = [];
  const colors = [];

  const baseColor = new THREE.Color(colorHex);
  const goldColor = new THREE.Color(0xf3be60);
  const whiteColor = new THREE.Color(0xffffff);
  const palette = [baseColor, goldColor, whiteColor];

  const count = 75;
  for (let i = 0; i < count; i++) {
    positions.push(originX, originY, originZ);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const speed = 3.2 + Math.random() * 6.5;

    velocities.push(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.cos(phi) * speed + 1.8,
      Math.sin(phi) * Math.sin(theta) * speed
    );

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.22,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { velocities, life: 1.1, gravity: 0.15 };
  scene.add(points);
  fireworkParticles.push(points);
}

function triggerConfettiShower(originX, originY, originZ) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const velocities = [];
  const colors = [];

  const palette = [
    new THREE.Color(0xef4444),
    new THREE.Color(0x3b82f6),
    new THREE.Color(0x10b981),
    new THREE.Color(0xf59e0b),
    new THREE.Color(0xec4899),
    new THREE.Color(0xffffff)
  ];

  const count = 75;
  for (let i = 0; i < count; i++) {
    positions.push(originX, originY, originZ);

    const angle = Math.random() * Math.PI * 2;
    const speed = 2.0 + Math.random() * 4.2;

    velocities.push(
      Math.cos(angle) * speed,
      Math.random() * 4.0 + 1.2,
      Math.sin(angle) * speed
    );

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.22,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { velocities, life: 1.3, gravity: 0.08 };
  scene.add(points);
  fireworkParticles.push(points);
}

function triggerHeartShower(originX, originY, originZ) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const velocities = [];
  const colors = [];

  const palette = [
    new THREE.Color(0xff3366),
    new THREE.Color(0xff6699),
    new THREE.Color(0xf3be60),
    new THREE.Color(0xffffff)
  ];

  const count = 65;
  for (let i = 0; i < count; i++) {
    positions.push(originX, originY, originZ);

    const theta = Math.random() * Math.PI * 2;
    const speed = 2.0 + Math.random() * 4.5;

    velocities.push(
      Math.cos(theta) * speed,
      Math.random() * 3.5 + 2.0,
      Math.sin(theta) * speed
    );

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.24,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { velocities, life: 1.1, gravity: 0.1 };
  scene.add(points);
  fireworkParticles.push(points);
}

function update3DFireworks() {
  for (let i = fireworkParticles.length - 1; i >= 0; i--) {
    const pts = fireworkParticles[i];
    const pos = pts.geometry.attributes.position.array;
    const vel = pts.userData.velocities;
    const gravity = pts.userData.gravity !== undefined ? pts.userData.gravity : 0.12;

    pts.userData.life -= 0.015;
    pts.material.opacity = Math.max(0, pts.userData.life);

    for (let j = 0; j < vel.length / 3; j++) {
      const idx = j * 3;
      pos[idx] += vel[idx] * 0.02;
      pos[idx + 1] += vel[idx + 1] * 0.02;
      pos[idx + 2] += vel[idx + 2] * 0.02;

      vel[idx + 1] -= gravity;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    if (pts.userData.life <= 0) {
      scene.remove(pts);
      fireworkParticles.splice(i, 1);
    }
  }
}

// ========================================================
// 6. RAYCASTING & 3D CLICK INTERACTIONS
// ========================================================
function initRaycasting() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  window.addEventListener('pointerdown', (e) => {
    // Only raycast if clicking directly on webgl canvas
    if (e.target.tagName !== 'CANVAS') return;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // 1. Check Balloons FIRST so they pop instantly!
    const balloonMeshes = floatingBalloons.flatMap(b => b.children);
    const balloonHits = raycaster.intersectObjects(balloonMeshes, true);
    if (balloonHits.length > 0) {
      const targetBalloon = balloonHits[0].object.userData.parentBalloon || balloonHits[0].object.parent;
      if (targetBalloon && !targetBalloon.userData.isPopping) {
        popBalloon(targetBalloon);
        return;
      }
    }

    // 2. Check Cake
    const cakeHits = raycaster.intersectObjects(cakeGroup.children, true);
    if (cakeHits.length > 0) {
      if (isCandlesLit) {
        blowOutCandles();
      } else {
        relightCandles();
      }
      return;
    }

    // 3. Check Gift Boxes (All 3 Stacked Interactive Boxes)
    const allGiftMeshes = giftBoxes.flatMap(b => b.group.children.concat(b.lid.children));
    const giftHits = raycaster.intersectObjects(allGiftMeshes, true);
    if (giftHits.length > 0) {
      const hitObj = giftHits[0].object;
      let giftIdx = 0;
      if (hitObj.userData && hitObj.userData.giftIndex !== undefined) {
        giftIdx = hitObj.userData.giftIndex;
      } else if (hitObj.parent && hitObj.parent.userData && hitObj.parent.userData.giftIndex !== undefined) {
        giftIdx = hitObj.parent.userData.giftIndex;
      }
      openGiftBoxByIndex(giftIdx);
      return;
    }

    // 3b. Check Decorative Open Gift Boxes ("sirf dikhane ke liye open gift box")
    const allDecoMeshes = decorativeOpenBoxes.flatMap(b => b.group.children);
    const decoHits = raycaster.intersectObjects(allDecoMeshes, true);
    if (decoHits.length > 0) {
      const hitObj = decoHits[0].object;
      const deco = decorativeOpenBoxes.find(b => b.group === hitObj.parent || b.group === hitObj.parent?.parent);
      if (deco) {
        playTrophySound();
        triggerBalloonSparks(deco.position.x, deco.position.y + 0.8, deco.position.z, 0xd4a034);
        showPopRewardBadge(deco.badgeIcon, deco.badgeTitle);
        return;
      }
    }

    // 4. Check Toast Glasses
    const toastHits = raycaster.intersectObjects(toastGroup.children, true);
    if (toastHits.length > 0) {
      triggerToastClink();
      return;
    }

    // 5. Check 3D White Posters / Memory Frames (Click to Enlarge / Zoom)
    const allPosterMeshes = memoryPlates.flatMap(p => p.children);
    const posterHits = raycaster.intersectObjects(allPosterMeshes, true);
    if (posterHits.length > 0) {
      const hitObj = posterHits[0].object;
      let frameIndex = 0;
      if (hitObj.userData && hitObj.userData.index !== undefined) {
        frameIndex = hitObj.userData.index;
      } else if (hitObj.parent && hitObj.parent.userData && hitObj.parent.userData.index !== undefined) {
        frameIndex = hitObj.parent.userData.index;
      }
      openPosterLightbox(frameIndex);
      return;
    }
  });

  // Pointer Move (Hover cursor feedback)
  window.addEventListener('pointermove', (e) => {
    if (e.target.tagName !== 'CANVAS') return;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const allGiftMeshes = giftBoxes.flatMap(b => b.group.children.concat(b.lid.children));
    const allDecoMeshes = decorativeOpenBoxes.flatMap(b => b.group.children);
    const allPosterMeshes = memoryPlates.flatMap(p => p.children);
    const interactiveObjects = [
      ...cakeGroup.children,
      ...allGiftMeshes,
      ...allDecoMeshes,
      ...allPosterMeshes,
      ...toastGroup.children,
      ...floatingBalloons.flatMap(b => b.children)
    ];

    const hits = raycaster.intersectObjects(interactiveObjects, true);
    renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
  });
}

// ========================================================
// 7. CAMERA VIEW TRANSITIONS & HUD NAVIGATION
// ========================================================
function initHUDNavigation() {
  const viewBtns = document.querySelectorAll('.view-btn');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchCameraView(view);
    });
  });
}

function switchCameraView(viewName) {
  currentView = viewName;

  // Update Buttons
  document.querySelectorAll('.view-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });

  // Switch Active Dock Panel
  document.querySelectorAll('.dock-panel').forEach(p => {
    p.classList.remove('active');
  });
  const matchingPanel = document.getElementById(`dock-panel-${viewName}`);
  if (matchingPanel) matchingPanel.classList.add('active');

  // Drawer handling
  const letterDrawer = document.getElementById('letter-drawer');
  if (viewName === 'letter') {
    letterDrawer.classList.add('active');
  } else {
    letterDrawer.classList.remove('active');
  }

  // Toast Overlay Handling
  const toastCard = document.getElementById('toast-card-overlay');
  if (viewName === 'toast') {
    toastCard.classList.add('active');
    triggerToastClink();
  } else {
    toastCard.classList.remove('active');
  }

  // Camera GSAP Tweens
  controls.autoRotate = false;

  if (viewName === 'cake') {
    gsap.to(camera.position, { x: 0, y: 4.4, z: 12.0, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: 0, y: 1.8, z: 0, duration: 1.2, ease: 'power2.inOut' });
  } else if (viewName === 'gift') {
    gsap.to(camera.position, { x: -4.2, y: 2.4, z: 5.5, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: -3.2, y: 0.85, z: 3.0, duration: 1.2, ease: 'power2.inOut' });
  } else if (viewName === 'letter') {
    gsap.to(camera.position, { x: -1.6, y: 3.0, z: 7.2, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: 0, y: 2.0, z: 0, duration: 1.2, ease: 'power2.inOut' });
  } else if (viewName === 'toast') {
    gsap.to(camera.position, { x: 4.2, y: 2.4, z: 4.0, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: 3.4, y: 0.9, z: 1.2, duration: 1.2, ease: 'power2.inOut' });
  } else if (viewName === 'memories') {
    gsap.to(camera.position, { x: 0, y: 3.8, z: 8.6, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: 0, y: 2.5, z: 0.8, duration: 1.2, ease: 'power2.inOut' });
  } else if (viewName === 'orbit') {
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    gsap.to(camera.position, { x: 0, y: 5.2, z: 11.0, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(controls.target, { x: 0, y: 2.0, z: 0, duration: 1.2, ease: 'power2.inOut' });
  }
}

// ========================================================
// 8. INTERACTIVE ACTION DOCK & 3D ACTIONS
// ========================================================
function initActionDock() {
  // Cake Actions
  const blowBtn = document.getElementById('blow-candles-btn');
  const relightBtn = document.getElementById('relight-candles-btn');
  const fireworksBtn = document.getElementById('blast-fireworks-btn');

  if (blowBtn) blowBtn.addEventListener('click', blowOutCandles);
  if (relightBtn) relightBtn.addEventListener('click', relightCandles);
  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      trigger3DFireworks(0, 5, 0, 70);
      showToast('Bhaiya ke liye aasman me pathake phod diye! 🎆');
    });
  }

  // Header Letter Button & Drawer triggers
  const openLetterBtn = document.getElementById('open-letter-btn');
  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', () => {
      const drawer = document.getElementById('letter-drawer');
      if (drawer) drawer.classList.add('active');
    });
  }
  const dockLetterBtn = document.getElementById('dock-open-letter-btn');
  if (dockLetterBtn) {
    dockLetterBtn.addEventListener('click', () => {
      const drawer = document.getElementById('letter-drawer');
      if (drawer) drawer.classList.add('active');
    });
  }

  // Gift Actions (3 Boxes)
  const openGift1Btn = document.getElementById('open-gift-1-btn');
  const openGift2Btn = document.getElementById('open-gift-2-btn');
  const openGift3Btn = document.getElementById('open-gift-3-btn');

  if (openGift1Btn) openGift1Btn.addEventListener('click', () => openGiftBoxByIndex(0));
  if (openGift2Btn) openGift2Btn.addEventListener('click', () => openGiftBoxByIndex(1));
  if (openGift3Btn) openGift3Btn.addEventListener('click', () => openGiftBoxByIndex(2));

  // Toast Actions
  const clinkBtn = document.getElementById('clink-glasses-btn');
  const nextToastBtn = document.getElementById('next-toast-quote-btn');
  if (clinkBtn) clinkBtn.addEventListener('click', triggerToastClink);
  if (nextToastBtn) {
    nextToastBtn.addEventListener('click', () => {
      const q = toastQuotes[Math.floor(Math.random() * toastQuotes.length)];
      document.getElementById('toast-card-quote').textContent = `“${q}”`;
      showToast('Bhaiya ke liye naya toast quote aa gaya! 🥂');
    });
  }

  // Memories Actions
  const rotateMemBtn = document.getElementById('rotate-memory-orbit-btn');
  if (rotateMemBtn) {
    rotateMemBtn.addEventListener('click', () => {
      gsap.to(scene.rotation, {
        y: scene.rotation.y + Math.PI / 2,
        duration: 1.2,
        ease: 'power2.inOut'
      });
    });
  }

  // Quick Poster Buttons
  document.querySelectorAll('.memory-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.dataset.slot, 10) || 0;
      openPosterLightbox(slot);
    });
  });

  // Orbit Actions
  const autoRotateBtn = document.getElementById('auto-rotate-toggle-btn');
  const resetCamBtn = document.getElementById('reset-camera-btn');
  if (autoRotateBtn) {
    autoRotateBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pause 360°</span>';
    autoRotateBtn.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      autoRotateBtn.innerHTML = controls.autoRotate
        ? '<i class="fa-solid fa-pause"></i> <span>Pause 360°</span>'
        : '<i class="fa-solid fa-play"></i> <span>Auto Rotate 🎥</span>';
    });
  }

  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      controls.autoRotate = false;
      if (autoRotateBtn) {
        autoRotateBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Auto Rotate 🎥</span>';
      }
      switchCameraView('cake');
    });
  }

  // Close Drawer & Heart action
  const closeDrawerBtn = document.getElementById('close-letter-drawer');
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      document.getElementById('letter-drawer').classList.remove('active');
    });
  }
  const drawerHeartBtn = document.getElementById('drawer-heart-btn');
  if (drawerHeartBtn) {
    drawerHeartBtn.addEventListener('click', () => {
      trigger3DFireworks(0, 5, 0, 80);
      showToast('Arman Bhai Ke Liye Dil Se Dua Aur Pyar! ❤️👑');
    });
  }

}

// 3D Cake Actions
function blowOutCandles() {
  if (!isCandlesLit) return;
  isCandlesLit = false;

  playCandleBlowSound();

  candleFlames.forEach((flame, i) => {
    gsap.to(flame.scale, {
      x: 0, y: 0, z: 0,
      duration: 0.35,
      delay: i * 0.08,
      ease: 'power2.in'
    });
  });

  candleLights.forEach((light, i) => {
    gsap.to(light, {
      intensity: 0,
      duration: 0.4,
      delay: i * 0.08
    });
  });

  setTimeout(() => {
    trigger3DFireworks(0, 5.5, 0, 90);
    playTrophySound();
    document.getElementById('blow-candles-btn').style.display = 'none';
    document.getElementById('relight-candles-btn').style.display = 'inline-flex';
    showToast('Dua Rab Se Manzoor Hui! Janamdin Mubarak Bhaiya! ✨');
  }, 500);
}

function relightCandles() {
  isCandlesLit = true;

  candleFlames.forEach((flame, i) => {
    gsap.to(flame.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.4,
      delay: i * 0.06,
      ease: 'back.out(2)'
    });
  });

  candleLights.forEach((light, i) => {
    gsap.to(light, {
      intensity: 1.6,
      duration: 0.4,
      delay: i * 0.06
    });
  });

  document.getElementById('blow-candles-btn').style.display = 'inline-flex';
  document.getElementById('relight-candles-btn').style.display = 'none';
  showToast('Mombattiyan phir se jal gayi! Ek aur wish mango Bhaiya! 🔥');
}

// 3D Toast Clink Action
function triggerToastClink() {
  playGlassClinkSound();

  gsap.to(glassLeft.position, { x: -0.35, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  gsap.to(glassLeft.rotation, { z: 0.35, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' });

  gsap.to(glassRight.position, { x: 0.35, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  gsap.to(glassRight.rotation, { z: -0.35, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' });

  trigger3DFireworks(-4.0, 1.5, 1.2, 35);

  toastCounter++;
  const counterEl = document.getElementById('toast-counter');
  if (counterEl) counterEl.textContent = toastCounter;
}

// ========================================================
// 9. WEB AUDIO API SYNTHESIZER & SOUND FX
// ========================================================
let audioCtx = null;
let isMelodyPlaying = false;
let melodyTimeouts = [];

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const happyBirthdayNotes = [
  { freq: 261.63, dur: 0.35, chord: 130.81 },
  { freq: 261.63, dur: 0.25 },
  { freq: 293.66, dur: 0.60, chord: 130.81 },
  { freq: 261.63, dur: 0.60 },
  { freq: 349.23, dur: 0.60, chord: 174.61 },
  { freq: 329.63, dur: 1.10 },

  { freq: 261.63, dur: 0.35, chord: 130.81 },
  { freq: 261.63, dur: 0.25 },
  { freq: 293.66, dur: 0.60, chord: 196.00 },
  { freq: 261.63, dur: 0.60 },
  { freq: 392.00, dur: 0.60, chord: 174.61 },
  { freq: 349.23, dur: 1.10 },

  { freq: 261.63, dur: 0.35, chord: 130.81 },
  { freq: 261.63, dur: 0.25 },
  { freq: 523.25, dur: 0.60, chord: 220.00 },
  { freq: 440.00, dur: 0.60 },
  { freq: 349.23, dur: 0.60, chord: 174.61 },
  { freq: 329.63, dur: 0.60 },
  { freq: 293.66, dur: 0.90, chord: 146.83 },

  { freq: 466.16, dur: 0.35, chord: 174.61 },
  { freq: 466.16, dur: 0.25 },
  { freq: 440.00, dur: 0.60, chord: 174.61 },
  { freq: 349.23, dur: 0.60 },
  { freq: 392.00, dur: 0.60, chord: 196.00 },
  { freq: 349.23, dur: 1.40, chord: 130.81 }
];

function playSynthesizedNote(freq, dur, type = 'sine', gainVal = 0.22) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (err) {
    console.warn(err);
  }
}

function playGlassClinkSound() {
  try {
    const ctx = getAudioContext();
    [2400, 3180].forEach(f => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.1);
    });
  } catch (e) {
    console.warn(e);
  }
}

function playTrophySound() {
  [261.63, 329.63, 392.00, 523.25].forEach((note, i) => {
    setTimeout(() => playSynthesizedNote(note, 0.4, 'triangle', 0.25), i * 90);
  });
}

function playConfettiPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn(e);
  }
}

function playBalloonPopSound(pitch = 1.0) {
  try {
    const ctx = getAudioContext();
    // 1. Snap Noise
    const bufferSize = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300 * pitch, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.55, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    // 2. Resonant Air Thump
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260 * pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

    oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn(e);
  }
}

function playCandleBlowSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {
    console.warn(e);
  }
}

function startMelodyLoop() {
  stopMelodyLoop();
  isMelodyPlaying = true;
  updateMusicUI();

  let timeOffset = 0;
  happyBirthdayNotes.forEach(item => {
    const t = setTimeout(() => {
      if (!isMelodyPlaying) return;
      playSynthesizedNote(item.freq, item.dur * 0.95, 'triangle', 0.22);
      if (item.chord) playSynthesizedNote(item.chord, item.dur * 1.1, 'sine', 0.12);
    }, timeOffset * 1000);

    melodyTimeouts.push(t);
    timeOffset += item.dur;
  });

  const loop = setTimeout(() => {
    if (isMelodyPlaying) startMelodyLoop();
  }, (timeOffset + 1.2) * 1000);
  melodyTimeouts.push(loop);
}

function stopMelodyLoop() {
  isMelodyPlaying = false;
  melodyTimeouts.forEach(t => clearTimeout(t));
  melodyTimeouts = [];
  updateMusicUI();
}

function updateMusicUI() {
  const btn = document.getElementById('music-toggle-btn');
  const label = document.getElementById('music-status-text');
  const icon = document.getElementById('music-icon');

  if (isMelodyPlaying) {
    btn.classList.add('playing');
    label.textContent = 'Playing ♫';
    icon.className = 'fa-solid fa-volume-high';
  } else {
    btn.classList.remove('playing');
    label.textContent = 'Music ♫';
    icon.className = 'fa-solid fa-music';
  }
}

function initSynthesizerAudio() {
  const btn = document.getElementById('music-toggle-btn');
  btn.addEventListener('click', () => {
    if (isMelodyPlaying) {
      stopMelodyLoop();
    } else {
      startMelodyLoop();
    }
  });

  // Autoplay immediately on load
  try {
    startMelodyLoop();
  } catch (e) {
    console.warn('Autoplay waiting for user gesture:', e);
  }

  // Browser Autoplay Policy Fallback:
  // Starts music smoothly on the first interaction anywhere on screen
  const autoPlayUnlock = () => {
    if (!isMelodyPlaying) {
      startMelodyLoop();
    } else if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt => {
      window.removeEventListener(evt, autoPlayUnlock, { capture: true });
    });
  };

  ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, autoPlayUnlock, { capture: true, once: true });
  });
}

// ========================================================
// 10. OVERLAYS & KEYBOARD SHORTCUTS
// ========================================================
function initModals() {
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const shareModal = document.getElementById('share-modal');
      if (shareModal) shareModal.classList.remove('active');
      const letterDrawer = document.getElementById('letter-drawer');
      if (letterDrawer) letterDrawer.classList.remove('active');
      closePosterLightbox();
    }
  });
}

// ========================================================
// 11. BOOTSTRAP 5 COMPONENTS & UTILITIES
// ========================================================
function initBootstrapComponents() {
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => {
      new bootstrap.Tooltip(el, {
        trigger: 'hover',
        animation: true,
        boundary: 'window'
      });
    });
  }
}

// ========================================================
// 13. UTILITY & TOAST PILL
// ========================================================
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let toastTimer = null;
function showToast(msg) {
  const pill = document.getElementById('app-toast-pill');
  const msgEl = document.getElementById('toast-pill-message');
  if (!pill || !msgEl) return;

  msgEl.textContent = msg;
  pill.classList.add('active');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    pill.classList.remove('active');
  }, 3200);
}

// ========================================================
// 13. LIGHT LUXURY THEME ENGINE (Ivory, Rose, Mint)
// ========================================================
const luxuryThemes = {
  ivory: {
    name: 'Royal Ivory & Gold',
    bg: 0xf6f3eb,
    ambient: 0xfff8ee,
    spot: 0xfffaec,
    fill: 0xe8ddcc
  },
  rose: {
    name: 'Rose Pearl & White Gold',
    bg: 0xfcf4f5,
    ambient: 0xfff0f3,
    spot: 0xffe8ec,
    fill: 0xecdfe3
  },
  mint: {
    name: 'Emerald Frost & Opal',
    bg: 0xf2f7f5,
    ambient: 0xf0faf6,
    spot: 0xe8f8f2,
    fill: 0xddeee8
  }
};

function initThemeEngine() {
  const themeBtns = document.querySelectorAll('.theme-opt-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.dataset.themeVal;
      switchTheme(targetTheme);
    });
  });

  const savedTheme = localStorage.getItem('arman_luxury_theme') || 'ivory';
  switchTheme(savedTheme, false);

  const sideFwBtn = document.getElementById('side-fireworks-btn');
  if (sideFwBtn) {
    sideFwBtn.addEventListener('click', () => {
      trigger3DFireworks(0, 5, 0, 75);
      showToast('Arman bhai ke liye aasman me fireworks! 🎆✨');
    });
  }
}

function switchTheme(themeName, animate = true) {
  if (!luxuryThemes[themeName]) themeName = 'ivory';
  currentTheme = themeName;

  document.documentElement.setAttribute('data-theme', themeName);

  document.querySelectorAll('.theme-opt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeVal === themeName);
  });

  const cfg = luxuryThemes[themeName];
  if (scene) {
    const dur = animate ? 0.9 : 0;
    const r = ((cfg.bg >> 16) & 255) / 255;
    const g = ((cfg.bg >> 8) & 255) / 255;
    const b = (cfg.bg & 255) / 255;

    if (dur > 0 && typeof gsap !== 'undefined') {
      gsap.to(scene.background, { r, g, b, duration: dur });
      if (scene.fog) gsap.to(scene.fog.color, { r, g, b, duration: dur });
      if (ambientLight) {
        const ar = ((cfg.ambient >> 16) & 255) / 255;
        const ag = ((cfg.ambient >> 8) & 255) / 255;
        const ab = (cfg.ambient & 255) / 255;
        gsap.to(ambientLight.color, { r: ar, g: ag, b: ab, duration: dur });
      }
    } else {
      scene.background.setHex(cfg.bg);
      if (scene.fog) scene.fog.color.setHex(cfg.bg);
      if (ambientLight) ambientLight.color.setHex(cfg.ambient);
    }
  }

  localStorage.setItem('arman_luxury_theme', themeName);
  if (animate) {
    playCandleBlowSound();
    showToast(`Light Theme Changed: ${cfg.name} ✨`);
  }
}

// ========================================================
// 14. PAGE NAVIGATION ENGINE (3D STAGE, HALL OF FAME, ARCADE)
// ========================================================
function initPageNavigation() {
  const pageTabBtns = document.querySelectorAll('.nav-tab-btn');
  pageTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      switchAppPage(page);
    });
  });
}

function switchAppPage(pageId) {
  currentPage = pageId;

  document.querySelectorAll('.nav-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });

  const hallOfFame = document.getElementById('page-hall-of-fame');
  const arcade = document.getElementById('page-arcade');
  const heroLeft = document.getElementById('hero-left-wish');
  const heroRight = document.getElementById('hero-right-name');
  const stageHero = document.getElementById('stage-hero-banner');
  const sceneHint = document.getElementById('scene-hint');

  if (pageId === 'stage') {
    if (hallOfFame) hallOfFame.classList.remove('active');
    if (arcade) arcade.classList.remove('active');
    if (heroLeft) heroLeft.style.display = 'flex';
    if (heroRight) heroRight.style.display = 'flex';
    if (stageHero) stageHero.style.display = 'flex';
    if (sceneHint) sceneHint.style.display = 'flex';
  } else if (pageId === 'awards') {
    if (hallOfFame) hallOfFame.classList.add('active');
    if (arcade) arcade.classList.remove('active');
    if (heroLeft) heroLeft.style.display = 'none';
    if (heroRight) heroRight.style.display = 'none';
    if (stageHero) stageHero.style.display = 'none';
    if (sceneHint) sceneHint.style.display = 'none';
    playTrophySound();
  } else if (pageId === 'arcade') {
    if (arcade) arcade.classList.add('active');
    if (hallOfFame) hallOfFame.classList.remove('active');
    if (heroLeft) heroLeft.style.display = 'none';
    if (heroRight) heroRight.style.display = 'none';
    if (stageHero) stageHero.style.display = 'none';
    if (sceneHint) sceneHint.style.display = 'none';
    drawTreatWheel();
    playBalloonPopSound(1.2);
  }
}

// ========================================================
// 15. ARMAN'S HALL OF FAME (BIG BROTHER AWARDS)
// ========================================================
function initHallOfFame() {
  document.querySelectorAll('.award-claim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const awardName = btn.dataset.awardName || 'Champion Brother';
      claimBhaiAward(btn, awardName);
    });
  });
}

function claimBhaiAward(btn, awardName) {
  const card = btn.closest('.award-card');
  if (card) card.classList.add('claimed');
  btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>Claimed By Arman! 🥇</span>';
  trigger3DFireworks(0, 5, 0, 75);
  playTrophySound();
  showToast(`Award Claimed: "${awardName}"! Arman Bhai is the Legend! 🏆👑`);
}

// ========================================================
// 16. BHAIYA'S BIRTHDAY ARCADE (BALLOON BLITZ & LUCKY WHEEL)
// ========================================================
let balloonGameState = {
  active: false,
  score: 0,
  timeLeft: 30,
  combo: 1,
  comboTimer: null,
  spawnTimer: null,
  gameTimer: null
};

const wheelSlices = [
  { text: 'Pizza Treat 🍕', color: '#fcedc7', textColor: '#5c3d06' },
  { text: 'Morning Chai ☕', color: '#fae1e5', textColor: '#631f28' },
  { text: 'VIP Gaming 🎮', color: '#ddf5e8', textColor: '#18543a' },
  { text: 'Bhaiya Hukum 👑', color: '#fbe2a0', textColor: '#5c3d06' },
  { text: 'Long Drive 🚗', color: '#fde5e8', textColor: '#631f28' },
  { text: 'Movie Night 🎬', color: '#dff6eb', textColor: '#18543a' },
  { text: 'Secret Gift 🎁', color: '#fcefcb', textColor: '#5c3d06' },
  { text: 'Cake Slice 🍰', color: '#fde9eb', textColor: '#631f28' }
];

let wheelRotation = 0;
let isWheelSpinning = false;

function initArcadeGames() {
  // 1. Arcade Sub-navigation (Balloon Game vs Wheel)
  const arcadeTabs = document.querySelectorAll('.arcade-tab-btn');
  arcadeTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      arcadeTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.gameTarget;
      document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`game-panel-${target}`);
      if (activePanel) activePanel.classList.add('active');

      if (target === 'wheel') {
        drawTreatWheel();
      }
    });
  });

  // 2. Balloon Pop Blitz Setup
  const startBtn = document.getElementById('start-balloon-game-btn');
  const startOverlayBtn = document.getElementById('start-balloon-game-overlay-btn');
  if (startBtn) startBtn.addEventListener('click', startBalloonBlitzGame);
  if (startOverlayBtn) startOverlayBtn.addEventListener('click', startBalloonBlitzGame);

  // 3. Wheel Spin Button Setup
  const spinBtn = document.getElementById('spin-wheel-btn');
  if (spinBtn) spinBtn.addEventListener('click', spinTreatWheel);

  const claimVoucherBtn = document.getElementById('claim-voucher-btn');
  const voucherOverlay = document.getElementById('voucher-overlay');
  if (claimVoucherBtn) {
    claimVoucherBtn.addEventListener('click', () => {
      if (voucherOverlay) voucherOverlay.classList.remove('active');
      trigger3DFireworks(0, 5, 0, 60);
      showToast('Voucher Claimed! Chhota bhai will fulfill this treat! ❤️🤝');
    });
  }
  if (voucherOverlay) {
    voucherOverlay.addEventListener('click', (e) => {
      if (e.target === voucherOverlay) voucherOverlay.classList.remove('active');
    });
  }

  // Initial draw of the wheel
  drawTreatWheel();
}

// --- Balloon Pop Blitz Logic ---
function startBalloonBlitzGame() {
  const playfield = document.getElementById('balloon-playfield');
  const startScreen = document.getElementById('balloon-start-screen');
  const scoreEl = document.getElementById('game-score');
  const timerEl = document.getElementById('game-timer');
  const comboEl = document.getElementById('game-combo');

  if (startScreen) startScreen.style.display = 'none';

  // Reset state
  clearInterval(balloonGameState.gameTimer);
  clearInterval(balloonGameState.spawnTimer);
  clearTimeout(balloonGameState.comboTimer);

  balloonGameState.active = true;
  balloonGameState.score = 0;
  balloonGameState.timeLeft = 30;
  balloonGameState.combo = 1;

  if (scoreEl) scoreEl.textContent = '0';
  if (timerEl) timerEl.textContent = '30';
  if (comboEl) comboEl.textContent = 'x1';

  // Clear existing balloons
  document.querySelectorAll('.balloon-target').forEach(b => b.remove());

  // Game Countdown Timer (30 sec)
  balloonGameState.gameTimer = setInterval(() => {
    balloonGameState.timeLeft--;
    if (timerEl) timerEl.textContent = balloonGameState.timeLeft;

    if (balloonGameState.timeLeft <= 0) {
      endBalloonBlitzGame();
    }
  }, 1000);

  // Balloon Spawner
  balloonGameState.spawnTimer = setInterval(() => {
    if (!balloonGameState.active) return;
    spawnBlitzBalloon(playfield);
  }, 620);

  playTrophySound();
  showToast('Blitz Shuru! Balloons phodo Arman Bhai! 🎈💥');
}

function spawnBlitzBalloon(container) {
  if (!container) return;

  const b = document.createElement('div');
  b.className = 'balloon-target';

  const types = [
    { type: 'normal', pts: 10, bg: '#e87284', icon: '🎈' },
    { type: 'normal', pts: 10, bg: '#5ba3e0', icon: '🎈' },
    { type: 'normal', pts: 10, bg: '#5cc99e', icon: '🎈' },
    { type: 'normal', pts: 10, bg: '#b27de6', icon: '🎈' },
    { type: 'gold', pts: 50, bg: 'linear-gradient(135deg, #fcd274, #b3821a)', icon: '👑' },
    { type: 'bomb', pts: 100, bg: 'linear-gradient(135deg, #ff4e50, #f9d423)', icon: '💥' }
  ];

  const roll = Math.random();
  let chosen = types[0];
  if (roll > 0.88) chosen = types[5]; // bomb
  else if (roll > 0.70) chosen = types[4]; // gold
  else chosen = types[Math.floor(Math.random() * 4)];

  const startX = 6 + Math.random() * 84;
  const size = chosen.type === 'gold' ? 62 : (chosen.type === 'bomb' ? 66 : 56);
  const riseSpeed = 3.8 + Math.random() * 2.2; // seconds to rise

  b.style.left = `${startX}%`;
  b.style.bottom = `-${size + 20}px`;
  b.style.width = `${size}px`;
  b.style.height = `${size * 1.25}px`;

  b.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      background: ${chosen.bg};
      border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size * 0.42}px;
      box-shadow: 0 8px 18px rgba(0,0,0,0.12);
      border: 1.5px solid rgba(255,255,255,0.45);
    ">
      ${chosen.icon}
    </div>
    <div style="width: 2px; height: 16px; background: rgba(140,110,60,0.5); margin: 0 auto;"></div>
  `;

  // Click handler to pop
  b.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    popBlitzBalloon(b, chosen, e.clientX, e.clientY);
  });

  container.appendChild(b);

  // Animate upward
  if (typeof gsap !== 'undefined') {
    gsap.to(b, {
      y: -580,
      x: `+=${(Math.random() - 0.5) * 60}`,
      duration: riseSpeed,
      ease: 'none',
      onComplete: () => {
        b.remove();
      }
    });
  } else {
    setTimeout(() => b.remove(), riseSpeed * 1000);
  }
}

function popBlitzBalloon(el, config, clickX, clickY) {
  if (!balloonGameState.active) return;

  const rect = el.getBoundingClientRect();
  const playfield = document.getElementById('balloon-playfield');
  const playRect = playfield.getBoundingClientRect();

  const relX = rect.left + rect.width / 2 - playRect.left;
  const relY = rect.top + rect.height / 2 - playRect.top;

  // Sound & Points
  playBalloonPopSound(1.0 + (balloonGameState.combo * 0.1));
  const earnedPts = config.pts * balloonGameState.combo;
  balloonGameState.score += earnedPts;

  // Increase combo
  balloonGameState.combo = Math.min(balloonGameState.combo + 1, 5);
  const comboEl = document.getElementById('game-combo');
  if (comboEl) comboEl.textContent = `x${balloonGameState.combo}`;

  clearTimeout(balloonGameState.comboTimer);
  balloonGameState.comboTimer = setTimeout(() => {
    balloonGameState.combo = 1;
    if (comboEl) comboEl.textContent = 'x1';
  }, 1600);

  const scoreEl = document.getElementById('game-score');
  if (scoreEl) scoreEl.textContent = balloonGameState.score;

  // Floating score text
  const floater = document.createElement('div');
  floater.className = 'balloon-score-floater';
  floater.textContent = `+${earnedPts}${balloonGameState.combo > 1 ? ' 🔥' : ''}`;
  floater.style.left = `${relX - 16}px`;
  floater.style.top = `${relY - 10}px`;
  playfield.appendChild(floater);
  setTimeout(() => floater.remove(), 700);

  // Sparks
  const numSparks = config.type === 'bomb' ? 24 : 10;
  for (let i = 0; i < numSparks; i++) {
    const spark = document.createElement('div');
    spark.className = 'balloon-spark-particle';
    const angle = (i / numSparks) * Math.PI * 2;
    const dist = 30 + Math.random() * 45;
    spark.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
    spark.style.left = `${relX}px`;
    spark.style.top = `${relY}px`;
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.background = config.type === 'gold' ? '#d4a034' : '#e87284';
    playfield.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }

  // If bomb, pop all others
  if (config.type === 'bomb') {
    playConfettiPopSound();
    trigger3DFireworks(0, 5, 0, 45);
    document.querySelectorAll('.balloon-target').forEach(other => {
      if (other !== el) {
        other.remove();
        balloonGameState.score += 15;
      }
    });
    if (scoreEl) scoreEl.textContent = balloonGameState.score;
  }

  el.remove();
}

function endBalloonBlitzGame() {
  balloonGameState.active = false;
  clearInterval(balloonGameState.gameTimer);
  clearInterval(balloonGameState.spawnTimer);
  clearTimeout(balloonGameState.comboTimer);

  document.querySelectorAll('.balloon-target').forEach(b => b.remove());

  const startScreen = document.getElementById('balloon-start-screen');
  if (startScreen) {
    let titleBadge = '🎈 Great Effort Arman Bhai!';
    if (balloonGameState.score >= 500) {
      titleBadge = '👑 Undefeated Legend Arman Bhai!';
    } else if (balloonGameState.score >= 250) {
      titleBadge = '⚡ High Speed Brother Agility!';
    }

    startScreen.innerHTML = `
      <div style="font-size: 3.2rem;">🏆🎉</div>
      <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary);">
        Blitz Challenge Complete!
      </h3>
      <div style="
        background: var(--gold-gradient);
        color: #ffffff;
        font-weight: 800;
        font-size: 1.4rem;
        padding: 8px 24px;
        border-radius: var(--radius-full);
        box-shadow: 0 4px 14px var(--gold-glow);
      ">
        Score: ${balloonGameState.score} Pts
      </div>
      <p style="color: var(--accent-gold); font-size: 1.05rem; font-weight: 700;">
        ${titleBadge}
      </p>
      <button class="action-btn gold-btn" id="start-balloon-game-overlay-btn" style="padding: 12px 32px; font-size: 1.02rem; margin-top: 8px;">
        <i class="fa-solid fa-rotate-right"></i> Play Again! 🎮
      </button>
    `;
    startScreen.style.display = 'flex';
    document.getElementById('start-balloon-game-overlay-btn').addEventListener('click', startBalloonBlitzGame);
  }

  trigger3DFireworks(0, 5, 0, 75);
  playTrophySound();
}

// --- Brotherhood Treat Wheel Logic ---
function drawTreatWheel() {
  const canvas = document.getElementById('treat-wheel-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const radius = width / 2 - 12;
  const centerX = width / 2;
  const centerY = height / 2;
  const numSlices = wheelSlices.length;
  const sliceAngle = (Math.PI * 2) / numSlices;

  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(wheelRotation);

  // Outer Gold Ring Shadow
  ctx.beginPath();
  ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
  ctx.strokeStyle = '#d4a034';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Draw Slices
  for (let i = 0; i < numSlices; i++) {
    const angle = i * sliceAngle;
    const slice = wheelSlices[i];

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, angle, angle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    // Divider line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Text Label
    ctx.save();
    ctx.rotate(angle + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = slice.textColor;
    ctx.font = 'bold 12.5px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(slice.text, radius - 16, 4);
    ctx.restore();
  }

  ctx.restore();
}

function spinTreatWheel() {
  if (isWheelSpinning) return;
  isWheelSpinning = true;

  const spinBtn = document.getElementById('spin-wheel-btn');
  if (spinBtn) spinBtn.disabled = true;

  const numSlices = wheelSlices.length;
  const sliceAngle = (Math.PI * 2) / numSlices;

  // Extra full turns (5 to 8) + random offset
  const fullSpins = 5 + Math.floor(Math.random() * 3);
  const randomSliceIndex = Math.floor(Math.random() * numSlices);
  const targetAngle = wheelRotation + fullSpins * Math.PI * 2 + (randomSliceIndex * sliceAngle) + (sliceAngle / 2);

  const animObj = { rot: wheelRotation };
  let lastSliceTick = 0;

  if (typeof gsap !== 'undefined') {
    gsap.to(animObj, {
      rot: targetAngle,
      duration: 4.6,
      ease: 'power4.out',
      onUpdate: () => {
        wheelRotation = animObj.rot;
        drawTreatWheel();

        // Sound tick on each slice
        const currentSlice = Math.floor(wheelRotation / sliceAngle);
        if (currentSlice !== lastSliceTick) {
          playBalloonPopSound(1.4);
          lastSliceTick = currentSlice;
        }
      },
      onComplete: () => {
        isWheelSpinning = false;
        if (spinBtn) spinBtn.disabled = false;

        // Pointer is at 12 o'clock (which corresponds to 3*PI/2)
        const normalizedAngle = (wheelRotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const pointerAngle = (Math.PI * 1.5 - normalizedAngle + Math.PI * 2) % (Math.PI * 2);
        const winnerIndex = Math.floor(pointerAngle / sliceAngle) % numSlices;
        const winner = wheelSlices[winnerIndex];

        // Show Voucher
        const voucherOverlay = document.getElementById('voucher-overlay');
        const voucherText = document.getElementById('voucher-prize-name');
        if (voucherText) voucherText.textContent = winner.text;
        if (voucherOverlay) voucherOverlay.classList.add('active');

        playTrophySound();
        trigger3DFireworks(0, 5, 0, 80);
        showToast(`Bhaiya Won: "${winner.text}"! Claim Voucher Ready! 🎁👑`);
      }
    });
  }
}
