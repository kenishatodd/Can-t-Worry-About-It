import Navigation from "@/components/Navigation";
import GuideReader from "@/components/GuideReader";

const Guide = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <GuideReader isPaidUser={false} />
        </div>
      </main>
    </div>
  );
};

export default Guide;
