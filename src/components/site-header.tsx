import Link from "next/link";
import { alternateLocalePath, dictionary, localeLabels, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteHeader({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  const t = dictionary[locale];
  const navItems = [
    { href: "/medicare", label: t.nav.medicare },
    { href: "/marketplace", label: t.nav.marketplace },
    { href: "/articles", label: t.nav.articles },
    { href: "/contact", label: t.nav.contact },
  ];
  const alternateLocale = locale === "en" ? "zh" : "en";

  return (
    <header className="site-header">
      <Link
        className="brand"
        href={localePath(locale)}
        aria-label={`${site.name} home`}
      >
        <span className="brand-mark">II</span>
        <span>
          <strong>{site.name}</strong>
          <small>{locale === "zh" ? site.taglineZh : site.tagline}</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={localePath(locale, item.href)}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="language-link" href={alternateLocalePath(locale, path)}>
        {localeLabels[alternateLocale]}
      </Link>
      <a className="header-call" href={site.phoneHref}>
        {t.common.call} {site.phone}
      </a>
    </header>
  );
}
