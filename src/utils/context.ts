import { isValidElement } from 'react';
import type { ReactNode } from 'react';
import type { Section } from '@/types';

export function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node.trim();
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).filter(Boolean).join(' ');
  if (isValidElement(node)) {
    const props = node.props as Record<string, unknown>;
    const tooltip = props['data-tooltip'];
    const children = extractText(props.children as ReactNode);
    if (tooltip && typeof tooltip === 'string' && children) {
      return `${children} (${tooltip})`;
    }
    return children;
  }
  return '';
}

export function sectionsToContext(sections: Section[]): string {
  return sections.map(section => {
    const lines: string[] = [`## ${section.title}`];
    for (const item of section.content) {
      const detail = extractText(item.detail);
      if (!detail) continue;
      const term = item.term ? extractText(item.term) : null;
      lines.push(term ? `- ${term}: ${detail}` : detail);
    }
    return lines.join('\n');
  }).join('\n\n');
}
