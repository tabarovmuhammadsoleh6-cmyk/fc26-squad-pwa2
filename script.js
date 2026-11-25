const SAVE_KEY = "fc26_ultimate_squad_save_v8";
const MAX_UPGRADES = 5;
const MATCH_REAL_DURATION_SEC = 60;
const EVENT_STREAK_GOAL = 3;

// Растущая цена в кубках за каждую попытку в контейнере (1-я бесплатная = 0)
const CONTAINER_COSTS = [0, 1, 2, 3, 5, 7, 10, 13, 17, 21, 26, 32, 39, 47, 56];

const LEAGUES = {
  amateur: {
    name: "Любительская лига",
    minOvr: 66,
    maxOvr: 75,
    rewardBonus: 650,
    trophyReward: 1
  },
  pro: {
    name: "Профи-лига",
    minOvr: 76,
    maxOvr: 85,
    rewardBonus: 1100,
    trophyReward: 3
  },
  elite: {
    name: "Элитная лига",
    minOvr: 86,
    maxOvr: 95,
    rewardBonus: 1800,
    trophyReward: 6
  },
  legends: {
    name: "Лига Легенд",
    minOvr: 96,
    maxOvr: 105,
    rewardBonus: 3000,
    trophyReward: 12
  },
  ultimate: {
    name: "Абсолютная лига (106–115)",
    minOvr: 106,
    maxOvr: 115,
    rewardBonus: 5000,
    trophyReward: 25
  }
};

const FORMATIONS = {
  "4-3-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["CM1", "CAM", "CM2"],
      ["LB", "CB1", "CB2", "RB"],
      ["GK"]
    ]
  },
  "4-3-4": {
    lines: [
      ["LW", "ST1", "ST2", "RW"],
      ["CM1", "CAM", "CM2"],
      ["LB", "CB1", "RB"],
      ["GK"]
    ]
  },
  "4-2-4": {
    lines: [
      ["LW", "ST1", "ST2", "RW"],
      ["CM1", "CM2"],
      ["LB", "CB1", "CB2", "RB"],
      ["GK"]
    ]
  },
  "3-4-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["LM", "CM1", "CM2", "RM"],
      ["CB1", "CB2", "CB3"],
      ["GK"]
    ]
  },
  "5-2-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["CM1", "CM2"],
      ["LWB", "CB1", "CB2", "CB3", "RWB"],
      ["GK"]
    ]
  }
};

const FORMATION_KEYS = Object.keys(FORMATIONS);

const RARITY_BASE_SELL = {
  bronze: 200,
  silver: 425,
  gold: 700,
  totw: 1050,
  hero: 1300,
  toty: 1500,
  icon: 1600,
  prime99: 4500,
  fut102: 2400,
  ultra105: 3750,
  galacticos109: 5750,
  immortal112: 8250,
  god115: 12000,
  mythic120: 30000,
  valverde122: 45000
};

const SPECIAL_120_PLAYER = {
  name: "Диего Марадона",
  pos: "CAM",
  ovr: 120,
  rarity: "mythic120",
  avatar: "🔱",
  upgrades: 0,
  isSpecial120: true,
  maxCap: 125
};

const VALVERDE_122_PLAYER = {
  name: "Вальверде",
  pos: "CM",
  ovr: 122,
  rarity: "valverde122",
  avatar: "🚀",
  upgrades: 0,
  isValverde122: true,
  maxCap: 127
};

const PLAYERS_DB = {
  bronze: [
    { name: "Артём Соколов", pos: "ST", ovr: 69, avatar: "⚽" },
    { name: "Максим Орлов", pos: "LW", ovr: 68, avatar: "🏃" },
    { name: "Даниил Волков", pos: "RW", ovr: 70, avatar: "⚡" },
    { name: "Илья Морозов", pos: "CAM", ovr: 69, avatar: "🎯" },
    { name: "Кирилл Лебедев", pos: "CM", ovr: 71, avatar: "🔥" },
    { name: "Роман Зайцев", pos: "CM", ovr: 72, avatar: "🛡️" },
    { name: "Денис Соловьёв", pos: "LB", ovr: 68, avatar: "💨" },
    { name: "Никита Крылов", pos: "CB", ovr: 70, avatar: "🧱" },
    { name: "Тимур Каримов", pos: "CB", ovr: 69, avatar: "🪨" },
    { name: "Павел Громов", pos: "RB", ovr: 68, avatar: "🦅" },
    { name: "Егор Новиков", pos: "GK", ovr: 68, avatar: "🧤" },
    { name: "Олег Васильев", pos: "CM", ovr: 70, avatar: "👟" }
  ],
  silver: [
    { name: "Фёдор Чалов", pos: "ST", ovr: 79, avatar: "🎯" },
    { name: "Арсен Захарян", pos: "CAM", ovr: 80, avatar: "🪄" },
    { name: "Хвича Кварацхелия", pos: "LW", ovr: 82, avatar: "🌪️" },
    { name: "Алексей Миранчук", pos: "RW", ovr: 79, avatar: "⚡" },
    { name: "Бруно Гимарайнс", pos: "CM", ovr: 82, avatar: "💎" },
    { name: "Наиль Умяров", pos: "CM", ovr: 77, avatar: "🛡️" },
    { name: "Жереми Доку", pos: "LW", ovr: 81, avatar: "🚀" },
    { name: "Константин Тюкавин", pos: "ST", ovr: 80, avatar: "🦁" },
    { name: "Страхиня Павлович", pos: "CB", ovr: 79, avatar: "🧱" },
    { name: "Матвей Сафонов", pos: "GK", ovr: 82, avatar: "🧤" },
    { name: "Игорь Акинфеев", pos: "GK", ovr: 81, avatar: "🏆" },
    { name: "Александр Головин", pos: "CAM", ovr: 82, avatar: "✨" }
  ],
  gold: [
    { name: "Лаутаро Мартинес", pos: "ST", ovr: 87, avatar: "🐂" },
    { name: "Маркус Рэшфорд", pos: "LW", ovr: 85, avatar: "🚀" },
    { name: "Букайо Сака", pos: "RW", ovr: 87, avatar: "🏹" },
    { name: "Педри Гонсалес", pos: "CAM", ovr: 87, avatar: "🪄" },
    { name: "Федерико Вальверде", pos: "CM", ovr: 88, avatar: "💥" },
    { name: "Родри Эрнандес", pos: "CM", ovr: 88, avatar: "🧠" },
    { name: "Рафаэл Леау", pos: "LW", ovr: 86, avatar: "🐆" },
    { name: "Фил Фоден", pos: "RW", ovr: 87, avatar: "✨" },
    { name: "Вирджил ван Дейк", pos: "CB", ovr: 88, avatar: "🏰" },
    { name: "Ашраф Хакими", pos: "RB", ovr: 85, avatar: "⚡" },
    { name: "Алиссон Бекер", pos: "GK", ovr: 88, avatar: "🧤" },
    { name: "Рубен Диаш", pos: "CB", ovr: 87, avatar: "🧱" }
  ],
  totw: [
    { name: "Виктор Осимхен", pos: "ST", ovr: 90, avatar: "🎭" },
    { name: "Деклан Райс", pos: "CM", ovr: 89, avatar: "🛡️" },
    { name: "Коул Палмер", pos: "CAM", ovr: 90, avatar: "❄️" },
    { name: "Ламин Ямаль", pos: "RW", ovr: 91, avatar: "🌟" },
    { name: "Нико Уильямс", pos: "LW", ovr: 89, avatar: "💨" },
    { name: "Вильям Салиба", pos: "CB", ovr: 90, avatar: "🧱" },
    { name: "Тео Эрнандес", pos: "LB", ovr: 89, avatar: "🚂" },
    { name: "Жюль Кунде", pos: "RB", ovr: 88, avatar: "⚔️" },
    { name: "Эмилиано Мартинес", pos: "GK", ovr: 89, avatar: "🏆" },
    { name: "Мартин Эдегор", pos: "CAM", ovr: 90, avatar: "🎯" },
    { name: "Александер Исак", pos: "ST", ovr: 89, avatar: "⚡" },
    { name: "Габриэл Магальяйнс", pos: "CB", ovr: 89, avatar: "🏰" }
  ],
  hero: [
    { name: "Дидье Дрогба", pos: "ST", ovr: 92, avatar: "💪" },
    { name: "Яя Туре", pos: "CM", ovr: 92, avatar: "🚂" },
    { name: "Венсан Компани", pos: "CB", ovr: 91, avatar: "🛡️" },
    { name: "Давид Жинола", pos: "LW", ovr: 91, avatar: "🎨" },
    { name: "Людовик Жюли", pos: "RW", ovr: 89, avatar: "⚡" },
    { name: "Хорхе Кампос", pos: "GK", ovr: 89, avatar: "🌈" },
    { name: "Рафаэль Маркес", pos: "CB", ovr: 90, avatar: "🧱" },
    { name: "Парк Чжи Сун", pos: "CM", ovr: 90, avatar: "🔋" },
    { name: "Эден Азар", pos: "LW", ovr: 92, avatar: "🪄" },
    { name: "Уэсли Снейдер", pos: "CAM", ovr: 91, avatar: "🎯" },
    { name: "Фернандо Морьентес", pos: "ST", ovr: 90, avatar: "🔥" },
    { name: "Лусио", pos: "CB", ovr: 91, avatar: "🪨" }
  ],
  toty: [
    { name: "Килиан Мбаппе", pos: "ST", ovr: 97, avatar: "⚡" },
    { name: "Эрлинг Холанд", pos: "ST", ovr: 97, avatar: "🤖" },
    { name: "Родри Эрнандес", pos: "CM", ovr: 96, avatar: "🧠" },
    { name: "Джуд Беллингем", pos: "CAM", ovr: 96, avatar: "🌟" },
    { name: "Винисиус Жуниор", pos: "LW", ovr: 96, avatar: "🔥" },
    { name: "Вирджил ван Дейк", pos: "CB", ovr: 95, avatar: "🏰" },
    { name: "Алиссон Бекер", pos: "GK", ovr: 95, avatar: "🧤" },
    { name: "Тео Эрнандес", pos: "LB", ovr: 94, avatar: "🚂" },
    { name: "Ламин Ямаль", pos: "RW", ovr: 96, avatar: "💫" },
    { name: "Кевин Де Брёйне", pos: "CAM", ovr: 96, avatar: "👑" },
    { name: "Джереми Фримпонг", pos: "RB", ovr: 94, avatar: "💨" },
    { name: "Тибо Куртуа", pos: "GK", ovr: 96, avatar: "🧱" }
  ],
  icon: [
    { name: "Роналдо Назарио", pos: "ST", ovr: 97, avatar: "⚡" },
    { name: "Тьерри Анри", pos: "LW", ovr: 95, avatar: "👑" },
    { name: "Йохан Кройф", pos: "CAM", ovr: 97, avatar: "🌀" },
    { name: "Мохамед Салах", pos: "RW", ovr: 93, avatar: "👑" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 96, avatar: "🎩" },
    { name: "Роналдиньо", pos: "LW", ovr: 95, avatar: "😁" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 96, avatar: "🐐" },
    { name: "Лионель Месси", pos: "RW", ovr: 97, avatar: "👽" },
    { name: "Пеле", pos: "ST", ovr: 98, avatar: "💎" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 96, avatar: "🛡️" },
    { name: "Лев Яшин", pos: "GK", ovr: 96, avatar: "🕷️" },
    { name: "Роберто Карлос", pos: "LB", ovr: 94, avatar: "🚀" },
    { name: "Кафу", pos: "RB", ovr: 94, avatar: "⚡" },
    { name: "Андреа Пирло", pos: "CM", ovr: 94, avatar: "🎼" }
  ],
  prime99: [
    { name: "Пеле", pos: "ST", ovr: 99, avatar: "👑" },
    { name: "Лионель Месси", pos: "RW", ovr: 99, avatar: "👽" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 99, avatar: "🐐" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 99, avatar: "🎩" },
    { name: "Роналдиньо", pos: "LW", ovr: 99, avatar: "😁" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 99, avatar: "🛡️" },
    { name: "Лев Яшин", pos: "GK", ovr: 99, avatar: "🕷️" },
    { name: "Диего Марадона", pos: "CAM", ovr: 99, avatar: "🌟" },
    { name: "Роберто Карлос", pos: "LB", ovr: 99, avatar: "🚀" },
    { name: "Кафу", pos: "RB", ovr: 99, avatar: "⚡" }
  ],
  fut102: [
    { name: "Лионель Месси", pos: "RW", ovr: 101, avatar: "👽" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 101, avatar: "🐐" },
    { name: "Килиан Мбаппе", pos: "ST", ovr: 100, avatar: "⚡" },
    { name: "Эрлинг Холанд", pos: "ST", ovr: 100, avatar: "🤖" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 102, avatar: "🎩" },
    { name: "Джуд Беллингем", pos: "CAM", ovr: 101, avatar: "🌟" },
    { name: "Винисиус Жуниор", pos: "LW", ovr: 100, avatar: "🔥" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 101, avatar: "🛡️" },
    { name: "Вирджил ван Дейк", pos: "CB", ovr: 100, avatar: "🏰" },
    { name: "Лев Яшин", pos: "GK", ovr: 102, avatar: "🕷️" },
    { name: "Дэвид Бекхэм", pos: "RM", ovr: 101, avatar: "🎯" },
    { name: "Неймар Жуниор", pos: "LW", ovr: 102, avatar: "🎭" }
  ],
  ultra105: [
    { name: "Пеле", pos: "ST", ovr: 105, avatar: "👑" },
    { name: "Лионель Месси", pos: "RW", ovr: 105, avatar: "👽" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 105, avatar: "🐐" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 104, avatar: "🎩" },
    { name: "Роналдиньо", pos: "LW", ovr: 104, avatar: "😁" },
    { name: "Килиан Мбаппе", pos: "ST", ovr: 103, avatar: "⚡" },
    { name: "Эрлинг Холанд", pos: "ST", ovr: 103, avatar: "🤖" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 104, avatar: "🛡️" },
    { name: "Лев Яшин", pos: "GK", ovr: 105, avatar: "🕷️" },
    { name: "Серхио Рамос", pos: "CB", ovr: 104, avatar: "⚔️" },
    { name: "Марсело Виейра", pos: "LB", ovr: 103, avatar: "🔥" },
    { name: "Дани Алвес", pos: "RB", ovr: 103, avatar: "⚡" }
  ],
  galacticos109: [
    { name: "Роналдо Назарио", pos: "ST", ovr: 109, avatar: "💫" },
    { name: "Лионель Месси", pos: "RW", ovr: 109, avatar: "👽" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 109, avatar: "🐐" },
    { name: "Диего Марадона", pos: "CAM", ovr: 108, avatar: "🌌" },
    { name: "Йохан Кройф", pos: "CAM", ovr: 108, avatar: "🌀" },
    { name: "Неймар Жуниор", pos: "LW", ovr: 107, avatar: "🎭" },
    { name: "Ламин Ямаль", pos: "RW", ovr: 107, avatar: "🌟" },
    { name: "Лука Модрич", pos: "CM", ovr: 107, avatar: "🎼" },
    { name: "Тони Кроос", pos: "CM", ovr: 107, avatar: "🎯" },
    { name: "Франц Беккенбауэр", pos: "CB", ovr: 108, avatar: "👑" },
    { name: "Фабио Каннаваро", pos: "CB", ovr: 106, avatar: "🧱" },
    { name: "Джанлуиджи Буффон", pos: "GK", ovr: 108, avatar: "🧤" }
  ],
  immortal112: [
    { name: "Пеле", pos: "ST", ovr: 112, avatar: "🔥" },
    { name: "Лионель Месси", pos: "RW", ovr: 112, avatar: "🐉" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 112, avatar: "🐐" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 111, avatar: "🎩" },
    { name: "Роналдиньо", pos: "LW", ovr: 111, avatar: "😁" },
    { name: "Килиан Мбаппе", pos: "ST", ovr: 110, avatar: "⚡" },
    { name: "Эрлинг Холанд", pos: "ST", ovr: 110, avatar: "🤖" },
    { name: "Джуд Беллингем", pos: "CAM", ovr: 110, avatar: "🌟" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 111, avatar: "🛡️" },
    { name: "Роберто Карлос", pos: "LB", ovr: 110, avatar: "🚀" },
    { name: "Кафу", pos: "RB", ovr: 110, avatar: "⚡" },
    { name: "Лев Яшин", pos: "GK", ovr: 112, avatar: "🕷️" }
  ],
  god115: [
    { name: "Пеле", pos: "ST", ovr: 115, avatar: "☄️" },
    { name: "Лионель Месси", pos: "RW", ovr: 115, avatar: "🧬" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 115, avatar: "👑" },
    { name: "Диего Марадона", pos: "CAM", ovr: 115, avatar: "🌌" },
    { name: "Роналдиньо", pos: "LW", ovr: 114, avatar: "🪄" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 114, avatar: "🎩" },
    { name: "Роналдо Назарио", pos: "ST", ovr: 114, avatar: "⚡" },
    { name: "Кевин Де Брёйне", pos: "CM", ovr: 113, avatar: "💎" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 115, avatar: "🛡️" },
    { name: "Франц Беккенбауэр", pos: "CB", ovr: 114, avatar: "🏰" },
    { name: "Роберто Карлос", pos: "LB", ovr: 113, avatar: "🚀" },
    { name: "Кафу", pos: "RB", ovr: 113, avatar: "🔥" },
    { name: "Лев Яшин", pos: "GK", ovr: 115, avatar: "🕷️" }
  ]
};

