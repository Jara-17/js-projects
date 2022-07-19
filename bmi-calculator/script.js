// BMI Calculator

//  < 19: Thinness
//  Between 20 and 25: Normal
//  Between 26 and 30: Overweight
//  > than 30: Obesity

const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const calculateBtn = document.querySelector("#calculateBtn");
const totalBMI = document.querySelector("#totalBMI");

const calculateBMI = (heightM, weight) => {
	return weight / (heightM * heightM);
};

const askBMI = () => {
	let heightM = heightInput.value / 100;
	let weight = weightInput.value;
	let bmi = calculateBMI(heightM, weight);
	totalBMI.innerHTML = bmi;

	if (bmi < 19) {
		bmi = "Thinness";
	}

	if (bmi >= 19 && bmi < 26) {
		bmi = "Normal";
	}

	if (bmi >= 26 && bmi <= 30) {
		bmi = "Overweight";
	}

	if (bmi > 30) {
		bmi = "Obesity";
	}

	totalBMIRender(bmi);
};

calculateBtn.onclick = askBMI;

// render BMI total

const totalBMIRender = (bmi) => {
	totalBMI.innerHTML = `<h3>Your state is: ${bmi}</h3>`;
};
