#encoding=utf-8
import redis
from subprocess import Popen, PIPE

redis_server_info = {
	"host" : "localhost",
	"port" : 6379,
	"db" : 0
}

redis_cli_info = {
	"cmd" : "redis-cli"
}

r = redis.Redis(host=redis_server_info["host"],
				port=redis_server_info["port"],
				db=redis_server_info["db"])

# run redis cli from console
def execute_redis_cli(cmd):
	redis_cli_exe = redis_cli_info["cmd"]
	params = [redis_cli_exe] + cmd.split(' ')
	output = Popen(params, stdout=PIPE, stderr=PIPE)
	if output is not None:
		stdout = output.stdout.read()
		err = output.stderr.read()
		output.close()
		return stdout, err
	return None, None