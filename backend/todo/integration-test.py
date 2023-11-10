from django.test import TestCase
from rest_framework.test import APIClient
from .models import Todo

class IntegrationTest(TestCase):
    def setUp(self):     
        self.client = APIClient()
        self.todo_data = {
            'title': 'test',
            'description': 'test test test.',
            'completed': True
        }
        self.todo = Todo.objects.create(**self.todo_data)
