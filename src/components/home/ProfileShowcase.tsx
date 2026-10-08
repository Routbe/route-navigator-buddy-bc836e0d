import { PhoneShowcase } from "@/components/home/PhoneShowcase";

/** Landing page: real member profiles (chosen in admin) shown live in a phone. */
export function ProfileShowcase() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 md:py-14">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Live voorbeelden</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Echte profielen, live</h2>
        <p className="mt-2 text-sm text-muted-foreground">Swipe tussen profielen van echte leden.</p>
      </div>
      <div className="mt-8">
        <PhoneShowcase />
      </div>
    </section>
  );
}
