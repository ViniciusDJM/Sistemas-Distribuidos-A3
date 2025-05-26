FROM node:20-slim

# Instala dependências úteis para builds e o Prisma Client funcionar corretamente
RUN apt-get update && apt-get install -y openssl

# Cria o diretório de trabalho
WORKDIR /app

# Copia somente os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila o projeto
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de execução da aplicação
CMD ["npm", "start"]
