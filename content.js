let IsBet = 0
let countYellow = 0
let countBlack = 0
let countWhite = 0
let IsIncreased = 0
let LostSteakRule1 = -1
let LostSteakRule2 = -1
let Mode
let PreviousChoice
let CurrentChoice
let BetAmount = 0.01
let PreviousBetAmount = 0.01
let VirMoney = 100

function total() {
    return countBlack + countWhite + countYellow
}

function switchMode(res) {
    if ((res == "black" && CurrentChoice == 0) || (res == "yellow" && CurrentChoice == 1)) {
        if (Mode == 1 && LostSteakRule2 > 4) {
            Mode = 2
            console.log("CHANGE TO MODE: ", Mode)
        }
        else if (Mode == 2 && LostSteakRule1 > 4) {
            Mode = 1
            console.log("CHANGE TO MODE: ", Mode)
        }
    }
}

function resetBetAmount() {
    BetAmount = 0.01
    let clearBtn = document.getElementsByClassName("bet-input__control")[0]
    clearBtn.click()
    let add001Btn = document.getElementsByClassName("bet-input__control")[1]
    add001Btn.click()
}

function doubleBetAmount() {
    BetAmount *= 2
    let doubleBtn = document.getElementsByClassName("bet-input__control")[7]
    doubleBtn.click()
}

function afterResult(res) {
    //storing previous betamount
    PreviousBetAmount = BetAmount
    if (total() == 1) {
        Mode = 1
        if (res == "yellow") {
            PreviousChoice = 1
        } else {
            PreviousChoice = 0
        }
        return
    }
    if (res == "dice") {
        doubleBetAmount()
        LostSteakRule1++
        LostSteakRule2++
        return
    }

    if ((res == "black" && CurrentChoice == 0) || (res == "yellow" && CurrentChoice == 1)) {
        if (Mode == 1) {
            LostSteakRule1 = 0
            LostSteakRule2++
        } else {
            LostSteakRule2 = 0
            LostSteakRule1++
        }
        // Increase money
        VirMoney = VirMoney + BetAmount * 2
        resetBetAmount()
    } else {
        if (Mode == 1) {
            LostSteakRule1++
            LostSteakRule2 = 0
        } else {
            LostSteakRule2++
            LostSteakRule1 = 0
        }
        doubleBetAmount()
    }
}

function bet() {
    // 1 equal yellow, 0 equal black
    if (Mode == 1) {
        CurrentChoice = PreviousChoice
    } else if (Mode == 2) {
        CurrentChoice = 1 - PreviousChoice
    }

    let placeBetButtons = document.getElementsByClassName("bet-btn")
    if (CurrentChoice == 0) {
        placeBetButtons[0].click()
    }
    if (CurrentChoice == 1) {
        placeBetButtons[2].click()
    }
    PreviousChoice = CurrentChoice
    IsBet = 1
    VirMoney -= BetAmount
}

function ChoiceToString(c) {
    if (c == 0) return "black"
    if (c == 1) return "yellow"
}

function logging(res) {
    if (total() == 1) {
        console.log("SET MODE 1 WITH CHOICE", ChoiceToString(PreviousChoice))
        return
    }
    console.log("MODE:", Mode, "CHOICE:", ChoiceToString(CurrentChoice), "RESULT:", res, "AMOUNT:", PreviousBetAmount, "LS1:", LostSteakRule1, "LS2:", LostSteakRule2, "MONEY:", VirMoney)
    return
}

function filterContent() {
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
                        // switch mode when having enough condition
                        switchMode(res)
                    }
                }
            }
        }
    }
}

setInterval(filterContent, 1500)