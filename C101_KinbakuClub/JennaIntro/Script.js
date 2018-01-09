var C101_KinbakuClub_JennaIntro_CurrentStage = 0;
var C101_KinbakuClub_JennaIntro_LeaveTime = 18.25;
var C101_KinbakuClub_JennaIntro_TransitionTime = 18;
var C101_KinbakuClub_JennaIntro_IntroText = "";
var C101_KinbakuClub_JennaIntro_LeaveIcon = "";
var C101_KinbakuClub_JennaIntro_NotAsked = true;
var C101_KinbakuClub_JennaIntro_Concerned = true;
var C101_KinbakuClub_JennaIntro_Chloe = true;


// Chapter 101 - Jenna Load
function C101_KinbakuClub_JennaIntro_Load() {

	// Set the timer limits at 18:15
	StartTimer(C101_KinbakuClub_JennaIntro_LeaveTime * 60 * 60 * 1000, "C101_KinbakuClub", "Outro");

	// Load the scene parameters
	ActorLoad("Jenna", "ClubRoom1");
	LoadInteractions();

	// If Natalie was left stranded
	if (Common_PlayerCrime == "NatalieStranded") {
		C101_KinbakuClub_JennaIntro_CurrentStage = 100;
	}

	// Player can't leave until Jenna is finished
    LeaveIcon = "";

}

// Chapter 101 - Jenna Run
function C101_KinbakuClub_JennaIntro_Run() {
    BuildInteraction(C101_KinbakuClub_JennaIntro_CurrentStage);
}


// Chapter 101 - Jenna Click
function C101_KinbakuClub_JennaIntro_Click() {

	// Regular and inventory interactions
    ClickInteraction(C101_KinbakuClub_JennaIntro_CurrentStage);
    var ClickInv = GetClickedInventory();
    if (ClickInv == "Player") {
        C101_KinbakuClub_JennaIntro_IntroText = OverridenIntroText;
        C101_KinbakuClub_JennaIntro_LeaveIcon = LeaveIcon;
        InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
    }
}

// Chapter 101 - Player skips the explanation
function C101_KinbakuClub_JennaIntro_SkipExplanation() {
	C101_KinbakuClub_JennaIntro_NotAsked = false;
	C101_KinbakuClub_JennaIntro_Concerned = false;
	C101_KinbakuClub_JennaIntro_Chloe = false;
}

// Chapter 101 - Player skips to clubroom with tyos
function C101_KinbakuClub_JennaIntro_ShortCut() {
	PlayerRemoveAllInventory();
	PlayerAddInventory("Cuffs", 4);
	PlayerAddInventory("CuffsKey", 1);
	PlayerAddInventory("Rope", 4);
	PlayerAddInventory("BallGag", 4);
	PlayerAddInventory("TapeGag", 8);
	PlayerAddInventory("ClothGag", 4);
	PlayerAddInventory("Collar", 4);
	PlayerAddInventory("Crop", 1);
	PlayerAddInventory("VibratingEgg", 4);
	PlayerAddInventory("ChastityBelt", 4);
	PlayerAddInventory("Blindfold", 4);
	SetScene(CurrentChapter, "ClubRoom1")
}


// Chapter 101 - Player asks about Natalie
function C101_KinbakuClub_JennaIntro_Asked() {
	C101_KinbakuClub_JennaIntro_NotAsked = false;
	StartTimer(C101_KinbakuClub_JennaIntro_TransitionTime * 60 * 60 * 1000, "C101_KinbakuClub", "Transition");
}

// Chapter 101 - Player shows Concern about Natalie
function C101_KinbakuClub_JennaIntro_ShowConcern() {
	C101_KinbakuClub_JennaIntro_Concerned = false;
}

// Chapter 101 - Player asks about Chloe
function C101_KinbakuClub_JennaIntro_AskChloe() {
	C101_KinbakuClub_JennaIntro_Chloe = false;
}

// Chapter 101 - Jenna is Done with player.
function C101_KinbakuClub_JennaIntro_Done() {
	LeaveIcon = "Leave";
}

// Chapter 101 - Player askes to be tied up.
function C101_KinbakuClub_JennaIntro_CuffPlayer() {
	PlayerLockInventory("Cuffs");
	PlayerLockInventory("BallGag");
	PlayerRemoveInventory("CuffsKey", 99);
	LeaveIcon = "Leave";
}


// Chapter 101 - When the club set on the player to discipline her for evil ending Natalie.
function C101_KinbakuClub_JennaIntro_Discipline() {
    SetScene(CurrentChapter, "Discipline");
}

