import { spawnSync } from 'node:child_process';
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', 'dist-publico'], {
  stdio: 'inherit', env: { ...process.env, ACERVO_PUBLICO: '1' },
});
process.exit(result.status ?? 1);
