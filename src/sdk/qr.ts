import QRCode from 'qrcode';

/**
 * Generate a QR code data URL for a given string (e.g., Solana Pay URL).
 * @param url - The string to encode as a QR code
 * @returns Promise<string> - Data URL of the QR code image
 */
export async function generateQrCode(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 200,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
} 