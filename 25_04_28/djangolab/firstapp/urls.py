from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('list/', views.list_of_profiles, name='list'),
    path('details/<int:person_id>/<str:metadata>/', views.profile, name='details'),
]