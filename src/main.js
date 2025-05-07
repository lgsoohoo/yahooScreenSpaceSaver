/**
 * Yahoo Screen Space Saver
 * Firefox plugin that removes ads on Yahoo Mail and frees some space for smaller screens.
 *
 * For more information, see https://addons.mozilla.org/en-US/firefox/addon/yahoo-screen-space-saver/
 */

const currentlyDebugging = false;

if (currentlyDebugging) {
  document.body.style.border = "5px solid red";
}

// Make sure the DOM has finished loading before we run our code.
// Y! reloads some of the page later on anyway, which might make this an unnecessary step.
if (document.readyState == "complete") {
  applyYSSSChanges("Fired from document.readyState");
} else {
  document.addEventListener("DOMContentLoaded", () => {
    applyYSSSChanges("Fired from DOMContentLoaded");
  });
}
window.addEventListener('load', function () {
  applyYSSSChanges("Fired from window.AddEventListener");
})




function applyYSSSChanges(message) {
  if (currentlyDebugging) {
    ysssDebugPrint(message);
  }

  hideRightSidebarFavoritesAndContacts();
  hideFeedbackAndAdFreeButtons();
  increaseWidthOfSearchBar();
}

function reduceWidthOfLeftSidebar(){
  // addCss("#novation-left-rail > div {padding-left: 0px !important}")
}

function hideRightSidebarFavoritesAndContacts() {
  // hide sidebar content
  addCss("#right-rail-container { display: none !important }")

  // stretch inbox to fill remaining space
  addCss(`#mail-app-component-container  > div:nth-of-type(3) { 
            grid-column-end: right-rail-end !important ;
            padding-right: 30px
        }`)
}

function hideFeedbackAndAdFreeButtons(){
  addCss("#ybar-inserted-content { display: none !important }")
}

function increaseWidthOfSearchBar(){
  addCss("#ybar-search-box-container { width: 100% !important }")
}

// ===== utils =====

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

function ysssDebugPrint(message) {
  console.debug(`Yahoo Screenspace Saver: ${message}`);
}