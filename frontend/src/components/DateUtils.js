export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

export function daysLeft(targetDateStr) {
  if (!targetDateStr) return '';
  const now = new Date();
  const target = new Date(targetDateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} days left` : diff === 0 ? 'Today' : 'Past due';
} 