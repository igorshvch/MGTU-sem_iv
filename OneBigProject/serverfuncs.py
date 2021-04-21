import math

#func1 :: cos
#func2 :: sin(2*x)*(ln(x+5))**2

__version__ = "0.0.4"

func1 = math.cos
func2 = lambda x: math.sin(2*x)*((math.log(x+5))**2)

def unpack_coord_x(start, stop):
    coord_x = list(i for i in range(start, stop+1))
    return coord_x

def unpack_coord_y(coord_x, func):
    coord_y = []
    for x in coord_x:
        try:
            y = func(x)
        except Exception as err:
            print(err, "at coord_x", x)
            coord_y.append(None)
            continue
        coord_y.append(y)
    return coord_y

def cover_with_object(path):
    with open(path, mode='r', encoding='utf-8') as f:
        text = f.read()
    text = text.replace("/n", " ")
    return '{{"task": "{}"}}'.format(text)

########################
# Метод левых прямоугольников
########################
def calc_precision(down, up, n_steps):
    if down >= up:
        return None, "Ошибка в интервале"
    else:
        return 1, (up-down)/n_steps

def calc_integral_rct(func, down, up, n_steps):
    down = float(down)
    up = float(up)
    n_steps = int(n_steps)
    print("calc_integral_rct", down, up, n_steps)
    h = calc_precision(down, up, n_steps)
    if not h[0]:
        return None, h[1]
    result = 0
    while down<=up:
        try:
            result += (h[1]*func(down))
        except:
            return None, "Ошибка в функции"
        down+=h[1]
    return 1, result