const languages = document.querySelectorAll('.language-btnJS');
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
                    translate(textToChange, key, value)
                }
            })
        }else{
            translate(textToChange, selector, text);
        }

    })
}
const translate = (textToChange, selector, text) =>{
    const array = selector.split("-");
    if(array?.length > 0 && array[0] == "attr"){
        textToChange[array[1]] = text
    }else{
        textToChange.innerHTML = text;
    }
}
languages.forEach( btn => {
    btn.addEventListener('click', (e) => {
        let imgLan = document.querySelectorAll('.lan-iconJS');
        let currentLanguage = e.target;
        let language = e.target.id;
        imgLan.forEach( img => {
            img.classList.remove('current-languageJS');
        });
        currentLanguage.classList.add('current-languageJS');
        changeLanguage(language);
    })
})