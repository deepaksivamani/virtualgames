export interface Puzzle {
    type: 'icon' | 'text' | 'html';
    content: string | string[];
    answer: string[];
    hint: string;
    difficulty: 1 | 2 | 3;
    originalIndex?: number;
}

export const TOPICS: Puzzle[] = [
    // --- DIFFICULTY 1: EASY (Direct Icons, Simple Text) ---
    {
        type: 'icon',
        content: ['☁️', '9'],
        answer: ["cloud nine", "cloud 9"],
        hint: "Heavenly feeling.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🍏', '3.14'],
        answer: ["apple pie"],
        hint: "Dessert math.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🔥', '🐶'],
        answer: ["hot dog", "hotdog"],
        hint: "Ballpark snack.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['☀️', '👓'],
        answer: ["sunglasses", "sun glasses"],
        hint: "Eye protection.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🏀'],
        answer: ["basketball"],
        hint: "Hoop dreams.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🧊', '🍦'],
        answer: ["ice cream"],
        hint: "Frozen treat.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['👁️', '☎️'],
        answer: ["iphone"],
        hint: "Apple product.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🔥', '🪰'],
        answer: ["firefly"],
        hint: "Glowing bug.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🌧️', '🎀'],
        answer: ["rainbow"],
        hint: "Colorful arc.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🖊️', '🐧'],
        answer: ["penguin"],
        hint: "Pen + Guin? Close sound.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🐱', '🐟'],
        answer: ["catfish"],
        hint: "Not who they say they are.",
        difficulty: 1
    },
    {
        type: 'text',
        content: `
  NOON GOOD
    `,
        answer: ["good afternoon"],
        hint: "Greeting time.",
        difficulty: 1
    },
    {
        type: 'text',
        content: `
   TRAVEL
  CCCCCCCC
    `,
        answer: ["travel overseas"],
        hint: "Going across the water.",
        difficulty: 1
    },
    {
        type: 'text',
        content: `
  job
    `,
        answer: ["small job"],
        hint: "Look at the size.",
        difficulty: 1
    },
    {
        type: 'text',
        content: `
  CYCLE
  CYCLE
  CYCLE
    `,
        answer: ["tricycle"],
        hint: "Three wheels.",
        difficulty: 1
    },
    {
        type: 'html',
        content: '<div>1 3 5 7 9</div>',
        answer: ["odds and ends", "odd numbers"],
        hint: "Not even.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🚪', '🔔'],
        answer: ["doorbell", "door bell"],
        hint: "Ding dong.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🌟', '🐟'],
        answer: ["starfish", "star fish"],
        hint: "Marine echinoderm.",
        difficulty: 1
    },
    {
        type: 'icon',
        content: ['🌻'],
        answer: ["sunflower"],
        hint: "Follows the light.",
        difficulty: 1
    },

    // --- DIFFICULTY 2: MEDIUM (Classic Rebus, Wordplay) ---
    {
        type: 'html',
        content: '<div style="display:flex; flex-direction:column; align-items:center;"><span>💊</span><span>AID</span></div>',
        answer: ["first aid"],
        hint: "Emergency help.",
        difficulty: 2
    },
    {
        type: 'icon',
        content: ['🦵', '💡', '💡', '💡'],
        answer: ["neon lights"],
        hint: "Bright city signs.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  M
  I
  L
  L
  I
  O
  N
    `,
        answer: ["one in a million"],
        hint: "Count them.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  STAND
  I
    `,
        answer: ["i understand"],
        hint: "Position matters.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  HISTORY
  HISTORY
  HISTORY
    `,
        answer: ["history repeats itself", "history repeats"],
        hint: "It happens again and again.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  man
  board
    `,
        answer: ["man overboard"],
        hint: "Ship emergency.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  MIND
  MATTER
    `,
        answer: ["mind over matter"],
        hint: "Willpower.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  READING

  LINES
    `,
        answer: ["reading between the lines"],
        hint: "Look into the empty space.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  CAT
  9
    `,
        answer: ["nine lives"],
        hint: "Feline feature.",
        difficulty: 2
    },
    {
        type: 'html',
        content: '<div><span style="font-weight:bold;">T</span><span style="font-weight:bold;">O</span><span style="font-weight:bold;">U</span><span style="font-weight:bold;">C</span><span style="font-weight:bold;">H</span></div>',
        answer: ["touchdown", "touch down"],
        hint: "Scoring points.",
        difficulty: 2
    },
    {
        type: 'html',
        content: '<div>potOOOOOOOO</div>',
        answer: ["potatoes"],
        hint: "Boil 'em, mash 'em.",
        difficulty: 2
    },
    {
        type: 'icon',
        content: ['🐛', '📝'],
        answer: ["bug report"],
        hint: "Developer's nightmare.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  RIGHT = RIGHT
    `,
        answer: ["equal rights"],
        hint: "Fairness.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  DICE
  DICE
    `,
        answer: ["paradise"],
        hint: "Heavenly pair.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  JACK
  BOX
    `,
        answer: ["jack in the box"],
        hint: "Pop goes the weasel.",
        difficulty: 2
    },
    {
        type: 'text',
        content: `
  T
  U
  O
    `,
        answer: ["inside out"],
        hint: "Reversed.",
        difficulty: 2
    },
    {
        type: 'icon',
        content: ['🧠', '⛈️'],
        answer: ["brainstorm", "brain storm"],
        hint: "Idea generation.",
        difficulty: 2
    },
    {
        type: 'icon',
        content: ['🍬', '❤️'],
        answer: ["sweetheart"],
        hint: "Affectionate term.",
        difficulty: 2
    },


    // --- DIFFICULTY 3: HARD (Abstract, Clever Positioning, HTML Tricks) ---
    {
        type: 'text',
        content: `
  age
  ---
  age
  age
    `,
        answer: ["middle age"],
        hint: "One in the center.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
  BUTE
  BUTE
  BUTE
    `,
        answer: ["tribute"],
        hint: "Three of them.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
  FA  ST
    `,
        answer: ["breakfast"],
        hint: "Morning meal (split).",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
   ECNALG
    `,
        answer: ["backward glance"],
        hint: "Looking back.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
  0
  M.D.
  Ph.D.
  B.S.
    `,
        answer: ["three degrees below zero"],
        hint: "Temperature academic.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div><span>MAN</span><br><hr style="width:50px; margin: 5px auto; border:none; border-top:2px solid white;"><span>BOARD</span></div>',
        answer: ["man overboard"],
        hint: "Falling off the ship.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div><span style="color: red;">FACE</span></div>',
        answer: ["red in the face", "red face"],
        hint: "Embarrassed.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div style="display:flex; align-items:center;"><span>SEARCH</span></div><div style="margin-top:50px;"><span>CH</span></div>',
        answer: ["search high and low"],
        hint: "Looking everywhere.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div>X Q Q ME</div>',
        answer: ["excuse me"],
        hint: "Pardon.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div>G N I K O O L</div>',
        answer: ["looking back"],
        hint: "Reviewing history.",
        difficulty: 3
    },
    {
        type: 'html',
        content: '<div><span style="text-decoration: line-through;">MOTION</span></div>',
        answer: ["motion denied", "stop motion"],
        hint: "Courtroom phrase.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
  HE'S HIMSELF
    `,
        answer: ["he's beside himself"],
        hint: "Very upset.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
   KJA C
    `,
        answer: ["hijack"],
        hint: "High Jack.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
   SYMPHON..
    `,
        answer: ["unfinished symphony"],
        hint: "Music cut short.",
        difficulty: 3
    },
    {
        type: 'icon',
        content: ['⬛', 'mail'],
        answer: ["blackmail"],
        hint: "Extortion.",
        difficulty: 3
    },
    {
        type: 'text',
        content: `
   COLD
   --------
    WATER
    `,
        answer: ["cold water"],
        hint: "As written.",
        difficulty: 3
    }
];

export interface DrawWord {
    word: string;
    difficulty: 1 | 2 | 3;
}

export const DRAW_WORDS: DrawWord[] = [
    // Easy
    { word: "Sun", difficulty: 1 },
    { word: "Cat", difficulty: 1 },
    { word: "House", difficulty: 1 },
    { word: "Tree", difficulty: 1 },
    { word: "Smile", difficulty: 1 },
    { word: "Book", difficulty: 1 },
    { word: "Apple", difficulty: 1 },
    { word: "Car", difficulty: 1 },
    { word: "Fish", difficulty: 1 },
    { word: "Hat", difficulty: 1 },
    { word: "Dog", difficulty: 1 },
    { word: "Ball", difficulty: 1 },
    { word: "Star", difficulty: 1 },
    { word: "Cup", difficulty: 1 },
    { word: "Chair", difficulty: 1 },

    // Medium
    { word: "Bicycle", difficulty: 2 },
    { word: "Giraffe", difficulty: 2 },
    { word: "Pizza", difficulty: 2 },
    { word: "Camera", difficulty: 2 },
    { word: "Guitar", difficulty: 2 },
    { word: "Snowman", difficulty: 2 },
    { word: "Rainbow", difficulty: 2 },
    { word: "Castle", difficulty: 2 },
    { word: "Train", difficulty: 2 },
    { word: "Robot", difficulty: 2 },
    { word: "Turtle", difficulty: 2 },
    { word: "Rocket", difficulty: 2 },
    { word: "Vampire", difficulty: 2 },
    { word: "Pirate", difficulty: 2 },
    { word: "Zombie", difficulty: 2 },

    // Hard
    { word: "Electricity", difficulty: 3 },
    { word: "Gravity", difficulty: 3 },
    { word: "Shadow", difficulty: 3 },
    { word: "Dream", difficulty: 3 },
    { word: "Echo", difficulty: 3 },
    { word: "Silence", difficulty: 3 },
    { word: "Galaxy", difficulty: 3 },
    { word: "Evolution", difficulty: 3 },
    { word: "Reflection", difficulty: 3 },
    { word: "Invisible", difficulty: 3 },
    { word: "Nightmare", difficulty: 3 },
    { word: "Whirlpool", difficulty: 3 },
    { word: "Earthquake", difficulty: 3 },
    { word: "Tornado", difficulty: 3 },
    { word: "Volcano", difficulty: 3 }
];
