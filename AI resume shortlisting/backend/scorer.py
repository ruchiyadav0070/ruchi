from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def score_resumes(jd, resume_paths):
    texts=[jd]
    for p in resume_paths:
        with open(p,'r',errors='ignore') as f:
            texts.append(f.read())
    v=TfidfVectorizer().fit_transform(texts)
    sims=cosine_similarity(v[0:1], v[1:]).flatten()
    out=[]
    for p,s in zip(resume_paths,sims):
        out.append(f"{os.path.basename(p)} => {s*100:.2f}% match")
    return "\n".join(out)
