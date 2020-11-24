import { qrCodeAdapter } from './qrcode-adapter.js';
import { toDataURL } from 'qrcode';

describe('qrCodeAdapter', () => {
  it('Must return the expected string given a url parameter', async () => {
    const qrAdapter = new qrCodeAdapter();
    const mockString = 'This is a test';
    const qrcode = await qrAdapter.generateQRCode(mockString);
    const expectedQRCode = await toDataURL(mockString);
    expect(qrcode).toEqual(expectedQRCode);
  });
});
