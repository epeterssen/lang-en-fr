import { useEffect } from 'react';
import { SectionCard } from '@/components/SectionCard';
import { RolodexView } from '@/components/RolodexView';
import { UnitHeader } from '@/components/UnitHeader';
import { useSettingsStore } from '@/store/settings';
import { sectionsToContext } from '@/utils/context';
import type { Section } from '@/types';

interface UnitPageProps {
  title: string;
  sections: Section[];
}

export function UnitPage({ title, sections }: UnitPageProps) {
  const rolodex = useSettingsStore((s) => s.rolodex);
  const setCurrentPageContext = useSettingsStore((s) => s.setCurrentPageContext);
  const setCurrentPageTitle = useSettingsStore((s) => s.setCurrentPageTitle);

  useEffect(() => {
    setCurrentPageContext(sectionsToContext(sections));
    setCurrentPageTitle(title);
    return () => { setCurrentPageContext(''); setCurrentPageTitle(''); };
  }, [sections, title]);

  return (
    <div className="flex flex-col">
      <UnitHeader title={title} />
      {rolodex ? (
        <RolodexView sections={sections} />
      ) : (
        <div className="flex-1 px-4 py-4 grid gap-4">
          {sections.map((section, i) => (
            <SectionCard key={i} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
