from django.shortcuts import render, get_object_or_404
from .models import Man, Woman

# Create your views here.
def index(request):
    return render(request, 'firstapp/search_form.html')

def list_of_profiles(request):
    bio_age = request.GET.get('bio_age')
    men_age = request.GET.get('men_age')
    ide_age = request.GET.get('ide_age')

    beard_length = request.GET.get('beard_length')
    height = request.GET.get('height')
    amount_of_hair = request.GET.get('amount_of_hair')

    protruding_ears = request.GET.get('protruding_ears')
    good_personality = request.GET.get('good_personality')
    candy_crush_level = request.GET.get('candy_crush_level')

    if request.GET.get('gender') == 'm':
        people = Man.objects.all()
        queryset = Man.objects.first()
    else:
        people = Woman.objects.all()
        queryset = Man.objects.first()

    table = queryset._meta.db_table

    if bio_age:
        people = people.filter(age__biological_age=bio_age)
    if men_age:
        people = people.filter(age__mental_age=men_age)
    if ide_age:
        people = people.filter(age__identified_age=ide_age)
    if beard_length:
        people = people.filter(beard_length=beard_length)
    if height:
        people = people.filter(height=height)
    if amount_of_hair:
        people = people.filter(amount_of_hair=amount_of_hair)
    if protruding_ears:
        people = people.filter(protruding_ears=protruding_ears)
    if good_personality:
        people = people.filter(good_personality=good_personality)
    if candy_crush_level:
        people = people.filter(candy_crush_level=candy_crush_level)

    return render(request, 'firstapp/list.html', {'profiles': people, 'table': table})

def profile(request, person_id, metadata):
    if metadata == 'firstapp_man':
        person = Man.objects.get(pk=person_id)
    else:
        person = Woman.objects.get(pk=person_id)
    return render(request, 'firstapp/profile.html', {'person': person, 'metadata': metadata})