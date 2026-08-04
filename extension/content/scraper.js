const SCRAPERS = {
  linkedin: () => ({
    title: document.querySelector('.job-details-jobs-unified-top-card__job-title, h1')?.textContent?.trim(),
    company: document.querySelector('.job-details-jobs-unified-top-card__company-name, [data-testid="company-name"]')?.textContent?.trim(),
    location: document.querySelector('.job-details-jobs-unified-top-card__bullet, [data-testid="company-location"]')?.textContent?.trim(),
    salary: document.querySelector('.job-details-jobs-unified-top-card__salary, [data-testid="salary"]')?.textContent?.trim(),
    description: document.querySelector('.jobs-description__content, .jobs-box--full')?.textContent?.trim()?.substring(0, 5000),
  }),

  indeed: () => ({
    title: document.querySelector('.jobsearch-JobInfoHeader-title, h1')?.textContent?.trim(),
    company: document.querySelector('[data-testid="inlineHeader-companyName"], .jobsearch-InlineCompanyRating-companyHeader')?.textContent?.trim(),
    location: document.querySelector('[data-testid="inlineHeader-companyLocation"], .jobsearch-JobInfoHeader-companyLocation')?.textContent?.trim(),
    salary: document.querySelector('.jobsearch-JobInfoHeader-salary')?.textContent?.trim(),
    description: document.querySelector('#jobDescriptionText')?.textContent?.trim()?.substring(0, 5000),
  }),

  glassdoor: () => ({
    title: document.querySelector('.JobDetails_jobTitle__GLyJ1, [data-test="job-title"]')?.textContent?.trim(),
    company: document.querySelector('.JobDetails_employerHeader__ZMvBn, [data-test="employer-short-name"]')?.textContent?.trim(),
    location: document.querySelector('.JobDetails_location__rKuJD, [data-test="job-location"]')?.textContent?.trim(),
    salary: document.querySelector('.JobDetails_salary__pVlJK')?.textContent?.trim(),
    description: document.querySelector('.JobDetails_jobDescription__l1HfJ, [data-test="jobDescription"]')?.textContent?.trim()?.substring(0, 5000),
  }),

  wellfound: () => ({
    title: document.querySelector('[data-test="job-title"], h1')?.textContent?.trim(),
    company: document.querySelector('[data-test="company-name"], .styles_companyName__DtmZE')?.textContent?.trim(),
    location: document.querySelector('[data-test="job-location"], .styles_jobLocation__AOtZv')?.textContent?.trim(),
    salary: null,
    description: document.querySelector('[data-test="job-description"]')?.textContent?.trim()?.substring(0, 5000),
  }),
};

function getSite() {
  const h = window.location.hostname;
  if (h.includes('linkedin.com')) return 'linkedin';
  if (h.includes('indeed.com')) return 'indeed';
  if (h.includes('glassdoor.com')) return 'glassdoor';
  if (h.includes('wellfound.com')) return 'wellfound';
  return null;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'scrapeJob') {
    const site = getSite();
    if (!site || !SCRAPERS[site]) return sendResponse({ job: null });
    const job = SCRAPERS[site]();
    job.url = window.location.href;
    sendResponse({ job });
  }
  return true;
});
