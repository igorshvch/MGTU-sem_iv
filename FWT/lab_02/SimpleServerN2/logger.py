import logging

logger = logging.getLogger('Internal App Logger')
logger.setLevel(logging.DEBUG)

# create file handler and set level to debug
fh = logging.FileHandler(
    r'C:\Users\igors\My_Code\FWT\web-labs-2021-shevchenko-igor\lab_02\SimpleServerN2\logs\logs.log',
    mode='a',
    encoding='utf-8', delay=False, errors=None)
fh.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s >>> %(message)s')

# add formatter to fh
fh.setFormatter(formatter)

# add fh to logger
logger.addHandler(fh)