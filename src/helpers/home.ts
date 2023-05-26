export function home() {
  console.clear();
  window.location.href = '/';
}

(window as any).home = home;
