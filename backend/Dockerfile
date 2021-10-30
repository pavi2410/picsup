FROM node:17-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production --silent

EXPOSE 4000

CMD ["npm", "start"]
