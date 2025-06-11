# Sistemas Distribuídos – A3  
*Trabalho desenvolvido por Vinicius Maciel e Marina Mara Velozo*

## Pré-requisitos

- Node.js v20.x  
- Docker e Docker Compose  
- Git

## Começando

### Clonar o repositório

```bash
git clone https://github.com/ViniciusDJM/Sistemas-Distribuidos-A3.git
cd rest-api
```

### Usando Docker (recomendado)

1. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação e o banco de dados PostgreSQL:

```bash
docker-compose up -d
```

A API estará disponível em: http://localhost:3000

### Configuração Manual

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais do banco de dados
```

3. Execute as migrações do banco de dados:

```bash
npm run prisma:migrate
```

4. Popule o banco de dados com os dados:

```bash
npm run prisma:seed
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Documentação da API

A documentação gerada pelo Swagger estará disponível em: http://localhost:3000/api-docs quando o servidor estiver rodando.

## Endpoints da API

### Usuários

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter usuário por ID
- `POST /users` - Criar um novo usuário
- `PUT /users/:id` - Atualizar um usuário (atualização completa)
- `PATCH /users/:id` - Atualizar um usuário (atualização parcial)
- `DELETE /users/:id` - Deletar um usuário

### Produtos

- `GET /products` - Listar todos os produtos
- `GET /products/:id` - Obter produto por ID
- `POST /products` - Criar um novo produto
- `PUT /products/:id` - Atualizar um produto (atualização completa)
- `PATCH /products/:id` - Atualizar um produto (atualização parcial)
- `DELETE /products/:id` - Deletar um produto

### Código sob demanda

- `GET /scripts/cache-buster.js` - Obter JavaScript para bust de cache (com header Accept: application/javascript)

## Exemplos de Requisições

### Criar um Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@example.com", "password": "senha123"}'
```

### Listar todos os produtos


```bash
curl -X GET http://localhost:3000/products
```

### Atualizar um produto

```bash
curl -X PUT http://localhost:3000/products/[product-id] \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Product", "description": "New description", "price": 99.99}'
```

## Rodando os testes

```bash
# Roda todos os testes
npm test

# Todo todos os testes com cobertura
npm run test:coverage
```

## Estrutura do projeto
src/
├── @types/ # Arquivos de declaração TypeScript
├── config/ # Arquivos de configuração
├── controllers/ # Camada de controladores
├── middlewares/ # Funções middleware
├── repositories/ # Camada de acesso a dados
├── routes/ # Definições de rotas
├── services/ # Camada de lógica de negócio
├── utils/ # Funções utilitárias
├── app.ts # Configuração da aplicação Express
└── server.ts # Ponto de entrada do servidor

prisma/
├── migrations/ # Migrações do banco de dados
├── schema.prisma # Esquema Prisma
└── seed.ts # Script de povoamento
