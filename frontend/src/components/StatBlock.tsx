export default function StatBlock({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex flex-col gap-1 pr-8 border-r border-hairline last:border-r-0">
        <span className="font-mono text-3xl">{value}</span>
        <span className="text-sm text-muted">{label}</span>
      </div>
    );
  }