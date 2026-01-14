export const ragAiSystemContent = {
  overview: `_Knowledge_ is an **AI-powered information retrieval system** designed to store **vectorised long-form text and metadata** to surface relevant insights through a **chat-based interface** using high-precision **semantic search.**

The system uses a **Retrieval-Augmented Generation (RAG) architecture** to enable connections across sources, domains, and concepts. RAG was selected over MCP-style approaches, which primarily support structured or exact lookups rather than semantic similarity.

Responses are grounded in a controlled pair of **relational vector databases**, prioritising retrieval quality, traceability, and observability over latency and generative fluency.

**Product Requirements Document (PRD)** below describes all facets of system design, RAG architecture, database structure, model choice and more. PRD is available in markdown format optimised for LLMs.`,

  skills: `AI system design · Retrieval-Augmented Generation (RAG) · semantic search & retrieval design · data modelling & information architecture · data transformation (Notion → Supabase) · vector embeddings · relational joins & provenance reconstruction · workflow automation (n8n) · prompt & guardrail design · observability & debugging · deterministic pipeline design · model selection`,

  prd: `# Overview

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
};

