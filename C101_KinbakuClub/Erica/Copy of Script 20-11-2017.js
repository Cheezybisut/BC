var C101_KinbakuClub_Erica_CurrentStage = 0;
var C101_KinbakuClub_Erica_Loop1 = true;
var C101_KinbakuClub_Erica_Loop2 = true;
var C101_KinbakuClub_Erica_Poverty = false;
var C101_KinbakuClub_Erica_SellMe = false;
var C101_KinbakuClub_Erica_PlayerIsGagged = false;
// var C101_KinbakuClub_Erica_PlayerNotGagged = true;
var C101_KinbakuClub_Erica_PlayerNotBound = true;
var C101_KinbakuClub_Erica_PlayerBoundAndGagged = false;
var C101_KinbakuClub_Erica_PlayerIsFree = false;
var C101_KinbakuClub_Erica_First = true; // intro for stage 100
var C101_KinbakuClub_Erica_Again = false; // intro for stage 100
var C101_KinbakuClub_Erica_Kidnapper = false; // Signal that player can try kidnapping other actors.
var C101_KinbakuClub_Erica_Alone = 0; // time count when eric first leaves slave player alone.
var C101_KinbakuClub_Erica_GagRub = 0;
var C101_KinbakuClub_Erica_Pleasure1 = 0;
var C101_KinbakuClub_Erica_Pleasure2 = 0;
var C101_KinbakuClub_Erica_Pleasure3 = 0;
var C101_KinbakuClub_Erica_Refuse = 0; // when player pulls back from pleasuring Erica
var C101_KinbakuClub_Erica_GoodEgg = false; // true if erica decides to use a normal egg.
var C101_KinbakuClub_Eric_PullCount = 0; // how many times the player trys pulling
var C101_KinbakuClub_Eric_EricaBroken = false; // if player brakes ericas will.



// Calculates the scene parameters
function C101_KinbakuClub_Eric_CalcParams() {
	C101_KinbakuClub_Erica_PlayerIsGagged = Common_PlayerGagged
	C101_KinbakuClub_Erica_PlayerNotBound = Common_PlayerNotRestrained
}


// Chapter 101 - Erica Load
function C101_KinbakuClub_Erica_Load() {

	// Load the scene parameters
	ActorLoad("Erica", "ClubRoom2");
	LoadInteractions();
	C101_KinbakuClub_Eric_CalcParams();


	// Different stage if player approaches Erica while bound or gagged
	if ((C101_KinbakuClub_Erica_CurrentStage <= 100) && (PlayerHasLockedInventory("Rope") || PlayerHasLockedInventory("Cuffs") || PlayerHasLockedInventory("BallGag") || PlayerHasLockedInventory("TapeGag") || PlayerHasLockedInventory("ClothGag"))) {
		C101_KinbakuClub_Erica_LastStage = C101_KinbakuClub_Erica_CurrentStage;
		C101_KinbakuClub_Erica_CurrentStage = 100;
		LeaveIcon = "";
		if (PlayerHasLockedInventory("Rope") || PlayerHasLockedInventory("Cuffs")) {
			C101_KinbakuClub_Erica_PlayerNotBound = false;
		} else C101_KinbakuClub_Erica_PlayerNotBound = true;
		if (PlayerHasLockedInventory("BallGag") || PlayerHasLockedInventory("TapeGag") || PlayerHasLockedInventory("ClothGag")) {
			C101_KinbakuClub_Erica_PlayerNotGagged = false;
		} else C101_KinbakuClub_Erica_PlayerNotGagged = true;
		if ((PlayerHasLockedInventory("Rope") || PlayerHasLockedInventory("Cuffs")) && (PlayerHasLockedInventory("BallGag") || PlayerHasLockedInventory("TapeGag") || PlayerHasLockedInventory("ClothGag"))) {
			C101_KinbakuClub_Erica_PlayerBoundAndGagged = true;
		} else C101_KinbakuClub_Erica_PlayerBoundAndGagged = false;
	} else LeaveIcon = "Leave";
	
	// If non bondage Player talks to Erica again
	if ((!PlayerHasLockedInventory("Rope") || !PlayerHasLockedInventory("Cuffs") || !PlayerHasLockedInventory("BallGag") || !PlayerHasLockedInventory("TapeGag") || !PlayerHasLockedInventory("ClothGag")) && (C101_KinbakuClub_Erica_CurrentStage == 90)) {
		C101_KinbakuClub_Erica_PlayerIsFree = true;
		C101_KinbakuClub_Erica_CurrentStage = C101_KinbakuClub_Erica_LastStage;
		if (C101_KinbakuClub_Erica_CurrentStage == 90) {
			C101_KinbakuClub_Erica_CurrentStage = 100;
		}
	} else C101_KinbakuClub_Erica_PlayerIsFree = false;

	// If Player leaves at stage 60 and comes back it reverts to stage 50
	if (C101_KinbakuClub_Erica_CurrentStage == 60) {
		C101_KinbakuClub_Erica_CurrentStage = 50;
	}
	
}

