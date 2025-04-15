const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.ts"],
  format: "cjs",
  outfile: "dist/index.js", 
  bundle: true, 
  platform: "node",
  target: 'node18',
  external: [
    './dist',
    './build.js',
    './data.json',
    './users.json',
    "fs",
    "path",
    "url",
    "crypto",
    'safe-compare',
    'telegraf',
    'cron',
    'knex',
  ]
}).catch(() => process.exit(1));