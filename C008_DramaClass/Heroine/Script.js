var C008_DramaClass_Heroine_CurrentStage = 100;
var C008_DramaClass_Heroine_PlayerIsHeroine = false;
var C008_DramaClass_Heroine_ForgetLineDone = false;
var C008_DramaClass_Heroine_SnapFingersDone = false;

// Chapter 8 - Heroine Load
function C008_DramaClass_Heroine_Load() {

	// Checks if the player is the heroine & set the stage to the current global stage
	C008_DramaClass_Heroine_PlayerIsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Heroine_CurrentStage = C008_DramaClass_Theater_GlobalStage;

	// Load the scene parameters
	if (!C008_DramaClass_Heroine_PlayerIsHeroine) ActorLoad(C008_DramaClass_Theater_Heroine, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";

}

// Chapter 8 - Heroine Run
function C008_DramaClass_Heroine_Run() {
	BuildInteraction(C008_DramaClass_Heroine_CurrentStage);
	DrawInteractionActor();
}

// Chapter 8 - Heroine Click
function C008_DramaClass_Heroine_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Heroine_CurrentStage);
	var ClickInv = GetClickedInventory();

}

// Chapter 8 - Heroine - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Heroine_GlobalStage(GlobalStage, LoveMod, SubMod) {
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Heroine_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Heroine_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
}

// Chapter 8 - Heroine - When the player forgets her line
function C008_DramaClass_Heroine_ForgetLine() {
	if (!C008_DramaClass_Heroine_ForgetLineDone) {
		C008_DramaClass_Heroine_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}