import { ApiClient } from '../lib/main.js';
import { getConfig, readImageFile } from './common.mjs';

const { authToken, apiUrl } = getConfig();

// Get api client.
const api = new ApiClient({ authToken, apiUrl });

// Get image data.
const encodedData = readImageFile('./tests/__assets/screenshot.png', 'image/png');

try {
  // Get project.
  const project = await api.projects.first();

  // Create image object.
  const id = await api.screenshots.create({ project, encodedData });

  // Update metadata.
  await api.screenshots.update({
    project,
    screenshot: id,
    comment: 'Customers list.',
    tags: ['customers'],
  });

  console.log('Screenshot was created! Check this link:');
  console.log(`https://localazy.com/p/${project.slug}/screenshots`);
} catch (err) {
  console.error(err);
}
