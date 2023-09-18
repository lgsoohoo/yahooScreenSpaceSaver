/**
 * Prefix for custom IDs
 */
const ysssHtmlIdPrefix = "YSSS_";

/**
 * Helper for assigning an HTML ID
 * @param {Element} node - HTML DOM Element
 * @param {string} idName
 */
function addHtmlId(node, idName) {
  if (node !== null) {
    node.setAttribute("id", ysssHtmlIdPrefix + idName);
  }
}

/**
 * @param {*} nodeID - the part without the ysssHtmlIdPrefix
 * @returns the YSSS HTML Element
 */
function getYSSSNode(nodeID) {
  return document.getElementById(ysssHtmlIdPrefix + nodeID);
}

/**
 * Assigns custom IDs to some HTML elements we'll need to reference later
 */
function assignYSSSHtmlIds() {
  // General Right sidebar
  // Includes "close ad" button, "Contacts/Calendar/Settings" toolbar, and the advertisement
  let mailRightRail = document.getElementById("mail-app-component-container")
    .firstElementChild.nextElementSibling;
  addHtmlId(mailRightRail, "mailRightRail");

  let contactsCalendarSettingsToolbar =
    mailRightRail.firstElementChild /* Yahoo's native "Close Ad" button */
      .nextElementSibling /* <div> for Banner Ad and ToolBar */
      .firstElementChild /* Outter <div> for toolbar (that we don't want) */
      .firstElementChild; /* <div> for toolbar (that we want) */
  addHtmlId(contactsCalendarSettingsToolbar, "contactsCalendarSettingsToolbar");
}

/**
 * Adjusts styling for the Contacts/Calendar/Settings toolbar.
 * Converts the horizontal toolbar into a vertical toolbar.
 * TODO: The buttons are not horizontally centered in the vertical bar.
 * @param {Element} toolbar
 */
function adjustToolbarStylingForVertical(toolbar) {
  // Set the toolbar to be vertical
  toolbar.style.flexDirection = "column";
  toolbar.style.background = "none";
  toolbar.style.padding = "0px";
  toolbar.style.border = "0px";

  // Set the buttons to be vertically stacked
  let buttonSetDiv = toolbar.firstElementChild;
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
  let settingSection = toolbar.firstElementChild.nextElementSibling;
  let textSpan =
    settingSection.firstElementChild.firstElementChild.firstElementChild
      .firstElementChild;
  textSpan.parentElement.removeChild(textSpan);
}

/**
 * Moves the Contact/Calendar/Settings toolbar from above the advertisements to its own toolbar.
 * Looks similar to if one presses the 'close advertisement' button
 * @returns {boolean} - if successful
 */
function moveContactCalendarSettingsToolbar() {
  try {
    // Find the toolbar we want to move:
    let contactsCalendarSettingsToolbar = getYSSSNode(
      "contactsCalendarSettingsToolbar"
    );

    // Find where to move it.
    // Move it outside the sidebar div, so it is between the main body and the advertisements.
    // In this spot, it won't get re-generated/deleted when they click on different screens.
    let destination = document.getElementById("mail-app-component");

    destination.after(contactsCalendarSettingsToolbar);

    adjustToolbarStylingForVertical(contactsCalendarSettingsToolbar);

    return true;
  } catch (e) {
    console.error("Error occurred while trying to move the toolbar");
    console.error(e);

    return false;
  }
}

/**
 * Shows or hides the right sidebar depending on if it's displaying ads or the Contacts/Calendar
 */
function checkAndShowHideSidebar() {
  // Y!'s native "Close Ad" button and the right side ad.
  let rightSidebar = getYSSSNode("mailRightRail");

  let adOnEmailList = document.getElementById("gpt-iframe");
  let adOnMessage = document.getElementById("slot_MON");

  if (adOnEmailList || adOnMessage) {
    // Sidebar is showing an ad
    rightSidebar.style.display = "none";
  } else {
    // Sidebar is showing the Calendar or Contacts
    rightSidebar.style.display = "flex";
  }
}

/**
 * Monitors the sidebar and applies the checkAndShowHideSidebar()
 * every time something changes.
 */
function monitorForAds() {
  getYSSSNode("mailRightRail").addEventListener(
    "DOMSubtreeModified",
    checkAndShowHideSidebar,
    false
  );
}
