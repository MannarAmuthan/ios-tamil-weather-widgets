// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;



const openweather_api_key = ""
const font_size = 11



const paruvangal = [
  { start: "04-14", end: "05-13", climate: "இளவேனில்" },
  { start: "05-14", end: "06-13", climate: "இளவேனில்"},
  { start: "06-14", end: "07-14", climate: "முதுவேனில்"},
  { start: "07-15", end: "08-14", climate: "முதுவேனில்"},
  { start: "08-15", end: "09-15", climate: "கார்"},
  { start: "09-16", end: "10-15", climate: "கார்"},
  { start: "10-16", end: "11-14", climate: "குளிர்"},
  { start: "11-15", end: "12-14", climate: "குளிர்"},
  { start: "12-15", end: "01-13", climate: "முன்பனி"},
  { start: "01-14", end: "02-12", climate: "முன்பனி"},
  { start: "02-13", end: "03-13", climate: "பின்பனி"},
  { start: "03-14", end: "04-13", climate: "பின்பனி"}
];


function getParuvam(dateString) {
  const date = new Date(dateString);
  const monthDay = date.toISOString().slice(5, 10); // Get MM-DD format

  for (const period of paruvangal) {
      if ((monthDay >= period.start && monthDay <= period.end) ||
          (period.start > period.end && (monthDay >= period.start || monthDay <= period.end))) {
          return period.climate;
      }
  }
  return "Unknown date";
}


const pozhuthukal = [
  { start: "06:00", end: "09:59", period: "காலை" },
  { start: "10:00", end: "13:59", period: "நண்பகல்" },
  { start: "14:00", end: "17:59", period: "எற்பாடு" },
  { start: "18:00", end: "21:59", period: "மாலை" },
  { start: "22:00", end: "01:59", period: "யாமம்" },
  { start: "02:00", end: "05:59", period: "வைகறை" }
];

// Function to get Tamil time period for a given time
function getPozhuthu(timeString) {
  const time = timeString.slice(0, 5); // Get HH:MM format

  for (const period of pozhuthukal) {
      if ((time >= period.start && time <= period.end) ||
          (period.start > period.end && (time >= period.start || time <= period.end))) {
          return period.period;
      }
  }
  return "Unknown time";
}



let dateTime = new Date();

let df = new DateFormatter();
df.dateFormat = 'y-MM-dd';
let paruvam = getParuvam(df.string(dateTime));

let df_one = new DateFormatter();
df_one.dateFormat = 'HH:mm';
let pozhuthu = getPozhuthu(df_one.string(dateTime));


let latLong = {}
try {
  latLong = await Location.current()
} catch {}



let req = new Request('https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+latLong.latitude+'&'+'lon='+latLong.longitude+'&appid='+openweather_api_key);

req.method = "get";
let weather = await req.loadJSON();

let current_weather_code = weather['weather'][0]['id']
let current_weather = "-"
let temperature = weather['main']["temp"]
let humidity = weather['main']["humidity"]

console.log(weather);

switch (true) {
  case (current_weather_code >= 200 && current_weather_code < 300 ):
      current_weather = "இடி,மழை"
      break;
  case (current_weather_code >= 300 && current_weather_code < 500 ):
      current_weather = "சாரல்,தூறல்"
      break;
  case (current_weather_code >= 500 && current_weather_code < 600 ):
    current_weather = "கன மழை"
    break;
  case (current_weather_code >= 600 && current_weather_code < 700 ):
    current_weather = "பனித்தூவல்"
    break;
  case (current_weather_code <= 800):
    current_weather = "தெளிந்த நிலை"
    break;
  case (current_weather_code >= 800):
    current_weather = "மேகங்கள்"
    break;
  default:
    current_weather = "-"
}



/////

let states = [
  "பருவம் / "+ paruvam,
  "பொழுது / " + pozhuthu,
  "வானிலை / "+current_weather,
  "வெப்பம் / "+temperature+ "°C",
  "ஈரப்பதம் / "+humidity+"%"
];


let font = new Font("GillSans-Light", font_size);



let widget = new ListWidget();

for (const x of states){ 
  var one = widget.addText(x);
  one.font = font;
  one.centerAlignText();
}


widget.presentSmall();


Script.setWidget(widget);
Script.complete();