const UNIQUE_ROSTER_BY_POS = {
  GK: ["Лев Яшин", "Джанлуиджи Буффон", "Матвей Сафонов", "Тибо Куртуа", "Алиссон Бекер", "Игорь Акинфеев"],
  LB: ["Роберто Карлос", "Марсело Виейра", "Тео Эрнандес", "Альфонсо Дэвис", "Жорди Альба", "Эндрю Робертсон"],
  LWB: ["Марсело Виейра", "Тео Эрнандес", "Альфонсо Дэвис", "Жорди Альба", "Фредерико Димарко", "Рафаэл Геррейру"],
  CB: ["Паоло Мальдини", "Франц Беккенбауэр", "Серхио Рамос", "Вирджил ван Дейк", "Фабио Каннаваро", "Рубен Диаш"],
  RB: ["Кафу", "Ашраф Хакими", "Дани Алвес", "Жюль Кунде", "Джереми Фримпонг", "Филипп Лам"],
  RWB: ["Кафу", "Ашраф Хакими", "Дани Алвес", "Джереми Фримпонг", "Жоау Канселу", "Педро Порро"],
  LM: ["Роналдиньо", "Неймар Жуниор", "Винисиус Жуниор", "Хвича Кварацхелия", "Эден Азар", "Нико Уильямс"],
  CM: ["Зинедин Зидан", "Кевин Де Брёйне", "Лука Модрич", "Тони Кроос", "Андреа Пирло", "Родри Эрнандес"],
  CAM: ["Диего Марадона", "Йохан Кройф", "Джуд Беллингем", "Джамал Мусиала", "Флориан Вирц", "Мартин Эдегор"],
  RM: ["Мохамед Салах", "Ламин Ямаль", "Букайо Сака", "Дэвид Бекхэм", "Фил Фоден", "Родриго Гоэс"],
  LW: ["Тьерри Анри", "Роналдиньо", "Винисиус Жуниор", "Неймар Жуниор", "Хвича Кварацхелия", "Давид Жинола"],
  ST: ["Пеле", "Криштиану Роналду", "Роналдо Назарио", "Килиан Мбаппе", "Эрлинг Холанд", "Лаутаро Мартинес"],
  RW: ["Лионель Месси", "Мохамед Салах", "Ламин Ямаль", "Букайо Сака", "Фил Фоден", "Гарет Бэйл"]
};

let state = {
  coins: 2000,
  wins: 0,
  league: "amateur",
  formation: "4-3-3",
  club: [],
  squad: {},
  enemyOvr: 70,
  pullQueue: [],
  currentPackPrice: 400,
  matchRunning: false,
  eventStreak: 0,
  doubleLuck: false,
  special120Claimed: false,
  containerSlots: []
};

let hoveredPlayerId = null;
let selectedSellPlayerId = null;
let pendingSellPlayerId = null;
let toastTimer = null;

let drillState = {
  running: false,
  score: 0,
  timeLeft: 10,
  timerId: null
};

const keysDown = {};
let matchSim = null;
let matchAnimFrameId = null;

function isTypingInField() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable;
}

window.addEventListener("keydown", e => {
  const code = e.code;
  keysDown[code] = true;

  if (
    state.matchRunning &&
    [
      "Space",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ControlLeft",
      "ControlRight",
      "KeyQ"
    ].includes(code)
  ) {
    e.preventDefault();
  }

  if (!state.matchRunning && e.key === "Shift" && !e.repeat && hoveredPlayerId !== null && !isTypingInField()) {
    const revealOverlay = document.getElementById("pack-reveal");
    const confirmOverlay = document.getElementById("sell-confirm-modal");
    if (revealOverlay && !revealOverlay.classList.contains("hidden")) return;
    if (confirmOverlay && !confirmOverlay.classList.contains("hidden")) return;
    requestSellPlayer(hoveredPlayerId);
    return;
  }

  if (!state.matchRunning || !matchSim || e.repeat) return;

  if (code === "KeyQ") {
    switchToClosestPlayerToBall();
  }

  if (code === "Space") {
    handlePlayerShoot();
  }

  if (code === "ControlLeft" || code === "ControlRight") {
    handlePlayerTackle();
  }
});

window.addEventListener("keyup", e => {
  keysDown[e.code] = false;
});

function setupMobileTouchControls() {
  const controlsWrap = document.getElementById("mobile-controls");
  if (!controlsWrap) return;

  controlsWrap.querySelectorAll("[data-key]").forEach(btn => {
    const keyCode = btn.dataset.key;

    const press = e => {
      e.preventDefault();
      keysDown[keyCode] = true;
      btn.classList.add("pressed");
    };

    const release = e => {
      if (e) e.preventDefault();
      keysDown[keyCode] = false;
      btn.classList.remove("pressed");
    };

    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointerleave", release);
    btn.addEventListener("pointercancel", release);
  });

  controlsWrap.querySelectorAll("[data-action]").forEach(btn => {
    const action = btn.dataset.action;

    btn.addEventListener("pointerdown", e => {
      e.preventDefault();
      btn.classList.add("pressed");
      if (!state.matchRunning || !matchSim) return;

      if (action === "switch") switchToClosestPlayerToBall();
      if (action === "shoot") handlePlayerShoot();
      if (action === "tackle") handlePlayerTackle();
    });

    const unpress = () => btn.classList.remove("pressed");
    btn.addEventListener("pointerup", unpress);
    btn.addEventListener("pointerleave", unpress);
    btn.addEventListener("pointercancel", unpress);
  });
}

