module.exports = {
  apps : [{
    name: "nicolas-zanardo.com",
    script: "./dist/bin/www.js",
    instances: 'max',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: "production",
    },
    env_development: {
      NODE_ENV: "development",
    }
  }]
}
