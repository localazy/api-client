import { getConfig } from './common.mjs';
import { ApiClient } from '../lib/main.js';

const { authToken, apiUrl } = getConfig();

// Get api client.
const api = new ApiClient({ authToken, apiUrl });

try {
  // Get project.
  const project = await api.projects.first();

  // Get some JSON data with text to translate.
  const json = {
    en: {
      headers: {
        name: 'Name'
      }
    }
  };


  // Import JSON data.
  await api.import.json({ project, json });

  console.log('JSON was uploaded! Check these links:');
  console.log(`https://localazy.com/p/${project.slug}/source-language`);
  console.log(`https://localazy.com/p/${project.slug}/files`);
} catch (err) {
  console.error(err);
}
