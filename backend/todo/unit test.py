from django.test import TestCase
from .models import Todo

class TodoModelTest(TestCase):
    def setUp(self):
        Todo.objects.create(title="test", description="Test Test Test.")

    def test_todo_creation(self):
        todo = Todo.objects.get(title="test")
        self.assertEqual(todo.title, "test")
        self.assertEqual(todo.description, "Test Test Test.")
      
        
        # Assuming completed is False by default

    
