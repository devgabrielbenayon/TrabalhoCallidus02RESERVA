import json
import os
from app.models.WorkSession import WorkSession

class WorkSessionManager:
    def __init__(self, db_file="sessions.json"):
        self.db_file = db_file
        # Cria o arquivo JSON com uma lista vazia se ele não existir
        if not os.path.exists(self.db_file):
            with open(self.db_file, "w") as f:
                json.dump([], f, indent=4)

    def load_sessions(self):
        # Carrega todas as sessões do arquivo JSON.
        try:
            with open(self.db_file, "r") as f:
                data = json.load(f)
            # Converte cada dicionário de volta para um objeto WorkSession
            return [WorkSession(**s) for s in data]
        except (IOError, json.JSONDecodeError):
            return []

    def save_sessions(self, sessions):
        # Salva uma lista de objetos WorkSession no arquivo JSON.
        with open(self.db_file, "w") as f:
            # Converte cada objeto para seu dicionário antes de salvar
            json.dump([s.to_dict() for s in sessions], f, indent=4)
            
    def find_by_id(self, session_id):
        # Encontra uma sessão específica pelo seu ID.
        sessions = self.load_sessions()
        return next((s for s in sessions if s.id == session_id), None)