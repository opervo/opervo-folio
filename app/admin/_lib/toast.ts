/* Simple global toast — avoids React context dependency issues */
let _listener: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  if (_listener) _listener(msg);
}

export function onToast(fn: (msg: string) => void) {
  _listener = fn;
  return () => { _listener = null; };
}
