from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer


class TodoViewIntegrationTest(APITestCase):
    def setUp(self):
        # Create test data
        self.todo = Todo.objects.create(title="Test Task")

    def test_get_todo_list(self):
        url = reverse('/tasks/')  # Assuming you have a URL named 'todo-list' for your viewset
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming it returns a list with one item