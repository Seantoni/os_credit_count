document.addEventListener('DOMContentLoaded', function() {
  // Animate the credit notice
  setTimeout(() => {
    const creditNotice = document.querySelector('.credit-notice');
    if (creditNotice) {
      creditNotice.classList.add('animate');
    }
  }, 500);

  // Rolling counter animation for credit amount
  function animateCounter() {
    const counter = document.getElementById('creditCounter');
    const amountContainer = document.getElementById('credit-amount-container');
    const textBefore = document.getElementById('credit-text-before');
    const textAfter = document.getElementById('credit-text-after');
    const subnote = document.getElementById('credit-subnote');

    const targetValue = 5.00;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = targetValue * easeOutExpo;
      
      if (counter) {
        counter.textContent = currentValue.toFixed(2);
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (counter) {
          counter.textContent = targetValue.toFixed(2);
        }

        // --- Start second phase of animation ---
        if (amountContainer) {
          amountContainer.classList.add('final-size');
        }
        if (textBefore) {
          textBefore.classList.add('visible');
        }
        if (textAfter) {
          textAfter.classList.add('visible');
        }
        if (subnote) {
          subnote.classList.add('visible');
        }
        
        // Trigger confetti
        setTimeout(() => {
          const noticeContainer = document.querySelector('.credit-notice');
          if (noticeContainer) {
            const rect = noticeContainer.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = rect.bottom / window.innerHeight;

            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x, y }
            });
          }
        }, 300); // Small delay to let text appear first
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Start the counter animation
  setTimeout(animateCounter, 500);
  
  const compraBoxes = document.querySelectorAll('.compra-box');
  const comprarBtn = document.getElementById('comprarBtn');
  let selectedBox = null;
  
  compraBoxes.forEach(box => {
    box.addEventListener('click', function() {
      // Remove selection from all boxes
      compraBoxes.forEach(b => b.classList.remove('selected'));
      
      // Add selection to clicked box
      this.classList.add('selected');
      selectedBox = this;
    });
  });
  
  // Handle main CTA button click
  comprarBtn.addEventListener('click', function() {
    if (selectedBox) {
      const price = selectedBox.getAttribute('data-price');
      const credit = selectedBox.getAttribute('data-credit');
      const finalPrice = price - credit;
      const packageName = selectedBox.querySelector('.label').textContent;
      
      alert(`¡Perfecto! Vas a comprar "${packageName}" por $${finalPrice} usando tu crédito de $${credit}.`);
      
      // Here you would redirect to checkout
      // window.location.href = `checkout.html?package=${encodeURIComponent(packageName)}&price=${finalPrice}&credit=${credit}`;
    } else {
      alert('Por favor selecciona un paquete antes de continuar.');
    }
  });
}); 