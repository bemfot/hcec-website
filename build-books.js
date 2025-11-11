import fs from 'fs/promises';

const BASE = 'https://bible.helloao.org/api';
const TRANSLATIONS = {
  eng_kjv: 'eng_kjv',
  fra_lsg: 'fra_lsg',
  yor_bib: 'yor_bib'
};

async function fetchBooks(translationId) {
  const url = `${BASE}/${translationId}/books.json`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }});
  if (!res.ok) throw new Error(`Failed to fetch ${translationId} books.json (${res.status})`);
  const json = await res.json();
  const books = Array.isArray(json) ? json : (json.books || []);
  return books.map(b => ({
    translationId,
    id: b.id || b.slug || null,
    name: b.name || null,
    englishName: b.englishName || null,
    commonName: b.commonName || null,
    shortName: b.shortName || null,
    firstChapterApiLink: b.firstChapterApiLink || null,
    numberOfChapters: b.numberOfChapters || null
  }));
}

async function main() {
  const out = {};
  for (const key of Object.values(TRANSLATIONS)) {
    try {
      const list = await fetchBooks(key);
      out[key] = list;
      console.log(`Fetched ${list.length} books for ${key}`);
    } catch (err) {
      console.error(`Error fetching ${key}:`, err.message);
      out[key] = [];
    }
  }
  await fs.writeFile('./books_data.json', JSON.stringify(out, null, 2), { encoding: 'utf8' });
  console.log('Wrote ./books_data.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
