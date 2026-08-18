import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Heart, Wind, CheckCircle, ArrowRight, Sparkles, Users } from "lucide-react";

const practices = [
  {
    icon: Wind,
    title: "Regulate in real time",
    description:
      "Leadership capacity starts with nervous-system awareness. Short grounding practices between meetings help you reset before reacting.",
  },
  {
    icon: CheckCircle,
    title: "Name your capacity level",
    description:
      "You cannot lead well from depletion. Naming whether you are full, dipping, low, or depleted lets you choose the right response.",
  },
  {
    icon: Users,
    title: "Distribute the load",
    description:
      "Sustainable leaders know what belongs to them and what belongs to someone else. Capacity includes trusting your team with responsibility.",
  },
  {
    icon: Heart,
    title: "Protect recovery without guilt",
    description:
      "Rest is not a reward for finishing everything. It is a requirement for decision-making, creativity, and steady presence.",
  },
];

const signs = [
  "Decision fatigue on routine choices",
  "Irritability that feels out of proportion",
  "Difficulty sleeping or truly resting",
  "A sense of being 'on' even during downtime",
  "Losing enthusiasm for work you once cared about",
];

const LeadershipWellness = () => {
  return (
    <>
      <Seo
        title="Leadership Capacity: A Framework for Sustainable Leadership | CWAI"
        description="Leadership capacity helps high-achieving leaders lead with clarity, capacity, and purpose without burning out. Explore the CWAI approach by Dr. Kenisha Todd."
        path="/leadership-capacity"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Leadership Capacity: A Framework for Sustainable Leadership",
          description:
            "Leadership capacity helps high-achieving leaders lead with clarity, capacity, and purpose without burning out.",
          author: {
            "@type": "Person",
            name: "Dr. Kenisha Todd",
            "@id": "https://www.cantworryaboutit.com/#kenisha-todd",
          },
          publisher: {
            "@type": "Organization",
            name: "Can't Worry About It",
            "@id": "https://www.cantworryaboutit.com/#organization",
          },
          url: "https://www.cantworryaboutit.com/leadership-capacity",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.cantworryaboutit.com/leadership-capacity",
          },
        }}
      />

      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-24 md:pb-16 px-4">
          <div className="container max-w-3xl mx-auto">
            {/* Hero */}
            <section className="text-center mb-16 animate-fade-in">
              <p className="text-sm font-medium tracking-wide text-accent uppercase mb-3">
                For High-Achieving Leaders
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                Leadership Capacity
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Sustainable leadership is not about doing more. It is about leading from a place of clarity, capacity, and intentional release.
              </p>
            </section>

            {/* What is leadership capacity */}
            <section className="prose prose-lg max-w-none mb-16">
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                Leadership capacity is the practice of protecting your emotional, mental, and physical capacity so you can lead with consistency and care. It is not a luxury or a soft skill. It is a strategic discipline.
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                High-achieving leaders are often praised for how much they carry. But being capable of carrying something does not always mean it belongs to you. Leadership capacity helps you distinguish between what requires your energy and what you can release.
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
                At CWAI, leadership capacity is built on one idea:{" "}
                <span className="font-serif font-semibold text-primary">
                  do your part, then release the rest.
                </span>
              </p>
            </section>

            {/* Why it matters */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-soft mb-16 border-l-4 border-accent">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                Why Leadership Capacity Matters Now
              </h2>
              <p className="text-foreground/90 text-lg leading-relaxed mb-6">
                Leaders are asked to navigate uncertainty, support their people, and deliver results, often while managing their own invisible load. Without attention to capacity, the same drive that makes a leader effective becomes the reason they burn out.
              </p>
              <p className="text-foreground/90 text-lg leading-relaxed">
                When leadership capacity is present, decisions are clearer, relationships are healthier, and teams feel safer. When it is missing, reactivity replaces strategy, and exhaustion replaces vision.
              </p>
            </section>

            {/* Signs */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                Signs Your Leadership Capacity Needs Attention
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                Capacity does not usually collapse overnight. It erodes through small compromises. Here are common signals that your capacity is being depleted:
              </p>
              <ul className="space-y-3 mb-8">
                {signs.map((sign, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/90 text-lg">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
                If these feel familiar, the issue is not your commitment. It is that your leadership system has not yet made capacity non-negotiable.
              </p>
            </section>

            {/* Practices */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                The CWAI Approach to Leadership Capacity
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-8">
                CWAI (Can't Worry About It) is a leadership and capacity framework. It helps leaders take accountability, recognize their limits, and release what is not theirs to carry.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {practices.map((practice, index) => {
                  const Icon = practice.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card/60 rounded-xl p-6 border border-border hover:shadow-soft transition-shadow"
                    >
                      <Icon className="w-6 h-6 text-accent mb-4" />
                      <h3 className="font-serif text-xl text-foreground mb-2">
                        {practice.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Accountability */}
            <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 shadow-soft mb-16">
              <h2 className="font-serif text-2xl md:text-3xl mb-4">
                CWAI Comes After Accountability
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-95">
                Leadership capacity is not avoidance. It is not pretending challenges do not exist. CWAI means handling what is yours to handle: the conversation, the decision, the action | and then releasing what you cannot control.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-95">
                That release is where capacity lives.
              </p>
            </section>

            {/* CTAs */}
            <section className="grid sm:grid-cols-2 gap-4 mb-16">
              <Link
                to="/capacity-checker"
                className="group bg-card rounded-2xl p-8 shadow-soft border border-border hover-lift"
              >
                <Sparkles className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl text-foreground mb-2">
                  Check Your Capacity
                </h3>
                <p className="text-foreground/80 mb-4">
                  A short, gentle assessment to help you understand your current emotional capacity.
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">
                  Start now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group bg-card rounded-2xl p-8 shadow-soft border border-border hover-lift"
              >
                <Users className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl text-foreground mb-2">
                  Work With Dr. Todd
                </h3>
                <p className="text-foreground/80 mb-4">
                  Leadership consulting, coaching, and facilitation for organizations ready to lead well.
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-medium">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </section>

            {/* Closing */}
            <section className="text-center">
              <p className="font-script text-3xl md:text-4xl text-accent mb-4">
                Lead well. Rest well. Release the rest.
              </p>
              <p className="text-muted-foreground text-lg">
                Dr. Kenisha Todd | Can't Worry About It
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default LeadershipWellness;
