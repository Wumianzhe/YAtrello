from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Board,Section, Group, Task, Subtask, Comment, Profile
from yatproj.serializers import BoardSerializer, SectionSerializer, GroupSerializer, TaskSerializer, SubtaskSerializer, CommentSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.db.models import Q
from django.http import HttpResponseBadRequest
import json

@api_view(['GET'])
def uid_by_token(request):
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    @action(detail=True, methods=["get"], url_path=r'tasks',)
    def tasks(self,request, pk = None):
        tasks = Task.objects.filter(user_id = pk)
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["get"], url_path=r'groups',)
    def groups(self,request, pk = None):
        groups = Profile.objects.get(pk=pk).groups.all()
        serializer = GroupSerializer(groups, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["get"], url_path=r'boards',)
    def boards(self,request, pk = None):
        groups = Profile.objects.get(pk=pk).groups.all().values('id')
        boards = Board.objects.filter(Q(admin_gid__in = groups) | Q(user_gid__in = groups))
        serializer = BoardSerializer(boards, many= True)
        return Response(serializer.data)
    
    
class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    @action(detail=False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        task_query = Task.objects.filter(id = task_id).values('section_id')
        section_id = task_query[0]['section_id']
        section_query = Section.objects.filter(id = section_id).values('board_id')
        board_id = section_query[0]['board_id']
        # serializer = BoardSerializer(board)
        return Response({'board_id':f'{board_id}'})


    @action(detail=False, url_path='by_name/(?P<name>.+)')
    def by_name(self, request, name = None):
        queryset = self.get_queryset().filter(name=name)
        if not queryset.exists():
            return Response({'error':'Object not found'}, status= status.HTTP_404_NOT_FOUND)    
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["get"], url_path=r'sections',)
    def sections(self,request, pk = None):
        sections = Section.objects.filter(board_id = pk)
        serializer = SectionSerializer(sections, many = True)
        return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    @action(detail= False, url_path='by_board_id/(?P<board_id>[0-9]+)')
    def by_board_id(self, request, board_id = None):
        sections = Section.objects.filter(board_id=board_id)
        serializer = SectionSerializer(sections, many = True)
        return Response(serializer.data)
    
    @action(detail = False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        task_query = Task.objects.filter(id = task_id).values('section_id')
        section_id = task_query[0]['section_id']
        return Response({'section_id':section_id})

    @action(detail=True, methods=["get"], url_path=r'tasks',)
    def tasks(self,request, pk = None):
        tasks = Task.objects.filter(section_id = pk)
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    @action(detail=True, methods=["get"], url_path=r'users',)
    def profiles(self,request, pk = None):
        profiles = Group.objects.get(pk=pk).profile_set.all()
        serializer = ProfileSerializer(profiles, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["post"], url_path=r'add_users',)
    def add_users(self,request, pk = None):
        try:
            body_data = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            return HttpResponseBadRequest(json.dumps({'error': 'Invalid request: {0}'.format(str(e))}).encode(), content_type="application/json")
        profiles = Profile.objects.filter(id__in = body_data["users"])
        serializer = ProfileSerializer(profiles, many = True)
        group = Group.objects.get(pk=pk)
        for profile in profiles:
            group.profile_set.add(profile.id)
        return Response(serializer.data)

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=False, url_path='by_section_id/(?P<section_id>[0-9]+)')
    def by_section_id(self, request, section_id = None):
        tasks = Task.objects.filter(section_id=section_id)
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    
    @action(detail= False, url_path='by_user_id/(?P<user_id>[0-9]+)')
    def by_user_id(self,request, user_id = None):
        tasks = Task.objects.filter(user_id = user_id)
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["get"], url_path=r'subtasks',)
    def subtasks(self,request, pk = None):
        subtasks = Subtask.objects.filter(task_id = pk)
        serializer = SubtaskSerializer(subtasks, many = True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["get"], url_path=r'comments',)
    def comments(self,request, pk = None):
        comments = Comment.objects.filter(task_id = pk)
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)

class SubtaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer

    @action(detail= False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        subtasks = Subtask.objects.filter(task_id=task_id)
        serializer = SubtaskSerializer(subtasks, many = True)
        return Response(serializer.data)
    

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @action(detail=False, url_path='by_task_id/(?P<task_id>[0-9]+)')
    def by_task_id(self, request, task_id = None):
        comments = Comment.objects.filter(task_id=task_id)
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)
