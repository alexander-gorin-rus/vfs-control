# FROM node:16

# WORKDIR /usr/src/app

# COPY ./package*.json ./
# # COPY ./package-lock.json ./

# EXPOSE 80

# RUN npm install -g @angular/cli
# RUN npm install

# COPY . .
# CMD ["npm", "start"]

ARG WORK_DIR=/build

FROM node:16-alpine as builder

ARG WORK_DIR

ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli
RUN npm install

COPY . ${WORK_DIR}

RUN ng build -- prod

FROM nginx:latest

ARG WORK_DIR

COPY --from=builder ${WORK_DIR}/dist/client /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g "deamon off;"
