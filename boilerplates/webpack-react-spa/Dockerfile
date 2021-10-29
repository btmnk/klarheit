FROM node:16-alpine as buildstep	
ARG environment
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --env config=$environment

FROM nginx:alpine
COPY --from=buildstep /app/dist /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]