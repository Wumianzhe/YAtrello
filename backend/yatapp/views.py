from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Board,Section, Group, Task, Subtask, Comment
from yatproj.serializers import BoardSerializer, SectionSerializer, GroupSerializer, TaskSerializer, SubtaskSerializer, CommentSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    @action(detail=False, url_path='by_name/(?P<name>.+)')
    def by_name(self, request, name = None):
        queryset = self.get_queryset().filter(name=name)
        if not queryset.exists():
            return Response({'msg':'Object not found'}, status= status.HTTP_404_NOT_FOUND)    
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class SubtaskViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer