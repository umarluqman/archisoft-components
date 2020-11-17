# Archisoft Foundation

Currently it consist of two repos.

- Foundation (starter kit)
- Archisoft components

Inside projects/foundation, it is a starter for new project which able to call @archisoft/component from packages/components.

Inside packages/components, it consists of reusable React components based on Chakra UI v1 and React Table.

Made possible by Microbundle, Lerna & Yarn Workspaces

Available components:

- Table

Todo:

- Integration with Mocked service worker, msw
- Add more variation to the table.

## How to start?

Firstly, install dependencies and link them to the repos

` yarn bootstrap`

Then, yarn dev to build @archisoft/components inside packages/components

`yarn dev`

Now you can start Storybook to visualize the components

`yarn sb`
