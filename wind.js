// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;



const openweather_api_key = ""



let latLong = {}
try {
  latLong = await Location.current()
} catch {}



let req = new Request('https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+latLong.latitude+'&'+'lon='+latLong.longitude+'&appid='+openweather_api_key);
req.method = "get";
let weather = await req.loadJSON();
let wind_speed = weather['wind']["speed"]
let wind_deg = weather['wind']["deg"]

/////

let states = [
  "காற்று",
  wind_speed+"",
  "மீ/செக",
  wind_deg+"°"
];

let font = new Font("GillSans-Light", 11);
const font_color = "ffffff"


let widget = new ListWidget();

for (const x of states){ 
  var one = widget.addText(x);
  // one.font = Font.thinMonospacedSystemFont(11);
  one.font = font;
  one.textColor = new Color(font_color);
  one.centerAlignText();
}


const fm = FileManager.iCloud()
let angle = fm.readImage(fm.documentsDirectory() + "/angle.png");


let image_wid = widget.addImage(angle);
image_wid.tintColor = new Color(font_color);
image_wid.centerAlignImage();
image_wid.imageSize = new Size(13,13);


widget.presentSmall(); 

widget.backgroundColor = new Color(font_color);


Script.setWidget(widget);
Script.complete();
