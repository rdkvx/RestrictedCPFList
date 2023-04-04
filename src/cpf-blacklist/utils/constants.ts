const   repository = 'ENDERECO_REPOSITORY',
        dataSource = 'DATA_SOURCE',
        erroInterno = 'erro interno',
        invalidCpfException = 'InvalidCpfException',
        existsCpfException = 'ExistsCpfException',
        notFoundCpfException = 'NotFoundCpfException',
        cpfAlreadyExists = 'CPF already exists.',
        cpfIsNotValid = 'CPF is not valid.',
        notFoundCep = 'CPF not found.'

const cpfAlreadyExistsErr = {
        "type" : existsCpfException,
        "message" : cpfAlreadyExists
}

const invalidCepErr = {
    "type" : invalidCpfException,
    "message" : cpfIsNotValid
}

const notFoundCepErr = {
    "type" : notFoundCpfException,
    "message" : notFoundCep
}

export let utilsCpfBlacklist = {
    repository,
    dataSource,
    erroInterno,
    invalidCpfException,
    cpfAlreadyExistsErr,
    invalidCepErr,
    notFoundCepErr,
    cpfIsNotValid,
    cpfAlreadyExists,
    notFoundCep
}