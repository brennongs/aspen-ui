# `<TopBottom />`

**INPUT:** `split` (number), `top` (object), `bottom` (object)

**BEHAVIOR:** `split` signifies what percentage of the total view `top` will take. `bottom` automatically takes what is bottom over. This is accomplished with the help of [`styled-components`](https://www.styled-components.com/docs/basics). `top` and `bottom` naturally reference the desired components that will occupy the top and bottom portions of the view, respectively. The component passes the object referenced by each into a [`<Picker />`](../Picker) to be rendered.

**ROADMAP:** Eventually for mobile responsiveness, this will have a condition to check for the width of the view port, and on anything that is portrait, the component will render tabs instead of sides. When someone changes the focus to either primary or secondary, the currently focused section will slide out of frame and be replaced by the newly focused one. This doesn't lend well to nested splits like I've been using in my development. I think the best remedy for this is just to reimagine this framework for mobile when the time comes and potentially have Aspen generate two UI's - one for each platform.