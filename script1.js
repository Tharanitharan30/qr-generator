document.addEventListener('DOMContentLoaded', function() {
    const qrInput = document.getElementById('qr-input');
    const qrColor = document.getElementById('qr-color');
    const qrSize = document.getElementById('qr-size');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const qrCodeDiv = document.getElementById('qr-code');
    const statusMessage = document.getElementById('status-message');
    const charCount = document.getElementById('char-count');
    const contentType = document.getElementById('content-type');
    const sizeLabel = document.getElementById('size-label');
    const colorLabel = document.getElementById('color-label');
    const templateButtons = document.querySelectorAll('.chip-btn');
    
    let currentQRCode = null;
    
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    resetBtn.addEventListener('click', resetGenerator);
    qrInput.addEventListener('input', updateInsights);
    qrColor.addEventListener('input', handleStyleChange);
    qrSize.addEventListener('change', handleStyleChange);

    templateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            qrInput.value = button.dataset.template;
            updateInsights();
            generateQRCode();
        });
    });

    updateInsights();
    
    function generateQRCode() {
        const text = qrInput.value.trim();
        if (!text) {
            statusMessage.textContent = 'Add some text or a link to generate your QR code.';
            return;
        }
        
        qrCodeDiv.innerHTML = '';
        
        const color = qrColor.value.substring(1);
        const size = parseInt(qrSize.value);
        
        currentQRCode = new QRCode(qrCodeDiv, {
            text: text,
            width: size,
            height: size,
            colorDark: `#${color}`,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.disabled = false;
        statusMessage.textContent = 'QR code generated and ready to download.';
        updateInsights();
    }
    
    function downloadQRCode() {
        if (!currentQRCode) {
            statusMessage.textContent = 'Generate a QR code before downloading it.';
            return;
        }
        
        const canvas = qrCodeDiv.querySelector('canvas');
        if (!canvas) {
            statusMessage.textContent = 'Preview not available yet. Please generate again.';
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        statusMessage.textContent = 'Download started for qrcode.png.';
    }

    function resetGenerator() {
        qrInput.value = '';
        qrColor.value = '#0f172a';
        qrSize.value = '220';
        qrCodeDiv.innerHTML = getEmptyStateMarkup();
        currentQRCode = null;
        downloadBtn.disabled = true;
        statusMessage.textContent = 'Workspace reset. You can start a new QR code now.';
        updateInsights();
    }

    function handleStyleChange() {
        updateInsights();

        if (currentQRCode && qrInput.value.trim()) {
            generateQRCode();
        }
    }

    function updateInsights() {
        const text = qrInput.value.trim();
        charCount.textContent = String(text.length);
        contentType.textContent = detectContentType(text);
        sizeLabel.textContent = `${qrSize.value} x ${qrSize.value}`;
        colorLabel.textContent = qrColor.value.toUpperCase();
    }

    function detectContentType(text) {
        if (!text) {
            return 'Text';
        }

        if (/^https?:\/\//i.test(text)) {
            return 'URL';
        }

        if (/^mailto:/i.test(text) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            return 'Email';
        }

        if (/^tel:/i.test(text) || /^\+?[\d\s-]{7,}$/.test(text)) {
            return 'Phone';
        }

        return 'Text';
    }

    function getEmptyStateMarkup() {
        return `
            <div class="empty-state">
                <span class="empty-icon">+</span>
                <p>Your QR preview will appear here.</p>
            </div>
        `;
    }
});
