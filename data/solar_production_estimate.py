# solar_production_estimate.py
# Script handles data from API called https://api.forecast.solar/ and creates JSON file to server
# Author Emil Vuorio


import requests
import json
from datetime import datetime, timedelta

def get_hourly_production():

    data = parse_json["result"]["watt_hours_period"]
    items = list(data.items())
    today_hourly = []
    tomorrow_hourly = []
    
    # this is spaghetti code, will be updated
    for i in range(len(items)):
        split = items[i][0].split(" ")

        values = { split[-1]: int(items[i][1])}
        if split[0] == datetime.now().strftime("%Y-%m-%d"):
            today_hourly.append(values)
        elif split[0] == (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d"):
            tomorrow_hourly.append(values)
    
    return [today_hourly, tomorrow_hourly]

def get_currents():

    # Get current production and estimated production for same time tomorrow

    current_time = datetime.now().strftime("%Y-%m-%d %H:00:00")
    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d %H:00:00")
    current_production = parse_json["result"]["watt_hours_period"][current_time]
    tomorrow_same_time = parse_json["result"]["watt_hours_period"][tomorrow]
    
    return [current_production, tomorrow_same_time]

def get_totals():
    # Get total estimated prodcution for today and tomorrow
    today_forecast = list(parse_json["result"]["watt_hours_day"].values())[0]
    tomorrow_forecast = list(parse_json["result"]["watt_hours_day"].values())[1]
    
    return [today_forecast, tomorrow_forecast]

def create_json():

    solar_production_json = {
        "hourly_today" : get_hourly_production()[0],
        "current_today" : get_currents()[0],
        "total_today" : get_totals()[0],
        "hourly_tomorrow" : get_hourly_production()[1],
        "current_tomorrow" : get_currents()[1],
        "total_tomorrow" : get_totals()[1]
    }

    solar_production_json = json.dumps(solar_production_json, indent=4)

    return solar_production_json

def push_json(data):

    with open('../data/solar_data.json', 'w') as f:
        f.write(data)




def main():

    # set up
    # API is limited to 12 requests per hour, so when developing the code I am using hardcoded version of the same data

    RESPONSE_api = requests.get("https://api.forecast.solar/estimate/60.45564447557863/22.262629223272405/37/0/5.67")
    data = RESPONSE_api.text
    # data_hc = {"result":{"watts":{"2022-11-22 08:46:00":0,"2022-11-22 09:00:00":15,"2022-11-22 10:00:00":27,"2022-11-22 11:00:00":88,"2022-11-22 12:00:00":169,"2022-11-22 13:00:00":282,"2022-11-22 14:00:00":296,"2022-11-22 15:00:00":184,"2022-11-22 15:47:00":0,"2022-11-23 08:48:00":0,"2022-11-23 09:00:00":26,"2022-11-23 10:00:00":15,"2022-11-23 11:00:00":15,"2022-11-23 12:00:00":17,"2022-11-23 13:00:00":16,"2022-11-23 14:00:00":11,"2022-11-23 15:00:00":4,"2022-11-23 15:45:00":0},"watt_hours_period":{"2022-11-22 08:46:00":0,"2022-11-22 09:00:00":2,"2022-11-22 10:00:00":21,"2022-11-22 11:00:00":58,"2022-11-22 12:00:00":129,"2022-11-22 13:00:00":226,"2022-11-22 14:00:00":289,"2022-11-22 15:00:00":240,"2022-11-22 15:47:00":72,"2022-11-23 08:48:00":0,"2022-11-23 09:00:00":3,"2022-11-23 10:00:00":21,"2022-11-23 11:00:00":15,"2022-11-23 12:00:00":16,"2022-11-23 13:00:00":17,"2022-11-23 14:00:00":14,"2022-11-23 15:00:00":8,"2022-11-23 15:45:00":2},"watt_hours":{"2022-11-22 08:46:00":0,"2022-11-22 09:00:00":2,"2022-11-22 10:00:00":23,"2022-11-22 11:00:00":81,"2022-11-22 12:00:00":210,"2022-11-22 13:00:00":436,"2022-11-22 14:00:00":725,"2022-11-22 15:00:00":965,"2022-11-22 15:47:00":1037,"2022-11-23 08:48:00":0,"2022-11-23 09:00:00":3,"2022-11-23 10:00:00":24,"2022-11-23 11:00:00":39,"2022-11-23 12:00:00":55,"2022-11-23 13:00:00":72,"2022-11-23 14:00:00":86,"2022-11-23 15:00:00":94,"2022-11-23 15:45:00":96},"watt_hours_day":{"2022-11-22":1037,"2022-11-23":96}},"message":{"code":0,"type":"success","text":"","info":{"latitude":60.4556,"longitude":22.2626,"distance":0,"place":"KOy Turun Kauppiaskadunportti, 17, L\u00e4ntinen Pitk\u00e4katu, VI, Keskusta, Turku, Turun seutukunta, Varsinais-Suomi, Lounais-Suomen aluehallintovirasto, Manner-Suomi, 20100, Suomi / Finland","timezone":"Europe/Helsinki","time":"2022-11-22T10:39:02+02:00","time_utc":"2022-11-22T08:39:02+00:00"},"ratelimit":{"period":3600,"limit":12,"remaining":8}}}
    #json_data = json.dumps(data_hc)

    global parse_json
    parse_json = json.loads(data)
    print(create_json())
    data = create_json()
    push_json(data)
    
if __name__ == "__main__":
    main()