function shuffleArray(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildContainerPool15() {
  const items = [
    { kind: "player", name: "Вальверде", pos: "CM", ovr: 122, rarity: "valverde122", avatar: "🚀", isValverde122: true, maxCap: 127, isTop: true },
    { kind: "player", name: "Килиан Мбаппе", pos: "ST", ovr: 115, rarity: "god115", avatar: "⚡" },
    { kind: "player", name: "Лионель Месси", pos: "RW", ovr: 115, rarity: "god115", avatar: "👽" },
    { kind: "player", name: "Криштиану Роналду", pos: "ST", ovr: 114, rarity: "immortal112", avatar: "🐐" },
    { kind: "player", name: "Джуд Беллингем", pos: "CAM", ovr: 112, rarity: "immortal112", avatar: "🌟" },
    { kind: "player", name: "Винисиус Жуниор", pos: "LW", ovr: 109, rarity: "galacticos109", avatar: "🔥" },
    { kind: "player", name: "Ламин Ямаль", pos: "RW", ovr: 105, rarity: "ultra105", avatar: "💫" },
    { kind: "player", name: "Зинедин Зидан", pos: "CM", ovr: 102, rarity: "fut102", avatar: "🎩" },
    { kind: "player", name: "Паоло Мальдини", pos: "CB", ovr: 99, rarity: "prime99", avatar: "🛡️" },
    { kind: "player", name: "Лев Яшин", pos: "GK", ovr: 96, rarity: "icon", avatar: "🕷️" },
    { kind: "coins", amount: 15000, label: "+15 000 💰", avatar: "💰" },
    { kind: "coins", amount: 8000, label: "+8 000 💰", avatar: "🪙" },
    { kind: "coins", amount: 5000, label: "+5 000 💰", avatar: "💵" },
    { kind: "coins", amount: 2500, label: "+2 500 💰", avatar: "💸" },
    { kind: "coins", amount: 1500, label: "+1 500 💰", avatar: "🏅" }
  ];

  return shuffleArray(items).map((prize, idx) => ({
    index: idx,
    opened: false,
    prize
  }));
}

function getContainerOpenedCount() {
  return (state.containerSlots || []).filter(s => s.opened).length;
}

function getNextContainerCost() {
  const opened = getContainerOpenedCount();
  return CONTAINER_COSTS[opened] ?? CONTAINER_COSTS[CONTAINER_COSTS.length - 1];
}

function resetContainerBoard() {
  if (state.matchRunning) return;
  const resetCost = 3;
  if (state.wins < resetCost) {
    alert(`Для обновления контейнера нужно ${resetCost} 🏆 кубков!`);
    return;
  }
  state.wins -= resetCost;
  state.containerSlots = buildContainerPool15();
  saveProgress();
  renderAll();
  showToast("📦 Контейнер обновлён! 1-я ячейка снова БЕСПЛАТНА!");
}

function claimContainerSlot(slotIndex, forceFree = false) {
  if (state.matchRunning) return;
  const slot = state.containerSlots[slotIndex];
  if (!slot || slot.opened) return;

  const cost = forceFree ? 0 : getNextContainerCost();
  if (!forceFree && cost > 0 && state.wins < cost) {
    alert(`Нужно ${cost} 🏆 кубков для открытия этой ячейки! Сейчас у тебя: ${state.wins} 🏆.`);
    return;
  }

  if (!forceFree && cost > 0) {
    state.wins -= cost;
  }
  slot.opened = true;

  if (slot.prize.kind === "coins") {
    state.coins += slot.prize.amount;
    if (!forceFree) {
      saveProgress();
      renderAll();
      showToast(`📦 Ячейка #${slotIndex + 1}: ${slot.prize.label}!`);
    }
    return { type: "coins", label: slot.prize.label, amount: slot.prize.amount };
  }

  const cardObj = {
    id: Date.now() + Math.random() + slotIndex,
    name: slot.prize.name,
    pos: slot.prize.pos,
    ovr: slot.prize.ovr,
    rarity: slot.prize.rarity,
    avatar: slot.prize.avatar,
    upgrades: 0,
    isValverde122: Boolean(slot.prize.isValverde122),
    maxCap: slot.prize.maxCap || 120
  };

  state.club.push(cardObj);
  if (!forceFree) {
    saveProgress();
    renderAll();
    state.currentPackPrice = RARITY_BASE_SELL[cardObj.rarity] || 10000;
    state.pullQueue = [cardObj];
    showNextPulledCard();
  }
  return { type: "player", card: cardObj };
}

function openAllContainerSlotsByPromo() {
  const addedPlayers = [];
  let addedCoins = 0;

  state.containerSlots.forEach((slot, idx) => {
    if (!slot.opened) {
      const res = claimContainerSlot(idx, true);
      if (res && res.type === "coins") addedCoins += res.amount || 0;
      if (res && res.type === "player") addedPlayers.push(res.card);
    }
  });

  saveProgress();
  renderAll();

  if (addedPlayers.length > 0) {
    state.currentPackPrice = 15000;
    state.pullQueue = addedPlayers;
    showNextPulledCard();
  } else {
    showToast(`📦 Все ячейки открыты! Получено +${addedCoins} 💰`);
  }
}

function renderContainerTab() {
  const grid = document.getElementById("container-grid");
  if (!grid) return;

  if (!Array.isArray(state.containerSlots) || state.containerSlots.length !== 15) {
    state.containerSlots = buildContainerPool15();
  }

  const openedCount = getContainerOpenedCount();
  const nextCost = getNextContainerCost();

  document.getElementById("container-opened-count").textContent = String(openedCount);
  const nextCostEl = document.getElementById("container-next-cost");
  if (openedCount >= 15) {
    nextCostEl.textContent = "ВСЁ ОТКРЫТО";
  } else {
    nextCostEl.textContent = nextCost === 0 ? "БЕСПЛАТНО" : `${nextCost} 🏆`;
  }

  grid.innerHTML = "";
  state.containerSlots.forEach((slot, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isTop = Boolean(slot.prize.isTop);
    btn.className =
      "crate-cell" +
      (slot.opened ? " opened" : "") +
      (slot.opened && isTop ? " top-prize" : "");

    if (!slot.opened) {
      const priceText = nextCost === 0 ? "БЕСПЛАТНО" : `${nextCost} 🏆`;
      btn.innerHTML = `
        <span class="crate-num">ЯЧЕЙКА #${idx + 1}</span>
        <span class="crate-emoji">📦</span>
        <span class="crate-title">Скрытый приз</span>
        <span class="crate-cost ${nextCost > 0 ? "paid" : ""}">${priceText}</span>
      `;
      btn.onclick = () => claimContainerSlot(idx, false);
    } else if (slot.prize.kind === "coins") {
      btn.innerHTML = `
        <span class="crate-num">ЯЧЕЙКА #${idx + 1}</span>
        <span class="crate-emoji">${slot.prize.avatar}</span>
        <span class="crate-title">Монеты</span>
        <span class="crate-cost paid">${slot.prize.label}</span>
      `;
    } else {
      btn.innerHTML = `
        <span class="crate-num">ЯЧЕЙКА #${idx + 1}</span>
        <span class="crate-emoji">${slot.prize.avatar}</span>
        <span class="crate-title">${slot.prize.name}</span>
        <span class="crate-cost paid">${slot.prize.ovr} OVR (${slot.prize.pos})</span>
      `;
    }

    grid.appendChild(btn);
  });
}

function getAllSlotsForFormation(formKey) {
  return FORMATIONS[formKey].lines.flat();
}

function getEffectiveOvr(player) {
  const upg = Math.min(MAX_UPGRADES, player.upgrades || 0);
  const cap = player.maxCap || (player.isValverde122 ? 127 : player.isSpecial120 ? 125 : 120);
  return Math.min(cap, player.ovr + upg);
}

function getUpgradeCost(currentUpgrades) {
  return currentUpgrades + 1;
}

function getPlayerSellValue(player) {
  const base = RARITY_BASE_SELL[player.rarity] || Math.round(player.ovr * 20);
  const upgBonus = (player.upgrades || 0) * 200;
  return base + upgBonus;
}

function showToast(text) {
  const el = document.getElementById("toast-notify");
  if (!el) return;
  el.textContent = text;
  el.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add("hidden");
  }, 2400);
}

function isPlayerCompatibleWithSlot(player, slotCode) {
  const role = slotCode.replace(/[0-9]/g, "");
  if (role === "GK") return player.pos === "GK";
  if (player.pos === "GK") return false;
  if (player.pos === role) return true;

  const attackRoles = ["ST", "LW", "RW"];
  const midRoles = ["CM", "CAM", "LM", "RM"];
  const defRoles = ["CB", "LB", "RB", "LWB", "RWB"];

  if (attackRoles.includes(role) && attackRoles.includes(player.pos)) return true;
  if (midRoles.includes(role) && midRoles.includes(player.pos)) return true;
  if (defRoles.includes(role) && defRoles.includes(player.pos)) return true;

  return false;
}

function pickBestCandidate(pool, slotCode, usedIds, usedNames) {
  const cleanRole = slotCode.replace(/[0-9]/g, "");
  const exactPos = pool.find(
    p => !usedIds.has(p.id) && !usedNames.has(p.name) && p.pos === cleanRole
  );
  if (exactPos) return exactPos;

  const compatPos = pool.find(
    p => !usedIds.has(p.id) && !usedNames.has(p.name) && isPlayerCompatibleWithSlot(p, slotCode)
  );
  if (compatPos) return compatPos;

  return cleanRole === "GK"
    ? pool.find(p => !usedIds.has(p.id) && !usedNames.has(p.name) && p.pos === "GK")
    : pool.find(p => !usedIds.has(p.id) && !usedNames.has(p.name) && p.pos !== "GK");
}

function sanitizeSquad() {
  const slots = getAllSlotsForFormation(state.formation);
  const validClubIds = new Set(state.club.map(p => p.id));
  const usedIds = new Set();
  const usedNames = new Set();
  const nextSquad = {};

  slots.forEach(slotCode => {
    const pid = state.squad[slotCode];
    const p = state.club.find(item => item.id === pid);
    if (
      p &&
      validClubIds.has(pid) &&
      !usedIds.has(pid) &&
      !usedNames.has(p.name) &&
      isPlayerCompatibleWithSlot(p, slotCode)
    ) {
      nextSquad[slotCode] = pid;
      usedIds.add(pid);
      usedNames.add(p.name);
    }
  });

  const sortedByOvr = [...state.club].sort((a, b) => getEffectiveOvr(b) - getEffectiveOvr(a));
  slots.forEach(slotCode => {
    if (nextSquad[slotCode] === undefined) {
      const candidate = pickBestCandidate(sortedByOvr, slotCode, usedIds, usedNames);
      if (candidate) {
        nextSquad[slotCode] = candidate.id;
        usedIds.add(candidate.id);
        usedNames.add(candidate.name);
      }
    }
  });

  state.squad = nextSquad;
}

