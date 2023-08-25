  
export function setOpacityLastTwoCard() {
    let cards = document.querySelectorAll('.card-main') as any
    let lastTwo = [...cards]?.splice(-2);
    lastTwo.forEach(element => {
        element.style.display = 'block';
    });
}

export function checkIfNoMoreCards(setEmpty:any) {
    let cards = document.querySelectorAll('.card-main') as any;
    if(cards.length === 1 || cards.length === 0) {
        if(setEmpty) {
            setEmpty(true)
        }
    }
}