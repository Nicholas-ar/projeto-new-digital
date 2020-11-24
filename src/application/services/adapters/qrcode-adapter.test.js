import { qrCodeAdapter } from './qrcode-adapter.js';
import { toDataURL } from 'qrcode';

describe('qrCodeAdapter', () => {
  it('Must return the expected string given a url parameter', async () => {
    const qrAdapter = new qrCodeAdapter();
    const testString = 'This is a test';
    const qrcode = await qrAdapter.generateQRCode(testString);
    const temp = await toDataURL(testString);
    expect(qrcode).toEqual(temp);
  });
});
