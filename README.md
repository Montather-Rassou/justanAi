# PDF to Word Chrome Extension

This repository contains a simple Chrome extension that converts PDF files to Word (.docx) documents directly in the browser.

## Usage

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** and click **Load unpacked**.
4. Select this project folder to install the extension.
5. Click the extension icon, choose a PDF file, and press **Convert** to download a Word document.

The extension uses [pdf.js](https://mozilla.github.io/pdf.js/) to read PDF files and the [docx](https://github.com/dolanmiu/docx) library to generate Word documents. Required libraries are bundled in the `lib` directory.
