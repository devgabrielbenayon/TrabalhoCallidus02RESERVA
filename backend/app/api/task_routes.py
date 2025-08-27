from flask import Blueprint, jsonify, request
from app.models.Task import Task
from app.models.TaskManager import TaskManager
from app.core.security import token_required
import uuid
from datetime import datetime

bp = Blueprint('tasks', __name__, url_prefix='/tasks')

# Instanciando o gerenciador de tarefas. 
# Certifique-se de que o caminho para o seu JSON está correto.
manager = TaskManager("database.json")


# Rota para listar todas as tarefas do usuário logado
@bp.route('/', methods=['GET'])
@token_required
def get_tasks(current_user):
    """
    Retorna uma lista de tarefas pertencentes apenas ao usuário autenticado.
    """
    all_tasks = manager.load_tasks()
    user_tasks = [t for t in all_tasks if hasattr(t, 'user_id') and t.user_id == current_user.id]
    return jsonify([task.to_dict() for task in user_tasks]), 200


# Rota para criar uma nova tarefa
@bp.route('/', methods=['POST'])
@token_required
def add_task(current_user):
    """
    Cria uma nova tarefa e a associa ao usuário autenticado.
    """
    data = request.json

    if not data or not data.get("title"):
        return jsonify({"error": "O título da tarefa é obrigatório."}), 400
    
    # Criando a nova tarefa já com o ID do usuário
    new_task = Task(
        id=str(uuid.uuid4()),
        title=data["title"],
        description=data.get("description", ""),
        user_id=current_user.id  # Associa a tarefa ao usuário do token
    )

    tasks = manager.load_tasks()
    tasks.append(new_task)
    manager.save_tasks(tasks)

    return jsonify(new_task.to_dict()), 201


# Rota para deletar uma tarefa específica
@bp.route('/<task_id>', methods=['DELETE'])
@token_required
def remove_task(current_user, task_id):
    """
    Remove uma tarefa, verificando primeiro se ela pertence ao usuário.
    """
    tasks = manager.load_tasks()
    task_to_delete = next((t for t in tasks if t.id == task_id), None)

    if not task_to_delete:
        return jsonify({"error": "Tarefa não encontrada."}), 404
    
    # Verificação de permissão: o usuário do token é o dono da tarefa?
    if not hasattr(task_to_delete, 'user_id') or task_to_delete.user_id != current_user.id:
        return jsonify({"error": "Acesso não autorizado para esta tarefa."}), 403

    tasks.remove(task_to_delete)
    manager.save_tasks(tasks)
    return jsonify({"message": "Tarefa removida com sucesso."}), 200
    

# Rota para atualizar uma tarefa específica
@bp.route('/<task_id>', methods=['PATCH'])
@token_required
def update_task(current_user, task_id):
    """
    Atualiza uma tarefa, verificando primeiro se ela pertence ao usuário.
    """
    data = request.json
    tasks = manager.load_tasks()
    task_to_update = next((t for t in tasks if t.id == task_id), None)

    if not task_to_update:
        return jsonify({"error": "Tarefa não encontrada."}), 404
    
    # Verificação de permissão
    if not hasattr(task_to_update, 'user_id') or task_to_update.user_id != current_user.id:
        return jsonify({"error": "Acesso não autorizado para esta tarefa."}), 403

    # Atualiza os campos enviados no corpo da requisição
    for key, value in data.items():
        if hasattr(task_to_update, key):
            setattr(task_to_update, key, value)

    task_to_update.updated_at = datetime.now().isoformat()
    manager.save_tasks(tasks)
    
    return jsonify(task_to_update.to_dict()), 200