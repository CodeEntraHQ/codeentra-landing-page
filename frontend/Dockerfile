FROM node:alpine3.22
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install nodemon
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]