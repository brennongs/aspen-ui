# `<List />`

**INPUT:** Object with properties `label` (string), `keysDisplayed` (array(string)), and `data` (array(object))

**BEHAVIOR:** List is pretty straightforward; give it an array of `data` objects and it will iterate over them and display the desired values designated in `keysDisplayed`. It will also name itself so that users will know what data they're looking at.