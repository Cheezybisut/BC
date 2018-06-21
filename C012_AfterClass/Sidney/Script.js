var C012_AfterClass_Sidney_CurrentStage = 0;
var C012_AfterClass_Sidney_IntroText = "";
var C012_AfterClass_Sidney_NextEventTime = 0;

// In her shorts, Sidney can have many poses when she talks
function C012_AfterClass_Sidney_SetPose() {
	if (ActorGetValue(ActorCloth) == "Shorts") {
		var Love = ActorGetValue(ActorLove);
		var Sub = ActorGetValue(ActorSubmission);	
		if ((Sub <= -10) && (Math.abs(Sub) >= Math.abs(Love))) ActorSetPose("Point");
		if ((Sub >= 10) && (Math.abs(Sub) >= Math.abs(Love))) ActorSetPose("Shy");
		if ((Love >= 10) && (Math.abs(Love) >= Math.abs(Sub))) ActorSetPose("Happy");
		if ((Love <= -10) && (Math.abs(Love) >= Math.abs(Sub))) ActorSetPose("Mad");
	} else ActorSetPose("");
}

// Chapter 12 After Class - Sidney Load
function C012_AfterClass_Sidney_Load() {
	
	// Loads the scene to search in the wardrobe
	LoadInteractions();
	ActorLoad("Sidney", "Leave");
	LeaveScreen = "Dorm";
	C012_AfterClass_Sidney_SetPose();
	
	// Loads the previous text if needed
	if (C012_AfterClass_Sidney_IntroText != "") {
		OverridenIntroText = C012_AfterClass_Sidney_IntroText;
		C012_AfterClass_Sidney_IntroText = "";
	} else {

		// Makes sure the next random event can be triggered
		if ((C012_AfterClass_Sidney_NextEventTime <= CurrentTime) && Common_ActorIsOwner)
			if (Math.floor(Math.random() * 10) == 0)
				C012_AfterClass_Sidney_RandomSidneyDommeEvent();

	}

}

// Chapter 12 After Class - Sidney Run
function C012_AfterClass_Sidney_Run() {
	BuildInteraction(C012_AfterClass_Sidney_CurrentStage);
	if (C012_AfterClass_Sidney_CurrentStage != 410) {
		if ((C012_AfterClass_Sidney_CurrentStage == 3090) || (C012_AfterClass_Sidney_CurrentStage == 3091)) {
			DrawActor("Player", 475, 0, 1);
			DrawActor(CurrentActor, 750, 0, 1);
		} else {
			DrawInteractionActor();
			if ((C012_AfterClass_Sidney_CurrentStage >= 340) && (C012_AfterClass_Sidney_CurrentStage < 400)) DrawActor("Player", 600, 100, 1);		
		}		
	}
}

