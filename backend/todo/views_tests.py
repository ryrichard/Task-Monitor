from django.test import TestCase
from rest_framework.test import APIClient
from .models import Todo

class TodoViewIntegrationTest(TestCase):
    def setUp(self):
        # Create some sample data for testing
        self.client = APIClient()
        self.todo_data = {
            'title': 'Test Task',
            'description': 'This is a test task.',
            'completed': False
        }
        self.todo = Todo.objects.create(**self.todo_data)

    # checking the existance of created todo
    def test_check_existance_of_new_todos(self):
        response = self.client.get('/api/tasks/')
        # print(response)
        assert response.status_code == 200
        assert len(response.data) == 1

    # checking if creating a new todo will give 201
    def test_check_created_todo(self):
        new_todo_data = {
            'title': 'New Task',
            'description': 'A new task.',
            'completed': True
        }
        response = self.client.post('/api/tasks/', new_todo_data, format='json')
        # print(response)
        assert response.status_code == 201

    # problem creating incomplete todo object
    def test_problem_with_incomplete_todo(self):
        new_todo_problem = {
            'description': "A problem",
            'completed': False
        }
        response = self.client.post('/api/tasks/', new_todo_problem, format='json')
        assert response.status_code == 400

    # def test_update_todo(self):
    #     updated_data = {
    #         'title': 'Updated Task',
    #         'completed': True
    #     }
    #     response = self.client.put(f'/api/todos/{self.todo.id}/', updated_data, format='json')
    #     self.assertEqual(response.status_code, 200)
    #     self.todo.refresh_from_db()  # Reload the object from the database
    #     self.assertEqual(self.todo.title, 'Updated Task')
    #     self.assertEqual(self.todo.completed, True)

    # def test_delete_todo(self):
    #     response = self.client.delete(f'/api/todos/{self.todo.id}/')
    #     self.assertEqual(response.status_code, 204)
    #     self.assertFalse(Todo.objects.filter(id=self.todo.id).exists())
