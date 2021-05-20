import numpy as np
from scipy.stats import uniform, norm, poisson

def create_x_coords_array(start, stop, steps):
    return np.linspace(start, stop, num=steps)

def create_y_for_uniform_pdf(x_array):
    return uniform.pdf(x_array)

def create_y_for_uniform_cdf(x_array):
    return uniform.cdf(x_array)

def create_y_for_norm_pdf(x_array, mu, sigma):
    return norm.pdf(x_array, loc=mu, scale=sigma)

def create_y_for_norm_cdf(x_array, mu, sigma):
    return norm.cdf(x_array, loc=mu, scale=sigma)

def create_y_for_poisson_pmf(stop, lbda):
    return [poisson.pmf(k=x, mu=lbda) for x in range(stop)]

def create_y_for_poisson_cdf(stop, lbda):
    return [poisson.cdf(k=x, mu=lbda) for x in range(stop)]