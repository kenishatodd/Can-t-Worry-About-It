import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import PremiumUpgrade from "@/components/PremiumUpgrade";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Wind, BookOpen, PenLine, Sparkles } from "lucide-react";

const Index = () => {
  const { user, isSubscribed } = useAuth();

  const features = [
    { icon: Heart, title: "Capacity Checker", description: "Gently assess your emotional capacity", path: "/capacity-checker" },
    { icon: Wind, title: "Pause Tools", description: "Breathing exercises & calming sounds", path: "/pause-tools" },
    { icon: PenLine, title: "Gentle Journaling", description: "Write without pressure", path: "/journal" },
    { icon: BookOpen, title: "CWAI Guide", description: "Wisdom for every capacity level", path: "/guide" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Hero */}
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4">CWAI</h1>
            <p className="font-serif text-2xl md:text-3xl text-muted-foreground mb-2">Can't Worry About It</p>
            <p className="text-muted-foreground mb-8">by Dr. Kenisha Elaine</p>
            <p className="text-lg text-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              A gentle space for high-achieving women to check their capacity, regulate stress, and receive guidance without pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                <Link to="/capacity-checker">Check Your Capacity</Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="rounded-xl h-14 px-8 text-lg">
                  <Link to="/auth">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started
                  </Link>
                </Button>
              )}
            </div>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-2 gap-4 stagger-children">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path} className="bg-card rounded-2xl p-6 shadow-soft hover-lift group">
                <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl text-primary mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </section>

          {/* Premium Section */}
          {user && !isSubscribed && (
            <section className="mt-16 max-w-md mx-auto">
              <PremiumUpgrade />
            </section>
          )}

          {/* Quote */}
          <section className="mt-16 text-center">
            <blockquote className="font-serif text-2xl text-primary italic max-w-2xl mx-auto">
              "You cannot pour from an empty cup. Let's check how full yours is."
            </blockquote>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
