FROM node:14

# Create app directory
WORKDIR /usr/src/app

ENV PORT=8080

RUN npm install pm2 -g

COPY build ./build
COPY dist ./dist
COPY package.json package.json
COPY public ./public
COPY node_modules ./node_modules

EXPOSE 8080
CMD [ "node", "-r", "dotenv/config", "dist/server/index.js" ]

#sudo docker run -d -p 80:8080 --env-file run_crawler.env --name crawler-service --add-host=host.docker.internal:host-gateway public.ecr.aws/t3z6x1l1/hackathon:latest