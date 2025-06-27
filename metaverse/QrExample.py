import qrcode

link_to_encode = "https://www.google.com"

# Create a QRCode object
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

# Add the link data
qr.add_data(link_to_encode)
qr.make(fit=True)

# Generate and save the QR code image
img = qr.make_image(fill_color="black", back_color="white")
img.save("google_qr_code.png")

print(f"QR code for '{link_to_encode}' saved as google_qr_code.png")