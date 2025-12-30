import type { Project } from '../types/project';
import ragWorkflowImg from '../../assets/1ad9a175c9c9c9a0ec903e169c7782ddaf937831.png';
import liveMatchImg from '../../assets/e6c6e387a5ae6c02f2326f483ef3716f22548a1a.png';
import lineupChangesImg from '../../assets/fc4929f386849887f0b522845ad0eeb4643222ec.png';
import artistRecommendationImg from '../../assets/e6d257b084bd5c237a191cbdaae905a08a859319.png';
import thisWebsiteImg from '../../assets/website-tool-workflow.png';
import liveMatchConcepts from '../../assets/3ecaddebe46e909d183a56db9afa1a1dbe33ff00.png';


// Full project data including detail page content
const projectsData: Record<string, Project> = {
  'rag-ai-system': {
    slug: 'rag-ai-system',
    title: 'Knowledge: RAG AI system',
    titleParts: [
      { text: 'Knowledge:', gradient: true },
      { text: ' RAG AI system', gradient: false },
    ],
    description: 'LLM semantic search through vectorised data',
    category: 'Personal project',
    imageUrl: ragWorkflowImg,
    overview:
      '_Knowledge_ is an **AI-powered information retrieval system** designed to store **vectorised long-form text and metadata** to surface relevant insights through a **chat-based interface** using high-precision **semantic search.**\n\nThe system uses a **Retrieval-Augmented Generation (RAG) architecture** to enable connections across sources, domains, and concepts. RAG was selected over MCP-style approaches, which primarily support structured or exact lookups rather than semantic similarity.\n\nResponses are grounded in a controlled pair of **relational vector databases**, prioritising retrieval quality, traceability, and observability over latency and generative fluency.\n\n**Product Requirements Document (PRD)** below describes all facets of system design, RAG architecture, database structure, model choice and more. PRD is available in markdown format optimised for LLMs.',


    skills:

      'AI system design · Retrieval-Augmented Generation (RAG) · semantic search & retrieval design · data modelling & information architecture · data transformation (Notion → Supabase) · vector embeddings · relational joins & provenance reconstruction · workflow automation (n8n) · prompt & guardrail design · observability & debugging · deterministic pipeline design · model selection',
    // githubUrl: 'https://github.com/yourusername/knowledge-rag', // Private repo
    n8nJson: `{
  "name": "knowledge-RAG Workflow",
  "nodes": [
    {
      "parameters": {
        "authentication": "oAuth2",
        "resource": "database",
        "operation": "getAll",
        "databaseId": "{{ $json.sourcesDbId }}",
        "returnAll": true,
        "options": {}
      },
      "name": "Notion - Get Sources",
      "type": "n8n-nodes-base.notion",
      "typeVersion": 2,
      "position": [250, 300]
    },
    {
      "parameters": {
        "authentication": "oAuth2",
        "resource": "database",
        "operation": "getAll",
        "databaseId": "{{ $json.excerptsDbId }}",
        "returnAll": true,
        "options": {}
      },
      "name": "Notion - Get Excerpts",
      "type": "n8n-nodes-base.notion",
      "typeVersion": 2,
      "position": [250, 500]
    },
    {
      "parameters": {
        "jsCode": "// Normalize and combine excerpt with source metadata\\nconst excerpts = $input.all();\\nconst output = [];\\n\\nfor (const excerpt of excerpts) {\\n  const sourceId = excerpt.json.sourceRelation?.[0]?.id;\\n  \\n  if (!sourceId) {\\n    continue; // Skip excerpts without valid source\\n  }\\n  \\n  output.push({\\n    json: {\\n      excerptId: excerpt.json.id,\\n      excerptText: excerpt.json.passage,\\n      excerptNotes: excerpt.json.notes,\\n      sourceId: sourceId,\\n      timestamp: new Date().toISOString()\\n    }\\n  });\\n}\\n\\nreturn output;"
      },
      "name": "Normalize Excerpt Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [450, 500]
    },
    {
      "parameters": {
        "model": "text-embedding-3-small",
        "options": {}
      },
      "name": "Generate Embeddings",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [650, 500]
    },
    {
      "parameters": {
        "operation": "insert",
        "table": "excerpts",
        "columns": "excerpt_id, excerpt_text, excerpt_notes, source_id, embedding, created_at",
        "options": {}
      },
      "name": "Supabase - Insert Excerpts",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [850, 500]
    }
  ],
  "connections": {
    "Notion - Get Excerpts": {
      "main": [[{
        "node": "Normalize Excerpt Data",
        "type": "main",
        "index": 0
      }]]
    },
    "Normalize Excerpt Data": {
      "main": [[{
        "node": "Generate Embeddings",
        "type": "main",
        "index": 0
      }]]
    },
    "Generate Embeddings": {
      "main": [[{
        "node": "Supabase - Insert Excerpts",
        "type": "main",
        "index": 0
      }]]
    }
  }
}`,
    prd: `# 1. User need

User saves insights and information from various sources (books, articles, podcasts, videos) to aid connection of ideas and recall.

Traditional keyword search is insufficient for this use case: it relies on exact phrasing, fails to surface similar or related content, and does not facilitate conceptual linking across topics or disciplines.

# 2. Why Retrieval-Augmented Generation (RAG)

System is designed around **Retrieval-Augmented Generation (RAG)** and chat-based user interface to ensure responses are always grounded in a controlled knowledge base. 

RAG was selected for three primary reasons:
1. **Grounded responses:** All outputs should be traceable to stored content, establishing a clear source of truth for what the system "knows."
2. **Semantic retrieval over unstructured content:** Vector-based retrieval enables semantic and concept-level search across long-form text, outperforming keyword or MCP-based retrieval (which primarily supports structured or exact lookups rather than semantic similarity) in surfacing similar and connected content. 
3. **Separation of concerns:** Retrieval quality, data structure, and provenance are handled by the system design, while the language model is used strictly for synthesis and explanation.

Alternative approaches such as direct API access to a note-taking system (e.g. via MCP) were considered. While suitable for structured lookups or live data access, they do not provide the same level of semantic indexing, retrieval precision, or deterministic observability required.

# 3. Goals

1. **High-precision semantic retrieval:** Retrieve the most relevant passages for a query based on meaning, not keywords, prioritising precision over recall.
2. **Deterministic ingestion and retrieval:** Re-running ingestion or retrieval workflows should not introduce silent drift, duplication, or ambiguity.
3. **Traceable answers with source grounding:** All generated responses must be attributable to specific stored data
4. **Observable system behaviour:** It must be possible to inspect what data was ingested, what was retrieved, and why a given answer was produced.

# 4. System Overview

## High-level architecture

- **Authoring layer:** 2x two-way relational databases used to capture data: \`Sources\` and \`Excerpts\`
- **Indexing layer:** 2x Supabase vector databases for semantic retrieval  
- **Orchestration:** 2x n8n workflows for ingestion, embedding, and chat: \`knowledge-RAG\` and \`knowledge-chat\` 
- **Interface:** Chat UI for querying the knowledge base 

# Workflows

## Workflow 1: \`knowledge-RAG\` (Ingestion & Vectorisation)

1. API connection to fetch selected fields from Notion \`Sources\` and \`Excerpts\` databases  
2. Normalise and shape content into required structure 
3. Generate embeddings (LLM) 
4. Write rows and vectors to Supabase database

(insert image here)

## Workflow 2: \`knowledge-chat\` (Query & Synthesis)

1. Receive user query  
2. Embed the query: convert user input into a vector in the same semantic space as stored content
3. Retrieve top-K relevant excerpts from Supabase   
4. Join excerpts with parent source metadata 
5. Generate a grounded response using retrieved context  

(insert image here)

# 5. Data model

Data initially stored in pair of two-way relational Notion databases, extracted, vectorised and written to pair of Supabase vector databases. Supabase rows entries are **chunks** (therefore one to many relationship between Notion and Supabase) and contain **vectors for semantic search, metadata** for ease of search (year, title, author etc.) and **long-form text** for retrieval. 

\`Sources\` represents primary source materials and high-level information: metadata and long-form text.
\`Excerpts\` contains specific passages from source material and user's reflections

Design rationale

- **Vector embeddings** enable semantic similarity search over meaning rather than phrasing.  
- **Excerpt-level indexing** improves retrieval precision and context efficiency.  
- **Metadata fields** support filtering, disambiguation, citation, and debugging.  
- **Relational joins** use stable Notion IDs to link excerpt chunks back to their parent sources, enabling provenance reconstruction and source-level citation despite chunked storage.

## Sources

### Notion 

In Notion each source is represented as a single row containing rich descriptive metadata, summaries, and reflections. This format is optimised for human understanding and long-term knowledge curation.

**Example (simplified):**
- Title: *The Dawn of Everything: A New History of Humanity*
- Author: David Graeber
- Source type: Book
- Year published: 2021
- Topics: anthropology, politics, power structures, economics
- Summary: *(high-level synthesis of the work)*
- Reflections: *(thoughts and takeaways)*
- Linked excerpts: multiple

The Notion source acts as the **canonical reference** for provenance and context.

### Supabase

In Supabase source data is stored as structured metadata and vectors for retrieval content. Each row from Notion may become multiple rows due to chunking.

**Example row (simplified and redacted):**

\`\`\`json
{
  "notion_id": "1d376bf9-66a3-8133-a68a-ed1120f9a340",
  "title": "The Dawn of Everything: A New History of Humanity",
  "author": "David Graeber",
  "source_type": "book",
  "year_published": 2021,
  "topics": ["anthropology", "politics", "power structures", "economics"],
  "notion_url": "https://www.notion.so/..."
}
\`\`\`

## Excerpts

### Notion

In Notion each excerpt represents a complete unit captured from a source. It contains the full quoted passage, reflections, and a required relationship to its parent source.

**Example fields (simplified):**
- Excerpt title: *Wendat freedom shocks Jesuit missionaries*
- Quoted passage: *(full excerpt text)*
- Reflections: *(author notes and interpretation)*
- Linked source: \`1d376bf9-66a3-8133-a68a-ed1120f9a340\`
- Created date: \`2025-12-09\`

This format is optimised for **human authoring and review**, not retrieval.

### Supabase (vectorised)

In Supabase the same excerpt is transformed into one or more **chunked rows**, each representing a portion of the original text suitable for semantic retrieval.

Each row contains:
- Chunk of excerpt content
- Vector embedding
- Metadata required for retrieval and provenance
- Reference to the parent Notion excerpt and source

**Example row (simplified and redacted):**

\`\`\`json
{
  "content": "In the considered opinion of the Montagnais-Naskapi...",
  "excerpt_title": "Wendat freedom shocks Jesuit missionaries",
  "notion_id": "2c476bf9-66a3-80cf-9974-c01f8994482b",
  "notion_source_id": "1d376bf9-66a3-8133-a68a-ed1120f9a340",
  "created_date": "2025-12-09T21:50:00.000Z",
  "url": "https://www.notion.so/...",
  "embedding": "[vector]"
}
\`\`\`

# 7. Model choice

## Embeddings

OpenAI's [OpenAI text-embedding-3-small](https://platform.openai.com/docs/models/text-embedding-3-small) model used to 1) convert data into vectors for Supabase entry, and 2) convert queries into vectors for similarity search.
[link: https://platform.openai.com/docs/models/text-embedding-3-small]
- Optimised for semantic representation  
- Cost-effective for batch processing  
- Produces a stable retrieval space  

## Chat / Synthesis

OpenAI's [OpenAI GPT-5](https://platform.openai.com/docs/models/gpt-5) model is used for chat interface and to synthesise responses from retrieved context.
[link: https://platform.openai.com/docs/models/gpt-5]
- Strong multi-document reasoning  
- Reliable instruction following  
- Capable of structured, grounded responses  

# 8. Retrieval Strategy & Constraints

## Retrieval strategy 

1. Embed user query: Converts text → vector so it can be compared to stored vectors.
2. Vector similarity search: Computes distance between query vector and stored vectors.
3. Top-K excerpts above threshold: Filters to the most relevant evidence; ignores weak matches.
4. Join with parent source metadata: Adds title, author, source type for grounding and citation.
5. Pass to chat model: GPT-5 does not retrieve — it only synthesises.

## Constraints

- Limit K to prevent context dilution, drowning out relevant signal
- Prefer fewer, higher-signal passages over broad recall  
- Do not generate answers when retrieval evidence is insufficient  

These constraints exist to prioritise answer quality and trustworthiness over fluency.

# 9. Model Behaviour & Guardrails

The model is constrained to:

- Use only retrieved excerpts as evidence  
- Cite sources provided via retrieval
- Explicitly acknowledge if insufficient information  
- Never invent sources or quotations not provided in databases

# 10. Observability

The system maintains an inspectable audit trail across both ingestion and chat so it's possible to understand system state, retrieval decisions, and answer provenance end-to-end.

## Ingestion observability

For each ingestion run, it is possible to inspect:

- **Run timestamp:** When the knowledge base was last rebuilt/updated.
- **Processed record counts:** Number of sources and excerpts processed, chunked, embedded, and written.
- **Join coverage:** Percentage of excerpt rows that successfully resolve to a valid parent source (\`notion_source_id\` present and joinable).
- **Embedding configuration:** Which embeddings model/version was used for that run (to reproduce retrieval behaviour and detect drift).

## Chat observability

For each user query, it is possible to inspect:

- **Query text:** The original user prompt.
- **Query embedding request:** The embedding configuration used for the query vector.
- **Retrieval results:** Retrieved excerpt chunk IDs (\`notion_id\`) and similarity scores, including the selected top-K set.
- **Applied constraints:** Any thresholds, limits (K), and filters applied during retrieval.
- **Provenance reconstruction:** Joined parent source IDs (\`notion_source_id\`) and associated metadata used for grounding/citation.
- **Final output:** The generated response plus citations that map back to retrieved excerpts/sources.

# 11. Open Questions & Trade-offs

## Ingestion strategy: 

The current approach clears and rebuilds the vector database on each run to guarantee determinism and avoid silent duplication. This is acceptable at MVP scale.

Future approach:
- Use stable IDs (e.g. Notion page IDs)  
- Compare Notion \`last_edited_time\` with stored vectorisation timestamps  
- Insert new rows, update modified rows, delete removed rows  

## Re-ranking 

Retrieve broadly then re-order results using:
- cross-encoder
- LLM relevance scoring
- Heuristics (recency, source authority)

## Frontend affordances for citation inspection 
- Clickable citations
- Expandable "why this was retrieved"
- Source preview on hover`,
  },
'live-match-summary': {
    slug: 'live-match-summary',
    title: 'Data-led live match updates',
    titleParts: [
      { text: 'Data-led ', gradient: false },
      { text: 'live match', gradient: true },
      { text: ' updates', gradient: false },
    ],
    description: 'GenAI in-play update on what\'s happening in a football match',
    category: 'LiveScore feature',
    imageUrl: liveMatchImg,
    conceptImage: liveMatchConcepts,
    overview:
      'Production GenAI feature that gives LiveScore users a live update on the state of play of a game, bringing them up to speed in a few sentences.\n\nA USP for LiveScore, built before any competitors, it offers a new solution to the oldest user need — _what\'s happening in this match?_ — unlocked by the possibilities of Generative AI.\n\nIt adds significant value at the *most important time for engagement* (live match) on *second most viewed page*, for *all users.*\n\nThe solution leverages natural language capabilities of GenAI to convert structured match data into a short narrative, telling the user what they need to know at speed.\n\n# Ownership\nOriginated concept, proved technical opportunity through prototyping and drove feature through to production:\n- Defined user value, where feature should live in experience and what good looks like\n- Prototyped to validate opportunity and explore output formats & discover potential limitations\n- Set system constraints: grounded in reliable data, speed, no speculation or reliance on historical knowledge, consistency across updates\n- Owned decisions on data inputs, guardrails, iteration through prompt engineering and evals loop',
    prd: `# Live match summary

# Overview

Production GenAI feature that gives LiveScore users a live update on the state of play of a game, bringing them up to speed in a few sentences.

A USP for LiveScore, built before any competitors, it offers a new solution to the oldest user need — _what's happening in this match?_ — unlocked by the possibilities of Generative AI. 

It adds significant value at the *most important time for engagement* (live match) on *second most viewed page*, for *all users.*

The solution leverages natural language capabilities of GenAI to convert structured match data into a short narrative, telling the user what they need to know at speed.

[insert images of feature]

# Ownership
Originated concept, proved technical opportunity through prototyping and drove feature through to production:
- Defined user value, where feature should live in experience and what good looks like
- Prototyped to validate opportunity and explore output formats & discover potential limitations
- Set system constraints: grounded in reliable data, speed, no speculation or reliance on historical knowledge, consistency across updates
- Owned decisions on data inputs, guardrails, iteration through prompt engineering and evals loop

# User needs and opportunity

Live sports has an old, universal user need: quickly understand the match narrative right now. Pure data lacks narrative, and traditional commentary feeds lack detail.

Example scenarios:
- User can't watch the game, wants to quickly get up to speed on what's happening
- User thinking about switching on the TV to watch, wants to know if worth watching or not
* User interested in placing in-play bet, wants to understand momentum

# Challenges

Iterating through guardrails, prompt engineering and evaluation loops raised a number of issues:

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
    constraints: `# Constraints
- **Speed:** LiveScore is all about pace, generation must be fast enough to stay in sync with live play. Generation time optimised to average of 5 seconds, with short wait periods after key updates (goals/red cards) handled gracefully with transitions to immediately remove out-of-date content.
- **No hallucinations or speculation:** All outputs must be strictly grounded in provided data, with model prioritising recent key events and never stepping into assumptions or extrapolating data into speculation.
- **One of the fans:** Tone of voice, British English and a _feeling_ of understanding the match through terminology and accurate narrative.`,
    evaluations: `# Evaluations

Evals ran through OpenAI platform, provided 0-10 guided scores and explanations, focused on:
- **Factual accuracy** against input data
- **Recency**, scored on emphasising recent momentum and events
- **Structure and formatting**, including word counts and bolding rules
- **Clarity and conciseness**, easily scannable with no fluff or repetition
- **Tone** scored against brand guidelines and British football fan voice`,
  },

  'lineup-changes': {
    slug: 'lineup-changes',
    title: 'Feature: Line-up changes',
    titleParts: [
      { text: 'Feature: ', gradient: false },
      { text: 'Line-up changes', gradient: true },
    ],
    description:
      'Case study in recognising model limitations and building effective systems',
    category: 'LiveScore feature',
    imageUrl: lineupChangesImg,
    overview: `LiveScore feature in production that **uses AI to generate insights** about what each team's manager has changed in team selection since last match — the key information users are looking for at a *peak-traffic moment*. 

**Feature served as a strong AI product-building lesson on handling model limitations through system design; see 'Challenge' section below.**

The system compares both teams' newly confirmed line-ups against their previous match, and generates a **grounded summary** of what changed.

Five rounds of unmoderated user testing before development across a number of UI placements all showed extremely positive signal for the feature: "I think this is really cool! I've never seen any site offer anything like this."

User sentiment tracked in production through a thumbs up/down poll, **consistently scoring above the 80% target.**

`,
    keyInfo: `Surfaced on the line-ups page for each match and triggered when line-ups are confirmed, usually *1–1.5 hours before kick-off*. This is one of LiveScore's highest traffic moments. **Speed is critical** as users repeatedly refresh in anticipation of news. 

# Responsibility
Created the concept and owned the feature end-to-end: problem framing, input/output contract, prompt engineering, guardrails, eval criteria, iteration.

# Definition of changes
- Players in/out of the **starting eleven**
- *Positional switches*, such as right-back moving into midfield
- Formation shifts
- New players on the bench who were not in the squad 
- Injuries and suspensions

# Output shape
Example:
- Team A make **3 changes** from last match
- Player A, Player B replace Player C and Player D in midfield
- Possible formation change from *4-3-3* to *4-2-3-1*

# System design
- Normalise inputs *(starter vs bench separated; identity matching handled upstream)*
- Compute **deterministic diffs** *(ins/outs/retained + position/formation changes where reliable)*
- LLM generates narrative only from the diff object *(closed-world)*`,
    challenge: `"Look at two lists and describe the differences" seemed like an easy task, but gave easily the *worst hallucinations* we've seen in building AI workflows. We found models at the time (GPT-4-class models) could not reliably handle both calculating the differences and describing changes with narrative, whilst needing to handle identity resolution and entity state changes — including positional changes, bench vs. starting, dropped from squad vs. brand new players, similar names etc. 

LLMs don't maintain persistent entities with identities over time in a 100% robust way like traditional programming/databases. Model training also encourages plausible, confident answers, not cautious uncertainty. Therefore when losing track of entities, LLMs will tend to produce a plausible-sounding answer: a hallucination. And so players who swapped positions were treated as new, fictitious players were invented, and *Sorba Thomas became the enemy*. 

No amount of prompt engineering resolved the issues and we only got to a reliable output passing all evals — and later user satisfaction scores — through **pre-processing the data to provide calculated diffs** and letting the LLM focus purely on the narrative rather than two tasks. A step we resisted for a while, believing it should be easily handled.

In revisiting the original task ~six months later with newer models incl. GPT-5.1, Gemini 3, and Mistral 3, there have been significant improvements in maintaining entity state over longer contexts, all did a far better job. Over more complex and lengthy narratives *object permanence* can still break down; going beyond 22 names in a matchday squad, models can lose track of entities and produce contradictions, but it takes a lot more complexity than just 6 months ago.

# Lessons
1. Models are improving rapidly in many ways, not just the headline-grabbing ones; this topic isn't included in most major benchmarking.  
2. **System design** is (as always) key in handling limitations: beyond the normal constraints through prompt engineering, reconsider data input options; watch out for overconfidence and prompt model to explain reasoning to validate methodology and output; instruct not to state a plausible answer if uncertain; avoid assumptions where data is insufficient; run evals at scale and implement output guardrails. Treat the system as a whole — the leverage point may not be where you're used to focusing.`,
    prd: `# Line-up insights

# Overview

LiveScore feature in production that **uses AI to generate insights** about what each team's manager has changed in team selection since last match — the key information users are looking for at a *peak-traffic moment*. 

The system compares both teams' newly confirmed line-ups against their previous match, and generates a **grounded summary** of what changed.

Five rounds of unmoderated user testing before development across a number of UI placements all showed extremely positive signal for the feature: ***"I think this is really cool! I've never seen any site offer anything like this."***

User sentiment tracked in production through a thumbs up/down poll, **consistently scoring above the 80% target.**

Feature served as a strong AI product-building lesson on handling model limitations through system design; see 'Challenges' section below.

# Key info

Surfaced on the line-ups page for each match and triggered when line-ups are confirmed, usually *1–1.5 hours before kick-off*. This is one of LiveScore's highest traffic moments. **Speed is critical** as users repeatedly refresh in anticipation of news. 

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
- LLM generates narrative only from the diff object *(closed-world)*

# Challenge

"Look at two lists and describe the differences" seemed like an easy task, but gave easily the *worst hallucinations* we've seen in building AI workflows. We found models at the time (GPT-4-class models) could not reliably handle both calculating the differences and describing changes with narrative, whilst needing to handle identity resolution and entity state changes — including positional changes, bench vs. starting, dropped from squad vs. brand new players, similar names etc. 

LLMs don't maintain persistent entities with identities over time in a 100% robust way like traditional programming/databases. Model training also encourages plausible, confident answers, not cautious uncertainty. Therefore when losing track of entities, LLMs will tend to produce a plausible-sounding answer: a hallucination. And so players who swapped positions were treated as new, fictitious players were invented, and *Sorba Thomas became the enemy*. 

No amount of prompt engineering resolved the issues and we only got to a reliable output passing all evals — and later user satisfaction scores — through **pre-processing the data to provide calculated diffs** and letting the LLM focus purely on the narrative rather than two tasks. A step we resisted for a while, believing it should be easily handled.

In revisiting the original task ~six months later with newer models incl. GPT-5.1, Gemini 3, and Mistral 3, there have been significant improvements in maintaining entity state over longer contexts, all did a far better job. Over more complex and lengthy narratives *object permanence* can still break down; going beyond 22 names in a matchday squad, models can lose track of entities and produce contradictions, but it takes a lot more complexity than just 6 months ago.

## Lessons
1. Models are improving rapidly in many ways, not just the headline-grabbing ones; this topic isn't included in most major benchmarking.  
2. **System design** is (as always) key in handling limitations: beyond the normal constraints through prompt engineering, reconsider data input options; watch out for overconfidence and prompt model to explain reasoning to validate methodology and output; instruct not to state a plausible answer if uncertain; avoid assumptions where data is insufficient; run evals at scale and implement output guardrails. Treat the system as a whole — the leverage point may not be where you're used to focusing.`,
  },
  'spotify-recommendation-engine': {
    slug: 'spotify-recommendation-engine',
    title: 'Spotify recommendation engine',
    titleParts: [
      { text: 'Spotify ', gradient: false },
      { text: 'recommendation', gradient: true },
      { text: ' engine', gradient: false },
    ],
    description: 'Builds personalised playlists based on listening history',
    category: 'Personal project',
    imageUrl: artistRecommendationImg,
    playlistImage: 'https://raw.githubusercontent.com/alexmcgovern14/spotify-recommended-artists-playlist-generator/main/recommended_artists.png',
    overview: `Backend-first service that **generates personalised discovery playlists for Spotify users.** It aims to solve common user (and my) frustrations with new artist discovery on Spotify — where algorithmic recommendations like _Discover Weekly_ and _Daily Mix_ can feel repetitive or stale to listeners. 

The service extracts a user's top artists via the Spotify API, sources similarity data from open music databases to find similar artists, and delivers a **ready-to-play playlist directly into the user's Spotify library.**`,
    githubUrl:
      'https://github.com/alexmcgovern14/spotify-recommended-artists-playlist-generator',
    prd: `# Vision

Enable Spotify listeners to discover new music by automatically generating a playlist of recommended artists similar to the ones they already love — delivered directly into the user's Spotify library.

# Problem statement

Spotify users often enjoy discovering new music, but existing recommendation features like **Discover Weekly** and **Daily Mix** — despite being widely used — also attract criticism for becoming repetitive, lacking variety, or failing to introduce meaningful new music that fits a user's nuanced tastes. Users report that recommendations feel increasingly stale.

# Scope & Overview

This product **only includes backend functionality** — it interacts with two APIs to generate playlists:
- **Spotify API:** for reading user top artists and creating playlists.  
- **ListenBrainz (via MusicBrainz):** for finding similar artists not already on the user's top list.

The service runs as a backend process that:

1. Authenticates the user via Spotify.
2. Fetches the user's top artists.
3. Converts those artists into MusicBrainz IDs.
4. Queries ListenBrainz for similar artists.
5. Filters out artists the user already listens to.
6. Picks a representative track for each recommended artist.
7. Creates and saves a Spotify playlist in the user's library.

The output is a playlist titled  *"Recommended Artists 🎧"* that appears in the user's Spotify app.

# Key Features

### **Spotify OAuth integration**

- Secure login and permission request to read top artists and manage playlists.
- Minimal scopes to protect user privacy: \`user-top-read\`, \`playlist-modify-public\`, \`playlist-modify-private\`.

**Success criteria:**  
Users can authenticate once and playlists are generated without further user input.


### **Top artists fetch**

- Retrieve the user's top artists (configurable time range: short, medium, long term).
- Defaults to the top 20–50 artists.

**Success criteria:**  
Top artists list accurately reflects recent listening behaviour.


### **Similar artists lookup**

- Use **ListenBrainz API/MusicBrainz** to find similar artists for each top artist.
- Allow configuration of similarity strictness (e.g., "close", "medium", "exploratory").

**Success criteria:**  
Generated artist list contains artists not already in the user's listening history.


### **Playlist creation**

- For each recommended artist, fetch a *representative top track*.
- Create a playlist in the authenticated user's Spotify library automatically.

**Success criteria:**  
Playlist is visible in the Spotify app and tracks are playable immediately.



# Roadmap

- Add **genre or mood filtering** (e.g., only southern soul, only high-energy tracks).  
- Expose a simple **API endpoint** to trigger playlist generation programmatically.  
- Build a lightweight dashboard for configuring preferences (e.g., similarity strength, track popularity filters).
- Support **recurring playlist refreshes** (e.g., weekly updates)?`,
  },
  'portfolio-website': {
    slug: 'portfolio-website',
    title: 'This website: Full stack',
    titleParts: [
      { text: 'This website: ', gradient: false },
      { text: 'Full stack', gradient: true },
    ],
    description:
      'Design, development and deployment of portfolio website, across multiple tools',
    category: 'Product Strategy',
    imageUrl: thisWebsiteImg,
    overview: `This portfolio was built as a **real product with AI-native processes:** a space to clearly communicate my work, thinking, and approach to building with AI. 

Detailed below is a workflow across multiple tools which offered full control across **design → development → deployment**. 

The setup allows rapid exploration early on, fast iteration through generative prototyping in **Figma Make**, in collaboration with pixel-perfect design freedom through **Figma**, before progressing to a maintainable and iterative production-quality codebase through **Cursor.**`,
    githubUrl: 'https://github.com/alexmcgovern14/Portfoliowebsite',
    prd: `This portfolio was built as a **real product with AI-first thinking:** a space to clearly communicate my work, thinking, and approach to building.

Setup offers full control across **design → development → deployment**. Allowing rapid exploration early on, while still converging on a maintainable, production-quality codebase.`,
    challenge: `# Sketching

Initial **low-fidelity ideation** of overall website structure, hierarchy and key page layouts. Inspiration collected on a moodboard to help **establish early direction.**

Output: ideation, establish early preferences


# Hi-fi design: Figma ↔ Figma Make loop

## UI design: Figma

High-fidelity design exploration; building towards a consistent visual language across colour schemes, page design, core components and key pages.


## Prototyping: Figma Make

Chosen on this project (over Lovable and others) for integration with Figma. **Designs were converted to a working prototype**, which was then used for **rapid iteration:** testing ideas and design treatments in context, building out lower-priority components quickly and testing user journeys. 

This stage produced a fully working prototype, site scaffolding, and surfaced design and structural issues earlier than static designs alone.


## Figma ↔ Figma Make loop

During prototyping there are many cases where prompting alone will not accurately build particular components as desired, especially when the vision is not clear, and diving back into pixels is a faster and more precise way of developing design solutions. 

**Specific components were therefore designed directly in Figma and fed back into Figma Make mid-build**. 

This allowed the workflow to combine the precision of manual, pixel-perfect design with the speed and scale of generative prototyping.

Output: **Fully working, pixel-perfect prototype**. A real product with code which is pushed to…


# GitHub

Source of truth for the codebase, with all changes flowing through the repository.


# Cursor

Prototype codebase pulled into Cursor to **refactor generated output into production-quality code** that could be owned, iterated on and trusted. 

The initial scaffold was useful for speed, but it wasn’t structured for long-term change. Large files mixed layout, data, and behaviour; patterns were inconsistent; and performance and accessibility concerns were largely accidental rather than deliberate.

## Why refactoring was necessary

The prototype code surfaced a few clear issues:

- **Structure**: core pages were implemented as large, monolithic components that were hard to reason about or change safely  
- **Consistency**: styling and layout decisions were repeated rather than enforced through shared patterns  
- **Performance**: lazy loading and Suspense boundaries were applied indiscriminately, leading to visible loading artefacts  
- **Accessibility**: semantic structure, focus management, and keyboard behaviour were incomplete  
- **Ownership**: the code reflected how it was generated, not how it should be maintained

## High-level examples of refactoring

The refactor focused on a small number of deliberate improvements.

- **Clear separation of concerns:**  Large components were broken down into focused, single-purpose components. Layout, content, navigation, and interaction logic were separated so that changes in one area didn’t create unintended side effects elsewhere.
- **Intentional loading behaviour:**  Above-the-fold content was switched to load immediately, while lazy loading was kept only where it improved performance without harming user experience. Suspense fallbacks were designed to blend into the surrounding layout to avoid visible flashes.
- **Systematic styling and layout:** Styling decisions were consolidated so that spacing, colour, and typography were applied consistently. This reduced duplication and made visual changes easier to reason about.
- **Accessibility as a baseline:**  Semantic HTML, focus management, keyboard navigation, and ARIA labels were added where appropriate. These changes don’t alter how the site looks, but they significantly improve how it behaves.
- **Codebase as a product asset:** The result is a codebase that’s easier to navigate, safer to change, and better aligned with how the site is intended to evolve over time.

Output: **Refactoring shifted the site from a fast prototype to something production-ready that can be iterated on with confidence.**

 

# Vercel

The site is hosted on Vercel with continuous deployment from the main branch, keeping it live and easy to evolve as the codebase changes.`,
  },
};

// Simplified project list for homepage (without full detail data)
export const projects: Project[] = [
  projectsData['portfolio-website'],
  projectsData['live-match-summary'],
  projectsData['rag-ai-system'],
  projectsData['lineup-changes'],
  projectsData['spotify-recommendation-engine'],
];