function equipUniquePlayerToSquad(player, preferredSlot = null) {
  const slots = getAllSlotsForFormation(state.formation);
  const cleanRole = player.pos;

  if (cleanRole === "GK") {
    const gkSlot = slots.find(s => s === "GK");
    if (!gkSlot) return;
    state.squad[gkSlot] = player.id;
    sanitizeSquad();
    return;
  }

  let targetSlot =
    preferredSlot && slots.includes(preferredSlot) && isPlayerCompatibleWithSlot(player, preferredSlot)
      ? preferredSlot
      : slots.find(s => s.replace(/[0-9]/g, "") === cleanRole) ||
        slots.find(s => isPlayerCompatibleWithSlot(player, s)) ||
        slots.find(s => s !== "GK");

  if (!targetSlot) return;

  Object.keys(state.squad).forEach(s => {
    const existing = state.club.find(item => item.id === state.squad[s]);
    if (state.squad[s] === player.id && s !== targetSlot) {
      delete state.squad[s];
    } else if (existing && existing.name === player.name && s !== targetSlot) {
      delete state.squad[s];
    }
  });

  state.squad[targetSlot] = player.id;
  sanitizeSquad();
}

function closeSellConfirmModal() {
  pendingSellPlayerId = null;
  const modal = document.getElementById("sell-confirm-modal");
  if (modal) modal.classList.add("hidden");
}

function requestSellPlayer(playerId, event) {
  if (event) event.stopPropagation();

  if (state.matchRunning) {
    showToast("Нельзя продавать игроков во время матча!");
    return;
  }

  const player = state.club.find(p => p.id === playerId);
  if (!player) return;

  if (state.club.length <= 11) {
    showToast("Нельзя продать: в клубе должно оставаться минимум 11 игроков!");
    return;
  }

  pendingSellPlayerId = playerId;
  const sellAmount = getPlayerSellValue(player);
  const modal = document.getElementById("sell-confirm-modal");
  const textEl = document.getElementById("sell-confirm-text");

  if (textEl) {
    textEl.textContent = `Вы точно хотите его продать? (${player.name} — ${getEffectiveOvr(player)} OVR за ${sellAmount} 💰)`;
  }
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function sellPlayerById(playerId) {
  if (state.matchRunning) {
    showToast("Нельзя продавать игроков во время матча!");
    return;
  }

  const player = state.club.find(p => p.id === playerId);
  if (!player) return;

  if (state.club.length <= 11) {
    showToast("Нельзя продать: в клубе должно оставаться минимум 11 игроков!");
    return;
  }

  const sellAmount = getPlayerSellValue(player);
  if (player.isSpecial120) {
    state.special120Claimed = false;
  }
  state.club = state.club.filter(p => p.id !== playerId);

  Object.keys(state.squad).forEach(slotKey => {
    if (state.squad[slotKey] === playerId) {
      delete state.squad[slotKey];
    }
  });

  sanitizeSquad();
  state.coins += sellAmount;
  hoveredPlayerId = null;
  if (selectedSellPlayerId === playerId) {
    selectedSellPlayerId = null;
  }

  saveProgress();
  renderAll();
  showToast(`💸 Продан: ${player.name} (+${sellAmount} 💰)`);
}

function saveProgress() {
  try {
    const payload = {
      coins: state.coins,
      wins: state.wins,
      league: state.league,
      formation: state.formation,
      club: state.club,
      squad: state.squad,
      enemyOvr: state.enemyOvr,
      eventStreak: state.eventStreak,
      doubleLuck: state.doubleLuck,
      special120Claimed: state.special120Claimed,
      containerSlots: state.containerSlots
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch (e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.club) || saved.club.length === 0) return false;

    state.coins = typeof saved.coins === "number" ? saved.coins : 2000;
    state.wins = typeof saved.wins === "number" ? saved.wins : 0;
    state.league = LEAGUES[saved.league] ? saved.league : "amateur";
    state.formation = FORMATIONS[saved.formation] ? saved.formation : "4-3-3";
    state.club = saved.club.map(p => ({
      ...p,
      rarity: p.rarity || "bronze",
      upgrades: Math.min(MAX_UPGRADES, p.upgrades || 0)
    }));
    state.squad = saved.squad && typeof saved.squad === "object" ? saved.squad : {};
    state.enemyOvr = typeof saved.enemyOvr === "number" ? saved.enemyOvr : 70;
    state.eventStreak = typeof saved.eventStreak === "number" ? saved.eventStreak : 0;
    state.doubleLuck = Boolean(saved.doubleLuck);
    state.special120Claimed = Boolean(
      saved.special120Claimed || state.club.some(p => p.isSpecial120)
    );
    state.containerSlots =
      Array.isArray(saved.containerSlots) && saved.containerSlots.length === 15
        ? saved.containerSlots
        : buildContainerPool15();

    sanitizeSquad();
    return true;
  } catch (e) {
    return false;
  }
}

function resetProgress() {
  if (state.matchRunning) return;
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {}
  createFreshState();
  saveProgress();
  renderAll();
}

function createFreshState() {
  const starters = [
    { id: 1, name: "Артём Соколов", pos: "ST", ovr: 69, rarity: "bronze", avatar: "⚽", upgrades: 0 },
    { id: 2, name: "Максим Орлов", pos: "LW", ovr: 68, rarity: "bronze", avatar: "🏃", upgrades: 0 },
    { id: 3, name: "Даниил Волков", pos: "RW", ovr: 70, avatar: "⚡", upgrades: 0 },
    { id: 4, name: "Илья Морозов", pos: "CAM", ovr: 69, avatar: "🎯", upgrades: 0 },
    { id: 5, name: "Кирилл Лебедев", pos: "CM", ovr: 71, avatar: "🔥", upgrades: 0 },
    { id: 6, name: "Роман Зайцев", pos: "CM", ovr: 72, avatar: "🛡️", upgrades: 0 },
    { id: 7, name: "Денис Соловьёв", pos: "LB", ovr: 68, avatar: "💨", upgrades: 0 },
    { id: 8, name: "Никита Крылов", pos: "CB", ovr: 70, avatar: "🧱", upgrades: 0 },
    { id: 9, name: "Тимур Каримов", pos: "CB", ovr: 69, avatar: "🪨", upgrades: 0 },
    { id: 10, name: "Павел Громов", pos: "RB", ovr: 68, avatar: "🦅", upgrades: 0 },
    { id: 11, name: "Егор Новиков", pos: "GK", ovr: 68, avatar: "🧤", upgrades: 0 },
    { id: 12, name: "Олег Васильев", pos: "CM", ovr: 70, avatar: "👟", upgrades: 0 }
  ];

  state.coins = 2000;
  state.wins = 0;
  state.league = "amateur";
  state.formation = "4-3-3";
  state.club = [...starters];
  state.squad = {};
  state.eventStreak = 0;
  state.doubleLuck = false;
  state.special120Claimed = false;
  state.containerSlots = buildContainerPool15();
  assignStartersToCurrentFormation();
  generateEnemy();
}

function initGame() {
  const loaded = loadProgress();
  if (!loaded) {
    createFreshState();
    saveProgress();
  }

  const yesBtn = document.getElementById("confirm-sell-yes");
  const noBtn = document.getElementById("confirm-sell-no");
  if (yesBtn) {
    yesBtn.onclick = () => {
      const idToSell = pendingSellPlayerId;
      closeSellConfirmModal();
      if (idToSell !== null) {
        sellPlayerById(idToSell);
      }
    };
  }
  if (noBtn) {
    noBtn.onclick = () => closeSellConfirmModal();
  }

  setupMobileTouchControls();
  renderAll();
  drawStaticPreviewPitch();
}

function goMainMenu() {
  if (state.matchRunning) return;
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("sub-nav").classList.add("hidden");
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
}

function openSection(tabName) {
  if (state.matchRunning) return;
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("sub-nav").classList.remove("hidden");

  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === "tab-" + tabName);
  });

  if (tabName === "match" && !state.matchRunning) {
    drawStaticPreviewPitch();
  }
  if (tabName === "container") {
    renderContainerTab();
  }
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    openSection(btn.dataset.tab);
  });
});

function assignStartersToCurrentFormation() {
  const slots = getAllSlotsForFormation(state.formation);
  const sorted = [...state.club].sort((a, b) => getEffectiveOvr(b) - getEffectiveOvr(a));
  const usedIds = new Set();
  const usedNames = new Set();
  state.squad = {};

  slots.forEach(slotCode => {
    const candidate = pickBestCandidate(sorted, slotCode, usedIds, usedNames);
    if (candidate) {
      state.squad[slotCode] = candidate.id;
      usedIds.add(candidate.id);
      usedNames.add(candidate.name);
    }
  });
}

function setFormation(formKey) {
  if (!FORMATIONS[formKey] || state.matchRunning) return;
  state.formation = formKey;
  assignStartersToCurrentFormation();
  saveProgress();
  renderAll();
}

function cycleFormation() {
  const idx = FORMATION_KEYS.indexOf(state.formation);
  const nextKey = FORMATION_KEYS[(idx + 1) % FORMATION_KEYS.length];
  setFormation(nextKey);
}

function autoFillBestSquad() {
  if (state.matchRunning) return;
  assignStartersToCurrentFormation();
  saveProgress();
  renderAll();
}

function upgradePlayerOvr(playerId, event) {
  if (event) event.stopPropagation();
  if (state.matchRunning) return;

  const player = state.club.find(p => p.id === playerId);
  if (!player) return;

  const currentUpg = player.upgrades || 0;
  if (currentUpg >= MAX_UPGRADES) return;

  const cost = getUpgradeCost(currentUpg);
  if (state.wins < cost) {
    alert(`Для ${currentUpg + 1}-й прокачки (+1 OVR) нужно ${cost} 🏆!`);
    return;
  }

  state.wins -= cost;
  player.upgrades = currentUpg + 1;
  saveProgress();
  renderAll();
}

function getTeamOvr() {
  const slots = getAllSlotsForFormation(state.formation);
  let sum = 0;
  slots.forEach(slotCode => {
    const player = state.club.find(p => p.id === state.squad[slotCode]);
    sum += player ? getEffectiveOvr(player) : 60;
  });
  return Math.round(sum / slots.length);
}

function selectPlayerCardForSell(playerId) {
  if (state.matchRunning) return;
  selectedSellPlayerId = playerId;
  document.querySelectorAll(".player-card").forEach(card => {
    card.classList.toggle("selected-for-sell", card.dataset.playerId === String(playerId));
  });
}

function createCardHTML(player, slotLabel = null, showUpgrade = false) {
  const displayPos = slotLabel ? slotLabel.replace(/[0-9]/g, "") : player.pos;
  const effOvr = getEffectiveOvr(player);
  const upg = player.upgrades || 0;
  const isMax = upg >= MAX_UPGRADES;
  const nextCost = getUpgradeCost(upg);
  const sellPrice = getPlayerSellValue(player);
  const maxCap = player.maxCap || (player.isValverde122 ? 127 : player.isSpecial120 ? 125 : 120);
  const maxLabel = `МАКС ${maxCap}`;
  const isSelectedSell = selectedSellPlayerId === player.id;

  const shiftHint = showUpgrade
    ? `<div class="sell-shift-hint" onclick="requestSellPlayer(${player.id}, event)">Shift — продать за ${sellPrice} 💰</div>`
    : "";

  const upgradeBlock = showUpgrade
    ? `
      <div class="card-upgrade-meta">
        <span class="upgrade-pips">Прокачка: ${upg}/${MAX_UPGRADES}</span>
        <button
          class="upgrade-btn"
          ${isMax || state.wins < nextCost ? "disabled" : ""}
          onclick="upgradePlayerOvr(${player.id}, event)"
        >
          ${isMax ? maxLabel : `⬆️ +1 OVR (${nextCost}🏆)`}
        </button>
      </div>
    `
    : "";

  return `
    <div
      class="player-card rarity-${player.rarity}${isSelectedSell ? " selected-for-sell" : ""}"
      data-player-id="${player.id}"
      onclick="selectPlayerCardForSell(${player.id})"
      onmouseenter="hoveredPlayerId = ${player.id}"
      onmouseleave="if (hoveredPlayerId === ${player.id}) hoveredPlayerId = null"
    >
      ${shiftHint}
      <div class="card-header-row">
        <span class="card-ovr">${effOvr}</span>
        <span class="card-pos">${displayPos}</span>
      </div>
      <div class="card-avatar">${player.avatar}</div>
      <div class="card-name-plate" title="${player.name}">${player.name}</div>
      ${upgradeBlock}
    </div>
  `;
}

