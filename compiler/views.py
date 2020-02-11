from django.http import HttpResponse
from django.shortcuts import render
import os
def index(request):
      
    return render(request,"index.html")
def compile(request):
    code=request.GET['codebox']
    code=str(code)
    codefile=open("pages/code.py","w+")
    codefile.write(code)
    codefile.close()
    os.system("python pages/code.py > pages/result.txt 2>pages/error.txt")
    file=open("pages/result.txt")
    result=""
    error=""
    errorfile=open("pages/error.txt")
    for i in errorfile.readlines():
        error+=i
    errorfile.seek(0)

    if len(error)<2:
        for i in file.readlines():
            result=result+i
        return render(request,"compile.html",{'res':result,'pcode':code})
        file.close()
    else:
        errorfile.seek(0)
        for i in errorfile.readlines():
            error+=i
        return render(request,"compile.html",{'res':error,'pcode':code})
code=""

    


