from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        queryset = Objective.objects.filter(owner=request.user)
        serializer = ObjectiveSerializer(queryset, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ObjectiveSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save(owner=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        if not pk.isdigit():
            return Response(
                {"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST
            )

        objective = get_object_or_404(Objective, id=pk, owner=request.user.id)

        serializer = ObjectiveSerializer(instance=objective)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # def update(self, request, pk=None, *args, **kwargs):
    #     pass

    # def partial_update(self, request, *args, **kwargs):
    #     pass

    # def destroy(self, request, *args, **kwargs):
    #     pass


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
                "user": serializer.data["username"],
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
        {"token": token.key, "user": serializer.data["username"]},
        status=status.HTTP_200_OK,
    )


def get_token_user(request):
    """
    In case token from the request can
    be validated, returns (<User>,None) where
    the user object is the one asociated to the token

    In case token can't be validated,
    returns an appropiate Response instance on each case.
    """
    try:
        token = Token.objects.get(key=request.data["Authorization"])
        return token.user, None
    except KeyError:
        return None, Response(
            {"error": "Token not provided"}, status=status.HTTP_401_UNAUTHORIZED
        )
    except Token.DoesNotExist:
        return None, Response(
            {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
        )
