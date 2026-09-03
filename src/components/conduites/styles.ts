export type Variant = "primary" | "secondary" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover shadow-[inset_0_1px_0_rgb(255_255_255/.15)]",
  secondary: "bg-surface text-ink ring-1 ring-line hover:bg-raised",
  ghost: "text-ink-2 hover:bg-raised hover:text-ink",
  danger: "bg-surface text-bad ring-1 ring-line hover:bg-bad-soft",
};
export const sizes = { sm: "h-8 px-3 text-[13px] rounded-[10px] gap-1.5", md: "h-10 px-4 text-[14px] rounded-[14px] gap-2", lg: "h-12 px-5 text-[15px] rounded-[14px] gap-2" };

export function buttonCls(variant: Variant = "primary", size: keyof typeof sizes = "md", extra = "") {
  return `inline-flex items-center justify-center font-medium whitespace-nowrap select-none transition press disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${extra}`;
}

export type Size = keyof typeof sizes;
