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

  // Assert exact snapshot of what we expect
  const expected = ["fix: corrected typo", "Fix memory leak"];
  if (JSON.stringify(msgs) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(msgs)}`);
  }

  console.log("✅ All tests passed!");
}

if (require.main === module) {
  runTests().catch(err => {
    console.error("❌ Test failed:", err);
    process.exit(1);
  });
}