export interface GuideChapter {
  id: string;
  title: string;
  description: string;
  content: string;
  capacityResult?: string;
  isFree: boolean;
}

export const guideChapters: GuideChapter[] = [
  {
    id: "intro",
    title: "Welcome to CWAI",
    description: "An introduction to the Can't Worry About It philosophy",
    content: `# Welcome to CWAI

Welcome, beautiful soul.

If you're here, it's because some part of you knew you needed this. That knowing is wisdom. That knowing is self-love in action.

**CWAI—Can't Worry About It—isn't about dismissing your concerns.** It's about releasing the grip that worry has on your nervous system. It's about understanding that you cannot pour from an empty cup, and that refilling yourself isn't selfish—it's essential.

## What This Guide Will Help You Do

- Understand your capacity patterns
- Recognize the early signs of depletion
- Build a sustainable self-care practice
- Learn to say no without guilt
- Create boundaries that protect your peace

## A Gentle Reminder

You don't have to read this all at once. You don't have to implement everything today. Take what resonates. Leave what doesn't. Return when you need to.

This guide isn't about adding more to your plate. It's about helping you hold less—so you can hold what truly matters.

With warmth,
**Dr. Kenisha Elaine**`,
    isFree: true,
  },
  {
    id: "understanding-capacity",
    title: "Understanding Your Capacity",
    description: "Learning to read your internal signals",
    content: `# Understanding Your Capacity

Your capacity isn't fixed. It fluctuates based on:

- Sleep quality
- Hormonal cycles
- Stress levels
- Emotional load
- Physical health
- Season of life

**The key isn't to always have high capacity.** The key is to accurately assess where you are and adjust accordingly.

## The Cup Metaphor

Imagine your capacity as a cup. Throughout each day:

- **Things that fill your cup**: Rest, joy, connection, nourishment, movement, play
- **Things that drain your cup**: Stress, overcommitment, toxic relationships, lack of sleep, perfectionism

When your cup is full, you can give freely. When it's empty, every demand feels like too much.

## Reading Your Signals

Your body is always communicating. Learn to listen for:

- Tension in your shoulders and jaw
- Shallow breathing
- Irritability over small things
- Difficulty making decisions
- Craving isolation or numbing behaviors

These aren't character flaws. They're signals. Honor them.`,
    capacityResult: "all",
    isFree: true,
  },
  {
    id: "overflowing-cup",
    title: "When Your Cup Overflows",
    description: "Maintaining and sharing your abundance",
    content: `# When Your Cup Overflows

Congratulations on reaching a place of abundance. This chapter is for those moments when you feel full, resourced, and capable.

## Honoring the Overflow

First, pause and acknowledge this state. It didn't happen by accident. You made choices—perhaps unconsciously—that led here. 

What were they? Consider:
- What boundaries did you hold?
- What did you say no to?
- Who supported you?
- What routines served you?

Document these. They're your recipe for fullness.

## Sharing Without Depleting

When we feel full, the natural impulse is to give. This is beautiful—but be mindful:

- **Give from overflow, not from reserves**
- Set time limits on giving activities
- Check in with yourself mid-giving
- Remember: you can pause and return

## Building Reserves

Use this abundant time to build reserves for future low-capacity seasons:

- Batch cook and freeze nourishing meals
- Pre-write supportive notes to yourself
- Create playlists that soothe your soul
- Strengthen relationships that fill you

The overflow won't last forever, and that's okay. Let this season teach you what works.`,
    capacityResult: "overflowing",
    isFree: false,
  },
  {
    id: "steady-supported",
    title: "Steady & Supported",
    description: "Maintaining your sustainable rhythm",
    content: `# Steady & Supported

You're in the sweet spot. Not running on fumes, not overwhelmed with abundance—just steady. This is sustainable. This is the goal.

## The Art of Maintenance

When things are good, we often forget to maintain what's working. Don't let this happen.

**Ask yourself weekly:**
- What's working well right now?
- What small thing could I add to enhance my wellbeing?
- Is there anything slowly draining me that I've been ignoring?

## Gentle Expansion

From this steady place, you can consider gentle expansion:

- Taking on one new thing (not five)
- Deepening one relationship
- Trying one new self-care practice

The key word is **one**. Steady doesn't mean stagnant, but it also doesn't mean sprinting.

## Protecting Your Peace

Others may ask more of you when you seem "fine." Practice responses like:

- "I have capacity for one more thing. Let me check what that is."
- "I'm in a good place because I've been protecting my boundaries."
- "I'd love to help, but not this week."

Your steady state is precious. Guard it gently.`,
    capacityResult: "steady",
    isFree: false,
  },
  {
    id: "running-reserve",
    title: "Running on Reserve",
    description: "Recognizing and responding to depletion",
    content: `# Running on Reserve

This is the yellow light zone. You're still functional, still getting things done—but your reserves are low. Left unchecked, this leads to burnout.

## The Warning Signs You Might Be Ignoring

- Saying "I'm fine" when you're not
- Canceling self-care plans "just this once"
- Extra coffee, extra wine, extra scrolling
- Snapping at loved ones
- Crying at unexpected moments

These aren't character flaws. They're signals that your cup needs attention.

## Emergency Refills

When you're in reserve mode, you need quick wins:

**Physical:**
- 5 minutes of stretching
- A glass of water
- Three deep breaths
- A 10-minute walk outside

**Emotional:**
- Text someone who makes you smile
- Watch a comforting video
- Listen to a song that moves you
- Pet an animal if available

**Mental:**
- Brain dump everything on paper
- Cancel one thing from tomorrow
- Set a 5-minute timer and do nothing

## The Hard Truth

You probably got here by ignoring earlier signals. That's okay—we all do it. But now you know. The question is: what will you choose?`,
    capacityResult: "reserve",
    isFree: false,
  },
  {
    id: "running-empty",
    title: "Running on Empty",
    description: "Emergency care for depleted souls",
    content: `# Running on Empty

Dear one, if you're reading this, you've been giving more than you have. You're not broken. You're depleted. There's a difference.

## This Is Not a Productivity Chapter

I'm not going to give you a list of things to accomplish. I'm going to give you permission.

**You are allowed to:**
- Cancel things
- Disappoint people
- Ask for help
- Do the bare minimum
- Rest without earning it
- Say "I can't right now"

## What Empty Actually Means

When you're empty, your nervous system is in survival mode. You may experience:

- Decision fatigue (even small choices feel huge)
- Emotional numbness or unexpected tears
- Physical exhaustion that sleep doesn't fix
- Feeling disconnected from yourself

This is your body protecting you. It's wisdom, not weakness.

## Gentle First Steps

Don't try to fix everything. Try one thing:

1. **Drink water.** Your body is probably dehydrated.
2. **Eat something simple.** Nourishment doesn't have to be fancy.
3. **Tell one person.** Text: "I'm struggling. I don't need advice, just acknowledgment."
4. **Lower the bar.** What's the absolute minimum you need to do today?

Tomorrow, you can try one more thing. For now, this is enough. You are enough.`,
    capacityResult: "empty",
    isFree: false,
  },
  {
    id: "gentle-care",
    title: "Needs Gentle Care",
    description: "Deep support for tender times",
    content: `# Needs Gentle Care

Sweet soul, you are in a tender place. This chapter is written with the softest voice, meant to be read slowly, perhaps more than once.

## You Are Not Too Much

Whatever you're feeling right now—the overwhelm, the exhaustion, the tears that come without warning—this is not evidence that you're broken. This is evidence that you're human.

You have been carrying too much for too long. Your body and soul are asking for rest.

## What Gentle Care Looks Like

Gentle care is not about fixing. It's about holding.

**Hold yourself like you would a dear friend:**
- Speak softly to yourself
- Move slowly
- Expect less than usual
- Accept more help than feels comfortable

## Reaching Out

This is not a time to go it alone. Please consider reaching out to:

- A therapist or counselor
- A trusted friend or family member
- A support hotline if needed
- Your doctor if symptoms persist

There is no shame in needing support. The bravest thing you can do is let others in.

## A Gentle Practice

When you can, try this:

1. Find a quiet space
2. Wrap yourself in something soft
3. Place your hands on your heart
4. Breathe slowly
5. Say: "I am here for myself. I am not alone. This too shall pass."

You are loved. You are worthy. You will get through this.

**With all my heart,**
**Dr. Kenisha Elaine**`,
    capacityResult: "gentle-care",
    isFree: false,
  },
];
