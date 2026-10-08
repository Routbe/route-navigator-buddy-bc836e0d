import { useState } from "react";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ShowcaseCard } from "@/lib/showcase.functions";
import { cn } from "@/lib/utils";

/** Bento layout: first card large, then a repeating wide/square rhythm. */
const SPAN = ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2", "", "sm:row-span-2", "", "sm:col-span-2"];

export function ExploreGallery({ cards }: { cards: ShowcaseCard[] }) {
  const [open, setOpen] = useState<ShowcaseCard | null>(null);

  if (!cards.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
        Er staan nog geen voorbeeldprofielen klaar. Kom snel terug.
      </div>
    );
  }

  const onPick = (card: ShowcaseCard, e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 639px)").matches) return; // mobile: follow the link
    e.preventDefault();
    setOpen(card);
  };

  return (
    <>
      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-4">
        {cards.map((c, i) => {
          const big = i === 0;
          return (
            <a
              key={c.handle}
              href={`/${c.handle}`}
              onClick={(e) => onPick(c, e)}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40",
                SPAN[i % SPAN.length],
              )}
            >
              <div className="flex items-center gap-3">
                {c.avatarUrl ? (
                  <img src={c.avatarUrl} alt="" loading="lazy" className={cn("rounded-full border border-border object-cover", big ? "h-16 w-16" : "h-11 w-11")} />
                ) : (
                  <span className={cn("flex items-center justify-center rounded-full bg-muted font-serif font-semibold text-foreground", big ? "h-16 w-16 text-2xl" : "h-11 w-11 text-lg")}>
                    {(c.displayName ?? c.handle).charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className={cn("flex items-center gap-1.5 truncate font-serif font-semibold text-foreground", big ? "text-2xl" : "text-base")}>
                    {c.displayName ?? c.handle}
                    {c.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Geverifieerd" />}
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground">rout.be/{c.handle}</p>
                </div>
              </div>
              {(c.tagline || c.bio) && (
                <p className={cn("text-muted-foreground", big ? "line-clamp-4 text-lg leading-relaxed" : "line-clamp-2 text-sm")}>
                  {c.tagline || c.bio}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Bekijk profiel <ExternalLink className="h-3 w-3" aria-hidden />
              </span>
            </a>
          );
        })}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="h-[85vh] max-w-md overflow-hidden p-0">
          <DialogTitle className="sr-only">{open ? `Profiel ${open.handle}` : "Profiel"}</DialogTitle>
          {open && (
            <div className="flex h-full flex-col">
              <iframe title={`rout.be/${open.handle}`} src={`/${open.handle}`} className="w-full flex-1 border-0" />
              <a href={`/${open.handle}`} className="flex min-h-12 items-center justify-center gap-2 border-t border-border text-sm font-medium text-foreground hover:bg-accent">
                Open volledig profiel <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
