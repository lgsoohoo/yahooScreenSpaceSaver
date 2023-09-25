/**
 * Yahoo Screen Space Saver
 * Firefox plugin that removes ads on Yahoo Mail and frees some space for smaller screens.
 *
 * For more information, see https://addons.mozilla.org/en-US/firefox/addon/yahoo-screen-space-saver/
 */

// Note: In `manifest.json`, be sure to load the other JS files
// before `main.js`, so that the imported functions actually exist!

function runCodeForSidebar() {
  assignYSSSHtmlIds();
  moveContactCalendarSettingsToolbar();
  checkAndShowHideSidebar();
  monitorForAds();

  // Code from https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

  // Select the node that will be observed for mutations
  const targetNode = document.getElementById("mail-app-container");
  // Selecting the "#app" node doesn't work. Unfortunately we have to use this high-level node.

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };
  // Callback function to execute when mutations are observed
  const callback = () => {
    // We don't use getYSSSNode() because we can't guarantee that the ID has been assigned, or if the node exists
    let mailRightRail = document.getElementById("mail-app-component-container")
      .firstElementChild.nextElementSibling;
    if (
      document.querySelectorAll('[data-test-id="mail-right-rail"]').length ==
        0 ||
      !mailRightRail
    ) {
      // The mail-right-rail doesn't exist, so Y! isn't even showing it. (E.g. the full Settings page)
      // Don't try to move it since it'll cause an infinite loop
      return;
    }

    if (!getYSSSNode("contactsCalendarSettingsToolbar")) {
      // console.log("Assigning IDs via mutation checker!");
      assignYSSSHtmlIds();
    } 

    // Check if the Contacts/Calendar/Settings toolbar has been repositioned and move if need be.
    if (
      document.getElementById("mail-app-component-container").childNodes
        .length <= 2
    ) {
      moveContactCalendarSettingsToolbar();
      checkAndShowHideSidebar();
      monitorForAds();
    }
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

function runCodeForHideItemsWithCss() {
  hideUpperGrayBanner();
  hideEmailMessageAds();
  hideInboxBetweenEmailAds();
}

// Make sure the DOM has finished loading before we run our code.
// Y! reloads some of the page later on anyway, which might make this an unnecessary step.
if (document.readyState == "complete") {
  runCodeForHideItemsWithCss();
  runCodeForSidebar();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    runCodeForHideItemsWithCss();
    runCodeForSidebar();
  });
}
