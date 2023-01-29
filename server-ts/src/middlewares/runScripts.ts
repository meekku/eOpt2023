import { spawn } from "child_process";

const updateSolarData = () => {

    spawn("python", ["./../data/solar_production_estimate.py"]);
    
}

const updatePriceData = () => {

    spawn("python", ["./../data/spot_price_today.py"]);
    
}

const scripts = {
    updateSolarData,
    updatePriceData
}

export default scripts;

