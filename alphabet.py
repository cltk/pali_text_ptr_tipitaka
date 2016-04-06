#alphabet

#classification 
shortVowels =("a", "i", "u", "e", "o")
longVowels =("aa", "ii", "uu")
semiVowels =("y", "r", "l", ".l", "v")
nasals = ("\"n", "~n", ".n", "n", "m", ".m")
sibilants = ("h", "s")
mutes = ("k", "kh", "g", "gh", "c", "ch", "j", "jh", ".t", ".th", ".d", ".dh", "t", "th", "d", "dh", "p", "ph", "b", "bh")
dentals = ("t", "th", "d", "dh", "n", "l", "s")
palatals = ("c", "ch", "j", "jh", "~n", "y")
gutturals = ("k", "kh", "g", "gh", "\"n")

#return list of alphabet, vowels, consonants
def getAlphabet():
    return shortVowels+longVowels+semiVowels+nasals+sibilants+mutes+dentals+palatals+gutturals

def getVowels():
    return shortVowels+longVowels

def getConsonants():
    return semiVowels+nasals+sibilants+mutes+dentals+palatals+gutturals

#check if c is in alphabet
def contains(c):
    if str(c) in getAlphabet():
        return True
    return False

#return list of aspirated consonants
def getAspirated(l=set()):
    for i in getConsonants():
        for j in i:
            if j is "h":
                l.add(i)
    return l
    
#sort list by length of strings
def sortByLen(l):
    l.sort(key=len)
    return l


#checks if vowel, consonant
def isVowel(c):
    if str(c) in getVowels():
        return True
    return False

def isConsonant(c):
    if str(c) in getConsonants():
        return True
    return False

#Returns the nasal that a niggahita (c) would become by regressive assimilation
def getAssimilatedNiggahita(c):
    if str(c) in "j c h e".split():
        return "~n"
    if str(c) in "k kh".split():
        return "\"n"
    if str(c) in "d dh n".split():
        return "n"
    if str(c) in "m p s bh b".split():
        return "m"
    if str(c) in ".t .th".split():
        return ".n"
    if str(c) in "l".split():
        return "l"
    if isVowel(c):
        return "m"
    return ""

#Returns the result of sandhi merging the given character (c) with 'ya'
def getAssimilatedWithYa(c):
    if isVowel(c):
        return str(c)+"ya"
    if c is "dh":
        return "jjha"
    if c is "d":
        return "jja"
    if (c in ".n".split()) or (c is "n"):
            return "~n~na"
    if c is "v":
            return "bba"
    if c is "t":
            return "cca"
    if c is "th":
            return "ccha"
    if c is "h":
            return "hya"
    return c + c + "a"

#Given a short vowel s, returns the corresponding long vowel
#Returns the character itself in all other cases
def getStrong(s):
    if s in "a".split():
        return "~a"
    if s in "i".split():
        return "e"
    if s in "ii".split():
        return "e"
    if s in "u".split():
        return "o"
    if s in "~u".split():
        return "o"
    return s

#Returns the result of weakening a long vowel by reversing guna
#Returns the given character if no weakening can be applied
def getWeak(s):
    if s in "~a".split():
        return "a"
    elif s in "e".split():
        return ["i", "~i"]
    elif s in "o".split():
        return ["u","~u"]
    return s

#Checks whether the given consonant is aspirated
def isAspirated(s):
    return (s in getAspirated())

#Checks whether the given consonant is guttural
def isGuttural(s):
    return (s in gutturals)

#Returns the palatal corresponding to the given guttural
def getPalatalForGuttural(s):
    return palatals[gutturals.index(s)]

#Returns long vowel for given short vowel
def getLong(s):
    if s in "a".split(): return "~a"
    if s in "i".split(): return "~i"
    if s in "u".split(): return "~u"
    return s
