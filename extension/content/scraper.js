const scrapers = {
  linkedin: () => {
    const title = document.querySelector('.job-details-jobs-unified-top-card__job-title')?.textContent?.trim() ||
                  document.querySelector('h1')?.textContent?.trim();
    const company = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.textContent?.trim() ||
                    document.querySelector('[data-testid="company-name"]')?.textContent?.trim();
    const location = document.querySelector('.job-details-jobs-unified-top-card__bullet')?.textContent?.trim() ||
                     document.querySelector('[data-testid="company-location"]')?.textContent?.trim();
    const salary = document.querySelector('.job-details-jobs-unified-top-card__salary')?.textContent?.trim() ||
                   document.querySelector('[data-testid="salary"]')?.textContent?.trim();

    return { title, company, location, salary, url: window.location.href };
  },

  indeed: () => {
    const title = document.querySelector('.jobsearch-JobInfoHeader-title')?.textContent?.trim() ||
                  document.querySelector('h1.jobsearch-JobInfoHeader-title')?.textContent?.trim();
    const company = document.querySelector('[data-testid="inlineHeader-companyName"]')?.textContent?.trim() ||
                    document.querySelector('.jobsearch-InlineCompanyRating-companyHeader')?.textContent?.trim();
    const location = document.querySelector('[data-testid="inlineHeader-companyLocation"]')?.textContent?.trim() ||
                     document.querySelector('.jobsearch-JobInfoHeader-companyLocation')?.textContent?.trim();
    const salary = document.querySelector('.jobsearch-JobInfoHeader-salary')?.textContent?.trim() ||
                   document.querySelector('[data-testid="attribute_snippet_testid"]')?.textContent?.trim();

    return { title, company, location, salary, url: window.location.href };
  },

  glassdoor: () => {
    const title = document.querySelector('.JobDetails_jobTitle__GLyJ1')?.textContent?.trim() ||
                  document.querySelector('[data-test="job-title"]')?.textContent?.trim();
    const company = document.querySelector('.JobDetails_employerHeader__ZMvBn')?.textContent?.trim() ||
                    document.querySelector('[data-test="employer-short-name"]')?.textContent?.trim();
    const location = document.querySelector('.JobDetails_location__rKuJD')?.textContent?.trim() ||
                     document.querySelector('[data-test="job-location"]')?.textContent?.trim();
    const salary = document.querySelector('.JobDetails_salary__pVlJK')?.textContent?.trim() ||
                   document.querySelector('[data-test="detailSalary"]')?.textContent?.trim();

    return { title, company, location, salary, url: window.location.href };
  },

  wellfound: () => {
    const title = document.querySelector('[data-test="job-title"]')?.textContent?.trim() ||
                  document.querySelector('h1')?.textContent?.trim();
    const company = document.querySelector('[data-test="company-name"]')?.textContent?.trim() ||
                    document.querySelector('.styles_companyName__DtmZE')?.textContent?.trim();
    const location = document.querySelector('[data-test="job-location"]')?.textContent?.trim() ||
                     document.querySelector('.styles_jobLocation__AOtZv')?.textContent?.trim();
    const salary = null;

    return { title, company, location, salary, url: window.location.href };
  },
};

function detectSite() {
  const hostname = window.location.hostname;

  if (hostname.includes('linkedin.com')) return 'linkedin';
  if (hostname.includes('indeed.com')) return 'indeed';
  if (hostname.includes('glassdoor.com')) return 'glassdoor';
  if (hostname.includes('wellfound.com')) return 'wellfound';

  return null;
}

function scrapeJob() {
  const site = detectSite();

  if (!site || !scrapers[site]) {
    return null;
  }

  return scrapers[site]();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeJob') {
    const job = scrapeJob();
    sendResponse({ job });
  }
  return true;
});
