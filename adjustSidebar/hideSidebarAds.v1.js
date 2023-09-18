/**
 * Version 1
 * @deprecated Yahoo only allows users to close the ads a few times,
 *  so this doesn't always work. Also, the ad banner re-opens every
 *  time we re-focus the window.
 */

/**
 * Hide the right sidebar ad. We do this by "clicking" on the close ad button rather than hiding the CSS since the sidebar has the Calendar/Contacts/Settings sidebar,
 * and the area is used to show the Calendar and Contacts contents.
 */
function hideRightSidebarAds() {
  // When they close the Contacts or Calendar, then Yahoo will show the ad again. We'll hide the ad with CSS so it's just a gray box.
  addCss("#gpt-iframe {display: none !important}");

  try {
    // General sidebar, including "close ad" button, "Contacts/Calendar/Settings" toolbar, and the advertisement
    let mailRightRail = document.getElementById("mail-app-component-container")
      .firstElementChild.nextElementSibling;

    // The "close ad" button
    let mailRightRailHideAdBtn =
      mailRightRail.firstElementChild.firstElementChild;
    mailRightRailHideAdBtn.click();

    /*
      When after clicking on the "close ad" button, they might show a modal asking you to upgrade to the paid service.
      Hide it.
      The node only exists after we click the "close ad" button
    */
    let rightRailUpsellCue = document.getElementById("modal-outer");
    try {
      /*
        This has an ID of "modal-outer" which sounds generic and might be used for other elements,
        but it also has
          aria-labelledby="right-rail-upsell-cue"
          aria-describedby="right-rail-upsell-cue"
        So it should be safe to delete.
      */
      if (rightRailUpsellCue) {
        rightRailUpsellCue.parentElement.remove(rightRailUpsellCue);
      }
    } catch (e) {
      console.error(
        "Error occurred while attempting to close the Upsell Modal"
      );
      console.error(e);
    }
  } catch (e) {
    console.error(
      "Error occurred while trying close the right sidebar advertisement"
    );
    console.error(e);
  }
}
