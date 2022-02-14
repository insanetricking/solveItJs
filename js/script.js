'use strict';



class Sample {
    constructor(props) {
        this.parent = document.querySelector('.ex__box');
        this.amount = +props.amount;
        this.numArray = ['+', '-', '*', '/'];
        this.score = 0;
        this.counter = 0;
        this.phrases = {
            excellent: 'Это Великолепно!!!',
            good: 'Очень хороший результат)',
            normal: 'Не плохо)',
            bad: 'Тебе стоит больше решать'
        };
        this.render();


    }

    render() {

        for (let i = 0; i < this.amount; i++) {

            let firstNum = this.getRandomNum(0, 10);
            let secondNum = this.getRandomNum(0, 10);
            let randomSign = this.getRandomSign();
            let sampleStr = `${String(firstNum)} ${String(randomSign)} ${String(secondNum)} =`;

            let sampleResult;
            if (randomSign === '+') {
                sampleResult = firstNum + secondNum;
            } else if (randomSign === '-') {
                sampleResult = firstNum - secondNum;
            }

            let sample = document.createElement('div');
            sample.classList.add('sample');

            let pattern = `
                <div class="content">
                    <div class="sample__str">
                        ${sampleStr}
                    </div>
                    <input type="text" class="sample__input">     
                </div>
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
                if (this.counter == this.amount) {

                    const percent = Math.floor(this.score * 100 / this.amount);
                    console.log(percent);
                    if (percent == 100) {
                        this.showResult(this.phrases.excellent, percent);
                    } else if (percent >= 60 && percent < 100) {
                        this.showResult(this.phrases.good, percent);
                    } else if (percent >= 30 && percent < 60) {
                        this.showResult(this.phrases.normal, percent);
                    } else if (percent >= 30 && percent < 60) {
                        this.showResult(this.phrases.bad, percent);
                    }

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

    showResult(text, percent) {
        let modalResult = document.createElement('div');

        modalResult.classList.add('result');

        modalResult.innerHTML = `
        <div class="result__box">
        <p class="result__text">${text},<br> У тебя ${percent}% правильных
        <br> ${this.score}/${this.amount}
        </p>
        <input type="submit" class="result__closer" value="Еще разок?)">
        </div>
        `;
        document.body.style.overflow = 'hidden';
        document.body.append(modalResult);


        document.querySelector('.result__closer').addEventListener('click', () => {
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