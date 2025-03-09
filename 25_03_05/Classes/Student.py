from Classes.Course import Course

class Student:
    def __init__(self, student_id: int, name: str, surname: str, age: int, courses: list = None):
        if courses is None:
            courses = []
        self.student_id: int = student_id
        self.name: str = name
        self.surname: str = surname
        self.age: int = age
        self.courses: list = courses

    def add_course(self, course: Course) -> None:
        self.courses.append(course)

    def get_info(self):
        info = f"{self.name} {self.surname} ({self.age}): "
        for course in self.courses:
            info += course.course_name + ", "
        info = info[:-2]
        print(info)

    def save_to_files(self):
        file = open(f"Output/{self.name.lower()}_{self.surname.lower()}.txt", "w")
        file.write("Kursy:\n")
        for course in self.courses:
            file.write(f"- {course.course_name}\n")
        file.close()