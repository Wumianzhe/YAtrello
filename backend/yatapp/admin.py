from django.contrib import admin
from .models import Board, Section, Group,  Task, Comment, Subtask, Profile
# Register your models here.

admin.site.register(Board)
admin.site.register(Section)
admin.site.register(Group)
admin.site.register(Task)
admin.site.register(Comment)
admin.site.register(Subtask)
admin.site.register(Profile)
