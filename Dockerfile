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



# Use an official Node.js runtime as the base image
FROM public.ecr.aws/docker/library/node:20-slim as build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies using pnpm
RUN npm install -g pnpm && \
    pnpm install
# Copy the rest of the application code to the working directory
COPY . .

RUN pnpm build 
FROM public.ecr.aws/nginx/nginx:stable-alpine3.19-slim
# Copy the custom NGINX configuration file to the container
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Set the working directory in the container
WORKDIR /usr/share/nginx/html
# Copy the built files from the previous stage to the NGINX directory
COPY --from=build /app/dist .
# Expose pocdrt 80 to allow outside access
EXPOSE 80
# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
# CMD ["bash"]

