/**
 * @abstract
 * @name ImageUploaderService
 * @method execute
 */
export class ImageUploaderService {
  constructor() {
    throw Error('Not implemented');
  }

  /**
   * Validates the given input retuning a boolean.
   * @param {String} imageName
   * @param {function} [makeAwsParams]
   * @returns {Promise<String>}
   */
  async execute(imageName, makeAwsParams) {
    throw Error('Not implemented');
  }
}
