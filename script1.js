document.addEventListener('DOMContentLoaded', function() {
    const qrInput = document.getElementById('qr-input');
    const qrColor = document.getElementById('qr-color');
    const qrSize = document.getElementById('qr-size');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeDiv = document.getElementById('qr-code');
    
    let currentQRCode = null;
    
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    
    function generateQRCode() {
        const text = qrInput.value.trim();
        if (!text) {
            alert('Please enter some text or URL');
            return;
        }
        
        // Clear previous QR code
        if (currentQRCode) {
            qrCodeDiv.innerHTML = '';
        }
        
        const color = qrColor.value.substring(1); // Remove # from color
        const size = parseInt(qrSize.value);
        
        currentQRCode = new QRCode(qrCodeDiv, {
            text: text,
            width: size,
            height: size,
            colorDark: `#${color}`, // Corrected this line
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    function downloadQRCode() {
        if (!currentQRCode) {
            alert('Please generate a QR code first');
            return;
        }
        
        const canvas = qrCodeDiv.querySelector('canvas');
        if (!canvas) {
            alert('Could not find QR code image');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});
