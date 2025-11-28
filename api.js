export const findStation = async station =>
{
    return await fetch(`https://stationpicker.nationalrail.co.uk/stationPicker/${station}`, {
        method: "GET",
        headers: {
            "Origin": "https://www.nationalrail.co.uk"
        }
    })
    .then(j => j.json())
    .then(s => s.payload.stations.filter(s => s.classification === "NORMAL"))
};