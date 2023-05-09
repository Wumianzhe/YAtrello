from django.db import models
from django.core.validators import MaxLengthValidator
from .managers import ProfileManager 
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# Create your models here. 

class Group(models.Model):
    id = models.AutoField(primary_key=True)
    is_visible = models.BooleanField(default=False)
    name = models.CharField(max_length=25)

class Profile(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    short_bio = models.TextField(blank=True, validators=[MaxLengthValidator(999)])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group)
    
    objects = ProfileManager()

    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

class Board(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    admin_gid = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='board_admins')
    user_gid = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='board_users')

class Section(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='users_task')
    author_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='authors_task')
    header = models.TextField(validators=[MaxLengthValidator(99)])
    text = models.TextField(validators=[MaxLengthValidator(999)])
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    time_start = models.DateTimeField(default=timezone.now)
    time_deadline = models.DateTimeField(null=True)

class Subtask(models.Model):
    id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.TextField(validators=[MaxLengthValidator(999)])
    is_completed = models.BooleanField(default=False)

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    task_id =  models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.TextField(validators=[MaxLengthValidator(999)],default='')
    time = models.DateTimeField(default=timezone.now)
