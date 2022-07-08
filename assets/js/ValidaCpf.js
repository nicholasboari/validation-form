// 705.484.450-52 070.987.720-03

class ValidaCpf {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  ehSequencia() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  geraDigito(cpfSemDigito) {
    let total = 0;
    let reverso = cpfSemDigito.length + 1;
    for (let stringNumerica of cpfSemDigito) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : 0;
  }

  generatorNewCpf() {
    const cpfSemDigito = this.cpfLimpo.slice(0, -2);
    const digito1 = this.geraDigito(cpfSemDigito);
    const digito2 = this.geraDigito(cpfSemDigito + digito1);
    this.novoCpf = cpfSemDigito + digito1 + digito2;
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.ehSequencia()) return false;
    this.generatorNewCpf();

    return this.novoCpf === this.cpfLimpo;
  }
}

// const validaCpf = new ValidaCpf("070.987.720-03");
// console.log(validaCpf.valida());

// if (validaCpf.valida()) {
//   console.log("Cpf valido");
// } else {
//   console.log("Cpf invalido");
// }