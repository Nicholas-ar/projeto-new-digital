import ValidarCpf from '../../../src/helpers/cpf-validator';

describe('CPF validator', () => {
  it.each`
    paramCPF         | expectedResult
    ${'12595312790'} | ${true}
    ${'11111111111'} | ${false}
    ${'22222224324'} | ${false}
    ${'39106932452'} | ${true}
    ${'87744173392'} | ${true}
    ${'25614534806'} | ${true}
  `(
    'must return $expectedResult when te user inputs $paramCPF',
    ({ paramCPF, expectedResult }) => {
      const isValid = new ValidarCpf(paramCPF).validate(paramCPF);
      expect(isValid).toEqual(expectedResult);
    }
  );
});
