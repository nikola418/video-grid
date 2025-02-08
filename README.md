## Running the Project

- server: `pnpm run json-server`
- frontend: `pnpm run dev`

## Wireframe:

[Figma](https://www.figma.com/design/nR0kuO9quRNCmcEe9I9o97/Video-Grid-Wireframe?node-id=0-1&t=mHTg5wr5R8KPrYWT-1)

## Tech Stack:

- server: **json-server** - Lightweight server for mocking backend functionality
- frontend: **Vite+React** - Because it's simple, yet powerful (Also suggested in the task)
  - Libraries:
    1. Lodash (great utilities and lightweight)
    2. CSS modules (scoped css, no need for styled components, since the focus is on basic functionality)
    3. Axios (Preferred over fetch API, because of error management, and overall ease of use)

## Project Structure:

- src - for small-scale applications (for larger apps domain based structure is more suitable, where each data model is the center of the module, and all other packages e.g. api, components, etc. fall into those domains rather than get bundled all together. And one more module called `core` is added which implements the core of the application infrastructure)
  - api - models remote api calls
  - assets - asset files like images, icons, etc. that should be bundled with the source js and preloaded with it.
  - components - reusable ui components e.g. Input Fields, Card Elements...
  - hooks - reusable hooks
  - pages - routable pages

## Future Improvements & Trade-Offs:

- Currently all videos are loaded as a whole - this may pose an issue with a large number of videos (Data deduplication with caching and clearing the said cache when scrolled far past the video should be considered to lighten the memory load)
- Prop drilling - Currently shared states are drilled into children, this isn't a problem for small apps, but ContextProviders and store solutions are the way to go for anything that isn't trivial
- NotFound, Error pages
- Loading indicators
- Filtering is done naively, it is not robust enough to provide consistent state management
