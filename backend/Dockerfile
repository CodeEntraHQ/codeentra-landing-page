FROM node:24.1.0-slim
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install nodemon
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
