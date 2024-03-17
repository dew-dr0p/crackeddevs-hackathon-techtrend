from flask import Blueprint

app_look = Blueprint('app_look', __name__, url_prefix='/app/v1')

from app.v1.views.apis import *