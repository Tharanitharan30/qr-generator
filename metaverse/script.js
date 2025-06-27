function generateQR() {
  const text = document.getElementById("qrText").value;
  const size = parseInt(document.getElementById("qrSize").value);
  const dark = document.getElementById("colorDark").value;
  const light = document.getElementById("colorLight").value;
  const container = document.getElementById("qrcode");

  if (text.trim() !== "") {
    new QRCode(container, {
      text: text,
      width: size,
      height: size,
      colorDark: dark,
      colorLight: light
    });
  } else {
    alert("Please enter text or URL.");
  }
}

function downloadQR() {
  const img = document.querySelector("#qrcode img");
  if (img) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qr_code.png";
    link.click();
  } else {
    alert("Please generate the QR code first.");
  }
}