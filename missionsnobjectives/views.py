from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404

from .serializer import ObjectiveSerializer, UserSerializer
from .models import Objective
from django.contrib.auth.models import User


# Create your views here.
class ObjectiveView(
    viewsets.ModelViewSet
):  # Genera el crud a partir de solo esos dos atributos
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer

    @action(detail=False, methods=['get'])
    def list_owned(self, request):

        token = Token.objects.get(key=request.data['Authorization'])
        print(token.user.password)
        

        queryset = Objective.objects.all()
        serializer = ObjectiveSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data["username"])
        user.set_password(serializer.data["password"])
        user.save()  # to DB

        token = Token.objects.create(user=user)

        return Response(
            {
                "token": token.key,
                "user": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):

    user = get_object_or_404(User, username=request.data["username"])

    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST
        )

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response(
        {"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK
    )
