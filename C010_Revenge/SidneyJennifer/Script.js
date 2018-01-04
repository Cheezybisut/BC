var C010_Revenge_SidneyJennifer_CurrentStage = 0;
var C010_Revenge_SidneyJennifer_SidneyVictim = true;
var C010_Revenge_SidneyJennifer_CurrentActor = "Sidney";
var C010_Revenge_SidneyJennifer_IntroText = "";
var C010_Revenge_SidneyJennifer_ItemStolen = false;
var C010_Revenge_SidneyJennifer_AllowFight = true;
var C010_Revenge_SidneyJennifer_CanBribe = false;
var C010_Revenge_SidneyJennifer_JenniferCuteDone = false;
var C010_Revenge_SidneyJennifer_SidneyGone = false;
var C010_Revenge_SidneyJennifer_JenniferGone = false;
var C010_Revenge_SidneyJennifer_FightVictory = false;
var C010_Revenge_SidneyJennifer_CropDone = false;
var C010_Revenge_SidneyJennifer_IsGagged = false;
var C010_Revenge_SidneyJennifer_OrgasmDone = false;
var C010_Revenge_SidneyJennifer_MastubateCount = 0;

// Chapter 10 - Sidney and Jennifer Revenge Load
function C010_Revenge_SidneyJennifer_Load() {

	// Set the timer limits at 15:15
	StartTimer(15.25 * 60 * 60 * 1000, "C010_Revenge", "Outro");
	
	// Load the scene parameters (loads Jennifer first in case we are starting directly in chapter 10)
	ActorLoad("Jennifer", "");
	ActorLoad(C010_Revenge_SidneyJennifer_CurrentActor, "");
	if (C010_Revenge_SidneyJennifer_CurrentStage == 0) { ActorSpecificSetPose("Sidney", "Angry"); ActorSpecificSetPose("Jennifer", "Angry"); }	
	LoadInteractions();
	LeaveIcon = "";
	Common_SelfBondageAllowed = false;
	C010_Revenge_SidneyJennifer_SidneyVictim = (Common_PlayerCrime == "SidneyStranded");
	C010_Revenge_SidneyJennifer_CanBribe = (PlayerInventoryTotalQuantity() >= 10);

	// If we must put the previous text back
	if (C010_Revenge_SidneyJennifer_IntroText != "") OverridenIntroText = C010_Revenge_SidneyJennifer_IntroText;

}

// Chapter 10 - Sidney and Jennifer Revenge Run
function C010_Revenge_SidneyJennifer_Run() {
	
	// Build the text interactions
	BuildInteraction(C010_Revenge_SidneyJennifer_CurrentStage);

	// Draw the actors with a different zoom based on who's focused
	if (!C010_Revenge_SidneyJennifer_SidneyGone && !C010_Revenge_SidneyJennifer_JenniferGone) {
		if (CurrentActor == "Sidney") {
			DrawActor("Jennifer", 800, 50, 0.8);
			DrawActor("Sidney", 500, 0, 1.0);
		} else {
			DrawActor("Sidney", 525, 50, 0.8);
			DrawActor("Jennifer", 700, 0, 1.0);		
		}
	} else {
		if (C010_Revenge_SidneyJennifer_CurrentStage == 38) DrawActor(CurrentActor, 650, -100, 0.833);
		else DrawActor(CurrentActor, 600, 0, 1.0);
	}
	
}

// Chapter 10 - Sidney and Jennifer Revenge Click
function C010_Revenge_SidneyJennifer_Click() {	

	// Regular interactions
	ClickInteraction(C010_Revenge_SidneyJennifer_CurrentStage);
	
	// The player can click on herself
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C010_Revenge_SidneyJennifer_IntroText = OverridenIntroText;
		C010_Revenge_SidneyJennifer_CurrentActor = CurrentActor; 
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// The heroine can be restrained on stage 400
	if ((C010_Revenge_SidneyJennifer_CurrentStage == 38) && (ClickInv != "") && (ClickInv != "Player")) {

		// Both heroines react differently to the crop
		if ((ClickInv == "Crop") && !C010_Revenge_SidneyJennifer_CropDone) {
			C010_Revenge_SidneyJennifer_CropDone = true;
			ActorChangeAttitude(-1, 1);
		}

		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		OverridenIntroImage = "";
		C010_Revenge_SidneyJennifer_IsGagged = ActorIsGagged();
		if (C010_Revenge_SidneyJennifer_IsGagged) ActorSpecificSetPose("Jennifer", "Dog");
		if (ClickInv == "Crop") OverridenIntroText = GetText("CropJennifer");

	}
	
}

