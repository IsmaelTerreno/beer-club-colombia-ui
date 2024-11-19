# Use the official Node.js image as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable to production
ENV NODE_ENV=production

# Build the Next.js application without linting
RUN npm run build -- --no-lint

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Building the app with 'next build' before starting the production server.
CMD ["npm","run","build"]

# Start the Next.js application
CMD ["npm", "run", "start"]
