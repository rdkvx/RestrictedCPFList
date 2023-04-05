## Description

Desafio Tecnico Backend Max Milhas

O desafio foi desenvolvido utilizando Ubuntu, NodeJS, NestJS, Typescript, Swagger e MySQL dockerizado.

Utilizei algumas das boas práticas de desenvolvimento, seguindo principios de clean code,
separando as responsabilidades, dando nomes claros de variáveis e funções além do uso de 
variáveis de ambiente, para não expor informações sensíveis da aplicação, como informações
para acessar o banco de dados.

Eu poderia ter escrito o código em Java Springboot sem problemas, visto que a vaga é para Java,
porém a escolha do Node como linguagem e Nest como framework foi feita por familiaridade
com a tecnologia, pois venho utilizando em projetos recentes. Como o tempo do desafio não é
tão longo, preferi usar algo que já domino e venho usando, apenas para ganhar tempo.

## Rodando a aplicação

```bash
# building a base de dados
$ abra o script docker-compose.yml e então clique com o botão direito do mouse e então em compose up. (O docker precisa estar instalado)

# carregando as variaveis de ambiente necessárias para rodar o projeto
$ abra o terminal e escreva o comando "source .env"

# rodando o projeto
$ npm run start

# abrindo a doc
$ localhost:3000/docs

# acessando a API
$ localhost:3000/cpf
```

## Rotas
```bash
$ Add CPF(POST) - localhost:3000/cpf - Data Params { "cpf": "64852893055" }
$ Find All CPFs(GET) -  localhost:3000/cpf
$ Check CPF(GET) - localhost:3000/cpf/${cpf}
$ Remove CPF(DELETE) - localhost:3000/cpf/${cpf}
```

## Test
```bash
# localização do teste script de teste unitario
$ Os testes unitarios estão no script cpf-blacklist.service.spec.ts

# rodando os testes
$ npm run test:watch src/cpf-blacklist/cpf-blacklist.service.spec.ts

```
