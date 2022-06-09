module.exports = {
    apps: [{
        name: "simba",
        script: "./server.js",
        // instances: 2,
        // exec_mode: "cluster",
        node_args: "--experimental-modules",
        watch: true,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 3000,
            "NODE_ENV": "production",
        }
    }]
}
