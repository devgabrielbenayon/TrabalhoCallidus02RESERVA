import uuid
from datetime import datetime

class WorkSession:
    def __init__(self, id, user_id, task_id=None, 
                 start_time=None, end_time=None, duration_minutes=None):
        
        self.id = id or str(uuid.uuid4())
        self.user_id = user_id
        self.task_id = task_id
        self.start_time = start_time or datetime.now().isoformat()
        self.end_time = end_time
        self.duration_minutes = duration_minutes

    def calculate_duration(self):
        # Calcula a duração da sessão em minutos quando ela termina.
        if self.start_time and self.end_time:
            start = datetime.fromisoformat(self.start_time)
            end = datetime.fromisoformat(self.end_time)
            duration = (end - start).total_seconds() / 60
            self.duration_minutes = round(duration, 2)

    def to_dict(self):
        # Converte o objeto para um dicionário para ser salvo como JSON.
        return {
            "id": self.id,
            "user_id": self.user_id,
            "task_id": self.task_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "duration_minutes": self.duration_minutes
        }