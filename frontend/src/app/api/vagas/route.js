import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const modalidade = searchParams.get("modalidade");
  const q = searchParams.get("q");

  const where = {};
  if (modalidade === "hora") where.modalidadeHora = true;
  if (modalidade === "diaria") where.modalidadeDiaria = true;
  if (modalidade === "mensal") where.modalidadeMensal = true;
  if (q) {
    where.OR = [
      { endereco: { contains: q, mode: "insensitive" } },
      { bairro: { contains: q, mode: "insensitive" } },
      { titulo: { contains: q, mode: "insensitive" } },
    ];
  }

  const vagas = await prisma.vaga.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vagas);
}

export async function POST(request) {
  const body = await request.json();

  const required = ["titulo", "endereco", "bairro", "proprietario", "telefone"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Campo obrigatório ausente: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!body.modalidadeHora && !body.modalidadeDiaria && !body.modalidadeMensal) {
    return NextResponse.json(
      { error: "Selecione ao menos uma modalidade (hora, diária ou mensal)." },
      { status: 400 }
    );
  }

  const vaga = await prisma.vaga.create({
    data: {
      titulo: body.titulo,
      endereco: body.endereco,
      bairro: body.bairro,
      cidade: body.cidade || "São Paulo",
      descricao: body.descricao || null,
      fotoUrl: body.fotoUrl || null,
      coberta: !!body.coberta,
      acesso24h: !!body.acesso24h,
      exclusiva: !!body.exclusiva,
      modalidadeHora: !!body.modalidadeHora,
      modalidadeDiaria: !!body.modalidadeDiaria,
      modalidadeMensal: !!body.modalidadeMensal,
      precoHora: body.precoHora ? Number(body.precoHora) : null,
      precoDiaria: body.precoDiaria ? Number(body.precoDiaria) : null,
      precoMensal: body.precoMensal ? Number(body.precoMensal) : null,
      proprietario: body.proprietario,
      telefone: body.telefone,
    },
  });

  return NextResponse.json(vaga, { status: 201 });
}
