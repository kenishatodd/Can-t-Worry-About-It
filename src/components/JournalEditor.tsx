import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getRandomPrompt, JournalEntry } from "@/data/journalData";
import { RefreshCw, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JournalEditor = () => {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setPrompt(getRandomPrompt());
    // Load entries from localStorage
    const saved = localStorage.getItem("cwai-journal-entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleNewPrompt = () => {
    setPrompt(getRandomPrompt());
  };

  const handleSave = () => {
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: content.trim(),
      prompt,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("cwai-journal-entries", JSON.stringify(updatedEntries));
    setContent("");
    setPrompt(getRandomPrompt());

    toast({
      title: "Entry saved",
      description: "Your thoughts have been gently stored.",
    });
  };

  const handleClear = () => {
    setContent("");
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("cwai-journal-entries", JSON.stringify(updatedEntries));

    toast({
      title: "Entry removed",
      description: "Your entry has been deleted.",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Writing Area */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <p className="font-serif text-xl text-primary italic">"{prompt}"</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewPrompt}
            className="rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write freely, without judgment..."
          className="min-h-[200px] resize-none border-none bg-transparent text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 text-lg"
        />

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClear}
            className="rounded-xl gap-2"
            disabled={!content}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl gap-2 bg-primary hover:bg-primary/90"
            disabled={!content.trim()}
          >
            <Save className="w-4 h-4" />
            Save Entry
          </Button>
        </div>
      </div>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-primary">Previous Entries</h3>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="bg-card/50 rounded-xl p-5 shadow-soft group"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-8 h-8"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground italic mb-2">
                  "{entry.prompt}"
                </p>
                <p className="text-foreground">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEditor;
