var C008_DramaClass_Damsel_CurrentStage = 0;
var C008_DramaClass_Damsel_PlayerIsDamsel = false;
var C008_DramaClass_Damsel_ForgetLineDone = false;
var C008_DramaClass_Damsel_SnapFingersDone = false;

// Chapter 8 - Damsel Load
function C008_DramaClass_Damsel_Load() {

	// Checks if the player is the damsel & set the stage to the current global stage
	C008_DramaClass_Damsel_PlayerIsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Damsel_CurrentStage = C008_DramaClass_Theater_GlobalStage;

	// Load the scene parameters
	if (!C008_DramaClass_Damsel_PlayerIsDamsel) ActorLoad(C008_DramaClass_Theater_Damsel, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";

}

// Chapter 8 - Damsel Run
function C008_DramaClass_Damsel_Run() {
	BuildInteraction(C008_DramaClass_Damsel_CurrentStage);
	DrawInteractionActor();
}

// Chapter 8 - Damsel Click
function C008_DramaClass_Damsel_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Damsel_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// If the player is the villain, she can restrain Sarah once stage 140 is reached.  Stage 220 becomes the minimum stage.
	if ((C008_DramaClass_Theater_Villain == "Player") && (C008_DramaClass_Damsel_CurrentStage >= 140) && (C008_DramaClass_Damsel_CurrentStage < 300) && ((ClickInv == "Cuffs") || (ClickInv == "Rope") || (ClickInv == "ClothGag") || (ClickInv == "BallGag") || (ClickInv == "TapeGag"))) {
		ActorSetCloth("Underwear");
		ActorApplyRestrain(ClickInv);
		if (C008_DramaClass_Damsel_CurrentStage < 220) {
			C008_DramaClass_Damsel_CurrentStage = 220;
			C008_DramaClass_Theater_GlobalStage = 220;
		}
	}

}

// Chapter 8 - Damsel - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Damsel_GlobalStage(GlobalStage, LoveMod, SubMod) {
	
	// We can also flag for snapped fingers and a perfect play
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Damsel_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Damsel_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
	
	// If the player is the Damsel, Amanda can restrain her if she's in a Domme mood and wasn't selected
	if ((GlobalStage == 200) && (C008_DramaClass_Theater_Damsel == "Player") && (C008_DramaClass_Theater_Villain == "Amanda") && (ActorSpecificGetValue("Amanda", ActorSubmission) < 0)) {
		PlayerClothes("Underwear");
		PlayerLockInventory("Rope");
		PlayerLockInventory("ClothGag");
		OverridenIntroText = GetText("AmandaRestrainPlayer");
	}

}

// Chapter 8 - Damsel - When the player forgets her line
function C008_DramaClass_Damsel_ForgetLine() {
	if (!C008_DramaClass_Damsel_ForgetLineDone) {
		C008_DramaClass_Damsel_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}

// Chapter 8 - Damsel - When Sarah must choose a knight
function C008_DramaClass_Damsel_SarahChooseKnight() {
	
	// Sarah chooses the player if love is 10 or better
	if (((ActorGetValue(ActorLove) >= 10) && (C008_DramaClass_Theater_Heroine == "Player")) || ((ActorGetValue(ActorLove) < 10) && (C008_DramaClass_Theater_Heroine == "Amanda"))) {
		
		// Stage 200 means the hero was selected
		C008_DramaClass_Damsel_CurrentStage = 200;
		C008_DramaClass_Theater_GlobalStage = 200;
		
		// If Amanda is the villain, she will restrain Sarah
		if (C008_DramaClass_Theater_Villain == "Amanda") {
			ActorSetCloth("Underwear");
			ActorAddInventory("Rope");
			ActorAddInventory("ClothGag");
			OverridenIntroText = GetText("SarahChooseWhiteKnightRestrained");
		} else OverridenIntroText = GetText("SarahChooseWhiteKnight");

	} else {

		// Stage 210 means the villain was selected
		C008_DramaClass_Damsel_CurrentStage = 210;
		C008_DramaClass_Theater_GlobalStage = 210;
		OverridenIntroText = GetText("SarahChooseBlackKnight");

	}

}