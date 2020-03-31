function setEnabled(enabled) {
    let status = enabled ? 'Disable' : 'Enable';
    let title = status + ' COVID Pause'
    browser.browserAction.setBadgeText({text: enabled ? '' : 'Off'});
    browser.storage.local.set({'enabled': enabled});
}

// first run: if we're not already enabled, set enabled to true
browser.storage.local.get(['enabled'], function(result) {
    let enabled = result.enabled;
    if (typeof(result.enabled) == "undefined") {
        setEnabled(true);
    }
})

browser.browserAction.onClicked.addListener(function(tab) {
    browser.storage.local.get(['enabled'], function(result) {
        setEnabled(!result.enabled);
    });
});