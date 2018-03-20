var C009_Library_Search_CurrentStage = 0;
var C009_Library_Search_SearchCounterDone = false;
var C009_Library_Search_CanLearnRopeMastery = true;
var C009_Library_Search_CanSit = false;
var C009_Library_Search_MasturbateCount = 0;
var C009_Library_Search_IntroText = "";

// Chapter 9 Library - Search Area Load
function C009_Library_Search_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "Library";
	LoadInteractions();
	if (C009_Library_Search_IntroText != "") OverridenIntroText = C009_Library_Search_IntroText;
	C009_Library_Search_IntroText = "";
	Common_SelfBondageAllowed = false;
	C009_Library_Search_CanSit = (!Common_PlayerGagged && !Common_PlayerRestrained);
}

// Chapter 9 Library - Search Area Run
function C009_Library_Search_Run() {
	BuildInteraction(C009_Library_Search_CurrentStage);
}

// Chapter 9 Library - Search Area Click
function C009_Library_Search_Click() {	

	// Regular interactions
	ClickInteraction(C009_Library_Search_CurrentStage);

	// Can open the player screen from here
	var ClickInv = GetClickedInventory();
	if (ClickInv != "") {
		C009_Library_Search_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

}

// Chapter 9 - Library Search behind the counter
function C009_Library_Search_SearchCounter() {
	if (!C009_Library_Search_SearchCounterDone) {
		OverridenIntroText = GetText("FindItem");
		PlayerAddRandomItem();
		C009_Library_Search_SearchCounterDone = true;
	}
}

// Chapter 9 - Library Masturbate, if the player has the egg, she can climax multiple times, if not, only 1 time
function C009_Library_Search_Masturbate() {
	if (Common_PlayerChaste) {
		OverridenIntroText = GetText("CannotMasturbate");
	} else {
		C009_Library_Search_MasturbateCount++;
		if (C009_Library_Search_MasturbateCount == 3) OverridenIntroText = GetText("Orgasm");
		if ((C009_Library_Search_MasturbateCount >= 4) && !PlayerHasLockedInventory("VibratingEgg")) OverridenIntroText = GetText("OrgasmEnough");
		if ((C009_Library_Search_MasturbateCount >= 4) && PlayerHasLockedInventory("VibratingEgg")) {
			OverridenIntroText = GetText("OrgasmRepeat");
			C009_Library_Search_MasturbateCount = 0;
		}
	}
}

// Chapter 9 - Library Learn Rope Mastery, the player needs 15 minutes
function C009_Library_Search_LearnRopeMastery() {
	if (CurrentTime <= 15 * 60 * 60 * 1000) {
		PlayerAddSkill("RopeMastery", 1);
		CurrentTime = CurrentTime + 0.25 * 60 * 60 * 1000;
		C009_Library_Search_CanLearnRopeMastery = false;
	} else OverridenIntroText = GetText("TrainRopeMasteryNoTime");
}

// Chapter 9 - Library Set Read Progression
function C009_Library_Search_SetReadProgress() {
	C009_Library_Library_BookProgress = C009_Library_Search_CurrentStage;
}

// Chapter 9 - Library Read Time
function C009_Library_Search_ReadTime() {
	C009_Library_Library_BookProgress = C009_Library_Search_CurrentStage;
	CurrentTime = CurrentTime + 170000;
}

// Chapter 9 - Library Read Full Book
function C009_Library_Search_ReadFull() {
	C009_Library_Library_BookProgress = C009_Library_Search_CurrentStage;
	CurrentTime = CurrentTime + 890000;
}
