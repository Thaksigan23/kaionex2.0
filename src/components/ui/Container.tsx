import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  as?: "div" | "section" | "header" | "footer" | "main";
};

export function Container({
  children,
  className,
  wide = false,
  as: Comp = "div",
}: ContainerProps) {
  return (
    <Comp className={cn(wide ? "container-kx-wide" : "container-kx", className)}>
      {children}
    </Comp>
  );
}
