const language = document.querySelectorAll('.language-btn');
const textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./language/${language}.json`);
    const texts = await requestJson.json();

    textsToChange.forEach( textToChange => {
        const section = textToChange.dataset.section;
        const selector = textToChange.dataset.value;
        if(!texts[section][selector]){
            return;
        }
        const text = texts[section][selector];
        if(Array.isArray(text)){
            text.forEach(val => {
                for(const [key, value] of Object.entries(val)){
                    changeAlgo(textToChange, key, value)
                }
            })
        }else{
            changeAlgo(textToChange, selector, text);
        }

    })
}
const changeAlgo = (textToChange, selector, text) =>{
    const array = selector.split("-");
    if(array?.length > 0 && array[0] == "attr"){
        textToChange[array[1]] = text
    }else{
        textToChange.innerHTML = text;
    }
}
language.forEach( btn => {
    btn.addEventListener('click', (e) => {
        let language = e.target.id;
        changeLanguage(language);
    })
})