function renderFormationControls() {
  document.getElementById("current-formation-label").textContent = state.formation;
  document.getElementById("match-formation-text").textContent = "Схема " + state.formation;

  const chipsWrap = document.getElementById("formation-chips");
  chipsWrap.innerHTML = "";
  FORMATION_KEYS.forEach(key => {
    const btn = document.createElement("button");
    btn.className = "f-chip" + (state.formation === key ? " active" : "");
    btn.textContent = key;
    btn.onclick = () => setFormation(key);
    chipsWrap.appendChild(btn);
  });
}

function renderPitch() {
  const board = document.getElementById("formation-board");
  board.innerHTML = "";

  const currentLines = FORMATIONS[state.formation].lines;
  currentLines.forEach(lineSlots => {
    const rowEl = document.createElement("div");
    rowEl.className = "pitch-line";

    lineSlots.forEach(slotCode => {
      const player = state.club.find(p => p.id === state.squad[slotCode]);
      const slotDiv = document.createElement("div");
      slotDiv.className = "slot";
      slotDiv.innerHTML = player ? createCardHTML(player, slotCode, true) : "";
      rowEl.appendChild(slotDiv);
    });

    board.appendChild(rowEl);
  });
}

function renderLeagues() {
  const wrap = document.getElementById("league-buttons");
  wrap.innerHTML = "";

  Object.entries(LEAGUES).forEach(([key, info]) => {
    const btn = document.createElement("button");
    btn.className = "league-btn" + (state.league === key ? " active" : "");
    btn.textContent = `${info.name} (${info.minOvr}–${info.maxOvr}) +${info.trophyReward}🏆`;
    btn.onclick = () => {
      if (state.matchRunning) return;
      state.league = key;
      generateEnemy();
      saveProgress();
      renderAll();
    };
    wrap.appendChild(btn);
  });

  document.getElementById("enemy-league-name").textContent = LEAGUES[state.league].name;
}

function renderEventUI() {
  const streak = Math.min(EVENT_STREAK_GOAL, state.eventStreak || 0);
  const pct = Math.round((streak / EVENT_STREAK_GOAL) * 100);
  const countEl = document.getElementById("event-streak-count");
  const fillEl = document.getElementById("event-streak-fill");
  if (countEl) countEl.textContent = String(streak);
  if (fillEl) fillEl.style.width = `${pct}%`;
}

function renderAll() {
  sanitizeSquad();

  const ovr = getTeamOvr();
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("team-ovr").textContent = ovr;
  document.getElementById("my-match-ovr").textContent = ovr;
  document.getElementById("enemy-match-ovr").textContent = state.enemyOvr;
  document.getElementById("wins").textContent = state.wins;

  renderFormationControls();
  renderPitch();
  renderLeagues();
  renderEventUI();
  renderContainerTab();

  const equippedIds = new Set(Object.values(state.squad));
  const clubList = document.getElementById("club-list");
  clubList.innerHTML = "";
  const sortedClub = [...state.club].sort((a, b) => getEffectiveOvr(b) - getEffectiveOvr(a));

  sortedClub.forEach(player => {
    const isEquipped = equippedIds.has(player.id);
    const div = document.createElement("div");
    div.className = "club-item" + (isEquipped ? " equipped" : "");

    const cardHolder = document.createElement("div");
    cardHolder.className = "club-card-click";
    cardHolder.innerHTML = createCardHTML(player, null, true);
    cardHolder.onclick = () => {
      if (state.matchRunning) return;
      selectPlayerCardForSell(player.id);
      if (Object.values(state.squad).includes(player.id)) {
        showToast(`${player.name} уже в стартовом составе!`);
        return;
      }
      equipUniquePlayerToSquad(player);
      saveProgress();
      renderAll();
    };

    div.appendChild(cardHolder);
    clubList.appendChild(div);
  });
}

function generatePlayerFromPack(rarity) {
  const pool = PLAYERS_DB[rarity];
  let template = pool[Math.floor(Math.random() * pool.length)];

  if (state.doubleLuck && pool.length > 1) {
    const second = pool[Math.floor(Math.random() * pool.length)];
    if (second.ovr > template.ovr) {
      template = second;
    }
  }

  return {
    id: Date.now() + Math.random(),
    name: template.name,
    pos: template.pos,
    ovr: template.ovr,
    rarity,
    avatar: template.avatar,
    upgrades: 0
  };
}

function enqueuePlayersToReveal(playersList, unitSellBasePrice) {
  state.currentPackPrice = unitSellBasePrice;
  state.pullQueue = [...playersList];
  playersList.forEach(p => state.club.push(p));
  saveProgress();
  renderAll();
  showNextPulledCard();
}

function openMultiPack(rarity, count, totalPrice) {
  if (totalPrice > 0 && state.coins < totalPrice) {
    alert("Не хватает монет! Сыграй матч или мини-игру в ивенте.");
    return;
  }

  if (totalPrice > 0) {
    state.coins -= totalPrice;
  }
  const generated = [];
  for (let i = 0; i < count; i++) {
    generated.push(generatePlayerFromPack(rarity));
  }
  const unitSell = totalPrice > 0 ? Math.round(totalPrice / count) : RARITY_BASE_SELL[rarity] || 2000;
  enqueuePlayersToReveal(generated, unitSell);
}

function buyPack99ForWins() {
  if (state.wins < 25) {
    alert(`Нужно 25 кубков! Сейчас у тебя кубков: ${state.wins}.`);
    return;
  }

  state.wins -= 25;
  const specialPlayer = generatePlayerFromPack("prime99");
  enqueuePlayersToReveal([specialPlayer], 4500);
}

function buyPack105ForWins() {
  if (state.wins < 100) {
    alert(`Нужно 100 кубков! Сейчас у тебя кубков: ${state.wins}.`);
    return;
  }

  state.wins -= 100;
  const pool105 = PLAYERS_DB.ultra105.filter(p => p.ovr === 105);
  const template = pool105[Math.floor(Math.random() * pool105.length)];
  const player105 = {
    id: Date.now() + Math.random(),
    name: template.name,
    pos: template.pos,
    ovr: 105,
    rarity: "ultra105",
    avatar: template.avatar,
    upgrades: 0
  };
  enqueuePlayersToReveal([player105], 8000);
}

function buyPack115ForWins() {
  if (state.wins < 250) {
    alert(`Нужно 250 кубков! Сейчас у тебя кубков: ${state.wins}.`);
    return;
  }

  state.wins -= 250;
  const pool115 = PLAYERS_DB.god115.filter(p => p.ovr === 115);
  const template = pool115[Math.floor(Math.random() * pool115.length)];
  const player115 = {
    id: Date.now() + Math.random(),
    name: template.name,
    pos: template.pos,
    ovr: 115,
    rarity: "god115",
    avatar: template.avatar,
    upgrades: 0
  };
  enqueuePlayersToReveal([player115], 15000);
}

function openEventFeverPack() {
  const price = 3500;
  if (state.coins < price) {
    alert("Нужно 3 500 монет для ивент-пака!");
    return;
  }

  state.coins -= price;
  const luckMult = state.doubleLuck ? 2 : 1;
  const roll = Math.random();

  if (roll < 0.15 * luckMult) {
    state.coins += 7500;
    saveProgress();
    renderAll();
    showToast("⚡ Джекпот Лихорадки! +7 500 💰!");
    return;
  }

  if (roll < 0.28 * luckMult) {
    state.wins += 4;
    saveProgress();
    renderAll();
    showToast("🏆 Удача Лихорадки! +4 кубка 🏆!");
    return;
  }

  const rarityRoll = Math.min(0.999, Math.random() * (state.doubleLuck ? 1.15 : 1));
  let rarity = "toty";
  if (rarityRoll > 0.90) rarity = "god115";
  else if (rarityRoll > 0.78) rarity = "immortal112";
  else if (rarityRoll > 0.65) rarity = "galacticos109";
  else if (rarityRoll > 0.48) rarity = "ultra105";
  else if (rarityRoll > 0.30) rarity = "fut102";

  const card = generatePlayerFromPack(rarity);
  enqueuePlayersToReveal([card], 3500);
}

