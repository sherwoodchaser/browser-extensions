document.addEventListener("DOMContentLoaded", () => {
  const payloadInput = document.getElementById("payloadInput");
  const payloadTypeInput = document.getElementById("payloadType");
  const addPayloadButton = document.getElementById("addPayload");
  const payloadTable = document.getElementById("payloadTable");

  // Load payloads from storage
  const loadPayloads = async () => {
    const { payloads } = await chrome.storage.local.get({ payloads: [] });
    payloadTable.innerHTML = "";
    payloads.forEach((payload, index) => {
      const row = document.createElement("tr");

      // Create table row with escaped payloads and payload type
      row.innerHTML = `<td>${index + 1}</td><td>${escapeHtml(
        payload.payload
      )}</td>
                          <td>${escapeHtml(payload.type)}</td>
                          <td><span class="delete-btn" data-index="${index}">X</span></td>`;
      payloadTable.appendChild(row);
    });

    // Attach delete event listeners
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deletePayload);
    });
  };

  // Add payload to storage
  const addPayload = async () => {
    const newPayload = payloadInput.value.trim();
    const payloadType = payloadTypeInput.value.trim();

    if (!newPayload) return alert("Payload cannot be empty.");
    if (!payloadType) return alert("Payload type cannot be empty.");

    const { payloads } = await chrome.storage.local.get({ payloads: [] });

    // Push the payload and type as an object
    payloads.push({ payload: newPayload, type: payloadType });

    await chrome.storage.local.set({ payloads });
    payloadInput.value = "";
    payloadTypeInput.value = "";
    loadPayloads();
  };

  // Delete payload from storage and table
  const deletePayload = async (event) => {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const { payloads } = await chrome.storage.local.get({ payloads: [] });
    payloads.splice(index, 1); // Remove the payload at the given index
    await chrome.storage.local.set({ payloads });
    loadPayloads();
  };

  // Escape HTML entities
  const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
  };

  addPayloadButton.addEventListener("click", addPayload);
  loadPayloads();
});
