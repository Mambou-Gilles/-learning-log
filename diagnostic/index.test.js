const { getFixCommits } = require("./index");

async function runTests() {
  // Mock global.fetch
  global.fetch = async () => ({
    ok: true,
    json: async () => ([
      { commit: { message: "fix: corrected typo" } },
      { commit: { message: "Fix memory leak" } },
      { commit: { message: "docs: update readme" } },
      { commit: { message: "fix: corrected typo" } }, // duplicate
      { commit: { message: "chore: bump version" } },
    ]),
  });

  const msgs = await getFixCommits();

  if (msgs.length !== 2) {
    throw new Error(`Expected 2 unique fix commits, got ${msgs.length}`);
  }
  if (!msgs.some(m => m.toLowerCase().includes("fix"))) {
    throw new Error("Expected messages to contain 'fix'");
  }

  console.log("✅ All tests passed!");
}

if (require.main === module) {
  runTests().catch(err => {
    console.error("❌ Test failed:", err);
    process.exit(1);
  });
}