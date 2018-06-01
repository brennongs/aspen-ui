# Aspen Front-End Web

This is the working repo for the aspen front end web implementation.

## Progress

So far we have a `<Picker/>` component that will map through the current component library (`Material-UI` and two custom UI components) and render a pre-built component based on a JSON input. It will pass down `props` as an object to the child, which contains a `children` property as either an array of children to be rendered or text/media to be displayed. The current test passes in the props for a navbar with two routing options and correctly renders it to the browser.

`<App />` takes in DSL routes and renders `<Route />` components of the given type and route.

Started on DSL. Documentation up to date in the `DSL/` directory.

## Roadmap

1. Primitive [Component Library](./src/components) ✔
2. `<Picker />` ✔
3. `<TopBottom />` and `<LeftRight />` ✔
4. Figure out how to format the Graph queries to be passed down in props.
5. Hook up GraphQL/Apollo and pass in queries/mutations.

## Notes

*`<Picker />`:*\
[use a render prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

*forms:*\
formik -- [GitHub](https://github.com/jaredpalmer/formik?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more), [demo](https://codesandbox.io/s/zKrK5YLDZ), [Intro video](https://www.youtube.com/watch?v=-tDy7ds0dag&feature=youtu.be&t=33s)

*charts:*\
[D3 within React the right way](https://oli.me.uk/2015/09/09/d3-within-react-the-right-way/)\
ZingChart -- [GitHub](https://github.com/zingchart/ZingChart-React)

*client-side storage:*\
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)\
[Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)\
[Client-side storage build-along](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)

NOTE: All the above can probably be replace with `localStorage`.

***TECH:***

**Current stack**:

    - React/Material-UI/styled-components
    - GraphQL/Apollo

*Why?*

**React** is widely adopted and still growing rapidly, with numerous examples of large-scale production implementations. eg. [Facebook](https://www.facebook.com), [Plex](https://www.plex.tv), [Dropbox](https://www.dropbox.com).

**Material UI** is a popular React component library that follows Google's Material Design spec. The main problem with *any* component library is that React as a whole is so new that there are very few vetted production apps that really implement any one of them.

Articles/resources on the matter:\
[11 React Component Libraries You Should Know About in 2018](https://blog.bitsrc.io/11-react-component-libraries-you-should-know-178eb1dd6aa4) -- Jonathan Saring; Medium\
[Top 10 React Libraries on GitHub](https://hackernoon.com/top-10-react-libraries-on-github-ebf730e7ac25) -- DashBouquet; Hackernoon\
[awesome-react-components](https://github.com/brillout/awesome-react-components#ui-frameworks) -- github

The first two articles point to Material UI as being the most popular component library. As part of the research for deciding on one, I've tried to find production scale apps with good testing suites.
    Material UI: (all found from MUI's [Showcase page](https://material-ui-next.com/discover-more/showcase/)) [AudioNodes](http://audionodes.com), [Venuemob](https://venuemob.com.au), [Builder Book](https://builderbook.org/), [Modole](https://en.modole.io)
None of these are totally open source (except Builder Book which actually walks the user through building the site from scratch, including testing. **I will have to look into that one.**), which means I don't have access to looking at their tests or architecture to verify performance. AudioNodes is a very cool and in depth audio editor, that ran very smoothly during my trial run. I reached out to the devs to see if I can look at their test suites. **will update when they respond**: They said that stability and testing are really good with Material UI and that most of their presentational components don't even really have testing.

The other options mentioned in the articles that I really know anything about are [React Bootstrap](https://react-bootstrap.github.io/) (which I don't want to use because it has fallen behind in support of Bootstrap 4), [React Toolbox](http://react-toolbox.io) (which doesn't have an examples or showcase section so I don't know definitively of any sites implementing it), [Grommet](http://grommet.io) (has high profile [Showcase](http://grommet.io/docs/showcase/) projects like [HewlettPackard](https://www.labs.hpe.com/), but again, no open source. This would be a strong second choice, but I already know Material UI), and [Semantic UI](https://react.semantic-ui.com/introduction) (docs seem very informative and the design of the components seems super intuitive. Again, no showcase, so it's hard to know for sure what projects use it).

All in all, I already know MUI, and they have so far been the easiest to prove. For now, we'll settle there.

**04/23/2018** As I've been using MUI, I've found that they do a lot for you in terms of logic, which makes it hard to use third party libraries like Formik (which is really awesome). As of now, Formik is integral and I haven't really set up anything from MUI so I'm considering switching. I just saw that they have a split, but it's not as feature rich as mine. But it gave me an idea for combining the two. Now instead of two split components, we have one that can switch between horizontal and vertical. ✔ that was easy.

Looking through Grommet's docs, they follow a convention for props that is pretty close to the one I'm using. I am going to switch over. Found that Grommet is not compatible with TypeScript. It looks like I'll have to find something else, but I definitely want to switch out Material-UI.

**05/16/2018** Actually, I made MUI work with Formik, and it was pretty simple. The `<FormControl />` is where all the state lives (and honestly I could probably make it work with aspen and do away with formik). I've found that I can just use formik in lieu of `<FormControl />`

**[GraphQL](http://graphql.org/)** is a newer database technology that works by setting a type schema and creating graph relationships between objects. It was developed by [Facebook](https://code.facebook.com/projects/250682645321805/graphql/) to manage their massive friends system, and eventually became a full scale replacement for the REST architecture. The major strength for GraphQL is it's ability to be totally dynamic and flexible. Essentially you build a JSON object with what information you need and what the query parameters are and either query or mutate to the endpoint. Done.

**[Apollo](https://www.apollographql.com/)** is a suite of technologies specifically designed to interact with a GraphQL system. Think [Massive](https://github.com/dmfay/massive-js) for PostgreSQL or [Mongoose](http://mongoosejs.com/) for MongoDB. Apollo provides a front-end client, stripping away the need for a dedicated server to interact with your data, making the package as a whole much lighter and quicker.

**05/29/2018** I've done away with the DSL. I've combined the two splits into one `<Split />` component. I've mostly finished a form builder and a table builder. I've not tested `<List />` yet because I can't get it to work in an external project, BUT the repo is currently separated from any scaffolding implementations. Woo