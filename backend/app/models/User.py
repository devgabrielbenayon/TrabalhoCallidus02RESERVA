import uuid
from datetime import datetime
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

class User:
    def __init__(self, id=None, username=None, password_hash=None, created_at=None):
        self.id = id or str(uuid.uuid4())
        self.username = username
        self.password_hash = password_hash
        self.created_at = created_at

    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "created_at": self.created_at
        }