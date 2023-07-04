/**
 * Yahoo Screen Space Saver
 * Firefox plugin that removes ads on Yahoo Mail and frees some space for smaller screens
 */

/**
 * Hide elements with CSS like how Piyush Soni's plugin does it
 * https://addons.mozilla.org/en-US/firefox/user/2740871/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-user-profile-link
 * @param {string} cssCode
 */
function addCss(cssCode) {
  let doc = document.head;
  let styleTag = document.createElement("style");
  styleTag.innerText = cssCode;
  doc.appendChild(styleTag);
}

/**
 * Removes the upper gray banner containing:
 *  - Home
 *  - Mail
 *  - News
 *  - Finance
 *  - "y! Mail+" upgrade button
 *  - etc.
 */
function hideUpperGrayBanner() {
  // Remove Gray Header, but the search bar shifts up and the overall top section still takes up the same height
  addCss("#ybar-inner-wrap > div:first-of-type {display: none !important}");

  let searchBarDimensions = document
    .getElementById("ybar-inner-wrap")
    .firstElementChild.nextElementSibling.getBoundingClientRect();
  let newSearchBarHeight = searchBarDimensions.height + 5;

  // Shrink the search bar background
  addCss(`#app > section > div {height: ${newSearchBarHeight}px !important}`);
  // Shrink the invisible element that covers up the UI buttons (Archive/Move/Delete/Spam)
  addCss("#ybar {height: 75px !important}");
}
hideUpperGrayBanner();

/**
 * Hide ads that appear when viewing an email message
 */
function hideEmailMessageAds() {
  // Ad that appears at the top of an email
  addCss("#card_group_container {display: none !important}");
}
hideEmailMessageAds();

/**
 * Hides ads that appear in the inbox between emails
 */
function hideInboxBetweenEmailAds() {
  addCss("#Atom .D_ZKxLmw {display: none !important}");
  // TODO: May cause firefox warning: "cannot load stylesheet"
  // TODO: Leaves an empty space for the ad because of hard-coded in-line styling "top: ##px"
}
hideInboxBetweenEmailAds();

/**
 * Moves the Contact/Calendar/Settings toolbar from above the advertisements to a vertical toolbar,
 * similar to if one presses the 'close advertisement' button
 * @returns {boolean} - if successful
 */
function moveContactCalendarSettingsToolbar() {
  try {
    // Find the toolbar we want to move:

    // General sidebar, including "close ad" button, "Contacts/Calendar/Settings" toolbar, and the advertisement
    let mailRightRail = document.getElementById("mail-app-component-container")
      .firstElementChild.nextElementSibling;

    // The banner ad and the Contacts/Calendar/Help/Settings toolbar
    let advertisementAndButtons =
      mailRightRail.firstElementChild.nextElementSibling;

    // The Toolbar to move
    let contactsCalendarSettingsToolbar =
      advertisementAndButtons.firstElementChild.firstElementChild;

    // Move it outside the sidebar div, so it is between the main body and the advertisements.
    // In this spot, it won't get re-generated/deleted when they click on different screens.
    let destination =
      contactsCalendarSettingsToolbar.parentElement.parentElement.parentElement
        .parentElement.firstElementChild;
    destination.after(contactsCalendarSettingsToolbar);

    // Set the toolbar to be vertical
    contactsCalendarSettingsToolbar.style.flexDirection = "column";
    contactsCalendarSettingsToolbar.style.background = "none";
    contactsCalendarSettingsToolbar.style.padding = "0px";
    contactsCalendarSettingsToolbar.style.border = "0px";

    // Set the buttons to be vertically stacked
    let buttonSetDiv = contactsCalendarSettingsToolbar.firstElementChild;
    buttonSetDiv.style.flexDirection = "column";
    buttonSetDiv.style.padding = "16px";
    buttonSetDiv.style.gap = "16px";

    // Remove margin on each button
    let buttonSet = [...buttonSetDiv.childNodes];
    buttonSet.forEach((item) => {
      item.style.margin = "0px";
      if (item.tagName.toLowerCase() === "span") {
        // Sometimes the last item is wrapped in a <span> so it still has a margin.
        item.firstElementChild.style.margin = "0px";
      }
    });

    // Remove the text that says "Settings". (Will appear if you're zoomed out)
    let settingSection =
      contactsCalendarSettingsToolbar.firstElementChild.nextElementSibling;
    let textSpan =
      settingSection.firstElementChild.firstElementChild.firstElementChild
        .firstElementChild;
    textSpan.parentElement.removeChild(textSpan);

    return true;
  } catch (e) {
    console.error("Error occurred while trying to move the toolbar");
    console.error(e);

    return false;
  }
}
moveContactCalendarSettingsToolbar();

/**
 * Shows or hides the right sidebar depending on if it's displaying ads or the Contacts/Calendar
 *
 * @param {boolean} showHideSidebarOnly - Only run the code to show/hide the sidebar, and don't add an event listener
 */
function monitorForAds(showHideSidebarOnly) {
  function showOrHideSideBar(ev) {
    // Note: After moving the toolbar, the right ad is now the 3rd child element
    let rightAdvertisement = document.getElementById(
      "mail-app-component-container"
    ).firstElementChild.nextElementSibling.nextElementSibling;

    let adOnEmailList = document.getElementById("gpt-iframe");
    let adOnMessage = document.getElementById("slot_MON");

    if (adOnEmailList || adOnMessage) {
      // Sidebar is showing an ad
      rightAdvertisement.style.display = "none";
    } else {
      // Sidebar is showing the Calendar or Contacts
      rightAdvertisement.style.display = "flex";
    }
  }
  showOrHideSideBar();

  if (!showHideSidebarOnly) {
    // Note: After moving the toolbar, the right ad is now the 3rd child element
    let rightAdvertisement = document.getElementById(
      "mail-app-component-container"
    ).firstElementChild.nextElementSibling.nextElementSibling;

    rightAdvertisement.addEventListener(
      "DOMSubtreeModified",
      showOrHideSideBar,
      false
    );
  }
}
monitorForAds();
