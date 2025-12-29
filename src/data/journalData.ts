export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  prompt: string;
}

export const journalPrompts = [
  "Right now I feel…",
  "What I need today is…",
  "Something I'm grateful for…",
  "I'm giving myself permission to…",
  "What would feel nurturing right now…",
  "I'm proud of myself for…",
  "A boundary I need to hold is…",
  "My body is telling me…",
];

export function getRandomPrompt(): string {
  return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
}
