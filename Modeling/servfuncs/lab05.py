from random import random
from time import time

class EvenDistribution:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def generate(self):
        return self.a + (self.b - self.a) * random()

#############################################################

class Request:
    cur_id = 0

    def __init__(self):
        self.id = Request.cur_id
        Request.cur_id += 1

#############################################################
class Generator:
    def __init__(self, distribution):
        self.work_time_distribution = distribution
        self.time_to_finish = 0

    def upd_time(self, dt):
        self.time_to_finish -= dt

        if self.time_to_finish <= 1e-5:
            self.time_to_finish = self.work_time_distribution.generate()
            return Request()

        return None

#############################################################

class Operator:
    def __init__(self, send_to, distribution):
        self.work_time_distribution = distribution
        self.busy = False
        self.send_to = send_to
        self.current_req = None
        self.time_to_finish = 0

    def accept_request(self, request):
        self.busy = True
        self.current_req = request
        self.time_to_finish = self.work_time_distribution.generate()

    def finish_cur_request(self):
        self.send_to.append(self.current_req)
        self.busy = False
        self.current_req = None

    def upd_time(self, dt):
        self.time_to_finish -= dt
        if self.busy and self.time_to_finish <= 1e-5:
            self.finish_cur_request()
            return 'req fin'
        return 'pass'

#############################################################

class Processor:
    def __init__(self, requests_queue, distribution):
        self.work_time_distribution = distribution
        self.busy = False
        self.requests_queue = requests_queue
        self.current_req = None
        self.time_to_finish = 0

    def upd_time(self, dt):
        self.time_to_finish -= dt

        # Еще занят, но время работы закончилось
        if self.busy and self.time_to_finish <= 1e-5:
            self.busy = False
            #print(self.current_req.id, 'proc')
            self.current_req = None
            return 'req fin'

        # Свободен, а в очереди есть заявки
        if not self.busy and len(self.requests_queue) != 0:
            self.current_req = self.requests_queue.pop(0)
            self.time_to_finish = self.work_time_distribution.generate()
            self.busy = True
            return 'req acc'

        return 'pass'

#############################################################

unit_of_time = 0.01  # еденица системного времени - 0.01 минуты


# Возвращает индекс первого свободного оператора или -1
def pick_operator(operators):
    for i in range(len(operators)):
        if not operators[i].busy:
            return i
    return -1


# Один тик времени
def one_step(generator, operators, processors, request_info, generate_new=True):
    # Обновление генератора
    if generate_new:
        request = generator.upd_time(unit_of_time)
        if request:
            #print(request.id, 'gen')
            request_info['generated'] += 1
            i_operator = pick_operator(operators)
            if i_operator == -1: # все операторы заняты
                #print(request.id, 'lost')
                request_info['lost'] += 1
            else:
                operators[i_operator].accept_request(request)

    # Обновление операторов
    for cur_operator in operators:
        cur_operator.upd_time(unit_of_time)

    # Обновление компьютеров
    for cur_processor in processors:
        res = cur_processor.upd_time(unit_of_time)
        if res == 'req fin':  # заявка была обработана
            request_info['processed'] += 1


def modeling(generator, operators, processors, total_incoming_requests):
    request_info = {'generated': 0, 'lost': 0, 'processed': 0}

    # Пока не сгенерируется нужное число заявок
    while request_info['generated'] < total_incoming_requests:
        one_step(generator, operators, processors, request_info)

    # Пока все сгенерированные заявки не пройдут систему
    while request_info['lost'] + request_info['processed'] < total_incoming_requests:
        one_step(generator, operators, processors, request_info, False)

    return request_info


def lab05_main(
        params = {
            "a0": 8,
            "b0": 12,
            "a1": 15,
            "b1": 25,
            "a2": 30,
            "b2": 50,
            "a3": 20,
            "b3": 60,
            "proc1": 15,
            "proc2": 30,
            "reqs": 300
        }
    ):
    client_generator = Generator(EvenDistribution(params["a0"], params["b0"]))

    first_queue = []
    second_queue = []

    operators = [
        Operator(first_queue, EvenDistribution(params["a1"], params["b1"])),    # самый производительный
        Operator(first_queue, EvenDistribution(params["a2"], params["b2"])),
        Operator(second_queue, EvenDistribution(params["a3"], params["b3"]))    # наименее производительный
    ]

    processors = [
        Processor(first_queue, EvenDistribution(params["proc1"], params["proc1"])),   # ровно 15 минут
        Processor(second_queue, EvenDistribution(params["proc2"], params["proc2"]))   # ровно 30 минут
    ]

    total_requests = params["reqs"]

    t_start = time()
    res = modeling(client_generator, operators, processors, total_requests)

    print('time seconds', time() - t_start)
    for key in res.keys():
        print(key, res[key])

    print('lost', res['lost'] / total_requests)

    res["lost_percent"] = round(res['lost'] / total_requests, 4)

    return res