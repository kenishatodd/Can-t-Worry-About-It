import Navigation from "@/components/Navigation";
import JournalEditor from "@/components/JournalEditor";

const Journal = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">Gentle Journaling</h1>
            <p className="text-muted-foreground">Write without judgment. Your words are safe here.</p>
          </div>
          <JournalEditor />
        </div>
      </main>
    </div>
  );
};

export default Journal;
