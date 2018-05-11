var C011_LiteratureClass_Mildred_CurrentStage = 0;
var C011_LiteratureClass_Mildred_Angry = false;
var C011_LiteratureClass_Mildred_GoodStudentCount = 0;
var C011_LiteratureClass_Mildred_KnowCheat = false;

// Chapter 11 - Mildred Load
function C011_LiteratureClass_Mildred_Load() {

	// Load the scene parameters
	ActorLoad("Mildred", "");
	LoadInteractions();
	StartTimer(16.5 * 60 * 60 * 1000, "C011_LiteratureClass", "Outro");
	C011_LiteratureClass_Mildred_Angry = (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && GameLogQuery("C006_Isolation", "", "Isolation"));

}

// Chapter 11 - Mildred Run
function C011_LiteratureClass_Mildred_Run() {
	BuildInteraction(C011_LiteratureClass_Mildred_CurrentStage);
}

// Chapter 11 - Mildred Click
function C011_LiteratureClass_Mildred_Click() {

	// Regular interactions
	ClickInteraction(C011_LiteratureClass_Mildred_CurrentStage);
	var ClickedInv = GetClickedInventory();
	
}

// Chapter 11 - Mildred recognizes that the player is being a good student
function C011_LiteratureClass_Mildred_GoodStudent() {
	C011_LiteratureClass_Mildred_GoodStudentCount++;
}

// Chapter 11 - Mildred will cuff the player if she was in isolation with and she wasn't good
function C011_LiteratureClass_Mildred_CheckForCuffs() {
	if (C011_LiteratureClass_Mildred_GoodStudentCount >= 3) ActorChangeAttitude(1, 0);
	if (C011_LiteratureClass_Mildred_Angry && (C011_LiteratureClass_Mildred_GoodStudentCount < 3)) {
		OverridenIntroText = GetText("MildredComesForCuffs");
		if (C011_LiteratureClass_SelectDesk_FrontDesk) C011_LiteratureClass_Mildred_CurrentStage = 31;
		else C011_LiteratureClass_Mildred_CurrentStage = 35;
	}
	C011_LiteratureClass_Mildred_GoodStudentCount = 0;
}

// Chapter 11 - Mildred cuffs the player
function C011_LiteratureClass_Mildred_CuffPlayer() {
	PlayerLockInventory("Cuffs");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 11 - Mildred starts the test for the player and Sidney
function C011_LiteratureClass_Mildred_StartTest() {
	if (C011_LiteratureClass_Mildred_GoodStudentCount >= 2) ActorChangeAttitude(1, 0);
	CurrentTime = CurrentTime + 50000;
	QuizLoad("Player", PlayerHasLockedInventory("Cuffs") ? "Clothed_Cuffs" : "Clothed", "Sidney", ActorSpecificHasInventory("Sidney", "Cuffs") ? "Clothed_Cuffs" : "Clothed", "Mildred", "Leader", "Normal", 10, "Classroom", "C011_LiteratureClass_Mildred_QuizEnd");
}

// Chapter 11 - Mildred can switch focus to Sidney for a short while
function C011_LiteratureClass_Mildred_SwitchSidney() {
	if (!C011_LiteratureClass_SelectDesk_FrontDesk) {
		C011_LiteratureClass_Mildred_CurrentStage = 47;
		OverridenIntroText = GetText("SidneyStares");
		ActorLoad("Sidney", "");
		ActorAddInventory("Cuffs");
	} else {
		CurrentActor = "Sidney";
		ActorAddInventory("Cuffs");
		CurrentActor = "Mildred";
	}
}

// Chapter 11 - Mildred takes back focus
function C011_LiteratureClass_Mildred_SwitchMildred() {
	ActorLoad("Sidney", "");
}