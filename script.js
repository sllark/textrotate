let textStart = "BIELEFELD",
    textEnd = "NAPOLI";

let cont = document.querySelector('.textCont'),
    alphabets = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];


const returnRandAlp = (startLength, endLength, index, letterNum) => {

    index++;

    // console.log(startLength, endLength, index,letterNum);

    if (index === startLength) {
        return "";
    }

    if (index > endLength) {

        if (letterNum > ((startLength - index) + 1)) {
            return "";
        }


    }


    let charIndex = Math.floor((Math.random() * alphabets.length));

    return alphabets[charIndex]
}

window.onload = () => {

    let textWords = textStart.split(" ");

    textWords.forEach(word => {

        let chars = word.split('');
        let wordCont = document.createElement('div');

        wordCont.classList.add("word");
        wordCont.classList.add("animate");

        chars.forEach((letter, index) => {
            let letterCont = document.createElement('div');

            letterCont.classList.add('letter');

            let letterSpanOne = document.createElement('span');
            let letterSpanTwo = document.createElement('span');
            let letterSpanThree = document.createElement('span');
            let letterSpanFour = document.createElement('span');
            let letterSpanFive = document.createElement('span');


            letterSpanOne.classList.add('visible')
            letterSpanTwo.classList.add('visible')
            letterSpanThree.classList.add('visible')
            letterSpanFour.classList.add('visible')
            letterSpanFive.classList.add('visible')


            letterSpanOne.innerHTML = letter;
            letterSpanTwo.innerHTML = returnRandAlp(textStart.length, textEnd.length, index, 2);
            letterSpanThree.innerHTML = returnRandAlp(textStart.length, textEnd.length, index, 3);
            letterSpanFour.innerHTML = returnRandAlp(textStart.length, textEnd.length, index, 4);
            letterSpanFive.innerHTML = textEnd[index] || "";


            letterCont.append(letterSpanOne)
            letterCont.append(letterSpanTwo)
            letterCont.append(letterSpanThree)
            letterCont.append(letterSpanFour)
            letterCont.append(letterSpanFive)

            wordCont.append(letterCont);

        })


        cont.append(wordCont);
    })


    setTimeout(addAni,1000);
}



function addAni(){


    let letterNum = 1, doneProgress=0,counter=0,
        fontFrom = (850/(textStart.length+6)) * 2.3,
        fontEnd = (850/(textEnd.length+6)) * 2.35;

    var tl = anime.timeline({
        easing: 'easeOutExpo',
        autoplay: true,

    });

// Add children
    tl
        .add({
            targets: '.animate .letter span',
            translateY: -600,
            duration: 1000,
            delay: anime.stagger(30),

            update: function (anim) {

                let currentProgress = Math.floor(anim.progress);

                counter++;

                if (doneProgress !== currentProgress && currentProgress <= 80 && currentProgress % 20 === 0) {
                    console.log(currentProgress)

                    doneProgress = currentProgress;
                    document.querySelectorAll(`.animate .letter > span:nth-of-type(${letterNum})`).forEach(ele => {
                        // ele.innerHTML="";
                        // ele.classList.remove('visible');
                        // ele.classList.add('hide');

                    });


                    // if (currentProgress>50){
                    // document.querySelector('.textCont').style.setProperty('--spanFont', '130px');
                    // }

                    letterNum++;
                }

                // console.log(counter);
            }


        })
        .add({
            targets: '.letter span',
            fontSize:[fontFrom,fontEnd],
            duration: 400,
            delay: anime.stagger(15,{start: 1200}),
        },0)



}