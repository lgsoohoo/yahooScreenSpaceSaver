/**
 * Version 2
 * @deprecated This doesn't work properly when viewing an email - the Contacts/Calendar/Settings
 *  toolbar appears on top of the Back/Reply/Forward buttons, and the Contacts/Calendar/Settings
 *  toolbar disappears when the main content refreshes (i.e. going between the email list 
 *  and a specific email message)
 */

/**
 * Moves the Contact/Calendar/Settings toolbar to the center toolbar (with the Archive/Delete buttons)
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

    // Destination toolbar
    let centerToolbar =
      document.getElementById("mail-app-component").firstElementChild
        .firstElementChild.firstElementChild.firstElementChild
        .firstElementChild;

    let duplicate = contactsCalendarSettingsToolbar.cloneNode(true);
    centerToolbar.appendChild(duplicate);

    // Update styling to match destination

    duplicate.style.marginLeft = "5%";
    duplicate.style.marginBottom = "0px";
    duplicate.style.borderBottom = "0px";
    duplicate.style.background = "none";

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
    // General sidebar, including "close ad" button, "Contacts/Calendar/Settings" toolbar, and the advertisement
    let mailRightRail = document.getElementById("mail-app-component-container")
      .firstElementChild.nextElementSibling;

    if (document.getElementById("gpt-iframe")) {
      // Sidebar is showing an ad
      mailRightRail.style.display = "none";
    } else {
      // Sidebar is showing the Calendar or Contacts
      mailRightRail.style.display = "flex";
    }
  }
  showOrHideSideBar();

  if (!showHideSidebarOnly) {
    // General sidebar, including "close ad" button, "Contacts/Calendar/Settings" toolbar, and the advertisement
    let mailRightRail = document.getElementById("mail-app-component-container")
      .firstElementChild.nextElementSibling;

    // The banner ad and the Contacts/Calendar/Help/Settings toolbar
    let advertisementAndButtons =
      mailRightRail.firstElementChild.nextElementSibling;

    advertisementAndButtons.addEventListener(
      "DOMSubtreeModified",
      showOrHideSideBar,
      false
    );
  }
}
monitorForAds();
