const API_BASE = 'https://job-backpack.vercel.app';

const $ = id => document.getElementById(id);

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/scraper.js'],
    });
  } catch {
    $('loading').classList.add('hidden');
    $('error').textContent = 'Cannot read this page';
    $('error').classList.remove('hidden');
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, async (response) => {
    if (chrome.runtime.lastError || !response?.job) {
      $('loading').classList.add('hidden');
      $('error').textContent = 'Could not read job data';
      $('error').classList.remove('hidden');
      return;
    }

    const { title, description } = response.job;

    $('loading').classList.add('hidden');
    $('title').textContent = title || 'Untitled';
    $('description').textContent = description || 'No description found';
    $('preview').classList.remove('hidden');
  });
}

$('save-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, async (response) => {
    try {
      const res = await fetch(`${API_BASE}/api/extension/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response.job),
      });

      if (!res.ok) throw new Error('Failed');

      $('preview').classList.add('hidden');
      $('success').classList.remove('hidden');
      setTimeout(() => window.close(), 1500);
    } catch {
      $('error').textContent = 'Failed to save';
      $('error').classList.remove('hidden');
    }
  });
});

init();
