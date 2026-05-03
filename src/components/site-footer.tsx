import Link from "next/link";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { medicareDisclaimer, medicareDisclaimerZh, site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <strong>{site.name}</strong>
          <p>{locale === "zh" ? site.taglineZh : site.tagline}</p>
          <p>{site.location}</p>
        </div>
        <div>
          <strong>{t.common.coverage}</strong>
          <Link href={localePath(locale, "/medicare")}>
            {t.common.medicarePlans}
          </Link>
          <Link href={localePath(locale, "/marketplace")}>
            {t.common.marketplacePlans}
          </Link>
          <Link href={localePath(locale, "/life-insurance")}>
            {t.common.lifeInsurance}
          </Link>
        </div>
        <div>
          <strong>{t.common.contact}</strong>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.emailHref}>{site.email}</a>
          <Link href={localePath(locale, "/privacy")}>{t.common.privacy}</Link>
        </div>
      </div>
      <p className="disclaimer">
        {locale === "zh" ? medicareDisclaimerZh : medicareDisclaimer}
      </p>
      <p className="copyright">
        Copyright © {new Date().getFullYear()} {site.name}.{" "}
        {t.common.copyright}
      </p>
    </footer>
  );
}
