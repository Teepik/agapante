/** L'adresse garde l'état utile au partage : classe, voie, passerelle, métier. */
export function readParam(key: string): string | null {
  try {
    return new URLSearchParams(window.location.search).get(key);
  } catch {
    return null;
  }
}

export function writeParam(key: string, value: string | null) {
  try {
    const u = new URL(window.location.href);
    if (value) u.searchParams.set(key, value);
    else u.searchParams.delete(key);
    if (u.href !== window.location.href) window.history.replaceState(window.history.state, "", u);
  } catch {
    /* adresse inchangée */
  }
}
