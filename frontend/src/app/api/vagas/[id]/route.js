import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const vaga = await prisma.vaga.findUnique({ where: { id: params.id } });

  if (!vaga) {
    return NextResponse.json({ error: "Vaga não encontrada" }, { status: 404 });
  }

  return NextResponse.json(vaga);
}
