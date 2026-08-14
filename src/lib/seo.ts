import type { Metadata } from 'next';

/** Verified public deployment origin used by canonical and social metadata. */
export const SITE_URL = 'https://www.shadowspark-tech.org';

const ORGANIZATION_NAME = 'ShadowSpark Technologies';
const DEFAULT_SOCIAL_IMAGE = '/hero/hero-bg.png';

/** Corporate description shared by root metadata and structured data. */
export const ORGANIZATION_DESCRIPTION =
  'ShadowSpark Technologies is an independent product and technology company developing digital products, applied-AI systems, and experimental technology.';

/** Schema.org Organization object emitted by the root layout. */
export interface OrganizationStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressCountry: 'NG';
  };
  sameAs: readonly string[];
}

/**
 * Builds canonical, Open Graph, and X/Twitter metadata for a marketing page.
 *
 * @param pathname - Absolute pathname for the public page.
 * @param title - Page title without the organization suffix.
 * @param description - Truthful page summary for search and social previews.
 * @param image - Public image pathname used for social previews.
 * @returns Complete metadata rooted at the deployed public URL.
 */
export function marketingMetadata(
  pathname: string,
  title: string,
  description: string,
  image = DEFAULT_SOCIAL_IMAGE,
): Metadata {
  const pageUrl = new URL(pathname, SITE_URL);
  const socialTitle = pathname === '/' ? title : `${title} | ShadowSpark`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: pageUrl.href },
    openGraph: {
      title: socialTitle,
      description,
      type: 'website',
      url: pageUrl.href,
      siteName: 'ShadowSpark',
      locale: 'en_NG',
      images: [
        {
          url: image,
          width: 1672,
          height: 941,
          alt: `${title} — ShadowSpark`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Builds canonical metadata for routes that have not adopted full social data.
 *
 * @param pathname - Absolute pathname for the public page.
 * @returns Metadata base and canonical URL.
 */
export function canonical(pathname: string): {
  metadataBase: URL;
  alternates: { canonical: string };
} {
  const url = new URL(pathname, SITE_URL);
  return {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url.href },
  };
}

/** Returns the typed corporate entity used by metadata verification and JSON-LD. */
export function organizationStructuredData(): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: ORGANIZATION_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
    },
    sameAs: [],
  };
}

/** Returns truthful Organization structured data for the root layout. */
export function organizationJsonLd(): string {
  return JSON.stringify(organizationStructuredData());
}

/**
 * Returns FAQPage structured data for supplied question-and-answer content.
 *
 * @param items - Questions and answers already rendered on the page.
 * @returns Serialized Schema.org FAQPage data.
 */
export function faqJsonLd(
  items: { question: string; answer: string }[],
): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}
