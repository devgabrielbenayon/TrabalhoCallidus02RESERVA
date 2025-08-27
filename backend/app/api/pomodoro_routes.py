from flask import Blueprint, jsonify, request
from app.models.WorkSession import WorkSession
from app.models.WorkSessionManager import WorkSessionManager
from app.core.security import token_required
import uuid
from datetime import datetime

bp = Blueprint('pomodoro', __name__, url_prefix='/sessions')

manager = WorkSessionManager("sessions.json")


# ROTA PARA INICIAR UMA NOVA SESSÃO DE TRABALHO
@bp.route('/start', methods=['POST'])
@token_required
def start_session(current_user):
    # Opcional: o front-end pode nos enviar o ID da tarefa em que o usuário está focando
    data = request.get_json()
    task_id = data.get('task_id') if data else None

    # Cria uma nova instância de WorkSession
    # O start_time é definido automaticamente no construtor do modelo
    new_session = WorkSession(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        task_id=task_id
    )

    # Carrega as sessões existentes, adiciona a nova e salva
    sessions = manager.load_sessions()
    sessions.append(new_session)
    manager.save_sessions(sessions)

    # Retorna os dados da sessão recém-criada para o front-end
    return jsonify(new_session.to_dict()), 201


# ROTA PARA FINALIZAR UMA SESSÃO DE TRABALHO EXISTENTE
@bp.route('/<session_id>/stop', methods=['POST'])
@token_required
def stop_session(current_user, session_id):
    # Busca a sessão específica pelo ID fornecido na URL
    sessions = manager.load_sessions()
    session_to_stop = next((s for s in sessions if s.id == session_id), None)

    # Validação 1: A sessão existe?
    if not session_to_stop:
        return jsonify({"error": "Sessão não encontrada."}), 404

    # Validação 2: O usuário logado é o dono da sessão?
    if session_to_stop.user_id != current_user.id:
        return jsonify({"error": "Acesso não autorizado."}), 403

    # Validação 3: A sessão já foi finalizada?
    if session_to_stop.end_time:
        return jsonify({"error": "Esta sessão já foi finalizada."}), 400

    # Atualiza a sessão com a hora de término e calcula a duração
    session_to_stop.end_time = datetime.now().isoformat()
    session_to_stop.calculate_duration() # Chama o método que criamos no modelo

    # Salva a lista de sessões com a sessão atualizada
    manager.save_sessions(sessions)

    # Retorna a sessão completa e atualizada
    return jsonify(session_to_stop.to_dict()), 200