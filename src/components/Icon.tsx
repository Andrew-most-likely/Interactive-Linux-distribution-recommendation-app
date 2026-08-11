import type { IconDef } from "../data/icons";

export function Icon({ icon, size = 18 }: { icon: IconDef; size?: number }) {
  if (icon.kind === "brand") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={icon.color} aria-hidden="true">
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    );
  }

  if (icon.kind === "photo") {
    return (
      <img
        src={icon.src}
        alt={icon.alt}
        width={size}
        height={size}
        className="icon-photo"
        style={{ objectFit: icon.fit ?? "cover" }}
      />
    );
  }

  const { Component, color } = icon;
  return <Component size={size} color={color} strokeWidth={2} aria-hidden="true" />;
}
