from flask import Flask, request
from scorer import score_resumes
from werkzeug.utils import secure_filename
import os

app=Flask(__name__)
UPLOAD='uploads'
os.makedirs(UPLOAD, exist_ok=True)

@app.post('/score')
def score():
    jd=request.form.get('jd')
    files=request.files.getlist('files')
    paths=[]
    for f in files:
        p=os.path.join(UPLOAD, secure_filename(f.filename))
        f.save(p); paths.append(p)
    return score_resumes(jd, paths)

if __name__=='__main__':
    app.run()
