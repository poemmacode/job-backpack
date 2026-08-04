const API_BASE = 'https://job-backpack.vercel.app';

const elements = {
  loading: document.getElementById('loading'),
  setupView: document.getElementById('setup-view'),
  noJob: document.getElementById('no-job'),
  jobForm: document.getElementById('job-form'),
  success: document.getElementById('success'),
  alreadySaved: document.getElementById('already-saved'),
  footer: document.getElementById('footer'),
  setupApiKey: document.getElementById('setup-api-key'),
  setupSaveBtn: document.getElementById('setup-save-btn'),
  title: document.getElementById('title'),
  company: document.getElementById('company'),
  location: document.getElementById('location'),
  salary: document.getElementById('salary'),
  url: document.getElementById('url'),
  notes: document.getElementById('notes'),
  saveBtn: document.getElementById('save-btn'),
  viewBtn: document.getElementById('view-btn'),
  settingsBtn: document.getElementById('settings-btn'),
};

function hideAll() {
  Object.values(elements).forEach(e => {
    if (e) e.classList.add('hidden');
  });
}

function show(el) {
  if (el) el.classList.remove('hidden');
}

async function getApiKey() {
  const result = await chrome.storage.local.get('apiKey');
  return result.apiKey || null;
}

async function saveApiKey(apiKey) {
  await chrome.storage.local.set({ apiKey });
}

async function checkIfJobExists(url, apiKey) {
  try {
    const response = await fetch(
      `${API_BASE}/api/extension/check?url=${encodeURIComponent(url)}`,
      { headers: { 'x-api-key': apiKey } }
    );
    const data = await response.json();
    return data.exists;
  } catch {
    return false;
  }
}

async function saveJob(jobData, apiKey) {
  const response = await fetch(`${API_BASE}/api/extension/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) throw new Error('Failed to save');
  return response.json();
}

async function init() {
  hideAll();
  
  const apiKey = await getApiKey();

  if (!apiKey) {
    show(elements.setupView);
    return;
  }

  show(elements.loading);
  show(elements.footer);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url) {
    show(elements.noJob);
    return;
  }

  const jobExists = await checkIfJobExists(tab.url, apiKey);

  if (jobExists) {
    show(elements.alreadySaved);
    elements.viewBtn.onclick = () => {
      chrome.tabs.create({ url: `${API_BASE}/dashboard/jobs` });
    };
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, async (response) => {
    if (chrome.runtime.lastError || !response?.job) {
      show(elements.noJob);
      return;
    }

    const job = response.job;
    elements.title.value = job.title || '';
    elements.company.value = job.company || '';
    elements.location.value = job.location || '';
    elements.salary.value = job.salary || '';
    elements.url.value = job.url || tab.url;

    show(elements.jobForm);
  });
}

elements.setupSaveBtn.addEventListener('click', async () => {
  const apiKey = elements.setupApiKey.value.trim();
  
  if (!apiKey) {
    alert('Please enter an API key');
    return;
  }

  elements.setupSaveBtn.disabled = true;
  elements.setupSaveBtn.textContent = 'Saving...';

  await saveApiKey(apiKey);
  
  init();
});

elements.saveBtn.addEventListener('click', async () => {
  const apiKey = await getApiKey();
  
  const jobData = {
    title: elements.title.value,
    company: elements.company.value,
    location: elements.location.value,
    salary: elements.salary.value,
    url: elements.url.value,
    notes: elements.notes.value,
  };

  if (!jobData.title || !jobData.company) {
    alert('Title and company are required');
    return;
  }

  elements.saveBtn.disabled = true;
  elements.saveBtn.textContent = 'Saving...';

  try {
    await saveJob(jobData, apiKey);
    show(elements.success);
  } catch (error) {
    alert('Failed to save job. Please try again.');
    elements.saveBtn.disabled = false;
    elements.saveBtn.textContent = 'Save to Job Backpack';
  }
});

elements.settingsBtn.addEventListener('click', async () => {
  const apiKey = await getApiKey();
  hideAll();
  elements.setupApiKey.value = apiKey || '';
  show(elements.setupView);
  show(elements.footer);
});

init();
