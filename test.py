# -*- coding: utf-8; -*-
#
# https://imaginhome.icade.fr icade All rights reserved.
# alisaidomar <saidomarali@mail.com>
# 2019-02-05

import requests
url = "http://localhost:8000/users?name=test%d"

for i in range(1000):
    r = requests.get(url % i)
    print(r.status_code)