import json,sys,subprocess,numpy as np
def load(f):
    b=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','1','-ar','16000','-'],capture_output=True).stdout
    return np.frombuffer(b,dtype=np.float32)
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
res={}
for k in ['s1','s2','s3']:
    seg,_=m.transcribe(load(f'/tmp/out/{k}.wav'),language='es',word_timestamps=True)
    res[k]=[{'t':w.word.strip(),'s':round(w.start,3),'e':round(w.end,3)} for s in seg for w in s.words]
json.dump(res,open('/tmp/vo/words.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(res,ensure_ascii=False))
