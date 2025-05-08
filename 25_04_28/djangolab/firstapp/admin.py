from django.contrib import admin
from .models import Person, Age, Man, Woman

# Register your models here.
admin.site.register(Person)
admin.site.register(Age)
admin.site.register(Man)
admin.site.register(Woman)