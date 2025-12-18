const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const src = path.join(repoRoot, "client", "build");
const dest = path.join(repoRoot, "build");

if (!fs.existsSync(src)) {
  console.error(`❌ Expected build output not found at: ${src}`);
  console.error("Run the client build first: `npm run build --prefix client`");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });

console.log(`✅ Synced client build: ${src} -> ${dest}`);


