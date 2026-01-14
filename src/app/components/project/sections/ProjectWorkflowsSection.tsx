import React from 'react';
import { Workflow } from 'lucide-react';
import type { Project } from '../../types/project';
import { SECTION_CONTAINER } from '../sectionStyles';

interface ProjectWorkflowsSectionProps {
 project: Project;
 slug: string;
 onImageClick?: (imageSrc: string) => void;
}

export function ProjectWorkflowsSection({ project, slug, onImageClick }: ProjectWorkflowsSectionProps) {
 return (
 <section id="workflows" className="scroll-mt-24">
 <div 
 className={`${SECTION_CONTAINER.outer}`}
 style={{
 background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
 }}
 >
 <div className={`${SECTION_CONTAINER.inner}`}
 style={{
 background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
 }}
 >
 <div className="flex items-center gap-3 mb-6">
 <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
 <Workflow className="w-5 h-5 text-white" />
 </div>
 <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
 System workflows
 </h2>
 </div>

 <div className="space-y-8">
 {/* Workflow 1: Ingestion & Vectorisation */}
 <div>
 <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">
 Workflow 1: Ingestion & Vectorisation
 </h3>
 <p className="text-[#D6D6D6] mb-4 leading-relaxed">
 Data pipeline that extracts content from Notion, generates embeddings, and stores vectors in Supabase for semantic search.
 </p>
 {project && 'workflowImage1' in project && project.workflowImage1 && (
 <div className="my-8">
 <button
 onClick={() => onImageClick?.(project.workflowImage1!)}
 className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer"
 >
 <img 
 src={project.workflowImage1} 
 alt="n8n workflow for data ingestion and vectorization" 
 className=" h-auto block rounded-[22px]" 
 loading="lazy" 
 width="1200" 
 height="800" 
 />
 </button>
 </div>
 )}
 </div>

 {/* Workflow 2: Query & Synthesis */}
 <div>
 <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">
 Workflow 2: Query & Synthesis
 </h3>
 <p className="text-[#D6D6D6] mb-4 leading-relaxed">
 Chat interface that embeds user queries, retrieves relevant excerpts, and generates grounded responses with full source traceability.
 </p>
 {project && 'workflowImage2' in project && project.workflowImage2 && (
 <div className="my-8">
 <button
 onClick={() => onImageClick?.(project.workflowImage2!)}
 className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer"
 >
 <img 
 src={project.workflowImage2} 
 alt="n8n workflow for query and synthesis" 
 className=" h-auto block rounded-[22px]" 
 loading="lazy" 
 width="1200" 
 height="800" 
 />
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
