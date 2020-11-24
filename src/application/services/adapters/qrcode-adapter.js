import { toDataURL } from 'qrcode';

export class qrCodeAdapter {
  /**
   * Returns a data URI that can be used to generate a qr code when inputted in src of an img html tag
   * @param {string} url
   * @returns {string}
   */

  generateQRCode(url) {
    toDataURL(url, (err, src) => {
      if (err) {
        return Error(err);
      }
      return src;
    });
  }
}
