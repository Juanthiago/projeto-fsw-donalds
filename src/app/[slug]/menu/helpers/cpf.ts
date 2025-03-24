export const removeCpfPunctuation = (cpf: string) => {
  return cpf.replace(/[\.\-]/g, "");
};

export const isValidCpf = (cpf: string): boolean => {
  if (typeof cpf !== "string") {
    throw new Error("Input must be a string");
  }

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const calculateVerifier = (cpf: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < factor - 1; i++) {
      sum += parseInt(cpf.charAt(i)) * (factor - i);
    }
    const verifier = (sum * 10) % 11;
    return verifier === 10 ? 0 : verifier;
  };

  const firstVerifier = calculateVerifier(cpf, 10);
  if (firstVerifier !== parseInt(cpf.charAt(9))) {
    return false;
  }

  const secondVerifier = calculateVerifier(cpf, 11);
  return secondVerifier === parseInt(cpf.charAt(10));
};
