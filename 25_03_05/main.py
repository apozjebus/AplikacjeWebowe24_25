from Classes.Student import Student
from Classes.Course import Course

file = open("Data/students.txt", "r")
students_data = file.readlines()
file.close()

file = open("Data/courses.txt", "r")
courses_data = file.readlines()
file.close()

students = []
for student in students_data:
    student = student.strip().split(",")
    students.append(Student(int(student[0]), student[1], student[2], int(student[3])))

courses = []
for course in courses_data:
    course = course.strip().split(",")
    courses.append(Course(int(course[0]), course[1]))

for course in courses:
    for student in students:
        if course.student_id == student.student_id:
            student.add_course(course)

for student in students:
    student.get_info()
    student.save_to_files()