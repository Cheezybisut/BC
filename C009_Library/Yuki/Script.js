var C009_Library_Yuki_CurrentStage = 0;
var C009_Library_Yuki_BookAlreadyFound = false;
var C009_Library_Yuki_DetentionBondage = false;
var C009_Library_Yuki_DetentionFighting = false;
var C009_Library_Yuki_IsolationMildred = false;
var C009_Library_Yuki_IsolationYuki = false;
var C009_Library_Yuki_IsolationPleasureYuki = false;
var C009_Library_Yuki_IsolationOrgasmYuki = false;
var C009_Library_Yuki_IsolationEarlyReleaseYuki = false;
var	C009_Library_Yuki_IsolationEscapeYuki = false;
var	C009_Library_Yuki_HasEgg = false;
var	C009_Library_Yuki_CanFindPlayer = true;
var C009_Library_Yuki_AllowSecondChance = true;
var C009_Library_Yuki_PenInHole = false;
var C009_Library_Yuki_AnnoyCount = 0;
var C009_Library_Yuki_TickleDone = false;
var C009_Library_Yuki_CaressDone = false;
var C009_Library_Yuki_OrgasmDone = false;
var C009_Library_Yuki_MasturbateCount = 0;
var C009_Library_Yuki_ReleaseConfirm = false;
var C009_Library_Yuki_SleepingPillFromHole = false;
var C009_Library_Yuki_CanAskForDoor = false;

// Chapter 9 Library - Yuki Load
function C009_Library_Yuki_Load() {

	// Load the scene parameters
	ActorLoad("Yuki", "Library");
	LoadInteractions();
	Common_SelfBondageAllowed = false;
	C009_Library_Yuki_ReleaseConfirm = false;
	C009_Library_Yuki_CanAskForDoor = C009_Library_Library_FoundLockedDoor;
	if (C009_Library_Yuki_CurrentStage >= 500) C009_Library_Library_CurrentZone = "008";
	else C009_Library_Library_CurrentZone = "007";
	
	// A few variables on what already happened
	C009_Library_Yuki_PenInHole = C009_Library_Search_PenInHole;
	C009_Library_Yuki_BookAlreadyFound = (C009_Library_Library_BookProgress > 40);
	C009_Library_Yuki_DetentionBondage = GameLogQuery("C001_BeforeClass", "Sidney", "PublicBondage");
	C009_Library_Yuki_DetentionFighting = (GameLogQuery("C001_BeforeClass", "Sidney", "FightVictory") || GameLogQuery("C001_BeforeClass", "Sidney", "FightDefeat"));
	C009_Library_Yuki_IsolationMildred = (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && GameLogQuery("C006_Isolation", "", "Isolation"));
	C009_Library_Yuki_IsolationYuki = (GameLogQuery("C002_FirstClass", "Yuki", "Drug") && GameLogQuery("C006_Isolation", "", "Isolation"));
	C009_Library_Yuki_IsolationPleasureYuki = GameLogQuery("C006_Isolation", "Yuki", "Pleasure");
	C009_Library_Yuki_IsolationOrgasmYuki = GameLogQuery("C006_Isolation", "Yuki", "Orgasm");
	C009_Library_Yuki_IsolationEarlyReleaseYuki = (GameLogQuery("C006_Isolation", "", "Release") && C009_Library_Yuki_IsolationYuki);
	C009_Library_Yuki_IsolationEscapeYuki = (GameLogQuery("C006_Isolation", "", "Escape") && C009_Library_Yuki_IsolationYuki);
	C009_Library_Yuki_HasEgg = ActorHasInventory("VibratingEgg");

	// The first dialog can be different depending on what happened before
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationOrgasmYuki && C009_Library_Yuki_IsolationEarlyReleaseYuki) C009_Library_Yuki_CurrentStage = 10;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationEscapeYuki) C009_Library_Yuki_CurrentStage = 20;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationPleasureYuki && !C009_Library_Yuki_IsolationOrgasmYuki) C009_Library_Yuki_CurrentStage = 30;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationYuki) C009_Library_Yuki_CurrentStage = 40;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationMildred) C009_Library_Yuki_CurrentStage = 50;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_DetentionFighting) C009_Library_Yuki_CurrentStage = 60;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_DetentionBondage) C009_Library_Yuki_CurrentStage = 70;

}

