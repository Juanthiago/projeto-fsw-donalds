# FSW Donalds - Projeto de Restaurante com Compra via Token

Bem-vindo ao **FSW Donalds**, um projeto de restaurante moderno que permite aos clientes fazerem pedidos e pagamentos utilizando tokens. Este projeto foi desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS** para oferecer uma experiência de usuário rápida e responsiva.

## Visão Geral

O **FSW Donalds** é uma aplicação web que simula um sistema de pedidos de um restaurante, onde os usuários podem escolher entre diferentes opções de refeições, personalizar seus pedidos e finalizar a compra utilizando tokens. O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, escalabilidade e segurança.

## Funcionalidades Principais

- **Escolha de Refeições**: Os usuários podem selecionar entre diversas opções de refeições, como hambúrgueres, acompanhamentos e bebidas.
- **Personalização de Pedidos**: Os clientes podem personalizar seus pedidos de acordo com suas preferências.
- **Compra via Token**: O sistema permite que os usuários realizem pagamentos utilizando tokens, oferecendo uma forma segura e eficiente de finalizar a compra.
- **Interface Responsiva**: A interface foi desenvolvida com Tailwind CSS, garantindo uma experiência consistente em diferentes dispositivos.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código, melhorando a segurança e a manutenibilidade.
- **Tailwind CSS**: Framework CSS utilitário para criar designs responsivos e personalizados de forma eficiente.
- **Prisma**: ORM (Object-Relational Mapping) para gerenciar o banco de dados de forma segura e eficiente.
- **Stripe**: Plataforma de pagamentos utilizada para processar transações com tokens.

## Configuração do Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/fsw-donalds.git
   cd fsw-donalds

   ```

2. Instale as dependências:

   npm install
   ou
   yarn install

3. Configure as variáveis de ambiente:

   Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco"
   STRIPE_SECRET_KEY="sua-chave-secreta-do-stripe"
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY="sua-chave-publica-do-stripe"
   STRIPE_WEBHOOK_SECRET="seu-segredo-de-webhook-do-stripe"

4. Execute as migrações do Prisma:

   npx prisma migrate dev --name init

5. Inicie o servidor de desenvolvimento:

   npm run dev
   ou
   yarn dev

6. Acesse a aplicação no navegador:

   http://localhost:3000

## Estrutura do Projeto

    /components: Contém os componentes reutilizáveis da aplicação.

    /pages: Define as rotas da aplicação com base na estrutura de arquivos.

    /prisma: Contém o esquema do banco de dados e as migrações.

    /styles: Inclui estilos globais e personalizados.

    /utils: Funções utilitárias e helpers.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga os passos abaixo:

    Faça um fork do repositório.

    Crie uma branch para sua feature (git checkout -b feature/nova-feature).

    Commit suas mudanças (git commit -m 'Adiciona nova feature').

    Push para a branch (git push origin feature/nova-feature).

    Abra um Pull Request.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

    Email: juanthiago20144@hotmail.com

    GitHub: Juanthiago
