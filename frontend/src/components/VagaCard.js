function formatPrice(vaga) {
  if (vaga.modalidadeMensal && vaga.precoMensal) {
    return `R$ ${vaga.precoMensal.toFixed(0)}/mês`;
  }
  if (vaga.modalidadeDiaria && vaga.precoDiaria) {
    return `R$ ${vaga.precoDiaria.toFixed(0)}/dia`;
  }
  if (vaga.modalidadeHora && vaga.precoHora) {
    return `R$ ${vaga.precoHora.toFixed(0)}/h`;
  }
  return "Consultar preço";
}

export default function VagaCard({ vaga }) {
  return (
    <a href={`/vagas/${vaga.id}`} className="card vaga-card">
      <div className="info">
        <h3>{vaga.titulo}</h3>
        <p>
          {vaga.endereco} — {vaga.bairro}, {vaga.cidade}
        </p>
        <div className="tags">
          {vaga.coberta && <span className="tag">Coberta</span>}
          {vaga.acesso24h && <span className="tag">Acesso 24h</span>}
          {vaga.exclusiva && <span className="tag">Exclusiva</span>}
          {vaga.modalidadeHora && <span className="tag">Por hora</span>}
          {vaga.modalidadeDiaria && <span className="tag">Diária</span>}
          {vaga.modalidadeMensal && <span className="tag">Mensal</span>}
        </div>
      </div>
      <div className="price">{formatPrice(vaga)}</div>
    </a>
  );
}
