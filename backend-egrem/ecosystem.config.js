module.exports = {
  apps : [{
    name: "admision",
    script: "server/server.js",
    instances: 2,
	exec_mode: 'cluster'
  }]
}
