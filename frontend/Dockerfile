# specify the node base image with your desired version node:<version>
FROM node:22

# Set the working directory for the frontend and install dependencies
WORKDIR /app
COPY . .
# Transpile the code using Babel
RUN npm install && npm run build
## replace this with your application's default port
EXPOSE 3000
## Define the command to run your app using CMD which is required to run the container
CMD ["npm", "run", "start:prod"]

