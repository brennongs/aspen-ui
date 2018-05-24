# `<Picker />`

**INPUT:** Object with properties `type` (string) , `props` (object), and `children` (array(string | object)).

**BEHAVIOR:** Picker works like [`React.createElement`](https://reactjs.org/docs/react-api.html#createelement) but dynamic. It first checks if `type` references anything in [`ASPEN`](../) or [`MUI`](https://material-ui-next.com/) libraries. If it doesn't find a match, it assumes `type` is a native HTML element and renders it as such. Then it spreads `props` into the invocation of the JSX element and passes a recursive `<Picker />` down for each element in `children`.