let IsBet = 0
let countYellow = 0
let countBlack = 0
let countWhite = 0
let IsIncreased = 0
let LostSteakRule1 = 0
let LostSteakRule2 = 0
let Mode = -1
let PreviousRes
let IsStarted = false
let SetUi = false
let Choice = -1
let Eated = 0

//config
let MaxEating = 3
let BetAmount = 0.01
let MaxLostStreak = 4
let MaxTimesDouble = 3

function total() {
    return countBlack + countWhite + countYellow
}


function resetBetAmount() {
    let clearBtn = document.getElementsByClassName("bet-input__control")[0]
    clearBtn.click()
    if (BetAmount == 0.01) {
        let add001Btn = document.getElementsByClassName("bet-input__control")[1]
        add001Btn.click()
        console.log("reset to 0.01")
    }
    if (BetAmount == 0.1) {
        let add01Btn = document.getElementsByClassName("bet-input__control")[2]
        add01Btn.click()
        console.log("reset to 0.1")
    }
    if (BetAmount == 1) {
        let add1Btn = document.getElementsByClassName("bet-input__control")[3]
        add1Btn.click()
        console.log("reset to 1")
    }
}

function clearBetAmount() {
    console.log("clear bet amount")
    let clearBtn = document.getElementsByClassName("bet-input__control")[0]
    clearBtn.click()
}

function doubleBetAmount() {
    console.log("double bet amount")
    let doubleBtn = document.getElementsByClassName("bet-input__control")[7]
    doubleBtn.click()
}

function afterResult(res) {
    if (total() == 1) {
        PreviousRes = res
        return
    }
    if (res == "dice") {
        LostSteakRule1++
        LostSteakRule2++
        return
    }

    if (res == PreviousRes) {
        LostSteakRule1 = 0
        LostSteakRule2++
    } else {
        LostSteakRule1++
        LostSteakRule2 = 0
    }
    PreviousRes = res
    if (res == ChoiceToString(Choice) && Mode != -1) {
        Eated ++
    }
}

function bet() {
    IsBet = 1
    let isFirstTime = false
    if (LostSteakRule1 >= MaxLostStreak && Mode == -1) {
        isFirstTime = true
        Mode = 1
    }
    if (LostSteakRule2 >= MaxLostStreak && Mode == -1) {
        isFirstTime = true
        Mode = 2
    }

    if (Mode == -1) {
        return
    }

    if (Eated == MaxEating) {
        clearBetAmount()
        Mode = -1
        Choice = -1
        Eated = 0
        console.log("GIVE UP")
        return
    }

    console.log(isFirstTime, "Eated:", Eated)
    if (isFirstTime == true || Eated > 0) {
        resetBetAmount()
        isFirstTime = false
    } else {
        let showingAmount = document.getElementsByClassName("bg-transparent w-full h-full relative z-10")[0].value
        showingAmount = showingAmount.replace(",",".")
        console.log(showingAmount, BetAmount * Math.pow(2, MaxTimesDouble - 1))
        if (parseFloat(showingAmount) * 2 > BetAmount * Math.pow(2, MaxTimesDouble - 1)) {
            clearBetAmount()
            Mode = -1
            Choice = -1
            Eated = 0
            console.log("GIVE UP")
            return
        }
        doubleBetAmount()
    }

    if (Mode == 1) {
        if (PreviousRes == "black") {
            Choice = 0
        }
        if (PreviousRes == "yellow") {
            Choice = 1
        }
    }
    if (Mode == 2) {
        if (PreviousRes == "black") {
            Choice = 1
        }
        if (PreviousRes == "yellow") {
            Choice = 0
        }
    }

    let placeBetButtons = document.getElementsByClassName("bet-btn")
    if (IsStarted) {
        if (Choice == 0) {
            placeBetButtons[0].click()
        }
        if (Choice == 1) {
            placeBetButtons[2].click()
        }
    }
}

function ChoiceToString(c) {
    if (c == -1) return "none"
    if (c == 0) return "black"
    if (c == 1) return "yellow"
}

function logging(res) {
    if (total() == 1) {
        console.log("FIRST RESULT: ", res)
        return
    }
    Money = document.getElementsByClassName("whitespace-nowrap font-numeric")[0].innerText
    amount = document.getElementsByClassName("bg-transparent w-full h-full relative z-10")[0].value
    console.log("MODE:", Mode, "CHOICE:", ChoiceToString(Choice), "RESULT:", res, "AMOUNT:", amount, "LS1:", LostSteakRule1, "LS2:", LostSteakRule2, "MONEY: ", Money)
    return
}

function handleStartClick() {
    if (startBtn.innerText == "start") {
        startBtn.innerText = "stop"
    } else {
        startBtn.innerText = "start"
    }
    IsStarted = !IsStarted
}

const startBtn = document.createElement("Button")
startBtn.innerText = "start"
startBtn.onclick = handleStartClick

function SetupUI() {
    SetUi = true
    let container = document.getElementsByClassName("layout")[0]
    container.appendChild(startBtn)
}

function filterContent() {
    if (!SetUi) {
        SetupUI()
    }
    let rollingTime = document.getElementsByClassName("text-2xl font-bold font-numeric")
    let t
    if (rollingTime.length > 0) {
        t = rollingTime[0].innerHTML
        // bet at last 5 seconds, bet only have the first result
        if (total() == 0) {
            clearBetAmount()
        } else
            if (1 < parseFloat(t) && parseFloat(t) < 5 && IsBet == 0) {
                bet()
            }
    }

    if (t && t != "0,00") {
        IsIncreased = 0
    }

    if (t && t == "0,01") {
        IsBet = 0
        let betValues = document.getElementsByClassName("whitespace-nowrap font-numeric")
        if (betValues.length > 0) {
            for (let i = 2; i < betValues.length; i++) {
                let bv = betValues[i]
                if (bv.parentElement.innerHTML.includes('+')) {
                    if (IsIncreased == 0) {
                        let res = ""
                        IsIncreased = 1
                        if (i == 2) {
                            res = "black"
                            countBlack = countBlack + 1
                        }
                        if (i == 3) {
                            res = "dice"
                            countWhite = countWhite + 1
                        }
                        if (i == 4) {
                            res = "yellow"
                            countYellow = countYellow + 1
                        }
                        afterResult(res)
                        logging(res)
                    }
                }
            }
        }
    }
}

setInterval(filterContent, 1500)