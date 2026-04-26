const REPO = "aiagentflow/aiagentflow";
const GFI_LABEL = "good+first+issue";

function ghHeaders() {
    return {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    };
}

function ghFetch(url: string) {
    return fetch(url, { next: { revalidate: 3600 }, headers: ghHeaders() });
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

export async function getGitHubStats(): Promise<GitHubStats> {
    const [repoRes, contribRes, prRes, gfiRes] = await Promise.allSettled([
        ghFetch(`https://api.github.com/repos/${REPO}`),
        ghFetch(`https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=1`),
        ghFetch(`https://api.github.com/repos/${REPO}/pulls?state=closed&per_page=1`),
        ghFetch(`https://api.github.com/repos/${REPO}/issues?state=open&labels=${GFI_LABEL}&per_page=1`),
    ]);

    let stars = "38";
    let contributors = "0";
    let prs = "0";
    let goodFirstIssues = "0";
    let forks = "0";
    let openIssues = "0";

    if (repoRes.status === "fulfilled" && repoRes.value.ok) {
        const d = await repoRes.value.json();
        stars = fmt(d.stargazers_count ?? 0);
        forks = fmt(d.forks_count ?? 0);
        openIssues = fmt(d.open_issues_count ?? 0);
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

    return { stars, contributors, prs, goodFirstIssues, forks, openIssues };
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
