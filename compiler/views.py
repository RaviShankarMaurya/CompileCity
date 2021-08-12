from django.http import HttpResponse
from django.shortcuts import render
import os
def index(request):
      
    return render(request,"index.html")
def compile(request):
    import random, string
    code=request.GET['code']
    language=request.GET['language']
    language=language.lower()
    random = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
    filePath = "pages/temp/"+random+"."+language
    programFile = open(filePath, "w")
    programFile.write(code)
    programFile.close()
    if(language == "python"):
        output = os.system("python "+filePath+" > pages/result.html 2>pages/error.html")
    if(language == "php"):
        output = os.system("php "+filePath+" > pages/result.html 2>pages/error.html")
        
        
    if(language == "c"):
        outputExe = random + ".exe"
        # outputExe = "pages/c/"+random + ".exe"
        output = os.system("gcc "+filePath+" -o "+outputExe+" > pages/result.txt 2>pages/error.html")
        # os.system("cd pages/c/ & "+random+".exe > pages/result.html")
        os.system(random+".exe > pages/result.html")
        
    if(language == "cpp"):
        outputExe = random + ".exe"
        output = os.system("gcc "+filePath+" -o "+outputExe+" > pages/result.txt 2>pages/error.html")
        os.system(outputExe+" > pages/result.html")  
        


    if (output):
        return render(request,"error.html")       
    else:
        return render(request,"result.html")
          
    
def download(request):
    import random, string
    code=request.GET['code']
    language=request.GET['language']
    language=language.lower()
    random = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
    filePath = "pages/temp/"+random+"."+language
    programFile = open(filePath, "w")
    programFile.write(code)
    programFile.close()
    output = filePath
    return render(request,"download.html",{"outputis":output})
 
