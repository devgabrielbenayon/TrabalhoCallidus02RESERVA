from datetime import datetime

class Task:
    def __init__(self, id, title, user_id, description="", 
                 status="pendente", created_at=None, updated_at=None,
                 due_date=None, priority="media"):
        
        self.id = id
        self.title = title
        self.user_id = user_id
        self.description = description
        self.status = status
        self.created_at = created_at or datetime.now().isoformat()
        self.updated_at = updated_at
        self.due_date = due_date
        self.priority = priority

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "due_date": self.due_date,
            "priority": self.priority
        }
