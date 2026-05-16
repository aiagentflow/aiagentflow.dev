import { getAllPosts } from "@/lib/content";

export const siteUrl = "https://aiagentflow.dev";
export const siteName = "AI Agent Flow";
export const projectName = "AI Agent Flow";
export const projectDescription =
    "AI Agent Flow is an open-source, local-first multi-agent orchestration CLI for software engineering.";
export const githubUrl = "https://github.com/aiagentflow/aiagentflow";
export const npmUrl = "https://www.npmjs.com/package/@aiagentflow/cli";
export const logoUrl = `${siteUrl}/logo.svg`;

export function absoluteUrl(path = "") {
    if (path.startsWith("http")) return path;
    return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalPath(locale: string, path = "") {
    const cleanPath = path === "/" ? "" : path;
    return locale === "en" ? cleanPath || "/" : `/${locale}${cleanPath}`;
}

export function languageAlternates(path = "") {
    const cleanPath = path === "/" ? "" : path;

    return {
        en: absoluteUrl(cleanPath || "/"),
        es: absoluteUrl(`/es${cleanPath}`),
        bn: absoluteUrl(`/bn${cleanPath}`),
    };
}

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: projectName,
        url: siteUrl,
        logo: logoUrl,
        description: projectDescription,
        sameAs: [githubUrl, npmUrl],
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description: projectDescription,
    };
}

export function softwareApplicationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: projectName,
        url: siteUrl,
        sameAs: [githubUrl, npmUrl],
        operatingSystem: "Any with Node.js",
        applicationCategory: "DeveloperApplication",
        softwareHelp: `${siteUrl}/docs`,
        codeRepository: githubUrl,
        license: "https://opensource.org/licenses/MIT",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: projectDescription,
    };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function docsLlmsEntries() {
    return getAllPosts("docs").map((post) => ({
        title: post.metadata.title,
        url: absoluteUrl(`/docs/${post.metadata.slug}`),
        description: post.metadata.description,
    }));
}

export function blogLlmsEntries() {
    return getAllPosts("blog").slice(0, 8).map((post) => ({
        title: post.metadata.title,
        url: absoluteUrl(`/blog/${post.metadata.slug}`),
        description: post.metadata.description,
    }));
}

export function comparisonLlmsEntries() {
    return getAllPosts("pseo").map((post) => ({
        title: post.metadata.title,
        url: absoluteUrl(`/use-cases/${post.metadata.slug}`),
        description: post.metadata.description,
    }));
}