function moveDrillBallRandomly() {
  const arena = document.getElementById("drill-arena");
  const ball = document.getElementById("drill-ball");
  if (!arena || !ball) return;

  const maxX = Math.max(10, arena.clientWidth - ball.offsetWidth - 10);
  const maxY = Math.max(10, arena.clientHeight - ball.offsetHeight - 10);
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

function startPenaltyDrill() {
  if (drillState.running) return;
  if (drillState.timerId) {
    clearInterval(drillState.timerId);
    drillState.timerId = null;
  }

  drillState.running = true;
  drillState.score = 0;
  drillState.timeLeft = 10;

  const startBtn = document.getElementById("drill-start-btn");
  const ball = document.getElementById("drill-ball");
  const overlayMsg = document.getElementById("drill-overlay-msg");
  const timerEl = document.getElementById("drill-timer");
  const scoreEl = document.getElementById("drill-score");

  startBtn.disabled = true;
  ball.disabled = false;
  overlayMsg.classList.add("hidden");
  scoreEl.textContent = "0";
  timerEl.textContent = "10.0s";
  moveDrillBallRandomly();

  const startedAt = Date.now();
  drillState.timerId = setInterval(() => {
    const elapsedSec = (Date.now() - startedAt) / 1000;
    drillState.timeLeft = Math.max(0, +(10 - elapsedSec).toFixed(1));
    timerEl.textContent = `${drillState.timeLeft.toFixed(1)}s`;

    if (drillState.timeLeft <= 0) {
      clearInterval(drillState.timerId);
      drillState.timerId = null;
      drillState.running = false;
      ball.disabled = true;
      startBtn.disabled = false;

      const earnedCoins = drillState.score * 160;
      const bonusTrophy = drillState.score >= 8 ? 1 : 0;
      state.coins += earnedCoins;
      state.wins += bonusTrophy;

      overlayMsg.textContent =
        bonusTrophy > 0
          ? `Отлично! Забито ${drillState.score}: +${earnedCoins} 💰 и +1 🏆!`
          : `Раунд окончен! Забито ${drillState.score}: +${earnedCoins} 💰 (нужно 8+ голов для кубка)`;
      overlayMsg.classList.remove("hidden");

      saveProgress();
      renderAll();
    }
  }, 100);
}

function hitDrillBall(e) {
  if (e) e.stopPropagation();
  if (!drillState.running) return;
  drillState.score += 1;
  document.getElementById("drill-score").textContent = String(drillState.score);
  moveDrillBallRandomly();
}

function showNextPulledCard() {
  const overlay = document.getElementById("pack-reveal");
  const nextBtn = document.getElementById("next-card-btn");
  const counterEl = document.getElementById("reveal-counter");

  if (state.pullQueue.length === 0) {
    overlay.classList.add("hidden");
    saveProgress();
    renderAll();
    return;
  }

  const player = state.pullQueue[0];
  const remaining = state.pullQueue.length;
  counterEl.textContent = remaining > 1
    ? `ВЫПАЛ ИГРОК! (Осталось карт: ${remaining})`
    : "НОВЫЙ ИГРОК!";

  const sellPrice = Math.round(state.currentPackPrice * 0.5);
  document.getElementById("revealed-card").innerHTML = createCardHTML(player, null, false);
  document.getElementById("sell-now-btn").textContent = `Продать (+${sellPrice} 💰)`;

  document.getElementById("equip-now-btn").onclick = () => {
    equipUniquePlayerToSquad(player);
    state.pullQueue.shift();
    saveProgress();
    renderAll();
    showNextPulledCard();
  };

  document.getElementById("sell-now-btn").onclick = () => {
    if (player.isSpecial120) {
      state.special120Claimed = false;
    }
    state.club = state.club.filter(p => p.id !== player.id);
    Object.keys(state.squad).forEach(slotKey => {
      if (state.squad[slotKey] === player.id) {
        delete state.squad[slotKey];
      }
    });
    sanitizeSquad();
    state.coins += sellPrice;
    state.pullQueue.shift();
    saveProgress();
    renderAll();
    showNextPulledCard();
  };

  if (remaining > 1) {
    nextBtn.classList.remove("hidden");
    nextBtn.onclick = () => {
      state.pullQueue.shift();
      showNextPulledCard();
    };
  } else {
    nextBtn.classList.add("hidden");
  }

  document.getElementById("close-reveal-btn").onclick = () => {
    state.pullQueue = [];
    overlay.classList.add("hidden");
    saveProgress();
    renderAll();
  };

  overlay.classList.remove("hidden");
}

function buildUniquePositionalSquad(targetOvr, rarity) {
  const slots = getAllSlotsForFormation(state.formation);
  const usedNames = new Set();
  state.squad = {};

  slots.forEach((slotCode, idx) => {
    const cleanRole = slotCode.replace(/[0-9]/g, "");
    const poolForRole = UNIQUE_ROSTER_BY_POS[cleanRole] || UNIQUE_ROSTER_BY_POS.CM;
    const chosenName =
      poolForRole.find(n => !usedNames.has(n)) ||
      `${cleanRole} Игрок ${idx + 1}`;
    usedNames.add(chosenName);

    const card = {
      id: Date.now() + Math.random() + idx,
      name: chosenName,
      pos: cleanRole,
      ovr: targetOvr,
      rarity,
      avatar: cleanRole === "GK" ? "🧤" : cleanRole === "ST" ? "⚡" : "⚽",
      upgrades: 0
    };
    state.club.push(card);
    state.squad[slotCode] = card.id;
  });
}

function redeemPromoCode() {
  const input = document.getElementById("promo-input");
  const msgEl = document.getElementById("promo-message");
  const code = input.value.trim().toLowerCase();

  msgEl.className = "promo-message";

  if (!code) {
    msgEl.textContent = "Введите промокод.";
    msgEl.classList.add("err");
    return;
  }

  if (code === "fy28fh") {
    msgEl.textContent = "Промокод активирован: открыты все 15 ячеек контейнера!";
    msgEl.classList.add("ok");
    openAllContainerSlotsByPromo();
  } else if (code === "4sff8") {
    state.coins += 10000;
    msgEl.textContent = "Промокод активирован: +10 000 монет!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "g8sb92nvc") {
    state.wins += 50;
    msgEl.textContent = "Промокод активирован: +50 кубков!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "fduv8s11x") {
    buildUniquePositionalSquad(115, "god115");
    msgEl.textContent = "Промокод активирован: 11 игроков 115 OVR поставлены на свои позиции без повторов!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "b9wgv01v") {
    const exists = state.club.some(p => p.isSpecial120);
    if (state.special120Claimed || exists) {
      msgEl.textContent = "Специальный игрок 120 OVR (до 125 с прокачкой) выдаётся только один раз — он уже у тебя!";
      msgEl.classList.add("err");
    } else {
      state.special120Claimed = true;
      const specialCard = {
        ...SPECIAL_120_PLAYER,
        id: Date.now() + Math.random()
      };
      msgEl.textContent = "Промокод активирован: получен специальный игрок 120 OVR (макс 125 с прокачкой)!";
      msgEl.classList.add("ok");
      enqueuePlayersToReveal([specialCard], 30000);
    }
  } else if (code === "9gfu20fui") {
    state.doubleLuck = true;
    msgEl.textContent = "Промокод активирован: x2 удача включена! Теперь в 2 раза больше везения!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "fhw7chse9") {
    const pool115 = PLAYERS_DB.god115.filter(p => p.ovr === 115);
    const pulled3 = [0, 1, 2].map(i => {
      const tpl = pool115[Math.floor(Math.random() * pool115.length)];
      return {
        id: Date.now() + Math.random() + i,
        name: tpl.name,
        pos: tpl.pos,
        ovr: 115,
        rarity: "god115",
        avatar: tpl.avatar,
        upgrades: 0
      };
    });
    msgEl.textContent = "Промокод активирован: получены 3 гарантированных пака 115 OVR!";
    msgEl.classList.add("ok");
    enqueuePlayersToReveal(pulled3, 15000);
  } else if (code === "fjeugf82") {
    buildUniquePositionalSquad(100, "fut102");
    msgEl.textContent = "Промокод активирован: состав 100 OVR собран строго по позициям без повторов!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "fvje7v") {
    msgEl.textContent = "Промокод активирован: бесплатный пак «Олимп 115 OVR»!";
    msgEl.classList.add("ok");
    openMultiPack("god115", 1, 0);
  } else {
    msgEl.textContent = "Неверный промокод.";
    msgEl.classList.add("err");
  }

  input.value = "";
}

function generateEnemy() {
  if (state.matchRunning) return;
  const league = LEAGUES[state.league] || LEAGUES.amateur;
  const span = league.maxOvr - league.minOvr + 1;
  state.enemyOvr = league.minOvr + Math.floor(Math.random() * span);
  document.getElementById("enemy-match-ovr").textContent = state.enemyOvr;
}

// ==========================================
// РЕАЛИСТИЧНЫЙ 2D ФУТБОЛЬНЫЙ МАТЧ НА CANVAS
// ==========================================

function drawPitchBackground(ctx, w, h) {
  const stripeW = w / 12;
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#2d6a4f" : "#40916c";
    ctx.fillRect(i * stripeW, 0, stripeW, h);
  }

  const grassGlow = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.65);
  grassGlow.addColorStop(0, "rgba(183, 228, 199, 0.16)");
  grassGlow.addColorStop(1, "rgba(15, 58, 39, 0.25)");
  ctx.fillStyle = grassGlow;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 3;

  const padX = 36;
  const padY = 24;
  const fieldW = w - padX * 2;
  const fieldH = h - padY * 2;
  ctx.strokeRect(padX, padY, fieldW, fieldH);

  ctx.beginPath();
  ctx.moveTo(w / 2, padY);
  ctx.lineTo(w / 2, h - padY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 66, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  const boxW = 125;
  const boxH = 250;
  ctx.strokeRect(padX, h / 2 - boxH / 2, boxW, boxH);
  ctx.strokeRect(w - padX - boxW, h / 2 - boxH / 2, boxW, boxH);

  const goalH = 120;
  const goalDepth = 26;
  ctx.fillStyle = "rgba(216, 243, 220, 0.25)";
  ctx.fillRect(padX - goalDepth, h / 2 - goalH / 2, goalDepth, goalH);
  ctx.strokeRect(padX - goalDepth, h / 2 - goalH / 2, goalDepth, goalH);

  ctx.fillStyle = "rgba(254, 202, 202, 0.25)";
  ctx.fillRect(w - padX, h / 2 - goalH / 2, goalDepth, goalH);
  ctx.strokeRect(w - padX, h / 2 - goalH / 2, goalDepth, goalH);
}

