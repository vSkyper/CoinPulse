import type { ProjectInfoProps } from './interface';
import { ProjectDescription, DeveloperActivity } from './components';

export default function ProjectInfo({
  description,
  developerData,
}: ProjectInfoProps) {

  // If no data, return null to avoid empty section
  if (!description && !developerData) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Description Column */}
      {description && <ProjectDescription description={description} />}

      {/* Stats Column - Now dedicated to Developer Stats */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {developerData && <DeveloperActivity developerData={developerData} />}
      </div>
    </section>
  );
}
