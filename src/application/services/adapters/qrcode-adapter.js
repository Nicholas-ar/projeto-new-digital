import { toDataURL } from 'qrcode';

export class qrCodeAdapter {
  /**
   * Returns a data URI that can be used to generate a qr code when inputted in src of an img html tag
   * @param {string} url
   * @returns {string}
   */

  generateQRCode(url) {
    return toDataURL(url);
  }
}
