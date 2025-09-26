
export interface Fact {
  _id: string;
  text: string;
  type?: string;
  user?: any;
  upvotes?: number | null;
  source?: string | null;
}

const API_URL = 'https://cat-fact.herokuapp.com/facts';

export const fetchFacts = async (): Promise<Fact[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Erro na requisição: ' + res.status);
  }
  const json = await res.json();
  // API returns array of facts or an object; normalize to array
  if (Array.isArray(json)) return json.map((f: any) => normalize(f));
  if (json && typeof json === 'object') {
    // Some versions return { all: [...] }
    if (Array.isArray((json as any).all)) return (json as any).all.map((f: any) => normalize(f));
  }
  return [];
};

const normalize = (f: any) : Fact => {
  return {
    _id: f._id ?? (f.id ?? Math.random().toString()),
    text: f.text ?? f.description ?? '',
    type: f.type,
    user: f.user,
    upvotes: f.upvotes ?? null,
    source: f.source ?? null
  };
};
