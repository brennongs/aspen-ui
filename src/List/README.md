# `<List />`

**INPUT:** Object with properties `label` (string), `keysDisplayed` (array(string)), and `data` (array(object))

**BEHAVIOR:** List is pretty straightforward; give it an array of `data` objects and it will iterate over them and display the desired values designated in `keysDisplayed`. It will also name itself so that users will know what data they're looking at.

**ROADMAP:** Currently I hit a snag whenever the component hits a nested array/object. My initial thought was to make `<List />` recursive, but I have a serious problem with nested scroll bars in my UX. Arrays are a little easier because it's only a few lines of code to turn an array into a comma separated list. The real problem becomes double nested arrays (which could be argued is just bad data design), objects with array values or arrays with object elements. It is not that far fetched to assume `<List />` could receive an array of objects with nested objects. That's quite common, actually. How do I handle that?