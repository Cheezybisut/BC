var C008_DramaClass_Villain_CurrentStage = 100;
var C008_DramaClass_Villain_PlayerIsVillain = false;
var C008_DramaClass_Villain_ForgetLineDone = false;
var C008_DramaClass_Villain_SnapFingersDone = false;

// Chapter 8 - Villain Load
function C008_DramaClass_Villain_Load() {

	// Checks if the player is the villain & set the stage to the current global stage
	C008_DramaClass_Villain_PlayerIsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	C008_DramaClass_Villain_CurrentStage = C008_DramaClass_Theater_GlobalStage;

	// Load the scene parameters
	if (!C008_DramaClass_Heroine_PlayerIsHeroine) ActorLoad(C008_DramaClass_Theater_Villain, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";

}

// Chapter 8 - Villain Run
function C008_DramaClass_Villain_Run() {
	BuildInteraction(C008_DramaClass_Villain_CurrentStage);
	DrawInteractionActor();
}

// Chapter 8 - Villain Click
function C008_DramaClass_Villain_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Villain_CurrentStage);
	var ClickInv = GetClickedInventory();

}

// Chapter 8 - Villain - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Villain_GlobalStage(GlobalStage, LoveMod, SubMod) {
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Villain_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Villain_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
}

// Chapter 8 - Villain - When the player forgets her line
function C008_DramaClass_Villain_ForgetLine() {
	if (!C008_DramaClass_Villain_ForgetLineDone) {
		C008_DramaClass_Villain_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}