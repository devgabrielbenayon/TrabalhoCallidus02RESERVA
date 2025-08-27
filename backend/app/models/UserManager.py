import json
import os
from app.models.User import User

class UserManager:
    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            with open(self.db_file, "w") as f:
                json.dump([], f)

    
    def load_users(self):
        with open(self.db_file, "r") as f:
            users_data = json.load(f)
        return [User(**u) for u in users_data]
    
    def save_users(self, users):
        with open(self.db_file, "w") as f:
            json.dump([u.__dict__ for u in users], f, indent=4)

    def find_by_username(self, username):
        users = self.load_users()

        return next((u for u in users if u.username == username), None)
    
    def find_by_id(self, user_id):
        users = self.load_users()
        
        return next((u for u in users if u.id == user_id), None)