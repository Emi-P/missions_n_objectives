from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ObjectiveSerializer
from .models import Objective

# Create your views here.
class ObjectiveView(viewsets.ModelViewSet): # Genera el crud a partir de solo esos dos atributos
    serializer_class = ObjectiveSerializer
    queryset = Objective.objects.all()