# Base image with Node.js
FROM node:16-alpine

# Install Git
RUN apk add --no-cache git

# Set the working directory for the application
WORKDIR /app

# Define the Git repository and branch as arguments
ARG REPO_URL=https://github.com/Artem-ka-create/dt-video-conference-app.git
ARG BRANCH=master

# Clone or pull the latest code
RUN if [ -d "/app/.git" ]; then \
        echo "Updating existing repository"; \
        git --work-tree=/app --git-dir=/app/.git pull origin ${BRANCH}; \
    else \
        echo "Cloning repository"; \
        git clone -b ${BRANCH} ${REPO_URL} /app; \
    fi

# Install dependencies and build the project
RUN npm install
RUN npm run build

# Install 'serve' to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the application on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
