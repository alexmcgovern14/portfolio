import type { Project } from '../types/project';
import ragWorkflowImg from '../../assets/1ad9a175c9c9c9a0ec903e169c7782ddaf937831.png';
import liveMatchImg from '../../assets/e6c6e387a5ae6c02f2326f483ef3716f22548a1a.png';
import lineupChangesImg from '../../assets/fc4929f386849887f0b522845ad0eeb4643222ec.png';
import artistRecommendationImg from '../../assets/e6d257b084bd5c237a191cbdaae905a08a859319.png';
import thisWebsiteImg from '../../assets/website-tool-workflow.png';
import liveMatchConcepts from '../../assets/3ecaddebe46e909d183a56db9afa1a1dbe33ff00.png';
import liveMatchSummaryImg from '../../assets/Live match summary examples.png';
import lineupInsightsImg from '../../assets/line-up insight examples.png';
import workflowIngestionImg from '../../assets/f69fa785f0984779afcf647e0664899405374bcc.png';
import workflowChatImg from '../../assets/1ad9a175c9c9c9a0ec903e169c7782ddaf937831.png';

// Full project data including detail page content
const projectsData: Record<string, Project> = {

  'lineup-insights': {
    slug: 'lineup-insights',
    title: 'Feature: Line-up insights',
    titleParts: [
      { text: 'Feature: ', gradient: false },
      { text: 'Line-up insights', gradient: true },
    ],
    substackUrl: 'https://open.substack.com/pub/alexmcgovern/p/lesson-in-building-with-llms-recognising?r=459yb5&utm_campaign=post&utm_medium=web',
    description: 'Case study in building with LLMs, model limitations and designing effective systems.',
    category: 'LiveScore feature',
    imageUrl: lineupChangesImg,
    productionImage: lineupInsightsImg,
    overview:
      `***Line-up Insights*** is one of several LLM-based features delivered for **LiveScore** in 2025, a sports product used by millions of users. 

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

**Treat the system as a whole, the leverage point may not be where you're used to focusing.**`,    keyInfo: `Surfaced on the line-ups page for each match and triggered when line-ups are confirmed, usually *1–1.5 hours before kick-off*. This is one of LiveScore's highest traffic moments. **Speed is critical** as users repeatedly refresh in anticipation of news. 

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
    productionImage: liveMatchSummaryImg,
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

  
  'rag-ai-system': {
    slug: 'rag-ai-system',
    title: 'Knowledge: RAG AI system',
    titleParts: [
      { text: 'Knowledge:', gradient: true },
      { text: ' RAG AI system', gradient: false },
    ],
    description: 'High-precision semantic retrieval over vectorised knowledge base, prioritising accuracy and control',
    category: 'Personal project',
    imageUrl: workflowChatImg,
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
        "jsCode": "// Normalize and combine excerpt with source metadata\nconst excerpts = $input.all();\nconst output = [];\n\nfor (const excerpt of excerpts) {\n  const sourceId = excerpt.json.sourceRelation?.[0]?.id;\n  \n  if (!sourceId) {\n    continue; // Skip excerpts without valid source\n  }\n  \n  output.push({\n    json: {\n      excerptId: excerpt.json.id,\n      excerptText: excerpt.json.passage,\n      excerptNotes: excerpt.json.notes,\n      sourceId: sourceId,\n      timestamp: new Date().toISOString()\n    }\n  });\n}\n\nreturn output;"
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
    prd: `# Knowledge: RAG AI System

# Overview

_Knowledge_ is an **AI-powered information retrieval system** designed to store **vectorised long-form text and metadata** to surface relevant insights through a **chat-based interface** using high-precision **semantic search.**

The system uses a **Retrieval-Augmented Generation (RAG) architecture** to enable connections across sources, domains, and concepts. RAG was selected over MCP-style approaches, which primarily support structured or exact lookups rather than semantic similarity.

Responses are grounded in a controlled pair of **relational vector databases**, prioritising retrieval quality, traceability, and observability over latency and generative fluency.

# System Architecture

## Data Sources

The system ingests long-form text from **Notion databases**, transforming structured content (sources and excerpts) into vectorised embeddings stored in **Supabase** (PostgreSQL with pgvector extension).

## RAG Pipeline

1. **Data Ingestion**: Notion databases (sources and excerpts) are synced via n8n workflows
2. **Normalisation**: Excerpt data is combined with source metadata, maintaining relational integrity
3. **Embedding Generation**: OpenAI's \`text-embedding-3-small\` model creates vector embeddings
4. **Vector Storage**: Embeddings stored in Supabase with metadata (excerpt_id, source_id, timestamps)
5. **Retrieval**: Semantic search queries return top-k similar excerpts with source context
6. **Generation**: Retrieved context is passed to LLM for grounded response generation

## Database Structure

- **Sources Table**: Metadata about source documents (title, type, date, etc.)
- **Excerpts Table**: Vectorised text passages with embeddings, linked to sources via foreign keys
- **Relational Joins**: Queries reconstruct full context by joining excerpts with source metadata

# Design Decisions

## Why RAG over MCP?

MCP (Model Context Protocol) approaches excel at structured data lookups and exact matches, but struggle with semantic similarity across domains. RAG enables:
- Cross-domain concept connections
- Semantic similarity beyond keyword matching
- Flexible query interpretation
- Provenance tracking through relational joins

## Model Selection

- **Embeddings**: \`text-embedding-3-small\` for cost-effective, high-quality vector generation
- **Generation**: Configurable LLM selection based on use case (quality vs. latency trade-offs)

## Observability

The system prioritises:
- **Traceability**: Every response can be traced back to source excerpts
- **Retrieval Quality**: Top-k results are logged for evaluation
- **Pipeline Debugging**: n8n workflows provide visibility into data transformation steps

# Workflow Automation

n8n workflows handle:
- Periodic syncing of Notion databases
- Data normalisation and validation
- Embedding generation and batch insertion
- Error handling and retry logic

# Future Enhancements

- Multi-modal support (images, documents)
- Advanced re-ranking for retrieval quality
- User feedback loops for continuous improvement
- Integration with additional data sources`,
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
      'Design, development and deployment of portfolio website in AI-native workflow',
    category: 'Product Strategy',
    imageUrl: thisWebsiteImg,
    overview: `This portfolio was built as a **real product with AI-native processes:** a space to clearly communicate my work, thinking, and approach to building with AI. 

Detailed below is a workflow across multiple tools which offered full control across **design → development → deployment**. 

No single tool (yet!) offers the speed of GenAI prototyping, pixel-perfect designing of Figma and code quality desired for production. This process ties all of that together.`,
    githubUrl: 'https://github.com/alexmcgovern14/portfolio',
    substackUrl: 'https://open.substack.com/pub/alexmcgovern/p/ai-native-website-building-workflow?r=459yb5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true',
    prd: `This portfolio was built as a **real product with AI-first thinking:** a space to clearly communicate my work, thinking, and approach to building.
Setup offers full control across **design → development → deployment**. Allowing rapid exploration early on, while still converging on a maintainable, production-quality codebase.`,
    challenge: `# 1. ChatGPT

Co-pilot at every stage. A single project (important!) holding all key context and objectives.

# 2. Sketching

Lo-fi ideation to establish early direction

# 3. Hi-fi design: Figma ↔ Figma Make loop

## 3.1 UI design: Figma

High-fidelity design exploration; building towards a consistent visual language across colour schemes, page design, core components and key pages.

## 3.2 Prototyping: Figma Make

Chosen on this project over Lovable and others for integration with Figma. **Designs were converted to a working prototype**, which was used for **rapid iteration:** testing ideas and design treatments, site scaffolding, building out lower-priority components quickly and testing user journeys.

This stage produced a fully working prototype, site scaffolding, and surfaced design and structural issues.

## 3.3 Figma ↔ Figma Make loop

During prototyping there are many cases where prompting will not accurately build particular components as desired, especially when the vision is not clear, and diving back into pixels is a faster and more precise way of achieving design solution.

**Specific components were therefore designed directly in Figma and fed back into Figma Make prototype mid-build** — this is very powerful and solves, in my view, the biggest issue of GenAI prototyping. It combines the speed and scale of generative prototyping with the precision of manual, pixel-perfect design.

Output: **Fully working, pixel-perfect prototype**. A real product with code which is pushed to…

# 4. GitHub

Source of truth for codebase

# 5. Cursor

Prototype codebase pulled into Cursor to **refactor generated output into production-quality code** that can be owned, properly structured, trusted and iterated.

A few refactoring examples:

- **Separation of concerns:** Large components broken down into focused, single-purpose components
- **Structured codebase:** easier to navigate and safely make changes to
- **Systematic styling and layout:** consolidated so that spacing, colour, and typography were applied consistently.
- **Optimised loading behaviour**
- **Accessibility**
- **SEO metadata, site map etc.**

# 6. Vercel

Free hosting!

Combining the tools in this workflow facilitates rapid prototyping (Figma Make), detailed UI design (Figma) and production code quality.`,
  },
};



// Process PRD strings to replace image placeholders with actual URLs
const processedProjectsData: Record<string, Project> = {};
for (const key in projectsData) {
  processedProjectsData[key] = { ...projectsData[key] };
}

if (processedProjectsData['rag-ai-system']?.prd) {
  const originalPRD = processedProjectsData['rag-ai-system'].prd;
  let processedPRD = originalPRD;
  
  // Replace template literals with actual image URLs
  processedPRD = processedPRD.replace(/\$\{workflowIngestionImg\}/g, String(workflowIngestionImg));
  processedPRD = processedPRD.replace(/\$\{workflowChatImg\}/g, String(workflowChatImg));
  
  // Update the PRD with processed version
  processedProjectsData['rag-ai-system'] = {
    ...processedProjectsData['rag-ai-system'],
    prd: processedPRD
  };
}

// Simplified project list for homepage (without full detail data)
export const projects: Project[] = [
  processedProjectsData['portfolio-website'],
  processedProjectsData['live-match-summary'],
  processedProjectsData['lineup-insights'],
  processedProjectsData['rag-ai-system'],
  processedProjectsData['spotify-recommendation-engine'],
];

// Export the processed data
export { processedProjectsData as projectsData };

