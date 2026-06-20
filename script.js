const sceneEl = document.getElementById("scene");
const sceneTitle = document.getElementById("scene-title");
const speakerName = document.getElementById("speaker-name");
const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const dialogBox = document.querySelector(".dialog-box");

// ── Sound engine (Web Audio API) ──
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function playSceneChange() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
}

function playDialogBlip() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.06);
}

function playEndGood() {
  [0, 0.15, 0.3].forEach((delay, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    const freq = [523, 659, 784][i];
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.4);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.4);
  });
}

function playEndBad() {
  [0, 0.2].forEach((delay, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    const freq = [300, 200][i];
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.5);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.5);
  });
}

function playDig() {
  [0, 0.12, 0.24].forEach(delay => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(120, audioCtx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + delay + 0.1);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.1);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.1);
  });
}

function playItemPickup() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function playFlashlight() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(2000, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function playCash() {
  [0, 0.08, 0.16].forEach(delay => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2500 + delay * 3000, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.08);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.08);
  });
}

function playSearch() {
  for (let i = 0; i < 6; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    const t = audioCtx.currentTime + i * 0.08;
    osc.frequency.setValueAtTime(150 + Math.random() * 100, t);
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }
}

// ── Typewriter effect ──
let typingTimer = null;
let typingDone = true;

function typeText(el, text, speed, callback) {
  if (typingTimer) clearInterval(typingTimer);
  el.textContent = "";
  typingDone = false;
  document.querySelector(".click-indicator").classList.remove("visible");
  let i = 0;
  typingTimer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
      typingDone = true;
      // Show click indicator for auto-advance nodes
      if (pendingNext) {
        document.querySelector(".click-indicator").classList.add("visible");
      }
      if (callback) callback();
    }
  }, speed || 30);
}

// ── Skip typing on click / advance on click ──
let pendingNext = null;

textEl.parentElement.addEventListener("click", () => {
  if (audioCtx.state === "suspended") audioCtx.resume();

  // If still typing — skip to full text
  if (!typingDone && typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
    typingDone = true;
    textEl.textContent = currentFullText;
    // Show click indicator for auto-advance nodes
    if (pendingNext) {
      document.querySelector(".click-indicator").classList.add("visible");
    }
    return;
  }

  // If typing done and there's a next scene — advance
  if (typingDone && pendingNext) {
    playClick();
    const next = pendingNext;
    pendingNext = null;
    document.querySelector(".click-indicator").classList.remove("visible");
    show(next);
  }
});

const endingOverlay = document.getElementById("ending-overlay");
const endingTitleEl = document.getElementById("ending-title");
const endingDescEl = document.getElementById("ending-desc");

let currentFullText = "";

