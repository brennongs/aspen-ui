# `<TopBottom />`

**INPUT:** `split` (number), `top` (object), `bottom` (object)

**BEHAVIOR:** `split` signifies what percentage of the total view `top` will take. `bottom` automatically takes what is bottom over. This is accomplished with the help of [`styled-components`](https://www.styled-components.com/docs/basics). `top` and `bottom` naturally reference the desired components that will occupy the top and bottom portions of the view, respectively. The component passes the object referenced by each into a [`<Picker />`](../Picker) to be rendered.