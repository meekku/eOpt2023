import requests
import json
from datetime import datetime
import spot_price_tomorrow



def get_hourly_prices():
    prices = []
    for i in range(len(parse_json)):
        time = parse_json[ i]['DateTime']
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

def compare_prices():
    today_avg = get_avg()
    tomorrow = spot_price_tomorrow.prices_revealed()

    print("-------------------")
    print("Today's avg " + str(today_avg))

    if(tomorrow):
        tomorrow_avg = spot_price_tomorrow.get_avg()
        print("Tomorrow's avg " + str(tomorrow_avg))
    print("-------------------")

    current_price = get_current_price()


    print("Price now: " +str(current_price))
    if(tomorrow):
        tomorrow_price_same_time = spot_price_tomorrow.get_current_price()
    print("Price tomorrow at the same time: " +str(tomorrow_price_same_time))
    print("-------------------")
    
    upcoming_good_prices_today = get_next_good_price()
    
    for x in range(len(upcoming_good_prices_today)):
        print("Upcoming good prices today: " +str(upcoming_good_prices_today[x]))
    if(tomorrow):
        upcoming_good_prices_tomorrow = spot_price_tomorrow.get_next_good_price()
        for x in range(len(upcoming_good_prices_tomorrow)):
            print("Upcoming good prices tomorrow: " +str(upcoming_good_prices_tomorrow[x]))
    print("-------------------")

def create_json():

    spot_price_json_today = {
        "avg" : get_avg(),
        "current" : get_current_price(),
        "hourly" : get_hourly_prices(),
        "cheaper_than_avg" : is_cheaper(),
        "prices_for_tomorrow": spot_price_tomorrow.prices_revealed()
        
    }

    if spot_price_tomorrow.prices_revealed():
        spot_price_tomorrow_json = {
        "avg_tomorrow" : spot_price_tomorrow.get_avg(),
        "current_tomorrow" : spot_price_tomorrow.get_current_price(),
        "hourly_tomorrow" : spot_price_tomorrow.get_hourly_prices(),
        "cheaper_than_avg_tomorrow" : spot_price_tomorrow.is_cheaper(),
        
        }

        spot_price_json = {**spot_price_json_today, **spot_price_tomorrow_json}
        spot_price_json = json.dumps(spot_price_json, indent=4)
    
    else:
        spot_price_json = json.dumps(spot_price_json_today, indent=4)

    return spot_price_json
    
def push_json(data):
        
        with open('../data/price_data.json', 'w') as f:
            f.write(data)


def main():
    
    response_API = requests.get('https://api.spot-hinta.fi/Today')
    #response_API.raise_for_status()
    data = response_API.text
    global parse_json
    parse_json = json.loads(data)
    
    data = create_json()
    push_json(data)
if __name__ == "__main__":
    main()