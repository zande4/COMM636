let lastActiveCard = null;

document.addEventListener('DOMContentLoaded', function() {
const cards = document.querySelectorAll('.card');
    cards.forEach(function(card){
        card.addEventListener('click', function() {
            //if block provided by chatgpt
            if (lastActiveCard && lastActiveCard !== card) {
                lastActiveCard.classList.remove('active');
                const focusElement = lastActiveCard.querySelector('img');
                if (focusElement) {
                    focusElement.style.display = 'block';
                }
                lastActiveCard.querySelector('.focus').style.width = '400px';
            }
            setTimeout(function() {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }, 250);
            
            card.querySelector('img').style.display = 'none';
            card.classList.add('active');
            void card.querySelector('img').offsetWidth;
            card.querySelector('.focus').style.width = '600px';

            lastActiveCard = card;
        });
    });
});
