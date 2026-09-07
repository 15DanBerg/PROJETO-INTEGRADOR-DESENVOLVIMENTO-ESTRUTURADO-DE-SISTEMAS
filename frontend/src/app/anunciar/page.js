"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  titulo: "",
  endereco: "",
  bairro: "",
  cidade: "São Paulo",
  descricao: "",
  fotoUrl: "",
  coberta: false,
  acesso24h: false,
  exclusiva: false,
  modalidadeHora: false,
  modalidadeDiaria: false,
  modalidadeMensal: false,
  precoHora: "",
  precoDiaria: "",
  precoMensal: "",
  proprietario: "",
  telefone: "",
};

export default function AnunciarPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/vagas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erro ao cadastrar vaga.");
      return;
    }

    const vaga = await res.json();
    router.push(`/vagas/${vaga.id}`);
  }

  return (
    <div>
      <h1>Anunciar vaga</h1>
      <p className="subtitle">
        Preencha os dados da sua garagem para começar a receber solicitações.
      </p>

      {error && <div className="error">{error}</div>}

      <form className="card" onSubmit={onSubmit}>
        <div className="field">
          <label>Título do anúncio</label>
          <input
            required
            placeholder="Ex: Garagem coberta em condomínio"
            value={form.titulo}
            onChange={(e) => update("titulo", e.target.value)}
          />
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Endereço</label>
            <input
              required
              value={form.endereco}
              onChange={(e) => update("endereco", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Bairro</label>
            <input
              required
              value={form.bairro}
              onChange={(e) => update("bairro", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Cidade</label>
          <input
            value={form.cidade}
            onChange={(e) => update("cidade", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Descrição</label>
          <textarea
            rows={3}
            placeholder="Detalhes sobre a vaga, regras de utilização, etc."
            value={form.descricao}
            onChange={(e) => update("descricao", e.target.value)}
          />
        </div>

        <div className="field">
          <label>URL da foto (opcional)</label>
          <input
            value={form.fotoUrl}
            onChange={(e) => update("fotoUrl", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Características</label>
          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={form.coberta}
                onChange={(e) => update("coberta", e.target.checked)}
              />
              Coberta
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.acesso24h}
                onChange={(e) => update("acesso24h", e.target.checked)}
              />
              Acesso 24h
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.exclusiva}
                onChange={(e) => update("exclusiva", e.target.checked)}
              />
              Exclusiva (1 veículo)
            </label>
          </div>
        </div>

        <div className="field">
          <label>Modalidades e preços</label>
          <div className="checkbox-row" style={{ marginBottom: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={form.modalidadeHora}
                onChange={(e) => update("modalidadeHora", e.target.checked)}
              />
              Por hora
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.modalidadeDiaria}
                onChange={(e) => update("modalidadeDiaria", e.target.checked)}
              />
              Diária
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.modalidadeMensal}
                onChange={(e) => update("modalidadeMensal", e.target.checked)}
              />
              Mensal
            </label>
          </div>

          <div className="grid-2">
            {form.modalidadeHora && (
              <div className="field">
                <label>Preço por hora (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precoHora}
                  onChange={(e) => update("precoHora", e.target.value)}
                />
              </div>
            )}
            {form.modalidadeDiaria && (
              <div className="field">
                <label>Preço diária (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precoDiaria}
                  onChange={(e) => update("precoDiaria", e.target.value)}
                />
              </div>
            )}
            {form.modalidadeMensal && (
              <div className="field">
                <label>Preço mensal (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precoMensal}
                  onChange={(e) => update("precoMensal", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Seu nome</label>
            <input
              required
              value={form.proprietario}
              onChange={(e) => update("proprietario", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Telefone / WhatsApp</label>
            <input
              required
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={(e) => update("telefone", e.target.value)}
            />
          </div>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Publicando..." : "Publicar anúncio"}
        </button>
      </form>
    </div>
  );
}
