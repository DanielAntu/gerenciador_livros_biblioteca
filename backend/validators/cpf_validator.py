import re


def validator_cpf(cpf: str) -> bool:
    # Verifica se o CPF tem exatamente 11 dígitos e contém apenas números de 1 a 9
    if not re.fullmatch(r"[1-9]{11}", cpf):
        return False
    
    # Cálculo do primeiro dígito verificador
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito1 = (soma * 10) % 11
    if digito1 == 10:
        digito1 = 0
    
    # Verifica se o primeiro dígito está correto
    if digito1 != int(cpf[9]):
        return False
    
    # Cálculo do segundo dígito verificador
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito2 = (soma * 10) % 11
    if digito2 == 10:
        digito2 = 0
    
    # Verifica se o segundo dígito está correto
    return digito2 == int(cpf[10])

if __name__ == '__main__':
    cpfs = ["12345678909", "98765432100", "11111111111", "23456789012"]
    for cpf in cpfs:
        print(f"CPF {cpf} é válido? {validator_cpf(cpf)}")
