#!/usr/bin/env python
#encoding=utf-8

from flask import Flask, render_template, request, jsonify
from redismon import redis_server_info, r, execute_redis_cli
import json
app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('index.html', server_info=redis_server_info)

@app.route('/keys', methods=["POST"])
def search_keys():
    param = request.form.get('pattern', '*')
    if param[0] != '*':
        param = '*' + param
    if param[-1] != '*':
        param = param + '*'
    keys = r.keys(param)
    return json.dumps(keys)

@app.route('/keytype', methods=["POST"])
def key_type():
    keys = request.form.get('keys', '')
    res = {}
    for k in keys.split(','):
        if k:
            res[k] = r.type(k)
    return json.dumps(res)

@app.route('/exec', methods=["POST"])
def exec_redis_command():
    param = request.form.get('cmd', '')
    stdout, stderr = execute_redis_cli(param)
    ret = {'stdout': stdout, 'stderr': stderr}
    return json.dumps(ret)

if __name__ == '__main__':
    app.debug = True
    app.run()