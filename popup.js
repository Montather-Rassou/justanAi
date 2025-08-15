const fileInput = document.getElementById('pdf-file');
const convertBtn = document.getElementById('convert-btn');

convertBtn.addEventListener('click', async () => {
  if (!fileInput.files.length) {
    alert('Please select a PDF file first.');
    return;
  }
  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();

  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('lib/pdf.worker.min.js');
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const paragraphs = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    const text = strings.join(' ');
    paragraphs.push(new docx.Paragraph(text));
  }

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await docx.Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name.replace(/\.pdf$/i, '') + '.docx';
  a.click();
  URL.revokeObjectURL(url);
});
