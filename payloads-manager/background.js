// Create the main context menu and dynamically load payloads
chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

// Dynamically create the "All Payloads" menu and its submenus
function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "all-payloads",
      title: "All Payloads",
      contexts: ["editable"], // Limit to editable areas
    });

    chrome.storage.local.get({ payloads: [] }, ({ payloads }) => {
      payloads.forEach((payload, index) => {
        chrome.contextMenus.create({
          id: `payload-${index}`,
          parentId: "all-payloads",
          title: `${payload.payload} (Type: ${payload.type})`,
          contexts: ["editable"],
        });
      });
    });
  });
}

// Listen for changes to storage and update the menu dynamically
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.payloads) {
    createContextMenu();
  }
});

// Handle clicks on context menu items
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId.startsWith("payload-")) {
    const { payloads } = await chrome.storage.local.get({ payloads: [] });
    const index = parseInt(info.menuItemId.split("-")[1], 10);
    const payload = payloads[index];

    if (tab?.id !== undefined) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: insertPayload,
        args: [payload.payload], // Only send the payload text
      });
    } else {
      console.error("No active tab found.");
    }
  }
});

// Insert the payload into the focused input
function insertPayload(payload) {
  const activeElement = document.activeElement;

  if (!activeElement) {
    alert("No editable field is focused.");
    return;
  }

  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA"
  ) {
    const start = activeElement.selectionStart || 0;
    const end = activeElement.selectionEnd || 0;
    const value = activeElement.value;

    activeElement.value = value.slice(0, start) + payload + value.slice(end);
    activeElement.selectionStart = activeElement.selectionEnd =
      start + payload.length;

    activeElement.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (activeElement.isContentEditable) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(payload));
    selection.collapseToEnd();
  } else {
    alert("The selected element is not editable.");
  }
}
