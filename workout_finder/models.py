from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

# Create your models here.
class Profile(models.Model):
    username = models.CharField(max_length=220, null=True)
    password = models.CharField(max_length=10, null=True)
    full_name = models.CharField(max_length=220, null=True)
    bio = models.CharField(max_length=220, null=True)
    location = models.CharField(max_length=220, null=True)
    completed_workouts = models.IntegerField(default=0, null=True)

    def serialize(self):
        return {
            "full_name": self.full_name,
            "username": self.username,
            "bio": self.bio,
            "location": self.location,
            "completed_workouts": self.completed_workouts
        }


class Exercise(models.Model):
    name = models.CharField(max_length=220, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    reps = models.IntegerField(default=0)
    category = models.CharField(max_length=220)

    def serialize(self):
        return {
            "name": self.name,
            "description": self.description,
            "reps": self.reps
        }