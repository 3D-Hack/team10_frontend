FROM node:16
ADD . /app
RUN chmod a+w /app
WORKDIR /app
RUN npm install
ARG COLLECT_USAGE_DATA=false
RUN echo "{\"collectUsageData\": $COLLECT_USAGE_DATA}" > usage-data-config.json
EXPOSE 3000
CMD [ "node", "start.js"]