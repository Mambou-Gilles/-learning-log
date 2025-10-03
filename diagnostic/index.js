/**
 * Fetch commits from GitHub API and return an array of unique
 * commit messages that contain the word "fix" (case-insensitive).
 * @returns {Promise<string[]>}
 */
async function getFixCommits() {
  const url = "https://api.github.com/repos/nodejs/node/commits?per_page=100";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "diagnostic-script" },
    });

    if (!res.ok) {
      // User-friendly exit instead of throwing raw
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      process.exit(1);
    }

    const data = await res.json();

    // NOTE: We deduplicate on commit *message* text, not SHA.
    // GitHub sometimes returns identical messages with different SHAs.
    const messages = data
      .map(c => c.commit?.message || "")
      .filter(m => /fix/i.test(m));

    const unique = [...new Set(messages)];
    return unique;
  } catch (err) {
    console.error("Network or fetch error:", err.message);
    process.exit(1);
  }
}

async function main() {
  const commits = await getFixCommits();

  console.log(`Total commits containing "fix": ${commits.length}`);
  console.log("First 5 messages:");
  commits.slice(0, 5).forEach((msg, i) => {
    console.log(`${i + 1}. ${msg}`);
  });

  // NOTE: Fine to load 100 commits into memory here.
  // For very large ranges (e.g. >5000), we’d use pagination cursors
  // or stream NDJSON instead of loading everything at once.

  // if (process.argv.includes("--verbose")) {
  //   console.log(`Total commits containing "fix": ${commits.length}`);
  //   console.log("First 5 messages:");
  //   commits.slice(0, 5).forEach((msg, i) => {
  //     console.log(`${i + 1}. ${msg}`);
  //   });
  // }
}

// Only run if called directly
if (require.main === module) {
  main();
}

module.exports = { getFixCommits };