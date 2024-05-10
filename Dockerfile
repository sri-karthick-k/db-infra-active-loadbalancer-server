FROM node:22.1.0

WORKDIR /app

ARG CACHEBUST
RUN echo $CACHEBUST

# Clone the repository and install dependencies
RUN git clone https://github.com/sri-karthick-k/db-infra-active-loadbalancer-server.git . && \
	npm install

# Expose the port
EXPOSE 4000

# Run the application
CMD ["node", "index.js"]
