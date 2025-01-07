const fs = require('node:fs');
const path = require('node:path');

const { Router } = require('express');
const router = Router();

const files = fs.readdirSync(__dirname);

files.forEach((fileOrDir) => {
  const isDir = fs.statSync(path.join(__dirname, fileOrDir)).isDirectory();

  if (!isDir) {
    return;
  }

  const routesFile = path.join(__dirname, fileOrDir, 'routes.ts');

  if (fs.existsSync(routesFile)) {
    const route = require(path.join(routesFile));
    console.log({ fileOrDir });
    router.use(`/${fileOrDir}`, route.default);
  }
});

module.exports = router;
