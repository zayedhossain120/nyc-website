import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Tailwind height class; width follows the logo's aspect ratio. */
  className?: string;
  priority?: boolean;
}

/** NYC Digital Agency wordmark (transparent PNG, designed for dark backgrounds). */
export function Logo({ className = "h-8", priority = false }: LogoProps) {
  return (
    <Image
      src="/logo/logo-wordmark.png"
      alt="NYC Digital Agency"
      width={1200}
      height={205}
      priority={priority}
      className={cn("w-auto", className)}
    />
  );
}
