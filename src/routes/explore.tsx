import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ExploreGallery } from "@/components/explore/ExploreGallery";
import { listShowcaseCards } from "@/lib/showcase.functions";

const TITLE = "Ontdek echte ROUT-profielen";
const DESCRIPTION = "Een galerij van echte leden: schone link-in-bio pagina's zonder trackers, op Europese infrastructuur.";

export const Route = createFileRoute("/explore")({
  loader: () => listShowcaseCards(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const cards = Route.useLoaderData();
  return (
    <AppLayout crumbs={[{ label: "Ontdek" }]}>
      <div className="mx-auto max-w-6xl px-4 py-12 pb-28 sm:px-6 sm:py-20">
        <span className="eyebrow">Ontdek</span>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Echte profielen, echte mensen.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{DESCRIPTION}</p>
        <div className="mt-12">
          <ExploreGallery cards={cards} />
        </div>
        <div className="mt-14 text-center">
          <Link to="/tour" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-foreground px-8 font-semibold text-background transition-opacity hover:opacity-90">
            Maak je eigen profiel <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
