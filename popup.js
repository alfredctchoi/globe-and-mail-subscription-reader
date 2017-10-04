function clickFreePrint(link) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    if (tabs.length !== 1) {
      return;
    }

    chrome.tabs.update(tabs[0].id, {
      url: link
    }, (tab) => {
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, {
          text: 'click_free_print_button'
        }, (link) => {
          chrome.tabs.update(tabs[0].id, {
            url: link
          })
        });
      }, 500);
    });
  });
}


function handleLicenseLink(link) {
  if (!link) {
    return;
  }
  chrome.tabs.create({
    url: link
  }, (tab) => {
    const clickPrintButton = {
      text: 'click_license_print_button'
    }
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, clickPrintButton, clickFreePrint);
    }, 1000)
  })
}

chrome.browserAction.onClicked.addListener(function (tab) {
  const getLicenseLink = {
    text: "get_license_link"
  }
  chrome.tabs.sendMessage(tab.id, getLicenseLink, handleLicenseLink);
});