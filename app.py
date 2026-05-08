from flask import Flask
import routes
import os
from dotenv import load_dotenv
from database import criar_tabela

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('KEY')

criar_tabela()

routes.init_app(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))