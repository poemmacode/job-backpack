const API_BASE = 'https://job-backpack.vercel.app';

const $ = id => document.getElementById(id);

async function getApiKey() {
  const { apiKey } = await chrome.storage.local.get('apiKey');
  return apiKey;
}

async function saveApiKey(key) {
  await chrome.storage.local.set({ apiKey: key });
}

async function scrapeAndSave() {
  const apiKey = await getApiKey();

  if (!apiKey) {
    $('setup').classList.remove('hidden');
    return;
  }

  $('main').classList.remove('hidden');

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/scraper.js'],
    });
  } catch (e) {
    $('loading').classList.add('hidden');
    $('error').textContent = 'Cannot run on this page';
    $('error').classList.remove('hidden');
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, async (response) => {
    if (chrome.runtime.lastError || !response?.job) {
      $('loading').classList.add('hidden');
      $('error').textContent = 'Could not detect job data';
      $('error').classList.remove('hidden');
      return;
    }

    const job = response.job;

    if (!job.title && !job.company) {
      $('loading').classList.add('hidden');
      $('error').textContent = 'No job data found on this page';
      $('error').classList.remove('hidden');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/extension/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to save');

      $('loading').classList.add('hidden');
      $('success').classList.remove('hidden');
      setTimeout(() => window.close(), 1500);
    } catch (err) {
      $('loading').classList.add('hidden');
      $('error').textContent = err.message || 'Failed to save';
      $('error').classList.remove('hidden');
    }
  });
}

$('save-key').addEventListener('click', async () => {
  const key = $('api-key').value.trim();
  if (!key) return alert('Enter an API key');
  await saveApiKey(key);
  window.close();
});

scrapeAndSave();
