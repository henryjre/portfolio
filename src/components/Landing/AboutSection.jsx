import { FaLightbulb, FaCode, FaCoffee } from 'react-icons/fa';

const quickFacts = [
  { icon: FaCode, label: 'Self Taught' },
  { icon: FaLightbulb, label: 'Problem Solver' },
  { icon: FaCoffee, label: 'Remote-First' },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-foreground text-center mb-12">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Avatar placeholder */}
          <div className="flex justify-center md:justify-start animate-fade-in">
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-linear-to-br from-card to-secondary border-2 border-border overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Replace the src below with your actual profile image path or URL */}
                  <img
                    src="/my-png.webp"
                    alt="Henry Pineda"
                    className="w-full h-full overflow-hidden rounded-2xl"
                    draggable={false}
                  />
                </div>
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/50 rounded-xl -z-10"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* About text */}
          <div
            className="md:col-span-2 space-y-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground leading-relaxed">
                Hi! I’m a developer who enjoys turning ideas into things that actually work. I love
                seeing the systems and tools I build come to life, whether it’s a web app, an
                automation, or a small piece of code that makes everyday work easier.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I’m especially drawn to automation because it saves time, reduces effort, and proves
                that well-built code can run smoothly on its own. When I’m not coding, I spend time
                creating minimal graphic designs or learning new technologies that help me grow as a
                builder.
              </p>
            </div>

            {/* Quick facts badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  <fact.icon className="w-4 h-4 text-primary" />
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
