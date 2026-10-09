type Card = { title: string; company: string; place: string };

const COLUMNS: { label: string; tone: string; cards: Card[] }[] = [
  {
    label: "Applied",
    tone: "bg-mint text-midnight",
    cards: [
      { title: "Backend Engineer", company: "Northwind", place: "Dublin" },
      { title: "Data Analyst", company: "Globex", place: "Berlin" },
    ],
  },
  {
    label: "Interviewing",
    tone: "bg-amber/15 text-amber",
    cards: [{ title: "ML Engineer", company: "Acme", place: "Amsterdam" }],
  },
  {
    label: "Offer",
    tone: "bg-teal text-white",
    cards: [{ title: "Product Manager", company: "Initech", place: "Paris" }],
  },
];

export default function HeroPreview() {
  return (
    <div className="relative">
      <div className="border border-hairline rounded-lg bg-white/60 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
          <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
          <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
          <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
          <span className="font-mono text-xs text-muted ml-3">your pipeline</span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          {COLUMNS.map((col) => (
            <div key={col.label} className="flex flex-col gap-2">
              <span className={`text-xs font-medium rounded px-2 py-1 w-fit ${col.tone}`}>
                {col.label}
              </span>
              {col.cards.map((c) => (
                <div key={c.title} className="border border-hairline rounded bg-paper p-3">
                  <p className="text-sm font-medium leading-snug">{c.title}</p>
                  <p className="text-xs text-muted mt-1">{c.company}</p>
                  <p className="font-mono text-[11px] text-muted mt-2">{c.place}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block absolute -bottom-5 -left-6 border border-hairline rounded-lg bg-paper px-4 py-3 shadow-sm">
        <p className="font-mono text-xs text-muted">new this week</p>
        <p className="font-mono text-2xl text-teal leading-tight">+128</p>
        <p className="text-xs text-muted">postings in your markets</p>
      </div>

      <p className="text-[11px] text-muted mt-3 text-right">Illustrative preview</p>
    </div>
  );
}