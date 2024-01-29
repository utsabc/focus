document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("focusToggle");
  const statusText = document.getElementById("status");

  // Check the saved focus mode state
  chrome.storage.sync.get("focusMode", function (data) {
    const isFocusModeOn = data.focusMode;
    toggleSwitch.checked = isFocusModeOn;
    updateStatusText(isFocusModeOn);
    sendToggleMessage(isFocusModeOn);
  });

  // Toggle the focus mode state
  toggleSwitch.addEventListener("change", function () {
    const isFocusModeOn = toggleSwitch.checked;
    updateStatusText(isFocusModeOn);
  });

  // Update the status text based on the focus mode state
  function updateStatusText(isFocusModeOn) {
    statusText.textContent = `Focus Mode: ${isFocusModeOn ? "ON" : "OFF"}`;

    // Save the state to chrome.storage.sync
    chrome.storage.sync.set({ focusMode: isFocusModeOn });
  }
});
