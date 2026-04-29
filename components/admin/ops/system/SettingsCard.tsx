import Card from '../ui/Card';

interface SettingsCardProps {
  adminUid: string;
  adminEmail: string;
  slackWebhooksConfigured: number;
  anthropicConfigured: boolean;
}

export default function SettingsCard({ adminUid, adminEmail, slackWebhooksConfigured, anthropicConfigured }: SettingsCardProps) {
  return (
    <Card title="Settings">
      <Row label="Admin allowlist">
        <span style={{ fontWeight: 500 }}>{adminEmail}</span>
        <span style={{ color: '#9A9A9A', fontSize: 11, marginLeft: 6 }}>
          {adminUid.slice(0, 8)}…
        </span>
      </Row>
      <Row label="Notification email">{adminEmail}</Row>
      <Row label="Slack webhooks">
        {slackWebhooksConfigured > 0
          ? `${slackWebhooksConfigured} configured`
          : <span style={{ color: '#d94e08' }}>not configured</span>}
      </Row>
      <Row label="Anthropic API key">
        {anthropicConfigured
          ? 'configured (rotate quarterly)'
          : <span style={{ color: '#d94e08' }}>not configured</span>}
      </Row>
      <Row label="Supabase JWT secret">
        configured
      </Row>
    </Card>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 0', fontSize: 13, borderBottom: '1px solid #F0EDE8',
    }}>
      <span style={{ color: '#6B6B6B' }}>{label}</span>
      <span>{children}</span>
    </div>
  );
}