function drawStaticPreviewPitch() {
  const canvas = document.getElementById("match-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  drawPitchBackground(ctx, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(15, 58, 39, 0.58)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 25px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("НАЖМИ «НАЧАТЬ РЕАЛИСТИЧНЫЙ МАТЧ» ВНИЗУ", canvas.width / 2, canvas.height / 2 - 12);

  ctx.fillStyle = "#fef08a";
  ctx.font = "700 16px Segoe UI, sans-serif";
  ctx.fillText("WASD/Стрелки — бег • Й — ближайший к мячу • Пробел — удар • Ctrl — подкат • Shift — спринт", canvas.width / 2, canvas.height / 2 + 22);
}

function buildMatchLineups(w, h) {
  const slots = getAllSlotsForFormation(state.formation);
  const myTeam = [];
  const enemyTeam = [];
  const usedMyNames = new Set();

  const myCoords = [
    { x: 64, y: h / 2, role: "GK" },
    { x: 205, y: 95, role: "DEF" },
    { x: 190, y: 205, role: "DEF" },
    { x: 190, y: 315, role: "DEF" },
    { x: 205, y: 425, role: "DEF" },
    { x: 325, y: 140, role: "MID" },
    { x: 340, y: 260, role: "MID" },
    { x: 325, y: 380, role: "MID" },
    { x: 430, y: 115, role: "ATT" },
    { x: 445, y: 260, role: "ATT" },
    { x: 430, y: 405, role: "ATT" }
  ];

  slots.forEach((slotCode, idx) => {
    const cleanRole = slotCode.replace(/[0-9]/g, "");
    const p = state.club.find(item => item.id === state.squad[slotCode]);
    const coord = myCoords[idx % myCoords.length];
    const effOvr = p ? getEffectiveOvr(p) : 70;

    let labelName = p ? p.name.split(" ").pop().slice(0, 12) : `Игрок ${idx + 1}`;
    if (usedMyNames.has(labelName)) {
      labelName = `${labelName} (${cleanRole})`;
    }
    usedMyNames.add(labelName);

    myTeam.push({
      id: "my_" + idx,
      team: "my",
      name: labelName,
      ovr: effOvr,
      role: coord.role,
      homeX: coord.x,
      homeY: coord.y,
      x: coord.x,
      y: coord.y,
      vx: 0,
      vy: 0,
      kickCooldown: 0,
      tackleTimer: 0,
      tackleCooldown: 0,
      tackleVx: 0,
      tackleVy: 0
    });
  });

  const enemyNames = [
    "Сафонов", "Павлович", "Дивеев", "Литвинов", "Хлусевич",
    "Глебов", "Чернов", "Миранчук", "Сергеев", "Соболев", "Глушенков"
  ];

  myCoords.forEach((coord, idx) => {
    const mirrorX = w - coord.x;
    enemyTeam.push({
      id: "en_" + idx,
      team: "enemy",
      name: enemyNames[idx],
      ovr: state.enemyOvr,
      role: coord.role,
      homeX: mirrorX,
      homeY: coord.y,
      x: mirrorX,
      y: coord.y,
      vx: 0,
      vy: 0,
      kickCooldown: 0,
      aiShootCooldown: 0,
      aiPassCooldown: 0,
      tackleTimer: 0,
      tackleCooldown: 0,
      tackleVx: 0,
      tackleVy: 0
    });
  });

  return { myTeam, enemyTeam };
}

function switchToClosestPlayerToBall() {
  const sim = matchSim;
  if (!sim || !state.matchRunning) return;

  const candidates = sim.myTeam
    .filter(p => p.role !== "GK")
    .sort((a, b) => Math.hypot(sim.ball.x - a.x, sim.ball.y - a.y) - Math.hypot(sim.ball.x - b.x, sim.ball.y - b.y));

  if (candidates.length === 0) return;

  const nextPlayer =
    candidates[0] === sim.controlledPlayer && candidates.length > 1
      ? candidates[1]
      : candidates[0];

  sim.controlledPlayer = nextPlayer;
  sim.bannerText = `🔄 Игрок: ${nextPlayer.name}`;
  sim.bannerTimer = 0.55;
}

function resetPositionsAfterGoal(sim) {
  const { w, h, myTeam, enemyTeam, ball } = sim;
  myTeam.forEach(p => {
    p.x = p.homeX;
    p.y = p.homeY;
    p.vx = 0;
    p.vy = 0;
    p.tackleTimer = 0;
  });
  enemyTeam.forEach(p => {
    p.x = p.homeX;
    p.y = p.homeY;
    p.vx = 0;
    p.vy = 0;
    p.tackleTimer = 0;
  });
  ball.x = w / 2;
  ball.y = h / 2;
  ball.vx = 0;
  ball.vy = 0;
  ball.owner = null;
}

function handlePlayerShoot() {
  const sim = matchSim;
  if (!sim || !state.matchRunning) return;

  const active = sim.controlledPlayer;
  if (!active || active.kickCooldown > 0) return;

  const distToBall = Math.hypot(sim.ball.x - active.x, sim.ball.y - active.y);

  if (sim.ball.owner === active || distToBall <= 30) {
    sim.ball.owner = null;
    active.kickCooldown = 0.45;

    const goalX = sim.w - 36;
    let aimY = sim.h / 2 + (Math.random() - 0.5) * 72;

    if (keysDown["KeyW"] || keysDown["ArrowUp"]) {
      aimY = sim.h / 2 - 40;
    } else if (keysDown["KeyS"] || keysDown["ArrowDown"]) {
      aimY = sim.h / 2 + 40;
    }

    const angle = Math.atan2(aimY - sim.ball.y, goalX - sim.ball.x);
    const power = 355 + Math.max(0, active.ovr - 65) * 2.2;
    sim.ball.vx = Math.cos(angle) * power;
    sim.ball.vy = Math.sin(angle) * power;
    sim.lastTouchPlayer = active;
    sim.bannerText = `⚽ УДАР: ${active.name}!`;
    sim.bannerTimer = 0.7;
  }
}

function handlePlayerTackle() {
  const sim = matchSim;
  if (!sim || !state.matchRunning) return;

  const active = sim.controlledPlayer;
  if (!active || active.tackleCooldown > 0) return;

  active.tackleTimer = 0.26;
  active.tackleCooldown = 0.85;

  let dirX = 0;
  let dirY = 0;
  if (keysDown["KeyW"] || keysDown["ArrowUp"]) dirY -= 1;
  if (keysDown["KeyS"] || keysDown["ArrowDown"]) dirY += 1;
  if (keysDown["KeyA"] || keysDown["ArrowLeft"]) dirX -= 1;
  if (keysDown["KeyD"] || keysDown["ArrowRight"]) dirX += 1;

  if (dirX === 0 && dirY === 0) {
    const dx = sim.ball.x - active.x;
    const dy = sim.ball.y - active.y;
    const len = Math.hypot(dx, dy) || 1;
    dirX = dx / len;
    dirY = dy / len;
  } else {
    const len = Math.hypot(dirX, dirY);
    dirX /= len;
    dirY /= len;
  }

  active.tackleVx = dirX * 215;
  active.tackleVy = dirY * 215;

  const distToBall = Math.hypot(sim.ball.x - active.x, sim.ball.y - active.y);
  const owner = sim.ball.owner;
  const distToOwner = owner ? Math.hypot(owner.x - active.x, owner.y - active.y) : Infinity;

  if (distToBall <= 34 || (owner && owner.team === "enemy" && distToOwner <= 34)) {
    const tackleChance = Math.max(0.45, Math.min(0.9, 0.7 + (active.ovr - (owner ? owner.ovr : 70)) * 0.007));
    if (Math.random() < tackleChance) {
      if (owner && owner.team === "enemy") {
        owner.kickCooldown = 0.6;
      }
      sim.ball.owner = active;
      sim.lastTouchPlayer = active;
      sim.bannerText = `🛡️ Подкат и отбор: ${active.name}!`;
      sim.bannerTimer = 0.75;
    } else {
      sim.bannerText = `💨 Подкат ${active.name} мимо мяча`;
      sim.bannerTimer = 0.6;
    }
  }
}

function updateMatchSimulation(dt) {
  const sim = matchSim;
  if (!sim) return;

  const { w, h, myTeam, enemyTeam, ball } = sim;
  const padX = 36;
  const padY = 24;

  sim.elapsed += dt;
  if (sim.bannerTimer > 0) sim.bannerTimer = Math.max(0, sim.bannerTimer - dt);

  const realTimerEl = document.getElementById("match-real-timer");
  const gameMinEl = document.getElementById("match-game-minute");
  const gameMin = Math.min(90, Math.floor((sim.elapsed / MATCH_REAL_DURATION_SEC) * 90));

  realTimerEl.textContent = `${Math.min(MATCH_REAL_DURATION_SEC, sim.elapsed).toFixed(1)}s / ${MATCH_REAL_DURATION_SEC.toFixed(1)}s`;
  gameMinEl.textContent = `${gameMin}' / 90'`;

  if (sim.elapsed >= MATCH_REAL_DURATION_SEC) {
    finishMatch(sim.myGoals, sim.enemyGoals, sim.leagueInfo);
    return;
  }

  if (!sim.controlledPlayer || sim.controlledPlayer.role === "GK") {
    sim.controlledPlayer = myTeam.find(p => p.role !== "GK") || myTeam[1];
  }

  const ctrl = sim.controlledPlayer;
  if (ctrl.kickCooldown > 0) ctrl.kickCooldown = Math.max(0, ctrl.kickCooldown - dt);
  if (ctrl.tackleCooldown > 0) ctrl.tackleCooldown = Math.max(0, ctrl.tackleCooldown - dt);

  const wantsSprint = Boolean(keysDown["ShiftLeft"] || keysDown["ShiftRight"]);
  const isMovingInput = Boolean(
    keysDown["KeyW"] || keysDown["ArrowUp"] ||
    keysDown["KeyS"] || keysDown["ArrowDown"] ||
    keysDown["KeyA"] || keysDown["ArrowLeft"] ||
    keysDown["KeyD"] || keysDown["ArrowRight"]
  );

  let isSprinting = false;
  if (wantsSprint && isMovingInput && sim.stamina > 4) {
    isSprinting = true;
    sim.stamina = Math.max(0, sim.stamina - 34 * dt);
  } else {
    sim.stamina = Math.min(100, sim.stamina + 20 * dt);
  }

  if (ctrl.tackleTimer > 0) {
    ctrl.tackleTimer = Math.max(0, ctrl.tackleTimer - dt);
    ctrl.x += ctrl.tackleVx * dt;
    ctrl.y += ctrl.tackleVy * dt;
  } else {
    let moveX = 0;
    let moveY = 0;
    if (keysDown["KeyW"] || keysDown["ArrowUp"]) moveY -= 1;
    if (keysDown["KeyS"] || keysDown["ArrowDown"]) moveY += 1;
    if (keysDown["KeyA"] || keysDown["ArrowLeft"]) moveX -= 1;
    if (keysDown["KeyD"] || keysDown["ArrowRight"]) moveX += 1;

    if (moveX !== 0 || moveY !== 0) {
      const len = Math.hypot(moveX, moveY);
      moveX /= len;
      moveY /= len;
      const baseSpeed = 122 + Math.max(0, ctrl.ovr - 65) * 0.85;
      const sprintBonus = isSprinting ? 44 : 0;
      const ctrlSpeed = baseSpeed + sprintBonus;
      ctrl.x += moveX * ctrlSpeed * dt;
      ctrl.y += moveY * ctrlSpeed * dt;
    }
  }

  myTeam.forEach(p => {
    if (p.kickCooldown > 0) p.kickCooldown = Math.max(0, p.kickCooldown - dt);
    if (p === ctrl) return;

    if (p.role === "GK") {
      const targetY = Math.max(h / 2 - 44, Math.min(h / 2 + 44, ball.y));
      p.y += (targetY - p.y) * 2.5 * dt;
      p.x = 58;
      return;
    }

    const shiftX = ball.x > w * 0.45 ? 75 : -25;
    const targetX = Math.max(padX + 40, Math.min(w - padX - 60, p.homeX + shiftX));
    const targetY = p.homeY + (ball.y - h / 2) * 0.18;
    const speed = 82 + Math.max(0, p.ovr - 65) * 0.65;
    const dx = targetX - p.x;
    const dy = targetY - p.y;
    const d = Math.hypot(dx, dy);
    if (d > 6) {
      p.x += (dx / d) * speed * dt;
      p.y += (dy / d) * speed * dt;
    }
  });

  let closestEnemy = enemyTeam[1];
  let closestEnemyDist = Infinity;
  enemyTeam.forEach(e => {
    if (e.role === "GK") return;
    const d = Math.hypot(ball.x - e.x, ball.y - e.y);
    if (d < closestEnemyDist) {
      closestEnemyDist = d;
      closestEnemy = e;
    }
  });

  enemyTeam.forEach(e => {
    if (e.kickCooldown > 0) e.kickCooldown = Math.max(0, e.kickCooldown - dt);
    if (e.aiShootCooldown > 0) e.aiShootCooldown = Math.max(0, e.aiShootCooldown - dt);
    if (e.aiPassCooldown > 0) e.aiPassCooldown = Math.max(0, e.aiPassCooldown - dt);

    if (e.role === "GK") {
      const targetY = Math.max(h / 2 - 48, Math.min(h / 2 + 48, ball.y));
      e.y += (targetY - e.y) * 2.9 * dt;
      e.x = w - 58;
      return;
    }

    const aiSpeed = 96 + Math.max(0, e.ovr - 65) * 0.8;

    if (ball.owner === e) {
      const targetX = padX + 95;
      const targetY = h / 2 + Math.sin(sim.elapsed * 2.4 + e.homeY * 0.02) * 36;
      const dx = targetX - e.x;
      const dy = targetY - e.y;
      const d = Math.hypot(dx, dy);
      if (d > 4) {
        e.x += (dx / d) * aiSpeed * dt;
        e.y += (dy / d) * aiSpeed * dt;
      }

      const distToGoal = Math.hypot(padX - e.x, h / 2 - e.y);
      const canShoot = e.aiShootCooldown <= 0 && (distToGoal < 255 || e.x < w * 0.42);
      if (canShoot && Math.random() < 0.065) {
        ball.owner = null;
        e.kickCooldown = 0.65;
        e.aiShootCooldown = 1.6;
        const aimY = h / 2 + (Math.random() - 0.5) * 86;
        const angle = Math.atan2(aimY - ball.y, padX - ball.x);
        const shotPower = 330 + Math.max(0, e.ovr - 65) * 2.2;
        ball.vx = Math.cos(angle) * shotPower;
        ball.vy = Math.sin(angle) * shotPower;
        sim.bannerText = `🔥 Удар ИИ: ${e.name}!`;
        sim.bannerTimer = 0.65;
      } else if (e.aiPassCooldown <= 0 && Math.random() < 0.015) {
        const mate = enemyTeam.find(m => m !== e && m.role !== "GK" && m.x < e.x + 30);
        if (mate) {
          ball.owner = null;
          e.kickCooldown = 0.55;
          e.aiPassCooldown = 1.4;
          const angle = Math.atan2(mate.y - ball.y, mate.x - ball.x);
          ball.vx = Math.cos(angle) * 265;
          ball.vy = Math.sin(angle) * 265;
        }
      }
    } else if (e === closestEnemy) {
      const dx = ball.x - e.x;
      const dy = ball.y - e.y;
      const d = Math.hypot(dx, dy);
      if (d > 4) {
        e.x += (dx / d) * (aiSpeed * 1.03) * dt;
        e.y += (dy / d) * (aiSpeed * 1.03) * dt;
      }
    } else {
      const shiftX = ball.x < w * 0.65 ? -105 : 20;
      const targetX = Math.max(padX + 55, Math.min(w - padX - 40, e.homeX + shiftX));
      const targetY = e.homeY + (ball.y - h / 2) * 0.22;
      const dx = targetX - e.x;
      const dy = targetY - e.y;
      const d = Math.hypot(dx, dy);
      if (d > 6) {
        e.x += (dx / d) * (aiSpeed * 0.78) * dt;
        e.y += (dy / d) * (aiSpeed * 0.78) * dt;
      }
    }
  });

  [...myTeam, ...enemyTeam].forEach(p => {
    p.x = Math.max(padX + 12, Math.min(w - padX - 12, p.x));
    p.y = Math.max(padY + 12, Math.min(h - padY - 12, p.y));
  });

  const allPlayers = [...myTeam, ...enemyTeam];

  if (ball.owner) {
    const dir = ball.owner.team === "my" ? 1 : -1;
    ball.x = ball.owner.x + dir * 14;
    ball.y = ball.owner.y;
    ball.vx = 0;
    ball.vy = 0;

    for (const other of allPlayers) {
      if (other.team !== ball.owner.team && other.kickCooldown <= 0) {
        const dist = Math.hypot(other.x - ball.owner.x, other.y - ball.owner.y);
        if (dist < 17) {
          const stealChance = 0.045 + (other.ovr - ball.owner.ovr) * 0.003;
          if (Math.random() < Math.max(0.025, Math.min(0.18, stealChance))) {
            ball.owner.kickCooldown = 0.6;
            ball.owner = other;
            if (other.team === "my") sim.lastTouchPlayer = other;
            break;
          }
        }
      }
    }
  } else {
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.vx *= Math.pow(0.22, dt);
    ball.vy *= Math.pow(0.22, dt);

    for (const p of allPlayers) {
      if (p.kickCooldown > 0) continue;
      const d = Math.hypot(ball.x - p.x, ball.y - p.y);
      if (d < 17) {
        if (p.role === "GK" && Math.hypot(ball.vx, ball.vy) > 190) {
          ball.vx = -ball.vx * 0.45;
          ball.vy = (Math.random() - 0.5) * 170;
          p.kickCooldown = 0.45;
          sim.bannerText = p.team === "my" ? "🧤 Сейв твоего вратаря!" : "🧤 Вратарь ИИ отбил удар!";
          sim.bannerTimer = 0.75;
        } else {
          ball.owner = p;
          if (p.team === "my") sim.lastTouchPlayer = p;
        }
        break;
      }
    }
  }

  const inGoalY = ball.y > h / 2 - 58 && ball.y < h / 2 + 58;

  if (ball.x >= w - padX && inGoalY) {
    sim.myGoals += 1;
    document.getElementById("my-score").textContent = String(sim.myGoals);
    const scorerName = sim.lastTouchPlayer ? sim.lastTouchPlayer.name : ctrl.name;
    addLog(`⚽ ${gameMin}' — ГОООЛ! ${scorerName} забивает в ворота ИИ! (${sim.myGoals}:${sim.enemyGoals})`, "goal-my");
    sim.bannerText = `⚽ ГОООЛ! ${scorerName}!`;
    sim.bannerTimer = 1.4;
    resetPositionsAfterGoal(sim);
    return;
  }

  if (ball.x <= padX && inGoalY) {
    sim.enemyGoals += 1;
    document.getElementById("enemy-score").textContent = String(sim.enemyGoals);
    addLog(`❌ ${gameMin}' — ИИ забивает гол в твои ворота! (${sim.myGoals}:${sim.enemyGoals})`, "goal-enemy");
    sim.bannerText = "❌ ГОЛ СОПЕРНИКА!";
    sim.bannerTimer = 1.4;
    resetPositionsAfterGoal(sim);
    return;
  }

  if (ball.y < padY + 6) {
    ball.y = padY + 6;
    ball.vy = Math.abs(ball.vy) * 0.72;
  } else if (ball.y > h - padY - 6) {
    ball.y = h - padY - 6;
    ball.vy = -Math.abs(ball.vy) * 0.72;
  }

  if (ball.x < padX + 6 && !inGoalY) {
    ball.x = padX + 6;
    ball.vx = Math.abs(ball.vx) * 0.72;
  } else if (ball.x > w - padX - 6 && !inGoalY) {
    ball.x = w - padX - 6;
    ball.vx = -Math.abs(ball.vx) * 0.72;
  }
}

function renderMatchCanvas() {
  const sim = matchSim;
  if (!sim) return;
  const { ctx, w, h, myTeam, enemyTeam, ball, controlledPlayer } = sim;

  drawPitchBackground(ctx, w, h);

  enemyTeam.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 13, 0, Math.PI * 2);
    ctx.fillStyle = e.role === "GK" ? "#f97316" : "#ef4444";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(e.ovr), e.x, e.y + 3.5);
  });

  myTeam.forEach(p => {
    if (p === controlledPlayer) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 19, 0, Math.PI * 2);
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 3;
      ctx.stroke();

      const barW = 34;
      const barH = 4;
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.fillRect(p.x - barW / 2, p.y - 29, barW, barH);
      ctx.fillStyle = sim.stamina > 25 ? "#fde047" : "#fb7185";
      ctx.fillRect(p.x - barW / 2, p.y - 29, (barW * sim.stamina) / 100, barH);
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 13, 0, Math.PI * 2);
    ctx.fillStyle = p.tackleTimer > 0 ? "#fde047" : (p.role === "GK" ? "#38bdf8" : "#00f5a0");
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#092618";
    ctx.stroke();

    ctx.fillStyle = "#092618";
    ctx.font = "900 10px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(p.ovr), p.x, p.y + 3.5);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px Segoe UI, sans-serif";
    ctx.fillText(p.name, p.x, p === controlledPlayer ? p.y - 33 : p.y - 17);
  });

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 7.5, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#092618";
  ctx.stroke();

  if (sim.bannerTimer > 0 && sim.bannerText) {
    ctx.fillStyle = "rgba(14, 55, 37, 0.9)";
    ctx.fillRect(w / 2 - 195, 34, 390, 38);
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 2;
    ctx.strokeRect(w / 2 - 195, 34, 390, 38);

    ctx.fillStyle = "#fef08a";
    ctx.font = "900 16px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(sim.bannerText, w / 2, 58);
  }
}

