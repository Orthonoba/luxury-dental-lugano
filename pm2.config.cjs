// PM2 ecosystem config — for non-Docker deployments
// Usage: pm2 start pm2.config.cjs --env production
module.exports = {
  apps: [
    {
      name: 'luxurydental-app',
      script: '.next/standalone/server.js',
      cwd: '/app',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      restart_delay: 3000,
      max_restarts: 10,
      log_file: '/var/log/luxurydental/app.log',
      error_file: '/var/log/luxurydental/app-error.log',
      merge_logs: true,
      watch: false,
    },
    {
      name: 'luxurydental-wa-agent',
      script: 'services/whatsapp-agent/src/index.js',
      cwd: '/app',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3010,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '256M',
      restart_delay: 3000,
      max_restarts: 10,
      log_file: '/var/log/luxurydental/wa-agent.log',
      error_file: '/var/log/luxurydental/wa-agent-error.log',
      merge_logs: true,
      watch: false,
    },
  ],
}
