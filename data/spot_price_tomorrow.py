import requests
import json
from datetime import datetime

response_API = requests.get('https://api.spot-hinta.fi/DayForward')
data = response_API.text
global parse_json
try:
    parse_json = json.loads(data)
except json.decoder.JSONDecodeError:
    print("No data for tomorrow")

def prices_revealed():
    
    if(get_time() >= 14):
        if len(parse_json) == 24:
            return True
        
    return False

def get_hourly_prices():
    prices = []
    for i in range(len(parse_json)):
        time = parse_json[i]['DateTime']
        time = simplify(time)
        price = parse_json[i]['PriceWithTax']
        values = { time: price}
        prices.append(values)

    return prices

def get_avg():
    sum = 0
    for count, i in enumerate(range(len(parse_json))):
        info = parse_json[i]['PriceWithTax']
        sum += info
 
    avg = sum / count
    avg = round(avg, 4)
    return avg
    
def get_current_price():
    current_time = get_time()
    price_now = parse_json[current_time]['PriceWithTax']
    return price_now

def is_cheaper():
    avg = get_avg()
    current_price = get_current_price()

    if current_price <= avg:
        return True
    else: return False

def get_next_good_price():
    avg = get_avg()
    upcoming_prices = parse_json[get_time():]
    upcoming_good_prices = []
    for x in range(len(upcoming_prices)):
        if upcoming_prices[x]['PriceWithTax'] <= avg:
            price = simplify(upcoming_prices[x]['DateTime'])
            upcoming_good_prices.append(price)
    return upcoming_good_prices

def simplify(data):
    # DateTime is in YYYY-MM-DDTHH:MM:SS+TIMEZONE
    # get rid of date    
    time_and_date = data.split("T")
    data = time_and_date[-1]
    # get rid of timezone and seconds
    time = ':'.join(data.split(":",2)[:2])
    data = time

    return data

def get_time():
    current_time = datetime.now().strftime("%H")
    return int(current_time)
