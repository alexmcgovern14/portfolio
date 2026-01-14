import React from 'react';
import { projectContentBySlug } from './ProjectContentRegistry';
import type { ProjectContentProps } from './types/ProjectContentProps';

function ErrorState({ message }: { message: string }) {
  return (
    <div className="p-8 text-center text-red-400">
      <p>{message}</p>
    </div>
  );
}

export function ProjectDetailContent(props: ProjectContentProps) {
  // Early return if project or slug is undefined
  if (!props.project || !props.slug) {
    return <ErrorState message="Project not found" />;
  }

  // Get the component for this project
  const Content = projectContentBySlug[props.slug];

  // If no component exists for this slug, show error
  if (!Content) {
    return (
      <ErrorState 
        message={`Project "${props.slug}" not found. Please check the project slug.`} 
      />
    );
  }

  // Render the project component
  try {
    return <Content {...props} />;
  } catch (error) {
    console.error(`Error rendering project ${props.slug}:`, error);
    return <ErrorState message={`Error rendering project: ${error instanceof Error ? error.message : 'Unknown error'}`} />;
  }
}
