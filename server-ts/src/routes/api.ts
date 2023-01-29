/*
Name: apiRoutes.ts

Description: API endpoints regarding the different APIs the program uses.
Example use: GET [url]/api/data/price-today

Author: Johannes Natunen, https://github.com/jopu-n
*/

import express from "express";
// Import Axios for better / easier HTTP requests
import Axios from "axios";
import fs from "fs-extra";

import devices from "../data/devices.json"
import timestampJson from "../data/timestamps.json"

import coordinates from "../data/coordinates";
import scripts from "../middlewares/runScripts";

const apiRouter = express.Router();

// Endpoint for getting price info for today.
// URL: [url]/api/data/price-today
apiRouter.get("/price-today", async (req, res) => {
  try {
    // get price data from API
    const priceData = await Axios.get("https://api.spot-hinta.fi/Today", {
      headers: {
        "User-Agent": "TUAS Solar Energy Optimization App,  https://github.com/meekku/eOpt, johannes.natunen@edu.turkuamk.fi"
      }
    });
    // return same data to user
    return res.status(200).json(priceData.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

// Endpoint for getting price info for tomorrow, if it's available.
// URL: [url]/api/data/price-today
apiRouter.get("/price-tomorrow", async (req, res) => {
  try {
    // get price data from API
    const priceData = await Axios.get("https://api.spot-hinta.fi/DayForward", {
      headers: {
        "User-Agent": "TUAS Solar Energy Optimization App,  https://github.com/meekku/eOpt, johannes.natunen@edu.turkuamk.fi"
      }
    });
    // return same data to user
    return res.status(200).json(priceData.data);
  } catch (err) {
    console.log(err);
    // In case the price info is not released yet,
    // the API returns that info in the form of an error
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
  }
});

// Endpoint for getting the list of cities from coordinates.js
// URL: [url]/api/data/city-list
apiRouter.get("/city-list", async (req, res) => {
  try {
    const list = coordinates.map((x) => x.name);
    return res.status(200).json(list);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

// Endpoint for getting weather prediction.
// URL: [url]/api/data/weather-data
// TODO: Do we need more data than time and temperature?

// I changed get to post so I can post city to get response vv Best regards: Mellu
apiRouter.post("/weather-data", async (req, res) => {
  try {
    const city: string = req.body.city; // Get city from the request body
    if (!city) return res.status(400).json("Please input a city");
    // Get coordinates of city (municipality)
    const cityCoords = coordinates.find(({ name }) => name === city)!.coordinates;

    // Make an axios request to the weather data api.
    // Does not work without an useragent.
    const weatherData = await Axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${cityCoords[1].toFixed(4)}&lon=${cityCoords[0].toFixed(4)}`, {
      headers: {
        "User-Agent": "TUAS Solar Energy Optimization App, https://github.com/meekku/eOpt, johannes.natunen@edu.turkuamk.fi",
        "Accept-Encoding": "gzip, deflate"
      }
    });

    // Get times and temperatures from weather data
    const getTimeAndTemperature = (rawData: any) => {
      const time = rawData.time;
      const temperature = rawData.data.instant.details.air_temperature;
      const nextHour = rawData.data.next_1_hours;

      return {
        time,
        temperature,
        nextHour
      };
    };

    // Make a list of temperature forecasts
    const temperatures = weatherData.data.properties.timeseries.map(getTimeAndTemperature);

    // Return first 24 entries of forecast list
    return res.json(temperatures.slice(0, 48));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

/**
 * Endpoint for getting solar energy production prediction.
 * URL: [url]/api/data/solar-data
 * {
 *   "city": <city from list>
 * }
 *
 * TODO: Get location for API request based on input from user, currently it's hardcoded
 * TODO: As app grows, get paid license for API
 * TODO: Store data for the day in a file to preserve requests?
 */
apiRouter.post("/solar-data", async (req, res) => {
  try {
    const { city } = req.body; // Get city from the request body
    if (!city) return res.status(400);

    // Get coordinates of city (municipality)
    // Not yet used, request is temporarily hardcoded to get solar data from Turku.
    const cityCoords = coordinates.find(({ name }) => name === city)!.coordinates;

    // Get solar energy generation data from api.forecast.solar.
    // Requests limited to 12 per hour. For more frequent requests, get an API key (costs money)
    const solarData = await Axios.get(`https://api.forecast.solar/estimate/60.4556/22.2626/37/0/5.67`, {
      headers: {
        "User-Agent": "TUAS Solar Energy Optimization App,  https://github.com/meekku/eOpt, johannes.natunen@edu.turkuamk.fi"
      }
    });

    // Take only the predictions from the response, we don't really need the message.
    const predictions = solarData.data.result;
    if (!predictions) return res.status(400).json({ message: "Error getting solar data from external API. " });

    return res.status(200).json({ data: predictions });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

apiRouter.get("/py-solar-data", async (req, res) => {
  try {
    let data = await fs.readJson("./../data/solar_data.json");
    let timeData = await fs.readJson("./data/timestamps.json");

    if (!timeData.solar || !data[0]) {
      console.log("update data");
      scripts.updateSolarData();
      let dateNow = new Date();
      await fs.writeJson("./data/timestamps.json", {
        ...timeData,
        solar: dateNow
      });
      data = await fs.readJson("./../data/solar_data.json");
    }

    if (new Date(timeData.solar).getHours() !== new Date().getHours()) {
      console.log("Run python script");
      scripts.updateSolarData();
      let dateNow = new Date();
      await fs.writeJson("./data/timestamps.json", {
        ...timeData,
        solar: dateNow
      });
      data = await fs.readJson("./../data/solar_data.json");
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

apiRouter.get("/py-price-data", async (req, res) => {
  try {
    let data = await fs.readJson("./../data/price_data.json");
    let timeData = await fs.readJson("./data/timestamps.json");

    console.log(timeData.price ? true : false);

    if (!timeData.price) {
      console.log("Update prices");
      scripts.updatePriceData();
      let dateNow = new Date();
      await fs.writeJson("./data/timestamps.json", {
        ...timeData,
        price: dateNow
      });
      data = await fs.readJson("./../data/price_data.json");
    }

    console.log(timeData.price ? true : false);

    if (new Date(timeData.price).getHours() !== new Date().getHours()) {
      console.log("Run python script");
      scripts.updatePriceData();
      let dateNow = new Date();
      await fs.writeJson("./data/timestamps.json", {
        ...timeData,
        price: dateNow
      });
      data = await fs.readJson("./../data/price_data.json");
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong. " });
  }
});

apiRouter.get("/device-list", async (req, res) => {
  return res.status(200).json({ devices })
})

export default apiRouter;
