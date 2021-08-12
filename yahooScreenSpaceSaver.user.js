/**
 *    Yahoo Screen Space Saver
 *    Removes ads on Yahoo Mail and frees some space for smaller screens
 */

function addCss(cssCode){
	// Hide elements with CSS like how Piyush Soni's plugin does it
	// https://addons.mozilla.org/en-US/firefox/user/2740871/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-user-profile-link

	let doc = document.head;
	let styleTag = document.createElement("style");
	styleTag.innerText = cssCode;
	doc.appendChild(styleTag);
}

// === Shorten the header at the top ===
addCss("#ybar-inner-wrap > div:first-of-type {display: none !important}"); // Remove Gray Header
// Shorten the height of the purple header
addCss("#app > section > div {height: 75px !important}");	// Purple background
addCss("#ybar {height: 75px !important}"); // Shorten the invisible element that covers up the UI buttons (Archive/Move/Delete/Spam)

// === Remove top banner Ad when viewing a message ===
addCss("#card_group_container {display: none !important}");

// === Remove Right Sidebar Ads ===
addCss("#mail-app-component-container > div:nth-of-type(2) {display: none !important}");
	// TODO: The Contacts/Calendar/Help/Settings buttons are missing

// === Hide Ads in the inbox between emails ===
addCss("#Atom .D_ZKxLmw {display: none !important}");
// TODO: May cause firefox warning: "cannot load stylesheet"
// TODO: Leaves an empty space for the ad because of hard-coded in-line styling "top: ##px"