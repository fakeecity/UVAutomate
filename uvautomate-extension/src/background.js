'use strict';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    if (tab.url.startsWith('https://shibidp.its.virginia.edu/idp/')) {
      console.log('begin');
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id, allFrames: true },
          files: ['injector.js'],
        },
        () => {
          console.log('finish');
        }
      );
    }
  }
});
