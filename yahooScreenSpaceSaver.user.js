/**
 *    Yahoo Screen Space Saver
 *    Removes ads on Yahoo Mail and frees some space for smaller screens
 */


const colors = ["red", "blue", "white", "purple", "green", "pink", "yellow"];
const random = Math.floor(Math.random() * colors.length);
document.body.style.border = "5px solid "+colors[random];

function AddStyle(cssText)
{
	// Function by Piyush Soni
	// https://addons.mozilla.org/en-US/firefox/user/2740871/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-user-profile-link
	let styleEl = document.createElement("style");
	styleEl.textContent = cssText;
	styleEl.setAttribute("type", "text/css");
	let headEl = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
	headEl.appendChild(styleEl);
}


// === Shorten the header at the top ===
AddStyle("._yb_m085o {display: none !important}"); // Remove Gray Header
// Shorten the height of the purple header
AddStyle(".H_3n1j3 {height: 75px !important}");	// Purple background 
AddStyle("#ybar {height: 75px !important}"); // Shorten the invisible element that covers up the UI buttons (Archive/Move/Delete/Spam)

// Remove top banner Ad when viewing a message
AddStyle("#card_group_container {display: none !important}");

// Remove Right Sidebar Ads
AddStyle(".D_F.o_v.p_R.I_ZnwrMC {display: none !important}");
	// TODO: The Contacts/Calendar/Help/Settings buttons are missing

// Hide Ads in the inbox between emails
AddStyle("#Atom .D_ZKxLmw {display: none !important}");
// TODO: May cause firefox warning: "cannot load stylesheet"
// TODO: Leaves an empty space for the ad because of hard-coded in-line styling "top: ##px"













 ///////////////////// Just some unused code that I'm saving: //////////////////////////

 
// Hide Ads in the inbox between emails
// AddStyle("#mail-app-component .e_eo6.H_qJ.X_0.o_h.A_6EqO.ab_C.p_R.D_ZKxLmw.v_g9505.I_ZnIF8Y.cdPFi_Z281SGl.k_w.I4_ZpQYvz a {display: none !important}");
// AddStyle("ul> li> div> a {display: none !important}");


 function dispNone(classNameCSSStyle){
	// @param classNameCSSStyle - use .class1.class2
	AddStyle(classNameCSSStyle + " {display: none !important}");
}
/** @param classNames - a list of classes
 *  Picks the first element that has all the classes and
 *  hides it (set CSS: display=none)
 */
// function setDisplayNone(classNames){
//         // Sometimes this doesn't work. Maybe it's trying to set the display property before the document is created?
// 	let domElement = document.getElementsByClassName(classNames)[0];
//         domElement.style.display = "none";
// }

// //Hide these elements
// setDisplayNone("_yb_1yy9m _yb_m085o"); // Gray Bar (Home/Mail/News/Finance) (top)
// // setDisplayNone("D_F o_v p_R I_T"); // Contacts/Calendar/Settings bar (right)

// //Shorten the height of the purple header (top)
// let purpleHeaderElement = document.getElementsByClassName("H_3n1j3")[0];
// purpleHeaderElement.style.height = "75px";


// /*
//  * Hide ads in the middle of your inbox
//  * Yahoo uses hard-coded inline styling to pad each row,
//  * so removing the gap isn't that easy.
//  * We'll leave the gap for now.
//  */
// let inboxAdList = document.querySelectorAll('[data-test-id^="pencil-ad-messageList"]');

// inboxAdList.forEach(
//         (adRow) => adRow.parentNode.parentNode.style.display="none"
// );

console.log("done");