// ── Story data ──
const story = {
  // ═══════════════════════════════════
  //  ИНТРО — два кадра
  // ═══════════════════════════════════
  intro_1: {
    scene: "Лесная поляна",
    sceneClass: "bg-digging",
    speaker: "",
    text: "Сумерки. Старый дуб раскидывает тени над чёрной землёй. Алекс стоит на кортях и роется в грязи голыми руками.",
    bgm: "bgm-forest",
    sfx: "sfx-dig",
    next: "intro_2"
  },

  intro_2: {
    scene: "Находит предмет",
    sceneClass: "bg-found-item",
    speaker: "",
    text: "Пальцы нащупывают что-то холодное. Маленький предмет блестит в последних лучах света. Алекс прячет его в карман и быстрым шагом уходит вглубь леса.",
    sfx: "sfx-item-pickup",
    next: "meet_cop"
  },

  // ═══════════════════════════════════
  //  ВСТРЕЧА С ПОЛИЦЕЙСКИМ
  // ═══════════════════════════════════
  meet_cop: {
    scene: "Лесная тропа",
    sceneClass: "bg-forest-stand",
    speaker: "",
    text: "Алекс едва делает несколько шагов, как из темноты вырывается столб света. Фонарик бьёт прямо в лицо. Голос: «Стойте! Не двигайтесь!»",
    sfx: "sfx-flashlight",
    next: "cop_greeting"
  },

  cop_greeting: {
    scene: "Лесная тропа",
    sceneClass: "bg-portrait",
    speaker: "Сержант Воронов",
    text: "Полицейский в форме. Молодой, но уверенный. «Сержант Воронов. Патруль. Вы откуда тут взялись?»",
    next: "cop_question"
  },

  cop_question: {
    scene: "Допрос в лесу",
    sceneClass: "bg-portrait",
    speaker: "Сержант Воронов",
    text: "Он смотрит на Алекса подозрительно. «Скажите, что вы делали в лесу? Последний патрульный доклад — здесь никого не должно быть.»",
    bgm: "bgm-tension",
    choices: [
      { text: "«Я гулял. Просто гулял»", next: "cop_phone_request" },
      { text: "«Я... ходил в туалет»", next: "cop_toilet" }
    ]
  },

  // ═══════════════════════════════════
  //  ВЕТКА: ТУАЛЕТ
  // ═══════════════════════════════════
  cop_toilet: {
    scene: "Допрос в лесу",
    sceneClass: "bg-forest-calm",
    speaker: "Сержант Воронов",
    text: "Сержант приподнимает бровь. «В туалет? Здесь? Покажите тогда, куда именно вы ходили.»",
    choices: [
      { text: "«Пойдёмте, я покажу»", next: "toilet_check" },
      { text: "«Да тут рядом, за кустами...»", next: "toilet_check" }
    ]
  },

  toilet_check: {
    scene: "Заросли",
    sceneClass: "bg-toilet-split",
    speaker: "",
    text: "Алекс ведёт его за кусты. Полицейский ставит фонарик на землю и осматривает почву.",
    bgm: "bgm-tension",
    choices: [
      { text: "Показать следы жизнедеятельности", next: "toilet_found" },
      { text: "Место оказывается чистым", next: "toilet_clean" }
    ]
  },

  toilet_found: {
    scene: "Заросли",
    sceneClass: "bg-evidence-dirt",
    speaker: "Сержант Воронов",
    text: "Сержант видит следы. Кивает. «Ладно. Видимо, правда.» Он выключает фонарик. «Идите домой. И больше так не делайте — не посреди леса.»",
    bgm: "bgm-calm",
    sfx: "sfx-ending-good",
    next: "ending_toilet"
  },

  toilet_clean: {
    scene: "Заросли",
    sceneClass: "bg-scared",
    speaker: "Сержант Воронов",
    text: "Сержант поворачивается к Алексу. «Чисто. Ни следа. Знаете что? Вы мне кажется странным. Покажите свой телефон.»",
    choices: [
      { text: "Показать телефон", next: "cop_check_phone" },
      { text: "«Не помню пароль»", next: "cop_password" }
    ]
  },

  // ═══════════════════════════════════
  //  ВЕТКА: ТЕЛЕФОН
  // ═══════════════════════════════════
  cop_phone_request: {
    scene: "Допрос в лесу",
    sceneClass: "bg-face-to-face",
    speaker: "Сержант Воронов",
    text: "Сержант кивает, но не расслабляется. «Гуляли... Хорошо. Покажите тогда свой телефон. Мне нужно зафиксировать вашу личность.»",
    choices: [
      { text: "«Держите, вот мой телефон»", next: "cop_check_phone" },
      { text: "«Я не помню пароль от телефона»", next: "cop_password" }
    ]
  },

  cop_password: {
    scene: "Допрос в лесу",
    sceneClass: "bg-portrait",
    speaker: "Сержант Воронов",
    text: "Сержант сужает глаза. «Не помните пароль? Тогда поедем в отделение — там вспомните. У нас есть время.»",
    choices: [
      { text: "«Подождите... я вспомнил! Вот пароль»", next: "cop_check_phone" },
      { text: "«Я правда не помню... ничего не поделаешь»", next: "ending_station_password" }
    ]
  },

  cop_check_phone: {
    scene: "Экран телефона",
    sceneClass: "bg-phone-check",
    speaker: "",
    text: "Сержант берёт телефон. Листает экран. Останавливается. «А что это за альбом? Тут фотографии... с координатами GPS. Целый список.»",
    sfx: "sfx-phone-unlock",
    choices: [
      { text: "«Там ничего не было. Старые фото»", next: "cop_coords_trip" },
      { text: "«Это не мои координаты»", next: "cop_coords_trip" },
      { text: "«Я не знаю, откуда они там»", next: "cop_coords_trip" }
    ]
  },

  // ═══════════════════════════════════
  //  ВЕТКА: ПРОВЕРКА КООРДИНАТ
  // ═══════════════════════════════════
  cop_coords_trip: {
    scene: "Глубь леса",
    sceneClass: "bg-walking-together",
    speaker: "Сержант Воронов",
    text: "Сержант смотрит на Алекса. «Пойдёмте тогда вместе проверим, что там по этим координатам. Недалеко — пять минут.»",
    bgm: "bgm-danger",
    next: "coords_arrive"
  },

  coords_arrive: {
    scene: "Место по координатам",
    sceneClass: "bg-coords-tree",
    speaker: "",
    text: "Они идут по тропе. Фонарик освещает путь. Координаты приводят на небольшую поляну. Сержант останавливается и осматривает землю.",
    choices: [
      { text: "Поляна пуста — ничего подозрительного", next: "coords_empty" },
      { text: "В земле видна свежая яма", next: "coords_evidence" }
    ]
  },

  coords_empty: {
    scene: "Пустая поляна",
    sceneClass: "bg-coords-empty",
    speaker: "Сержант Воронов",
    text: "Сержант долго осматривает поляну. Ничего. «Хм. Ничего нет...» Он поворачивается к Алексу. «Простите, но мне нужно вас обыскать. Стойте. Руки в стороны.»",
    bgm: "bgm-danger",
    sfx: "sfx-search",
    next: "cop_search"
  },

  coords_evidence: {
    scene: "Яма в земле",
    sceneClass: "bg-coords-tree",
    speaker: "Сержант Воронов",
    text: "Сержант опускает фонарик. Свежая яма. Должно быть, Алекс тут что-то выкопал. Сержант медленно поворачивается к нему. «Что это? Вы хотите объяснить?»",
    bgm: "bgm-danger",
    next: "ending_station_evidence"
  },

  // ═══════════════════════════════════
  //  ВЕТКА: ОБЫСК И СВЁРТОК
  // ═══════════════════════════════════
  cop_search: {
    scene: "Обыск",
    sceneClass: "bg-scared",
    speaker: "",
    text: "Сержант начинает обыск. Проверяет карманы. Внутренний карман куртки... Нащупывает маленький свёрток, обёрнутый изолентой. Достаёт.",
    sfx: "sfx-search",
    next: "cop_finds_bundle"
  },

  cop_finds_bundle: {
    scene: "Обыск",
    sceneClass: "bg-scared",
    speaker: "Сержант Воронов",
    text: "Сержант держит свёрток перед лицом Алекса. «А это что такое? Намотано аккуратно. Спрятано глубоко. Вы мне объясните?»",
    choices: [
      { text: "«Это не моё! Вы мне это подкинули!»", next: "cop_planted" },
      { text: "«Слушайте... может, договоримся?»", next: "cop_bribe_intro" }
    ]
  },

  cop_planted: {
    scene: "Обыск",
    sceneClass: "bg-scared",
    speaker: "Сержант Воронов",
    text: "Сержант смеётся. «Подкинул? Серьёзно? Я вас здесь нашёл в полной темноте с подозрительным предметом, и я вам подкидываю? Едем в отдел. Там разберёмся.»",
    bgm: "bgm-bad",
    next: "ending_station_planted"
  },

  // ═══════════════════════════════════
  //  ВЕТКА: ВЗЯТКА И ТОРГИ
  // ═══════════════════════════════════
  cop_bribe_intro: {
    scene: "Лесная тропа",
    sceneClass: "bg-face-to-face",
    speaker: "Сержант Воронов",
    text: "Сержант замирает. Молча смотрит на Алекса. «Вы предлагаете мне... взятку? Знаете, я могу и в суд подать за такое. Или...» Он замолкает.",
    choices: [
      { text: "«5 000 рублей. Вот всё что у меня есть»", next: "bribe_5k" },
      { text: "«10 000 рублей. Пожалуйста»", next: "bribe_10k" },
      { text: "«20 000 рублей. Забирайте всё»", next: "bribe_20k" }
    ]
  },

  bribe_5k: {
    scene: "Лесная тропа",
    sceneClass: "bg-portrait",
    speaker: "Сержант Воронов",
    text: "Сержант хмыкает. «Пять тысяч? За это я могу и работу потерять. Мало. Мне нужно рисковать — семья, ипотека...»",
    sfx: "sfx-cash",
    choices: [
      { text: "«Ладно, 15 000. Больше правда нет»", next: "bribe_15k" },
      { text: "«Больше не могу. Идём в отдел»", next: "ending_station_bribe_low" }
    ]
  },

  bribe_10k: {
    scene: "Лесная тропа",
    sceneClass: "bg-portrait",
    speaker: "Сержант Воронов",
    text: "Сержант думает. «Десять тысяч... Это уже интереснее. Но мне нужно больше — я же рискую. Сколько ещё можете?»",
    sfx: "sfx-cash",
    choices: [
      { text: "«15 000. Вот, забирайте»", next: "bribe_15k" },
      { text: "«Ладно, 20 000. Всё до копейки»", next: "ending_bribe_accepted" }
    ]
  },

  bribe_20k: {
    scene: "Лесная тропа",
    sceneClass: "bg-face-to-face",
    speaker: "Сержант Воронов",
    text: "Сержант долго молчит. Потом медленно достаёт кошелёк. «Двадцать тысяч... Ладно. Забирайте телефон. И проваливайте отсюда. Быстро.»",
    sfx: "sfx-cash",
    next: "ending_bribe_accepted"
  },

  bribe_15k: {
    scene: "Лесная тропа",
    sceneClass: "bg-face-to-face",
    speaker: "Сержант Воронов",
    text: "Сержант колеблется. «Пятнадцать... Ну... Это на грани. Последний шанс. Давайте двадцать — и вы свободны. Нет — едем в отдел.»",
    choices: [
      { text: "«Хорошо, вот все 20 000. Договорились»", next: "ending_bribe_accepted" },
      { text: "«Нет, 15 000 — это максимум»", next: "ending_station_bribe_mid" }
    ]
  },

  // ═══════════════════════════════════
  //  КОНЦОВКИ
  // ═══════════════════════════════════

  // ★ ХОРОШАЯ: Следы в лесу
  ending_toilet: {
    scene: "Свободен",
    sceneClass: "bg-walking-away",
    speaker: "",
    text: "Алекс идёт по тропе. За спиной — тёмный лес и мигалки патрульной машины где-то далеко. Он свободен. Рука в кармане нащупывает холодный предмет. Он всё ещё здесь.",
    bgm: "bgm-calm",
    isEnding: true,
    endingType: "good",
    endingTitle: "КОНЦОВКА: СВОБОДЕН",
    endingDesc: "Алекс показал следы и был отпущен. Предмет остался при нём.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ★ ХОРОШАЯ: Взятка принята
  ending_bribe_accepted: {
    scene: "Договорились",
    sceneClass: "bg-bribe-accepted",
    speaker: "",
    text: "Сержант сует кошелёк в карман формы. «Забирай телефон. И проваливайте. Былое вас тут нет. Нас — тоже.» Алекс разворачивается и уходит. Не оглядываясь.",
    bgm: "bgm-calm",
    isEnding: true,
    endingType: "good",
    endingTitle: "КОНЦОВКА: ДОГОВОРИЛИСЬ",
    endingDesc: "Алекс дал взятку и был отпущен. Но какой ценой?",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ★ ХОРОШАЯ: Домой (ничего не нашли)
  // (сюжетный финал — Алекс уходит пока полицейский ищет)
  ending_home: {
    scene: "Рассвет",
    sceneClass: "bg-forest-calm",
    speaker: "",
    text: "Сержант ищет. Алекс тихо отходит. Потом быстрее. Потом бежит. Через час он выходит на шоссе. Утренний автобус. Домой. Предмет всё ещё в кармане.",
    bgm: "bgm-calm",
    isEnding: true,
    endingType: "good",
    endingTitle: "КОНЦОВКА: ДОМОЙ",
    endingDesc: "Алекс воспользовался моментом и ушёл. Он свободен... пока.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ✖ ПЛОХАЯ: Пароль
  ending_station_password: {
    scene: "Отдел полиции",
    sceneClass: "bg-station",
    speaker: "",
    text: "Алекс сидит в отделе. Металлический стол. Голые стены. Телефон на столе перед дежурным. «Пароль? Нет? Ладно. Подержим вас тут. Может, вспомните.»",
    bgm: "bgm-bad",
    isEnding: true,
    endingType: "bad",
    endingTitle: "КОНЦОВКА: В ОТДЕЛЕ (пароль)",
    endingDesc: "Алекс не смог вспомнить пароль и остался в участке.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ✖ ПЛОХАЯ: Нашли предмет
  ending_station_evidence: {
    scene: "Отдел полиции",
    sceneClass: "bg-station",
    speaker: "",
    text: "Сержант молча достаёт наручники. «Вы задержаны. Право хранить молчение...» Алекс понимает — всё. Предмет был здесь всё время. И теперь — у них.",
    bgm: "bgm-bad",
    isEnding: true,
    endingType: "bad",
    endingTitle: "КОНЦОВКА: В ОТДЕЛЕ (нашли)",
    endingDesc: "Предмет обнаружен. Алекс задержан.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ✖ ПЛОХАЯ: Подкинул
  ending_station_planted: {
    scene: "Отдел полиции",
    sceneClass: "bg-station-planted",
    speaker: "",
    text: "«Подкинул? Вы серьёзно? Едем в отдел — там всё выясним.» Алекс садится в машину. Двери закрываются. В кармане — пусто. Свёрток уже в пакете для улик.",
    bgm: "bgm-bad",
    isEnding: true,
    endingType: "bad",
    endingTitle: "КОНЦОВКА: В ОТДЕЛЕ (обвинение)",
    endingDesc: "Алекс обвинил полицейского в подбрасывании. Никто не поверил.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ✖ ПЛОХАЯ: Взятка — мало
  ending_station_bribe_low: {
    scene: "Отдел полиции",
    sceneClass: "bg-station-bribe-low",
    speaker: "",
    text: "Сержант качает головой. «Мало. Идём в отдел. А ещё — статья за попытку дачи взятки. Двойной удар.» Алекс понимает — просчитался.",
    bgm: "bgm-bad",
    isEnding: true,
    endingType: "bad",
    endingTitle: "КОНЦОВКА: В ОТДЕЛЕ (взятка)",
    endingDesc: "Алекс предложил мало. Теперь ему грозит двойное обвинение.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  },

  // ✖ ПЛОХАЯ: Взятка — 15к не прошло
  ending_station_bribe_mid: {
    scene: "Отдел полиции",
    sceneClass: "bg-station-bribe-mid",
    speaker: "",
    text: "Сержант резко берёт Алекса за руку. «Пятнадцать тысяч? Нет. Вы мне предлагали двадцать. А теперь — в отдел. И за взятку тоже ответите.»",
    bgm: "bgm-bad",
    isEnding: true,
    endingType: "bad",
    endingTitle: "КОНЦОВКА: В ОТДЕЛЕ (торги)",
    endingDesc: "Алекс отказался от окончательной цены. Сержант не прощает.",
    choices: [{ text: "Начать заново", next: "start_menu" }]
  }
};

// ── Auto-advance nodes (no choices, just next) ──
function isAutoAdvance(id) {
  const node = story[id];
  return node && node.next && !node.choices && !node.isEnding;
}

// ── Save / Load (localStorage) ──
let currentSceneId = "intro_1";

function saveGame() {
  const data = {
    scene: currentSceneId,
    timestamp: Date.now()
  };
  localStorage.setItem("forest_vn_save", JSON.stringify(data));
  showSaveIndicator("Сохранено");
}

function loadGame() {
  const raw = localStorage.getItem("forest_vn_save");
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    if (story[data.scene]) {
      show(data.scene);
      return true;
    }
  } catch (e) {}
  return false;
}

function hasSave() {
  return !!localStorage.getItem("forest_vn_save");
}

function deleteSave() {
  localStorage.removeItem("forest_vn_save");
}

function showSaveIndicator(msg) {
  const el = document.getElementById("save-indicator");
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 1500);
}

// ── Show scene ──
function show(id) {
  if (id === "start_menu") {
    show("intro_1");
    return;
  }

  const node = story[id];
  if (!node) return;

  // Auto-save
  currentSceneId = id;
  if (!node.isEnding && id !== "intro_1") saveGame();

  if (audioCtx.state === "suspended") audioCtx.resume();

  // SFX
  if (node.sfx === "sfx-dig") playDig();
  else if (node.sfx === "sfx-item-pickup") playItemPickup();
  else if (node.sfx === "sfx-flashlight") playFlashlight();
  else if (node.sfx === "sfx-phone-unlock") {
    playSceneChange();
    setTimeout(() => playFlashlight(), 200);
  }
  else if (node.sfx === "sfx-search") playSearch();
  else if (node.sfx === "sfx-cash") playCash();
  else if (node.sfx === "sfx-ending-good") playEndGood();
  else if (node.sfx === "sfx-ending-bad") playEndBad();
  else if (!node.isEnding) playSceneChange();

  // Background
  sceneEl.className = "scene " + (node.sceneClass || "");
  sceneTitle.textContent = node.scene;

  // Dialog
  dialogBox.className = "dialog-box";
  speakerName.textContent = node.speaker || "";
  speakerName.className = "speaker-name" + (node.speaker === "Алекс" ? " alex" : "");

  // Click indicator — show only for auto-advance nodes
  const clickInd = document.querySelector(".click-indicator");
  clickInd.classList.remove("visible");

  currentFullText = node.text;
  typeText(textEl, node.text, 30);

  // Choices
  choicesEl.classList.remove("visible");
  choicesEl.innerHTML = "";

  // Ending display
  if (node.isEnding) {
    pendingNext = null;
    document.querySelector(".click-indicator").classList.remove("visible");
    endingOverlay.classList.remove("visible");

    setTimeout(() => {
      if (node.endingType === "good") playEndGood();
      else playEndBad();
    }, 500);

    setTimeout(() => {
      endingTitleEl.textContent = node.endingTitle || "КОНЦОВКА";
      endingTitleEl.className = "ending-title " + node.endingType;
      endingDescEl.textContent = node.endingDesc || "";
      endingOverlay.classList.add("visible");

      // Show restart button on overlay
      endingOverlay.innerHTML = "";
      endingOverlay.appendChild(endingTitleEl);
      endingOverlay.appendChild(endingDescEl);
    }, 800);

    setTimeout(() => {
      node.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.className = "ending-btn";
        btn.onclick = () => {
          playClick();
          endingOverlay.classList.remove("visible");
          show(choice.next);
        };
        endingOverlay.appendChild(btn);
      });
    }, 1500);
    return;
  }

  // Auto-advance — wait for click
  if (node.next && !node.choices) {
    pendingNext = node.next;
    return;
  }

  // Choices
  if (node.choices) {
    pendingNext = null;
    document.querySelector(".click-indicator").classList.remove("visible");
    setTimeout(() => {
      node.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => {
          playClick();
          show(choice.next);
        };
        choicesEl.appendChild(btn);
      });
      choicesEl.classList.add("visible");
    }, 300);
  }
}

document.addEventListener("click", () => {
  if (audioCtx.state === "suspended") audioCtx.resume();
}, { once: true });

// ── Save/Load button handlers ──
document.getElementById("save-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  saveGame();
});

document.getElementById("load-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  if (hasSave()) {
    loadGame();
  } else {
    showSaveIndicator("Нет сохранений");
  }
});

document.getElementById("restart-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  endingOverlay.classList.remove("visible");
  choicesEl.classList.remove("visible");
  choicesEl.innerHTML = "";
  deleteSave();
  show("intro_1");
});

// ── Start game (load if save exists, else intro) ──
if (!loadGame()) {
  show("intro_1");
}
