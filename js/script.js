'use strict';



class Sample {
    constructor(props) {
        this.parent = document.querySelector('.ex__box');
        this.amount = props.amount;
        this.numArray = ['+', '-', '*', '/'];

        console.log('its here');
        this.render();
    }

    render() {

        console.log('its here');
        for (let i = 0; i < this.amount; i++) {
            console.log('its here');
            let firstNum = this.getRandomNum(0, 10);
            let secondNum = this.getRandomNum(0, 10);
            let randomSign = this.getRandomSign();
            let sampleStr = `${String(firstNum)} ${String(randomSign)} ${String(secondNum)}`;

            let sampleResult
            if (randomSign === '+') {
                sampleResult = firstNum + secondNum;
            } else if (randomSign === '-') {
                sampleResult = firstNum - secondNum;
            }

            let sample = document.createElement('div');
            sample.classList.add('sample');

            let pattern = `
                    <div class="sample__str">
                        ${sampleStr}
                    </div>
                    <input type="number" class="sample__input">
                    <div class="sample__result hidden">
                        ${sampleResult}
                    </div>
                    <input type="submit" class="sample__check" value="Проверить">
            `;
            sample.innerHTML = pattern;
            this.parent.append(sample);

            let btn = sample.querySelector('.sample__check');

            btn.addEventListener('click', (e)=>{
                const result = sample.querySelector('.sample__result');
                const input = sample.querySelector('.sample__input');
                result.classList.remove('hidden');
                btn.classList.add('hidden');
                input.setAttribute('disabled', true);
                if(input.value == sampleResult ){
                    input.style.color = '#4dfb4d';
                }else if(input.value == ''){
                    input.style.color = 'red';
                    input.value ='Пусто';
                }else{
                    input.style.color = 'red';
                }
            });
        }
    }

    getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomSign() {
        return this.numArray[this.getRandomNum(0, 1)];
    }


}


const settings = document.querySelector('.ex__settings'),
    input = settings.querySelector('.ex__input'),
    submit = document.querySelector('.ex__submit');




submit.addEventListener('click', () => {
    console.log('i work');
    console.log(input.value);
    let sample = new Sample({
        amount: input.value
    });

    settings.classList.add('hidden');


});