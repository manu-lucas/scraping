FROM node

WORKDIR /app

# Assuming the file you want to add is in the same directory as the Dockerfile.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]