import { NextResponse } from 'next/server';

import runPlay from '@server/runPlay';

export async function POST(request, data) {
  // handle errors
  const { playType } = await request.json();
  const { matchupId } = data?.params;

  const playResult = await runPlay(matchupId, playType);

  return NextResponse.json({
    play: playResult,
  });
}
