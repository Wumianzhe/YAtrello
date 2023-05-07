from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Board,Section, Group, Task, Subtask, Comment, Profile
from yatproj.serializers import BoardSerializer, SectionSerializer, GroupSerializer, TaskSerializer, SubtaskSerializer, CommentSerializer, ProfileSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model


@api_view(['GET'])
def uid_by_token(request):
    permisson_classes = [AllowAny]
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header is not None and auth_header.startswith('Token '):
        token_key = auth_header.split()[1]
        try:
            token = Token.objects.get(key=token_key)
            user = Profile.objects.get(pk=token.user_id)
            return Response({'user_id':token.user_id, 'username': user.username}, status= status.HTTP_200_OK)
        except:
            return Response({'error':'invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        

class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    @action(detail=False, url_path='by_name/(?P<name>.+)')
    def by_name(self, request, name = None):
        queryset = self.get_queryset().filter(name=name)
        if not queryset.exists():
            return Response({'error':'Object not found'}, status= status.HTTP_404_NOT_FOUND)    
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Section.objects.all()
    @action(detail= False, url_path='by_board_id/(?P<board_id>[0-9]+)')
    def by_board_id(self, request, board_id = None):
        sections = Section.objects.filter(board_id=board_id)
        serializer = SectionSerializer(sections, many = True)
        return Response(serializer.data)
    serializer_class = SectionSerializer

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Task.objects.all()
    @action(detail= False, url_path='by_user_id/(?P<user_id>[0-9]+)')
    def by_user_id(self,request, user_id = None):
        tasks = Task.objects.filter(user_id = user_id)
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    serializer_class = TaskSerializer

class SubtaskViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Subtask.objects.all()
    @action(detail= False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        subtasks = Subtask.objects.filter(task_id=task_id)
        serializer = SubtaskSerializer(subtasks, many = True)
        return Response(serializer.data)
    serializer_class = SubtaskSerializer

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Comment.objects.all()
    @action(detail=False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        comments = Comment.objects.filter(task_id=task_id)
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)
    serializer_class = CommentSerializer