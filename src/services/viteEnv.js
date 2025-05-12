let viteEnv = null;
let fetchPromise = null;

export async function getViteEnv() {
  if (viteEnv) return viteEnv;
  if (!fetchPromise) {
    fetchPromise = fetch('/api/vite-env')
      .then(res => res.json())
      .then(vars => {
        viteEnv = vars;
        return viteEnv;
      });
  }
  return fetchPromise;
} 