FROM node:12

# RUN apt-get update \
#   && apt-get clean \
#   && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# RUN groupadd -g 799 nyu && \
#     useradd -r -u 999 -g nyu nyu

# Set up a working folder and install the pre-reqs
WORKDIR /usr/src/socket-io-server

COPY package*.json ./

RUN npm install

# USER nyu

# Bundle app source
COPY . .

CMD [ "node", "app.js" ]
