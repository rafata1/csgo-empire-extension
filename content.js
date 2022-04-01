let IsBet = 0
let countYellow = 0
let countBlack = 0
let countWhite = 0
let IsIncreased = 0
let LostSteakRule1 = 0
let LostSteakRule2 = 0
let Mode = -1
let PreviousRes
let VirMoney
let IsStarted = false
let Eated = 0
let SetUi = false
let MaxLostStreak = 4
let configAmount = 1
let timesDoubled = 0
let MaxTimesDouble = 5
let Choice = -1
let PreviousChoice = -1
let MaxEating = 3


function total() {
    return countBlack + countWhite + countYellow
}


function resetBetAmount() {
    let clearBtn = document.getElementsByClassName("bet-input__control")[0]
    clearBtn.click()
    if (configAmount == 1) {
        let add001Btn = document.getElementsByClassName("bet-input__control")[1]
        add001Btn.click()
        add001Btn.click()
        add001Btn.click()
    }
    if (configAmount == 2) {
        let add001Btn = document.getElementsByClassName("bet-input__control")[1]
        add001Btn.click()
        add001Btn.click()
        add001Btn.click()
        add001Btn.click()
        add001Btn.click()
    }
    if (configAmount == 3) {
        let add01Btn = document.getElementsByClassName("bet-input__control")[2]
        add01Btn.click()
    }
    PreviousBetAmount = document.getElementsByClassName("bg-transparent w-full h-full relative z-10")[0].value
}

function doubleBetAmount() {
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
        Eated = 0
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
    if ((res == 'black' && Choice == 0) || (res == "yellow" && Choice == 1)) {
        Eated++
    }
}

function bet() {
    if (LostSteakRule1 > MaxLostStreak && Mode == -1) {
        Mode = 1
    }
    if (LostSteakRule2 > MaxLostStreak && Mode == -1) {
        Mode = 2
    }

    if (Mode == -1) {
        return
    }

    if (Eated == MaxEating) {
        Mode = -1
        Choice = -1
        timesDoubled = 0
        resetBetAmount()
        Eated = 0
        return
    }

    if (Mode == 1) {
        if (timesDoubled == 0) {
            if (PreviousRes == "black") {
                Choice = 0
            }
            if (PreviousRes == "yellow") {
                Choice = 1
            }
            resetBetAmount()
        } else {
            if (timesDoubled == MaxTimesDouble) {
                Mode = -1
                resetBetAmount()
                timesDoubled = 0
                Choice = -1
                return
            } else {
                if (PreviousRes == "black") {
                    Choice = 0
                }
                if (PreviousRes == "yellow") {
                    Choice = 1
                }
                doubleBetAmount()
            }
        }
    }


    if (Mode == 2) {
        if (timesDoubled == 0) {
            if (PreviousRes == "black") {
                Choice = 1
            }
            if (PreviousRes == "yellow") {
                Choice = 0
            }
            resetBetAmount()
        } else {
            if (timesDoubled > MaxTimesDouble) {
                Mode = -1
                resetBetAmount()
                timesDoubled = 0
                Choice = -1
                return
            } else {
                if (PreviousRes == "black") {
                    Choice = 1
                }
                if (PreviousRes == "yellow") {
                    Choice = 0
                }
                doubleBetAmount()
            }
        }
    }
    console.log("BET MODE", Mode, "CHOICE", ChoiceToString(Choice), "x2 TIMEs", "WIN STREAK", Eated)
}

function ChoiceToString(c) {
    if (c == 0) return "black"
    if (c == 1) return "yellow"
}

function logging(res) {
    if (total() == 1) {
        console.log("CE FIRST RESULT: ", res)
        return
    }
    VirMoney = document.getElementsByClassName("whitespace-nowrap font-numeric")[0].innerText
    console.log("RESULT:", res, "LS1:", LostSteakRule1, "LS2:", LostSteakRule2, "MONEY: ", VirMoney)
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

const inputX = document.createElement("input")
inputX.placeholder = "x....."
inputX.setAttribute("type", "number")

const a001 = document.createElement("button")
a001.innerText = "0.03"
a001.onclick = () => { configAmount = 1; alert("Ok") }

const a005 = document.createElement("button")
a005.innerText = "0.05"
a005.onclick = () => { configAmount = 2; alert("Ok") }

const a01 = document.createElement("button")
a01.innerText = "0.1"
a01.onclick = () => { configAmount = 3; alert("Ok") }

function SetupUI() {
    SetUi = true
    let container = document.getElementsByClassName("layout")[0]
    container.appendChild(startBtn)
    container.appendChild(a001)
    container.appendChild(a005)
    container.appendChild(a01)
    container.appendChild(inputX)
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
            resetBetAmount()
        }
        if (1 < parseFloat(t) && parseFloat(t) < 5 && IsBet == 0 && total() > 0) {
            bet()
            IsBet = 1
        }
    }

    if (t && t != "0.00") {
        IsIncreased = 0
    }

    if (t && t == "0.00") {
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

// //tests

// virtualRes = ["black", "yellow", "yellow", "yellow", "yellow", "dice", "yellow", "black", "dice", "dice", "dice", "dice", "black", "black", "black", "yellow", "dice", "yellow", "black", "yellow", "black", "yellow", "black", "yellow", "black"]
// for (let i = 0; i < virtualRes.length; i++) {
//     if (total() > 0) {
//         bet()
//     }
//     if (virtualRes[i] == "black") countBlack++
//     if (virtualRes[i] == "white") countWhite++
//     if (virtualRes[i] == "yellow") countYellow++
//     afterResult(virtualRes[i])
//     logging(virtualRes[i])
// }