#encoding=utf-8
import redis

redis_server_info = {
	"host" : "localhost",
	"port" : 6379,
	"db" : 0
}

r = redis.Redis(host=redis_server_info["host"],
				port=redis_server_info["port"],
				db=redis_server_info["db"])