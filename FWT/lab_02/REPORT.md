# Отчет по лабораторной работе № 2


## *Введение: используемые технологии*

Для выполнения лабораторной работы использовался сервер приложения Flask (Python), развернутый на веб-сервере Apache. Проксирование, согласно заданию, осществлялось через сервер Nginx

## *Часть 1: замерить скорость отдачи контента, добавить логгирование входящих запросов (задание 1)*
Замер скорости отдачи контента осуществлен с помощью утилиты Apache Benchmark. В качестве тестовых параметров использовались следующие:-с 100 -n 10000, что означает 100 конкуррентных (одновременных) запросов при общем числе запросов в 10000.
Логгирование входящих запросов и формирование ответов на стороне сервера приложения осуществлено с помощью модуля logging из стандартной библиотеки языка Python. Логгер сконфигурирован в файле logger.py в папке приложения. Далее он импортируется в основной исполняемый файл приложения - app.py. Логи записываются в файл logs.log в директории ./logs в папке приложения.
Результаты замера скорости отдачи контента, а также замера скорости выполнения заросов DELETE, POST, PUT, OPTIONS (время в миллисекундах):  
|№|Команда Apache Benchmark|Метод|Ср. кол-во запросов в сек.|Ср. время обработки|Ср. время обработки(учет конкур.)|
|-|-|-|---:|---:|---:|
|1|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/|GET|506,3|197,510|1,975|
|2|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/hack|GET|594,8|168,124|1,681|
|3|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/static/img/logo3.png|GET|328,73|304,203|3,042|
|4|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/static/img/img.jpg|GET|297,31|336,349|3,363|
|5|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/users|GET|599,57|166,785|1,668|
|6|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:80/users/1|GET|523,71|190,944|1,909|
|7|...\Apache24\bin>ab -c 100 -n 10000 -m DELETE http://127.0.0.1:80/users/1|DELETE|559,92|178,596|1,786|
|8|...\Apache24\bin>ab -c 100 -n 10000 -T application/json -p ...\testDataPost.json -m POST http://127.0.0.1:80/users|PUT|529,98|188,687|1,887|
|9|...\Apache24\bin>ab -c 100 -n 10000 -T application/json -u ...\testDataPut.json -m PUT http://127.0.0.1:80/users/1|PUT|503,53|198,599|1,986|
|10|...\Apache24\bin>ab -c 100 -n 10000 -m OPTIONS http://127.0.0.1:80/users|OPTIONS|621,64|160,866|1,609|  
## *Часть 2: конфигурирование Nginx, отдача статического контента через Nginx, замер времени ответа сервера с подключенным Nginx (задания 2 и 3)*
Замер скорости отдачи контента осуществлен с помощью утилиты Apache Benchmark. В качестве тестовых параметров использовались следующие:-с 100 -n 10000
|№|Команда Apache Benchmark|Ср. кол-во запросов в сек.|Ср. время обработки|Ср. время обработки (учет конкур.)|Сокращение затрат на запрос(%)|
|-|-|-|---:|---:|---:|
|1|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8080/|846,87|118,081|1,181|-40%|
|2|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8080/hack|1320,25|75,743|0,757|-55%|
|3|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8080/static/img/logo3.png|929,95|107,533|1,075|-65%|
|4|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8080/static/img/img.jpg|1084,79|92,184|0,922|-73%|
Как видно из приведенной таблицы, скорость отдачи статического контента через Nginx существенно возросла
## *Часть 3: нстроить кэширование и gzip сжатие файлов.  Замерить время ответа с сервера (задание 4)*
Кэширующий сервер настроен на прослушивание порта 8080, проксирующий сервер прослушивает порт 8081. Степень сжатия Nginx равна 5
Замер скорости отдачи контента осуществлен с помощью утилиты Apache Benchmark. В качестве тестовых параметров использовались следующие:-с 100 -n 10000  
|№|Команда Apache Benchmark|Ср. кол-во запросов в сек.|Ср. время обработки|Ср. время обработки (учет конкур.)|Изменение по ср. с ч. 2 или ч. 1(%)|
|-|-|-|---:|---:|---:|
|1|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/|1095,14|91,312|0,913|-23% (ч.2)|
|2|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/hack|1423,27|71,112|0,711|-6% (ч.2)|
|3|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/static/img/logo3.png|925,28|108,075|1,081|+0,5% (ч.2)|
|4|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/static/img/img.jpg|892,07|112,099|1,121|+22% (ч.2)|
|5|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/users|1130,19|88,481|0,885|-47% (ч.1)|
|6|...\Apache24\bin>ab -c 100 -n 10000 http://127.0.0.1:8081/users/1|1125,94|88,815|0,888|-53% (ч.1)|
Как видно из приведенной таблицы, время ответа сервера при использовании сжатия gzip и кэширования снижается еще больше для текстовых форматов данных, однако остается почти неизменным или даже возрастает для бинарных форматов. Последнее можно связать с тем фактом, что файлы изображений изначально представлены в сжатом виде и схемы сжатия gzip не позволяют выграть в размере передаваемых данных, однако процессорное время на обработку процедуры сжатия увеличивает время ответа сервера.  
## *Часть 4: запустить 3 инстанса сервера, настроить перенаправление таким образом, чтобы на серверы приходили запросы в соотношении 3:1:1 (задание 5)*
Для выполнения задания инстнасы запускаются на сервере Apache с помощью директивы VirualHost и доступны на портах 5000, 5001, 5002:
```
<VirtualHost *:5000>
    ServerName localhost
    WSGIScriptAlias / C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02/wsgi_scripts/starter.wsgi
    <Directory C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02>
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:5001>
    ServerName localhost
    WSGIScriptAlias / C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02/wsgi_scripts/starter.wsgi
    <Directory C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02>
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:5002>
    ServerName localhost
    WSGIScriptAlias / C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02/wsgi_scripts/starter.wsgi
    <Directory C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02>
        Require all granted
    </Directory>
</VirtualHost>
```
Код конфигурации Nginx для балансировки (в контексте http):
```
upstream backend {
        server 127.0.0.1:5000 weight=3;
        server 127.0.0.1:5001;
        server 127.0.0.1:5002;
    }
```
## *Часть 5: написать и запустить 2 мини-сервера (задание 6)*
Серверы приложений размещаются на веб-сервере Apache, порты 5003, 5004. Код конфигурации:
```
<VirtualHost *:5003>
    ServerName localhost
    WSGIScriptAlias / C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02/wsgi_scripts/starter1.wsgi
    <Directory C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02>
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:5004>
    ServerName localhost
    WSGIScriptAlias / C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02/wsgi_scripts/starter2.wsgi
    <Directory C:/Users/igors/My_Code/FWT/web-labs-2021-shevchenko-igor/lab_02>
        Require all granted
    </Directory>
</VirtualHost>
```
Код конфигурации Nginx (в контексте server):
```
location =/service1 {
    proxy_pass http://localhost:5003/;
}

location =/service2 {
    proxy_pass http://localhost:5004/;
}
```
## *Часть 6: настроить отдачу страницы о состоянии сервера Nginx*
Код конфигурации Nginx (в контексте server):
```
location = /basic_status {
    stub_status;
}
```
---

*[`Windows-Apache-Flask stack: installation guide`](https://dev.to/willmvs/flask-deployment-on-windows-139b)*  
*[`Apache Benchmark docs`](https://httpd.apache.org/docs/2.4/programs/ab.html)*
*[`cheat-sheet for markdown syntax`](https://www.markdownguide.org/cheat-sheet/)*  