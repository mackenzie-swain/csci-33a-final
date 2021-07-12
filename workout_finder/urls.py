
from django.urls import path, include

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    #APIS
    path("exercises", views.exercises, name="exercises"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
   
]
