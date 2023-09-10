/**
 * Yahoo Screen Space Saver
 * Firefox plugin that removes ads on Yahoo Mail and frees some space for smaller screens
 */

// Note: In `manifest.json`, be sure to load the other JS files
// before `main.js`, so that the imported functions actually exist!

// hideWithCss.js
hideUpperGrayBanner();
hideEmailMessageAds();
hideInboxBetweenEmailAds();

// yahooScreenSpaceSaver.user.js
moveContactCalendarSettingsToolbar();
monitorForAds();
