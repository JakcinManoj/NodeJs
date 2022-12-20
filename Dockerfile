FROM node:19
WORKDIR /app
COPY package.json /app 
RUN npm install
RUN npm install nodemon --save-dev
RUN npm install express 
RUN npm install express ejs pug express-handlebars 
COPY . /app
CMD [ "npm", "start" ]
EXPOSE 3000