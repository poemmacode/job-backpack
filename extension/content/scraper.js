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

  generic: () => {
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const metaDesc = document.querySelector('meta[property="og:description"], meta[name="description"]')?.content;

    const title = ogTitle
      || document.querySelector('h1')?.textContent?.trim()
      || document.title;

    const allText = document.body.innerText.substring(0, 10000);

    const companyPatterns = [
      /(?:at|@|for|empresa:?\s*|compa[ñn]ía:?\s*)([A-Z][\w\s&]+)/i,
      /(?:About|Somos|Empresa)\s*[:\-]?\s*([^\n]+)/i,
    ];

    let company = null;
    for (const pattern of companyPatterns) {
      const match = allText.match(pattern);
      if (match) {
        company = match[1].trim().substring(0, 100);
        break;
      }
    }

    const locationPatterns = [
      /(?:Location|Ubicación|Lugar|Remote|Remoto|Hybrid|Híbrido|On-site|Presencial)[:\s]*([^\n]+)/i,
      /((?:Remote|Remoto|Hybrid|Híbrido|On-site|Presencial)[^\n]*)/i,
      /((?:[A-Z][\w]+(?:\s|,))+(?:,\s*[A-Z]{2})?)/,
    ];

    let location = null;
    for (const pattern of locationPatterns) {
      const match = allText.match(pattern);
      if (match) {
        location = (match[1] || match[0]).trim().substring(0, 100);
        break;
      }
    }

    const salaryPatterns = [
      /(?:Salary|Salario|Compensation|Sueldo)[:\s]*([^\n]+)/i,
      /(?:\$|USD|EUR|COP|MXN|ARS|CLP)\s*[\d,.]+(?:\s*[-–]\s*(?:\$|USD|EUR|COP|MXN|ARS|CLP)?\s*[\d,.]+)?/i,
      /[\d,.]+\s*(?:USD|EUR|COP|MXN|ARS|CLP|a[nno]+|monthly|mensual)/i,
    ];

    let salary = null;
    for (const pattern of salaryPatterns) {
      const match = allText.match(pattern);
      if (match) {
        salary = (match[1] || match[0]).trim().substring(0, 50);
        break;
      }
    }

    const description = metaDesc
      || document.querySelector('article, [class*="description"], [class*="detail"], main')?.textContent?.trim()?.substring(0, 5000);

    return { title, company, location, salary, description };
  }
};

function getSite() {
  const h = window.location.hostname;
  if (h.includes('linkedin.com')) return 'linkedin';
  if (h.includes('indeed.com')) return 'indeed';
  if (h.includes('glassdoor.com')) return 'glassdoor';
  if (h.includes('wellfound.com')) return 'wellfound';
  return 'generic';
}

function scrapeJob() {
  const site = getSite();
  const job = SCRAPERS[site]();
  job.url = window.location.href;
  return job;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'scrapeJob') {
    sendResponse({ job: scrapeJob() });
  }
  return true;
});
