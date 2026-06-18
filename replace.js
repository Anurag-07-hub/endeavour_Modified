import fs from 'fs';
import path from 'path';

const files = [
  'src/components/Hero.tsx',
  'src/components/About.tsx',
  'src/components/Events.tsx',
  'src/components/Gallery.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/TeamPage.tsx',
  'src/App.tsx'
];

for (const file of files) {
  const absolutePath = path.resolve(file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    content = content.replace(/bg-brand-bg/g, 'bg-black/30');
    fs.writeFileSync(absolutePath, content);
  }
}
console.log('done');
