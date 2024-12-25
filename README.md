# Payloads Manager Chrome Extension

Payloads Manager is a simple and efficient Chrome extension designed for storing and managing payloads for testing purposes. It allows you to quickly add payloads, categorize them by type, and insert them into input fields on any website with ease.

---

## Features

- **Manage Payloads**: Store payloads in a table with their types.
- **Easy Addition**: Add new payloads and their types directly through the extension.
- **Quick Access**: Use the context menu to insert payloads into input fields on any website.

---

## How It Works

### Extension Interface

1. **Table of Payloads**:
   - Displays the payloads, their types, and provides an option to delete any payload.

2. **Inputs and Button**:
   - **First Input**: Enter the payload.
   - **Second Input**: Enter the type of payload (e.g., `xss`, `sqli`).
   - **Add Payload Button**: Click to add the payload to the table.

### Using the Context Menu

1. Right-click on any input field on a website.
2. Select **"All Payloads"** from the context menu.
3. Choose a payload from the list to insert it into the selected input field.

---

## Installation

1. Download or clone the repository:
   ```bash
   git clone https://github.com/sherwoodchaser/payloads-manager
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the folder containing the extension files.
5. The Payloads Manager extension should now appear in your browser toolbar.

---

## Usage Example

### Adding a Payload

1. Open the Payloads Manager extension.
2. Enter the payload in the first input (e.g., `"><script>alert('XSS')</script>`).
3. Enter the type in the second input (e.g., `xss`).
4. Click **Add Payload**.
5. The payload will appear in the table.

### Inserting a Payload

1. Go to any input field on a website.
2. Right-click and select **"All Payloads"** from the context menu.
3. Choose the desired payload to paste it into the input field.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact:
- **Name**: Redwan (sherwood chaser)

---

Happy testing with Payloads Manager!

