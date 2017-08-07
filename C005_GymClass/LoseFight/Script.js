// Chapter 5 - Lose Fight Load
function C005_GymClass_LoseFight_Load() {
	if (C005_GymClass_Jennifer_EasyMode) LoadFight("Jennifer", "Easy", 0);
	else LoadFight("Jennifer", "Normal", 0);
}

// Chapter 5 - Lose Fight Run
function C005_GymClass_LoseFight_Run() {
	RenderFight();
}

// Chapter 5 - Lose Fight Click
function C005_GymClass_LoseFight_Click() {
	FightClick();
}

// Chapter 5 - Lose Fight Key Down
function C005_GymClass_LoseFight_KeyDown() {
	FightKeyDown();
}

// Chapter 5 - Lose Fight End
function C005_GymClass_LoseFight_FightEnd(Victory) {
	if (Victory) {
		C005_GymClass_Jennifer_CurrentStage = 110;
		C005_GymClass_Jennifer_Turnabout = true;
	} else {
		C005_GymClass_Jennifer_CurrentStage = 500;
		PlayerLockInventory("Rope");
		PlayerClothes("Underwear");
	}
}