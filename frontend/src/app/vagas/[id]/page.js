"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VagaDetailPage() {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/vagas/${id}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      setVaga(await res.json());
    }
    load();
  }, [id]);

  if (notFound) {
    return (
      <div>
        <a className="back-link" href="/">
          ← Voltar para a busca
        </a>
        <p className="empty">Vaga não encontrada.</p>
      </div>
    );
  }

  if (!vaga) {
    return <p className="empty">Carregando...</p>;
  }

  const whatsappLink = `https://wa.me/55${vaga.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá! Vi o anúncio "${vaga.titulo}" no GaragemCar e tenho interesse.`
  )}`;

  return (
    <div>
      <a className="back-link" href="/">
        ← Voltar para a busca
      </a>

      <div className="detail-header">
        <div>
          <h1>{vaga.titulo}</h1>
          <p className="subtitle">
            {vaga.endereco} — {vaga.bairro}, {vaga.cidade}
          </p>
        </div>
      </div>

      {vaga.fotoUrl && (
        <img
          src={vaga.fotoUrl}
          alt={vaga.titulo}
          style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
        />
      )}

      <div className="tags" style={{ marginBottom: 16 }}>
        {vaga.coberta && <span className="tag">Coberta</span>}
        {vaga.acesso24h && <span className="tag">Acesso 24h</span>}
        {vaga.exclusiva && <span className="tag">Exclusiva (1 veículo)</span>}
      </div>

      {vaga.descricao && (
        <div className="card">
          <h3>Descrição</h3>
          <p>{vaga.descricao}</p>
        </div>
      )}

      <div className="card">
        <h3>Modalidades e preços</h3>
        <div className="grid-2">
          {vaga.modalidadeHora && (
            <p>
              Por hora: <strong>R$ {vaga.precoHora?.toFixed(2)}</strong>
            </p>
          )}
          {vaga.modalidadeDiaria && (
            <p>
              Diária: <strong>R$ {vaga.precoDiaria?.toFixed(2)}</strong>
            </p>
          )}
          {vaga.modalidadeMensal && (
            <p>
              Mensal: <strong>R$ {vaga.precoMensal?.toFixed(2)}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Contato</h3>
        <p>Anunciado por {vaga.proprietario}</p>
        <a className="btn" href={whatsappLink} target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
