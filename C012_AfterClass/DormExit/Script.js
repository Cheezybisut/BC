var C012_AfterClass_DormExit_CurrentStage = 0;
var C012_AfterClass_DormExit_KnowKinbakuClub = false;
var C012_AfterClass_DormExit_KnowBondageClub = false;

// Chapter 12 After Class - Dorm Exit Load
function C012_AfterClass_DormExit_Load() {
	
	// Loads the scene to search in the wardrobe
	LeaveIcon = "Leave";
	LeaveScreen = "Dorm";
	LoadInteractions();
	
	// The player can go to clubs if she heard about them
	C012_AfterClass_DormExit_KnowKinbakuClub = (GameLogQuery("C007_LunchBreak", "Natalie", "Lunch") || GameLogQuery("", "", "KinbakuClubInfo"));
	C012_AfterClass_DormExit_KnowBondageClub = GameLogQuery("", "", "BondageClubInvitation");	
	
}

// Chapter 12 After Class - Dorm Exit  Run
function C012_AfterClass_DormExit_Run() {
	BuildInteraction(C012_AfterClass_DormExit_CurrentStage);
}

// Chapter 12 After Class - Dorm Exit  Click
function C012_AfterClass_DormExit_Click() {	

	// Regular interactions
	ClickInteraction(C012_AfterClass_DormExit_CurrentStage);

}

// Chapter 12 After Class - Launch the Kinbaku club chapter if the player isn't restrained, gagged and is wearing school clothes
function C012_AfterClass_DormExit_LaunchKinbaku() {
	if (!Common_PlayerRestrained && !Common_PlayerGagged) {
		if (Common_PlayerClothed && (Common_PlayerCostume == "")) {
			SetScene("C101_KinbakuClub", "Intro");
		} else OverridenIntroText = GetText("SchoolClothesFirst");
	} else OverridenIntroText = GetText("UnrestrainFirst");
}