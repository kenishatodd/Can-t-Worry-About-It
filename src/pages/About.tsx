import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { CheckCircle, Heart, Lightbulb, Users, Sparkles, ArrowRight } from "lucide-react";

const HEADSHOT_URL = "https://www.cantworryaboutit.com/__l5e/assets-v1/1d9caf27-26ac-45cf-850f-0ea73c8d3e45/dr-kenisha-todd-headshot.png";

const beliefs = [
  { icon: Heart, text: "Leadership should be sustainable, not sacrificial." },
  { icon: CheckCircle, text: "Wellness is a leadership responsibility." },
  { icon: Users, text: "Capacity matters as much as competence." },
  { icon: Sparkles, text: "Accountability comes before release." },
  { icon: Lightbulb, text: "Developing people means trusting them with responsibility." },
  { icon: Heart, text: "Creativity is a powerful tool for clarity and connection." },
  { icon: CheckCircle, text: "You can care deeply without carrying everything." },
];

const About = () => {
  return (
    <>
      <Seo
        title="About Dr. Kenisha Todd | CWAI | Can't Worry About It"
        description="Dr. Kenisha Todd is a leadership consultant, educator, counselor, and creative strategist helping leaders build clarity, capacity, and purpose without burnout."
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@id": "https://www.cantworryaboutit.com/#kenisha-todd",
          },
          "url": "https://www.cantworryaboutit.com/about",
        }}
      />

      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-24 md:pb-16 px-4">
          <div className="container max-w-3xl mx-auto">
            {/* Hero */}
            <section className="text-center mb-16 animate-fade-in">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-accent shadow-soft">
                <img
                  src={HEADSHOT_URL}
                  alt="Dr. Kenisha Todd headshot"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                About{" "}
                <span className="font-script text-4xl sm:text-5xl md:text-6xl text-accent whitespace-nowrap">
                  Dr. Kenisha Elaine Todd
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Leadership consultant, educator, counselor, serial entrepreneur, and creative strategist committed to helping people and organizations lead with clarity, capacity, and purpose.
              </p>
            </section>

            {/* Intro */}
            <section className="prose prose-lg max-w-none mb-16">
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                My work sits at the intersection of leadership development, wellness, counseling, and visual storytelling. I support educators, leaders, and organizations doing meaningful work who want to build strong people, healthy cultures, and sustainable systems without believing exhaustion is the price of impact.
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                I believe leadership capacity is a strategic discipline, not a soft skill. Learn more about my approach to{" "}
                <Link to="/leadership-wellness" className="text-primary hover:underline font-medium">
                  leadership capacity
                </Link>
                .
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                For much of my career, I was the leader who could handle everything and often tried to. I built part of my professional identity around being dependable, solving problems, and carrying the weight. What I eventually learned was that{" "}
                <span className="font-serif font-semibold text-primary">
                  being capable of carrying something doesn’t always mean it belongs to you.
                </span>
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
              That realization changed how I lead. It also became the foundation for{" "}
                <span className="font-script text-2xl md:text-3xl text-accent whitespace-nowrap">Can’t Worry About It...CWAI.</span>
              </p>
            </section>

            {/* Accountability highlight */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-soft mb-16 border-l-4 border-accent">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                CWAI Comes After Accountability
              </h2>
              <p className="text-foreground/90 text-lg leading-relaxed mb-4">
                CWAI is not “I don’t care.” It’s not avoidance, irresponsibility, or pretending difficult things don’t matter.
              </p>
              <p className="text-foreground/90 text-lg leading-relaxed mb-6">
                CWAI comes after accountability.
              </p>
              <ul className="space-y-2 text-foreground/90 text-lg mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1.5 shrink-0" />
                  <span>Handle what needs to be handled.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1.5 shrink-0" />
                  <span>Have the conversation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1.5 shrink-0" />
                  <span>Make the decision.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1.5 shrink-0" />
                  <span>Take the action.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1.5 shrink-0" />
                  <span>Own your part.</span>
                </li>
              </ul>
              <p className="text-foreground/90 text-lg leading-relaxed">
                Then release what you cannot control.
              </p>
            </section>

            {/* What is CWAI */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                What is CWAI?
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                CWAI is a leadership and capacity framework centered on intentional action, capacity awareness, accountability, and release. It helps high-capacity people recognize what deserves their energy, what belongs to someone else, and when they have done enough.
              </p>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
                Whether I’m facilitating professional learning, coaching leaders, designing wellness experiences, building businesses, or telling stories through photography, my approach remains the same:{" "}
                <span className="font-serif font-semibold text-primary">
                  people-centered, reflective, creative, and practical.
                </span>
              </p>
            </section>

            {/* Beliefs */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                What I Believe
              </h2>
              <div className="grid gap-4">
                {beliefs.map((belief, index) => {
                  const Icon = belief.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-card/60 rounded-xl p-4 border border-border"
                    >
                      <Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <p className="text-foreground/90 text-lg leading-relaxed">{belief.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Work With Me */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-soft mb-16 border border-border">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
                Work With Dr. Todd
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed text-center mb-8 max-w-2xl mx-auto">
                Ready to lead with clarity, capacity, and purpose? Let’s talk about what support looks like for you or your organization.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 bg-background/60 rounded-xl p-4">
                  <Users className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Leadership Consulting</h3>
                    <p className="text-muted-foreground text-sm">Strategy, culture, and sustainable leadership systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/60 rounded-xl p-4">
                  <Sparkles className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Speaking & Facilitation</h3>
                    <p className="text-muted-foreground text-sm">Keynotes, workshops, and professional learning experiences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/60 rounded-xl p-4">
                  <Heart className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Coaching & Capacity Work</h3>
                    <p className="text-muted-foreground text-sm">One-on-one support for leaders ready to protect their energy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/60 rounded-xl p-4">
                  <Lightbulb className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Creative Strategy</h3>
                    <p className="text-muted-foreground text-sm">Visual storytelling and brand-aligned creative direction.</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-3">Call or text to start the conversation</p>
                <a
                  href="tel:+14697859470"
                  className="inline-flex items-center gap-2 font-serif text-3xl md:text-4xl text-primary hover:text-primary/80 transition-colors"
                >
                  (469) 785-9470
                </a>
              </div>
            </section>

            {/* Closing CTA */}
            <section className="text-center bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 shadow-soft">
              <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-95">
                If you’re an educator, leader, entrepreneur, or organization ready to strengthen culture, protect capacity, develop people, and lead with greater intention, we’re likely aligned.
              </p>
              <p className="font-script text-3xl md:text-4xl text-accent mb-8">
                Do your part. Release the rest.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/capacity-checker"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
                >
                  Check your capacity <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/guide"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-full font-medium hover:bg-primary-foreground/90 transition-colors"
                >
                  Explore the CWAI Guide
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
