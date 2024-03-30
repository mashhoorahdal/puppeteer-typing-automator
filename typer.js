const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(100000);

    
    try{
        await page.goto('https://www.typing.com/student/typing-test/1-page')
        // await page.waitForSelector(".js-continue-button.btn.btn--a.has-tooltip");
        // await page.keyboard.press('Enter');

        // const skip = document.querySelector(".js-continue-button.btn.btn--a.has-tooltip")
        // console.log(skip.innerText)
        await page.waitForSelector('.letter.letter--basic.screenBasic-letter');
    
        const grabLetters = await page.evaluate(()=>{
            const letter = document.querySelectorAll(".letter.letter--basic.screenBasic-letter");
            const lettersArray = Array.from(letter).map((letter)=>letter.innerText);
            return lettersArray;
        })
        const allLetters = await grabLetters;
        
        console.log(allLetters)

        for (let i=0 ; i<allLetters.length ; i++){
            if (allLetters[i].trim() === ''){
                await page.keyboard.press('Space');
            }else{
                await page.type(".screenBasic-lines.js-screen-lines", allLetters[i]);
            }
        }
    }catch(error){
        console.log(error);
    }
   
})();
