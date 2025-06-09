// QR Code Generator Script
const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const qrcodeDiv = document.getElementById('qrcode');
const copyBtn = document.getElementById('copyBtn');

// Generate QR Code
generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  qrcodeDiv.innerHTML = '';
  if (text) {
    new QRCode(qrcodeDiv, {
      text: text,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    copyBtn.disabled = false;
  } else {
    alert('Please enter a URL or text!');
    copyBtn.disabled = true;
  }
});

// Copy QR Code Image to Clipboard
copyBtn.addEventListener('click', () => {
  const qrCanvas = qrcodeDiv.querySelector('canvas');
  if (qrCanvas) {
    qrCanvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]).then(() => {
        alert('QR code image copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy image:', err);
        alert('Failed to copy image. Please try again or right-click to save manually.');
      });
    });
  } else {
    alert('No QR code to copy. Generate a QR code first!');
  }
});

// Disable copy button initially
copyBtn.disabled = true;