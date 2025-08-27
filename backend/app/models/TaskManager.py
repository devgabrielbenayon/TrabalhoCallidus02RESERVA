from app.models.Task import Task
import json
import os

class TaskManager:
    def __init__(self, db_file="./database.json"):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            with open(self.db_file, "w") as f:
                json.dump({"tasks": []}, f, indent=4)


    def load_tasks(self):
        with open(self.db_file, "r") as f:
            data = json.load(f)
        return [Task(**t) for t in data.get("tasks", [])]
    
    def save_tasks(self, tasks):
        with open(self.db_file, "w") as f:
            json.dump({"tasks": [t.to_dict() for t in tasks]}, f, indent=4)