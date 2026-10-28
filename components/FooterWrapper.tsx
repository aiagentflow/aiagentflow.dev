"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  if (pathname?.includes("/aiscribe")) return null;
  // The product page has its own footer; its docs page keeps the site's.
  if (pathname && /^(\/[a-z]{2})?\/llmmemory\/?$/.test(pathname)) return null;
  return <Footer />;
}
