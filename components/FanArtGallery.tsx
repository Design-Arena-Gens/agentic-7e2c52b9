"use client";

import { useState } from "react";
import Image from "next/image";
import type { FanArt } from "@/data/characters";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type FanArtGalleryProps = {
  characterId: string;
  characterName: string;
  fanArt: FanArt[];
  onSubmit: (submission: Omit<FanArt, "id">) => void;
};

export function FanArtGallery({
  characterId,
  characterName,
  fanArt,
  onSubmit
}: FanArtGalleryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artist, setArtist] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!artist.trim() || !imageUrl.trim()) {
      return;
    }
    onSubmit({
      artist: artist.trim(),
      imageUrl: imageUrl.trim(),
      caption: caption.trim() || `${characterName} fan art submission`
    });
    setArtist("");
    setImageUrl("");
    setCaption("");
    setIsSubmitting(false);
  };

  return (
    <section aria-labelledby={`${characterId}-fan-art`}>
      <div className="flex items-center justify-between gap-4">
        <h3
          id={`${characterId}-fan-art`}
          className="text-lg font-semibold text-neon"
        >
          Fan Art Showcase
        </h3>
        <button
          type="button"
          onClick={() => setIsSubmitting((prev) => !prev)}
          className="rounded-full border border-neon px-4 py-1 text-sm font-medium text-neon transition hover:bg-neon hover:text-night"
        >
          {isSubmitting ? "Cancel" : "Submit Fan Art"}
        </button>
      </div>

      <AnimatePresence>
        {isSubmitting && (
          <motion.form
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            onSubmit={handleSubmit}
            className="mt-4 grid gap-4 rounded-2xl border border-slate-800 bg-night/70 p-4"
          >
            <p className="text-sm text-slate-300">
              Share your best {characterName} artwork. Hosted image URLs work
              great (Imgur, DeviantArt, etc.).
            </p>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-200">Artist / Alias</span>
              <input
                type="text"
                required
                value={artist}
                onChange={(event) => setArtist(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-neon focus:ring-2 focus:ring-neon/30"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-200">Image URL</span>
              <input
                type="url"
                required
                placeholder="https://"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-neon focus:ring-2 focus:ring-neon/30"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-200">Caption (optional)</span>
              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                rows={2}
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-neon focus:ring-2 focus:ring-neon/30"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-neon px-4 py-2 text-sm font-semibold text-night transition hover:bg-emerald-300"
            >
              Share Artwork
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div
        className={clsx(
          "mt-4 grid gap-3",
          fanArt.length < 2
            ? "sm:grid-cols-1"
            : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {fanArt.map((art) => (
          <motion.figure
            key={art.id}
            layout
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg transition hover:shadow-glow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={art.imageUrl}
                alt={art.caption}
                fill
                className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
                sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
              />
            </div>
            <figcaption className="space-y-1 p-3">
              <p className="text-sm font-semibold text-slate-100">
                {art.artist}
              </p>
              <p className="text-xs text-slate-400">{art.caption}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
