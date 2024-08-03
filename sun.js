// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;



const openweather_api_key = ""
const font_size = 11

function convertUnixTimeToLocalTime(unixTime, timezoneOffset) {
    const date = new Date((unixTime)*1000);
    console.log(date);
    let df_one = new DateFormatter();
    df_one.dateFormat = 'h:m a';
    return df_one.string(date);
}



let latLong = {}
try {
  latLong = await Location.current()
} catch {}



let req = new Request('https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+latLong.latitude+'&'+'lon='+latLong.longitude+'&appid='+openweather_api_key);
req.method = "get";
let weather = await req.loadJSON();

let sun_rise = weather['sys']["sunrise"]
let sun_set = weather['sys']["sunset"]
let timezone = weather['timezone']

console.log(sun_rise);
console.log(sun_set);
console.log(timezone);

/////

let states = [
  "சூரியன்",
  convertUnixTimeToLocalTime(sun_rise, timezone),
  "முதல்",
  convertUnixTimeToLocalTime(sun_set, timezone),
  "வரை"
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
