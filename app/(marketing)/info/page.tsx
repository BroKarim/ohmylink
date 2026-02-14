import Link from "next/link";

export default function InfoPage() {
  return (
    <main className="flex flex-col bg-zinc-950 min-h-screen items-center justify-center px-8 py-32 lg:py-40">
      <div className="max-w-3xl w-full">
        {/* Main Title */}
        <div className="mb-24 text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-thin text-white tracking-tighter drop-shadow-2xl">
            <span className="italic">Dzenn</span>
          </h1>
          <p className="mt-4 text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">Not your ordinary linktree</p>
        </div>

        {/* The Philosophy Section */}
        <section className="mb-24">
          <h2 className="text-zinc-600 text-xs uppercase tracking-widest font-black mb-8">The Philosophy</h2>
          <p className="text-zinc-300 leading-relaxed text-lg md:text-xl font-light">
            Dzenn was born from a simple realization: digital identity has become stale. Inspired by the nonchalant aesthetic of modern web design, we built a platform for creators who demand more than just a list of buttons. We believe
            your "link-in-bio" should be a reflection of your vibe—premium, interactive, and undeniably you.
          </p>
        </section>

        {/* Design Excellence Section */}
        <section className="mb-24">
          <h2 className="text-zinc-600 text-xs uppercase tracking-widest font-black mb-8">Visual Excellence</h2>
          <p className="text-zinc-300 leading-relaxed text-lg md:text-xl font-light">
            We prioritize quality over quantity. From our signature <span className="text-white font-medium">Glassy Textures</span> to dynamic background patterns like Waves and Noise, every element of Dzenn is engineered to hit different.
            We provide the tools—you provide the vibes.
          </p>
        </section>

        {/* Creator Section */}
        <section className="relative p-12 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-3xl">
          <h2 className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-6">The Creator</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="text-3xl font-serif text-white mb-4 italic">BroKarim</h3>
              <p className="text-zinc-400 leading-relaxed text-lg font-light">
                A vision-driven developer and designer obsessed with premium aesthetics and clean DX. BroKarim created Dzenn as a "nonchalant" alternative for the digital nomad and creative elite. With a focus on micro-animations and
                architectural excellence, he ensures that while the vibes are relaxed, the technology remains cutting-edge.
              </p>
              <div className="mt-8 flex gap-6">
                <Link href="https://github.com/BroKarim" className="text-white hover:text-white/70 text-sm font-medium transition-colors underline underline-offset-4">
                  GitHub
                </Link>
                <Link href="#" className="text-white hover:text-white/70 text-sm font-medium transition-colors underline underline-offset-4">
                  X / Twitter
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Link */}
        <div className="mt-32 text-center">
          <Link href="/" className="text-zinc-500 hover:text-white text-sm transition-all duration-300 group inline-flex items-center gap-2">
            ← Back to safe space
          </Link>
        </div>
      </div>
    </main>
  );
}
