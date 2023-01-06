# **Desafio-API**

1° desafio do programa de bolsas node js, realizado pela empresa Compass!

A idéia do desafio era realizar uma API com os comandos básicos de CRUD (Create, Read, Update e Delete), recebendo dados de um arquivo json ou de um banco de dados (opcional). A idéia do meu projeto foi criar uma "loja" de colecionáveis de super heróis, onde todos os dados dentro do arquivo json seriam os produtos, com seus respectivos id's, nomes, tipos e preços. E por último, o tipo de acesso seria dedicado ao "dono da loja", que poderia realizar os comandos para a manipulação dos produtos no momento em que quisesse!

Para a realização do projeto utilizei os seguintes arquivos:
*index.js: Para armazenar todo o código
*data.json: Para guardar o array com o conteúdo da loja

## **INDEX.JS**

Nas primeiras linhas foi realizada a instanciação dos módulos mais importantes como fs e express, o middleware de persistência do json para conseguirmos pegar os requests, e por último, o readFile "heroes" para ser manipulado durante o desenvolvimento.

### **CRUD**

_Get_ : Foi desenvolvido um total de 3 gets que tinham respectivamente os seguintes objetivos. Definir uma rota padrão para sinalizar a entrada do usuário no servidor (getAcess), outra rota para retornar todo o conteúdo do array (getAll), e por fim uma rota para resgatar um colecionável específico a partir de um Id na URL(getHero).

_Create_ : Fiz um "post" que tinha como objetivo criar um colecionável passando um novo id através do tamanho do array, + 1. OBS: A idéia era permitir que também fosse criado colecionáveis com o mesmo nome, tipo e etc, por ter a possibilidade de existir mais de uma unidade de um mesmo produto.

_Update_ : Foi usado um "patch" para atualizar os dados do objeto original do arquivo json, com os dados passados no request body. Para isso, é inserido o Id do colecionável que irá ser alterado e através dele achamos o respectivo objeto no json, e por fim, atribuimos o conteudo do body para o objeto json com o respectivo índice.

_Delete_ : Usamos uma rota "delete" para apagar um colecionável por conta de venda ou qualquer outro motivo! Nessa operação, usei um método chamado splice que começa a retirar o conteudo a partir de um índice e de quantas posições especificamos. Após isso ele retorna um novo array que foi usado para mostrar ao usuário o que foi apagado.

Por fim, foi criado um servidor na porta 3000 que mostra uma mensagem para termos um retorno sobre a atividade do servidor!