function matchLoop(timestamp) {
  if (!state.matchRunning || !matchSim) return;

  if (!matchSim.lastTime) matchSim.lastTime = timestamp;
  const dt = Math.min(0.05, (timestamp - matchSim.lastTime) / 1000);
  matchSim.lastTime = timestamp;

  updateMatchSimulation(dt);
  if (state.matchRunning) {
    renderMatchCanvas();
    matchAnimFrameId = requestAnimationFrame(matchLoop);
  }
}

function finishMatch(myGoals, enemyGoals, leagueInfo) {
  state.matchRunning = false;
  if (matchAnimFrameId) {
    cancelAnimationFrame(matchAnimFrameId);
    matchAnimFrameId = null;
  }
  Object.keys(keysDown).forEach(k => {
    keysDown[k] = false;
  });
  document.getElementById("start-match-btn").disabled = false;

  if (myGoals > enemyGoals) {
    const trophiesEarned = leagueInfo.trophyReward || 1;
    const reward = leagueInfo.rewardBonus + state.enemyOvr * 10;
    state.coins += reward;
    state.wins += trophiesEarned;
    state.eventStreak = (state.eventStreak || 0) + 1;

    let streakMsg = "";
    if (state.eventStreak >= EVENT_STREAK_GOAL) {
      state.eventStreak = 0;
      state.coins += 6000;
      state.wins += 5;
      streakMsg = " ⚡ СЕРИЯ 3 ПОБЕД! Бонус Лихорадки: +6 000 💰 и +5 🏆!";
    }

    addLog(
      `🏆 ФИНАЛЬНЫЙ СВИСТОК! ПОБЕДА ${myGoals}:${enemyGoals} в «${leagueInfo.name}»! +${trophiesEarned} 🏆 и +${reward} 💰${streakMsg}`,
      "finish"
    );
  } else if (enemyGoals > myGoals) {
    state.eventStreak = 0;
    const consolation = 250;
    state.coins += consolation;
    addLog(`💔 ФИНАЛЬНЫЙ СВИСТОК! Поражение ${myGoals}:${enemyGoals}. Утешительный бонус: +${consolation} 💰`, "finish");
  } else {
    state.eventStreak = 0;
    const drawBonus = 400;
    state.coins += drawBonus;
    addLog(`🤝 ФИНАЛЬНЫЙ СВИСТОК! Ничья ${myGoals}:${enemyGoals}. Бонус за матч: +${drawBonus} 💰`, "finish");
  }

  generateEnemy();
  saveProgress();
  renderAll();
  drawStaticPreviewPitch();
}

function startMatch() {
  if (state.matchRunning) return;

  const canvas = document.getElementById("match-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  state.matchRunning = true;
  document.getElementById("start-match-btn").disabled = true;

  const leagueInfo = LEAGUES[state.league] || LEAGUES.amateur;
  const { myTeam, enemyTeam } = buildMatchLineups(canvas.width, canvas.height);

  matchSim = {
    ctx,
    w: canvas.width,
    h: canvas.height,
    myTeam,
    enemyTeam,
    controlledPlayer: myTeam[9] || myTeam[1],
    lastTouchPlayer: myTeam[9] || myTeam[1],
    ball: {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      owner: null
    },
    stamina: 100,
    myGoals: 0,
    enemyGoals: 0,
    elapsed: 0,
    lastTime: 0,
    leagueInfo,
    bannerText: "МАТЧ НАЧАЛСЯ! ВПЕРЁД!",
    bannerTimer: 1.2
  };

  document.getElementById("my-score").textContent = "0";
  document.getElementById("enemy-score").textContent = "0";
  document.getElementById("match-log").innerHTML =
    `<div class="log-item">📢 Матч (${leagueInfo.name}, схема ${state.formation}) начался! Й — ближайший к мячу, Пробел — удар, Ctrl — подкат, Shift — ускорение.</div>`;

  matchAnimFrameId = requestAnimationFrame(matchLoop);
}

function addLog(text, type = "") {
  const logBox = document.getElementById("match-log");
  const item = document.createElement("div");
  item.className = "log-item " + type;
  item.textContent = text;
  logBox.appendChild(item);
  logBox.scrollTop = logBox.scrollHeight;
}

initGame();