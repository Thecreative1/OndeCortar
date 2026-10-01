"""Gera versões .webp das fotos da loja e da revista (ao lado do .jpg original).

Idempotente: só (re)gera quando o .webp não existe ou é mais antigo do que o .jpg.
Só guarda o .webp quando poupa pelo menos 10% — se não, apaga o que gerou.
Os .jpg originais nunca são alterados (continuam a ser o src das <img>, o og:image
e o que o Google Imagens indexou).

Uso: python scripts/gerar-webp.py
Depois: node scripts/apply-webp-images.js  (envolve as <img> em <picture>)
"""
import glob
import io
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATTERNS = ["imagens/produtos/*.jpg", "imagens/produtos/*.jpeg", "imagens/revista/*.jpg", "imagens/revista/*.jpeg"]
QUALITY = 80
MIN_SAVING = 0.10


def main():
    made = kept_jpg = skipped = 0
    saved = 0
    for pattern in PATTERNS:
        for src in sorted(glob.glob(os.path.join(ROOT, pattern))):
            dst = os.path.splitext(src)[0] + ".webp"
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                skipped += 1
                continue
            with Image.open(src) as im:
                buf = io.BytesIO()
                im.convert("RGB").save(buf, "WEBP", quality=QUALITY, method=6)
            original = os.path.getsize(src)
            if buf.tell() > original * (1 - MIN_SAVING):
                if os.path.exists(dst):
                    os.remove(dst)
                kept_jpg += 1
                continue
            with open(dst, "wb") as fh:
                fh.write(buf.getvalue())
            made += 1
            saved += original - buf.tell()
    print(f"webp gerados: {made} | já atualizados: {skipped} | sem ganho (fica só o jpg): {kept_jpg} | poupança: {saved // 1024} KB")


if __name__ == "__main__":
    main()
