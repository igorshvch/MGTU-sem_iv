import math

#func1 :: cos
#func2 :: sin(2*x)*(ln(x+5))**2

__version__ = "0.0.1"

def unpack_coord_x(start, stop):
    coord_x = list(i for i in range(start, stop+1))
    return coord_x

def unpack_coord_y_func1(coord_x):
    coord_y = [math.cos(i) for i in coord_x]
    return coord_y

def unpack_coord_y_func2(coord_x):
    coord_y = []
    for x in coord_x:
        try:
            y = math.sin(2*x)*((math.log(x+5))**2)
        except ValueError:
            print(ValueError, x)
            coord_y.append(None)
            continue
        coord_y.append(y)
    return coord_y

