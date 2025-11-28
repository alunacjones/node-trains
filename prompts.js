import { findStation } from "./api.js"
import { select, input } from "@inquirer/prompts";
export const chooseStation = async (message, station) =>
{
    try {
        if (!station) {
            station = await input({
                message: `Provide a ${message}`
            })
        }
        var stations = await findStation(station);

        if (stations.length === 1)
        {
            return stations[0].crsCode
        }
        else
        {
            const answer = await select({
                message,
                choices: stations.map(s => ({ name: s.name, value: s.crsCode}))                
            });
            
            return answer;
        }
    }
    catch (e) {
        console.log(e);
        return station;
    }
}