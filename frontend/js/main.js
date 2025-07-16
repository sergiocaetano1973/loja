document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("produtos");
  const busca = document.getElementById("buscaRapida");
  const botoesSegmento = document.querySelectorAll("#segmentos .type");

 const produtos = [
  { id: 1, nome: "Torneira 1/4 volta", preco: 45.90, imagem: "img/cano.jpeg", segmento: "hidráulica" },
  { id: 2, nome: "Interruptor simples", preco: 9.90, imagem: "img/disjuntores.jpeg", segmento: "elétrica" },
  { id: 3, nome: "Chave Philips", preco: 15.50, imagem: "img/hidra-vcr.jpg", segmento: "ferramentas" },
  { id: 4, nome: "Torneira gourmet", preco: 149.90, imagem: "img/cano.jpeg", segmento: "hidráulica" },
  { id: 5, nome: "Disjuntor bipolar", preco: 19.90, imagem: "img/disjuntores.jpeg", segmento: "elétrica" },
  { id: 6, nome: "Alicate universal", preco: 25.50, imagem: "img/hidra-vcr.jpg", segmento: "ferramentas" },
  { id: 7, nome: "Registro 1/2", preco: 34.90, imagem: "img/cano.jpeg", segmento: "hidráulica" },
  { id: 8, nome: "Tomada dupla", preco: 12.90, imagem: "img/disjuntores.jpeg", segmento: "elétrica" },
  { id: 9, nome: "Chave de fenda", preco: 11.90, imagem: "img/hidra-vcr.jpg", segmento: "ferramentas" },
  { id: 10, nome: "Filtro de torneira", preco: 59.90, imagem: "img/cano.jpeg", segmento: "linha branca" },
  { id: 11, nome: "Sensor de presença", preco: 89.90, imagem: "img/disjuntores.jpeg", segmento: "elétrica" },
  { id: 12, nome: "Mangueira trançada", preco: 24.90, imagem: "img/hidra-vcr.jpg", segmento: "hidráulica" }
];


  let filtroSegmento = ""; // armazenar filtro ativo

  function renderizar(produtosFiltrados) {
    lista.innerHTML = "";
    if (produtosFiltrados.length === 0) {
      lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    produtosFiltrados.forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card-produto");
      card.onclick = () => window.location.href = `produto.html?id=${produto.id}`;

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="card-info">
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <button class="btn-carrinho" onclick="adicionarAoCarrinho(event, ${produto.id})">
            <img src="img/carrinho.png" width="18" style="vertical-align: middle; margin-right: 5px;"> Adicionar
          </button>
        </div>
      `;
      lista.appendChild(card);
    });
  }

  function filtrarProdutos() {
    const termo = busca.value.trim().toLowerCase();

    const filtrados = produtos.filter(p => {
      const nomeOk = p.nome.toLowerCase().includes(termo);
      const segmentoOk = filtroSegmento === "" || p.segmento === filtroSegmento;
      return nomeOk && segmentoOk;
    });

    renderizar(filtrados);
  }

  // Busca em tempo real
  busca.addEventListener("input", filtrarProdutos);

  // Clique nos botões de segmento
  botoesSegmento.forEach(botao => {
    botao.addEventListener("click", () => {
      // pega valor do data-segmento
      const segmento = botao.dataset.segmento;

      // alternar filtro
      filtroSegmento = filtroSegmento === segmento ? "" : segmento;

      // destacar botão ativo
      botoesSegmento.forEach(b => b.classList.remove("ativo"));
      if (filtroSegmento) botao.classList.add("ativo");

      filtrarProdutos();
    });
  });

  renderizar(produtos); // renderiza todos ao iniciar
});

function adicionarAoCarrinho(event, id) {
  event.stopPropagation(); // não ativa o clique do card
  alert("Produto " + id + " adicionado ao carrinho (simulado)");
}



