import { ValidarCpf } from '../../../../../src/application/services/validators/cpf-validator';
import { InvalidParameterError } from '../../../../../src/domain/errors';

describe('CPF validator', () => {
  it.each`
    paramCPF         | expectedResult
    ${'12595312790'} | ${null}
    ${'11111111111'} | ${new InvalidParameterError('cpf')}
    ${'22222224324'} | ${new InvalidParameterError('cpf')}
    ${'39106932452'} | ${null}
    ${'87744173392'} | ${null}
    ${'25614534806'} | ${null}
  `(
    'must return $expectedResult when te user inputs $paramCPF',
    ({ paramCPF, expectedResult }) => {
      const isValid = new ValidarCpf().validate(paramCPF);
      expect(isValid).toEqual(expectedResult);
    }
  );
});
