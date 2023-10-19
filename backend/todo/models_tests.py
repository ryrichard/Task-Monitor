from django.test import TestCase
from .models import Todo
import pytest
from django.db.utils import IntegrityError
from .serializers import TodoSerializer
from rest_framework.exceptions import ValidationError

# @pytest.fixture
# def todo():
#     return Todo(
#         title = "Test Case",
#         description = "This is a test.",
#         completed = False
#     )

# test correct inputs
def test_todo_creation():
    todo = Todo(
        title = "Test Case",
        description = "This is a test.",
        completed = False
    )

    assert todo.title == "Test Case"
    assert todo.description == "This is a test."
    assert False == todo.completed

# test missing inputs
@pytest.mark.django_db
def test_todo_with_missing_requirements():
    data = {} 

    serializer = TodoSerializer(data=data)

    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)

# test missing requirements
# @pytest.mark.django_db
# def test_todo_with_missing_requirements():
#     todo = Todo()
#     with pytest.raises(IntegrityError):
#         todo.save()
# FAILED models_tests.py::test_todo_with_missing_requirements - Failed: DID NOT RAISE <class 'django.db.utils.IntegrityError'>