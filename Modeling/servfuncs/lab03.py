import numpy as np

TIME_DELTA = 1e-6
SEED = 10

def get_start_probabilities(n, all_equal=True):
    if all_equal:
        return [1/n] * n
    else:
        res = [0] * n
        res[0] = 1
        return res

def calc_probas(matrix, n):
    a = np.zeros((n, n))  # матрица для решения СЛАУ
    b = np.zeros(n)  # матрица для результатов

    for i in range(n - 1):
        for j in range(n):
            if i != j:
                a[i][j] += matrix[j][i]
            else:
                a[j][j] -= sum(matrix[j])
    a[-1] = np.ones(n)
    b[-1] = 1  # нормализация матрицы

    try:
        p = np.linalg.solve(a, b)
    except np.linalg.LinAlgError:
        p = np.zeros(n)

    return p, b

def dps(matrix, probabilities):
    n = len(matrix)
    return [
        TIME_DELTA * sum(
            [
                probabilities[j] * (-sum(matrix[i]) + matrix[i][i])
                if i == j else
                probabilities[j] * matrix[j][i]
                for j in range(n)
            ]
        )
        for i in range(n)
    ]


def calc_stabilization_times(matrix, start_probabilities, limit_probabilities, n, current_time=0):
    current_probabilities = start_probabilities.copy()
    stabilization_times = [0 for i in range(n)]
    
    total_lambda_sum = np.sum(matrix) * SEED
    cool_eps = [p/total_lambda_sum for p in limit_probabilities]

    while not all(stabilization_times):
        curr_dps = dps(matrix, current_probabilities)
        for i in range(n):
            if (not stabilization_times[i] and curr_dps[i] <= cool_eps[i] and
                    abs(current_probabilities[i] - limit_probabilities[i]) <= cool_eps[i]):
                stabilization_times[i] = current_time
            current_probabilities[i] += curr_dps[i]

        current_time += TIME_DELTA

    return stabilization_times


def calc_probability_over_time(matrix, start_probabilities, end_time):
    n = len(matrix)
    current_time = 0
    current_probabilities = start_probabilities.copy()

    probabilities_over_time = []
    times = []

    while current_time < end_time:
        probabilities_over_time.append(current_probabilities.copy())
        curr_dps = dps(matrix, current_probabilities)
        for i in range(n):
            current_probabilities[i] += curr_dps[i]

        current_time += TIME_DELTA

        times.append(current_time)

    return times, probabilities_over_time


def lab03_main(matr):

    np_matr = np.array(matr)
    N = len(matr)
    
    # Находим предельные вероятности
    probas, start_probas = calc_probas(np_matr, N)
    print("Средний процент времени нахождения системы в предельном режиме в состоянии n:")
    percents = []
    for i in range(N):
        pr = round(probas[i], 2)
        perc = round(pr * 100, 2)
        print("S{} - {}%".format(i, perc))
        percents.append(perc)

    # Находим время стабилизации
    #start_probabilities = get_start_probabilities(N, all_equal=False)
    stabilization_time = calc_stabilization_times(np_matr.tolist(), start_probas.tolist(), probas, N)  # TODO fix
    print('Время стабилизации:')
    for i in stabilization_time:
        print(i)
    return [[round(p*0.01, 2), round(t, 4)] for p,t in zip(percents, stabilization_time)]