#encoding: utf-8
import logging

from views import app


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app.run(host='0.0.0.0', port=9001, debug=True)
