from django.db import models

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.ForeignKey('Age', on_delete=models.CASCADE)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Age(models.Model):
    biological_age = models.IntegerField()
    mental_age = models.IntegerField()
    identified_age = models.IntegerField()

class Man(Person):
    beard_length = models.IntegerField()
    height = models.FloatField()
    amount_of_hair = models.IntegerField()

class Woman(Person):
    protruding_ears = models.BooleanField()
    good_personality = models.BooleanField()
    candy_crush_level = models.IntegerField()