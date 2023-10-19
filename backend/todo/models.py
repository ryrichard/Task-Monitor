from django.db import models

class Todo(models.Model):
    title=models.CharField(max_length=120)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)

    def __str__(self):
        return self.title


class User():
    def __init__(self, name="", age=0):
        self.name = name
        self.age = age

    def is_digit(self, word):
        return any(char.isdigit() for char in word)

    def add_name(self, name):
        if self.is_digit(name):
            raise ValueError("number in name")
        self.name = name

    def add_age(self, age):
        self.age = age

    def get_name(self):
        return self.name

    def get_age(self):
        return self.age



        