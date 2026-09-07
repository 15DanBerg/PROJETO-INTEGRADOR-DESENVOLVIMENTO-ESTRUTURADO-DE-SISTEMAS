# GaragemCar — MVP

MVP do sistema de aluguel de garagens descrito no Projeto Integrador. Permite:

- Cadastrar (anunciar) uma vaga de garagem, com modalidades por hora, diária e/ou mensal;
- Buscar e filtrar vagas por modalidade ou por texto (endereço/bairro);
- Ver detalhes de uma vaga e iniciar contato via WhatsApp.

Fora do escopo deste MVP (ver seção 2.4 do documento do projeto): pagamento online,
autenticação completa de usuários, upload de imagens (usa-se URL de foto) e mapa
interativo — tudo isso fica para as próximas iterações.

## Stack

- **Frontend + API**: Next.js 14 (App Router), com API Routes fazendo o papel de
  backend simplificado para o MVP.
- **Banco de dados**: PostgreSQL 16, acessado via Prisma ORM.
- **Orquestração**: Docker Compose (serviço `web` + serviço `db`).

## Como rodar

```bash
docker compose up --build
```

- Aplicação: http://localhost:3000
- Banco de dados: `localhost:5433` (usuário/senha/banco: `garagemcar`)

Na primeira subida, o container `web` executa `prisma db push` automaticamente
para criar as tabelas no banco antes de iniciar o servidor Next.js.

Para derrubar tudo (mantendo os dados):

```bash
docker compose down
```

Para derrubar e apagar os dados do banco:

```bash
docker compose down -v
```

## Estrutura

```
docker-compose.yml
frontend/
  Dockerfile
  prisma/schema.prisma      # modelo de dados (Vaga)
  src/app/page.js           # busca e listagem de vagas
  src/app/anunciar/page.js  # formulário de cadastro de vaga
  src/app/vagas/[id]/page.js# detalhes da vaga
  src/app/api/vagas/        # API REST (GET/POST vagas, GET por id)
```

## Próximos passos (fora do MVP)

- Autenticação de usuários (proprietário x motorista) com Keycloak;
- Geolocalização e mapa (OpenStreetMap + Leaflet);
- Upload real de imagens (MinIO);
- Reserva em tempo real e histórico de transações;
- Sistema de avaliações.
