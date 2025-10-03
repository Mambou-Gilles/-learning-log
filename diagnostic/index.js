/**
 * Fetch commits from GitHub API and return an array of unique
 * commit messages that contain the word "fix" (case-insensitive).
 * @returns {Promise<string[]>}
 */
async function getFixCommits() {
    const url = "https://api.github.com/repos/nodejs/node/commits?per_page=100";
    const res = await fetch(url, {
        headers: { "User-Agent": "diagnostic-script" },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const data = await res.json();


    const messages = data
        .map(c => c.commit?.message || "")
        .filter(m => /fix/i.test(m));

    // De-dupe
    const unique = [...new Set(messages)];

    return unique;
}


/**
 * Run the diagnostic: fetch, filter, dedupe, print count and first 5 messages.
 */
async function main() {
  try {
    const commits = await getFixCommits();
    console.log(`Total commits containing "fix": ${commits.length}`);
    console.log("First 5 messages:");
    commits.slice(0, 5).forEach((msg, i) => {
      console.log(`${i + 1}. ${msg}`);
    });
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

// Only run if called directly (not during tests)
if (require.main === module) {
  main();
}

module.exports = { getFixCommits };