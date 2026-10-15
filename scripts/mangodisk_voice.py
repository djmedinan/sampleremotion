import wave,sys
from piper import PiperVoice, SynthesisConfig
v=PiperVoice.load('/tmp/pm/es_MX-ald-medium.onnx')
T={'s1':'¿Tu disco está lleno y no sabes qué ocupa tanto espacio?',
's2':'Prueba MangoDisk. Es gratis, de código abierto, y escanea rápido para encontrar archivos gigantes, duplicados y cachés escondidas.',
's3':'Te muestra qué ocupa espacio, y tú decides qué borrar. ¡Guárdalo!'}
for k,t in T.items():
    with wave.open(f'/tmp/vo/{k}.wav','wb') as w: v.synthesize_wav(t,w,syn_config=SynthesisConfig(length_scale=0.82,noise_w_scale=0.6))
