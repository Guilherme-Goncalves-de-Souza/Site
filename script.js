document.addEventListener("DOMContentLoaded", function () {
  // Carrossel de Imagens
  const images = document.querySelectorAll(".carousel-img");
  const dots = document.querySelectorAll(".dot");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  let currentIndex = 0;
  let interval;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function selectImage(index) {
    currentIndex = index;
    showImage(currentIndex);
  }

  function startInterval() {
    // Limpa qualquer intervalo existente antes de definir um novo
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(showNextImage, 3000); // Troca de imagem a cada 3 segundos
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", function () {
      showNextImage();
      startInterval(); // Reinicia o intervalo ao clicar na seta direita
    });
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", function () {
      showPrevImage();
      startInterval(); // Reinicia o intervalo ao clicar na seta esquerda
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      selectImage(index);
      startInterval(); // Reinicia o intervalo ao clicar em um ponto
    });
  });

  startInterval(); // Inicia o intervalo de troca automática de imagens

  const menuToggle = document.getElementById("menu-toggle");
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".close");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      modal.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", function () {
      modal.classList.remove("active");
    });
  }

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("active");
    }
  });
});
