function scrapeJob() {
  const h1 = document.querySelector('h1');
  const h2 = document.querySelector('h2');
  const title = (h1 || h2)?.textContent?.trim() || document.title;

  const body = document.body.innerText;
  const lowerBody = body.toLowerCase();

  const location = lowerBody.includes('remote') ? 'Remote' : 'In Office';

  const patterns = [
    /job\s*description/i,
    /descripci[oó]n\s*(del\s*)?puesto/i,
    /descripci[oó]n/i,
    /about\s*(the\s*)?role/i,
    /about\s*(the\s*)?position/i,
    /about\s*(the\s*)?job/i,
    /role\s*overview/i,
    /position\s*overview/i,
  ];

  let description = '';

  for (const pattern of patterns) {
    const match = lowerBody.match(pattern);
    if (match) {
      const startIdx = match.index + match[0].length;
      const remaining = body.substring(startIdx, startIdx + 5000);

      const paragraphs = remaining.split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 20 && trimmed.length < 2000;
      }).slice(0, 15);

      description = paragraphs.join('\n\n');
      break;
    }
  }

  if (!description) {
    const allP = Array.from(document.querySelectorAll('p'));
    const longP = allP
      .map(p => p.textContent.trim())
      .filter(t => t.length > 50 && t.length < 2000)
      .slice(0, 10);
    description = longP.join('\n\n');
  }

  return {
    title,
    description,
    location,
    url: window.location.href,
  };
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'scrapeJob') {
    sendResponse({ job: scrapeJob() });
  }
  return true;
});
