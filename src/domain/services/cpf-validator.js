export default class ValidarCpf {
  // primeiro método que vamos criar é o método de limpar o cpf
  cleanCPF(cpf) {
    // retorna o cpf substituindo por nada tudo que é ponto, espaço em braco, etc...
    return cpf.replace(/\D/g, '');
  }

  // método para construir um CPF
  buildCpf(cpf) {
    // retorna um cpf formatado com ponto no lugar certo e traço também
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  // método que vai juntar o Clean e o Build cpf em um só
  formatCpf(cpf) {
    const cpfClean = this.cleanCPF(cpf);
    return this.buildCpf(cpfClean);
  }

  // método que irá validar o CPF, se foram digitados apenas números e se o tamanho está correto
  validationCpf(cpf) {
    // o regerxp que valida o cpf é
    // 3 dígitos seguidos de traço ou ponto repetiddos 3 vezes
    // o match vai retornar um array, sendo o primeiro item [0] desse array o cpf formatado e validado pelo regexp
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);

    // abaixo verificamos se o matchCpf é igual ao CPF validado e passado para a função
    // se eles forem diferentes um 'false' vai retornar
    // no matchCpf && estamos verificando se matchCpf é um array, ou se ao menos possui um array com o cpf completo
    // ou seja, se não retornou um null do match acima
    return matchCpf && matchCpf[0] === cpf;
  }

  /**
   * @description - validar composição de dígitos do CPF
   * @see - 'https://www.geradorcpf.com'
   */
  validateCompositionCpf(cpf) {
    const cpfLimpo = this.cleanCPF(cpf);

    if (cpfLimpo === '') return false;

    // Elimina CPFs invalidos conhecidos
    if (
      cpfLimpo.length != 11 ||
      cpfLimpo == '00000000000' ||
      cpfLimpo == '11111111111' ||
      cpfLimpo == '22222222222' ||
      cpfLimpo == '33333333333' ||
      cpfLimpo == '44444444444' ||
      cpfLimpo == '55555555555' ||
      cpfLimpo == '66666666666' ||
      cpfLimpo == '77777777777' ||
      cpfLimpo == '88888888888' ||
      cpfLimpo == '99999999999'
    )
      return false;

    // Valida 1° digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(cpfLimpo.charAt(9))) return false;

    // Valida 2° digito
    let addSecond = 0;
    for (let item = 0; item < 10; item++)
      addSecond += parseInt(cpfLimpo.charAt(item)) * (11 - item);

    let revSecond = 11 - (addSecond % 11);
    if (revSecond == 10 || revSecond == 11) revSecond = 0;

    if (revSecond != parseInt(cpfLimpo.charAt(10))) return false;

    return true;
  }

  validate(cpf) {
    return this.validateCompositionCpf(cpf);
  }
}
