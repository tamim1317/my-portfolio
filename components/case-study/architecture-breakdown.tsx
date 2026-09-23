import { Monitor, Server, Database, Lock, Globe, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectArchitecture } from "@/lib/projects";

interface IconType {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

interface ArchRowProps {
  icon: React.ComponentType<IconType>;
  label: string;
  value: string;
}

function ArchRow({ icon: Icon, label, value }: ArchRowProps) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-start gap-2 pt-0.5">
        <Icon size={13} className="text-muted-foreground mt-0.5 shrink-0" aria-hidden={true} />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{value}</p>
    </div>
  );
}

interface ArchitectureBreakdownProps {
  breakdown: ProjectArchitecture;
}

/**
 * ArchitectureBreakdown — tabular layer-by-layer breakdown.
 * Each row: icon + label on left, description on right.
 * Deliberately minimal — no oversized cards, just clean data rows.
 */
export function ArchitectureBreakdown({ breakdown }: ArchitectureBreakdownProps) {
  const allRows: Array<{ icon: ArchRowProps["icon"]; label: string; value: string } | null> = [
    breakdown.frontend         ? { icon: Monitor,     label: "Frontend",      value: breakdown.frontend } : null,
    breakdown.backend          ? { icon: Server,      label: "Backend",       value: breakdown.backend  } : null,
    breakdown.database         ? { icon: Database,    label: "Database",      value: breakdown.database } : null,
    breakdown.auth             ? { icon: Lock,        label: "Auth",          value: breakdown.auth     } : null,
    breakdown.security         ? { icon: ShieldCheck, label: "Security",      value: breakdown.security } : null,
    breakdown.deployment       ? { icon: Globe,       label: "Deployment",    value: breakdown.deployment } : null,
    (breakdown.externalServices && breakdown.externalServices.length > 0)
      ? { icon: Layers, label: "Services", value: breakdown.externalServices.join(" · ") }
      : null,
  ];

  const rows = allRows.filter(
    (r): r is { icon: ArchRowProps["icon"]; label: string; value: string } => r !== null
  );

  if (!rows.length) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-border divide-y divide-border overflow-hidden",
        "bg-card"
      )}
      role="list"
      aria-label="Architecture breakdown"
    >
      {rows.map((row) => (
        <div key={row.label} role="listitem">
          <ArchRow icon={row.icon} label={row.label} value={row.value} />
        </div>
      ))}
    </div>
  );
}
