/* Listen for messages */

function getLicenseLink() {
  const modal = document.querySelector('#pianowrapper');
  const modalBackground = document.querySelector('#pianomask');

  // do nothing if there is no modal
  if (!modal) {
    return null;
  }

  const anchors = document.querySelectorAll('a')
  for (let i = anchors.length - 1; i > -1; i--) {
    const anchor = anchors[i]
    if (anchor.href.indexOf('license.icopyright.net') > -1) {
      return anchor.href;
    }
  }
}

function clickFreePrintButton() {
  const link = document.querySelector('.section_wrap a');
  return link.href;
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (!msg.text) {
    sendResponse(null);
    return;
  }

  switch (msg.text) {
    case 'get_license_link':
      sendResponse(getLicenseLink());
      break;
    case 'click_free_print_button':
    case 'click_license_print_button':
      sendResponse(clickFreePrintButton());
      break;
    default:
      sendResponse(null);
      break;
  }
});