export const liveMatchSummaryContent = {
  overview: `Production GenAI feature that gives LiveScore users a live update on the state of play of a game, bringing them up to speed in a few sentences.

A USP for LiveScore, built before any competitors, it offers a new solution to the oldest user need — _what's happening in this match?_ — unlocked by the possibilities of Generative AI.

It adds significant value at the *most important time for engagement* (live match) on *second most viewed page*, for *all users.*

The solution leverages natural language capabilities of GenAI to convert structured match data into a short narrative, telling the user what they need to know at speed.

# Ownership
Originated concept, proved technical opportunity through prototyping and drove feature through to production:
- Defined user value, where feature should live in experience and what good looks like
- Prototyped to validate opportunity and explore output formats & discover potential limitations
- Set system constraints: grounded in reliable data, speed, no speculation or reliance on historical knowledge, consistency across updates
- Owned decisions on data inputs, guardrails, iteration through prompt engineering and evals loop`,

  userNeeds: `Live sports has an old, universal user need: quickly understand the match narrative right now. Pure data lacks narrative, and traditional commentary feeds lack detail.

Example scenarios:
- User can't watch the game, wants to quickly get up to speed on what's happening
- User thinking about switching on the TV to watch, wants to know if worth watching or not
- User interested in placing in-play bet, wants to understand momentum`,

  challenges: `Iterating through guardrails, prompt engineering and evaluation loops raised a number of issues:

## Hallucinations and misplaced confidence 
Live match data can be out of sync incomplete, delayed or corrected; some signals are ambiguous. 

Passing everything to model and asking it to "summarise the match" produces outputs that _sound_ confident but are laced with inaccuracies and focus on the wrong things.

Better reasoning by the model was not the right solution — stricter control was. Pre-processing data and constraining model's scope through tight prompt engineering produces more determinism in an inherently probabilistic system.

## Latency as a constraint
In a product optimised for speed, an update that arrives 30 seconds after a goal feels broken, even if it's accurate.

Improving quality through reasoning, additional generation steps or excessive safety checks always increases latency.

Generation flow intentionally kept minimal, using fast models and tightly contained context. UI was designed to gracefully handle out-of-date summaries after major updates (eg. a goal) by transitioning into a simple celebratory goal holding message until new output is available. 

These decisions kept synthesis of match data and generation to an average of 5 seconds. 
_____

Reliability in GenAI systems comes from system design and constraints, not from picking a "smarter" model.`,

  constraints: `- **Speed:** LiveScore is all about pace, generation must be fast enough to stay in sync with live play. Generation time optimised to average of 5 seconds, with short wait periods after key updates (goals/red cards) handled gracefully with transitions to immediately remove out-of-date content.
- **No hallucinations or speculation:** All outputs must be strictly grounded in provided data, with model prioritising recent key events and never stepping into assumptions or extrapolating data into speculation.
- **One of the fans:** Tone of voice, British English and a _feeling_ of understanding the match through terminology and accurate narrative.`,

  evaluations: `Evals ran through OpenAI platform, provided 0-10 guided scores and explanations, focused on:
- **Factual accuracy** against input data
- **Recency**, scored on emphasising recent momentum and events
- **Structure and formatting**, including word counts and bolding rules
- **Clarity and conciseness**, easily scannable with no fluff or repetition
- **Tone** scored against brand guidelines and British football fan voice`,
};

