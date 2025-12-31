const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Define apps and their destination subpaths
const apps = [
    { src: 'apps/main/dist', dest: '' }, // Root
    { src: 'apps/lending/dist', dest: 'lending' },
    { src: 'apps/membership/dist', dest: 'membership' }
];

// Ensure Clean Dist
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

apps.forEach(app => {
    const srcPath = path.join(rootDir, app.src);
    const destPath = path.join(distDir, app.dest);

    if (fs.existsSync(srcPath)) {
        console.log(`Copying ${app.src} to dist/${app.dest}...`);

        // If dest is root, copies content directly. If dest is folder, ensures folder exists.
        if (app.dest !== '') {
            fs.mkdirSync(destPath, { recursive: true });
        }

        fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
        console.warn(`Warning: Source ${app.src} not found. Did the build fail?`);
    }
});

console.log('Builds merged successfully into /dist!');
