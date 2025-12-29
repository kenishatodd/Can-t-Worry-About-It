export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

export interface QuizSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: QuizQuestion[];
}

export interface CapacityResult {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  minScore: number;
  maxScore: number;
  affirmation: string;
  gentleNextStep: string;
  groundingExercise: string;
  mindsetReframe: string;
  optionalAction: string;
  microActions: string[];
}

export const quizSections: QuizSection[] = [
  {
    id: "energy",
    title: "Energy Check",
    description: "Let's gently check in with your energy levels today.",
    icon: "✨",
    questions: [
      {
        id: "energy-1",
        text: "How does your body feel right now?",
        options: [
          { text: "Rested and ready", value: 4 },
          { text: "A little tired, but okay", value: 3 },
          { text: "Running on caffeine and willpower", value: 2 },
          { text: "Completely exhausted", value: 1 },
        ],
      },
      {
        id: "energy-2",
        text: "How well did you sleep last night?",
        options: [
          { text: "Deep, restful sleep", value: 4 },
          { text: "Decent, woke up once or twice", value: 3 },
          { text: "Restless, woke up often", value: 2 },
          { text: "Barely slept at all", value: 1 },
        ],
      },
      {
        id: "energy-3",
        text: "How would you describe your motivation today?",
        options: [
          { text: "Feeling inspired and focused", value: 4 },
          { text: "Steady, getting things done", value: 3 },
          { text: "Pushing through the fog", value: 2 },
          { text: "Can barely find the will", value: 1 },
        ],
      },
    ],
  },
  {
    id: "emotional",
    title: "Emotional Weather",
    description: "What's the forecast for your inner world today?",
    icon: "🌤",
    questions: [
      {
        id: "emotional-1",
        text: "If your emotions were weather, what would it be?",
        options: [
          { text: "Clear skies and sunshine", value: 4 },
          { text: "Partly cloudy with moments of light", value: 3 },
          { text: "Overcast and heavy", value: 2 },
          { text: "Stormy and overwhelming", value: 1 },
        ],
      },
      {
        id: "emotional-2",
        text: "How easily are you getting triggered today?",
        options: [
          { text: "Very grounded and calm", value: 4 },
          { text: "A little sensitive but managing", value: 3 },
          { text: "On edge, reacting quickly", value: 2 },
          { text: "Everything feels like too much", value: 1 },
        ],
      },
      {
        id: "emotional-3",
        text: "How connected do you feel to yourself?",
        options: [
          { text: "Deeply in tune with my needs", value: 4 },
          { text: "Somewhat aware", value: 3 },
          { text: "Disconnected and numb", value: 2 },
          { text: "Lost and overwhelmed", value: 1 },
        ],
      },
    ],
  },
  {
    id: "time",
    title: "Time & Space",
    description: "Let's see how your schedule feels right now.",
    icon: "🕐",
    questions: [
      {
        id: "time-1",
        text: "How does your schedule feel this week?",
        options: [
          { text: "Balanced with breathing room", value: 4 },
          { text: "Full but manageable", value: 3 },
          { text: "Packed with little flexibility", value: 2 },
          { text: "Completely overwhelming", value: 1 },
        ],
      },
      {
        id: "time-2",
        text: "When was the last time you had unscheduled time?",
        options: [
          { text: "Today or yesterday", value: 4 },
          { text: "A few days ago", value: 3 },
          { text: "I can't remember", value: 2 },
          { text: "What is that?", value: 1 },
        ],
      },
      {
        id: "time-3",
        text: "How often do you feel rushed?",
        options: [
          { text: "Rarely, I move at my pace", value: 4 },
          { text: "Sometimes, but it's manageable", value: 3 },
          { text: "Often, always racing", value: 2 },
          { text: "Constantly, never enough time", value: 1 },
        ],
      },
    ],
  },
  {
    id: "support",
    title: "Support Check",
    description: "Who's holding space for you right now?",
    icon: "💛",
    questions: [
      {
        id: "support-1",
        text: "Do you have someone you can talk to openly?",
        options: [
          { text: "Yes, several people", value: 4 },
          { text: "One or two trusted people", value: 3 },
          { text: "Not really, I keep to myself", value: 2 },
          { text: "I feel completely alone", value: 1 },
        ],
      },
      {
        id: "support-2",
        text: "How comfortable are you asking for help?",
        options: [
          { text: "Very comfortable", value: 4 },
          { text: "Working on it", value: 3 },
          { text: "It's hard for me", value: 2 },
          { text: "I never ask", value: 1 },
        ],
      },
      {
        id: "support-3",
        text: "Do you feel seen and understood?",
        options: [
          { text: "Yes, by people who matter", value: 4 },
          { text: "Sometimes, in certain spaces", value: 3 },
          { text: "Rarely, I often feel invisible", value: 2 },
          { text: "Never, I feel unseen", value: 1 },
        ],
      },
    ],
  },
  {
    id: "rest",
    title: "Rest & Restoration",
    description: "How's your cup being refilled?",
    icon: "🌙",
    questions: [
      {
        id: "rest-1",
        text: "How often do you take intentional breaks?",
        options: [
          { text: "Daily, it's part of my routine", value: 4 },
          { text: "A few times a week", value: 3 },
          { text: "Rarely, only when forced", value: 2 },
          { text: "Never, there's no time", value: 1 },
        ],
      },
      {
        id: "rest-2",
        text: "When was your last moment of real joy?",
        options: [
          { text: "Today", value: 4 },
          { text: "This week", value: 3 },
          { text: "I can't remember", value: 2 },
          { text: "It's been too long", value: 1 },
        ],
      },
      {
        id: "rest-3",
        text: "How well are you nourishing yourself?",
        options: [
          { text: "Good meals, water, movement", value: 4 },
          { text: "Trying my best", value: 3 },
          { text: "Survival mode eating", value: 2 },
          { text: "Neglecting my body", value: 1 },
        ],
      },
      {
        id: "rest-4",
        text: "How do you feel about saying 'no'?",
        options: [
          { text: "Comfortable and confident", value: 4 },
          { text: "Getting better at it", value: 3 },
          { text: "Guilty but trying", value: 2 },
          { text: "I can't say no", value: 1 },
        ],
      },
    ],
  },
];