// Chapter 9 Library - Yuki Run
function C009_Library_Yuki_Run() {
	BuildInteraction(C009_Library_Yuki_CurrentStage);
	if (C009_Library_Yuki_CurrentStage < 250) DrawInteractionActor();
	if ((C009_Library_Yuki_CurrentStage >= 270) && (C009_Library_Yuki_CurrentStage < 300)) DrawInteractionActor();
	if ((C009_Library_Yuki_CurrentStage >= 300) && (C009_Library_Yuki_CurrentStage < 320)) { DrawActor("Yuki", 480, 0, 1); DrawActor("Player", 720, 0, 1); }
	if (C009_Library_Yuki_CurrentStage >= 530) DrawInteractionActor();
}

// Chapter 9 Library - Yuki Click
function C009_Library_Yuki_Click() {

	// Regular and inventory interactions
	ClickInteraction(C009_Library_Yuki_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// Allows the player to access the menu if she could leave the scene
	if ((ClickInv == "Player") && (LeaveIcon != "")) {
		C009_Library_Yuki_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// The player can slide an egg in Yuki if she's stuck in the hole with no panties
	if ((ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg") && (C009_Library_Yuki_CurrentStage == 510) && !Common_PlayerRestrained) {
		OverridenIntroText = GetText("VibratingEggInHole");
		ActorChangeAttitude(0, 1);
		PlayerRemoveInventory("VibratingEgg", 1);
		ActorAddInventory("VibratingEgg");
		CurrentTime = CurrentTime + 50000;
	}

	// The player can slide a sleeping pill in Yuki's anus if she's stuck in the hole with no panties
	if ((ClickInv == "SleepingPill") && !C009_Library_Yuki_SleepingPillFromHole && (C009_Library_Yuki_CurrentStage == 510) && !Common_PlayerRestrained) {
		C009_Library_Yuki_SleepingPillFromHole = true;
		OverridenIntroText = GetText("SleepingPillInHole");
		PlayerRemoveInventory("SleepingPill", 1);
		CurrentTime = CurrentTime + 50000;
	}

	// The player can lock the chastity belt on Yuki if she's stuck in the hole with no panties
	if ((ClickInv == "ChastityBelt") && !ActorHasInventory("ChastityBelt") && (C009_Library_Yuki_CurrentStage == 510) && !Common_PlayerRestrained) {
		OverridenIntroText = GetText("ChastityBeltInHole");
		PlayerRemoveInventory("ChastityBelt", 1);
		ActorAddInventory("ChastityBelt");
		ActorChangeAttitude(-1, 1);
		C009_Library_Yuki_CurrentStage = 520;
		CurrentTime = CurrentTime + 50000;
	}
	
}

// Chapter 9 Library - Yuki - When the player leaves to find her book
function C009_Library_Yuki_PlayerLeaveForBook() {
	SetScene(CurrentChapter, "Library");
}

// Chapter 9 Library - Yuki Allow Leaving
function C009_Library_Yuki_AllowLeave() {
	LeaveIcon = "Leave";
}

// Chapter 9 Library - Yuki confiscates the Sweet Gwendoline magazine
function C009_Library_Yuki_NoMoreSweetGwendoline() {
	C009_Library_Search_MagazineConfiscated = true;
}

// Chapter 9 Library - Yuki can help to player to retrieve her pencil if she likes the player
function C009_Library_Yuki_TestForHelp() {
	if (ActorGetValue(ActorLove) >= 0) {
		OverridenIntroText = GetText("AcceptToHelp");
		C009_Library_Yuki_CurrentStage = 220;
		LeaveIcon = "";
	}
}

// Chapter 9 Library - Yuki will restrain the player is she's annoyed 3 times
function C009_Library_Yuki_AnnoyYuki() {
	C009_Library_Yuki_AnnoyCount++;
	if (C009_Library_Yuki_AnnoyCount >= 3) {
		if (!C009_Library_Search_CanStealArmbinder && PlayerHasInventory("Armbinder")) PlayerRemoveInventory("Armbinder", 1);
		PlayerLockInventory("Armbinder");
		C009_Library_Library_LockedArmbinder = true;
		OverridenIntroText = GetText("Annoyed");
		C009_Library_Yuki_CurrentStage = 300;
		LeaveIcon = "";
	}
}

// Chapter 9 Library - Yuki starts to crawl in the hole
function C009_Library_Yuki_CrawlInHole() {
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - Yuki can get stuck in the hole
function C009_Library_Yuki_StuckInHole() {
	LeaveIcon = "Leave";
	C009_Library_Yuki_CanFindPlayer = false;
	C009_Library_Library_CurrentZone = "008";
	GameLogAdd("StuckInHole");
}

// Chapter 9 Library - The player can leave for the regular hole scene
function C009_Library_Yuki_LeaveForHole() {
	C009_Library_Library_CurrentZone = "008";
	C009_Library_Search_CurrentStage = 85;
	SetScene(CurrentChapter, "Search");
}

// Chapter 9 Library - When Yuki gags the player
function C009_Library_Yuki_GagPlayer() {
	PlayerLockInventory("TapeGag");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - Wait 2 minutes
function C009_Library_Yuki_TwoMinutes() {
	CurrentTime = CurrentTime + 110000;	
}

// Chapter 9 Library - Yuki Tickle
function C009_Library_Yuki_Tickle() {
	if (!C009_Library_Yuki_TickleDone) {
		C009_Library_Yuki_TickleDone = true;
		ActorChangeAttitude(-1, 1);
	}
}

// Chapter 9 Library - Yuki Caress
function C009_Library_Yuki_Caress() {
	if (!C009_Library_Yuki_CaressDone) {
		C009_Library_Yuki_CaressDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 9 Library - Yuki Caress
function C009_Library_Yuki_Masturbate() {
	C009_Library_Yuki_MasturbateCount++;
	if ((C009_Library_Yuki_MasturbateCount >= 3) && !C009_Library_Yuki_OrgasmDone && ActorHasInventory("VibratingEgg")) {
		C009_Library_Yuki_CurrentStage = 511;
		C009_Library_Yuki_OrgasmDone = true;
		OverridenIntroText = GetText("ReadyForOrgasm");
	}
}

// Chapter 9 Library - Yuki can get an orgasm in the hole
function C009_Library_Yuki_HoleOrgasm() {
	ActorAddOrgasm();
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - Yuki can be released from the hole
function C009_Library_Yuki_ReleaseFromHole() {
	if (!C009_Library_Yuki_ReleaseConfirm) {
		C009_Library_Yuki_ReleaseConfirm = true;
	} else {
		CurrentTime = CurrentTime + 50000;
		C009_Library_Yuki_CurrentStage = 530;
		OverridenIntroText = GetText("ReleaseFromHole");
		LeaveIcon = "";
	}
}

// Chapter 9 Library - Yuki can fall asleep if she had a sleeping pill
function C009_Library_Yuki_TestSleep() {
	if (C009_Library_Yuki_SleepingPillFromHole) {
		C009_Library_Yuki_SleepingPillFromHole = false;
		OverridenIntroText = GetText("DizzySleep");
		C009_Library_Yuki_CurrentStage = 400;
		CurrentTime = CurrentTime + 50000;
		C009_Library_Library_CurrentZone = "007";
		LeaveIcon = "Leave";
	}
}

// Chapter 9 Library - Yuki restrains the player in an armbinder
function C009_Library_Yuki_RestrainPlayer() {
	if (!C009_Library_Search_CanStealArmbinder && PlayerHasInventory("Armbinder")) PlayerRemoveInventory("Armbinder", 1);
	PlayerLockInventory("Armbinder");
	C009_Library_Library_LockedArmbinder = true;
	CurrentTime = CurrentTime + 50000;
}