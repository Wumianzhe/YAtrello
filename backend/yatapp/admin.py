from django.contrib import admin
from .models import Board, Section, Group, UserGroup, Task, Comment, Subtask
# Register your models here.

admin.site.register(Board)
admin.site.register(Section)
admin.site.register(Group)
admin.site.register(UserGroup)
admin.site.register(Task)
admin.site.register(Comment)
admin.site.register(Subtask)