"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { characters, type FanArt } from "@/data/characters";
import { CharacterCard } from "@/components/CharacterCard";

const roleOptions = ["All Roles", ...new Set(characters.map((char) => char.role))];
const difficultyOptions = [
  "All Difficulties",
  ...new Set(characters.map((char) => char.difficulty))
];

const introVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, type: "spring", stiffness: 120, damping: 18 }
  })
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(roleOptions[0]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>(
    difficultyOptions[0]
  );

  const [fanArtState, setFanArtState] = useState<Record<string, FanArt[]>>(() =>
    characters.reduce<Record<string, FanArt[]>>((collection, character) => {
      collection[character.id] = character.fanArt;
      return collection;
    }, {})
  );

  const filteredCharacters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return characters.filter((character) => {
      const matchesQuery =
        !query ||
        character.name.toLowerCase().includes(query) ||
        character.tagline.toLowerCase().includes(query) ||
        character.background.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All Roles" ? true : character.role === roleFilter;

      const matchesDifficulty =
        difficultyFilter === "All Difficulties"
          ? true
          : character.difficulty === difficultyFilter;

      return matchesQuery && matchesRole && matchesDifficulty;
    });
  }, [difficultyFilter, roleFilter, searchQuery]);

  const handleFanArtSubmit = (
    characterId: string,
    submission: Omit<FanArt, "id">
  ) => {
    setFanArtState((prev) => ({
      ...prev,
      [characterId]: [
        {
          id: `${characterId}-${Date.now()}`,
          ...submission
        },
        ...(prev[characterId] ?? [])
      ]
    }));
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-12 sm:px-8 lg:px-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(50,213,255,0.3),_transparent_55%)] blur-3xl" />
      </div>

      <section className="space-y-6 text-center sm:space-y-8">
        <motion.p
          custom={0.05}
          initial="hidden"
          animate="visible"
          variants={introVariants}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300"
        >
          Character Mastery Hub
        </motion.p>
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={introVariants}
          className="text-4xl font-extrabold leading-tight text-slate-100 sm:text-5xl"
        >
          Discover, master, and celebrate your favorite in-game legends.
        </motion.h1>
        <motion.p
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={introVariants}
          className="mx-auto max-w-3xl text-base text-slate-300 sm:text-lg"
        >
          Dive deep into detailed ability breakdowns, strategic guides,
          community fan art, and interactive story highlights. Search, filter,
          and animate your way to hero proficiency.
        </motion.p>
      </section>

      <motion.section
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="grid gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[0_15px_50px_rgba(15,23,42,0.35)] sm:grid-cols-[2fr,repeat(2,1fr)] sm:items-center sm:gap-6 sm:p-6"
      >
        <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm text-slate-300 focus-within:border-neon/40">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Character name, lore, or keyword"
            className="h-full w-full bg-transparent text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
        </label>

        <div className="flex gap-2">
          {roleOptions.map((roleOption) => (
            <button
              key={roleOption}
              type="button"
              onClick={() => setRoleFilter(roleOption)}
              className={clsx(
                "flex-1 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition",
                roleFilter === roleOption
                  ? "border-neon bg-neon/10 text-neon shadow-glow"
                  : "border-slate-800 bg-transparent text-slate-400 hover:border-neon/30 hover:text-neon"
              )}
            >
              {roleOption}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setDifficultyFilter(option)}
              className={clsx(
                "flex-1 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition",
                difficultyFilter === option
                  ? "border-aurora bg-aurora/10 text-aurora shadow-glow"
                  : "border-slate-800 bg-transparent text-slate-400 hover:border-aurora/30 hover:text-aurora"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.section>

      <AnimatePresence initial={false}>
        <motion.section
          key="cards"
          layout
          className="grid gap-8 sm:grid-cols-1"
        >
          {filteredCharacters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-10 text-center text-slate-300"
            >
              No characters match your search yet. Try adjusting filters or
              exploring a different role.
            </motion.div>
          ) : (
            filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <CharacterCard
                  character={character}
                  fanArt={fanArtState[character.id] ?? []}
                  onFanArtSubmit={handleFanArtSubmit}
                />
              </motion.div>
            ))
          )}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