// Chapter 101 - Erica Run
function C101_KinbakuClub_Erica_Run() {
	BuildInteraction(C101_KinbakuClub_Erica_CurrentStage);
}

// Chapter 101 - Erica Click
function C101_KinbakuClub_Erica_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C101_KinbakuClub_Erica_CurrentStage);
	if (((C101_KinbakuClub_Erica_CurrentStage >= 0) && (C101_KinbakuClub_Erica_CurrentStage <= 60)) || (C101_KinbakuClub_Erica_CurrentStage >=120)) {
		var ClickInv = GetClickedInventory();
		if (ClickInv == "Player") {
			C101_KinbakuClub_Erica_IntroText = OverridenIntroText;
			C101_KinbakuClub_Erica_LeaveIcon = LeaveIcon;
			InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
		}
	}
}









// Chapter 101 - Erica - 
function C101_KinbakuClub_Erica_() {
	
}

// Chapter 101 - Erica - Did these girls|ask for this? Loop
function C101_KinbakuClub_Erica_StopLoop1() {
	C101_KinbakuClub_Erica_Loop1 = false;
}

// Chapter 101 - Erica - You can't just|kidnap people. Loop
function C101_KinbakuClub_Erica_StopLoop2() {
	C101_KinbakuClub_Erica_Loop2 = false;
}

// Chapter 101 - Erica - Offers to enslave you for profit
function C101_KinbakuClub_Erica_SlaveOffer() {
	C101_KinbakuClub_Erica_SellMe = true;
}

// Chapter 101 - Erica - Player can't leave now
function C101_KinbakuClub_Erica_NoLeave() {
	LeaveIcon = "";
}

// Chapter 101 - Erica - Can't afford a slave
function C101_KinbakuClub_Erica_NotRichEnough() {
	C101_KinbakuClub_Erica_Poverty = true;
}

// Chapter 101 - Erica - Player gains option to kidnap other members
function C101_KinbakuClub_Erica_TryKidnapping() {
	C101_KinbakuClub_Erica_Kidnapper = true;
}

// Chapter 101 - Erica - Sidney Fight
function C101_KinbakuClub_Erica_Fight() {	
	SetScene(CurrentChapter, "Fight");
	C101_KinbakuClub_Erica_Kidnapper = true;
}

// Chapter 101 - Erica - Player in partial bondage is collared
function C101_KinbakuClub_Erica_CollarLocked() {
	PlayerLockInventory("Collar");
}

// Chapter 101 - Erica - Player in partial bondage resists slavery
function C101_KinbakuClub_Erica_ResistedSlavery() {
	if ((C101_KinbakuClub_Erica_PlayerNotBound) && (C101_KinbakuClub_Erica_First)) {
		ActorChangeAttitude(1, 0);
	}
	if ((C101_KinbakuClub_Erica_PlayerNotGagged) && (C101_KinbakuClub_Erica_First)) {
		ActorChangeAttitude(-1, 0);
	}
	C101_KinbakuClub_Erica_First = false;
	C101_KinbakuClub_Erica_Again = true;
	LeaveIcon = "Leave";
}

// Chapter 101 - Erica - Player is bound and gagged how Erica wants her
function C101_KinbakuClub_Erica_PlayerSlaved() {
	PlayerClothes("Underwear");
	PlayerUnlockInventory("Cuffs");
	PlayerUnlockInventory("BallGag");
	PlayerUnlockInventory("TapeGag");
	PlayerLockInventory("Rope");
	PlayerLockInventory("ClothGag");
	if (!PlayerHasInventory("Collar")) PlayerLockInventory("Collar");
}

