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
  addCss("#ybar-inner-wrap > div:nth-of-type(2) {display: none !important}");

  let searchBarDimensions = document
    .getElementById("ybar-search-box-container")
    .parentNode.parentNode // Wrapping div for the searchBar
    .getBoundingClientRect();
  let newSearchBarHeight = searchBarDimensions.height + 5;

  // Shrink the search bar background
  addCss(`#app > section > div {height: ${newSearchBarHeight}px !important}`);

  // Shrink the invisible element that covers up the UI buttons (Archive/Move/Delete/Spam)
  addCss(`#ybar {height: ${newSearchBarHeight}px !important}`);
}

/**
 * Hide ads that appear when viewing an email message
 */
function hideEmailMessageAds() {
  // Ad that appears at the top of an email
  addCss("#card_group_container {display: none !important}");
}

/**
 * Hides ads that appear in the inbox between emails
 */
function hideInboxBetweenEmailAds() {
  addCss("#Atom .D_ZKxLmw {display: none !important}");
  // TODO: May cause firefox warning: "cannot load stylesheet"
  // TODO: Leaves an empty space for the ad because of hard-coded in-line styling "top: ##px"
}
