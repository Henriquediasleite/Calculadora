const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function(charKeyBtn) {
    charKeyBtn.addEventListener('click', function() {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function(){ //função para limpar o imput
    input.value = ''
    input.focus()
})

input.addEventListener('keydown', function(ev) {
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)) { //se estiver inclusa no arr significa que será um caracter valido
        input.value += ev.key
        return
    }

    if(ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }

    if(ev.key === 'Enter') {
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate) //quando o botão de igual for clicado, a soma sera feita

function calculate() {
    //essas duas linhas sempre vão ser as primeiras a ser executada
    resultInput.value = 'ERROR' //resultado do input sempre começa com o valor 'ERROR'
    resultInput.classList.add('error') //adiciona a classe 'error'

    const result = eval(input.value)//tenta calcular o resultado com o eval

    resultInput.value = result //coloca o resultado no input
    resultInput.classList.remove('error') //remove a classe do input
}

document.getElementById('copyToClipboard').addEventListener('click', function(ev) { //função de copiar o valor para area de transferencia
    const button = ev.currentTarget 
    if(button.innerText === 'Copy') { //verifica se o texto do botão é igual a copy
        button.innerText = 'Copied' //altera de 'Copy' para 'Copied'
        button.classList.add('success') //recebe a classe success
        navigator.clipboard.writeText(resultInput.value) //escreve o valor do resultado do input
    } else{
        button.innerText = 'Copy' 
        button.classList.remove('success') //remove a classe success
    }
})

document.getElementById('themeSwitcher').addEventListener('click', function(){ //função responsavel por trocar o tema 
    if(main.dataset.theme === 'dark') { //dataset utilizado para verificar se o tema atual é dark
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light' //trocou para o tema light
    } else{
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})