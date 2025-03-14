// chrome.runtime.onInstalled.addListener(() => {
//   console.log('onInstalled....');
// });

import { bitbucketPullRequestRegex } from '~/consts';

function updateTabIconBasedOnUrl(tab: chrome.tabs.Tab) {
  const match = tab.url.match(bitbucketPullRequestRegex);
  if (match && tab.active) {
    chrome.action.setIcon({ path: './icon-on.png' });
  } else {
    chrome.action.setIcon({ path: './icon-off.png' });
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // console.log(msg);
  // console.log(sender);
  // sendResponse('Front the background Script');
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log(activeInfo);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs);
    updateTabIconBasedOnUrl(tabs[0]);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId);
  console.log(changeInfo);
  console.log(tab);
  updateTabIconBasedOnUrl(tab);
});
