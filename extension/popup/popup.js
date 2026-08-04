const API_BASE = 'https://job-backpack.vercel.app';

const $ = id => document.getElementById(id);

async function getApiKey() {
  const { apiKey } = await chrome.storage.local.get('apiKey');
  return apiKey;
}

async function saveApiKey(key) {
  await chrome.storage.local.set({ apiKey: key });
}

async function init() {
  const apiKey = await getApiKey();

  if (!apiKey) {
    $('setup').classList.remove('hidden');
    return;
  }

  $('main').classList.remove('hidden');

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, async (response) => {
    if (chrome.runtime.lastError || !response?.job) {
      $('error').textContent = 'Could not detect job on this page';
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
        body: JSON.stringify(response.job),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      $('loading').classList.add('hidden');
      $('success').classList.remove('hidden');

      setTimeout(() => window.close(), 1500);
    } catch (err) {
      $('loading').classList.add('hidden');
      $('error').textContent = err.message || 'Failed to save job';
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

init();
