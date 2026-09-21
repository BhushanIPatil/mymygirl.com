export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function brandText(value = 'mymygirl'): string {
  return escapeHtml(value).replace(/mymygirl/gi, '<span class="brand-text">my<span>my</span>girl</span>');
}