// Chapter 101 - Erica - Player resists when grabbed from behind
function C101_KinbakuClub_Erica_ResistKidnap() {
	if (ActorGetValue(ActorSubmission) >= 1 ) {
		C101_KinbakuClub_Erica_CurrentStage = 90;
		OverridenIntroText = GetText("EscapeKidnap");
		LeaveIcon = "Leave";
		C101_KinbakuClub_Erica_First = false;
		C101_KinbakuClub_Erica_Again = true;
	} else C101_KinbakuClub_Erica_PlayerSlaved()
}

// Chapter 101 - Erica - When player agrees to be kissed better.
function C101_KinbakuClub_Erica_KissedBetter() {
	OverridenIntroImage = "KissBetter";
}

// Chapter 101 - Erica - While Player is Erica's slave and left alone
function C101_KinbakuClub_Erica_AloneTime() {
	CurrentTime = CurrentTime + 60000;
	if (C101_KinbakuClub_Erica_CurrentStage == 200) {
		if (C101_KinbakuClub_Erica_Alone >= 8) {
			C101_KinbakuClub_Erica_CurrentStage = 210;
			OverridenIntroText = GetText("EarnKeep");
		}
		C101_KinbakuClub_Erica_Alone++
	}
}

// Chapter 101 - Erica - When Player nuzzles Erica
function C101_KinbakuClub_Erica_AloneTimeNuzzle() {
	if (PlayerHasLockedInventory("BallGag")) {
		OverridenIntroText = GetText("NuzzleBallGag");
		if (C101_KinbakuClub_Erica_CurrentStage == 200) ActorChangeAttitude(-2, 1);
	}
	C101_KinbakuClub_Erica_AloneTime()
}

// Chapter 101 - Erica - Player tries to remove the gag, rubbing against the chair
function C101_KinbakuClub_Erica_AloneTimeGag() {
	if (PlayerHasLockedInventory("ClothGag")) {
		if (C101_KinbakuClub_Erica_GagRub >= 1) {
			OverridenIntroText = GetText("LooseClothGag");
		}
		if (C101_KinbakuClub_Erica_GagRub >= 2) {
			OverridenIntroText = GetText("ChangeGag");
			PlayerUnlockInventory("ClothGag");
			PlayerLockInventory("BallGag");
		}
		C101_KinbakuClub_Erica_GagRub++
	} else OverridenIntroText = GetText("RubBallGag");
	C101_KinbakuClub_Erica_AloneTime()
}

// Chapter 101 - Erica - Player ungagged for pleasure
function C101_KinbakuClub_Erica_PlayerUngag() {
	PlayerUnlockInventory("BallGag");
	PlayerUnlockInventory("ClothGag");
}

// Chapter 101 - Erica - When Player is slave and pleasures her
function C101_KinbakuClub_Erica_Pleasure(PleasureType) {

	// The player must pleasure her in 3 different ways and at least 5 times to make her climax)
	if (PleasureType == 1) C101_KinbakuClub_Erica_Pleasure1++;
	if (PleasureType == 2) C101_KinbakuClub_Erica_Pleasure2++;
	if (PleasureType == 3) C101_KinbakuClub_Erica_Pleasure3++;
	if (PleasureType == 3) C101_KinbakuClub_Erica_Pleasure4++;
	if ((C101_KinbakuClub_Erica_Pleasure1 > 0) && (C101_KinbakuClub_Erica_Pleasure2 > 1) && (C101_KinbakuClub_Erica_Pleasure3 > 1) && (C101_KinbakuClub_Erica_Pleasure1 + C101_KinbakuClub_Erica_Pleasure2 + C101_KinbakuClub_Erica_Pleasure3 >= 5)) {
		
		// Erica gets an orgasm
		OverridenIntroText = GetText("EricaOrgasm");
		C101_KinbakuClub_Erica_CurrentStage = 250;
		ActorChangeAttitude(1, 0);
		ActorAddOrgasm();
		
	} else {
		
		// If the player took too long to try all 3 pleasures or pulls back too often, she gives up
		if (C101_KinbakuClub_Erica_Pleasure1 + C101_KinbakuClub_Erica_Pleasure2 + C101_KinbakuClub_Erica_Pleasure3 + C101_KinbakuClub_Erica_Pleasure4 >= 9) {
			OverridenIntroText = GetText("StopPleasure");
			ActorChangeAttitude(-1, 0);
			C101_KinbakuClub_Erica_CurrentStage = 250;
		}
		
	}
}

