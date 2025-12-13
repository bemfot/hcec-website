import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.text();

  const res = await fetch(`${process.env.BASE_URL}/daily-honey`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body || undefined,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
