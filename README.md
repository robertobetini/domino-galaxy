# Domino Galaxy

## O que você precisa saber

1. Servidor HTTP
2. Servidor WS (WebSocket)

HTTP você provavelmente já conhece um pouco, mas WS provavelmente nunca viu

Resumindo bem, WebSocket é um tipo de protocolo de comunicação baseado em client-servidor, mas diferente do HTTP, ele permite que os servidores também enviem "requisições" aos clientes.

HTTP:

```
+----------+                   +----------+
|          | ---requisição---> |          |
| Cliente  |                   | Servidor |
|          | <----resposta---- |          |
+----------+                   +----------+
```

O cliente envia um "comando" e o servidor executa e responde.
O servidor nunca vai enviar um comando para o cliente, somente executar o que o cliente pediu.

WS:

```
+----------+                   +----------+
|          | ----mensagem----> |          |
| Cliente  |                   | Servidor |
|          | <----resposta---- |          |
+----------+                   +----------+

+----------+                   +----------+
|          | ----mensagem----> |          |
| Servidor |                   | Cliente  |
|          | <----resposta---- |          |
+----------+                   +----------+
```

Tanto o cliente podem enviar mensagens um ao outro, executar comandos e responder, é como se fosse uma conversa.

## Rodando o projeto

1. Instalar NodeJS: https://nodejs.org/en
2. No terminal, instalar dependências rodando `npm install` na pasta raiz do projeto
3. Com as dependências instaladas, rodar
    3.1. `npm run start` - roda os servidores http e ws
    3.2. ou `npm run build` e depois `npm run dev` - roda os servidores http e ws, reiniciando automaticamente a cada alteração feita nos arquivos
         o comando de build faz o bundle dos arquivos, resolve dependências dos arquivos js, faz uma minificação do script, etc, e disponibiliza na pasta
         `/dist`

## Estrutura

O projeto está dividido em 3 partes:

1. `server` - é a parte dedicada a código do apenas servidor
2. `public` - é a parte dedicada a servir ao usuário (páginas html, javascript client-side, imagens, ícones, etc.)
3. `shared` - é a parte dedicada a código que será utilizado tanto em server-side quanto em client-side (para evitar duplicação de código)
