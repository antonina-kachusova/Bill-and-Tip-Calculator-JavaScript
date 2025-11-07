const tipAmountText = document.getElementById("tip-amount");
const totalPerPersonText = document.getElementById("total-per-person");
const billAmountInput = document.getElementById("bill-amount");
const numberOfPeopleInput = document.getElementById("number-of-people");
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");

IMask(billAmountInput, {
  mask: Number,
  scale: 2,
  radix: ",",
  mapToRadix: ["."],
  thousandsSeparator: " ",
  normalizeZeros: true,
  padFractionalZeros: true,
  min: 0,
});

IMask(numberOfPeopleInput, {
  mask: Number,
  min: 1,
  max: 999,
  radix: ",",
  mapToRadix: ["."],
});

function parseLocaleNumber(value) {
  return parseFloat(value.replace(/\s/g, "").replace(",", "."));
}

function formatNumberUA(value) {
  return value
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function calculateTip() {
  const billValue = parseLocaleNumber(billAmountInput.value);
  const peopleValue = parseLocaleNumber(numberOfPeopleInput.value);

  if (
    isNaN(billValue) ||
    isNaN(peopleValue) ||
    billValue <= 0 ||
    peopleValue <= 0
  ) {
    alert("Please enter valid values.");
    return;
  }

  const selectedRadioTip = document.querySelector('input[name="tip"]:checked');
  const tipPercentage = parseFloat(selectedRadioTip.value) / 100;

  const totalTip = parseFloat((billValue * tipPercentage).toFixed(2));
  const totalBill = billValue + totalTip;
  const perPerson = parseFloat((totalBill / peopleValue).toFixed(2));

  tipAmountText.textContent = formatNumberUA(totalTip);
  totalPerPersonText.textContent = formatNumberUA(perPerson);
}

calculateButton.addEventListener("click", calculateTip);

resetButton.addEventListener("click", () => {
  billAmountInput.value = "";
  numberOfPeopleInput.value = "";
  tipAmountText.textContent = "0";
  totalPerPersonText.textContent = "0";

  document.getElementById("five-percent").checked = true;
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateTip();
  }
});
