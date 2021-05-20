import math

from scipy.stats import chisquare, kstest

def standard_deviation(data):
    n = len(data)
    neg_n = sum(data)/n
    dev = math.sqrt(1/(n-1) * sum((i - neg_n)**2 for i in data))
    return round(dev, 3)

def chisquare_measure(data):
    return round(chisquare(data)[1], 4)

def ks_test(data):
    return round(kstest(data, 'norm')[1], 4)