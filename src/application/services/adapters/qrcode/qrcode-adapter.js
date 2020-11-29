const qrcode = require('qrcode');

class qrCodeAdapter {
  /**
   * Returns a data URI that can be used to generate a qr code when inputted in src of an img html tag
   * @param {string} url
   * @returns {Promise<String>}
   */

  async generateQRCode(url) {
    const qrUrl = await qrcode.toDataURL(url);
    return qrUrl;
  }
}

module.exports = { qrCodeAdapter };