// Chapter 101 - Erica - Player bites erica
function C101_KinbakuClub_Erica_Bite() {
	ActorChangeAttitude(-1, 1);
	PlayerLockInventory("RingGag");
}

// Chapter 101 - Erica - Player tries to pull away from Erica's pleasure
function C101_KinbakuClub_Erica_PullBack() {
	if (C101_KinbakuClub_Erica_Refuse == 1) {
		OverridenIntroText = GetText("LetOut");
		C101_KinbakuClub_Erica_CurrentStage = 240;
	}
	if (C101_KinbakuClub_Erica_Refuse >= 3) {
		C101_KinbakuClub_Erica_Pleasure(4)
	}
	C101_KinbakuClub_Erica_Refuse++
}

// Chapter 101 - Erica - 
function C101_KinbakuClub_Erica_PlayerRelease() {
	if ((ActorGetValue(ActorLove) - ActorGetValue(ActorSubmission) <= 0) && !ActorHasInventory("RingGag")) {
		OverridenIntroText = GetText("Free");
		C101_KinbakuClub_Erica_CurrentStage = 280;
	}
	if ((ActorGetValue(ActorLove) - ActorGetValue(ActorSubmission) <= 2) && ActorHasInventory("RingGag")) {
		OverridenIntroText = GetText("Freeish");
		PlayerUnlockInventory("RingGag");
		C101_KinbakuClub_Erica_CurrentStage = 280;
	}
	else {
		PlayerUnlockInventory("RingGag");
		PlayerLockInventory("BallGag");
	}
}

// Chapter 101 - Erica - 
function C101_KinbakuClub_Erica_PlayerPleasure() {
	if (ActorGetValue(ActorLove) >= 2) {
		OverridenIntroText = GetText("PleasurePlayer");
		C101_KinbakuClub_Erica_GoodEgg = true;
	}
	PlayerUnlockInventory("RingGag");
	PlayerLockInventory("BallGag");	
}

// Chapter 101 - Erica - Player gets and vibe egg
function C101_KinbakuClub_Erica_AddedEgg() {
	if (PlayerHasLockedInventory("VibratingEgg")) OverridenIntroText = GetText("ChangeEgg");
	else PlayerLockInventory("VibratingEgg");
}

// Chapter 101 - Erica - If the player pulls the crotch rope while allown
function C101_KinbakuClub_Erica_AloneTimeEgg() {
	C101_KinbakuClub_Eric_PullCount++
	if (C101_KinbakuClub_Erica_GoodEgg) {
		OverridenIntroText = GetText("PullGood1");
		if (C101_KinbakuClub_Eric_PullCount >= 2) OverridenIntroText = GetText("PullGood2");
		if (C101_KinbakuClub_Eric_PullCount >= 3) OverridenIntroText = GetText("PullGood3");
		if (C101_KinbakuClub_Eric_PullCount >= 4) {
			OverridenIntroText = GetText("PullGood4");
			ActorAddOrgasm();
			ActorChangeAttitude(1, -1);
		}
		if (C101_KinbakuClub_Eric_PullCount >= 5) OverridenIntroText = GetText("PullGood5");
	}
	else {
		if (C101_KinbakuClub_Eric_PullCount >= 2) OverridenIntroText = GetText("PullFrustrating2");
		if (C101_KinbakuClub_Eric_PullCount >= 3) OverridenIntroText = GetText("PullFrustrating3");
		if (C101_KinbakuClub_Eric_PullCount >= 4) OverridenIntroText = GetText("PullFrustrating4");
	}
	C101_KinbakuClub_Erica_AloneTime()
}

// Chapter 101 - Erica - player lets erica go
function C101_KinbakuClub_Erica_EricaFreed() {
	if (C101_KinbakuClub_Eric_EricaBroken) {
		OverridenIntroText = GetText("Silent");
	}
	else LeaveIcon = "";
}