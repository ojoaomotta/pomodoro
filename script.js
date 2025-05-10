
// pegando elementos da tela
const timer = document.getElementById('timer')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')
const alerta = document.getElementById('alerta')

let workMin = document.getElementById('work-min')
let shortBreakMin = document.getElementById('short-break-min')
let longBreakMin = document.getElementById('long-break-min')

let tempoRestante = 25 * 60 // tempo em segundos
let intervalo = null
let emPausa = false
let ciclo = 0 // conta quantos ciclos de trabalho foram feitos
let modo = 'trabalho' // pode ser 'trabalho', 'pausa-curta' ou 'pausa-longa'

// atualiza o texto do timer
function atualizarDisplay() {
    let minutos = Math.floor(tempoRestante / 60)
    let segundos = tempoRestante % 60
    timer.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
}

// define o tempo do modo atual
function configurarModo(tipo) {
    modo = tipo
    if (modo === 'trabalho') tempoRestante = parseInt(workMin.value) * 60
    else if (modo === 'pausa-curta') tempoRestante = parseInt(shortBreakMin.value) * 60
    else tempoRestante = parseInt(longBreakMin.value) * 60
    atualizarDisplay()
}

// inicia o temporizador
function iniciarTimer() {
    if (intervalo) return
    intervalo = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--
            atualizarDisplay()
        } else {
            clearInterval(intervalo)
            intervalo = null
            alerta.play()

            if (modo === 'trabalho') {
                ciclo++
                if (ciclo % 4 === 0) configurarModo('pausa-longa')
                else configurarModo('pausa-curta')
            } else {
                configurarModo('trabalho')
            }

            iniciarTimer()
        }
    }, 1000)
}

// pausa o timer
function pausarTimer() {
    clearInterval(intervalo)
    intervalo = null
}

// reseta tudo
function resetarTimer() {
    clearInterval(intervalo)
    intervalo = null
    ciclo = 0
    configurarModo('trabalho')
}

// adicionando eventos pros botões
startBtn.addEventListener('click', iniciarTimer)
pauseBtn.addEventListener('click', pausarTimer)
resetBtn.addEventListener('click', resetarTimer)

// inicia com modo trabalho
configurarModo('trabalho')