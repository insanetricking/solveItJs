'use strict';



class Sample {
    constructor(props) {
        this.parent = document.querySelector('.ex__box');
        this.amount = props.amount;
        this.numArray = ['+', '-', '*', '/'];
        this.score = 0;
        this.counter = 0;

        this.render();


    }

    render() {

        for (let i = 0; i < this.amount; i++) {
           
            let firstNum = this.getRandomNum(0, 10);
            let secondNum = this.getRandomNum(0, 10);
            let randomSign = this.getRandomSign();
            let sampleStr = `${String(firstNum)} ${String(randomSign)} ${String(secondNum)}`;

            let sampleResult;
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
                    <input type="text" class="sample__input">
                    <div class="sample__result hidden">
                        ${sampleResult}
                    </div>
                    <input type="submit" class="sample__check" value="Проверить">
            `;
            sample.innerHTML = pattern;
            this.parent.append(sample);

            let btn = sample.querySelector('.sample__check');

            btn.addEventListener('click', (e) => {
                const result = sample.querySelector('.sample__result');
                const input = sample.querySelector('.sample__input');
                result.classList.remove('hidden');
                btn.classList.add('hidden');
                input.setAttribute('disabled', true);
                if (input.value == sampleResult) {
                    input.style.color = '#4dfb4d';
                    this.score += 1;
                    

                } else if (input.value == '') {
                    input.style.color = 'red';
                    input.value = 'Пусто';


                } else {
                    input.style.color = 'red';


                }
                this.counter += 1;
                console.log(this.counter);
                console.log(this.amount);
                if(this.counter == this.amount){
                    console.log('i here');
                    this.showResult();
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

    showResult(){
        let modalResult = document.createElement('div');

        modalResult.classList.add('result');

        modalResult.innerHTML = `
        <div class="result__box">
        <p class="result__text">У тебя ${this.score} очков)</p>
        <input type="submit" class="result__closer" value="Еще разок?)">
        </div>
        `;
        document.body.style.overflow = 'hidden';
        document.body.append(modalResult);


        document.querySelector('.result__closer').addEventListener('click', ()=>{
            document.location.reload();
        });
    }


}






const settings = document.querySelector('.ex__settings'),
    input = settings.querySelector('.ex__input'),
    submit = document.querySelector('.ex__submit');




submit.addEventListener('click', () => {

    let sample = new Sample({
        amount: input.value
    });

    settings.classList.add('hidden');


});