// Chapter 10 - Sidney and Jennifer Revenge - Switch to a provoking pose 
function C010_Revenge_SidneyJennifer_ProvokePose() {
	ActorSpecificSetPose("Sidney", "Furious");
	ActorSpecificSetPose("Jennifer", "Furious");
}

// When the user bribes Sidney, she leaves with half the items
function C010_Revenge_SidneyJennifer_Bribe() {
	ActorLoad("Jennifer", "");
	LeaveIcon = "";
	C010_Revenge_SidneyJennifer_SidneyGone = true;
	PlayerRemoveHalfInventory();
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Actor calms down (stops the pose)
function C010_Revenge_SidneyJennifer_CalmDown(ActorToCalm) {
	ActorSpecificSetPose(ActorToCalm, "");
}

// Chapter 10 - Sidney and Jennifer Revenge - The player can get two ropes from Sidney or Jennifer
function C010_Revenge_SidneyJennifer_GetTwoRopes() {
	PlayerAddInventory("Rope", 2);
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer will strip if she's +5 sub or more
function C010_Revenge_SidneyJennifer_JenniferTestStrip() {
	if (ActorGetValue(ActorSubmission) >= 5) {
		OverridenIntroText = GetText("JenniferStrips");
		ActorSpecificSetCloth("Jennifer", "Naked");
		ActorChangeAttitude(-2, 1);
		CurrentTime = CurrentTime + 50000;
		C010_Revenge_SidneyJennifer_CurrentStage = 37;
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer can be tied up like a dog
function C010_Revenge_SidneyJennifer_JenniferDog() {
	ActorAddInventory("Rope");
	ActorAddInventory("TwoRopes");
	PlayerRemoveInventory("Rope", 2);
	ActorSetPose("Dog");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer cute
function C010_Revenge_SidneyJennifer_JenniferCute() {
	OverridenIntroImage = "";
	if (!C010_Revenge_SidneyJennifer_JenniferCuteDone) {
		C010_Revenge_SidneyJennifer_JenniferCuteDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer bark
function C010_Revenge_SidneyJennifer_JenniferBark() {
	OverridenIntroImage = "";
	ActorSetPose("Bark");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer crawl
function C010_Revenge_SidneyJennifer_JenniferCrawl() {
	OverridenIntroImage = "";
	ActorSetPose("Dog");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer untie
function C010_Revenge_SidneyJennifer_JenniferUntie() {
	OverridenIntroImage = "";
	ActorUntie();
	ActorUngag();
	ActorSetPose("");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Steal Items
function C010_Revenge_SidneyJennifer_StealItems() {
	
	// Backup and remove the player inventory
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
	C010_Revenge_SidneyJennifer_ItemStolen = true;
	CurrentTime = CurrentTime + 50000;
	
}

// Chapter 10 - Sidney and Jennifer Revenge - Recover the stolen items and clothes
function C010_Revenge_SidneyJennifer_RecoverItems() {
	C010_Revenge_SidneyJennifer_ItemStolen = false;
	PlayerRestoreAllInventory();
	CurrentTime = CurrentTime + 50000;
	PlayerClothes("Clothed");
}

// Chapter 10 - Sidney and Jennifer Revenge - Starts the fight 2 VS 1
function C010_Revenge_SidneyJennifer_StartFight() {
		
	// Sets the fight difficulty
	var SidneyDifficulty = "Hard";
	var JenniferDifficulty = "Normal";
	if (ActorSpecificGetValue("Jennifer", ActorSubmission) < 0) JenniferDifficulty = "Hard";

	// Launch the double fight
	C010_Revenge_SidneyJennifer_IntroText = "";
	DoubleFightLoad("Sidney", SidneyDifficulty, "Punch", "Jennifer", JenniferDifficulty, "Punch", "Hallway", "C010_Revenge_SidneyJennifer_EndFight");
	
}

// Chapter 10 - Sidney and Jennifer Revenge - When the fight ends
function C010_Revenge_SidneyJennifer_EndFight(Victory) {
	
	// Change the girls attitude depending on the victory or defeat
	ActorSpecificChangeAttitude("Sidney", 0, Victory ? 2 : -2);
	ActorSpecificChangeAttitude("Jennifer", -1, Victory ? 2 : -2);
	ActorSpecificSetPose("Sidney", "Angry");
	ActorSpecificSetPose("Jennifer", "Angry");
	C010_Revenge_SidneyJennifer_FightVictory = Victory;
	C010_Revenge_SidneyJennifer_AllowFight = false;
	
	// If this was the hallway fight
	if (C010_Revenge_SidneyJennifer_CurrentStage <= 100) {

		// On a victory Sidney runs away, on a defeat we show a custom text
		if (Victory) {
			OverridenIntroText = GetText("FightVictorySidneyRun");
			ActorLoad("Jennifer", "");
			LeaveIcon = "";
			C010_Revenge_SidneyJennifer_SidneyGone = true;
			C010_Revenge_SidneyJennifer_CurrentStage = 32;
		} else {
			OverridenIntroText = GetText("FightDefeatHallway");
			C010_Revenge_SidneyJennifer_CurrentStage = 40;
		}
		
	}

}

// Chapter 10 - Sidney and Jennifer Revenge - Going outside to the running track
function C010_Revenge_SidneyJennifer_GoOutside() {
	CurrentTime = CurrentTime + 300000;
	ActorLoad("Jennifer", "");
	LeaveIcon = "";
	ActorSpecificSetPose("Sidney", "Angry");
	ActorSpecificSetPose("Jennifer", "Angry");
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player strips
function C010_Revenge_SidneyJennifer_PlayerStrip() {
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - End the revenge and flag the end
function C010_Revenge_SidneyJennifer_EarlyEnding(EndingType) {
	C010_Revenge_EarlyEnding_Type = EndingType;
	if (C010_Revenge_SidneyJennifer_FightVictory) C010_Revenge_EarlyEnding_Type = "SidneyJenniferFightVictory";
	SetScene(CurrentChapter, "EarlyEnding");
}

// Chapter 10 - Sidney and Jennifer Revenge - Ungag the current actor
function C010_Revenge_SidneyJennifer_Ungag() {
	OverridenIntroImage = "";
	ActorUngag();
	CurrentTime = CurrentTime + 50000;
	C010_Revenge_SidneyJennifer_IsGagged = false;
}

// Chapter 10 - Sidney and Jennifer Revenge - Masturbate Jennifer
function C010_Revenge_SidneyJennifer_MasturbateJennifer() {

	// Doesn't work if she's wearing a chastity belt, with the egg and 3 tries, she will orgasm
	CurrentTime = CurrentTime + 50000;
	OverridenIntroImage = "";
	if (!ActorIsChaste()) {
		C010_Revenge_SidneyJennifer_MastubateCount++;
		if (ActorHasInventory("VibratingEgg")) {
			if ((C010_Revenge_SidneyJennifer_MastubateCount >= 3) && !C010_Revenge_SidneyJennifer_OrgasmDone) {
				ActorAddOrgasm();
				ActorChangeAttitude(1, 0);
				C010_Revenge_SidneyJennifer_OrgasmDone = true;
				OverridenIntroImage = "HallwayFloorOrgasm.jpg";
				OverridenIntroText = GetText("MasturbateJenniferOrgasm");
			} else OverridenIntroText = GetText("MasturbateJenniferEgg");
		} else OverridenIntroText = GetText("MasturbateJenniferNoEgg");
	}

}

// Chapter 10 - Sidney and Jennifer Revenge - End the chapter, the player is liberated
function C010_Revenge_SidneyJennifer_EndChapter() {
	SetScene(CurrentChapter, "Outro");
}