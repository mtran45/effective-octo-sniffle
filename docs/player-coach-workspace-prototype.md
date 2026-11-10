# Player-coach workspace prototype

> Reference prototype only — this is not the production application.

[Open the clickable prototype](player-coach-workspace-prototype.html)

This prototype is a shared visual reference for a pickleball forehand review.
It demonstrates the main surfaces a player and coach move through together:

- selecting a player and starting a private review;
- uploading a clip and checking its metadata and visibility;
- reviewing timestamped technique findings beside the video;
- distinguishing analysis observations from coach notes and overrides;
- assigning a drill and sharing the review with the player; and
- returning to progress history, prior reviews, and follow-up work.

The sample content is intentionally static and local to the browser. Buttons
change screens or reveal representative states, but they do not upload video,
run analysis, persist a review, or replace the workflow contract. Product
behavior and data requirements remain defined in
[`forehand-analysis-workflow.md`](forehand-analysis-workflow.md).

## Prototype walkthrough

1. Choose **Maya Chen** from the player list.
2. Use **Upload clip** to see the required forehand clip metadata and quality
   checks.
3. Continue to **Review findings** and select a finding timestamp to show the
   corresponding moment in the mock player.
4. Open **Coach notes** to see a coach-authored note and the distinction from
   an AI observation.
5. Assign **Pause at contact** and share the review.
6. Open **Progress history** to see the current review alongside previous
   practice milestones.

The prototype deliberately keeps the content general enough to support future
workflow discussions. It is not a promise of final layout, copy, or
implementation technology.
