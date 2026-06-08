import type { ProjectInfoProps } from './interface';
import { ProjectDescription, DeveloperActivity } from './components';

export default function ProjectInfo({
  description,
  developerData,
}: ProjectInfoProps) {
  // If no data, return null to avoid empty section
  if (!description && !developerData) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      {/* Description Column */}
      {description && <ProjectDescription description={description} />}

      {/* Stats Column - Now dedicated to Developer Stats */}
      {developerData && (
        <div className="flex flex-col gap-4 sm:gap-6">
          <DeveloperActivity developerData={developerData} />
        </div>
      )}
    </section>
  );
}
