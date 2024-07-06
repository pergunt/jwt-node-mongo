# specify the node base image with your desired version node:<version>
FROM node:22

# Set the working directory for the server and install dependencies
WORKDIR /app
COPY . .
RUN npm i
# Transpile the code using Babel
RUN npm install && npm run build
# Expose the ports that your apps run on
EXPOSE 8080
# Define the command to run your app using CMD which is required to run the container
CMD ["node", "dist/index.js"]


