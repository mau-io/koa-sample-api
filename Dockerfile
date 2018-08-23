FROM node:8.2.0-slim

# Define working directory.
WORKDIR /usr/app/

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN yarn install
RUN npm install -g nodemon mocha


# Define default command.
CMD ["bash"]