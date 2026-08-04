chrome.runtime.onInstalled.addListener(() => {
  console.log('Job Backpack extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'popup/popup.html' });
});
