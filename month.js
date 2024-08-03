// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;

let font_size = 12


let dateTime = new Date();
let df = new DateFormatter()
df.dateFormat = 'MMMM';
df.locale = 'ta'
let formattedString = df.string(dateTime);


let widget = new ListWidget();
let one = widget.addText(formattedString);
one.font = Font.thinMonospacedSystemFont(font_size);

widget.presentMedium();

Script.setWidget(widget);
Script.complete();

