from flask import Flask
from flask_cors import CORS
from app.api import task_routes
from app.api import auth_routes
from app.api import pomodoro_routes

app = Flask(__name__)
app.config['SECRET_KEY'] = "sua_chave_secreta_aqui" # Lembre-se de configurar sua chave!

# Registrando rotas
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
app.register_blueprint(auth_routes.bp)
app.register_blueprint(task_routes.bp)
app.register_blueprint(pomodoro_routes.bp)

if __name__ == "__main__":
    app.run(debug=True)