from flask import Blueprint, jsonify, request, current_app
from app.models.User import User
from app.models.UserManager import UserManager
from datetime import datetime, timedelta, timezone
import jwt

bp = Blueprint('auth', __name__, url_prefix='/auth')

manager = UserManager("users.json")

# SECRET_KEY = "chave_segredo"


#POST registro de usuário
@bp.route('/register', methods=['POST'])
def register():
    data = request.json

    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "É obrigatório ter nome de usuário e senha"}), 400
    
    if manager.find_by_username(data["username"]):
        return jsonify({"error": "Usuário já existe, tente outro nome"}), 400

    new_user = User(username=data["username"])
    new_user.set_password(data["password"])
    new_user.created_at = datetime.now().isoformat()

    users = manager.load_users()
    users.append(new_user)
    manager.save_users(users)

    return jsonify(new_user.to_dict()), 201


#POST login de usuário
@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "É obrigatório ter nome de usuário e senha"}), 400
    
    user = manager.find_by_username(data["username"])
    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Credenciais inválidas"}), 401
    
    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.now(timezone.utc) + timedelta(hours=1)
        },
        current_app.config['SECRET_KEY'], # Altere para usar a chave da aplicação
        algorithm="HS256"
    )

    return jsonify({"token": token})
    
    