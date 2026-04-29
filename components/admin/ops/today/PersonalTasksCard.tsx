'use client';

import { useState, useTransition } from 'react';
import Card from '../ui/Card';
import { opsApi, type PersonalTask } from '@/lib/admin/api-client';

interface PersonalTasksCardProps {
  initialTasks: PersonalTask[];
}

export default function PersonalTasksCard({ initialTasks }: PersonalTasksCardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isPending, startTransition] = useTransition();

  const openTasks = tasks.filter(t => t.status !== 'done' && t.status !== 'cancelled');

  function toggle(task: PersonalTask) {
    const nextStatus = task.status === 'done' ? 'open' : 'done';
    startTransition(async () => {
      try {
        const updated = await opsApi<PersonalTask>('/api/personal-tasks', {
          method: 'PATCH',
          body: { id: task.id, status: nextStatus },
        });
        setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
      } catch {
        // toast in real impl
      }
    });
  }

  function create() {
    const title = newTitle.trim();
    if (!title) return;
    startTransition(async () => {
      try {
        const created = await opsApi<PersonalTask>('/api/personal-tasks', {
          method: 'POST',
          body: { title },
        });
        setTasks(prev => [created, ...prev]);
        setNewTitle('');
        setShowForm(false);
      } catch {
        // toast
      }
    });
  }

  return (
    <Card title="Personal Tasks" badge={`${openTasks.length} open`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {openTasks.length === 0 && (
          <div style={{ padding: '8px 0', color: '#6B6B6B', fontSize: 13 }}>No personal tasks.</div>
        )}
        {openTasks.map(task => (
          <label
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '6px 0',
              fontSize: 13,
              cursor: 'pointer',
              opacity: isPending ? 0.5 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={false}
              onChange={() => toggle(task)}
              disabled={isPending}
              style={{ marginTop: 3 }}
            />
            <span style={{ flex: 1 }}>{task.title}</span>
            {task.priority !== 'normal' && (
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                color: task.priority === 'urgent' ? '#d94e08' : task.priority === 'high' ? '#F5620F' : '#6B6B6B',
              }}>
                {task.priority}
              </span>
            )}
          </label>
        ))}
      </div>

      {showForm ? (
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') create(); }}
            placeholder="What needs doing?"
            autoFocus
            style={{
              flex: 1, padding: '8px 10px', border: '1px solid #E8E4DE',
              borderRadius: 6, fontSize: 13,
            }}
          />
          <button onClick={create} disabled={isPending}
            style={{
              background: '#F5620F', color: '#FFFFFF', border: 'none',
              borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
            Add
          </button>
          <button onClick={() => { setShowForm(false); setNewTitle(''); }}
            style={{
              background: 'none', border: '1px solid #E8E4DE',
              borderRadius: 6, padding: '8px 12px', fontSize: 13, cursor: 'pointer',
            }}>
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: 12,
            background: 'none',
            border: '1px dashed #E8E4DE',
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: 12,
            color: '#6B6B6B',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          + Add task
        </button>
      )}
    </Card>
  );
}
