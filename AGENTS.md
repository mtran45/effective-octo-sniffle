# Contribution guide

## What we are building

This repository is the foundation for a pickleball player-coach workspace.
The first experience is a forehand video review: capture a clip, analyze
visible technique, present concise feedback, and let a coach confirm or amend
the result before sharing it with the player.

The detailed behavior is defined in
[`docs/forehand-analysis-workflow.md`](docs/forehand-analysis-workflow.md).
Treat that document as the single source of truth for product states, fields,
checkpoints, findings, confidence, and coach collaboration. Do not duplicate
those specifications in this file; update the workflow document when they
change.

## Working agreements

- Read the workflow contract before changing review behavior or data shapes.
- Preserve evidence and authorship: AI observations, coach changes, and
  player comments must remain distinguishable and auditable.
- Represent missing visibility as insufficient evidence rather than inventing
  a technique fault.
- Keep player-facing feedback concise, specific, and actionable.
- Add or update tests for implementation changes and run the repository's
  available checks before committing.
- Keep the README focused on project orientation; put agent instructions here
  and product details in the workflow contract.

## Repository state

The repository currently contains documentation only. There is no application
runtime, dependency installation, or test command to run until implementation
is added.
