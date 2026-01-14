export const lineupInsightsContent = {
  overview: `***Line-up Insights*** is one of several LLM-based features delivered for **LiveScore** in 2025, a sports product used by millions of users. 

The feature **compares team line-ups before kick-off and generates insights** about what each manager has changed since their previous match — the key info our users are looking for at a **peak-traffic** moment. **Latency is critical** as users wait (and repeatedly refresh) in anticipation of the news.

**Feature served as a strong AI product-building lesson on handling model limitations through system design; see 'Challenge' section below.**

Five rounds of unmoderated user testing before development across a number of UI placements all showed extremely positive signal for the feature: *"I think this is really cool! I've never seen any site offer anything like this."* — User of LiveScore and competitors

In production user sentiment is tracked through a thumbs up/down reaction, **consistently scoring above 80% target.**`,

  challenge: `*"Look at two lists and describe the differences"* seemed like an easy task, but it gave **easily the worst hallucinations we've seen** in building AI workflows.

We found models at the time (GPT-4-class models from OpenAI) could not reliably handle both calculating the differences in line-ups and describing changes with narrative, whilst needing to handle identity resolution and entity state changes — including positional changes, bench vs. starting, dropped from squad vs. brand new players, similar names etc. 

LLMs don't maintain persistent entities with identities over time in a 100% robust way like traditional programming/databases — entity identity is implicit and probabilistic rather than explicit and enforced, which makes consistency fragile under list comparisons and state changes. Model training also encourages plausible, confident answers, not cautious uncertainty.

Therefore, when losing track of entities, **LLMs will tend to produce a plausible-sounding answer: a hallucination**. And so players who swapped positions were treated as new, fictitious players were invented, and Sorba Thomas became the enemy. **No amount of prompt engineering resolved the issues** (you should see the changelog!) and we only got to a reliable output passing all evals — and later user satisfaction scores — through pre-processing the data to provide calculated diffs as input to model, and letting the LLM focus *purely* on the narrative rather than two tasks. A step we resisted for a while, believing it *should* be easily handled.

Building with LLMs is inherently probabilistic, you're always handing over some control to the model. When hallucinations or other issues repeat, picking a 'smarter' model is often not the right solution. Just as likely: there's not enough determinism in the system to control model behaviour and output.

Pre-processing the data input **shifted half the task into a programmatic, deterministic part of the system**, allowing the LLM to focus on just one task which it could *easily* handle in isolation.

**Rather than treating AI as a magic bullet, focus on system design and let the LLM execute only what's necessary.**

In revisiting the original task ~six months later with newer models including GPT-5.1, Gemini 3, and Mistral 3, there have been significant improvements in maintaining entity state over longer contexts, all did a far better job. Over more complex and lengthy narratives object permanence can still break down, going beyond 22 names in a matchday squad, models can lose track of entities and produce contradictions, but it takes a lot more complexity than just 6 months ago.

## Lessons

**1. Models are improving rapidly in many ways**, not just the headline-grabbing ones. This topic of entity tracking isn't included in most major benchmarking.

**2. System design is (as always) key in handling limitations:** beyond the normal constraints through prompt engineering, reconsider data input options; watch out for overconfidence and prompt model to explain reasoning to validate methodology and output; instruct not to state a plausible answer if uncertain; avoid assumptions where data is insufficient; run evals at scale and implement output guardrails. 

**Treat the system as a whole, the leverage point may not be where you're used to focusing.**`,

  keyInfo: `Surfaced on the line-ups page for each match and triggered when line-ups are confirmed, usually *1–1.5 hours before kick-off*. This is one of LiveScore's highest traffic moments. **Speed is critical** as users repeatedly refresh in anticipation of news. 

## Responsibility
Created the concept and owned the feature end-to-end: problem framing, input/output contract, prompt engineering, guardrails, eval criteria, iteration.

## Definition of changes
- Players in/out of the **starting eleven**
- *Positional switches*, such as right-back moving into midfield
- Formation shifts
- New players on the bench who were not in the squad 
- Injuries and suspensions

## Output shape
Example:
- Team A make **3 changes** from last match
- Player A, Player B replace Player C and Player D in midfield
- Possible formation change from *4-3-3* to *4-2-3-1*

## System design
- Normalise inputs *(starter vs bench separated; identity matching handled upstream)*
- Compute **deterministic diffs** *(ins/outs/retained + position/formation changes where reliable)*
- LLM generates narrative only from the diff object *(closed-world)*`,
};

