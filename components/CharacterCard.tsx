"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { Character, FanArt } from "@/data/characters";
import { FanArtGallery } from "./FanArtGallery";
import { GuideAccordion } from "./GuideAccordion";
import { SparklesIcon, ChevronDownIcon } from "./icons";

type CharacterCardProps = {
  character: Character;
  fanArt: FanArt[];
  onFanArtSubmit: (characterId: string, submission: Omit<FanArt, "id">) => void;
};

const spring = { type: "spring", stiffness: 200, damping: 24 };

export function CharacterCard({
  character,
  fanArt,
  onFanArtSubmit
}: CharacterCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      transition={spring}
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl",
        "ring-1 ring-transparent transition duration-500 hover:border-neon/40 hover:shadow-glow hover:ring-neon/20"
      )}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-20">
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(circle at top, rgba(50,213,255,0.45), transparent 55%), radial-gradient(circle at 30% 80%, rgba(124,58,237,0.35), transparent 70%)`
          }}
        />
      </div>

      <motion.div layout className="relative z-10 grid gap-6 p-6 sm:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-800 shadow-lg sm:h-16 sm:w-16">
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover"
                sizes="64px"
                priority={false}
              />
            </div>
            <div>
              <motion.h2
                layout
                className="text-xl font-bold text-slate-100 sm:text-2xl"
              >
                {character.name}
              </motion.h2>
              <p className="text-sm text-slate-400">{character.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300 sm:justify-end">
            <span className="rounded-full border border-aurora/50 bg-aurora/10 px-3 py-1 text-aurora">
              {character.role}
            </span>
            <span className="rounded-full border border-neon/50 bg-neon/10 px-3 py-1 text-neon">
              {character.difficulty}
            </span>
            <span className="rounded-full border border-ember/60 bg-ember/10 px-3 py-1 text-ember">
              {character.faction}
            </span>
          </div>
        </header>

        <motion.p
          layout
          className="text-sm leading-relaxed text-slate-300 sm:text-base"
        >
          {character.background}
        </motion.p>

        <div className="grid gap-3 sm:grid-cols-2">
          {character.abilities.map((ability) => (
            <motion.div
              layout
              key={ability.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 transition hover:border-neon/40"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neon/80">
                <SparklesIcon className="h-4 w-4 text-neon/70" />
                {ability.type}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-100">
                {ability.name}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {ability.description}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="expanded-section"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="grid gap-6"
            >
              <section aria-labelledby={`${character.id}-strengths`}>
                <h3
                  id={`${character.id}-strengths`}
                  className="text-lg font-semibold text-emerald-300"
                >
                  Strength Highlights
                </h3>
                <ul className="mt-2 grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
                  {character.strengths.map((strength) => (
                    <li
                      key={strength}
                      className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3"
                    >
                      {strength}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby={`${character.id}-guides`}>
                <h3
                  id={`${character.id}-guides`}
                  className="text-lg font-semibold text-aurora"
                >
                  Strategy Guides
                </h3>
                <GuideAccordion
                  characterId={character.id}
                  guides={character.guides}
                />
              </section>

                <FanArtGallery
                characterId={character.id}
                characterName={character.name}
                fanArt={fanArt}
                onSubmit={(submission) =>
                  onFanArtSubmit(character.id, submission)
                }
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          layout="position"
          className="flex items-center justify-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-neon/40 hover:text-neon"
        >
          <span>{expanded ? "Hide Extended Details" : "Explore Full Profile"}</span>
          <ChevronDownIcon
            className={clsx(
              "h-4 w-4 transition-transform",
              expanded ? "rotate-180" : "rotate-0"
            )}
          />
        </motion.button>
      </motion.div>
    </motion.article>
  );
}