// Chapter 12 After Class - Sidney Click
function C012_AfterClass_Sidney_Click() {

	// Regular interactions
	ClickInteraction(C012_AfterClass_Sidney_CurrentStage);

	// The player can click on herself in most stages
	var ClickInv = GetClickedInventory();
	if ((ClickInv == "Player") && (LeaveIcon == "Leave")) {
		C012_AfterClass_Sidney_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

}

// Chapter 12 After Class - Sidney can make love with the player if (Love + seduction * 2) >= 12 or >= 25 on the next time or Sidney is the player girlfriend/submissive
function C012_AfterClass_Sidney_GaggedAnswer() {
	var GagTalk = Math.floor(Math.random() * 5) + 1;
	OverridenIntroText = GetText("GaggedAnswer" + GagTalk.toString());
}

// Chapter 12 After Class - Sidney can make love with the player if (Love + seduction * 2) >= 12 or >= 25 on the next time or Sidney is the player girlfriend/submissive
function C012_AfterClass_Sidney_TestLove() {
	if (!ActorIsGagged()) {
		var LoveChance = ActorGetValue(ActorLove) + PlayerGetSkillLevel("Seduction") * 2;
		if (((LoveChance >= 12) && !GameLogQuery(CurrentChapter, "Sidney", "EnterDormFromPub")) || (LoveChance >= 25) || Common_ActorIsLover || Common_ActorIsOwned) {
			C012_AfterClass_Sidney_CurrentStage = 100;
		}		
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Sidney can be dominated at +20 submission
function C012_AfterClass_Sidney_TestDomme() {
	if (!ActorIsGagged()) {
		if (ActorGetValue(ActorSubmission) >= 20) {
			C012_AfterClass_Sidney_CurrentStage = 200;
		}
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Sidney can become the player Mistress at -20 submission
function C012_AfterClass_Sidney_TestSub() {
	if (!ActorIsGagged()) {
		if (ActorGetValue(ActorSubmission) <= -20) {
			C012_AfterClass_Sidney_CurrentStage = 300;
			OverridenIntroText = "";
		}
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Tests if the player can submit (no restrains first)
function C012_AfterClass_Sidney_TestSubmit() {
	if (Common_PlayerOwner != "") {
		OverridenIntroText = GetText("AlreadyOwned");
	} else {
		if (ActorIsRestrained()) {
			OverridenIntroText = GetText("UnrestrainFirst");
		} else {
			if (ActorIsChaste()) {
				OverridenIntroText = GetText("UnchasteFirst");
			} else {
				if (PlayerHasLockedInventory("Collar")) {
					OverridenIntroText = GetText("PlayerUncollarFirst");					
				} else {					
					if (Common_PlayerRestrained) {
						OverridenIntroText = GetText("PlayerUnrestrainFirst");
					} else {
						if (Common_PlayerNaked) {
							OverridenIntroText = GetText("GetOnYourKnees");
							C012_AfterClass_Sidney_PlayerStrip();
							C012_AfterClass_Sidney_CurrentStage = 340;
						} else {
							C012_AfterClass_Sidney_CurrentStage = 330;						
						}
					}					
				}
			}
		}
	}
}

// Chapter 12 After Class - The player can strip for Sidney
function C012_AfterClass_Sidney_PlayerStrip() {
	ActorSetPose("");
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
}

// Chapter 12 After Class - The player can strip for Sidney
function C012_AfterClass_Sidney_KneelForSidney() {
	Common_PlayerPose = "BackKneel";
}

// Chapter 12 After Class - When the player gets collared
function C012_AfterClass_Sidney_PlayerCollared() {
	LeaveIcon = "";
	Common_PlayerOwner = CurrentActor;
	Common_ActorIsOwner = true;
	PlayerLockInventory("Collar");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 12 After Class - When the player gets collared
function C012_AfterClass_Sidney_PlayerStandUp() {
	Common_PlayerPose = "";
	LeaveIcon = "Leave";
}

// Chapter 12 After Class - The player can trigger a random Domme event from Sidney (3000 events)
function C012_AfterClass_Sidney_RandomSidneyDommeEvent() {
	
	// Makes sure the next random event can be triggered
	if (C012_AfterClass_Sidney_NextEventTime <= CurrentTime) {

		// 1 event per 15 minutes maximum, the event is random and drawn from the Mistress pool
		C012_AfterClass_Sidney_NextEventTime = CurrentTime + 900000;
		C012_AfterClass_Sidney_CurrentStage = EventRandomPlayerSubmissive();

	}

	// If Sidney doesn't respond, she checks her cell phone
	if (C012_AfterClass_Sidney_CurrentStage == 0) ActorSetPose("CheckCellPhone");
	
}

// Chapter 12 After Class - As a Domme, Sidney can force the player to change
function C012_AfterClass_Sidney_ForceChangePlayer(NewCloth) {
	PlayerClothes(NewCloth);
	ActorSetPose("Happy");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 12 After Class - As a Domme, Sidney can force the player into some random bondage
function C012_AfterClass_Sidney_ForceRandomBondage(BondageType) {
	if ((BondageType == "Full") || (BondageType == "Restrain")) PlayerRandomRestrain();
	if ((BondageType == "Full") || (BondageType == "Gag")) PlayerRandomGag();
	CurrentTime = CurrentTime + 50000;
}

// Chapter 12 After Class - Sidney can unbind the player on some events
function C012_AfterClass_Sidney_TestUnbind() {

	// Before the next event time, she will always refuse
	if (C012_AfterClass_Sidney_NextEventTime <= CurrentTime) {
		
		// The more love, the higher the chances, 50% at zero
		var UnbindChance = Math.floor(Math.random() * 100) + ActorGetValue(ActorLove);
		if (UnbindChance >= 50) {
			OverridenIntroText = GetText("ReleasePlayer");
			PlayerReleaseBondage();
			CurrentTime = CurrentTime + 50000;
		} else C012_AfterClass_Sidney_NextEventTime = CurrentTime + 900000;
		
	}
	
}

// Chapter 12 After Class - When the player disobey, she can get punished
function C012_AfterClass_Sidney_DoActivity(ActivityType, Enjoyment, BonusStage) {
	
	// Launch the activity, some can have a bonus stage
	C012_AfterClass_Sidney_CurrentStage = EventDoActivity(ActivityType, Enjoyment, C012_AfterClass_Sidney_CurrentStage, 3290, BonusStage);

}

// Chapter 12 After Class - When the player disobey, she can get punished
function C012_AfterClass_Sidney_TestPunish() {
	ActorSetPose("CheckCellPhone");
	LeaveIcon = "Leave";
}

// Chapter 12 After Class - Allows the player to leave the scene
function C012_AfterClass_Sidney_AllowLeave() {
	ActorSetPose("CheckCellPhone");
	LeaveIcon = "Leave";
}

// Chapter 12 After Class - The player can beg Sidney to be released before she exits
function C012_AfterClass_Sidney_TestReleaseBeforeExit() {

	// The more love, the higher the chances, 50% at zero
	var UnbindChance = Math.floor(Math.random() * 100) + ActorGetValue(ActorLove);
	if (UnbindChance >= 50) {
		OverridenIntroText = GetText("ReleaseBeforeExit");
		PlayerReleaseBondage();
		CurrentTime = CurrentTime + 50000;
	}
	
}

// Chapter 12 After Class - Sidney can confiscate the player keys
function C012_AfterClass_Sidney_ConfiscateKeys() {
	PlayerRemoveInventory("CuffsKey", 99);
	ActorSetPose("CheckCellPhone");
	LeaveIcon = "Leave";
}