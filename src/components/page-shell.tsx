import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PageShell({
  children,
  locale = "en",
  path = "/",
}: {
  children: ReactNode;
  locale?: Locale;
  path?: string;
}) {
  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
