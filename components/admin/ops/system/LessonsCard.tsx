import Card from '../ui/Card';
import Stat from '../ui/Stat';

interface LessonsCardProps {
  capturedThisWeek: number;
  proposedInQueue: number;
  mergedLast30d: number;
  rejectedLast30d: number;
}

export default function LessonsCard({ capturedThisWeek, proposedInQueue, mergedLast30d, rejectedLast30d }: LessonsCardProps) {
  return (
    <Card title="Lessons" badge={proposedInQueue > 0 ? `${proposedInQueue} proposed` : undefined} badgeColor="#F5620F">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <Stat label="Captured this week" value={capturedThisWeek} />
        <Stat label="Proposed (in queue)" value={proposedInQueue} />
        <Stat label="Merged (last 30d)" value={mergedLast30d} size="small" />
        <Stat label="Rejected (last 30d)" value={rejectedLast30d} size="small" />
      </div>
    </Card>
  );
}
