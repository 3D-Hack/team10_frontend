FROM node:16
ADD . /app
WORKDIR /app
RUN npm install
RUN chmod -R a+w /app
ARG COLLECT_USAGE_DATA=false
RUN echo "{\"collectUsageData\": $COLLECT_USAGE_DATA}" > usage-data-config.json
EXPOSE 3000
CMD [ "node", "start.js"]