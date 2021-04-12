import math

#func1 :: cos
#func2 :: sin(2*x)*(ln(x+5))**2

__version__ = "0.0.2"

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

