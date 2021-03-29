module.exports = {
  apps : [{
    name: "nicolas-zanardo.com",
    script: "./dist/bin/www.js",
    instances: 'max',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
