from django.db import models
from django.core.validators import MaxValueValidator,MaxLengthValidator
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here. 

class Group(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)], primary_key=True)
    is_visible = models.BooleanField(default=False)
    name = models.CharField(max_length=25)


class Board(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)], primary_key=True)
    name = models.CharField(max_length=25)
    admin_gid = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='board_admins')
    user_gid = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='board_users')


class Section(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)],primary_key=True)
    name = models.CharField(max_length=25)
    board_id = models.ForeignKey(Board,on_delete=models.CASCADE)

class UserGroup(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)

class Task(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)], primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users_task')
    author_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authors_task')
    text = models.TextField(validators=[MaxLengthValidator(999)])
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    time_start = models.DateTimeField(default=timezone.now)
    time_deadline = models.DateTimeField(null=True)

class Subtasks(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)], primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

class Comment(models.Model):
    id = models.IntegerField(validators=[MaxValueValidator(999)], primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    task_id =  models.ForeignKey(Task, on_delete=models.CASCADE)