# 4.1
file = open("Dane_PR2/sygnaly.txt", "r")
lines = file.readlines()
file.close()

for it in range(39, len(lines), 40):
    print(lines[it][9], end="")

print()

# 4.2
file = open("Dane_PR2/sygnaly.txt", "r")
lines = file.readlines()
file.close()

longest = ['', 0]

for line in lines:
    lineSet = set(line.strip())
    if len(lineSet) > longest[1]:
        longest = [line.strip(), len(lineSet)]

print(longest[0] + " " + str(longest[1]))

# 4.3
file = open("Dane_PR2/sygnaly.txt", "r")
lines = file.readlines()
file.close()

alphaDict = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7,
    "I": 8,
    "J": 9,
    "K": 10,
    "L": 11,
    "M": 12,
    "N": 13,
    "O": 14,
    "P": 15,
    "Q": 16,
    "R": 17,
    "S": 18,
    "T": 19,
    "U": 20,
    "V": 21,
    "W": 22,
    "X": 23,
    "Y": 24,
    "Z": 25
}

for line in lines:
    checkMark = True
    line = line.strip()
    for i in range(len(line) - 1):
        if abs(alphaDict[line[i]] - alphaDict[line[i + 1]]) > 10:
            checkMark = False
            break
    if checkMark:
        print(line)