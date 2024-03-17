from flask import Flask, jsonify
from flask_cors import CORS
import os
from app.v1.views import app_look

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['CRACK_DEV_SECRET_KEY'] = os.getenv('crack_dev', 'e85d0257-8468-4566-85a0-a1f932045807')

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_look)
@app.errorhandler(404)
def notFound(error):
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=True)