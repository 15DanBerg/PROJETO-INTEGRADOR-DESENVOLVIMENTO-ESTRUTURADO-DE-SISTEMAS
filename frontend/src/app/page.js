"use client";

import { useEffect, useState } from "react";
import VagaCard from "@/components/VagaCard";

const MODALIDADES = [
  { key: "", label: "Todas" },
  { key: "hora", label: "Por hora" },
  { key: "diaria", label: "Diária" },
  { key: "mensal", label: "Mensal" },
];

export default function HomePage() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalidade, setModalidade] = useState("");
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (modalidade) params.set("modalidade", modalidade);
    if (q) params.set("q", q);
    const res = await fetch(`/api/vagas?${params.toString()}`);
    const data = await res.json();
    setVagas(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalidade]);

  function onSubmit(e) {
    e.preventDefault();
    load();
  }

  return (
    <div>
      <h1>Estacione perto. Ou alugue sua vaga.</h1>
      <p className="subtitle">
        Encontre vagas de garagem particulares por hora, diária ou mensal.
      </p>

      <form className="search-row" onSubmit={onSubmit}>
        <input
          placeholder="Buscar por endereço ou bairro"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="filters">
        {MODALIDADES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`chip ${modalidade === m.key ? "active" : ""}`}
            onClick={() => setModalidade(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {loading && <p className="empty">Carregando vagas...</p>}

      {!loading && vagas.length === 0 && (
        <p className="empty">Nenhuma vaga encontrada. Que tal anunciar a sua?</p>
      )}

      <div className="vaga-list">
        {vagas.map((vaga) => (
          <VagaCard key={vaga.id} vaga={vaga} />
        ))}
      </div>
    </div>
  );
}