export const capacityResults: CapacityResult[] = [
  {
    id: "overflowing",
    title: "Overflowing Cup",
    color: "text-sage-dark",
    bgColor: "bg-overflowing",
    minScore: 52,
    maxScore: 64,
    affirmation: "You're in a beautiful space of abundance. Your cup is full, and you have overflow to share. This is a testament to the boundaries you've held and the care you've given yourself.",
    gentleNextStep: "Consider how you might share this overflow with someone who needs it, or simply bask in this fullness you've created.",
    groundingExercise: "Place your hand on your heart. Take three deep breaths and whisper: 'I am enough, and I have enough.'",
    mindsetReframe: "This abundance isn't luck—it's the result of your intentional choices. You're allowed to enjoy this moment fully.",
    optionalAction: "Write a note of gratitude to someone who has supported you, or treat yourself to something nurturing.",
    microActions: [
      "Share a kind word with someone today",
      "Document this feeling in your journal",
      "Plan something joyful for this week",
    ],
  },
  {
    id: "steady",
    title: "Steady & Supported",
    color: "text-sage-dark",
    bgColor: "bg-steady",
    minScore: 40,
    maxScore: 51,
    affirmation: "You're in a place of sustainable rhythm. You have what you need, and you're maintaining a healthy balance. This is the sweet spot of capacity.",
    gentleNextStep: "Keep nurturing this balance. Small, consistent acts of self-care will help you maintain this steady state.",
    groundingExercise: "Stand with your feet firmly planted. Feel your roots going deep into the earth. You are grounded and stable.",
    mindsetReframe: "Steady doesn't mean stagnant. You're in a place of sustainable growth and gentle expansion.",
    optionalAction: "Add one small pleasure to your routine this week—something that brings you quiet joy.",
    microActions: [
      "Take a 5-minute stretching break",
      "Drink a full glass of water mindfully",
      "Send a voice note to someone you love",
    ],
  },
  {
    id: "reserve",
    title: "Running on Reserve",
    color: "text-gold-dark",
    bgColor: "bg-reserve",
    minScore: 28,
    maxScore: 39,
    affirmation: "You're managing, but your reserves are getting low. This is a gentle warning from your body and soul that it's time to pause and refill.",
    gentleNextStep: "Look at your week and identify one thing you can release, postpone, or delegate. Your 'no' is a gift to yourself.",
    groundingExercise: "Close your eyes. Imagine a golden light filling your cup slowly from the bottom up. You are being replenished.",
    mindsetReframe: "Running low isn't failure—it's information. Your body is speaking. You're wise enough to listen.",
    optionalAction: "Cancel or reschedule one non-essential commitment this week.",
    microActions: [
      "Take 60 seconds of slow breathing",
      "Step outside for fresh air",
      "Eat your next meal without screens",
    ],
  },
  {
    id: "empty",
    title: "Running on Empty",
    color: "text-terracotta",
    bgColor: "bg-empty",
    minScore: 20,
    maxScore: 27,
    affirmation: "Beautiful soul, you've been giving more than you have. You're not broken—you're depleted. And depletion can be healed with rest and gentle care.",
    gentleNextStep: "This is not the time for pushing through. This is the time for radical rest and saying no to everything that isn't essential.",
    groundingExercise: "Lie down if you can. Place one hand on your belly, one on your chest. Breathe slowly and say: 'I am allowed to rest.'",
    mindsetReframe: "Empty isn't weak. You've been carrying too much for too long. Setting it down is strength.",
    optionalAction: "Ask someone you trust to help with one task today. You don't have to do this alone.",
    microActions: [
      "Take 10 minutes to do absolutely nothing",
      "Ask for help with one small thing",
      "Go to bed 30 minutes earlier tonight",
    ],
  },
  {
    id: "gentle-care",
    title: "Needs Gentle Care",
    color: "text-warm-brown",
    bgColor: "bg-gentle-care",
    minScore: 16,
    maxScore: 19,
    affirmation: "Sweet one, you're in a tender place right now. This isn't weakness—this is your soul asking for the deepest care. You deserve softness.",
    gentleNextStep: "If possible, clear your schedule for the next 24 hours. This is a time for emergency self-care and reaching out for support.",
    groundingExercise: "Wrap your arms around yourself in a gentle hug. Rock slowly side to side. Whisper: 'I am here for myself. I am not alone.'",
    mindsetReframe: "You are not too much. You are not too needy. You are human, and humans need care. You are worthy of it.",
    optionalAction: "Reach out to one person—a friend, therapist, or loved one—and tell them how you're really feeling.",
    microActions: [
      "Drink something warm and comforting",
      "Call or text someone who feels safe",
      "Give yourself permission to cry if needed",
    ],
  },
];

export function calculateCapacityResult(answers: Record<string, number>): CapacityResult {
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  
  for (const result of capacityResults) {
    if (totalScore >= result.minScore && totalScore <= result.maxScore) {
      return result;
    }
  }
  
  // Fallback to gentle care if score is very low
  return capacityResults[capacityResults.length - 1];
}
