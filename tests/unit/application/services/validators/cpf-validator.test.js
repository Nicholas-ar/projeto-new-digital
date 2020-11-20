import { InvalidParameterError } from '../../../../../src/domain/errors';
import ValidarCpf from '../../../../../src/application/services/validators/cpf-validator';

describe('CPF validator', () => {
  it.each`
    paramCPF         | expectedResult
    ${'12595312790'} | ${true}
    ${'11111111111'} | ${new InvalidParameterError('cpf')}
    ${'22222224324'} | ${new InvalidParameterError('cpf')}
    ${'39106932452'} | ${true}
    ${'87744173392'} | ${true}
    ${'25614534806'} | ${true}
  `(
    'must return $expectedResult when te user inputs $paramCPF',
    ({ paramCPF, expectedResult }) => {
      const isValid = new ValidarCpf().validate(paramCPF);
      expect(isValid).toEqual(expectedResult);
    }
  );
});
