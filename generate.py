word = ""
while len(word) != 5: 
    word = input("Enter a word: ")

answer_encrypted = ""

for i in word:
    match  i:
        case "a": answer_encrypted += "h"
        case "b": answer_encrypted += "i"
        case "c": answer_encrypted += "t"
        case "d": answer_encrypted += "I"
        case "e": answer_encrypted += "s"
        case "f": answer_encrypted += "H"
        case "g": answer_encrypted += "N"
        case "h": answer_encrypted += "c"
        case "i": answer_encrypted += "r"
        case "j": answer_encrypted += "y"
        case "k": answer_encrypted += "L"
        case "l": answer_encrypted += "T"
        case "m": answer_encrypted += "o"
        case "n": answer_encrypted += "F"
        case "o": answer_encrypted += "S"
        case "p": answer_encrypted += "u"
        case "q": answer_encrypted += "C"
        case "r": answer_encrypted += "k"
        case "s": answer_encrypted += "D"
        case "t": answer_encrypted += "z"
        case "u": answer_encrypted += "B"
        case "v": answer_encrypted += "J"
        case "w": answer_encrypted += "R"
        case "x": answer_encrypted += "Q"
        case "y": answer_encrypted += "q"
        case "z": answer_encrypted += "j"
        case _: raise ValueError("Invalid Character")
    
print(f"Encrypted Word: {answer_encrypted}")