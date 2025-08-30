# Webpage Auto-Refresher – Chrome Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Autorefresher** is a smart Chrome extension that automatically detects critical webpage errors (like **500 Internal Server Error**) and refreshes the page until it's back to normal.

---

## Features

- Detects server errors (e.g., 500, 502, 503, 504)
- Automatically refreshes the page at intervals
- Stops refreshing once the page loads successfully
- Lightweight and efficient
- Easy to install and use

---

## Installation Guide

1. **Download or clone this repository:**
   
   ```
   git clone https://github.com/dinesh2068/WebPage_Auto_Refresher.git
   
   ```

2. **Open Chrome and go to:**

    chrome://extensions/
    Enable Developer mode (top right).

3. Click Load unpacked and select the **Autorefresher** folder.


## How It Works

1. The extension monitors the network response or page content.

2. If a known error (like HTTP 500) is detected, it waits a few seconds and refreshes.

3. It keeps checking until the error is resolved.


## License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this extension with proper credit.


## Credits

Created by **DINESHKARTHIK N** – 2025  
Feel free to contribute or fork the project!
