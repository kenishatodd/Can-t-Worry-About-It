import Navigation from "@/components/Navigation";
import GuideReader from "@/components/GuideReader";
import { useAuth } from "@/contexts/AuthContext";

const Guide = () => {
  const { isSubscribed } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <GuideReader isPaidUser={isSubscribed} />
        </div>
      </main>
    </div>
  );
};

export default Guide;
