# Forehand analysis workflow

This is the product contract for the first pickleball forehand review. It is
intentionally human-readable, but the field names are stable enough to use as
the MVP API and storage model.

## Review flow

1. **Select player.** A coach selects an existing player or creates one. The
   review is private to the coach and player until shared.
2. **Upload clip.** The player or coach uploads one clip and completes the
   required metadata. Processing shows `uploading`, `processing`, and then
   `ready` (or `failed` with a retry action).
3. **Check clip quality.** Before analysis, show a playable preview and the
   quality checks: player visible, paddle visible, ball flight visible where
   possible, and enough space before and after contact. A failed check is a
   warning, not an automatic rejection; the user can continue with a reason.
4. **Review findings.** The system presents the video beside timestamped
   findings, ordered by priority. Each finding can jump the player to the
   relevant moment and can be expanded for evidence and a suggested drill.
5. **Coach review.** The coach accepts, edits, dismisses, or adds findings and
   writes a summary. Coach edits are visibly marked as coach-authored and are
   preserved in the activity history.
6. **Share and follow up.** The coach shares the review, assigns zero or more
   drills, and optionally records a follow-up date. The player can acknowledge
   the review and add a question, but cannot silently change coach content.

### States

`draft → uploading → processing → ready → in_review → shared → archived`

`uploading` and `processing` may transition to `failed`; retry returns to the
previous actionable state. A review can be unshared back to `in_review` while
the coach is editing. State transitions must record actor and timestamp.

## Required clip metadata

The upload cannot begin analysis until these fields are present:

| Field                      | Type                                           | Requirement                          |
| -------------------------- | ---------------------------------------------- | ------------------------------------ |
| `playerId`                 | ID                                             | Existing player being reviewed       |
| `videoAssetId`             | ID                                             | Stored source video                  |
| `recordedAt`               | ISO timestamp                                  | When the clip was recorded           |
| `handedness`               | `right \| left`                                | Player's hitting hand                |
| `viewAngle`                | `side \| rear \| front \| diagonal \| unknown` | Camera position                      |
| `courtContext`             | `singles \| doubles \| drill \| unknown`       | Context of the shot                  |
| `shotIntent`               | `drive \| roll \| volley \| return \| unknown` | Intended forehand                    |
| `clipStartMs`, `clipEndMs` | integers                                       | Non-negative, end greater than start |

The uploader should also capture optional `sessionId`, `venue`, `deviceModel`,
`fps`, `notes`, and `consentConfirmed`. `durationMs`, dimensions, codec, and
file size are generated from the asset. Store the original video unchanged;
derived thumbnails and analysis artifacts reference it rather than replacing
it.

## Technique checkpoints

Analyze each checkpoint independently. A checkpoint may be `observed`,
`not_observed`, or `insufficient_evidence`; never infer a fault from missing
visibility.

| Key                | Checkpoint        | Evidence to look for                                                            |
| ------------------ | ----------------- | ------------------------------------------------------------------------------- |
| `ready_position`   | Preparation       | Balanced base, paddle prepared, eyes tracking the ball                          |
| `unit_turn`        | Early loading     | Shoulders and hips turn together; non-paddle arm supports spacing               |
| `spacing`          | Contact setup     | Player reaches a comfortable contact distance rather than crowding              |
| `lower_body`       | Load and transfer | Leg load and movement support the shot; weight is not stranded behind           |
| `swing_path`       | Acceleration      | Paddle path matches intent, with a repeatable low-to-high path for a drive/roll |
| `contact_point`    | Contact           | Contact is sufficiently forward and near the intended height                    |
| `head_and_balance` | Stability         | Head remains relatively quiet and finish is balanced                            |
| `follow_through`   | Completion        | Finish is controlled and supports recovery for the next ball                    |

The initial analyzer should return at most three actionable findings per clip,
prioritized as `high`, `medium`, or `low`. Findings must cite one or more
timestamps and the checkpoint key. Avoid diagnosing injury, personality, or
intent; those are outside this workflow.

## Finding and feedback format

```json
{
  "id": "finding_123",
  "checkpoint": "contact_point",
  "priority": "high",
  "title": "Contact is late",
  "observation": "Contact appears beside the lead hip on two visible swings.",
  "impact": "The late contact reduces available court angle and pace.",
  "recommendation": "Create space and contact farther in front.",
  "drill": { "id": "shadow-contact", "title": "Pause at contact" },
  "evidence": [{ "startMs": 1840, "endMs": 2410 }],
  "confidence": { "score": 0.82, "label": "high", "basis": "clear side view" },
  "authorship": "analysis",
  "status": "open"
}
```

Player-facing copy uses four short sections: **What we saw**, **Why it
matters**, **Try this**, and **Watch for**. Keep language specific and
non-judgmental. The review summary should name one strength, no more than
three priorities, and a next practice action.

## Confidence indicators

Confidence is evidence quality, not player ability. Store a numeric `score`
from 0 to 1, a display label (`low`, `medium`, `high`), and a short `basis`.
Display the label and basis beside every AI finding; do not display a false
precision percentage. Use `low` when the view is obstructed, the checkpoint is
only partly visible, or the clip is too short. A low-confidence finding can be
reviewed, but cannot be auto-promoted to a top priority without coach action.

## Coach override and comments

Coach actions are append-only events with `actorId`, `createdAt`, and the
previous value where relevant:

- **Accept** confirms the finding without changing its content.
- **Edit** changes wording, priority, checkpoint, recommendation, or evidence
  and changes `authorship` to `coach`; retain the original analysis snapshot.
- **Dismiss** marks the finding `dismissed` with a required reason; it is hidden
  from the player but remains in history.
- **Add** creates a coach-authored finding with the same schema and no AI
  confidence requirement.
- **Comment** attaches a threaded note to the review or a timestamp. Comments
  support `authorId`, `body`, `timestampMs` (optional), and `createdAt`.

The UI must clearly distinguish AI content, coach overrides, and player
comments. A coach can resolve a comment or reply; resolving never deletes the
thread. If a coach edits a shared review, show the player a “review updated”
indicator and the updated timestamp.

## Acceptance criteria

- A user cannot run analysis without all required metadata and a playable clip.
- Every finding has a checkpoint, priority, evidence timestamp, actionable
  feedback, confidence data (unless coach-authored), and authorship.
- Missing evidence is represented as `insufficient_evidence`, not as a fault.
- Coach edits, dismissals, additions, and comments are reversible through the
  activity history and are visible to the correct audience.
- The player sees concise feedback and assigned next steps; raw confidence
  scores and internal processing errors are not exposed as technical detail.
