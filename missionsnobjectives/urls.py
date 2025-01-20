from django.urls import path, re_path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from missionsnobjectives import views

router = routers.DefaultRouter()
router.register(r"objectives", views.ObjectiveView, "objectives")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="API")),
    re_path(r"register", views.register),
    re_path(r"login", views.login),
]
