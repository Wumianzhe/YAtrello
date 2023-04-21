from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Board
from yatproj.serializers import BoardSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    @action(detail=False, url_path='by_name/(?P<name>.+)')
    def by_name(self, request, name = None):
        queryset = self.get_queryset().filter(name=name)
        if not queryset.exists():
            return Response({'msg':'Object not found'}, status= status.HTTP_404_NOT_FOUND)    
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data)
