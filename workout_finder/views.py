from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

from .models import Exercise, Profile, User

# Create your views here.
def index(request):
    return render(request, "workout_finder/index.html")

@csrf_exempt
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = User.objects.create_user(username, password)
            user.save()
        except IntegrityError as e:
            print(e)
    else:
        print('error')
    return HttpResponseRedirect(reverse("index"))

# @csrf_exempt
# def register(request):
#     if request.method == "POST":
#         # email = request.POST["email"]

#         # Ensure password matches confirmation
#         # password = request.POST["password"]
#         # confirmation = request.POST["confirmation"]
#         email = request.POST.get('email')
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         confirmation = request.POST.get('confirmation')
#         if password != confirmation:
#             return JsonResponse({'error': 'passwords dont match'}, safe=False)

#         # Attempt to create new user
#         try:
#             user = User.objects.create_user(username=username, email=email, password=password)
#             user.save()
#         except IntegrityError as e:
#             print(e)
#             return JsonResponse({'error': 'email address already in use'}, safe=False)
#         login(request, user)
#         return HttpResponseRedirect("localhost:3000")
#     else:
#         return HttpResponseRedirect("localhost:3000")

@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate(request, email=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "workout_finder/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "workout_finder/login.html")

def exercises(request):
    exercises = Exercise.objects.all()
    return JsonResponse([exercise.serialize() for exercise in exercises], safe=False)