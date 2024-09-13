# # # build environment
# FROM public.ecr.aws/docker/library/node:20-slim as build
# WORKDIR /app
# # ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# # RUN npm ci --silent
# RUN npm install terser@3.14.1 --save-dev
# RUN npm install
# COPY . ./
# RUN npm run build


# FROM public.ecr.aws/docker/library/nginx:alpine
# WORKDIR /app
# COPY --from=build /app/build /usr/share/nginx/html
# # COPY build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# # build environment
FROM public.ecr.aws/docker/library/node:14-slim as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
# RUN npm ci --silent

# RUN npm install terser@3.14.1 --save-dev
RUN npm install
COPY . ./
RUN npm run build

FROM public.ecr.aws/docker/library/nginx:alpine
WORKDIR /app
COPY --from=build /app/build /usr/share/nginx/html
# COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

