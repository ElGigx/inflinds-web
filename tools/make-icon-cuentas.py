"""Genera el icono de "Cuentas claras" en la misma línea que el de "Cobro por tiempo".

El anterior: fondo noche, cronómetro blanco, manecilla magenta y moneda amarilla
con "$" al frente y abajo a la derecha. Este: la libreta con renglones y un
check magenta, y la misma moneda en el mismo sitio. Se dibuja a 1024 y se
reduce, para que el borde quede limpio en 192 y 180.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "tools" / "accounts-receivable" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

S = 1024
NIGHT = (14, 10, 27, 255)
WHITE = (255, 255, 255, 255)
MAGENTA = (248, 4, 156, 255)
YELLOW = (255, 216, 10, 255)

img = Image.new("RGBA", (S, S), NIGHT)
d = ImageDraw.Draw(img)

# La libreta: página, lomo y renglones.
d.rounded_rectangle([250, 240, 770, 760], radius=48, outline=WHITE, width=64)
d.line([(350, 300), (350, 700)], fill=WHITE, width=40)
for y in (390, 470, 550):
    d.line([(420, y), (670, y)], fill=WHITE, width=40)

# El check, en magenta, como la manecilla del cronómetro.
d.line(
    [(470, 600), (540, 665), (700, 505)],
    fill=MAGENTA,
    width=64,
    joint="curve",
)

# La moneda, al frente y abajo a la derecha, igual que en el anterior.
coin_x, coin_y, coin_r = 792, 780, 118
d.ellipse(
    [coin_x - coin_r - 18, coin_y - coin_r - 18, coin_x + coin_r + 18, coin_y + coin_r + 18],
    fill=NIGHT,
)
d.ellipse(
    [coin_x - coin_r, coin_y - coin_r, coin_x + coin_r, coin_y + coin_r],
    fill=YELLOW,
)

font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 150)
d.text((coin_x, coin_y + 8), "$", font=font, fill=NIGHT, anchor="mm")

# Exportación en los cuatro tamaños que usa la PWA.
img = img.convert("RGB")

for size, name in [
    (512, "icon-512.png"),
    (192, "icon-192.png"),
    (180, "apple-touch-icon.png"),
    (32, "favicon-32.png"),
]:
    img.resize((size, size), Image.LANCZOS).save(OUT / name, "PNG", optimize=True)

print("ok:", ", ".join(p.name for p in sorted(OUT.glob("*.png"))))
