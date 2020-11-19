import { MissingParameterError } from '../../../domain/errors';
import { RequiredFieldValidator } from './required-field-validator';

const makeSut = () => new RequiredFieldValidator('field');

describe('RequiredFieldValidator', () => {
  it('must return a MissingParameterError if validate returns false', () => {
    const sut = makeSut();
    const error = sut.validate({ notField: 'not_field' });
    expect(error).toEqual(new MissingParameterError('field'));
  });

  it('must return null if validation succeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'field' });
    expect(error).toBeNull();
  });
});
