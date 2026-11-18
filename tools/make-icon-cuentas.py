"""Icono de Cuentas claras: una libreta con un cheque y una moneda."""
from PIL import Image, ImageDraw

SIZE = 512
BG = (117, 28, 180)        # magenta de marca Inflinds
PAPER = (250, 248, 244)    # papel
INK = (27, 30, 34)         # tinta
ACCENT = (248, 4, 156)     # magenta
YELLOW = (255, 216, 10)    # amarillo
GREEN = (46, 125, 79)


def rounded(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def make(size):
    s = size / SIZE
    img = Image.new("RGBA", (size, size), BG + (255,))
    d = ImageDraw.Draw(img)

    # hoja de libreta
    x0, y0, x1, y1 = int(96 * s), int(86 * s), int(416 * s), int(426 * s)
    rounded(d, (x0, y0, x1, y1), int(28 * s), PAPER)
    # lomo
    rounded(d, (x0, y0, int(150 * s), y1), int(28 * s), (233, 226, 212))
    d.rectangle((int(150 * s), y0, int(158 * s), y1), fill=(214, 207, 192))

    # renglones
    for i, yy in enumerate((170, 220, 270, 320)):
        right = int(380 * s) if i < 3 else int(300 * s)
        d.rounded_rectangle((int(190 * s), int(yy * s), right, int((yy + 14) * s)),
                            radius=int(7 * s), fill=(214, 207, 192))

    # cheque
    cx, cy = int(330 * s), int(360 * s)
    d.ellipse((cx - int(54 * s), cy - int(54 * s), cx + int(54 * s), cy + int(54 * s)),
              fill=ACCENT)
    d.line((cx - int(26 * s), cy, cx - int(6 * s), cy + int(20 * s), cx + int(30 * s), cy - int(22 * s)),
           fill=PAPER, width=int(16 * s), joint="curve")

    # moneda
    mx, my = int(370 * s), int(150 * s)
    d.ellipse((mx - int(44 * s), my - int(44 * s), mx + int(44 * s), my + int(44 * s)),
              fill=YELLOW)
    d.ellipse((mx - int(30 * s), my - int(30 * s), mx + int(30 * s), my + int(30 * s)),
              fill=BG)
    d.ellipse((mx - int(12 * s), my - int(12 * s), mx + int(12 * s), my + int(12 * s)),
              fill=YELLOW)

    return img


base = make(SIZE)
base.save("public/tools/accounts-receivable/icons/icon-512.png")
base.resize((192, 192), Image.LANCZOS).save("public/tools/accounts-receivable/icons/icon-192.png")
base.resize((180, 180), Image.LANCZOS).save("public/tools/accounts-receivable/icons/apple-touch-icon.png")
base.resize((32, 32), Image.LANCZOS).save("public/tools/accounts-receivable/icons/favicon-32.png")
print("iconos de Cuentas claras listos")
