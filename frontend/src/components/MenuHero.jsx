
import { ArrowUpRight, ChefHat } from "lucide-react";

export default function MenuHero() {
  return (
    <section className="bg-[#251a14] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-10 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/25 px-4 py-2 text-sm text-orange-300">
            <ChefHat size={17} />
            Made fresh. Served with love.
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
            A little taste
            <br />
            of <span className="text-orange-500">happiness.</span>
          </h1>

          <p className="mt-6 max-w-lg leading-7 text-stone-300">
            Discover handcrafted favorites, rich coffee and
            delicious meals made fresh just for you.
          </p>

          <a
            href="#food-menu"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold hover:bg-orange-600"
          >
            Explore Menu <ArrowUpRight size={18} />
          </a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
          alt="Freshly brewed coffee"
          className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96"
        />
      </div>
    </section>
  );
}
