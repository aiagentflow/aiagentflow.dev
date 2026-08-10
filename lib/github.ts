import { unstable_cache } from "next/cache";

const REPO = "aiagentflow/aiagentflow";
const GFI_LABEL = "good+first+issue";
const GITHUB_STATS_REVALIDATE_SECONDS = 300;

function getGitHubToken() {
    return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
}

function ghHeaders() {
    const token = getGitHubToken();

    return {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

function shortUrl(url: string) {
    try {
        const { pathname, search } = new URL(url);
        return `${pathname}${search}`;
    } catch {
        return url;
    }
}

async function ghFetch(url: string) {
    try {
        const res = await fetch(url, { cache: "no-store", headers: ghHeaders() });

        if (!res.ok) {
            console.error("[github] request failed", {
                url: shortUrl(url),
                status: res.status,
                statusText: res.statusText,
                hasToken: Boolean(getGitHubToken()),
                rateLimitRemaining: res.headers.get("x-ratelimit-remaining"),
            });
        }

        return res;
    } catch (error) {
        console.error("[github] request threw", {
            url: shortUrl(url),
            hasToken: Boolean(getGitHubToken()),
            error: error instanceof Error ? error.message : String(error),
        });
        throw error;
    }
}

function lastPage(res: Response): number | null {
    const link = res.headers.get("link") ?? "";
    const m = link.match(/page=(\d+)>; rel="last"/);
    return m ? parseInt(m[1]) : null;
}

function fmt(n: number): string {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export interface GitHubStats {
    stars: string;
    contributors: string;
    prs: string;
    goodFirstIssues: string;
    forks: string;
    openIssues: string;
}

const DEFAULT_GITHUB_STATS: GitHubStats = {
    stars: "38",
    contributors: "0",
    prs: "0",
    goodFirstIssues: "0",
    forks: "0",
    openIssues: "0",
};

async function fetchGitHubStats(): Promise<GitHubStats> {
    const [repoRes, contribRes, prRes, gfiRes] = await Promise.allSettled([
        ghFetch(`https://api.github.com/repos/${REPO}`),
        ghFetch(`https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=1`),
        ghFetch(`https://api.github.com/repos/${REPO}/pulls?state=closed&per_page=1`),
        ghFetch(`https://api.github.com/repos/${REPO}/issues?state=open&labels=${GFI_LABEL}&per_page=1`),
    ]);

    let { stars, contributors, prs, goodFirstIssues, forks, openIssues } = DEFAULT_GITHUB_STATS;
    let repoLoaded = false;

    if (repoRes.status === "fulfilled" && repoRes.value.ok) {
        const d = await repoRes.value.json();
        stars = fmt(d.stargazers_count ?? 0);
        forks = fmt(d.forks_count ?? 0);
        openIssues = fmt(d.open_issues_count ?? 0);
        repoLoaded = true;
    }

    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
        const n = lastPage(contribRes.value);
        if (n) contributors = String(n);
    }

    if (prRes.status === "fulfilled" && prRes.value.ok) {
        const n = lastPage(prRes.value);
        if (n) {
            const count = n;
            prs = count >= 100 ? `${Math.floor(count / 10) * 10}+` : String(count);
        }
    }

    if (gfiRes.status === "fulfilled" && gfiRes.value.ok) {
        const n = lastPage(gfiRes.value);
        if (n) {
            goodFirstIssues = String(n);
        } else {
            // fewer than 30 — count from response body
            const items = await gfiRes.value.json();
            goodFirstIssues = String(Array.isArray(items) ? items.length : 0);
        }
    }

    if (!repoLoaded) {
        throw new Error("GitHub repo metadata request failed");
    }

    return { stars, contributors, prs, goodFirstIssues, forks, openIssues };
}

const getCachedGitHubStats = unstable_cache(fetchGitHubStats, ["github-stats"], {
    revalidate: GITHUB_STATS_REVALIDATE_SECONDS,
});

export async function getGitHubStats(): Promise<GitHubStats> {
    try {
        return await getCachedGitHubStats();
    } catch (error) {
        console.error("[github] using fallback stats", {
            hasToken: Boolean(getGitHubToken()),
            error: error instanceof Error ? error.message : String(error),
        });
        // Return null-like state that the client can detect and fetch live
        return { ...DEFAULT_GITHUB_STATS, stars: "0" };
    }
}

export async function getNpmVersion(pkg: string): Promise<string> {
    try {
        const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return "v1.0.2";
        const d = await res.json();
        return `v${d.version ?? "1.0.2"}`;
    } catch {
        return "v1.0.2";
    }
}
