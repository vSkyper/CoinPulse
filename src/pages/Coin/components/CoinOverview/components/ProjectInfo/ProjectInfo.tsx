import type { ProjectInfoProps } from './interface';
import { ProjectDescription } from './components';

export default function ProjectInfo({
  description,
}: ProjectInfoProps) {
  // If no data, return null to avoid empty section
  if (!description) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      {/* Description Column */}
      <ProjectDescription description={description} />
    </section>
  );
}
