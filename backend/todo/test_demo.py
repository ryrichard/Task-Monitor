from django.test import TestCase
from .models import Todo

class TodoModelTest(TestCase):
    def setUp(self):
        Todo.objects.create(title="Test Todo", description="This is a test todo.")

    def test_todo_creation(self):
        todo = Todo.objects.get(title="Test Todo")
        self.assertEqual(todo.title, "Test Todo")
        self.assertEqual(todo.description, "This is a test todo.")
        self.assertFalse(todo.completed)  # Assuming completed is False by default

    def test_todo_str_method(self):
        todo = Todo.objects.get(title="Test Todo")
        self.assertEqual(str(todo), "Test Todo")

    def test_completed_todo(self):
        todo = Todo.objects.get(title="Test Todo")
        todo.completed = True
        todo.save()
        updated_todo = Todo.objects.get(title="Test Todo")
        self.assertTrue(updated_todo.completed)
