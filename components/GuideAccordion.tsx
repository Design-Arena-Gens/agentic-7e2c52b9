"use client";

import { useState } from "react";
import type { GuideEntry } from "@/data/characters";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "./icons";

type GuideAccordionProps = {
  characterId: string;
  guides: GuideEntry[];
};

export function GuideAccordion({ characterId, guides }: GuideAccordionProps) {
  const [activeGuide, setActiveGuide] = useState(guides[0]?.title ?? "");

  return (
    <div className="space-y-3">
      {guides.map((guide) => {
        const isActive = guide.title === activeGuide;
        return (
          <div
            key={guide.title}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
          >
            <button
              type="button"
              onClick={() =>
                setActiveGuide((current) =>
                  current === guide.title ? "" : guide.title
                )
              }
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition hover:bg-slate-900/80"
              aria-expanded={isActive}
              aria-controls={`${characterId}-guide-${guide.title}`}
            >
              <span>{guide.title}</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  isActive ? "rotate-180 text-neon" : "text-slate-500"
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  key="guide-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  id={`${characterId}-guide-${guide.title}`}
                  className="px-4 pb-4 text-sm text-slate-300"
                >
                  <p className="mb-3 text-slate-200">{guide.summary}</p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {guide.steps.map((step, index) => (
                      <li key={step} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-aurora/20 font-semibold text-aurora">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
