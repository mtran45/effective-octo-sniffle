# effective-octo-sniffle

This project is building a shared player-coach workspace for pickleball
forehand video reviews. A player or coach uploads a clip, the product produces
evidence-based technique findings, and the coach can refine the feedback,
assign practice, and share the review with the player.

The current product contract is the [forehand analysis workflow](docs/forehand-analysis-workflow.md).
It defines the review states, clip metadata, technique checkpoints, feedback
format, confidence indicators, and coach actions that an implementation must
support.

## Repository guide

- `docs/forehand-analysis-workflow.md` — canonical product and data contract
  for the first review flow.
- `AGENTS.md` — instructions for contributors and coding agents working in
  this repository.

## Run locally

Install dependencies, then start the Vite development server:

```sh
npm install
npm start
```

The app is available at `http://localhost:5173`. Use `npm run build` to create
a production build and `npm run preview` to serve that build locally.
