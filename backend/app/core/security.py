from functools import wraps
from flask import request, jsonify, current_app
import jwt
from app.models.UserManager import UserManager # Precisamos para buscar o usuário se necessário

manager = UserManager("users.json")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # O token é esperado no cabeçalho 'Authorization' no formato 'Bearer <token>'
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token está faltando!'}), 401

        try:
            # Decodifica o token usando a chave secreta da nossa app Flask
            # IMPORTANTE: Precisaremos configurar a SECRET_KEY na app principal
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            
            # Busca o usuário para garantir que ele existe
            current_user = manager.find_by_id(data['user_id']) # Você precisará criar este método no UserManager
            if not current_user:
                 return jsonify({'message': 'Usuário do token não foi encontrado'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirou!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token é inválido!'}), 401
        except Exception as e:
            return jsonify({'message': 'Erro ao processar o token.'}), 401
        
        # Passa o usuário encontrado para a rota
        return f(current_user, *args, **kwargs)

    return decorated