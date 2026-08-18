import Navigation from "@/components/Navigation";
import GuideReader from "@/components/GuideReader";
import { useAuth } from "@/contexts/AuthContext";
import Seo from "@/components/Seo";

const Guide = () => {
  const { isSubscribed } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Seo
        title="The CWAI Guide — Wisdom for Every Capacity Level"
        description="Read The CWAI Guide by Dr. Kenisha Todd: practical chapters on capacity, boundaries, and letting go of what you can't control."
        path="/guide"
      />
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
