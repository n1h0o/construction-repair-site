import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const projectDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const imageDirectory = join(projectDirectory, 'public/images');
const required = ['residence-editorial.webp', 'bathroom-editorial.webp', 'house-editorial.webp'];
const available = await readdir(imageDirectory);
for (const image of required) {
  if (!available.includes(image)) throw new Error(`Required optimized image is missing: public/images/${image}`);
  await access(join(imageDirectory, image));
}
console.log(`Verified ${required.length} optimized project images.`);
