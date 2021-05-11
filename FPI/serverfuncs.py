import math

str_func = {
    "func1": "cos(x)",
    "func2": "sin(2*x)*(ln(x+5))**2",
    "func3": "a1*x^8 + a2*x^7 + a3*x^6 + a4*x^5 + a5*x^4 + a6*x^3 + a7*x^2 + a8*x + a9"
}

__version__ = "0.0.4"

func1 = math.cos
func2 = lambda x: math.sin(2*x)*((math.log(x+5))**2)
func3 = lambda x: 4.3*x**8 + 5.6*x**7 + 2*x**6 + 0.54*x**5 + x**4 + 9*x**3 + 0.33*x**2 + x + 123

########################
# Вычисление точности
########################
def calc_precision(down, up, n_steps):
    if down >= up:
        return None, "Ошибка в интервале"
    else:
        return 1, (up-down)/n_steps

########################
# Метод левых прямоугольников
########################

def calc_integral_rct(func, down, up, n_steps):
    down = float(down)
    up = float(up)
    n_steps = int(n_steps)
    print("calc_integral_rct", down, up, n_steps)
    h = calc_precision(down, up, n_steps)
    if not h[0]:
        return None, h[1]
    result = 0
    for i in range(n_steps):
        try:
            result += (h[1]*func(down))
        except:
            return None, "Ошибка в функции"
        down+=h[1]
        if down>=up:
            break
    return 1, result

########################
# Метод трапеций
########################

def calc_integral_trp(func, down, up, n_steps):
    down = float(down)
    up = float(up)
    n_steps = int(n_steps)
    print("calc_integral_trp", down, up, n_steps)
    h = calc_precision(down, up, n_steps)
    if not h[0]:
        return None, h[1]

    result = 0
    result += (h[1]*func(down))/2
    down+=h[1]
    
    for i in range(1, n_steps):
        try:
            result += (h[1]*func(down))
        except:
            return None, "Ошибка в функции"
        down+=h[1]
    
    result += (h[1]*func(down))/2
        
    return 1, result

########################
# Поиск точки пересечения методом дихотомии
########################

def eval_intersection_point(func, down, up, eps):
    down = float(down)
    up = float(up)
    eps = float(eps)
    total = 100
    if (func(down)*func(up)) > 0:
        return None, "На заданном интервале нет точек пересечения с осью абсцисс либо их больше одной"
    elif func(down) == 0:
        return 1, down
    elif func(up) == 0:
        return 2, up
    #elif (func(down)*func(up)) <=0:
    else:
        while (abs(up-down) > eps) and total:
            total -= 1
            middle = (up+down)/2
            #if total%10000 == 0:
            print(
                "INFO:",
                100-total,
                ":",
                "a:",
                down,
                "middle:", 
                middle,
                "b:",
                up,
                "f(a):",
                math.cos(down),
                "f(middle):",
                math.cos(middle),
                "f(b):",
                math.cos(up)
            )
            if func(middle) == 0:
                return 1, middle
            if func(down)*func(middle) < 0:
                up = middle
            else:
                down = middle
        print("total iteration count:", 1000000-total)
        return 1, (up+down)/2

########################
# Вычисление координат
########################

def eval_coords(func, start, stop, step):
    start = float(start)
    stop = float(stop)
    step = float(step)
    coords_x = []
    coords_y = []
    while start < stop:
        coords_x.append(start)
        try:
            coords_y.append(func(start))
        except:
            return (0, None, None, "Ошибка: функция не определена на интервале")
        start = round(start+step, 2)
    coords_x.append(stop)
    coords_y.append(func(stop))
    return (1, coords_x, coords_y, "")